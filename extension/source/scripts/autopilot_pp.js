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
 * Modified version based on the following code:
 * @license text 2.0.15 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/text/LICENSE
 */

/*!
 * @license Copyright (c) Karl Cheng 2013-17
 * Licensed under the GNU General Public Licence, version 3 or later.
 * See the LICENSE.md file for details.
 */

var requirejs, require, define;
!(function (global, setTimeout) {
  function commentReplace(e, n) {
    return n || "";
  }
  function isFunction(e) {
    return "[object Function]" === ostring.call(e);
  }
  function isArray(e) {
    return "[object Array]" === ostring.call(e);
  }
  function each(e, n) {
    if (e) {
      var t;
      for (t = 0; t < e.length && (!e[t] || !n(e[t], t, e)); t += 1);
    }
  }
  function eachReverse(e, n) {
    if (e) {
      var t;
      for (t = e.length - 1; t > -1 && (!e[t] || !n(e[t], t, e)); t -= 1);
    }
  }
  function hasProp(e, n) {
    return hasOwn.call(e, n);
  }
  function getOwn(e, n) {
    return hasProp(e, n) && e[n];
  }
  function eachProp(e, n) {
    var t;
    for (t in e) if (hasProp(e, t) && n(e[t], t)) break;
  }
  function mixin(e, n, t, i) {
    return (
      n &&
        eachProp(n, function (n, a) {
          (!t && hasProp(e, a)) ||
            (!i ||
            "object" != typeof n ||
            !n ||
            isArray(n) ||
            isFunction(n) ||
            n instanceof RegExp
              ? (e[a] = n)
              : (e[a] || (e[a] = {}), mixin(e[a], n, t, i)));
        }),
      e
    );
  }
  function bind(e, n) {
    return function () {
      return n.apply(e, arguments);
    };
  }
  function scripts() {
    return document.getElementsByTagName("script");
  }
  function defaultOnError(e) {
    throw e;
  }
  function getGlobal(e) {
    if (!e) return e;
    var n = global;
    return (
      each(e.split("."), function (e) {
        n = n[e];
      }),
      n
    );
  }
  function makeError(e, n, t, i) {
    var a = new Error(n + "\nhttps://requirejs.org/docs/errors.html#" + e);
    return (
      (a.requireType = e), (a.requireModules = i), t && (a.originalError = t), a
    );
  }
  function newContext(e) {
    function n(e) {
      var n, t;
      for (n = 0; n < e.length; n++)
        if ("." === (t = e[n])) e.splice(n, 1), (n -= 1);
        else if (".." === t) {
          if (0 === n || (1 === n && ".." === e[2]) || ".." === e[n - 1])
            continue;
          n > 0 && (e.splice(n - 1, 2), (n -= 2));
        }
    }
    function t(e, t, i) {
      var a,
        o,
        r,
        A,
        s,
        c,
        u,
        l,
        g,
        f,
        d,
        h = t && t.split("/"),
        p = b.map,
        m = p && p["*"];
      if (
        (e &&
          ((e = e.split("/")),
          (c = e.length - 1),
          b.nodeIdCompat &&
            jsSuffixRegExp.test(e[c]) &&
            (e[c] = e[c].replace(jsSuffixRegExp, "")),
          "." === e[0].charAt(0) &&
            h &&
            ((d = h.slice(0, h.length - 1)), (e = d.concat(e))),
          n(e),
          (e = e.join("/"))),
        i && p && (h || m))
      ) {
        o = e.split("/");
        e: for (r = o.length; r > 0; r -= 1) {
          if (((s = o.slice(0, r).join("/")), h))
            for (A = h.length; A > 0; A -= 1)
              if (
                (a = getOwn(p, h.slice(0, A).join("/"))) &&
                (a = getOwn(a, s))
              ) {
                (u = a), (l = r);
                break e;
              }
          !g && m && getOwn(m, s) && ((g = getOwn(m, s)), (f = r));
        }
        !u && g && ((u = g), (l = f)),
          u && (o.splice(0, l, u), (e = o.join("/")));
      }
      return getOwn(b.pkgs, e) || e;
    }
    function i(e) {
      isBrowser &&
        each(scripts(), function (n) {
          if (
            n.getAttribute("data-requiremodule") === e &&
            n.getAttribute("data-requirecontext") === w.contextName
          )
            return n.parentNode.removeChild(n), !0;
        });
    }
    function a(e) {
      var n = getOwn(b.paths, e);
      if (n && isArray(n) && n.length > 1)
        return (
          n.shift(),
          w.require.undef(e),
          w.makeRequire(null, { skipMap: !0 })([e]),
          !0
        );
    }
    function o(e) {
      var n,
        t = e ? e.indexOf("!") : -1;
      return (
        t > -1 && ((n = e.substring(0, t)), (e = e.substring(t + 1, e.length))),
        [n, e]
      );
    }
    function r(e, n, i, a) {
      var r,
        A,
        s,
        c,
        u = null,
        l = n ? n.name : null,
        g = e,
        f = !0,
        d = "";
      return (
        e || ((f = !1), (e = "_@r" + (G += 1))),
        (c = o(e)),
        (u = c[0]),
        (e = c[1]),
        u && ((u = t(u, l, a)), (A = getOwn(y, u))),
        e &&
          (u
            ? (d = i
                ? e
                : A && A.normalize
                ? A.normalize(e, function (e) {
                    return t(e, l, a);
                  })
                : -1 === e.indexOf("!")
                ? t(e, l, a)
                : e)
            : ((d = t(e, l, a)),
              (c = o(d)),
              (u = c[0]),
              (d = c[1]),
              (i = !0),
              (r = w.nameToUrl(d)))),
        (s = !u || A || i ? "" : "_unnormalized" + (Y += 1)),
        {
          prefix: u,
          name: d,
          parentMap: n,
          unnormalized: !!s,
          url: r,
          originalName: g,
          isDefine: f,
          id: (u ? u + "!" + d : d) + s,
        }
      );
    }
    function A(e) {
      var n = e.id,
        t = getOwn(C, n);
      return t || (t = C[n] = new w.Module(e)), t;
    }
    function s(e, n, t) {
      var i = e.id,
        a = getOwn(C, i);
      !hasProp(y, i) || (a && !a.defineEmitComplete)
        ? ((a = A(e)), a.error && "error" === n ? t(a.error) : a.on(n, t))
        : "defined" === n && t(y[i]);
    }
    function c(e, n) {
      var t = e.requireModules,
        i = !1;
      n
        ? n(e)
        : (each(t, function (n) {
            var t = getOwn(C, n);
            t &&
              ((t.error = e), t.events.error && ((i = !0), t.emit("error", e)));
          }),
          i || req.onError(e));
    }
    function u() {
      globalDefQueue.length &&
        (each(globalDefQueue, function (e) {
          var n = e[0];
          "string" == typeof n && (w.defQueueMap[n] = !0), I.push(e);
        }),
        (globalDefQueue = []));
    }
    function l(e) {
      delete C[e], delete v[e];
    }
    function g(e, n, t) {
      var i = e.map.id;
      e.error
        ? e.emit("error", e.error)
        : ((n[i] = !0),
          each(e.depMaps, function (i, a) {
            var o = i.id,
              r = getOwn(C, o);
            !r ||
              e.depMatched[a] ||
              t[o] ||
              (getOwn(n, o) ? (e.defineDep(a, y[o]), e.check()) : g(r, n, t));
          }),
          (t[i] = !0));
    }
    function f() {
      var e,
        n,
        t = 1e3 * b.waitSeconds,
        o = t && w.startTime + t < new Date().getTime(),
        r = [],
        A = [],
        s = !1,
        u = !0;
      if (!B) {
        if (
          ((B = !0),
          eachProp(v, function (e) {
            var t = e.map,
              c = t.id;
            if (e.enabled && (t.isDefine || A.push(e), !e.error))
              if (!e.inited && o)
                a(c) ? ((n = !0), (s = !0)) : (r.push(c), i(c));
              else if (
                !e.inited &&
                e.fetched &&
                t.isDefine &&
                ((s = !0), !t.prefix)
              )
                return (u = !1);
          }),
          o && r.length)
        )
          return (
            (e = makeError(
              "timeout",
              "Load timeout for modules: " + r,
              null,
              r
            )),
            (e.contextName = w.contextName),
            c(e)
          );
        u &&
          each(A, function (e) {
            g(e, {}, {});
          }),
          (o && !n) ||
            !s ||
            (!isBrowser && !isWebWorker) ||
            Q ||
            (Q = setTimeout(function () {
              (Q = 0), f();
            }, 50)),
          (B = !1);
      }
    }
    function d(e) {
      hasProp(y, e[0]) || A(r(e[0], null, !0)).init(e[1], e[2]);
    }
    function h(e, n, t, i) {
      e.detachEvent && !isOpera
        ? i && e.detachEvent(i, n)
        : e.removeEventListener(t, n, !1);
    }
    function p(e) {
      var n = e.currentTarget || e.srcElement;
      return (
        h(n, w.onScriptLoad, "load", "onreadystatechange"),
        h(n, w.onScriptError, "error"),
        { node: n, id: n && n.getAttribute("data-requiremodule") }
      );
    }
    function m() {
      var e;
      for (u(); I.length; ) {
        if (((e = I.shift()), null === e[0]))
          return c(
            makeError(
              "mismatch",
              "Mismatched anonymous define() module: " + e[e.length - 1]
            )
          );
        d(e);
      }
      w.defQueueMap = {};
    }
    var B,
      E,
      w,
      M,
      Q,
      b = {
        waitSeconds: 7,
        baseUrl: "./",
        paths: {},
        bundles: {},
        pkgs: {},
        shim: {},
        config: {},
      },
      C = {},
      v = {},
      V = {},
      I = [],
      y = {},
      D = {},
      x = {},
      G = 1,
      Y = 1;
    return (
      (M = {
        require: function (e) {
          return e.require ? e.require : (e.require = w.makeRequire(e.map));
        },
        exports: function (e) {
          if (((e.usingExports = !0), e.map.isDefine))
            return e.exports
              ? (y[e.map.id] = e.exports)
              : (e.exports = y[e.map.id] = {});
        },
        module: function (e) {
          return e.module
            ? e.module
            : (e.module = {
                id: e.map.id,
                uri: e.map.url,
                config: function () {
                  return getOwn(b.config, e.map.id) || {};
                },
                exports: e.exports || (e.exports = {}),
              });
        },
      }),
      (E = function (e) {
        (this.events = getOwn(V, e.id) || {}),
          (this.map = e),
          (this.shim = getOwn(b.shim, e.id)),
          (this.depExports = []),
          (this.depMaps = []),
          (this.depMatched = []),
          (this.pluginMaps = {}),
          (this.depCount = 0);
      }),
      (E.prototype = {
        init: function (e, n, t, i) {
          (i = i || {}),
            this.inited ||
              ((this.factory = n),
              t
                ? this.on("error", t)
                : this.events.error &&
                  (t = bind(this, function (e) {
                    this.emit("error", e);
                  })),
              (this.depMaps = e && e.slice(0)),
              (this.errback = t),
              (this.inited = !0),
              (this.ignore = i.ignore),
              i.enabled || this.enabled ? this.enable() : this.check());
        },
        defineDep: function (e, n) {
          this.depMatched[e] ||
            ((this.depMatched[e] = !0),
            (this.depCount -= 1),
            (this.depExports[e] = n));
        },
        fetch: function () {
          if (!this.fetched) {
            (this.fetched = !0), (w.startTime = new Date().getTime());
            var e = this.map;
            if (!this.shim) return e.prefix ? this.callPlugin() : this.load();
            w.makeRequire(this.map, { enableBuildCallback: !0 })(
              this.shim.deps || [],
              bind(this, function () {
                return e.prefix ? this.callPlugin() : this.load();
              })
            );
          }
        },
        load: function () {
          var e = this.map.url;
          D[e] || ((D[e] = !0), w.load(this.map.id, e));
        },
        check: function () {
          if (this.enabled && !this.enabling) {
            var e,
              n,
              t = this.map.id,
              i = this.depExports,
              a = this.exports,
              o = this.factory;
            if (this.inited) {
              if (this.error) this.emit("error", this.error);
              else if (!this.defining) {
                if (
                  ((this.defining = !0), this.depCount < 1 && !this.defined)
                ) {
                  if (isFunction(o)) {
                    if (
                      (this.events.error && this.map.isDefine) ||
                      req.onError !== defaultOnError
                    )
                      try {
                        a = w.execCb(t, o, i, a);
                      } catch (n) {
                        e = n;
                      }
                    else a = w.execCb(t, o, i, a);
                    if (
                      (this.map.isDefine &&
                        void 0 === a &&
                        ((n = this.module),
                        n
                          ? (a = n.exports)
                          : this.usingExports && (a = this.exports)),
                      e)
                    )
                      return (
                        (e.requireMap = this.map),
                        (e.requireModules = this.map.isDefine
                          ? [this.map.id]
                          : null),
                        (e.requireType = this.map.isDefine
                          ? "define"
                          : "require"),
                        c((this.error = e))
                      );
                  } else a = o;
                  if (
                    ((this.exports = a),
                    this.map.isDefine &&
                      !this.ignore &&
                      ((y[t] = a), req.onResourceLoad))
                  ) {
                    var r = [];
                    each(this.depMaps, function (e) {
                      r.push(e.normalizedMap || e);
                    }),
                      req.onResourceLoad(w, this.map, r);
                  }
                  l(t), (this.defined = !0);
                }
                (this.defining = !1),
                  this.defined &&
                    !this.defineEmitted &&
                    ((this.defineEmitted = !0),
                    this.emit("defined", this.exports),
                    (this.defineEmitComplete = !0));
              }
            } else hasProp(w.defQueueMap, t) || this.fetch();
          }
        },
        callPlugin: function () {
          var e = this.map,
            n = e.id,
            i = r(e.prefix);
          this.depMaps.push(i),
            s(
              i,
              "defined",
              bind(this, function (i) {
                var a,
                  o,
                  u,
                  g = getOwn(x, this.map.id),
                  f = this.map.name,
                  d = this.map.parentMap ? this.map.parentMap.name : null,
                  h = w.makeRequire(e.parentMap, { enableBuildCallback: !0 });
                return this.map.unnormalized
                  ? (i.normalize &&
                      (f =
                        i.normalize(f, function (e) {
                          return t(e, d, !0);
                        }) || ""),
                    (o = r(e.prefix + "!" + f, this.map.parentMap, !0)),
                    s(
                      o,
                      "defined",
                      bind(this, function (e) {
                        (this.map.normalizedMap = o),
                          this.init(
                            [],
                            function () {
                              return e;
                            },
                            null,
                            { enabled: !0, ignore: !0 }
                          );
                      })
                    ),
                    void (
                      (u = getOwn(C, o.id)) &&
                      (this.depMaps.push(o),
                      this.events.error &&
                        u.on(
                          "error",
                          bind(this, function (e) {
                            this.emit("error", e);
                          })
                        ),
                      u.enable())
                    ))
                  : g
                  ? ((this.map.url = w.nameToUrl(g)), void this.load())
                  : ((a = bind(this, function (e) {
                      this.init(
                        [],
                        function () {
                          return e;
                        },
                        null,
                        { enabled: !0 }
                      );
                    })),
                    (a.error = bind(this, function (e) {
                      (this.inited = !0),
                        (this.error = e),
                        (e.requireModules = [n]),
                        eachProp(C, function (e) {
                          0 === e.map.id.indexOf(n + "_unnormalized") &&
                            l(e.map.id);
                        }),
                        c(e);
                    })),
                    (a.fromText = bind(this, function (t, i) {
                      var o = e.name,
                        s = r(o),
                        u = useInteractive;
                      i && (t = i),
                        u && (useInteractive = !1),
                        A(s),
                        hasProp(b.config, n) && (b.config[o] = b.config[n]);
                      try {
                        req.exec(t);
                      } catch (e) {
                        return c(
                          makeError(
                            "fromtexteval",
                            "fromText eval for " + n + " failed: " + e,
                            e,
                            [n]
                          )
                        );
                      }
                      u && (useInteractive = !0),
                        this.depMaps.push(s),
                        w.completeLoad(o),
                        h([o], a);
                    })),
                    void i.load(e.name, h, a, b));
              })
            ),
            w.enable(i, this),
            (this.pluginMaps[i.id] = i);
        },
        enable: function () {
          (v[this.map.id] = this),
            (this.enabled = !0),
            (this.enabling = !0),
            each(
              this.depMaps,
              bind(this, function (e, n) {
                var t, i, a;
                if ("string" == typeof e) {
                  if (
                    ((e = r(
                      e,
                      this.map.isDefine ? this.map : this.map.parentMap,
                      !1,
                      !this.skipMap
                    )),
                    (this.depMaps[n] = e),
                    (a = getOwn(M, e.id)))
                  )
                    return void (this.depExports[n] = a(this));
                  (this.depCount += 1),
                    s(
                      e,
                      "defined",
                      bind(this, function (e) {
                        this.undefed || (this.defineDep(n, e), this.check());
                      })
                    ),
                    this.errback
                      ? s(e, "error", bind(this, this.errback))
                      : this.events.error &&
                        s(
                          e,
                          "error",
                          bind(this, function (e) {
                            this.emit("error", e);
                          })
                        );
                }
                (t = e.id),
                  (i = C[t]),
                  hasProp(M, t) || !i || i.enabled || w.enable(e, this);
              })
            ),
            eachProp(
              this.pluginMaps,
              bind(this, function (e) {
                var n = getOwn(C, e.id);
                n && !n.enabled && w.enable(e, this);
              })
            ),
            (this.enabling = !1),
            this.check();
        },
        on: function (e, n) {
          var t = this.events[e];
          t || (t = this.events[e] = []), t.push(n);
        },
        emit: function (e, n) {
          each(this.events[e], function (e) {
            e(n);
          }),
            "error" === e && delete this.events[e];
        },
      }),
      (w = {
        config: b,
        contextName: e,
        registry: C,
        defined: y,
        urlFetched: D,
        defQueue: I,
        defQueueMap: {},
        Module: E,
        makeModuleMap: r,
        nextTick: req.nextTick,
        onError: c,
        configure: function (e) {
          if (
            (e.baseUrl &&
              "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) &&
              (e.baseUrl += "/"),
            "string" == typeof e.urlArgs)
          ) {
            var n = e.urlArgs;
            e.urlArgs = function (e, t) {
              return (-1 === t.indexOf("?") ? "?" : "&") + n;
            };
          }
          var t = b.shim,
            i = { paths: !0, bundles: !0, config: !0, map: !0 };
          eachProp(e, function (e, n) {
            i[n] ? (b[n] || (b[n] = {}), mixin(b[n], e, !0, !0)) : (b[n] = e);
          }),
            e.bundles &&
              eachProp(e.bundles, function (e, n) {
                each(e, function (e) {
                  e !== n && (x[e] = n);
                });
              }),
            e.shim &&
              (eachProp(e.shim, function (e, n) {
                isArray(e) && (e = { deps: e }),
                  (!e.exports && !e.init) ||
                    e.exportsFn ||
                    (e.exportsFn = w.makeShimExports(e)),
                  (t[n] = e);
              }),
              (b.shim = t)),
            e.packages &&
              each(e.packages, function (e) {
                var n, t;
                (e = "string" == typeof e ? { name: e } : e),
                  (t = e.name),
                  (n = e.location),
                  n && (b.paths[t] = e.location),
                  (b.pkgs[t] =
                    e.name +
                    "/" +
                    (e.main || "main")
                      .replace(currDirRegExp, "")
                      .replace(jsSuffixRegExp, ""));
              }),
            eachProp(C, function (e, n) {
              e.inited || e.map.unnormalized || (e.map = r(n, null, !0));
            }),
            (e.deps || e.callback) && w.require(e.deps || [], e.callback);
        },
        makeShimExports: function (e) {
          function n() {
            var n;
            return (
              e.init && (n = e.init.apply(global, arguments)),
              n || (e.exports && getGlobal(e.exports))
            );
          }
          return n;
        },
        makeRequire: function (n, a) {
          function o(t, i, s) {
            var u, l, g;
            return (
              a.enableBuildCallback &&
                i &&
                isFunction(i) &&
                (i.__requireJsBuild = !0),
              "string" == typeof t
                ? isFunction(i)
                  ? c(makeError("requireargs", "Invalid require call"), s)
                  : n && hasProp(M, t)
                  ? M[t](C[n.id])
                  : req.get
                  ? req.get(w, t, n, o)
                  : ((l = r(t, n, !1, !0)),
                    (u = l.id),
                    hasProp(y, u)
                      ? y[u]
                      : c(
                          makeError(
                            "notloaded",
                            'Module name "' +
                              u +
                              '" has not been loaded yet for context: ' +
                              e +
                              (n ? "" : ". Use require([])")
                          )
                        ))
                : (m(),
                  w.nextTick(function () {
                    m(),
                      (g = A(r(null, n))),
                      (g.skipMap = a.skipMap),
                      g.init(t, i, s, { enabled: !0 }),
                      f();
                  }),
                  o)
            );
          }
          return (
            (a = a || {}),
            mixin(o, {
              isBrowser: isBrowser,
              toUrl: function (e) {
                var i,
                  a = e.lastIndexOf("."),
                  o = e.split("/")[0],
                  r = "." === o || ".." === o;
                return (
                  -1 !== a &&
                    (!r || a > 1) &&
                    ((i = e.substring(a, e.length)), (e = e.substring(0, a))),
                  w.nameToUrl(t(e, n && n.id, !0), i, !0)
                );
              },
              defined: function (e) {
                return hasProp(y, r(e, n, !1, !0).id);
              },
              specified: function (e) {
                return (e = r(e, n, !1, !0).id), hasProp(y, e) || hasProp(C, e);
              },
            }),
            n ||
              (o.undef = function (e) {
                u();
                var t = r(e, n, !0),
                  a = getOwn(C, e);
                (a.undefed = !0),
                  i(e),
                  delete y[e],
                  delete D[t.url],
                  delete V[e],
                  eachReverse(I, function (n, t) {
                    n[0] === e && I.splice(t, 1);
                  }),
                  delete w.defQueueMap[e],
                  a && (a.events.defined && (V[e] = a.events), l(e));
              }),
            o
          );
        },
        enable: function (e) {
          getOwn(C, e.id) && A(e).enable();
        },
        completeLoad: function (e) {
          var n,
            t,
            i,
            o = getOwn(b.shim, e) || {},
            r = o.exports;
          for (u(); I.length; ) {
            if (((t = I.shift()), null === t[0])) {
              if (((t[0] = e), n)) break;
              n = !0;
            } else t[0] === e && (n = !0);
            d(t);
          }
          if (
            ((w.defQueueMap = {}),
            (i = getOwn(C, e)),
            !n && !hasProp(y, e) && i && !i.inited)
          ) {
            if (!(!b.enforceDefine || (r && getGlobal(r))))
              return a(e)
                ? void 0
                : c(
                    makeError("nodefine", "No define call for " + e, null, [e])
                  );
            d([e, o.deps || [], o.exportsFn]);
          }
          f();
        },
        nameToUrl: function (e, n, t) {
          var i,
            a,
            o,
            r,
            A,
            s,
            c,
            u = getOwn(b.pkgs, e);
          if ((u && (e = u), (c = getOwn(x, e)))) return w.nameToUrl(c, n, t);
          if (req.jsExtRegExp.test(e)) A = e + (n || "");
          else {
            for (i = b.paths, a = e.split("/"), o = a.length; o > 0; o -= 1)
              if (((r = a.slice(0, o).join("/")), (s = getOwn(i, r)))) {
                isArray(s) && (s = s[0]), a.splice(0, o, s);
                break;
              }
            (A = a.join("/")),
              (A += n || (/^data\:|^blob\:|\?/.test(A) || t ? "" : ".js")),
              (A =
                ("/" === A.charAt(0) || A.match(/^[\w\+\.\-]+:/)
                  ? ""
                  : b.baseUrl) + A);
          }
          return b.urlArgs && !/^blob\:/.test(A) ? A + b.urlArgs(e, A) : A;
        },
        load: function (e, n) {
          req.load(w, e, n);
        },
        execCb: function (e, n, t, i) {
          return n.apply(i, t);
        },
        onScriptLoad: function (e) {
          if (
            "load" === e.type ||
            readyRegExp.test((e.currentTarget || e.srcElement).readyState)
          ) {
            interactiveScript = null;
            var n = p(e);
            w.completeLoad(n.id);
          }
        },
        onScriptError: function (e) {
          var n = p(e);
          if (!a(n.id)) {
            var t = [];
            return (
              eachProp(C, function (e, i) {
                0 !== i.indexOf("_@r") &&
                  each(e.depMaps, function (e) {
                    if (e.id === n.id) return t.push(i), !0;
                  });
              }),
              c(
                makeError(
                  "scripterror",
                  'Script error for "' +
                    n.id +
                    (t.length ? '", needed by: ' + t.join(", ") : '"'),
                  e,
                  [n.id]
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
      : (eachReverse(scripts(), function (e) {
          if ("interactive" === e.readyState) return (interactiveScript = e);
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
        function (e, n, t, i) {
          var a,
            o,
            r = defContextName;
          return (
            isArray(e) ||
              "string" == typeof e ||
              ((o = e), isArray(n) ? ((e = n), (n = t), (t = i)) : (e = [])),
            o && o.context && (r = o.context),
            (a = getOwn(contexts, r)),
            a || (a = contexts[r] = req.s.newContext(r)),
            o && a.configure(o),
            a.require(e, n, t)
          );
        }),
      (req.config = function (e) {
        return req(e);
      }),
      (req.nextTick =
        void 0 !== setTimeout
          ? function (e) {
              setTimeout(e, 4);
            }
          : function (e) {
              e();
            }),
      require || (require = req),
      (req.version = version),
      (req.jsExtRegExp = /^\/|:|\?|\.js$/),
      (req.isBrowser = isBrowser),
      (s = req.s = { contexts: contexts, newContext: newContext }),
      req({}),
      each(["toUrl", "undef", "defined", "specified"], function (e) {
        req[e] = function () {
          var n = contexts[defContextName];
          return n.require[e].apply(n, arguments);
        };
      }),
      isBrowser &&
        ((head = s.head = document.getElementsByTagName("head")[0]),
        (baseElement = document.getElementsByTagName("base")[0]) &&
          (head = s.head = baseElement.parentNode)),
      (req.onError = defaultOnError),
      (req.createNode = function (e, n, t) {
        var i = e.xhtml
          ? document.createElementNS(
              "http://www.w3.org/1999/xhtml",
              "html:script"
            )
          : document.createElement("script");
        return (
          (i.type = e.scriptType || "text/javascript"),
          (i.charset = "utf-8"),
          (i.async = !0),
          i
        );
      }),
      (req.load = function (e, n, t) {
        var i,
          a = (e && e.config) || {};
        if (isBrowser)
          return (
            (i = req.createNode(a, n, t)),
            i.setAttribute("data-requirecontext", e.contextName),
            i.setAttribute("data-requiremodule", n),
            !i.attachEvent ||
            (i.attachEvent.toString &&
              i.attachEvent.toString().indexOf("[native code") < 0) ||
            isOpera
              ? (i.addEventListener("load", e.onScriptLoad, !1),
                i.addEventListener("error", e.onScriptError, !1))
              : ((useInteractive = !0),
                i.attachEvent("onreadystatechange", e.onScriptLoad)),
            (i.src = t),
            a.onNodeCreated && a.onNodeCreated(i, a, n, t),
            (currentlyAddingScript = i),
            baseElement
              ? head.insertBefore(i, baseElement)
              : head.appendChild(i),
            (currentlyAddingScript = null),
            i
          );
        if (isWebWorker)
          try {
            setTimeout(function () {}, 0), importScripts(t), e.completeLoad(n);
          } catch (i) {
            e.onError(
              makeError(
                "importscripts",
                "importScripts failed for " + n + " at " + t,
                i,
                [n]
              )
            );
          }
      }),
      isBrowser &&
        !cfg.skipDataMain &&
        eachReverse(scripts(), function (e) {
          if (
            (head || (head = e.parentNode),
            (dataMain = e.getAttribute("data-main")))
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
      (define = function (e, n, t) {
        var i, a;
        "string" != typeof e && ((t = n), (n = e), (e = null)),
          isArray(n) || ((t = n), (n = null)),
          !n &&
            isFunction(t) &&
            ((n = []),
            t.length &&
              (t
                .toString()
                .replace(commentRegExp, commentReplace)
                .replace(cjsRequireRegExp, function (e, t) {
                  n.push(t);
                }),
              (n = (
                1 === t.length ? ["require"] : ["require", "exports", "module"]
              ).concat(n)))),
          useInteractive &&
            (i = currentlyAddingScript || getInteractiveScript()) &&
            (e || (e = i.getAttribute("data-requiremodule")),
            (a = contexts[i.getAttribute("data-requirecontext")])),
          a
            ? (a.defQueue.push([e, n, t]), (a.defQueueMap[e] = !0))
            : globalDefQueue.push([e, n, t]);
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
    !(function (e) {
      var n = this || (0, eval)("this"),
        t = n.document,
        i = n.navigator,
        a = n.jQuery,
        o = n.JSON;
      a || "undefined" == typeof jQuery || (a = jQuery),
        (function (e) {
          "function" == typeof define && define.amd
            ? define("knockout", ["exports", "require"], e)
            : e(
                "object" == typeof exports && "object" == typeof module
                  ? module.exports || exports
                  : (n.ko = {})
              );
        })(function (r, A) {
          function s(e, n) {
            return (null === e || typeof e in h) && e === n;
          }
          function c(n, t) {
            var i;
            return function () {
              i ||
                (i = d.a.setTimeout(function () {
                  (i = e), n();
                }, t));
            };
          }
          function u(e, n) {
            var t;
            return function () {
              clearTimeout(t), (t = d.a.setTimeout(e, n));
            };
          }
          function l(e, n) {
            n && "change" !== n
              ? "beforeChange" === n
                ? this.pc(e)
                : this.gb(e, n)
              : this.qc(e);
          }
          function g(e, n) {
            null !== n && n.s && n.s();
          }
          function f(e, n) {
            var t = this.qd,
              i = t[w];
            i.ra ||
              (this.Qb && this.mb[n]
                ? (t.uc(n, e, this.mb[n]), (this.mb[n] = null), --this.Qb)
                : i.I[n] || t.uc(n, e, i.J ? { da: e } : t.$c(e)),
              e.Ja && e.gd());
          }
          var d = void 0 !== r ? r : {};
          (d.b = function (e, n) {
            for (var t = e.split("."), i = d, a = 0; a < t.length - 1; a++)
              i = i[t[a]];
            i[t[t.length - 1]] = n;
          }),
            (d.L = function (e, n, t) {
              e[n] = t;
            }),
            (d.version = "3.5.1"),
            d.b("version", d.version),
            (d.options = {
              deferUpdates: !1,
              useOnlyNativeEvents: !1,
              foreachHidesDestroyed: !1,
            }),
            (d.a = (function () {
              function r(e, n) {
                for (var t in e) u.call(e, t) && n(t, e[t]);
              }
              function A(e, n) {
                if (n) for (var t in n) u.call(n, t) && (e[t] = n[t]);
                return e;
              }
              function s(e, n) {
                return (e.__proto__ = n), e;
              }
              function c(e, n, t, i) {
                var a = e[n].match(E) || [];
                d.a.D(t.match(E), function (e) {
                  d.a.Na(a, e, i);
                }),
                  (e[n] = a.join(" "));
              }
              var u = Object.prototype.hasOwnProperty,
                l = { __proto__: [] } instanceof Array,
                g = "function" == typeof Symbol,
                f = {},
                h = {};
              (f[
                i && /Firefox\/2/i.test(i.userAgent)
                  ? "KeyboardEvent"
                  : "UIEvents"
              ] = ["keyup", "keydown", "keypress"]),
                (f.MouseEvents =
                  "click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(
                    " "
                  )),
                r(f, function (e, n) {
                  if (n.length)
                    for (var t = 0, i = n.length; t < i; t++) h[n[t]] = e;
                });
              var p,
                m = { propertychange: !0 },
                B =
                  t &&
                  (function () {
                    for (
                      var n = 3,
                        i = t.createElement("div"),
                        a = i.getElementsByTagName("i");
                      (i.innerHTML =
                        "\x3c!--[if gt IE " + ++n + "]><i></i><![endif]--\x3e"),
                        a[0];

                    );
                    return 4 < n ? n : e;
                  })(),
                E = /\S+/g;
              return {
                Jc: [
                  "authenticity_token",
                  /^__RequestVerificationToken(_.*)?$/,
                ],
                D: function (e, n, t) {
                  for (var i = 0, a = e.length; i < a; i++)
                    n.call(t, e[i], i, e);
                },
                A:
                  "function" == typeof Array.prototype.indexOf
                    ? function (e, n) {
                        return Array.prototype.indexOf.call(e, n);
                      }
                    : function (e, n) {
                        for (var t = 0, i = e.length; t < i; t++)
                          if (e[t] === n) return t;
                        return -1;
                      },
                Lb: function (n, t, i) {
                  for (var a = 0, o = n.length; a < o; a++)
                    if (t.call(i, n[a], a, n)) return n[a];
                  return e;
                },
                Pa: function (e, n) {
                  var t = d.a.A(e, n);
                  0 < t ? e.splice(t, 1) : 0 === t && e.shift();
                },
                wc: function (e) {
                  var n = [];
                  return (
                    e &&
                      d.a.D(e, function (e) {
                        0 > d.a.A(n, e) && n.push(e);
                      }),
                    n
                  );
                },
                Mb: function (e, n, t) {
                  var i = [];
                  if (e)
                    for (var a = 0, o = e.length; a < o; a++)
                      i.push(n.call(t, e[a], a));
                  return i;
                },
                jb: function (e, n, t) {
                  var i = [];
                  if (e)
                    for (var a = 0, o = e.length; a < o; a++)
                      n.call(t, e[a], a) && i.push(e[a]);
                  return i;
                },
                Nb: function (e, n) {
                  if (n instanceof Array) e.push.apply(e, n);
                  else for (var t = 0, i = n.length; t < i; t++) e.push(n[t]);
                  return e;
                },
                Na: function (e, n, t) {
                  var i = d.a.A(d.a.bc(e), n);
                  0 > i ? t && e.push(n) : t || e.splice(i, 1);
                },
                Ba: l,
                extend: A,
                setPrototypeOf: s,
                Ab: l ? s : A,
                P: r,
                Ga: function (e, n, t) {
                  if (!e) return e;
                  var i,
                    a = {};
                  for (i in e) u.call(e, i) && (a[i] = n.call(t, e[i], i, e));
                  return a;
                },
                Tb: function (e) {
                  for (; e.firstChild; ) d.removeNode(e.firstChild);
                },
                Yb: function (e) {
                  e = d.a.la(e);
                  for (
                    var n = ((e[0] && e[0].ownerDocument) || t).createElement(
                        "div"
                      ),
                      i = 0,
                      a = e.length;
                    i < a;
                    i++
                  )
                    n.appendChild(d.oa(e[i]));
                  return n;
                },
                Ca: function (e, n) {
                  for (var t = 0, i = e.length, a = []; t < i; t++) {
                    var o = e[t].cloneNode(!0);
                    a.push(n ? d.oa(o) : o);
                  }
                  return a;
                },
                va: function (e, n) {
                  if ((d.a.Tb(e), n))
                    for (var t = 0, i = n.length; t < i; t++)
                      e.appendChild(n[t]);
                },
                Xc: function (e, n) {
                  var t = e.nodeType ? [e] : e;
                  if (0 < t.length) {
                    for (
                      var i = t[0], a = i.parentNode, o = 0, r = n.length;
                      o < r;
                      o++
                    )
                      a.insertBefore(n[o], i);
                    for (o = 0, r = t.length; o < r; o++) d.removeNode(t[o]);
                  }
                },
                Ua: function (e, n) {
                  if (e.length) {
                    for (
                      n = (8 === n.nodeType && n.parentNode) || n;
                      e.length && e[0].parentNode !== n;

                    )
                      e.splice(0, 1);
                    for (; 1 < e.length && e[e.length - 1].parentNode !== n; )
                      e.length--;
                    if (1 < e.length) {
                      var t = e[0],
                        i = e[e.length - 1];
                      for (e.length = 0; t !== i; )
                        e.push(t), (t = t.nextSibling);
                      e.push(i);
                    }
                  }
                  return e;
                },
                Zc: function (e, n) {
                  7 > B ? e.setAttribute("selected", n) : (e.selected = n);
                },
                Db: function (n) {
                  return null === n || n === e
                    ? ""
                    : n.trim
                    ? n.trim()
                    : n.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
                },
                Ud: function (e, n) {
                  return (
                    (e = e || ""),
                    !(n.length > e.length) && e.substring(0, n.length) === n
                  );
                },
                vd: function (e, n) {
                  if (e === n) return !0;
                  if (11 === e.nodeType) return !1;
                  if (n.contains)
                    return n.contains(1 !== e.nodeType ? e.parentNode : e);
                  if (n.compareDocumentPosition)
                    return 16 == (16 & n.compareDocumentPosition(e));
                  for (; e && e != n; ) e = e.parentNode;
                  return !!e;
                },
                Sb: function (e) {
                  return d.a.vd(e, e.ownerDocument.documentElement);
                },
                kd: function (e) {
                  return !!d.a.Lb(e, d.a.Sb);
                },
                R: function (e) {
                  return e && e.tagName && e.tagName.toLowerCase();
                },
                Ac: function (e) {
                  return d.onError
                    ? function () {
                        try {
                          return e.apply(this, arguments);
                        } catch (e) {
                          throw (d.onError && d.onError(e), e);
                        }
                      }
                    : e;
                },
                setTimeout: function (e, n) {
                  return setTimeout(d.a.Ac(e), n);
                },
                Gc: function (e) {
                  setTimeout(function () {
                    throw (d.onError && d.onError(e), e);
                  }, 0);
                },
                B: function (e, n, t) {
                  var i = d.a.Ac(t);
                  if (((t = m[n]), d.options.useOnlyNativeEvents || t || !a))
                    if (t || "function" != typeof e.addEventListener) {
                      if (void 0 === e.attachEvent)
                        throw Error(
                          "Browser doesn't support addEventListener or attachEvent"
                        );
                      var o = function (n) {
                          i.call(e, n);
                        },
                        r = "on" + n;
                      e.attachEvent(r, o),
                        d.a.K.za(e, function () {
                          e.detachEvent(r, o);
                        });
                    } else e.addEventListener(n, i, !1);
                  else
                    p || (p = "function" == typeof a(e).on ? "on" : "bind"),
                      a(e)[p](n, i);
                },
                Fb: function (e, i) {
                  if (!e || !e.nodeType)
                    throw Error(
                      "element must be a DOM node when calling triggerEvent"
                    );
                  var o;
                  if (
                    ("input" === d.a.R(e) &&
                    e.type &&
                    "click" == i.toLowerCase()
                      ? ((o = e.type), (o = "checkbox" == o || "radio" == o))
                      : (o = !1),
                    d.options.useOnlyNativeEvents || !a || o)
                  )
                    if ("function" == typeof t.createEvent) {
                      if ("function" != typeof e.dispatchEvent)
                        throw Error(
                          "The supplied element doesn't support dispatchEvent"
                        );
                      (o = t.createEvent(h[i] || "HTMLEvents")),
                        o.initEvent(
                          i,
                          !0,
                          !0,
                          n,
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
                          e
                        ),
                        e.dispatchEvent(o);
                    } else if (o && e.click) e.click();
                    else {
                      if (void 0 === e.fireEvent)
                        throw Error(
                          "Browser doesn't support triggering events"
                        );
                      e.fireEvent("on" + i);
                    }
                  else a(e).trigger(i);
                },
                f: function (e) {
                  return d.O(e) ? e() : e;
                },
                bc: function (e) {
                  return d.O(e) ? e.v() : e;
                },
                Eb: function (e, n, t) {
                  var i;
                  n &&
                    ("object" == typeof e.classList
                      ? ((i = e.classList[t ? "add" : "remove"]),
                        d.a.D(n.match(E), function (n) {
                          i.call(e.classList, n);
                        }))
                      : "string" == typeof e.className.baseVal
                      ? c(e.className, "baseVal", n, t)
                      : c(e, "className", n, t));
                },
                Bb: function (n, t) {
                  var i = d.a.f(t);
                  (null !== i && i !== e) || (i = "");
                  var a = d.h.firstChild(n);
                  !a || 3 != a.nodeType || d.h.nextSibling(a)
                    ? d.h.va(n, [n.ownerDocument.createTextNode(i)])
                    : (a.data = i),
                    d.a.Ad(n);
                },
                Yc: function (e, n) {
                  if (((e.name = n), 7 >= B))
                    try {
                      var i = e.name.replace(/[&<>'"]/g, function (e) {
                        return "&#" + e.charCodeAt(0) + ";";
                      });
                      e.mergeAttributes(
                        t.createElement("<input name='" + i + "'/>"),
                        !1
                      );
                    } catch (e) {}
                },
                Ad: function (e) {
                  9 <= B &&
                    ((e = 1 == e.nodeType ? e : e.parentNode),
                    e.style && (e.style.zoom = e.style.zoom));
                },
                wd: function (e) {
                  if (B) {
                    var n = e.style.width;
                    (e.style.width = 0), (e.style.width = n);
                  }
                },
                Pd: function (e, n) {
                  (e = d.a.f(e)), (n = d.a.f(n));
                  for (var t = [], i = e; i <= n; i++) t.push(i);
                  return t;
                },
                la: function (e) {
                  for (var n = [], t = 0, i = e.length; t < i; t++)
                    n.push(e[t]);
                  return n;
                },
                Da: function (e) {
                  return g ? Symbol(e) : e;
                },
                Zd: 6 === B,
                $d: 7 === B,
                W: B,
                Lc: function (e, n) {
                  for (
                    var t = d.a
                        .la(e.getElementsByTagName("input"))
                        .concat(d.a.la(e.getElementsByTagName("textarea"))),
                      i =
                        "string" == typeof n
                          ? function (e) {
                              return e.name === n;
                            }
                          : function (e) {
                              return n.test(e.name);
                            },
                      a = [],
                      o = t.length - 1;
                    0 <= o;
                    o--
                  )
                    i(t[o]) && a.push(t[o]);
                  return a;
                },
                Nd: function (e) {
                  return "string" == typeof e && (e = d.a.Db(e))
                    ? o && o.parse
                      ? o.parse(e)
                      : new Function("return " + e)()
                    : null;
                },
                hc: function (e, n, t) {
                  if (!o || !o.stringify)
                    throw Error(
                      "Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js"
                    );
                  return o.stringify(d.a.f(e), n, t);
                },
                Od: function (e, n, i) {
                  i = i || {};
                  var a = i.params || {},
                    o = i.includeFields || this.Jc,
                    A = e;
                  if ("object" == typeof e && "form" === d.a.R(e))
                    for (var A = e.action, s = o.length - 1; 0 <= s; s--)
                      for (
                        var c = d.a.Lc(e, o[s]), u = c.length - 1;
                        0 <= u;
                        u--
                      )
                        a[c[u].name] = c[u].value;
                  n = d.a.f(n);
                  var l = t.createElement("form");
                  (l.style.display = "none"),
                    (l.action = A),
                    (l.method = "post");
                  for (var g in n)
                    (e = t.createElement("input")),
                      (e.type = "hidden"),
                      (e.name = g),
                      (e.value = d.a.hc(d.a.f(n[g]))),
                      l.appendChild(e);
                  r(a, function (e, n) {
                    var i = t.createElement("input");
                    (i.type = "hidden"),
                      (i.name = e),
                      (i.value = n),
                      l.appendChild(i);
                  }),
                    t.body.appendChild(l),
                    i.submitter ? i.submitter(l) : l.submit(),
                    setTimeout(function () {
                      l.parentNode.removeChild(l);
                    }, 0);
                },
              };
            })()),
            d.b("utils", d.a),
            d.b("utils.arrayForEach", d.a.D),
            d.b("utils.arrayFirst", d.a.Lb),
            d.b("utils.arrayFilter", d.a.jb),
            d.b("utils.arrayGetDistinctValues", d.a.wc),
            d.b("utils.arrayIndexOf", d.a.A),
            d.b("utils.arrayMap", d.a.Mb),
            d.b("utils.arrayPushAll", d.a.Nb),
            d.b("utils.arrayRemoveItem", d.a.Pa),
            d.b("utils.cloneNodes", d.a.Ca),
            d.b("utils.createSymbolOrString", d.a.Da),
            d.b("utils.extend", d.a.extend),
            d.b("utils.fieldsIncludedWithJsonPost", d.a.Jc),
            d.b("utils.getFormFields", d.a.Lc),
            d.b("utils.objectMap", d.a.Ga),
            d.b("utils.peekObservable", d.a.bc),
            d.b("utils.postJson", d.a.Od),
            d.b("utils.parseJson", d.a.Nd),
            d.b("utils.registerEventHandler", d.a.B),
            d.b("utils.stringifyJson", d.a.hc),
            d.b("utils.range", d.a.Pd),
            d.b("utils.toggleDomNodeCssClass", d.a.Eb),
            d.b("utils.triggerEvent", d.a.Fb),
            d.b("utils.unwrapObservable", d.a.f),
            d.b("utils.objectForEach", d.a.P),
            d.b("utils.addOrRemoveItem", d.a.Na),
            d.b("utils.setTextContent", d.a.Bb),
            d.b("unwrap", d.a.f),
            Function.prototype.bind ||
              (Function.prototype.bind = function (e) {
                var n = this;
                if (1 === arguments.length)
                  return function () {
                    return n.apply(e, arguments);
                  };
                var t = Array.prototype.slice.call(arguments, 1);
                return function () {
                  var i = t.slice(0);
                  return i.push.apply(i, arguments), n.apply(e, i);
                };
              }),
            (d.a.g = new (function () {
              var n,
                t,
                i = 0,
                a = "__ko__" + new Date().getTime(),
                o = {};
              return (
                d.a.W
                  ? ((n = function (n, t) {
                      var r = n[a];
                      if (!r || "null" === r || !o[r]) {
                        if (!t) return e;
                        (r = n[a] = "ko" + i++), (o[r] = {});
                      }
                      return o[r];
                    }),
                    (t = function (e) {
                      var n = e[a];
                      return !!n && (delete o[n], (e[a] = null), !0);
                    }))
                  : ((n = function (e, n) {
                      var t = e[a];
                      return !t && n && (t = e[a] = {}), t;
                    }),
                    (t = function (e) {
                      return !!e[a] && (delete e[a], !0);
                    })),
                {
                  get: function (e, t) {
                    var i = n(e, !1);
                    return i && i[t];
                  },
                  set: function (t, i, a) {
                    (t = n(t, a !== e)) && (t[i] = a);
                  },
                  Ub: function (e, t, i) {
                    return (e = n(e, !0)), e[t] || (e[t] = i);
                  },
                  clear: t,
                  Z: function () {
                    return i++ + a;
                  },
                }
              );
            })()),
            d.b("utils.domData", d.a.g),
            d.b("utils.domData.clear", d.a.g.clear),
            (d.a.K = new (function () {
              function n(n, t) {
                var i = d.a.g.get(n, o);
                return i === e && t && ((i = []), d.a.g.set(n, o, i)), i;
              }
              function t(e) {
                var t = n(e, !1);
                if (t)
                  for (var t = t.slice(0), a = 0; a < t.length; a++) t[a](e);
                d.a.g.clear(e),
                  d.a.K.cleanExternalData(e),
                  A[e.nodeType] && i(e.childNodes, !0);
              }
              function i(e, n) {
                for (var i, a = [], o = 0; o < e.length; o++)
                  if (
                    (!n || 8 === e[o].nodeType) &&
                    (t((a[a.length] = i = e[o])), e[o] !== i)
                  )
                    for (; o-- && -1 == d.a.A(a, e[o]); );
              }
              var o = d.a.g.Z(),
                r = { 1: !0, 8: !0, 9: !0 },
                A = { 1: !0, 9: !0 };
              return {
                za: function (e, t) {
                  if ("function" != typeof t)
                    throw Error("Callback must be a function");
                  n(e, !0).push(t);
                },
                yb: function (t, i) {
                  var a = n(t, !1);
                  a && (d.a.Pa(a, i), 0 == a.length && d.a.g.set(t, o, e));
                },
                oa: function (e) {
                  return (
                    d.u.G(function () {
                      r[e.nodeType] &&
                        (t(e), A[e.nodeType] && i(e.getElementsByTagName("*")));
                    }),
                    e
                  );
                },
                removeNode: function (e) {
                  d.oa(e), e.parentNode && e.parentNode.removeChild(e);
                },
                cleanExternalData: function (e) {
                  a && "function" == typeof a.cleanData && a.cleanData([e]);
                },
              };
            })()),
            (d.oa = d.a.K.oa),
            (d.removeNode = d.a.K.removeNode),
            d.b("cleanNode", d.oa),
            d.b("removeNode", d.removeNode),
            d.b("utils.domNodeDisposal", d.a.K),
            d.b("utils.domNodeDisposal.addDisposeCallback", d.a.K.za),
            d.b("utils.domNodeDisposal.removeDisposeCallback", d.a.K.yb),
            (function () {
              var i = [0, "", ""],
                o = [1, "<table>", "</table>"],
                r = [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                A = [1, "<select multiple='multiple'>", "</select>"],
                s = {
                  thead: o,
                  tbody: o,
                  tfoot: o,
                  tr: [2, "<table><tbody>", "</tbody></table>"],
                  td: r,
                  th: r,
                  option: A,
                  optgroup: A,
                },
                c = 8 >= d.a.W;
              (d.a.ua = function (e, o) {
                var r;
                if (a) {
                  if (a.parseHTML) r = a.parseHTML(e, o) || [];
                  else if ((r = a.clean([e], o)) && r[0]) {
                    for (
                      var A = r[0];
                      A.parentNode && 11 !== A.parentNode.nodeType;

                    )
                      A = A.parentNode;
                    A.parentNode && A.parentNode.removeChild(A);
                  }
                } else {
                  (r = o) || (r = t);
                  var u,
                    A = r.parentWindow || r.defaultView || n,
                    l = d.a.Db(e).toLowerCase(),
                    g = r.createElement("div");
                  for (
                    u =
                      ((l = l.match(
                        /^(?:\x3c!--.*?--\x3e\s*?)*?<([a-z]+)[\s>]/
                      )) &&
                        s[l[1]]) ||
                      i,
                      l = u[0],
                      u = "ignored<div>" + u[1] + e + u[2] + "</div>",
                      "function" == typeof A.innerShiv
                        ? g.appendChild(A.innerShiv(u))
                        : (c && r.body.appendChild(g),
                          (g.innerHTML = u),
                          c && g.parentNode.removeChild(g));
                    l--;

                  )
                    g = g.lastChild;
                  r = d.a.la(g.lastChild.childNodes);
                }
                return r;
              }),
                (d.a.Md = function (e, n) {
                  var t = d.a.ua(e, n);
                  return (t.length && t[0].parentElement) || d.a.Yb(t);
                }),
                (d.a.fc = function (n, t) {
                  if ((d.a.Tb(n), null !== (t = d.a.f(t)) && t !== e))
                    if (("string" != typeof t && (t = t.toString()), a))
                      a(n).html(t);
                    else
                      for (
                        var i = d.a.ua(t, n.ownerDocument), o = 0;
                        o < i.length;
                        o++
                      )
                        n.appendChild(i[o]);
                });
            })(),
            d.b("utils.parseHtmlFragment", d.a.ua),
            d.b("utils.setHtml", d.a.fc),
            (d.aa = (function () {
              function n(e, t) {
                if (e)
                  if (8 == e.nodeType) {
                    var i = d.aa.Uc(e.nodeValue);
                    null != i && t.push({ ud: e, Kd: i });
                  } else if (1 == e.nodeType)
                    for (var i = 0, a = e.childNodes, o = a.length; i < o; i++)
                      n(a[i], t);
              }
              var t = {};
              return {
                Xb: function (e) {
                  if ("function" != typeof e)
                    throw Error(
                      "You can only pass a function to ko.memoization.memoize()"
                    );
                  var n =
                    ((4294967296 * (1 + Math.random())) | 0)
                      .toString(16)
                      .substring(1) +
                    ((4294967296 * (1 + Math.random())) | 0)
                      .toString(16)
                      .substring(1);
                  return (t[n] = e), "\x3c!--[ko_memo:" + n + "]--\x3e";
                },
                bd: function (n, i) {
                  var a = t[n];
                  if (a === e)
                    throw Error(
                      "Couldn't find any memo with ID " +
                        n +
                        ". Perhaps it's already been unmemoized."
                    );
                  try {
                    return a.apply(null, i || []), !0;
                  } finally {
                    delete t[n];
                  }
                },
                cd: function (e, t) {
                  var i = [];
                  n(e, i);
                  for (var a = 0, o = i.length; a < o; a++) {
                    var r = i[a].ud,
                      A = [r];
                    t && d.a.Nb(A, t),
                      d.aa.bd(i[a].Kd, A),
                      (r.nodeValue = ""),
                      r.parentNode && r.parentNode.removeChild(r);
                  }
                },
                Uc: function (e) {
                  return (e = e.match(/^\[ko_memo\:(.*?)\]$/)) ? e[1] : null;
                },
              };
            })()),
            d.b("memoization", d.aa),
            d.b("memoization.memoize", d.aa.Xb),
            d.b("memoization.unmemoize", d.aa.bd),
            d.b("memoization.parseMemoText", d.aa.Uc),
            d.b("memoization.unmemoizeDomNodeAndDescendants", d.aa.cd),
            (d.na = (function () {
              function e() {
                if (r)
                  for (var e, n = r, t = 0; s < r; )
                    if ((e = o[s++])) {
                      if (s > n) {
                        if (5e3 <= ++t) {
                          (s = r),
                            d.a.Gc(
                              Error(
                                "'Too much recursion' after processing " +
                                  t +
                                  " task groups."
                              )
                            );
                          break;
                        }
                        n = r;
                      }
                      try {
                        e();
                      } catch (e) {
                        d.a.Gc(e);
                      }
                    }
              }
              function i() {
                e(), (s = r = o.length = 0);
              }
              var a,
                o = [],
                r = 0,
                A = 1,
                s = 0;
              return (
                (a = n.MutationObserver
                  ? (function (e) {
                      var n = t.createElement("div");
                      return (
                        new MutationObserver(e).observe(n, { attributes: !0 }),
                        function () {
                          n.classList.toggle("foo");
                        }
                      );
                    })(i)
                  : t && "onreadystatechange" in t.createElement("script")
                  ? function (e) {
                      var n = t.createElement("script");
                      (n.onreadystatechange = function () {
                        (n.onreadystatechange = null),
                          t.documentElement.removeChild(n),
                          (n = null),
                          e();
                      }),
                        t.documentElement.appendChild(n);
                    }
                  : function (e) {
                      setTimeout(e, 0);
                    }),
                {
                  scheduler: a,
                  zb: function (e) {
                    return r || d.na.scheduler(i), (o[r++] = e), A++;
                  },
                  cancel: function (e) {
                    (e -= A - r) >= s && e < r && (o[e] = null);
                  },
                  resetForTesting: function () {
                    var e = r - s;
                    return (s = r = o.length = 0), e;
                  },
                  Sd: e,
                }
              );
            })()),
            d.b("tasks", d.na),
            d.b("tasks.schedule", d.na.zb),
            d.b("tasks.runEarly", d.na.Sd),
            (d.Ta = {
              throttle: function (e, n) {
                e.throttleEvaluation = n;
                var t = null;
                return d.$({
                  read: e,
                  write: function (i) {
                    clearTimeout(t),
                      (t = d.a.setTimeout(function () {
                        e(i);
                      }, n));
                  },
                });
              },
              rateLimit: function (e, n) {
                var t, i, a;
                "number" == typeof n
                  ? (t = n)
                  : ((t = n.timeout), (i = n.method)),
                  (e.Hb = !1),
                  (a =
                    "function" == typeof i
                      ? i
                      : "notifyWhenChangesStop" == i
                      ? u
                      : c),
                  e.ub(function (e) {
                    return a(e, t, n);
                  });
              },
              deferred: function (n, t) {
                if (!0 !== t)
                  throw Error(
                    "The 'deferred' extender only accepts the value 'true', because it is not supported to turn deferral off once enabled."
                  );
                n.Hb ||
                  ((n.Hb = !0),
                  n.ub(function (t) {
                    var i,
                      a = !1;
                    return function () {
                      if (!a) {
                        d.na.cancel(i), (i = d.na.zb(t));
                        try {
                          (a = !0), n.notifySubscribers(e, "dirty");
                        } finally {
                          a = !1;
                        }
                      }
                    };
                  }));
              },
              notify: function (e, n) {
                e.equalityComparer = "always" == n ? null : s;
              },
            });
          var h = { undefined: 1, boolean: 1, number: 1, string: 1 };
          d.b("extenders", d.Ta),
            (d.ic = function (e, n, t) {
              (this.da = e),
                (this.lc = n),
                (this.mc = t),
                (this.Ib = !1),
                (this.fb = this.Jb = null),
                d.L(this, "dispose", this.s),
                d.L(this, "disposeWhenNodeIsRemoved", this.l);
            }),
            (d.ic.prototype.s = function () {
              this.Ib ||
                (this.fb && d.a.K.yb(this.Jb, this.fb),
                (this.Ib = !0),
                this.mc(),
                (this.da = this.lc = this.mc = this.Jb = this.fb = null));
            }),
            (d.ic.prototype.l = function (e) {
              (this.Jb = e), d.a.K.za(e, (this.fb = this.s.bind(this)));
            }),
            (d.T = function () {
              d.a.Ab(this, p), p.qb(this);
            });
          var p = {
            qb: function (e) {
              (e.U = { change: [] }), (e.sc = 1);
            },
            subscribe: function (e, n, t) {
              var i = this;
              t = t || "change";
              var a = new d.ic(i, n ? e.bind(n) : e, function () {
                d.a.Pa(i.U[t], a), i.hb && i.hb(t);
              });
              return (
                i.Qa && i.Qa(t), i.U[t] || (i.U[t] = []), i.U[t].push(a), a
              );
            },
            notifySubscribers: function (e, n) {
              if (
                ((n = n || "change"), "change" === n && this.Gb(), this.Wa(n))
              ) {
                var t = ("change" === n && this.ed) || this.U[n].slice(0);
                try {
                  d.u.xc();
                  for (var i, a = 0; (i = t[a]); ++a) i.Ib || i.lc(e);
                } finally {
                  d.u.end();
                }
              }
            },
            ob: function () {
              return this.sc;
            },
            Dd: function (e) {
              return this.ob() !== e;
            },
            Gb: function () {
              ++this.sc;
            },
            ub: function (e) {
              var n,
                t,
                i,
                a,
                o,
                r = this,
                A = d.O(r);
              r.gb || ((r.gb = r.notifySubscribers), (r.notifySubscribers = l));
              var s = e(function () {
                (r.Ja = !1), A && a === r && (a = r.nc ? r.nc() : r());
                var e = t || (o && r.sb(i, a));
                (o = t = n = !1), e && r.gb((i = a));
              });
              (r.qc = function (e, t) {
                (t && r.Ja) || (o = !t),
                  (r.ed = r.U.change.slice(0)),
                  (r.Ja = n = !0),
                  (a = e),
                  s();
              }),
                (r.pc = function (e) {
                  n || ((i = e), r.gb(e, "beforeChange"));
                }),
                (r.rc = function () {
                  o = !0;
                }),
                (r.gd = function () {
                  r.sb(i, r.v(!0)) && (t = !0);
                });
            },
            Wa: function (e) {
              return this.U[e] && this.U[e].length;
            },
            Bd: function (e) {
              if (e) return (this.U[e] && this.U[e].length) || 0;
              var n = 0;
              return (
                d.a.P(this.U, function (e, t) {
                  "dirty" !== e && (n += t.length);
                }),
                n
              );
            },
            sb: function (e, n) {
              return !this.equalityComparer || !this.equalityComparer(e, n);
            },
            toString: function () {
              return "[object Object]";
            },
            extend: function (e) {
              var n = this;
              return (
                e &&
                  d.a.P(e, function (e, t) {
                    var i = d.Ta[e];
                    "function" == typeof i && (n = i(n, t) || n);
                  }),
                n
              );
            },
          };
          d.L(p, "init", p.qb),
            d.L(p, "subscribe", p.subscribe),
            d.L(p, "extend", p.extend),
            d.L(p, "getSubscriptionsCount", p.Bd),
            d.a.Ba && d.a.setPrototypeOf(p, Function.prototype),
            (d.T.fn = p),
            (d.Qc = function (e) {
              return (
                null != e &&
                "function" == typeof e.subscribe &&
                "function" == typeof e.notifySubscribers
              );
            }),
            d.b("subscribable", d.T),
            d.b("isSubscribable", d.Qc),
            (d.S = d.u =
              (function () {
                function e(e) {
                  i.push(t), (t = e);
                }
                function n() {
                  t = i.pop();
                }
                var t,
                  i = [],
                  a = 0;
                return {
                  xc: e,
                  end: n,
                  cc: function (e) {
                    if (t) {
                      if (!d.Qc(e))
                        throw Error(
                          "Only subscribable things can act as dependencies"
                        );
                      t.od.call(t.pd, e, e.fd || (e.fd = ++a));
                    }
                  },
                  G: function (t, i, a) {
                    try {
                      return e(), t.apply(i, a || []);
                    } finally {
                      n();
                    }
                  },
                  qa: function () {
                    if (t) return t.o.qa();
                  },
                  Va: function () {
                    if (t) return t.o.Va();
                  },
                  Ya: function () {
                    if (t) return t.Ya;
                  },
                  o: function () {
                    if (t) return t.o;
                  },
                };
              })()),
            d.b("computedContext", d.S),
            d.b("computedContext.getDependenciesCount", d.S.qa),
            d.b("computedContext.getDependencies", d.S.Va),
            d.b("computedContext.isInitial", d.S.Ya),
            d.b("computedContext.registerDependency", d.S.cc),
            d.b("ignoreDependencies", (d.Yd = d.u.G));
          var m = d.a.Da("_latestValue");
          d.ta = function (e) {
            function n() {
              return 0 < arguments.length
                ? (n.sb(n[m], arguments[0]) &&
                    (n.ya(), (n[m] = arguments[0]), n.xa()),
                  this)
                : (d.u.cc(n), n[m]);
            }
            return (
              (n[m] = e),
              d.a.Ba || d.a.extend(n, d.T.fn),
              d.T.fn.qb(n),
              d.a.Ab(n, B),
              d.options.deferUpdates && d.Ta.deferred(n, !0),
              n
            );
          };
          var B = {
            equalityComparer: s,
            v: function () {
              return this[m];
            },
            xa: function () {
              this.notifySubscribers(this[m], "spectate"),
                this.notifySubscribers(this[m]);
            },
            ya: function () {
              this.notifySubscribers(this[m], "beforeChange");
            },
          };
          d.a.Ba && d.a.setPrototypeOf(B, d.T.fn);
          var E = (d.ta.Ma = "__ko_proto__");
          (B[E] = d.ta),
            (d.O = function (e) {
              if (
                (e = "function" == typeof e && e[E]) &&
                e !== B[E] &&
                e !== d.o.fn[E]
              )
                throw Error(
                  "Invalid object that looks like an observable; possibly from another Knockout instance"
                );
              return !!e;
            }),
            (d.Za = function (e) {
              return (
                "function" == typeof e &&
                (e[E] === B[E] || (e[E] === d.o.fn[E] && e.Nc))
              );
            }),
            d.b("observable", d.ta),
            d.b("isObservable", d.O),
            d.b("isWriteableObservable", d.Za),
            d.b("isWritableObservable", d.Za),
            d.b("observable.fn", B),
            d.L(B, "peek", B.v),
            d.L(B, "valueHasMutated", B.xa),
            d.L(B, "valueWillMutate", B.ya),
            (d.Ha = function (e) {
              if ("object" != typeof (e = e || []) || !("length" in e))
                throw Error(
                  "The argument passed when initializing an observable array must be an array, or null, or undefined."
                );
              return (
                (e = d.ta(e)),
                d.a.Ab(e, d.Ha.fn),
                e.extend({ trackArrayChanges: !0 })
              );
            }),
            (d.Ha.fn = {
              remove: function (e) {
                for (
                  var n = this.v(),
                    t = [],
                    i =
                      "function" != typeof e || d.O(e)
                        ? function (n) {
                            return n === e;
                          }
                        : e,
                    a = 0;
                  a < n.length;
                  a++
                ) {
                  var o = n[a];
                  if (i(o)) {
                    if ((0 === t.length && this.ya(), n[a] !== o))
                      throw Error(
                        "Array modified during remove; cannot remove item"
                      );
                    t.push(o), n.splice(a, 1), a--;
                  }
                }
                return t.length && this.xa(), t;
              },
              removeAll: function (n) {
                if (n === e) {
                  var t = this.v(),
                    i = t.slice(0);
                  return this.ya(), t.splice(0, t.length), this.xa(), i;
                }
                return n
                  ? this.remove(function (e) {
                      return 0 <= d.a.A(n, e);
                    })
                  : [];
              },
              destroy: function (e) {
                var n = this.v(),
                  t =
                    "function" != typeof e || d.O(e)
                      ? function (n) {
                          return n === e;
                        }
                      : e;
                this.ya();
                for (var i = n.length - 1; 0 <= i; i--) {
                  var a = n[i];
                  t(a) && (a._destroy = !0);
                }
                this.xa();
              },
              destroyAll: function (n) {
                return n === e
                  ? this.destroy(function () {
                      return !0;
                    })
                  : n
                  ? this.destroy(function (e) {
                      return 0 <= d.a.A(n, e);
                    })
                  : [];
              },
              indexOf: function (e) {
                var n = this();
                return d.a.A(n, e);
              },
              replace: function (e, n) {
                var t = this.indexOf(e);
                0 <= t && (this.ya(), (this.v()[t] = n), this.xa());
              },
              sorted: function (e) {
                var n = this().slice(0);
                return e ? n.sort(e) : n.sort();
              },
              reversed: function () {
                return this().slice(0).reverse();
              },
            }),
            d.a.Ba && d.a.setPrototypeOf(d.Ha.fn, d.ta.fn),
            d.a.D(
              "pop push reverse shift sort splice unshift".split(" "),
              function (e) {
                d.Ha.fn[e] = function () {
                  var n = this.v();
                  this.ya(), this.zc(n, e, arguments);
                  var t = n[e].apply(n, arguments);
                  return this.xa(), t === n ? this : t;
                };
              }
            ),
            d.a.D(["slice"], function (e) {
              d.Ha.fn[e] = function () {
                var n = this();
                return n[e].apply(n, arguments);
              };
            }),
            (d.Pc = function (e) {
              return (
                d.O(e) &&
                "function" == typeof e.remove &&
                "function" == typeof e.push
              );
            }),
            d.b("observableArray", d.Ha),
            d.b("isObservableArray", d.Pc),
            (d.Ta.trackArrayChanges = function (n, t) {
              function i() {
                function e() {
                  if (c) {
                    var e,
                      t = [].concat(n.v() || []);
                    n.Wa("arrayChange") &&
                      ((!s || 1 < c) && (s = d.a.Pb(r, t, n.Ob)), (e = s)),
                      (r = t),
                      (s = null),
                      (c = 0),
                      e && e.length && n.notifySubscribers(e, "arrayChange");
                  }
                }
                A
                  ? e()
                  : ((A = !0),
                    (o = n.subscribe(
                      function () {
                        ++c;
                      },
                      null,
                      "spectate"
                    )),
                    (r = [].concat(n.v() || [])),
                    (s = null),
                    (a = n.subscribe(e)));
              }
              if (
                ((n.Ob = {}),
                t && "object" == typeof t && d.a.extend(n.Ob, t),
                (n.Ob.sparse = !0),
                !n.zc)
              ) {
                var a,
                  o,
                  r,
                  A = !1,
                  s = null,
                  c = 0,
                  u = n.Qa,
                  l = n.hb;
                (n.Qa = function (e) {
                  u && u.call(n, e), "arrayChange" === e && i();
                }),
                  (n.hb = function (t) {
                    l && l.call(n, t),
                      "arrayChange" !== t ||
                        n.Wa("arrayChange") ||
                        (a && a.s(),
                        o && o.s(),
                        (o = a = null),
                        (A = !1),
                        (r = e));
                  }),
                  (n.zc = function (e, n, t) {
                    function i(e, n, t) {
                      return (a[a.length] = { status: e, value: n, index: t });
                    }
                    if (A && !c) {
                      var a = [],
                        o = e.length,
                        r = t.length,
                        u = 0;
                      switch (n) {
                        case "push":
                          u = o;
                        case "unshift":
                          for (n = 0; n < r; n++) i("added", t[n], u + n);
                          break;
                        case "pop":
                          u = o - 1;
                        case "shift":
                          o && i("deleted", e[u], u);
                          break;
                        case "splice":
                          n = Math.min(
                            Math.max(0, 0 > t[0] ? o + t[0] : t[0]),
                            o
                          );
                          for (
                            var o = 1 === r ? o : Math.min(n + (t[1] || 0), o),
                              r = n + r - 2,
                              u = Math.max(o, r),
                              l = [],
                              g = [],
                              f = 2;
                            n < u;
                            ++n, ++f
                          )
                            n < o && g.push(i("deleted", e[n], n)),
                              n < r && l.push(i("added", t[f], n));
                          d.a.Kc(g, l);
                          break;
                        default:
                          return;
                      }
                      s = a;
                    }
                  });
              }
            });
          var w = d.a.Da("_state");
          d.o = d.$ = function (n, t, i) {
            function a() {
              if (0 < arguments.length) {
                if ("function" != typeof o)
                  throw Error(
                    "Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters."
                  );
                return o.apply(r.nb, arguments), this;
              }
              return (
                r.ra || d.u.cc(a), (r.ka || (r.J && a.Xa())) && a.ha(), r.X
              );
            }
            if (
              ("object" == typeof n
                ? (i = n)
                : ((i = i || {}), n && (i.read = n)),
              "function" != typeof i.read)
            )
              throw Error(
                "Pass a function that returns the value of the ko.computed"
              );
            var o = i.write,
              r = {
                X: e,
                sa: !0,
                ka: !0,
                rb: !1,
                jc: !1,
                ra: !1,
                wb: !1,
                J: !1,
                Wc: i.read,
                nb: t || i.owner,
                l: i.disposeWhenNodeIsRemoved || i.l || null,
                Sa: i.disposeWhen || i.Sa,
                Rb: null,
                I: {},
                V: 0,
                Ic: null,
              };
            return (
              (a[w] = r),
              (a.Nc = "function" == typeof o),
              d.a.Ba || d.a.extend(a, d.T.fn),
              d.T.fn.qb(a),
              d.a.Ab(a, M),
              i.pure
                ? ((r.wb = !0), (r.J = !0), d.a.extend(a, Q))
                : i.deferEvaluation && d.a.extend(a, b),
              d.options.deferUpdates && d.Ta.deferred(a, !0),
              r.l && ((r.jc = !0), r.l.nodeType || (r.l = null)),
              r.J || i.deferEvaluation || a.ha(),
              r.l &&
                a.ja() &&
                d.a.K.za(
                  r.l,
                  (r.Rb = function () {
                    a.s();
                  })
                ),
              a
            );
          };
          var M = {
              equalityComparer: s,
              qa: function () {
                return this[w].V;
              },
              Va: function () {
                var e = [];
                return (
                  d.a.P(this[w].I, function (n, t) {
                    e[t.Ka] = t.da;
                  }),
                  e
                );
              },
              Vb: function (e) {
                if (!this[w].V) return !1;
                var n = this.Va();
                return (
                  -1 !== d.a.A(n, e) ||
                  !!d.a.Lb(n, function (n) {
                    return n.Vb && n.Vb(e);
                  })
                );
              },
              uc: function (e, n, t) {
                if (this[w].wb && n === this)
                  throw Error(
                    "A 'pure' computed must not be called recursively"
                  );
                (this[w].I[e] = t), (t.Ka = this[w].V++), (t.La = n.ob());
              },
              Xa: function () {
                var e,
                  n,
                  t = this[w].I;
                for (e in t)
                  if (
                    Object.prototype.hasOwnProperty.call(t, e) &&
                    ((n = t[e]), (this.Ia && n.da.Ja) || n.da.Dd(n.La))
                  )
                    return !0;
              },
              Jd: function () {
                this.Ia && !this[w].rb && this.Ia(!1);
              },
              ja: function () {
                var e = this[w];
                return e.ka || 0 < e.V;
              },
              Rd: function () {
                this.Ja ? this[w].ka && (this[w].sa = !0) : this.Hc();
              },
              $c: function (e) {
                if (e.Hb) {
                  var n = e.subscribe(this.Jd, this, "dirty"),
                    t = e.subscribe(this.Rd, this);
                  return {
                    da: e,
                    s: function () {
                      n.s(), t.s();
                    },
                  };
                }
                return e.subscribe(this.Hc, this);
              },
              Hc: function () {
                var e = this,
                  n = e.throttleEvaluation;
                n && 0 <= n
                  ? (clearTimeout(this[w].Ic),
                    (this[w].Ic = d.a.setTimeout(function () {
                      e.ha(!0);
                    }, n)))
                  : e.Ia
                  ? e.Ia(!0)
                  : e.ha(!0);
              },
              ha: function (e) {
                var n = this[w],
                  t = n.Sa,
                  i = !1;
                if (!n.rb && !n.ra) {
                  if ((n.l && !d.a.Sb(n.l)) || (t && t())) {
                    if (!n.jc) return void this.s();
                  } else n.jc = !1;
                  n.rb = !0;
                  try {
                    i = this.zd(e);
                  } finally {
                    n.rb = !1;
                  }
                  return i;
                }
              },
              zd: function (n) {
                var t = this[w],
                  i = !1,
                  a = t.wb ? e : !t.V,
                  i = { qd: this, mb: t.I, Qb: t.V };
                d.u.xc({ pd: i, od: f, o: this, Ya: a }), (t.I = {}), (t.V = 0);
                var o = this.yd(t, i);
                return (
                  t.V ? (i = this.sb(t.X, o)) : (this.s(), (i = !0)),
                  i &&
                    (t.J
                      ? this.Gb()
                      : this.notifySubscribers(t.X, "beforeChange"),
                    (t.X = o),
                    this.notifySubscribers(t.X, "spectate"),
                    !t.J && n && this.notifySubscribers(t.X),
                    this.rc && this.rc()),
                  a && this.notifySubscribers(t.X, "awake"),
                  i
                );
              },
              yd: function (e, n) {
                try {
                  var t = e.Wc;
                  return e.nb ? t.call(e.nb) : t();
                } finally {
                  d.u.end(), n.Qb && !e.J && d.a.P(n.mb, g), (e.sa = e.ka = !1);
                }
              },
              v: function (e) {
                var n = this[w];
                return (
                  ((n.ka && (e || !n.V)) || (n.J && this.Xa())) && this.ha(),
                  n.X
                );
              },
              ub: function (e) {
                d.T.fn.ub.call(this, e),
                  (this.nc = function () {
                    return (
                      this[w].J || (this[w].sa ? this.ha() : (this[w].ka = !1)),
                      this[w].X
                    );
                  }),
                  (this.Ia = function (e) {
                    this.pc(this[w].X),
                      (this[w].ka = !0),
                      e && (this[w].sa = !0),
                      this.qc(this, !e);
                  });
              },
              s: function () {
                var n = this[w];
                !n.J &&
                  n.I &&
                  d.a.P(n.I, function (e, n) {
                    n.s && n.s();
                  }),
                  n.l && n.Rb && d.a.K.yb(n.l, n.Rb),
                  (n.I = e),
                  (n.V = 0),
                  (n.ra = !0),
                  (n.sa = !1),
                  (n.ka = !1),
                  (n.J = !1),
                  (n.l = e),
                  (n.Sa = e),
                  (n.Wc = e),
                  this.Nc || (n.nb = e);
              },
            },
            Q = {
              Qa: function (e) {
                var n = this,
                  t = n[w];
                if (!t.ra && t.J && "change" == e) {
                  if (((t.J = !1), t.sa || n.Xa()))
                    (t.I = null), (t.V = 0), n.ha() && n.Gb();
                  else {
                    var i = [];
                    d.a.P(t.I, function (e, n) {
                      i[n.Ka] = e;
                    }),
                      d.a.D(i, function (e, i) {
                        var a = t.I[e],
                          o = n.$c(a.da);
                        (o.Ka = i), (o.La = a.La), (t.I[e] = o);
                      }),
                      n.Xa() && n.ha() && n.Gb();
                  }
                  t.ra || n.notifySubscribers(t.X, "awake");
                }
              },
              hb: function (n) {
                var t = this[w];
                t.ra ||
                  "change" != n ||
                  this.Wa("change") ||
                  (d.a.P(t.I, function (e, n) {
                    n.s && ((t.I[e] = { da: n.da, Ka: n.Ka, La: n.La }), n.s());
                  }),
                  (t.J = !0),
                  this.notifySubscribers(e, "asleep"));
              },
              ob: function () {
                var e = this[w];
                return (
                  e.J && (e.sa || this.Xa()) && this.ha(), d.T.fn.ob.call(this)
                );
              },
            },
            b = {
              Qa: function (e) {
                ("change" != e && "beforeChange" != e) || this.v();
              },
            };
          d.a.Ba && d.a.setPrototypeOf(M, d.T.fn);
          var C = d.ta.Ma;
          (M[C] = d.o),
            (d.Oc = function (e) {
              return "function" == typeof e && e[C] === M[C];
            }),
            (d.Fd = function (e) {
              return d.Oc(e) && e[w] && e[w].wb;
            }),
            d.b("computed", d.o),
            d.b("dependentObservable", d.o),
            d.b("isComputed", d.Oc),
            d.b("isPureComputed", d.Fd),
            d.b("computed.fn", M),
            d.L(M, "peek", M.v),
            d.L(M, "dispose", M.s),
            d.L(M, "isActive", M.ja),
            d.L(M, "getDependenciesCount", M.qa),
            d.L(M, "getDependencies", M.Va),
            (d.xb = function (e, n) {
              return "function" == typeof e
                ? d.o(e, n, { pure: !0 })
                : ((e = d.a.extend({}, e)), (e.pure = !0), d.o(e, n));
            }),
            d.b("pureComputed", d.xb),
            (function () {
              function n(a, o, r) {
                if (
                  ((r = r || new i()),
                  "object" != typeof (a = o(a)) ||
                    null === a ||
                    a === e ||
                    a instanceof RegExp ||
                    a instanceof Date ||
                    a instanceof String ||
                    a instanceof Number ||
                    a instanceof Boolean)
                )
                  return a;
                var A = a instanceof Array ? [] : {};
                return (
                  r.save(a, A),
                  t(a, function (t) {
                    var i = o(a[t]);
                    switch (typeof i) {
                      case "boolean":
                      case "number":
                      case "string":
                      case "function":
                        A[t] = i;
                        break;
                      case "object":
                      case "undefined":
                        var s = r.get(i);
                        A[t] = s !== e ? s : n(i, o, r);
                    }
                  }),
                  A
                );
              }
              function t(e, n) {
                if (e instanceof Array) {
                  for (var t = 0; t < e.length; t++) n(t);
                  "function" == typeof e.toJSON && n("toJSON");
                } else for (t in e) n(t);
              }
              function i() {
                (this.keys = []), (this.values = []);
              }
              (d.ad = function (e) {
                if (0 == arguments.length)
                  throw Error(
                    "When calling ko.toJS, pass the object you want to convert."
                  );
                return n(e, function (e) {
                  for (var n = 0; d.O(e) && 10 > n; n++) e = e();
                  return e;
                });
              }),
                (d.toJSON = function (e, n, t) {
                  return (e = d.ad(e)), d.a.hc(e, n, t);
                }),
                (i.prototype = {
                  constructor: i,
                  save: function (e, n) {
                    var t = d.a.A(this.keys, e);
                    0 <= t
                      ? (this.values[t] = n)
                      : (this.keys.push(e), this.values.push(n));
                  },
                  get: function (n) {
                    return (
                      (n = d.a.A(this.keys, n)), 0 <= n ? this.values[n] : e
                    );
                  },
                });
            })(),
            d.b("toJS", d.ad),
            d.b("toJSON", d.toJSON),
            (d.Wd = function (e, n, t) {
              function i(n) {
                var i = d.xb(e, t).extend({ ma: "always" }),
                  a = i.subscribe(function (e) {
                    e && (a.s(), n(e));
                  });
                return i.notifySubscribers(i.v()), a;
              }
              return "function" != typeof Promise || n
                ? i(n.bind(t))
                : new Promise(i);
            }),
            d.b("when", d.Wd),
            (function () {
              d.w = {
                M: function (n) {
                  switch (d.a.R(n)) {
                    case "option":
                      return !0 === n.__ko__hasDomDataOptionValue__
                        ? d.a.g.get(n, d.c.options.$b)
                        : 7 >= d.a.W
                        ? n.getAttributeNode("value") &&
                          n.getAttributeNode("value").specified
                          ? n.value
                          : n.text
                        : n.value;
                    case "select":
                      return 0 <= n.selectedIndex
                        ? d.w.M(n.options[n.selectedIndex])
                        : e;
                    default:
                      return n.value;
                  }
                },
                cb: function (n, t, i) {
                  switch (d.a.R(n)) {
                    case "option":
                      "string" == typeof t
                        ? (d.a.g.set(n, d.c.options.$b, e),
                          "__ko__hasDomDataOptionValue__" in n &&
                            delete n.__ko__hasDomDataOptionValue__,
                          (n.value = t))
                        : (d.a.g.set(n, d.c.options.$b, t),
                          (n.__ko__hasDomDataOptionValue__ = !0),
                          (n.value = "number" == typeof t ? t : ""));
                      break;
                    case "select":
                      ("" !== t && null !== t) || (t = e);
                      for (
                        var a, o = -1, r = 0, A = n.options.length;
                        r < A;
                        ++r
                      )
                        if (
                          (a = d.w.M(n.options[r])) == t ||
                          ("" === a && t === e)
                        ) {
                          o = r;
                          break;
                        }
                      (i || 0 <= o || (t === e && 1 < n.size)) &&
                        ((n.selectedIndex = o),
                        6 === d.a.W &&
                          d.a.setTimeout(function () {
                            n.selectedIndex = o;
                          }, 0));
                      break;
                    default:
                      (null !== t && t !== e) || (t = ""), (n.value = t);
                  }
                },
              };
            })(),
            d.b("selectExtensions", d.w),
            d.b("selectExtensions.readValue", d.w.M),
            d.b("selectExtensions.writeValue", d.w.cb),
            (d.m = (function () {
              function e(e) {
                (e = d.a.Db(e)),
                  123 === e.charCodeAt(0) && (e = e.slice(1, -1)),
                  (e += "\n,");
                var n,
                  t = [],
                  r = e.match(i),
                  A = [],
                  s = 0;
                if (1 < r.length) {
                  for (var c, u = 0; (c = r[u]); ++u) {
                    var l = c.charCodeAt(0);
                    if (44 === l) {
                      if (0 >= s) {
                        t.push(
                          n && A.length
                            ? { key: n, value: A.join("") }
                            : { unknown: n || A.join("") }
                        ),
                          (n = s = 0),
                          (A = []);
                        continue;
                      }
                    } else if (58 === l) {
                      if (!s && !n && 1 === A.length) {
                        n = A.pop();
                        continue;
                      }
                    } else {
                      if (
                        47 === l &&
                        1 < c.length &&
                        (47 === c.charCodeAt(1) || 42 === c.charCodeAt(1))
                      )
                        continue;
                      47 === l && u && 1 < c.length
                        ? (l = r[u - 1].match(a)) &&
                          !o[l[0]] &&
                          ((e = e.substr(e.indexOf(c) + 1)),
                          (r = e.match(i)),
                          (u = -1),
                          (c = "/"))
                        : 40 === l || 123 === l || 91 === l
                        ? ++s
                        : 41 === l || 125 === l || 93 === l
                        ? --s
                        : n ||
                          A.length ||
                          (34 !== l && 39 !== l) ||
                          (c = c.slice(1, -1));
                    }
                    A.push(c);
                  }
                  if (0 < s)
                    throw Error("Unbalanced parentheses, braces, or brackets");
                }
                return t;
              }
              var n = ["true", "false", "null", "undefined"],
                t = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i,
                i = RegExp(
                  "\"(?:\\\\.|[^\"])*\"|'(?:\\\\.|[^'])*'|`(?:\\\\.|[^`])*`|/\\*(?:[^*]|\\*+[^*/])*\\*+/|//.*\n|/(?:\\\\.|[^/])+/w*|[^\\s:,/][^,\"'`{}()/:[\\]]*[^\\s,\"'`{}()/:[\\]]|[^\\s]",
                  "g"
                ),
                a = /[\])"'A-Za-z0-9_$]+$/,
                o = { in: 1, return: 1, typeof: 1 },
                r = {};
              return {
                Ra: [],
                wa: r,
                ac: e,
                vb: function (i, a) {
                  function o(e, i) {
                    var a;
                    if (!u) {
                      var l = d.getBindingHandler(e);
                      if (l && l.preprocess && !(i = l.preprocess(i, e, o)))
                        return;
                      (l = r[e]) &&
                        ((a = i),
                        0 <= d.a.A(n, a)
                          ? (a = !1)
                          : ((l = a.match(t)),
                            (a =
                              null !== l &&
                              (l[1] ? "Object(" + l[1] + ")" + l[2] : a))),
                        (l = a)),
                        l &&
                          s.push(
                            "'" +
                              ("string" == typeof r[e] ? r[e] : e) +
                              "':function(_z){" +
                              a +
                              "=_z}"
                          );
                    }
                    c && (i = "function(){return " + i + " }"),
                      A.push("'" + e + "':" + i);
                  }
                  a = a || {};
                  var A = [],
                    s = [],
                    c = a.valueAccessors,
                    u = a.bindingParams,
                    l = "string" == typeof i ? e(i) : i;
                  return (
                    d.a.D(l, function (e) {
                      o(e.key || e.unknown, e.value);
                    }),
                    s.length &&
                      o("_ko_property_writers", "{" + s.join(",") + " }"),
                    A.join(",")
                  );
                },
                Id: function (e, n) {
                  for (var t = 0; t < e.length; t++)
                    if (e[t].key == n) return !0;
                  return !1;
                },
                eb: function (e, n, t, i, a) {
                  e && d.O(e)
                    ? !d.Za(e) || (a && e.v() === i) || e(i)
                    : (e = n.get("_ko_property_writers")) && e[t] && e[t](i);
                },
              };
            })()),
            d.b("expressionRewriting", d.m),
            d.b("expressionRewriting.bindingRewriteValidators", d.m.Ra),
            d.b("expressionRewriting.parseObjectLiteral", d.m.ac),
            d.b("expressionRewriting.preProcessBindings", d.m.vb),
            d.b("expressionRewriting._twoWayBindings", d.m.wa),
            d.b("jsonExpressionRewriting", d.m),
            d.b(
              "jsonExpressionRewriting.insertPropertyAccessorsIntoJson",
              d.m.vb
            ),
            (function () {
              function e(e) {
                return 8 == e.nodeType && r.test(o ? e.text : e.nodeValue);
              }
              function n(e) {
                return 8 == e.nodeType && A.test(o ? e.text : e.nodeValue);
              }
              function i(t, i) {
                for (var a = t, o = 1, r = []; (a = a.nextSibling); ) {
                  if (n(a) && (d.a.g.set(a, c, !0), 0 === --o)) return r;
                  r.push(a), e(a) && o++;
                }
                if (!i)
                  throw Error(
                    "Cannot find closing comment tag to match: " + t.nodeValue
                  );
                return null;
              }
              function a(e, n) {
                var t = i(e, n);
                return t
                  ? 0 < t.length
                    ? t[t.length - 1].nextSibling
                    : e.nextSibling
                  : null;
              }
              var o = t && "\x3c!--test--\x3e" === t.createComment("test").text,
                r = o
                  ? /^\x3c!--\s*ko(?:\s+([\s\S]+))?\s*--\x3e$/
                  : /^\s*ko(?:\s+([\s\S]+))?\s*$/,
                A = o ? /^\x3c!--\s*\/ko\s*--\x3e$/ : /^\s*\/ko\s*$/,
                s = { ul: !0, ol: !0 },
                c = "__ko_matchedEndComment__";
              d.h = {
                ea: {},
                childNodes: function (n) {
                  return e(n) ? i(n) : n.childNodes;
                },
                Ea: function (n) {
                  if (e(n)) {
                    n = d.h.childNodes(n);
                    for (var t = 0, i = n.length; t < i; t++)
                      d.removeNode(n[t]);
                  } else d.a.Tb(n);
                },
                va: function (n, t) {
                  if (e(n)) {
                    d.h.Ea(n);
                    for (var i = n.nextSibling, a = 0, o = t.length; a < o; a++)
                      i.parentNode.insertBefore(t[a], i);
                  } else d.a.va(n, t);
                },
                Vc: function (n, t) {
                  var i;
                  e(n)
                    ? ((i = n.nextSibling), (n = n.parentNode))
                    : (i = n.firstChild),
                    i ? t !== i && n.insertBefore(t, i) : n.appendChild(t);
                },
                Wb: function (n, t, i) {
                  i
                    ? ((i = i.nextSibling),
                      e(n) && (n = n.parentNode),
                      i ? t !== i && n.insertBefore(t, i) : n.appendChild(t))
                    : d.h.Vc(n, t);
                },
                firstChild: function (t) {
                  if (e(t))
                    return !t.nextSibling || n(t.nextSibling)
                      ? null
                      : t.nextSibling;
                  if (t.firstChild && n(t.firstChild))
                    throw Error(
                      "Found invalid end comment, as the first child of " + t
                    );
                  return t.firstChild;
                },
                nextSibling: function (t) {
                  if ((e(t) && (t = a(t)), t.nextSibling && n(t.nextSibling))) {
                    var i = t.nextSibling;
                    if (n(i) && !d.a.g.get(i, c))
                      throw Error(
                        "Found end comment without a matching opening comment, as child of " +
                          t
                      );
                    return null;
                  }
                  return t.nextSibling;
                },
                Cd: e,
                Vd: function (e) {
                  return (e = (o ? e.text : e.nodeValue).match(r))
                    ? e[1]
                    : null;
                },
                Sc: function (t) {
                  if (s[d.a.R(t)]) {
                    var i = t.firstChild;
                    if (i)
                      do {
                        if (1 === i.nodeType) {
                          var o;
                          o = i.firstChild;
                          var r = null;
                          if (o)
                            do {
                              if (r) r.push(o);
                              else if (e(o)) {
                                var A = a(o, !0);
                                A ? (o = A) : (r = [o]);
                              } else n(o) && (r = [o]);
                            } while ((o = o.nextSibling));
                          if ((o = r))
                            for (r = i.nextSibling, A = 0; A < o.length; A++)
                              r ? t.insertBefore(o[A], r) : t.appendChild(o[A]);
                        }
                      } while ((i = i.nextSibling));
                  }
                },
              };
            })(),
            d.b("virtualElements", d.h),
            d.b("virtualElements.allowedBindings", d.h.ea),
            d.b("virtualElements.emptyNode", d.h.Ea),
            d.b("virtualElements.insertAfter", d.h.Wb),
            d.b("virtualElements.prepend", d.h.Vc),
            d.b("virtualElements.setDomNodeChildren", d.h.va),
            (function () {
              (d.ga = function () {
                this.nd = {};
              }),
                d.a.extend(d.ga.prototype, {
                  nodeHasBindings: function (e) {
                    switch (e.nodeType) {
                      case 1:
                        return (
                          null != e.getAttribute("data-bind") ||
                          d.j.getComponentNameForNode(e)
                        );
                      case 8:
                        return d.h.Cd(e);
                      default:
                        return !1;
                    }
                  },
                  getBindings: function (e, n) {
                    var t = this.getBindingsString(e, n),
                      t = t ? this.parseBindingsString(t, n, e) : null;
                    return d.j.tc(t, e, n, !1);
                  },
                  getBindingAccessors: function (e, n) {
                    var t = this.getBindingsString(e, n),
                      t = t
                        ? this.parseBindingsString(t, n, e, {
                            valueAccessors: !0,
                          })
                        : null;
                    return d.j.tc(t, e, n, !0);
                  },
                  getBindingsString: function (e) {
                    switch (e.nodeType) {
                      case 1:
                        return e.getAttribute("data-bind");
                      case 8:
                        return d.h.Vd(e);
                      default:
                        return null;
                    }
                  },
                  parseBindingsString: function (e, n, t, i) {
                    try {
                      var a,
                        o = this.nd,
                        r = e + ((i && i.valueAccessors) || "");
                      if (!(a = o[r])) {
                        var A,
                          s =
                            "with($context){with($data||{}){return{" +
                            d.m.vb(e, i) +
                            "}}}";
                        (A = new Function("$context", "$element", s)),
                          (a = o[r] = A);
                      }
                      return a(n, t);
                    } catch (n) {
                      throw (
                        ((n.message =
                          "Unable to parse bindings.\nBindings value: " +
                          e +
                          "\nMessage: " +
                          n.message),
                        n)
                      );
                    }
                  },
                }),
                (d.ga.instance = new d.ga());
            })(),
            d.b("bindingProvider", d.ga),
            (function () {
              function i(e) {
                var n = (e = d.a.g.get(e, Q)) && e.N;
                n && ((e.N = null), n.Tc());
              }
              function o(e, n, t) {
                (this.node = e),
                  (this.yc = n),
                  (this.kb = []),
                  (this.H = !1),
                  n.N || d.a.K.za(e, i),
                  t && t.N && (t.N.kb.push(e), (this.Kb = t));
              }
              function r(e) {
                return function () {
                  return e;
                };
              }
              function A(e) {
                return e();
              }
              function s(e) {
                return d.a.Ga(d.u.G(e), function (n, t) {
                  return function () {
                    return e()[t];
                  };
                });
              }
              function c(e, n, t) {
                return "function" == typeof e
                  ? s(e.bind(null, n, t))
                  : d.a.Ga(e, r);
              }
              function u(e, n) {
                return s(this.getBindings.bind(this, e, n));
              }
              function l(e, n) {
                var t = d.h.firstChild(n);
                if (t) {
                  var i,
                    a = d.ga.instance,
                    o = a.preprocessNode;
                  if (o) {
                    for (; (i = t); ) (t = d.h.nextSibling(i)), o.call(a, i);
                    t = d.h.firstChild(n);
                  }
                  for (; (i = t); ) (t = d.h.nextSibling(i)), g(e, i);
                }
                d.i.ma(n, d.i.H);
              }
              function g(e, n) {
                var t = e,
                  i = 1 === n.nodeType;
                i && d.h.Sc(n),
                  (i || d.ga.instance.nodeHasBindings(n)) &&
                    (t = h(n, null, e).bindingContextForDescendants),
                  t && !w[d.a.R(n)] && l(t, n);
              }
              function f(e) {
                var n = [],
                  t = {},
                  i = [];
                return (
                  d.a.P(e, function a(o) {
                    if (!t[o]) {
                      var r = d.getBindingHandler(o);
                      r &&
                        (r.after &&
                          (i.push(o),
                          d.a.D(r.after, function (n) {
                            if (e[n]) {
                              if (-1 !== d.a.A(i, n))
                                throw Error(
                                  "Cannot combine the following bindings, because they have a cyclic dependency: " +
                                    i.join(", ")
                                );
                              a(n);
                            }
                          }),
                          i.length--),
                        n.push({ key: o, Mc: r })),
                        (t[o] = !0);
                    }
                  }),
                  n
                );
              }
              function h(n, t, i) {
                var a = d.a.g.Ub(n, Q, {}),
                  o = a.hd;
                if (!t) {
                  if (o)
                    throw Error(
                      "You cannot apply bindings multiple times to the same element."
                    );
                  a.hd = !0;
                }
                o || (a.context = i), a.Zb || (a.Zb = {});
                var r;
                if (t && "function" != typeof t) r = t;
                else {
                  var s = d.ga.instance,
                    c = s.getBindingAccessors || u,
                    l = d.$(
                      function () {
                        return (
                          (r = t ? t(i, n) : c.call(s, n, i)) &&
                            (i[m] && i[m](), i[E] && i[E]()),
                          r
                        );
                      },
                      null,
                      { l: n }
                    );
                  (r && l.ja()) || (l = null);
                }
                var g,
                  h = i;
                if (r) {
                  var p = function () {
                      return d.a.Ga(l ? l() : r, A);
                    },
                    B = l
                      ? function (e) {
                          return function () {
                            return A(l()[e]);
                          };
                        }
                      : function (e) {
                          return r[e];
                        };
                  (p.get = function (e) {
                    return r[e] && A(B(e));
                  }),
                    (p.has = function (e) {
                      return e in r;
                    }),
                    d.i.H in r &&
                      d.i.subscribe(n, d.i.H, function () {
                        var e = (0, r[d.i.H])();
                        if (e) {
                          var t = d.h.childNodes(n);
                          t.length && e(t, d.Ec(t[0]));
                        }
                      }),
                    d.i.pa in r &&
                      ((h = d.i.Cb(n, i)),
                      d.i.subscribe(n, d.i.pa, function () {
                        var e = (0, r[d.i.pa])();
                        e && d.h.firstChild(n) && e(n);
                      })),
                    (a = f(r)),
                    d.a.D(a, function (t) {
                      var i = t.Mc.init,
                        a = t.Mc.update,
                        o = t.key;
                      if (8 === n.nodeType && !d.h.ea[o])
                        throw Error(
                          "The binding '" +
                            o +
                            "' cannot be used with virtual elements"
                        );
                      try {
                        "function" == typeof i &&
                          d.u.G(function () {
                            var t = i(n, B(o), p, h.$data, h);
                            if (t && t.controlsDescendantBindings) {
                              if (g !== e)
                                throw Error(
                                  "Multiple bindings (" +
                                    g +
                                    " and " +
                                    o +
                                    ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element."
                                );
                              g = o;
                            }
                          }),
                          "function" == typeof a &&
                            d.$(
                              function () {
                                a(n, B(o), p, h.$data, h);
                              },
                              null,
                              { l: n }
                            );
                      } catch (e) {
                        throw (
                          ((e.message =
                            'Unable to process binding "' +
                            o +
                            ": " +
                            r[o] +
                            '"\nMessage: ' +
                            e.message),
                          e)
                        );
                      }
                    });
                }
                return (
                  (a = g === e),
                  {
                    shouldBindDescendants: a,
                    bindingContextForDescendants: a && h,
                  }
                );
              }
              function p(n, t) {
                return n && n instanceof d.fa ? n : new d.fa(n, e, e, t);
              }
              var m = d.a.Da("_subscribable"),
                B = d.a.Da("_ancestorBindingInfo"),
                E = d.a.Da("_dataDependency");
              d.c = {};
              var w = { script: !0, textarea: !0, template: !0 };
              d.getBindingHandler = function (e) {
                return d.c[e];
              };
              var M = {};
              (d.fa = function (n, t, i, a, o) {
                function r() {
                  var e = l ? u() : u,
                    n = d.a.f(e);
                  return (
                    t
                      ? (d.a.extend(s, t), B in t && (s[B] = t[B]))
                      : ((s.$parents = []), (s.$root = n), (s.ko = d)),
                    (s[m] = A),
                    c ? (n = s.$data) : ((s.$rawData = e), (s.$data = n)),
                    i && (s[i] = n),
                    a && a(s, t, n),
                    t && t[m] && !d.S.o().Vb(t[m]) && t[m](),
                    g && (s[E] = g),
                    s.$data
                  );
                }
                var A,
                  s = this,
                  c = n === M,
                  u = c ? e : n,
                  l = "function" == typeof u && !d.O(u),
                  g = o && o.dataDependency;
                o && o.exportDependencies
                  ? r()
                  : ((A = d.xb(r)),
                    A.v(),
                    A.ja() ? (A.equalityComparer = null) : (s[m] = e));
              }),
                (d.fa.prototype.createChildContext = function (e, n, t, i) {
                  if (
                    (!i &&
                      n &&
                      "object" == typeof n &&
                      ((i = n), (n = i.as), (t = i.extend)),
                    n && i && i.noChildContext)
                  ) {
                    var a = "function" == typeof e && !d.O(e);
                    return new d.fa(
                      M,
                      this,
                      null,
                      function (i) {
                        t && t(i), (i[n] = a ? e() : e);
                      },
                      i
                    );
                  }
                  return new d.fa(
                    e,
                    this,
                    n,
                    function (e, n) {
                      (e.$parentContext = n),
                        (e.$parent = n.$data),
                        (e.$parents = (n.$parents || []).slice(0)),
                        e.$parents.unshift(e.$parent),
                        t && t(e);
                    },
                    i
                  );
                }),
                (d.fa.prototype.extend = function (e, n) {
                  return new d.fa(
                    M,
                    this,
                    null,
                    function (n) {
                      d.a.extend(n, "function" == typeof e ? e(n) : e);
                    },
                    n
                  );
                });
              var Q = d.a.g.Z();
              (o.prototype.Tc = function () {
                this.Kb && this.Kb.N && this.Kb.N.sd(this.node);
              }),
                (o.prototype.sd = function (e) {
                  d.a.Pa(this.kb, e), !this.kb.length && this.H && this.Cc();
                }),
                (o.prototype.Cc = function () {
                  (this.H = !0),
                    this.yc.N &&
                      !this.kb.length &&
                      ((this.yc.N = null),
                      d.a.K.yb(this.node, i),
                      d.i.ma(this.node, d.i.pa),
                      this.Tc());
                }),
                (d.i = {
                  H: "childrenComplete",
                  pa: "descendantsComplete",
                  subscribe: function (e, n, t, i, a) {
                    var o = d.a.g.Ub(e, Q, {});
                    return (
                      o.Fa || (o.Fa = new d.T()),
                      a && a.notifyImmediately && o.Zb[n] && d.u.G(t, i, [e]),
                      o.Fa.subscribe(t, i, n)
                    );
                  },
                  ma: function (n, t) {
                    var i = d.a.g.get(n, Q);
                    if (
                      i &&
                      ((i.Zb[t] = !0),
                      i.Fa && i.Fa.notifySubscribers(n, t),
                      t == d.i.H)
                    )
                      if (i.N) i.N.Cc();
                      else if (i.N === e && i.Fa && i.Fa.Wa(d.i.pa))
                        throw Error(
                          "descendantsComplete event not supported for bindings on this node"
                        );
                  },
                  Cb: function (e, n) {
                    var t = d.a.g.Ub(e, Q, {});
                    return (
                      t.N || (t.N = new o(e, t, n[B])),
                      n[B] == t
                        ? n
                        : n.extend(function (e) {
                            e[B] = t;
                          })
                    );
                  },
                }),
                (d.Td = function (e) {
                  return (e = d.a.g.get(e, Q)) && e.context;
                }),
                (d.ib = function (e, n, t) {
                  return 1 === e.nodeType && d.h.Sc(e), h(e, n, p(t));
                }),
                (d.ld = function (e, n, t) {
                  return (t = p(t)), d.ib(e, c(n, t, e), t);
                }),
                (d.Oa = function (e, n) {
                  (1 !== n.nodeType && 8 !== n.nodeType) || l(p(e), n);
                }),
                (d.vc = function (e, i, o) {
                  if (
                    (!a && n.jQuery && (a = n.jQuery), 2 > arguments.length)
                  ) {
                    if (!(i = t.body))
                      throw Error(
                        "ko.applyBindings: could not find document.body; has the document been loaded?"
                      );
                  } else if (!i || (1 !== i.nodeType && 8 !== i.nodeType))
                    throw Error(
                      "ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node"
                    );
                  g(p(e, o), i);
                }),
                (d.Dc = function (n) {
                  return !n || (1 !== n.nodeType && 8 !== n.nodeType)
                    ? e
                    : d.Td(n);
                }),
                (d.Ec = function (n) {
                  return (n = d.Dc(n)) ? n.$data : e;
                }),
                d.b("bindingHandlers", d.c),
                d.b("bindingEvent", d.i),
                d.b("bindingEvent.subscribe", d.i.subscribe),
                d.b("bindingEvent.startPossiblyAsyncContentBinding", d.i.Cb),
                d.b("applyBindings", d.vc),
                d.b("applyBindingsToDescendants", d.Oa),
                d.b("applyBindingAccessorsToNode", d.ib),
                d.b("applyBindingsToNode", d.ld),
                d.b("contextFor", d.Dc),
                d.b("dataFor", d.Ec);
            })(),
            (function (e) {
              function n(n, i) {
                var r,
                  A = Object.prototype.hasOwnProperty.call(a, n) ? a[n] : e;
                A
                  ? A.subscribe(i)
                  : ((A = a[n] = new d.T()),
                    A.subscribe(i),
                    t(n, function (e, t) {
                      var i = !(!t || !t.synchronous);
                      (o[n] = { definition: e, Gd: i }),
                        delete a[n],
                        r || i
                          ? A.notifySubscribers(e)
                          : d.na.zb(function () {
                              A.notifySubscribers(e);
                            });
                    }),
                    (r = !0));
              }
              function t(e, n) {
                i("getConfig", [e], function (t) {
                  t
                    ? i("loadComponent", [e, t], function (e) {
                        n(e, t);
                      })
                    : n(null, null);
                });
              }
              function i(n, t, a, o) {
                o || (o = d.j.loaders.slice(0));
                var r = o.shift();
                if (r) {
                  var A = r[n];
                  if (A) {
                    var s = !1;
                    if (
                      A.apply(
                        r,
                        t.concat(function (e) {
                          s ? a(null) : null !== e ? a(e) : i(n, t, a, o);
                        })
                      ) !== e &&
                      ((s = !0), !r.suppressLoaderExceptions)
                    )
                      throw Error(
                        "Component loaders must supply values by invoking the callback, not by returning values synchronously."
                      );
                  } else i(n, t, a, o);
                } else a(null);
              }
              var a = {},
                o = {};
              (d.j = {
                get: function (t, i) {
                  var a = Object.prototype.hasOwnProperty.call(o, t) ? o[t] : e;
                  a
                    ? a.Gd
                      ? d.u.G(function () {
                          i(a.definition);
                        })
                      : d.na.zb(function () {
                          i(a.definition);
                        })
                    : n(t, i);
                },
                Bc: function (e) {
                  delete o[e];
                },
                oc: i,
              }),
                (d.j.loaders = []),
                d.b("components", d.j),
                d.b("components.get", d.j.get),
                d.b("components.clearCachedDefinition", d.j.Bc);
            })(),
            (function () {
              function e(e, n, t, i) {
                function a() {
                  0 == --A && i(o);
                }
                var o = {},
                  A = 2,
                  s = t.template;
                (t = t.viewModel),
                  s
                    ? r(n, s, function (n) {
                        d.j.oc("loadTemplate", [e, n], function (e) {
                          (o.template = e), a();
                        });
                      })
                    : a(),
                  t
                    ? r(n, t, function (n) {
                        d.j.oc("loadViewModel", [e, n], function (e) {
                          (o[u] = e), a();
                        });
                      })
                    : a();
              }
              function i(e, n, t) {
                if ("function" == typeof n)
                  t(function (e) {
                    return new n(e);
                  });
                else if ("function" == typeof n[u]) t(n[u]);
                else if ("instance" in n) {
                  var a = n.instance;
                  t(function () {
                    return a;
                  });
                } else
                  "viewModel" in n
                    ? i(e, n.viewModel, t)
                    : e("Unknown viewModel value: " + n);
              }
              function a(e) {
                switch (d.a.R(e)) {
                  case "script":
                    return d.a.ua(e.text);
                  case "textarea":
                    return d.a.ua(e.value);
                  case "template":
                    if (o(e.content)) return d.a.Ca(e.content.childNodes);
                }
                return d.a.Ca(e.childNodes);
              }
              function o(e) {
                return n.DocumentFragment
                  ? e instanceof DocumentFragment
                  : e && 11 === e.nodeType;
              }
              function r(e, t, i) {
                "string" == typeof t.require
                  ? A || n.require
                    ? (A || n.require)([t.require], function (e) {
                        e &&
                          "object" == typeof e &&
                          e.Xd &&
                          e.default &&
                          (e = e.default),
                          i(e);
                      })
                    : e("Uses require, but no AMD loader is present")
                  : i(t);
              }
              function s(e) {
                return function (n) {
                  throw Error("Component '" + e + "': " + n);
                };
              }
              var c = {};
              (d.j.register = function (e, n) {
                if (!n) throw Error("Invalid configuration for " + e);
                if (d.j.tb(e))
                  throw Error("Component " + e + " is already registered");
                c[e] = n;
              }),
                (d.j.tb = function (e) {
                  return Object.prototype.hasOwnProperty.call(c, e);
                }),
                (d.j.unregister = function (e) {
                  delete c[e], d.j.Bc(e);
                }),
                (d.j.Fc = {
                  getConfig: function (e, n) {
                    n(d.j.tb(e) ? c[e] : null);
                  },
                  loadComponent: function (n, t, i) {
                    var a = s(n);
                    r(a, t, function (t) {
                      e(n, a, t, i);
                    });
                  },
                  loadTemplate: function (e, i, r) {
                    if (((e = s(e)), "string" == typeof i)) r(d.a.ua(i));
                    else if (i instanceof Array) r(i);
                    else if (o(i)) r(d.a.la(i.childNodes));
                    else if (i.element)
                      if (
                        ((i = i.element),
                        n.HTMLElement
                          ? i instanceof HTMLElement
                          : i && i.tagName && 1 === i.nodeType)
                      )
                        r(a(i));
                      else if ("string" == typeof i) {
                        var A = t.getElementById(i);
                        A ? r(a(A)) : e("Cannot find element with ID " + i);
                      } else e("Unknown element type: " + i);
                    else e("Unknown template value: " + i);
                  },
                  loadViewModel: function (e, n, t) {
                    i(s(e), n, t);
                  },
                });
              var u = "createViewModel";
              d.b("components.register", d.j.register),
                d.b("components.isRegistered", d.j.tb),
                d.b("components.unregister", d.j.unregister),
                d.b("components.defaultLoader", d.j.Fc),
                d.j.loaders.push(d.j.Fc),
                (d.j.dd = c);
            })(),
            (function () {
              function e(e, t) {
                var i = e.getAttribute("params");
                if (i) {
                  var i = n.parseBindingsString(i, t, e, {
                      valueAccessors: !0,
                      bindingParams: !0,
                    }),
                    i = d.a.Ga(i, function (n) {
                      return d.o(n, null, { l: e });
                    }),
                    a = d.a.Ga(i, function (n) {
                      var t = n.v();
                      return n.ja()
                        ? d.o({
                            read: function () {
                              return d.a.f(n());
                            },
                            write:
                              d.Za(t) &&
                              function (e) {
                                n()(e);
                              },
                            l: e,
                          })
                        : t;
                    });
                  return (
                    Object.prototype.hasOwnProperty.call(a, "$raw") ||
                      (a.$raw = i),
                    a
                  );
                }
                return { $raw: {} };
              }
              (d.j.getComponentNameForNode = function (e) {
                var n = d.a.R(e);
                if (
                  d.j.tb(n) &&
                  (-1 != n.indexOf("-") ||
                    "[object HTMLUnknownElement]" == "" + e ||
                    (8 >= d.a.W && e.tagName === n))
                )
                  return n;
              }),
                (d.j.tc = function (n, t, i, a) {
                  if (1 === t.nodeType) {
                    var o = d.j.getComponentNameForNode(t);
                    if (o) {
                      if (((n = n || {}), n.component))
                        throw Error(
                          'Cannot use the "component" binding on a custom element matching a component'
                        );
                      var r = { name: o, params: e(t, i) };
                      n.component = a
                        ? function () {
                            return r;
                          }
                        : r;
                    }
                  }
                  return n;
                });
              var n = new d.ga();
              9 > d.a.W &&
                ((d.j.register = (function (e) {
                  return function (n) {
                    return e.apply(this, arguments);
                  };
                })(d.j.register)),
                (t.createDocumentFragment = (function (e) {
                  return function () {
                    var n,
                      t = e(),
                      i = d.j.dd;
                    for (n in i);
                    return t;
                  };
                })(t.createDocumentFragment)));
            })(),
            (function () {
              function e(e, n, t) {
                if (!(n = n.template))
                  throw Error("Component '" + e + "' has no template");
                (e = d.a.Ca(n)), d.h.va(t, e);
              }
              function n(e, n, t) {
                var i = e.createViewModel;
                return i ? i.call(e, n, t) : n;
              }
              var t = 0;
              (d.c.component = {
                init: function (i, a, o, r, A) {
                  function s() {
                    var e = c && c.dispose;
                    "function" == typeof e && e.call(c),
                      l && l.s(),
                      (u = c = l = null);
                  }
                  var c,
                    u,
                    l,
                    g = d.a.la(d.h.childNodes(i));
                  return (
                    d.h.Ea(i),
                    d.a.K.za(i, s),
                    d.o(
                      function () {
                        var o,
                          r,
                          f = d.a.f(a());
                        if (
                          ("string" == typeof f
                            ? (o = f)
                            : ((o = d.a.f(f.name)), (r = d.a.f(f.params))),
                          !o)
                        )
                          throw Error("No component name specified");
                        var h = d.i.Cb(i, A),
                          p = (u = ++t);
                        d.j.get(o, function (t) {
                          if (u === p) {
                            if ((s(), !t))
                              throw Error("Unknown component '" + o + "'");
                            e(o, t, i);
                            var a = n(t, r, { element: i, templateNodes: g });
                            (t = h.createChildContext(a, {
                              extend: function (e) {
                                (e.$component = a),
                                  (e.$componentTemplateNodes = g);
                              },
                            })),
                              a &&
                                a.koDescendantsComplete &&
                                (l = d.i.subscribe(
                                  i,
                                  d.i.pa,
                                  a.koDescendantsComplete,
                                  a
                                )),
                              (c = a),
                              d.Oa(t, i);
                          }
                        });
                      },
                      null,
                      { l: i }
                    ),
                    { controlsDescendantBindings: !0 }
                  );
                },
              }),
                (d.h.ea.component = !0);
            })();
          var v = { class: "className", for: "htmlFor" };
          (d.c.attr = {
            update: function (n, t) {
              var i = d.a.f(t()) || {};
              d.a.P(i, function (t, i) {
                i = d.a.f(i);
                var a = t.indexOf(":"),
                  a =
                    "lookupNamespaceURI" in n &&
                    0 < a &&
                    n.lookupNamespaceURI(t.substr(0, a)),
                  o = !1 === i || null === i || i === e;
                o
                  ? a
                    ? n.removeAttributeNS(a, t)
                    : n.removeAttribute(t)
                  : (i = i.toString()),
                  8 >= d.a.W && t in v
                    ? ((t = v[t]), o ? n.removeAttribute(t) : (n[t] = i))
                    : o ||
                      (a ? n.setAttributeNS(a, t, i) : n.setAttribute(t, i)),
                  "name" === t && d.a.Yc(n, o ? "" : i);
              });
            },
          }),
            (function () {
              (d.c.checked = {
                after: ["value", "attr"],
                init: function (n, t, i) {
                  function a() {
                    var a = n.checked,
                      o = r();
                    if (!d.S.Ya() && (a || (!s && !d.S.qa()))) {
                      var c = d.u.G(t);
                      if (u) {
                        var g = l ? c.v() : c,
                          h = f;
                        (f = o),
                          h !== o
                            ? a && (d.a.Na(g, o, !0), d.a.Na(g, h, !1))
                            : d.a.Na(g, o, a),
                          l && d.Za(c) && c(g);
                      } else
                        A && (o === e ? (o = a) : a || (o = e)),
                          d.m.eb(c, i, "checked", o, !0);
                    }
                  }
                  function o() {
                    var i = d.a.f(t()),
                      a = r();
                    u
                      ? ((n.checked = 0 <= d.a.A(i, a)), (f = a))
                      : (n.checked = A && a === e ? !!i : r() === i);
                  }
                  var r = d.xb(function () {
                      return i.has("checkedValue")
                        ? d.a.f(i.get("checkedValue"))
                        : g
                        ? i.has("value")
                          ? d.a.f(i.get("value"))
                          : n.value
                        : void 0;
                    }),
                    A = "checkbox" == n.type,
                    s = "radio" == n.type;
                  if (A || s) {
                    var c = t(),
                      u = A && d.a.f(c) instanceof Array,
                      l = !(u && c.push && c.splice),
                      g = s || u,
                      f = u ? r() : e;
                    s &&
                      !n.name &&
                      d.c.uniqueName.init(n, function () {
                        return !0;
                      }),
                      d.o(a, null, { l: n }),
                      d.a.B(n, "click", a),
                      d.o(o, null, { l: n }),
                      (c = e);
                  }
                },
              }),
                (d.m.wa.checked = !0),
                (d.c.checkedValue = {
                  update: function (e, n) {
                    e.value = d.a.f(n());
                  },
                });
            })(),
            (d.c.class = {
              update: function (e, n) {
                var t = d.a.Db(d.a.f(n()));
                d.a.Eb(e, e.__ko__cssValue, !1),
                  (e.__ko__cssValue = t),
                  d.a.Eb(e, t, !0);
              },
            }),
            (d.c.css = {
              update: function (e, n) {
                var t = d.a.f(n());
                null !== t && "object" == typeof t
                  ? d.a.P(t, function (n, t) {
                      (t = d.a.f(t)), d.a.Eb(e, n, t);
                    })
                  : d.c.class.update(e, n);
              },
            }),
            (d.c.enable = {
              update: function (e, n) {
                var t = d.a.f(n());
                t && e.disabled
                  ? e.removeAttribute("disabled")
                  : t || e.disabled || (e.disabled = !0);
              },
            }),
            (d.c.disable = {
              update: function (e, n) {
                d.c.enable.update(e, function () {
                  return !d.a.f(n());
                });
              },
            }),
            (d.c.event = {
              init: function (e, n, t, i, a) {
                var o = n() || {};
                d.a.P(o, function (o) {
                  "string" == typeof o &&
                    d.a.B(e, o, function (e) {
                      var r,
                        A = n()[o];
                      if (A) {
                        try {
                          var s = d.a.la(arguments);
                          (i = a.$data), s.unshift(i), (r = A.apply(i, s));
                        } finally {
                          !0 !== r &&
                            (e.preventDefault
                              ? e.preventDefault()
                              : (e.returnValue = !1));
                        }
                        !1 === t.get(o + "Bubble") &&
                          ((e.cancelBubble = !0),
                          e.stopPropagation && e.stopPropagation());
                      }
                    });
                });
              },
            }),
            (d.c.foreach = {
              Rc: function (e) {
                return function () {
                  var n = e(),
                    t = d.a.bc(n);
                  return t && "number" != typeof t.length
                    ? (d.a.f(n),
                      {
                        foreach: t.data,
                        as: t.as,
                        noChildContext: t.noChildContext,
                        includeDestroyed: t.includeDestroyed,
                        afterAdd: t.afterAdd,
                        beforeRemove: t.beforeRemove,
                        afterRender: t.afterRender,
                        beforeMove: t.beforeMove,
                        afterMove: t.afterMove,
                        templateEngine: d.ba.Ma,
                      })
                    : { foreach: n, templateEngine: d.ba.Ma };
                };
              },
              init: function (e, n) {
                return d.c.template.init(e, d.c.foreach.Rc(n));
              },
              update: function (e, n, t, i, a) {
                return d.c.template.update(e, d.c.foreach.Rc(n), t, i, a);
              },
            }),
            (d.m.Ra.foreach = !1),
            (d.h.ea.foreach = !0),
            (d.c.hasfocus = {
              init: function (e, n, t) {
                function i(i) {
                  e.__ko_hasfocusUpdating = !0;
                  var a = e.ownerDocument;
                  if ("activeElement" in a) {
                    var o;
                    try {
                      o = a.activeElement;
                    } catch (e) {
                      o = a.body;
                    }
                    i = o === e;
                  }
                  (a = n()),
                    d.m.eb(a, t, "hasfocus", i, !0),
                    (e.__ko_hasfocusLastValue = i),
                    (e.__ko_hasfocusUpdating = !1);
                }
                var a = i.bind(null, !0),
                  o = i.bind(null, !1);
                d.a.B(e, "focus", a),
                  d.a.B(e, "focusin", a),
                  d.a.B(e, "blur", o),
                  d.a.B(e, "focusout", o),
                  (e.__ko_hasfocusLastValue = !1);
              },
              update: function (e, n) {
                var t = !!d.a.f(n());
                e.__ko_hasfocusUpdating ||
                  e.__ko_hasfocusLastValue === t ||
                  (t ? e.focus() : e.blur(),
                  !t &&
                    e.__ko_hasfocusLastValue &&
                    e.ownerDocument.body.focus(),
                  d.u.G(d.a.Fb, null, [e, t ? "focusin" : "focusout"]));
              },
            }),
            (d.m.wa.hasfocus = !0),
            (d.c.hasFocus = d.c.hasfocus),
            (d.m.wa.hasFocus = "hasfocus"),
            (d.c.html = {
              init: function () {
                return { controlsDescendantBindings: !0 };
              },
              update: function (e, n) {
                d.a.fc(e, n());
              },
            }),
            (function () {
              function e(e, n, t) {
                (d.c[e] = {
                  init: function (e, i, a, o, r) {
                    var A,
                      s,
                      c,
                      u,
                      l,
                      g = {};
                    if (n) {
                      o = a.get("as");
                      var f = a.get("noChildContext");
                      (l = !(o && f)),
                        (g = {
                          as: o,
                          noChildContext: f,
                          exportDependencies: l,
                        });
                    }
                    return (
                      (u =
                        (c = "render" == a.get("completeOn")) || a.has(d.i.pa)),
                      d.o(
                        function () {
                          var a,
                            o = d.a.f(i()),
                            f = !t != !o,
                            h = !s;
                          (l || f !== A) &&
                            (u && (r = d.i.Cb(e, r)),
                            f &&
                              ((n && !l) || (g.dataDependency = d.S.o()),
                              (a = n
                                ? r.createChildContext(
                                    "function" == typeof o ? o : i,
                                    g
                                  )
                                : d.S.qa()
                                ? r.extend(null, g)
                                : r)),
                            h &&
                              d.S.qa() &&
                              (s = d.a.Ca(d.h.childNodes(e), !0)),
                            f
                              ? (h || d.h.va(e, d.a.Ca(s)), d.Oa(a, e))
                              : (d.h.Ea(e), c || d.i.ma(e, d.i.H)),
                            (A = f));
                        },
                        null,
                        { l: e }
                      ),
                      { controlsDescendantBindings: !0 }
                    );
                  },
                }),
                  (d.m.Ra[e] = !1),
                  (d.h.ea[e] = !0);
              }
              e("if"), e("ifnot", !1, !0), e("with", !0);
            })(),
            (d.c.let = {
              init: function (e, n, t, i, a) {
                return (
                  (n = a.extend(n)),
                  d.Oa(n, e),
                  { controlsDescendantBindings: !0 }
                );
              },
            }),
            (d.h.ea.let = !0);
          var V = {};
          (d.c.options = {
            init: function (e) {
              if ("select" !== d.a.R(e))
                throw Error("options binding applies only to SELECT elements");
              for (; 0 < e.length; ) e.remove(0);
              return { controlsDescendantBindings: !0 };
            },
            update: function (n, t, i) {
              function a() {
                return d.a.jb(n.options, function (e) {
                  return e.selected;
                });
              }
              function o(e, n, t) {
                var i = typeof n;
                return "function" == i ? n(e) : "string" == i ? e[n] : t;
              }
              function r(e, t) {
                if (h && u) d.i.ma(n, d.i.H);
                else if (f.length) {
                  var i = 0 <= d.a.A(f, d.w.M(t[0]));
                  d.a.Zc(t[0], i),
                    h && !i && d.u.G(d.a.Fb, null, [n, "change"]);
                }
              }
              var A = n.multiple,
                s = 0 != n.length && A ? n.scrollTop : null,
                c = d.a.f(t()),
                u = i.get("valueAllowUnset") && i.has("value"),
                l = i.get("optionsIncludeDestroyed");
              t = {};
              var g,
                f = [];
              u ||
                (A
                  ? (f = d.a.Mb(a(), d.w.M))
                  : 0 <= n.selectedIndex &&
                    f.push(d.w.M(n.options[n.selectedIndex]))),
                c &&
                  (void 0 === c.length && (c = [c]),
                  (g = d.a.jb(c, function (n) {
                    return l || n === e || null === n || !d.a.f(n._destroy);
                  })),
                  i.has("optionsCaption") &&
                    null !== (c = d.a.f(i.get("optionsCaption"))) &&
                    c !== e &&
                    g.unshift(V));
              var h = !1;
              if (
                ((t.beforeRemove = function (e) {
                  n.removeChild(e);
                }),
                (c = r),
                i.has("optionsAfterRender") &&
                  "function" == typeof i.get("optionsAfterRender") &&
                  (c = function (n, t) {
                    r(0, t),
                      d.u.G(i.get("optionsAfterRender"), null, [
                        t[0],
                        n !== V ? n : e,
                      ]);
                  }),
                d.a.ec(
                  n,
                  g,
                  function (t, a, r) {
                    return (
                      r.length &&
                        ((f = !u && r[0].selected ? [d.w.M(r[0])] : []),
                        (h = !0)),
                      (a = n.ownerDocument.createElement("option")),
                      t === V
                        ? (d.a.Bb(a, i.get("optionsCaption")), d.w.cb(a, e))
                        : ((r = o(t, i.get("optionsValue"), t)),
                          d.w.cb(a, d.a.f(r)),
                          (t = o(t, i.get("optionsText"), r)),
                          d.a.Bb(a, t)),
                      [a]
                    );
                  },
                  t,
                  c
                ),
                !u)
              ) {
                var p;
                (p = A
                  ? f.length && a().length < f.length
                  : f.length && 0 <= n.selectedIndex
                  ? d.w.M(n.options[n.selectedIndex]) !== f[0]
                  : f.length || 0 <= n.selectedIndex),
                  p && d.u.G(d.a.Fb, null, [n, "change"]);
              }
              (u || d.S.Ya()) && d.i.ma(n, d.i.H),
                d.a.wd(n),
                s && 20 < Math.abs(s - n.scrollTop) && (n.scrollTop = s);
            },
          }),
            (d.c.options.$b = d.a.g.Z()),
            (d.c.selectedOptions = {
              init: function (e, n, t) {
                function i() {
                  var i = n(),
                    a = [];
                  d.a.D(e.getElementsByTagName("option"), function (e) {
                    e.selected && a.push(d.w.M(e));
                  }),
                    d.m.eb(i, t, "selectedOptions", a);
                }
                function a() {
                  var t = d.a.f(n()),
                    i = e.scrollTop;
                  t &&
                    "number" == typeof t.length &&
                    d.a.D(e.getElementsByTagName("option"), function (e) {
                      var n = 0 <= d.a.A(t, d.w.M(e));
                      e.selected != n && d.a.Zc(e, n);
                    }),
                    (e.scrollTop = i);
                }
                if ("select" != d.a.R(e))
                  throw Error(
                    "selectedOptions binding applies only to SELECT elements"
                  );
                var o;
                d.i.subscribe(
                  e,
                  d.i.H,
                  function () {
                    o
                      ? i()
                      : (d.a.B(e, "change", i), (o = d.o(a, null, { l: e })));
                  },
                  null,
                  { notifyImmediately: !0 }
                );
              },
              update: function () {},
            }),
            (d.m.wa.selectedOptions = !0),
            (d.c.style = {
              update: function (n, t) {
                var i = d.a.f(t() || {});
                d.a.P(i, function (t, i) {
                  if (
                    ((i = d.a.f(i)),
                    (null !== i && i !== e && !1 !== i) || (i = ""),
                    a)
                  )
                    a(n).css(t, i);
                  else if (/^--/.test(t)) n.style.setProperty(t, i);
                  else {
                    t = t.replace(/-(\w)/g, function (e, n) {
                      return n.toUpperCase();
                    });
                    var o = n.style[t];
                    (n.style[t] = i),
                      i === o ||
                        n.style[t] != o ||
                        isNaN(i) ||
                        (n.style[t] = i + "px");
                  }
                });
              },
            }),
            (d.c.submit = {
              init: function (e, n, t, i, a) {
                if ("function" != typeof n())
                  throw Error(
                    "The value for a submit binding must be a function"
                  );
                d.a.B(e, "submit", function (t) {
                  var i,
                    o = n();
                  try {
                    i = o.call(a.$data, e);
                  } finally {
                    !0 !== i &&
                      (t.preventDefault
                        ? t.preventDefault()
                        : (t.returnValue = !1));
                  }
                });
              },
            }),
            (d.c.text = {
              init: function () {
                return { controlsDescendantBindings: !0 };
              },
              update: function (e, n) {
                d.a.Bb(e, n());
              },
            }),
            (d.h.ea.text = !0),
            (function () {
              if (n && n.navigator) {
                var t,
                  i,
                  a,
                  o,
                  r,
                  A = function (e) {
                    if (e) return parseFloat(e[1]);
                  },
                  s = n.navigator.userAgent;
                (t =
                  n.opera && n.opera.version && parseInt(n.opera.version())) ||
                  (r = A(s.match(/Edge\/([^ ]+)$/))) ||
                  A(s.match(/Chrome\/([^ ]+)/)) ||
                  (i = A(s.match(/Version\/([^ ]+) Safari/))) ||
                  (a = A(s.match(/Firefox\/([^ ]+)/))) ||
                  (o = d.a.W || A(s.match(/MSIE ([^ ]+)/))) ||
                  (o = A(s.match(/rv:([^ )]+)/)));
              }
              if (8 <= o && 10 > o)
                var c = d.a.g.Z(),
                  u = d.a.g.Z(),
                  l = function (e) {
                    var n = this.activeElement;
                    (n = n && d.a.g.get(n, u)) && n(e);
                  },
                  g = function (e, n) {
                    var t = e.ownerDocument;
                    d.a.g.get(t, c) ||
                      (d.a.g.set(t, c, !0), d.a.B(t, "selectionchange", l)),
                      d.a.g.set(e, u, n);
                  };
              (d.c.textInput = {
                init: function (n, A, s) {
                  function c(e, t) {
                    d.a.B(n, e, t);
                  }
                  function u() {
                    var t = d.a.f(A());
                    (null !== t && t !== e) || (t = ""),
                      p !== e && t === p
                        ? d.a.setTimeout(u, 4)
                        : n.value !== t &&
                          ((E = !0), (n.value = t), (E = !1), (m = n.value));
                  }
                  function l() {
                    h || ((p = n.value), (h = d.a.setTimeout(f, 4)));
                  }
                  function f() {
                    clearTimeout(h), (p = h = e);
                    var t = n.value;
                    m !== t && ((m = t), d.m.eb(A(), s, "textInput", t));
                  }
                  var h,
                    p,
                    m = n.value,
                    B = 9 == d.a.W ? l : f,
                    E = !1;
                  o && c("keypress", f),
                    11 > o &&
                      c("propertychange", function (e) {
                        E || "value" !== e.propertyName || B(e);
                      }),
                    8 == o && (c("keyup", f), c("keydown", f)),
                    g && (g(n, B), c("dragend", l)),
                    (!o || 9 <= o) && c("input", B),
                    5 > i && "textarea" === d.a.R(n)
                      ? (c("keydown", l), c("paste", l), c("cut", l))
                      : 11 > t
                      ? c("keydown", l)
                      : 4 > a
                      ? (c("DOMAutoComplete", f),
                        c("dragdrop", f),
                        c("drop", f))
                      : r && "number" === n.type && c("keydown", l),
                    c("change", f),
                    c("blur", f),
                    d.o(u, null, { l: n });
                },
              }),
                (d.m.wa.textInput = !0),
                (d.c.textinput = {
                  preprocess: function (e, n, t) {
                    t("textInput", e);
                  },
                });
            })(),
            (d.c.uniqueName = {
              init: function (e, n) {
                if (n()) {
                  var t = "ko_unique_" + ++d.c.uniqueName.rd;
                  d.a.Yc(e, t);
                }
              },
            }),
            (d.c.uniqueName.rd = 0),
            (d.c.using = {
              init: function (e, n, t, i, a) {
                var o;
                return (
                  t.has("as") &&
                    (o = {
                      as: t.get("as"),
                      noChildContext: t.get("noChildContext"),
                    }),
                  (n = a.createChildContext(n, o)),
                  d.Oa(n, e),
                  { controlsDescendantBindings: !0 }
                );
              },
            }),
            (d.h.ea.using = !0),
            (d.c.value = {
              init: function (n, t, i) {
                var a = d.a.R(n),
                  o = "input" == a;
                if (!o || ("checkbox" != n.type && "radio" != n.type)) {
                  var r = [],
                    A = i.get("valueUpdate"),
                    s = !1,
                    c = null;
                  A &&
                    ((r = "string" == typeof A ? [A] : d.a.wc(A)),
                    d.a.Pa(r, "change"));
                  var u = function () {
                    (c = null), (s = !1);
                    var e = t(),
                      a = d.w.M(n);
                    d.m.eb(e, i, "value", a);
                  };
                  !d.a.W ||
                    !o ||
                    "text" != n.type ||
                    "off" == n.autocomplete ||
                    (n.form && "off" == n.form.autocomplete) ||
                    -1 != d.a.A(r, "propertychange") ||
                    (d.a.B(n, "propertychange", function () {
                      s = !0;
                    }),
                    d.a.B(n, "focus", function () {
                      s = !1;
                    }),
                    d.a.B(n, "blur", function () {
                      s && u();
                    })),
                    d.a.D(r, function (e) {
                      var t = u;
                      d.a.Ud(e, "after") &&
                        ((t = function () {
                          (c = d.w.M(n)), d.a.setTimeout(u, 0);
                        }),
                        (e = e.substring(5))),
                        d.a.B(n, e, t);
                    });
                  var l;
                  if (
                    ((l =
                      o && "file" == n.type
                        ? function () {
                            var i = d.a.f(t());
                            null === i || i === e || "" === i
                              ? (n.value = "")
                              : d.u.G(u);
                          }
                        : function () {
                            var o = d.a.f(t()),
                              r = d.w.M(n);
                            null !== c && o === c
                              ? d.a.setTimeout(l, 0)
                              : (o === r && r !== e) ||
                                ("select" === a
                                  ? ((r = i.get("valueAllowUnset")),
                                    d.w.cb(n, o, r),
                                    r || o === d.w.M(n) || d.u.G(u))
                                  : d.w.cb(n, o));
                          }),
                    "select" === a)
                  ) {
                    var g;
                    d.i.subscribe(
                      n,
                      d.i.H,
                      function () {
                        g
                          ? i.get("valueAllowUnset")
                            ? l()
                            : u()
                          : (d.a.B(n, "change", u),
                            (g = d.o(l, null, { l: n })));
                      },
                      null,
                      { notifyImmediately: !0 }
                    );
                  } else d.a.B(n, "change", u), d.o(l, null, { l: n });
                } else d.ib(n, { checkedValue: t });
              },
              update: function () {},
            }),
            (d.m.wa.value = !0),
            (d.c.visible = {
              update: function (e, n) {
                var t = d.a.f(n()),
                  i = "none" != e.style.display;
                t && !i
                  ? (e.style.display = "")
                  : !t && i && (e.style.display = "none");
              },
            }),
            (d.c.hidden = {
              update: function (e, n) {
                d.c.visible.update(e, function () {
                  return !d.a.f(n());
                });
              },
            }),
            (function (e) {
              d.c[e] = {
                init: function (n, t, i, a, o) {
                  return d.c.event.init.call(
                    this,
                    n,
                    function () {
                      var n = {};
                      return (n[e] = t()), n;
                    },
                    i,
                    a,
                    o
                  );
                },
              };
            })("click"),
            (d.ca = function () {}),
            (d.ca.prototype.renderTemplateSource = function () {
              throw Error("Override renderTemplateSource");
            }),
            (d.ca.prototype.createJavaScriptEvaluatorBlock = function () {
              throw Error("Override createJavaScriptEvaluatorBlock");
            }),
            (d.ca.prototype.makeTemplateSource = function (e, n) {
              if ("string" == typeof e) {
                n = n || t;
                var i = n.getElementById(e);
                if (!i) throw Error("Cannot find template with ID " + e);
                return new d.C.F(i);
              }
              if (1 == e.nodeType || 8 == e.nodeType) return new d.C.ia(e);
              throw Error("Unknown template type: " + e);
            }),
            (d.ca.prototype.renderTemplate = function (e, n, t, i) {
              return (
                (e = this.makeTemplateSource(e, i)),
                this.renderTemplateSource(e, n, t, i)
              );
            }),
            (d.ca.prototype.isTemplateRewritten = function (e, n) {
              return (
                !1 === this.allowTemplateRewriting ||
                this.makeTemplateSource(e, n).data("isRewritten")
              );
            }),
            (d.ca.prototype.rewriteTemplate = function (e, n, t) {
              (e = this.makeTemplateSource(e, t)),
                (n = n(e.text())),
                e.text(n),
                e.data("isRewritten", !0);
            }),
            d.b("templateEngine", d.ca),
            (d.kc = (function () {
              function e(e, n, t, i) {
                e = d.m.ac(e);
                for (var a = d.m.Ra, o = 0; o < e.length; o++) {
                  var r = e[o].key;
                  if (Object.prototype.hasOwnProperty.call(a, r)) {
                    var A = a[r];
                    if ("function" == typeof A) {
                      if ((r = A(e[o].value))) throw Error(r);
                    } else if (!A)
                      throw Error(
                        "This template engine does not support the '" +
                          r +
                          "' binding within its templates"
                      );
                  }
                }
                return (
                  (t =
                    "ko.__tr_ambtns(function($context,$element){return(function(){return{ " +
                    d.m.vb(e, { valueAccessors: !0 }) +
                    " } })()},'" +
                    t.toLowerCase() +
                    "')"),
                  i.createJavaScriptEvaluatorBlock(t) + n
                );
              }
              var n =
                  /(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'|[^>]*))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi,
                t = /\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;
              return {
                xd: function (e, n, t) {
                  n.isTemplateRewritten(e, t) ||
                    n.rewriteTemplate(
                      e,
                      function (e) {
                        return d.kc.Ld(e, n);
                      },
                      t
                    );
                },
                Ld: function (i, a) {
                  return i
                    .replace(n, function (n, t, i, o, r) {
                      return e(r, t, i, a);
                    })
                    .replace(t, function (n, t) {
                      return e(t, "\x3c!-- ko --\x3e", "#comment", a);
                    });
                },
                md: function (e, n) {
                  return d.aa.Xb(function (t, i) {
                    var a = t.nextSibling;
                    a && a.nodeName.toLowerCase() === n && d.ib(a, e, i);
                  });
                },
              };
            })()),
            d.b("__tr_ambtns", d.kc.md),
            (function () {
              (d.C = {}),
                (d.C.F = function (e) {
                  if ((this.F = e)) {
                    var n = d.a.R(e);
                    this.ab =
                      "script" === n
                        ? 1
                        : "textarea" === n
                        ? 2
                        : "template" == n &&
                          e.content &&
                          11 === e.content.nodeType
                        ? 3
                        : 4;
                  }
                }),
                (d.C.F.prototype.text = function () {
                  var e =
                    1 === this.ab
                      ? "text"
                      : 2 === this.ab
                      ? "value"
                      : "innerHTML";
                  if (0 == arguments.length) return this.F[e];
                  var n = arguments[0];
                  "innerHTML" === e ? d.a.fc(this.F, n) : (this.F[e] = n);
                });
              var n = d.a.g.Z() + "_";
              d.C.F.prototype.data = function (e) {
                if (1 === arguments.length) return d.a.g.get(this.F, n + e);
                d.a.g.set(this.F, n + e, arguments[1]);
              };
              var t = d.a.g.Z();
              (d.C.F.prototype.nodes = function () {
                var n = this.F;
                if (0 == arguments.length) {
                  var i = d.a.g.get(n, t) || {},
                    a =
                      i.lb ||
                      (3 === this.ab ? n.content : 4 === this.ab ? n : e);
                  if (!a || i.jd) {
                    var o = this.text();
                    o &&
                      o !== i.bb &&
                      ((a = d.a.Md(o, n.ownerDocument)),
                      d.a.g.set(n, t, { lb: a, bb: o, jd: !0 }));
                  }
                  return a;
                }
                (i = arguments[0]),
                  this.ab !== e && this.text(""),
                  d.a.g.set(n, t, { lb: i });
              }),
                (d.C.ia = function (e) {
                  this.F = e;
                }),
                (d.C.ia.prototype = new d.C.F()),
                (d.C.ia.prototype.constructor = d.C.ia),
                (d.C.ia.prototype.text = function () {
                  if (0 == arguments.length) {
                    var n = d.a.g.get(this.F, t) || {};
                    return n.bb === e && n.lb && (n.bb = n.lb.innerHTML), n.bb;
                  }
                  d.a.g.set(this.F, t, { bb: arguments[0] });
                }),
                d.b("templateSources", d.C),
                d.b("templateSources.domElement", d.C.F),
                d.b("templateSources.anonymousTemplate", d.C.ia);
            })(),
            (function () {
              function n(e, n, t) {
                var i;
                for (n = d.h.nextSibling(n); e && (i = e) !== n; )
                  (e = d.h.nextSibling(i)), t(i, e);
              }
              function t(e, t) {
                if (e.length) {
                  var i = e[0],
                    a = e[e.length - 1],
                    o = i.parentNode,
                    r = d.ga.instance,
                    A = r.preprocessNode;
                  if (A) {
                    if (
                      (n(i, a, function (e, n) {
                        var t = e.previousSibling,
                          o = A.call(r, e);
                        o &&
                          (e === i && (i = o[0] || n),
                          e === a && (a = o[o.length - 1] || t));
                      }),
                      (e.length = 0),
                      !i)
                    )
                      return;
                    i === a ? e.push(i) : (e.push(i, a), d.a.Ua(e, o));
                  }
                  n(i, a, function (e) {
                    (1 !== e.nodeType && 8 !== e.nodeType) || d.vc(t, e);
                  }),
                    n(i, a, function (e) {
                      (1 !== e.nodeType && 8 !== e.nodeType) || d.aa.cd(e, [t]);
                    }),
                    d.a.Ua(e, o);
                }
              }
              function i(e) {
                return e.nodeType ? e : 0 < e.length ? e[0] : null;
              }
              function a(e, n, a, o, A) {
                A = A || {};
                var s = ((e && i(e)) || a || {}).ownerDocument,
                  c = A.templateEngine || r;
                if (
                  (d.kc.xd(a, c, s),
                  (a = c.renderTemplate(a, o, A, s)),
                  "number" != typeof a.length ||
                    (0 < a.length && "number" != typeof a[0].nodeType))
                )
                  throw Error(
                    "Template engine must return an array of DOM nodes"
                  );
                switch (((s = !1), n)) {
                  case "replaceChildren":
                    d.h.va(e, a), (s = !0);
                    break;
                  case "replaceNode":
                    d.a.Xc(e, a), (s = !0);
                    break;
                  case "ignoreTargetNode":
                    break;
                  default:
                    throw Error("Unknown renderMode: " + n);
                }
                return (
                  s &&
                    (t(a, o),
                    A.afterRender &&
                      d.u.G(A.afterRender, null, [a, o[A.as || "$data"]]),
                    "replaceChildren" == n && d.i.ma(e, d.i.H)),
                  a
                );
              }
              function o(e, n, t) {
                return d.O(e) ? e() : "function" == typeof e ? e(n, t) : e;
              }
              var r;
              (d.gc = function (n) {
                if (n != e && !(n instanceof d.ca))
                  throw Error(
                    "templateEngine must inherit from ko.templateEngine"
                  );
                r = n;
              }),
                (d.dc = function (n, t, A, s, c) {
                  if (((A = A || {}), (A.templateEngine || r) == e))
                    throw Error(
                      "Set a template engine before calling renderTemplate"
                    );
                  if (((c = c || "replaceChildren"), s)) {
                    var u = i(s);
                    return d.$(
                      function () {
                        var e =
                            t && t instanceof d.fa
                              ? t
                              : new d.fa(t, null, null, null, {
                                  exportDependencies: !0,
                                }),
                          r = o(n, e.$data, e),
                          e = a(s, c, r, e, A);
                        "replaceNode" == c && ((s = e), (u = i(s)));
                      },
                      null,
                      {
                        Sa: function () {
                          return !u || !d.a.Sb(u);
                        },
                        l: u && "replaceNode" == c ? u.parentNode : u,
                      }
                    );
                  }
                  return d.aa.Xb(function (e) {
                    d.dc(n, t, A, e, "replaceNode");
                  });
                }),
                (d.Qd = function (n, i, r, A, s) {
                  function c(e, n) {
                    d.u.G(d.a.ec, null, [A, e, l, r, u, n]), d.i.ma(A, d.i.H);
                  }
                  function u(e, n) {
                    t(n, g), r.afterRender && r.afterRender(n, e), (g = null);
                  }
                  function l(e, t) {
                    g = s.createChildContext(e, {
                      as: f,
                      noChildContext: r.noChildContext,
                      extend: function (e) {
                        (e.$index = t), f && (e[f + "Index"] = t);
                      },
                    });
                    var i = o(n, e, g);
                    return a(A, "ignoreTargetNode", i, g, r);
                  }
                  var g,
                    f = r.as,
                    h =
                      !1 === r.includeDestroyed ||
                      (d.options.foreachHidesDestroyed && !r.includeDestroyed);
                  if (h || r.beforeRemove || !d.Pc(i))
                    return d.$(
                      function () {
                        var n = d.a.f(i) || [];
                        void 0 === n.length && (n = [n]),
                          h &&
                            (n = d.a.jb(n, function (n) {
                              return (
                                n === e || null === n || !d.a.f(n._destroy)
                              );
                            })),
                          c(n);
                      },
                      null,
                      { l: A }
                    );
                  c(i.v());
                  var p = i.subscribe(
                    function (e) {
                      c(i(), e);
                    },
                    null,
                    "arrayChange"
                  );
                  return p.l(A), p;
                });
              var A = d.a.g.Z(),
                s = d.a.g.Z();
              (d.c.template = {
                init: function (e, n) {
                  var t = d.a.f(n());
                  if ("string" == typeof t || "name" in t) d.h.Ea(e);
                  else if ("nodes" in t) {
                    if (((t = t.nodes || []), d.O(t)))
                      throw Error(
                        'The "nodes" option must be a plain, non-observable array.'
                      );
                    var i = t[0] && t[0].parentNode;
                    (i && d.a.g.get(i, s)) ||
                      ((i = d.a.Yb(t)), d.a.g.set(i, s, !0)),
                      new d.C.ia(e).nodes(i);
                  } else {
                    if (((t = d.h.childNodes(e)), !(0 < t.length)))
                      throw Error(
                        "Anonymous template defined, but no template content was provided"
                      );
                    (i = d.a.Yb(t)), new d.C.ia(e).nodes(i);
                  }
                  return { controlsDescendantBindings: !0 };
                },
                update: function (n, t, i, a, o) {
                  var r = t();
                  (t = d.a.f(r)),
                    (i = !0),
                    (a = null),
                    "string" == typeof t
                      ? (t = {})
                      : ((r = "name" in t ? t.name : n),
                        "if" in t && (i = d.a.f(t.if)),
                        i && "ifnot" in t && (i = !d.a.f(t.ifnot)),
                        i && !r && (i = !1)),
                    "foreach" in t
                      ? (a = d.Qd(r, (i && t.foreach) || [], t, n, o))
                      : i
                      ? ((i = o),
                        "data" in t &&
                          (i = o.createChildContext(t.data, {
                            as: t.as,
                            noChildContext: t.noChildContext,
                            exportDependencies: !0,
                          })),
                        (a = d.dc(r, i, t, n)))
                      : d.h.Ea(n),
                    (o = a),
                    (t = d.a.g.get(n, A)) && "function" == typeof t.s && t.s(),
                    d.a.g.set(n, A, !o || (o.ja && !o.ja()) ? e : o);
                },
              }),
                (d.m.Ra.template = function (e) {
                  return (
                    (e = d.m.ac(e)),
                    (1 == e.length && e[0].unknown) || d.m.Id(e, "name")
                      ? null
                      : "This template engine does not support anonymous templates nested within its templates"
                  );
                }),
                (d.h.ea.template = !0);
            })(),
            d.b("setTemplateEngine", d.gc),
            d.b("renderTemplate", d.dc),
            (d.a.Kc = function (e, n, t) {
              if (e.length && n.length) {
                var i, a, o, r, A;
                for (i = a = 0; (!t || i < t) && (r = e[a]); ++a) {
                  for (o = 0; (A = n[o]); ++o)
                    if (r.value === A.value) {
                      (r.moved = A.index),
                        (A.moved = r.index),
                        n.splice(o, 1),
                        (i = o = 0);
                      break;
                    }
                  i += o;
                }
              }
            }),
            (d.a.Pb = (function () {
              function e(e, n, t, i, a) {
                var o,
                  r,
                  A,
                  s,
                  c,
                  u = Math.min,
                  l = Math.max,
                  g = [],
                  f = e.length,
                  h = n.length,
                  p = h - f || 1,
                  m = f + h + 1;
                for (o = 0; o <= f; o++)
                  for (
                    s = A, g.push((A = [])), c = u(h, o + p), r = l(0, o - 1);
                    r <= c;
                    r++
                  )
                    A[r] = r
                      ? o
                        ? e[o - 1] === n[r - 1]
                          ? s[r - 1]
                          : u(s[r] || m, A[r - 1] || m) + 1
                        : r + 1
                      : o + 1;
                for (u = [], l = [], p = [], o = f, r = h; o || r; )
                  (h = g[o][r] - 1),
                    r && h === g[o][r - 1]
                      ? l.push(
                          (u[u.length] = { status: t, value: n[--r], index: r })
                        )
                      : o && h === g[o - 1][r]
                      ? p.push(
                          (u[u.length] = { status: i, value: e[--o], index: o })
                        )
                      : (--r,
                        --o,
                        a.sparse ||
                          u.push({ status: "retained", value: n[r] }));
                return d.a.Kc(p, l, !a.dontLimitMoves && 10 * f), u.reverse();
              }
              return function (n, t, i) {
                return (
                  (i = "boolean" == typeof i ? { dontLimitMoves: i } : i || {}),
                  (n = n || []),
                  (t = t || []),
                  n.length < t.length
                    ? e(n, t, "added", "deleted", i)
                    : e(t, n, "deleted", "added", i)
                );
              };
            })()),
            d.b("utils.compareArrays", d.a.Pb),
            (function () {
              function n(n, t, i, a, o) {
                var r = [],
                  A = d.$(
                    function () {
                      var e = t(i, o, d.a.Ua(r, n)) || [];
                      0 < r.length &&
                        (d.a.Xc(r, e), a && d.u.G(a, null, [i, e, o])),
                        (r.length = 0),
                        d.a.Nb(r, e);
                    },
                    null,
                    {
                      l: n,
                      Sa: function () {
                        return !d.a.kd(r);
                      },
                    }
                  );
                return { Y: r, $: A.ja() ? A : e };
              }
              var t = d.a.g.Z(),
                i = d.a.g.Z();
              d.a.ec = function (a, o, r, A, s, c) {
                function u(e) {
                  (f = { Aa: e, pb: d.ta(E++) }), m.push(f), p || C.push(f);
                }
                function l(e) {
                  (f = h[e]),
                    E !== f.pb.v() && b.push(f),
                    f.pb(E++),
                    d.a.Ua(f.Y, a),
                    m.push(f);
                }
                function g(e, n) {
                  if (e)
                    for (var t = 0, i = n.length; t < i; t++)
                      d.a.D(n[t].Y, function (i) {
                        e(i, t, n[t].Aa);
                      });
                }
                (o = o || []), void 0 === o.length && (o = [o]), (A = A || {});
                var f,
                  h = d.a.g.get(a, t),
                  p = !h,
                  m = [],
                  B = 0,
                  E = 0,
                  w = [],
                  M = [],
                  Q = [],
                  b = [],
                  C = [],
                  v = 0;
                if (p) d.a.D(o, u);
                else {
                  if (!c || (h && h._countWaitingForRemove)) {
                    var V = d.a.Mb(h, function (e) {
                      return e.Aa;
                    });
                    c = d.a.Pb(V, o, {
                      dontLimitMoves: A.dontLimitMoves,
                      sparse: !0,
                    });
                  }
                  for (var I, y, D, V = 0; (I = c[V]); V++)
                    switch (((y = I.moved), (D = I.index), I.status)) {
                      case "deleted":
                        for (; B < D; ) l(B++);
                        y === e &&
                          ((f = h[B]),
                          f.$ && (f.$.s(), (f.$ = e)),
                          d.a.Ua(f.Y, a).length &&
                            (A.beforeRemove &&
                              (m.push(f),
                              v++,
                              f.Aa === i ? (f = null) : Q.push(f)),
                            f && w.push.apply(w, f.Y))),
                          B++;
                        break;
                      case "added":
                        for (; E < D; ) l(B++);
                        y !== e ? (M.push(m.length), l(y)) : u(I.value);
                    }
                  for (; E < o.length; ) l(B++);
                  m._countWaitingForRemove = v;
                }
                d.a.g.set(a, t, m),
                  g(A.beforeMove, b),
                  d.a.D(w, A.beforeRemove ? d.oa : d.removeNode);
                var x, G, Y;
                try {
                  Y = a.ownerDocument.activeElement;
                } catch (e) {}
                if (M.length)
                  for (; (V = M.shift()) != e; ) {
                    for (f = m[V], x = e; V; )
                      if ((G = m[--V].Y) && G.length) {
                        x = G[G.length - 1];
                        break;
                      }
                    for (o = 0; (B = f.Y[o]); x = B, o++) d.h.Wb(a, B, x);
                  }
                for (V = 0; (f = m[V]); V++) {
                  for (
                    f.Y || d.a.extend(f, n(a, r, f.Aa, s, f.pb)), o = 0;
                    (B = f.Y[o]);
                    x = B, o++
                  )
                    d.h.Wb(a, B, x);
                  !f.Ed &&
                    s &&
                    (s(f.Aa, f.Y, f.pb),
                    (f.Ed = !0),
                    (x = f.Y[f.Y.length - 1]));
                }
                for (
                  Y && a.ownerDocument.activeElement != Y && Y.focus(),
                    g(A.beforeRemove, Q),
                    V = 0;
                  V < Q.length;
                  ++V
                )
                  Q[V].Aa = i;
                g(A.afterMove, b), g(A.afterAdd, C);
              };
            })(),
            d.b("utils.setDomNodeChildrenFromArrayMapping", d.a.ec),
            (d.ba = function () {
              this.allowTemplateRewriting = !1;
            }),
            (d.ba.prototype = new d.ca()),
            (d.ba.prototype.constructor = d.ba),
            (d.ba.prototype.renderTemplateSource = function (e, n, t, i) {
              return (n = (9 > d.a.W ? 0 : e.nodes) ? e.nodes() : null)
                ? d.a.la(n.cloneNode(!0).childNodes)
                : ((e = e.text()), d.a.ua(e, i));
            }),
            (d.ba.Ma = new d.ba()),
            d.gc(d.ba.Ma),
            d.b("nativeTemplateEngine", d.ba),
            (function () {
              (d.$a = function () {
                var e = (this.Hd = (function () {
                  if (!a || !a.tmpl) return 0;
                  try {
                    if (0 <= a.tmpl.tag.tmpl.open.toString().indexOf("__"))
                      return 2;
                  } catch (e) {}
                  return 1;
                })());
                (this.renderTemplateSource = function (n, i, o, r) {
                  if (((r = r || t), (o = o || {}), 2 > e))
                    throw Error(
                      "Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later."
                    );
                  var A = n.data("precompiled");
                  return (
                    A ||
                      ((A = n.text() || ""),
                      (A = a.template(
                        null,
                        "{{ko_with $item.koBindingContext}}" +
                          A +
                          "{{/ko_with}}"
                      )),
                      n.data("precompiled", A)),
                    (n = [i.$data]),
                    (i = a.extend({ koBindingContext: i }, o.templateOptions)),
                    (i = a.tmpl(A, n, i)),
                    i.appendTo(r.createElement("div")),
                    (a.fragments = {}),
                    i
                  );
                }),
                  (this.createJavaScriptEvaluatorBlock = function (e) {
                    return "{{ko_code ((function() { return " + e + " })()) }}";
                  }),
                  (this.addTemplate = function (e, n) {
                    t.write(
                      "<script type='text/html' id='" +
                        e +
                        "'>" +
                        n +
                        "</script>"
                    );
                  }),
                  0 < e &&
                    ((a.tmpl.tag.ko_code = { open: "__.push($1 || '');" }),
                    (a.tmpl.tag.ko_with = { open: "with($1) {", close: "} " }));
              }),
                (d.$a.prototype = new d.ca()),
                (d.$a.prototype.constructor = d.$a);
              var e = new d.$a();
              0 < e.Hd && d.gc(e), d.b("jqueryTmplTemplateEngine", d.$a);
            })();
        });
    })();
  })(),
  define("speedconversions", [], function () {
    function e(e) {
      return Math.sqrt(h * B * e);
    }
    function n(e, n) {
      return e / n / B;
    }
    function t(n, t) {
      return (n * p) / e(t);
    }
    function i(e, n, i) {
      if (2 === arguments.length) {
        var a = n,
          o = A(a);
        (n = o[0]), (i = o[1]);
      }
      return t(c(e, n, i), i);
    }
    function a(n, t, i) {
      if (2 === arguments.length) {
        var a = t,
          o = A(a);
        (t = o[0]), (i = o[1]);
      }
      return s(n * m * e(i), t, i);
    }
    function o(e, n) {
      return e * Math.sqrt(n / w);
    }
    function r(e, n) {
      return e * Math.sqrt(w / n);
    }
    function A(e) {
      var n = Math.exp,
        t = Math.min,
        i = Math.pow,
        a = [
          [288.15, 0, -0.0065],
          [216.65, 11e3, 0],
          [216.65, 2e4, 0.001],
          [228.65, 32e3, 0.0028],
          [270.65, 47e3, 0],
          [270.65, 51e3, -0.0028],
          [214.65, 71e3, -0.002],
          [186.946, 84852, 0],
        ],
        o = 101325,
        r = 288.15;
      return (
        a.some(function (A, s) {
          var c = A[0],
            u = A[1],
            l = a[t(s + 1, a.length - 1)][1],
            h = A[2],
            p = t(e, l) - u;
          if (
            ((r = c + p * h),
            (o *=
              0 === h ? n((-f * d * p) / g / c) : i(c / r, (f * d) / g / h)),
            l >= e)
          )
            return !0;
        }),
        [o, r]
      );
    }
    function s(e, n, t) {
      if (2 === arguments.length) {
        var i = n,
          a = A(i);
        (n = a[0]), (t = a[1]);
      }
      var o = E * m,
        r = M,
        s = n,
        c = Q,
        u = t,
        l = Math.sqrt,
        g = Math.pow;
      return (
        o *
        l(
          5 *
            (g(
              (s * (g((c * e * e) / (5 * u * o * o) + 1, 3.5) - 1)) / r + 1,
              2 / 7
            ) -
              1)
        )
      );
    }
    function c(e, n, t) {
      if (2 === arguments.length) {
        var i = n,
          a = A(i);
        (n = a[0]), (t = a[1]);
      }
      var o = E * m,
        r = M,
        s = n,
        c = Q,
        u = t,
        l = Math.sqrt,
        g = Math.pow;
      return (
        o *
        l(
          ((5 * u) / c) *
            (g((r * (g((e * e) / (5 * o * o) + 1, 3.5) - 1)) / s + 1, 2 / 7) -
              1)
        )
      );
    }
    function u(e, n, t) {
      if (2 === arguments.length) {
        var i = n,
          a = A(i);
        (n = a[0]), a[1];
      }
      var o = E * m,
        r = M;
      return (
        o *
        (0, Math.sqrt)(5 * ((0, Math.pow)((e * e * r) / 2 / r + 1, 2 / 7) - 1))
      );
    }
    function l(e, n, t) {
      if (2 === arguments.length) {
        var i = n,
          a = A(i);
        (n = a[0]), a[1];
      }
      var o = E * m,
        r = M,
        s = (Math.sqrt, Math.pow),
        c = r * (s((e * e) / (5 * o * o) + 1, 3.5) - 1);
      return Math.sqrt((2 * c) / r);
    }
    var g = 8.3144621,
      f = 9.80665,
      d = 0.02896491498930052,
      h = 1.4,
      p = 463 / 900,
      m = 900 / 463,
      B = g / d,
      E = e(288.15),
      w = 1.225,
      M = 101325,
      Q = 288.15;
    return {
      speedOfSound: e,
      tasToMach: t,
      airDensity: n,
      standardConditions: A,
      casToMach: i,
      machToCas: a,
      tasToCas: s,
      casToTas: c,
      tasToEas: o,
      easToTas: r,
      casToEas: l,
      easToCas: u,
    };
  }),
  define("util", [], function () {
    function e(e, n, t) {
      var i = g.get(e);
      if (!i) return g.set(e, [n, t || 2]), n;
      t = i[1];
      var a = n * t + (1 - t) * i[0];
      return (i[0] = a), a;
    }
    function n(e) {
      var n = e % 360;
      return n > 180 ? n - 360 : n <= -180 ? n + 360 : n;
    }
    function t(e) {
      var n = e % 360;
      return n > 0 ? n : n + 360;
    }
    function i(e) {
      return e * f;
    }
    function a(e) {
      return e / f;
    }
    function o(e) {
      return e / d;
    }
    function r(e) {
      return e * d;
    }
    function A(e) {
      return e * h;
    }
    function s(e) {
      return e / h;
    }
    function c(e) {
      return 0 === e && 1 / e == 1 / 0;
    }
    function u(e) {
      return 0 === e && 1 / e == -1 / 0;
    }
    function l(e, n, t) {
      if (((e = +e), (n = +n), (t = +t), n !== n || t !== t)) return NaN;
      if (e < n) return n;
      if (e > t) return t;
      if (0 === e) {
        if (c(n)) return 0;
        if (u(t)) return -0;
      }
      return e;
    }
    var g = new Map(),
      f = 0.017453292519943295,
      d = 1.9438444924406046,
      h = 0.3048;
    return {
      exponentialSmoothing: e,
      fixAngle: n,
      fixAngle360: t,
      deg2rad: i,
      rad2deg: a,
      knots2ms: o,
      ms2knots: r,
      ft2mtrs: A,
      mtrs2ft: s,
      clamp: l,
    };
  }),
  define(
    "autopilot/modes",
    ["knockout", "speedconversions", "util"],
    function (e, n, t) {
      function i(e) {
        var i = t.ft2mtrs(
          window.geofs.aircraft.instance.animationValue.altitude
        );
        return n.casToMach(e, i);
      }
      function a(e) {
        var i = t.ft2mtrs(
          window.geofs.aircraft.instance.animationValue.altitude
        );
        return n.machToCas(e, i);
      }
      var o = { enabled: e.observable(!1), value: e.observable(0) },
        r = { enabled: e.observable(!1), value: e.observable(0) },
        A = { enabled: e.observable(!1), value: e.observable(360) },
        s = {
          enabled: e.observable(!1),
          isMach: e.observable(!1),
          value: e.observable(0),
          toMach: i,
          toKias: a,
        };
      return (
        s.isMach.subscribe(function (e) {
          var n = s.value();
          s.value(e ? i(n) : a(n));
        }),
        { altitude: o, vs: r, heading: A, speed: s }
      );
    }
  ),
  define("pid", [], function () {
    function e(e) {
      e
        ? t.forEach(function (t) {
            this[t] = void 0 === e[t] ? n[t] : e[t];
          }, this)
        : t.forEach(function (e) {
            this[e] = n[e];
          }, this),
        (this.errorSum = 0),
        (this.lastInput = void 0);
    }
    var n = { kp: 0, ti: 1 / 0, td: 0, min: -1 / 0, max: 1 / 0 },
      t = Object.keys(n);
    return (
      t.forEach(function (t) {
        e.prototype[t] = n[t];
      }),
      (e.prototype.compute = function (e, n, t) {
        var i = this.kp,
          a = this.ti,
          o = this.td,
          r = t - e;
        this.errorSum += (r * n) / a;
        var A = void 0 === this.lastInput ? 0 : (this.lastInput - e) / n;
        this.lastInput = e;
        var s = i * (r + this.errorSum + o * A);
        if (a) {
          if (s > this.max)
            return (this.errorSum += (this.max - s) / i), this.max;
          if (s < this.min)
            return (this.errorSum += (this.min - s) / i), this.min;
        }
        return s;
      }),
      (e.prototype.init = function (e) {
        (this.errorSum = e / this.kp), (this.lastInput = void 0);
      }),
      e
    );
  }),
  define("autopilot/pidcontrols", ["pid"], function (e) {
    return {
      climb: new e({ kp: 0.01, ti: 10, td: 0.005, min: -10, max: 10 }),
      pitch: new e({ kp: 0.02, ti: 2, td: 0.01, min: -3, max: 3 }),
      roll: new e({ kp: 0.02, ti: 100, td: 0.01, min: -1, max: 1 }),
      throttle: new e({ kp: 0.015, ti: 2.5, td: 0.1, min: 0, max: 1 }),
    };
  }),
  define("greatcircle", ["knockout", "util"], function (e, n) {
    function t() {
      var e = window.geofs.aircraft.instance.llaLocation,
        t = n.deg2rad(e[0]),
        s = n.deg2rad(e[1]),
        c = n.deg2rad(i()),
        u = n.deg2rad(a());
      if (isFinite(c) && isFinite(u)) {
        var l = n.rad2deg(
          o(r(u - s) * A(c), A(t) * r(c) - r(t) * A(c) * A(u - s))
        );
        return n.fixAngle360(l);
      }
    }
    var i = e.observable(),
      a = e.observable(),
      o = Math.atan2,
      r = Math.sin,
      A = Math.cos;
    return { latitude: i, longitude: a, getHeading: t };
  }),
  define(
    "autopilot",
    [
      "knockout",
      "autopilot/modes",
      "autopilot/pidcontrols",
      "greatcircle",
      "util",
    ],
    function (e, n, t, i, a) {
      function o() {
        l.on(!l.on());
      }
      function r(e) {
        var o = window.geofs.aircraft.instance.animationValue,
          r = a.clamp(o.ktas / 100, 0.5, 5);
        if (
          window.geofs.aircraft.instance.groundContact ||
          window.ui.hud.stallAlarmOn ||
          Math.abs(o.aroll) > 45 ||
          o.atilt > 20 ||
          o.atilt < -35
        )
          return void l.on(!1);
        n.heading.enabled() &&
          (function () {
            if (0 !== l.currentMode() && performance.now() - u > 1e3) {
              var A = i.getHeading();
              isFinite(A) && n.heading.value(Math.round(A)),
                (u = performance.now());
            }
            var s = a.fixAngle(n.heading.value() - o.heading),
              c = Math.min(
                a.rad2deg(Math.atan(0.0027467328927254283 * o.ktas)),
                l.maxBankAngle
              ),
              g = a.clamp(s, -c, c),
              f = t.roll.compute(-o.aroll, e, g);
            (window.controls.roll = a.exponentialSmoothing(
              "apRoll",
              f / r,
              0.9
            )),
              (window.controls.yaw = a.exponentialSmoothing(
                "apYaw",
                window.controls.roll / 2,
                0.1
              )),
              "a380" === window.geofs.aircraft.instance.name &&
                (window.controls.roll *= 3.5);
          })(),
          n.altitude.enabled() &&
            (function () {
              var i = n.altitude.value() - o.altitude,
                A = a.clamp(r * l.commonClimbRate, 0, l.maxClimbRate),
                s = a.clamp(r * l.commonDescentRate, l.maxDescentRate, 0),
                c = n.vs.value(),
                u = void 0 !== c && (0 === c || (c < 0 ? i < -200 : i > 200));
              n.vs.enabled() ? u || n.vs.enabled(!1) : u && n.vs.enabled(!0);
              var g;
              g = u ? c : a.clamp(2.5 * i, s, A);
              var f = t.climb.compute(o.climbrate, e, g);
              f = a.clamp(f, l.minPitchAngle, l.maxPitchAngle);
              var d = t.pitch.compute(-o.atilt, e, f);
              (window.controls.rawPitch = a.exponentialSmoothing(
                "apPitch",
                d / r,
                0.9
              )),
                window.geofs.debug.watch("targetClimbrate", g),
                window.geofs.debug.watch("aTargetTilt", f);
            })(),
          n.speed.enabled() &&
            (function () {
              var i = n.speed.value();
              n.speed.isMach() && (i = n.speed.toKias(i));
              var r = t.throttle.compute(o.kcas, e, i);
              (window.controls.throttle = a.clamp(
                a.exponentialSmoothing("apThrottle", r, 0.9),
                0,
                1
              )),
                window.geofs.debug.watch("throttle", window.controls.throttle);
            })();
      }
      var A = e.observable(!1),
        s = e.pureComputed({
          read: A,
          write: function (e) {
            A(
              window.window.geofs.aircraft.instance.setup.autopilot && e
                ? !0
                : !1
            );
          },
        }),
        c = e.observable(0);
      s.subscribe(function (e) {
        (window.window.controls.autopilot.on = e),
          window.ui.hud.autopilotIndicator(e),
          e ||
            Object.keys(n).forEach(function (e) {
              n[e].enabled(!1);
            });
      }),
        n.heading.enabled.subscribe(function (e) {
          e && t.roll.init(window.controls.roll);
        }),
        n.altitude.enabled.subscribe(function (e) {
          e &&
            (t.climb.init(window.geofs.aircraft.instance.animationValue.atilt),
            t.pitch.init(a.clamp(window.controls.pitch, -1, 1)),
            (window.controls.elevatorTrim = window.controls.rawPitch),
            (window.controls.rawPitch = 0));
        }),
        n.heading.enabled.subscribe(function (e) {
          e && t.throttle.init(window.controls.throttle);
        });
      var u = 0,
        l = {
          on: s,
          toggle: o,
          update: r,
          modes: n,
          currentMode: c,
          maxBankAngle: 25,
          minPitchAngle: -10,
          maxPitchAngle: 10,
          commonClimbRate: 500,
          commonDescentRate: -750,
          maxClimbRate: 3e3,
          maxDescentRate: -4e3,
        };
      return (
        (window.controls.autopilot = {
          on: !1,
          toggle: o,
          turnOff: function () {
            l.on(!1);
          },
          update: r,
        }),
        l
      );
    }
  ),
  define("ui/apdisconnectsound", [], function () {
    return new Audio(
      "data:audio/ogg;base64,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Pb1QJQZpzpLqi/hKB0SRFU/jRiYrTF3jkslY91bASj55qmrXo4kkWWo4BAIKtEGzYJVTVs2ChJEiRypmZmfVTMzlHEiUyxxIkSr0cSJEq5pEkSSS1+OX5MUroQAAUsAABTBBKXkO9C4ReoLHGmmuSRKNpa1qMNLma0l8nVgKEyyU4DT/WyxIlMzjgoBAIBASTyjM55w4kkcSokyTV+2t3lGZRkkFVXLY7bEVQARbeoacrQW5avWx2i4sj8gqMOVDUNCTAEnPqyMkUaebI5RIK3DSW//7pGTjAAOzMtF7TB4qYKUKP2WJiQ5U9T3ssM8pOhQn/ZwYMei0Wp6JErn9yJ5HPM/mktNCo5FJS0CYgABAJ1VQrP8lwqGWfIsBoUAkpKCrlySXc3KeTUfJRLZmqOSNRpK6apzQUiR3uRRliRZKgpVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7RET0j/HyJUdgLzByOgSo3Q0mGkAAAf4AAAAgAAA/wAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ=="
    );
  }),
  define("getwaypoint", ["util"], function (e) {
    function n(n) {
      var t = 1 / 0;
      return n.reduce(function (n, i) {
        var a = window.geofs.aircraft.instance.llaLocation[0],
          o = window.geofs.aircraft.instance.llaLocation[1],
          r = e.deg2rad(a - i[0]),
          A = e.deg2rad(o - i[1]),
          s = 0.5 * e.deg2rad(a + i[0]),
          c = r,
          u = A * Math.cos(s),
          l = c * c + u * u;
        return l < t ? ((t = l), i) : n;
      });
    }
    function t(e) {
      var t = i[e];
      return t || ((t = o[e]) ? t : ((t = a[e]), t ? n(t) : null));
    }
    var i = window.navData.airports,
      a = window.navData.waypoints,
      o = window.navData.navaids;
    return t;
  }),
  define(
    "ui/autopilot",
    ["knockout", "greatcircle", "autopilot", "util", "getwaypoint"],
    function (e, n, t, i, a) {
      function o(e) {
        return parseInt(e);
      }
      function r(e) {
        return i.fixAngle360(parseInt(e));
      }
      function A(e) {
        return i.clamp(parseFloat(e), -90, 90);
      }
      function s(e) {
        return i.clamp(parseFloat(e), -180, 180);
      }
      function c(e, n) {
        return function (t) {
          var i = e(),
            a = n(t);
          a === i || isNaN(a) ? e.notifySubscribers(a) : e(a);
        };
      }
      function u() {
        function i(e) {
          for (var n = Math.abs(e).toFixed(0); n.length < 4; ) n = "0" + n;
          return (e < 0 ? "-" : "") + n;
        }
        (this.on = t.on),
          (this.currentMode = t.currentMode),
          (this.currentModeText = e.pureComputed(function () {
            var e = t.currentMode();
            return f[e];
          })),
          (this.altitude = t.modes.altitude.value.extend({ apValidate: o })),
          (this.altitudeEnabled = t.modes.altitude.enabled),
          (this.vs = e.pureComputed({
            read: function () {
              return t.modes.vs.enabled() ? i(t.modes.vs.value()) : "";
            },
            write: function (e) {
              var n = t.modes.vs.value,
                i = n(),
                a = parseInt(e);
              a !== a && (a = void 0), a !== i ? n(a) : n.notifySubscribers(a);
            },
          })),
          (this.heading = e.pureComputed({
            read: function () {
              for (var e = t.modes.heading.value(); e.length < 3; ) e = "0" + e;
              return e;
            },
            write: c(t.modes.heading.value, r),
          })),
          (this.headingEnabled = t.modes.heading.enabled),
          (this.speed = e.pureComputed({
            read: function () {
              return t.modes.speed
                .value()
                .toFixed(t.modes.speed.isMach() ? 2 : 0);
            },
            write: function (e) {
              var n = t.modes.speed.value,
                i = n(),
                a = t.modes.speed.isMach()
                  ? Math.round(parseFloat(e) + "e2") / 100
                  : parseInt(e);
              a === i || isNaN(a) ? n.notifySubscribers(a) : n(a);
            },
          })),
          (this.speedEnabled = t.modes.speed.enabled),
          (this.speedMode = e.pureComputed({
            read: function () {
              return t.modes.speed.isMach() ? "mach" : "kias";
            },
            write: function (e) {
              t.modes.speed.isMach("mach" === e);
            },
          })),
          (this.lat = n.latitude.extend({ apValidate: A })),
          (this.lon = n.longitude.extend({ apValidate: s }));
        var u = e.observable();
        (this.waypoint = e.pureComputed({
          read: u,
          write: function (e) {
            var t = e.trim().toUpperCase(),
              i = a(t);
            i
              ? (n.latitude(i[0]),
                n.longitude(i[1]),
                e !== t ? u(t) : u.notifySubscribers(t))
              : (u(""),
                alert(
                  'Code "' +
                    e +
                    '" is an invalid or unrecognised ICAO airport code.'
                ));
          },
        })),
          (this.toggle = t.toggle),
          (this.nextMode = function () {
            var e = t.currentMode();
            t.currentMode(e === f.length - 1 ? 0 : e + 1);
          });
      }
      function l(e, n, t) {
        var i = t.get("checked"),
          a = t.get("enable");
        i && i(), a && a();
        var o = e.parentNode.MaterialSwitch;
        o && (o.checkDisabled(), o.checkToggleState());
      }
      function g(e, n, t) {
        var i = t.get("checked"),
          a = t.get("enable");
        i && i(), a && a();
        var o = e.parentNode.MaterialRadio;
        o && (o.checkDisabled(), o.checkToggleState());
      }
      e.extenders.apValidate = function (n, t) {
        return e.pureComputed({ read: n, write: c(n, t) });
      };
      var f = ["Heading mode", "Lat/lon mode", "Waypoint mode"];
      return (
        (e.bindingHandlers.mdlSwitch = { update: l }),
        (e.bindingHandlers.mdlRadio = { update: g }),
        u
      );
    }
  ),
  define("enablekcas", ["speedconversions", "util"], function (e, n) {
    function t() {
      var t = window.geofs.aircraft.instance.animationValue;
      t.kcas = e.tasToCas(t.ktas, n.ft2mtrs(t.altitude));
    }
    function i() {
      var e = setInterval(function () {
        window.window.geofs &&
          window.geofs.aircraft.instance &&
          window.geofs.aircraft.instance.animationValue &&
          (t(),
          ["airspeed", "airspeedJet", "airspeedSupersonic"].forEach(function (
            e
          ) {
            (window.instruments.definitions[
              e
            ].overlay.overlays[0].animations[0].value = "kcas"),
              window.instruments.list &&
                window.instruments.list[e] &&
                (window.instruments.list[
                  e
                ].overlay.children[0].definition.animations[0].value = "kcas");
          }),
          clearInterval(e),
          setInterval(t, 16));
      }, 16);
    }
    return i;
  }),
  define("bugfixes/papi", ["util"], function (e) {
    function n() {
      function n() {
        var n = window.geofs.getGroundAltitude(
          this.location[0],
          this.location[1]
        );
        this.location[2] = n.location[2];
        var a = [i.llaLocation[0], i.llaLocation[1], this.location[2]],
          o = window.geofs.utils.llaDistanceInMeters(
            a,
            this.location,
            this.location
          ),
          r = i.llaLocation[2] - this.location[2],
          A = e.rad2deg(Math.atan2(r, o)),
          s = this.lights;
        t.forEach(function (e, n) {
          var t = A < e;
          s[n].red.setVisibility(t), s[n].white.setVisibility(!t);
        });
      }
      var t = [3.5, 19 / 6, 17 / 6, 2.5],
        i = window.geofs.aircraft.instance;
      (window.geofs.fx.papi.prototype.refresh = function () {
        var e = this;
        this.papiInterval = setInterval(function () {
          n.call(e);
        }, 1e3);
      }),
        Object.keys(window.geofs.fx.litRunways).forEach(function (e) {
          window.geofs.fx.litRunways[e].papis.forEach(function (e) {
            clearInterval(e.papiInterval), e.refresh();
          });
        });
    }
    return n;
  }),
  define("bugfixes/restrictions", [], function () {
    function e() {
      function e() {
        var e = window.geofs.aircraft.instance.animationValue,
          n = window.geofs.aircraft.instance.setup.maxLimits,
          t = n ? n[0] : 1,
          c = n ? n[1] : 44444;
        (e.mach < t && e.altitude < c) ||
          (clearInterval(i),
          (i = void 0),
          (s = !0),
          window.geofs.aircraft.instance.airfoils.forEach(function (e) {
            e.area ? (e.area /= 128) : e.liftFactor && (e.liftFactor /= 128);
          }),
          new window.geofs.fx.ParticuleEmitter({
            anchor: { worldPosition: [0, 0, 0] },
            duration: 3e4,
            rate: 0.05,
            life: 2e3,
            startScale: 1,
            endScale: 50,
            startOpacity: 100,
            endOpacity: 1,
            texture: "darkSmoke",
          }),
          window.geofs.aircraft.instance.engines.forEach(function (e) {
            e.thrust /= 16384;
          }),
          (A = window.geofs.aircraft.instance.setup.maxRPM),
          (window.geofs.aircraft.instance.setup.maxRPM =
            window.geofs.aircraft.instance.setup.minRPM + 1),
          (a = setInterval(function () {
            window.geofs.aircraft.instance.object3d._children.forEach(function (
              e
            ) {
              for (var n = e._localposition, t = 0; t < 2; t++) n[t] *= 1.01;
            });
          }, 100)),
          (r = setTimeout(function () {
            clearInterval(a);
            var e = 0,
              n = window.geofs.aircraft.instance.object3d._children;
            o = setInterval(function () {
              ++e,
                e === n.length
                  ? ((n[0].visible = !1), clearInterval(o))
                  : (n[e].visible = !1);
            }, 300);
          }, 12e3)));
      }
      function n() {
        var e = window.geofs.aircraft.instance.setup.maxLimits;
        return c.has(window.geofs.aircraft.instance.id) || e;
      }
      function t() {
        n() && (i = setInterval(e, 5e3));
      }
      var i,
        a,
        o,
        r,
        A,
        s = !1,
        c = new Set();
      c.add("4"), c.add("5"), c.add("17"), c.add("10");
      var u = window.geofs.aircraft.Aircraft.prototype.reset;
      window.geofs.aircraft.Aircraft.prototype.reset = function (e) {
        clearTimeout(r),
          clearInterval(o),
          clearInterval(a),
          clearInterval(i),
          s &&
            (window.geofs.aircraft.instance.airfoils.forEach(function (e) {
              e.area ? (e.area *= 128) : e.liftFactor && (e.liftFactor *= 128);
            }),
            window.geofs.aircraft.instance.engines.forEach(function (e) {
              e.thrust *= 16384;
            }),
            (window.geofs.aircraft.instance.setup.maxRPM = A),
            (s = !1)),
          t(),
          u.call(this, e);
      };
      var l = setInterval(function () {
        window.geofs.aircraft.instance.setup && (clearInterval(l), t());
      }, 1e3);
    }
    return e;
  }),
  define("text", ["module"], function (e) {
    function n(e, n) {
      return void 0 === e || "" === e ? n : e;
    }
    function t(e, t, i, a) {
      if (t === a) return !0;
      if (e === i) {
        if ("http" === e) return n(t, "80") === n(a, "80");
        if ("https" === e) return n(t, "443") === n(a, "443");
      }
      return !1;
    }
    function i(e) {
      if (e) {
        e = e.replace(r, "");
        var n = e.match(A);
        return n ? n[1] : e;
      }
      return "";
    }
    function a(e) {
      return e
        .replace(/(['\\])/g, "\\$1")
        .replace(/[\f]/g, "\\f")
        .replace(/[\b]/g, "\\b")
        .replace(/[\n]/g, "\\n")
        .replace(/[\t]/g, "\\t")
        .replace(/[\r]/g, "\\r")
        .replace(/[\u2028]/g, "\\u2028")
        .replace(/[\u2029]/g, "\\u2029");
    }
    function o(e) {
      var n,
        t,
        i = e.lastIndexOf("."),
        a = 0 === e.indexOf("./") || 0 === e.indexOf("../");
      -1 !== i && (!a || i > 1)
        ? ((n = e.slice(0, i)), (t = e.slice(i + 1)))
        : (n = e);
      var o = t || n;
      i = o.indexOf("!");
      var r = !1;
      return (
        -1 !== i &&
          ((r = "strip" === o.slice(i + 1)),
          (o = o.slice(0, i)),
          t ? (t = o) : (n = o)),
        { moduleName: n, ext: t, strip: r }
      );
    }
    var r = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
      A = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
      s = "undefined" != typeof location && location.href,
      c = s && location.protocol && location.protocol.replace(/\:/, ""),
      u = s && location.hostname,
      l = s && (location.port || void 0),
      g = Object.create(null),
      f = (e.config && e.config()) || {},
      d = {
        version: "2.0.15",
        strip: i,
        jsEscape: a,
        parseName: o,
        createXhr:
          f.createXhr ||
          function () {
            return new XMLHttpRequest();
          },
        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
        useXhr: function (e, n, i, a) {
          var o = d.xdRegExp.exec(e);
          if (!o) return !0;
          var r = o[2],
            A = o[3].split(":")[0],
            s = A[1];
          return (
            (!r || r === n) &&
            (!A || A.toLowerCase() === i.toLowerCase()) &&
            ((!s && !A) || t(r, s, n, a))
          );
        },
        finishLoad: function (e, n, t, i) {
          n && (t = d.strip(t)), f.isBuild && (g[e] = t), i(t);
        },
        load: function (e, n, t, i) {
          if (i && i.isBuild && !i.inlineText) return void t();
          f.isBuild = i && i.isBuild;
          var a = d.parseName(e),
            o = a.moduleName + (a.ext ? "." + a.ext : ""),
            r = n.toUrl(o),
            A = f.useXhr || d.useXhr;
          if (0 === r.indexOf("empty:")) return void t();
          !s || A(r, c, u, l)
            ? d.get(
                r,
                function (n) {
                  d.finishLoad(e, a.strip, n, t);
                },
                function (e) {
                  t.error && t.error(e);
                }
              )
            : n([o], function (e) {
                d.finishLoad(a.moduleName + "." + a.ext, a.strip, e, t);
              });
        },
        write: function (e, n, t, i) {
          if (g[n]) {
            t(
              "define('" +
                e +
                "!" +
                n +
                "', function () { return '" +
                d.jsEscape(g[n]) +
                "';});\n"
            );
          }
        },
        writeFile: function (e, n, t, i, a) {
          var o = d.parseName(n),
            r = o.ext ? "." + o.ext : "",
            A = o.moduleName + r,
            s = t.toUrl(o.moduleName + r) + ".js";
          d.load(
            A,
            t,
            function (n) {
              function t(e) {
                return i(s, e);
              }
              (t.asModule = function (e, n) {
                return i.asModule(e, s, n);
              }),
                d.write(e, A, t, a);
            },
            a
          );
        },
      };
    if ("undefined" != typeof process) {
      var h = require.nodeRequire("fs");
      d.get = function (e, n, t) {
        try {
          var i = h.readFileSync(e, "utf-8");
          "\ufeff" === i[0] && (i = i.slice(1)), n(i);
        } catch (e) {
          t && t(e);
        }
      };
    } else
      ("xhr" === f.env || (!f.env && d.createXhr())) &&
        (d.get = function (e, n, t, i) {
          var a = d.createXhr();
          a.open("GET", e, !0),
            i &&
              Object.keys(i).forEach(function (e) {
                a.setRequestHeader(e.toLowerCase(), i[e]);
              }),
            f.onXhr && f.onXhr(a, e),
            a.addEventListener("readystatechange", function () {
              if (4 === a.readyState) {
                var i = a.status || 0;
                if (i > 399 && i < 600) {
                  if (t) {
                    var o = new Error(e + " HTTP status: " + i);
                    (o.xhr = a), t(o);
                  }
                } else n(a.responseText);
                f.onXhrComplete && f.onXhrComplete(a, e);
              }
            }),
            a.send(null);
        });
    return d;
  }),
  define("text!ui/ui.html", function () {
    return '<div id="Qantas94Heavy-ap-nav" class="mdl-grid mdl-grid--no-spacing">\n  <div class="mdl-cell mdl-cell--2-col">\n    <h6>Autopilot</h6>\n  </div>\n  <div class="mdl-cell mdl-cell--5-col">\n    <button\n      id="Qantas94Heavy-ap-toggle"\n      class="mdl-button mdl-js-button mdl-button--raised"\n      data-bind="css: { \'mdl-button--colored\': on },\n                       click: toggle, text: on() ? \'Engaged\' : \'Disengaged\'"\n    ></button>\n  </div>\n\n  <div class="mdl-cell mdl-cell--5-col">\n    <button\n      class="mdl-button mdl-js-button mdl-button--raised"\n      data-bind="click: nextMode, text: currentModeText"\n    ></button>\n  </div>\n</div>\n\n<div id="Qantas94Heavy-ap-displays">\n  <div class="mdl-grid mdl-grid--no-spacing">\n    <div class="mdl-cell mdl-cell--6-col">\n      <div class="Qantas94Heavy-switch-container">\n        <label class="mdl-switch mdl-js-switch">\n          <input\n            type="checkbox"\n            class="mdl-switch__input"\n            data-bind="checked: altitudeEnabled, enable: on, mdlSwitch: true"\n          />\n        </label>\n      </div>\n\n      <div class="Qantas94Heavy-input-container">\n        <label>\n          Altitude\n          <input type="number" min="0" step="500" data-bind="value: altitude" />\n        </label>\n      </div>\n    </div>\n\n    <div class="mdl-cell mdl-cell--6-col">\n      <div class="Qantas94Heavy-input-container">\n        <label>\n          V/S\n          <input\n            type="number"\n            placeholder="-----"\n            step="50"\n            data-bind="value: vs"\n          />\n        </label>\n      </div>\n    </div>\n  </div>\n\n  <div class="mdl-grid mdl-grid--no-spacing">\n    <div class="mdl-cell mdl-cell--6-col">\n      <div class="Qantas94Heavy-switch-container">\n        <label class="mdl-switch mdl-js-switch">\n          <input\n            type="checkbox"\n            class="mdl-switch__input"\n            data-bind="checked: headingEnabled, enable: on, mdlSwitch: true"\n          />\n        </label>\n      </div>\n\n      \x3c!-- Heading mode --\x3e\n      <div\n        class="Qantas94Heavy-input-container"\n        data-bind="visible: currentMode() === 0"\n      >\n        <label>\n          Heading\n          <input\n            type="number"\n            min="1"\n            max="360"\n            step="1"\n            data-bind="value: heading"\n          />\n        </label>\n      </div>\n\n      \x3c!-- Lat/lon mode --\x3e\n      <div\n        class="Qantas94Heavy-input-container"\n        data-bind="visible: currentMode() === 1"\n      >\n        <label>\n          Latitude\n          <input type="number" data-bind="value: lat" />\n        </label>\n      </div>\n\n      \x3c!-- Waypoint mode --\x3e\n      <div\n        class="Qantas94Heavy-input-container"\n        data-bind="visible: currentMode() === 2"\n      >\n        <label>\n          Waypoint\n          <input type="text" data-bind="value: waypoint" />\n        </label>\n      </div>\n    </div>\n\n    \x3c!-- Lat/lon mode --\x3e\n    <div\n      class="mdl-cell mdl-cell--6-col"\n      data-bind="visible: currentMode() === 1"\n    >\n      <div class="Qantas94Heavy-input-container">\n        <label>\n          Longitude\n          <input type="number" data-bind="value: lon" />\n        </label>\n      </div>\n    </div>\n  </div>\n\n  <div class="mdl-grid mdl-grid--no-spacing">\n    <div class="mdl-cell mdl-cell--6-col">\n      <div class="Qantas94Heavy-switch-container">\n        <label class="mdl-switch mdl-js-switch">\n          <input\n            type="checkbox"\n            class="mdl-switch__input"\n            data-bind="checked: speedEnabled, enable: on, mdlSwitch: true"\n          />\n        </label>\n      </div>\n      <div class="Qantas94Heavy-input-container">\n        <label>\n          Speed\n          <input\n            type="number"\n            placeholder="0"\n            min="0"\n            step="10"\n            data-bind="value: speed"\n          />\n        </label>\n      </div>\n    </div>\n\n    <div class="mdl-cell mdl-cell--3-col">\n      <label\n        class="mdl-radio mdl-js-radio mdl-js-ripple-effect"\n        for="Qantas94Heavy-spd-kias"\n      >\n        <input\n          type="radio"\n          id="Qantas94Heavy-spd-kias"\n          class="mdl-radio__button"\n          name="options"\n          value="kias"\n          data-bind="checked: speedMode, mdlRadio: true"\n        />\n        <span class="mdl-radio__label">KIAS</span>\n      </label>\n    </div>\n\n    <div class="mdl-cell mdl-cell--3-col">\n      <label\n        class="mdl-radio mdl-js-radio mdl-js-ripple-effect"\n        for="Qantas94Heavy-spd-mach"\n      >\n        <input\n          type="radio"\n          id="Qantas94Heavy-spd-mach"\n          class="mdl-radio__button"\n          name="options"\n          value="mach"\n          data-bind="checked: speedMode, mdlRadio: true"\n        />\n        <span class="mdl-radio__label">Mach</span>\n      </label>\n    </div>\n  </div>\n</div>\n';
  }),
  define("text!ui/ui.css", function () {
    return "#Qantas94Heavy-ap {\n  position: absolute;\n  bottom: 0;\n  box-sizing: border-box;\n  height: 150px;\n  width: 100%;\n  padding: 0 10px 10px;\n  box-shadow: 0px 0px 16px #888 inset;\n}\n\n#Qantas94Heavy-ap-nav > div {\n  text-align: right;\n}\n\n#Qantas94Heavy-ap-nav h6 {\n  margin: 10px 0;\n  line-height: 26px;\n}\n\n#Qantas94Heavy-ap-nav button {\n  margin: 10px 0;\n  width: 150px;\n  height: 26px;\n  line-height: 26px;\n  font-size: 12px;\n  padding: 0 5px;\n  text-align: center;\n  clear: both;\n}\n\n#Qantas94Heavy-ap label {\n  float: right;\n}\n\n#Qantas94Heavy-ap-displays {\n  width: 100%;\n  margin: 0 10px 0 5px;\n}\n\n#Qantas94Heavy-ap-displays > div {\n  overflow: hidden;\n  margin: 3px 0;\n}\n\n#Qantas94Heavy-ap-displays input {\n  font-size: 18px;\n  padding: 0px;\n  width: 70px;\n  line-height: 18px;\n  text-align: right;\n  font-family: monospace;\n  color: #f93;\n  text-shadow: 0px 0px 8px #f93;\n  background-color: #000;\n  border: 2px inset;\n}\n\n#Qantas94Heavy-spd-container {\n  padding-right: 15px;\n}\n\n#Qantas94Heavy-spd-container > div {\n  width: 50%;\n}\n\n.Qantas94Heavy-pull-left {\n  float: left;\n}\n\n.Qantas94Heavy-pull-right {\n  float: right;\n}\n\n.Qantas94Heavy-switch-container {\n  width: 20%;\n  float: left;\n}\n\n.Qantas94Heavy-input-container {\n  overflow: auto;\n  width: 150px;\n}\n";
  }),
  define(
    "ui/main",
    [
      "knockout",
      "autopilot",
      "ui/apdisconnectsound",
      "ui/autopilot",
      "enablekcas",
      "bugfixes/papi",
      "bugfixes/restrictions",
      "text!ui/ui.html",
      "text!ui/ui.css",
    ],
    function (e, n, t, i, a, o, r, A, s) {
      function c(e) {
        e.stopImmediatePropagation();
      }
      function u() {
        $("<style>").text(s).appendTo("head");
        var u = $(".geofs-autopilot")
          .removeClass("geofs-autopilot")
          .prop("id", "Qantas94Heavy-ap")
          .keydown(c)
          .html(A);
        if (window.keyboard_mapping) {
          window.keyboard_mapping.require("addKeybind")(
            "",
            function () {
              window.controls.autopilot.turnOff();
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Backquote" }
          );
        } else
          document.addEventListener("keydown", function (e) {
            "code" in e
              ? "Backquote" === e.code && window.controls.autopilot.turnOff()
              : 192 === e.which && window.controls.autopilot.turnOff();
          });
        n.on.subscribe(function (e) {
          !e && window.geofs.preferences.sound && t.play();
        }),
          o(),
          r(),
          a();
        var l = new i();
        return (
          e.applyBindings(l, u[0]),
          window.componentHandler.upgradeElements(u[0]),
          l
        );
      }
      return u;
    }
  ),
  (function () {
    function e() {
      require(["ui/main"], function (e) {
        e();
      });
    }
    if (
      window.window.geofs &&
      window.geofs.canvas &&
      1 == window.navData.statusCode
    )
      return void e();
    var n = setInterval(function () {
      if (
        window.window.geofs &&
        window.geofs.init &&
        1 == window.navData.statusCode
      )
        if ((clearInterval(n), window.geofs.canvas)) e();
        else {
          var t = window.geofs.init;
          window.geofs.init = function () {
            t(), e();
          };
        }
    }, 16);
  })(),
  define("init", function () {});
var a = (window.autopilot_pp = {});
a.version = "0.11.5";
a.require = require;
a.requirejs = requirejs;
a.define = define;
