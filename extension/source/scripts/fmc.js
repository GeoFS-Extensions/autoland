/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.6 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */

var requirejs, require, define;
(function (global, setTimeout) {
    var req, s, head, baseElement, dataMain, src,
        interactiveScript, currentlyAddingScript, mainScript, subPath,
        version = '2.3.6',
        commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document),
        isWebWorker = !isBrowser && typeof importScripts !== 'undefined',
        //PS3 indicates loaded and complete, but need to wait for complete
        //specifically. Sequence is 'loading', 'loaded', execution,
        // then 'complete'. The UA check is unfortunate, but not sure how
        //to feature test w/o causing perf issues.
        readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ?
                      /^complete$/ : /^(complete|loaded)$/,
        defContextName = '_',
        //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
        isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = false;

    //Could match something like ')//comment', do not lose the prefix to comment.
    function commentReplace(match, singlePrefix) {
        return singlePrefix || '';
    }

    function isFunction(it) {
        return ostring.call(it) === '[object Function]';
    }

    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    /**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }

    /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break;
                }
            }
        }
    }

    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function (value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && typeof value === 'object' && value &&
                        !isArray(value) && !isFunction(value) &&
                        !(value instanceof RegExp)) {

                        if (!target[prop]) {
                            target[prop] = {};
                        }
                        mixin(target[prop], value, force, deepStringMixin);
                    } else {
                        target[prop] = value;
                    }
                }
            });
        }
        return target;
    }

    //Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
    function bind(obj, fn) {
        return function () {
            return fn.apply(obj, arguments);
        };
    }

    function scripts() {
        return document.getElementsByTagName('script');
    }

    function defaultOnError(err) {
        throw err;
    }

    //Allow getting a global that is expressed in
    //dot notation, like 'a.b.c'.
    function getGlobal(value) {
        if (!value) {
            return value;
        }
        var g = global;
        each(value.split('.'), function (part) {
            g = g[part];
        });
        return g;
    }

    /**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + '\nhttps://requirejs.org/docs/errors.html#' + id);
        e.requireType = id;
        e.requireModules = requireModules;
        if (err) {
            e.originalError = err;
        }
        return e;
    }

    if (typeof define !== 'undefined') {
        //If a define is already in play via another AMD loader,
        //do not overwrite.
        return;
    }

    if (typeof requirejs !== 'undefined') {
        if (isFunction(requirejs)) {
            //Do not overwrite an existing requirejs instance.
            return;
        }
        cfg = requirejs;
        requirejs = undefined;
    }

    //Allow for a require config object
    if (typeof require !== 'undefined' && !isFunction(require)) {
        //assume it is a config object.
        cfg = require;
        require = undefined;
    }

    function newContext(contextName) {
        var inCheckLoaded, Module, context, handlers,
            checkLoadedTimeoutId,
            config = {
                //Defaults. Do not set a default for map
                //config to speed up normalize(), which
                //will run faster if there is no default.
                waitSeconds: 7,
                baseUrl: './',
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            registry = {},
            //registry of just enabled modules, to speed
            //cycle breaking code when lots of modules
            //are registered, but not activated.
            enabledRegistry = {},
            undefEvents = {},
            defQueue = [],
            defined = {},
            urlFetched = {},
            bundlesMap = {},
            requireCounter = 1,
            unnormalizedCounter = 1;

        /**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
        function trimDots(ary) {
            var i, part;
            for (i = 0; i < ary.length; i++) {
                part = ary[i];
                if (part === '.') {
                    ary.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    // If at the start, or previous value is still ..,
                    // keep them so that when converted to a path it may
                    // still work when converted to a path, even though
                    // as an ID it is less than ideal. In larger point
                    // releases, may be better to just kick out an error.
                    if (i === 0 || (i === 1 && ary[2] === '..') || ary[i - 1] === '..') {
                        continue;
                    } else if (i > 0) {
                        ary.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
        }

        /**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
        function normalize(name, baseName, applyMap) {
            var pkgMain, mapValue, nameParts, i, j, nameSegment, lastIndex,
                foundMap, foundI, foundStarMap, starI, normalizedBaseParts,
                baseParts = (baseName && baseName.split('/')),
                map = config.map,
                starMap = map && map['*'];

            //Adjust any relative paths.
            if (name) {
                name = name.split('/');
                lastIndex = name.length - 1;

                // If wanting node ID compatibility, strip .js from end
                // of IDs. Have to do this here, and not in nameToUrl
                // because node allows either .js or non .js to map
                // to same file.
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                // Starts with a '.' so need the baseName
                if (name[0].charAt(0) === '.' && baseParts) {
                    //Convert baseName to array, and lop off the last part,
                    //so that . matches that 'directory' and not name of the baseName's
                    //module. For instance, baseName of 'one/two/three', maps to
                    //'one/two/three.js', but we want the directory, 'one/two' for
                    //this normalization.
                    normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                    name = normalizedBaseParts.concat(name);
                }

                trimDots(name);
                name = name.join('/');
            }

            //Apply map config if available.
            if (applyMap && map && (baseParts || starMap)) {
                nameParts = name.split('/');

                outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
                    nameSegment = nameParts.slice(0, i).join('/');

                    if (baseParts) {
                        //Find the longest baseName segment match in the config.
                        //So, do joins on the biggest to smallest lengths of baseParts.
                        for (j = baseParts.length; j > 0; j -= 1) {
                            mapValue = getOwn(map, baseParts.slice(0, j).join('/'));

                            //baseName segment has config, find if it has one for
                            //this name.
                            if (mapValue) {
                                mapValue = getOwn(mapValue, nameSegment);
                                if (mapValue) {
                                    //Match, update name to the new value.
                                    foundMap = mapValue;
                                    foundI = i;
                                    break outerLoop;
                                }
                            }
                        }
                    }

                    //Check for a star map match, but just hold on to it,
                    //if there is a shorter segment match later in a matching
                    //config, then favor over this star map.
                    if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                        foundStarMap = getOwn(starMap, nameSegment);
                        starI = i;
                    }
                }

                if (!foundMap && foundStarMap) {
                    foundMap = foundStarMap;
                    foundI = starI;
                }

                if (foundMap) {
                    nameParts.splice(0, foundI, foundMap);
                    name = nameParts.join('/');
                }
            }

            // If the name points to a package's name, use
            // the package main instead.
            pkgMain = getOwn(config.pkgs, name);

            return pkgMain ? pkgMain : name;
        }

        function removeScript(name) {
            if (isBrowser) {
                each(scripts(), function (scriptNode) {
                    if (scriptNode.getAttribute('data-requiremodule') === name &&
                            scriptNode.getAttribute('data-requirecontext') === context.contextName) {
                        scriptNode.parentNode.removeChild(scriptNode);
                        return true;
                    }
                });
            }
        }

        function hasPathFallback(id) {
            var pathConfig = getOwn(config.paths, id);
            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                //Pop off the first array value, since it failed, and
                //retry
                pathConfig.shift();
                context.require.undef(id);

                //Custom require that does not do map translation, since
                //ID is "absolute", already mapped/resolved.
                context.makeRequire(null, {
                    skipMap: true
                })([id]);

                return true;
            }
        }

        //Turns a plugin!resource to [plugin, resource]
        //with the plugin being undefined if the name
        //did not have a plugin prefix.
        function splitPrefix(name) {
            var prefix,
                index = name ? name.indexOf('!') : -1;
            if (index > -1) {
                prefix = name.substring(0, index);
                name = name.substring(index + 1, name.length);
            }
            return [prefix, name];
        }

        /**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url, pluginModule, suffix, nameParts,
                prefix = null,
                parentName = parentModuleMap ? parentModuleMap.name : null,
                originalName = name,
                isDefine = true,
                normalizedName = '';

            //If no name, then it means it is a require call, generate an
            //internal name.
            if (!name) {
                isDefine = false;
                name = '_@r' + (requireCounter += 1);
            }

            nameParts = splitPrefix(name);
            prefix = nameParts[0];
            name = nameParts[1];

            if (prefix) {
                prefix = normalize(prefix, parentName, applyMap);
                pluginModule = getOwn(defined, prefix);
            }

            //Account for relative paths if there is a base name.
            if (name) {
                if (prefix) {
                    if (isNormalized) {
                        normalizedName = name;
                    } else if (pluginModule && pluginModule.normalize) {
                        //Plugin is loaded, use its normalize method.
                        normalizedName = pluginModule.normalize(name, function (name) {
                            return normalize(name, parentName, applyMap);
                        });
                    } else {
                        // If nested plugin references, then do not try to
                        // normalize, as it will not normalize correctly. This
                        // places a restriction on resourceIds, and the longer
                        // term solution is not to normalize until plugins are
                        // loaded and all normalizations to allow for async
                        // loading of a loader plugin. But for now, fixes the
                        // common uses. Details in #1131
                        normalizedName = name.indexOf('!') === -1 ?
                                         normalize(name, parentName, applyMap) :
                                         name;
                    }
                } else {
                    //A regular module.
                    normalizedName = normalize(name, parentName, applyMap);

                    //Normalized name may be a plugin ID due to map config
                    //application in normalize. The map config values must
                    //already be normalized, so do not need to redo that part.
                    nameParts = splitPrefix(normalizedName);
                    prefix = nameParts[0];
                    normalizedName = nameParts[1];
                    isNormalized = true;

                    url = context.nameToUrl(normalizedName);
                }
            }

            //If the id is a plugin id that cannot be determined if it needs
            //normalization, stamp it with a unique ID so two matching relative
            //ids that may conflict can be separate.
            suffix = prefix && !pluginModule && !isNormalized ?
                     '_unnormalized' + (unnormalizedCounter += 1) :
                     '';

            return {
                prefix: prefix,
                name: normalizedName,
                parentMap: parentModuleMap,
                unnormalized: !!suffix,
                url: url,
                originalName: originalName,
                isDefine: isDefine,
                id: (prefix ?
                        prefix + '!' + normalizedName :
                        normalizedName) + suffix
            };
        }

        function getModule(depMap) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (!mod) {
                mod = registry[id] = new context.Module(depMap);
            }

            return mod;
        }

        function on(depMap, name, fn) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (hasProp(defined, id) &&
                    (!mod || mod.defineEmitComplete)) {
                if (name === 'defined') {
                    fn(defined[id]);
                }
            } else {
                mod = getModule(depMap);
                if (mod.error && name === 'error') {
                    fn(mod.error);
                } else {
                    mod.on(name, fn);
                }
            }
        }

        function onError(err, errback) {
            var ids = err.requireModules,
                notified = false;

            if (errback) {
                errback(err);
            } else {
                each(ids, function (id) {
                    var mod = getOwn(registry, id);
                    if (mod) {
                        //Set error on module, so it skips timeout checks.
                        mod.error = err;
                        if (mod.events.error) {
                            notified = true;
                            mod.emit('error', err);
                        }
                    }
                });

                if (!notified) {
                    req.onError(err);
                }
            }
        }

        /**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
        function takeGlobalQueue() {
            //Push all the globalDefQueue items into the context's defQueue
            if (globalDefQueue.length) {
                each(globalDefQueue, function(queueItem) {
                    var id = queueItem[0];
                    if (typeof id === 'string') {
                        context.defQueueMap[id] = true;
                    }
                    defQueue.push(queueItem);
                });
                globalDefQueue = [];
            }
        }

        handlers = {
            'require': function (mod) {
                if (mod.require) {
                    return mod.require;
                } else {
                    return (mod.require = context.makeRequire(mod.map));
                }
            },
            'exports': function (mod) {
                mod.usingExports = true;
                if (mod.map.isDefine) {
                    if (mod.exports) {
                        return (defined[mod.map.id] = mod.exports);
                    } else {
                        return (mod.exports = defined[mod.map.id] = {});
                    }
                }
            },
            'module': function (mod) {
                if (mod.module) {
                    return mod.module;
                } else {
                    return (mod.module = {
                        id: mod.map.id,
                        uri: mod.map.url,
                        config: function () {
                            return getOwn(config.config, mod.map.id) || {};
                        },
                        exports: mod.exports || (mod.exports = {})
                    });
                }
            }
        };

        function cleanRegistry(id) {
            //Clean up machinery used for waiting modules.
            delete registry[id];
            delete enabledRegistry[id];
        }

        function breakCycle(mod, traced, processed) {
            var id = mod.map.id;

            if (mod.error) {
                mod.emit('error', mod.error);
            } else {
                traced[id] = true;
                each(mod.depMaps, function (depMap, i) {
                    var depId = depMap.id,
                        dep = getOwn(registry, depId);

                    //Only force things that have not completed
                    //being defined, so still in the registry,
                    //and only if it has not been matched up
                    //in the module already.
                    if (dep && !mod.depMatched[i] && !processed[depId]) {
                        if (getOwn(traced, depId)) {
                            mod.defineDep(i, defined[depId]);
                            mod.check(); //pass false?
                        } else {
                            breakCycle(dep, traced, processed);
                        }
                    }
                });
                processed[id] = true;
            }
        }

        function checkLoaded() {
            var err, usingPathFallback,
                waitInterval = config.waitSeconds * 1000,
                //It is possible to disable the wait interval by using waitSeconds of 0.
                expired = waitInterval && (context.startTime + waitInterval) < new Date().getTime(),
                noLoads = [],
                reqCalls = [],
                stillLoading = false,
                needCycleCheck = true;

            //Do not bother if this call was a result of a cycle break.
            if (inCheckLoaded) {
                return;
            }

            inCheckLoaded = true;

            //Figure out the state of all the modules.
            eachProp(enabledRegistry, function (mod) {
                var map = mod.map,
                    modId = map.id;

                //Skip things that are not enabled or in error state.
                if (!mod.enabled) {
                    return;
                }

                if (!map.isDefine) {
                    reqCalls.push(mod);
                }

                if (!mod.error) {
                    //If the module should be executed, and it has not
                    //been inited and time is up, remember it.
                    if (!mod.inited && expired) {
                        if (hasPathFallback(modId)) {
                            usingPathFallback = true;
                            stillLoading = true;
                        } else {
                            noLoads.push(modId);
                            removeScript(modId);
                        }
                    } else if (!mod.inited && mod.fetched && map.isDefine) {
                        stillLoading = true;
                        if (!map.prefix) {
                            //No reason to keep looking for unfinished
                            //loading. If the only stillLoading is a
                            //plugin resource though, keep going,
                            //because it may be that a plugin resource
                            //is waiting on a non-plugin cycle.
                            return (needCycleCheck = false);
                        }
                    }
                }
            });

            if (expired && noLoads.length) {
                //If wait time expired, throw error of unloaded modules.
                err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
                err.contextName = context.contextName;
                return onError(err);
            }

            //Not expired, check for a cycle.
            if (needCycleCheck) {
                each(reqCalls, function (mod) {
                    breakCycle(mod, {}, {});
                });
            }

            //If still waiting on loads, and the waiting load is something
            //other than a plugin resource, or there are still outstanding
            //scripts, then just try back later.
            if ((!expired || usingPathFallback) && stillLoading) {
                //Something is still waiting to load. Wait for it, but only
                //if a timeout is not already in effect.
                if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                    checkLoadedTimeoutId = setTimeout(function () {
                        checkLoadedTimeoutId = 0;
                        checkLoaded();
                    }, 50);
                }
            }

            inCheckLoaded = false;
        }

        Module = function (map) {
            this.events = getOwn(undefEvents, map.id) || {};
            this.map = map;
            this.shim = getOwn(config.shim, map.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0;

            /* this.exports this.factory
               this.depMaps = [],
               this.enabled, this.fetched
            */
        };

        Module.prototype = {
            init: function (depMaps, factory, errback, options) {
                options = options || {};

                //Do not do more inits if already done. Can happen if there
                //are multiple define calls for the same module. That is not
                //a normal, common case, but it is also not unexpected.
                if (this.inited) {
                    return;
                }

                this.factory = factory;

                if (errback) {
                    //Register for errors on this module.
                    this.on('error', errback);
                } else if (this.events.error) {
                    //If no errback already, but there are error listeners
                    //on this module, set up an errback to pass to the deps.
                    errback = bind(this, function (err) {
                        this.emit('error', err);
                    });
                }

                //Do a copy of the dependency array, so that
                //source inputs are not modified. For example
                //"shim" deps are passed in here directly, and
                //doing a direct modification of the depMaps array
                //would affect that config.
                this.depMaps = depMaps && depMaps.slice(0);

                this.errback = errback;

                //Indicate this module has be initialized
                this.inited = true;

                this.ignore = options.ignore;

                //Could have option to init this module in enabled mode,
                //or could have been previously marked as enabled. However,
                //the dependencies are not known until init is called. So
                //if enabled previously, now trigger dependencies as enabled.
                if (options.enabled || this.enabled) {
                    //Enable this module and dependencies.
                    //Will call this.check()
                    this.enable();
                } else {
                    this.check();
                }
            },

            defineDep: function (i, depExports) {
                //Because of cycles, defined callback for a given
                //export can be called more than once.
                if (!this.depMatched[i]) {
                    this.depMatched[i] = true;
                    this.depCount -= 1;
                    this.depExports[i] = depExports;
                }
            },

            fetch: function () {
                if (this.fetched) {
                    return;
                }
                this.fetched = true;

                context.startTime = (new Date()).getTime();

                var map = this.map;

                //If the manager is for a plugin managed resource,
                //ask the plugin to load it now.
                if (this.shim) {
                    context.makeRequire(this.map, {
                        enableBuildCallback: true
                    })(this.shim.deps || [], bind(this, function () {
                        return map.prefix ? this.callPlugin() : this.load();
                    }));
                } else {
                    //Regular dependency.
                    return map.prefix ? this.callPlugin() : this.load();
                }
            },

            load: function () {
                var url = this.map.url;

                //Regular dependency.
                if (!urlFetched[url]) {
                    urlFetched[url] = true;
                    context.load(this.map.id, url);
                }
            },

            /**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
            check: function () {
                if (!this.enabled || this.enabling) {
                    return;
                }

                var err, cjsModule,
                    id = this.map.id,
                    depExports = this.depExports,
                    exports = this.exports,
                    factory = this.factory;

                if (!this.inited) {
                    // Only fetch if not already in the defQueue.
                    if (!hasProp(context.defQueueMap, id)) {
                        this.fetch();
                    }
                } else if (this.error) {
                    this.emit('error', this.error);
                } else if (!this.defining) {
                    //The factory could trigger another require call
                    //that would result in checking this module to
                    //define itself again. If already in the process
                    //of doing that, skip this work.
                    this.defining = true;

                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(factory)) {
                            //If there is an error listener, favor passing
                            //to that instead of throwing an error. However,
                            //only do it for define()'d  modules. require
                            //errbacks should not be called for failures in
                            //their callbacks (#699). However if a global
                            //onError is set, use that.
                            if ((this.events.error && this.map.isDefine) ||
                                req.onError !== defaultOnError) {
                                try {
                                    exports = context.execCb(id, factory, depExports, exports);
                                } catch (e) {
                                    err = e;
                                }
                            } else {
                                exports = context.execCb(id, factory, depExports, exports);
                            }

                            // Favor return value over exports. If node/cjs in play,
                            // then will not have a return value anyway. Favor
                            // module.exports assignment over exports object.
                            if (this.map.isDefine && exports === undefined) {
                                cjsModule = this.module;
                                if (cjsModule) {
                                    exports = cjsModule.exports;
                                } else if (this.usingExports) {
                                    //exports already set the defined value.
                                    exports = this.exports;
                                }
                            }

                            if (err) {
                                err.requireMap = this.map;
                                err.requireModules = this.map.isDefine ? [this.map.id] : null;
                                err.requireType = this.map.isDefine ? 'define' : 'require';
                                return onError((this.error = err));
                            }

                        } else {
                            //Just a literal value
                            exports = factory;
                        }

                        this.exports = exports;

                        if (this.map.isDefine && !this.ignore) {
                            defined[id] = exports;

                            if (req.onResourceLoad) {
                                var resLoadMaps = [];
                                each(this.depMaps, function (depMap) {
                                    resLoadMaps.push(depMap.normalizedMap || depMap);
                                });
                                req.onResourceLoad(context, this.map, resLoadMaps);
                            }
                        }

                        //Clean up
                        cleanRegistry(id);

                        this.defined = true;
                    }

                    //Finished the define stage. Allow calling check again
                    //to allow define notifications below in the case of a
                    //cycle.
                    this.defining = false;

                    if (this.defined && !this.defineEmitted) {
                        this.defineEmitted = true;
                        this.emit('defined', this.exports);
                        this.defineEmitComplete = true;
                    }

                }
            },

            callPlugin: function () {
                var map = this.map,
                    id = map.id,
                    //Map already normalized the prefix.
                    pluginMap = makeModuleMap(map.prefix);

                //Mark this as a dependency for this plugin, so it
                //can be traced for cycles.
                this.depMaps.push(pluginMap);

                on(pluginMap, 'defined', bind(this, function (plugin) {
                    var load, normalizedMap, normalizedMod,
                        bundleId = getOwn(bundlesMap, this.map.id),
                        name = this.map.name,
                        parentName = this.map.parentMap ? this.map.parentMap.name : null,
                        localRequire = context.makeRequire(map.parentMap, {
                            enableBuildCallback: true
                        });

                    //If current map is not normalized, wait for that
                    //normalized name to load instead of continuing.
                    if (this.map.unnormalized) {
                        //Normalize the ID if the plugin allows it.
                        if (plugin.normalize) {
                            name = plugin.normalize(name, function (name) {
                                return normalize(name, parentName, true);
                            }) || '';
                        }

                        //prefix and name should already be normalized, no need
                        //for applying map config again either.
                        normalizedMap = makeModuleMap(map.prefix + '!' + name,
                                                      this.map.parentMap,
                                                      true);
                        on(normalizedMap,
                            'defined', bind(this, function (value) {
                                this.map.normalizedMap = normalizedMap;
                                this.init([], function () { return value; }, null, {
                                    enabled: true,
                                    ignore: true
                                });
                            }));

                        normalizedMod = getOwn(registry, normalizedMap.id);
                        if (normalizedMod) {
                            //Mark this as a dependency for this plugin, so it
                            //can be traced for cycles.
                            this.depMaps.push(normalizedMap);

                            if (this.events.error) {
                                normalizedMod.on('error', bind(this, function (err) {
                                    this.emit('error', err);
                                }));
                            }
                            normalizedMod.enable();
                        }

                        return;
                    }

                    //If a paths config, then just load that file instead to
                    //resolve the plugin, as it is built into that paths layer.
                    if (bundleId) {
                        this.map.url = context.nameToUrl(bundleId);
                        this.load();
                        return;
                    }

                    load = bind(this, function (value) {
                        this.init([], function () { return value; }, null, {
                            enabled: true
                        });
                    });

                    load.error = bind(this, function (err) {
                        this.inited = true;
                        this.error = err;
                        err.requireModules = [id];

                        //Remove temp unnormalized modules for this module,
                        //since they will never be resolved otherwise now.
                        eachProp(registry, function (mod) {
                            if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                                cleanRegistry(mod.map.id);
                            }
                        });

                        onError(err);
                    });

                    //Allow plugins to load other code without having to know the
                    //context or how to 'complete' the load.
                    load.fromText = bind(this, function (text, textAlt) {
                        /*jslint evil: true */
                        var moduleName = map.name,
                            moduleMap = makeModuleMap(moduleName),
                            hasInteractive = useInteractive;

                        //As of 2.1.0, support just passing the text, to reinforce
                        //fromText only being called once per resource. Still
                        //support old style of passing moduleName but discard
                        //that moduleName in favor of the internal ref.
                        if (textAlt) {
                            text = textAlt;
                        }

                        //Turn off interactive script matching for IE for any define
                        //calls in the text, then turn it back on at the end.
                        if (hasInteractive) {
                            useInteractive = false;
                        }

                        //Prime the system by creating a module instance for
                        //it.
                        getModule(moduleMap);

                        //Transfer any config to this other module.
                        if (hasProp(config.config, id)) {
                            config.config[moduleName] = config.config[id];
                        }

                        try {
                            req.exec(text);
                        } catch (e) {
                            return onError(makeError('fromtexteval',
                                             'fromText eval for ' + id +
                                            ' failed: ' + e,
                                             e,
                                             [id]));
                        }

                        if (hasInteractive) {
                            useInteractive = true;
                        }

                        //Mark this as a dependency for the plugin
                        //resource
                        this.depMaps.push(moduleMap);

                        //Support anonymous modules.
                        context.completeLoad(moduleName);

                        //Bind the value of that module to the value for this
                        //resource ID.
                        localRequire([moduleName], load);
                    });

                    //Use parentName here since the plugin's name is not reliable,
                    //could be some weird string with no path that actually wants to
                    //reference the parentName's path.
                    plugin.load(map.name, localRequire, load, config);
                }));

                context.enable(pluginMap, this);
                this.pluginMaps[pluginMap.id] = pluginMap;
            },

            enable: function () {
                enabledRegistry[this.map.id] = this;
                this.enabled = true;

                //Set flag mentioning that the module is enabling,
                //so that immediate calls to the defined callbacks
                //for dependencies do not trigger inadvertent load
                //with the depCount still being zero.
                this.enabling = true;

                //Enable each dependency
                each(this.depMaps, bind(this, function (depMap, i) {
                    var id, mod, handler;

                    if (typeof depMap === 'string') {
                        //Dependency needs to be converted to a depMap
                        //and wired up to this module.
                        depMap = makeModuleMap(depMap,
                                               (this.map.isDefine ? this.map : this.map.parentMap),
                                               false,
                                               !this.skipMap);
                        this.depMaps[i] = depMap;

                        handler = getOwn(handlers, depMap.id);

                        if (handler) {
                            this.depExports[i] = handler(this);
                            return;
                        }

                        this.depCount += 1;

                        on(depMap, 'defined', bind(this, function (depExports) {
                            if (this.undefed) {
                                return;
                            }
                            this.defineDep(i, depExports);
                            this.check();
                        }));

                        if (this.errback) {
                            on(depMap, 'error', bind(this, this.errback));
                        } else if (this.events.error) {
                            // No direct errback on this module, but something
                            // else is listening for errors, so be sure to
                            // propagate the error correctly.
                            on(depMap, 'error', bind(this, function(err) {
                                this.emit('error', err);
                            }));
                        }
                    }

                    id = depMap.id;
                    mod = registry[id];

                    //Skip special modules like 'require', 'exports', 'module'
                    //Also, don't call enable if it is already enabled,
                    //important in circular dependency cases.
                    if (!hasProp(handlers, id) && mod && !mod.enabled) {
                        context.enable(depMap, this);
                    }
                }));

                //Enable each plugin that is used in
                //a dependency
                eachProp(this.pluginMaps, bind(this, function (pluginMap) {
                    var mod = getOwn(registry, pluginMap.id);
                    if (mod && !mod.enabled) {
                        context.enable(pluginMap, this);
                    }
                }));

                this.enabling = false;

                this.check();
            },

            on: function (name, cb) {
                var cbs = this.events[name];
                if (!cbs) {
                    cbs = this.events[name] = [];
                }
                cbs.push(cb);
            },

            emit: function (name, evt) {
                each(this.events[name], function (cb) {
                    cb(evt);
                });
                if (name === 'error') {
                    //Now that the error handler was triggered, remove
                    //the listeners, since this broken Module instance
                    //can stay around for a while in the registry.
                    delete this.events[name];
                }
            }
        };

        function callGetModule(args) {
            //Skip modules already defined.
            if (!hasProp(defined, args[0])) {
                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
            }
        }

        function removeListener(node, func, name, ieName) {
            //Favor detachEvent because of IE9
            //issue, see attachEvent/addEventListener comment elsewhere
            //in this file.
            if (node.detachEvent && !isOpera) {
                //Probably IE. If not it will throw an error, which will be
                //useful to know.
                if (ieName) {
                    node.detachEvent(ieName, func);
                }
            } else {
                node.removeEventListener(name, func, false);
            }
        }

        /**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
        function getScriptData(evt) {
            //Using currentTarget instead of target for Firefox 2.0's sake. Not
            //all old browsers will be supported, but this one was easy enough
            //to support and still makes sense.
            var node = evt.currentTarget || evt.srcElement;

            //Remove the listeners once here.
            removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
            removeListener(node, context.onScriptError, 'error');

            return {
                node: node,
                id: node && node.getAttribute('data-requiremodule')
            };
        }

        function intakeDefines() {
            var args;

            //Any defined modules in the global queue, intake them now.
            takeGlobalQueue();

            //Make sure any remaining defQueue items get properly processed.
            while (defQueue.length) {
                args = defQueue.shift();
                if (args[0] === null) {
                    return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' +
                        args[args.length - 1]));
                } else {
                    //args are id, deps, factory. Should be normalized by the
                    //define() function.
                    callGetModule(args);
                }
            }
            context.defQueueMap = {};
        }

        context = {
            config: config,
            contextName: contextName,
            registry: registry,
            defined: defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            defQueueMap: {},
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,
            onError: onError,

            /**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
            configure: function (cfg) {
                //Make sure the baseUrl ends in a slash.
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                        cfg.baseUrl += '/';
                    }
                }

                // Convert old style urlArgs string to a function.
                if (typeof cfg.urlArgs === 'string') {
                    var urlArgs = cfg.urlArgs;
                    cfg.urlArgs = function(id, url) {
                        return (url.indexOf('?') === -1 ? '?' : '&') + urlArgs;
                    };
                }

                //Save off the paths since they require special processing,
                //they are additive.
                var shim = config.shim,
                    objs = {
                        paths: true,
                        bundles: true,
                        config: true,
                        map: true
                    };

                eachProp(cfg, function (value, prop) {
                    if (objs[prop]) {
                        if (!config[prop]) {
                            config[prop] = {};
                        }
                        mixin(config[prop], value, true, true);
                    } else {
                        config[prop] = value;
                    }
                });

                //Reverse map the bundles
                if (cfg.bundles) {
                    eachProp(cfg.bundles, function (value, prop) {
                        each(value, function (v) {
                            if (v !== prop) {
                                bundlesMap[v] = prop;
                            }
                        });
                    });
                }

                //Merge shim
                if (cfg.shim) {
                    eachProp(cfg.shim, function (value, id) {
                        //Normalize the structure
                        if (isArray(value)) {
                            value = {
                                deps: value
                            };
                        }
                        if ((value.exports || value.init) && !value.exportsFn) {
                            value.exportsFn = context.makeShimExports(value);
                        }
                        shim[id] = value;
                    });
                    config.shim = shim;
                }

                //Adjust packages if necessary.
                if (cfg.packages) {
                    each(cfg.packages, function (pkgObj) {
                        var location, name;

                        pkgObj = typeof pkgObj === 'string' ? {name: pkgObj} : pkgObj;

                        name = pkgObj.name;
                        location = pkgObj.location;
                        if (location) {
                            config.paths[name] = pkgObj.location;
                        }

                        //Save pointer to main module ID for pkg name.
                        //Remove leading dot in main, so main paths are normalized,
                        //and remove any trailing .js, since different package
                        //envs have different conventions: some use a module name,
                        //some use a file name.
                        config.pkgs[name] = pkgObj.name + '/' + (pkgObj.main || 'main')
                                     .replace(currDirRegExp, '')
                                     .replace(jsSuffixRegExp, '');
                    });
                }

                //If there are any "waiting to execute" modules in the registry,
                //update the maps for them, since their info, like URLs to load,
                //may have changed.
                eachProp(registry, function (mod, id) {
                    //If module already has init called, since it is too
                    //late to modify them, and ignore unnormalized ones
                    //since they are transient.
                    if (!mod.inited && !mod.map.unnormalized) {
                        mod.map = makeModuleMap(id, null, true);
                    }
                });

                //If a deps array or a config callback is specified, then call
                //require with those args. This is useful when require is defined as a
                //config object before require.js is loaded.
                if (cfg.deps || cfg.callback) {
                    context.require(cfg.deps || [], cfg.callback);
                }
            },

            makeShimExports: function (value) {
                function fn() {
                    var ret;
                    if (value.init) {
                        ret = value.init.apply(global, arguments);
                    }
                    return ret || (value.exports && getGlobal(value.exports));
                }
                return fn;
            },

            makeRequire: function (relMap, options) {
                options = options || {};

                function localRequire(deps, callback, errback) {
                    var id, map, requireMod;

                    if (options.enableBuildCallback && callback && isFunction(callback)) {
                        callback.__requireJsBuild = true;
                    }

                    if (typeof deps === 'string') {
                        if (isFunction(callback)) {
                            //Invalid call
                            return onError(makeError('requireargs', 'Invalid require call'), errback);
                        }

                        //If require|exports|module are requested, get the
                        //value for them from the special handlers. Caveat:
                        //this only works while module is being defined.
                        if (relMap && hasProp(handlers, deps)) {
                            return handlers[deps](registry[relMap.id]);
                        }

                        //Synchronous access to one module. If require.get is
                        //available (as in the Node adapter), prefer that.
                        if (req.get) {
                            return req.get(context, deps, relMap, localRequire);
                        }

                        //Normalize module name, if it contains . or ..
                        map = makeModuleMap(deps, relMap, false, true);
                        id = map.id;

                        if (!hasProp(defined, id)) {
                            return onError(makeError('notloaded', 'Module name "' +
                                        id +
                                        '" has not been loaded yet for context: ' +
                                        contextName +
                                        (relMap ? '' : '. Use require([])')));
                        }
                        return defined[id];
                    }

                    //Grab defines waiting in the global queue.
                    intakeDefines();

                    //Mark all the dependencies as needing to be loaded.
                    context.nextTick(function () {
                        //Some defines could have been added since the
                        //require call, collect them.
                        intakeDefines();

                        requireMod = getModule(makeModuleMap(null, relMap));

                        //Store if map config should be applied to this require
                        //call for dependencies.
                        requireMod.skipMap = options.skipMap;

                        requireMod.init(deps, callback, errback, {
                            enabled: true
                        });

                        checkLoaded();
                    });

                    return localRequire;
                }

                mixin(localRequire, {
                    isBrowser: isBrowser,

                    /**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
                    toUrl: function (moduleNamePlusExt) {
                        var ext,
                            index = moduleNamePlusExt.lastIndexOf('.'),
                            segment = moduleNamePlusExt.split('/')[0],
                            isRelative = segment === '.' || segment === '..';

                        //Have a file extension alias, and it is not the
                        //dots from a relative path.
                        if (index !== -1 && (!isRelative || index > 1)) {
                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                            moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                        }

                        return context.nameToUrl(normalize(moduleNamePlusExt,
                                                relMap && relMap.id, true), ext,  true);
                    },

                    defined: function (id) {
                        return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
                    },

                    specified: function (id) {
                        id = makeModuleMap(id, relMap, false, true).id;
                        return hasProp(defined, id) || hasProp(registry, id);
                    }
                });

                //Only allow undef on top level require calls
                if (!relMap) {
                    localRequire.undef = function (id) {
                        //Bind any waiting define() calls to this context,
                        //fix for #408
                        takeGlobalQueue();

                        var map = makeModuleMap(id, relMap, true),
                            mod = getOwn(registry, id);

                        mod.undefed = true;
                        removeScript(id);

                        delete defined[id];
                        delete urlFetched[map.url];
                        delete undefEvents[id];

                        //Clean queued defines too. Go backwards
                        //in array so that the splices do not
                        //mess up the iteration.
                        eachReverse(defQueue, function(args, i) {
                            if (args[0] === id) {
                                defQueue.splice(i, 1);
                            }
                        });
                        delete context.defQueueMap[id];

                        if (mod) {
                            //Hold on to listeners in case the
                            //module will be attempted to be reloaded
                            //using a different config.
                            if (mod.events.defined) {
                                undefEvents[id] = mod.events;
                            }

                            cleanRegistry(id);
                        }
                    };
                }

                return localRequire;
            },

            /**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. A second arg, parent, the parent module,
             * is passed in for context, when this method is overridden by
             * the optimizer. Not shown here to keep code compact.
             */
            enable: function (depMap) {
                var mod = getOwn(registry, depMap.id);
                if (mod) {
                    getModule(depMap).enable();
                }
            },

            /**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
            completeLoad: function (moduleName) {
                var found, args, mod,
                    shim = getOwn(config.shim, moduleName) || {},
                    shExports = shim.exports;

                takeGlobalQueue();

                while (defQueue.length) {
                    args = defQueue.shift();
                    if (args[0] === null) {
                        args[0] = moduleName;
                        //If already found an anonymous module and bound it
                        //to this name, then this is some other anon module
                        //waiting for its completeLoad to fire.
                        if (found) {
                            break;
                        }
                        found = true;
                    } else if (args[0] === moduleName) {
                        //Found matching define call for this script!
                        found = true;
                    }

                    callGetModule(args);
                }
                context.defQueueMap = {};

                //Do this after the cycle of callGetModule in case the result
                //of those calls/init calls changes the registry.
                mod = getOwn(registry, moduleName);

                if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                    if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                        if (hasPathFallback(moduleName)) {
                            return;
                        } else {
                            return onError(makeError('nodefine',
                                             'No define call for ' + moduleName,
                                             null,
                                             [moduleName]));
                        }
                    } else {
                        //A script that does not call define(), so just simulate
                        //the call for it.
                        callGetModule([moduleName, (shim.deps || []), shim.exportsFn]);
                    }
                }

                checkLoaded();
            },

            /**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
            nameToUrl: function (moduleName, ext, skipExt) {
                var paths, syms, i, parentModule, url,
                    parentPath, bundleId,
                    pkgMain = getOwn(config.pkgs, moduleName);

                if (pkgMain) {
                    moduleName = pkgMain;
                }

                bundleId = getOwn(bundlesMap, moduleName);

                if (bundleId) {
                    return context.nameToUrl(bundleId, ext, skipExt);
                }

                //If a colon is in the URL, it indicates a protocol is used and it is just
                //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
                //or ends with .js, then assume the user meant to use an url and not a module id.
                //The slash is important for protocol-less URLs as well as full paths.
                if (req.jsExtRegExp.test(moduleName)) {
                    //Just a plain path, not module name lookup, so just return it.
                    //Add extension if it is included. This is a bit wonky, only non-.js things pass
                    //an extension, this method probably needs to be reworked.
                    url = moduleName + (ext || '');
                } else {
                    //A module that needs to be converted to a path.
                    paths = config.paths;

                    syms = moduleName.split('/');
                    //For each module name segment, see if there is a path
                    //registered for it. Start with most specific name
                    //and work up from it.
                    for (i = syms.length; i > 0; i -= 1) {
                        parentModule = syms.slice(0, i).join('/');

                        parentPath = getOwn(paths, parentModule);
                        if (parentPath) {
                            //If an array, it means there are a few choices,
                            //Choose the one that is desired
                            if (isArray(parentPath)) {
                                parentPath = parentPath[0];
                            }
                            syms.splice(0, i, parentPath);
                            break;
                        }
                    }

                    //Join the path parts together, then figure out if baseUrl is needed.
                    url = syms.join('/');
                    url += (ext || (/^data\:|^blob\:|\?/.test(url) || skipExt ? '' : '.js'));
                    url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : config.baseUrl) + url;
                }

                return config.urlArgs && !/^blob\:/.test(url) ?
                       url + config.urlArgs(moduleName, url) : url;
            },

            //Delegates to req.load. Broken out as a separate function to
            //allow overriding in the optimizer.
            load: function (id, url) {
                req.load(context, id, url);
            },

            /**
             * Executes a module callback function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
            execCb: function (name, callback, args, exports) {
                return callback.apply(exports, args);
            },

            /**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
            onScriptLoad: function (evt) {
                //Using currentTarget instead of target for Firefox 2.0's sake. Not
                //all old browsers will be supported, but this one was easy enough
                //to support and still makes sense.
                if (evt.type === 'load' ||
                        (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
                    //Reset interactive script so a script node is not held onto for
                    //to long.
                    interactiveScript = null;

                    //Pull out the name of the module and the context.
                    var data = getScriptData(evt);
                    context.completeLoad(data.id);
                }
            },

            /**
             * Callback for script errors.
             */
            onScriptError: function (evt) {
                var data = getScriptData(evt);
                if (!hasPathFallback(data.id)) {
                    var parents = [];
                    eachProp(registry, function(value, key) {
                        if (key.indexOf('_@r') !== 0) {
                            each(value.depMaps, function(depMap) {
                                if (depMap.id === data.id) {
                                    parents.push(key);
                                    return true;
                                }
                            });
                        }
                    });
                    return onError(makeError('scripterror', 'Script error for "' + data.id +
                                             (parents.length ?
                                             '", needed by: ' + parents.join(', ') :
                                             '"'), evt, [data.id]));
                }
            }
        };

        context.require = context.makeRequire();
        return context;
    }

    /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
    req = requirejs = function (deps, callback, errback, optional) {

        //Find the right context, use default
        var context, config,
            contextName = defContextName;

        // Determine if have config object in the call.
        if (!isArray(deps) && typeof deps !== 'string') {
            // deps is a config object
            config = deps;
            if (isArray(callback)) {
                // Adjust args if there are dependencies
                deps = callback;
                callback = errback;
                errback = optional;
            } else {
                deps = [];
            }
        }

        if (config && config.context) {
            contextName = config.context;
        }

        context = getOwn(contexts, contextName);
        if (!context) {
            context = contexts[contextName] = req.s.newContext(contextName);
        }

        if (config) {
            context.configure(config);
        }

        return context.require(deps, callback, errback);
    };

    /**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
    req.config = function (config) {
        return req(config);
    };

    /**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
    req.nextTick = typeof setTimeout !== 'undefined' ? function (fn) {
        setTimeout(fn, 4);
    } : function (fn) { fn(); };

    /**
     * Export require as a global, but only if it does not already exist.
     */
    if (!require) {
        require = req;
    }

    req.version = version;

    //Used to filter out dependencies that are already paths.
    req.jsExtRegExp = /^\/|:|\?|\.js$/;
    req.isBrowser = isBrowser;
    s = req.s = {
        contexts: contexts,
        newContext: newContext
    };

    //Create default context.
    req({});

    //Exports some context-sensitive methods on global require.
    each([
        'toUrl',
        'undef',
        'defined',
        'specified'
    ], function (prop) {
        //Reference from contexts instead of early binding to default context,
        //so that during builds, the latest instance of the default context
        //with its config gets used.
        req[prop] = function () {
            var ctx = contexts[defContextName];
            return ctx.require[prop].apply(ctx, arguments);
        };
    });

    if (isBrowser) {
        head = s.head = document.getElementsByTagName('head')[0];
        //If BASE tag is in play, using appendChild is a problem for IE6.
        //When that browser dies, this can be removed. Details in this jQuery bug:
        //http://dev.jquery.com/ticket/2709
        baseElement = document.getElementsByTagName('base')[0];
        if (baseElement) {
            head = s.head = baseElement.parentNode;
        }
    }

    /**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
    req.onError = defaultOnError;

    /**
     * Creates the node for the load command. Only used in browser envs.
     */
    req.createNode = function (config, moduleName, url) {
        var node = config.xhtml ?
                document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
                document.createElement('script');
        node.type = config.scriptType || 'text/javascript';
        node.charset = 'utf-8';
        node.async = true;
        return node;
    };

    /**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
    req.load = function (context, moduleName, url) {
        var config = (context && context.config) || {},
            node;
        if (isBrowser) {
            //In the browser so use a script tag
            node = req.createNode(config, moduleName, url);

            node.setAttribute('data-requirecontext', context.contextName);
            node.setAttribute('data-requiremodule', moduleName);

            //Set up load listener. Test attachEvent first because IE9 has
            //a subtle issue in its addEventListener and script onload firings
            //that do not match the behavior of all other browsers with
            //addEventListener support, which fire the onload event for a
            //script right after the script execution. See:
            //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
            //UNFORTUNATELY Opera implements attachEvent but does not follow the script
            //script execution mode.
            if (node.attachEvent &&
                    //Check if node.attachEvent is artificially added by custom script or
                    //natively supported by browser
                    //read https://github.com/requirejs/requirejs/issues/187
                    //if we can NOT find [native code] then it must NOT natively supported.
                    //in IE8, node.attachEvent does not have toString()
                    //Note the test for "[native code" with no closing brace, see:
                    //https://github.com/requirejs/requirejs/issues/273
                    !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) &&
                    !isOpera) {
                //Probably IE. IE (at least 6-8) do not fire
                //script onload right after executing the script, so
                //we cannot tie the anonymous define call to a name.
                //However, IE reports the script as being in 'interactive'
                //readyState at the time of the define call.
                useInteractive = true;

                node.attachEvent('onreadystatechange', context.onScriptLoad);
                //It would be great to add an error handler here to catch
                //404s in IE9+. However, onreadystatechange will fire before
                //the error handler, so that does not help. If addEventListener
                //is used, then IE will fire error before load, but we cannot
                //use that pathway given the connect.microsoft.com issue
                //mentioned above about not doing the 'script execute,
                //then fire the script load event listener before execute
                //next script' that other browsers do.
                //Best hope: IE10 fixes the issues,
                //and then destroys all installs of IE 6-9.
                //node.attachEvent('onerror', context.onScriptError);
            } else {
                node.addEventListener('load', context.onScriptLoad, false);
                node.addEventListener('error', context.onScriptError, false);
            }
            node.src = url;

            //Calling onNodeCreated after all properties on the node have been
            //set, but before it is placed in the DOM.
            if (config.onNodeCreated) {
                config.onNodeCreated(node, config, moduleName, url);
            }

            //For some cache cases in IE 6-8, the script executes before the end
            //of the appendChild execution, so to tie an anonymous define
            //call to the module name (which is stored on the node), hold on
            //to a reference to this node, but clear after the DOM insertion.
            currentlyAddingScript = node;
            if (baseElement) {
                head.insertBefore(node, baseElement);
            } else {
                head.appendChild(node);
            }
            currentlyAddingScript = null;

            return node;
        } else if (isWebWorker) {
            try {
                //In a web worker, use importScripts. This is not a very
                //efficient use of importScripts, importScripts will block until
                //its script is downloaded and evaluated. However, if web workers
                //are in play, the expectation is that a build has been done so
                //that only one script needs to be loaded anyway. This may need
                //to be reevaluated if other use cases become common.

                // Post a task to the event loop to work around a bug in WebKit
                // where the worker gets garbage-collected after calling
                // importScripts(): https://webkit.org/b/153317
                setTimeout(function() {}, 0);
                importScripts(url);

                //Account for anonymous modules
                context.completeLoad(moduleName);
            } catch (e) {
                context.onError(makeError('importscripts',
                                'importScripts failed for ' +
                                    moduleName + ' at ' + url,
                                e,
                                [moduleName]));
            }
        }
    };

    function getInteractiveScript() {
        if (interactiveScript && interactiveScript.readyState === 'interactive') {
            return interactiveScript;
        }

        eachReverse(scripts(), function (script) {
            if (script.readyState === 'interactive') {
                return (interactiveScript = script);
            }
        });
        return interactiveScript;
    }

    //Look for a data-main script attribute, which could also adjust the baseUrl.
    if (isBrowser && !cfg.skipDataMain) {
        //Figure out baseUrl. Get it from the script tag with require.js in it.
        eachReverse(scripts(), function (script) {
            //Set the 'head' where we can append children by
            //using the script's parent.
            if (!head) {
                head = script.parentNode;
            }

            //Look for a data-main attribute to set main script for the page
            //to load. If it is there, the path to data main becomes the
            //baseUrl, if it is not already set.
            dataMain = script.getAttribute('data-main');
            if (dataMain) {
                //Preserve dataMain in case it is a path (i.e. contains '?')
                mainScript = dataMain;

                //Set final baseUrl if there is not already an explicit one,
                //but only do so if the data-main value is not a loader plugin
                //module ID.
                if (!cfg.baseUrl && mainScript.indexOf('!') === -1) {
                    //Pull off the directory of data-main for use as the
                    //baseUrl.
                    src = mainScript.split('/');
                    mainScript = src.pop();
                    subPath = src.length ? src.join('/')  + '/' : './';

                    cfg.baseUrl = subPath;
                }

                //Strip off any trailing .js since mainScript is now
                //like a module name.
                mainScript = mainScript.replace(jsSuffixRegExp, '');

                //If mainScript is still a path, fall back to dataMain
                if (req.jsExtRegExp.test(mainScript)) {
                    mainScript = dataMain;
                }

                //Put the data-main script in the files to load.
                cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];

                return true;
            }
        });
    }

    /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
    define = function (name, deps, callback) {
        var node, context;

        //Allow for anonymous modules
        if (typeof name !== 'string') {
            //Adjust args appropriately
            callback = deps;
            deps = name;
            name = null;
        }

        //This module may not have dependencies
        if (!isArray(deps)) {
            callback = deps;
            deps = null;
        }

        //If no name, and callback is a function, then figure out if it a
        //CommonJS thing with dependencies.
        if (!deps && isFunction(callback)) {
            deps = [];
            //Remove comments from the callback string,
            //look for require calls, and pull them into the dependencies,
            //but only if there are function args.
            if (callback.length) {
                callback
                    .toString()
                    .replace(commentRegExp, commentReplace)
                    .replace(cjsRequireRegExp, function (match, dep) {
                        deps.push(dep);
                    });

                //May be a CommonJS thing even without require calls, but still
                //could use exports, and module. Avoid doing exports and module
                //work though if it just needs require.
                //REQUIRES the function to expect the CommonJS variables in the
                //order listed below.
                deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
            }
        }

        //If in IE 6-8 and hit an anonymous define() call, do the interactive
        //work.
        if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute('data-requiremodule');
                }
                context = contexts[node.getAttribute('data-requirecontext')];
            }
        }

        //Always save off evaluating the def call until the script onload handler.
        //This allows multiple modules to be in a file without prematurely
        //tracing dependencies, and allows for anonymous module support,
        //where the module name is not known until the script onload event
        //occurs. If no context, use the global queue, and get it processed
        //in the onscript load callback.
        if (context) {
            context.defQueue.push([name, deps, callback]);
            context.defQueueMap[name] = true;
        } else {
            globalDefQueue.push([name, deps, callback]);
        }
    };

    define.amd = {
        jQuery: true
    };

    /**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
    req.exec = function (text) {
        /*jslint evil: true */
        return eval(text);
    };

    //Set up with config info.
    req(cfg);
}(this, (typeof setTimeout === 'undefined' ? undefined : setTimeout)));

define("../node_modules/requirejs/require", function(){});

/*!
 * Knockout JavaScript library v3.5.1
 * (c) The Knockout.js team - http://knockoutjs.com/
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function() {(function(n){var A=this||(0,eval)("this"),w=A.document,R=A.navigator,v=A.jQuery,H=A.JSON;v||"undefined"===typeof jQuery||(v=jQuery);(function(n){"function"===typeof define&&define.amd?define('knockout',["exports","require"],n):"object"===typeof exports&&"object"===typeof module?n(module.exports||exports):n(A.ko={})})(function(S,T){function K(a,c){return null===a||typeof a in W?a===c:!1}function X(b,c){var d;return function(){d||(d=a.a.setTimeout(function(){d=n;b()},c))}}function Y(b,c){var d;return function(){clearTimeout(d);
d=a.a.setTimeout(b,c)}}function Z(a,c){c&&"change"!==c?"beforeChange"===c?this.pc(a):this.gb(a,c):this.qc(a)}function aa(a,c){null!==c&&c.s&&c.s()}function ba(a,c){var d=this.qd,e=d[r];e.ra||(this.Qb&&this.mb[c]?(d.uc(c,a,this.mb[c]),this.mb[c]=null,--this.Qb):e.I[c]||d.uc(c,a,e.J?{da:a}:d.$c(a)),a.Ja&&a.gd())}var a="undefined"!==typeof S?S:{};a.b=function(b,c){for(var d=b.split("."),e=a,f=0;f<d.length-1;f++)e=e[d[f]];e[d[d.length-1]]=c};a.L=function(a,c,d){a[c]=d};a.version="3.5.1";a.b("version",
a.version);a.options={deferUpdates:!1,useOnlyNativeEvents:!1,foreachHidesDestroyed:!1};a.a=function(){function b(a,b){for(var c in a)f.call(a,c)&&b(c,a[c])}function c(a,b){if(b)for(var c in b)f.call(b,c)&&(a[c]=b[c]);return a}function d(a,b){a.__proto__=b;return a}function e(b,c,d,e){var l=b[c].match(q)||[];a.a.D(d.match(q),function(b){a.a.Na(l,b,e)});b[c]=l.join(" ")}var f=Object.prototype.hasOwnProperty,g={__proto__:[]}instanceof Array,h="function"===typeof Symbol,m={},k={};m[R&&/Firefox\/2/i.test(R.userAgent)?
"KeyboardEvent":"UIEvents"]=["keyup","keydown","keypress"];m.MouseEvents="click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" ");b(m,function(a,b){if(b.length)for(var c=0,d=b.length;c<d;c++)k[b[c]]=a});var l={propertychange:!0},p=w&&function(){for(var a=3,b=w.createElement("div"),c=b.getElementsByTagName("i");b.innerHTML="\x3c!--[if gt IE "+ ++a+"]><i></i><![endif]--\x3e",c[0];);return 4<a?a:n}(),q=/\S+/g,t;return{Jc:["authenticity_token",/^__RequestVerificationToken(_.*)?$/],
D:function(a,b,c){for(var d=0,e=a.length;d<e;d++)b.call(c,a[d],d,a)},A:"function"==typeof Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b)}:function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},Lb:function(a,b,c){for(var d=0,e=a.length;d<e;d++)if(b.call(c,a[d],d,a))return a[d];return n},Pa:function(b,c){var d=a.a.A(b,c);0<d?b.splice(d,1):0===d&&b.shift()},wc:function(b){var c=[];b&&a.a.D(b,function(b){0>a.a.A(c,b)&&c.push(b)});return c},Mb:function(a,
b,c){var d=[];if(a)for(var e=0,l=a.length;e<l;e++)d.push(b.call(c,a[e],e));return d},jb:function(a,b,c){var d=[];if(a)for(var e=0,l=a.length;e<l;e++)b.call(c,a[e],e)&&d.push(a[e]);return d},Nb:function(a,b){if(b instanceof Array)a.push.apply(a,b);else for(var c=0,d=b.length;c<d;c++)a.push(b[c]);return a},Na:function(b,c,d){var e=a.a.A(a.a.bc(b),c);0>e?d&&b.push(c):d||b.splice(e,1)},Ba:g,extend:c,setPrototypeOf:d,Ab:g?d:c,P:b,Ga:function(a,b,c){if(!a)return a;var d={},e;for(e in a)f.call(a,e)&&(d[e]=
b.call(c,a[e],e,a));return d},Tb:function(b){for(;b.firstChild;)a.removeNode(b.firstChild)},Yb:function(b){b=a.a.la(b);for(var c=(b[0]&&b[0].ownerDocument||w).createElement("div"),d=0,e=b.length;d<e;d++)c.appendChild(a.oa(b[d]));return c},Ca:function(b,c){for(var d=0,e=b.length,l=[];d<e;d++){var k=b[d].cloneNode(!0);l.push(c?a.oa(k):k)}return l},va:function(b,c){a.a.Tb(b);if(c)for(var d=0,e=c.length;d<e;d++)b.appendChild(c[d])},Xc:function(b,c){var d=b.nodeType?[b]:b;if(0<d.length){for(var e=d[0],
l=e.parentNode,k=0,f=c.length;k<f;k++)l.insertBefore(c[k],e);k=0;for(f=d.length;k<f;k++)a.removeNode(d[k])}},Ua:function(a,b){if(a.length){for(b=8===b.nodeType&&b.parentNode||b;a.length&&a[0].parentNode!==b;)a.splice(0,1);for(;1<a.length&&a[a.length-1].parentNode!==b;)a.length--;if(1<a.length){var c=a[0],d=a[a.length-1];for(a.length=0;c!==d;)a.push(c),c=c.nextSibling;a.push(d)}}return a},Zc:function(a,b){7>p?a.setAttribute("selected",b):a.selected=b},Db:function(a){return null===a||a===n?"":a.trim?
a.trim():a.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},Ud:function(a,b){a=a||"";return b.length>a.length?!1:a.substring(0,b.length)===b},vd:function(a,b){if(a===b)return!0;if(11===a.nodeType)return!1;if(b.contains)return b.contains(1!==a.nodeType?a.parentNode:a);if(b.compareDocumentPosition)return 16==(b.compareDocumentPosition(a)&16);for(;a&&a!=b;)a=a.parentNode;return!!a},Sb:function(b){return a.a.vd(b,b.ownerDocument.documentElement)},kd:function(b){return!!a.a.Lb(b,a.a.Sb)},R:function(a){return a&&
a.tagName&&a.tagName.toLowerCase()},Ac:function(b){return a.onError?function(){try{return b.apply(this,arguments)}catch(c){throw a.onError&&a.onError(c),c;}}:b},setTimeout:function(b,c){return setTimeout(a.a.Ac(b),c)},Gc:function(b){setTimeout(function(){a.onError&&a.onError(b);throw b;},0)},B:function(b,c,d){var e=a.a.Ac(d);d=l[c];if(a.options.useOnlyNativeEvents||d||!v)if(d||"function"!=typeof b.addEventListener)if("undefined"!=typeof b.attachEvent){var k=function(a){e.call(b,a)},f="on"+c;b.attachEvent(f,
k);a.a.K.za(b,function(){b.detachEvent(f,k)})}else throw Error("Browser doesn't support addEventListener or attachEvent");else b.addEventListener(c,e,!1);else t||(t="function"==typeof v(b).on?"on":"bind"),v(b)[t](c,e)},Fb:function(b,c){if(!b||!b.nodeType)throw Error("element must be a DOM node when calling triggerEvent");var d;"input"===a.a.R(b)&&b.type&&"click"==c.toLowerCase()?(d=b.type,d="checkbox"==d||"radio"==d):d=!1;if(a.options.useOnlyNativeEvents||!v||d)if("function"==typeof w.createEvent)if("function"==
typeof b.dispatchEvent)d=w.createEvent(k[c]||"HTMLEvents"),d.initEvent(c,!0,!0,A,0,0,0,0,0,!1,!1,!1,!1,0,b),b.dispatchEvent(d);else throw Error("The supplied element doesn't support dispatchEvent");else if(d&&b.click)b.click();else if("undefined"!=typeof b.fireEvent)b.fireEvent("on"+c);else throw Error("Browser doesn't support triggering events");else v(b).trigger(c)},f:function(b){return a.O(b)?b():b},bc:function(b){return a.O(b)?b.v():b},Eb:function(b,c,d){var l;c&&("object"===typeof b.classList?
(l=b.classList[d?"add":"remove"],a.a.D(c.match(q),function(a){l.call(b.classList,a)})):"string"===typeof b.className.baseVal?e(b.className,"baseVal",c,d):e(b,"className",c,d))},Bb:function(b,c){var d=a.a.f(c);if(null===d||d===n)d="";var e=a.h.firstChild(b);!e||3!=e.nodeType||a.h.nextSibling(e)?a.h.va(b,[b.ownerDocument.createTextNode(d)]):e.data=d;a.a.Ad(b)},Yc:function(a,b){a.name=b;if(7>=p)try{var c=a.name.replace(/[&<>'"]/g,function(a){return"&#"+a.charCodeAt(0)+";"});a.mergeAttributes(w.createElement("<input name='"+
c+"'/>"),!1)}catch(d){}},Ad:function(a){9<=p&&(a=1==a.nodeType?a:a.parentNode,a.style&&(a.style.zoom=a.style.zoom))},wd:function(a){if(p){var b=a.style.width;a.style.width=0;a.style.width=b}},Pd:function(b,c){b=a.a.f(b);c=a.a.f(c);for(var d=[],e=b;e<=c;e++)d.push(e);return d},la:function(a){for(var b=[],c=0,d=a.length;c<d;c++)b.push(a[c]);return b},Da:function(a){return h?Symbol(a):a},Zd:6===p,$d:7===p,W:p,Lc:function(b,c){for(var d=a.a.la(b.getElementsByTagName("input")).concat(a.a.la(b.getElementsByTagName("textarea"))),
e="string"==typeof c?function(a){return a.name===c}:function(a){return c.test(a.name)},l=[],k=d.length-1;0<=k;k--)e(d[k])&&l.push(d[k]);return l},Nd:function(b){return"string"==typeof b&&(b=a.a.Db(b))?H&&H.parse?H.parse(b):(new Function("return "+b))():null},hc:function(b,c,d){if(!H||!H.stringify)throw Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
return H.stringify(a.a.f(b),c,d)},Od:function(c,d,e){e=e||{};var l=e.params||{},k=e.includeFields||this.Jc,f=c;if("object"==typeof c&&"form"===a.a.R(c))for(var f=c.action,h=k.length-1;0<=h;h--)for(var g=a.a.Lc(c,k[h]),m=g.length-1;0<=m;m--)l[g[m].name]=g[m].value;d=a.a.f(d);var p=w.createElement("form");p.style.display="none";p.action=f;p.method="post";for(var q in d)c=w.createElement("input"),c.type="hidden",c.name=q,c.value=a.a.hc(a.a.f(d[q])),p.appendChild(c);b(l,function(a,b){var c=w.createElement("input");
c.type="hidden";c.name=a;c.value=b;p.appendChild(c)});w.body.appendChild(p);e.submitter?e.submitter(p):p.submit();setTimeout(function(){p.parentNode.removeChild(p)},0)}}}();a.b("utils",a.a);a.b("utils.arrayForEach",a.a.D);a.b("utils.arrayFirst",a.a.Lb);a.b("utils.arrayFilter",a.a.jb);a.b("utils.arrayGetDistinctValues",a.a.wc);a.b("utils.arrayIndexOf",a.a.A);a.b("utils.arrayMap",a.a.Mb);a.b("utils.arrayPushAll",a.a.Nb);a.b("utils.arrayRemoveItem",a.a.Pa);a.b("utils.cloneNodes",a.a.Ca);a.b("utils.createSymbolOrString",
a.a.Da);a.b("utils.extend",a.a.extend);a.b("utils.fieldsIncludedWithJsonPost",a.a.Jc);a.b("utils.getFormFields",a.a.Lc);a.b("utils.objectMap",a.a.Ga);a.b("utils.peekObservable",a.a.bc);a.b("utils.postJson",a.a.Od);a.b("utils.parseJson",a.a.Nd);a.b("utils.registerEventHandler",a.a.B);a.b("utils.stringifyJson",a.a.hc);a.b("utils.range",a.a.Pd);a.b("utils.toggleDomNodeCssClass",a.a.Eb);a.b("utils.triggerEvent",a.a.Fb);a.b("utils.unwrapObservable",a.a.f);a.b("utils.objectForEach",a.a.P);a.b("utils.addOrRemoveItem",
a.a.Na);a.b("utils.setTextContent",a.a.Bb);a.b("unwrap",a.a.f);Function.prototype.bind||(Function.prototype.bind=function(a){var c=this;if(1===arguments.length)return function(){return c.apply(a,arguments)};var d=Array.prototype.slice.call(arguments,1);return function(){var e=d.slice(0);e.push.apply(e,arguments);return c.apply(a,e)}});a.a.g=new function(){var b=0,c="__ko__"+(new Date).getTime(),d={},e,f;a.a.W?(e=function(a,e){var f=a[c];if(!f||"null"===f||!d[f]){if(!e)return n;f=a[c]="ko"+b++;d[f]=
{}}return d[f]},f=function(a){var b=a[c];return b?(delete d[b],a[c]=null,!0):!1}):(e=function(a,b){var d=a[c];!d&&b&&(d=a[c]={});return d},f=function(a){return a[c]?(delete a[c],!0):!1});return{get:function(a,b){var c=e(a,!1);return c&&c[b]},set:function(a,b,c){(a=e(a,c!==n))&&(a[b]=c)},Ub:function(a,b,c){a=e(a,!0);return a[b]||(a[b]=c)},clear:f,Z:function(){return b++ +c}}};a.b("utils.domData",a.a.g);a.b("utils.domData.clear",a.a.g.clear);a.a.K=new function(){function b(b,c){var d=a.a.g.get(b,e);
d===n&&c&&(d=[],a.a.g.set(b,e,d));return d}function c(c){var e=b(c,!1);if(e)for(var e=e.slice(0),k=0;k<e.length;k++)e[k](c);a.a.g.clear(c);a.a.K.cleanExternalData(c);g[c.nodeType]&&d(c.childNodes,!0)}function d(b,d){for(var e=[],l,f=0;f<b.length;f++)if(!d||8===b[f].nodeType)if(c(e[e.length]=l=b[f]),b[f]!==l)for(;f--&&-1==a.a.A(e,b[f]););}var e=a.a.g.Z(),f={1:!0,8:!0,9:!0},g={1:!0,9:!0};return{za:function(a,c){if("function"!=typeof c)throw Error("Callback must be a function");b(a,!0).push(c)},yb:function(c,
d){var f=b(c,!1);f&&(a.a.Pa(f,d),0==f.length&&a.a.g.set(c,e,n))},oa:function(b){a.u.G(function(){f[b.nodeType]&&(c(b),g[b.nodeType]&&d(b.getElementsByTagName("*")))});return b},removeNode:function(b){a.oa(b);b.parentNode&&b.parentNode.removeChild(b)},cleanExternalData:function(a){v&&"function"==typeof v.cleanData&&v.cleanData([a])}}};a.oa=a.a.K.oa;a.removeNode=a.a.K.removeNode;a.b("cleanNode",a.oa);a.b("removeNode",a.removeNode);a.b("utils.domNodeDisposal",a.a.K);a.b("utils.domNodeDisposal.addDisposeCallback",
a.a.K.za);a.b("utils.domNodeDisposal.removeDisposeCallback",a.a.K.yb);(function(){var b=[0,"",""],c=[1,"<table>","</table>"],d=[3,"<table><tbody><tr>","</tr></tbody></table>"],e=[1,"<select multiple='multiple'>","</select>"],f={thead:c,tbody:c,tfoot:c,tr:[2,"<table><tbody>","</tbody></table>"],td:d,th:d,option:e,optgroup:e},g=8>=a.a.W;a.a.ua=function(c,d){var e;if(v)if(v.parseHTML)e=v.parseHTML(c,d)||[];else{if((e=v.clean([c],d))&&e[0]){for(var l=e[0];l.parentNode&&11!==l.parentNode.nodeType;)l=l.parentNode;
l.parentNode&&l.parentNode.removeChild(l)}}else{(e=d)||(e=w);var l=e.parentWindow||e.defaultView||A,p=a.a.Db(c).toLowerCase(),q=e.createElement("div"),t;t=(p=p.match(/^(?:\x3c!--.*?--\x3e\s*?)*?<([a-z]+)[\s>]/))&&f[p[1]]||b;p=t[0];t="ignored<div>"+t[1]+c+t[2]+"</div>";"function"==typeof l.innerShiv?q.appendChild(l.innerShiv(t)):(g&&e.body.appendChild(q),q.innerHTML=t,g&&q.parentNode.removeChild(q));for(;p--;)q=q.lastChild;e=a.a.la(q.lastChild.childNodes)}return e};a.a.Md=function(b,c){var d=a.a.ua(b,
c);return d.length&&d[0].parentElement||a.a.Yb(d)};a.a.fc=function(b,c){a.a.Tb(b);c=a.a.f(c);if(null!==c&&c!==n)if("string"!=typeof c&&(c=c.toString()),v)v(b).html(c);else for(var d=a.a.ua(c,b.ownerDocument),e=0;e<d.length;e++)b.appendChild(d[e])}})();a.b("utils.parseHtmlFragment",a.a.ua);a.b("utils.setHtml",a.a.fc);a.aa=function(){function b(c,e){if(c)if(8==c.nodeType){var f=a.aa.Uc(c.nodeValue);null!=f&&e.push({ud:c,Kd:f})}else if(1==c.nodeType)for(var f=0,g=c.childNodes,h=g.length;f<h;f++)b(g[f],
e)}var c={};return{Xb:function(a){if("function"!=typeof a)throw Error("You can only pass a function to ko.memoization.memoize()");var b=(4294967296*(1+Math.random())|0).toString(16).substring(1)+(4294967296*(1+Math.random())|0).toString(16).substring(1);c[b]=a;return"\x3c!--[ko_memo:"+b+"]--\x3e"},bd:function(a,b){var f=c[a];if(f===n)throw Error("Couldn't find any memo with ID "+a+". Perhaps it's already been unmemoized.");try{return f.apply(null,b||[]),!0}finally{delete c[a]}},cd:function(c,e){var f=
[];b(c,f);for(var g=0,h=f.length;g<h;g++){var m=f[g].ud,k=[m];e&&a.a.Nb(k,e);a.aa.bd(f[g].Kd,k);m.nodeValue="";m.parentNode&&m.parentNode.removeChild(m)}},Uc:function(a){return(a=a.match(/^\[ko_memo\:(.*?)\]$/))?a[1]:null}}}();a.b("memoization",a.aa);a.b("memoization.memoize",a.aa.Xb);a.b("memoization.unmemoize",a.aa.bd);a.b("memoization.parseMemoText",a.aa.Uc);a.b("memoization.unmemoizeDomNodeAndDescendants",a.aa.cd);a.na=function(){function b(){if(f)for(var b=f,c=0,d;h<f;)if(d=e[h++]){if(h>b){if(5E3<=
++c){h=f;a.a.Gc(Error("'Too much recursion' after processing "+c+" task groups."));break}b=f}try{d()}catch(p){a.a.Gc(p)}}}function c(){b();h=f=e.length=0}var d,e=[],f=0,g=1,h=0;A.MutationObserver?d=function(a){var b=w.createElement("div");(new MutationObserver(a)).observe(b,{attributes:!0});return function(){b.classList.toggle("foo")}}(c):d=w&&"onreadystatechange"in w.createElement("script")?function(a){var b=w.createElement("script");b.onreadystatechange=function(){b.onreadystatechange=null;w.documentElement.removeChild(b);
b=null;a()};w.documentElement.appendChild(b)}:function(a){setTimeout(a,0)};return{scheduler:d,zb:function(b){f||a.na.scheduler(c);e[f++]=b;return g++},cancel:function(a){a=a-(g-f);a>=h&&a<f&&(e[a]=null)},resetForTesting:function(){var a=f-h;h=f=e.length=0;return a},Sd:b}}();a.b("tasks",a.na);a.b("tasks.schedule",a.na.zb);a.b("tasks.runEarly",a.na.Sd);a.Ta={throttle:function(b,c){b.throttleEvaluation=c;var d=null;return a.$({read:b,write:function(e){clearTimeout(d);d=a.a.setTimeout(function(){b(e)},
c)}})},rateLimit:function(a,c){var d,e,f;"number"==typeof c?d=c:(d=c.timeout,e=c.method);a.Hb=!1;f="function"==typeof e?e:"notifyWhenChangesStop"==e?Y:X;a.ub(function(a){return f(a,d,c)})},deferred:function(b,c){if(!0!==c)throw Error("The 'deferred' extender only accepts the value 'true', because it is not supported to turn deferral off once enabled.");b.Hb||(b.Hb=!0,b.ub(function(c){var e,f=!1;return function(){if(!f){a.na.cancel(e);e=a.na.zb(c);try{f=!0,b.notifySubscribers(n,"dirty")}finally{f=
!1}}}}))},notify:function(a,c){a.equalityComparer="always"==c?null:K}};var W={undefined:1,"boolean":1,number:1,string:1};a.b("extenders",a.Ta);a.ic=function(b,c,d){this.da=b;this.lc=c;this.mc=d;this.Ib=!1;this.fb=this.Jb=null;a.L(this,"dispose",this.s);a.L(this,"disposeWhenNodeIsRemoved",this.l)};a.ic.prototype.s=function(){this.Ib||(this.fb&&a.a.K.yb(this.Jb,this.fb),this.Ib=!0,this.mc(),this.da=this.lc=this.mc=this.Jb=this.fb=null)};a.ic.prototype.l=function(b){this.Jb=b;a.a.K.za(b,this.fb=this.s.bind(this))};
a.T=function(){a.a.Ab(this,D);D.qb(this)};var D={qb:function(a){a.U={change:[]};a.sc=1},subscribe:function(b,c,d){var e=this;d=d||"change";var f=new a.ic(e,c?b.bind(c):b,function(){a.a.Pa(e.U[d],f);e.hb&&e.hb(d)});e.Qa&&e.Qa(d);e.U[d]||(e.U[d]=[]);e.U[d].push(f);return f},notifySubscribers:function(b,c){c=c||"change";"change"===c&&this.Gb();if(this.Wa(c)){var d="change"===c&&this.ed||this.U[c].slice(0);try{a.u.xc();for(var e=0,f;f=d[e];++e)f.Ib||f.lc(b)}finally{a.u.end()}}},ob:function(){return this.sc},
Dd:function(a){return this.ob()!==a},Gb:function(){++this.sc},ub:function(b){var c=this,d=a.O(c),e,f,g,h,m;c.gb||(c.gb=c.notifySubscribers,c.notifySubscribers=Z);var k=b(function(){c.Ja=!1;d&&h===c&&(h=c.nc?c.nc():c());var a=f||m&&c.sb(g,h);m=f=e=!1;a&&c.gb(g=h)});c.qc=function(a,b){b&&c.Ja||(m=!b);c.ed=c.U.change.slice(0);c.Ja=e=!0;h=a;k()};c.pc=function(a){e||(g=a,c.gb(a,"beforeChange"))};c.rc=function(){m=!0};c.gd=function(){c.sb(g,c.v(!0))&&(f=!0)}},Wa:function(a){return this.U[a]&&this.U[a].length},
Bd:function(b){if(b)return this.U[b]&&this.U[b].length||0;var c=0;a.a.P(this.U,function(a,b){"dirty"!==a&&(c+=b.length)});return c},sb:function(a,c){return!this.equalityComparer||!this.equalityComparer(a,c)},toString:function(){return"[object Object]"},extend:function(b){var c=this;b&&a.a.P(b,function(b,e){var f=a.Ta[b];"function"==typeof f&&(c=f(c,e)||c)});return c}};a.L(D,"init",D.qb);a.L(D,"subscribe",D.subscribe);a.L(D,"extend",D.extend);a.L(D,"getSubscriptionsCount",D.Bd);a.a.Ba&&a.a.setPrototypeOf(D,
Function.prototype);a.T.fn=D;a.Qc=function(a){return null!=a&&"function"==typeof a.subscribe&&"function"==typeof a.notifySubscribers};a.b("subscribable",a.T);a.b("isSubscribable",a.Qc);a.S=a.u=function(){function b(a){d.push(e);e=a}function c(){e=d.pop()}var d=[],e,f=0;return{xc:b,end:c,cc:function(b){if(e){if(!a.Qc(b))throw Error("Only subscribable things can act as dependencies");e.od.call(e.pd,b,b.fd||(b.fd=++f))}},G:function(a,d,e){try{return b(),a.apply(d,e||[])}finally{c()}},qa:function(){if(e)return e.o.qa()},
Va:function(){if(e)return e.o.Va()},Ya:function(){if(e)return e.Ya},o:function(){if(e)return e.o}}}();a.b("computedContext",a.S);a.b("computedContext.getDependenciesCount",a.S.qa);a.b("computedContext.getDependencies",a.S.Va);a.b("computedContext.isInitial",a.S.Ya);a.b("computedContext.registerDependency",a.S.cc);a.b("ignoreDependencies",a.Yd=a.u.G);var I=a.a.Da("_latestValue");a.ta=function(b){function c(){if(0<arguments.length)return c.sb(c[I],arguments[0])&&(c.ya(),c[I]=arguments[0],c.xa()),this;
a.u.cc(c);return c[I]}c[I]=b;a.a.Ba||a.a.extend(c,a.T.fn);a.T.fn.qb(c);a.a.Ab(c,F);a.options.deferUpdates&&a.Ta.deferred(c,!0);return c};var F={equalityComparer:K,v:function(){return this[I]},xa:function(){this.notifySubscribers(this[I],"spectate");this.notifySubscribers(this[I])},ya:function(){this.notifySubscribers(this[I],"beforeChange")}};a.a.Ba&&a.a.setPrototypeOf(F,a.T.fn);var G=a.ta.Ma="__ko_proto__";F[G]=a.ta;a.O=function(b){if((b="function"==typeof b&&b[G])&&b!==F[G]&&b!==a.o.fn[G])throw Error("Invalid object that looks like an observable; possibly from another Knockout instance");
return!!b};a.Za=function(b){return"function"==typeof b&&(b[G]===F[G]||b[G]===a.o.fn[G]&&b.Nc)};a.b("observable",a.ta);a.b("isObservable",a.O);a.b("isWriteableObservable",a.Za);a.b("isWritableObservable",a.Za);a.b("observable.fn",F);a.L(F,"peek",F.v);a.L(F,"valueHasMutated",F.xa);a.L(F,"valueWillMutate",F.ya);a.Ha=function(b){b=b||[];if("object"!=typeof b||!("length"in b))throw Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");b=a.ta(b);a.a.Ab(b,
a.Ha.fn);return b.extend({trackArrayChanges:!0})};a.Ha.fn={remove:function(b){for(var c=this.v(),d=[],e="function"!=typeof b||a.O(b)?function(a){return a===b}:b,f=0;f<c.length;f++){var g=c[f];if(e(g)){0===d.length&&this.ya();if(c[f]!==g)throw Error("Array modified during remove; cannot remove item");d.push(g);c.splice(f,1);f--}}d.length&&this.xa();return d},removeAll:function(b){if(b===n){var c=this.v(),d=c.slice(0);this.ya();c.splice(0,c.length);this.xa();return d}return b?this.remove(function(c){return 0<=
a.a.A(b,c)}):[]},destroy:function(b){var c=this.v(),d="function"!=typeof b||a.O(b)?function(a){return a===b}:b;this.ya();for(var e=c.length-1;0<=e;e--){var f=c[e];d(f)&&(f._destroy=!0)}this.xa()},destroyAll:function(b){return b===n?this.destroy(function(){return!0}):b?this.destroy(function(c){return 0<=a.a.A(b,c)}):[]},indexOf:function(b){var c=this();return a.a.A(c,b)},replace:function(a,c){var d=this.indexOf(a);0<=d&&(this.ya(),this.v()[d]=c,this.xa())},sorted:function(a){var c=this().slice(0);
return a?c.sort(a):c.sort()},reversed:function(){return this().slice(0).reverse()}};a.a.Ba&&a.a.setPrototypeOf(a.Ha.fn,a.ta.fn);a.a.D("pop push reverse shift sort splice unshift".split(" "),function(b){a.Ha.fn[b]=function(){var a=this.v();this.ya();this.zc(a,b,arguments);var d=a[b].apply(a,arguments);this.xa();return d===a?this:d}});a.a.D(["slice"],function(b){a.Ha.fn[b]=function(){var a=this();return a[b].apply(a,arguments)}});a.Pc=function(b){return a.O(b)&&"function"==typeof b.remove&&"function"==
typeof b.push};a.b("observableArray",a.Ha);a.b("isObservableArray",a.Pc);a.Ta.trackArrayChanges=function(b,c){function d(){function c(){if(m){var d=[].concat(b.v()||[]),e;if(b.Wa("arrayChange")){if(!f||1<m)f=a.a.Pb(k,d,b.Ob);e=f}k=d;f=null;m=0;e&&e.length&&b.notifySubscribers(e,"arrayChange")}}e?c():(e=!0,h=b.subscribe(function(){++m},null,"spectate"),k=[].concat(b.v()||[]),f=null,g=b.subscribe(c))}b.Ob={};c&&"object"==typeof c&&a.a.extend(b.Ob,c);b.Ob.sparse=!0;if(!b.zc){var e=!1,f=null,g,h,m=0,
k,l=b.Qa,p=b.hb;b.Qa=function(a){l&&l.call(b,a);"arrayChange"===a&&d()};b.hb=function(a){p&&p.call(b,a);"arrayChange"!==a||b.Wa("arrayChange")||(g&&g.s(),h&&h.s(),h=g=null,e=!1,k=n)};b.zc=function(b,c,d){function l(a,b,c){return k[k.length]={status:a,value:b,index:c}}if(e&&!m){var k=[],p=b.length,g=d.length,h=0;switch(c){case "push":h=p;case "unshift":for(c=0;c<g;c++)l("added",d[c],h+c);break;case "pop":h=p-1;case "shift":p&&l("deleted",b[h],h);break;case "splice":c=Math.min(Math.max(0,0>d[0]?p+d[0]:
d[0]),p);for(var p=1===g?p:Math.min(c+(d[1]||0),p),g=c+g-2,h=Math.max(p,g),U=[],L=[],n=2;c<h;++c,++n)c<p&&L.push(l("deleted",b[c],c)),c<g&&U.push(l("added",d[n],c));a.a.Kc(L,U);break;default:return}f=k}}}};var r=a.a.Da("_state");a.o=a.$=function(b,c,d){function e(){if(0<arguments.length){if("function"===typeof f)f.apply(g.nb,arguments);else throw Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");return this}g.ra||
a.u.cc(e);(g.ka||g.J&&e.Xa())&&e.ha();return g.X}"object"===typeof b?d=b:(d=d||{},b&&(d.read=b));if("function"!=typeof d.read)throw Error("Pass a function that returns the value of the ko.computed");var f=d.write,g={X:n,sa:!0,ka:!0,rb:!1,jc:!1,ra:!1,wb:!1,J:!1,Wc:d.read,nb:c||d.owner,l:d.disposeWhenNodeIsRemoved||d.l||null,Sa:d.disposeWhen||d.Sa,Rb:null,I:{},V:0,Ic:null};e[r]=g;e.Nc="function"===typeof f;a.a.Ba||a.a.extend(e,a.T.fn);a.T.fn.qb(e);a.a.Ab(e,C);d.pure?(g.wb=!0,g.J=!0,a.a.extend(e,da)):
d.deferEvaluation&&a.a.extend(e,ea);a.options.deferUpdates&&a.Ta.deferred(e,!0);g.l&&(g.jc=!0,g.l.nodeType||(g.l=null));g.J||d.deferEvaluation||e.ha();g.l&&e.ja()&&a.a.K.za(g.l,g.Rb=function(){e.s()});return e};var C={equalityComparer:K,qa:function(){return this[r].V},Va:function(){var b=[];a.a.P(this[r].I,function(a,d){b[d.Ka]=d.da});return b},Vb:function(b){if(!this[r].V)return!1;var c=this.Va();return-1!==a.a.A(c,b)?!0:!!a.a.Lb(c,function(a){return a.Vb&&a.Vb(b)})},uc:function(a,c,d){if(this[r].wb&&
c===this)throw Error("A 'pure' computed must not be called recursively");this[r].I[a]=d;d.Ka=this[r].V++;d.La=c.ob()},Xa:function(){var a,c,d=this[r].I;for(a in d)if(Object.prototype.hasOwnProperty.call(d,a)&&(c=d[a],this.Ia&&c.da.Ja||c.da.Dd(c.La)))return!0},Jd:function(){this.Ia&&!this[r].rb&&this.Ia(!1)},ja:function(){var a=this[r];return a.ka||0<a.V},Rd:function(){this.Ja?this[r].ka&&(this[r].sa=!0):this.Hc()},$c:function(a){if(a.Hb){var c=a.subscribe(this.Jd,this,"dirty"),d=a.subscribe(this.Rd,
this);return{da:a,s:function(){c.s();d.s()}}}return a.subscribe(this.Hc,this)},Hc:function(){var b=this,c=b.throttleEvaluation;c&&0<=c?(clearTimeout(this[r].Ic),this[r].Ic=a.a.setTimeout(function(){b.ha(!0)},c)):b.Ia?b.Ia(!0):b.ha(!0)},ha:function(b){var c=this[r],d=c.Sa,e=!1;if(!c.rb&&!c.ra){if(c.l&&!a.a.Sb(c.l)||d&&d()){if(!c.jc){this.s();return}}else c.jc=!1;c.rb=!0;try{e=this.zd(b)}finally{c.rb=!1}return e}},zd:function(b){var c=this[r],d=!1,e=c.wb?n:!c.V,d={qd:this,mb:c.I,Qb:c.V};a.u.xc({pd:d,
od:ba,o:this,Ya:e});c.I={};c.V=0;var f=this.yd(c,d);c.V?d=this.sb(c.X,f):(this.s(),d=!0);d&&(c.J?this.Gb():this.notifySubscribers(c.X,"beforeChange"),c.X=f,this.notifySubscribers(c.X,"spectate"),!c.J&&b&&this.notifySubscribers(c.X),this.rc&&this.rc());e&&this.notifySubscribers(c.X,"awake");return d},yd:function(b,c){try{var d=b.Wc;return b.nb?d.call(b.nb):d()}finally{a.u.end(),c.Qb&&!b.J&&a.a.P(c.mb,aa),b.sa=b.ka=!1}},v:function(a){var c=this[r];(c.ka&&(a||!c.V)||c.J&&this.Xa())&&this.ha();return c.X},
ub:function(b){a.T.fn.ub.call(this,b);this.nc=function(){this[r].J||(this[r].sa?this.ha():this[r].ka=!1);return this[r].X};this.Ia=function(a){this.pc(this[r].X);this[r].ka=!0;a&&(this[r].sa=!0);this.qc(this,!a)}},s:function(){var b=this[r];!b.J&&b.I&&a.a.P(b.I,function(a,b){b.s&&b.s()});b.l&&b.Rb&&a.a.K.yb(b.l,b.Rb);b.I=n;b.V=0;b.ra=!0;b.sa=!1;b.ka=!1;b.J=!1;b.l=n;b.Sa=n;b.Wc=n;this.Nc||(b.nb=n)}},da={Qa:function(b){var c=this,d=c[r];if(!d.ra&&d.J&&"change"==b){d.J=!1;if(d.sa||c.Xa())d.I=null,d.V=
0,c.ha()&&c.Gb();else{var e=[];a.a.P(d.I,function(a,b){e[b.Ka]=a});a.a.D(e,function(a,b){var e=d.I[a],m=c.$c(e.da);m.Ka=b;m.La=e.La;d.I[a]=m});c.Xa()&&c.ha()&&c.Gb()}d.ra||c.notifySubscribers(d.X,"awake")}},hb:function(b){var c=this[r];c.ra||"change"!=b||this.Wa("change")||(a.a.P(c.I,function(a,b){b.s&&(c.I[a]={da:b.da,Ka:b.Ka,La:b.La},b.s())}),c.J=!0,this.notifySubscribers(n,"asleep"))},ob:function(){var b=this[r];b.J&&(b.sa||this.Xa())&&this.ha();return a.T.fn.ob.call(this)}},ea={Qa:function(a){"change"!=
a&&"beforeChange"!=a||this.v()}};a.a.Ba&&a.a.setPrototypeOf(C,a.T.fn);var N=a.ta.Ma;C[N]=a.o;a.Oc=function(a){return"function"==typeof a&&a[N]===C[N]};a.Fd=function(b){return a.Oc(b)&&b[r]&&b[r].wb};a.b("computed",a.o);a.b("dependentObservable",a.o);a.b("isComputed",a.Oc);a.b("isPureComputed",a.Fd);a.b("computed.fn",C);a.L(C,"peek",C.v);a.L(C,"dispose",C.s);a.L(C,"isActive",C.ja);a.L(C,"getDependenciesCount",C.qa);a.L(C,"getDependencies",C.Va);a.xb=function(b,c){if("function"===typeof b)return a.o(b,
c,{pure:!0});b=a.a.extend({},b);b.pure=!0;return a.o(b,c)};a.b("pureComputed",a.xb);(function(){function b(a,f,g){g=g||new d;a=f(a);if("object"!=typeof a||null===a||a===n||a instanceof RegExp||a instanceof Date||a instanceof String||a instanceof Number||a instanceof Boolean)return a;var h=a instanceof Array?[]:{};g.save(a,h);c(a,function(c){var d=f(a[c]);switch(typeof d){case "boolean":case "number":case "string":case "function":h[c]=d;break;case "object":case "undefined":var l=g.get(d);h[c]=l!==
n?l:b(d,f,g)}});return h}function c(a,b){if(a instanceof Array){for(var c=0;c<a.length;c++)b(c);"function"==typeof a.toJSON&&b("toJSON")}else for(c in a)b(c)}function d(){this.keys=[];this.values=[]}a.ad=function(c){if(0==arguments.length)throw Error("When calling ko.toJS, pass the object you want to convert.");return b(c,function(b){for(var c=0;a.O(b)&&10>c;c++)b=b();return b})};a.toJSON=function(b,c,d){b=a.ad(b);return a.a.hc(b,c,d)};d.prototype={constructor:d,save:function(b,c){var d=a.a.A(this.keys,
b);0<=d?this.values[d]=c:(this.keys.push(b),this.values.push(c))},get:function(b){b=a.a.A(this.keys,b);return 0<=b?this.values[b]:n}}})();a.b("toJS",a.ad);a.b("toJSON",a.toJSON);a.Wd=function(b,c,d){function e(c){var e=a.xb(b,d).extend({ma:"always"}),h=e.subscribe(function(a){a&&(h.s(),c(a))});e.notifySubscribers(e.v());return h}return"function"!==typeof Promise||c?e(c.bind(d)):new Promise(e)};a.b("when",a.Wd);(function(){a.w={M:function(b){switch(a.a.R(b)){case "option":return!0===b.__ko__hasDomDataOptionValue__?
a.a.g.get(b,a.c.options.$b):7>=a.a.W?b.getAttributeNode("value")&&b.getAttributeNode("value").specified?b.value:b.text:b.value;case "select":return 0<=b.selectedIndex?a.w.M(b.options[b.selectedIndex]):n;default:return b.value}},cb:function(b,c,d){switch(a.a.R(b)){case "option":"string"===typeof c?(a.a.g.set(b,a.c.options.$b,n),"__ko__hasDomDataOptionValue__"in b&&delete b.__ko__hasDomDataOptionValue__,b.value=c):(a.a.g.set(b,a.c.options.$b,c),b.__ko__hasDomDataOptionValue__=!0,b.value="number"===
typeof c?c:"");break;case "select":if(""===c||null===c)c=n;for(var e=-1,f=0,g=b.options.length,h;f<g;++f)if(h=a.w.M(b.options[f]),h==c||""===h&&c===n){e=f;break}if(d||0<=e||c===n&&1<b.size)b.selectedIndex=e,6===a.a.W&&a.a.setTimeout(function(){b.selectedIndex=e},0);break;default:if(null===c||c===n)c="";b.value=c}}}})();a.b("selectExtensions",a.w);a.b("selectExtensions.readValue",a.w.M);a.b("selectExtensions.writeValue",a.w.cb);a.m=function(){function b(b){b=a.a.Db(b);123===b.charCodeAt(0)&&(b=b.slice(1,
-1));b+="\n,";var c=[],d=b.match(e),p,q=[],h=0;if(1<d.length){for(var x=0,B;B=d[x];++x){var u=B.charCodeAt(0);if(44===u){if(0>=h){c.push(p&&q.length?{key:p,value:q.join("")}:{unknown:p||q.join("")});p=h=0;q=[];continue}}else if(58===u){if(!h&&!p&&1===q.length){p=q.pop();continue}}else if(47===u&&1<B.length&&(47===B.charCodeAt(1)||42===B.charCodeAt(1)))continue;else 47===u&&x&&1<B.length?(u=d[x-1].match(f))&&!g[u[0]]&&(b=b.substr(b.indexOf(B)+1),d=b.match(e),x=-1,B="/"):40===u||123===u||91===u?++h:
41===u||125===u||93===u?--h:p||q.length||34!==u&&39!==u||(B=B.slice(1,-1));q.push(B)}if(0<h)throw Error("Unbalanced parentheses, braces, or brackets");}return c}var c=["true","false","null","undefined"],d=/^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i,e=RegExp("\"(?:\\\\.|[^\"])*\"|'(?:\\\\.|[^'])*'|`(?:\\\\.|[^`])*`|/\\*(?:[^*]|\\*+[^*/])*\\*+/|//.*\n|/(?:\\\\.|[^/])+/w*|[^\\s:,/][^,\"'`{}()/:[\\]]*[^\\s,\"'`{}()/:[\\]]|[^\\s]","g"),f=/[\])"'A-Za-z0-9_$]+$/,g={"in":1,"return":1,"typeof":1},
h={};return{Ra:[],wa:h,ac:b,vb:function(e,f){function l(b,e){var f;if(!x){var k=a.getBindingHandler(b);if(k&&k.preprocess&&!(e=k.preprocess(e,b,l)))return;if(k=h[b])f=e,0<=a.a.A(c,f)?f=!1:(k=f.match(d),f=null===k?!1:k[1]?"Object("+k[1]+")"+k[2]:f),k=f;k&&q.push("'"+("string"==typeof h[b]?h[b]:b)+"':function(_z){"+f+"=_z}")}g&&(e="function(){return "+e+" }");p.push("'"+b+"':"+e)}f=f||{};var p=[],q=[],g=f.valueAccessors,x=f.bindingParams,B="string"===typeof e?b(e):e;a.a.D(B,function(a){l(a.key||a.unknown,
a.value)});q.length&&l("_ko_property_writers","{"+q.join(",")+" }");return p.join(",")},Id:function(a,b){for(var c=0;c<a.length;c++)if(a[c].key==b)return!0;return!1},eb:function(b,c,d,e,f){if(b&&a.O(b))!a.Za(b)||f&&b.v()===e||b(e);else if((b=c.get("_ko_property_writers"))&&b[d])b[d](e)}}}();a.b("expressionRewriting",a.m);a.b("expressionRewriting.bindingRewriteValidators",a.m.Ra);a.b("expressionRewriting.parseObjectLiteral",a.m.ac);a.b("expressionRewriting.preProcessBindings",a.m.vb);a.b("expressionRewriting._twoWayBindings",
a.m.wa);a.b("jsonExpressionRewriting",a.m);a.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson",a.m.vb);(function(){function b(a){return 8==a.nodeType&&g.test(f?a.text:a.nodeValue)}function c(a){return 8==a.nodeType&&h.test(f?a.text:a.nodeValue)}function d(d,e){for(var f=d,h=1,g=[];f=f.nextSibling;){if(c(f)&&(a.a.g.set(f,k,!0),h--,0===h))return g;g.push(f);b(f)&&h++}if(!e)throw Error("Cannot find closing comment tag to match: "+d.nodeValue);return null}function e(a,b){var c=d(a,b);return c?
0<c.length?c[c.length-1].nextSibling:a.nextSibling:null}var f=w&&"\x3c!--test--\x3e"===w.createComment("test").text,g=f?/^\x3c!--\s*ko(?:\s+([\s\S]+))?\s*--\x3e$/:/^\s*ko(?:\s+([\s\S]+))?\s*$/,h=f?/^\x3c!--\s*\/ko\s*--\x3e$/:/^\s*\/ko\s*$/,m={ul:!0,ol:!0},k="__ko_matchedEndComment__";a.h={ea:{},childNodes:function(a){return b(a)?d(a):a.childNodes},Ea:function(c){if(b(c)){c=a.h.childNodes(c);for(var d=0,e=c.length;d<e;d++)a.removeNode(c[d])}else a.a.Tb(c)},va:function(c,d){if(b(c)){a.h.Ea(c);for(var e=
c.nextSibling,f=0,k=d.length;f<k;f++)e.parentNode.insertBefore(d[f],e)}else a.a.va(c,d)},Vc:function(a,c){var d;b(a)?(d=a.nextSibling,a=a.parentNode):d=a.firstChild;d?c!==d&&a.insertBefore(c,d):a.appendChild(c)},Wb:function(c,d,e){e?(e=e.nextSibling,b(c)&&(c=c.parentNode),e?d!==e&&c.insertBefore(d,e):c.appendChild(d)):a.h.Vc(c,d)},firstChild:function(a){if(b(a))return!a.nextSibling||c(a.nextSibling)?null:a.nextSibling;if(a.firstChild&&c(a.firstChild))throw Error("Found invalid end comment, as the first child of "+
a);return a.firstChild},nextSibling:function(d){b(d)&&(d=e(d));if(d.nextSibling&&c(d.nextSibling)){var f=d.nextSibling;if(c(f)&&!a.a.g.get(f,k))throw Error("Found end comment without a matching opening comment, as child of "+d);return null}return d.nextSibling},Cd:b,Vd:function(a){return(a=(f?a.text:a.nodeValue).match(g))?a[1]:null},Sc:function(d){if(m[a.a.R(d)]){var f=d.firstChild;if(f){do if(1===f.nodeType){var k;k=f.firstChild;var h=null;if(k){do if(h)h.push(k);else if(b(k)){var g=e(k,!0);g?k=
g:h=[k]}else c(k)&&(h=[k]);while(k=k.nextSibling)}if(k=h)for(h=f.nextSibling,g=0;g<k.length;g++)h?d.insertBefore(k[g],h):d.appendChild(k[g])}while(f=f.nextSibling)}}}}})();a.b("virtualElements",a.h);a.b("virtualElements.allowedBindings",a.h.ea);a.b("virtualElements.emptyNode",a.h.Ea);a.b("virtualElements.insertAfter",a.h.Wb);a.b("virtualElements.prepend",a.h.Vc);a.b("virtualElements.setDomNodeChildren",a.h.va);(function(){a.ga=function(){this.nd={}};a.a.extend(a.ga.prototype,{nodeHasBindings:function(b){switch(b.nodeType){case 1:return null!=
b.getAttribute("data-bind")||a.j.getComponentNameForNode(b);case 8:return a.h.Cd(b);default:return!1}},getBindings:function(b,c){var d=this.getBindingsString(b,c),d=d?this.parseBindingsString(d,c,b):null;return a.j.tc(d,b,c,!1)},getBindingAccessors:function(b,c){var d=this.getBindingsString(b,c),d=d?this.parseBindingsString(d,c,b,{valueAccessors:!0}):null;return a.j.tc(d,b,c,!0)},getBindingsString:function(b){switch(b.nodeType){case 1:return b.getAttribute("data-bind");case 8:return a.h.Vd(b);default:return null}},
parseBindingsString:function(b,c,d,e){try{var f=this.nd,g=b+(e&&e.valueAccessors||""),h;if(!(h=f[g])){var m,k="with($context){with($data||{}){return{"+a.m.vb(b,e)+"}}}";m=new Function("$context","$element",k);h=f[g]=m}return h(c,d)}catch(l){throw l.message="Unable to parse bindings.\nBindings value: "+b+"\nMessage: "+l.message,l;}}});a.ga.instance=new a.ga})();a.b("bindingProvider",a.ga);(function(){function b(b){var c=(b=a.a.g.get(b,z))&&b.N;c&&(b.N=null,c.Tc())}function c(c,d,e){this.node=c;this.yc=
d;this.kb=[];this.H=!1;d.N||a.a.K.za(c,b);e&&e.N&&(e.N.kb.push(c),this.Kb=e)}function d(a){return function(){return a}}function e(a){return a()}function f(b){return a.a.Ga(a.u.G(b),function(a,c){return function(){return b()[c]}})}function g(b,c,e){return"function"===typeof b?f(b.bind(null,c,e)):a.a.Ga(b,d)}function h(a,b){return f(this.getBindings.bind(this,a,b))}function m(b,c){var d=a.h.firstChild(c);if(d){var e,f=a.ga.instance,l=f.preprocessNode;if(l){for(;e=d;)d=a.h.nextSibling(e),l.call(f,e);
d=a.h.firstChild(c)}for(;e=d;)d=a.h.nextSibling(e),k(b,e)}a.i.ma(c,a.i.H)}function k(b,c){var d=b,e=1===c.nodeType;e&&a.h.Sc(c);if(e||a.ga.instance.nodeHasBindings(c))d=p(c,null,b).bindingContextForDescendants;d&&!u[a.a.R(c)]&&m(d,c)}function l(b){var c=[],d={},e=[];a.a.P(b,function ca(f){if(!d[f]){var k=a.getBindingHandler(f);k&&(k.after&&(e.push(f),a.a.D(k.after,function(c){if(b[c]){if(-1!==a.a.A(e,c))throw Error("Cannot combine the following bindings, because they have a cyclic dependency: "+e.join(", "));
ca(c)}}),e.length--),c.push({key:f,Mc:k}));d[f]=!0}});return c}function p(b,c,d){var f=a.a.g.Ub(b,z,{}),k=f.hd;if(!c){if(k)throw Error("You cannot apply bindings multiple times to the same element.");f.hd=!0}k||(f.context=d);f.Zb||(f.Zb={});var g;if(c&&"function"!==typeof c)g=c;else{var p=a.ga.instance,q=p.getBindingAccessors||h,m=a.$(function(){if(g=c?c(d,b):q.call(p,b,d)){if(d[t])d[t]();if(d[B])d[B]()}return g},null,{l:b});g&&m.ja()||(m=null)}var x=d,u;if(g){var J=function(){return a.a.Ga(m?m():
g,e)},r=m?function(a){return function(){return e(m()[a])}}:function(a){return g[a]};J.get=function(a){return g[a]&&e(r(a))};J.has=function(a){return a in g};a.i.H in g&&a.i.subscribe(b,a.i.H,function(){var c=(0,g[a.i.H])();if(c){var d=a.h.childNodes(b);d.length&&c(d,a.Ec(d[0]))}});a.i.pa in g&&(x=a.i.Cb(b,d),a.i.subscribe(b,a.i.pa,function(){var c=(0,g[a.i.pa])();c&&a.h.firstChild(b)&&c(b)}));f=l(g);a.a.D(f,function(c){var d=c.Mc.init,e=c.Mc.update,f=c.key;if(8===b.nodeType&&!a.h.ea[f])throw Error("The binding '"+
f+"' cannot be used with virtual elements");try{"function"==typeof d&&a.u.G(function(){var a=d(b,r(f),J,x.$data,x);if(a&&a.controlsDescendantBindings){if(u!==n)throw Error("Multiple bindings ("+u+" and "+f+") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");u=f}}),"function"==typeof e&&a.$(function(){e(b,r(f),J,x.$data,x)},null,{l:b})}catch(k){throw k.message='Unable to process binding "'+f+": "+g[f]+'"\nMessage: '+k.message,
k;}})}f=u===n;return{shouldBindDescendants:f,bindingContextForDescendants:f&&x}}function q(b,c){return b&&b instanceof a.fa?b:new a.fa(b,n,n,c)}var t=a.a.Da("_subscribable"),x=a.a.Da("_ancestorBindingInfo"),B=a.a.Da("_dataDependency");a.c={};var u={script:!0,textarea:!0,template:!0};a.getBindingHandler=function(b){return a.c[b]};var J={};a.fa=function(b,c,d,e,f){function k(){var b=p?h():h,f=a.a.f(b);c?(a.a.extend(l,c),x in c&&(l[x]=c[x])):(l.$parents=[],l.$root=f,l.ko=a);l[t]=q;g?f=l.$data:(l.$rawData=
b,l.$data=f);d&&(l[d]=f);e&&e(l,c,f);if(c&&c[t]&&!a.S.o().Vb(c[t]))c[t]();m&&(l[B]=m);return l.$data}var l=this,g=b===J,h=g?n:b,p="function"==typeof h&&!a.O(h),q,m=f&&f.dataDependency;f&&f.exportDependencies?k():(q=a.xb(k),q.v(),q.ja()?q.equalityComparer=null:l[t]=n)};a.fa.prototype.createChildContext=function(b,c,d,e){!e&&c&&"object"==typeof c&&(e=c,c=e.as,d=e.extend);if(c&&e&&e.noChildContext){var f="function"==typeof b&&!a.O(b);return new a.fa(J,this,null,function(a){d&&d(a);a[c]=f?b():b},e)}return new a.fa(b,
this,c,function(a,b){a.$parentContext=b;a.$parent=b.$data;a.$parents=(b.$parents||[]).slice(0);a.$parents.unshift(a.$parent);d&&d(a)},e)};a.fa.prototype.extend=function(b,c){return new a.fa(J,this,null,function(c){a.a.extend(c,"function"==typeof b?b(c):b)},c)};var z=a.a.g.Z();c.prototype.Tc=function(){this.Kb&&this.Kb.N&&this.Kb.N.sd(this.node)};c.prototype.sd=function(b){a.a.Pa(this.kb,b);!this.kb.length&&this.H&&this.Cc()};c.prototype.Cc=function(){this.H=!0;this.yc.N&&!this.kb.length&&(this.yc.N=
null,a.a.K.yb(this.node,b),a.i.ma(this.node,a.i.pa),this.Tc())};a.i={H:"childrenComplete",pa:"descendantsComplete",subscribe:function(b,c,d,e,f){var k=a.a.g.Ub(b,z,{});k.Fa||(k.Fa=new a.T);f&&f.notifyImmediately&&k.Zb[c]&&a.u.G(d,e,[b]);return k.Fa.subscribe(d,e,c)},ma:function(b,c){var d=a.a.g.get(b,z);if(d&&(d.Zb[c]=!0,d.Fa&&d.Fa.notifySubscribers(b,c),c==a.i.H))if(d.N)d.N.Cc();else if(d.N===n&&d.Fa&&d.Fa.Wa(a.i.pa))throw Error("descendantsComplete event not supported for bindings on this node");
},Cb:function(b,d){var e=a.a.g.Ub(b,z,{});e.N||(e.N=new c(b,e,d[x]));return d[x]==e?d:d.extend(function(a){a[x]=e})}};a.Td=function(b){return(b=a.a.g.get(b,z))&&b.context};a.ib=function(b,c,d){1===b.nodeType&&a.h.Sc(b);return p(b,c,q(d))};a.ld=function(b,c,d){d=q(d);return a.ib(b,g(c,d,b),d)};a.Oa=function(a,b){1!==b.nodeType&&8!==b.nodeType||m(q(a),b)};a.vc=function(a,b,c){!v&&A.jQuery&&(v=A.jQuery);if(2>arguments.length){if(b=w.body,!b)throw Error("ko.applyBindings: could not find document.body; has the document been loaded?");
}else if(!b||1!==b.nodeType&&8!==b.nodeType)throw Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");k(q(a,c),b)};a.Dc=function(b){return!b||1!==b.nodeType&&8!==b.nodeType?n:a.Td(b)};a.Ec=function(b){return(b=a.Dc(b))?b.$data:n};a.b("bindingHandlers",a.c);a.b("bindingEvent",a.i);a.b("bindingEvent.subscribe",a.i.subscribe);a.b("bindingEvent.startPossiblyAsyncContentBinding",a.i.Cb);a.b("applyBindings",a.vc);a.b("applyBindingsToDescendants",a.Oa);
a.b("applyBindingAccessorsToNode",a.ib);a.b("applyBindingsToNode",a.ld);a.b("contextFor",a.Dc);a.b("dataFor",a.Ec)})();(function(b){function c(c,e){var k=Object.prototype.hasOwnProperty.call(f,c)?f[c]:b,l;k?k.subscribe(e):(k=f[c]=new a.T,k.subscribe(e),d(c,function(b,d){var e=!(!d||!d.synchronous);g[c]={definition:b,Gd:e};delete f[c];l||e?k.notifySubscribers(b):a.na.zb(function(){k.notifySubscribers(b)})}),l=!0)}function d(a,b){e("getConfig",[a],function(c){c?e("loadComponent",[a,c],function(a){b(a,
c)}):b(null,null)})}function e(c,d,f,l){l||(l=a.j.loaders.slice(0));var g=l.shift();if(g){var q=g[c];if(q){var t=!1;if(q.apply(g,d.concat(function(a){t?f(null):null!==a?f(a):e(c,d,f,l)}))!==b&&(t=!0,!g.suppressLoaderExceptions))throw Error("Component loaders must supply values by invoking the callback, not by returning values synchronously.");}else e(c,d,f,l)}else f(null)}var f={},g={};a.j={get:function(d,e){var f=Object.prototype.hasOwnProperty.call(g,d)?g[d]:b;f?f.Gd?a.u.G(function(){e(f.definition)}):
a.na.zb(function(){e(f.definition)}):c(d,e)},Bc:function(a){delete g[a]},oc:e};a.j.loaders=[];a.b("components",a.j);a.b("components.get",a.j.get);a.b("components.clearCachedDefinition",a.j.Bc)})();(function(){function b(b,c,d,e){function g(){0===--B&&e(h)}var h={},B=2,u=d.template;d=d.viewModel;u?f(c,u,function(c){a.j.oc("loadTemplate",[b,c],function(a){h.template=a;g()})}):g();d?f(c,d,function(c){a.j.oc("loadViewModel",[b,c],function(a){h[m]=a;g()})}):g()}function c(a,b,d){if("function"===typeof b)d(function(a){return new b(a)});
else if("function"===typeof b[m])d(b[m]);else if("instance"in b){var e=b.instance;d(function(){return e})}else"viewModel"in b?c(a,b.viewModel,d):a("Unknown viewModel value: "+b)}function d(b){switch(a.a.R(b)){case "script":return a.a.ua(b.text);case "textarea":return a.a.ua(b.value);case "template":if(e(b.content))return a.a.Ca(b.content.childNodes)}return a.a.Ca(b.childNodes)}function e(a){return A.DocumentFragment?a instanceof DocumentFragment:a&&11===a.nodeType}function f(a,b,c){"string"===typeof b.require?
T||A.require?(T||A.require)([b.require],function(a){a&&"object"===typeof a&&a.Xd&&a["default"]&&(a=a["default"]);c(a)}):a("Uses require, but no AMD loader is present"):c(b)}function g(a){return function(b){throw Error("Component '"+a+"': "+b);}}var h={};a.j.register=function(b,c){if(!c)throw Error("Invalid configuration for "+b);if(a.j.tb(b))throw Error("Component "+b+" is already registered");h[b]=c};a.j.tb=function(a){return Object.prototype.hasOwnProperty.call(h,a)};a.j.unregister=function(b){delete h[b];
a.j.Bc(b)};a.j.Fc={getConfig:function(b,c){c(a.j.tb(b)?h[b]:null)},loadComponent:function(a,c,d){var e=g(a);f(e,c,function(c){b(a,e,c,d)})},loadTemplate:function(b,c,f){b=g(b);if("string"===typeof c)f(a.a.ua(c));else if(c instanceof Array)f(c);else if(e(c))f(a.a.la(c.childNodes));else if(c.element)if(c=c.element,A.HTMLElement?c instanceof HTMLElement:c&&c.tagName&&1===c.nodeType)f(d(c));else if("string"===typeof c){var h=w.getElementById(c);h?f(d(h)):b("Cannot find element with ID "+c)}else b("Unknown element type: "+
c);else b("Unknown template value: "+c)},loadViewModel:function(a,b,d){c(g(a),b,d)}};var m="createViewModel";a.b("components.register",a.j.register);a.b("components.isRegistered",a.j.tb);a.b("components.unregister",a.j.unregister);a.b("components.defaultLoader",a.j.Fc);a.j.loaders.push(a.j.Fc);a.j.dd=h})();(function(){function b(b,e){var f=b.getAttribute("params");if(f){var f=c.parseBindingsString(f,e,b,{valueAccessors:!0,bindingParams:!0}),f=a.a.Ga(f,function(c){return a.o(c,null,{l:b})}),g=a.a.Ga(f,
function(c){var e=c.v();return c.ja()?a.o({read:function(){return a.a.f(c())},write:a.Za(e)&&function(a){c()(a)},l:b}):e});Object.prototype.hasOwnProperty.call(g,"$raw")||(g.$raw=f);return g}return{$raw:{}}}a.j.getComponentNameForNode=function(b){var c=a.a.R(b);if(a.j.tb(c)&&(-1!=c.indexOf("-")||"[object HTMLUnknownElement]"==""+b||8>=a.a.W&&b.tagName===c))return c};a.j.tc=function(c,e,f,g){if(1===e.nodeType){var h=a.j.getComponentNameForNode(e);if(h){c=c||{};if(c.component)throw Error('Cannot use the "component" binding on a custom element matching a component');
var m={name:h,params:b(e,f)};c.component=g?function(){return m}:m}}return c};var c=new a.ga;9>a.a.W&&(a.j.register=function(a){return function(b){return a.apply(this,arguments)}}(a.j.register),w.createDocumentFragment=function(b){return function(){var c=b(),f=a.j.dd,g;for(g in f);return c}}(w.createDocumentFragment))})();(function(){function b(b,c,d){c=c.template;if(!c)throw Error("Component '"+b+"' has no template");b=a.a.Ca(c);a.h.va(d,b)}function c(a,b,c){var d=a.createViewModel;return d?d.call(a,
b,c):b}var d=0;a.c.component={init:function(e,f,g,h,m){function k(){var a=l&&l.dispose;"function"===typeof a&&a.call(l);q&&q.s();p=l=q=null}var l,p,q,t=a.a.la(a.h.childNodes(e));a.h.Ea(e);a.a.K.za(e,k);a.o(function(){var g=a.a.f(f()),h,u;"string"===typeof g?h=g:(h=a.a.f(g.name),u=a.a.f(g.params));if(!h)throw Error("No component name specified");var n=a.i.Cb(e,m),z=p=++d;a.j.get(h,function(d){if(p===z){k();if(!d)throw Error("Unknown component '"+h+"'");b(h,d,e);var f=c(d,u,{element:e,templateNodes:t});
d=n.createChildContext(f,{extend:function(a){a.$component=f;a.$componentTemplateNodes=t}});f&&f.koDescendantsComplete&&(q=a.i.subscribe(e,a.i.pa,f.koDescendantsComplete,f));l=f;a.Oa(d,e)}})},null,{l:e});return{controlsDescendantBindings:!0}}};a.h.ea.component=!0})();var V={"class":"className","for":"htmlFor"};a.c.attr={update:function(b,c){var d=a.a.f(c())||{};a.a.P(d,function(c,d){d=a.a.f(d);var g=c.indexOf(":"),g="lookupNamespaceURI"in b&&0<g&&b.lookupNamespaceURI(c.substr(0,g)),h=!1===d||null===
d||d===n;h?g?b.removeAttributeNS(g,c):b.removeAttribute(c):d=d.toString();8>=a.a.W&&c in V?(c=V[c],h?b.removeAttribute(c):b[c]=d):h||(g?b.setAttributeNS(g,c,d):b.setAttribute(c,d));"name"===c&&a.a.Yc(b,h?"":d)})}};(function(){a.c.checked={after:["value","attr"],init:function(b,c,d){function e(){var e=b.checked,f=g();if(!a.S.Ya()&&(e||!m&&!a.S.qa())){var k=a.u.G(c);if(l){var q=p?k.v():k,z=t;t=f;z!==f?e&&(a.a.Na(q,f,!0),a.a.Na(q,z,!1)):a.a.Na(q,f,e);p&&a.Za(k)&&k(q)}else h&&(f===n?f=e:e||(f=n)),a.m.eb(k,
d,"checked",f,!0)}}function f(){var d=a.a.f(c()),e=g();l?(b.checked=0<=a.a.A(d,e),t=e):b.checked=h&&e===n?!!d:g()===d}var g=a.xb(function(){if(d.has("checkedValue"))return a.a.f(d.get("checkedValue"));if(q)return d.has("value")?a.a.f(d.get("value")):b.value}),h="checkbox"==b.type,m="radio"==b.type;if(h||m){var k=c(),l=h&&a.a.f(k)instanceof Array,p=!(l&&k.push&&k.splice),q=m||l,t=l?g():n;m&&!b.name&&a.c.uniqueName.init(b,function(){return!0});a.o(e,null,{l:b});a.a.B(b,"click",e);a.o(f,null,{l:b});
k=n}}};a.m.wa.checked=!0;a.c.checkedValue={update:function(b,c){b.value=a.a.f(c())}}})();a.c["class"]={update:function(b,c){var d=a.a.Db(a.a.f(c()));a.a.Eb(b,b.__ko__cssValue,!1);b.__ko__cssValue=d;a.a.Eb(b,d,!0)}};a.c.css={update:function(b,c){var d=a.a.f(c());null!==d&&"object"==typeof d?a.a.P(d,function(c,d){d=a.a.f(d);a.a.Eb(b,c,d)}):a.c["class"].update(b,c)}};a.c.enable={update:function(b,c){var d=a.a.f(c());d&&b.disabled?b.removeAttribute("disabled"):d||b.disabled||(b.disabled=!0)}};a.c.disable=
{update:function(b,c){a.c.enable.update(b,function(){return!a.a.f(c())})}};a.c.event={init:function(b,c,d,e,f){var g=c()||{};a.a.P(g,function(g){"string"==typeof g&&a.a.B(b,g,function(b){var k,l=c()[g];if(l){try{var p=a.a.la(arguments);e=f.$data;p.unshift(e);k=l.apply(e,p)}finally{!0!==k&&(b.preventDefault?b.preventDefault():b.returnValue=!1)}!1===d.get(g+"Bubble")&&(b.cancelBubble=!0,b.stopPropagation&&b.stopPropagation())}})})}};a.c.foreach={Rc:function(b){return function(){var c=b(),d=a.a.bc(c);
if(!d||"number"==typeof d.length)return{foreach:c,templateEngine:a.ba.Ma};a.a.f(c);return{foreach:d.data,as:d.as,noChildContext:d.noChildContext,includeDestroyed:d.includeDestroyed,afterAdd:d.afterAdd,beforeRemove:d.beforeRemove,afterRender:d.afterRender,beforeMove:d.beforeMove,afterMove:d.afterMove,templateEngine:a.ba.Ma}}},init:function(b,c){return a.c.template.init(b,a.c.foreach.Rc(c))},update:function(b,c,d,e,f){return a.c.template.update(b,a.c.foreach.Rc(c),d,e,f)}};a.m.Ra.foreach=!1;a.h.ea.foreach=
!0;a.c.hasfocus={init:function(b,c,d){function e(e){b.__ko_hasfocusUpdating=!0;var f=b.ownerDocument;if("activeElement"in f){var g;try{g=f.activeElement}catch(l){g=f.body}e=g===b}f=c();a.m.eb(f,d,"hasfocus",e,!0);b.__ko_hasfocusLastValue=e;b.__ko_hasfocusUpdating=!1}var f=e.bind(null,!0),g=e.bind(null,!1);a.a.B(b,"focus",f);a.a.B(b,"focusin",f);a.a.B(b,"blur",g);a.a.B(b,"focusout",g);b.__ko_hasfocusLastValue=!1},update:function(b,c){var d=!!a.a.f(c());b.__ko_hasfocusUpdating||b.__ko_hasfocusLastValue===
d||(d?b.focus():b.blur(),!d&&b.__ko_hasfocusLastValue&&b.ownerDocument.body.focus(),a.u.G(a.a.Fb,null,[b,d?"focusin":"focusout"]))}};a.m.wa.hasfocus=!0;a.c.hasFocus=a.c.hasfocus;a.m.wa.hasFocus="hasfocus";a.c.html={init:function(){return{controlsDescendantBindings:!0}},update:function(b,c){a.a.fc(b,c())}};(function(){function b(b,d,e){a.c[b]={init:function(b,c,h,m,k){var l,p,q={},t,x,n;if(d){m=h.get("as");var u=h.get("noChildContext");n=!(m&&u);q={as:m,noChildContext:u,exportDependencies:n}}x=(t=
"render"==h.get("completeOn"))||h.has(a.i.pa);a.o(function(){var h=a.a.f(c()),m=!e!==!h,u=!p,r;if(n||m!==l){x&&(k=a.i.Cb(b,k));if(m){if(!d||n)q.dataDependency=a.S.o();r=d?k.createChildContext("function"==typeof h?h:c,q):a.S.qa()?k.extend(null,q):k}u&&a.S.qa()&&(p=a.a.Ca(a.h.childNodes(b),!0));m?(u||a.h.va(b,a.a.Ca(p)),a.Oa(r,b)):(a.h.Ea(b),t||a.i.ma(b,a.i.H));l=m}},null,{l:b});return{controlsDescendantBindings:!0}}};a.m.Ra[b]=!1;a.h.ea[b]=!0}b("if");b("ifnot",!1,!0);b("with",!0)})();a.c.let={init:function(b,
c,d,e,f){c=f.extend(c);a.Oa(c,b);return{controlsDescendantBindings:!0}}};a.h.ea.let=!0;var Q={};a.c.options={init:function(b){if("select"!==a.a.R(b))throw Error("options binding applies only to SELECT elements");for(;0<b.length;)b.remove(0);return{controlsDescendantBindings:!0}},update:function(b,c,d){function e(){return a.a.jb(b.options,function(a){return a.selected})}function f(a,b,c){var d=typeof b;return"function"==d?b(a):"string"==d?a[b]:c}function g(c,d){if(x&&l)a.i.ma(b,a.i.H);else if(t.length){var e=
0<=a.a.A(t,a.w.M(d[0]));a.a.Zc(d[0],e);x&&!e&&a.u.G(a.a.Fb,null,[b,"change"])}}var h=b.multiple,m=0!=b.length&&h?b.scrollTop:null,k=a.a.f(c()),l=d.get("valueAllowUnset")&&d.has("value"),p=d.get("optionsIncludeDestroyed");c={};var q,t=[];l||(h?t=a.a.Mb(e(),a.w.M):0<=b.selectedIndex&&t.push(a.w.M(b.options[b.selectedIndex])));k&&("undefined"==typeof k.length&&(k=[k]),q=a.a.jb(k,function(b){return p||b===n||null===b||!a.a.f(b._destroy)}),d.has("optionsCaption")&&(k=a.a.f(d.get("optionsCaption")),null!==
k&&k!==n&&q.unshift(Q)));var x=!1;c.beforeRemove=function(a){b.removeChild(a)};k=g;d.has("optionsAfterRender")&&"function"==typeof d.get("optionsAfterRender")&&(k=function(b,c){g(0,c);a.u.G(d.get("optionsAfterRender"),null,[c[0],b!==Q?b:n])});a.a.ec(b,q,function(c,e,g){g.length&&(t=!l&&g[0].selected?[a.w.M(g[0])]:[],x=!0);e=b.ownerDocument.createElement("option");c===Q?(a.a.Bb(e,d.get("optionsCaption")),a.w.cb(e,n)):(g=f(c,d.get("optionsValue"),c),a.w.cb(e,a.a.f(g)),c=f(c,d.get("optionsText"),g),
a.a.Bb(e,c));return[e]},c,k);if(!l){var B;h?B=t.length&&e().length<t.length:B=t.length&&0<=b.selectedIndex?a.w.M(b.options[b.selectedIndex])!==t[0]:t.length||0<=b.selectedIndex;B&&a.u.G(a.a.Fb,null,[b,"change"])}(l||a.S.Ya())&&a.i.ma(b,a.i.H);a.a.wd(b);m&&20<Math.abs(m-b.scrollTop)&&(b.scrollTop=m)}};a.c.options.$b=a.a.g.Z();a.c.selectedOptions={init:function(b,c,d){function e(){var e=c(),f=[];a.a.D(b.getElementsByTagName("option"),function(b){b.selected&&f.push(a.w.M(b))});a.m.eb(e,d,"selectedOptions",
f)}function f(){var d=a.a.f(c()),e=b.scrollTop;d&&"number"==typeof d.length&&a.a.D(b.getElementsByTagName("option"),function(b){var c=0<=a.a.A(d,a.w.M(b));b.selected!=c&&a.a.Zc(b,c)});b.scrollTop=e}if("select"!=a.a.R(b))throw Error("selectedOptions binding applies only to SELECT elements");var g;a.i.subscribe(b,a.i.H,function(){g?e():(a.a.B(b,"change",e),g=a.o(f,null,{l:b}))},null,{notifyImmediately:!0})},update:function(){}};a.m.wa.selectedOptions=!0;a.c.style={update:function(b,c){var d=a.a.f(c()||
{});a.a.P(d,function(c,d){d=a.a.f(d);if(null===d||d===n||!1===d)d="";if(v)v(b).css(c,d);else if(/^--/.test(c))b.style.setProperty(c,d);else{c=c.replace(/-(\w)/g,function(a,b){return b.toUpperCase()});var g=b.style[c];b.style[c]=d;d===g||b.style[c]!=g||isNaN(d)||(b.style[c]=d+"px")}})}};a.c.submit={init:function(b,c,d,e,f){if("function"!=typeof c())throw Error("The value for a submit binding must be a function");a.a.B(b,"submit",function(a){var d,e=c();try{d=e.call(f.$data,b)}finally{!0!==d&&(a.preventDefault?
a.preventDefault():a.returnValue=!1)}})}};a.c.text={init:function(){return{controlsDescendantBindings:!0}},update:function(b,c){a.a.Bb(b,c())}};a.h.ea.text=!0;(function(){if(A&&A.navigator){var b=function(a){if(a)return parseFloat(a[1])},c=A.navigator.userAgent,d,e,f,g,h;(d=A.opera&&A.opera.version&&parseInt(A.opera.version()))||(h=b(c.match(/Edge\/([^ ]+)$/)))||b(c.match(/Chrome\/([^ ]+)/))||(e=b(c.match(/Version\/([^ ]+) Safari/)))||(f=b(c.match(/Firefox\/([^ ]+)/)))||(g=a.a.W||b(c.match(/MSIE ([^ ]+)/)))||
(g=b(c.match(/rv:([^ )]+)/)))}if(8<=g&&10>g)var m=a.a.g.Z(),k=a.a.g.Z(),l=function(b){var c=this.activeElement;(c=c&&a.a.g.get(c,k))&&c(b)},p=function(b,c){var d=b.ownerDocument;a.a.g.get(d,m)||(a.a.g.set(d,m,!0),a.a.B(d,"selectionchange",l));a.a.g.set(b,k,c)};a.c.textInput={init:function(b,c,k){function l(c,d){a.a.B(b,c,d)}function m(){var d=a.a.f(c());if(null===d||d===n)d="";L!==n&&d===L?a.a.setTimeout(m,4):b.value!==d&&(y=!0,b.value=d,y=!1,v=b.value)}function r(){w||(L=b.value,w=a.a.setTimeout(z,
4))}function z(){clearTimeout(w);L=w=n;var d=b.value;v!==d&&(v=d,a.m.eb(c(),k,"textInput",d))}var v=b.value,w,L,A=9==a.a.W?r:z,y=!1;g&&l("keypress",z);11>g&&l("propertychange",function(a){y||"value"!==a.propertyName||A(a)});8==g&&(l("keyup",z),l("keydown",z));p&&(p(b,A),l("dragend",r));(!g||9<=g)&&l("input",A);5>e&&"textarea"===a.a.R(b)?(l("keydown",r),l("paste",r),l("cut",r)):11>d?l("keydown",r):4>f?(l("DOMAutoComplete",z),l("dragdrop",z),l("drop",z)):h&&"number"===b.type&&l("keydown",r);l("change",
z);l("blur",z);a.o(m,null,{l:b})}};a.m.wa.textInput=!0;a.c.textinput={preprocess:function(a,b,c){c("textInput",a)}}})();a.c.uniqueName={init:function(b,c){if(c()){var d="ko_unique_"+ ++a.c.uniqueName.rd;a.a.Yc(b,d)}}};a.c.uniqueName.rd=0;a.c.using={init:function(b,c,d,e,f){var g;d.has("as")&&(g={as:d.get("as"),noChildContext:d.get("noChildContext")});c=f.createChildContext(c,g);a.Oa(c,b);return{controlsDescendantBindings:!0}}};a.h.ea.using=!0;a.c.value={init:function(b,c,d){var e=a.a.R(b),f="input"==
e;if(!f||"checkbox"!=b.type&&"radio"!=b.type){var g=[],h=d.get("valueUpdate"),m=!1,k=null;h&&("string"==typeof h?g=[h]:g=a.a.wc(h),a.a.Pa(g,"change"));var l=function(){k=null;m=!1;var e=c(),f=a.w.M(b);a.m.eb(e,d,"value",f)};!a.a.W||!f||"text"!=b.type||"off"==b.autocomplete||b.form&&"off"==b.form.autocomplete||-1!=a.a.A(g,"propertychange")||(a.a.B(b,"propertychange",function(){m=!0}),a.a.B(b,"focus",function(){m=!1}),a.a.B(b,"blur",function(){m&&l()}));a.a.D(g,function(c){var d=l;a.a.Ud(c,"after")&&
(d=function(){k=a.w.M(b);a.a.setTimeout(l,0)},c=c.substring(5));a.a.B(b,c,d)});var p;p=f&&"file"==b.type?function(){var d=a.a.f(c());null===d||d===n||""===d?b.value="":a.u.G(l)}:function(){var f=a.a.f(c()),g=a.w.M(b);if(null!==k&&f===k)a.a.setTimeout(p,0);else if(f!==g||g===n)"select"===e?(g=d.get("valueAllowUnset"),a.w.cb(b,f,g),g||f===a.w.M(b)||a.u.G(l)):a.w.cb(b,f)};if("select"===e){var q;a.i.subscribe(b,a.i.H,function(){q?d.get("valueAllowUnset")?p():l():(a.a.B(b,"change",l),q=a.o(p,null,{l:b}))},
null,{notifyImmediately:!0})}else a.a.B(b,"change",l),a.o(p,null,{l:b})}else a.ib(b,{checkedValue:c})},update:function(){}};a.m.wa.value=!0;a.c.visible={update:function(b,c){var d=a.a.f(c()),e="none"!=b.style.display;d&&!e?b.style.display="":!d&&e&&(b.style.display="none")}};a.c.hidden={update:function(b,c){a.c.visible.update(b,function(){return!a.a.f(c())})}};(function(b){a.c[b]={init:function(c,d,e,f,g){return a.c.event.init.call(this,c,function(){var a={};a[b]=d();return a},e,f,g)}}})("click");
a.ca=function(){};a.ca.prototype.renderTemplateSource=function(){throw Error("Override renderTemplateSource");};a.ca.prototype.createJavaScriptEvaluatorBlock=function(){throw Error("Override createJavaScriptEvaluatorBlock");};a.ca.prototype.makeTemplateSource=function(b,c){if("string"==typeof b){c=c||w;var d=c.getElementById(b);if(!d)throw Error("Cannot find template with ID "+b);return new a.C.F(d)}if(1==b.nodeType||8==b.nodeType)return new a.C.ia(b);throw Error("Unknown template type: "+b);};a.ca.prototype.renderTemplate=
function(a,c,d,e){a=this.makeTemplateSource(a,e);return this.renderTemplateSource(a,c,d,e)};a.ca.prototype.isTemplateRewritten=function(a,c){return!1===this.allowTemplateRewriting?!0:this.makeTemplateSource(a,c).data("isRewritten")};a.ca.prototype.rewriteTemplate=function(a,c,d){a=this.makeTemplateSource(a,d);c=c(a.text());a.text(c);a.data("isRewritten",!0)};a.b("templateEngine",a.ca);a.kc=function(){function b(b,c,d,h){b=a.m.ac(b);for(var m=a.m.Ra,k=0;k<b.length;k++){var l=b[k].key;if(Object.prototype.hasOwnProperty.call(m,
l)){var p=m[l];if("function"===typeof p){if(l=p(b[k].value))throw Error(l);}else if(!p)throw Error("This template engine does not support the '"+l+"' binding within its templates");}}d="ko.__tr_ambtns(function($context,$element){return(function(){return{ "+a.m.vb(b,{valueAccessors:!0})+" } })()},'"+d.toLowerCase()+"')";return h.createJavaScriptEvaluatorBlock(d)+c}var c=/(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'|[^>]*))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi,
d=/\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;return{xd:function(b,c,d){c.isTemplateRewritten(b,d)||c.rewriteTemplate(b,function(b){return a.kc.Ld(b,c)},d)},Ld:function(a,f){return a.replace(c,function(a,c,d,e,l){return b(l,c,d,f)}).replace(d,function(a,c){return b(c,"\x3c!-- ko --\x3e","#comment",f)})},md:function(b,c){return a.aa.Xb(function(d,h){var m=d.nextSibling;m&&m.nodeName.toLowerCase()===c&&a.ib(m,b,h)})}}}();a.b("__tr_ambtns",a.kc.md);(function(){a.C={};a.C.F=function(b){if(this.F=b){var c=
a.a.R(b);this.ab="script"===c?1:"textarea"===c?2:"template"==c&&b.content&&11===b.content.nodeType?3:4}};a.C.F.prototype.text=function(){var b=1===this.ab?"text":2===this.ab?"value":"innerHTML";if(0==arguments.length)return this.F[b];var c=arguments[0];"innerHTML"===b?a.a.fc(this.F,c):this.F[b]=c};var b=a.a.g.Z()+"_";a.C.F.prototype.data=function(c){if(1===arguments.length)return a.a.g.get(this.F,b+c);a.a.g.set(this.F,b+c,arguments[1])};var c=a.a.g.Z();a.C.F.prototype.nodes=function(){var b=this.F;
if(0==arguments.length){var e=a.a.g.get(b,c)||{},f=e.lb||(3===this.ab?b.content:4===this.ab?b:n);if(!f||e.jd){var g=this.text();g&&g!==e.bb&&(f=a.a.Md(g,b.ownerDocument),a.a.g.set(b,c,{lb:f,bb:g,jd:!0}))}return f}e=arguments[0];this.ab!==n&&this.text("");a.a.g.set(b,c,{lb:e})};a.C.ia=function(a){this.F=a};a.C.ia.prototype=new a.C.F;a.C.ia.prototype.constructor=a.C.ia;a.C.ia.prototype.text=function(){if(0==arguments.length){var b=a.a.g.get(this.F,c)||{};b.bb===n&&b.lb&&(b.bb=b.lb.innerHTML);return b.bb}a.a.g.set(this.F,
c,{bb:arguments[0]})};a.b("templateSources",a.C);a.b("templateSources.domElement",a.C.F);a.b("templateSources.anonymousTemplate",a.C.ia)})();(function(){function b(b,c,d){var e;for(c=a.h.nextSibling(c);b&&(e=b)!==c;)b=a.h.nextSibling(e),d(e,b)}function c(c,d){if(c.length){var e=c[0],f=c[c.length-1],g=e.parentNode,h=a.ga.instance,m=h.preprocessNode;if(m){b(e,f,function(a,b){var c=a.previousSibling,d=m.call(h,a);d&&(a===e&&(e=d[0]||b),a===f&&(f=d[d.length-1]||c))});c.length=0;if(!e)return;e===f?c.push(e):
(c.push(e,f),a.a.Ua(c,g))}b(e,f,function(b){1!==b.nodeType&&8!==b.nodeType||a.vc(d,b)});b(e,f,function(b){1!==b.nodeType&&8!==b.nodeType||a.aa.cd(b,[d])});a.a.Ua(c,g)}}function d(a){return a.nodeType?a:0<a.length?a[0]:null}function e(b,e,f,h,m){m=m||{};var n=(b&&d(b)||f||{}).ownerDocument,B=m.templateEngine||g;a.kc.xd(f,B,n);f=B.renderTemplate(f,h,m,n);if("number"!=typeof f.length||0<f.length&&"number"!=typeof f[0].nodeType)throw Error("Template engine must return an array of DOM nodes");n=!1;switch(e){case "replaceChildren":a.h.va(b,
f);n=!0;break;case "replaceNode":a.a.Xc(b,f);n=!0;break;case "ignoreTargetNode":break;default:throw Error("Unknown renderMode: "+e);}n&&(c(f,h),m.afterRender&&a.u.G(m.afterRender,null,[f,h[m.as||"$data"]]),"replaceChildren"==e&&a.i.ma(b,a.i.H));return f}function f(b,c,d){return a.O(b)?b():"function"===typeof b?b(c,d):b}var g;a.gc=function(b){if(b!=n&&!(b instanceof a.ca))throw Error("templateEngine must inherit from ko.templateEngine");g=b};a.dc=function(b,c,h,m,t){h=h||{};if((h.templateEngine||g)==
n)throw Error("Set a template engine before calling renderTemplate");t=t||"replaceChildren";if(m){var x=d(m);return a.$(function(){var g=c&&c instanceof a.fa?c:new a.fa(c,null,null,null,{exportDependencies:!0}),n=f(b,g.$data,g),g=e(m,t,n,g,h);"replaceNode"==t&&(m=g,x=d(m))},null,{Sa:function(){return!x||!a.a.Sb(x)},l:x&&"replaceNode"==t?x.parentNode:x})}return a.aa.Xb(function(d){a.dc(b,c,h,d,"replaceNode")})};a.Qd=function(b,d,g,h,m){function x(b,c){a.u.G(a.a.ec,null,[h,b,u,g,r,c]);a.i.ma(h,a.i.H)}
function r(a,b){c(b,v);g.afterRender&&g.afterRender(b,a);v=null}function u(a,c){v=m.createChildContext(a,{as:z,noChildContext:g.noChildContext,extend:function(a){a.$index=c;z&&(a[z+"Index"]=c)}});var d=f(b,a,v);return e(h,"ignoreTargetNode",d,v,g)}var v,z=g.as,w=!1===g.includeDestroyed||a.options.foreachHidesDestroyed&&!g.includeDestroyed;if(w||g.beforeRemove||!a.Pc(d))return a.$(function(){var b=a.a.f(d)||[];"undefined"==typeof b.length&&(b=[b]);w&&(b=a.a.jb(b,function(b){return b===n||null===b||
!a.a.f(b._destroy)}));x(b)},null,{l:h});x(d.v());var A=d.subscribe(function(a){x(d(),a)},null,"arrayChange");A.l(h);return A};var h=a.a.g.Z(),m=a.a.g.Z();a.c.template={init:function(b,c){var d=a.a.f(c());if("string"==typeof d||"name"in d)a.h.Ea(b);else if("nodes"in d){d=d.nodes||[];if(a.O(d))throw Error('The "nodes" option must be a plain, non-observable array.');var e=d[0]&&d[0].parentNode;e&&a.a.g.get(e,m)||(e=a.a.Yb(d),a.a.g.set(e,m,!0));(new a.C.ia(b)).nodes(e)}else if(d=a.h.childNodes(b),0<d.length)e=
a.a.Yb(d),(new a.C.ia(b)).nodes(e);else throw Error("Anonymous template defined, but no template content was provided");return{controlsDescendantBindings:!0}},update:function(b,c,d,e,f){var g=c();c=a.a.f(g);d=!0;e=null;"string"==typeof c?c={}:(g="name"in c?c.name:b,"if"in c&&(d=a.a.f(c["if"])),d&&"ifnot"in c&&(d=!a.a.f(c.ifnot)),d&&!g&&(d=!1));"foreach"in c?e=a.Qd(g,d&&c.foreach||[],c,b,f):d?(d=f,"data"in c&&(d=f.createChildContext(c.data,{as:c.as,noChildContext:c.noChildContext,exportDependencies:!0})),
e=a.dc(g,d,c,b)):a.h.Ea(b);f=e;(c=a.a.g.get(b,h))&&"function"==typeof c.s&&c.s();a.a.g.set(b,h,!f||f.ja&&!f.ja()?n:f)}};a.m.Ra.template=function(b){b=a.m.ac(b);return 1==b.length&&b[0].unknown||a.m.Id(b,"name")?null:"This template engine does not support anonymous templates nested within its templates"};a.h.ea.template=!0})();a.b("setTemplateEngine",a.gc);a.b("renderTemplate",a.dc);a.a.Kc=function(a,c,d){if(a.length&&c.length){var e,f,g,h,m;for(e=f=0;(!d||e<d)&&(h=a[f]);++f){for(g=0;m=c[g];++g)if(h.value===
m.value){h.moved=m.index;m.moved=h.index;c.splice(g,1);e=g=0;break}e+=g}}};a.a.Pb=function(){function b(b,d,e,f,g){var h=Math.min,m=Math.max,k=[],l,p=b.length,q,n=d.length,r=n-p||1,v=p+n+1,u,w,z;for(l=0;l<=p;l++)for(w=u,k.push(u=[]),z=h(n,l+r),q=m(0,l-1);q<=z;q++)u[q]=q?l?b[l-1]===d[q-1]?w[q-1]:h(w[q]||v,u[q-1]||v)+1:q+1:l+1;h=[];m=[];r=[];l=p;for(q=n;l||q;)n=k[l][q]-1,q&&n===k[l][q-1]?m.push(h[h.length]={status:e,value:d[--q],index:q}):l&&n===k[l-1][q]?r.push(h[h.length]={status:f,value:b[--l],index:l}):
(--q,--l,g.sparse||h.push({status:"retained",value:d[q]}));a.a.Kc(r,m,!g.dontLimitMoves&&10*p);return h.reverse()}return function(a,d,e){e="boolean"===typeof e?{dontLimitMoves:e}:e||{};a=a||[];d=d||[];return a.length<d.length?b(a,d,"added","deleted",e):b(d,a,"deleted","added",e)}}();a.b("utils.compareArrays",a.a.Pb);(function(){function b(b,c,d,h,m){var k=[],l=a.$(function(){var l=c(d,m,a.a.Ua(k,b))||[];0<k.length&&(a.a.Xc(k,l),h&&a.u.G(h,null,[d,l,m]));k.length=0;a.a.Nb(k,l)},null,{l:b,Sa:function(){return!a.a.kd(k)}});
return{Y:k,$:l.ja()?l:n}}var c=a.a.g.Z(),d=a.a.g.Z();a.a.ec=function(e,f,g,h,m,k){function l(b){y={Aa:b,pb:a.ta(w++)};v.push(y);r||F.push(y)}function p(b){y=t[b];w!==y.pb.v()&&D.push(y);y.pb(w++);a.a.Ua(y.Y,e);v.push(y)}function q(b,c){if(b)for(var d=0,e=c.length;d<e;d++)a.a.D(c[d].Y,function(a){b(a,d,c[d].Aa)})}f=f||[];"undefined"==typeof f.length&&(f=[f]);h=h||{};var t=a.a.g.get(e,c),r=!t,v=[],u=0,w=0,z=[],A=[],C=[],D=[],F=[],y,I=0;if(r)a.a.D(f,l);else{if(!k||t&&t._countWaitingForRemove){var E=
a.a.Mb(t,function(a){return a.Aa});k=a.a.Pb(E,f,{dontLimitMoves:h.dontLimitMoves,sparse:!0})}for(var E=0,G,H,K;G=k[E];E++)switch(H=G.moved,K=G.index,G.status){case "deleted":for(;u<K;)p(u++);H===n&&(y=t[u],y.$&&(y.$.s(),y.$=n),a.a.Ua(y.Y,e).length&&(h.beforeRemove&&(v.push(y),I++,y.Aa===d?y=null:C.push(y)),y&&z.push.apply(z,y.Y)));u++;break;case "added":for(;w<K;)p(u++);H!==n?(A.push(v.length),p(H)):l(G.value)}for(;w<f.length;)p(u++);v._countWaitingForRemove=I}a.a.g.set(e,c,v);q(h.beforeMove,D);a.a.D(z,
h.beforeRemove?a.oa:a.removeNode);var M,O,P;try{P=e.ownerDocument.activeElement}catch(N){}if(A.length)for(;(E=A.shift())!=n;){y=v[E];for(M=n;E;)if((O=v[--E].Y)&&O.length){M=O[O.length-1];break}for(f=0;u=y.Y[f];M=u,f++)a.h.Wb(e,u,M)}for(E=0;y=v[E];E++){y.Y||a.a.extend(y,b(e,g,y.Aa,m,y.pb));for(f=0;u=y.Y[f];M=u,f++)a.h.Wb(e,u,M);!y.Ed&&m&&(m(y.Aa,y.Y,y.pb),y.Ed=!0,M=y.Y[y.Y.length-1])}P&&e.ownerDocument.activeElement!=P&&P.focus();q(h.beforeRemove,C);for(E=0;E<C.length;++E)C[E].Aa=d;q(h.afterMove,D);
q(h.afterAdd,F)}})();a.b("utils.setDomNodeChildrenFromArrayMapping",a.a.ec);a.ba=function(){this.allowTemplateRewriting=!1};a.ba.prototype=new a.ca;a.ba.prototype.constructor=a.ba;a.ba.prototype.renderTemplateSource=function(b,c,d,e){if(c=(9>a.a.W?0:b.nodes)?b.nodes():null)return a.a.la(c.cloneNode(!0).childNodes);b=b.text();return a.a.ua(b,e)};a.ba.Ma=new a.ba;a.gc(a.ba.Ma);a.b("nativeTemplateEngine",a.ba);(function(){a.$a=function(){var a=this.Hd=function(){if(!v||!v.tmpl)return 0;try{if(0<=v.tmpl.tag.tmpl.open.toString().indexOf("__"))return 2}catch(a){}return 1}();
this.renderTemplateSource=function(b,e,f,g){g=g||w;f=f||{};if(2>a)throw Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");var h=b.data("precompiled");h||(h=b.text()||"",h=v.template(null,"{{ko_with $item.koBindingContext}}"+h+"{{/ko_with}}"),b.data("precompiled",h));b=[e.$data];e=v.extend({koBindingContext:e},f.templateOptions);e=v.tmpl(h,b,e);e.appendTo(g.createElement("div"));v.fragments={};return e};this.createJavaScriptEvaluatorBlock=function(a){return"{{ko_code ((function() { return "+
a+" })()) }}"};this.addTemplate=function(a,b){w.write("<script type='text/html' id='"+a+"'>"+b+"\x3c/script>")};0<a&&(v.tmpl.tag.ko_code={open:"__.push($1 || '');"},v.tmpl.tag.ko_with={open:"with($1) {",close:"} "})};a.$a.prototype=new a.ca;a.$a.prototype.constructor=a.$a;var b=new a.$a;0<b.Hd&&a.gc(b);a.b("jqueryTmplTemplateEngine",a.$a)})()})})();})();

define('build/data',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.data = void 0;
    exports.data = {
        waypoints: window.navData.waypoints || {},
        navaids: window.navData.navaids || {},
        STAR: undefined,
        SID: undefined,
        runways: undefined,
        ATS: undefined,
    };
});

define('build/ui/elements',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.E = void 0;
    exports.E = {
        modal: ".fmc-modal",
        container: {
            tabBar: ".fmc-modal .fmc-modal__tab-bar",
            modalContent: ".fmc-modal .fmc-modal__content main",
            uiBottomProgInfo: ".geofs-ui-bottom .fmc-prog-info",
        },
        btn: {
            fmcBtn: "button.fmc-btn",
            interactive: ".interactive",
        },
    };
});

define('build/debug',["require", "exports", "./ui/elements"], function (require, exports, elements_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.debug = void 0;
    var PRODUCTION = false;
    function stopPropagation(event) {
        event.stopImmediatePropagation();
    }
    exports.debug = {
        stopPropagation: function () {
            $(elements_1.E.modal)
                .on("keyup", stopPropagation)
                .on("keydown", stopPropagation)
                .on("keypress", stopPropagation);
        },
        log: function (text) {
            if (!PRODUCTION)
                console.log(text);
        },
    };
});

define('build/utils',["require", "exports", "./debug"], function (require, exports, debug_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.utils = void 0;
    var EARTH_RADIUS_NM = 3440.06;
    var FEET_TO_NM = 1 / 6076;
    var NM_TO_FEET = 6076;
    function toRadians(d) {
        return (d * Math.PI) / 180;
    }
    function toDegrees(r) {
        return (r * 180) / Math.PI;
    }
    function getGroundSpeed() {
        var tas = geofs.aircraft.instance.animationValue.ktas;
        var vs = 60 * geofs.aircraft.instance.animationValue.climbrate * FEET_TO_NM;
        debug_1.debug.log("tas: " + tas + ", vs: " + vs);
        return Math.sqrt(tas * tas - vs * vs);
    }
    function getDistance(lat1, lon1, lat2, lon2) {
        var dlat = toRadians(lat2 - lat1);
        var dlon = toRadians(lon2 - lon1);
        lat1 = toRadians(lat1);
        lat2 = toRadians(lat2);
        var a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS_NM * c;
    }
    function getBearing(lat1, lon1, lat2, lon2) {
        lat1 = toRadians(lat1);
        lat2 = toRadians(lat2);
        lon1 = toRadians(lon1);
        lon2 = toRadians(lon2);
        var y = Math.sin(lon2 - lon1) * Math.cos(lat2);
        var x = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
        var brng = toDegrees(Math.atan2(y, x));
        return brng <= 0 ? brng + 360 : brng;
    }
    function getClimbrate(deltaAlt, nextDist) {
        var gs = getGroundSpeed();
        var vs = 100 *
            Math.round((gs * (deltaAlt / (nextDist * NM_TO_FEET)) * NM_TO_FEET) / 60 / 100);
        return vs;
    }
    function formatTime(time) {
        if (isNaN(time[0]) || isNaN(time[1]))
            return "--:--";
        time[1] = Number(checkZeros(time[1]));
        return time[0] + ":" + time[1];
    }
    function timeCheck(h, m) {
        if (m >= 60) {
            m -= 60;
            h++;
        }
        if (h >= 24)
            h -= 24;
        return [h, m];
    }
    function getETE(d, a) {
        var hours = d / geofs.aircraft.instance.animationValue.ktas;
        var h = parseInt(hours.toString());
        var m = Math.round(60 * (hours - h));
        if (a)
            m += Math.round(geofs.aircraft.instance.animationValue.altitude / 4000);
        return timeCheck(h, m);
    }
    function getETA(hours, minutes) {
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        h += hours;
        m += Number(minutes);
        return timeCheck(h, m);
    }
    function checkZeros(i) {
        var toReturn;
        if (i < 10)
            toReturn = "0" + i;
        else
            toReturn = i.toString();
        return toReturn;
    }
    exports.utils = {
        EARTH_RADIUS_NM: EARTH_RADIUS_NM,
        FEET_TO_NM: FEET_TO_NM,
        NM_TO_FEET: NM_TO_FEET,
        toRadians: toRadians,
        toDegrees: toDegrees,
        getGroundSpeed: getGroundSpeed,
        getDistance: getDistance,
        getBearing: getBearing,
        getClimbrate: getClimbrate,
        formatTime: formatTime,
        timeCheck: timeCheck,
        getETE: getETE,
        getETA: getETA,
    };
});

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define('build/log',["require", "exports", "knockout", "./utils"], function (require, exports, ko, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.log = void 0;
    ko = __importStar(ko);
    var mainTimer = null;
    var speedTimer = null;
    var data = ko.observableArray();
    var update = function (other) {
        if (!geofs.pause && !(flight.recorder.playing || flight.recorder.paused)) {
            var spd = Math.round(geofs.aircraft.instance.animationValue.ktas);
            var hdg = Math.round(geofs.aircraft.instance.animationValue.heading360);
            var alt = Math.round(geofs.aircraft.instance.animationValue.altitude);
            var fps = +geofs.debug.fps;
            var lat = Math.round(10000 * geofs.aircraft.instance.llaLocation[0]) / 10000;
            var lon = Math.round(10000 * geofs.aircraft.instance.llaLocation[1]) / 10000;
            var date = new Date();
            var h = date.getUTCHours();
            var m = date.getUTCMinutes();
            var time = utils_1.utils.formatTime(utils_1.utils.timeCheck(h, m));
            other = other || "--";
            var dataArray = [time, spd, hdg, alt, lat, lon, fps, other];
            data.push(dataArray);
        }
        if (mainTimer !== null) {
            clearInterval(mainTimer);
        }
        if (geofs.aircraft.instance.animationValue.altitude > 18000) {
            mainTimer = setInterval(update, 120000);
        }
        else
            mainTimer = setInterval(update, 30000);
    };
    var speed = function () {
        var kcas = geofs.aircraft.instance.animationValue.kcas;
        var altitude = geofs.aircraft.instance.animationValue.altitude +
            geofs.groundElevation * METERS_TO_FEET;
        if (kcas > 255 && altitude < 10000) {
            update("Overspeed");
        }
        if (speedTimer !== null) {
            clearInterval(speedTimer);
        }
        if (altitude < 10000)
            speedTimer = setInterval(speed, 15000);
        else
            speedTimer = setInterval(speed, 30000);
    };
    var removeData = function () {
        data.removeAll();
    };
    var modalWarning = ko.observable(undefined);
    var warn = ko.pureComputed({
        read: modalWarning,
        write: function (warningText) {
            modalWarning(warningText);
            setTimeout(function () {
                modalWarning(undefined);
            }, 5000);
        },
    });
    exports.log = {
        data: data,
        update: update,
        speed: speed,
        removeData: removeData,
        modalWarning: modalWarning,
        warn: warn,
    };
});

define('build/distance',["require", "exports", "./flight", "./utils", "./waypoints"], function (require, exports, flight_1, utils_1, waypoints_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.distance = void 0;
    var route = function (end) {
        var departure = flight_1.flight.departure.coords();
        var arrival = flight_1.flight.arrival.coords();
        var start = waypoints_1.waypoints.nextWaypoint() || 0;
        var route = waypoints_1.waypoints.route();
        var pos = geofs.aircraft.instance.llaLocation;
        if (route.length === 0) {
            if (flight_1.flight.departure.airport() && flight_1.flight.arrival.airport())
                return utils_1.utils.getDistance(departure[0], departure[1], arrival[0], arrival[1]);
            else
                return 0;
        }
        if (waypoints_1.waypoints.nextWaypoint() === null) {
            if (flight_1.flight.arrival.airport() && pos[0])
                return utils_1.utils.getDistance(pos[0], pos[1], arrival[0], arrival[1]);
            if (pos[0])
                return utils_1.utils.getDistance(pos[0], pos[1], route[route.length - 1].lat(), route[route.length - 1].lon());
            return utils_1.utils.getDistance(route[0].lat(), route[0].lon(), route[route.length - 1].lat(), route[route.length - 1].lon());
        }
        else {
            var total = 0;
            for (var i = start; i < end && i < route.length; i++) {
                total += route[i].distFromPrev();
            }
            if (end === route.length) {
                if (flight_1.flight.arrival.airport())
                    total += utils_1.utils.getDistance(route[end - 1].lat(), route[end - 1].lon(), arrival[0], arrival[1]);
            }
            return total;
        }
    };
    var target = function (deltaAlt) {
        var targetDist;
        if (deltaAlt < 0) {
            targetDist = (deltaAlt / -1000) * 3;
        }
        else {
            targetDist = (deltaAlt / 1000) * 2.5;
        }
        return targetDist;
    };
    var turn = function (angle) {
        var v = geofs.aircraft.instance.animationValue.kcas;
        var r = 0.107917 * Math.pow(Math.E, 0.0128693 * v);
        var a = utils_1.utils.toRadians(angle);
        return r * Math.tan(a / 2) + 0.2;
    };
    exports.distance = {
        route: route,
        target: target,
        turn: turn,
    };
});

define('build/nav/LNAV',["require", "exports", "../distance", "../flight", "../waypoints"], function (require, exports, distance_1, flight_1, waypoints_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.lnav = void 0;
    var timer = null;
    var update = function () {
        if (waypoints_1.waypoints.nextWaypoint() === null || !flight_1.flight.arrival.airport()) {
            clearInterval(timer);
            timer = null;
            return;
        }
        var d = distance_1.distance.route(waypoints_1.waypoints.nextWaypoint() + 1);
        if (d <= distance_1.distance.turn(60)) {
            waypoints_1.waypoints.activateWaypoint(waypoints_1.waypoints.nextWaypoint() + 1);
        }
        clearInterval(timer);
        if (d < geofs.aircraft.instance.animationValue.ktas / 60)
            timer = setInterval(update, 500);
        else
            timer = setInterval(update, 5000);
    };
    exports.lnav = {
        timer: timer,
        update: update,
    };
});

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define('build/nav/progress',["require", "exports", "knockout", "../distance", "../flight", "../utils", "../waypoints"], function (require, exports, ko, distance_1, flight_1, utils_1, waypoints_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.progress = void 0;
    ko = __importStar(ko);
    var timer = null;
    var info = {
        flightETE: ko.observable("--:--"),
        flightETA: ko.observable("--:--"),
        todETE: ko.observable("--:--"),
        todETA: ko.observable("--:--"),
        flightDist: ko.observable("--"),
        todDist: ko.observable("--"),
        nextDist: ko.observable("--"),
        nextETE: ko.observable("--:--"),
    };
    var update = function () {
        var route = waypoints_1.waypoints.route();
        var nextWaypoint = waypoints_1.waypoints.nextWaypoint();
        var lat1 = geofs.aircraft.instance.llaLocation[0];
        var lon1 = geofs.aircraft.instance.llaLocation[1];
        var lat2 = flight_1.flight.arrival.coords()[0];
        var lon2 = flight_1.flight.arrival.coords()[1];
        var times = [[], [], [], [], []];
        var nextDist = nextWaypoint === null ? 0 : route[nextWaypoint].distFromPrev();
        var flightDist;
        var valid = true;
        for (var i = 0; i < route.length; i++) {
            if (!route[i].lat() || !route[i].lon())
                valid = false;
        }
        if (valid)
            flightDist = distance_1.distance.route(route.length);
        else
            flightDist = utils_1.utils.getDistance(lat1, lon1, lat2, lon2);
        times[4] = utils_1.utils.getETE(nextDist, false);
        if (!geofs.aircraft.instance.groundContact && flight_1.flight.arrival.airport()) {
            times[0] = utils_1.utils.getETE(flightDist, true);
            times[1] = utils_1.utils.getETA(times[0][0], times[0][1]);
            if (flightDist - flight_1.flight.todDist() > 0) {
                times[2] = utils_1.utils.getETE(flightDist - flight_1.flight.todDist(), false);
                times[3] = utils_1.utils.getETA(times[2][0], times[2][1]);
            }
        }
        print(flightDist, nextDist, times);
        if (timer === null) {
            timer = setInterval(update, 5000);
        }
    };
    var print = function (flightDist, nextDist, times) {
        var formattedTimes = [];
        for (var i = 0; i < times.length; i++) {
            formattedTimes.push(utils_1.utils.formatTime(times[i]));
        }
        if (flightDist < 10) {
            flightDist = Math.round(flightDist * 10) / 10;
        }
        else
            flightDist = Math.round(flightDist);
        var todDist;
        if (flight_1.flight.todDist() && flight_1.flight.todDist() < flightDist)
            todDist = flightDist - flight_1.flight.todDist();
        if (nextDist < 10) {
            nextDist = Math.round(10 * nextDist) / 10;
        }
        else
            nextDist = Math.round(nextDist);
        var DEFAULT_DIST = "--";
        info.flightETE(formattedTimes[0]);
        info.flightETA(formattedTimes[1]);
        info.todETE(formattedTimes[2]);
        info.todETA(formattedTimes[3]);
        info.flightDist(!isNaN(flightDist) && flightDist.toString() || DEFAULT_DIST);
        info.todDist(typeof todDist !== 'undefined' && todDist.toString() || DEFAULT_DIST);
        info.nextDist(typeof nextDist !== 'undefined' && nextDist.toString() || DEFAULT_DIST);
        info.nextETE(formattedTimes[4]);
    };
    exports.progress = {
        info: info,
        update: update,
        print: print,
    };
});

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define('build/waypoints',["require", "exports", "knockout", "./debug", "./get", "./flight", "./log", "./utils", "./nav/LNAV", "./nav/progress"], function (require, exports, ko, debug_1, get_1, flight_1, log_1, utils_1, LNAV_1, progress_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.waypoints = void 0;
    ko = __importStar(ko);
    var autopilot = window.autopilot_pp.require("build/autopilot").default, gc = window.autopilot_pp.require("build/greatcircle").default, icao = window.navData.airports;
    var route = ko.observableArray();
    var nextWaypoint = ko.observable(null);
    var Waypoint = (function () {
        function Waypoint() {
            var _this = this;
            this._wpt = ko.observable();
            this.wpt = ko.pureComputed({
                read: this._wpt,
                write: function (val) {
                    _this._wpt(val);
                    var coords = (0, get_1.waypoint)(val, getIndex(_this));
                    _this.isValid = Boolean(coords && coords[0] && coords[1]);
                    _this.lat(_this.isValid ? coords[0] : _this.lat());
                    _this.lon(_this.isValid ? coords[1] : _this.lon());
                    _this.info(_this.isValid ? coords[2] : undefined);
                },
            });
            this._lat = ko.observable();
            this.lat = ko.pureComputed({
                read: this._lat,
                write: function (val) {
                    val = formatCoords(val.toString());
                    _this._lat(!isNaN(val) ? val : undefined);
                    _this.valid(Boolean(_this.isValid));
                },
            });
            this._lon = ko.observable();
            this.lon = ko.pureComputed({
                read: this._lon,
                write: function (val) {
                    val = formatCoords(val.toString());
                    _this._lon(!isNaN(val) ? val : undefined);
                    _this.valid(Boolean(_this.isValid));
                },
            });
            this.alt = ko.observable();
            this.valid = ko.observable(false);
            this.info = ko.observable();
            this.distFromPrev = ko.pureComputed(function () {
                return getInfoFromPrev(_this)[0];
            });
            this.brngFromPrev = ko.pureComputed(function () {
                return getInfoFromPrev(_this)[1];
            });
        }
        return Waypoint;
    }());
    var llaLocation = ko.observable();
    setInterval(function () {
        llaLocation(geofs.aircraft.instance.llaLocation);
    }, 1000);
    function getInfoFromPrev(self) {
        var distance, bearing;
        var index = getIndex(self);
        if (index === 0 || index === nextWaypoint()) {
            var pos = llaLocation() || [];
            distance = utils_1.utils.getDistance(pos[0], pos[1], self.lat(), self.lon());
            bearing = utils_1.utils.getBearing(pos[0], pos[1], self.lat(), self.lon());
        }
        else if (index) {
            var prev = route()[index - 1];
            distance = utils_1.utils.getDistance(prev.lat(), prev.lon(), self.lat(), self.lon());
            bearing = utils_1.utils.getBearing(prev.lat(), prev.lon(), self.lat(), self.lon());
        }
        return [Math.round(distance * 10) / 10 || null, Math.round(bearing) || null];
    }
    function getIndex(self) {
        var index;
        for (index = 0; index < route().length; index++) {
            if (self === route()[index]) {
                break;
            }
        }
        return index;
    }
    function move(index1, index2) {
        var tempRoute = route();
        if (index2 >= tempRoute.length) {
            var k = index2 - tempRoute.length;
            while (k-- + 1) {
                tempRoute.push(undefined);
            }
        }
        tempRoute.splice(index2, 0, tempRoute.splice(index1, 1)[0]);
        route(tempRoute);
    }
    function makeFixesArray() {
        var result = [];
        var departureVal = flight_1.flight.departure.airport();
        if (departureVal)
            result.push(departureVal);
        route().forEach(function (rte) {
            result.push(rte.wpt());
        });
        var arrivalVal = flight_1.flight.arrival.airport();
        if (arrivalVal)
            result.push(arrivalVal);
        return result;
    }
    function toFixesString() {
        return makeFixesArray().join(" ");
    }
    function toRouteString() {
        var normalizedRoute = [];
        for (var i = 0; i < route().length; i++) {
            normalizedRoute.push([
                route()[i].wpt(),
                route()[i].lat(),
                route()[i].lon(),
                route()[i].alt(),
                route()[i].valid(),
                route()[i].info(),
            ]);
        }
        return JSON.stringify([
            flight_1.flight.departure.airport() || "",
            flight_1.flight.arrival.airport() || "",
            flight_1.flight.number() || "",
            normalizedRoute,
        ]);
    }
    function formatCoords(a) {
        a = String(a);
        if (a.indexOf(" ") > -1) {
            var array = a.split(" ");
            var d = Number(array[0]);
            var m = Number(array[1]) / 60;
            var coords = void 0;
            if (d < 0)
                coords = d - m;
            else
                coords = d + m;
            return +coords.toFixed(6);
        }
        else
            return a === "" ? NaN : Number(a);
    }
    function toRoute(s) {
        if (!s) {
            log_1.log.warn("Please enter waypoints separated by spaces or a generated route");
            return;
        }
        s = s.trim();
        if (s.indexOf('["') === 0) {
            loadFromSave(s);
            return;
        }
        var isWaypoints = true;
        var a, b, str = [];
        str = s.toUpperCase().split(" ");
        for (var i = 0; i < str.length; i++)
            if (str[i].length > 5 || str[i].length < 1 || !/^\w+$/.test(str[i]))
                isWaypoints = false;
        var departure = !!icao[str[0]];
        var arrival = !!icao[str[str.length - 1]];
        if (!isWaypoints) {
            log_1.log.warn("Invalid Waypoints Input");
            return;
        }
        removeWaypoint(true);
        if (departure) {
            var wpt = str[0];
            flight_1.flight.departure.airport(wpt);
            a = 1;
        }
        else {
            a = 0;
            flight_1.flight.departure.airport(undefined);
        }
        if (arrival) {
            var wpt = str[str.length - 1];
            flight_1.flight.arrival.airport(wpt);
            b = 1;
        }
        else {
            b = 0;
            flight_1.flight.arrival.airport(undefined);
        }
        for (var q = a; q < str.length - b; q++) {
            addWaypoint();
            route()[q - a].wpt(str[q]);
        }
    }
    function addWaypoint() {
        route.push(new Waypoint());
        if (typeof componentHandler === "object")
            componentHandler.upgradeDom();
        debug_1.debug.stopPropagation();
    }
    function removeWaypoint(n, data, event) {
        var isRemoveAll = (event && event.shiftKey) || typeof n === "boolean";
        if (isRemoveAll) {
            route.removeAll();
        }
        else {
            route.splice(n, 1);
        }
        if (nextWaypoint() === n || isRemoveAll) {
            activateWaypoint(false);
        }
        else if (nextWaypoint() === Number(n) + 1)
            activateWaypoint(n);
        else if (nextWaypoint() > n)
            nextWaypoint(nextWaypoint() - 1);
    }
    function activateWaypoint(n) {
        if (n !== false && nextWaypoint() !== n) {
            if (n < route().length) {
                nextWaypoint(n);
                var rte = route()[nextWaypoint()];
                gc.latitude(rte.lat());
                gc.longitude(rte.lon());
                autopilot.currentMode(1);
                debug_1.debug.log("Waypoint # " + Number(Number(n) + 1) + " activated | index: " + n);
            }
            else {
                if (flight_1.flight.arrival.coords()[1]) {
                    gc.latitude(flight_1.flight.arrival.coords()[1]);
                    gc.longitude(flight_1.flight.arrival.coords()[2]);
                }
                nextWaypoint(null);
            }
        }
        else {
            nextWaypoint(null);
            gc.latitude(undefined);
            gc.longitude(undefined);
            autopilot.currentMode(0);
        }
        LNAV_1.lnav.update();
        progress_1.progress.update();
    }
    function printWaypointInfo(index, info) {
        if (!info)
            info = "";
        route()[index].info(info);
    }
    function getNextWaypointWithAltRestriction() {
        if (nextWaypoint() === null)
            return -1;
        for (var i = nextWaypoint(); i < route().length; i++) {
            if (route()[i] && route()[i].alt())
                return i;
        }
        return -1;
    }
    function saveData() {
        if (route().length < 1 || !route()[0].wpt()) {
            log_1.log.warn("There is no route to save");
        }
        else {
            localStorage.removeItem("fmcWaypoints");
            localStorage.setItem("fmcWaypoints", toRouteString());
        }
    }
    function loadFromSave(arg) {
        arg = arg || localStorage.getItem("fmcWaypoints");
        var arr = JSON.parse(arg);
        localStorage.removeItem("fmcWaypoints");
        if (arr) {
            removeWaypoint(true);
            var rte = arr[3];
            for (var i = 0; i < rte.length; i++) {
                for (var j = 0; j < rte[i].length; j++) {
                    if (rte[i][j] === null)
                        rte[i][j] = undefined;
                }
            }
            flight_1.flight.departure.airport(arr[0]);
            flight_1.flight.arrival.airport(arr[1]);
            flight_1.flight.number(arr[2]);
            for (var i = 0; i < rte.length; i++) {
                addWaypoint();
                if (rte[i][0])
                    route()[i].wpt(rte[i][0]);
                if (!rte[i][4] || !route()[i].lat()) {
                    route()[i].lat(rte[i][1]);
                    route()[i].lon(rte[i][2]);
                }
                route()[i].alt(rte[i][3]);
                if (!route()[i].info())
                    route()[i].info(rte[i][5]);
            }
            saveData();
        }
        else
            log_1.log.warn("There is no saved route or the browser's cache was cleared.");
    }
    function shiftWaypoint(oldIndex, value) {
        debug_1.debug.log("Waypoint #" + (oldIndex + 1) + " (index=" + oldIndex + ") shifted " + value);
        var newIndex = oldIndex + value;
        if ((value < 0 && newIndex >= 0) ||
            (value > 0 && newIndex <= route().length - 1)) {
            move(oldIndex, newIndex);
            if (nextWaypoint() === newIndex) {
                activateWaypoint(oldIndex);
            }
            else if (nextWaypoint() === oldIndex) {
                activateWaypoint(newIndex);
            }
        }
    }
    exports.waypoints = {
        route: route,
        nextWaypoint: nextWaypoint,
        makeFixesArray: makeFixesArray,
        toFixesString: toFixesString,
        toRouteString: toRouteString,
        formatCoords: formatCoords,
        toRoute: toRoute,
        addWaypoint: addWaypoint,
        removeWaypoint: removeWaypoint,
        activateWaypoint: activateWaypoint,
        printWaypointInfo: printWaypointInfo,
        saveData: saveData,
        loadFromSave: loadFromSave,
        shiftWaypoint: shiftWaypoint,
        nextWptAltRes: getNextWaypointWithAltRestriction,
        getCoords: get_1.waypoint
    };
});

define('build/get/waypoint',["require", "exports", "../data", "../utils", "../waypoints"], function (require, exports, data_1, utils_1, waypoints_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.waypoint = void 0;
    var icao = window.navData.airports;
    var waypoint = function (fix, index) {
        var coords = icao[fix];
        if (coords)
            return coords;
        var navaid = data_1.data.navaids[fix];
        if (navaid)
            return navaid;
        var list = data_1.data.waypoints[fix];
        if (list) {
            var closestDist = Infinity, closestIndex = 0;
            for (var i = 0; i < list.length; i++) {
                var curLat = geofs.aircraft.instance.llaLocation[0];
                var curLon = geofs.aircraft.instance.llaLocation[1];
                var lat = index === 0 ? curLat : waypoints_1.waypoints.route()[index - 1].lat();
                var lon = index === 0 ? curLon : waypoints_1.waypoints.route()[index - 1].lon();
                var relativeDist = utils_1.utils.getDistance(list[i][0], list[i][1], lat, lon);
                if (relativeDist < closestDist) {
                    closestDist = relativeDist;
                    closestIndex = i;
                }
            }
            return list[closestIndex];
        }
        return undefined;
    };
    exports.waypoint = waypoint;
});

define('build/get',["require", "exports", "./get/waypoint"], function (require, exports, waypoint_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.get = exports.waypoint = void 0;
    Object.defineProperty(exports, "waypoint", { enumerable: true, get: function () { return waypoint_1.waypoint; } });
    exports.get = {
        waypoint: waypoint_1.waypoint,
        ATS: undefined,
        SID: undefined,
        STAR: undefined,
        runway: undefined,
    };
});

define('build/vnav-profile',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.vnavProfile = void 0;
    exports.vnavProfile = {
        "4": {
            climb: [
                [-100, 5000, 210, 2400],
                [5000, 10000, 250, 2400],
                [10000, 18000, 270, 2200],
                [18000, 25000, 280, 1800],
                [25000, 30000, 280, 1500],
                [30000, 1e99, 0.74, 1000],
            ],
            descent: [
                [30000, 1e99, 290, -2400],
                [25000, 30000, 280, -2200],
                [18000, 25000, 270, -2200],
                [12000, 18000, 270, -1800],
                [10000, 12000, 250, -1800],
                [7000, 10000, 250, -1800],
                [5000, 7000, 230, -1500],
                [4000, 5000, 210, -1500],
                [3000, 4000, 190, -750],
                [2500, 3000, 170, -750],
                [-100, 2500, 150, -750],
            ],
        },
        DEFAULT: {
            climb: [
                [-100, 5000, 210, 2400],
                [5000, 10000, 250, 2400],
                [10000, 18000, 270, 2200],
                [18000, 25000, 280, 1800],
                [25000, 30000, 280, 1500],
                [30000, 1e99, 0.74, 1000],
            ],
            descent: [
                [30000, 1e99, 290, -2400],
                [25000, 30000, 280, -2200],
                [18000, 25000, 270, -2200],
                [12000, 18000, 270, -1800],
                [10000, 12000, 250, -1800],
                [7000, 10000, 250, -1800],
                [5000, 7000, 230, -1500],
                [4000, 5000, 210, -1500],
                [3000, 4000, 190, -750],
                [2500, 3000, 170, -750],
                [-100, 2500, 150, -750],
            ],
        },
    };
});

define('build/nav/VNAV',["require", "exports", "../debug", "../distance", "../flight", "../utils", "../waypoints", "../vnav-profile"], function (require, exports, debug_1, distance_1, flight_1, utils_1, waypoints_1, vnav_profile_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.vnav = void 0;
    var apModes = window.autopilot_pp.require("build/autopilot").default.modes;
    function getFlightParameters() {
        var spd, vs;
        var a = geofs.aircraft.instance.animationValue.altitude;
        if (flight_1.flight.phase() === 0) {
            var profile = getVNAVProfile().climb;
            var index = void 0;
            for (var i = 0; i < profile.length; i++) {
                if (a > profile[i][0] && a <= profile[i][1]) {
                    index = i;
                    break;
                }
            }
            var belowStartAlt = index === undefined;
            if (flight_1.flight.spdControl() && !belowStartAlt) {
                spd = profile[index][2];
                if (index < profile.length - 1)
                    vs = profile[index][3];
                switchSpeedMode(spd);
            }
        }
        else if (flight_1.flight.phase() === 2) {
            var profile = getVNAVProfile().descent;
            var index = void 0;
            for (var i = 0; i < profile.length; i++) {
                if (a > profile[i][0] && a <= profile[i][1]) {
                    index = i;
                    break;
                }
            }
            var belowLastAlt = index === undefined;
            if (flight_1.flight.spdControl() && !belowLastAlt) {
                spd = profile[index][2];
                vs = profile[index][3];
                switchSpeedMode(spd);
            }
        }
        return [spd, vs];
    }
    function getVNAVProfile() {
        return (geofs.aircraft.instance.setup.fmcVnavProfile ||
            vnav_profile_1.vnavProfile[geofs.aircraft.instance.id] ||
            vnav_profile_1.vnavProfile.DEFAULT);
    }
    function switchSpeedMode(spd) {
        if (!spd)
            return;
        if (spd <= 10)
            apModes.speed.isMach(true);
        else
            apModes.speed.isMach(false);
    }
    exports.vnav = {
        timer: null,
        update: function () {
            if (!flight_1.flight.vnavEnabled())
                return;
            var route = waypoints_1.waypoints.route();
            var params = getFlightParameters();
            var next = waypoints_1.waypoints.nextWptAltRes();
            var hasRestriction = next !== -1;
            var todDist = flight_1.flight.todDist();
            var cruiseAlt = flight_1.flight.cruiseAlt();
            var fieldElev = flight_1.flight.fieldElev();
            var todCalc = flight_1.flight.todCalc();
            var currentAlt = geofs.aircraft.instance.animationValue.altitude;
            var targetAlt;
            var deltaAlt;
            var nextDist;
            var targetDist;
            if (hasRestriction) {
                targetAlt = route[next].alt();
                deltaAlt = targetAlt - currentAlt;
                nextDist = distance_1.distance.route(next + 1);
                targetDist = distance_1.distance.target(deltaAlt);
                debug_1.debug.log("targetAlt: " +
                    targetAlt +
                    ", deltaAlt: " +
                    deltaAlt +
                    ", nextDist: " +
                    nextDist +
                    ", targetDist: " +
                    targetDist);
            }
            var spd = params[0];
            var vs;
            var alt;
            var lat1 = geofs.aircraft.instance.llaLocation[0] || null;
            var lon1 = geofs.aircraft.instance.llaLocation[1] || null;
            var lat2 = flight_1.flight.arrival.coords()[0] || null;
            var lon2 = flight_1.flight.arrival.coords()[1] || null;
            var flightDist;
            var valid = true;
            for (var i = 0; i < route.length; i++) {
                if (!route[i].lat() || !route[i].lon())
                    valid = false;
            }
            if (valid)
                flightDist = distance_1.distance.route(route.length);
            else
                flightDist = utils_1.utils.getDistance(lat1, lon1, lat2, lon2);
            if (isNaN(flightDist))
                flight_1.flight.phase(0);
            else if (flightDist < todDist)
                flight_1.flight.phase(2);
            else if (Math.abs(cruiseAlt - currentAlt) <= 100)
                flight_1.flight.phase(1);
            else if (currentAlt < cruiseAlt)
                flight_1.flight.phase(0);
            else if (currentAlt > cruiseAlt) {
                flight_1.flight.phase(1);
                vs = -1000;
            }
            else
                flight_1.flight.phase(0);
            if (flight_1.flight.phase() === 0) {
                if (hasRestriction) {
                    var totalDist = distance_1.distance.target(cruiseAlt - currentAlt) +
                        distance_1.distance.target(targetAlt - cruiseAlt);
                    debug_1.debug.log("totalDist: " + totalDist);
                    if (nextDist < totalDist) {
                        if (nextDist < targetDist)
                            vs = utils_1.utils.getClimbrate(deltaAlt, nextDist);
                        else
                            vs = params[1];
                        alt = targetAlt;
                    }
                    else {
                        vs = params[1];
                        alt = cruiseAlt;
                    }
                }
                else {
                    vs = params[1];
                    alt = cruiseAlt;
                }
            }
            else if (flight_1.flight.phase() === 2) {
                if (hasRestriction) {
                    if (nextDist < targetDist) {
                        vs = utils_1.utils.getClimbrate(deltaAlt, nextDist);
                        alt = targetAlt;
                    }
                }
                else {
                    vs = params[1];
                    if (currentAlt > 12000 + fieldElev)
                        alt = 100 * Math.round((12000 + fieldElev) / 100);
                }
            }
            if (flight_1.flight.phase() === 1 && (todCalc || !todDist)) {
                if (hasRestriction) {
                    todDist = distance_1.distance.route(route.length) - nextDist;
                    todDist += distance_1.distance.target(targetAlt - cruiseAlt);
                }
                else {
                    todDist = distance_1.distance.target(fieldElev - cruiseAlt);
                }
                todDist = Math.round(todDist);
                flight_1.flight.todDist(todDist);
                debug_1.debug.log("TOD changed to " + todDist);
            }
            if (spd !== undefined)
                apModes.speed.value(spd);
            if (vs !== undefined)
                apModes.vs.value(vs);
            if (alt !== undefined)
                apModes.altitude.value(alt);
        },
    };
});

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define('build/flight',["require", "exports", "knockout", "./get", "./nav/LNAV", "./nav/VNAV"], function (require, exports, ko, get_1, LNAV_1, VNAV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.flight = void 0;
    ko = __importStar(ko);
    var icao = window.navData.airports;
    var todDist = ko.observable();
    var _vnavEnabled = ko.observable(false);
    var vnavEnabled = ko.pureComputed({
        read: _vnavEnabled,
        write: function (boolean) {
            var set = _vnavEnabled;
            if (!cruiseAlt())
                set(false);
            else if (boolean) {
                VNAV_1.vnav.timer = setInterval(function () {
                    VNAV_1.vnav.update();
                }, 5000);
                set(true);
            }
            else {
                clearInterval(VNAV_1.vnav.timer);
                VNAV_1.vnav.timer = null;
                set(false);
            }
        },
    });
    var spdControl = ko.observable(true);
    var _departureAirport = ko.observable();
    var _departureCoords = ko.observable([]);
    var _selectedDepartureRwy = ko.observable();
    var _selectedSID = ko.observable();
    var _departureRwys = ko.pureComputed(function () {
        var depArpt = departure.airport();
        var depSID = departure.SID() ? departure.SID().name : undefined;
        return get_1.get.runway(depArpt, depSID, true);
    });
    var _SIDs = ko.pureComputed(function () {
        var depArpt = departure.airport();
        var depRwy = departure.runway() ? departure.runway().runway : undefined;
        var depSID = departure.SID() ? departure.SID().name : undefined;
        return get_1.get.SID(depArpt, depRwy, depSID);
    });
    var departure = {
        airport: ko.pureComputed({
            read: _departureAirport,
            write: function (airport) {
                var oldAirport = _departureAirport();
                var coords = icao[airport];
                if (airport !== oldAirport)
                    departure.runway(undefined);
                if (!coords) {
                    _departureAirport(undefined);
                    _departureCoords([]);
                }
                else {
                    _departureAirport(airport);
                    _departureCoords(coords);
                }
                LNAV_1.lnav.update();
            },
        }),
        coords: ko.pureComputed(function () {
            return _departureCoords();
        }),
        runway: ko.pureComputed({
            read: _selectedDepartureRwy,
            write: function (index) {
                var rwyData = _departureRwys()[index];
                if (rwyData)
                    _selectedDepartureRwy(rwyData);
                else {
                    _selectedDepartureRwy(undefined);
                    departure.SID(undefined);
                }
            },
        }),
        SID: ko.pureComputed({
            read: _selectedSID,
            write: function (index) {
                var SIDData = _SIDs()[index];
                _selectedSID(SIDData);
            },
        }),
    };
    var _arrivalAirport = ko.observable();
    var _arrivalCoords = ko.observable([]);
    var _selectedArrivalRwy = ko.observable();
    var _selectedSTAR = ko.observable();
    var _arrivalRwys = ko.pureComputed(function () {
        return get_1.get.runway(arrival.airport());
    });
    var _STARs = ko.pureComputed(function () {
        return get_1.get.SID(arrival.airport(), arrival.runway() ? arrival.runway().runway : false);
    });
    var arrival = {
        airport: ko.pureComputed({
            read: _arrivalAirport,
            write: function (airport) {
                var oldAirport = _arrivalAirport();
                var coords = icao[airport];
                if (airport !== oldAirport)
                    arrival.runway(undefined);
                if (!coords) {
                    _arrivalAirport(undefined);
                    _arrivalCoords([]);
                }
                else {
                    _arrivalAirport(airport);
                    _arrivalCoords(coords);
                }
                LNAV_1.lnav.update();
            },
        }),
        coords: ko.pureComputed(function () {
            return _arrivalCoords();
        }),
        runway: ko.pureComputed({
            read: _selectedArrivalRwy,
            write: function (index) {
                var rwyData = _arrivalRwys()[index];
                if (rwyData)
                    _selectedArrivalRwy(rwyData);
                else {
                    _selectedArrivalRwy(undefined);
                    arrival.STAR(undefined);
                }
            },
        }),
        STAR: ko.pureComputed({
            read: _selectedSTAR,
            write: function (index) {
                var STARData = _STARs()[index];
                _selectedSTAR(STARData);
            },
        }),
    };
    var flightNumber = ko.observable();
    var _cruiseAlt = ko.observable();
    var cruiseAlt = ko.pureComputed({
        read: _cruiseAlt,
        write: function (val) {
            var set = _cruiseAlt;
            if (!val) {
                set(undefined);
                vnavEnabled(false);
            }
            else
                set(+val);
        },
    });
    var _phase = ko.observable(0);
    var phase = ko.pureComputed({
        read: _phase,
        write: function (index) {
            if (phaseLocked() || index > 3)
                return;
            _phase(index);
        },
    });
    var _phaseLocked = ko.observable(false);
    var phaseLocked = ko.pureComputed({
        read: _phaseLocked,
        write: function (boolean) {
            _phaseLocked(boolean);
        },
    });
    var todCalc = ko.observable(false);
    var fieldElev = ko.observable();
    exports.flight = {
        todDist: todDist,
        vnavEnabled: vnavEnabled,
        spdControl: spdControl,
        departure: departure,
        arrival: arrival,
        number: flightNumber,
        cruiseAlt: cruiseAlt,
        phase: phase,
        phaseLocked: phaseLocked,
        todCalc: todCalc,
        fieldElev: fieldElev,
    };
});

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define('build/ui/ViewModel',["require", "exports", "knockout", "../flight", "../get", "../log", "../waypoints", "../nav/progress"], function (require, exports, ko, flight_1, get_1, log_1, waypoints_1, progress_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ViewModel = void 0;
    ko = __importStar(ko);
    var ViewModel = (function () {
        function ViewModel() {
            var _this = this;
            this._opened = ko.observable(false);
            this.opened = ko.pureComputed({
                read: this._opened,
                write: function (boolean) {
                    _this._opened(boolean);
                },
            });
            this.modalWarning = log_1.log.modalWarning;
            this.departureAirport = flight_1.flight.departure.airport;
            this.arrivalAirport = flight_1.flight.arrival.airport;
            this.flightNumber = flight_1.flight.number;
            this.route = waypoints_1.waypoints.route;
            this.nextWaypoint = waypoints_1.waypoints.nextWaypoint;
            this.saveWaypoints = waypoints_1.waypoints.saveData;
            this.retrieveWaypoints = waypoints_1.waypoints.loadFromSave;
            this.addWaypoint = waypoints_1.waypoints.addWaypoint;
            this.activateWaypoint = waypoints_1.waypoints.activateWaypoint;
            this.shiftWaypoint = waypoints_1.waypoints.shiftWaypoint;
            this.removeWaypoint = waypoints_1.waypoints.removeWaypoint;
            this.fieldElev = flight_1.flight.fieldElev;
            this.todDist = flight_1.flight.todDist;
            this.todCalc = flight_1.flight.todCalc;
            this.departureRwyList = ko.pureComputed(function () {
                if (_this.SIDName())
                    return get_1.get.SID(_this.departureAirport(), _this.departureRwyName(), _this.SIDName()).availableRunways;
                else
                    return get_1.get.runway(_this.departureAirport(), _this.SIDName(), true);
            });
            this.departureRunway = flight_1.flight.departure.runway;
            this.departureRwyName = ko.pureComputed(function () {
                if (_this.departureRunway())
                    return _this.departureRunway().runway;
                else
                    return undefined;
            });
            this.SIDList = ko.pureComputed(function () {
                return get_1.get.SID(_this.departureAirport(), _this.departureRwyName());
            });
            this.SID = flight_1.flight.departure.SID;
            this.SIDName = ko.pureComputed(function () {
                if (_this.SID())
                    return _this.SID().name;
                else
                    return undefined;
            });
            this.arrivalRwyList = ko.pureComputed(function () {
                return get_1.get.runway(_this.arrivalAirport());
            });
            this.arrivalRunway = flight_1.flight.arrival.runway;
            this.arrivalRunwayName = ko.pureComputed(function () {
                if (_this.arrivalRunway())
                    return _this.arrivalRunway().runway;
                else
                    return undefined;
            });
            this.STARs = ko.pureComputed(function () {
                return get_1.get.STAR(_this.arrivalAirport(), _this.arrivalRunwayName());
            });
            this.STAR = flight_1.flight.arrival.STAR;
            this.STARName = ko.pureComputed(function () {
                if (_this.STAR())
                    return _this.STAR().name;
                else
                    return undefined;
            });
            this.vnavEnabled = flight_1.flight.vnavEnabled;
            this.cruiseAlt = flight_1.flight.cruiseAlt;
            this.spdControl = flight_1.flight.spdControl;
            this.phase = flight_1.flight.phase;
            this.phaseLocked = flight_1.flight.phaseLocked;
            this.phaseToText = ["climb", "cruise", "descent"];
            this.currentPhaseText = ko.pureComputed(function () {
                return _this.phaseToText[flight_1.flight.phase()];
            });
            this.progInfo = progress_1.progress.info;
            this.loadRouteText = ko.observable();
            this.generatedRouteText = ko.observable();
            this.generateRoute = ko.pureComputed({
                read: this.generatedRouteText,
                write: function (isGenerate) {
                    var generatedRoute = isGenerate ? waypoints_1.waypoints.toRouteString() : undefined;
                    _this.generatedRouteText(generatedRoute);
                },
            });
            this.logData = log_1.log.data;
            this.removeLogData = log_1.log.removeData;
        }
        ViewModel.prototype.nextPhase = function () {
            var phase = flight_1.flight.phase();
            flight_1.flight.phase(phase === this.phaseToText.length - 1 ? 0 : phase + 1);
        };
        ViewModel.prototype.loadRoute = function () {
            waypoints_1.waypoints.toRoute(this.loadRouteText());
            this.loadRouteText(undefined);
        };
        return ViewModel;
    }());
    exports.ViewModel = ViewModel;
    ko.bindingHandlers.mdlSwitch = {
        update: function (element, _unused, bindings) {
            var isChecked = bindings.get("checked");
            if (isChecked)
                isChecked();
            bindings.get("disable");
            var materialSwitch = element.parentNode.MaterialSwitch;
            if (!materialSwitch)
                return;
            materialSwitch.checkDisabled();
            materialSwitch.checkToggleState();
        },
    };
    ko.bindingHandlers.mdlTextfield = {
        update: function (element, _unused, bindings) {
            var hasValue = bindings.get("value");
            if (hasValue)
                hasValue();
            var materialTextfield = element.parentNode.MaterialTextfield;
            if (!materialTextfield)
                return;
            materialTextfield.checkDirty();
            materialTextfield.checkDisabled();
            materialTextfield.checkFocus();
            materialTextfield.checkValidity();
        },
    };
});

define('build/html/button.html',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "<button class=\"fmc-btn fmc-btn__fade mdl-button mdl-js-button gefs-f-standard-ui\" data-bind=\"click: opened.bind($data, !opened())\">\n\tFMC\n\t<i class=\"material-icons\">view_list</i>\n</button>";
});

define('build/html/externaldist.html',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "<div class=\"fmc-prog-info dest-info geofs-f-standard-ui\">\n    <span class=\"mdl-chip mdl-chip--contact\">\n        <span class=\"mdl-chip__contact mdl-color--teal mdl-color-text--white\">Dest</span>\n        <span class=\"mdl-chip__text distance-info\"><span data-bind=\"text: progInfo.flightDist\"></span>&nbsp;nm</span>\n    </span>\n</div>\n";
});

define('build/html/modal.html',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "<!-- FMC Modal Dialog -->\n<div class=\"fmc-modal mdl-dialog\" data-bind=\"css: { opened: opened }\">\n    <div class=\"fmc-modal__close\">\n        <button class=\"mdl-button mdl-js-button mdl-button--icon close\" data-bind=\"click: opened.bind($data, false)\">\n            <i class=\"material-icons\">clear</i>\n        </button>\n    </div>\n    <div class=\"fmc-modal__title\">\n        <h4><strong>Flight Management Computer</strong></h4>\n    </div>\n    <div class=\"fmc-modal__warning\" data-bind=\"text: modalWarning\"></div>\n\n    <!-- FMC Modal layout -->\n    <div class=\"fmc-modal__layout-container\">\n        <div class=\"fmc-modal__layout mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs\">\n\n            <!-- Tabs -->\n            <div class=\"fmc-modal__header\">\n                <header class=\"mdl-layout__header fmc-modal__no-shadow\">\n                    <div class=\"mdl-layout__tab-bar fmc-modal__tab-bar\">\n                        <a to=\".fmc-rte\" class=\"mdl-layout__tab fmc-btn__fade is-active\" interactive=\".wpt-tab\">RTE</a>\n                        <a to=\".fmc-arr\" class=\"mdl-layout__tab fmc-btn__fade\" interactive=\".arr-tab\">ARR</a>\n                        <a to=\".fmc-legs\" class=\"mdl-layout__tab fmc-btn__fade\">LEGS</a>\n                        <a to=\".fmc-vnav\" class=\"mdl-layout__tab fmc-btn__fade\" interactive=\".vnav-tab\">VNAV</a>\n                        <a to=\".fmc-ils\" class=\"mdl-layout__tab fmc-btn__fade\" style=\"display: none;\">ILS</a> <!--TODO-->\n                        <a to=\".fmc-prog\" class=\"mdl-layout__tab fmc-btn__fade\">PROG</a>\n                        <a to=\".fmc-map\" class=\"mdl-layout__tab fmc-btn__fade\" style=\"display: none;\">MAP</a>\n                        <a to=\".fmc-load\" class=\"mdl-layout__tab fmc-btn__fade\" interactive=\".load-tab\">LOAD</a>\n                        <a to=\".fmc-log\" class=\"mdl-layout__tab fmc-btn__fade\" interactive=\".log-tab\">LOG</a>\n                    </div>\n                </header>\n            </div>\n\n            <!-- Divider between tabs and contents -->\n            <div class=\"fmc-modal__divider\"></div>\n\n            <!-- Modal contents -->\n            <div class=\"fmc-modal__content\">\n                <main class=\"mdl-layout__content\">\n\n                    <!--==============================\n                        All tab content pages\n                        Located at ui/tab-contents\n                    ===============================-->\n\n                </main>\n            </div>\n        </div>\n    </div>\n\n    <!-- Modal actions: interactive -->\n    <div class=\"fmc-modal__actions\">\n\t\t<button class=\"mdl-button mdl-js-button mdl-button--raised interactive save-wpt-data wpt-tab is-active\" data-bind=\"click: saveWaypoints\">Save Waypoints</button>\n        <button class=\"mdl-button mdl-js-button mdl-button--raised interactive retrieve-wpt wpt-tab is-active\" data-bind=\"click: retrieveWaypoints.bind($data,undefined)\">Retrieve Waypoints</button>\n        <button action=\"add-wpt\" class=\"mdl-button mdl-js-button mdl-button--fab mdl-button--colored interactive wpt-tab is-active\" data-bind=\"click: addWaypoint\">\n            <i class=\"material-icons\">add</i>\n        </button>\n        <div class=\"fmc-auto-tod-container interactive arr-tab\">\n            <label class=\"mdl-switch mdl-js-switch mdl-js-ripple-effect\" for=\"auto-tod\">\n                <input type=\"checkbox\" id=\"auto-tod\" class=\"mdl-switch__input\" data-bind=\"checked: todCalc, mdlSwitch: true\">\n                <span class=\"mdl-switch__label\">Automatically Calculate T/D</span>\n            </label>\n        </div>\n        <div class=\"fmc-vnav-phase-container interactive vnav-tab\">\n            <span>Phase</span>\n            <button class=\"mdl-button mdl-js-button mdl-button--raised toggle-phase\" data-bind=\"text: currentPhaseText, click: nextPhase\"></button>\n            <button class=\"mdl-button mdl-js-button mdl-button--raised lock-phase\" data-bind=\"click: phaseLocked.bind($data, !phaseLocked()), css: {locked: phaseLocked}\">\n                <i class=\"material-icons\">lock</i>\n            </button>\n        </div>\n        <button class=\"mdl-button mdl-js-button mdl-button--raised interactive clear-rte load-tab\" data-bind=\"click: generateRoute.bind($data,false)\">Clear</button>\n        <button class=\"mdl-button mdl-js-button mdl-button--raised interactive generate-rte load-tab\" data-bind=\"click: generateRoute.bind($data,true)\">Generate Route</button>\n        <button class=\"mdl-button mdl-js-button mdl-button--raised interactive remove-log-data log-tab\" data-bind=\"click: removeLogData\">Remove Log Data</button>\n\n    </div>\n</div>\n";
});

define('build/html/tab-contents/route.html',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "<!-- RTE tab contents -->\n<section class=\"mdl-layout__tab-panel fmc-rte is-active\">\n    <div class=\"page-content\">\n\n        <!-- Departure & Arrival info -->\n        <div class=\"fmc-dep-arr-table-container\">\n            <table>\n                <tr>\n                    <!-- Departure input -->\n                    <td>\n                        <i class=\"material-icons\">flight_takeoff</i>\n                        <div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">\n                            <input class=\"mdl-textfield__input dep\" data-bind=\"value: departureAirport, mdlTextfield: true\">\n                            <label class=\"mdl-textfield__label\">Departure</label>\n                        </div>\n                    </td>\n                    <!-- Arrival input -->\n                    <td>\n                        <i class=\"material-icons\">flight_land</i>\n                        <div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">\n                            <input class=\"mdl-textfield__input arr\" data-bind=\"value: arrivalAirport, mdlTextfield: true\">\n                            <label class=\"mdl-textfield__label\">Arrival</label>\n                        </div>\n                    </td>\n                    <!-- Flight num input -->\n                    <td>\n                        <i class=\"material-icons\">local_airport</i>\n                        <div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">\n                            <input class=\"mdl-textfield__input fn\" data-bind=\"value: flightNumber, mdlTextfield: true\">\n                            <label class=\"mdl-textfield__label\">Flight #</label>\n                        </div>\n                    </td>\n                </tr>\n            </table>\n        </div>\n\n        <!-- Waypoint lists -->\n        <div class=\"fmc-wpt-list-container\">\n            <table class=\"mdl-data-table mdl-js-data-table\">\n                <thead>\n                    <tr class=\"wpt-header\">\n                        <th class=\"wpt-col\">Waypoints</th>\n                        <th class=\"lat-col\">Position</th>\n                        <th class=\"lon-col\"></th>\n                        <th class=\"alt-col\">Altitude</th>\n                        <th class=\"actions-col\">Actions</th>\n                    </tr>\n                </thead>\n                <tbody data-bind=\"foreach: route\">\n\n                    <!------------------------------->\n                    <!-- Waypoints Input Data Rows -->\n                    <!------------------------------->\n\n                    <tr class=\"wpt-row\">\n                        <td>\n                            <!-- Waypoint input -->\n                            <span class=\"fmc-wpt-info\" data-bind=\"text: info\"></span>\n                            <div class=\"mdl-textfield mdl-js-textfield\">\n                                <input class=\"mdl-textfield__input wpt\" data-bind=\"value: wpt, mdlTextfield: true\">\n                                <label class=\"mdl-textfield__label\">Fix, VOR, ICAO</label>\n                            </div>\n                        </td>\n                        <td>\n                            <!-- Latitude input -->\n                            <div class=\"mdl-textfield mdl-js-textfield\">\n                                <input class=\"mdl-textfield__input lat\" data-bind=\"value: lat, mdlTextfield: true\" pattern=\"-?(\\d*(\\.\\d+)?|\\d*\\s\\d+(\\.\\d+)?)\">\n                                <label class=\"mdl-textfield__label\">Lat.</label>\n                                <span class=\"mdl-textfield__error\">Invalid Latitude</span>\n                            </div>\n                        </td>\n                        <td>\n                            <!-- Longitude input -->\n                            <div class=\"mdl-textfield mdl-js-textfield\">\n                                <input class=\"mdl-textfield__input lon\" data-bind=\"value: lon, mdlTextfield: true\" pattern=\"-?(\\d*(\\.\\d+)?|\\d*\\s\\d+(\\.\\d+)?)\">\n                                <label class=\"mdl-textfield__label\">Lon.</label>\n                                <span class=\"mdl-textfield__error\">Invalid Longitude</span>\n                            </div>\n                        </td>\n                        <td>\n                            <!-- Altitude input -->\n                            <div class=\"mdl-textfield mdl-js-textfield\">\n                                <input class=\"mdl-textfield__input alt\" type=\"number\" max=3280000 step=10 data-bind=\"value: alt, mdlTextfield: true\">\n                                <label class=\"mdl-textfield__label\">Ft.</label>\n                                <span class=\"mdl-textfield__error\">Invalid Altitude</span>\n                            </div>\n                        </td>\n                        <td>\n                            <!-- Action buttons -->\n                            <button data-bind=\"click: function(){ $parent.activateWaypoint($index()) }\" class=\"mdl-button mdl-js-button mdl-button--icon mdl-button--accent\">\n                                <i class=\"material-icons\" data-bind=\"text: $parent.nextWaypoint() === $index() ? 'check_circle' : 'check'\"></i>\n                            </button>\n                            <button data-bind=\"click: function(){ $parent.shiftWaypoint($index(), -1) }\" class=\"mdl-button mdl-js-button mdl-button--icon mdl-button--colored\">\n                                <i class=\"material-icons\">arrow_upward</i>\n                            </button>\n                            <button data-bind=\"click: function(){ $parent.shiftWaypoint($index(), 1) }\" class=\"mdl-button mdl-js-button mdl-button--icon mdl-button--colored\">\n                                <i class=\"material-icons\">arrow_downward</i>\n                            </button>\n                            <button data-bind=\"click: function(data,event){ $parent.removeWaypoint($index(),data,event) }\" class=\"mdl-button mdl-js-button mdl-button--icon mdl-button--colored\">\n                                <i class=\"material-icons\">delete_forever</i>\n                            </button>\n                        </td>\n                    </tr>\n\n                    <!-------------------------------->\n                    <!-- /Waypoints Input Data Rows -->\n                    <!-------------------------------->\n\n                </tbody>\n\n            </table>\n        </div>\n    </div>\n</section>\n";
});

define('build/html/tab-contents/dep-arr.html',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "<!-- ARR tab contents -->\n<section class=\"mdl-layout__tab-panel fmc-arr\">\n    <div class=\"page-content\">\n        <div class=\"fmc-dep-arr-container\">\n            <table>\n                <tr>\n                    <!-- T/D dist -->\n                    <td>\n                        <span class=\"fmc-dep-arr__input-label\">T/D Dist.</span>\n                        <div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label tod-dist-container\">\n                            <input class=\"mdl-textfield__input tod-dist\" type=\"number\" data-bind=\"value: todDist, mdlTextfield: true\" pattern=\"\\d*\">\n                            <label class=\"mdl-textfield__label\">Nautical Miles (nm)</label>\n                            <span class=\"mdl-textfield__error\">Invalid T/D Distance</span>\n                        </div>\n                    </td>\n\n                    <!-- Field elevation -->\n                    <td>\n                        <span class=\"fmc-dep-arr__input-label\">Arrival Field Elev.</span>\n                        <div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">\n                            <input class=\"mdl-textfield__input field-elev\" type=\"number\" data-bind=\"value: fieldElev, mdlTextfield: true\" pattern=\"-?\\d*\">\n                            <label class=\"mdl-textfield__label\">Feet (ft.)</label>\n                            <span class=\"mdl-textfield__error\">Invalid Field Elevation</span>\n                        </div>\n                    </td>\n                </tr>\n            </table>\n        </div>\n    </div>\n</section>\n";
});

define('build/html/tab-contents/legs.html',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "<!-- LEGS tab contents -->\n<section class=\"mdl-layout__tab-panel fmc-legs\">\n    <div class=\"page-content\">\n        <div class=\"fmc-legs-container\">\n            <table class=\"fmc-legs-data-table\">\n\n                <thead>\n                    <th class=\"brng-and-wpt\"></th>\n                    <th class=\"dist-and-info\"></th>\n                    <th class=\"altitude\"></th>\n                </thead>\n\n                <!-- LEGS information table -->\n                <tbody data-bind=\"foreach: route\">\n                    <tr data-bind=\"visible: $parent.nextWaypoint() == null || $index() >= $parent.nextWaypoint(), css: {activated:$parent.nextWaypoint() === $index()}\">\n                        <td>\n                            <div class=\"brng-from-prev\" data-bind=\"text: brngFromPrev() == null ? '' : brngFromPrev()+'\u00B0'\"></div>\n                            <div class=\"wpt-name\" data-bind=\"text: wpt\"></div>\n                        </td>\n                        <td>\n                            <div class=\"dist-from-prev\" data-bind=\"text: distFromPrev() == null ? '' : distFromPrev()+' NM'\"></div>\n                            <div class=\"wpt-info\" data-bind=\"text: info() ? '('+info()+')' : ''\"></div>\n                        </td>\n                        <td>\n                            <div class=\"alt-target\" data-bind=\"text: !alt() ? (wpt() ? '-----' : '') : (alt() >= 18000 ? 'FL'+Math.round(alt()/100) : alt()+' FT')\"></div>\n                        </td>\n                    </tr>\n                </tbody>\n\n            </table>\n        </div>\n    </div>\n</section>\n";
});

define('build/html/tab-contents/vnav.html',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "<!-- VNAV tab contents -->\n<section class=\"mdl-layout__tab-panel fmc-vnav\">\n    <div class=\"page-content\">\n        <div class=\"fmc-vnav-container\">\n            <table>\n                <tr>\n\n                    <!-- VNAV toggle and cruise altitude-->\n                    <td>\n                        <div class=\"fmc-vnav-toggle-container\">\n                            <div>\n                                <label class=\"mdl-switch mdl-js-switch mdl-js-ripple-effect\" for=\"vnav-toggle\">\n                                    <input type=\"checkbox\" id=\"vnav-toggle\" class=\"mdl-switch__input\" data-bind=\"checked: vnavEnabled, disable: cruiseAlt() == undefined, mdlSwitch: true\">\n                                    <span class=\"mdl-switch__label\">VNAV</span>\n                                </label>\n                                <i class=\"material-icons\">unfold_more_horizontal</i>\n                            </div>\n                            <div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">\n                                <input class=\"mdl-textfield__input cruise-alt\" type=\"number\" data-bind=\"value: cruiseAlt, mdlTextfield: true\" pattern=\"\\d*\">\n                                <label class=\"mdl-textfield__label\">Cruise Altitude (ft.)</label>\n                                <span class=\"mdl-textfield__error\">Invalid Cruise Altitude</span>\n                            </div>\n                        </div>\n                    </td>\n\n                    <!-- Speed control -->\n                    <td>\n                        <div class=\"fmc-spd-toggle-container\">\n                            <label class=\"mdl-switch mdl-js-switch mdl-js-ripple-effect\" for=\"spd-toggle\">\n                                <input type=\"checkbox\" id=\"spd-toggle\" class=\"mdl-switch__input\" data-bind=\"checked: spdControl, mdlSwitch: true\">\n                                <span class=\"mdl-switch__label\">SPD Control</span>\n                            </label>\n                        </div>\n                    </td>\n                </tr>\n            </table>\n        </div>\n    </div>\n</section>\n";
});

define('build/html/tab-contents/ils.html',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "<!-- ILS tab contents -->\n<section class=\"mdl-layout__tab-panel fmc-ils\">\n    <div class=\"page-content\">\n        <div class=\"fmc-ils-container\">\n            <table class=\"mdl-data-table mdl-js-data-table\">\n                <tr>\n                    <th>Glideslope</th>\n                    <th>Runway Threshold</th>\n                    <th></th>\n                    <th>Opposite Threshold</th>\n                    <th></th>\n                </tr>\n                <tr>\n                    <!-- Glideslope input -->\n                    <td>\n                        <div class=\"mdl-textfield mdl-js-textfield\">\n                            <input class=\"mdl-textfield__input glideslope\">\n                            <label class=\"mdl-textfield__label\">Degrees</label>\n                            <span class=\"mdl-textfield__error\">Invalid Glideslope</span>\n                        </div>\n                    </td>\n\n                    <!-- Threshold latitude input -->\n                    <td>\n                        <div class=\"mdl-textfield mdl-js-textfield\">\n                            <input class=\"mdl-textfield__input threshold-lat\" pattern=\"-?(\\d*(\\.\\d+)?|\\d*\\s\\d+(\\.\\d+)?)\">\n                            <label class=\"mdl-textfield__label\">Lat.</label>\n                            <span class=\"mdl-textfield__error\">Invalid Latitude</span>\n                        </div>\n                    </td>\n\n                    <!-- Threshold longitude input -->\n                    <td>\n                        <div class=\"mdl-textfield mdl-js-textfield\">\n                            <input class=\"mdl-textfield__input threshold-lon\" pattern=\"-?(\\d*(\\.\\d+)?|\\d*\\s\\d+(\\.\\d+)?)\">\n                            <label class=\"mdl-textfield__label\">Lon.</label>\n                            <span class=\"mdl-textfield__error\">Invalid Longitude</span>\n                        </div>\n                    </td>\n\n                    <!-- Opposite latitude input -->\n                    <td>\n                        <div class=\"mdl-textfield mdl-js-textfield\">\n                            <input class=\"mdl-textfield__input opposite-lat\" pattern=\"-?(\\d*(\\.\\d+)?|\\d*\\s\\d+(\\.\\d+)?)\">\n                            <label class=\"mdl-textfield__label\">Lat.</label>\n                            <span class=\"mdl-textfield__error\">Invalid Latitude</span>\n                        </div>\n                    </td>\n\n                    <!-- Opposite longitude input -->\n                    <td>\n                        <div class=\"mdl-textfield mdl-js-textfield\">\n                            <input class=\"mdl-textfield__input opposite-lon\" pattern=\"-?(\\d*(\\.\\d+)?|\\d*\\s\\d+(\\.\\d+)?)\">\n                            <label class=\"mdl-textfield__label\">Lon.</label>\n                            <span class=\"mdl-textfield__error\">Invalid Longitude</span>\n                        </div>\n                    </td>\n                </tr>\n            </table>\n        </div>\n    </div>\n</section>\n";
});

define('build/html/tab-contents/progress.html',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "<!-- PROG tab contents -->\n<section class=\"mdl-layout__tab-panel fmc-prog\">\n    <div class=\"page-content\">\n        <div class=\"fmc-prog-container\">\n\n            <!-- Destination Information -->\n            <div class=\"fmc-prog-info dest-info\">\n                <span class=\"mdl-chip mdl-chip--contact\">\n                    <span class=\"mdl-chip__contact mdl-color--teal mdl-color-text--white\">Dest</span>\n                    <span class=\"mdl-chip__text distance-info\"><span data-bind=\"text: progInfo.flightDist\"></span>&nbsp;nm</span>\n                    <span class=\"mdl-chip__contact time-info\">\n                        <div>ETE:&nbsp;<span class=\"ete\" data-bind=\"text: progInfo.flightETE\"></span></div>\n                        <div>ETA:&nbsp;<span class=\"eta\" data-bind=\"text: progInfo.flightETA\"></span></div>\n                    </span>\n                </span>\n            </div>\n\n            <!-- T/D Information -->\n            <div class=\"fmc-prog-info tod-info\">\n                <span class=\"mdl-chip mdl-chip--contact\">\n                    <span class=\"mdl-chip__contact mdl-color--teal mdl-color-text--white\">T/D</span>\n                    <span class=\"mdl-chip__text distance-info\"><span data-bind=\"text: progInfo.todDist\"></span>&nbsp;nm</span>\n                    <span class=\"mdl-chip__contact time-info\">\n                        <div>ETE:&nbsp;<span class=\"ete\" data-bind=\"text: progInfo.todETE\"></span></div>\n                        <div>ETA:&nbsp;<span class=\"eta\" data-bind=\"text: progInfo.todETA\"></span></div>\n                    </span>\n                </span>\n            </div>\n\n            <!-- Next Waypoint Information -->\n            <div class=\"fmc-prog-info next-wpt-info\" data-bind=\"visible: nextWaypoint() !== null\">\n                <span class=\"mdl-chip mdl-chip--contact\">\n                    <span class=\"mdl-chip__contact mdl-color--teal mdl-color-text--white\">\n                        Next Waypoint\n                        <i class=\"material-icons\">room</i>\n                    </span>\n                    <span class=\"mdl-chip__text distance-info\"><span data-bind=\"text: progInfo.nextDist\"></span>&nbsp;nm</span>\n                    <span class=\"mdl-chip__contact time-info\" data-bind=\"text: progInfo.nextETE\"></span>\n                </span>\n            </div>\n\n        </div>\n    </div>\n</section>\n";
});

define('build/html/tab-contents/map.html',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "<!-- MAP tab contents -->\n<section class=\"mdl-layout__tab-panel fmc-map\">\n    <div class=\"page-content\">\n        <div class=\"fmc-map-container\"></div>\n    </div>\n</section>\n";
});

define('build/html/tab-contents/load.html',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "<!-- LOAD tab contents -->\n<section class=\"mdl-layout__tab-panel fmc-load\">\n    <div class=\"page-content\">\n        <div class=\"fmc-load-container\">\n\n            <!-- Load Route -->\n            <div class=\"fmc-load-wpt__label\">\n                <span>Waypoints / Route</span>\n                <i class=\"material-icons\">mode_edit</i>\n            </div>\n            <div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">\n                <input class=\"mdl-textfield__input load-wpt\" data-bind=\"value: loadRouteText, mdlTextfield: true\">\n                <label class=\"mdl-textfield__label\">Enter waypoints separated by spaces or a generated route</label>\n            </div>\n            <button class=\"mdl-button mdl-js-button mdl-button--icon load-wpt\" data-bind=\"click: loadRoute\">\n                <i class=\"material-icons\">keyboard_return</i>\n            </button>\n\n            <!-- Generate Route -->\n            <div class=\"mdl-textfield mdl-js-textfield fmc-generate-rte-container\">\n                <textarea class=\"mdl-textfield__input generate-rte\" readonly rows=\"6\" maxrows=\"6\" data-bind=\"value: generateRoute, mdlTextfield: true\"></textarea>\n                <label class=\"mdl-textfield__label\">Generated Route</label>\n            </div>\n        </div>\n    </div>\n</section>\n";
});

define('build/html/tab-contents/log.html',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "<!-- LOG tab contents -->\n<section class=\"mdl-layout__tab-panel fmc-log\">\n    <div class=\"page-content\">\n        <div class=\"fmc-log-container\">\n            <table class=\"mdl-data-table mdl-js-data-table\">\n                <thead>\n                    <tr class=\"log-header\">\n                        <th class=\"time-col\">Time</th>\n                        <th class=\"spd-col\">Spd.</th>\n                        <th class=\"hdg-col\">Hdg.</th>\n                        <th class=\"alt-col\">Alt.</th>\n                        <th class=\"lat-col\">Lat.</th>\n                        <th class=\"lon-col\">Lon.</th>\n                        <th class=\"fps-col\">FPS</th>\n                        <th class=\"oth-col\">Other</th>\n                    </tr>\n                </thead>\n                <tbody data-bind=\"foreach: logData\">\n                    <tr class=\"log-data\">\n                        <td data-bind=\"text: $data[0]\"></td>\n                        <td data-bind=\"text: $data[1]\"></td>\n                        <td data-bind=\"text: $data[2]\"></td>\n                        <td data-bind=\"text: $data[3]\"></td>\n                        <td data-bind=\"text: $data[4]\"></td>\n                        <td data-bind=\"text: $data[5]\"></td>\n                        <td data-bind=\"text: $data[6]\"></td>\n                        <td data-bind=\"text: $data[7]\"></td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n</section>\n";
});

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define('build/html/tab-contents/main',["require", "exports", "./route.html", "./dep-arr.html", "./legs.html", "./vnav.html", "./ils.html", "./progress.html", "./map.html", "./load.html", "./log.html"], function (require, exports, route_html_1, dep_arr_html_1, legs_html_1, vnav_html_1, ils_html_1, progress_html_1, map_html_1, load_html_1, log_html_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    route_html_1 = __importDefault(route_html_1);
    dep_arr_html_1 = __importDefault(dep_arr_html_1);
    legs_html_1 = __importDefault(legs_html_1);
    vnav_html_1 = __importDefault(vnav_html_1);
    ils_html_1 = __importDefault(ils_html_1);
    progress_html_1 = __importDefault(progress_html_1);
    map_html_1 = __importDefault(map_html_1);
    load_html_1 = __importDefault(load_html_1);
    log_html_1 = __importDefault(log_html_1);
    exports.default = [route_html_1.default, dep_arr_html_1.default, legs_html_1.default, vnav_html_1.default, ils_html_1.default, progress_html_1.default, map_html_1.default, load_html_1.default, log_html_1.default].join("");
});

define('build/style/button.css',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "button.fmc-btn,\nbutton.fmc-btn:hover,\nbutton.fmc-btn:active,\nbutton.fmc-btn:focus:not(:active) {\n\tcolor: white;\n\tbackground: green;\n}\n\nbutton.fmc-btn__fade {\n\ttransition: opacity 0.2s ease-in-out;\n\t-moz-transition: opacity 0.2s ease-in-out;\n\t-webkit-transition: opacity 0.2s ease-in-out;\n}\n\nbutton.fmc-btn__fade:hover {\n\topacity: 0.8;\n}\n";
});

define('build/style/externaldist.css',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "div.fmc-prog-info.geofs-f-standard-ui {\n    position: absolute;\n    margin-left: 5px;\n    margin-top: -2px;\n}\n\ndiv.fmc-prog-info.geofs-f-standard-ui span.mdl-chip.mdl-chip--contact {\n    padding-right: 12px;\n}\n";
});

define('build/style/modal.css',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "/* modal.html */\na.fmc-btn__fade {\n\ttransition: font-size 0.3s ease-in-out,\n\t\t\t\tfont-weight 0.3s ease-in-out,\n\t\t\t\tcolor 0.3s ease-in-out;\n\t-moz-transition: font-size 0.3s ease-in-out,\n\t\t\t\tfont-weight 0.3s ease-in-out,\n\t\t\t\tcolor 0.3s ease-in-out;\n\t-webkit-transition: font-size 0.3s ease-in-out,\n\t\t\t\tfont-weight 0.3s ease-in-out,\n\t\t\t\tcolor 0.3s ease-in-out;\n}\n\na.fmc-btn__fade:hover:not(.is-active) {\n\tfont-weight: bold;\n\tcolor: black;\n}\n\na.fmc-btn__fade.is-active {\n\tfont-size: 15px;\n\tfont-weight: bold;\n\tcolor: rgb(83, 109, 254) !important;\n}\n\ndiv.fmc-modal {\n\tdisplay: none;\n\twidth: 665px;\n    padding: 14px 14px;\n\tborder: none;\n\tborder-radius: 7px;\n\tposition: fixed;\n\ttop: 10%;\n\tleft: 0px;\n\tright: 0px;\n\theight: fit-content;\n\theight: -moz-fit-content;\n\theight: -webkit-fit-content;\n\tcolor: black;\n\tmargin: auto;\n\tbackground: white;\n}\n\ndiv.fmc-modal.opened {\n\tdisplay: block;\n}\n\ndiv.fmc-modal::backdrop {\n\tbackground: none;\n}\n\ndiv.fmc-modal .fmc-modal__close {\n\theight: 25px;\n\tmargin: -13px 0;\n\tfloat: right;\n}\n\ndiv.fmc-modal h4 {\n\ttext-align: center;\n\tmargin-top: 10px !important;\n\tmargin-bottom: 0px !important;\n}\n\ndiv.fmc-modal .fmc-modal__warning {\n\theight: 20px;\n\ttext-align: center;\n\tcolor: #d50000;\n}\n\ndiv.fmc-modal .fmc-modal__no-shadow {\n\tbox-shadow: none !important;\n\tbackground: white !important;\n    min-height: inherit;\n    height: inherit;\n\tposition: static !important; /* Default MDL css was redefined */\n}\n\n@media screen and (max-width: 1024px) {\n\t/* MDL's small screen hides modal header */\n\tdiv.fmc-modal .fmc-modal__no-shadow {\n\t\tdisplay: block !important;\n\t}\n}\n\ndiv.fmc-modal .fmc-modal__content main {\n\tpadding-top: 0px !important; /* Default MDL css was redefined */\n}\n\ndiv.fmc-modal__layout-container {\n\tposition: relative;\n\theight: auto;\n\tmargin-top: -2px;\n}\n\ndiv.fmc-modal__layout-container .mdl-layout__container {\n\tposition: relative !important;\n}\n\ndiv.fmc-modal__header {\n\theight: 48px;\n}\n\ndiv.fmc-modal__header a {\n\tcursor: pointer;\n}\n\ndiv.fmc-modal__tab-bar {\n\tbackground: inherit !important;\n}\n\ndiv.fmc-modal__divider {\n\theight: 2px;\n\tmargin-top: -2px;\n\tbackground: rgba(66, 66, 66, 0.2);\n}\n\ndiv.fmc-modal__content {\n\tpadding-top: 15px;\n}\n\ndiv.fmc-modal__actions .close {\n\tdisplay: none; /* TODO reposition */\n}\n\ndiv.fmc-modal__actions .interactive {\n\tdisplay: none;\n}\n\ndiv.fmc-modal__actions .interactive.is-active {\n\tdisplay: inline-block;\n}\n";
});

define('build/style/route.css',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "div.fmc-dep-arr-table-container {\n\tmargin-top: -10px;\n}\n\ndiv.fmc-dep-arr-table-container table {\n\twidth: 100%;\n}\n\ndiv.fmc-dep-arr-table-container .material-icons {\n\tvertical-align: middle;\n\tmargin-right: 5px;\n}\n\ndiv.fmc-dep-arr-table-container div {\n\twidth: 80%;\n}\n\ndiv.fmc-wpt-add-container {\n\tfloat: right;\n}\n\ndiv.fmc-modal__actions button[action=\"add-wpt\"] {\n\tmin-width: 35px;\n\twidth: 35px; height: 35px;\n\tfloat: right;\n}\n";
});

define('build/style/waypoints.css',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "div.fmc-wpt-list-container {\n\tpadding-bottom: 9px;\n\tmargin-top: -23px;\n\tmax-height: 277px;\n\toverflow: auto;\n}\n\ndiv.fmc-wpt-list-container table {\n\tborder: none;\n}\n\ndiv.fmc-wpt-list-container tr:hover {\n\tbackground-color: initial !important;\n}\n\ndiv.fmc-wpt-list-container th {\n\ttext-align: left;\n\tcursor: default;\n}\n\ndiv.fmc-wpt-list-container td {\n\tborder: none;\n}\n\ndiv.fmc-wpt-list-container .wpt-col {\n\twidth: 12%;\n}\n\ndiv.fmc-wpt-list-container .lat-col {\n\twidth: 11.8%;\n}\n\ndiv.fmc-wpt-list-container .lon-col {\n\twidth: 12.4%;\n}\n\ndiv.fmc-wpt-list-container .alt-col {\n\twidth: 3%;\n}\n\ndiv.fmc-wpt-list-container .actions-col {\n\twidth: 10%;\n}\n\ntr.wpt-row td {\n\tpadding-top: 0px !important;\n\tpadding-bottom: 0px !important;\n}\n\ntr.wpt-row .mdl-textfield {\n\twidth: initial;\n\tpadding: 14px 0;\n}\n\ntr.wpt-row .mdl-textfield__label {\n\ttop: 18px;\n}\n\ntr.wpt-row .mdl-textfield__label::after {\n\tbottom: 14px;\n}\n\ntr.wpt-row .fmc-wpt-info {\n\tcolor: rgb(83, 109, 254);\n\tposition: absolute;\n\ttop: -4px;\n\tfont-size: 12px;\n}\n\ntr.wpt-row button {\n\tfloat: left;\n\tmin-width: 22px !important;\n\twidth: 22px !important;\n\theight: 22px !important;\n}\n\nbutton[action=\"activate-wpt\"] .material-icons {\n\tcolor: blue;\n}\n";
});

define('build/style/dep-arr.css',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "div.fmc-dep-arr-container {\n    overflow: hidden;\n}\n\ndiv.fmc-dep-arr-container .fmc-dep-arr__input-label {\n    margin-left: 50px;\n    font-size: 16px;\n    font-weight: bold;\n    color: rgba(0, 0, 0, 0.26);\n    cursor: default;\n}\n\ndiv.fmc-dep-arr-container td div {\n    width: 140px;\n    margin-left: 10px;\n    position: relative;\n}\n\ndiv.fmc-dep-arr-container .mdl-textfield__input,\ndiv.fmc-dep-arr-container label {\n    width: 137px;\n}\n\ndiv.fmc-auto-tod-container {\n    position: relative;\n    left: 28%;\n}\n\ndiv.fmc-auto-tod-container .mdl-switch {\n    width: 280px;\n}\n\ndiv.fmc-auto-tod-container .mdl-switch__label {\n    font-weight: bold;\n    cursor: default !important;\n}\n";
});

define('build/style/legs.css',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "div.fmc-legs-container {\n    max-height: 340px;\n    min-height: 70px;\n    width: 665px;\n    overflow: auto;\n    font-family: monospace;\n}\n\ntable.fmc-legs-data-table {\n    margin-left: 60px;\n}\n\ntable.fmc-legs-data-table tr.activated {\n    color: rgb(83, 109, 254);\n}\n\ntable.fmc-legs-data-table tr.activated .wpt-name {\n    font-weight: bold;\n}\n\ntable.fmc-legs-data-table th {\n\ttext-align: left;\n\tcursor: default;\n}\n\ntable.fmc-legs-data-table td {\n\tpadding: 10px;\n}\n\ntable.fmc-legs-data-table .brng-and-wpt {\n    width: 100px;\n}\n\ntable.fmc-legs-data-table .dist-and-info {\n    width: 300px;\n}\n\ntable.fmc-legs-data-table .altitude {\n    width: 120px;\n}\n\ntable.fmc-legs-data-table .brng-from-prev {\n    height: 20px;\n    font-size: 18px;\n    margin-bottom: 4px;\n}\n\ntable.fmc-legs-data-table .wpt-name {\n    font-size: 30px;\n}\n\ntable.fmc-legs-data-table .dist-from-prev {\n    height: 20px;\n    font-size: 18px;\n    margin-bottom: 4px;\n}\n\ntable.fmc-legs-data-table .wpt-info {\n    height: 20px;\n    font-size: 20px;\n}\n\ntable.fmc-legs-data-table .alt-target {\n    font-size: 20px;\n    margin-top: 20px;\n}\n";
});

define('build/style/vnav.css',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "div.fmc-vnav-toggle-container {\n    margin-left: 60px;\n}\n\ndiv.fmc-vnav-toggle-container div:first-of-type{\n    float: left;\n    padding: 15px 0 25px;\n}\n/*\ndiv.fmc-vnav-toggle-container label[for=\"vnav-toggle\"] span {\n    margin-left: -10px;\n}*/\n\ndiv.fmc-vnav-toggle-container .mdl-switch__track {\n    padding: 0 !important;\n}\n\ndiv.fmc-vnav-toggle-container .material-icons {\n    vertical-align: bottom;\n    margin-left: -15px;\n    width: 25px;\n}\n\ndiv.fmc-vnav-toggle-container .mdl-textfield {\n    margin: -5px 0 -30px;\n}\n\ndiv.fmc-vnav-toggle-container input {\n    width: 133px;\n}\n\ndiv.fmc-vnav-toggle-container label {\n    width: 133px;\n}\n\ndiv.fmc-vnav-toggle-container label[for=\"vnav-toggle\"] {\n    width: 110px;\n}\n\ndiv.fmc-vnav-toggle-container .mdl-textfield--floating-label {\n    width: 140px;\n}\n\ndiv.fmc-spd-toggle-container {\n    padding: 15px 0 25px;\n    margin-left: 110px;\n    width: 140px;\n}\n\ndiv.fmc-vnav-phase-container {\n    position: relative;\n    left: 35%;\n    background: rgba(158, 158, 158, .2);\n    margin-top: -10px;\n}\n\ndiv.fmc-vnav-phase-container span {\n    font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n    font-size: 14px;\n    font-weight: 500;\n    text-transform: uppercase;\n    margin: 0 10px;\n}\n\ndiv.fmc-vnav-phase-container .toggle-phase {\n    background: rgb(83, 109, 254);\n    color: white;\n}\n\ndiv.fmc-vnav-phase-container .toggle-phase:hover {\n    background: rgb(83, 109, 254);\n}\n\ndiv.fmc-vnav-phase-container .toggle-phase:active {\n    background: rgba(83, 109, 254, 0.4);\n}\n\ndiv.fmc-vnav-phase-container .lock-phase {\n    min-width: 36px;\n    width: 36px;\n}\n\ndiv.fmc-vnav-phase-container .lock-phase .material-icons {\n    margin-left: -10px;\n}\n\ndiv.fmc-vnav-phase-container .lock-phase.locked {\n    background: red;\n    color: white;\n}\n\ndiv.fmc-vnav-phase-container .lock-phase.locked:hover {\n    background: red;\n}\n\ndiv.fmc-vnav-phase-container .lock-phase.locked:active {\n    background: rgba(255, 0, 0, 0.4);\n}\n";
});

define('build/style/ils.css',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "";
});

define('build/style/progress.css',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "div.fmc-prog-info {\n    display: inline-block;\n}\n\ndiv.fmc-prog-info .material-icons {\n    vertical-align: middle;\n}\n\ndiv.fmc-prog-container .fmc-prog-info {\n    padding: 8px;\n}\n\ndiv.fmc-prog-container .fmc-prog-info.dest-info {\n    margin: 0 70px;\n}\n\ndiv.fmc-prog-info.next-wpt-info {\n    margin-left: 180px;\n}\n\ndiv.fmc-prog-info span.mdl-chip.mdl-chip--contact {\n    padding: 0;\n    height: auto;\n}\n\ndiv.fmc-prog-info .distance-info {\n    height: 36px;\n    line-height: 36px;\n    font-size: 18px;\n    text-align: center;\n    width: 70px;\n}\n\ndiv.fmc-prog-info .mdl-chip__contact {\n    font-size: 14px;\n    height: 36px;\n    line-height: 36px;\n    width: auto;\n    padding: 0 8px;\n}\n\ndiv.fmc-prog-info .time-info {\n    background: tan;\n    margin-left: 8px;\n    margin-right: 0px;\n    text-align: left;\n}\n\ndiv.fmc-prog-info .time-info div {\n    line-height: 18px;\n    font-size: 12px;\n    width: 55px;\n}\n\ndiv.fmc-prog-info.next-wpt-info .time-info {\n    width: 50px;\n    text-align: center;\n}\n";
});

define('build/style/map.css',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "div.fmc-map-container {\n    height: 405px;\n    width: 700px;\n}\n";
});

define('build/style/load.css',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "div.fmc-load-container .mdl-textfield {\n    width: 420px;\n    overflow: hidden;\n}\n\ndiv.fmc-load-container .fmc-load-wpt__label {\n    font-size: 16px;\n    font-family: \"Helvetica\", \"Arial\", sans-serif;\n    float: left;\n    padding: 21px 10px;\n}\n\ndiv.fmc-load-container .fmc-load-wpt__label .material-icons {\n    vertical-align: middle;\n}\n\ndiv.fmc-load-container button.load-wpt {\n    margin-top: -60px;\n}\n\ndiv.fmc-load-container .fmc-generate-rte-container {\n    margin-left: 10px;\n}\n\ndiv.fmc-load-container .fmc-generate-rte-container textarea {\n    resize: none;\n    font-family: monospace;\n}\n\nbutton.interactive.load-tab {\n    float: right;\n}\n";
});

define('build/style/log.css',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "div.fmc-log-container {\n\tmax-height: 265px;\n\toverflow: auto;\n}\n\ndiv.fmc-log-container table {\n\tborder: none;\n}\n\ndiv.fmc-log-container tr:hover {\n\tbackground-color: initial !important;\n}\n\ndiv.fmc-log-container th {\n\ttext-align: left;\n}\n\ndiv.fmc-log-container td {\n\ttext-align: left;\n\tborder: none;\n\tpadding: 0 18px;\n\theight: 22px;\n}\n\ndiv.fmc-log-container .log-data {\n\theight: 22px;\n}\n\ndiv.fmc-log-container .time-col,\ndiv.fmc-log-container .spd-col,\ndiv.fmc-log-container .hdg-col,\ndiv.fmc-log-container .alt-col {\n\twidth: 75px;\n}\n\ndiv.fmc-log-container .lat-col,\ndiv.fmc-log-container .lon-col {\n\twidth: 90px;\n}\n\ndiv.fmc-log-container .fps-col {\n\twidth: 60px\n}\n\ndiv.fmc-log-container .oth-col {\n\twidth: 130px;\n}\n";
});

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define('build/style/main',["require", "exports", "./button.css", "./externaldist.css", "./modal.css", "./route.css", "./waypoints.css", "./dep-arr.css", "./legs.css", "./vnav.css", "./ils.css", "./progress.css", "./map.css", "./load.css", "./log.css"], function (require, exports, button_css_1, externaldist_css_1, modal_css_1, route_css_1, waypoints_css_1, dep_arr_css_1, legs_css_1, vnav_css_1, ils_css_1, progress_css_1, map_css_1, load_css_1, log_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    button_css_1 = __importDefault(button_css_1);
    externaldist_css_1 = __importDefault(externaldist_css_1);
    modal_css_1 = __importDefault(modal_css_1);
    route_css_1 = __importDefault(route_css_1);
    waypoints_css_1 = __importDefault(waypoints_css_1);
    dep_arr_css_1 = __importDefault(dep_arr_css_1);
    legs_css_1 = __importDefault(legs_css_1);
    vnav_css_1 = __importDefault(vnav_css_1);
    ils_css_1 = __importDefault(ils_css_1);
    progress_css_1 = __importDefault(progress_css_1);
    map_css_1 = __importDefault(map_css_1);
    load_css_1 = __importDefault(load_css_1);
    log_css_1 = __importDefault(log_css_1);
    exports.default = [
        button_css_1.default,
        externaldist_css_1.default,
        modal_css_1.default,
        route_css_1.default,
        waypoints_css_1.default,
        dep_arr_css_1.default,
        legs_css_1.default,
        vnav_css_1.default,
        ils_css_1.default,
        progress_css_1.default,
        map_css_1.default,
        load_css_1.default,
        log_css_1.default,
    ].join("");
});

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define('build/ui/position',["require", "exports", "./elements", "../html/button.html", "../html/externaldist.html", "../html/modal.html", "../html/tab-contents/main", "../style/main"], function (require, exports, elements_1, button_html_1, externaldist_html_1, modal_html_1, main_1, main_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.positioningFMC = void 0;
    button_html_1 = __importDefault(button_html_1);
    externaldist_html_1 = __importDefault(externaldist_html_1);
    modal_html_1 = __importDefault(modal_html_1);
    main_1 = __importDefault(main_1);
    main_2 = __importDefault(main_2);
    exports.positioningFMC = new Promise(function (resolve) {
        $("<style>").addClass("fmc-stylesheet").text(main_2.default).appendTo("head");
        $(modal_html_1.default).appendTo("body");
        $(main_1.default).appendTo(elements_1.E.container.modalContent);
        $(button_html_1.default).insertAfter('button.geofs-f-standard-ui[data-toggle-panel=".geofs-map-list"]');
        $(externaldist_html_1.default).appendTo(".geofs-ui-bottom");
        resolve();
    });
});

define('build/redefine',["require", "exports", "./log"], function (require, exports, log_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    geofs.resetFlight = function () {
        if (confirm("Reset Flight?")) {
            if (geofs.lastFlightCoordinates) {
                geofs.flyTo(geofs.lastFlightCoordinates, true);
                log_1.log.update("Flight reset");
            }
        }
    };
    geofs.togglePause = function () {
        if (!geofs.pause) {
            log_1.log.update("Flight paused");
            geofs.doPause();
        }
        else {
            geofs.undoPause();
            log_1.log.update("Flight resumed");
        }
    };
    controls.setters.setGear.set = function () {
        if (!geofs.aircraft.instance.groundContact || geofs.debug.on) {
            if (controls.gear.target === 0) {
                controls.gear.target = 1;
                log_1.log.update("Gear up");
            }
            else {
                controls.gear.target = 0;
                log_1.log.update("Gear down");
            }
            controls.setPartAnimationDelta(controls.gear);
        }
    };
    controls.setters.setFlapsUp.set = function () {
        if (controls.flaps.target > 0) {
            controls.flaps.target--;
            if (geofs.aircraft.instance.setup.flapsPositions) {
                controls.flaps.positionTarget =
                    geofs.aircraft.instance.setup.flapsPositions[controls.flaps.target];
                log_1.log.update("Flaps raised to " + controls.flaps.positionTarget);
            }
            else
                log_1.log.update("Flaps raised to " + controls.flaps.target);
            controls.setPartAnimationDelta(controls.flaps);
        }
    };
    controls.setters.setFlapsDown.set = function () {
        if (controls.flaps.target < geofs.aircraft.instance.setup.flapsSteps) {
            controls.flaps.target++;
            if (geofs.aircraft.instance.setup.flapsPositions) {
                controls.flaps.positionTarget =
                    geofs.aircraft.instance.setup.flapsPositions[controls.flaps.target];
                log_1.log.update("Flaps lowered to " + controls.flaps.positionTarget);
            }
            else
                log_1.log.update("Flaps lowered to " + controls.flaps.target);
            controls.setPartAnimationDelta(controls.flaps);
        }
    };
});

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define('build/ui/main',["require", "exports", "knockout", "./ViewModel", "./position", "../log", "../waypoints", "../nav/progress", "./elements", "../redefine"], function (require, exports, ko, ViewModel_1, position_1, log_1, waypoints_1, progress_1, elements_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ko = __importStar(ko);
    position_1.positioningFMC.then(loadFMC);
    function loadFMC() {
        var modal = elements_1.E.modal, container = elements_1.E.container, btn = elements_1.E.btn;
        var vm = new ViewModel_1.ViewModel();
        ko.applyBindings(vm, $(modal)[0]);
        ko.applyBindings(vm, $(btn.fmcBtn)[1]);
        ko.applyBindings(vm, $(container.uiBottomProgInfo)[0]);
        waypoints_1.waypoints.addWaypoint();
        $(modal).keydown(function (event) {
            if ((event.which === 27 || event.keyCode === 27) && $(this).is(":visible"))
                $(modal).removeClass("opened");
        });
        $(container.tabBar).on("click", "a", function (event) {
            event.preventDefault();
            var c = "is-active";
            var $this = $(this);
            var $that = $(container.tabBar).find("." + c);
            var interactive = $this.attr("interactive");
            $(btn.interactive).removeClass(c);
            if (interactive)
                $(interactive).addClass(c);
            $(container.modalContent).find($that.attr("to")).removeClass(c);
            $(container.modalContent).find($this.attr("to")).addClass(c);
            $that.removeClass(c);
            $this.addClass(c);
        });
        progress_1.progress.update();
        log_1.log.update();
        log_1.log.speed();
    }
});

/**
 * @license Copyright (c) 2016-2017 Harry Xue, (c) 2016-2017 Ethan Shields
 * Released under the GNU Affero General Public License, v3.0 or later
 * https://github.com/geofs-plugins/fmc-requirejs/blob/master/LICENSE.md
 */

(function () {
  // Check if game has completed loading
  var timer = setInterval(function () {
    if (
      !(
        window.L &&
        window.geofs &&
        window.geofs.aircraft &&
        window.geofs.aircraft.instance &&
        window.geofs.aircraft.instance.object3d &&
        window.navData.statusCode == 1 &&
        window.autopilot_pp.ready
      )
    )
      return;
    clearInterval(timer);
    require(["build/ui/main"]);
  }, 250);
})();

define("init", function(){});


var a = window.fmc = {};a.version="0.6.0";a.require=require;a.requirejs=requirejs;a.define=define;