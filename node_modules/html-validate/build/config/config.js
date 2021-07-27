"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ajv_1 = __importDefault(require("ajv"));
const deepmerge_1 = __importDefault(require("deepmerge"));
const error_1 = require("../error");
const meta_1 = require("../meta");
const element_1 = require("../meta/element");
const config_json_1 = __importDefault(require("../schema/config.json"));
const transform_1 = require("../transform");
const default_1 = __importDefault(require("./default"));
const error_2 = require("./error");
const severity_1 = require("./severity");
const presets_1 = __importDefault(require("./presets"));
let rootDirCache = null;
const ajv = new ajv_1.default({ jsonPointers: true });
ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-06.json"));
const validator = ajv.compile(config_json_1.default);
function overwriteMerge(a, b) {
    return b;
}
function mergeInternal(base, rhs) {
    const dst = deepmerge_1.default(base, Object.assign({}, rhs, { rules: {} }));
    /* rules need some special care, should overwrite arrays instead of
     * concaternation, i.e. ["error", {...options}] should not be merged by
     * appending to old value */
    if (rhs.rules) {
        dst.rules = deepmerge_1.default(dst.rules, rhs.rules, { arrayMerge: overwriteMerge });
    }
    /* root property is merged with boolean "or" since it should always be truthy
     * if any config has it set. */
    if (base.root || rhs.root) {
        dst.root = base.root || rhs.root;
    }
    return dst;
}
function loadFromFile(filename) {
    let json;
    try {
        /* remove cached copy so we always load a fresh copy, important for editors
         * which keep a long-running instance of [[HtmlValidate]] around. */
        delete require.cache[require.resolve(filename)];
        /* load using require as it can process both js and json */
        json = require(filename); // eslint-disable-line import/no-dynamic-require
    }
    catch (err) {
        throw new error_2.ConfigError(`Failed to read configuration from "${filename}"`, err);
    }
    /* expand any relative paths */
    for (const key of ["extends", "elements", "plugins"]) {
        if (!json[key])
            continue;
        json[key] = json[key].map((ref) => {
            return Config.expandRelative(ref, path_1.default.dirname(filename));
        });
    }
    return json;
}
/**
 * Configuration holder.
 *
 * Each file being validated will have a unique instance of this class.
 */
class Config {
    constructor(options) {
        const initial = {
            extends: [],
            plugins: [],
            rules: {},
            transform: {},
        };
        this.config = mergeInternal(initial, options || {});
        this.metaTable = null;
        this.rootDir = this.findRootDir();
        this.initialized = false;
        /* load plugins */
        this.plugins = this.loadPlugins(this.config.plugins || []);
        this.configurations = this.loadConfigurations(this.plugins);
        this.extendMeta(this.plugins);
        /* process extended configs */
        for (const extend of this.config.extends) {
            this.config = this.extendConfig(extend);
        }
        /* rules explicitly set by passed options should have precedence over any
         * extended rules, not the other way around. */
        if (options && options.rules) {
            this.config = mergeInternal(this.config, { rules: options.rules });
        }
    }
    /**
     * Create a new blank configuration. See also `Config.defaultConfig()`.
     */
    static empty() {
        return new Config({
            extends: [],
            rules: {},
            plugins: [],
            transform: {},
        });
    }
    /**
     * Create configuration from object.
     */
    static fromObject(options, filename = null) {
        Config.validate(options, filename);
        return new Config(options);
    }
    /**
     * Read configuration from filename.
     *
     * Note: this reads configuration data from a file. If you intent to load
     * configuration for a file to validate use `ConfigLoader.fromTarget()`.
     *
     * @param filename - The file to read from or one of the presets such as
     * `html-validate:recommended`.
     */
    static fromFile(filename) {
        const configdata = loadFromFile(filename);
        return Config.fromObject(configdata, filename);
    }
    /**
     * Validate configuration data.
     *
     * Throws SchemaValidationError if invalid.
     */
    static validate(options, filename) {
        const valid = validator(options);
        if (!valid) {
            throw new error_1.SchemaValidationError(filename, `Invalid configuration`, options, config_json_1.default, validator.errors);
        }
    }
    /**
     * Load a default configuration object.
     */
    static defaultConfig() {
        return new Config(default_1.default);
    }
    /**
     * Initialize plugins, transforms etc.
     *
     * Must be called before trying to use config. Can safely be called multiple
     * times.
     */
    init() {
        if (this.initialized) {
            return;
        }
        /* precompile transform patterns */
        this.transformers = this.precompileTransformers(this.config.transform || {});
        this.initialized = true;
    }
    /**
     * Returns true if this configuration is marked as "root".
     */
    isRootFound() {
        return this.config.root;
    }
    /**
     * Returns a new configuration as a merge of the two. Entries from the passed
     * object takes priority over this object.
     *
     * @param {Config} rhs - Configuration to merge with this one.
     */
    merge(rhs) {
        return new Config(mergeInternal(this.config, rhs.config));
    }
    extendConfig(entry) {
        let base;
        if (this.configurations.has(entry)) {
            base = this.configurations.get(entry);
        }
        else {
            base = Config.fromFile(entry).config;
        }
        return mergeInternal(this.config, base);
    }
    /**
     * Get element metadata.
     */
    getMetaTable() {
        /* use cached table if it exists */
        if (this.metaTable) {
            return this.metaTable;
        }
        const metaTable = new meta_1.MetaTable();
        const source = this.config.elements || ["html5"];
        const root = path_1.default.resolve(__dirname, "..", "..");
        /* extend validation schema from plugins */
        for (const plugin of this.getPlugins()) {
            if (plugin.elementSchema) {
                metaTable.extendValidationSchema(plugin.elementSchema);
            }
        }
        /* load from all entries */
        for (const entry of source) {
            /* load meta directly from entry */
            if (typeof entry !== "string") {
                metaTable.loadFromObject(entry);
                continue;
            }
            let filename;
            /* try searching builtin metadata */
            filename = `${root}/elements/${entry}.json`;
            if (fs_1.default.existsSync(filename)) {
                metaTable.loadFromFile(filename);
                continue;
            }
            /* try as regular file */
            filename = entry.replace("<rootDir>", this.rootDir);
            if (fs_1.default.existsSync(filename)) {
                metaTable.loadFromFile(filename);
                continue;
            }
            /* assume it is loadable with require() */
            try {
                // eslint-disable-next-line security/detect-non-literal-require, import/no-dynamic-require
                metaTable.loadFromObject(require(entry));
            }
            catch (err) {
                throw new error_2.ConfigError(`Failed to load elements from "${entry}": ${err.message}`, err);
            }
        }
        metaTable.init();
        return (this.metaTable = metaTable);
    }
    /**
     * @hidden exposed for testing only
     */
    static expandRelative(src, currentPath) {
        if (src[0] === ".") {
            return path_1.default.normalize(`${currentPath}/${src}`);
        }
        return src;
    }
    /**
     * Get a copy of internal configuration data.
     *
     * @hidden primary purpose is unittests
     */
    get() {
        const config = Object.assign({}, this.config);
        if (config.elements) {
            config.elements = config.elements.map((cur) => {
                if (typeof cur === "string") {
                    return cur.replace(this.rootDir, "<rootDir>");
                }
                else {
                    return cur;
                }
            });
        }
        return config;
    }
    /**
     * Get all configured rules, their severity and options.
     */
    getRules() {
        const rules = new Map();
        for (const [ruleId, data] of Object.entries(this.config.rules)) {
            let options = data;
            if (!Array.isArray(options)) {
                options = [options, {}];
            }
            else if (options.length === 1) {
                options = [options[0], {}];
            }
            const severity = severity_1.parseSeverity(options[0]);
            rules.set(ruleId, [severity, options[1]]);
        }
        return rules;
    }
    /**
     * Get all configured plugins.
     */
    getPlugins() {
        return this.plugins;
    }
    loadPlugins(plugins) {
        return plugins.map((moduleName) => {
            try {
                // eslint-disable-next-line security/detect-non-literal-require, import/no-dynamic-require
                const plugin = require(moduleName.replace("<rootDir>", this.rootDir));
                plugin.name = plugin.name || moduleName;
                plugin.originalName = moduleName;
                return plugin;
            }
            catch (err) {
                throw new error_2.ConfigError(`Failed to load plugin "${moduleName}": ${err}`, err);
            }
        });
    }
    loadConfigurations(plugins) {
        const configs = new Map();
        /* builtin presets */
        for (const [name, config] of Object.entries(presets_1.default)) {
            configs.set(name, config);
        }
        /* presets from plugins */
        for (const plugin of plugins) {
            for (const [name, config] of Object.entries(plugin.configs || {})) {
                /* add configuration with name provided by plugin */
                configs.set(`${plugin.name}:${name}`, config);
                /* add configuration with name provided by user (in config file) */
                if (plugin.name !== plugin.originalName) {
                    configs.set(`${plugin.originalName}:${name}`, config);
                }
            }
        }
        return configs;
    }
    extendMeta(plugins) {
        for (const plugin of plugins) {
            if (!plugin.elementSchema) {
                continue;
            }
            const { properties } = plugin.elementSchema;
            if (!properties) {
                continue;
            }
            for (const [key, schema] of Object.entries(properties)) {
                if (schema.copyable && !element_1.MetaCopyableProperty.includes(key)) {
                    element_1.MetaCopyableProperty.push(key);
                }
            }
        }
    }
    /**
     * Transform a source.
     *
     * When transforming zero or more new sources will be generated.
     *
     * @param source - Current source to transform.
     * @param filename - If set it is the filename used to match
     * transformer. Default is to use filename from source.
     * @return A list of transformed sources ready for validation.
     */
    transformSource(source, filename) {
        const transformer = this.findTransformer(filename || source.filename);
        const context = {
            hasChain: (filename) => {
                return !!this.findTransformer(filename);
            },
            chain: (source, filename) => {
                return this.transformSource(source, filename);
            },
        };
        if (transformer) {
            try {
                return Array.from(transformer.fn.call(context, source), (cur) => {
                    /* keep track of which transformers that has been run on this source
                     * by appending this entry to the transformedBy array */
                    cur.transformedBy = cur.transformedBy || [];
                    cur.transformedBy.push(transformer.name);
                    return cur;
                });
            }
            catch (err) {
                throw new error_1.NestedError(`When transforming "${source.filename}": ${err.message}`, err);
            }
        }
        else {
            return [source];
        }
    }
    /**
     * Wrapper around [[transformSource]] which reads a file before passing it
     * as-is to transformSource.
     *
     * @param source - Filename to transform (according to configured
     * transformations)
     * @return A list of transformed sources ready for validation.
     */
    transformFilename(filename) {
        const data = fs_1.default.readFileSync(filename, { encoding: "utf8" });
        const source = {
            data,
            filename,
            line: 1,
            column: 1,
            offset: 0,
            originalData: data,
        };
        return this.transformSource(source);
    }
    /**
     * Returns true if a transformer matches given filename.
     */
    canTransform(filename) {
        const entry = this.findTransformer(filename);
        return !!entry;
    }
    findTransformer(filename) {
        return this.transformers.find((entry) => entry.pattern.test(filename));
    }
    precompileTransformers(transform) {
        return Object.entries(transform).map(([pattern, name]) => {
            try {
                const fn = this.getTransformFunction(name);
                const version = fn.api || 0;
                /* check if transformer version is supported */
                if (version !== transform_1.TRANSFORMER_API.VERSION) {
                    throw new error_2.ConfigError(`Transformer uses API version ${version} but only version ${transform_1.TRANSFORMER_API.VERSION} is supported`);
                }
                return {
                    // eslint-disable-next-line security/detect-non-literal-regexp
                    pattern: new RegExp(pattern),
                    name,
                    fn,
                };
            }
            catch (err) {
                if (err instanceof error_2.ConfigError) {
                    throw new error_2.ConfigError(`Failed to load transformer "${name}": ${err.message}`, err);
                }
                else {
                    throw new error_2.ConfigError(`Failed to load transformer "${name}"`, err);
                }
            }
        });
    }
    /**
     * Get transformation function requested by configuration.
     *
     * Searches:
     *
     * - Named transformers from plugins.
     * - Unnamed transformer from plugin.
     * - Standalone modules (local or node_modules)
     *
     * @param name - Key from configuration
     */
    getTransformFunction(name) {
        /* try to match a named transformer from plugin */
        const match = name.match(/(.*):(.*)/);
        if (match) {
            const [, pluginName, key] = match;
            return this.getNamedTransformerFromPlugin(name, pluginName, key);
        }
        /* try to match an unnamed transformer from plugin */
        const plugin = this.plugins.find((cur) => cur.name === name);
        if (plugin) {
            return this.getUnnamedTransformerFromPlugin(name, plugin);
        }
        /* assume transformer refers to a regular module */
        return this.getTransformerFromModule(name);
    }
    /**
     * @param name - Original name from configuration
     * @param pluginName - Name of plugin
     * @param key - Name of transform (from plugin)
     */
    getNamedTransformerFromPlugin(name, pluginName, key) {
        const plugin = this.plugins.find((cur) => cur.name === pluginName);
        if (!plugin) {
            throw new error_2.ConfigError(`No plugin named "${pluginName}" has been loaded`);
        }
        if (!plugin.transformer) {
            throw new error_2.ConfigError(`Plugin does not expose any transformer`);
        }
        if (typeof plugin.transformer === "function") {
            throw new error_2.ConfigError(`Transformer "${name}" refers to named transformer but plugin exposes only unnamed, use "${pluginName}" instead.`);
        }
        if (!plugin.transformer[key]) {
            throw new error_2.ConfigError(`Plugin "${pluginName}" does not expose a transformer named "${key}".`);
        }
        return plugin.transformer[key];
    }
    /**
     * @param name - Original name from configuration
     * @param plugin - Plugin instance
     */
    getUnnamedTransformerFromPlugin(name, plugin) {
        if (!plugin.transformer) {
            throw new error_2.ConfigError(`Plugin does not expose any transformer`);
        }
        if (typeof plugin.transformer !== "function") {
            if (plugin.transformer.default) {
                return plugin.transformer.default;
            }
            throw new error_2.ConfigError(`Transformer "${name}" refers to unnamed transformer but plugin exposes only named.`);
        }
        return plugin.transformer;
    }
    getTransformerFromModule(name) {
        /* expand <rootDir> */
        const moduleName = name.replace("<rootDir>", this.rootDir);
        // eslint-disable-next-line security/detect-non-literal-require, import/no-dynamic-require
        const fn = require(moduleName);
        /* sanity check */
        if (typeof fn !== "function") {
            /* this is not a proper transformer, is it a plugin exposing a transformer? */
            if (fn.transformer) {
                throw new error_2.ConfigError(`Module is not a valid transformer. This looks like a plugin, did you forget to load the plugin first?`);
            }
            throw new error_2.ConfigError(`Module is not a valid transformer.`);
        }
        return fn;
    }
    findRootDir() {
        if (rootDirCache !== null) {
            return rootDirCache;
        }
        /* try to locate package.json */
        let current = process.cwd();
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const search = path_1.default.join(current, "package.json");
            if (fs_1.default.existsSync(search)) {
                return (rootDirCache = current);
            }
            /* get the parent directory */
            const child = current;
            current = path_1.default.dirname(current);
            /* stop if this is the root directory */
            if (current === child) {
                break;
            }
        }
        /* default to working directory if no package.json is found */
        return (rootDirCache = process.cwd());
    }
}
exports.Config = Config;
