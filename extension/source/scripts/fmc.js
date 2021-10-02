/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.6 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
 */

/*!
 * Knockout JavaScript library v3.5.1
 * (c) The Knockout.js team - http://knockoutjs.com/
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

/**
 * @license text 2.0.16 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/text/LICENSE
 */

/**
 * @license minify Copyright (c) 2016-2017 Harry Xue
 * Licensed under the MIT License (MIT)
 */

/**
 * @license Copyright (c) 2016-2017 Harry Xue, (c) 2016-2017 Ethan Shields
 * Released under the GNU Affero General Public License, v3.0 or later
 * https://github.com/geofs-plugins/fmc-requirejs/blob/master/LICENSE.md
 */

var requirejs, require, define;
!(function (global, setTimeout) {
  function commentReplace(t, e) {
    return e || "";
  }
  function isFunction(t) {
    return "[object Function]" === ostring.call(t);
  }
  function isArray(t) {
    return "[object Array]" === ostring.call(t);
  }
  function each(t, e) {
    if (t) {
      var n;
      for (n = 0; n < t.length && (!t[n] || !e(t[n], n, t)); n += 1);
    }
  }
  function eachReverse(t, e) {
    if (t) {
      var n;
      for (n = t.length - 1; n > -1 && (!t[n] || !e(t[n], n, t)); n -= 1);
    }
  }
  function hasProp(t, e) {
    return hasOwn.call(t, e);
  }
  function getOwn(t, e) {
    return hasProp(t, e) && t[e];
  }
  function eachProp(t, e) {
    var n;
    for (n in t) if (hasProp(t, n) && e(t[n], n)) break;
  }
  function mixin(t, e, n, a) {
    return (
      e &&
        eachProp(e, function (e, i) {
          (!n && hasProp(t, i)) ||
            (!a ||
            "object" != typeof e ||
            !e ||
            isArray(e) ||
            isFunction(e) ||
            e instanceof RegExp
              ? (t[i] = e)
              : (t[i] || (t[i] = {}), mixin(t[i], e, n, a)));
        }),
      t
    );
  }
  function bind(t, e) {
    return function () {
      return e.apply(t, arguments);
    };
  }
  function scripts() {
    return document.getElementsByTagName("script");
  }
  function defaultOnError(t) {
    throw t;
  }
  function getGlobal(t) {
    if (!t) return t;
    var e = global;
    return (
      each(t.split("."), function (t) {
        e = e[t];
      }),
      e
    );
  }
  function makeError(t, e, n, a) {
    var i = new Error(e + "\nhttps://requirejs.org/docs/errors.html#" + t);
    return (
      (i.requireType = t), (i.requireModules = a), n && (i.originalError = n), i
    );
  }
  function newContext(t) {
    function e(t) {
      var e, n;
      for (e = 0; e < t.length; e++)
        if ("." === (n = t[e])) t.splice(e, 1), (e -= 1);
        else if (".." === n) {
          if (0 === e || (1 === e && ".." === t[2]) || ".." === t[e - 1])
            continue;
          e > 0 && (t.splice(e - 1, 2), (e -= 2));
        }
    }
    function n(t, n, a) {
      var i,
        r,
        o,
        s,
        l,
        c,
        d,
        u,
        f,
        p,
        m,
        h = n && n.split("/"),
        v = E.map,
        b = v && v["*"];
      if (
        (t &&
          ((t = t.split("/")),
          (c = t.length - 1),
          E.nodeIdCompat &&
            jsSuffixRegExp.test(t[c]) &&
            (t[c] = t[c].replace(jsSuffixRegExp, "")),
          "." === t[0].charAt(0) &&
            h &&
            ((m = h.slice(0, h.length - 1)), (t = m.concat(t))),
          e(t),
          (t = t.join("/"))),
        a && v && (h || b))
      ) {
        r = t.split("/");
        t: for (o = r.length; o > 0; o -= 1) {
          if (((l = r.slice(0, o).join("/")), h))
            for (s = h.length; s > 0; s -= 1)
              if (
                (i = getOwn(v, h.slice(0, s).join("/"))) &&
                (i = getOwn(i, l))
              ) {
                (d = i), (u = o);
                break t;
              }
          !f && b && getOwn(b, l) && ((f = getOwn(b, l)), (p = o));
        }
        !d && f && ((d = f), (u = p)),
          d && (r.splice(0, u, d), (t = r.join("/")));
      }
      return getOwn(E.pkgs, t) || t;
    }
    function a(t) {
      isBrowser &&
        each(scripts(), function (e) {
          if (
            e.getAttribute("data-requiremodule") === t &&
            e.getAttribute("data-requirecontext") === w.contextName
          )
            return e.parentNode.removeChild(e), !0;
        });
    }
    function i(t) {
      var e = getOwn(E.paths, t);
      if (e && isArray(e) && e.length > 1)
        return (
          e.shift(),
          w.require.undef(t),
          w.makeRequire(null, { skipMap: !0 })([t]),
          !0
        );
    }
    function r(t) {
      var e,
        n = t ? t.indexOf("!") : -1;
      return (
        n > -1 && ((e = t.substring(0, n)), (t = t.substring(n + 1, t.length))),
        [e, t]
      );
    }
    function o(t, e, a, i) {
      var o,
        s,
        l,
        c,
        d = null,
        u = e ? e.name : null,
        f = t,
        p = !0,
        m = "";
      return (
        t || ((p = !1), (t = "_@r" + (M += 1))),
        (c = r(t)),
        (d = c[0]),
        (t = c[1]),
        d && ((d = n(d, u, i)), (s = getOwn(D, d))),
        t &&
          (d
            ? (m = a
                ? t
                : s && s.normalize
                ? s.normalize(t, function (t) {
                    return n(t, u, i);
                  })
                : -1 === t.indexOf("!")
                ? n(t, u, i)
                : t)
            : ((m = n(t, u, i)),
              (c = r(m)),
              (d = c[0]),
              (m = c[1]),
              (a = !0),
              (o = w.nameToUrl(m)))),
        (l = !d || s || a ? "" : "_unnormalized" + (j += 1)),
        {
          prefix: d,
          name: m,
          parentMap: e,
          unnormalized: !!l,
          url: o,
          originalName: f,
          isDefine: p,
          id: (d ? d + "!" + m : m) + l,
        }
      );
    }
    function s(t) {
      var e = t.id,
        n = getOwn(k, e);
      return n || (n = k[e] = new w.Module(t)), n;
    }
    function l(t, e, n) {
      var a = t.id,
        i = getOwn(k, a);
      !hasProp(D, a) || (i && !i.defineEmitComplete)
        ? ((i = s(t)), i.error && "error" === e ? n(i.error) : i.on(e, n))
        : "defined" === e && n(D[a]);
    }
    function c(t, e) {
      var n = t.requireModules,
        a = !1;
      e
        ? e(t)
        : (each(n, function (e) {
            var n = getOwn(k, e);
            n &&
              ((n.error = t), n.events.error && ((a = !0), n.emit("error", t)));
          }),
          a || req.onError(t));
    }
    function d() {
      globalDefQueue.length &&
        (each(globalDefQueue, function (t) {
          var e = t[0];
          "string" == typeof e && (w.defQueueMap[e] = !0), S.push(t);
        }),
        (globalDefQueue = []));
    }
    function u(t) {
      delete k[t], delete T[t];
    }
    function f(t, e, n) {
      var a = t.map.id;
      t.error
        ? t.emit("error", t.error)
        : ((e[a] = !0),
          each(t.depMaps, function (a, i) {
            var r = a.id,
              o = getOwn(k, r);
            !o ||
              t.depMatched[i] ||
              n[r] ||
              (getOwn(e, r) ? (t.defineDep(i, D[r]), t.check()) : f(o, e, n));
          }),
          (n[a] = !0));
    }
    function p() {
      var t,
        e,
        n = 1e3 * E.waitSeconds,
        r = n && w.startTime + n < new Date().getTime(),
        o = [],
        s = [],
        l = !1,
        d = !0;
      if (!g) {
        if (
          ((g = !0),
          eachProp(T, function (t) {
            var n = t.map,
              c = n.id;
            if (t.enabled && (n.isDefine || s.push(t), !t.error))
              if (!t.inited && r)
                i(c) ? ((e = !0), (l = !0)) : (o.push(c), a(c));
              else if (
                !t.inited &&
                t.fetched &&
                n.isDefine &&
                ((l = !0), !n.prefix)
              )
                return (d = !1);
          }),
          r && o.length)
        )
          return (
            (t = makeError(
              "timeout",
              "Load timeout for modules: " + o,
              null,
              o
            )),
            (t.contextName = w.contextName),
            c(t)
          );
        d &&
          each(s, function (t) {
            f(t, {}, {});
          }),
          (r && !e) ||
            !l ||
            (!isBrowser && !isWebWorker) ||
            _ ||
            (_ = setTimeout(function () {
              (_ = 0), p();
            }, 50)),
          (g = !1);
      }
    }
    function m(t) {
      hasProp(D, t[0]) || s(o(t[0], null, !0)).init(t[1], t[2]);
    }
    function h(t, e, n, a) {
      t.detachEvent && !isOpera
        ? a && t.detachEvent(a, e)
        : t.removeEventListener(n, e, !1);
    }
    function v(t) {
      var e = t.currentTarget || t.srcElement;
      return (
        h(e, w.onScriptLoad, "load", "onreadystatechange"),
        h(e, w.onScriptError, "error"),
        { node: e, id: e && e.getAttribute("data-requiremodule") }
      );
    }
    function b() {
      var t;
      for (d(); S.length; ) {
        if (((t = S.shift()), null === t[0]))
          return c(
            makeError(
              "mismatch",
              "Mismatched anonymous define() module: " + t[t.length - 1]
            )
          );
        m(t);
      }
      w.defQueueMap = {};
    }
    var g,
      y,
      w,
      x,
      _,
      E = {
        waitSeconds: 7,
        baseUrl: "./",
        paths: {},
        bundles: {},
        pkgs: {},
        shim: {},
        config: {},
      },
      k = {},
      T = {},
      C = {},
      S = [],
      D = {},
      N = {},
      A = {},
      M = 1,
      j = 1;
    return (
      (x = {
        require: function (t) {
          return t.require ? t.require : (t.require = w.makeRequire(t.map));
        },
        exports: function (t) {
          if (((t.usingExports = !0), t.map.isDefine))
            return t.exports
              ? (D[t.map.id] = t.exports)
              : (t.exports = D[t.map.id] = {});
        },
        module: function (t) {
          return t.module
            ? t.module
            : (t.module = {
                id: t.map.id,
                uri: t.map.url,
                config: function () {
                  return getOwn(E.config, t.map.id) || {};
                },
                exports: t.exports || (t.exports = {}),
              });
        },
      }),
      (y = function (t) {
        (this.events = getOwn(C, t.id) || {}),
          (this.map = t),
          (this.shim = getOwn(E.shim, t.id)),
          (this.depExports = []),
          (this.depMaps = []),
          (this.depMatched = []),
          (this.pluginMaps = {}),
          (this.depCount = 0);
      }),
      (y.prototype = {
        init: function (t, e, n, a) {
          (a = a || {}),
            this.inited ||
              ((this.factory = e),
              n
                ? this.on("error", n)
                : this.events.error &&
                  (n = bind(this, function (t) {
                    this.emit("error", t);
                  })),
              (this.depMaps = t && t.slice(0)),
              (this.errback = n),
              (this.inited = !0),
              (this.ignore = a.ignore),
              a.enabled || this.enabled ? this.enable() : this.check());
        },
        defineDep: function (t, e) {
          this.depMatched[t] ||
            ((this.depMatched[t] = !0),
            (this.depCount -= 1),
            (this.depExports[t] = e));
        },
        fetch: function () {
          if (!this.fetched) {
            (this.fetched = !0), (w.startTime = new Date().getTime());
            var t = this.map;
            if (!this.shim) return t.prefix ? this.callPlugin() : this.load();
            w.makeRequire(this.map, { enableBuildCallback: !0 })(
              this.shim.deps || [],
              bind(this, function () {
                return t.prefix ? this.callPlugin() : this.load();
              })
            );
          }
        },
        load: function () {
          var t = this.map.url;
          N[t] || ((N[t] = !0), w.load(this.map.id, t));
        },
        check: function () {
          if (this.enabled && !this.enabling) {
            var t,
              e,
              n = this.map.id,
              a = this.depExports,
              i = this.exports,
              r = this.factory;
            if (this.inited) {
              if (this.error) this.emit("error", this.error);
              else if (!this.defining) {
                if (
                  ((this.defining = !0), this.depCount < 1 && !this.defined)
                ) {
                  if (isFunction(r)) {
                    if (
                      (this.events.error && this.map.isDefine) ||
                      req.onError !== defaultOnError
                    )
                      try {
                        i = w.execCb(n, r, a, i);
                      } catch (e) {
                        t = e;
                      }
                    else i = w.execCb(n, r, a, i);
                    if (
                      (this.map.isDefine &&
                        void 0 === i &&
                        ((e = this.module),
                        e
                          ? (i = e.exports)
                          : this.usingExports && (i = this.exports)),
                      t)
                    )
                      return (
                        (t.requireMap = this.map),
                        (t.requireModules = this.map.isDefine
                          ? [this.map.id]
                          : null),
                        (t.requireType = this.map.isDefine
                          ? "define"
                          : "require"),
                        c((this.error = t))
                      );
                  } else i = r;
                  if (
                    ((this.exports = i),
                    this.map.isDefine &&
                      !this.ignore &&
                      ((D[n] = i), req.onResourceLoad))
                  ) {
                    var o = [];
                    each(this.depMaps, function (t) {
                      o.push(t.normalizedMap || t);
                    }),
                      req.onResourceLoad(w, this.map, o);
                  }
                  u(n), (this.defined = !0);
                }
                (this.defining = !1),
                  this.defined &&
                    !this.defineEmitted &&
                    ((this.defineEmitted = !0),
                    this.emit("defined", this.exports),
                    (this.defineEmitComplete = !0));
              }
            } else hasProp(w.defQueueMap, n) || this.fetch();
          }
        },
        callPlugin: function () {
          var t = this.map,
            e = t.id,
            a = o(t.prefix);
          this.depMaps.push(a),
            l(
              a,
              "defined",
              bind(this, function (a) {
                var i,
                  r,
                  d,
                  f = getOwn(A, this.map.id),
                  p = this.map.name,
                  m = this.map.parentMap ? this.map.parentMap.name : null,
                  h = w.makeRequire(t.parentMap, { enableBuildCallback: !0 });
                return this.map.unnormalized
                  ? (a.normalize &&
                      (p =
                        a.normalize(p, function (t) {
                          return n(t, m, !0);
                        }) || ""),
                    (r = o(t.prefix + "!" + p, this.map.parentMap, !0)),
                    l(
                      r,
                      "defined",
                      bind(this, function (t) {
                        (this.map.normalizedMap = r),
                          this.init(
                            [],
                            function () {
                              return t;
                            },
                            null,
                            { enabled: !0, ignore: !0 }
                          );
                      })
                    ),
                    void (
                      (d = getOwn(k, r.id)) &&
                      (this.depMaps.push(r),
                      this.events.error &&
                        d.on(
                          "error",
                          bind(this, function (t) {
                            this.emit("error", t);
                          })
                        ),
                      d.enable())
                    ))
                  : f
                  ? ((this.map.url = w.nameToUrl(f)), void this.load())
                  : ((i = bind(this, function (t) {
                      this.init(
                        [],
                        function () {
                          return t;
                        },
                        null,
                        { enabled: !0 }
                      );
                    })),
                    (i.error = bind(this, function (t) {
                      (this.inited = !0),
                        (this.error = t),
                        (t.requireModules = [e]),
                        eachProp(k, function (t) {
                          0 === t.map.id.indexOf(e + "_unnormalized") &&
                            u(t.map.id);
                        }),
                        c(t);
                    })),
                    (i.fromText = bind(this, function (n, a) {
                      var r = t.name,
                        l = o(r),
                        d = useInteractive;
                      a && (n = a),
                        d && (useInteractive = !1),
                        s(l),
                        hasProp(E.config, e) && (E.config[r] = E.config[e]);
                      try {
                        req.exec(n);
                      } catch (t) {
                        return c(
                          makeError(
                            "fromtexteval",
                            "fromText eval for " + e + " failed: " + t,
                            t,
                            [e]
                          )
                        );
                      }
                      d && (useInteractive = !0),
                        this.depMaps.push(l),
                        w.completeLoad(r),
                        h([r], i);
                    })),
                    void a.load(t.name, h, i, E));
              })
            ),
            w.enable(a, this),
            (this.pluginMaps[a.id] = a);
        },
        enable: function () {
          (T[this.map.id] = this),
            (this.enabled = !0),
            (this.enabling = !0),
            each(
              this.depMaps,
              bind(this, function (t, e) {
                var n, a, i;
                if ("string" == typeof t) {
                  if (
                    ((t = o(
                      t,
                      this.map.isDefine ? this.map : this.map.parentMap,
                      !1,
                      !this.skipMap
                    )),
                    (this.depMaps[e] = t),
                    (i = getOwn(x, t.id)))
                  )
                    return void (this.depExports[e] = i(this));
                  (this.depCount += 1),
                    l(
                      t,
                      "defined",
                      bind(this, function (t) {
                        this.undefed || (this.defineDep(e, t), this.check());
                      })
                    ),
                    this.errback
                      ? l(t, "error", bind(this, this.errback))
                      : this.events.error &&
                        l(
                          t,
                          "error",
                          bind(this, function (t) {
                            this.emit("error", t);
                          })
                        );
                }
                (n = t.id),
                  (a = k[n]),
                  hasProp(x, n) || !a || a.enabled || w.enable(t, this);
              })
            ),
            eachProp(
              this.pluginMaps,
              bind(this, function (t) {
                var e = getOwn(k, t.id);
                e && !e.enabled && w.enable(t, this);
              })
            ),
            (this.enabling = !1),
            this.check();
        },
        on: function (t, e) {
          var n = this.events[t];
          n || (n = this.events[t] = []), n.push(e);
        },
        emit: function (t, e) {
          each(this.events[t], function (t) {
            t(e);
          }),
            "error" === t && delete this.events[t];
        },
      }),
      (w = {
        config: E,
        contextName: t,
        registry: k,
        defined: D,
        urlFetched: N,
        defQueue: S,
        defQueueMap: {},
        Module: y,
        makeModuleMap: o,
        nextTick: req.nextTick,
        onError: c,
        configure: function (t) {
          if (
            (t.baseUrl &&
              "/" !== t.baseUrl.charAt(t.baseUrl.length - 1) &&
              (t.baseUrl += "/"),
            "string" == typeof t.urlArgs)
          ) {
            var e = t.urlArgs;
            t.urlArgs = function (t, n) {
              return (-1 === n.indexOf("?") ? "?" : "&") + e;
            };
          }
          var n = E.shim,
            a = { paths: !0, bundles: !0, config: !0, map: !0 };
          eachProp(t, function (t, e) {
            a[e] ? (E[e] || (E[e] = {}), mixin(E[e], t, !0, !0)) : (E[e] = t);
          }),
            t.bundles &&
              eachProp(t.bundles, function (t, e) {
                each(t, function (t) {
                  t !== e && (A[t] = e);
                });
              }),
            t.shim &&
              (eachProp(t.shim, function (t, e) {
                isArray(t) && (t = { deps: t }),
                  (!t.exports && !t.init) ||
                    t.exportsFn ||
                    (t.exportsFn = w.makeShimExports(t)),
                  (n[e] = t);
              }),
              (E.shim = n)),
            t.packages &&
              each(t.packages, function (t) {
                var e, n;
                (t = "string" == typeof t ? { name: t } : t),
                  (n = t.name),
                  (e = t.location),
                  e && (E.paths[n] = t.location),
                  (E.pkgs[n] =
                    t.name +
                    "/" +
                    (t.main || "main")
                      .replace(currDirRegExp, "")
                      .replace(jsSuffixRegExp, ""));
              }),
            eachProp(k, function (t, e) {
              t.inited || t.map.unnormalized || (t.map = o(e, null, !0));
            }),
            (t.deps || t.callback) && w.require(t.deps || [], t.callback);
        },
        makeShimExports: function (t) {
          function e() {
            var e;
            return (
              t.init && (e = t.init.apply(global, arguments)),
              e || (t.exports && getGlobal(t.exports))
            );
          }
          return e;
        },
        makeRequire: function (e, i) {
          function r(n, a, l) {
            var d, u, f;
            return (
              i.enableBuildCallback &&
                a &&
                isFunction(a) &&
                (a.__requireJsBuild = !0),
              "string" == typeof n
                ? isFunction(a)
                  ? c(makeError("requireargs", "Invalid require call"), l)
                  : e && hasProp(x, n)
                  ? x[n](k[e.id])
                  : req.get
                  ? req.get(w, n, e, r)
                  : ((u = o(n, e, !1, !0)),
                    (d = u.id),
                    hasProp(D, d)
                      ? D[d]
                      : c(
                          makeError(
                            "notloaded",
                            'Module name "' +
                              d +
                              '" has not been loaded yet for context: ' +
                              t +
                              (e ? "" : ". Use require([])")
                          )
                        ))
                : (b(),
                  w.nextTick(function () {
                    b(),
                      (f = s(o(null, e))),
                      (f.skipMap = i.skipMap),
                      f.init(n, a, l, { enabled: !0 }),
                      p();
                  }),
                  r)
            );
          }
          return (
            (i = i || {}),
            mixin(r, {
              isBrowser: isBrowser,
              toUrl: function (t) {
                var a,
                  i = t.lastIndexOf("."),
                  r = t.split("/")[0],
                  o = "." === r || ".." === r;
                return (
                  -1 !== i &&
                    (!o || i > 1) &&
                    ((a = t.substring(i, t.length)), (t = t.substring(0, i))),
                  w.nameToUrl(n(t, e && e.id, !0), a, !0)
                );
              },
              defined: function (t) {
                return hasProp(D, o(t, e, !1, !0).id);
              },
              specified: function (t) {
                return (t = o(t, e, !1, !0).id), hasProp(D, t) || hasProp(k, t);
              },
            }),
            e ||
              (r.undef = function (t) {
                d();
                var n = o(t, e, !0),
                  i = getOwn(k, t);
                (i.undefed = !0),
                  a(t),
                  delete D[t],
                  delete N[n.url],
                  delete C[t],
                  eachReverse(S, function (e, n) {
                    e[0] === t && S.splice(n, 1);
                  }),
                  delete w.defQueueMap[t],
                  i && (i.events.defined && (C[t] = i.events), u(t));
              }),
            r
          );
        },
        enable: function (t) {
          getOwn(k, t.id) && s(t).enable();
        },
        completeLoad: function (t) {
          var e,
            n,
            a,
            r = getOwn(E.shim, t) || {},
            o = r.exports;
          for (d(); S.length; ) {
            if (((n = S.shift()), null === n[0])) {
              if (((n[0] = t), e)) break;
              e = !0;
            } else n[0] === t && (e = !0);
            m(n);
          }
          if (
            ((w.defQueueMap = {}),
            (a = getOwn(k, t)),
            !e && !hasProp(D, t) && a && !a.inited)
          ) {
            if (!(!E.enforceDefine || (o && getGlobal(o))))
              return i(t)
                ? void 0
                : c(
                    makeError("nodefine", "No define call for " + t, null, [t])
                  );
            m([t, r.deps || [], r.exportsFn]);
          }
          p();
        },
        nameToUrl: function (t, e, n) {
          var a,
            i,
            r,
            o,
            s,
            l,
            c,
            d = getOwn(E.pkgs, t);
          if ((d && (t = d), (c = getOwn(A, t)))) return w.nameToUrl(c, e, n);
          if (req.jsExtRegExp.test(t)) s = t + (e || "");
          else {
            for (a = E.paths, i = t.split("/"), r = i.length; r > 0; r -= 1)
              if (((o = i.slice(0, r).join("/")), (l = getOwn(a, o)))) {
                isArray(l) && (l = l[0]), i.splice(0, r, l);
                break;
              }
            (s = i.join("/")),
              (s += e || (/^data\:|^blob\:|\?/.test(s) || n ? "" : ".js")),
              (s =
                ("/" === s.charAt(0) || s.match(/^[\w\+\.\-]+:/)
                  ? ""
                  : E.baseUrl) + s);
          }
          return E.urlArgs && !/^blob\:/.test(s) ? s + E.urlArgs(t, s) : s;
        },
        load: function (t, e) {
          req.load(w, t, e);
        },
        execCb: function (t, e, n, a) {
          return e.apply(a, n);
        },
        onScriptLoad: function (t) {
          if (
            "load" === t.type ||
            readyRegExp.test((t.currentTarget || t.srcElement).readyState)
          ) {
            interactiveScript = null;
            var e = v(t);
            w.completeLoad(e.id);
          }
        },
        onScriptError: function (t) {
          var e = v(t);
          if (!i(e.id)) {
            var n = [];
            return (
              eachProp(k, function (t, a) {
                0 !== a.indexOf("_@r") &&
                  each(t.depMaps, function (t) {
                    if (t.id === e.id) return n.push(a), !0;
                  });
              }),
              c(
                makeError(
                  "scripterror",
                  'Script error for "' +
                    e.id +
                    (n.length ? '", needed by: ' + n.join(", ") : '"'),
                  t,
                  [e.id]
                )
              )
            );
          }
        },
      }),
      (w.require = w.makeRequire()),
      w
    );
  }
  function getInteractiveScript() {
    return interactiveScript && "interactive" === interactiveScript.readyState
      ? interactiveScript
      : (eachReverse(scripts(), function (t) {
          if ("interactive" === t.readyState) return (interactiveScript = t);
        }),
        interactiveScript);
  }
  var req,
    s,
    head,
    baseElement,
    dataMain,
    src,
    interactiveScript,
    currentlyAddingScript,
    mainScript,
    subPath,
    version = "2.3.6",
    commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm,
    cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
    jsSuffixRegExp = /\.js$/,
    currDirRegExp = /^\.\//,
    op = Object.prototype,
    ostring = op.toString,
    hasOwn = op.hasOwnProperty,
    isBrowser = !(
      "undefined" == typeof window ||
      "undefined" == typeof navigator ||
      !window.document
    ),
    isWebWorker = !isBrowser && "undefined" != typeof importScripts,
    readyRegExp =
      isBrowser && "PLAYSTATION 3" === navigator.platform
        ? /^complete$/
        : /^(complete|loaded)$/,
    defContextName = "_",
    isOpera =
      "undefined" != typeof opera && "[object Opera]" === opera.toString(),
    contexts = {},
    cfg = {},
    globalDefQueue = [],
    useInteractive = !1;
  if (void 0 === define) {
    if (void 0 !== requirejs) {
      if (isFunction(requirejs)) return;
      (cfg = requirejs), (requirejs = void 0);
    }
    void 0 === require ||
      isFunction(require) ||
      ((cfg = require), (require = void 0)),
      (req = requirejs =
        function (t, e, n, a) {
          var i,
            r,
            o = defContextName;
          return (
            isArray(t) ||
              "string" == typeof t ||
              ((r = t), isArray(e) ? ((t = e), (e = n), (n = a)) : (t = [])),
            r && r.context && (o = r.context),
            (i = getOwn(contexts, o)),
            i || (i = contexts[o] = req.s.newContext(o)),
            r && i.configure(r),
            i.require(t, e, n)
          );
        }),
      (req.config = function (t) {
        return req(t);
      }),
      (req.nextTick =
        void 0 !== setTimeout
          ? function (t) {
              setTimeout(t, 4);
            }
          : function (t) {
              t();
            }),
      require || (require = req),
      (req.version = version),
      (req.jsExtRegExp = /^\/|:|\?|\.js$/),
      (req.isBrowser = isBrowser),
      (s = req.s = { contexts: contexts, newContext: newContext }),
      req({}),
      each(["toUrl", "undef", "defined", "specified"], function (t) {
        req[t] = function () {
          var e = contexts[defContextName];
          return e.require[t].apply(e, arguments);
        };
      }),
      isBrowser &&
        ((head = s.head = document.getElementsByTagName("head")[0]),
        (baseElement = document.getElementsByTagName("base")[0]) &&
          (head = s.head = baseElement.parentNode)),
      (req.onError = defaultOnError),
      (req.createNode = function (t, e, n) {
        var a = t.xhtml
          ? document.createElementNS(
              "http://www.w3.org/1999/xhtml",
              "html:script"
            )
          : document.createElement("script");
        return (
          (a.type = t.scriptType || "text/javascript"),
          (a.charset = "utf-8"),
          (a.async = !0),
          a
        );
      }),
      (req.load = function (t, e, n) {
        var a,
          i = (t && t.config) || {};
        if (isBrowser)
          return (
            (a = req.createNode(i, e, n)),
            a.setAttribute("data-requirecontext", t.contextName),
            a.setAttribute("data-requiremodule", e),
            !a.attachEvent ||
            (a.attachEvent.toString &&
              a.attachEvent.toString().indexOf("[native code") < 0) ||
            isOpera
              ? (a.addEventListener("load", t.onScriptLoad, !1),
                a.addEventListener("error", t.onScriptError, !1))
              : ((useInteractive = !0),
                a.attachEvent("onreadystatechange", t.onScriptLoad)),
            (a.src = n),
            i.onNodeCreated && i.onNodeCreated(a, i, e, n),
            (currentlyAddingScript = a),
            baseElement
              ? head.insertBefore(a, baseElement)
              : head.appendChild(a),
            (currentlyAddingScript = null),
            a
          );
        if (isWebWorker)
          try {
            setTimeout(function () {}, 0), importScripts(n), t.completeLoad(e);
          } catch (a) {
            t.onError(
              makeError(
                "importscripts",
                "importScripts failed for " + e + " at " + n,
                a,
                [e]
              )
            );
          }
      }),
      isBrowser &&
        !cfg.skipDataMain &&
        eachReverse(scripts(), function (t) {
          if (
            (head || (head = t.parentNode),
            (dataMain = t.getAttribute("data-main")))
          )
            return (
              (mainScript = dataMain),
              cfg.baseUrl ||
                -1 !== mainScript.indexOf("!") ||
                ((src = mainScript.split("/")),
                (mainScript = src.pop()),
                (subPath = src.length ? src.join("/") + "/" : "./"),
                (cfg.baseUrl = subPath)),
              (mainScript = mainScript.replace(jsSuffixRegExp, "")),
              req.jsExtRegExp.test(mainScript) && (mainScript = dataMain),
              (cfg.deps = cfg.deps
                ? cfg.deps.concat(mainScript)
                : [mainScript]),
              !0
            );
        }),
      (define = function (t, e, n) {
        var a, i;
        "string" != typeof t && ((n = e), (e = t), (t = null)),
          isArray(e) || ((n = e), (e = null)),
          !e &&
            isFunction(n) &&
            ((e = []),
            n.length &&
              (n
                .toString()
                .replace(commentRegExp, commentReplace)
                .replace(cjsRequireRegExp, function (t, n) {
                  e.push(n);
                }),
              (e = (
                1 === n.length ? ["require"] : ["require", "exports", "module"]
              ).concat(e)))),
          useInteractive &&
            (a = currentlyAddingScript || getInteractiveScript()) &&
            (t || (t = a.getAttribute("data-requiremodule")),
            (i = contexts[a.getAttribute("data-requirecontext")])),
          i
            ? (i.defQueue.push([t, e, n]), (i.defQueueMap[t] = !0))
            : globalDefQueue.push([t, e, n]);
      }),
      (define.amd = { jQuery: !0 }),
      (req.exec = function (text) {
        return eval(text);
      }),
      req(cfg);
  }
})(this, "undefined" == typeof setTimeout ? void 0 : setTimeout),
  define("../node_modules/requirejs/require", function () {}),
  (function () {
    !(function (t) {
      var e = this || (0, eval)("this"),
        n = e.document,
        a = e.navigator,
        i = e.jQuery,
        r = e.JSON;
      i || "undefined" == typeof jQuery || (i = jQuery),
        (function (t) {
          "function" == typeof define && define.amd
            ? define("knockout", ["exports", "require"], t)
            : t(
                "object" == typeof exports && "object" == typeof module
                  ? module.exports || exports
                  : (e.ko = {})
              );
        })(function (o, s) {
          function l(t, e) {
            return (null === t || typeof t in h) && t === e;
          }
          function c(e, n) {
            var a;
            return function () {
              a ||
                (a = m.a.setTimeout(function () {
                  (a = t), e();
                }, n));
            };
          }
          function d(t, e) {
            var n;
            return function () {
              clearTimeout(n), (n = m.a.setTimeout(t, e));
            };
          }
          function u(t, e) {
            e && "change" !== e
              ? "beforeChange" === e
                ? this.pc(t)
                : this.gb(t, e)
              : this.qc(t);
          }
          function f(t, e) {
            null !== e && e.s && e.s();
          }
          function p(t, e) {
            var n = this.qd,
              a = n[w];
            a.ra ||
              (this.Qb && this.mb[e]
                ? (n.uc(e, t, this.mb[e]), (this.mb[e] = null), --this.Qb)
                : a.I[e] || n.uc(e, t, a.J ? { da: t } : n.$c(t)),
              t.Ja && t.gd());
          }
          var m = void 0 !== o ? o : {};
          (m.b = function (t, e) {
            for (var n = t.split("."), a = m, i = 0; i < n.length - 1; i++)
              a = a[n[i]];
            a[n[n.length - 1]] = e;
          }),
            (m.L = function (t, e, n) {
              t[e] = n;
            }),
            (m.version = "3.5.1"),
            m.b("version", m.version),
            (m.options = {
              deferUpdates: !1,
              useOnlyNativeEvents: !1,
              foreachHidesDestroyed: !1,
            }),
            (m.a = (function () {
              function o(t, e) {
                for (var n in t) d.call(t, n) && e(n, t[n]);
              }
              function s(t, e) {
                if (e) for (var n in e) d.call(e, n) && (t[n] = e[n]);
                return t;
              }
              function l(t, e) {
                return (t.__proto__ = e), t;
              }
              function c(t, e, n, a) {
                var i = t[e].match(y) || [];
                m.a.D(n.match(y), function (t) {
                  m.a.Na(i, t, a);
                }),
                  (t[e] = i.join(" "));
              }
              var d = Object.prototype.hasOwnProperty,
                u = { __proto__: [] } instanceof Array,
                f = "function" == typeof Symbol,
                p = {},
                h = {};
              (p[
                a && /Firefox\/2/i.test(a.userAgent)
                  ? "KeyboardEvent"
                  : "UIEvents"
              ] = ["keyup", "keydown", "keypress"]),
                (p.MouseEvents =
                  "click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(
                    " "
                  )),
                o(p, function (t, e) {
                  if (e.length)
                    for (var n = 0, a = e.length; n < a; n++) h[e[n]] = t;
                });
              var v,
                b = { propertychange: !0 },
                g =
                  n &&
                  (function () {
                    for (
                      var e = 3,
                        a = n.createElement("div"),
                        i = a.getElementsByTagName("i");
                      (a.innerHTML =
                        "\x3c!--[if gt IE " + ++e + "]><i></i><![endif]--\x3e"),
                        i[0];

                    );
                    return 4 < e ? e : t;
                  })(),
                y = /\S+/g;
              return {
                Jc: [
                  "authenticity_token",
                  /^__RequestVerificationToken(_.*)?$/,
                ],
                D: function (t, e, n) {
                  for (var a = 0, i = t.length; a < i; a++)
                    e.call(n, t[a], a, t);
                },
                A:
                  "function" == typeof Array.prototype.indexOf
                    ? function (t, e) {
                        return Array.prototype.indexOf.call(t, e);
                      }
                    : function (t, e) {
                        for (var n = 0, a = t.length; n < a; n++)
                          if (t[n] === e) return n;
                        return -1;
                      },
                Lb: function (e, n, a) {
                  for (var i = 0, r = e.length; i < r; i++)
                    if (n.call(a, e[i], i, e)) return e[i];
                  return t;
                },
                Pa: function (t, e) {
                  var n = m.a.A(t, e);
                  0 < n ? t.splice(n, 1) : 0 === n && t.shift();
                },
                wc: function (t) {
                  var e = [];
                  return (
                    t &&
                      m.a.D(t, function (t) {
                        0 > m.a.A(e, t) && e.push(t);
                      }),
                    e
                  );
                },
                Mb: function (t, e, n) {
                  var a = [];
                  if (t)
                    for (var i = 0, r = t.length; i < r; i++)
                      a.push(e.call(n, t[i], i));
                  return a;
                },
                jb: function (t, e, n) {
                  var a = [];
                  if (t)
                    for (var i = 0, r = t.length; i < r; i++)
                      e.call(n, t[i], i) && a.push(t[i]);
                  return a;
                },
                Nb: function (t, e) {
                  if (e instanceof Array) t.push.apply(t, e);
                  else for (var n = 0, a = e.length; n < a; n++) t.push(e[n]);
                  return t;
                },
                Na: function (t, e, n) {
                  var a = m.a.A(m.a.bc(t), e);
                  0 > a ? n && t.push(e) : n || t.splice(a, 1);
                },
                Ba: u,
                extend: s,
                setPrototypeOf: l,
                Ab: u ? l : s,
                P: o,
                Ga: function (t, e, n) {
                  if (!t) return t;
                  var a,
                    i = {};
                  for (a in t) d.call(t, a) && (i[a] = e.call(n, t[a], a, t));
                  return i;
                },
                Tb: function (t) {
                  for (; t.firstChild; ) m.removeNode(t.firstChild);
                },
                Yb: function (t) {
                  t = m.a.la(t);
                  for (
                    var e = ((t[0] && t[0].ownerDocument) || n).createElement(
                        "div"
                      ),
                      a = 0,
                      i = t.length;
                    a < i;
                    a++
                  )
                    e.appendChild(m.oa(t[a]));
                  return e;
                },
                Ca: function (t, e) {
                  for (var n = 0, a = t.length, i = []; n < a; n++) {
                    var r = t[n].cloneNode(!0);
                    i.push(e ? m.oa(r) : r);
                  }
                  return i;
                },
                va: function (t, e) {
                  if ((m.a.Tb(t), e))
                    for (var n = 0, a = e.length; n < a; n++)
                      t.appendChild(e[n]);
                },
                Xc: function (t, e) {
                  var n = t.nodeType ? [t] : t;
                  if (0 < n.length) {
                    for (
                      var a = n[0], i = a.parentNode, r = 0, o = e.length;
                      r < o;
                      r++
                    )
                      i.insertBefore(e[r], a);
                    for (r = 0, o = n.length; r < o; r++) m.removeNode(n[r]);
                  }
                },
                Ua: function (t, e) {
                  if (t.length) {
                    for (
                      e = (8 === e.nodeType && e.parentNode) || e;
                      t.length && t[0].parentNode !== e;

                    )
                      t.splice(0, 1);
                    for (; 1 < t.length && t[t.length - 1].parentNode !== e; )
                      t.length--;
                    if (1 < t.length) {
                      var n = t[0],
                        a = t[t.length - 1];
                      for (t.length = 0; n !== a; )
                        t.push(n), (n = n.nextSibling);
                      t.push(a);
                    }
                  }
                  return t;
                },
                Zc: function (t, e) {
                  7 > g ? t.setAttribute("selected", e) : (t.selected = e);
                },
                Db: function (e) {
                  return null === e || e === t
                    ? ""
                    : e.trim
                    ? e.trim()
                    : e.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
                },
                Ud: function (t, e) {
                  return (
                    (t = t || ""),
                    !(e.length > t.length) && t.substring(0, e.length) === e
                  );
                },
                vd: function (t, e) {
                  if (t === e) return !0;
                  if (11 === t.nodeType) return !1;
                  if (e.contains)
                    return e.contains(1 !== t.nodeType ? t.parentNode : t);
                  if (e.compareDocumentPosition)
                    return 16 == (16 & e.compareDocumentPosition(t));
                  for (; t && t != e; ) t = t.parentNode;
                  return !!t;
                },
                Sb: function (t) {
                  return m.a.vd(t, t.ownerDocument.documentElement);
                },
                kd: function (t) {
                  return !!m.a.Lb(t, m.a.Sb);
                },
                R: function (t) {
                  return t && t.tagName && t.tagName.toLowerCase();
                },
                Ac: function (t) {
                  return m.onError
                    ? function () {
                        try {
                          return t.apply(this, arguments);
                        } catch (t) {
                          throw (m.onError && m.onError(t), t);
                        }
                      }
                    : t;
                },
                setTimeout: function (t, e) {
                  return setTimeout(m.a.Ac(t), e);
                },
                Gc: function (t) {
                  setTimeout(function () {
                    throw (m.onError && m.onError(t), t);
                  }, 0);
                },
                B: function (t, e, n) {
                  var a = m.a.Ac(n);
                  if (((n = b[e]), m.options.useOnlyNativeEvents || n || !i))
                    if (n || "function" != typeof t.addEventListener) {
                      if (void 0 === t.attachEvent)
                        throw Error(
                          "Browser doesn't support addEventListener or attachEvent"
                        );
                      var r = function (e) {
                          a.call(t, e);
                        },
                        o = "on" + e;
                      t.attachEvent(o, r),
                        m.a.K.za(t, function () {
                          t.detachEvent(o, r);
                        });
                    } else t.addEventListener(e, a, !1);
                  else
                    v || (v = "function" == typeof i(t).on ? "on" : "bind"),
                      i(t)[v](e, a);
                },
                Fb: function (t, a) {
                  if (!t || !t.nodeType)
                    throw Error(
                      "element must be a DOM node when calling triggerEvent"
                    );
                  var r;
                  if (
                    ("input" === m.a.R(t) &&
                    t.type &&
                    "click" == a.toLowerCase()
                      ? ((r = t.type), (r = "checkbox" == r || "radio" == r))
                      : (r = !1),
                    m.options.useOnlyNativeEvents || !i || r)
                  )
                    if ("function" == typeof n.createEvent) {
                      if ("function" != typeof t.dispatchEvent)
                        throw Error(
                          "The supplied element doesn't support dispatchEvent"
                        );
                      (r = n.createEvent(h[a] || "HTMLEvents")),
                        r.initEvent(
                          a,
                          !0,
                          !0,
                          e,
                          0,
                          0,
                          0,
                          0,
                          0,
                          !1,
                          !1,
                          !1,
                          !1,
                          0,
                          t
                        ),
                        t.dispatchEvent(r);
                    } else if (r && t.click) t.click();
                    else {
                      if (void 0 === t.fireEvent)
                        throw Error(
                          "Browser doesn't support triggering events"
                        );
                      t.fireEvent("on" + a);
                    }
                  else i(t).trigger(a);
                },
                f: function (t) {
                  return m.O(t) ? t() : t;
                },
                bc: function (t) {
                  return m.O(t) ? t.v() : t;
                },
                Eb: function (t, e, n) {
                  var a;
                  e &&
                    ("object" == typeof t.classList
                      ? ((a = t.classList[n ? "add" : "remove"]),
                        m.a.D(e.match(y), function (e) {
                          a.call(t.classList, e);
                        }))
                      : "string" == typeof t.className.baseVal
                      ? c(t.className, "baseVal", e, n)
                      : c(t, "className", e, n));
                },
                Bb: function (e, n) {
                  var a = m.a.f(n);
                  (null !== a && a !== t) || (a = "");
                  var i = m.h.firstChild(e);
                  !i || 3 != i.nodeType || m.h.nextSibling(i)
                    ? m.h.va(e, [e.ownerDocument.createTextNode(a)])
                    : (i.data = a),
                    m.a.Ad(e);
                },
                Yc: function (t, e) {
                  if (((t.name = e), 7 >= g))
                    try {
                      var a = t.name.replace(/[&<>'"]/g, function (t) {
                        return "&#" + t.charCodeAt(0) + ";";
                      });
                      t.mergeAttributes(
                        n.createElement("<input name='" + a + "'/>"),
                        !1
                      );
                    } catch (t) {}
                },
                Ad: function (t) {
                  9 <= g &&
                    ((t = 1 == t.nodeType ? t : t.parentNode),
                    t.style && (t.style.zoom = t.style.zoom));
                },
                wd: function (t) {
                  if (g) {
                    var e = t.style.width;
                    (t.style.width = 0), (t.style.width = e);
                  }
                },
                Pd: function (t, e) {
                  (t = m.a.f(t)), (e = m.a.f(e));
                  for (var n = [], a = t; a <= e; a++) n.push(a);
                  return n;
                },
                la: function (t) {
                  for (var e = [], n = 0, a = t.length; n < a; n++)
                    e.push(t[n]);
                  return e;
                },
                Da: function (t) {
                  return f ? Symbol(t) : t;
                },
                Zd: 6 === g,
                $d: 7 === g,
                W: g,
                Lc: function (t, e) {
                  for (
                    var n = m.a
                        .la(t.getElementsByTagName("input"))
                        .concat(m.a.la(t.getElementsByTagName("textarea"))),
                      a =
                        "string" == typeof e
                          ? function (t) {
                              return t.name === e;
                            }
                          : function (t) {
                              return e.test(t.name);
                            },
                      i = [],
                      r = n.length - 1;
                    0 <= r;
                    r--
                  )
                    a(n[r]) && i.push(n[r]);
                  return i;
                },
                Nd: function (t) {
                  return "string" == typeof t && (t = m.a.Db(t))
                    ? r && r.parse
                      ? r.parse(t)
                      : new Function("return " + t)()
                    : null;
                },
                hc: function (t, e, n) {
                  if (!r || !r.stringify)
                    throw Error(
                      "Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js"
                    );
                  return r.stringify(m.a.f(t), e, n);
                },
                Od: function (t, e, a) {
                  a = a || {};
                  var i = a.params || {},
                    r = a.includeFields || this.Jc,
                    s = t;
                  if ("object" == typeof t && "form" === m.a.R(t))
                    for (var s = t.action, l = r.length - 1; 0 <= l; l--)
                      for (
                        var c = m.a.Lc(t, r[l]), d = c.length - 1;
                        0 <= d;
                        d--
                      )
                        i[c[d].name] = c[d].value;
                  e = m.a.f(e);
                  var u = n.createElement("form");
                  (u.style.display = "none"),
                    (u.action = s),
                    (u.method = "post");
                  for (var f in e)
                    (t = n.createElement("input")),
                      (t.type = "hidden"),
                      (t.name = f),
                      (t.value = m.a.hc(m.a.f(e[f]))),
                      u.appendChild(t);
                  o(i, function (t, e) {
                    var a = n.createElement("input");
                    (a.type = "hidden"),
                      (a.name = t),
                      (a.value = e),
                      u.appendChild(a);
                  }),
                    n.body.appendChild(u),
                    a.submitter ? a.submitter(u) : u.submit(),
                    setTimeout(function () {
                      u.parentNode.removeChild(u);
                    }, 0);
                },
              };
            })()),
            m.b("utils", m.a),
            m.b("utils.arrayForEach", m.a.D),
            m.b("utils.arrayFirst", m.a.Lb),
            m.b("utils.arrayFilter", m.a.jb),
            m.b("utils.arrayGetDistinctValues", m.a.wc),
            m.b("utils.arrayIndexOf", m.a.A),
            m.b("utils.arrayMap", m.a.Mb),
            m.b("utils.arrayPushAll", m.a.Nb),
            m.b("utils.arrayRemoveItem", m.a.Pa),
            m.b("utils.cloneNodes", m.a.Ca),
            m.b("utils.createSymbolOrString", m.a.Da),
            m.b("utils.extend", m.a.extend),
            m.b("utils.fieldsIncludedWithJsonPost", m.a.Jc),
            m.b("utils.getFormFields", m.a.Lc),
            m.b("utils.objectMap", m.a.Ga),
            m.b("utils.peekObservable", m.a.bc),
            m.b("utils.postJson", m.a.Od),
            m.b("utils.parseJson", m.a.Nd),
            m.b("utils.registerEventHandler", m.a.B),
            m.b("utils.stringifyJson", m.a.hc),
            m.b("utils.range", m.a.Pd),
            m.b("utils.toggleDomNodeCssClass", m.a.Eb),
            m.b("utils.triggerEvent", m.a.Fb),
            m.b("utils.unwrapObservable", m.a.f),
            m.b("utils.objectForEach", m.a.P),
            m.b("utils.addOrRemoveItem", m.a.Na),
            m.b("utils.setTextContent", m.a.Bb),
            m.b("unwrap", m.a.f),
            Function.prototype.bind ||
              (Function.prototype.bind = function (t) {
                var e = this;
                if (1 === arguments.length)
                  return function () {
                    return e.apply(t, arguments);
                  };
                var n = Array.prototype.slice.call(arguments, 1);
                return function () {
                  var a = n.slice(0);
                  return a.push.apply(a, arguments), e.apply(t, a);
                };
              }),
            (m.a.g = new (function () {
              var e,
                n,
                a = 0,
                i = "__ko__" + new Date().getTime(),
                r = {};
              return (
                m.a.W
                  ? ((e = function (e, n) {
                      var o = e[i];
                      if (!o || "null" === o || !r[o]) {
                        if (!n) return t;
                        (o = e[i] = "ko" + a++), (r[o] = {});
                      }
                      return r[o];
                    }),
                    (n = function (t) {
                      var e = t[i];
                      return !!e && (delete r[e], (t[i] = null), !0);
                    }))
                  : ((e = function (t, e) {
                      var n = t[i];
                      return !n && e && (n = t[i] = {}), n;
                    }),
                    (n = function (t) {
                      return !!t[i] && (delete t[i], !0);
                    })),
                {
                  get: function (t, n) {
                    var a = e(t, !1);
                    return a && a[n];
                  },
                  set: function (n, a, i) {
                    (n = e(n, i !== t)) && (n[a] = i);
                  },
                  Ub: function (t, n, a) {
                    return (t = e(t, !0)), t[n] || (t[n] = a);
                  },
                  clear: n,
                  Z: function () {
                    return a++ + i;
                  },
                }
              );
            })()),
            m.b("utils.domData", m.a.g),
            m.b("utils.domData.clear", m.a.g.clear),
            (m.a.K = new (function () {
              function e(e, n) {
                var a = m.a.g.get(e, r);
                return a === t && n && ((a = []), m.a.g.set(e, r, a)), a;
              }
              function n(t) {
                var n = e(t, !1);
                if (n)
                  for (var n = n.slice(0), i = 0; i < n.length; i++) n[i](t);
                m.a.g.clear(t),
                  m.a.K.cleanExternalData(t),
                  s[t.nodeType] && a(t.childNodes, !0);
              }
              function a(t, e) {
                for (var a, i = [], r = 0; r < t.length; r++)
                  if (
                    (!e || 8 === t[r].nodeType) &&
                    (n((i[i.length] = a = t[r])), t[r] !== a)
                  )
                    for (; r-- && -1 == m.a.A(i, t[r]); );
              }
              var r = m.a.g.Z(),
                o = { 1: !0, 8: !0, 9: !0 },
                s = { 1: !0, 9: !0 };
              return {
                za: function (t, n) {
                  if ("function" != typeof n)
                    throw Error("Callback must be a function");
                  e(t, !0).push(n);
                },
                yb: function (n, a) {
                  var i = e(n, !1);
                  i && (m.a.Pa(i, a), 0 == i.length && m.a.g.set(n, r, t));
                },
                oa: function (t) {
                  return (
                    m.u.G(function () {
                      o[t.nodeType] &&
                        (n(t), s[t.nodeType] && a(t.getElementsByTagName("*")));
                    }),
                    t
                  );
                },
                removeNode: function (t) {
                  m.oa(t), t.parentNode && t.parentNode.removeChild(t);
                },
                cleanExternalData: function (t) {
                  i && "function" == typeof i.cleanData && i.cleanData([t]);
                },
              };
            })()),
            (m.oa = m.a.K.oa),
            (m.removeNode = m.a.K.removeNode),
            m.b("cleanNode", m.oa),
            m.b("removeNode", m.removeNode),
            m.b("utils.domNodeDisposal", m.a.K),
            m.b("utils.domNodeDisposal.addDisposeCallback", m.a.K.za),
            m.b("utils.domNodeDisposal.removeDisposeCallback", m.a.K.yb),
            (function () {
              var a = [0, "", ""],
                r = [1, "<table>", "</table>"],
                o = [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                s = [1, "<select multiple='multiple'>", "</select>"],
                l = {
                  thead: r,
                  tbody: r,
                  tfoot: r,
                  tr: [2, "<table><tbody>", "</tbody></table>"],
                  td: o,
                  th: o,
                  option: s,
                  optgroup: s,
                },
                c = 8 >= m.a.W;
              (m.a.ua = function (t, r) {
                var o;
                if (i) {
                  if (i.parseHTML) o = i.parseHTML(t, r) || [];
                  else if ((o = i.clean([t], r)) && o[0]) {
                    for (
                      var s = o[0];
                      s.parentNode && 11 !== s.parentNode.nodeType;

                    )
                      s = s.parentNode;
                    s.parentNode && s.parentNode.removeChild(s);
                  }
                } else {
                  (o = r) || (o = n);
                  var d,
                    s = o.parentWindow || o.defaultView || e,
                    u = m.a.Db(t).toLowerCase(),
                    f = o.createElement("div");
                  for (
                    d =
                      ((u = u.match(
                        /^(?:\x3c!--.*?--\x3e\s*?)*?<([a-z]+)[\s>]/
                      )) &&
                        l[u[1]]) ||
                      a,
                      u = d[0],
                      d = "ignored<div>" + d[1] + t + d[2] + "</div>",
                      "function" == typeof s.innerShiv
                        ? f.appendChild(s.innerShiv(d))
                        : (c && o.body.appendChild(f),
                          (f.innerHTML = d),
                          c && f.parentNode.removeChild(f));
                    u--;

                  )
                    f = f.lastChild;
                  o = m.a.la(f.lastChild.childNodes);
                }
                return o;
              }),
                (m.a.Md = function (t, e) {
                  var n = m.a.ua(t, e);
                  return (n.length && n[0].parentElement) || m.a.Yb(n);
                }),
                (m.a.fc = function (e, n) {
                  if ((m.a.Tb(e), null !== (n = m.a.f(n)) && n !== t))
                    if (("string" != typeof n && (n = n.toString()), i))
                      i(e).html(n);
                    else
                      for (
                        var a = m.a.ua(n, e.ownerDocument), r = 0;
                        r < a.length;
                        r++
                      )
                        e.appendChild(a[r]);
                });
            })(),
            m.b("utils.parseHtmlFragment", m.a.ua),
            m.b("utils.setHtml", m.a.fc),
            (m.aa = (function () {
              function e(t, n) {
                if (t)
                  if (8 == t.nodeType) {
                    var a = m.aa.Uc(t.nodeValue);
                    null != a && n.push({ ud: t, Kd: a });
                  } else if (1 == t.nodeType)
                    for (var a = 0, i = t.childNodes, r = i.length; a < r; a++)
                      e(i[a], n);
              }
              var n = {};
              return {
                Xb: function (t) {
                  if ("function" != typeof t)
                    throw Error(
                      "You can only pass a function to ko.memoization.memoize()"
                    );
                  var e =
                    ((4294967296 * (1 + Math.random())) | 0)
                      .toString(16)
                      .substring(1) +
                    ((4294967296 * (1 + Math.random())) | 0)
                      .toString(16)
                      .substring(1);
                  return (n[e] = t), "\x3c!--[ko_memo:" + e + "]--\x3e";
                },
                bd: function (e, a) {
                  var i = n[e];
                  if (i === t)
                    throw Error(
                      "Couldn't find any memo with ID " +
                        e +
                        ". Perhaps it's already been unmemoized."
                    );
                  try {
                    return i.apply(null, a || []), !0;
                  } finally {
                    delete n[e];
                  }
                },
                cd: function (t, n) {
                  var a = [];
                  e(t, a);
                  for (var i = 0, r = a.length; i < r; i++) {
                    var o = a[i].ud,
                      s = [o];
                    n && m.a.Nb(s, n),
                      m.aa.bd(a[i].Kd, s),
                      (o.nodeValue = ""),
                      o.parentNode && o.parentNode.removeChild(o);
                  }
                },
                Uc: function (t) {
                  return (t = t.match(/^\[ko_memo\:(.*?)\]$/)) ? t[1] : null;
                },
              };
            })()),
            m.b("memoization", m.aa),
            m.b("memoization.memoize", m.aa.Xb),
            m.b("memoization.unmemoize", m.aa.bd),
            m.b("memoization.parseMemoText", m.aa.Uc),
            m.b("memoization.unmemoizeDomNodeAndDescendants", m.aa.cd),
            (m.na = (function () {
              function t() {
                if (o)
                  for (var t, e = o, n = 0; l < o; )
                    if ((t = r[l++])) {
                      if (l > e) {
                        if (5e3 <= ++n) {
                          (l = o),
                            m.a.Gc(
                              Error(
                                "'Too much recursion' after processing " +
                                  n +
                                  " task groups."
                              )
                            );
                          break;
                        }
                        e = o;
                      }
                      try {
                        t();
                      } catch (t) {
                        m.a.Gc(t);
                      }
                    }
              }
              function a() {
                t(), (l = o = r.length = 0);
              }
              var i,
                r = [],
                o = 0,
                s = 1,
                l = 0;
              return (
                (i = e.MutationObserver
                  ? (function (t) {
                      var e = n.createElement("div");
                      return (
                        new MutationObserver(t).observe(e, { attributes: !0 }),
                        function () {
                          e.classList.toggle("foo");
                        }
                      );
                    })(a)
                  : n && "onreadystatechange" in n.createElement("script")
                  ? function (t) {
                      var e = n.createElement("script");
                      (e.onreadystatechange = function () {
                        (e.onreadystatechange = null),
                          n.documentElement.removeChild(e),
                          (e = null),
                          t();
                      }),
                        n.documentElement.appendChild(e);
                    }
                  : function (t) {
                      setTimeout(t, 0);
                    }),
                {
                  scheduler: i,
                  zb: function (t) {
                    return o || m.na.scheduler(a), (r[o++] = t), s++;
                  },
                  cancel: function (t) {
                    (t -= s - o) >= l && t < o && (r[t] = null);
                  },
                  resetForTesting: function () {
                    var t = o - l;
                    return (l = o = r.length = 0), t;
                  },
                  Sd: t,
                }
              );
            })()),
            m.b("tasks", m.na),
            m.b("tasks.schedule", m.na.zb),
            m.b("tasks.runEarly", m.na.Sd),
            (m.Ta = {
              throttle: function (t, e) {
                t.throttleEvaluation = e;
                var n = null;
                return m.$({
                  read: t,
                  write: function (a) {
                    clearTimeout(n),
                      (n = m.a.setTimeout(function () {
                        t(a);
                      }, e));
                  },
                });
              },
              rateLimit: function (t, e) {
                var n, a, i;
                "number" == typeof e
                  ? (n = e)
                  : ((n = e.timeout), (a = e.method)),
                  (t.Hb = !1),
                  (i =
                    "function" == typeof a
                      ? a
                      : "notifyWhenChangesStop" == a
                      ? d
                      : c),
                  t.ub(function (t) {
                    return i(t, n, e);
                  });
              },
              deferred: function (e, n) {
                if (!0 !== n)
                  throw Error(
                    "The 'deferred' extender only accepts the value 'true', because it is not supported to turn deferral off once enabled."
                  );
                e.Hb ||
                  ((e.Hb = !0),
                  e.ub(function (n) {
                    var a,
                      i = !1;
                    return function () {
                      if (!i) {
                        m.na.cancel(a), (a = m.na.zb(n));
                        try {
                          (i = !0), e.notifySubscribers(t, "dirty");
                        } finally {
                          i = !1;
                        }
                      }
                    };
                  }));
              },
              notify: function (t, e) {
                t.equalityComparer = "always" == e ? null : l;
              },
            });
          var h = { undefined: 1, boolean: 1, number: 1, string: 1 };
          m.b("extenders", m.Ta),
            (m.ic = function (t, e, n) {
              (this.da = t),
                (this.lc = e),
                (this.mc = n),
                (this.Ib = !1),
                (this.fb = this.Jb = null),
                m.L(this, "dispose", this.s),
                m.L(this, "disposeWhenNodeIsRemoved", this.l);
            }),
            (m.ic.prototype.s = function () {
              this.Ib ||
                (this.fb && m.a.K.yb(this.Jb, this.fb),
                (this.Ib = !0),
                this.mc(),
                (this.da = this.lc = this.mc = this.Jb = this.fb = null));
            }),
            (m.ic.prototype.l = function (t) {
              (this.Jb = t), m.a.K.za(t, (this.fb = this.s.bind(this)));
            }),
            (m.T = function () {
              m.a.Ab(this, v), v.qb(this);
            });
          var v = {
            qb: function (t) {
              (t.U = { change: [] }), (t.sc = 1);
            },
            subscribe: function (t, e, n) {
              var a = this;
              n = n || "change";
              var i = new m.ic(a, e ? t.bind(e) : t, function () {
                m.a.Pa(a.U[n], i), a.hb && a.hb(n);
              });
              return (
                a.Qa && a.Qa(n), a.U[n] || (a.U[n] = []), a.U[n].push(i), i
              );
            },
            notifySubscribers: function (t, e) {
              if (
                ((e = e || "change"), "change" === e && this.Gb(), this.Wa(e))
              ) {
                var n = ("change" === e && this.ed) || this.U[e].slice(0);
                try {
                  m.u.xc();
                  for (var a, i = 0; (a = n[i]); ++i) a.Ib || a.lc(t);
                } finally {
                  m.u.end();
                }
              }
            },
            ob: function () {
              return this.sc;
            },
            Dd: function (t) {
              return this.ob() !== t;
            },
            Gb: function () {
              ++this.sc;
            },
            ub: function (t) {
              var e,
                n,
                a,
                i,
                r,
                o = this,
                s = m.O(o);
              o.gb || ((o.gb = o.notifySubscribers), (o.notifySubscribers = u));
              var l = t(function () {
                (o.Ja = !1), s && i === o && (i = o.nc ? o.nc() : o());
                var t = n || (r && o.sb(a, i));
                (r = n = e = !1), t && o.gb((a = i));
              });
              (o.qc = function (t, n) {
                (n && o.Ja) || (r = !n),
                  (o.ed = o.U.change.slice(0)),
                  (o.Ja = e = !0),
                  (i = t),
                  l();
              }),
                (o.pc = function (t) {
                  e || ((a = t), o.gb(t, "beforeChange"));
                }),
                (o.rc = function () {
                  r = !0;
                }),
                (o.gd = function () {
                  o.sb(a, o.v(!0)) && (n = !0);
                });
            },
            Wa: function (t) {
              return this.U[t] && this.U[t].length;
            },
            Bd: function (t) {
              if (t) return (this.U[t] && this.U[t].length) || 0;
              var e = 0;
              return (
                m.a.P(this.U, function (t, n) {
                  "dirty" !== t && (e += n.length);
                }),
                e
              );
            },
            sb: function (t, e) {
              return !this.equalityComparer || !this.equalityComparer(t, e);
            },
            toString: function () {
              return "[object Object]";
            },
            extend: function (t) {
              var e = this;
              return (
                t &&
                  m.a.P(t, function (t, n) {
                    var a = m.Ta[t];
                    "function" == typeof a && (e = a(e, n) || e);
                  }),
                e
              );
            },
          };
          m.L(v, "init", v.qb),
            m.L(v, "subscribe", v.subscribe),
            m.L(v, "extend", v.extend),
            m.L(v, "getSubscriptionsCount", v.Bd),
            m.a.Ba && m.a.setPrototypeOf(v, Function.prototype),
            (m.T.fn = v),
            (m.Qc = function (t) {
              return (
                null != t &&
                "function" == typeof t.subscribe &&
                "function" == typeof t.notifySubscribers
              );
            }),
            m.b("subscribable", m.T),
            m.b("isSubscribable", m.Qc),
            (m.S = m.u =
              (function () {
                function t(t) {
                  a.push(n), (n = t);
                }
                function e() {
                  n = a.pop();
                }
                var n,
                  a = [],
                  i = 0;
                return {
                  xc: t,
                  end: e,
                  cc: function (t) {
                    if (n) {
                      if (!m.Qc(t))
                        throw Error(
                          "Only subscribable things can act as dependencies"
                        );
                      n.od.call(n.pd, t, t.fd || (t.fd = ++i));
                    }
                  },
                  G: function (n, a, i) {
                    try {
                      return t(), n.apply(a, i || []);
                    } finally {
                      e();
                    }
                  },
                  qa: function () {
                    if (n) return n.o.qa();
                  },
                  Va: function () {
                    if (n) return n.o.Va();
                  },
                  Ya: function () {
                    if (n) return n.Ya;
                  },
                  o: function () {
                    if (n) return n.o;
                  },
                };
              })()),
            m.b("computedContext", m.S),
            m.b("computedContext.getDependenciesCount", m.S.qa),
            m.b("computedContext.getDependencies", m.S.Va),
            m.b("computedContext.isInitial", m.S.Ya),
            m.b("computedContext.registerDependency", m.S.cc),
            m.b("ignoreDependencies", (m.Yd = m.u.G));
          var b = m.a.Da("_latestValue");
          m.ta = function (t) {
            function e() {
              return 0 < arguments.length
                ? (e.sb(e[b], arguments[0]) &&
                    (e.ya(), (e[b] = arguments[0]), e.xa()),
                  this)
                : (m.u.cc(e), e[b]);
            }
            return (
              (e[b] = t),
              m.a.Ba || m.a.extend(e, m.T.fn),
              m.T.fn.qb(e),
              m.a.Ab(e, g),
              m.options.deferUpdates && m.Ta.deferred(e, !0),
              e
            );
          };
          var g = {
            equalityComparer: l,
            v: function () {
              return this[b];
            },
            xa: function () {
              this.notifySubscribers(this[b], "spectate"),
                this.notifySubscribers(this[b]);
            },
            ya: function () {
              this.notifySubscribers(this[b], "beforeChange");
            },
          };
          m.a.Ba && m.a.setPrototypeOf(g, m.T.fn);
          var y = (m.ta.Ma = "__ko_proto__");
          (g[y] = m.ta),
            (m.O = function (t) {
              if (
                (t = "function" == typeof t && t[y]) &&
                t !== g[y] &&
                t !== m.o.fn[y]
              )
                throw Error(
                  "Invalid object that looks like an observable; possibly from another Knockout instance"
                );
              return !!t;
            }),
            (m.Za = function (t) {
              return (
                "function" == typeof t &&
                (t[y] === g[y] || (t[y] === m.o.fn[y] && t.Nc))
              );
            }),
            m.b("observable", m.ta),
            m.b("isObservable", m.O),
            m.b("isWriteableObservable", m.Za),
            m.b("isWritableObservable", m.Za),
            m.b("observable.fn", g),
            m.L(g, "peek", g.v),
            m.L(g, "valueHasMutated", g.xa),
            m.L(g, "valueWillMutate", g.ya),
            (m.Ha = function (t) {
              if ("object" != typeof (t = t || []) || !("length" in t))
                throw Error(
                  "The argument passed when initializing an observable array must be an array, or null, or undefined."
                );
              return (
                (t = m.ta(t)),
                m.a.Ab(t, m.Ha.fn),
                t.extend({ trackArrayChanges: !0 })
              );
            }),
            (m.Ha.fn = {
              remove: function (t) {
                for (
                  var e = this.v(),
                    n = [],
                    a =
                      "function" != typeof t || m.O(t)
                        ? function (e) {
                            return e === t;
                          }
                        : t,
                    i = 0;
                  i < e.length;
                  i++
                ) {
                  var r = e[i];
                  if (a(r)) {
                    if ((0 === n.length && this.ya(), e[i] !== r))
                      throw Error(
                        "Array modified during remove; cannot remove item"
                      );
                    n.push(r), e.splice(i, 1), i--;
                  }
                }
                return n.length && this.xa(), n;
              },
              removeAll: function (e) {
                if (e === t) {
                  var n = this.v(),
                    a = n.slice(0);
                  return this.ya(), n.splice(0, n.length), this.xa(), a;
                }
                return e
                  ? this.remove(function (t) {
                      return 0 <= m.a.A(e, t);
                    })
                  : [];
              },
              destroy: function (t) {
                var e = this.v(),
                  n =
                    "function" != typeof t || m.O(t)
                      ? function (e) {
                          return e === t;
                        }
                      : t;
                this.ya();
                for (var a = e.length - 1; 0 <= a; a--) {
                  var i = e[a];
                  n(i) && (i._destroy = !0);
                }
                this.xa();
              },
              destroyAll: function (e) {
                return e === t
                  ? this.destroy(function () {
                      return !0;
                    })
                  : e
                  ? this.destroy(function (t) {
                      return 0 <= m.a.A(e, t);
                    })
                  : [];
              },
              indexOf: function (t) {
                var e = this();
                return m.a.A(e, t);
              },
              replace: function (t, e) {
                var n = this.indexOf(t);
                0 <= n && (this.ya(), (this.v()[n] = e), this.xa());
              },
              sorted: function (t) {
                var e = this().slice(0);
                return t ? e.sort(t) : e.sort();
              },
              reversed: function () {
                return this().slice(0).reverse();
              },
            }),
            m.a.Ba && m.a.setPrototypeOf(m.Ha.fn, m.ta.fn),
            m.a.D(
              "pop push reverse shift sort splice unshift".split(" "),
              function (t) {
                m.Ha.fn[t] = function () {
                  var e = this.v();
                  this.ya(), this.zc(e, t, arguments);
                  var n = e[t].apply(e, arguments);
                  return this.xa(), n === e ? this : n;
                };
              }
            ),
            m.a.D(["slice"], function (t) {
              m.Ha.fn[t] = function () {
                var e = this();
                return e[t].apply(e, arguments);
              };
            }),
            (m.Pc = function (t) {
              return (
                m.O(t) &&
                "function" == typeof t.remove &&
                "function" == typeof t.push
              );
            }),
            m.b("observableArray", m.Ha),
            m.b("isObservableArray", m.Pc),
            (m.Ta.trackArrayChanges = function (e, n) {
              function a() {
                function t() {
                  if (c) {
                    var t,
                      n = [].concat(e.v() || []);
                    e.Wa("arrayChange") &&
                      ((!l || 1 < c) && (l = m.a.Pb(o, n, e.Ob)), (t = l)),
                      (o = n),
                      (l = null),
                      (c = 0),
                      t && t.length && e.notifySubscribers(t, "arrayChange");
                  }
                }
                s
                  ? t()
                  : ((s = !0),
                    (r = e.subscribe(
                      function () {
                        ++c;
                      },
                      null,
                      "spectate"
                    )),
                    (o = [].concat(e.v() || [])),
                    (l = null),
                    (i = e.subscribe(t)));
              }
              if (
                ((e.Ob = {}),
                n && "object" == typeof n && m.a.extend(e.Ob, n),
                (e.Ob.sparse = !0),
                !e.zc)
              ) {
                var i,
                  r,
                  o,
                  s = !1,
                  l = null,
                  c = 0,
                  d = e.Qa,
                  u = e.hb;
                (e.Qa = function (t) {
                  d && d.call(e, t), "arrayChange" === t && a();
                }),
                  (e.hb = function (n) {
                    u && u.call(e, n),
                      "arrayChange" !== n ||
                        e.Wa("arrayChange") ||
                        (i && i.s(),
                        r && r.s(),
                        (r = i = null),
                        (s = !1),
                        (o = t));
                  }),
                  (e.zc = function (t, e, n) {
                    function a(t, e, n) {
                      return (i[i.length] = { status: t, value: e, index: n });
                    }
                    if (s && !c) {
                      var i = [],
                        r = t.length,
                        o = n.length,
                        d = 0;
                      switch (e) {
                        case "push":
                          d = r;
                        case "unshift":
                          for (e = 0; e < o; e++) a("added", n[e], d + e);
                          break;
                        case "pop":
                          d = r - 1;
                        case "shift":
                          r && a("deleted", t[d], d);
                          break;
                        case "splice":
                          e = Math.min(
                            Math.max(0, 0 > n[0] ? r + n[0] : n[0]),
                            r
                          );
                          for (
                            var r = 1 === o ? r : Math.min(e + (n[1] || 0), r),
                              o = e + o - 2,
                              d = Math.max(r, o),
                              u = [],
                              f = [],
                              p = 2;
                            e < d;
                            ++e, ++p
                          )
                            e < r && f.push(a("deleted", t[e], e)),
                              e < o && u.push(a("added", n[p], e));
                          m.a.Kc(f, u);
                          break;
                        default:
                          return;
                      }
                      l = i;
                    }
                  });
              }
            });
          var w = m.a.Da("_state");
          m.o = m.$ = function (e, n, a) {
            function i() {
              if (0 < arguments.length) {
                if ("function" != typeof r)
                  throw Error(
                    "Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters."
                  );
                return r.apply(o.nb, arguments), this;
              }
              return (
                o.ra || m.u.cc(i), (o.ka || (o.J && i.Xa())) && i.ha(), o.X
              );
            }
            if (
              ("object" == typeof e
                ? (a = e)
                : ((a = a || {}), e && (a.read = e)),
              "function" != typeof a.read)
            )
              throw Error(
                "Pass a function that returns the value of the ko.computed"
              );
            var r = a.write,
              o = {
                X: t,
                sa: !0,
                ka: !0,
                rb: !1,
                jc: !1,
                ra: !1,
                wb: !1,
                J: !1,
                Wc: a.read,
                nb: n || a.owner,
                l: a.disposeWhenNodeIsRemoved || a.l || null,
                Sa: a.disposeWhen || a.Sa,
                Rb: null,
                I: {},
                V: 0,
                Ic: null,
              };
            return (
              (i[w] = o),
              (i.Nc = "function" == typeof r),
              m.a.Ba || m.a.extend(i, m.T.fn),
              m.T.fn.qb(i),
              m.a.Ab(i, x),
              a.pure
                ? ((o.wb = !0), (o.J = !0), m.a.extend(i, _))
                : a.deferEvaluation && m.a.extend(i, E),
              m.options.deferUpdates && m.Ta.deferred(i, !0),
              o.l && ((o.jc = !0), o.l.nodeType || (o.l = null)),
              o.J || a.deferEvaluation || i.ha(),
              o.l &&
                i.ja() &&
                m.a.K.za(
                  o.l,
                  (o.Rb = function () {
                    i.s();
                  })
                ),
              i
            );
          };
          var x = {
              equalityComparer: l,
              qa: function () {
                return this[w].V;
              },
              Va: function () {
                var t = [];
                return (
                  m.a.P(this[w].I, function (e, n) {
                    t[n.Ka] = n.da;
                  }),
                  t
                );
              },
              Vb: function (t) {
                if (!this[w].V) return !1;
                var e = this.Va();
                return (
                  -1 !== m.a.A(e, t) ||
                  !!m.a.Lb(e, function (e) {
                    return e.Vb && e.Vb(t);
                  })
                );
              },
              uc: function (t, e, n) {
                if (this[w].wb && e === this)
                  throw Error(
                    "A 'pure' computed must not be called recursively"
                  );
                (this[w].I[t] = n), (n.Ka = this[w].V++), (n.La = e.ob());
              },
              Xa: function () {
                var t,
                  e,
                  n = this[w].I;
                for (t in n)
                  if (
                    Object.prototype.hasOwnProperty.call(n, t) &&
                    ((e = n[t]), (this.Ia && e.da.Ja) || e.da.Dd(e.La))
                  )
                    return !0;
              },
              Jd: function () {
                this.Ia && !this[w].rb && this.Ia(!1);
              },
              ja: function () {
                var t = this[w];
                return t.ka || 0 < t.V;
              },
              Rd: function () {
                this.Ja ? this[w].ka && (this[w].sa = !0) : this.Hc();
              },
              $c: function (t) {
                if (t.Hb) {
                  var e = t.subscribe(this.Jd, this, "dirty"),
                    n = t.subscribe(this.Rd, this);
                  return {
                    da: t,
                    s: function () {
                      e.s(), n.s();
                    },
                  };
                }
                return t.subscribe(this.Hc, this);
              },
              Hc: function () {
                var t = this,
                  e = t.throttleEvaluation;
                e && 0 <= e
                  ? (clearTimeout(this[w].Ic),
                    (this[w].Ic = m.a.setTimeout(function () {
                      t.ha(!0);
                    }, e)))
                  : t.Ia
                  ? t.Ia(!0)
                  : t.ha(!0);
              },
              ha: function (t) {
                var e = this[w],
                  n = e.Sa,
                  a = !1;
                if (!e.rb && !e.ra) {
                  if ((e.l && !m.a.Sb(e.l)) || (n && n())) {
                    if (!e.jc) return void this.s();
                  } else e.jc = !1;
                  e.rb = !0;
                  try {
                    a = this.zd(t);
                  } finally {
                    e.rb = !1;
                  }
                  return a;
                }
              },
              zd: function (e) {
                var n = this[w],
                  a = !1,
                  i = n.wb ? t : !n.V,
                  a = { qd: this, mb: n.I, Qb: n.V };
                m.u.xc({ pd: a, od: p, o: this, Ya: i }), (n.I = {}), (n.V = 0);
                var r = this.yd(n, a);
                return (
                  n.V ? (a = this.sb(n.X, r)) : (this.s(), (a = !0)),
                  a &&
                    (n.J
                      ? this.Gb()
                      : this.notifySubscribers(n.X, "beforeChange"),
                    (n.X = r),
                    this.notifySubscribers(n.X, "spectate"),
                    !n.J && e && this.notifySubscribers(n.X),
                    this.rc && this.rc()),
                  i && this.notifySubscribers(n.X, "awake"),
                  a
                );
              },
              yd: function (t, e) {
                try {
                  var n = t.Wc;
                  return t.nb ? n.call(t.nb) : n();
                } finally {
                  m.u.end(), e.Qb && !t.J && m.a.P(e.mb, f), (t.sa = t.ka = !1);
                }
              },
              v: function (t) {
                var e = this[w];
                return (
                  ((e.ka && (t || !e.V)) || (e.J && this.Xa())) && this.ha(),
                  e.X
                );
              },
              ub: function (t) {
                m.T.fn.ub.call(this, t),
                  (this.nc = function () {
                    return (
                      this[w].J || (this[w].sa ? this.ha() : (this[w].ka = !1)),
                      this[w].X
                    );
                  }),
                  (this.Ia = function (t) {
                    this.pc(this[w].X),
                      (this[w].ka = !0),
                      t && (this[w].sa = !0),
                      this.qc(this, !t);
                  });
              },
              s: function () {
                var e = this[w];
                !e.J &&
                  e.I &&
                  m.a.P(e.I, function (t, e) {
                    e.s && e.s();
                  }),
                  e.l && e.Rb && m.a.K.yb(e.l, e.Rb),
                  (e.I = t),
                  (e.V = 0),
                  (e.ra = !0),
                  (e.sa = !1),
                  (e.ka = !1),
                  (e.J = !1),
                  (e.l = t),
                  (e.Sa = t),
                  (e.Wc = t),
                  this.Nc || (e.nb = t);
              },
            },
            _ = {
              Qa: function (t) {
                var e = this,
                  n = e[w];
                if (!n.ra && n.J && "change" == t) {
                  if (((n.J = !1), n.sa || e.Xa()))
                    (n.I = null), (n.V = 0), e.ha() && e.Gb();
                  else {
                    var a = [];
                    m.a.P(n.I, function (t, e) {
                      a[e.Ka] = t;
                    }),
                      m.a.D(a, function (t, a) {
                        var i = n.I[t],
                          r = e.$c(i.da);
                        (r.Ka = a), (r.La = i.La), (n.I[t] = r);
                      }),
                      e.Xa() && e.ha() && e.Gb();
                  }
                  n.ra || e.notifySubscribers(n.X, "awake");
                }
              },
              hb: function (e) {
                var n = this[w];
                n.ra ||
                  "change" != e ||
                  this.Wa("change") ||
                  (m.a.P(n.I, function (t, e) {
                    e.s && ((n.I[t] = { da: e.da, Ka: e.Ka, La: e.La }), e.s());
                  }),
                  (n.J = !0),
                  this.notifySubscribers(t, "asleep"));
              },
              ob: function () {
                var t = this[w];
                return (
                  t.J && (t.sa || this.Xa()) && this.ha(), m.T.fn.ob.call(this)
                );
              },
            },
            E = {
              Qa: function (t) {
                ("change" != t && "beforeChange" != t) || this.v();
              },
            };
          m.a.Ba && m.a.setPrototypeOf(x, m.T.fn);
          var k = m.ta.Ma;
          (x[k] = m.o),
            (m.Oc = function (t) {
              return "function" == typeof t && t[k] === x[k];
            }),
            (m.Fd = function (t) {
              return m.Oc(t) && t[w] && t[w].wb;
            }),
            m.b("computed", m.o),
            m.b("dependentObservable", m.o),
            m.b("isComputed", m.Oc),
            m.b("isPureComputed", m.Fd),
            m.b("computed.fn", x),
            m.L(x, "peek", x.v),
            m.L(x, "dispose", x.s),
            m.L(x, "isActive", x.ja),
            m.L(x, "getDependenciesCount", x.qa),
            m.L(x, "getDependencies", x.Va),
            (m.xb = function (t, e) {
              return "function" == typeof t
                ? m.o(t, e, { pure: !0 })
                : ((t = m.a.extend({}, t)), (t.pure = !0), m.o(t, e));
            }),
            m.b("pureComputed", m.xb),
            (function () {
              function e(i, r, o) {
                if (
                  ((o = o || new a()),
                  "object" != typeof (i = r(i)) ||
                    null === i ||
                    i === t ||
                    i instanceof RegExp ||
                    i instanceof Date ||
                    i instanceof String ||
                    i instanceof Number ||
                    i instanceof Boolean)
                )
                  return i;
                var s = i instanceof Array ? [] : {};
                return (
                  o.save(i, s),
                  n(i, function (n) {
                    var a = r(i[n]);
                    switch (typeof a) {
                      case "boolean":
                      case "number":
                      case "string":
                      case "function":
                        s[n] = a;
                        break;
                      case "object":
                      case "undefined":
                        var l = o.get(a);
                        s[n] = l !== t ? l : e(a, r, o);
                    }
                  }),
                  s
                );
              }
              function n(t, e) {
                if (t instanceof Array) {
                  for (var n = 0; n < t.length; n++) e(n);
                  "function" == typeof t.toJSON && e("toJSON");
                } else for (n in t) e(n);
              }
              function a() {
                (this.keys = []), (this.values = []);
              }
              (m.ad = function (t) {
                if (0 == arguments.length)
                  throw Error(
                    "When calling ko.toJS, pass the object you want to convert."
                  );
                return e(t, function (t) {
                  for (var e = 0; m.O(t) && 10 > e; e++) t = t();
                  return t;
                });
              }),
                (m.toJSON = function (t, e, n) {
                  return (t = m.ad(t)), m.a.hc(t, e, n);
                }),
                (a.prototype = {
                  constructor: a,
                  save: function (t, e) {
                    var n = m.a.A(this.keys, t);
                    0 <= n
                      ? (this.values[n] = e)
                      : (this.keys.push(t), this.values.push(e));
                  },
                  get: function (e) {
                    return (
                      (e = m.a.A(this.keys, e)), 0 <= e ? this.values[e] : t
                    );
                  },
                });
            })(),
            m.b("toJS", m.ad),
            m.b("toJSON", m.toJSON),
            (m.Wd = function (t, e, n) {
              function a(e) {
                var a = m.xb(t, n).extend({ ma: "always" }),
                  i = a.subscribe(function (t) {
                    t && (i.s(), e(t));
                  });
                return a.notifySubscribers(a.v()), i;
              }
              return "function" != typeof Promise || e
                ? a(e.bind(n))
                : new Promise(a);
            }),
            m.b("when", m.Wd),
            (function () {
              m.w = {
                M: function (e) {
                  switch (m.a.R(e)) {
                    case "option":
                      return !0 === e.__ko__hasDomDataOptionValue__
                        ? m.a.g.get(e, m.c.options.$b)
                        : 7 >= m.a.W
                        ? e.getAttributeNode("value") &&
                          e.getAttributeNode("value").specified
                          ? e.value
                          : e.text
                        : e.value;
                    case "select":
                      return 0 <= e.selectedIndex
                        ? m.w.M(e.options[e.selectedIndex])
                        : t;
                    default:
                      return e.value;
                  }
                },
                cb: function (e, n, a) {
                  switch (m.a.R(e)) {
                    case "option":
                      "string" == typeof n
                        ? (m.a.g.set(e, m.c.options.$b, t),
                          "__ko__hasDomDataOptionValue__" in e &&
                            delete e.__ko__hasDomDataOptionValue__,
                          (e.value = n))
                        : (m.a.g.set(e, m.c.options.$b, n),
                          (e.__ko__hasDomDataOptionValue__ = !0),
                          (e.value = "number" == typeof n ? n : ""));
                      break;
                    case "select":
                      ("" !== n && null !== n) || (n = t);
                      for (
                        var i, r = -1, o = 0, s = e.options.length;
                        o < s;
                        ++o
                      )
                        if (
                          (i = m.w.M(e.options[o])) == n ||
                          ("" === i && n === t)
                        ) {
                          r = o;
                          break;
                        }
                      (a || 0 <= r || (n === t && 1 < e.size)) &&
                        ((e.selectedIndex = r),
                        6 === m.a.W &&
                          m.a.setTimeout(function () {
                            e.selectedIndex = r;
                          }, 0));
                      break;
                    default:
                      (null !== n && n !== t) || (n = ""), (e.value = n);
                  }
                },
              };
            })(),
            m.b("selectExtensions", m.w),
            m.b("selectExtensions.readValue", m.w.M),
            m.b("selectExtensions.writeValue", m.w.cb),
            (m.m = (function () {
              function t(t) {
                (t = m.a.Db(t)),
                  123 === t.charCodeAt(0) && (t = t.slice(1, -1)),
                  (t += "\n,");
                var e,
                  n = [],
                  o = t.match(a),
                  s = [],
                  l = 0;
                if (1 < o.length) {
                  for (var c, d = 0; (c = o[d]); ++d) {
                    var u = c.charCodeAt(0);
                    if (44 === u) {
                      if (0 >= l) {
                        n.push(
                          e && s.length
                            ? { key: e, value: s.join("") }
                            : { unknown: e || s.join("") }
                        ),
                          (e = l = 0),
                          (s = []);
                        continue;
                      }
                    } else if (58 === u) {
                      if (!l && !e && 1 === s.length) {
                        e = s.pop();
                        continue;
                      }
                    } else {
                      if (
                        47 === u &&
                        1 < c.length &&
                        (47 === c.charCodeAt(1) || 42 === c.charCodeAt(1))
                      )
                        continue;
                      47 === u && d && 1 < c.length
                        ? (u = o[d - 1].match(i)) &&
                          !r[u[0]] &&
                          ((t = t.substr(t.indexOf(c) + 1)),
                          (o = t.match(a)),
                          (d = -1),
                          (c = "/"))
                        : 40 === u || 123 === u || 91 === u
                        ? ++l
                        : 41 === u || 125 === u || 93 === u
                        ? --l
                        : e ||
                          s.length ||
                          (34 !== u && 39 !== u) ||
                          (c = c.slice(1, -1));
                    }
                    s.push(c);
                  }
                  if (0 < l)
                    throw Error("Unbalanced parentheses, braces, or brackets");
                }
                return n;
              }
              var e = ["true", "false", "null", "undefined"],
                n = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i,
                a = RegExp(
                  "\"(?:\\\\.|[^\"])*\"|'(?:\\\\.|[^'])*'|`(?:\\\\.|[^`])*`|/\\*(?:[^*]|\\*+[^*/])*\\*+/|//.*\n|/(?:\\\\.|[^/])+/w*|[^\\s:,/][^,\"'`{}()/:[\\]]*[^\\s,\"'`{}()/:[\\]]|[^\\s]",
                  "g"
                ),
                i = /[\])"'A-Za-z0-9_$]+$/,
                r = { in: 1, return: 1, typeof: 1 },
                o = {};
              return {
                Ra: [],
                wa: o,
                ac: t,
                vb: function (a, i) {
                  function r(t, a) {
                    var i;
                    if (!d) {
                      var u = m.getBindingHandler(t);
                      if (u && u.preprocess && !(a = u.preprocess(a, t, r)))
                        return;
                      (u = o[t]) &&
                        ((i = a),
                        0 <= m.a.A(e, i)
                          ? (i = !1)
                          : ((u = i.match(n)),
                            (i =
                              null !== u &&
                              (u[1] ? "Object(" + u[1] + ")" + u[2] : i))),
                        (u = i)),
                        u &&
                          l.push(
                            "'" +
                              ("string" == typeof o[t] ? o[t] : t) +
                              "':function(_z){" +
                              i +
                              "=_z}"
                          );
                    }
                    c && (a = "function(){return " + a + " }"),
                      s.push("'" + t + "':" + a);
                  }
                  i = i || {};
                  var s = [],
                    l = [],
                    c = i.valueAccessors,
                    d = i.bindingParams,
                    u = "string" == typeof a ? t(a) : a;
                  return (
                    m.a.D(u, function (t) {
                      r(t.key || t.unknown, t.value);
                    }),
                    l.length &&
                      r("_ko_property_writers", "{" + l.join(",") + " }"),
                    s.join(",")
                  );
                },
                Id: function (t, e) {
                  for (var n = 0; n < t.length; n++)
                    if (t[n].key == e) return !0;
                  return !1;
                },
                eb: function (t, e, n, a, i) {
                  t && m.O(t)
                    ? !m.Za(t) || (i && t.v() === a) || t(a)
                    : (t = e.get("_ko_property_writers")) && t[n] && t[n](a);
                },
              };
            })()),
            m.b("expressionRewriting", m.m),
            m.b("expressionRewriting.bindingRewriteValidators", m.m.Ra),
            m.b("expressionRewriting.parseObjectLiteral", m.m.ac),
            m.b("expressionRewriting.preProcessBindings", m.m.vb),
            m.b("expressionRewriting._twoWayBindings", m.m.wa),
            m.b("jsonExpressionRewriting", m.m),
            m.b(
              "jsonExpressionRewriting.insertPropertyAccessorsIntoJson",
              m.m.vb
            ),
            (function () {
              function t(t) {
                return 8 == t.nodeType && o.test(r ? t.text : t.nodeValue);
              }
              function e(t) {
                return 8 == t.nodeType && s.test(r ? t.text : t.nodeValue);
              }
              function a(n, a) {
                for (var i = n, r = 1, o = []; (i = i.nextSibling); ) {
                  if (e(i) && (m.a.g.set(i, c, !0), 0 === --r)) return o;
                  o.push(i), t(i) && r++;
                }
                if (!a)
                  throw Error(
                    "Cannot find closing comment tag to match: " + n.nodeValue
                  );
                return null;
              }
              function i(t, e) {
                var n = a(t, e);
                return n
                  ? 0 < n.length
                    ? n[n.length - 1].nextSibling
                    : t.nextSibling
                  : null;
              }
              var r = n && "\x3c!--test--\x3e" === n.createComment("test").text,
                o = r
                  ? /^\x3c!--\s*ko(?:\s+([\s\S]+))?\s*--\x3e$/
                  : /^\s*ko(?:\s+([\s\S]+))?\s*$/,
                s = r ? /^\x3c!--\s*\/ko\s*--\x3e$/ : /^\s*\/ko\s*$/,
                l = { ul: !0, ol: !0 },
                c = "__ko_matchedEndComment__";
              m.h = {
                ea: {},
                childNodes: function (e) {
                  return t(e) ? a(e) : e.childNodes;
                },
                Ea: function (e) {
                  if (t(e)) {
                    e = m.h.childNodes(e);
                    for (var n = 0, a = e.length; n < a; n++)
                      m.removeNode(e[n]);
                  } else m.a.Tb(e);
                },
                va: function (e, n) {
                  if (t(e)) {
                    m.h.Ea(e);
                    for (var a = e.nextSibling, i = 0, r = n.length; i < r; i++)
                      a.parentNode.insertBefore(n[i], a);
                  } else m.a.va(e, n);
                },
                Vc: function (e, n) {
                  var a;
                  t(e)
                    ? ((a = e.nextSibling), (e = e.parentNode))
                    : (a = e.firstChild),
                    a ? n !== a && e.insertBefore(n, a) : e.appendChild(n);
                },
                Wb: function (e, n, a) {
                  a
                    ? ((a = a.nextSibling),
                      t(e) && (e = e.parentNode),
                      a ? n !== a && e.insertBefore(n, a) : e.appendChild(n))
                    : m.h.Vc(e, n);
                },
                firstChild: function (n) {
                  if (t(n))
                    return !n.nextSibling || e(n.nextSibling)
                      ? null
                      : n.nextSibling;
                  if (n.firstChild && e(n.firstChild))
                    throw Error(
                      "Found invalid end comment, as the first child of " + n
                    );
                  return n.firstChild;
                },
                nextSibling: function (n) {
                  if ((t(n) && (n = i(n)), n.nextSibling && e(n.nextSibling))) {
                    var a = n.nextSibling;
                    if (e(a) && !m.a.g.get(a, c))
                      throw Error(
                        "Found end comment without a matching opening comment, as child of " +
                          n
                      );
                    return null;
                  }
                  return n.nextSibling;
                },
                Cd: t,
                Vd: function (t) {
                  return (t = (r ? t.text : t.nodeValue).match(o))
                    ? t[1]
                    : null;
                },
                Sc: function (n) {
                  if (l[m.a.R(n)]) {
                    var a = n.firstChild;
                    if (a)
                      do {
                        if (1 === a.nodeType) {
                          var r;
                          r = a.firstChild;
                          var o = null;
                          if (r)
                            do {
                              if (o) o.push(r);
                              else if (t(r)) {
                                var s = i(r, !0);
                                s ? (r = s) : (o = [r]);
                              } else e(r) && (o = [r]);
                            } while ((r = r.nextSibling));
                          if ((r = o))
                            for (o = a.nextSibling, s = 0; s < r.length; s++)
                              o ? n.insertBefore(r[s], o) : n.appendChild(r[s]);
                        }
                      } while ((a = a.nextSibling));
                  }
                },
              };
            })(),
            m.b("virtualElements", m.h),
            m.b("virtualElements.allowedBindings", m.h.ea),
            m.b("virtualElements.emptyNode", m.h.Ea),
            m.b("virtualElements.insertAfter", m.h.Wb),
            m.b("virtualElements.prepend", m.h.Vc),
            m.b("virtualElements.setDomNodeChildren", m.h.va),
            (function () {
              (m.ga = function () {
                this.nd = {};
              }),
                m.a.extend(m.ga.prototype, {
                  nodeHasBindings: function (t) {
                    switch (t.nodeType) {
                      case 1:
                        return (
                          null != t.getAttribute("data-bind") ||
                          m.j.getComponentNameForNode(t)
                        );
                      case 8:
                        return m.h.Cd(t);
                      default:
                        return !1;
                    }
                  },
                  getBindings: function (t, e) {
                    var n = this.getBindingsString(t, e),
                      n = n ? this.parseBindingsString(n, e, t) : null;
                    return m.j.tc(n, t, e, !1);
                  },
                  getBindingAccessors: function (t, e) {
                    var n = this.getBindingsString(t, e),
                      n = n
                        ? this.parseBindingsString(n, e, t, {
                            valueAccessors: !0,
                          })
                        : null;
                    return m.j.tc(n, t, e, !0);
                  },
                  getBindingsString: function (t) {
                    switch (t.nodeType) {
                      case 1:
                        return t.getAttribute("data-bind");
                      case 8:
                        return m.h.Vd(t);
                      default:
                        return null;
                    }
                  },
                  parseBindingsString: function (t, e, n, a) {
                    try {
                      var i,
                        r = this.nd,
                        o = t + ((a && a.valueAccessors) || "");
                      if (!(i = r[o])) {
                        var s,
                          l =
                            "with($context){with($data||{}){return{" +
                            m.m.vb(t, a) +
                            "}}}";
                        (s = new Function("$context", "$element", l)),
                          (i = r[o] = s);
                      }
                      return i(e, n);
                    } catch (e) {
                      throw (
                        ((e.message =
                          "Unable to parse bindings.\nBindings value: " +
                          t +
                          "\nMessage: " +
                          e.message),
                        e)
                      );
                    }
                  },
                }),
                (m.ga.instance = new m.ga());
            })(),
            m.b("bindingProvider", m.ga),
            (function () {
              function a(t) {
                var e = (t = m.a.g.get(t, _)) && t.N;
                e && ((t.N = null), e.Tc());
              }
              function r(t, e, n) {
                (this.node = t),
                  (this.yc = e),
                  (this.kb = []),
                  (this.H = !1),
                  e.N || m.a.K.za(t, a),
                  n && n.N && (n.N.kb.push(t), (this.Kb = n));
              }
              function o(t) {
                return function () {
                  return t;
                };
              }
              function s(t) {
                return t();
              }
              function l(t) {
                return m.a.Ga(m.u.G(t), function (e, n) {
                  return function () {
                    return t()[n];
                  };
                });
              }
              function c(t, e, n) {
                return "function" == typeof t
                  ? l(t.bind(null, e, n))
                  : m.a.Ga(t, o);
              }
              function d(t, e) {
                return l(this.getBindings.bind(this, t, e));
              }
              function u(t, e) {
                var n = m.h.firstChild(e);
                if (n) {
                  var a,
                    i = m.ga.instance,
                    r = i.preprocessNode;
                  if (r) {
                    for (; (a = n); ) (n = m.h.nextSibling(a)), r.call(i, a);
                    n = m.h.firstChild(e);
                  }
                  for (; (a = n); ) (n = m.h.nextSibling(a)), f(t, a);
                }
                m.i.ma(e, m.i.H);
              }
              function f(t, e) {
                var n = t,
                  a = 1 === e.nodeType;
                a && m.h.Sc(e),
                  (a || m.ga.instance.nodeHasBindings(e)) &&
                    (n = h(e, null, t).bindingContextForDescendants),
                  n && !w[m.a.R(e)] && u(n, e);
              }
              function p(t) {
                var e = [],
                  n = {},
                  a = [];
                return (
                  m.a.P(t, function i(r) {
                    if (!n[r]) {
                      var o = m.getBindingHandler(r);
                      o &&
                        (o.after &&
                          (a.push(r),
                          m.a.D(o.after, function (e) {
                            if (t[e]) {
                              if (-1 !== m.a.A(a, e))
                                throw Error(
                                  "Cannot combine the following bindings, because they have a cyclic dependency: " +
                                    a.join(", ")
                                );
                              i(e);
                            }
                          }),
                          a.length--),
                        e.push({ key: r, Mc: o })),
                        (n[r] = !0);
                    }
                  }),
                  e
                );
              }
              function h(e, n, a) {
                var i = m.a.g.Ub(e, _, {}),
                  r = i.hd;
                if (!n) {
                  if (r)
                    throw Error(
                      "You cannot apply bindings multiple times to the same element."
                    );
                  i.hd = !0;
                }
                r || (i.context = a), i.Zb || (i.Zb = {});
                var o;
                if (n && "function" != typeof n) o = n;
                else {
                  var l = m.ga.instance,
                    c = l.getBindingAccessors || d,
                    u = m.$(
                      function () {
                        return (
                          (o = n ? n(a, e) : c.call(l, e, a)) &&
                            (a[b] && a[b](), a[y] && a[y]()),
                          o
                        );
                      },
                      null,
                      { l: e }
                    );
                  (o && u.ja()) || (u = null);
                }
                var f,
                  h = a;
                if (o) {
                  var v = function () {
                      return m.a.Ga(u ? u() : o, s);
                    },
                    g = u
                      ? function (t) {
                          return function () {
                            return s(u()[t]);
                          };
                        }
                      : function (t) {
                          return o[t];
                        };
                  (v.get = function (t) {
                    return o[t] && s(g(t));
                  }),
                    (v.has = function (t) {
                      return t in o;
                    }),
                    m.i.H in o &&
                      m.i.subscribe(e, m.i.H, function () {
                        var t = (0, o[m.i.H])();
                        if (t) {
                          var n = m.h.childNodes(e);
                          n.length && t(n, m.Ec(n[0]));
                        }
                      }),
                    m.i.pa in o &&
                      ((h = m.i.Cb(e, a)),
                      m.i.subscribe(e, m.i.pa, function () {
                        var t = (0, o[m.i.pa])();
                        t && m.h.firstChild(e) && t(e);
                      })),
                    (i = p(o)),
                    m.a.D(i, function (n) {
                      var a = n.Mc.init,
                        i = n.Mc.update,
                        r = n.key;
                      if (8 === e.nodeType && !m.h.ea[r])
                        throw Error(
                          "The binding '" +
                            r +
                            "' cannot be used with virtual elements"
                        );
                      try {
                        "function" == typeof a &&
                          m.u.G(function () {
                            var n = a(e, g(r), v, h.$data, h);
                            if (n && n.controlsDescendantBindings) {
                              if (f !== t)
                                throw Error(
                                  "Multiple bindings (" +
                                    f +
                                    " and " +
                                    r +
                                    ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element."
                                );
                              f = r;
                            }
                          }),
                          "function" == typeof i &&
                            m.$(
                              function () {
                                i(e, g(r), v, h.$data, h);
                              },
                              null,
                              { l: e }
                            );
                      } catch (t) {
                        throw (
                          ((t.message =
                            'Unable to process binding "' +
                            r +
                            ": " +
                            o[r] +
                            '"\nMessage: ' +
                            t.message),
                          t)
                        );
                      }
                    });
                }
                return (
                  (i = f === t),
                  {
                    shouldBindDescendants: i,
                    bindingContextForDescendants: i && h,
                  }
                );
              }
              function v(e, n) {
                return e && e instanceof m.fa ? e : new m.fa(e, t, t, n);
              }
              var b = m.a.Da("_subscribable"),
                g = m.a.Da("_ancestorBindingInfo"),
                y = m.a.Da("_dataDependency");
              m.c = {};
              var w = { script: !0, textarea: !0, template: !0 };
              m.getBindingHandler = function (t) {
                return m.c[t];
              };
              var x = {};
              (m.fa = function (e, n, a, i, r) {
                function o() {
                  var t = u ? d() : d,
                    e = m.a.f(t);
                  return (
                    n
                      ? (m.a.extend(l, n), g in n && (l[g] = n[g]))
                      : ((l.$parents = []), (l.$root = e), (l.ko = m)),
                    (l[b] = s),
                    c ? (e = l.$data) : ((l.$rawData = t), (l.$data = e)),
                    a && (l[a] = e),
                    i && i(l, n, e),
                    n && n[b] && !m.S.o().Vb(n[b]) && n[b](),
                    f && (l[y] = f),
                    l.$data
                  );
                }
                var s,
                  l = this,
                  c = e === x,
                  d = c ? t : e,
                  u = "function" == typeof d && !m.O(d),
                  f = r && r.dataDependency;
                r && r.exportDependencies
                  ? o()
                  : ((s = m.xb(o)),
                    s.v(),
                    s.ja() ? (s.equalityComparer = null) : (l[b] = t));
              }),
                (m.fa.prototype.createChildContext = function (t, e, n, a) {
                  if (
                    (!a &&
                      e &&
                      "object" == typeof e &&
                      ((a = e), (e = a.as), (n = a.extend)),
                    e && a && a.noChildContext)
                  ) {
                    var i = "function" == typeof t && !m.O(t);
                    return new m.fa(
                      x,
                      this,
                      null,
                      function (a) {
                        n && n(a), (a[e] = i ? t() : t);
                      },
                      a
                    );
                  }
                  return new m.fa(
                    t,
                    this,
                    e,
                    function (t, e) {
                      (t.$parentContext = e),
                        (t.$parent = e.$data),
                        (t.$parents = (e.$parents || []).slice(0)),
                        t.$parents.unshift(t.$parent),
                        n && n(t);
                    },
                    a
                  );
                }),
                (m.fa.prototype.extend = function (t, e) {
                  return new m.fa(
                    x,
                    this,
                    null,
                    function (e) {
                      m.a.extend(e, "function" == typeof t ? t(e) : t);
                    },
                    e
                  );
                });
              var _ = m.a.g.Z();
              (r.prototype.Tc = function () {
                this.Kb && this.Kb.N && this.Kb.N.sd(this.node);
              }),
                (r.prototype.sd = function (t) {
                  m.a.Pa(this.kb, t), !this.kb.length && this.H && this.Cc();
                }),
                (r.prototype.Cc = function () {
                  (this.H = !0),
                    this.yc.N &&
                      !this.kb.length &&
                      ((this.yc.N = null),
                      m.a.K.yb(this.node, a),
                      m.i.ma(this.node, m.i.pa),
                      this.Tc());
                }),
                (m.i = {
                  H: "childrenComplete",
                  pa: "descendantsComplete",
                  subscribe: function (t, e, n, a, i) {
                    var r = m.a.g.Ub(t, _, {});
                    return (
                      r.Fa || (r.Fa = new m.T()),
                      i && i.notifyImmediately && r.Zb[e] && m.u.G(n, a, [t]),
                      r.Fa.subscribe(n, a, e)
                    );
                  },
                  ma: function (e, n) {
                    var a = m.a.g.get(e, _);
                    if (
                      a &&
                      ((a.Zb[n] = !0),
                      a.Fa && a.Fa.notifySubscribers(e, n),
                      n == m.i.H)
                    )
                      if (a.N) a.N.Cc();
                      else if (a.N === t && a.Fa && a.Fa.Wa(m.i.pa))
                        throw Error(
                          "descendantsComplete event not supported for bindings on this node"
                        );
                  },
                  Cb: function (t, e) {
                    var n = m.a.g.Ub(t, _, {});
                    return (
                      n.N || (n.N = new r(t, n, e[g])),
                      e[g] == n
                        ? e
                        : e.extend(function (t) {
                            t[g] = n;
                          })
                    );
                  },
                }),
                (m.Td = function (t) {
                  return (t = m.a.g.get(t, _)) && t.context;
                }),
                (m.ib = function (t, e, n) {
                  return 1 === t.nodeType && m.h.Sc(t), h(t, e, v(n));
                }),
                (m.ld = function (t, e, n) {
                  return (n = v(n)), m.ib(t, c(e, n, t), n);
                }),
                (m.Oa = function (t, e) {
                  (1 !== e.nodeType && 8 !== e.nodeType) || u(v(t), e);
                }),
                (m.vc = function (t, a, r) {
                  if (
                    (!i && e.jQuery && (i = e.jQuery), 2 > arguments.length)
                  ) {
                    if (!(a = n.body))
                      throw Error(
                        "ko.applyBindings: could not find document.body; has the document been loaded?"
                      );
                  } else if (!a || (1 !== a.nodeType && 8 !== a.nodeType))
                    throw Error(
                      "ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node"
                    );
                  f(v(t, r), a);
                }),
                (m.Dc = function (e) {
                  return !e || (1 !== e.nodeType && 8 !== e.nodeType)
                    ? t
                    : m.Td(e);
                }),
                (m.Ec = function (e) {
                  return (e = m.Dc(e)) ? e.$data : t;
                }),
                m.b("bindingHandlers", m.c),
                m.b("bindingEvent", m.i),
                m.b("bindingEvent.subscribe", m.i.subscribe),
                m.b("bindingEvent.startPossiblyAsyncContentBinding", m.i.Cb),
                m.b("applyBindings", m.vc),
                m.b("applyBindingsToDescendants", m.Oa),
                m.b("applyBindingAccessorsToNode", m.ib),
                m.b("applyBindingsToNode", m.ld),
                m.b("contextFor", m.Dc),
                m.b("dataFor", m.Ec);
            })(),
            (function (t) {
              function e(e, a) {
                var o,
                  s = Object.prototype.hasOwnProperty.call(i, e) ? i[e] : t;
                s
                  ? s.subscribe(a)
                  : ((s = i[e] = new m.T()),
                    s.subscribe(a),
                    n(e, function (t, n) {
                      var a = !(!n || !n.synchronous);
                      (r[e] = { definition: t, Gd: a }),
                        delete i[e],
                        o || a
                          ? s.notifySubscribers(t)
                          : m.na.zb(function () {
                              s.notifySubscribers(t);
                            });
                    }),
                    (o = !0));
              }
              function n(t, e) {
                a("getConfig", [t], function (n) {
                  n
                    ? a("loadComponent", [t, n], function (t) {
                        e(t, n);
                      })
                    : e(null, null);
                });
              }
              function a(e, n, i, r) {
                r || (r = m.j.loaders.slice(0));
                var o = r.shift();
                if (o) {
                  var s = o[e];
                  if (s) {
                    var l = !1;
                    if (
                      s.apply(
                        o,
                        n.concat(function (t) {
                          l ? i(null) : null !== t ? i(t) : a(e, n, i, r);
                        })
                      ) !== t &&
                      ((l = !0), !o.suppressLoaderExceptions)
                    )
                      throw Error(
                        "Component loaders must supply values by invoking the callback, not by returning values synchronously."
                      );
                  } else a(e, n, i, r);
                } else i(null);
              }
              var i = {},
                r = {};
              (m.j = {
                get: function (n, a) {
                  var i = Object.prototype.hasOwnProperty.call(r, n) ? r[n] : t;
                  i
                    ? i.Gd
                      ? m.u.G(function () {
                          a(i.definition);
                        })
                      : m.na.zb(function () {
                          a(i.definition);
                        })
                    : e(n, a);
                },
                Bc: function (t) {
                  delete r[t];
                },
                oc: a,
              }),
                (m.j.loaders = []),
                m.b("components", m.j),
                m.b("components.get", m.j.get),
                m.b("components.clearCachedDefinition", m.j.Bc);
            })(),
            (function () {
              function t(t, e, n, a) {
                function i() {
                  0 == --s && a(r);
                }
                var r = {},
                  s = 2,
                  l = n.template;
                (n = n.viewModel),
                  l
                    ? o(e, l, function (e) {
                        m.j.oc("loadTemplate", [t, e], function (t) {
                          (r.template = t), i();
                        });
                      })
                    : i(),
                  n
                    ? o(e, n, function (e) {
                        m.j.oc("loadViewModel", [t, e], function (t) {
                          (r[d] = t), i();
                        });
                      })
                    : i();
              }
              function a(t, e, n) {
                if ("function" == typeof e)
                  n(function (t) {
                    return new e(t);
                  });
                else if ("function" == typeof e[d]) n(e[d]);
                else if ("instance" in e) {
                  var i = e.instance;
                  n(function () {
                    return i;
                  });
                } else
                  "viewModel" in e
                    ? a(t, e.viewModel, n)
                    : t("Unknown viewModel value: " + e);
              }
              function i(t) {
                switch (m.a.R(t)) {
                  case "script":
                    return m.a.ua(t.text);
                  case "textarea":
                    return m.a.ua(t.value);
                  case "template":
                    if (r(t.content)) return m.a.Ca(t.content.childNodes);
                }
                return m.a.Ca(t.childNodes);
              }
              function r(t) {
                return e.DocumentFragment
                  ? t instanceof DocumentFragment
                  : t && 11 === t.nodeType;
              }
              function o(t, n, a) {
                "string" == typeof n.require
                  ? s || e.require
                    ? (s || e.require)([n.require], function (t) {
                        t &&
                          "object" == typeof t &&
                          t.Xd &&
                          t.default &&
                          (t = t.default),
                          a(t);
                      })
                    : t("Uses require, but no AMD loader is present")
                  : a(n);
              }
              function l(t) {
                return function (e) {
                  throw Error("Component '" + t + "': " + e);
                };
              }
              var c = {};
              (m.j.register = function (t, e) {
                if (!e) throw Error("Invalid configuration for " + t);
                if (m.j.tb(t))
                  throw Error("Component " + t + " is already registered");
                c[t] = e;
              }),
                (m.j.tb = function (t) {
                  return Object.prototype.hasOwnProperty.call(c, t);
                }),
                (m.j.unregister = function (t) {
                  delete c[t], m.j.Bc(t);
                }),
                (m.j.Fc = {
                  getConfig: function (t, e) {
                    e(m.j.tb(t) ? c[t] : null);
                  },
                  loadComponent: function (e, n, a) {
                    var i = l(e);
                    o(i, n, function (n) {
                      t(e, i, n, a);
                    });
                  },
                  loadTemplate: function (t, a, o) {
                    if (((t = l(t)), "string" == typeof a)) o(m.a.ua(a));
                    else if (a instanceof Array) o(a);
                    else if (r(a)) o(m.a.la(a.childNodes));
                    else if (a.element)
                      if (
                        ((a = a.element),
                        e.HTMLElement
                          ? a instanceof HTMLElement
                          : a && a.tagName && 1 === a.nodeType)
                      )
                        o(i(a));
                      else if ("string" == typeof a) {
                        var s = n.getElementById(a);
                        s ? o(i(s)) : t("Cannot find element with ID " + a);
                      } else t("Unknown element type: " + a);
                    else t("Unknown template value: " + a);
                  },
                  loadViewModel: function (t, e, n) {
                    a(l(t), e, n);
                  },
                });
              var d = "createViewModel";
              m.b("components.register", m.j.register),
                m.b("components.isRegistered", m.j.tb),
                m.b("components.unregister", m.j.unregister),
                m.b("components.defaultLoader", m.j.Fc),
                m.j.loaders.push(m.j.Fc),
                (m.j.dd = c);
            })(),
            (function () {
              function t(t, n) {
                var a = t.getAttribute("params");
                if (a) {
                  var a = e.parseBindingsString(a, n, t, {
                      valueAccessors: !0,
                      bindingParams: !0,
                    }),
                    a = m.a.Ga(a, function (e) {
                      return m.o(e, null, { l: t });
                    }),
                    i = m.a.Ga(a, function (e) {
                      var n = e.v();
                      return e.ja()
                        ? m.o({
                            read: function () {
                              return m.a.f(e());
                            },
                            write:
                              m.Za(n) &&
                              function (t) {
                                e()(t);
                              },
                            l: t,
                          })
                        : n;
                    });
                  return (
                    Object.prototype.hasOwnProperty.call(i, "$raw") ||
                      (i.$raw = a),
                    i
                  );
                }
                return { $raw: {} };
              }
              (m.j.getComponentNameForNode = function (t) {
                var e = m.a.R(t);
                if (
                  m.j.tb(e) &&
                  (-1 != e.indexOf("-") ||
                    "[object HTMLUnknownElement]" == "" + t ||
                    (8 >= m.a.W && t.tagName === e))
                )
                  return e;
              }),
                (m.j.tc = function (e, n, a, i) {
                  if (1 === n.nodeType) {
                    var r = m.j.getComponentNameForNode(n);
                    if (r) {
                      if (((e = e || {}), e.component))
                        throw Error(
                          'Cannot use the "component" binding on a custom element matching a component'
                        );
                      var o = { name: r, params: t(n, a) };
                      e.component = i
                        ? function () {
                            return o;
                          }
                        : o;
                    }
                  }
                  return e;
                });
              var e = new m.ga();
              9 > m.a.W &&
                ((m.j.register = (function (t) {
                  return function (e) {
                    return t.apply(this, arguments);
                  };
                })(m.j.register)),
                (n.createDocumentFragment = (function (t) {
                  return function () {
                    var e,
                      n = t(),
                      a = m.j.dd;
                    for (e in a);
                    return n;
                  };
                })(n.createDocumentFragment)));
            })(),
            (function () {
              function t(t, e, n) {
                if (!(e = e.template))
                  throw Error("Component '" + t + "' has no template");
                (t = m.a.Ca(e)), m.h.va(n, t);
              }
              function e(t, e, n) {
                var a = t.createViewModel;
                return a ? a.call(t, e, n) : e;
              }
              var n = 0;
              (m.c.component = {
                init: function (a, i, r, o, s) {
                  function l() {
                    var t = c && c.dispose;
                    "function" == typeof t && t.call(c),
                      u && u.s(),
                      (d = c = u = null);
                  }
                  var c,
                    d,
                    u,
                    f = m.a.la(m.h.childNodes(a));
                  return (
                    m.h.Ea(a),
                    m.a.K.za(a, l),
                    m.o(
                      function () {
                        var r,
                          o,
                          p = m.a.f(i());
                        if (
                          ("string" == typeof p
                            ? (r = p)
                            : ((r = m.a.f(p.name)), (o = m.a.f(p.params))),
                          !r)
                        )
                          throw Error("No component name specified");
                        var h = m.i.Cb(a, s),
                          v = (d = ++n);
                        m.j.get(r, function (n) {
                          if (d === v) {
                            if ((l(), !n))
                              throw Error("Unknown component '" + r + "'");
                            t(r, n, a);
                            var i = e(n, o, { element: a, templateNodes: f });
                            (n = h.createChildContext(i, {
                              extend: function (t) {
                                (t.$component = i),
                                  (t.$componentTemplateNodes = f);
                              },
                            })),
                              i &&
                                i.koDescendantsComplete &&
                                (u = m.i.subscribe(
                                  a,
                                  m.i.pa,
                                  i.koDescendantsComplete,
                                  i
                                )),
                              (c = i),
                              m.Oa(n, a);
                          }
                        });
                      },
                      null,
                      { l: a }
                    ),
                    { controlsDescendantBindings: !0 }
                  );
                },
              }),
                (m.h.ea.component = !0);
            })();
          var T = { class: "className", for: "htmlFor" };
          (m.c.attr = {
            update: function (e, n) {
              var a = m.a.f(n()) || {};
              m.a.P(a, function (n, a) {
                a = m.a.f(a);
                var i = n.indexOf(":"),
                  i =
                    "lookupNamespaceURI" in e &&
                    0 < i &&
                    e.lookupNamespaceURI(n.substr(0, i)),
                  r = !1 === a || null === a || a === t;
                r
                  ? i
                    ? e.removeAttributeNS(i, n)
                    : e.removeAttribute(n)
                  : (a = a.toString()),
                  8 >= m.a.W && n in T
                    ? ((n = T[n]), r ? e.removeAttribute(n) : (e[n] = a))
                    : r ||
                      (i ? e.setAttributeNS(i, n, a) : e.setAttribute(n, a)),
                  "name" === n && m.a.Yc(e, r ? "" : a);
              });
            },
          }),
            (function () {
              (m.c.checked = {
                after: ["value", "attr"],
                init: function (e, n, a) {
                  function i() {
                    var i = e.checked,
                      r = o();
                    if (!m.S.Ya() && (i || (!l && !m.S.qa()))) {
                      var c = m.u.G(n);
                      if (d) {
                        var f = u ? c.v() : c,
                          h = p;
                        (p = r),
                          h !== r
                            ? i && (m.a.Na(f, r, !0), m.a.Na(f, h, !1))
                            : m.a.Na(f, r, i),
                          u && m.Za(c) && c(f);
                      } else
                        s && (r === t ? (r = i) : i || (r = t)),
                          m.m.eb(c, a, "checked", r, !0);
                    }
                  }
                  function r() {
                    var a = m.a.f(n()),
                      i = o();
                    d
                      ? ((e.checked = 0 <= m.a.A(a, i)), (p = i))
                      : (e.checked = s && i === t ? !!a : o() === a);
                  }
                  var o = m.xb(function () {
                      return a.has("checkedValue")
                        ? m.a.f(a.get("checkedValue"))
                        : f
                        ? a.has("value")
                          ? m.a.f(a.get("value"))
                          : e.value
                        : void 0;
                    }),
                    s = "checkbox" == e.type,
                    l = "radio" == e.type;
                  if (s || l) {
                    var c = n(),
                      d = s && m.a.f(c) instanceof Array,
                      u = !(d && c.push && c.splice),
                      f = l || d,
                      p = d ? o() : t;
                    l &&
                      !e.name &&
                      m.c.uniqueName.init(e, function () {
                        return !0;
                      }),
                      m.o(i, null, { l: e }),
                      m.a.B(e, "click", i),
                      m.o(r, null, { l: e }),
                      (c = t);
                  }
                },
              }),
                (m.m.wa.checked = !0),
                (m.c.checkedValue = {
                  update: function (t, e) {
                    t.value = m.a.f(e());
                  },
                });
            })(),
            (m.c.class = {
              update: function (t, e) {
                var n = m.a.Db(m.a.f(e()));
                m.a.Eb(t, t.__ko__cssValue, !1),
                  (t.__ko__cssValue = n),
                  m.a.Eb(t, n, !0);
              },
            }),
            (m.c.css = {
              update: function (t, e) {
                var n = m.a.f(e());
                null !== n && "object" == typeof n
                  ? m.a.P(n, function (e, n) {
                      (n = m.a.f(n)), m.a.Eb(t, e, n);
                    })
                  : m.c.class.update(t, e);
              },
            }),
            (m.c.enable = {
              update: function (t, e) {
                var n = m.a.f(e());
                n && t.disabled
                  ? t.removeAttribute("disabled")
                  : n || t.disabled || (t.disabled = !0);
              },
            }),
            (m.c.disable = {
              update: function (t, e) {
                m.c.enable.update(t, function () {
                  return !m.a.f(e());
                });
              },
            }),
            (m.c.event = {
              init: function (t, e, n, a, i) {
                var r = e() || {};
                m.a.P(r, function (r) {
                  "string" == typeof r &&
                    m.a.B(t, r, function (t) {
                      var o,
                        s = e()[r];
                      if (s) {
                        try {
                          var l = m.a.la(arguments);
                          (a = i.$data), l.unshift(a), (o = s.apply(a, l));
                        } finally {
                          !0 !== o &&
                            (t.preventDefault
                              ? t.preventDefault()
                              : (t.returnValue = !1));
                        }
                        !1 === n.get(r + "Bubble") &&
                          ((t.cancelBubble = !0),
                          t.stopPropagation && t.stopPropagation());
                      }
                    });
                });
              },
            }),
            (m.c.foreach = {
              Rc: function (t) {
                return function () {
                  var e = t(),
                    n = m.a.bc(e);
                  return n && "number" != typeof n.length
                    ? (m.a.f(e),
                      {
                        foreach: n.data,
                        as: n.as,
                        noChildContext: n.noChildContext,
                        includeDestroyed: n.includeDestroyed,
                        afterAdd: n.afterAdd,
                        beforeRemove: n.beforeRemove,
                        afterRender: n.afterRender,
                        beforeMove: n.beforeMove,
                        afterMove: n.afterMove,
                        templateEngine: m.ba.Ma,
                      })
                    : { foreach: e, templateEngine: m.ba.Ma };
                };
              },
              init: function (t, e) {
                return m.c.template.init(t, m.c.foreach.Rc(e));
              },
              update: function (t, e, n, a, i) {
                return m.c.template.update(t, m.c.foreach.Rc(e), n, a, i);
              },
            }),
            (m.m.Ra.foreach = !1),
            (m.h.ea.foreach = !0),
            (m.c.hasfocus = {
              init: function (t, e, n) {
                function a(a) {
                  t.__ko_hasfocusUpdating = !0;
                  var i = t.ownerDocument;
                  if ("activeElement" in i) {
                    var r;
                    try {
                      r = i.activeElement;
                    } catch (t) {
                      r = i.body;
                    }
                    a = r === t;
                  }
                  (i = e()),
                    m.m.eb(i, n, "hasfocus", a, !0),
                    (t.__ko_hasfocusLastValue = a),
                    (t.__ko_hasfocusUpdating = !1);
                }
                var i = a.bind(null, !0),
                  r = a.bind(null, !1);
                m.a.B(t, "focus", i),
                  m.a.B(t, "focusin", i),
                  m.a.B(t, "blur", r),
                  m.a.B(t, "focusout", r),
                  (t.__ko_hasfocusLastValue = !1);
              },
              update: function (t, e) {
                var n = !!m.a.f(e());
                t.__ko_hasfocusUpdating ||
                  t.__ko_hasfocusLastValue === n ||
                  (n ? t.focus() : t.blur(),
                  !n &&
                    t.__ko_hasfocusLastValue &&
                    t.ownerDocument.body.focus(),
                  m.u.G(m.a.Fb, null, [t, n ? "focusin" : "focusout"]));
              },
            }),
            (m.m.wa.hasfocus = !0),
            (m.c.hasFocus = m.c.hasfocus),
            (m.m.wa.hasFocus = "hasfocus"),
            (m.c.html = {
              init: function () {
                return { controlsDescendantBindings: !0 };
              },
              update: function (t, e) {
                m.a.fc(t, e());
              },
            }),
            (function () {
              function t(t, e, n) {
                (m.c[t] = {
                  init: function (t, a, i, r, o) {
                    var s,
                      l,
                      c,
                      d,
                      u,
                      f = {};
                    if (e) {
                      r = i.get("as");
                      var p = i.get("noChildContext");
                      (u = !(r && p)),
                        (f = {
                          as: r,
                          noChildContext: p,
                          exportDependencies: u,
                        });
                    }
                    return (
                      (d =
                        (c = "render" == i.get("completeOn")) || i.has(m.i.pa)),
                      m.o(
                        function () {
                          var i,
                            r = m.a.f(a()),
                            p = !n != !r,
                            h = !l;
                          (u || p !== s) &&
                            (d && (o = m.i.Cb(t, o)),
                            p &&
                              ((e && !u) || (f.dataDependency = m.S.o()),
                              (i = e
                                ? o.createChildContext(
                                    "function" == typeof r ? r : a,
                                    f
                                  )
                                : m.S.qa()
                                ? o.extend(null, f)
                                : o)),
                            h &&
                              m.S.qa() &&
                              (l = m.a.Ca(m.h.childNodes(t), !0)),
                            p
                              ? (h || m.h.va(t, m.a.Ca(l)), m.Oa(i, t))
                              : (m.h.Ea(t), c || m.i.ma(t, m.i.H)),
                            (s = p));
                        },
                        null,
                        { l: t }
                      ),
                      { controlsDescendantBindings: !0 }
                    );
                  },
                }),
                  (m.m.Ra[t] = !1),
                  (m.h.ea[t] = !0);
              }
              t("if"), t("ifnot", !1, !0), t("with", !0);
            })(),
            (m.c.let = {
              init: function (t, e, n, a, i) {
                return (
                  (e = i.extend(e)),
                  m.Oa(e, t),
                  { controlsDescendantBindings: !0 }
                );
              },
            }),
            (m.h.ea.let = !0);
          var C = {};
          (m.c.options = {
            init: function (t) {
              if ("select" !== m.a.R(t))
                throw Error("options binding applies only to SELECT elements");
              for (; 0 < t.length; ) t.remove(0);
              return { controlsDescendantBindings: !0 };
            },
            update: function (e, n, a) {
              function i() {
                return m.a.jb(e.options, function (t) {
                  return t.selected;
                });
              }
              function r(t, e, n) {
                var a = typeof e;
                return "function" == a ? e(t) : "string" == a ? t[e] : n;
              }
              function o(t, n) {
                if (h && d) m.i.ma(e, m.i.H);
                else if (p.length) {
                  var a = 0 <= m.a.A(p, m.w.M(n[0]));
                  m.a.Zc(n[0], a),
                    h && !a && m.u.G(m.a.Fb, null, [e, "change"]);
                }
              }
              var s = e.multiple,
                l = 0 != e.length && s ? e.scrollTop : null,
                c = m.a.f(n()),
                d = a.get("valueAllowUnset") && a.has("value"),
                u = a.get("optionsIncludeDestroyed");
              n = {};
              var f,
                p = [];
              d ||
                (s
                  ? (p = m.a.Mb(i(), m.w.M))
                  : 0 <= e.selectedIndex &&
                    p.push(m.w.M(e.options[e.selectedIndex]))),
                c &&
                  (void 0 === c.length && (c = [c]),
                  (f = m.a.jb(c, function (e) {
                    return u || e === t || null === e || !m.a.f(e._destroy);
                  })),
                  a.has("optionsCaption") &&
                    null !== (c = m.a.f(a.get("optionsCaption"))) &&
                    c !== t &&
                    f.unshift(C));
              var h = !1;
              if (
                ((n.beforeRemove = function (t) {
                  e.removeChild(t);
                }),
                (c = o),
                a.has("optionsAfterRender") &&
                  "function" == typeof a.get("optionsAfterRender") &&
                  (c = function (e, n) {
                    o(0, n),
                      m.u.G(a.get("optionsAfterRender"), null, [
                        n[0],
                        e !== C ? e : t,
                      ]);
                  }),
                m.a.ec(
                  e,
                  f,
                  function (n, i, o) {
                    return (
                      o.length &&
                        ((p = !d && o[0].selected ? [m.w.M(o[0])] : []),
                        (h = !0)),
                      (i = e.ownerDocument.createElement("option")),
                      n === C
                        ? (m.a.Bb(i, a.get("optionsCaption")), m.w.cb(i, t))
                        : ((o = r(n, a.get("optionsValue"), n)),
                          m.w.cb(i, m.a.f(o)),
                          (n = r(n, a.get("optionsText"), o)),
                          m.a.Bb(i, n)),
                      [i]
                    );
                  },
                  n,
                  c
                ),
                !d)
              ) {
                var v;
                (v = s
                  ? p.length && i().length < p.length
                  : p.length && 0 <= e.selectedIndex
                  ? m.w.M(e.options[e.selectedIndex]) !== p[0]
                  : p.length || 0 <= e.selectedIndex),
                  v && m.u.G(m.a.Fb, null, [e, "change"]);
              }
              (d || m.S.Ya()) && m.i.ma(e, m.i.H),
                m.a.wd(e),
                l && 20 < Math.abs(l - e.scrollTop) && (e.scrollTop = l);
            },
          }),
            (m.c.options.$b = m.a.g.Z()),
            (m.c.selectedOptions = {
              init: function (t, e, n) {
                function a() {
                  var a = e(),
                    i = [];
                  m.a.D(t.getElementsByTagName("option"), function (t) {
                    t.selected && i.push(m.w.M(t));
                  }),
                    m.m.eb(a, n, "selectedOptions", i);
                }
                function i() {
                  var n = m.a.f(e()),
                    a = t.scrollTop;
                  n &&
                    "number" == typeof n.length &&
                    m.a.D(t.getElementsByTagName("option"), function (t) {
                      var e = 0 <= m.a.A(n, m.w.M(t));
                      t.selected != e && m.a.Zc(t, e);
                    }),
                    (t.scrollTop = a);
                }
                if ("select" != m.a.R(t))
                  throw Error(
                    "selectedOptions binding applies only to SELECT elements"
                  );
                var r;
                m.i.subscribe(
                  t,
                  m.i.H,
                  function () {
                    r
                      ? a()
                      : (m.a.B(t, "change", a), (r = m.o(i, null, { l: t })));
                  },
                  null,
                  { notifyImmediately: !0 }
                );
              },
              update: function () {},
            }),
            (m.m.wa.selectedOptions = !0),
            (m.c.style = {
              update: function (e, n) {
                var a = m.a.f(n() || {});
                m.a.P(a, function (n, a) {
                  if (
                    ((a = m.a.f(a)),
                    (null !== a && a !== t && !1 !== a) || (a = ""),
                    i)
                  )
                    i(e).css(n, a);
                  else if (/^--/.test(n)) e.style.setProperty(n, a);
                  else {
                    n = n.replace(/-(\w)/g, function (t, e) {
                      return e.toUpperCase();
                    });
                    var r = e.style[n];
                    (e.style[n] = a),
                      a === r ||
                        e.style[n] != r ||
                        isNaN(a) ||
                        (e.style[n] = a + "px");
                  }
                });
              },
            }),
            (m.c.submit = {
              init: function (t, e, n, a, i) {
                if ("function" != typeof e())
                  throw Error(
                    "The value for a submit binding must be a function"
                  );
                m.a.B(t, "submit", function (n) {
                  var a,
                    r = e();
                  try {
                    a = r.call(i.$data, t);
                  } finally {
                    !0 !== a &&
                      (n.preventDefault
                        ? n.preventDefault()
                        : (n.returnValue = !1));
                  }
                });
              },
            }),
            (m.c.text = {
              init: function () {
                return { controlsDescendantBindings: !0 };
              },
              update: function (t, e) {
                m.a.Bb(t, e());
              },
            }),
            (m.h.ea.text = !0),
            (function () {
              if (e && e.navigator) {
                var n,
                  a,
                  i,
                  r,
                  o,
                  s = function (t) {
                    if (t) return parseFloat(t[1]);
                  },
                  l = e.navigator.userAgent;
                (n =
                  e.opera && e.opera.version && parseInt(e.opera.version())) ||
                  (o = s(l.match(/Edge\/([^ ]+)$/))) ||
                  s(l.match(/Chrome\/([^ ]+)/)) ||
                  (a = s(l.match(/Version\/([^ ]+) Safari/))) ||
                  (i = s(l.match(/Firefox\/([^ ]+)/))) ||
                  (r = m.a.W || s(l.match(/MSIE ([^ ]+)/))) ||
                  (r = s(l.match(/rv:([^ )]+)/)));
              }
              if (8 <= r && 10 > r)
                var c = m.a.g.Z(),
                  d = m.a.g.Z(),
                  u = function (t) {
                    var e = this.activeElement;
                    (e = e && m.a.g.get(e, d)) && e(t);
                  },
                  f = function (t, e) {
                    var n = t.ownerDocument;
                    m.a.g.get(n, c) ||
                      (m.a.g.set(n, c, !0), m.a.B(n, "selectionchange", u)),
                      m.a.g.set(t, d, e);
                  };
              (m.c.textInput = {
                init: function (e, s, l) {
                  function c(t, n) {
                    m.a.B(e, t, n);
                  }
                  function d() {
                    var n = m.a.f(s());
                    (null !== n && n !== t) || (n = ""),
                      v !== t && n === v
                        ? m.a.setTimeout(d, 4)
                        : e.value !== n &&
                          ((y = !0), (e.value = n), (y = !1), (b = e.value));
                  }
                  function u() {
                    h || ((v = e.value), (h = m.a.setTimeout(p, 4)));
                  }
                  function p() {
                    clearTimeout(h), (v = h = t);
                    var n = e.value;
                    b !== n && ((b = n), m.m.eb(s(), l, "textInput", n));
                  }
                  var h,
                    v,
                    b = e.value,
                    g = 9 == m.a.W ? u : p,
                    y = !1;
                  r && c("keypress", p),
                    11 > r &&
                      c("propertychange", function (t) {
                        y || "value" !== t.propertyName || g(t);
                      }),
                    8 == r && (c("keyup", p), c("keydown", p)),
                    f && (f(e, g), c("dragend", u)),
                    (!r || 9 <= r) && c("input", g),
                    5 > a && "textarea" === m.a.R(e)
                      ? (c("keydown", u), c("paste", u), c("cut", u))
                      : 11 > n
                      ? c("keydown", u)
                      : 4 > i
                      ? (c("DOMAutoComplete", p),
                        c("dragdrop", p),
                        c("drop", p))
                      : o && "number" === e.type && c("keydown", u),
                    c("change", p),
                    c("blur", p),
                    m.o(d, null, { l: e });
                },
              }),
                (m.m.wa.textInput = !0),
                (m.c.textinput = {
                  preprocess: function (t, e, n) {
                    n("textInput", t);
                  },
                });
            })(),
            (m.c.uniqueName = {
              init: function (t, e) {
                if (e()) {
                  var n = "ko_unique_" + ++m.c.uniqueName.rd;
                  m.a.Yc(t, n);
                }
              },
            }),
            (m.c.uniqueName.rd = 0),
            (m.c.using = {
              init: function (t, e, n, a, i) {
                var r;
                return (
                  n.has("as") &&
                    (r = {
                      as: n.get("as"),
                      noChildContext: n.get("noChildContext"),
                    }),
                  (e = i.createChildContext(e, r)),
                  m.Oa(e, t),
                  { controlsDescendantBindings: !0 }
                );
              },
            }),
            (m.h.ea.using = !0),
            (m.c.value = {
              init: function (e, n, a) {
                var i = m.a.R(e),
                  r = "input" == i;
                if (!r || ("checkbox" != e.type && "radio" != e.type)) {
                  var o = [],
                    s = a.get("valueUpdate"),
                    l = !1,
                    c = null;
                  s &&
                    ((o = "string" == typeof s ? [s] : m.a.wc(s)),
                    m.a.Pa(o, "change"));
                  var d = function () {
                    (c = null), (l = !1);
                    var t = n(),
                      i = m.w.M(e);
                    m.m.eb(t, a, "value", i);
                  };
                  !m.a.W ||
                    !r ||
                    "text" != e.type ||
                    "off" == e.autocomplete ||
                    (e.form && "off" == e.form.autocomplete) ||
                    -1 != m.a.A(o, "propertychange") ||
                    (m.a.B(e, "propertychange", function () {
                      l = !0;
                    }),
                    m.a.B(e, "focus", function () {
                      l = !1;
                    }),
                    m.a.B(e, "blur", function () {
                      l && d();
                    })),
                    m.a.D(o, function (t) {
                      var n = d;
                      m.a.Ud(t, "after") &&
                        ((n = function () {
                          (c = m.w.M(e)), m.a.setTimeout(d, 0);
                        }),
                        (t = t.substring(5))),
                        m.a.B(e, t, n);
                    });
                  var u;
                  if (
                    ((u =
                      r && "file" == e.type
                        ? function () {
                            var a = m.a.f(n());
                            null === a || a === t || "" === a
                              ? (e.value = "")
                              : m.u.G(d);
                          }
                        : function () {
                            var r = m.a.f(n()),
                              o = m.w.M(e);
                            null !== c && r === c
                              ? m.a.setTimeout(u, 0)
                              : (r === o && o !== t) ||
                                ("select" === i
                                  ? ((o = a.get("valueAllowUnset")),
                                    m.w.cb(e, r, o),
                                    o || r === m.w.M(e) || m.u.G(d))
                                  : m.w.cb(e, r));
                          }),
                    "select" === i)
                  ) {
                    var f;
                    m.i.subscribe(
                      e,
                      m.i.H,
                      function () {
                        f
                          ? a.get("valueAllowUnset")
                            ? u()
                            : d()
                          : (m.a.B(e, "change", d),
                            (f = m.o(u, null, { l: e })));
                      },
                      null,
                      { notifyImmediately: !0 }
                    );
                  } else m.a.B(e, "change", d), m.o(u, null, { l: e });
                } else m.ib(e, { checkedValue: n });
              },
              update: function () {},
            }),
            (m.m.wa.value = !0),
            (m.c.visible = {
              update: function (t, e) {
                var n = m.a.f(e()),
                  a = "none" != t.style.display;
                n && !a
                  ? (t.style.display = "")
                  : !n && a && (t.style.display = "none");
              },
            }),
            (m.c.hidden = {
              update: function (t, e) {
                m.c.visible.update(t, function () {
                  return !m.a.f(e());
                });
              },
            }),
            (function (t) {
              m.c[t] = {
                init: function (e, n, a, i, r) {
                  return m.c.event.init.call(
                    this,
                    e,
                    function () {
                      var e = {};
                      return (e[t] = n()), e;
                    },
                    a,
                    i,
                    r
                  );
                },
              };
            })("click"),
            (m.ca = function () {}),
            (m.ca.prototype.renderTemplateSource = function () {
              throw Error("Override renderTemplateSource");
            }),
            (m.ca.prototype.createJavaScriptEvaluatorBlock = function () {
              throw Error("Override createJavaScriptEvaluatorBlock");
            }),
            (m.ca.prototype.makeTemplateSource = function (t, e) {
              if ("string" == typeof t) {
                e = e || n;
                var a = e.getElementById(t);
                if (!a) throw Error("Cannot find template with ID " + t);
                return new m.C.F(a);
              }
              if (1 == t.nodeType || 8 == t.nodeType) return new m.C.ia(t);
              throw Error("Unknown template type: " + t);
            }),
            (m.ca.prototype.renderTemplate = function (t, e, n, a) {
              return (
                (t = this.makeTemplateSource(t, a)),
                this.renderTemplateSource(t, e, n, a)
              );
            }),
            (m.ca.prototype.isTemplateRewritten = function (t, e) {
              return (
                !1 === this.allowTemplateRewriting ||
                this.makeTemplateSource(t, e).data("isRewritten")
              );
            }),
            (m.ca.prototype.rewriteTemplate = function (t, e, n) {
              (t = this.makeTemplateSource(t, n)),
                (e = e(t.text())),
                t.text(e),
                t.data("isRewritten", !0);
            }),
            m.b("templateEngine", m.ca),
            (m.kc = (function () {
              function t(t, e, n, a) {
                t = m.m.ac(t);
                for (var i = m.m.Ra, r = 0; r < t.length; r++) {
                  var o = t[r].key;
                  if (Object.prototype.hasOwnProperty.call(i, o)) {
                    var s = i[o];
                    if ("function" == typeof s) {
                      if ((o = s(t[r].value))) throw Error(o);
                    } else if (!s)
                      throw Error(
                        "This template engine does not support the '" +
                          o +
                          "' binding within its templates"
                      );
                  }
                }
                return (
                  (n =
                    "ko.__tr_ambtns(function($context,$element){return(function(){return{ " +
                    m.m.vb(t, { valueAccessors: !0 }) +
                    " } })()},'" +
                    n.toLowerCase() +
                    "')"),
                  a.createJavaScriptEvaluatorBlock(n) + e
                );
              }
              var e =
                  /(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'|[^>]*))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi,
                n = /\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;
              return {
                xd: function (t, e, n) {
                  e.isTemplateRewritten(t, n) ||
                    e.rewriteTemplate(
                      t,
                      function (t) {
                        return m.kc.Ld(t, e);
                      },
                      n
                    );
                },
                Ld: function (a, i) {
                  return a
                    .replace(e, function (e, n, a, r, o) {
                      return t(o, n, a, i);
                    })
                    .replace(n, function (e, n) {
                      return t(n, "\x3c!-- ko --\x3e", "#comment", i);
                    });
                },
                md: function (t, e) {
                  return m.aa.Xb(function (n, a) {
                    var i = n.nextSibling;
                    i && i.nodeName.toLowerCase() === e && m.ib(i, t, a);
                  });
                },
              };
            })()),
            m.b("__tr_ambtns", m.kc.md),
            (function () {
              (m.C = {}),
                (m.C.F = function (t) {
                  if ((this.F = t)) {
                    var e = m.a.R(t);
                    this.ab =
                      "script" === e
                        ? 1
                        : "textarea" === e
                        ? 2
                        : "template" == e &&
                          t.content &&
                          11 === t.content.nodeType
                        ? 3
                        : 4;
                  }
                }),
                (m.C.F.prototype.text = function () {
                  var t =
                    1 === this.ab
                      ? "text"
                      : 2 === this.ab
                      ? "value"
                      : "innerHTML";
                  if (0 == arguments.length) return this.F[t];
                  var e = arguments[0];
                  "innerHTML" === t ? m.a.fc(this.F, e) : (this.F[t] = e);
                });
              var e = m.a.g.Z() + "_";
              m.C.F.prototype.data = function (t) {
                if (1 === arguments.length) return m.a.g.get(this.F, e + t);
                m.a.g.set(this.F, e + t, arguments[1]);
              };
              var n = m.a.g.Z();
              (m.C.F.prototype.nodes = function () {
                var e = this.F;
                if (0 == arguments.length) {
                  var a = m.a.g.get(e, n) || {},
                    i =
                      a.lb ||
                      (3 === this.ab ? e.content : 4 === this.ab ? e : t);
                  if (!i || a.jd) {
                    var r = this.text();
                    r &&
                      r !== a.bb &&
                      ((i = m.a.Md(r, e.ownerDocument)),
                      m.a.g.set(e, n, { lb: i, bb: r, jd: !0 }));
                  }
                  return i;
                }
                (a = arguments[0]),
                  this.ab !== t && this.text(""),
                  m.a.g.set(e, n, { lb: a });
              }),
                (m.C.ia = function (t) {
                  this.F = t;
                }),
                (m.C.ia.prototype = new m.C.F()),
                (m.C.ia.prototype.constructor = m.C.ia),
                (m.C.ia.prototype.text = function () {
                  if (0 == arguments.length) {
                    var e = m.a.g.get(this.F, n) || {};
                    return e.bb === t && e.lb && (e.bb = e.lb.innerHTML), e.bb;
                  }
                  m.a.g.set(this.F, n, { bb: arguments[0] });
                }),
                m.b("templateSources", m.C),
                m.b("templateSources.domElement", m.C.F),
                m.b("templateSources.anonymousTemplate", m.C.ia);
            })(),
            (function () {
              function e(t, e, n) {
                var a;
                for (e = m.h.nextSibling(e); t && (a = t) !== e; )
                  (t = m.h.nextSibling(a)), n(a, t);
              }
              function n(t, n) {
                if (t.length) {
                  var a = t[0],
                    i = t[t.length - 1],
                    r = a.parentNode,
                    o = m.ga.instance,
                    s = o.preprocessNode;
                  if (s) {
                    if (
                      (e(a, i, function (t, e) {
                        var n = t.previousSibling,
                          r = s.call(o, t);
                        r &&
                          (t === a && (a = r[0] || e),
                          t === i && (i = r[r.length - 1] || n));
                      }),
                      (t.length = 0),
                      !a)
                    )
                      return;
                    a === i ? t.push(a) : (t.push(a, i), m.a.Ua(t, r));
                  }
                  e(a, i, function (t) {
                    (1 !== t.nodeType && 8 !== t.nodeType) || m.vc(n, t);
                  }),
                    e(a, i, function (t) {
                      (1 !== t.nodeType && 8 !== t.nodeType) || m.aa.cd(t, [n]);
                    }),
                    m.a.Ua(t, r);
                }
              }
              function a(t) {
                return t.nodeType ? t : 0 < t.length ? t[0] : null;
              }
              function i(t, e, i, r, s) {
                s = s || {};
                var l = ((t && a(t)) || i || {}).ownerDocument,
                  c = s.templateEngine || o;
                if (
                  (m.kc.xd(i, c, l),
                  (i = c.renderTemplate(i, r, s, l)),
                  "number" != typeof i.length ||
                    (0 < i.length && "number" != typeof i[0].nodeType))
                )
                  throw Error(
                    "Template engine must return an array of DOM nodes"
                  );
                switch (((l = !1), e)) {
                  case "replaceChildren":
                    m.h.va(t, i), (l = !0);
                    break;
                  case "replaceNode":
                    m.a.Xc(t, i), (l = !0);
                    break;
                  case "ignoreTargetNode":
                    break;
                  default:
                    throw Error("Unknown renderMode: " + e);
                }
                return (
                  l &&
                    (n(i, r),
                    s.afterRender &&
                      m.u.G(s.afterRender, null, [i, r[s.as || "$data"]]),
                    "replaceChildren" == e && m.i.ma(t, m.i.H)),
                  i
                );
              }
              function r(t, e, n) {
                return m.O(t) ? t() : "function" == typeof t ? t(e, n) : t;
              }
              var o;
              (m.gc = function (e) {
                if (e != t && !(e instanceof m.ca))
                  throw Error(
                    "templateEngine must inherit from ko.templateEngine"
                  );
                o = e;
              }),
                (m.dc = function (e, n, s, l, c) {
                  if (((s = s || {}), (s.templateEngine || o) == t))
                    throw Error(
                      "Set a template engine before calling renderTemplate"
                    );
                  if (((c = c || "replaceChildren"), l)) {
                    var d = a(l);
                    return m.$(
                      function () {
                        var t =
                            n && n instanceof m.fa
                              ? n
                              : new m.fa(n, null, null, null, {
                                  exportDependencies: !0,
                                }),
                          o = r(e, t.$data, t),
                          t = i(l, c, o, t, s);
                        "replaceNode" == c && ((l = t), (d = a(l)));
                      },
                      null,
                      {
                        Sa: function () {
                          return !d || !m.a.Sb(d);
                        },
                        l: d && "replaceNode" == c ? d.parentNode : d,
                      }
                    );
                  }
                  return m.aa.Xb(function (t) {
                    m.dc(e, n, s, t, "replaceNode");
                  });
                }),
                (m.Qd = function (e, a, o, s, l) {
                  function c(t, e) {
                    m.u.G(m.a.ec, null, [s, t, u, o, d, e]), m.i.ma(s, m.i.H);
                  }
                  function d(t, e) {
                    n(e, f), o.afterRender && o.afterRender(e, t), (f = null);
                  }
                  function u(t, n) {
                    f = l.createChildContext(t, {
                      as: p,
                      noChildContext: o.noChildContext,
                      extend: function (t) {
                        (t.$index = n), p && (t[p + "Index"] = n);
                      },
                    });
                    var a = r(e, t, f);
                    return i(s, "ignoreTargetNode", a, f, o);
                  }
                  var f,
                    p = o.as,
                    h =
                      !1 === o.includeDestroyed ||
                      (m.options.foreachHidesDestroyed && !o.includeDestroyed);
                  if (h || o.beforeRemove || !m.Pc(a))
                    return m.$(
                      function () {
                        var e = m.a.f(a) || [];
                        void 0 === e.length && (e = [e]),
                          h &&
                            (e = m.a.jb(e, function (e) {
                              return (
                                e === t || null === e || !m.a.f(e._destroy)
                              );
                            })),
                          c(e);
                      },
                      null,
                      { l: s }
                    );
                  c(a.v());
                  var v = a.subscribe(
                    function (t) {
                      c(a(), t);
                    },
                    null,
                    "arrayChange"
                  );
                  return v.l(s), v;
                });
              var s = m.a.g.Z(),
                l = m.a.g.Z();
              (m.c.template = {
                init: function (t, e) {
                  var n = m.a.f(e());
                  if ("string" == typeof n || "name" in n) m.h.Ea(t);
                  else if ("nodes" in n) {
                    if (((n = n.nodes || []), m.O(n)))
                      throw Error(
                        'The "nodes" option must be a plain, non-observable array.'
                      );
                    var a = n[0] && n[0].parentNode;
                    (a && m.a.g.get(a, l)) ||
                      ((a = m.a.Yb(n)), m.a.g.set(a, l, !0)),
                      new m.C.ia(t).nodes(a);
                  } else {
                    if (((n = m.h.childNodes(t)), !(0 < n.length)))
                      throw Error(
                        "Anonymous template defined, but no template content was provided"
                      );
                    (a = m.a.Yb(n)), new m.C.ia(t).nodes(a);
                  }
                  return { controlsDescendantBindings: !0 };
                },
                update: function (e, n, a, i, r) {
                  var o = n();
                  (n = m.a.f(o)),
                    (a = !0),
                    (i = null),
                    "string" == typeof n
                      ? (n = {})
                      : ((o = "name" in n ? n.name : e),
                        "if" in n && (a = m.a.f(n.if)),
                        a && "ifnot" in n && (a = !m.a.f(n.ifnot)),
                        a && !o && (a = !1)),
                    "foreach" in n
                      ? (i = m.Qd(o, (a && n.foreach) || [], n, e, r))
                      : a
                      ? ((a = r),
                        "data" in n &&
                          (a = r.createChildContext(n.data, {
                            as: n.as,
                            noChildContext: n.noChildContext,
                            exportDependencies: !0,
                          })),
                        (i = m.dc(o, a, n, e)))
                      : m.h.Ea(e),
                    (r = i),
                    (n = m.a.g.get(e, s)) && "function" == typeof n.s && n.s(),
                    m.a.g.set(e, s, !r || (r.ja && !r.ja()) ? t : r);
                },
              }),
                (m.m.Ra.template = function (t) {
                  return (
                    (t = m.m.ac(t)),
                    (1 == t.length && t[0].unknown) || m.m.Id(t, "name")
                      ? null
                      : "This template engine does not support anonymous templates nested within its templates"
                  );
                }),
                (m.h.ea.template = !0);
            })(),
            m.b("setTemplateEngine", m.gc),
            m.b("renderTemplate", m.dc),
            (m.a.Kc = function (t, e, n) {
              if (t.length && e.length) {
                var a, i, r, o, s;
                for (a = i = 0; (!n || a < n) && (o = t[i]); ++i) {
                  for (r = 0; (s = e[r]); ++r)
                    if (o.value === s.value) {
                      (o.moved = s.index),
                        (s.moved = o.index),
                        e.splice(r, 1),
                        (a = r = 0);
                      break;
                    }
                  a += r;
                }
              }
            }),
            (m.a.Pb = (function () {
              function t(t, e, n, a, i) {
                var r,
                  o,
                  s,
                  l,
                  c,
                  d = Math.min,
                  u = Math.max,
                  f = [],
                  p = t.length,
                  h = e.length,
                  v = h - p || 1,
                  b = p + h + 1;
                for (r = 0; r <= p; r++)
                  for (
                    l = s, f.push((s = [])), c = d(h, r + v), o = u(0, r - 1);
                    o <= c;
                    o++
                  )
                    s[o] = o
                      ? r
                        ? t[r - 1] === e[o - 1]
                          ? l[o - 1]
                          : d(l[o] || b, s[o - 1] || b) + 1
                        : o + 1
                      : r + 1;
                for (d = [], u = [], v = [], r = p, o = h; r || o; )
                  (h = f[r][o] - 1),
                    o && h === f[r][o - 1]
                      ? u.push(
                          (d[d.length] = { status: n, value: e[--o], index: o })
                        )
                      : r && h === f[r - 1][o]
                      ? v.push(
                          (d[d.length] = { status: a, value: t[--r], index: r })
                        )
                      : (--o,
                        --r,
                        i.sparse ||
                          d.push({ status: "retained", value: e[o] }));
                return m.a.Kc(v, u, !i.dontLimitMoves && 10 * p), d.reverse();
              }
              return function (e, n, a) {
                return (
                  (a = "boolean" == typeof a ? { dontLimitMoves: a } : a || {}),
                  (e = e || []),
                  (n = n || []),
                  e.length < n.length
                    ? t(e, n, "added", "deleted", a)
                    : t(n, e, "deleted", "added", a)
                );
              };
            })()),
            m.b("utils.compareArrays", m.a.Pb),
            (function () {
              function e(e, n, a, i, r) {
                var o = [],
                  s = m.$(
                    function () {
                      var t = n(a, r, m.a.Ua(o, e)) || [];
                      0 < o.length &&
                        (m.a.Xc(o, t), i && m.u.G(i, null, [a, t, r])),
                        (o.length = 0),
                        m.a.Nb(o, t);
                    },
                    null,
                    {
                      l: e,
                      Sa: function () {
                        return !m.a.kd(o);
                      },
                    }
                  );
                return { Y: o, $: s.ja() ? s : t };
              }
              var n = m.a.g.Z(),
                a = m.a.g.Z();
              m.a.ec = function (i, r, o, s, l, c) {
                function d(t) {
                  (p = { Aa: t, pb: m.ta(y++) }), b.push(p), v || k.push(p);
                }
                function u(t) {
                  (p = h[t]),
                    y !== p.pb.v() && E.push(p),
                    p.pb(y++),
                    m.a.Ua(p.Y, i),
                    b.push(p);
                }
                function f(t, e) {
                  if (t)
                    for (var n = 0, a = e.length; n < a; n++)
                      m.a.D(e[n].Y, function (a) {
                        t(a, n, e[n].Aa);
                      });
                }
                (r = r || []), void 0 === r.length && (r = [r]), (s = s || {});
                var p,
                  h = m.a.g.get(i, n),
                  v = !h,
                  b = [],
                  g = 0,
                  y = 0,
                  w = [],
                  x = [],
                  _ = [],
                  E = [],
                  k = [],
                  T = 0;
                if (v) m.a.D(r, d);
                else {
                  if (!c || (h && h._countWaitingForRemove)) {
                    var C = m.a.Mb(h, function (t) {
                      return t.Aa;
                    });
                    c = m.a.Pb(C, r, {
                      dontLimitMoves: s.dontLimitMoves,
                      sparse: !0,
                    });
                  }
                  for (var S, D, N, C = 0; (S = c[C]); C++)
                    switch (((D = S.moved), (N = S.index), S.status)) {
                      case "deleted":
                        for (; g < N; ) u(g++);
                        D === t &&
                          ((p = h[g]),
                          p.$ && (p.$.s(), (p.$ = t)),
                          m.a.Ua(p.Y, i).length &&
                            (s.beforeRemove &&
                              (b.push(p),
                              T++,
                              p.Aa === a ? (p = null) : _.push(p)),
                            p && w.push.apply(w, p.Y))),
                          g++;
                        break;
                      case "added":
                        for (; y < N; ) u(g++);
                        D !== t ? (x.push(b.length), u(D)) : d(S.value);
                    }
                  for (; y < r.length; ) u(g++);
                  b._countWaitingForRemove = T;
                }
                m.a.g.set(i, n, b),
                  f(s.beforeMove, E),
                  m.a.D(w, s.beforeRemove ? m.oa : m.removeNode);
                var A, M, j;
                try {
                  j = i.ownerDocument.activeElement;
                } catch (t) {}
                if (x.length)
                  for (; (C = x.shift()) != t; ) {
                    for (p = b[C], A = t; C; )
                      if ((M = b[--C].Y) && M.length) {
                        A = M[M.length - 1];
                        break;
                      }
                    for (r = 0; (g = p.Y[r]); A = g, r++) m.h.Wb(i, g, A);
                  }
                for (C = 0; (p = b[C]); C++) {
                  for (
                    p.Y || m.a.extend(p, e(i, o, p.Aa, l, p.pb)), r = 0;
                    (g = p.Y[r]);
                    A = g, r++
                  )
                    m.h.Wb(i, g, A);
                  !p.Ed &&
                    l &&
                    (l(p.Aa, p.Y, p.pb),
                    (p.Ed = !0),
                    (A = p.Y[p.Y.length - 1]));
                }
                for (
                  j && i.ownerDocument.activeElement != j && j.focus(),
                    f(s.beforeRemove, _),
                    C = 0;
                  C < _.length;
                  ++C
                )
                  _[C].Aa = a;
                f(s.afterMove, E), f(s.afterAdd, k);
              };
            })(),
            m.b("utils.setDomNodeChildrenFromArrayMapping", m.a.ec),
            (m.ba = function () {
              this.allowTemplateRewriting = !1;
            }),
            (m.ba.prototype = new m.ca()),
            (m.ba.prototype.constructor = m.ba),
            (m.ba.prototype.renderTemplateSource = function (t, e, n, a) {
              return (e = (9 > m.a.W ? 0 : t.nodes) ? t.nodes() : null)
                ? m.a.la(e.cloneNode(!0).childNodes)
                : ((t = t.text()), m.a.ua(t, a));
            }),
            (m.ba.Ma = new m.ba()),
            m.gc(m.ba.Ma),
            m.b("nativeTemplateEngine", m.ba),
            (function () {
              (m.$a = function () {
                var t = (this.Hd = (function () {
                  if (!i || !i.tmpl) return 0;
                  try {
                    if (0 <= i.tmpl.tag.tmpl.open.toString().indexOf("__"))
                      return 2;
                  } catch (t) {}
                  return 1;
                })());
                (this.renderTemplateSource = function (e, a, r, o) {
                  if (((o = o || n), (r = r || {}), 2 > t))
                    throw Error(
                      "Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later."
                    );
                  var s = e.data("precompiled");
                  return (
                    s ||
                      ((s = e.text() || ""),
                      (s = i.template(
                        null,
                        "{{ko_with $item.koBindingContext}}" +
                          s +
                          "{{/ko_with}}"
                      )),
                      e.data("precompiled", s)),
                    (e = [a.$data]),
                    (a = i.extend({ koBindingContext: a }, r.templateOptions)),
                    (a = i.tmpl(s, e, a)),
                    a.appendTo(o.createElement("div")),
                    (i.fragments = {}),
                    a
                  );
                }),
                  (this.createJavaScriptEvaluatorBlock = function (t) {
                    return "{{ko_code ((function() { return " + t + " })()) }}";
                  }),
                  (this.addTemplate = function (t, e) {
                    n.write(
                      "<script type='text/html' id='" +
                        t +
                        "'>" +
                        e +
                        "</script>"
                    );
                  }),
                  0 < t &&
                    ((i.tmpl.tag.ko_code = { open: "__.push($1 || '');" }),
                    (i.tmpl.tag.ko_with = { open: "with($1) {", close: "} " }));
              }),
                (m.$a.prototype = new m.ca()),
                (m.$a.prototype.constructor = m.$a);
              var t = new m.$a();
              0 < t.Hd && m.gc(t), m.b("jqueryTmplTemplateEngine", m.$a);
            })();
        });
    })();
  })(),
  define("data", ["exports"], function (t) {
    window.PAGE_PATH;
    (t.waypoints = []),
      (t.navaids = []),
      (t.waypoints = window.navData.waypoints),
      (t.navaids = window.navData.navaids);
  }),
  define("ui/elements", {
    modal: ".fmc-modal",
    container: {
      tabBar: ".fmc-modal .fmc-modal__tab-bar",
      modalContent: ".fmc-modal .fmc-modal__content main",
      uiBottomProgInfo: ".geofs-ui-bottom .fmc-prog-info",
    },
    btn: { fmcBtn: "button.fmc-btn", interactive: ".interactive" },
  }),
  define("debug", ["ui/elements"], function (t) {
    function e(t) {
      t.stopImmediatePropagation();
    }
    return {
      stopPropagation: function () {
        $(t.modal).keyup(e).keydown(e).keypress(e);
      },
      log: function (t) {
        console.log(t);
      },
    };
  }),
  define("utils", ["debug", "exports"], function (t, e) {
    function n(t) {
      return (t * Math.PI) / 180;
    }
    function a(t) {
      return (180 * t) / Math.PI;
    }
    function i() {
      var e = window.geofs.aircraft.instance.animationValue.ktas,
        n = 60 * window.geofs.aircraft.instance.animationValue.climbrate * m;
      return t.log("tas: " + e + ", vs: " + n), Math.sqrt(e * e - n * n);
    }
    function r(t, e, a, i) {
      var r = n(a - t),
        o = n(i - e);
      (t = n(t)), (a = n(a));
      var s =
          Math.sin(r / 2) * Math.sin(r / 2) +
          Math.cos(t) * Math.cos(a) * Math.sin(o / 2) * Math.sin(o / 2),
        l = 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
      return p * l;
    }
    function o(t, e, i, r) {
      (t = n(t)), (i = n(i)), (e = n(e)), (r = n(r));
      var o = Math.sin(r - e) * Math.cos(i),
        s =
          Math.cos(t) * Math.sin(i) -
          Math.sin(t) * Math.cos(i) * Math.cos(r - e),
        l = a(Math.atan2(o, s));
      return l <= 0 ? l + 360 : l;
    }
    function s(t, e) {
      var n = i();
      return 100 * Math.round((n * (t / (e * h)) * h) / 60 / 100);
    }
    function l(t) {
      return isNaN(t[0]) || isNaN(t[1])
        ? "--:--"
        : ((t[1] = f(t[1])), t[0] + ":" + t[1]);
    }
    function c(t, e) {
      return e >= 60 && ((e -= 60), t++), t >= 24 && (t -= 24), [t, e];
    }
    function d(t, e) {
      var n = t / window.geofs.aircraft.instance.animationValue.ktas,
        a = parseInt(n.toString()),
        i = Math.round(60 * (n - a));
      return (
        e &&
          (i += Math.round(
            window.geofs.aircraft.instance.animationValue.altitude / 4e3
          )),
        c(a, i)
      );
    }
    function u(t, e) {
      var n = new Date(),
        a = n.getHours(),
        i = n.getMinutes();
      return (a += t), (i += Number(e)), c(a, i);
    }
    function f(t) {
      return t < 10 && (t = "0" + t), t;
    }
    var p = 3440.06,
      m = 1 / 6076,
      h = 6076;
    (e.EARTH_RADIUS_NM = p),
      (e.FEET_TO_NM = m),
      (e.NM_TO_FEET = h),
      (e.toRadians = n),
      (e.toDegress = a),
      (e.getGroundSpeed = i),
      (e.getDistance = r),
      (e.getBearing = o),
      (e.getClimbrate = s),
      (e.formatTime = l),
      (e.timeCheck = c),
      (e.getETE = d),
      (e.getETA = u);
  }),
  define("log", ["knockout", "utils", "exports"], function (t, e, n) {
    var a = window.geofs.aircraft.instance.animationValue;
    (n.mainTimer = null),
      (n.speedTimer = null),
      (n.data = t.observableArray()),
      (n.update = function (t) {
        if (
          !window.geofs.pause &&
          !window.flight.recorder.playing &&
          !window.flight.recorder.paused
        ) {
          var i = Math.round(a.ktas),
            r = Math.round(a.heading360),
            o = Math.round(a.altitude),
            s = +window.geofs.debug.fps,
            l =
              Math.round(1e4 * window.geofs.aircraft.instance.llaLocation[0]) /
              1e4,
            c =
              Math.round(1e4 * window.geofs.aircraft.instance.llaLocation[1]) /
              1e4,
            d = new Date(),
            u = d.getUTCHours(),
            f = d.getUTCMinutes(),
            p = e.formatTime(e.timeCheck(u, f));
          t = t || "--";
          var m = [p, i, r, o, l, c, s, t];
          n.data.push(m);
        }
        clearInterval(n.mainTimer),
          a.altitude > 18e3
            ? (n.mainTimer = setInterval(n.update, 12e4))
            : (n.mainTimer = setInterval(n.update, 3e4));
      }),
      (n.speed = function () {
        var t = a.kcas,
          e = a.altitude + window.geofs.groundElevation * window.METERS_TO_FEET;
        t > 255 && e < 1e4 && n.update("Overspeed"),
          clearInterval(n.speedTimer),
          (n.speedTimer =
            e < 1e4 ? setInterval(n.speed, 15e3) : setInterval(n.speed, 3e4));
      }),
      (n.removeData = function () {
        n.data.removeAll();
      });
  }),
  define(
    "distance",
    ["flight", "utils", "waypoints", "exports"],
    function (t, e, n, a) {
      (a.route = function (a) {
        var i = t.departure.coords(),
          r = t.arrival.coords(),
          o = n.nextWaypoint() || 0,
          s = n.route(),
          l = window.geofs.aircraft.instance.llaLocation;
        if (0 === s.length)
          return t.departure.airport() && t.arrival.airport()
            ? e.getDistance(i[0], i[1], r[0], r[1])
            : 0;
        if (null === n.nextWaypoint())
          return t.arrival.airport() && l[0]
            ? e.getDistance(l[0], l[1], r[0], r[1])
            : l[0]
            ? e.getDistance(
                l[0],
                l[1],
                s[s.length - 1].lat(),
                s[s.length - 1].lon()
              )
            : e.getDistance(
                s[0].lat(),
                s[0].lon(),
                s[s.length - 1].lat(),
                s[s.length - 1].lon()
              );
        for (var c = 0, d = o; d < a && d < s.length; d++)
          c += s[d].distFromPrev();
        return (
          a === s.length &&
            t.arrival.airport() &&
            (c += e.getDistance(s[a - 1].lat(), s[a - 1].lon(), r[0], r[1])),
          c
        );
      }),
        (a.target = function (t) {
          return t < 0 ? (t / -1e3) * 3 : (t / 1e3) * 2.5;
        }),
        (a.turn = function (t) {
          var n = window.geofs.aircraft.instance.animationValue.kcas,
            a = 0.107917 * Math.pow(Math.E, 0.0128693 * n),
            i = e.toRadians(t);
          return a * Math.tan(i / 2) + 0.2;
        });
    }
  ),
  define(
    "nav/LNAV",
    ["distance", "flight", "waypoints", "exports"],
    function (t, e, n, a) {
      (a.timer = null),
        (a.update = function () {
          if (null === n.nextWaypoint() || !e.arrival.airport())
            return clearInterval(a.timer), void (a.timer = null);
          var i = t.route(n.nextWaypoint() + 1);
          i <= t.turn(60) && n.activateWaypoint(n.nextWaypoint() + 1),
            clearInterval(a.timer),
            i < window.geofs.aircraft.instance.animationValue.ktas / 60
              ? (a.timer = setInterval(a.update, 500))
              : (a.timer = setInterval(a.update, 5e3));
        });
    }
  ),
  define(
    "nav/progress",
    ["knockout", "distance", "flight", "utils", "waypoints", "exports"],
    function (t, e, n, a, i, r) {
      (r.timer = null),
        (r.info = {
          flightETE: t.observable("--:--"),
          flightETA: t.observable("--:--"),
          todETE: t.observable("--:--"),
          todETA: t.observable("--:--"),
          flightDist: t.observable("--"),
          todDist: t.observable("--"),
          nextDist: t.observable("--"),
          nextETE: t.observable("--:--"),
        }),
        (r.update = function () {
          for (
            var t,
              o = i.route(),
              s = i.nextWaypoint(),
              l = window.geofs.aircraft.instance.llaLocation[0],
              c = window.geofs.aircraft.instance.llaLocation[1],
              d = n.arrival.coords()[0],
              u = n.arrival.coords()[1],
              f = [[], [], [], [], []],
              p = null === s ? 0 : o[s].distFromPrev(),
              m = 0,
              h = !0;
            m < o.length;
            m++
          )
            (o[m].lat() && o[m].lon()) || (h = !1);
          (t = h ? e.route(o.length) : a.getDistance(l, c, d, u)),
            !window.geofs.aircraft.instance.groundContact &&
              n.arrival.airport() &&
              ((f[0] = a.getETE(t, !0)),
              (f[1] = a.getETA(f[0][0], f[0][1])),
              (f[4] = a.getETE(p, !1)),
              t - n.todDist() > 0 &&
                ((f[2] = a.getETE(t - n.todDist(), !1)),
                (f[3] = a.getETA(f[2][0], f[2][1])))),
            r.print(t, p, f);
        }),
        (r.print = function (t, e, i) {
          for (var o = 0; o < i.length; o++) i[o] = a.formatTime(i[o]);
          t = t < 10 ? Math.round(10 * t) / 10 : Math.round(t);
          var s;
          n.todDist() && n.todDist() < t && (s = t - n.todDist()),
            (e = e < 10 ? Math.round(10 * e) / 10 : Math.round(e));
          r.info.flightETE(i[0]),
            r.info.flightETA(i[1]),
            r.info.todETE(i[2]),
            r.info.todETA(i[3]),
            r.info.flightDist(t || "--"),
            r.info.todDist(s || "--"),
            r.info.nextDist(e || "--"),
            r.info.nextETE(i[4]);
        });
    }
  ),
  define(
    "waypoints",
    [
      "knockout",
      "debug",
      "get",
      "flight",
      "log",
      "utils",
      "nav/LNAV",
      "nav/progress",
      "exports",
    ],
    function (t, e, n, a, i, r, o, s, l) {
      function c(t) {
        var e,
          n,
          a = d(t);
        if (0 === a || a === N()) {
          var i = M() || [];
          (e = r.getDistance(i[0], i[1], t.lat(), t.lon())),
            (n = r.getBearing(i[0], i[1], t.lat(), t.lon()));
        } else if (a) {
          var o = D()[a - 1];
          (e = r.getDistance(o.lat(), o.lon(), t.lat(), t.lon())),
            (n = r.getBearing(o.lat(), o.lon(), t.lat(), t.lon()));
        }
        return [Math.round(10 * e) / 10 || null, Math.round(n) || null];
      }
      function d(t) {
        for (var e = 0; e < D().length && t !== D()[e]; e++);
        return e;
      }
      function u(t, e) {
        var n = D();
        if (e >= n.length) for (var a = e - n.length; 1 + a--; ) n.push(void 0);
        n.splice(e, 0, n.splice(t, 1)[0]), D(n);
      }
      function f() {
        var t = [],
          e = a.departure.airport();
        e && t.push(e),
          D().forEach(function (e) {
            t.push(e.wpt());
          });
        var n = a.arrival.airport();
        return n && t.push(n), t;
      }
      function p() {
        return f().join(" ");
      }
      function m() {
        for (var t = [], e = 0; e < D().length; e++)
          t.push([
            D()[e].wpt(),
            D()[e].lat(),
            D()[e].lon(),
            D()[e].alt(),
            D()[e].valid(),
            D()[e].info(),
          ]);
        return JSON.stringify([
          a.departure.airport() || "",
          a.arrival.airport() || "",
          a.number() || "",
          t,
        ]);
      }
      function h(t) {
        if (((t = String(t)), t.indexOf(" ") > -1)) {
          var e,
            n = t.split(" "),
            a = Number(n[0]),
            i = Number(n[1]) / 60;
          return (e = a < 0 ? a - i : a + i), +e.toFixed(6);
        }
        return "" === t ? NaN : Number(t);
      }
      function v(t) {
        if (!t)
          return void i.warn(
            "Please enter waypoints separated by spaces or a generated route"
          );
        if (((t = t.trim()), 0 === t.indexOf('["'))) return void E(t);
        var e,
          n,
          r = !0,
          o = [];
        o = t.toUpperCase().split(" ");
        for (var s = 0; s < o.length; s++)
          (o[s].length > 5 || o[s].length < 1 || !/^\w+$/.test(o[s])) &&
            (r = !1);
        var l = !!S[o[0]],
          c = !!S[o[o.length - 1]];
        if (!r) return void i.warn("Invalid Waypoints Input");
        if ((g(!0), l)) {
          var d = o[0];
          a.departure.airport(d), (e = 1);
        } else (e = 0), a.departure.airport(void 0);
        if (c) {
          var d = o[o.length - 1];
          a.arrival.airport(d), (n = 1);
        } else (n = 0), a.arrival.airport(void 0);
        for (var u = e; u < o.length - n; u++) b(), D()[u - e].wpt(o[u]);
      }
      function b() {
        D.push(new A()),
          "object" == typeof window.componentHandler &&
            window.componentHandler.upgradeDom(),
          e.stopPropagation();
      }
      function g(t, e, n) {
        var a = (n && n.shiftKey) || "boolean" == typeof t;
        a ? D.removeAll() : D.splice(t, 1),
          N() === t || a
            ? y(!1)
            : N() === Number(t) + 1
            ? y(t)
            : N() > t && N(N() - 1);
      }
      function y(t) {
        if (!1 !== t && N() !== t)
          if (t < D().length) {
            N(t);
            var n = D()[N()];
            C.latitude(n.lat()),
              C.longitude(n.lon()),
              T.currentMode(1),
              e.log(
                "Waypoint # " +
                  Number(Number(t) + 1) +
                  " activated | index: " +
                  t
              );
          } else
            a.arrival.coords()[1] &&
              (C.latitude(a.arrival.coords()[1]),
              C.longitude(a.arrival.coords()[2])),
              N(null);
        else N(null), C.latitude(void 0), C.longitude(void 0), T.currentMode(0);
        o.update(), s.update();
      }
      function w(t, e) {
        e || (e = ""), D()[t].info(e);
      }
      function x() {
        if (null === N()) return -1;
        for (var t = N(); t < D().length; t++)
          if (D()[t] && D()[t].alt()) return t;
        return -1;
      }
      function _() {
        D().length < 1 || !D()[0].wpt()
          ? i.warn("There is no route to save")
          : (localStorage.removeItem("fmcWaypoints"),
            localStorage.setItem("fmcWaypoints", m()));
      }
      function E(t) {
        t = t || localStorage.getItem("fmcWaypoints");
        var e = JSON.parse(t);
        if ((localStorage.removeItem("fmcWaypoints"), e)) {
          g(!0);
          for (var n = e[3], r = 0; r < n.length; r++)
            for (var o = 0; o < n[r].length; o++)
              null === n[r][o] && (n[r][o] = void 0);
          a.departure.airport(e[0]), a.arrival.airport(e[1]), a.number(e[2]);
          for (var r = 0; r < n.length; r++)
            b(),
              n[r][0] && D()[r].wpt(n[r][0]),
              (n[r][4] && D()[r].lat()) ||
                (D()[r].lat(n[r][1]), D()[r].lon(n[r][2])),
              D()[r].alt(n[r][3]),
              D()[r].info() || D()[r].info(n[r][5]);
          _();
        } else
          i.warn(
            "You did not save the waypoints or you cleared the browser's cache"
          );
      }
      function k(t, n) {
        e.log("Waypoint #" + (t + 1) + "(index=" + t + ") shifted " + n);
        var a = t + n;
        ((n < 0 && a >= 0) || (n > 0 && a <= D().length - 1)) &&
          (u(t, a), N() === a ? y(t) : N() === t && y(a));
      }
      var T = window.autopilot_pp.require("autopilot"),
        C = window.autopilot_pp.require("greatcircle"),
        S = window.navData.airports,
        D = t.observableArray(),
        N = t.observable(null),
        A = function () {
          var e = this,
            a = t.observable();
          e.wpt = t.pureComputed({
            read: a,
            write: function (t) {
              a(t);
              var i = n.waypoint(t, d(e)),
                r = i && i[0] && i[1];
              e.lat(r ? i[0] : e.lat(), r),
                e.lon(r ? i[1] : e.lon(), r),
                e.info(r ? i[2] : void 0);
            },
          });
          var i = t.observable();
          e.lat = t.pureComputed({
            read: i,
            write: function (t, n) {
              (t = h(t)), i(isNaN(t) ? void 0 : t), e.valid(Boolean(n));
            },
          });
          var r = t.observable();
          (e.lon = t.pureComputed({
            read: r,
            write: function (t, n) {
              (t = h(t)), r(isNaN(t) ? void 0 : t), e.valid(Boolean(n));
            },
          })),
            (e.alt = t.observable()),
            (e.valid = t.observable(!1)),
            (e.info = t.observable()),
            (e.distFromPrev = t.pureComputed(function () {
              return c(e)[0];
            })),
            (e.brngFromPrev = t.pureComputed(function () {
              return c(e)[1];
            }));
        },
        M = t.observable();
      setInterval(function () {
        M(window.geofs.aircraft.instance.llaLocation);
      }, 1e3),
        (l.route = D),
        (l.nextWaypoint = N),
        (l.makeFixesArray = f),
        (l.toFixesString = p),
        (l.toRouteString = m),
        (l.getCoords = n.waypoint),
        (l.formatCoords = h),
        (l.toRoute = v),
        (l.addWaypoint = b),
        (l.removeWaypoint = g),
        (l.activateWaypoint = y),
        (l.printWaypointInfo = w),
        (l.nextWptAltRes = x),
        (l.saveData = _),
        (l.loadFromSave = E),
        (l.shiftWaypoint = k);
    }
  ),
  define("get/waypoint", ["data", "utils", "waypoints"], function (t, e, n) {
    function a(t, a) {
      for (var i = 1 / 0, r = 0, o = 0; o < t.length; o++) {
        var s = window.geofs.aircraft.instance.llaLocation[0],
          l = window.geofs.aircraft.instance.llaLocation[1],
          c = 0 === a ? s : n.route()[a - 1].lat(),
          d = 0 === a ? l : n.route()[a - 1].lon(),
          u = e.getDistance(t[o][0], t[o][1], c, d);
        u < i && ((i = u), (r = o));
      }
      return t[r];
    }
    var i = window.navData.airports;
    return function (e, n) {
      var r = i[e];
      if (r) return r;
      var o = t.navaids[e];
      return o || ((o = t.waypoints[e]), o ? a(o, n) : void 0);
    };
  }),
  define("get/ATS", ["data", "log"], function (t, e) {
    function n(n, a, i) {
      (n && i) ||
        e.warn("There must be one waypoint before and after the airway.");
      t.ATS[a];
    }
    return function (t, e, a) {
      return n(t, e, a);
    };
  }),
  define("get/SID", ["data"], function (t) {
    return function (e, n, a) {
      if (!e) return [];
      var i = t.SID[e] || [],
        r = [];
      if (a)
        if (n)
          i.forEach(function (t) {
            t.name === a && t.runway === n && r.push(t);
          });
        else {
          var o = [];
          i.forEach(function (t) {
            t.name === a && o.push(t.runway);
          }),
            r.push({ name: a, availableRunways: o });
        }
      else if (n)
        i.forEach(function (t) {
          t.runway === n && r.push(t);
        });
      else {
        var s = [];
        i.forEach(function (t) {
          -1 === s.indexOf(t.name) && s.push(t.name);
        }),
          s.forEach(function (t) {
            r.push({ name: t });
          });
      }
      return r;
    };
  }),
  define("get/STAR", ["data"], function (t) {
    return function (e, n) {
      if (!e || !n) return [];
      var a = t.STAR[e],
        i = [];
      return (
        Array.isArray(a) &&
          a.forEach(function (t) {
            t.runway === n && i.push(t);
          }),
        i
      );
    };
  }),
  define("get/runway", ["data", "./SID"], function (t, e) {
    return function (n, a, i) {
      if (!n) return [];
      var r = t.runways[n],
        o = [];
      if (i)
        if (a)
          e(n, void 0, a)[0].availableRunways.forEach(function (t) {
            o.push({ runway: t });
          });
        else for (var s in r) o.push({ runway: s });
      return o;
    };
  }),
  define(
    "get",
    ["get/waypoint", "get/ATS", "get/SID", "get/STAR", "get/runway", "exports"],
    function (t, e, n, a, i, r) {
      (r.waypoint = t), (r.ATS = e), (r.SID = n), (r.STAR = a), (r.runway = i);
    }
  ),
  define("vnav-profile", {
    4: {
      climb: [
        [-100, 5e3, 210, 2400],
        [5e3, 1e4, 250, 2400],
        [1e4, 18e3, 270, 2200],
        [18e3, 25e3, 280, 1800],
        [25e3, 3e4, 280, 1500],
        [3e4, 1e99, 0.74, 1e3],
      ],
      descent: [
        [3e4, 1e99, 290, -2400],
        [25e3, 3e4, 280, -2200],
        [18e3, 25e3, 270, -2200],
        [12e3, 18e3, 270, -1800],
        [1e4, 12e3, 250, -1800],
        [7e3, 1e4, 250, -1800],
        [5e3, 7e3, 230, -1500],
        [4e3, 5e3, 210, -1500],
        [3e3, 4e3, 190, -750],
        [2500, 3e3, 170, -750],
        [-100, 2500, 150, -750],
      ],
    },
    DEFAULT: {
      climb: [
        [-100, 5e3, 210, 2400],
        [5e3, 1e4, 250, 2400],
        [1e4, 18e3, 270, 2200],
        [18e3, 25e3, 280, 1800],
        [25e3, 3e4, 280, 1500],
        [3e4, 1e99, 0.74, 1e3],
      ],
      descent: [
        [3e4, 1e99, 290, -2400],
        [25e3, 3e4, 280, -2200],
        [18e3, 25e3, 270, -2200],
        [12e3, 18e3, 270, -1800],
        [1e4, 12e3, 250, -1800],
        [7e3, 1e4, 250, -1800],
        [5e3, 7e3, 230, -1500],
        [4e3, 5e3, 210, -1500],
        [3e3, 4e3, 190, -750],
        [2500, 3e3, 170, -750],
        [-100, 2500, 150, -750],
      ],
    },
  }),
  define(
    "nav/VNAV",
    ["debug", "distance", "flight", "utils", "waypoints", "vnav-profile"],
    function (t, e, n, a, i, r) {
      function o() {
        var t,
          e,
          a = window.geofs.aircraft.instance.animationValue.altitude;
        if (0 === n.phase()) {
          for (var i, r = s().climb, o = 0; o < r.length; o++)
            if (a > r[o][0] && a <= r[o][1]) {
              i = o;
              break;
            }
          var c = void 0 === i;
          n.spdControl() &&
            !c &&
            ((t = r[i][2]), i < r.length - 1 && (e = r[i][3]), l(t));
        } else if (2 === n.phase()) {
          for (var i, r = s().descent, o = 0; o < r.length; o++)
            if (a > r[o][0] && a <= r[o][1]) {
              i = o;
              break;
            }
          var d = void 0 === i;
          n.spdControl() && !d && ((t = r[i][2]), (e = r[i][3]), l(t));
        }
        return [t, e];
      }
      function s() {
        return (
          window.geofs.aircraft.instance.setup.fmcVnavProfile ||
          r[window.geofs.aircraft.instance.id] ||
          r.DEFAULT
        );
      }
      function l(t) {
        t && (t <= 10 ? c.speed.isMach(!0) : c.speed.isMach(!1));
      }
      var c = window.autopilot_pp.require("autopilot").modes;
      return {
        timer: null,
        update: function () {
          if (n.vnavEnabled()) {
            var r,
              s,
              l,
              d,
              u = i.route(),
              f = o(),
              p = i.nextWptAltRes(),
              m = -1 !== p,
              h = n.todDist(),
              v = n.cruiseAlt(),
              b = n.fieldElev(),
              g = n.todCalc(),
              y = window.geofs.aircraft.instance.animationValue.altitude;
            m &&
              ((r = u[p].alt()),
              (s = r - y),
              (l = e.route(p + 1)),
              (d = e.target(s)),
              t.log(
                "targetAlt: " +
                  r +
                  ", deltaAlt: " +
                  s +
                  ", nextDist: " +
                  l +
                  ", targetDist: " +
                  d
              ));
            for (
              var w,
                x,
                _,
                E = f[0],
                k = window.geofs.aircraft.instance.llaLocation[0] || null,
                T = window.geofs.aircraft.instance.llaLocation[1] || null,
                C = n.arrival.coords()[0] || null,
                S = n.arrival.coords()[1] || null,
                D = 0,
                N = !0;
              D < u.length;
              D++
            )
              (u[D].lat() && u[D].lon()) || (N = !1);
            if (
              ((_ = N ? e.route(u.length) : a.getDistance(k, T, C, S)),
              isNaN(_)
                ? n.phase(0)
                : _ < h
                ? n.phase(2)
                : Math.abs(v - y) <= 100
                ? n.phase(1)
                : y < v
                ? n.phase(0)
                : y > v
                ? (n.phase(1), (w = -1e3))
                : n.phase(0),
              0 === n.phase())
            )
              if (m) {
                var A = e.target(v - y) + e.target(r - v);
                t.log("totalDist: " + A),
                  l < A
                    ? ((w = l < d ? a.getClimbrate(s, l) : f[1]), (x = r))
                    : ((w = f[1]), (x = v));
              } else (w = f[1]), (x = v);
            else
              2 === n.phase() &&
                (m
                  ? l < d && ((w = a.getClimbrate(s, l)), (x = r))
                  : ((w = f[1]),
                    y > 12e3 + b && (x = 100 * Math.round((12e3 + b) / 100))));
            1 !== n.phase() ||
              (!g && h) ||
              (m
                ? ((h = e.route(u.length) - l), (h += e.target(r - v)))
                : (h = e.target(b - v)),
              (h = Math.round(h)),
              n.todDist(h),
              t.log("TOD changed to " + h)),
              void 0 !== E && c.speed.value(E),
              void 0 !== w && c.vs.value(w),
              void 0 !== x && c.altitude.value(x);
          }
        },
      };
    }
  ),
  define(
    "flight",
    ["knockout", "get", "nav/LNAV", "nav/VNAV", "exports"],
    function (t, e, n, a, i) {
      var r = window.navData.airports,
        o = t.observable(),
        s = t.observable(!1),
        l = t.pureComputed({
          read: s,
          write: function (t) {
            var e = s;
            C()
              ? t
                ? ((a.timer = setInterval(function () {
                    a.update();
                  }, 5e3)),
                  e(!0))
                : (clearInterval(a.timer), (a.timer = null), e(!1))
              : e(!1);
          },
        }),
        c = t.observable(!0),
        d = t.observable(),
        u = t.observable([]),
        f = t.observable(),
        p = t.observable(),
        m = t.pureComputed(function () {
          var t = v.airport(),
            n = v.SID() ? v.SID().name : void 0;
          return e.runway(t, n, !0);
        }),
        h = t.pureComputed(function () {
          var t = v.airport(),
            n = v.runway() ? v.runway().runway : void 0,
            a = v.SID() ? v.SID().name : void 0;
          return e.SID(t, n, a);
        }),
        v = {
          airport: t.pureComputed({
            read: d,
            write: function (t) {
              var e = d(),
                a = r[t];
              t !== e && v.runway(void 0),
                a ? (d(t), u(a)) : (d(void 0), u([])),
                n.update();
            },
          }),
          coords: t.pureComputed(function () {
            return u();
          }),
          runway: t.pureComputed({
            read: f,
            write: function (t) {
              var e = m()[t];
              e ? f(e) : (f(void 0), v.SID(void 0));
            },
          }),
          SID: t.pureComputed({
            read: p,
            write: function (t) {
              var e = h()[t];
              p(e);
            },
          }),
        },
        b = t.observable(),
        g = t.observable([]),
        y = t.observable(),
        w = t.observable(),
        x = t.pureComputed(function () {
          return e.runway(E.airport());
        }),
        _ = t.pureComputed(function () {
          return e.SID(E.airport(), !!E.runway() && E.runway().runway);
        }),
        E = {
          airport: t.pureComputed({
            read: b,
            write: function (t) {
              var e = b(),
                a = r[t];
              t !== e && E.runway(void 0),
                a ? (b(t), g(a)) : (b(void 0), g([])),
                n.update();
            },
          }),
          coords: t.pureComputed(function () {
            return g();
          }),
          runway: t.pureComputed({
            read: y,
            write: function (t) {
              var e = x()[t];
              e ? y(e) : (y(void 0), E.STAR(void 0));
            },
          }),
          STAR: t.pureComputed({
            read: w,
            write: function (t) {
              var e = _()[t];
              w(e);
            },
          }),
        },
        k = t.observable(),
        T = t.observable(),
        C = t.pureComputed({
          read: T,
          write: function (t) {
            var e = T;
            t ? e(+t) : (e(void 0), l(!1));
          },
        }),
        S = t.observable(0),
        D = t.pureComputed({
          read: S,
          write: function (t) {
            A() || t > 3 || S(t);
          },
        }),
        N = t.observable(!1),
        A = t.pureComputed({
          read: N,
          write: function (t, e) {
            N(t);
          },
        }),
        M = t.observable(!1),
        j = t.observable();
      (i.todDist = o),
        (i.vnavEnabled = l),
        (i.spdControl = c),
        (i.departure = v),
        (i.arrival = E),
        (i.number = k),
        (i.cruiseAlt = C),
        (i.phase = D),
        (i.phaseLocked = A),
        (i.todCalc = M),
        (i.fieldElev = j);
    }
  ),
  define(
    "ui/ViewModel",
    ["knockout", "flight", "get", "log", "waypoints", "nav/progress"],
    function (t, e, n, a, i, r) {
      function o() {
        var o = this,
          s = t.observable(!1);
        (o.opened = t.pureComputed({
          read: s,
          write: function (t, e) {
            s(t);
          },
        })),
          (o.modalWarning = t.observable()),
          (a.warn = t.pureComputed({
            read: o.modalWarning,
            write: function (t) {
              o.modalWarning(t),
                setTimeout(function () {
                  o.modalWarning(void 0);
                }, 5e3);
            },
          })),
          (o.departureAirport = e.departure.airport),
          (o.arrivalAirport = e.arrival.airport),
          (o.flightNumber = e.number),
          (o.route = i.route),
          (o.nextWaypoint = i.nextWaypoint),
          (o.saveWaypoints = i.saveData),
          (o.retrieveWaypoints = i.loadFromSave),
          (o.addWaypoint = i.addWaypoint),
          (o.activateWaypoint = i.activateWaypoint),
          (o.shiftWaypoint = i.shiftWaypoint),
          (o.removeWaypoint = i.removeWaypoint),
          (o.fieldElev = e.fieldElev),
          (o.todDist = e.todDist),
          (o.todCalc = e.todCalc),
          (o.departureRwyList = t.pureComputed(function () {
            return o.SIDName()
              ? n.SID(o.departureAirport(), o.departureRwyName(), o.SIDName())
                  .availableRunways
              : n.runway(o.departureAirport(), o.SIDName(), !0);
          })),
          (o.departureRunway = e.departure.runway),
          (o.departureRwyName = t.pureComputed(function () {
            return o.departureRunway() ? o.departureRunway().runway : void 0;
          })),
          (o.SIDList = t.pureComputed(function () {
            return n.SID(o.departureAirport(), o.departureRwyName());
          })),
          (o.SID = e.departure.SID),
          (o.SIDName = t.pureComputed(function () {
            return o.SID() ? o.SID().name : void 0;
          })),
          (o.arrivalRwyList = t.pureComputed(function () {
            return n.runway(o.arrivalAirport());
          })),
          (o.arrivalRunway = e.arrival.runway),
          (o.arrivalRunwayName = t.pureComputed(function () {
            return o.arrivalRunway() ? o.arrivalRunway().runway : void 0;
          })),
          (o.STARs = t.pureComputed(function () {
            return n.STAR(o.arrivalAirport(), o.arrivalRunwayName());
          })),
          (o.STAR = e.arrival.STAR),
          (o.STARName = t.pureComputed(function () {
            return o.STAR() ? o.STAR().name : void 0;
          })),
          (o.vnavEnabled = e.vnavEnabled),
          (o.cruiseAlt = e.cruiseAlt),
          (o.spdControl = e.spdControl),
          (o.phase = e.phase),
          (o.phaseLocked = e.phaseLocked);
        var l = ["climb", "cruise", "descent"];
        (o.currentPhaseText = t.pureComputed(function () {
          return l[e.phase()];
        })),
          (o.nextPhase = function () {
            var t = e.phase();
            e.phase(t === l.length - 1 ? 0 : t + 1);
          }),
          (o.progInfo = r.info),
          (o.loadRouteText = t.observable()),
          (o.loadRoute = function () {
            i.toRoute(o.loadRouteText()), o.loadRouteText(void 0);
          });
        var c = t.observable();
        (o.generateRoute = t.pureComputed({
          read: c,
          write: function (t, e) {
            var n = t ? i.toRouteString() : void 0;
            c(n);
          },
        })),
          (o.logData = a.data),
          (o.removeLogData = a.removeData);
      }
      return (
        (t.bindingHandlers.mdlSwitch = {
          update: function (t, e, n) {
            var a = n.get("checked");
            a && a(), n.get("disable");
            var i = t.parentNode.MaterialSwitch;
            i && (i.checkDisabled(), i.checkToggleState());
          },
        }),
        (t.bindingHandlers.mdlTextfield = {
          update: function (t, e, n) {
            var a = n.get("value");
            a && a();
            var i = t.parentNode.MaterialTextfield;
            i &&
              (i.checkDirty(),
              i.checkDisabled(),
              i.checkFocus(),
              i.checkValidity());
          },
        }),
        o
      );
    }
  ),
  define("text", ["module"], function (t) {
    "use strict";
    function e(t, e) {
      return void 0 === t || "" === t ? e : t;
    }
    function n(t, n, a, i) {
      if (n === i) return !0;
      if (t === a) {
        if ("http" === t) return e(n, "80") === e(i, "80");
        if ("https" === t) return e(n, "443") === e(i, "443");
      }
      return !1;
    }
    var a,
      i,
      r,
      o,
      s,
      l = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
      c = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
      d = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
      u = "undefined" != typeof location && location.href,
      f = u && location.protocol && location.protocol.replace(/\:/, ""),
      p = u && location.hostname,
      m = u && (location.port || void 0),
      h = {},
      v = (t.config && t.config()) || {};
    return (
      (a = {
        version: "2.0.16",
        strip: function (t) {
          if (t) {
            t = t.replace(c, "");
            var e = t.match(d);
            e && (t = e[1]);
          } else t = "";
          return t;
        },
        jsEscape: function (t) {
          return t
            .replace(/(['\\])/g, "\\$1")
            .replace(/[\f]/g, "\\f")
            .replace(/[\b]/g, "\\b")
            .replace(/[\n]/g, "\\n")
            .replace(/[\t]/g, "\\t")
            .replace(/[\r]/g, "\\r")
            .replace(/[\u2028]/g, "\\u2028")
            .replace(/[\u2029]/g, "\\u2029");
        },
        createXhr:
          v.createXhr ||
          function () {
            var t, e, n;
            if ("undefined" != typeof XMLHttpRequest)
              return new XMLHttpRequest();
            if ("undefined" != typeof ActiveXObject)
              for (e = 0; e < 3; e += 1) {
                n = l[e];
                try {
                  t = new ActiveXObject(n);
                } catch (t) {}
                if (t) {
                  l = [n];
                  break;
                }
              }
            return t;
          },
        parseName: function (t) {
          var e,
            n,
            a,
            i = !1,
            r = t.lastIndexOf("."),
            o = 0 === t.indexOf("./") || 0 === t.indexOf("../");
          return (
            -1 !== r && (!o || r > 1)
              ? ((e = t.substring(0, r)), (n = t.substring(r + 1)))
              : (e = t),
            (a = n || e),
            (r = a.indexOf("!")),
            -1 !== r &&
              ((i = "strip" === a.substring(r + 1)),
              (a = a.substring(0, r)),
              n ? (n = a) : (e = a)),
            { moduleName: e, ext: n, strip: i }
          );
        },
        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
        useXhr: function (t, e, i, r) {
          var o,
            s,
            l,
            c = a.xdRegExp.exec(t);
          return (
            !c ||
            ((o = c[2]),
            (s = c[3]),
            (s = s.split(":")),
            (l = s[1]),
            (s = s[0]),
            (!o || o === e) &&
              (!s || s.toLowerCase() === i.toLowerCase()) &&
              ((!l && !s) || n(o, l, e, r)))
          );
        },
        finishLoad: function (t, e, n, i) {
          (n = e ? a.strip(n) : n), v.isBuild && (h[t] = n), i(n);
        },
        load: function (t, e, n, i) {
          if (i && i.isBuild && !i.inlineText) return void n();
          v.isBuild = i && i.isBuild;
          var r = a.parseName(t),
            o = r.moduleName + (r.ext ? "." + r.ext : ""),
            s = e.toUrl(o),
            l = v.useXhr || a.useXhr;
          if (0 === s.indexOf("empty:")) return void n();
          !u || l(s, f, p, m)
            ? a.get(
                s,
                function (e) {
                  a.finishLoad(t, r.strip, e, n);
                },
                function (t) {
                  n.error && n.error(t);
                }
              )
            : e(
                [o],
                function (t) {
                  a.finishLoad(r.moduleName + "." + r.ext, r.strip, t, n);
                },
                function (t) {
                  n.error && n.error(t);
                }
              );
        },
        write: function (t, e, n, i) {
          if (h.hasOwnProperty(e)) {
            var r = a.jsEscape(h[e]);
            n.asModule(
              t + "!" + e,
              "define(function () { return '" + r + "';});\n"
            );
          }
        },
        writeFile: function (t, e, n, i, r) {
          var o = a.parseName(e),
            s = o.ext ? "." + o.ext : "",
            l = o.moduleName + s,
            c = n.toUrl(o.moduleName + s) + ".js";
          a.load(
            l,
            n,
            function (e) {
              var n = function (t) {
                return i(c, t);
              };
              (n.asModule = function (t, e) {
                return i.asModule(t, c, e);
              }),
                a.write(t, l, n, r);
            },
            r
          );
        },
      }),
      "node" === v.env ||
      (!v.env &&
        "undefined" != typeof process &&
        process.versions &&
        process.versions.node &&
        !process.versions["node-webkit"] &&
        !process.versions["atom-shell"])
        ? ((i = require.nodeRequire("fs")),
          (a.get = function (t, e, n) {
            try {
              var a = i.readFileSync(t, "utf8");
              "\ufeff" === a[0] && (a = a.substring(1)), e(a);
            } catch (t) {
              n && n(t);
            }
          }))
        : "xhr" === v.env || (!v.env && a.createXhr())
        ? (a.get = function (t, e, n, i) {
            var r,
              o = a.createXhr();
            if ((o.open("GET", t, !0), i))
              for (r in i)
                i.hasOwnProperty(r) &&
                  o.setRequestHeader(r.toLowerCase(), i[r]);
            v.onXhr && v.onXhr(o, t),
              (o.onreadystatechange = function (a) {
                var i, r;
                4 === o.readyState &&
                  ((i = o.status || 0),
                  i > 399 && i < 600
                    ? ((r = new Error(t + " HTTP status: " + i)),
                      (r.xhr = o),
                      n && n(r))
                    : e(o.responseText),
                  v.onXhrComplete && v.onXhrComplete(o, t));
              }),
              o.send(null);
          })
        : "rhino" === v.env ||
          (!v.env &&
            "undefined" != typeof Packages &&
            "undefined" != typeof java)
        ? (a.get = function (t, e) {
            var n,
              a,
              i = new java.io.File(t),
              r = java.lang.System.getProperty("line.separator"),
              o = new java.io.BufferedReader(
                new java.io.InputStreamReader(
                  new java.io.FileInputStream(i),
                  "utf-8"
                )
              ),
              s = "";
            try {
              for (
                n = new java.lang.StringBuffer(),
                  a = o.readLine(),
                  a &&
                    a.length() &&
                    65279 === a.charAt(0) &&
                    (a = a.substring(1)),
                  null !== a && n.append(a);
                null !== (a = o.readLine());

              )
                n.append(r), n.append(a);
              s = String(n.toString());
            } finally {
              o.close();
            }
            e(s);
          })
        : ("xpconnect" === v.env ||
            (!v.env &&
              "undefined" != typeof Components &&
              Components.classes &&
              Components.interfaces)) &&
          ((r = Components.classes),
          (o = Components.interfaces),
          Components.utils.import("resource://gre/modules/FileUtils.jsm"),
          (s = "@mozilla.org/windows-registry-key;1" in r),
          (a.get = function (t, e) {
            var n,
              a,
              i,
              l = {};
            s && (t = t.replace(/\//g, "\\")), (i = new FileUtils.File(t));
            try {
              (n = r["@mozilla.org/network/file-input-stream;1"].createInstance(
                o.nsIFileInputStream
              )),
                n.init(i, 1, 0, !1),
                (a = r[
                  "@mozilla.org/intl/converter-input-stream;1"
                ].createInstance(o.nsIConverterInputStream)),
                a.init(
                  n,
                  "utf-8",
                  n.available(),
                  o.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER
                ),
                a.readString(n.available(), l),
                a.close(),
                n.close(),
                e(l.value);
            } catch (t) {
              throw new Error(((i && i.path) || "") + ": " + t);
            }
          })),
      a
    );
  }),
  define("minify", ["text"], function (t) {
    function e(t) {
      return t
        .replace(/\r/g, "")
        .replace(/\n\s+/g, "")
        .replace(/\n/g, "")
        .replace(/\t/g, "")
        .replace(/\s*{/g, "{")
        .replace(/\s*\:\s*/g, ":")
        .replace(/\s*;\s*/g, ";")
        .replace(/\s*\/\*[^]*?\*\/\s*/g, "")
        .replace(/\s*<!--[^]*?-->\s*/g, "");
    }
    function n(t) {
      return t.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
    }
    var a = {};
    return {
      load: function (n, i, r, o) {
        o && o.isBuild && !o.inlineText
          ? r(null)
          : t.get(i.toUrl(n), function (t) {
              (a[n] = e(t)), r(a[n]);
            });
      },
      write: function (t, e, i) {
        if (e in a) {
          i(
            "define('" +
              t +
              "!" +
              e +
              "', function () { return '" +
              n(a[e]) +
              "';});\n"
          );
        }
      },
    };
  }),
  define("minify!html/button.html", function () {
    return '<button class="fmc-btn fmc-btn__fade mdl-button mdl-js-button gefs-f-standard-ui" data-bind="click:opened.bind($data, !opened())">FMC<i class="material-icons">view_list</i></button>';
  }),
  define("minify!html/externaldist.html", function () {
    return '<div class="fmc-prog-info dest-info geofs-f-standard-ui"><span class="mdl-chip mdl-chip--contact"><span class="mdl-chip__contact mdl-color--teal mdl-color-text--white">Dest</span><span class="mdl-chip__text distance-info"><span data-bind="text:progInfo.flightDist"></span>&nbsp;nm</span></span></div>';
  }),
  define("minify!html/modal.html", function () {
    return '<div class="fmc-modal mdl-dialog" data-bind="css:{ opened:opened }"><div class="fmc-modal__close"><button class="mdl-button mdl-js-button mdl-button--icon close" data-bind="click:opened.bind($data, false)"><i class="material-icons">clear</i></button></div><div class="fmc-modal__title"><h4><strong>Flight Management Computer</strong></h4></div><div class="fmc-modal__warning" data-bind="text:modalWarning"></div><div class="fmc-modal__layout-container"><div class="fmc-modal__layout mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs"><div class="fmc-modal__header"><header class="mdl-layout__header fmc-modal__no-shadow"><div class="mdl-layout__tab-bar fmc-modal__tab-bar"><a to=".fmc-rte" class="mdl-layout__tab fmc-btn__fade is-active" interactive=".wpt-tab">RTE</a><a to=".fmc-arr" class="mdl-layout__tab fmc-btn__fade" interactive=".arr-tab">ARR</a><a to=".fmc-legs" class="mdl-layout__tab fmc-btn__fade">LEGS</a><a to=".fmc-vnav" class="mdl-layout__tab fmc-btn__fade" interactive=".vnav-tab">VNAV</a><a to=".fmc-ils" class="mdl-layout__tab fmc-btn__fade" style="display:none;">ILS</a><a to=".fmc-prog" class="mdl-layout__tab fmc-btn__fade">PROG</a><a to=".fmc-map" class="mdl-layout__tab fmc-btn__fade" style="display:none;">MAP</a><a to=".fmc-load" class="mdl-layout__tab fmc-btn__fade" interactive=".load-tab">LOAD</a><a to=".fmc-log" class="mdl-layout__tab fmc-btn__fade" interactive=".log-tab">LOG</a></div></header></div><div class="fmc-modal__divider"></div><div class="fmc-modal__content"><main class="mdl-layout__content"></main></div></div></div><div class="fmc-modal__actions"><button class="mdl-button mdl-js-button mdl-button--raised interactive save-wpt-data wpt-tab is-active" data-bind="click:saveWaypoints">Save Waypoints</button><button class="mdl-button mdl-js-button mdl-button--raised interactive retrieve-wpt wpt-tab is-active" data-bind="click:retrieveWaypoints.bind($data,undefined)">Retrieve Waypoints</button><button action="add-wpt" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored interactive wpt-tab is-active" data-bind="click:addWaypoint"><i class="material-icons">add</i></button><div class="fmc-auto-tod-container interactive arr-tab"><label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="auto-tod"><input type="checkbox" id="auto-tod" class="mdl-switch__input" data-bind="checked:todCalc, mdlSwitch:true"><span class="mdl-switch__label">Automatically Calculate T/D</span></label></div><div class="fmc-vnav-phase-container interactive vnav-tab"><span>Phase</span><button class="mdl-button mdl-js-button mdl-button--raised toggle-phase" data-bind="text:currentPhaseText, click:nextPhase"></button><button class="mdl-button mdl-js-button mdl-button--raised lock-phase" data-bind="click:phaseLocked.bind($data, !phaseLocked()), css:{locked:phaseLocked}"><i class="material-icons">lock</i></button></div><button class="mdl-button mdl-js-button mdl-button--raised interactive clear-rte load-tab" data-bind="click:generateRoute.bind($data,false)">Clear</button><button class="mdl-button mdl-js-button mdl-button--raised interactive generate-rte load-tab" data-bind="click:generateRoute.bind($data,true)">Generate Route</button><button class="mdl-button mdl-js-button mdl-button--raised interactive remove-log-data log-tab" data-bind="click:removeLogData">Remove Log Data</button></div></div>';
  }),
  define("minify!html/tab-contents/route.html", function () {
    return '<section class="mdl-layout__tab-panel fmc-rte is-active"><div class="page-content"><div class="fmc-dep-arr-table-container"><table><tr><td><i class="material-icons">flight_takeoff</i><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input dep" data-bind="value:departureAirport, mdlTextfield:true"><label class="mdl-textfield__label">Departure</label></div></td><td><i class="material-icons">flight_land</i><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input arr" data-bind="value:arrivalAirport, mdlTextfield:true"><label class="mdl-textfield__label">Arrival</label></div></td><td><i class="material-icons">local_airport</i><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input fn" data-bind="value:flightNumber, mdlTextfield:true"><label class="mdl-textfield__label">Flight #</label></div></td></tr></table></div><div class="fmc-wpt-list-container"><table class="mdl-data-table mdl-js-data-table"><thead><tr class="wpt-header"><th class="wpt-col">Waypoints</th><th class="lat-col">Position</th><th class="lon-col"></th><th class="alt-col">Altitude</th><th class="actions-col">Actions</th></tr></thead><tbody data-bind="foreach:route"><tr class="wpt-row"><td><span class="fmc-wpt-info" data-bind="text:info"></span><div class="mdl-textfield mdl-js-textfield"><input class="mdl-textfield__input wpt" data-bind="value:wpt, mdlTextfield:true"><label class="mdl-textfield__label">Fix, VOR, ICAO</label></div></td><td><div class="mdl-textfield mdl-js-textfield"><input class="mdl-textfield__input lat" data-bind="value:lat, mdlTextfield:true" pattern="-?(\\d*(\\.\\d+)?|\\d*\\s\\d+(\\.\\d+)?)"><label class="mdl-textfield__label">Lat.</label><span class="mdl-textfield__error">Invalid Latitude</span></div></td><td><div class="mdl-textfield mdl-js-textfield"><input class="mdl-textfield__input lon" data-bind="value:lon, mdlTextfield:true" pattern="-?(\\d*(\\.\\d+)?|\\d*\\s\\d+(\\.\\d+)?)"><label class="mdl-textfield__label">Lon.</label><span class="mdl-textfield__error">Invalid Longitude</span></div></td><td><div class="mdl-textfield mdl-js-textfield"><input class="mdl-textfield__input alt" type="number" max=3280000 step=10 data-bind="value:alt, mdlTextfield:true"><label class="mdl-textfield__label">Ft.</label><span class="mdl-textfield__error">Invalid Altitude</span></div></td><td><button data-bind="click:function(){ $parent.activateWaypoint($index()) }" class="mdl-button mdl-js-button mdl-button--icon mdl-button--accent"><i class="material-icons" data-bind="text:$parent.nextWaypoint() === $index() ? \'check_circle\':\'check\'"></i></button><button data-bind="click:function(){ $parent.shiftWaypoint($index(), -1) }" class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"><i class="material-icons">arrow_upward</i></button><button data-bind="click:function(){ $parent.shiftWaypoint($index(), 1) }" class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"><i class="material-icons">arrow_downward</i></button><button data-bind="click:function(data,event){ $parent.removeWaypoint($index(),data,event) }" class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"><i class="material-icons">delete_forever</i></button></td></tr></tbody></table></div></div></section>';
  }),
  define("minify!html/tab-contents/dep-arr.html", function () {
    return '<section class="mdl-layout__tab-panel fmc-arr"><div class="page-content"><div class="fmc-dep-arr-container"><table><tr><td><span class="fmc-dep-arr__input-label">T/D Dist.</span><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label tod-dist-container"><input class="mdl-textfield__input tod-dist" type="number" data-bind="value:todDist, mdlTextfield:true" pattern="\\d*"><label class="mdl-textfield__label">Nautical Miles (nm)</label><span class="mdl-textfield__error">Invalid T/D Distance</span></div></td><td><span class="fmc-dep-arr__input-label">Arrival Field Elev.</span><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input field-elev" type="number" data-bind="value:fieldElev, mdlTextfield:true" pattern="-?\\d*"><label class="mdl-textfield__label">Feet (ft.)</label><span class="mdl-textfield__error">Invalid Field Elevation</span></div></td></tr></table></div></div></section>';
  }),
  define("minify!html/tab-contents/legs.html", function () {
    return '<section class="mdl-layout__tab-panel fmc-legs"><div class="page-content"><div class="fmc-legs-container"><table class="fmc-legs-data-table"><thead><th class="brng-and-wpt"></th><th class="dist-and-info"></th><th class="altitude"></th></thead><tbody data-bind="foreach:route"><tr data-bind="visible:$parent.nextWaypoint() == null || $index() >= $parent.nextWaypoint(), css:{activated:$parent.nextWaypoint() === $index()}"><td><div class="brng-from-prev" data-bind="text:brngFromPrev() == null ? \'\':brngFromPrev()+\'\\xB0\'"></div><div class="wpt-name" data-bind="text:wpt"></div></td><td><div class="dist-from-prev" data-bind="text:distFromPrev() == null ? \'\':distFromPrev()+\' NM\'"></div><div class="wpt-info" data-bind="text:info() ? \'(\'+info()+\')\':\'\'"></div></td><td><div class="alt-target" data-bind="text:!alt() ? (wpt() ? \'-----\':\'\'):(alt() >= 18000 ? \'FL\'+Math.round(alt()/100):alt()+\' FT\')"></div></td></tr></tbody></table></div></div></section>';
  }),
  define("minify!html/tab-contents/vnav.html", function () {
    return '<section class="mdl-layout__tab-panel fmc-vnav"><div class="page-content"><div class="fmc-vnav-container"><table><tr><td><div class="fmc-vnav-toggle-container"><div><label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="vnav-toggle"><input type="checkbox" id="vnav-toggle" class="mdl-switch__input" data-bind="checked:vnavEnabled, disable:cruiseAlt() == undefined, mdlSwitch:true"><span class="mdl-switch__label">VNAV</span></label><i class="material-icons">unfold_more_horizontal</i></div><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input cruise-alt" type="number" data-bind="value:cruiseAlt, mdlTextfield:true" pattern="\\d*"><label class="mdl-textfield__label">Cruise Altitude (ft.)</label><span class="mdl-textfield__error">Invalid Cruise Altitude</span></div></div></td><td><div class="fmc-spd-toggle-container"><label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="spd-toggle"><input type="checkbox" id="spd-toggle" class="mdl-switch__input" data-bind="checked:spdControl, mdlSwitch:true"><span class="mdl-switch__label">SPD Control</span></label></div></td></tr></table></div></div></section>';
  }),
  define("minify!html/tab-contents/ils.html", function () {
    return '<section class="mdl-layout__tab-panel fmc-ils"><div class="page-content"><div class="fmc-ils-container"><table class="mdl-data-table mdl-js-data-table"><tr><th>Glideslope</th><th>Runway Threshold</th><th></th><th>Opposite Threshold</th><th></th></tr><tr><td><div class="mdl-textfield mdl-js-textfield"><input class="mdl-textfield__input glideslope"><label class="mdl-textfield__label">Degrees</label><span class="mdl-textfield__error">Invalid Glideslope</span></div></td><td><div class="mdl-textfield mdl-js-textfield"><input class="mdl-textfield__input threshold-lat" pattern="-?(\\d*(\\.\\d+)?|\\d*\\s\\d+(\\.\\d+)?)"><label class="mdl-textfield__label">Lat.</label><span class="mdl-textfield__error">Invalid Latitude</span></div></td><td><div class="mdl-textfield mdl-js-textfield"><input class="mdl-textfield__input threshold-lon" pattern="-?(\\d*(\\.\\d+)?|\\d*\\s\\d+(\\.\\d+)?)"><label class="mdl-textfield__label">Lon.</label><span class="mdl-textfield__error">Invalid Longitude</span></div></td><td><div class="mdl-textfield mdl-js-textfield"><input class="mdl-textfield__input opposite-lat" pattern="-?(\\d*(\\.\\d+)?|\\d*\\s\\d+(\\.\\d+)?)"><label class="mdl-textfield__label">Lat.</label><span class="mdl-textfield__error">Invalid Latitude</span></div></td><td><div class="mdl-textfield mdl-js-textfield"><input class="mdl-textfield__input opposite-lon" pattern="-?(\\d*(\\.\\d+)?|\\d*\\s\\d+(\\.\\d+)?)"><label class="mdl-textfield__label">Lon.</label><span class="mdl-textfield__error">Invalid Longitude</span></div></td></tr></table></div></div></section>';
  }),
  define("minify!html/tab-contents/progress.html", function () {
    return '<section class="mdl-layout__tab-panel fmc-prog"><div class="page-content"><div class="fmc-prog-container"><div class="fmc-prog-info dest-info"><span class="mdl-chip mdl-chip--contact"><span class="mdl-chip__contact mdl-color--teal mdl-color-text--white">Dest</span><span class="mdl-chip__text distance-info"><span data-bind="text:progInfo.flightDist"></span>&nbsp;nm</span><span class="mdl-chip__contact time-info"><div>ETE:&nbsp;<span class="ete" data-bind="text:progInfo.flightETE"></span></div><div>ETA:&nbsp;<span class="eta" data-bind="text:progInfo.flightETA"></span></div></span></span></div><div class="fmc-prog-info tod-info"><span class="mdl-chip mdl-chip--contact"><span class="mdl-chip__contact mdl-color--teal mdl-color-text--white">T/D</span><span class="mdl-chip__text distance-info"><span data-bind="text:progInfo.todDist"></span>&nbsp;nm</span><span class="mdl-chip__contact time-info"><div>ETE:&nbsp;<span class="ete" data-bind="text:progInfo.todETE"></span></div><div>ETA:&nbsp;<span class="eta" data-bind="text:progInfo.todETA"></span></div></span></span></div><div class="fmc-prog-info next-wpt-info" data-bind="visible:nextWaypoint() !== null"><span class="mdl-chip mdl-chip--contact"><span class="mdl-chip__contact mdl-color--teal mdl-color-text--white">Next Waypoint<i class="material-icons">room</i></span><span class="mdl-chip__text distance-info"><span data-bind="text:progInfo.nextDist"></span>&nbsp;nm</span><span class="mdl-chip__contact time-info" data-bind="text:progInfo.nextETE"></span></span></div></div></div></section>';
  }),
  define("minify!html/tab-contents/map.html", function () {
    return '<section class="mdl-layout__tab-panel fmc-map"><div class="page-content"><div class="fmc-map-container"></div></div></section>';
  }),
  define("minify!html/tab-contents/load.html", function () {
    return '<section class="mdl-layout__tab-panel fmc-load"><div class="page-content"><div class="fmc-load-container"><div class="fmc-load-wpt__label"><span>Waypoints / Route</span><i class="material-icons">mode_edit</i></div><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input load-wpt" data-bind="value:loadRouteText, mdlTextfield:true"><label class="mdl-textfield__label">Enter waypoints separated by spaces or a generated route</label></div><button class="mdl-button mdl-js-button mdl-button--icon load-wpt" data-bind="click:loadRoute"><i class="material-icons">keyboard_return</i></button><div class="mdl-textfield mdl-js-textfield fmc-generate-rte-container"><textarea class="mdl-textfield__input generate-rte" readonly rows="6" maxrows="6" data-bind="value:generateRoute, mdlTextfield:true"></textarea><label class="mdl-textfield__label">Generated Route</label></div></div></div></section>';
  }),
  define("minify!html/tab-contents/log.html", function () {
    return '<section class="mdl-layout__tab-panel fmc-log"><div class="page-content"><div class="fmc-log-container"><table class="mdl-data-table mdl-js-data-table"><thead><tr class="log-header"><th class="time-col">Time</th><th class="spd-col">Spd.</th><th class="hdg-col">Hdg.</th><th class="alt-col">Alt.</th><th class="lat-col">Lat.</th><th class="lon-col">Lon.</th><th class="fps-col">FPS</th><th class="oth-col">Other</th></tr></thead><tbody data-bind="foreach:logData"><tr class="log-data"><td data-bind="text:$data[0]"></td><td data-bind="text:$data[1]"></td><td data-bind="text:$data[2]"></td><td data-bind="text:$data[3]"></td><td data-bind="text:$data[4]"></td><td data-bind="text:$data[5]"></td><td data-bind="text:$data[6]"></td><td data-bind="text:$data[7]"></td></tr></tbody></table></div></div></section>';
  }),
  define(
    "html/tab-contents/main",
    [
      "minify!./route.html",
      "minify!./dep-arr.html",
      "minify!./legs.html",
      "minify!./vnav.html",
      "minify!./ils.html",
      "minify!./progress.html",
      "minify!./map.html",
      "minify!./load.html",
      "minify!./log.html",
    ],
    function (t, e, n, a, i, r, o, s, l) {
      return [t, e, n, a, i, r, o, s, l].join("");
    }
  ),
  define("minify!style/button.css", function () {
    return "button.fmc-btn,button.fmc-btn:hover,button.fmc-btn:active,button.fmc-btn:focus:not(:active){color:white;background:green;}button.fmc-btn__fade{transition:opacity 0.2s ease-in-out;-moz-transition:opacity 0.2s ease-in-out;-webkit-transition:opacity 0.2s ease-in-out;}button.fmc-btn__fade:hover{opacity:0.8;}";
  }),
  define("minify!style/externaldist.css", function () {
    return "div.fmc-prog-info.geofs-f-standard-ui{position:absolute;margin-left:5px;margin-top:-2px;}div.fmc-prog-info.geofs-f-standard-ui span.mdl-chip.mdl-chip--contact{padding-right:12px;}";
  }),
  define("minify!style/modal.css", function () {
    return "a.fmc-btn__fade{transition:font-size 0.3s ease-in-out,font-weight 0.3s ease-in-out,color 0.3s ease-in-out;-moz-transition:font-size 0.3s ease-in-out,font-weight 0.3s ease-in-out,color 0.3s ease-in-out;-webkit-transition:font-size 0.3s ease-in-out,font-weight 0.3s ease-in-out,color 0.3s ease-in-out;}a.fmc-btn__fade:hover:not(.is-active){font-weight:bold;color:black;}a.fmc-btn__fade.is-active{font-size:15px;font-weight:bold;color:rgb(83, 109, 254) !important;}div.fmc-modal{display:none;width:665px;padding:14px 14px;border:none;border-radius:7px;position:fixed;top:10%;left:0px;right:0px;height:fit-content;height:-moz-fit-content;height:-webkit-fit-content;color:black;margin:auto;background:white;}div.fmc-modal.opened{display:block;}div.fmc-modal::backdrop{background:none;}div.fmc-modal .fmc-modal__close{height:25px;margin:-13px 0;float:right;}div.fmc-modal h4{text-align:center;margin-top:10px !important;margin-bottom:0px !important;}div.fmc-modal .fmc-modal__warning{height:20px;text-align:center;color:#d50000;}div.fmc-modal .fmc-modal__no-shadow{box-shadow:none !important;background:white !important;min-height:inherit;height:inherit;position:static !important;}@media screen and (max-width:1024px){div.fmc-modal .fmc-modal__no-shadow{display:block !important;}}div.fmc-modal .fmc-modal__content main{padding-top:0px !important;}div.fmc-modal__layout-container{position:relative;height:auto;margin-top:-2px;}div.fmc-modal__layout-container .mdl-layout__container{position:relative !important;}div.fmc-modal__header{height:48px;}div.fmc-modal__header a{cursor:pointer;}div.fmc-modal__tab-bar{background:inherit !important;}div.fmc-modal__divider{height:2px;margin-top:-2px;background:rgba(66, 66, 66, 0.2);}div.fmc-modal__content{padding-top:15px;}div.fmc-modal__actions .close{display:none;}div.fmc-modal__actions .interactive{display:none;}div.fmc-modal__actions .interactive.is-active{display:inline-block;}";
  }),
  define("minify!style/route.css", function () {
    return 'div.fmc-dep-arr-table-container{margin-top:-10px;}div.fmc-dep-arr-table-container table{width:100%;}div.fmc-dep-arr-table-container .material-icons{vertical-align:middle;margin-right:5px;}div.fmc-dep-arr-table-container div{width:80%;}div.fmc-wpt-add-container{float:right;}div.fmc-modal__actions button[action="add-wpt"]{min-width:35px;width:35px;height:35px;float:right;}';
  }),
  define("minify!style/waypoints.css", function () {
    return 'div.fmc-wpt-list-container{padding-bottom:9px;margin-top:-23px;max-height:277px;overflow:auto;}div.fmc-wpt-list-container table{border:none;}div.fmc-wpt-list-container tr:hover{background-color:initial !important;}div.fmc-wpt-list-container th{text-align:left;cursor:default;}div.fmc-wpt-list-container td{border:none;}div.fmc-wpt-list-container .wpt-col{width:12%;}div.fmc-wpt-list-container .lat-col{width:11.8%;}div.fmc-wpt-list-container .lon-col{width:12.4%;}div.fmc-wpt-list-container .alt-col{width:3%;}div.fmc-wpt-list-container .actions-col{width:10%;}tr.wpt-row td{padding-top:0px !important;padding-bottom:0px !important;}tr.wpt-row .mdl-textfield{width:initial;padding:14px 0;}tr.wpt-row .mdl-textfield__label{top:18px;}tr.wpt-row .mdl-textfield__label::after{bottom:14px;}tr.wpt-row .fmc-wpt-info{color:rgb(83, 109, 254);position:absolute;top:-4px;font-size:12px;}tr.wpt-row button{float:left;min-width:22px !important;width:22px !important;height:22px !important;}button[action="activate-wpt"] .material-icons{color:blue;}';
  }),
  define("minify!style/dep-arr.css", function () {
    return "div.fmc-dep-arr-container{overflow:hidden;}div.fmc-dep-arr-container .fmc-dep-arr__input-label{margin-left:50px;font-size:16px;font-weight:bold;color:rgba(0, 0, 0, 0.26);cursor:default;}div.fmc-dep-arr-container td div{width:140px;margin-left:10px;position:relative;}div.fmc-dep-arr-container .mdl-textfield__input,div.fmc-dep-arr-container label{width:137px;}div.fmc-auto-tod-container{position:relative;left:28%;}div.fmc-auto-tod-container .mdl-switch{width:280px;}div.fmc-auto-tod-container .mdl-switch__label{font-weight:bold;cursor:default !important;}";
  }),
  define("minify!style/legs.css", function () {
    return "div.fmc-legs-container{max-height:340px;min-height:70px;width:665px;overflow:auto;font-family:monospace;}table.fmc-legs-data-table{margin-left:60px;}table.fmc-legs-data-table tr.activated{color:rgb(83, 109, 254);}table.fmc-legs-data-table tr.activated .wpt-name{font-weight:bold;}table.fmc-legs-data-table th{text-align:left;cursor:default;}table.fmc-legs-data-table td{padding:10px;}table.fmc-legs-data-table .brng-and-wpt{width:100px;}table.fmc-legs-data-table .dist-and-info{width:300px;}table.fmc-legs-data-table .altitude{width:120px;}table.fmc-legs-data-table .brng-from-prev{height:20px;font-size:18px;margin-bottom:4px;}table.fmc-legs-data-table .wpt-name{font-size:30px;}table.fmc-legs-data-table .dist-from-prev{height:20px;font-size:18px;margin-bottom:4px;}table.fmc-legs-data-table .wpt-info{height:20px;font-size:20px;}table.fmc-legs-data-table .alt-target{font-size:20px;margin-top:20px;}";
  }),
  define("minify!style/vnav.css", function () {
    return 'div.fmc-vnav-toggle-container{margin-left:60px;}div.fmc-vnav-toggle-container div:first-of-type{float:left;padding:15px 0 25px;}div.fmc-vnav-toggle-container .mdl-switch__track{padding:0 !important;}div.fmc-vnav-toggle-container .material-icons{vertical-align:bottom;margin-left:-15px;width:25px;}div.fmc-vnav-toggle-container .mdl-textfield{margin:-5px 0 -30px;}div.fmc-vnav-toggle-container input{width:133px;}div.fmc-vnav-toggle-container label{width:133px;}div.fmc-vnav-toggle-container label[for="vnav-toggle"]{width:110px;}div.fmc-vnav-toggle-container .mdl-textfield--floating-label{width:140px;}div.fmc-spd-toggle-container{padding:15px 0 25px;margin-left:110px;width:140px;}div.fmc-vnav-phase-container{position:relative;left:35%;background:rgba(158, 158, 158, .2);margin-top:-10px;}div.fmc-vnav-phase-container span{font-family:"Roboto", "Helvetica", "Arial", sans-serif;font-size:14px;font-weight:500;text-transform:uppercase;margin:0 10px;}div.fmc-vnav-phase-container .toggle-phase{background:rgb(83, 109, 254);color:white;}div.fmc-vnav-phase-container .toggle-phase:hover{background:rgb(83, 109, 254);}div.fmc-vnav-phase-container .toggle-phase:active{background:rgba(83, 109, 254, 0.4);}div.fmc-vnav-phase-container .lock-phase{min-width:36px;width:36px;}div.fmc-vnav-phase-container .lock-phase .material-icons{margin-left:-10px;}div.fmc-vnav-phase-container .lock-phase.locked{background:red;color:white;}div.fmc-vnav-phase-container .lock-phase.locked:hover{background:red;}div.fmc-vnav-phase-container .lock-phase.locked:active{background:rgba(255, 0, 0, 0.4);}';
  }),
  define("minify!style/ils.css", function () {
    return "";
  }),
  define("minify!style/progress.css", function () {
    return "div.fmc-prog-info{display:inline-block;}div.fmc-prog-info .material-icons{vertical-align:middle;}div.fmc-prog-container .fmc-prog-info{padding:8px;}div.fmc-prog-container .fmc-prog-info.dest-info{margin:0 70px;}div.fmc-prog-info.next-wpt-info{margin-left:180px;}div.fmc-prog-info span.mdl-chip.mdl-chip--contact{padding:0;height:auto;}div.fmc-prog-info .distance-info{height:36px;line-height:36px;font-size:18px;text-align:center;width:70px;}div.fmc-prog-info .mdl-chip__contact{font-size:14px;height:36px;line-height:36px;width:auto;padding:0 8px;}div.fmc-prog-info .time-info{background:tan;margin-left:8px;margin-right:0px;text-align:left;}div.fmc-prog-info .time-info div{line-height:18px;font-size:12px;width:55px;}div.fmc-prog-info.next-wpt-info .time-info{width:50px;text-align:center;}";
  }),
  define("minify!style/map.css", function () {
    return "div.fmc-map-container{height:405px;width:700px;}";
  }),
  define("minify!style/load.css", function () {
    return 'div.fmc-load-container .mdl-textfield{width:420px;overflow:hidden;}div.fmc-load-container .fmc-load-wpt__label{font-size:16px;font-family:"Helvetica", "Arial", sans-serif;float:left;padding:21px 10px;}div.fmc-load-container .fmc-load-wpt__label .material-icons{vertical-align:middle;}div.fmc-load-container button.load-wpt{margin-top:-60px;}div.fmc-load-container .fmc-generate-rte-container{margin-left:10px;}div.fmc-load-container .fmc-generate-rte-container textarea{resize:none;font-family:monospace;}button.interactive.load-tab{float:right;}';
  }),
  define("minify!style/log.css", function () {
    return "div.fmc-log-container{max-height:265px;overflow:auto;}div.fmc-log-container table{border:none;}div.fmc-log-container tr:hover{background-color:initial !important;}div.fmc-log-container th{text-align:left;}div.fmc-log-container td{text-align:left;border:none;padding:0 18px;height:22px;}div.fmc-log-container .log-data{height:22px;}div.fmc-log-container .time-col,div.fmc-log-container .spd-col,div.fmc-log-container .hdg-col,div.fmc-log-container .alt-col{width:75px;}div.fmc-log-container .lat-col,div.fmc-log-container .lon-col{width:90px;}div.fmc-log-container .fps-col{width:60px}div.fmc-log-container .oth-col{width:130px;}";
  }),
  define(
    "style/main",
    [
      "minify!./button.css",
      "minify!./externaldist.css",
      "minify!./modal.css",
      "minify!./route.css",
      "minify!./waypoints.css",
      "minify!./dep-arr.css",
      "minify!./legs.css",
      "minify!./vnav.css",
      "minify!./ils.css",
      "minify!./progress.css",
      "minify!./map.css",
      "minify!./load.css",
      "minify!./log.css",
    ],
    function (t, e, n, a, i, r, o, s, l, c, d, u, f) {
      return [t, e, n, a, i, r, o, s, l, c, d, u, f].join("");
    }
  ),
  define(
    "ui/position",
    [
      "./elements",
      "minify!html/button.html",
      "minify!html/externaldist.html",
      "minify!html/modal.html",
      "html/tab-contents/main",
      "style/main",
    ],
    function (t, e, n, a, i, r) {
      return new Promise(function (o) {
        $("<style>").addClass("fmc-stylesheet").text(r).appendTo("head"),
          $(a).appendTo("body"),
          $(i).appendTo(t.container.modalContent),
          $(e).insertAfter(
            'button.geofs-f-standard-ui[data-toggle-panel=".geofs-map-list"]'
          ),
          $(n).appendTo(".geofs-ui-bottom"),
          o();
      });
    }
  ),
  define("redefine", ["debug", "log"], function (t, e) {
    (window.geofs.resetFlight = function () {
      window.confirm("Reset Flight?") &&
        window.geofs.lastFlightCoordinates &&
        (window.geofs.flyTo(window.geofs.lastFlightCoordinates, !0),
        e.update("Flight reset"));
    }),
      (window.geofs.togglePause = function () {
        window.geofs.pause
          ? (window.geofs.undoPause(), e.update("Flight resumed"))
          : (e.update("Flight paused"), window.geofs.doPause());
      }),
      (window.controls.setters.setGear.set = function () {
        (window.geofs.aircraft.instance.groundContact &&
          !window.geofs.debug.on) ||
          (0 === window.controls.gear.target
            ? ((window.controls.gear.target = 1), e.update("Gear up"))
            : ((window.controls.gear.target = 0), e.update("Gear down")),
          window.controls.setPartAnimationDelta(window.controls.gear));
      }),
      (window.controls.setters.setFlapsUp.set = function () {
        window.controls.flaps.target > 0 &&
          (window.controls.flaps.target--,
          window.geofs.aircraft.instance.setup.flapsPositions
            ? ((window.controls.flaps.positionTarget =
                window.geofs.aircraft.instance.setup.flapsPositions[
                  window.controls.flaps.target
                ]),
              e.update(
                "Flaps raised to " + window.controls.flaps.positionTarget
              ))
            : e.update("Flaps raised to " + window.controls.flaps.target),
          window.controls.setPartAnimationDelta(window.controls.flaps));
      }),
      (window.controls.setters.setFlapsDown.set = function () {
        window.controls.flaps.target <
          window.geofs.aircraft.instance.setup.flapsSteps &&
          (window.controls.flaps.target++,
          window.geofs.aircraft.instance.setup.flapsPositions
            ? ((window.controls.flaps.positionTarget =
                window.geofs.aircraft.instance.setup.flapsPositions[
                  window.controls.flaps.target
                ]),
              e.update(
                "Flaps lowered to " + window.controls.flaps.positionTarget
              ))
            : e.update("Flaps lowered to " + window.controls.flaps.target),
          window.controls.setPartAnimationDelta(window.controls.flaps));
      });
  }),
  define(
    "ui/main",
    [
      "knockout",
      "./ViewModel",
      "./position",
      "debug",
      "log",
      "waypoints",
      "nav/progress",
      "./elements",
      "redefine",
    ],
    function (t, e, n, a, i, r, o, s) {
      function l() {
        var n = s.modal,
          a = s.container,
          l = s.btn,
          c = new e();
        t.applyBindings(c, $(n)[0]),
          t.applyBindings(c, $(l.fmcBtn)[1]),
          t.applyBindings(c, $(a.uiBottomProgInfo)[0]),
          r.addWaypoint(),
          $(n).keydown(function (t) {
            (27 !== t.which && 27 !== t.keyCode) ||
              !$(this).is(":visible") ||
              $(n).removeClass("opened");
          }),
          $(a.tabBar).on("click", "a", function (t) {
            t.preventDefault();
            var e = "is-active",
              n = $(this),
              i = $(a.tabBar).find("." + e),
              r = n.attr("interactive");
            $(l.interactive).removeClass(e),
              r && $(r).addClass(e),
              $(a.modalContent).find(i.attr("to")).removeClass(e),
              $(a.modalContent).find(n.attr("to")).addClass(e),
              i.removeClass(e),
              n.addClass(e);
          }),
          (o.timer = setInterval(function () {
            o.update();
          }, 5e3)),
          (i.mainTimer = setInterval(function () {
            i.update();
          }, 3e4)),
          (i.speedTimer = setInterval(function () {
            i.speed();
          }, 15e3));
      }
      n.then(l);
    }
  ),
  (function () {
    if (!window.Promise) throw new Error("Browser is outdated.");
    var t = setInterval(function () {
      window.L &&
        window.geofs &&
        window.geofs.aircraft &&
        window.geofs.aircraft.instance &&
        window.geofs.aircraft.instance.object3d &&
        1 == window.navData.statusCode &&
        window.autopilot_pp.ready &&
        (clearInterval(t), require(["ui/main"]));
    }, 250);
  })(),
  define("init", function () {});
var a = (window.fmc = {});
a.version = "0.6.0";
a.require = require;
a.requirejs = requirejs;
a.define = define;