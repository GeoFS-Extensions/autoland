/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.6 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
 */

/*!
 * Knockout JavaScript library v3.5.1
 * (c) The Knockout.js team - http://knockoutjs.com/
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

var requirejs, require, define;
!(function (global, setTimeout) {
  function commentReplace(e, t) {
    return t || "";
  }
  function isFunction(e) {
    return "[object Function]" === ostring.call(e);
  }
  function isArray(e) {
    return "[object Array]" === ostring.call(e);
  }
  function each(e, t) {
    if (e) {
      var n;
      for (n = 0; n < e.length && (!e[n] || !t(e[n], n, e)); n += 1);
    }
  }
  function eachReverse(e, t) {
    if (e) {
      var n;
      for (n = e.length - 1; n > -1 && (!e[n] || !t(e[n], n, e)); n -= 1);
    }
  }
  function hasProp(e, t) {
    return hasOwn.call(e, t);
  }
  function getOwn(e, t) {
    return hasProp(e, t) && e[t];
  }
  function eachProp(e, t) {
    var n;
    for (n in e) if (hasProp(e, n) && t(e[n], n)) break;
  }
  function mixin(e, t, n, i) {
    return (
      t &&
        eachProp(t, function (t, r) {
          (!n && hasProp(e, r)) ||
            (!i ||
            "object" != typeof t ||
            !t ||
            isArray(t) ||
            isFunction(t) ||
            t instanceof RegExp
              ? (e[r] = t)
              : (e[r] || (e[r] = {}), mixin(e[r], t, n, i)));
        }),
      e
    );
  }
  function bind(e, t) {
    return function () {
      return t.apply(e, arguments);
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
    var t = global;
    return (
      each(e.split("."), function (e) {
        t = t[e];
      }),
      t
    );
  }
  function makeError(e, t, n, i) {
    var r = new Error(t + "\nhttps://requirejs.org/docs/errors.html#" + e);
    return (
      (r.requireType = e), (r.requireModules = i), n && (r.originalError = n), r
    );
  }
  function newContext(e) {
    function t(e) {
      var t, n;
      for (t = 0; t < e.length; t++)
        if ("." === (n = e[t])) e.splice(t, 1), (t -= 1);
        else if (".." === n) {
          if (0 === t || (1 === t && ".." === e[2]) || ".." === e[t - 1])
            continue;
          t > 0 && (e.splice(t - 1, 2), (t -= 2));
        }
    }
    function n(e, n, i) {
      var r,
        o,
        a,
        s,
        c,
        u,
        l,
        f,
        d,
        p,
        h,
        g = n && n.split("/"),
        b = K.map,
        m = b && b["*"];
      if (
        (e &&
          ((e = e.split("/")),
          (u = e.length - 1),
          K.nodeIdCompat &&
            jsSuffixRegExp.test(e[u]) &&
            (e[u] = e[u].replace(jsSuffixRegExp, "")),
          "." === e[0].charAt(0) &&
            g &&
            ((h = g.slice(0, g.length - 1)), (e = h.concat(e))),
          t(e),
          (e = e.join("/"))),
        i && b && (g || m))
      ) {
        o = e.split("/");
        e: for (a = o.length; a > 0; a -= 1) {
          if (((c = o.slice(0, a).join("/")), g))
            for (s = g.length; s > 0; s -= 1)
              if (
                (r = getOwn(b, g.slice(0, s).join("/"))) &&
                (r = getOwn(r, c))
              ) {
                (l = r), (f = a);
                break e;
              }
          !d && m && getOwn(m, c) && ((d = getOwn(m, c)), (p = a));
        }
        !l && d && ((l = d), (f = p)),
          l && (o.splice(0, f, l), (e = o.join("/")));
      }
      return getOwn(K.pkgs, e) || e;
    }
    function i(e) {
      isBrowser &&
        each(scripts(), function (t) {
          if (
            t.getAttribute("data-requiremodule") === e &&
            t.getAttribute("data-requirecontext") === w.contextName
          )
            return t.parentNode.removeChild(t), !0;
        });
    }
    function r(e) {
      var t = getOwn(K.paths, e);
      if (t && isArray(t) && t.length > 1)
        return (
          t.shift(),
          w.require.undef(e),
          w.makeRequire(null, { skipMap: !0 })([e]),
          !0
        );
    }
    function o(e) {
      var t,
        n = e ? e.indexOf("!") : -1;
      return (
        n > -1 && ((t = e.substring(0, n)), (e = e.substring(n + 1, e.length))),
        [t, e]
      );
    }
    function a(e, t, i, r) {
      var a,
        s,
        c,
        u,
        l = null,
        f = t ? t.name : null,
        d = e,
        p = !0,
        h = "";
      return (
        e || ((p = !1), (e = "_@r" + (A += 1))),
        (u = o(e)),
        (l = u[0]),
        (e = u[1]),
        l && ((l = n(l, f, r)), (s = getOwn(N, l))),
        e &&
          (l
            ? (h = i
                ? e
                : s && s.normalize
                ? s.normalize(e, function (e) {
                    return n(e, f, r);
                  })
                : -1 === e.indexOf("!")
                ? n(e, f, r)
                : e)
            : ((h = n(e, f, r)),
              (u = o(h)),
              (l = u[0]),
              (h = u[1]),
              (i = !0),
              (a = w.nameToUrl(h)))),
        (c = !l || s || i ? "" : "_unnormalized" + (O += 1)),
        {
          prefix: l,
          name: h,
          parentMap: t,
          unnormalized: !!c,
          url: a,
          originalName: d,
          isDefine: p,
          id: (l ? l + "!" + h : h) + c,
        }
      );
    }
    function s(e) {
      var t = e.id,
        n = getOwn(E, t);
      return n || (n = E[t] = new w.Module(e)), n;
    }
    function c(e, t, n) {
      var i = e.id,
        r = getOwn(E, i);
      !hasProp(N, i) || (r && !r.defineEmitComplete)
        ? ((r = s(e)), r.error && "error" === t ? n(r.error) : r.on(t, n))
        : "defined" === t && n(N[i]);
    }
    function u(e, t) {
      var n = e.requireModules,
        i = !1;
      t
        ? t(e)
        : (each(n, function (t) {
            var n = getOwn(E, t);
            n &&
              ((n.error = e), n.events.error && ((i = !0), n.emit("error", e)));
          }),
          i || req.onError(e));
    }
    function l() {
      globalDefQueue.length &&
        (each(globalDefQueue, function (e) {
          var t = e[0];
          "string" == typeof t && (w.defQueueMap[t] = !0), T.push(e);
        }),
        (globalDefQueue = []));
    }
    function f(e) {
      delete E[e], delete C[e];
    }
    function d(e, t, n) {
      var i = e.map.id;
      e.error
        ? e.emit("error", e.error)
        : ((t[i] = !0),
          each(e.depMaps, function (i, r) {
            var o = i.id,
              a = getOwn(E, o);
            !a ||
              e.depMatched[r] ||
              n[o] ||
              (getOwn(t, o) ? (e.defineDep(r, N[o]), e.check()) : d(a, t, n));
          }),
          (n[i] = !0));
    }
    function p() {
      var e,
        t,
        n = 1e3 * K.waitSeconds,
        o = n && w.startTime + n < new Date().getTime(),
        a = [],
        s = [],
        c = !1,
        l = !0;
      if (!y) {
        if (
          ((y = !0),
          eachProp(C, function (e) {
            var n = e.map,
              u = n.id;
            if (e.enabled && (n.isDefine || s.push(e), !e.error))
              if (!e.inited && o)
                r(u) ? ((t = !0), (c = !0)) : (a.push(u), i(u));
              else if (
                !e.inited &&
                e.fetched &&
                n.isDefine &&
                ((c = !0), !n.prefix)
              )
                return (l = !1);
          }),
          o && a.length)
        )
          return (
            (e = makeError(
              "timeout",
              "Load timeout for modules: " + a,
              null,
              a
            )),
            (e.contextName = w.contextName),
            u(e)
          );
        l &&
          each(s, function (e) {
            d(e, {}, {});
          }),
          (o && !t) ||
            !c ||
            (!isBrowser && !isWebWorker) ||
            k ||
            (k = setTimeout(function () {
              (k = 0), p();
            }, 50)),
          (y = !1);
      }
    }
    function h(e) {
      hasProp(N, e[0]) || s(a(e[0], null, !0)).init(e[1], e[2]);
    }
    function g(e, t, n, i) {
      e.detachEvent && !isOpera
        ? i && e.detachEvent(i, t)
        : e.removeEventListener(n, t, !1);
    }
    function b(e) {
      var t = e.currentTarget || e.srcElement;
      return (
        g(t, w.onScriptLoad, "load", "onreadystatechange"),
        g(t, w.onScriptError, "error"),
        { node: t, id: t && t.getAttribute("data-requiremodule") }
      );
    }
    function m() {
      var e;
      for (l(); T.length; ) {
        if (((e = T.shift()), null === e[0]))
          return u(
            makeError(
              "mismatch",
              "Mismatched anonymous define() module: " + e[e.length - 1]
            )
          );
        h(e);
      }
      w.defQueueMap = {};
    }
    var y,
      v,
      w,
      x,
      k,
      K = {
        waitSeconds: 7,
        baseUrl: "./",
        paths: {},
        bundles: {},
        pkgs: {},
        shim: {},
        config: {},
      },
      E = {},
      C = {},
      S = {},
      T = [],
      N = {},
      D = {},
      _ = {},
      A = 1,
      O = 1;
    return (
      (x = {
        require: function (e) {
          return e.require ? e.require : (e.require = w.makeRequire(e.map));
        },
        exports: function (e) {
          if (((e.usingExports = !0), e.map.isDefine))
            return e.exports
              ? (N[e.map.id] = e.exports)
              : (e.exports = N[e.map.id] = {});
        },
        module: function (e) {
          return e.module
            ? e.module
            : (e.module = {
                id: e.map.id,
                uri: e.map.url,
                config: function () {
                  return getOwn(K.config, e.map.id) || {};
                },
                exports: e.exports || (e.exports = {}),
              });
        },
      }),
      (v = function (e) {
        (this.events = getOwn(S, e.id) || {}),
          (this.map = e),
          (this.shim = getOwn(K.shim, e.id)),
          (this.depExports = []),
          (this.depMaps = []),
          (this.depMatched = []),
          (this.pluginMaps = {}),
          (this.depCount = 0);
      }),
      (v.prototype = {
        init: function (e, t, n, i) {
          (i = i || {}),
            this.inited ||
              ((this.factory = t),
              n
                ? this.on("error", n)
                : this.events.error &&
                  (n = bind(this, function (e) {
                    this.emit("error", e);
                  })),
              (this.depMaps = e && e.slice(0)),
              (this.errback = n),
              (this.inited = !0),
              (this.ignore = i.ignore),
              i.enabled || this.enabled ? this.enable() : this.check());
        },
        defineDep: function (e, t) {
          this.depMatched[e] ||
            ((this.depMatched[e] = !0),
            (this.depCount -= 1),
            (this.depExports[e] = t));
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
              t,
              n = this.map.id,
              i = this.depExports,
              r = this.exports,
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
                        r = w.execCb(n, o, i, r);
                      } catch (t) {
                        e = t;
                      }
                    else r = w.execCb(n, o, i, r);
                    if (
                      (this.map.isDefine &&
                        void 0 === r &&
                        ((t = this.module),
                        t
                          ? (r = t.exports)
                          : this.usingExports && (r = this.exports)),
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
                        u((this.error = e))
                      );
                  } else r = o;
                  if (
                    ((this.exports = r),
                    this.map.isDefine &&
                      !this.ignore &&
                      ((N[n] = r), req.onResourceLoad))
                  ) {
                    var a = [];
                    each(this.depMaps, function (e) {
                      a.push(e.normalizedMap || e);
                    }),
                      req.onResourceLoad(w, this.map, a);
                  }
                  f(n), (this.defined = !0);
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
          var e = this.map,
            t = e.id,
            i = a(e.prefix);
          this.depMaps.push(i),
            c(
              i,
              "defined",
              bind(this, function (i) {
                var r,
                  o,
                  l,
                  d = getOwn(_, this.map.id),
                  p = this.map.name,
                  h = this.map.parentMap ? this.map.parentMap.name : null,
                  g = w.makeRequire(e.parentMap, { enableBuildCallback: !0 });
                return this.map.unnormalized
                  ? (i.normalize &&
                      (p =
                        i.normalize(p, function (e) {
                          return n(e, h, !0);
                        }) || ""),
                    (o = a(e.prefix + "!" + p, this.map.parentMap, !0)),
                    c(
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
                      (l = getOwn(E, o.id)) &&
                      (this.depMaps.push(o),
                      this.events.error &&
                        l.on(
                          "error",
                          bind(this, function (e) {
                            this.emit("error", e);
                          })
                        ),
                      l.enable())
                    ))
                  : d
                  ? ((this.map.url = w.nameToUrl(d)), void this.load())
                  : ((r = bind(this, function (e) {
                      this.init(
                        [],
                        function () {
                          return e;
                        },
                        null,
                        { enabled: !0 }
                      );
                    })),
                    (r.error = bind(this, function (e) {
                      (this.inited = !0),
                        (this.error = e),
                        (e.requireModules = [t]),
                        eachProp(E, function (e) {
                          0 === e.map.id.indexOf(t + "_unnormalized") &&
                            f(e.map.id);
                        }),
                        u(e);
                    })),
                    (r.fromText = bind(this, function (n, i) {
                      var o = e.name,
                        c = a(o),
                        l = useInteractive;
                      i && (n = i),
                        l && (useInteractive = !1),
                        s(c),
                        hasProp(K.config, t) && (K.config[o] = K.config[t]);
                      try {
                        req.exec(n);
                      } catch (e) {
                        return u(
                          makeError(
                            "fromtexteval",
                            "fromText eval for " + t + " failed: " + e,
                            e,
                            [t]
                          )
                        );
                      }
                      l && (useInteractive = !0),
                        this.depMaps.push(c),
                        w.completeLoad(o),
                        g([o], r);
                    })),
                    void i.load(e.name, g, r, K));
              })
            ),
            w.enable(i, this),
            (this.pluginMaps[i.id] = i);
        },
        enable: function () {
          (C[this.map.id] = this),
            (this.enabled = !0),
            (this.enabling = !0),
            each(
              this.depMaps,
              bind(this, function (e, t) {
                var n, i, r;
                if ("string" == typeof e) {
                  if (
                    ((e = a(
                      e,
                      this.map.isDefine ? this.map : this.map.parentMap,
                      !1,
                      !this.skipMap
                    )),
                    (this.depMaps[t] = e),
                    (r = getOwn(x, e.id)))
                  )
                    return void (this.depExports[t] = r(this));
                  (this.depCount += 1),
                    c(
                      e,
                      "defined",
                      bind(this, function (e) {
                        this.undefed || (this.defineDep(t, e), this.check());
                      })
                    ),
                    this.errback
                      ? c(e, "error", bind(this, this.errback))
                      : this.events.error &&
                        c(
                          e,
                          "error",
                          bind(this, function (e) {
                            this.emit("error", e);
                          })
                        );
                }
                (n = e.id),
                  (i = E[n]),
                  hasProp(x, n) || !i || i.enabled || w.enable(e, this);
              })
            ),
            eachProp(
              this.pluginMaps,
              bind(this, function (e) {
                var t = getOwn(E, e.id);
                t && !t.enabled && w.enable(e, this);
              })
            ),
            (this.enabling = !1),
            this.check();
        },
        on: function (e, t) {
          var n = this.events[e];
          n || (n = this.events[e] = []), n.push(t);
        },
        emit: function (e, t) {
          each(this.events[e], function (e) {
            e(t);
          }),
            "error" === e && delete this.events[e];
        },
      }),
      (w = {
        config: K,
        contextName: e,
        registry: E,
        defined: N,
        urlFetched: D,
        defQueue: T,
        defQueueMap: {},
        Module: v,
        makeModuleMap: a,
        nextTick: req.nextTick,
        onError: u,
        configure: function (e) {
          if (
            (e.baseUrl &&
              "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) &&
              (e.baseUrl += "/"),
            "string" == typeof e.urlArgs)
          ) {
            var t = e.urlArgs;
            e.urlArgs = function (e, n) {
              return (-1 === n.indexOf("?") ? "?" : "&") + t;
            };
          }
          var n = K.shim,
            i = { paths: !0, bundles: !0, config: !0, map: !0 };
          eachProp(e, function (e, t) {
            i[t] ? (K[t] || (K[t] = {}), mixin(K[t], e, !0, !0)) : (K[t] = e);
          }),
            e.bundles &&
              eachProp(e.bundles, function (e, t) {
                each(e, function (e) {
                  e !== t && (_[e] = t);
                });
              }),
            e.shim &&
              (eachProp(e.shim, function (e, t) {
                isArray(e) && (e = { deps: e }),
                  (!e.exports && !e.init) ||
                    e.exportsFn ||
                    (e.exportsFn = w.makeShimExports(e)),
                  (n[t] = e);
              }),
              (K.shim = n)),
            e.packages &&
              each(e.packages, function (e) {
                var t, n;
                (e = "string" == typeof e ? { name: e } : e),
                  (n = e.name),
                  (t = e.location),
                  t && (K.paths[n] = e.location),
                  (K.pkgs[n] =
                    e.name +
                    "/" +
                    (e.main || "main")
                      .replace(currDirRegExp, "")
                      .replace(jsSuffixRegExp, ""));
              }),
            eachProp(E, function (e, t) {
              e.inited || e.map.unnormalized || (e.map = a(t, null, !0));
            }),
            (e.deps || e.callback) && w.require(e.deps || [], e.callback);
        },
        makeShimExports: function (e) {
          function t() {
            var t;
            return (
              e.init && (t = e.init.apply(global, arguments)),
              t || (e.exports && getGlobal(e.exports))
            );
          }
          return t;
        },
        makeRequire: function (t, r) {
          function o(n, i, c) {
            var l, f, d;
            return (
              r.enableBuildCallback &&
                i &&
                isFunction(i) &&
                (i.__requireJsBuild = !0),
              "string" == typeof n
                ? isFunction(i)
                  ? u(makeError("requireargs", "Invalid require call"), c)
                  : t && hasProp(x, n)
                  ? x[n](E[t.id])
                  : req.get
                  ? req.get(w, n, t, o)
                  : ((f = a(n, t, !1, !0)),
                    (l = f.id),
                    hasProp(N, l)
                      ? N[l]
                      : u(
                          makeError(
                            "notloaded",
                            'Module name "' +
                              l +
                              '" has not been loaded yet for context: ' +
                              e +
                              (t ? "" : ". Use require([])")
                          )
                        ))
                : (m(),
                  w.nextTick(function () {
                    m(),
                      (d = s(a(null, t))),
                      (d.skipMap = r.skipMap),
                      d.init(n, i, c, { enabled: !0 }),
                      p();
                  }),
                  o)
            );
          }
          return (
            (r = r || {}),
            mixin(o, {
              isBrowser: isBrowser,
              toUrl: function (e) {
                var i,
                  r = e.lastIndexOf("."),
                  o = e.split("/")[0],
                  a = "." === o || ".." === o;
                return (
                  -1 !== r &&
                    (!a || r > 1) &&
                    ((i = e.substring(r, e.length)), (e = e.substring(0, r))),
                  w.nameToUrl(n(e, t && t.id, !0), i, !0)
                );
              },
              defined: function (e) {
                return hasProp(N, a(e, t, !1, !0).id);
              },
              specified: function (e) {
                return (e = a(e, t, !1, !0).id), hasProp(N, e) || hasProp(E, e);
              },
            }),
            t ||
              (o.undef = function (e) {
                l();
                var n = a(e, t, !0),
                  r = getOwn(E, e);
                (r.undefed = !0),
                  i(e),
                  delete N[e],
                  delete D[n.url],
                  delete S[e],
                  eachReverse(T, function (t, n) {
                    t[0] === e && T.splice(n, 1);
                  }),
                  delete w.defQueueMap[e],
                  r && (r.events.defined && (S[e] = r.events), f(e));
              }),
            o
          );
        },
        enable: function (e) {
          getOwn(E, e.id) && s(e).enable();
        },
        completeLoad: function (e) {
          var t,
            n,
            i,
            o = getOwn(K.shim, e) || {},
            a = o.exports;
          for (l(); T.length; ) {
            if (((n = T.shift()), null === n[0])) {
              if (((n[0] = e), t)) break;
              t = !0;
            } else n[0] === e && (t = !0);
            h(n);
          }
          if (
            ((w.defQueueMap = {}),
            (i = getOwn(E, e)),
            !t && !hasProp(N, e) && i && !i.inited)
          ) {
            if (!(!K.enforceDefine || (a && getGlobal(a))))
              return r(e)
                ? void 0
                : u(
                    makeError("nodefine", "No define call for " + e, null, [e])
                  );
            h([e, o.deps || [], o.exportsFn]);
          }
          p();
        },
        nameToUrl: function (e, t, n) {
          var i,
            r,
            o,
            a,
            s,
            c,
            u,
            l = getOwn(K.pkgs, e);
          if ((l && (e = l), (u = getOwn(_, e)))) return w.nameToUrl(u, t, n);
          if (req.jsExtRegExp.test(e)) s = e + (t || "");
          else {
            for (i = K.paths, r = e.split("/"), o = r.length; o > 0; o -= 1)
              if (((a = r.slice(0, o).join("/")), (c = getOwn(i, a)))) {
                isArray(c) && (c = c[0]), r.splice(0, o, c);
                break;
              }
            (s = r.join("/")),
              (s += t || (/^data\:|^blob\:|\?/.test(s) || n ? "" : ".js")),
              (s =
                ("/" === s.charAt(0) || s.match(/^[\w\+\.\-]+:/)
                  ? ""
                  : K.baseUrl) + s);
          }
          return K.urlArgs && !/^blob\:/.test(s) ? s + K.urlArgs(e, s) : s;
        },
        load: function (e, t) {
          req.load(w, e, t);
        },
        execCb: function (e, t, n, i) {
          return t.apply(i, n);
        },
        onScriptLoad: function (e) {
          if (
            "load" === e.type ||
            readyRegExp.test((e.currentTarget || e.srcElement).readyState)
          ) {
            interactiveScript = null;
            var t = b(e);
            w.completeLoad(t.id);
          }
        },
        onScriptError: function (e) {
          var t = b(e);
          if (!r(t.id)) {
            var n = [];
            return (
              eachProp(E, function (e, i) {
                0 !== i.indexOf("_@r") &&
                  each(e.depMaps, function (e) {
                    if (e.id === t.id) return n.push(i), !0;
                  });
              }),
              u(
                makeError(
                  "scripterror",
                  'Script error for "' +
                    t.id +
                    (n.length ? '", needed by: ' + n.join(", ") : '"'),
                  e,
                  [t.id]
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
        function (e, t, n, i) {
          var r,
            o,
            a = defContextName;
          return (
            isArray(e) ||
              "string" == typeof e ||
              ((o = e), isArray(t) ? ((e = t), (t = n), (n = i)) : (e = [])),
            o && o.context && (a = o.context),
            (r = getOwn(contexts, a)),
            r || (r = contexts[a] = req.s.newContext(a)),
            o && r.configure(o),
            r.require(e, t, n)
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
          var t = contexts[defContextName];
          return t.require[e].apply(t, arguments);
        };
      }),
      isBrowser &&
        ((head = s.head = document.getElementsByTagName("head")[0]),
        (baseElement = document.getElementsByTagName("base")[0]) &&
          (head = s.head = baseElement.parentNode)),
      (req.onError = defaultOnError),
      (req.createNode = function (e, t, n) {
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
      (req.load = function (e, t, n) {
        var i,
          r = (e && e.config) || {};
        if (isBrowser)
          return (
            (i = req.createNode(r, t, n)),
            i.setAttribute("data-requirecontext", e.contextName),
            i.setAttribute("data-requiremodule", t),
            !i.attachEvent ||
            (i.attachEvent.toString &&
              i.attachEvent.toString().indexOf("[native code") < 0) ||
            isOpera
              ? (i.addEventListener("load", e.onScriptLoad, !1),
                i.addEventListener("error", e.onScriptError, !1))
              : ((useInteractive = !0),
                i.attachEvent("onreadystatechange", e.onScriptLoad)),
            (i.src = n),
            r.onNodeCreated && r.onNodeCreated(i, r, t, n),
            (currentlyAddingScript = i),
            baseElement
              ? head.insertBefore(i, baseElement)
              : head.appendChild(i),
            (currentlyAddingScript = null),
            i
          );
        if (isWebWorker)
          try {
            setTimeout(function () {}, 0), importScripts(n), e.completeLoad(t);
          } catch (i) {
            e.onError(
              makeError(
                "importscripts",
                "importScripts failed for " + t + " at " + n,
                i,
                [t]
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
      (define = function (e, t, n) {
        var i, r;
        "string" != typeof e && ((n = t), (t = e), (e = null)),
          isArray(t) || ((n = t), (t = null)),
          !t &&
            isFunction(n) &&
            ((t = []),
            n.length &&
              (n
                .toString()
                .replace(commentRegExp, commentReplace)
                .replace(cjsRequireRegExp, function (e, n) {
                  t.push(n);
                }),
              (t = (
                1 === n.length ? ["require"] : ["require", "exports", "module"]
              ).concat(t)))),
          useInteractive &&
            (i = currentlyAddingScript || getInteractiveScript()) &&
            (e || (e = i.getAttribute("data-requiremodule")),
            (r = contexts[i.getAttribute("data-requirecontext")])),
          r
            ? (r.defQueue.push([e, t, n]), (r.defQueueMap[e] = !0))
            : globalDefQueue.push([e, t, n]);
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
      var t = this || (0, eval)("this"),
        n = t.document,
        i = t.navigator,
        r = t.jQuery,
        o = t.JSON;
      r || "undefined" == typeof jQuery || (r = jQuery),
        (function (e) {
          "function" == typeof define && define.amd
            ? define("knockout", ["exports", "require"], e)
            : e(
                "object" == typeof exports && "object" == typeof module
                  ? module.exports || exports
                  : (t.ko = {})
              );
        })(function (a, s) {
          function c(e, t) {
            return (null === e || typeof e in g) && e === t;
          }
          function u(t, n) {
            var i;
            return function () {
              i ||
                (i = h.a.setTimeout(function () {
                  (i = e), t();
                }, n));
            };
          }
          function l(e, t) {
            var n;
            return function () {
              clearTimeout(n), (n = h.a.setTimeout(e, t));
            };
          }
          function f(e, t) {
            t && "change" !== t
              ? "beforeChange" === t
                ? this.pc(e)
                : this.gb(e, t)
              : this.qc(e);
          }
          function d(e, t) {
            null !== t && t.s && t.s();
          }
          function p(e, t) {
            var n = this.qd,
              i = n[w];
            i.ra ||
              (this.Qb && this.mb[t]
                ? (n.uc(t, e, this.mb[t]), (this.mb[t] = null), --this.Qb)
                : i.I[t] || n.uc(t, e, i.J ? { da: e } : n.$c(e)),
              e.Ja && e.gd());
          }
          var h = void 0 !== a ? a : {};
          (h.b = function (e, t) {
            for (var n = e.split("."), i = h, r = 0; r < n.length - 1; r++)
              i = i[n[r]];
            i[n[n.length - 1]] = t;
          }),
            (h.L = function (e, t, n) {
              e[t] = n;
            }),
            (h.version = "3.5.1"),
            h.b("version", h.version),
            (h.options = {
              deferUpdates: !1,
              useOnlyNativeEvents: !1,
              foreachHidesDestroyed: !1,
            }),
            (h.a = (function () {
              function a(e, t) {
                for (var n in e) l.call(e, n) && t(n, e[n]);
              }
              function s(e, t) {
                if (t) for (var n in t) l.call(t, n) && (e[n] = t[n]);
                return e;
              }
              function c(e, t) {
                return (e.__proto__ = t), e;
              }
              function u(e, t, n, i) {
                var r = e[t].match(v) || [];
                h.a.D(n.match(v), function (e) {
                  h.a.Na(r, e, i);
                }),
                  (e[t] = r.join(" "));
              }
              var l = Object.prototype.hasOwnProperty,
                f = { __proto__: [] } instanceof Array,
                d = "function" == typeof Symbol,
                p = {},
                g = {};
              (p[
                i && /Firefox\/2/i.test(i.userAgent)
                  ? "KeyboardEvent"
                  : "UIEvents"
              ] = ["keyup", "keydown", "keypress"]),
                (p.MouseEvents =
                  "click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(
                    " "
                  )),
                a(p, function (e, t) {
                  if (t.length)
                    for (var n = 0, i = t.length; n < i; n++) g[t[n]] = e;
                });
              var b,
                m = { propertychange: !0 },
                y =
                  n &&
                  (function () {
                    for (
                      var t = 3,
                        i = n.createElement("div"),
                        r = i.getElementsByTagName("i");
                      (i.innerHTML =
                        "\x3c!--[if gt IE " + ++t + "]><i></i><![endif]--\x3e"),
                        r[0];

                    );
                    return 4 < t ? t : e;
                  })(),
                v = /\S+/g;
              return {
                Jc: [
                  "authenticity_token",
                  /^__RequestVerificationToken(_.*)?$/,
                ],
                D: function (e, t, n) {
                  for (var i = 0, r = e.length; i < r; i++)
                    t.call(n, e[i], i, e);
                },
                A:
                  "function" == typeof Array.prototype.indexOf
                    ? function (e, t) {
                        return Array.prototype.indexOf.call(e, t);
                      }
                    : function (e, t) {
                        for (var n = 0, i = e.length; n < i; n++)
                          if (e[n] === t) return n;
                        return -1;
                      },
                Lb: function (t, n, i) {
                  for (var r = 0, o = t.length; r < o; r++)
                    if (n.call(i, t[r], r, t)) return t[r];
                  return e;
                },
                Pa: function (e, t) {
                  var n = h.a.A(e, t);
                  0 < n ? e.splice(n, 1) : 0 === n && e.shift();
                },
                wc: function (e) {
                  var t = [];
                  return (
                    e &&
                      h.a.D(e, function (e) {
                        0 > h.a.A(t, e) && t.push(e);
                      }),
                    t
                  );
                },
                Mb: function (e, t, n) {
                  var i = [];
                  if (e)
                    for (var r = 0, o = e.length; r < o; r++)
                      i.push(t.call(n, e[r], r));
                  return i;
                },
                jb: function (e, t, n) {
                  var i = [];
                  if (e)
                    for (var r = 0, o = e.length; r < o; r++)
                      t.call(n, e[r], r) && i.push(e[r]);
                  return i;
                },
                Nb: function (e, t) {
                  if (t instanceof Array) e.push.apply(e, t);
                  else for (var n = 0, i = t.length; n < i; n++) e.push(t[n]);
                  return e;
                },
                Na: function (e, t, n) {
                  var i = h.a.A(h.a.bc(e), t);
                  0 > i ? n && e.push(t) : n || e.splice(i, 1);
                },
                Ba: f,
                extend: s,
                setPrototypeOf: c,
                Ab: f ? c : s,
                P: a,
                Ga: function (e, t, n) {
                  if (!e) return e;
                  var i,
                    r = {};
                  for (i in e) l.call(e, i) && (r[i] = t.call(n, e[i], i, e));
                  return r;
                },
                Tb: function (e) {
                  for (; e.firstChild; ) h.removeNode(e.firstChild);
                },
                Yb: function (e) {
                  e = h.a.la(e);
                  for (
                    var t = ((e[0] && e[0].ownerDocument) || n).createElement(
                        "div"
                      ),
                      i = 0,
                      r = e.length;
                    i < r;
                    i++
                  )
                    t.appendChild(h.oa(e[i]));
                  return t;
                },
                Ca: function (e, t) {
                  for (var n = 0, i = e.length, r = []; n < i; n++) {
                    var o = e[n].cloneNode(!0);
                    r.push(t ? h.oa(o) : o);
                  }
                  return r;
                },
                va: function (e, t) {
                  if ((h.a.Tb(e), t))
                    for (var n = 0, i = t.length; n < i; n++)
                      e.appendChild(t[n]);
                },
                Xc: function (e, t) {
                  var n = e.nodeType ? [e] : e;
                  if (0 < n.length) {
                    for (
                      var i = n[0], r = i.parentNode, o = 0, a = t.length;
                      o < a;
                      o++
                    )
                      r.insertBefore(t[o], i);
                    for (o = 0, a = n.length; o < a; o++) h.removeNode(n[o]);
                  }
                },
                Ua: function (e, t) {
                  if (e.length) {
                    for (
                      t = (8 === t.nodeType && t.parentNode) || t;
                      e.length && e[0].parentNode !== t;

                    )
                      e.splice(0, 1);
                    for (; 1 < e.length && e[e.length - 1].parentNode !== t; )
                      e.length--;
                    if (1 < e.length) {
                      var n = e[0],
                        i = e[e.length - 1];
                      for (e.length = 0; n !== i; )
                        e.push(n), (n = n.nextSibling);
                      e.push(i);
                    }
                  }
                  return e;
                },
                Zc: function (e, t) {
                  7 > y ? e.setAttribute("selected", t) : (e.selected = t);
                },
                Db: function (t) {
                  return null === t || t === e
                    ? ""
                    : t.trim
                    ? t.trim()
                    : t.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
                },
                Ud: function (e, t) {
                  return (
                    (e = e || ""),
                    !(t.length > e.length) && e.substring(0, t.length) === t
                  );
                },
                vd: function (e, t) {
                  if (e === t) return !0;
                  if (11 === e.nodeType) return !1;
                  if (t.contains)
                    return t.contains(1 !== e.nodeType ? e.parentNode : e);
                  if (t.compareDocumentPosition)
                    return 16 == (16 & t.compareDocumentPosition(e));
                  for (; e && e != t; ) e = e.parentNode;
                  return !!e;
                },
                Sb: function (e) {
                  return h.a.vd(e, e.ownerDocument.documentElement);
                },
                kd: function (e) {
                  return !!h.a.Lb(e, h.a.Sb);
                },
                R: function (e) {
                  return e && e.tagName && e.tagName.toLowerCase();
                },
                Ac: function (e) {
                  return h.onError
                    ? function () {
                        try {
                          return e.apply(this, arguments);
                        } catch (e) {
                          throw (h.onError && h.onError(e), e);
                        }
                      }
                    : e;
                },
                setTimeout: function (e, t) {
                  return setTimeout(h.a.Ac(e), t);
                },
                Gc: function (e) {
                  setTimeout(function () {
                    throw (h.onError && h.onError(e), e);
                  }, 0);
                },
                B: function (e, t, n) {
                  var i = h.a.Ac(n);
                  if (((n = m[t]), h.options.useOnlyNativeEvents || n || !r))
                    if (n || "function" != typeof e.addEventListener) {
                      if (void 0 === e.attachEvent)
                        throw Error(
                          "Browser doesn't support addEventListener or attachEvent"
                        );
                      var o = function (t) {
                          i.call(e, t);
                        },
                        a = "on" + t;
                      e.attachEvent(a, o),
                        h.a.K.za(e, function () {
                          e.detachEvent(a, o);
                        });
                    } else e.addEventListener(t, i, !1);
                  else
                    b || (b = "function" == typeof r(e).on ? "on" : "bind"),
                      r(e)[b](t, i);
                },
                Fb: function (e, i) {
                  if (!e || !e.nodeType)
                    throw Error(
                      "element must be a DOM node when calling triggerEvent"
                    );
                  var o;
                  if (
                    ("input" === h.a.R(e) &&
                    e.type &&
                    "click" == i.toLowerCase()
                      ? ((o = e.type), (o = "checkbox" == o || "radio" == o))
                      : (o = !1),
                    h.options.useOnlyNativeEvents || !r || o)
                  )
                    if ("function" == typeof n.createEvent) {
                      if ("function" != typeof e.dispatchEvent)
                        throw Error(
                          "The supplied element doesn't support dispatchEvent"
                        );
                      (o = n.createEvent(g[i] || "HTMLEvents")),
                        o.initEvent(
                          i,
                          !0,
                          !0,
                          t,
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
                  else r(e).trigger(i);
                },
                f: function (e) {
                  return h.O(e) ? e() : e;
                },
                bc: function (e) {
                  return h.O(e) ? e.v() : e;
                },
                Eb: function (e, t, n) {
                  var i;
                  t &&
                    ("object" == typeof e.classList
                      ? ((i = e.classList[n ? "add" : "remove"]),
                        h.a.D(t.match(v), function (t) {
                          i.call(e.classList, t);
                        }))
                      : "string" == typeof e.className.baseVal
                      ? u(e.className, "baseVal", t, n)
                      : u(e, "className", t, n));
                },
                Bb: function (t, n) {
                  var i = h.a.f(n);
                  (null !== i && i !== e) || (i = "");
                  var r = h.h.firstChild(t);
                  !r || 3 != r.nodeType || h.h.nextSibling(r)
                    ? h.h.va(t, [t.ownerDocument.createTextNode(i)])
                    : (r.data = i),
                    h.a.Ad(t);
                },
                Yc: function (e, t) {
                  if (((e.name = t), 7 >= y))
                    try {
                      var i = e.name.replace(/[&<>'"]/g, function (e) {
                        return "&#" + e.charCodeAt(0) + ";";
                      });
                      e.mergeAttributes(
                        n.createElement("<input name='" + i + "'/>"),
                        !1
                      );
                    } catch (e) {}
                },
                Ad: function (e) {
                  9 <= y &&
                    ((e = 1 == e.nodeType ? e : e.parentNode),
                    e.style && (e.style.zoom = e.style.zoom));
                },
                wd: function (e) {
                  if (y) {
                    var t = e.style.width;
                    (e.style.width = 0), (e.style.width = t);
                  }
                },
                Pd: function (e, t) {
                  (e = h.a.f(e)), (t = h.a.f(t));
                  for (var n = [], i = e; i <= t; i++) n.push(i);
                  return n;
                },
                la: function (e) {
                  for (var t = [], n = 0, i = e.length; n < i; n++)
                    t.push(e[n]);
                  return t;
                },
                Da: function (e) {
                  return d ? Symbol(e) : e;
                },
                Zd: 6 === y,
                $d: 7 === y,
                W: y,
                Lc: function (e, t) {
                  for (
                    var n = h.a
                        .la(e.getElementsByTagName("input"))
                        .concat(h.a.la(e.getElementsByTagName("textarea"))),
                      i =
                        "string" == typeof t
                          ? function (e) {
                              return e.name === t;
                            }
                          : function (e) {
                              return t.test(e.name);
                            },
                      r = [],
                      o = n.length - 1;
                    0 <= o;
                    o--
                  )
                    i(n[o]) && r.push(n[o]);
                  return r;
                },
                Nd: function (e) {
                  return "string" == typeof e && (e = h.a.Db(e))
                    ? o && o.parse
                      ? o.parse(e)
                      : new Function("return " + e)()
                    : null;
                },
                hc: function (e, t, n) {
                  if (!o || !o.stringify)
                    throw Error(
                      "Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js"
                    );
                  return o.stringify(h.a.f(e), t, n);
                },
                Od: function (e, t, i) {
                  i = i || {};
                  var r = i.params || {},
                    o = i.includeFields || this.Jc,
                    s = e;
                  if ("object" == typeof e && "form" === h.a.R(e))
                    for (var s = e.action, c = o.length - 1; 0 <= c; c--)
                      for (
                        var u = h.a.Lc(e, o[c]), l = u.length - 1;
                        0 <= l;
                        l--
                      )
                        r[u[l].name] = u[l].value;
                  t = h.a.f(t);
                  var f = n.createElement("form");
                  (f.style.display = "none"),
                    (f.action = s),
                    (f.method = "post");
                  for (var d in t)
                    (e = n.createElement("input")),
                      (e.type = "hidden"),
                      (e.name = d),
                      (e.value = h.a.hc(h.a.f(t[d]))),
                      f.appendChild(e);
                  a(r, function (e, t) {
                    var i = n.createElement("input");
                    (i.type = "hidden"),
                      (i.name = e),
                      (i.value = t),
                      f.appendChild(i);
                  }),
                    n.body.appendChild(f),
                    i.submitter ? i.submitter(f) : f.submit(),
                    setTimeout(function () {
                      f.parentNode.removeChild(f);
                    }, 0);
                },
              };
            })()),
            h.b("utils", h.a),
            h.b("utils.arrayForEach", h.a.D),
            h.b("utils.arrayFirst", h.a.Lb),
            h.b("utils.arrayFilter", h.a.jb),
            h.b("utils.arrayGetDistinctValues", h.a.wc),
            h.b("utils.arrayIndexOf", h.a.A),
            h.b("utils.arrayMap", h.a.Mb),
            h.b("utils.arrayPushAll", h.a.Nb),
            h.b("utils.arrayRemoveItem", h.a.Pa),
            h.b("utils.cloneNodes", h.a.Ca),
            h.b("utils.createSymbolOrString", h.a.Da),
            h.b("utils.extend", h.a.extend),
            h.b("utils.fieldsIncludedWithJsonPost", h.a.Jc),
            h.b("utils.getFormFields", h.a.Lc),
            h.b("utils.objectMap", h.a.Ga),
            h.b("utils.peekObservable", h.a.bc),
            h.b("utils.postJson", h.a.Od),
            h.b("utils.parseJson", h.a.Nd),
            h.b("utils.registerEventHandler", h.a.B),
            h.b("utils.stringifyJson", h.a.hc),
            h.b("utils.range", h.a.Pd),
            h.b("utils.toggleDomNodeCssClass", h.a.Eb),
            h.b("utils.triggerEvent", h.a.Fb),
            h.b("utils.unwrapObservable", h.a.f),
            h.b("utils.objectForEach", h.a.P),
            h.b("utils.addOrRemoveItem", h.a.Na),
            h.b("utils.setTextContent", h.a.Bb),
            h.b("unwrap", h.a.f),
            Function.prototype.bind ||
              (Function.prototype.bind = function (e) {
                var t = this;
                if (1 === arguments.length)
                  return function () {
                    return t.apply(e, arguments);
                  };
                var n = Array.prototype.slice.call(arguments, 1);
                return function () {
                  var i = n.slice(0);
                  return i.push.apply(i, arguments), t.apply(e, i);
                };
              }),
            (h.a.g = new (function () {
              var t,
                n,
                i = 0,
                r = "__ko__" + new Date().getTime(),
                o = {};
              return (
                h.a.W
                  ? ((t = function (t, n) {
                      var a = t[r];
                      if (!a || "null" === a || !o[a]) {
                        if (!n) return e;
                        (a = t[r] = "ko" + i++), (o[a] = {});
                      }
                      return o[a];
                    }),
                    (n = function (e) {
                      var t = e[r];
                      return !!t && (delete o[t], (e[r] = null), !0);
                    }))
                  : ((t = function (e, t) {
                      var n = e[r];
                      return !n && t && (n = e[r] = {}), n;
                    }),
                    (n = function (e) {
                      return !!e[r] && (delete e[r], !0);
                    })),
                {
                  get: function (e, n) {
                    var i = t(e, !1);
                    return i && i[n];
                  },
                  set: function (n, i, r) {
                    (n = t(n, r !== e)) && (n[i] = r);
                  },
                  Ub: function (e, n, i) {
                    return (e = t(e, !0)), e[n] || (e[n] = i);
                  },
                  clear: n,
                  Z: function () {
                    return i++ + r;
                  },
                }
              );
            })()),
            h.b("utils.domData", h.a.g),
            h.b("utils.domData.clear", h.a.g.clear),
            (h.a.K = new (function () {
              function t(t, n) {
                var i = h.a.g.get(t, o);
                return i === e && n && ((i = []), h.a.g.set(t, o, i)), i;
              }
              function n(e) {
                var n = t(e, !1);
                if (n)
                  for (var n = n.slice(0), r = 0; r < n.length; r++) n[r](e);
                h.a.g.clear(e),
                  h.a.K.cleanExternalData(e),
                  s[e.nodeType] && i(e.childNodes, !0);
              }
              function i(e, t) {
                for (var i, r = [], o = 0; o < e.length; o++)
                  if (
                    (!t || 8 === e[o].nodeType) &&
                    (n((r[r.length] = i = e[o])), e[o] !== i)
                  )
                    for (; o-- && -1 == h.a.A(r, e[o]); );
              }
              var o = h.a.g.Z(),
                a = { 1: !0, 8: !0, 9: !0 },
                s = { 1: !0, 9: !0 };
              return {
                za: function (e, n) {
                  if ("function" != typeof n)
                    throw Error("Callback must be a function");
                  t(e, !0).push(n);
                },
                yb: function (n, i) {
                  var r = t(n, !1);
                  r && (h.a.Pa(r, i), 0 == r.length && h.a.g.set(n, o, e));
                },
                oa: function (e) {
                  return (
                    h.u.G(function () {
                      a[e.nodeType] &&
                        (n(e), s[e.nodeType] && i(e.getElementsByTagName("*")));
                    }),
                    e
                  );
                },
                removeNode: function (e) {
                  h.oa(e), e.parentNode && e.parentNode.removeChild(e);
                },
                cleanExternalData: function (e) {
                  r && "function" == typeof r.cleanData && r.cleanData([e]);
                },
              };
            })()),
            (h.oa = h.a.K.oa),
            (h.removeNode = h.a.K.removeNode),
            h.b("cleanNode", h.oa),
            h.b("removeNode", h.removeNode),
            h.b("utils.domNodeDisposal", h.a.K),
            h.b("utils.domNodeDisposal.addDisposeCallback", h.a.K.za),
            h.b("utils.domNodeDisposal.removeDisposeCallback", h.a.K.yb),
            (function () {
              var i = [0, "", ""],
                o = [1, "<table>", "</table>"],
                a = [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                s = [1, "<select multiple='multiple'>", "</select>"],
                c = {
                  thead: o,
                  tbody: o,
                  tfoot: o,
                  tr: [2, "<table><tbody>", "</tbody></table>"],
                  td: a,
                  th: a,
                  option: s,
                  optgroup: s,
                },
                u = 8 >= h.a.W;
              (h.a.ua = function (e, o) {
                var a;
                if (r) {
                  if (r.parseHTML) a = r.parseHTML(e, o) || [];
                  else if ((a = r.clean([e], o)) && a[0]) {
                    for (
                      var s = a[0];
                      s.parentNode && 11 !== s.parentNode.nodeType;

                    )
                      s = s.parentNode;
                    s.parentNode && s.parentNode.removeChild(s);
                  }
                } else {
                  (a = o) || (a = n);
                  var l,
                    s = a.parentWindow || a.defaultView || t,
                    f = h.a.Db(e).toLowerCase(),
                    d = a.createElement("div");
                  for (
                    l =
                      ((f = f.match(
                        /^(?:\x3c!--.*?--\x3e\s*?)*?<([a-z]+)[\s>]/
                      )) &&
                        c[f[1]]) ||
                      i,
                      f = l[0],
                      l = "ignored<div>" + l[1] + e + l[2] + "</div>",
                      "function" == typeof s.innerShiv
                        ? d.appendChild(s.innerShiv(l))
                        : (u && a.body.appendChild(d),
                          (d.innerHTML = l),
                          u && d.parentNode.removeChild(d));
                    f--;

                  )
                    d = d.lastChild;
                  a = h.a.la(d.lastChild.childNodes);
                }
                return a;
              }),
                (h.a.Md = function (e, t) {
                  var n = h.a.ua(e, t);
                  return (n.length && n[0].parentElement) || h.a.Yb(n);
                }),
                (h.a.fc = function (t, n) {
                  if ((h.a.Tb(t), null !== (n = h.a.f(n)) && n !== e))
                    if (("string" != typeof n && (n = n.toString()), r))
                      r(t).html(n);
                    else
                      for (
                        var i = h.a.ua(n, t.ownerDocument), o = 0;
                        o < i.length;
                        o++
                      )
                        t.appendChild(i[o]);
                });
            })(),
            h.b("utils.parseHtmlFragment", h.a.ua),
            h.b("utils.setHtml", h.a.fc),
            (h.aa = (function () {
              function t(e, n) {
                if (e)
                  if (8 == e.nodeType) {
                    var i = h.aa.Uc(e.nodeValue);
                    null != i && n.push({ ud: e, Kd: i });
                  } else if (1 == e.nodeType)
                    for (var i = 0, r = e.childNodes, o = r.length; i < o; i++)
                      t(r[i], n);
              }
              var n = {};
              return {
                Xb: function (e) {
                  if ("function" != typeof e)
                    throw Error(
                      "You can only pass a function to ko.memoization.memoize()"
                    );
                  var t =
                    ((4294967296 * (1 + Math.random())) | 0)
                      .toString(16)
                      .substring(1) +
                    ((4294967296 * (1 + Math.random())) | 0)
                      .toString(16)
                      .substring(1);
                  return (n[t] = e), "\x3c!--[ko_memo:" + t + "]--\x3e";
                },
                bd: function (t, i) {
                  var r = n[t];
                  if (r === e)
                    throw Error(
                      "Couldn't find any memo with ID " +
                        t +
                        ". Perhaps it's already been unmemoized."
                    );
                  try {
                    return r.apply(null, i || []), !0;
                  } finally {
                    delete n[t];
                  }
                },
                cd: function (e, n) {
                  var i = [];
                  t(e, i);
                  for (var r = 0, o = i.length; r < o; r++) {
                    var a = i[r].ud,
                      s = [a];
                    n && h.a.Nb(s, n),
                      h.aa.bd(i[r].Kd, s),
                      (a.nodeValue = ""),
                      a.parentNode && a.parentNode.removeChild(a);
                  }
                },
                Uc: function (e) {
                  return (e = e.match(/^\[ko_memo\:(.*?)\]$/)) ? e[1] : null;
                },
              };
            })()),
            h.b("memoization", h.aa),
            h.b("memoization.memoize", h.aa.Xb),
            h.b("memoization.unmemoize", h.aa.bd),
            h.b("memoization.parseMemoText", h.aa.Uc),
            h.b("memoization.unmemoizeDomNodeAndDescendants", h.aa.cd),
            (h.na = (function () {
              function e() {
                if (a)
                  for (var e, t = a, n = 0; c < a; )
                    if ((e = o[c++])) {
                      if (c > t) {
                        if (5e3 <= ++n) {
                          (c = a),
                            h.a.Gc(
                              Error(
                                "'Too much recursion' after processing " +
                                  n +
                                  " task groups."
                              )
                            );
                          break;
                        }
                        t = a;
                      }
                      try {
                        e();
                      } catch (e) {
                        h.a.Gc(e);
                      }
                    }
              }
              function i() {
                e(), (c = a = o.length = 0);
              }
              var r,
                o = [],
                a = 0,
                s = 1,
                c = 0;
              return (
                (r = t.MutationObserver
                  ? (function (e) {
                      var t = n.createElement("div");
                      return (
                        new MutationObserver(e).observe(t, { attributes: !0 }),
                        function () {
                          t.classList.toggle("foo");
                        }
                      );
                    })(i)
                  : n && "onreadystatechange" in n.createElement("script")
                  ? function (e) {
                      var t = n.createElement("script");
                      (t.onreadystatechange = function () {
                        (t.onreadystatechange = null),
                          n.documentElement.removeChild(t),
                          (t = null),
                          e();
                      }),
                        n.documentElement.appendChild(t);
                    }
                  : function (e) {
                      setTimeout(e, 0);
                    }),
                {
                  scheduler: r,
                  zb: function (e) {
                    return a || h.na.scheduler(i), (o[a++] = e), s++;
                  },
                  cancel: function (e) {
                    (e -= s - a) >= c && e < a && (o[e] = null);
                  },
                  resetForTesting: function () {
                    var e = a - c;
                    return (c = a = o.length = 0), e;
                  },
                  Sd: e,
                }
              );
            })()),
            h.b("tasks", h.na),
            h.b("tasks.schedule", h.na.zb),
            h.b("tasks.runEarly", h.na.Sd),
            (h.Ta = {
              throttle: function (e, t) {
                e.throttleEvaluation = t;
                var n = null;
                return h.$({
                  read: e,
                  write: function (i) {
                    clearTimeout(n),
                      (n = h.a.setTimeout(function () {
                        e(i);
                      }, t));
                  },
                });
              },
              rateLimit: function (e, t) {
                var n, i, r;
                "number" == typeof t
                  ? (n = t)
                  : ((n = t.timeout), (i = t.method)),
                  (e.Hb = !1),
                  (r =
                    "function" == typeof i
                      ? i
                      : "notifyWhenChangesStop" == i
                      ? l
                      : u),
                  e.ub(function (e) {
                    return r(e, n, t);
                  });
              },
              deferred: function (t, n) {
                if (!0 !== n)
                  throw Error(
                    "The 'deferred' extender only accepts the value 'true', because it is not supported to turn deferral off once enabled."
                  );
                t.Hb ||
                  ((t.Hb = !0),
                  t.ub(function (n) {
                    var i,
                      r = !1;
                    return function () {
                      if (!r) {
                        h.na.cancel(i), (i = h.na.zb(n));
                        try {
                          (r = !0), t.notifySubscribers(e, "dirty");
                        } finally {
                          r = !1;
                        }
                      }
                    };
                  }));
              },
              notify: function (e, t) {
                e.equalityComparer = "always" == t ? null : c;
              },
            });
          var g = { undefined: 1, boolean: 1, number: 1, string: 1 };
          h.b("extenders", h.Ta),
            (h.ic = function (e, t, n) {
              (this.da = e),
                (this.lc = t),
                (this.mc = n),
                (this.Ib = !1),
                (this.fb = this.Jb = null),
                h.L(this, "dispose", this.s),
                h.L(this, "disposeWhenNodeIsRemoved", this.l);
            }),
            (h.ic.prototype.s = function () {
              this.Ib ||
                (this.fb && h.a.K.yb(this.Jb, this.fb),
                (this.Ib = !0),
                this.mc(),
                (this.da = this.lc = this.mc = this.Jb = this.fb = null));
            }),
            (h.ic.prototype.l = function (e) {
              (this.Jb = e), h.a.K.za(e, (this.fb = this.s.bind(this)));
            }),
            (h.T = function () {
              h.a.Ab(this, b), b.qb(this);
            });
          var b = {
            qb: function (e) {
              (e.U = { change: [] }), (e.sc = 1);
            },
            subscribe: function (e, t, n) {
              var i = this;
              n = n || "change";
              var r = new h.ic(i, t ? e.bind(t) : e, function () {
                h.a.Pa(i.U[n], r), i.hb && i.hb(n);
              });
              return (
                i.Qa && i.Qa(n), i.U[n] || (i.U[n] = []), i.U[n].push(r), r
              );
            },
            notifySubscribers: function (e, t) {
              if (
                ((t = t || "change"), "change" === t && this.Gb(), this.Wa(t))
              ) {
                var n = ("change" === t && this.ed) || this.U[t].slice(0);
                try {
                  h.u.xc();
                  for (var i, r = 0; (i = n[r]); ++r) i.Ib || i.lc(e);
                } finally {
                  h.u.end();
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
              var t,
                n,
                i,
                r,
                o,
                a = this,
                s = h.O(a);
              a.gb || ((a.gb = a.notifySubscribers), (a.notifySubscribers = f));
              var c = e(function () {
                (a.Ja = !1), s && r === a && (r = a.nc ? a.nc() : a());
                var e = n || (o && a.sb(i, r));
                (o = n = t = !1), e && a.gb((i = r));
              });
              (a.qc = function (e, n) {
                (n && a.Ja) || (o = !n),
                  (a.ed = a.U.change.slice(0)),
                  (a.Ja = t = !0),
                  (r = e),
                  c();
              }),
                (a.pc = function (e) {
                  t || ((i = e), a.gb(e, "beforeChange"));
                }),
                (a.rc = function () {
                  o = !0;
                }),
                (a.gd = function () {
                  a.sb(i, a.v(!0)) && (n = !0);
                });
            },
            Wa: function (e) {
              return this.U[e] && this.U[e].length;
            },
            Bd: function (e) {
              if (e) return (this.U[e] && this.U[e].length) || 0;
              var t = 0;
              return (
                h.a.P(this.U, function (e, n) {
                  "dirty" !== e && (t += n.length);
                }),
                t
              );
            },
            sb: function (e, t) {
              return !this.equalityComparer || !this.equalityComparer(e, t);
            },
            toString: function () {
              return "[object Object]";
            },
            extend: function (e) {
              var t = this;
              return (
                e &&
                  h.a.P(e, function (e, n) {
                    var i = h.Ta[e];
                    "function" == typeof i && (t = i(t, n) || t);
                  }),
                t
              );
            },
          };
          h.L(b, "init", b.qb),
            h.L(b, "subscribe", b.subscribe),
            h.L(b, "extend", b.extend),
            h.L(b, "getSubscriptionsCount", b.Bd),
            h.a.Ba && h.a.setPrototypeOf(b, Function.prototype),
            (h.T.fn = b),
            (h.Qc = function (e) {
              return (
                null != e &&
                "function" == typeof e.subscribe &&
                "function" == typeof e.notifySubscribers
              );
            }),
            h.b("subscribable", h.T),
            h.b("isSubscribable", h.Qc),
            (h.S = h.u =
              (function () {
                function e(e) {
                  i.push(n), (n = e);
                }
                function t() {
                  n = i.pop();
                }
                var n,
                  i = [],
                  r = 0;
                return {
                  xc: e,
                  end: t,
                  cc: function (e) {
                    if (n) {
                      if (!h.Qc(e))
                        throw Error(
                          "Only subscribable things can act as dependencies"
                        );
                      n.od.call(n.pd, e, e.fd || (e.fd = ++r));
                    }
                  },
                  G: function (n, i, r) {
                    try {
                      return e(), n.apply(i, r || []);
                    } finally {
                      t();
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
            h.b("computedContext", h.S),
            h.b("computedContext.getDependenciesCount", h.S.qa),
            h.b("computedContext.getDependencies", h.S.Va),
            h.b("computedContext.isInitial", h.S.Ya),
            h.b("computedContext.registerDependency", h.S.cc),
            h.b("ignoreDependencies", (h.Yd = h.u.G));
          var m = h.a.Da("_latestValue");
          h.ta = function (e) {
            function t() {
              return 0 < arguments.length
                ? (t.sb(t[m], arguments[0]) &&
                    (t.ya(), (t[m] = arguments[0]), t.xa()),
                  this)
                : (h.u.cc(t), t[m]);
            }
            return (
              (t[m] = e),
              h.a.Ba || h.a.extend(t, h.T.fn),
              h.T.fn.qb(t),
              h.a.Ab(t, y),
              h.options.deferUpdates && h.Ta.deferred(t, !0),
              t
            );
          };
          var y = {
            equalityComparer: c,
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
          h.a.Ba && h.a.setPrototypeOf(y, h.T.fn);
          var v = (h.ta.Ma = "__ko_proto__");
          (y[v] = h.ta),
            (h.O = function (e) {
              if (
                (e = "function" == typeof e && e[v]) &&
                e !== y[v] &&
                e !== h.o.fn[v]
              )
                throw Error(
                  "Invalid object that looks like an observable; possibly from another Knockout instance"
                );
              return !!e;
            }),
            (h.Za = function (e) {
              return (
                "function" == typeof e &&
                (e[v] === y[v] || (e[v] === h.o.fn[v] && e.Nc))
              );
            }),
            h.b("observable", h.ta),
            h.b("isObservable", h.O),
            h.b("isWriteableObservable", h.Za),
            h.b("isWritableObservable", h.Za),
            h.b("observable.fn", y),
            h.L(y, "peek", y.v),
            h.L(y, "valueHasMutated", y.xa),
            h.L(y, "valueWillMutate", y.ya),
            (h.Ha = function (e) {
              if ("object" != typeof (e = e || []) || !("length" in e))
                throw Error(
                  "The argument passed when initializing an observable array must be an array, or null, or undefined."
                );
              return (
                (e = h.ta(e)),
                h.a.Ab(e, h.Ha.fn),
                e.extend({ trackArrayChanges: !0 })
              );
            }),
            (h.Ha.fn = {
              remove: function (e) {
                for (
                  var t = this.v(),
                    n = [],
                    i =
                      "function" != typeof e || h.O(e)
                        ? function (t) {
                            return t === e;
                          }
                        : e,
                    r = 0;
                  r < t.length;
                  r++
                ) {
                  var o = t[r];
                  if (i(o)) {
                    if ((0 === n.length && this.ya(), t[r] !== o))
                      throw Error(
                        "Array modified during remove; cannot remove item"
                      );
                    n.push(o), t.splice(r, 1), r--;
                  }
                }
                return n.length && this.xa(), n;
              },
              removeAll: function (t) {
                if (t === e) {
                  var n = this.v(),
                    i = n.slice(0);
                  return this.ya(), n.splice(0, n.length), this.xa(), i;
                }
                return t
                  ? this.remove(function (e) {
                      return 0 <= h.a.A(t, e);
                    })
                  : [];
              },
              destroy: function (e) {
                var t = this.v(),
                  n =
                    "function" != typeof e || h.O(e)
                      ? function (t) {
                          return t === e;
                        }
                      : e;
                this.ya();
                for (var i = t.length - 1; 0 <= i; i--) {
                  var r = t[i];
                  n(r) && (r._destroy = !0);
                }
                this.xa();
              },
              destroyAll: function (t) {
                return t === e
                  ? this.destroy(function () {
                      return !0;
                    })
                  : t
                  ? this.destroy(function (e) {
                      return 0 <= h.a.A(t, e);
                    })
                  : [];
              },
              indexOf: function (e) {
                var t = this();
                return h.a.A(t, e);
              },
              replace: function (e, t) {
                var n = this.indexOf(e);
                0 <= n && (this.ya(), (this.v()[n] = t), this.xa());
              },
              sorted: function (e) {
                var t = this().slice(0);
                return e ? t.sort(e) : t.sort();
              },
              reversed: function () {
                return this().slice(0).reverse();
              },
            }),
            h.a.Ba && h.a.setPrototypeOf(h.Ha.fn, h.ta.fn),
            h.a.D(
              "pop push reverse shift sort splice unshift".split(" "),
              function (e) {
                h.Ha.fn[e] = function () {
                  var t = this.v();
                  this.ya(), this.zc(t, e, arguments);
                  var n = t[e].apply(t, arguments);
                  return this.xa(), n === t ? this : n;
                };
              }
            ),
            h.a.D(["slice"], function (e) {
              h.Ha.fn[e] = function () {
                var t = this();
                return t[e].apply(t, arguments);
              };
            }),
            (h.Pc = function (e) {
              return (
                h.O(e) &&
                "function" == typeof e.remove &&
                "function" == typeof e.push
              );
            }),
            h.b("observableArray", h.Ha),
            h.b("isObservableArray", h.Pc),
            (h.Ta.trackArrayChanges = function (t, n) {
              function i() {
                function e() {
                  if (u) {
                    var e,
                      n = [].concat(t.v() || []);
                    t.Wa("arrayChange") &&
                      ((!c || 1 < u) && (c = h.a.Pb(a, n, t.Ob)), (e = c)),
                      (a = n),
                      (c = null),
                      (u = 0),
                      e && e.length && t.notifySubscribers(e, "arrayChange");
                  }
                }
                s
                  ? e()
                  : ((s = !0),
                    (o = t.subscribe(
                      function () {
                        ++u;
                      },
                      null,
                      "spectate"
                    )),
                    (a = [].concat(t.v() || [])),
                    (c = null),
                    (r = t.subscribe(e)));
              }
              if (
                ((t.Ob = {}),
                n && "object" == typeof n && h.a.extend(t.Ob, n),
                (t.Ob.sparse = !0),
                !t.zc)
              ) {
                var r,
                  o,
                  a,
                  s = !1,
                  c = null,
                  u = 0,
                  l = t.Qa,
                  f = t.hb;
                (t.Qa = function (e) {
                  l && l.call(t, e), "arrayChange" === e && i();
                }),
                  (t.hb = function (n) {
                    f && f.call(t, n),
                      "arrayChange" !== n ||
                        t.Wa("arrayChange") ||
                        (r && r.s(),
                        o && o.s(),
                        (o = r = null),
                        (s = !1),
                        (a = e));
                  }),
                  (t.zc = function (e, t, n) {
                    function i(e, t, n) {
                      return (r[r.length] = { status: e, value: t, index: n });
                    }
                    if (s && !u) {
                      var r = [],
                        o = e.length,
                        a = n.length,
                        l = 0;
                      switch (t) {
                        case "push":
                          l = o;
                        case "unshift":
                          for (t = 0; t < a; t++) i("added", n[t], l + t);
                          break;
                        case "pop":
                          l = o - 1;
                        case "shift":
                          o && i("deleted", e[l], l);
                          break;
                        case "splice":
                          t = Math.min(
                            Math.max(0, 0 > n[0] ? o + n[0] : n[0]),
                            o
                          );
                          for (
                            var o = 1 === a ? o : Math.min(t + (n[1] || 0), o),
                              a = t + a - 2,
                              l = Math.max(o, a),
                              f = [],
                              d = [],
                              p = 2;
                            t < l;
                            ++t, ++p
                          )
                            t < o && d.push(i("deleted", e[t], t)),
                              t < a && f.push(i("added", n[p], t));
                          h.a.Kc(d, f);
                          break;
                        default:
                          return;
                      }
                      c = r;
                    }
                  });
              }
            });
          var w = h.a.Da("_state");
          h.o = h.$ = function (t, n, i) {
            function r() {
              if (0 < arguments.length) {
                if ("function" != typeof o)
                  throw Error(
                    "Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters."
                  );
                return o.apply(a.nb, arguments), this;
              }
              return (
                a.ra || h.u.cc(r), (a.ka || (a.J && r.Xa())) && r.ha(), a.X
              );
            }
            if (
              ("object" == typeof t
                ? (i = t)
                : ((i = i || {}), t && (i.read = t)),
              "function" != typeof i.read)
            )
              throw Error(
                "Pass a function that returns the value of the ko.computed"
              );
            var o = i.write,
              a = {
                X: e,
                sa: !0,
                ka: !0,
                rb: !1,
                jc: !1,
                ra: !1,
                wb: !1,
                J: !1,
                Wc: i.read,
                nb: n || i.owner,
                l: i.disposeWhenNodeIsRemoved || i.l || null,
                Sa: i.disposeWhen || i.Sa,
                Rb: null,
                I: {},
                V: 0,
                Ic: null,
              };
            return (
              (r[w] = a),
              (r.Nc = "function" == typeof o),
              h.a.Ba || h.a.extend(r, h.T.fn),
              h.T.fn.qb(r),
              h.a.Ab(r, x),
              i.pure
                ? ((a.wb = !0), (a.J = !0), h.a.extend(r, k))
                : i.deferEvaluation && h.a.extend(r, K),
              h.options.deferUpdates && h.Ta.deferred(r, !0),
              a.l && ((a.jc = !0), a.l.nodeType || (a.l = null)),
              a.J || i.deferEvaluation || r.ha(),
              a.l &&
                r.ja() &&
                h.a.K.za(
                  a.l,
                  (a.Rb = function () {
                    r.s();
                  })
                ),
              r
            );
          };
          var x = {
              equalityComparer: c,
              qa: function () {
                return this[w].V;
              },
              Va: function () {
                var e = [];
                return (
                  h.a.P(this[w].I, function (t, n) {
                    e[n.Ka] = n.da;
                  }),
                  e
                );
              },
              Vb: function (e) {
                if (!this[w].V) return !1;
                var t = this.Va();
                return (
                  -1 !== h.a.A(t, e) ||
                  !!h.a.Lb(t, function (t) {
                    return t.Vb && t.Vb(e);
                  })
                );
              },
              uc: function (e, t, n) {
                if (this[w].wb && t === this)
                  throw Error(
                    "A 'pure' computed must not be called recursively"
                  );
                (this[w].I[e] = n), (n.Ka = this[w].V++), (n.La = t.ob());
              },
              Xa: function () {
                var e,
                  t,
                  n = this[w].I;
                for (e in n)
                  if (
                    Object.prototype.hasOwnProperty.call(n, e) &&
                    ((t = n[e]), (this.Ia && t.da.Ja) || t.da.Dd(t.La))
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
                  var t = e.subscribe(this.Jd, this, "dirty"),
                    n = e.subscribe(this.Rd, this);
                  return {
                    da: e,
                    s: function () {
                      t.s(), n.s();
                    },
                  };
                }
                return e.subscribe(this.Hc, this);
              },
              Hc: function () {
                var e = this,
                  t = e.throttleEvaluation;
                t && 0 <= t
                  ? (clearTimeout(this[w].Ic),
                    (this[w].Ic = h.a.setTimeout(function () {
                      e.ha(!0);
                    }, t)))
                  : e.Ia
                  ? e.Ia(!0)
                  : e.ha(!0);
              },
              ha: function (e) {
                var t = this[w],
                  n = t.Sa,
                  i = !1;
                if (!t.rb && !t.ra) {
                  if ((t.l && !h.a.Sb(t.l)) || (n && n())) {
                    if (!t.jc) return void this.s();
                  } else t.jc = !1;
                  t.rb = !0;
                  try {
                    i = this.zd(e);
                  } finally {
                    t.rb = !1;
                  }
                  return i;
                }
              },
              zd: function (t) {
                var n = this[w],
                  i = !1,
                  r = n.wb ? e : !n.V,
                  i = { qd: this, mb: n.I, Qb: n.V };
                h.u.xc({ pd: i, od: p, o: this, Ya: r }), (n.I = {}), (n.V = 0);
                var o = this.yd(n, i);
                return (
                  n.V ? (i = this.sb(n.X, o)) : (this.s(), (i = !0)),
                  i &&
                    (n.J
                      ? this.Gb()
                      : this.notifySubscribers(n.X, "beforeChange"),
                    (n.X = o),
                    this.notifySubscribers(n.X, "spectate"),
                    !n.J && t && this.notifySubscribers(n.X),
                    this.rc && this.rc()),
                  r && this.notifySubscribers(n.X, "awake"),
                  i
                );
              },
              yd: function (e, t) {
                try {
                  var n = e.Wc;
                  return e.nb ? n.call(e.nb) : n();
                } finally {
                  h.u.end(), t.Qb && !e.J && h.a.P(t.mb, d), (e.sa = e.ka = !1);
                }
              },
              v: function (e) {
                var t = this[w];
                return (
                  ((t.ka && (e || !t.V)) || (t.J && this.Xa())) && this.ha(),
                  t.X
                );
              },
              ub: function (e) {
                h.T.fn.ub.call(this, e),
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
                var t = this[w];
                !t.J &&
                  t.I &&
                  h.a.P(t.I, function (e, t) {
                    t.s && t.s();
                  }),
                  t.l && t.Rb && h.a.K.yb(t.l, t.Rb),
                  (t.I = e),
                  (t.V = 0),
                  (t.ra = !0),
                  (t.sa = !1),
                  (t.ka = !1),
                  (t.J = !1),
                  (t.l = e),
                  (t.Sa = e),
                  (t.Wc = e),
                  this.Nc || (t.nb = e);
              },
            },
            k = {
              Qa: function (e) {
                var t = this,
                  n = t[w];
                if (!n.ra && n.J && "change" == e) {
                  if (((n.J = !1), n.sa || t.Xa()))
                    (n.I = null), (n.V = 0), t.ha() && t.Gb();
                  else {
                    var i = [];
                    h.a.P(n.I, function (e, t) {
                      i[t.Ka] = e;
                    }),
                      h.a.D(i, function (e, i) {
                        var r = n.I[e],
                          o = t.$c(r.da);
                        (o.Ka = i), (o.La = r.La), (n.I[e] = o);
                      }),
                      t.Xa() && t.ha() && t.Gb();
                  }
                  n.ra || t.notifySubscribers(n.X, "awake");
                }
              },
              hb: function (t) {
                var n = this[w];
                n.ra ||
                  "change" != t ||
                  this.Wa("change") ||
                  (h.a.P(n.I, function (e, t) {
                    t.s && ((n.I[e] = { da: t.da, Ka: t.Ka, La: t.La }), t.s());
                  }),
                  (n.J = !0),
                  this.notifySubscribers(e, "asleep"));
              },
              ob: function () {
                var e = this[w];
                return (
                  e.J && (e.sa || this.Xa()) && this.ha(), h.T.fn.ob.call(this)
                );
              },
            },
            K = {
              Qa: function (e) {
                ("change" != e && "beforeChange" != e) || this.v();
              },
            };
          h.a.Ba && h.a.setPrototypeOf(x, h.T.fn);
          var E = h.ta.Ma;
          (x[E] = h.o),
            (h.Oc = function (e) {
              return "function" == typeof e && e[E] === x[E];
            }),
            (h.Fd = function (e) {
              return h.Oc(e) && e[w] && e[w].wb;
            }),
            h.b("computed", h.o),
            h.b("dependentObservable", h.o),
            h.b("isComputed", h.Oc),
            h.b("isPureComputed", h.Fd),
            h.b("computed.fn", x),
            h.L(x, "peek", x.v),
            h.L(x, "dispose", x.s),
            h.L(x, "isActive", x.ja),
            h.L(x, "getDependenciesCount", x.qa),
            h.L(x, "getDependencies", x.Va),
            (h.xb = function (e, t) {
              return "function" == typeof e
                ? h.o(e, t, { pure: !0 })
                : ((e = h.a.extend({}, e)), (e.pure = !0), h.o(e, t));
            }),
            h.b("pureComputed", h.xb),
            (function () {
              function t(r, o, a) {
                if (
                  ((a = a || new i()),
                  "object" != typeof (r = o(r)) ||
                    null === r ||
                    r === e ||
                    r instanceof RegExp ||
                    r instanceof Date ||
                    r instanceof String ||
                    r instanceof Number ||
                    r instanceof Boolean)
                )
                  return r;
                var s = r instanceof Array ? [] : {};
                return (
                  a.save(r, s),
                  n(r, function (n) {
                    var i = o(r[n]);
                    switch (typeof i) {
                      case "boolean":
                      case "number":
                      case "string":
                      case "function":
                        s[n] = i;
                        break;
                      case "object":
                      case "undefined":
                        var c = a.get(i);
                        s[n] = c !== e ? c : t(i, o, a);
                    }
                  }),
                  s
                );
              }
              function n(e, t) {
                if (e instanceof Array) {
                  for (var n = 0; n < e.length; n++) t(n);
                  "function" == typeof e.toJSON && t("toJSON");
                } else for (n in e) t(n);
              }
              function i() {
                (this.keys = []), (this.values = []);
              }
              (h.ad = function (e) {
                if (0 == arguments.length)
                  throw Error(
                    "When calling ko.toJS, pass the object you want to convert."
                  );
                return t(e, function (e) {
                  for (var t = 0; h.O(e) && 10 > t; t++) e = e();
                  return e;
                });
              }),
                (h.toJSON = function (e, t, n) {
                  return (e = h.ad(e)), h.a.hc(e, t, n);
                }),
                (i.prototype = {
                  constructor: i,
                  save: function (e, t) {
                    var n = h.a.A(this.keys, e);
                    0 <= n
                      ? (this.values[n] = t)
                      : (this.keys.push(e), this.values.push(t));
                  },
                  get: function (t) {
                    return (
                      (t = h.a.A(this.keys, t)), 0 <= t ? this.values[t] : e
                    );
                  },
                });
            })(),
            h.b("toJS", h.ad),
            h.b("toJSON", h.toJSON),
            (h.Wd = function (e, t, n) {
              function i(t) {
                var i = h.xb(e, n).extend({ ma: "always" }),
                  r = i.subscribe(function (e) {
                    e && (r.s(), t(e));
                  });
                return i.notifySubscribers(i.v()), r;
              }
              return "function" != typeof Promise || t
                ? i(t.bind(n))
                : new Promise(i);
            }),
            h.b("when", h.Wd),
            (function () {
              h.w = {
                M: function (t) {
                  switch (h.a.R(t)) {
                    case "option":
                      return !0 === t.__ko__hasDomDataOptionValue__
                        ? h.a.g.get(t, h.c.options.$b)
                        : 7 >= h.a.W
                        ? t.getAttributeNode("value") &&
                          t.getAttributeNode("value").specified
                          ? t.value
                          : t.text
                        : t.value;
                    case "select":
                      return 0 <= t.selectedIndex
                        ? h.w.M(t.options[t.selectedIndex])
                        : e;
                    default:
                      return t.value;
                  }
                },
                cb: function (t, n, i) {
                  switch (h.a.R(t)) {
                    case "option":
                      "string" == typeof n
                        ? (h.a.g.set(t, h.c.options.$b, e),
                          "__ko__hasDomDataOptionValue__" in t &&
                            delete t.__ko__hasDomDataOptionValue__,
                          (t.value = n))
                        : (h.a.g.set(t, h.c.options.$b, n),
                          (t.__ko__hasDomDataOptionValue__ = !0),
                          (t.value = "number" == typeof n ? n : ""));
                      break;
                    case "select":
                      ("" !== n && null !== n) || (n = e);
                      for (
                        var r, o = -1, a = 0, s = t.options.length;
                        a < s;
                        ++a
                      )
                        if (
                          (r = h.w.M(t.options[a])) == n ||
                          ("" === r && n === e)
                        ) {
                          o = a;
                          break;
                        }
                      (i || 0 <= o || (n === e && 1 < t.size)) &&
                        ((t.selectedIndex = o),
                        6 === h.a.W &&
                          h.a.setTimeout(function () {
                            t.selectedIndex = o;
                          }, 0));
                      break;
                    default:
                      (null !== n && n !== e) || (n = ""), (t.value = n);
                  }
                },
              };
            })(),
            h.b("selectExtensions", h.w),
            h.b("selectExtensions.readValue", h.w.M),
            h.b("selectExtensions.writeValue", h.w.cb),
            (h.m = (function () {
              function e(e) {
                (e = h.a.Db(e)),
                  123 === e.charCodeAt(0) && (e = e.slice(1, -1)),
                  (e += "\n,");
                var t,
                  n = [],
                  a = e.match(i),
                  s = [],
                  c = 0;
                if (1 < a.length) {
                  for (var u, l = 0; (u = a[l]); ++l) {
                    var f = u.charCodeAt(0);
                    if (44 === f) {
                      if (0 >= c) {
                        n.push(
                          t && s.length
                            ? { key: t, value: s.join("") }
                            : { unknown: t || s.join("") }
                        ),
                          (t = c = 0),
                          (s = []);
                        continue;
                      }
                    } else if (58 === f) {
                      if (!c && !t && 1 === s.length) {
                        t = s.pop();
                        continue;
                      }
                    } else {
                      if (
                        47 === f &&
                        1 < u.length &&
                        (47 === u.charCodeAt(1) || 42 === u.charCodeAt(1))
                      )
                        continue;
                      47 === f && l && 1 < u.length
                        ? (f = a[l - 1].match(r)) &&
                          !o[f[0]] &&
                          ((e = e.substr(e.indexOf(u) + 1)),
                          (a = e.match(i)),
                          (l = -1),
                          (u = "/"))
                        : 40 === f || 123 === f || 91 === f
                        ? ++c
                        : 41 === f || 125 === f || 93 === f
                        ? --c
                        : t ||
                          s.length ||
                          (34 !== f && 39 !== f) ||
                          (u = u.slice(1, -1));
                    }
                    s.push(u);
                  }
                  if (0 < c)
                    throw Error("Unbalanced parentheses, braces, or brackets");
                }
                return n;
              }
              var t = ["true", "false", "null", "undefined"],
                n = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i,
                i = RegExp(
                  "\"(?:\\\\.|[^\"])*\"|'(?:\\\\.|[^'])*'|`(?:\\\\.|[^`])*`|/\\*(?:[^*]|\\*+[^*/])*\\*+/|//.*\n|/(?:\\\\.|[^/])+/w*|[^\\s:,/][^,\"'`{}()/:[\\]]*[^\\s,\"'`{}()/:[\\]]|[^\\s]",
                  "g"
                ),
                r = /[\])"'A-Za-z0-9_$]+$/,
                o = { in: 1, return: 1, typeof: 1 },
                a = {};
              return {
                Ra: [],
                wa: a,
                ac: e,
                vb: function (i, r) {
                  function o(e, i) {
                    var r;
                    if (!l) {
                      var f = h.getBindingHandler(e);
                      if (f && f.preprocess && !(i = f.preprocess(i, e, o)))
                        return;
                      (f = a[e]) &&
                        ((r = i),
                        0 <= h.a.A(t, r)
                          ? (r = !1)
                          : ((f = r.match(n)),
                            (r =
                              null !== f &&
                              (f[1] ? "Object(" + f[1] + ")" + f[2] : r))),
                        (f = r)),
                        f &&
                          c.push(
                            "'" +
                              ("string" == typeof a[e] ? a[e] : e) +
                              "':function(_z){" +
                              r +
                              "=_z}"
                          );
                    }
                    u && (i = "function(){return " + i + " }"),
                      s.push("'" + e + "':" + i);
                  }
                  r = r || {};
                  var s = [],
                    c = [],
                    u = r.valueAccessors,
                    l = r.bindingParams,
                    f = "string" == typeof i ? e(i) : i;
                  return (
                    h.a.D(f, function (e) {
                      o(e.key || e.unknown, e.value);
                    }),
                    c.length &&
                      o("_ko_property_writers", "{" + c.join(",") + " }"),
                    s.join(",")
                  );
                },
                Id: function (e, t) {
                  for (var n = 0; n < e.length; n++)
                    if (e[n].key == t) return !0;
                  return !1;
                },
                eb: function (e, t, n, i, r) {
                  e && h.O(e)
                    ? !h.Za(e) || (r && e.v() === i) || e(i)
                    : (e = t.get("_ko_property_writers")) && e[n] && e[n](i);
                },
              };
            })()),
            h.b("expressionRewriting", h.m),
            h.b("expressionRewriting.bindingRewriteValidators", h.m.Ra),
            h.b("expressionRewriting.parseObjectLiteral", h.m.ac),
            h.b("expressionRewriting.preProcessBindings", h.m.vb),
            h.b("expressionRewriting._twoWayBindings", h.m.wa),
            h.b("jsonExpressionRewriting", h.m),
            h.b(
              "jsonExpressionRewriting.insertPropertyAccessorsIntoJson",
              h.m.vb
            ),
            (function () {
              function e(e) {
                return 8 == e.nodeType && a.test(o ? e.text : e.nodeValue);
              }
              function t(e) {
                return 8 == e.nodeType && s.test(o ? e.text : e.nodeValue);
              }
              function i(n, i) {
                for (var r = n, o = 1, a = []; (r = r.nextSibling); ) {
                  if (t(r) && (h.a.g.set(r, u, !0), 0 === --o)) return a;
                  a.push(r), e(r) && o++;
                }
                if (!i)
                  throw Error(
                    "Cannot find closing comment tag to match: " + n.nodeValue
                  );
                return null;
              }
              function r(e, t) {
                var n = i(e, t);
                return n
                  ? 0 < n.length
                    ? n[n.length - 1].nextSibling
                    : e.nextSibling
                  : null;
              }
              var o = n && "\x3c!--test--\x3e" === n.createComment("test").text,
                a = o
                  ? /^\x3c!--\s*ko(?:\s+([\s\S]+))?\s*--\x3e$/
                  : /^\s*ko(?:\s+([\s\S]+))?\s*$/,
                s = o ? /^\x3c!--\s*\/ko\s*--\x3e$/ : /^\s*\/ko\s*$/,
                c = { ul: !0, ol: !0 },
                u = "__ko_matchedEndComment__";
              h.h = {
                ea: {},
                childNodes: function (t) {
                  return e(t) ? i(t) : t.childNodes;
                },
                Ea: function (t) {
                  if (e(t)) {
                    t = h.h.childNodes(t);
                    for (var n = 0, i = t.length; n < i; n++)
                      h.removeNode(t[n]);
                  } else h.a.Tb(t);
                },
                va: function (t, n) {
                  if (e(t)) {
                    h.h.Ea(t);
                    for (var i = t.nextSibling, r = 0, o = n.length; r < o; r++)
                      i.parentNode.insertBefore(n[r], i);
                  } else h.a.va(t, n);
                },
                Vc: function (t, n) {
                  var i;
                  e(t)
                    ? ((i = t.nextSibling), (t = t.parentNode))
                    : (i = t.firstChild),
                    i ? n !== i && t.insertBefore(n, i) : t.appendChild(n);
                },
                Wb: function (t, n, i) {
                  i
                    ? ((i = i.nextSibling),
                      e(t) && (t = t.parentNode),
                      i ? n !== i && t.insertBefore(n, i) : t.appendChild(n))
                    : h.h.Vc(t, n);
                },
                firstChild: function (n) {
                  if (e(n))
                    return !n.nextSibling || t(n.nextSibling)
                      ? null
                      : n.nextSibling;
                  if (n.firstChild && t(n.firstChild))
                    throw Error(
                      "Found invalid end comment, as the first child of " + n
                    );
                  return n.firstChild;
                },
                nextSibling: function (n) {
                  if ((e(n) && (n = r(n)), n.nextSibling && t(n.nextSibling))) {
                    var i = n.nextSibling;
                    if (t(i) && !h.a.g.get(i, u))
                      throw Error(
                        "Found end comment without a matching opening comment, as child of " +
                          n
                      );
                    return null;
                  }
                  return n.nextSibling;
                },
                Cd: e,
                Vd: function (e) {
                  return (e = (o ? e.text : e.nodeValue).match(a))
                    ? e[1]
                    : null;
                },
                Sc: function (n) {
                  if (c[h.a.R(n)]) {
                    var i = n.firstChild;
                    if (i)
                      do {
                        if (1 === i.nodeType) {
                          var o;
                          o = i.firstChild;
                          var a = null;
                          if (o)
                            do {
                              if (a) a.push(o);
                              else if (e(o)) {
                                var s = r(o, !0);
                                s ? (o = s) : (a = [o]);
                              } else t(o) && (a = [o]);
                            } while ((o = o.nextSibling));
                          if ((o = a))
                            for (a = i.nextSibling, s = 0; s < o.length; s++)
                              a ? n.insertBefore(o[s], a) : n.appendChild(o[s]);
                        }
                      } while ((i = i.nextSibling));
                  }
                },
              };
            })(),
            h.b("virtualElements", h.h),
            h.b("virtualElements.allowedBindings", h.h.ea),
            h.b("virtualElements.emptyNode", h.h.Ea),
            h.b("virtualElements.insertAfter", h.h.Wb),
            h.b("virtualElements.prepend", h.h.Vc),
            h.b("virtualElements.setDomNodeChildren", h.h.va),
            (function () {
              (h.ga = function () {
                this.nd = {};
              }),
                h.a.extend(h.ga.prototype, {
                  nodeHasBindings: function (e) {
                    switch (e.nodeType) {
                      case 1:
                        return (
                          null != e.getAttribute("data-bind") ||
                          h.j.getComponentNameForNode(e)
                        );
                      case 8:
                        return h.h.Cd(e);
                      default:
                        return !1;
                    }
                  },
                  getBindings: function (e, t) {
                    var n = this.getBindingsString(e, t),
                      n = n ? this.parseBindingsString(n, t, e) : null;
                    return h.j.tc(n, e, t, !1);
                  },
                  getBindingAccessors: function (e, t) {
                    var n = this.getBindingsString(e, t),
                      n = n
                        ? this.parseBindingsString(n, t, e, {
                            valueAccessors: !0,
                          })
                        : null;
                    return h.j.tc(n, e, t, !0);
                  },
                  getBindingsString: function (e) {
                    switch (e.nodeType) {
                      case 1:
                        return e.getAttribute("data-bind");
                      case 8:
                        return h.h.Vd(e);
                      default:
                        return null;
                    }
                  },
                  parseBindingsString: function (e, t, n, i) {
                    try {
                      var r,
                        o = this.nd,
                        a = e + ((i && i.valueAccessors) || "");
                      if (!(r = o[a])) {
                        var s,
                          c =
                            "with($context){with($data||{}){return{" +
                            h.m.vb(e, i) +
                            "}}}";
                        (s = new Function("$context", "$element", c)),
                          (r = o[a] = s);
                      }
                      return r(t, n);
                    } catch (t) {
                      throw (
                        ((t.message =
                          "Unable to parse bindings.\nBindings value: " +
                          e +
                          "\nMessage: " +
                          t.message),
                        t)
                      );
                    }
                  },
                }),
                (h.ga.instance = new h.ga());
            })(),
            h.b("bindingProvider", h.ga),
            (function () {
              function i(e) {
                var t = (e = h.a.g.get(e, k)) && e.N;
                t && ((e.N = null), t.Tc());
              }
              function o(e, t, n) {
                (this.node = e),
                  (this.yc = t),
                  (this.kb = []),
                  (this.H = !1),
                  t.N || h.a.K.za(e, i),
                  n && n.N && (n.N.kb.push(e), (this.Kb = n));
              }
              function a(e) {
                return function () {
                  return e;
                };
              }
              function s(e) {
                return e();
              }
              function c(e) {
                return h.a.Ga(h.u.G(e), function (t, n) {
                  return function () {
                    return e()[n];
                  };
                });
              }
              function u(e, t, n) {
                return "function" == typeof e
                  ? c(e.bind(null, t, n))
                  : h.a.Ga(e, a);
              }
              function l(e, t) {
                return c(this.getBindings.bind(this, e, t));
              }
              function f(e, t) {
                var n = h.h.firstChild(t);
                if (n) {
                  var i,
                    r = h.ga.instance,
                    o = r.preprocessNode;
                  if (o) {
                    for (; (i = n); ) (n = h.h.nextSibling(i)), o.call(r, i);
                    n = h.h.firstChild(t);
                  }
                  for (; (i = n); ) (n = h.h.nextSibling(i)), d(e, i);
                }
                h.i.ma(t, h.i.H);
              }
              function d(e, t) {
                var n = e,
                  i = 1 === t.nodeType;
                i && h.h.Sc(t),
                  (i || h.ga.instance.nodeHasBindings(t)) &&
                    (n = g(t, null, e).bindingContextForDescendants),
                  n && !w[h.a.R(t)] && f(n, t);
              }
              function p(e) {
                var t = [],
                  n = {},
                  i = [];
                return (
                  h.a.P(e, function r(o) {
                    if (!n[o]) {
                      var a = h.getBindingHandler(o);
                      a &&
                        (a.after &&
                          (i.push(o),
                          h.a.D(a.after, function (t) {
                            if (e[t]) {
                              if (-1 !== h.a.A(i, t))
                                throw Error(
                                  "Cannot combine the following bindings, because they have a cyclic dependency: " +
                                    i.join(", ")
                                );
                              r(t);
                            }
                          }),
                          i.length--),
                        t.push({ key: o, Mc: a })),
                        (n[o] = !0);
                    }
                  }),
                  t
                );
              }
              function g(t, n, i) {
                var r = h.a.g.Ub(t, k, {}),
                  o = r.hd;
                if (!n) {
                  if (o)
                    throw Error(
                      "You cannot apply bindings multiple times to the same element."
                    );
                  r.hd = !0;
                }
                o || (r.context = i), r.Zb || (r.Zb = {});
                var a;
                if (n && "function" != typeof n) a = n;
                else {
                  var c = h.ga.instance,
                    u = c.getBindingAccessors || l,
                    f = h.$(
                      function () {
                        return (
                          (a = n ? n(i, t) : u.call(c, t, i)) &&
                            (i[m] && i[m](), i[v] && i[v]()),
                          a
                        );
                      },
                      null,
                      { l: t }
                    );
                  (a && f.ja()) || (f = null);
                }
                var d,
                  g = i;
                if (a) {
                  var b = function () {
                      return h.a.Ga(f ? f() : a, s);
                    },
                    y = f
                      ? function (e) {
                          return function () {
                            return s(f()[e]);
                          };
                        }
                      : function (e) {
                          return a[e];
                        };
                  (b.get = function (e) {
                    return a[e] && s(y(e));
                  }),
                    (b.has = function (e) {
                      return e in a;
                    }),
                    h.i.H in a &&
                      h.i.subscribe(t, h.i.H, function () {
                        var e = (0, a[h.i.H])();
                        if (e) {
                          var n = h.h.childNodes(t);
                          n.length && e(n, h.Ec(n[0]));
                        }
                      }),
                    h.i.pa in a &&
                      ((g = h.i.Cb(t, i)),
                      h.i.subscribe(t, h.i.pa, function () {
                        var e = (0, a[h.i.pa])();
                        e && h.h.firstChild(t) && e(t);
                      })),
                    (r = p(a)),
                    h.a.D(r, function (n) {
                      var i = n.Mc.init,
                        r = n.Mc.update,
                        o = n.key;
                      if (8 === t.nodeType && !h.h.ea[o])
                        throw Error(
                          "The binding '" +
                            o +
                            "' cannot be used with virtual elements"
                        );
                      try {
                        "function" == typeof i &&
                          h.u.G(function () {
                            var n = i(t, y(o), b, g.$data, g);
                            if (n && n.controlsDescendantBindings) {
                              if (d !== e)
                                throw Error(
                                  "Multiple bindings (" +
                                    d +
                                    " and " +
                                    o +
                                    ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element."
                                );
                              d = o;
                            }
                          }),
                          "function" == typeof r &&
                            h.$(
                              function () {
                                r(t, y(o), b, g.$data, g);
                              },
                              null,
                              { l: t }
                            );
                      } catch (e) {
                        throw (
                          ((e.message =
                            'Unable to process binding "' +
                            o +
                            ": " +
                            a[o] +
                            '"\nMessage: ' +
                            e.message),
                          e)
                        );
                      }
                    });
                }
                return (
                  (r = d === e),
                  {
                    shouldBindDescendants: r,
                    bindingContextForDescendants: r && g,
                  }
                );
              }
              function b(t, n) {
                return t && t instanceof h.fa ? t : new h.fa(t, e, e, n);
              }
              var m = h.a.Da("_subscribable"),
                y = h.a.Da("_ancestorBindingInfo"),
                v = h.a.Da("_dataDependency");
              h.c = {};
              var w = { script: !0, textarea: !0, template: !0 };
              h.getBindingHandler = function (e) {
                return h.c[e];
              };
              var x = {};
              (h.fa = function (t, n, i, r, o) {
                function a() {
                  var e = f ? l() : l,
                    t = h.a.f(e);
                  return (
                    n
                      ? (h.a.extend(c, n), y in n && (c[y] = n[y]))
                      : ((c.$parents = []), (c.$root = t), (c.ko = h)),
                    (c[m] = s),
                    u ? (t = c.$data) : ((c.$rawData = e), (c.$data = t)),
                    i && (c[i] = t),
                    r && r(c, n, t),
                    n && n[m] && !h.S.o().Vb(n[m]) && n[m](),
                    d && (c[v] = d),
                    c.$data
                  );
                }
                var s,
                  c = this,
                  u = t === x,
                  l = u ? e : t,
                  f = "function" == typeof l && !h.O(l),
                  d = o && o.dataDependency;
                o && o.exportDependencies
                  ? a()
                  : ((s = h.xb(a)),
                    s.v(),
                    s.ja() ? (s.equalityComparer = null) : (c[m] = e));
              }),
                (h.fa.prototype.createChildContext = function (e, t, n, i) {
                  if (
                    (!i &&
                      t &&
                      "object" == typeof t &&
                      ((i = t), (t = i.as), (n = i.extend)),
                    t && i && i.noChildContext)
                  ) {
                    var r = "function" == typeof e && !h.O(e);
                    return new h.fa(
                      x,
                      this,
                      null,
                      function (i) {
                        n && n(i), (i[t] = r ? e() : e);
                      },
                      i
                    );
                  }
                  return new h.fa(
                    e,
                    this,
                    t,
                    function (e, t) {
                      (e.$parentContext = t),
                        (e.$parent = t.$data),
                        (e.$parents = (t.$parents || []).slice(0)),
                        e.$parents.unshift(e.$parent),
                        n && n(e);
                    },
                    i
                  );
                }),
                (h.fa.prototype.extend = function (e, t) {
                  return new h.fa(
                    x,
                    this,
                    null,
                    function (t) {
                      h.a.extend(t, "function" == typeof e ? e(t) : e);
                    },
                    t
                  );
                });
              var k = h.a.g.Z();
              (o.prototype.Tc = function () {
                this.Kb && this.Kb.N && this.Kb.N.sd(this.node);
              }),
                (o.prototype.sd = function (e) {
                  h.a.Pa(this.kb, e), !this.kb.length && this.H && this.Cc();
                }),
                (o.prototype.Cc = function () {
                  (this.H = !0),
                    this.yc.N &&
                      !this.kb.length &&
                      ((this.yc.N = null),
                      h.a.K.yb(this.node, i),
                      h.i.ma(this.node, h.i.pa),
                      this.Tc());
                }),
                (h.i = {
                  H: "childrenComplete",
                  pa: "descendantsComplete",
                  subscribe: function (e, t, n, i, r) {
                    var o = h.a.g.Ub(e, k, {});
                    return (
                      o.Fa || (o.Fa = new h.T()),
                      r && r.notifyImmediately && o.Zb[t] && h.u.G(n, i, [e]),
                      o.Fa.subscribe(n, i, t)
                    );
                  },
                  ma: function (t, n) {
                    var i = h.a.g.get(t, k);
                    if (
                      i &&
                      ((i.Zb[n] = !0),
                      i.Fa && i.Fa.notifySubscribers(t, n),
                      n == h.i.H)
                    )
                      if (i.N) i.N.Cc();
                      else if (i.N === e && i.Fa && i.Fa.Wa(h.i.pa))
                        throw Error(
                          "descendantsComplete event not supported for bindings on this node"
                        );
                  },
                  Cb: function (e, t) {
                    var n = h.a.g.Ub(e, k, {});
                    return (
                      n.N || (n.N = new o(e, n, t[y])),
                      t[y] == n
                        ? t
                        : t.extend(function (e) {
                            e[y] = n;
                          })
                    );
                  },
                }),
                (h.Td = function (e) {
                  return (e = h.a.g.get(e, k)) && e.context;
                }),
                (h.ib = function (e, t, n) {
                  return 1 === e.nodeType && h.h.Sc(e), g(e, t, b(n));
                }),
                (h.ld = function (e, t, n) {
                  return (n = b(n)), h.ib(e, u(t, n, e), n);
                }),
                (h.Oa = function (e, t) {
                  (1 !== t.nodeType && 8 !== t.nodeType) || f(b(e), t);
                }),
                (h.vc = function (e, i, o) {
                  if (
                    (!r && t.jQuery && (r = t.jQuery), 2 > arguments.length)
                  ) {
                    if (!(i = n.body))
                      throw Error(
                        "ko.applyBindings: could not find document.body; has the document been loaded?"
                      );
                  } else if (!i || (1 !== i.nodeType && 8 !== i.nodeType))
                    throw Error(
                      "ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node"
                    );
                  d(b(e, o), i);
                }),
                (h.Dc = function (t) {
                  return !t || (1 !== t.nodeType && 8 !== t.nodeType)
                    ? e
                    : h.Td(t);
                }),
                (h.Ec = function (t) {
                  return (t = h.Dc(t)) ? t.$data : e;
                }),
                h.b("bindingHandlers", h.c),
                h.b("bindingEvent", h.i),
                h.b("bindingEvent.subscribe", h.i.subscribe),
                h.b("bindingEvent.startPossiblyAsyncContentBinding", h.i.Cb),
                h.b("applyBindings", h.vc),
                h.b("applyBindingsToDescendants", h.Oa),
                h.b("applyBindingAccessorsToNode", h.ib),
                h.b("applyBindingsToNode", h.ld),
                h.b("contextFor", h.Dc),
                h.b("dataFor", h.Ec);
            })(),
            (function (e) {
              function t(t, i) {
                var a,
                  s = Object.prototype.hasOwnProperty.call(r, t) ? r[t] : e;
                s
                  ? s.subscribe(i)
                  : ((s = r[t] = new h.T()),
                    s.subscribe(i),
                    n(t, function (e, n) {
                      var i = !(!n || !n.synchronous);
                      (o[t] = { definition: e, Gd: i }),
                        delete r[t],
                        a || i
                          ? s.notifySubscribers(e)
                          : h.na.zb(function () {
                              s.notifySubscribers(e);
                            });
                    }),
                    (a = !0));
              }
              function n(e, t) {
                i("getConfig", [e], function (n) {
                  n
                    ? i("loadComponent", [e, n], function (e) {
                        t(e, n);
                      })
                    : t(null, null);
                });
              }
              function i(t, n, r, o) {
                o || (o = h.j.loaders.slice(0));
                var a = o.shift();
                if (a) {
                  var s = a[t];
                  if (s) {
                    var c = !1;
                    if (
                      s.apply(
                        a,
                        n.concat(function (e) {
                          c ? r(null) : null !== e ? r(e) : i(t, n, r, o);
                        })
                      ) !== e &&
                      ((c = !0), !a.suppressLoaderExceptions)
                    )
                      throw Error(
                        "Component loaders must supply values by invoking the callback, not by returning values synchronously."
                      );
                  } else i(t, n, r, o);
                } else r(null);
              }
              var r = {},
                o = {};
              (h.j = {
                get: function (n, i) {
                  var r = Object.prototype.hasOwnProperty.call(o, n) ? o[n] : e;
                  r
                    ? r.Gd
                      ? h.u.G(function () {
                          i(r.definition);
                        })
                      : h.na.zb(function () {
                          i(r.definition);
                        })
                    : t(n, i);
                },
                Bc: function (e) {
                  delete o[e];
                },
                oc: i,
              }),
                (h.j.loaders = []),
                h.b("components", h.j),
                h.b("components.get", h.j.get),
                h.b("components.clearCachedDefinition", h.j.Bc);
            })(),
            (function () {
              function e(e, t, n, i) {
                function r() {
                  0 == --s && i(o);
                }
                var o = {},
                  s = 2,
                  c = n.template;
                (n = n.viewModel),
                  c
                    ? a(t, c, function (t) {
                        h.j.oc("loadTemplate", [e, t], function (e) {
                          (o.template = e), r();
                        });
                      })
                    : r(),
                  n
                    ? a(t, n, function (t) {
                        h.j.oc("loadViewModel", [e, t], function (e) {
                          (o[l] = e), r();
                        });
                      })
                    : r();
              }
              function i(e, t, n) {
                if ("function" == typeof t)
                  n(function (e) {
                    return new t(e);
                  });
                else if ("function" == typeof t[l]) n(t[l]);
                else if ("instance" in t) {
                  var r = t.instance;
                  n(function () {
                    return r;
                  });
                } else
                  "viewModel" in t
                    ? i(e, t.viewModel, n)
                    : e("Unknown viewModel value: " + t);
              }
              function r(e) {
                switch (h.a.R(e)) {
                  case "script":
                    return h.a.ua(e.text);
                  case "textarea":
                    return h.a.ua(e.value);
                  case "template":
                    if (o(e.content)) return h.a.Ca(e.content.childNodes);
                }
                return h.a.Ca(e.childNodes);
              }
              function o(e) {
                return t.DocumentFragment
                  ? e instanceof DocumentFragment
                  : e && 11 === e.nodeType;
              }
              function a(e, n, i) {
                "string" == typeof n.require
                  ? s || t.require
                    ? (s || t.require)([n.require], function (e) {
                        e &&
                          "object" == typeof e &&
                          e.Xd &&
                          e.default &&
                          (e = e.default),
                          i(e);
                      })
                    : e("Uses require, but no AMD loader is present")
                  : i(n);
              }
              function c(e) {
                return function (t) {
                  throw Error("Component '" + e + "': " + t);
                };
              }
              var u = {};
              (h.j.register = function (e, t) {
                if (!t) throw Error("Invalid configuration for " + e);
                if (h.j.tb(e))
                  throw Error("Component " + e + " is already registered");
                u[e] = t;
              }),
                (h.j.tb = function (e) {
                  return Object.prototype.hasOwnProperty.call(u, e);
                }),
                (h.j.unregister = function (e) {
                  delete u[e], h.j.Bc(e);
                }),
                (h.j.Fc = {
                  getConfig: function (e, t) {
                    t(h.j.tb(e) ? u[e] : null);
                  },
                  loadComponent: function (t, n, i) {
                    var r = c(t);
                    a(r, n, function (n) {
                      e(t, r, n, i);
                    });
                  },
                  loadTemplate: function (e, i, a) {
                    if (((e = c(e)), "string" == typeof i)) a(h.a.ua(i));
                    else if (i instanceof Array) a(i);
                    else if (o(i)) a(h.a.la(i.childNodes));
                    else if (i.element)
                      if (
                        ((i = i.element),
                        t.HTMLElement
                          ? i instanceof HTMLElement
                          : i && i.tagName && 1 === i.nodeType)
                      )
                        a(r(i));
                      else if ("string" == typeof i) {
                        var s = n.getElementById(i);
                        s ? a(r(s)) : e("Cannot find element with ID " + i);
                      } else e("Unknown element type: " + i);
                    else e("Unknown template value: " + i);
                  },
                  loadViewModel: function (e, t, n) {
                    i(c(e), t, n);
                  },
                });
              var l = "createViewModel";
              h.b("components.register", h.j.register),
                h.b("components.isRegistered", h.j.tb),
                h.b("components.unregister", h.j.unregister),
                h.b("components.defaultLoader", h.j.Fc),
                h.j.loaders.push(h.j.Fc),
                (h.j.dd = u);
            })(),
            (function () {
              function e(e, n) {
                var i = e.getAttribute("params");
                if (i) {
                  var i = t.parseBindingsString(i, n, e, {
                      valueAccessors: !0,
                      bindingParams: !0,
                    }),
                    i = h.a.Ga(i, function (t) {
                      return h.o(t, null, { l: e });
                    }),
                    r = h.a.Ga(i, function (t) {
                      var n = t.v();
                      return t.ja()
                        ? h.o({
                            read: function () {
                              return h.a.f(t());
                            },
                            write:
                              h.Za(n) &&
                              function (e) {
                                t()(e);
                              },
                            l: e,
                          })
                        : n;
                    });
                  return (
                    Object.prototype.hasOwnProperty.call(r, "$raw") ||
                      (r.$raw = i),
                    r
                  );
                }
                return { $raw: {} };
              }
              (h.j.getComponentNameForNode = function (e) {
                var t = h.a.R(e);
                if (
                  h.j.tb(t) &&
                  (-1 != t.indexOf("-") ||
                    "[object HTMLUnknownElement]" == "" + e ||
                    (8 >= h.a.W && e.tagName === t))
                )
                  return t;
              }),
                (h.j.tc = function (t, n, i, r) {
                  if (1 === n.nodeType) {
                    var o = h.j.getComponentNameForNode(n);
                    if (o) {
                      if (((t = t || {}), t.component))
                        throw Error(
                          'Cannot use the "component" binding on a custom element matching a component'
                        );
                      var a = { name: o, params: e(n, i) };
                      t.component = r
                        ? function () {
                            return a;
                          }
                        : a;
                    }
                  }
                  return t;
                });
              var t = new h.ga();
              9 > h.a.W &&
                ((h.j.register = (function (e) {
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })(h.j.register)),
                (n.createDocumentFragment = (function (e) {
                  return function () {
                    var t,
                      n = e(),
                      i = h.j.dd;
                    for (t in i);
                    return n;
                  };
                })(n.createDocumentFragment)));
            })(),
            (function () {
              function e(e, t, n) {
                if (!(t = t.template))
                  throw Error("Component '" + e + "' has no template");
                (e = h.a.Ca(t)), h.h.va(n, e);
              }
              function t(e, t, n) {
                var i = e.createViewModel;
                return i ? i.call(e, t, n) : t;
              }
              var n = 0;
              (h.c.component = {
                init: function (i, r, o, a, s) {
                  function c() {
                    var e = u && u.dispose;
                    "function" == typeof e && e.call(u),
                      f && f.s(),
                      (l = u = f = null);
                  }
                  var u,
                    l,
                    f,
                    d = h.a.la(h.h.childNodes(i));
                  return (
                    h.h.Ea(i),
                    h.a.K.za(i, c),
                    h.o(
                      function () {
                        var o,
                          a,
                          p = h.a.f(r());
                        if (
                          ("string" == typeof p
                            ? (o = p)
                            : ((o = h.a.f(p.name)), (a = h.a.f(p.params))),
                          !o)
                        )
                          throw Error("No component name specified");
                        var g = h.i.Cb(i, s),
                          b = (l = ++n);
                        h.j.get(o, function (n) {
                          if (l === b) {
                            if ((c(), !n))
                              throw Error("Unknown component '" + o + "'");
                            e(o, n, i);
                            var r = t(n, a, { element: i, templateNodes: d });
                            (n = g.createChildContext(r, {
                              extend: function (e) {
                                (e.$component = r),
                                  (e.$componentTemplateNodes = d);
                              },
                            })),
                              r &&
                                r.koDescendantsComplete &&
                                (f = h.i.subscribe(
                                  i,
                                  h.i.pa,
                                  r.koDescendantsComplete,
                                  r
                                )),
                              (u = r),
                              h.Oa(n, i);
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
                (h.h.ea.component = !0);
            })();
          var C = { class: "className", for: "htmlFor" };
          (h.c.attr = {
            update: function (t, n) {
              var i = h.a.f(n()) || {};
              h.a.P(i, function (n, i) {
                i = h.a.f(i);
                var r = n.indexOf(":"),
                  r =
                    "lookupNamespaceURI" in t &&
                    0 < r &&
                    t.lookupNamespaceURI(n.substr(0, r)),
                  o = !1 === i || null === i || i === e;
                o
                  ? r
                    ? t.removeAttributeNS(r, n)
                    : t.removeAttribute(n)
                  : (i = i.toString()),
                  8 >= h.a.W && n in C
                    ? ((n = C[n]), o ? t.removeAttribute(n) : (t[n] = i))
                    : o ||
                      (r ? t.setAttributeNS(r, n, i) : t.setAttribute(n, i)),
                  "name" === n && h.a.Yc(t, o ? "" : i);
              });
            },
          }),
            (function () {
              (h.c.checked = {
                after: ["value", "attr"],
                init: function (t, n, i) {
                  function r() {
                    var r = t.checked,
                      o = a();
                    if (!h.S.Ya() && (r || (!c && !h.S.qa()))) {
                      var u = h.u.G(n);
                      if (l) {
                        var d = f ? u.v() : u,
                          g = p;
                        (p = o),
                          g !== o
                            ? r && (h.a.Na(d, o, !0), h.a.Na(d, g, !1))
                            : h.a.Na(d, o, r),
                          f && h.Za(u) && u(d);
                      } else
                        s && (o === e ? (o = r) : r || (o = e)),
                          h.m.eb(u, i, "checked", o, !0);
                    }
                  }
                  function o() {
                    var i = h.a.f(n()),
                      r = a();
                    l
                      ? ((t.checked = 0 <= h.a.A(i, r)), (p = r))
                      : (t.checked = s && r === e ? !!i : a() === i);
                  }
                  var a = h.xb(function () {
                      return i.has("checkedValue")
                        ? h.a.f(i.get("checkedValue"))
                        : d
                        ? i.has("value")
                          ? h.a.f(i.get("value"))
                          : t.value
                        : void 0;
                    }),
                    s = "checkbox" == t.type,
                    c = "radio" == t.type;
                  if (s || c) {
                    var u = n(),
                      l = s && h.a.f(u) instanceof Array,
                      f = !(l && u.push && u.splice),
                      d = c || l,
                      p = l ? a() : e;
                    c &&
                      !t.name &&
                      h.c.uniqueName.init(t, function () {
                        return !0;
                      }),
                      h.o(r, null, { l: t }),
                      h.a.B(t, "click", r),
                      h.o(o, null, { l: t }),
                      (u = e);
                  }
                },
              }),
                (h.m.wa.checked = !0),
                (h.c.checkedValue = {
                  update: function (e, t) {
                    e.value = h.a.f(t());
                  },
                });
            })(),
            (h.c.class = {
              update: function (e, t) {
                var n = h.a.Db(h.a.f(t()));
                h.a.Eb(e, e.__ko__cssValue, !1),
                  (e.__ko__cssValue = n),
                  h.a.Eb(e, n, !0);
              },
            }),
            (h.c.css = {
              update: function (e, t) {
                var n = h.a.f(t());
                null !== n && "object" == typeof n
                  ? h.a.P(n, function (t, n) {
                      (n = h.a.f(n)), h.a.Eb(e, t, n);
                    })
                  : h.c.class.update(e, t);
              },
            }),
            (h.c.enable = {
              update: function (e, t) {
                var n = h.a.f(t());
                n && e.disabled
                  ? e.removeAttribute("disabled")
                  : n || e.disabled || (e.disabled = !0);
              },
            }),
            (h.c.disable = {
              update: function (e, t) {
                h.c.enable.update(e, function () {
                  return !h.a.f(t());
                });
              },
            }),
            (h.c.event = {
              init: function (e, t, n, i, r) {
                var o = t() || {};
                h.a.P(o, function (o) {
                  "string" == typeof o &&
                    h.a.B(e, o, function (e) {
                      var a,
                        s = t()[o];
                      if (s) {
                        try {
                          var c = h.a.la(arguments);
                          (i = r.$data), c.unshift(i), (a = s.apply(i, c));
                        } finally {
                          !0 !== a &&
                            (e.preventDefault
                              ? e.preventDefault()
                              : (e.returnValue = !1));
                        }
                        !1 === n.get(o + "Bubble") &&
                          ((e.cancelBubble = !0),
                          e.stopPropagation && e.stopPropagation());
                      }
                    });
                });
              },
            }),
            (h.c.foreach = {
              Rc: function (e) {
                return function () {
                  var t = e(),
                    n = h.a.bc(t);
                  return n && "number" != typeof n.length
                    ? (h.a.f(t),
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
                        templateEngine: h.ba.Ma,
                      })
                    : { foreach: t, templateEngine: h.ba.Ma };
                };
              },
              init: function (e, t) {
                return h.c.template.init(e, h.c.foreach.Rc(t));
              },
              update: function (e, t, n, i, r) {
                return h.c.template.update(e, h.c.foreach.Rc(t), n, i, r);
              },
            }),
            (h.m.Ra.foreach = !1),
            (h.h.ea.foreach = !0),
            (h.c.hasfocus = {
              init: function (e, t, n) {
                function i(i) {
                  e.__ko_hasfocusUpdating = !0;
                  var r = e.ownerDocument;
                  if ("activeElement" in r) {
                    var o;
                    try {
                      o = r.activeElement;
                    } catch (e) {
                      o = r.body;
                    }
                    i = o === e;
                  }
                  (r = t()),
                    h.m.eb(r, n, "hasfocus", i, !0),
                    (e.__ko_hasfocusLastValue = i),
                    (e.__ko_hasfocusUpdating = !1);
                }
                var r = i.bind(null, !0),
                  o = i.bind(null, !1);
                h.a.B(e, "focus", r),
                  h.a.B(e, "focusin", r),
                  h.a.B(e, "blur", o),
                  h.a.B(e, "focusout", o),
                  (e.__ko_hasfocusLastValue = !1);
              },
              update: function (e, t) {
                var n = !!h.a.f(t());
                e.__ko_hasfocusUpdating ||
                  e.__ko_hasfocusLastValue === n ||
                  (n ? e.focus() : e.blur(),
                  !n &&
                    e.__ko_hasfocusLastValue &&
                    e.ownerDocument.body.focus(),
                  h.u.G(h.a.Fb, null, [e, n ? "focusin" : "focusout"]));
              },
            }),
            (h.m.wa.hasfocus = !0),
            (h.c.hasFocus = h.c.hasfocus),
            (h.m.wa.hasFocus = "hasfocus"),
            (h.c.html = {
              init: function () {
                return { controlsDescendantBindings: !0 };
              },
              update: function (e, t) {
                h.a.fc(e, t());
              },
            }),
            (function () {
              function e(e, t, n) {
                (h.c[e] = {
                  init: function (e, i, r, o, a) {
                    var s,
                      c,
                      u,
                      l,
                      f,
                      d = {};
                    if (t) {
                      o = r.get("as");
                      var p = r.get("noChildContext");
                      (f = !(o && p)),
                        (d = {
                          as: o,
                          noChildContext: p,
                          exportDependencies: f,
                        });
                    }
                    return (
                      (l =
                        (u = "render" == r.get("completeOn")) || r.has(h.i.pa)),
                      h.o(
                        function () {
                          var r,
                            o = h.a.f(i()),
                            p = !n != !o,
                            g = !c;
                          (f || p !== s) &&
                            (l && (a = h.i.Cb(e, a)),
                            p &&
                              ((t && !f) || (d.dataDependency = h.S.o()),
                              (r = t
                                ? a.createChildContext(
                                    "function" == typeof o ? o : i,
                                    d
                                  )
                                : h.S.qa()
                                ? a.extend(null, d)
                                : a)),
                            g &&
                              h.S.qa() &&
                              (c = h.a.Ca(h.h.childNodes(e), !0)),
                            p
                              ? (g || h.h.va(e, h.a.Ca(c)), h.Oa(r, e))
                              : (h.h.Ea(e), u || h.i.ma(e, h.i.H)),
                            (s = p));
                        },
                        null,
                        { l: e }
                      ),
                      { controlsDescendantBindings: !0 }
                    );
                  },
                }),
                  (h.m.Ra[e] = !1),
                  (h.h.ea[e] = !0);
              }
              e("if"), e("ifnot", !1, !0), e("with", !0);
            })(),
            (h.c.let = {
              init: function (e, t, n, i, r) {
                return (
                  (t = r.extend(t)),
                  h.Oa(t, e),
                  { controlsDescendantBindings: !0 }
                );
              },
            }),
            (h.h.ea.let = !0);
          var S = {};
          (h.c.options = {
            init: function (e) {
              if ("select" !== h.a.R(e))
                throw Error("options binding applies only to SELECT elements");
              for (; 0 < e.length; ) e.remove(0);
              return { controlsDescendantBindings: !0 };
            },
            update: function (t, n, i) {
              function r() {
                return h.a.jb(t.options, function (e) {
                  return e.selected;
                });
              }
              function o(e, t, n) {
                var i = typeof t;
                return "function" == i ? t(e) : "string" == i ? e[t] : n;
              }
              function a(e, n) {
                if (g && l) h.i.ma(t, h.i.H);
                else if (p.length) {
                  var i = 0 <= h.a.A(p, h.w.M(n[0]));
                  h.a.Zc(n[0], i),
                    g && !i && h.u.G(h.a.Fb, null, [t, "change"]);
                }
              }
              var s = t.multiple,
                c = 0 != t.length && s ? t.scrollTop : null,
                u = h.a.f(n()),
                l = i.get("valueAllowUnset") && i.has("value"),
                f = i.get("optionsIncludeDestroyed");
              n = {};
              var d,
                p = [];
              l ||
                (s
                  ? (p = h.a.Mb(r(), h.w.M))
                  : 0 <= t.selectedIndex &&
                    p.push(h.w.M(t.options[t.selectedIndex]))),
                u &&
                  (void 0 === u.length && (u = [u]),
                  (d = h.a.jb(u, function (t) {
                    return f || t === e || null === t || !h.a.f(t._destroy);
                  })),
                  i.has("optionsCaption") &&
                    null !== (u = h.a.f(i.get("optionsCaption"))) &&
                    u !== e &&
                    d.unshift(S));
              var g = !1;
              if (
                ((n.beforeRemove = function (e) {
                  t.removeChild(e);
                }),
                (u = a),
                i.has("optionsAfterRender") &&
                  "function" == typeof i.get("optionsAfterRender") &&
                  (u = function (t, n) {
                    a(0, n),
                      h.u.G(i.get("optionsAfterRender"), null, [
                        n[0],
                        t !== S ? t : e,
                      ]);
                  }),
                h.a.ec(
                  t,
                  d,
                  function (n, r, a) {
                    return (
                      a.length &&
                        ((p = !l && a[0].selected ? [h.w.M(a[0])] : []),
                        (g = !0)),
                      (r = t.ownerDocument.createElement("option")),
                      n === S
                        ? (h.a.Bb(r, i.get("optionsCaption")), h.w.cb(r, e))
                        : ((a = o(n, i.get("optionsValue"), n)),
                          h.w.cb(r, h.a.f(a)),
                          (n = o(n, i.get("optionsText"), a)),
                          h.a.Bb(r, n)),
                      [r]
                    );
                  },
                  n,
                  u
                ),
                !l)
              ) {
                var b;
                (b = s
                  ? p.length && r().length < p.length
                  : p.length && 0 <= t.selectedIndex
                  ? h.w.M(t.options[t.selectedIndex]) !== p[0]
                  : p.length || 0 <= t.selectedIndex),
                  b && h.u.G(h.a.Fb, null, [t, "change"]);
              }
              (l || h.S.Ya()) && h.i.ma(t, h.i.H),
                h.a.wd(t),
                c && 20 < Math.abs(c - t.scrollTop) && (t.scrollTop = c);
            },
          }),
            (h.c.options.$b = h.a.g.Z()),
            (h.c.selectedOptions = {
              init: function (e, t, n) {
                function i() {
                  var i = t(),
                    r = [];
                  h.a.D(e.getElementsByTagName("option"), function (e) {
                    e.selected && r.push(h.w.M(e));
                  }),
                    h.m.eb(i, n, "selectedOptions", r);
                }
                function r() {
                  var n = h.a.f(t()),
                    i = e.scrollTop;
                  n &&
                    "number" == typeof n.length &&
                    h.a.D(e.getElementsByTagName("option"), function (e) {
                      var t = 0 <= h.a.A(n, h.w.M(e));
                      e.selected != t && h.a.Zc(e, t);
                    }),
                    (e.scrollTop = i);
                }
                if ("select" != h.a.R(e))
                  throw Error(
                    "selectedOptions binding applies only to SELECT elements"
                  );
                var o;
                h.i.subscribe(
                  e,
                  h.i.H,
                  function () {
                    o
                      ? i()
                      : (h.a.B(e, "change", i), (o = h.o(r, null, { l: e })));
                  },
                  null,
                  { notifyImmediately: !0 }
                );
              },
              update: function () {},
            }),
            (h.m.wa.selectedOptions = !0),
            (h.c.style = {
              update: function (t, n) {
                var i = h.a.f(n() || {});
                h.a.P(i, function (n, i) {
                  if (
                    ((i = h.a.f(i)),
                    (null !== i && i !== e && !1 !== i) || (i = ""),
                    r)
                  )
                    r(t).css(n, i);
                  else if (/^--/.test(n)) t.style.setProperty(n, i);
                  else {
                    n = n.replace(/-(\w)/g, function (e, t) {
                      return t.toUpperCase();
                    });
                    var o = t.style[n];
                    (t.style[n] = i),
                      i === o ||
                        t.style[n] != o ||
                        isNaN(i) ||
                        (t.style[n] = i + "px");
                  }
                });
              },
            }),
            (h.c.submit = {
              init: function (e, t, n, i, r) {
                if ("function" != typeof t())
                  throw Error(
                    "The value for a submit binding must be a function"
                  );
                h.a.B(e, "submit", function (n) {
                  var i,
                    o = t();
                  try {
                    i = o.call(r.$data, e);
                  } finally {
                    !0 !== i &&
                      (n.preventDefault
                        ? n.preventDefault()
                        : (n.returnValue = !1));
                  }
                });
              },
            }),
            (h.c.text = {
              init: function () {
                return { controlsDescendantBindings: !0 };
              },
              update: function (e, t) {
                h.a.Bb(e, t());
              },
            }),
            (h.h.ea.text = !0),
            (function () {
              if (t && t.navigator) {
                var n,
                  i,
                  r,
                  o,
                  a,
                  s = function (e) {
                    if (e) return parseFloat(e[1]);
                  },
                  c = t.navigator.userAgent;
                (n =
                  t.opera && t.opera.version && parseInt(t.opera.version())) ||
                  (a = s(c.match(/Edge\/([^ ]+)$/))) ||
                  s(c.match(/Chrome\/([^ ]+)/)) ||
                  (i = s(c.match(/Version\/([^ ]+) Safari/))) ||
                  (r = s(c.match(/Firefox\/([^ ]+)/))) ||
                  (o = h.a.W || s(c.match(/MSIE ([^ ]+)/))) ||
                  (o = s(c.match(/rv:([^ )]+)/)));
              }
              if (8 <= o && 10 > o)
                var u = h.a.g.Z(),
                  l = h.a.g.Z(),
                  f = function (e) {
                    var t = this.activeElement;
                    (t = t && h.a.g.get(t, l)) && t(e);
                  },
                  d = function (e, t) {
                    var n = e.ownerDocument;
                    h.a.g.get(n, u) ||
                      (h.a.g.set(n, u, !0), h.a.B(n, "selectionchange", f)),
                      h.a.g.set(e, l, t);
                  };
              (h.c.textInput = {
                init: function (t, s, c) {
                  function u(e, n) {
                    h.a.B(t, e, n);
                  }
                  function l() {
                    var n = h.a.f(s());
                    (null !== n && n !== e) || (n = ""),
                      b !== e && n === b
                        ? h.a.setTimeout(l, 4)
                        : t.value !== n &&
                          ((v = !0), (t.value = n), (v = !1), (m = t.value));
                  }
                  function f() {
                    g || ((b = t.value), (g = h.a.setTimeout(p, 4)));
                  }
                  function p() {
                    clearTimeout(g), (b = g = e);
                    var n = t.value;
                    m !== n && ((m = n), h.m.eb(s(), c, "textInput", n));
                  }
                  var g,
                    b,
                    m = t.value,
                    y = 9 == h.a.W ? f : p,
                    v = !1;
                  o && u("keypress", p),
                    11 > o &&
                      u("propertychange", function (e) {
                        v || "value" !== e.propertyName || y(e);
                      }),
                    8 == o && (u("keyup", p), u("keydown", p)),
                    d && (d(t, y), u("dragend", f)),
                    (!o || 9 <= o) && u("input", y),
                    5 > i && "textarea" === h.a.R(t)
                      ? (u("keydown", f), u("paste", f), u("cut", f))
                      : 11 > n
                      ? u("keydown", f)
                      : 4 > r
                      ? (u("DOMAutoComplete", p),
                        u("dragdrop", p),
                        u("drop", p))
                      : a && "number" === t.type && u("keydown", f),
                    u("change", p),
                    u("blur", p),
                    h.o(l, null, { l: t });
                },
              }),
                (h.m.wa.textInput = !0),
                (h.c.textinput = {
                  preprocess: function (e, t, n) {
                    n("textInput", e);
                  },
                });
            })(),
            (h.c.uniqueName = {
              init: function (e, t) {
                if (t()) {
                  var n = "ko_unique_" + ++h.c.uniqueName.rd;
                  h.a.Yc(e, n);
                }
              },
            }),
            (h.c.uniqueName.rd = 0),
            (h.c.using = {
              init: function (e, t, n, i, r) {
                var o;
                return (
                  n.has("as") &&
                    (o = {
                      as: n.get("as"),
                      noChildContext: n.get("noChildContext"),
                    }),
                  (t = r.createChildContext(t, o)),
                  h.Oa(t, e),
                  { controlsDescendantBindings: !0 }
                );
              },
            }),
            (h.h.ea.using = !0),
            (h.c.value = {
              init: function (t, n, i) {
                var r = h.a.R(t),
                  o = "input" == r;
                if (!o || ("checkbox" != t.type && "radio" != t.type)) {
                  var a = [],
                    s = i.get("valueUpdate"),
                    c = !1,
                    u = null;
                  s &&
                    ((a = "string" == typeof s ? [s] : h.a.wc(s)),
                    h.a.Pa(a, "change"));
                  var l = function () {
                    (u = null), (c = !1);
                    var e = n(),
                      r = h.w.M(t);
                    h.m.eb(e, i, "value", r);
                  };
                  !h.a.W ||
                    !o ||
                    "text" != t.type ||
                    "off" == t.autocomplete ||
                    (t.form && "off" == t.form.autocomplete) ||
                    -1 != h.a.A(a, "propertychange") ||
                    (h.a.B(t, "propertychange", function () {
                      c = !0;
                    }),
                    h.a.B(t, "focus", function () {
                      c = !1;
                    }),
                    h.a.B(t, "blur", function () {
                      c && l();
                    })),
                    h.a.D(a, function (e) {
                      var n = l;
                      h.a.Ud(e, "after") &&
                        ((n = function () {
                          (u = h.w.M(t)), h.a.setTimeout(l, 0);
                        }),
                        (e = e.substring(5))),
                        h.a.B(t, e, n);
                    });
                  var f;
                  if (
                    ((f =
                      o && "file" == t.type
                        ? function () {
                            var i = h.a.f(n());
                            null === i || i === e || "" === i
                              ? (t.value = "")
                              : h.u.G(l);
                          }
                        : function () {
                            var o = h.a.f(n()),
                              a = h.w.M(t);
                            null !== u && o === u
                              ? h.a.setTimeout(f, 0)
                              : (o === a && a !== e) ||
                                ("select" === r
                                  ? ((a = i.get("valueAllowUnset")),
                                    h.w.cb(t, o, a),
                                    a || o === h.w.M(t) || h.u.G(l))
                                  : h.w.cb(t, o));
                          }),
                    "select" === r)
                  ) {
                    var d;
                    h.i.subscribe(
                      t,
                      h.i.H,
                      function () {
                        d
                          ? i.get("valueAllowUnset")
                            ? f()
                            : l()
                          : (h.a.B(t, "change", l),
                            (d = h.o(f, null, { l: t })));
                      },
                      null,
                      { notifyImmediately: !0 }
                    );
                  } else h.a.B(t, "change", l), h.o(f, null, { l: t });
                } else h.ib(t, { checkedValue: n });
              },
              update: function () {},
            }),
            (h.m.wa.value = !0),
            (h.c.visible = {
              update: function (e, t) {
                var n = h.a.f(t()),
                  i = "none" != e.style.display;
                n && !i
                  ? (e.style.display = "")
                  : !n && i && (e.style.display = "none");
              },
            }),
            (h.c.hidden = {
              update: function (e, t) {
                h.c.visible.update(e, function () {
                  return !h.a.f(t());
                });
              },
            }),
            (function (e) {
              h.c[e] = {
                init: function (t, n, i, r, o) {
                  return h.c.event.init.call(
                    this,
                    t,
                    function () {
                      var t = {};
                      return (t[e] = n()), t;
                    },
                    i,
                    r,
                    o
                  );
                },
              };
            })("click"),
            (h.ca = function () {}),
            (h.ca.prototype.renderTemplateSource = function () {
              throw Error("Override renderTemplateSource");
            }),
            (h.ca.prototype.createJavaScriptEvaluatorBlock = function () {
              throw Error("Override createJavaScriptEvaluatorBlock");
            }),
            (h.ca.prototype.makeTemplateSource = function (e, t) {
              if ("string" == typeof e) {
                t = t || n;
                var i = t.getElementById(e);
                if (!i) throw Error("Cannot find template with ID " + e);
                return new h.C.F(i);
              }
              if (1 == e.nodeType || 8 == e.nodeType) return new h.C.ia(e);
              throw Error("Unknown template type: " + e);
            }),
            (h.ca.prototype.renderTemplate = function (e, t, n, i) {
              return (
                (e = this.makeTemplateSource(e, i)),
                this.renderTemplateSource(e, t, n, i)
              );
            }),
            (h.ca.prototype.isTemplateRewritten = function (e, t) {
              return (
                !1 === this.allowTemplateRewriting ||
                this.makeTemplateSource(e, t).data("isRewritten")
              );
            }),
            (h.ca.prototype.rewriteTemplate = function (e, t, n) {
              (e = this.makeTemplateSource(e, n)),
                (t = t(e.text())),
                e.text(t),
                e.data("isRewritten", !0);
            }),
            h.b("templateEngine", h.ca),
            (h.kc = (function () {
              function e(e, t, n, i) {
                e = h.m.ac(e);
                for (var r = h.m.Ra, o = 0; o < e.length; o++) {
                  var a = e[o].key;
                  if (Object.prototype.hasOwnProperty.call(r, a)) {
                    var s = r[a];
                    if ("function" == typeof s) {
                      if ((a = s(e[o].value))) throw Error(a);
                    } else if (!s)
                      throw Error(
                        "This template engine does not support the '" +
                          a +
                          "' binding within its templates"
                      );
                  }
                }
                return (
                  (n =
                    "ko.__tr_ambtns(function($context,$element){return(function(){return{ " +
                    h.m.vb(e, { valueAccessors: !0 }) +
                    " } })()},'" +
                    n.toLowerCase() +
                    "')"),
                  i.createJavaScriptEvaluatorBlock(n) + t
                );
              }
              var t =
                  /(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'|[^>]*))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi,
                n = /\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;
              return {
                xd: function (e, t, n) {
                  t.isTemplateRewritten(e, n) ||
                    t.rewriteTemplate(
                      e,
                      function (e) {
                        return h.kc.Ld(e, t);
                      },
                      n
                    );
                },
                Ld: function (i, r) {
                  return i
                    .replace(t, function (t, n, i, o, a) {
                      return e(a, n, i, r);
                    })
                    .replace(n, function (t, n) {
                      return e(n, "\x3c!-- ko --\x3e", "#comment", r);
                    });
                },
                md: function (e, t) {
                  return h.aa.Xb(function (n, i) {
                    var r = n.nextSibling;
                    r && r.nodeName.toLowerCase() === t && h.ib(r, e, i);
                  });
                },
              };
            })()),
            h.b("__tr_ambtns", h.kc.md),
            (function () {
              (h.C = {}),
                (h.C.F = function (e) {
                  if ((this.F = e)) {
                    var t = h.a.R(e);
                    this.ab =
                      "script" === t
                        ? 1
                        : "textarea" === t
                        ? 2
                        : "template" == t &&
                          e.content &&
                          11 === e.content.nodeType
                        ? 3
                        : 4;
                  }
                }),
                (h.C.F.prototype.text = function () {
                  var e =
                    1 === this.ab
                      ? "text"
                      : 2 === this.ab
                      ? "value"
                      : "innerHTML";
                  if (0 == arguments.length) return this.F[e];
                  var t = arguments[0];
                  "innerHTML" === e ? h.a.fc(this.F, t) : (this.F[e] = t);
                });
              var t = h.a.g.Z() + "_";
              h.C.F.prototype.data = function (e) {
                if (1 === arguments.length) return h.a.g.get(this.F, t + e);
                h.a.g.set(this.F, t + e, arguments[1]);
              };
              var n = h.a.g.Z();
              (h.C.F.prototype.nodes = function () {
                var t = this.F;
                if (0 == arguments.length) {
                  var i = h.a.g.get(t, n) || {},
                    r =
                      i.lb ||
                      (3 === this.ab ? t.content : 4 === this.ab ? t : e);
                  if (!r || i.jd) {
                    var o = this.text();
                    o &&
                      o !== i.bb &&
                      ((r = h.a.Md(o, t.ownerDocument)),
                      h.a.g.set(t, n, { lb: r, bb: o, jd: !0 }));
                  }
                  return r;
                }
                (i = arguments[0]),
                  this.ab !== e && this.text(""),
                  h.a.g.set(t, n, { lb: i });
              }),
                (h.C.ia = function (e) {
                  this.F = e;
                }),
                (h.C.ia.prototype = new h.C.F()),
                (h.C.ia.prototype.constructor = h.C.ia),
                (h.C.ia.prototype.text = function () {
                  if (0 == arguments.length) {
                    var t = h.a.g.get(this.F, n) || {};
                    return t.bb === e && t.lb && (t.bb = t.lb.innerHTML), t.bb;
                  }
                  h.a.g.set(this.F, n, { bb: arguments[0] });
                }),
                h.b("templateSources", h.C),
                h.b("templateSources.domElement", h.C.F),
                h.b("templateSources.anonymousTemplate", h.C.ia);
            })(),
            (function () {
              function t(e, t, n) {
                var i;
                for (t = h.h.nextSibling(t); e && (i = e) !== t; )
                  (e = h.h.nextSibling(i)), n(i, e);
              }
              function n(e, n) {
                if (e.length) {
                  var i = e[0],
                    r = e[e.length - 1],
                    o = i.parentNode,
                    a = h.ga.instance,
                    s = a.preprocessNode;
                  if (s) {
                    if (
                      (t(i, r, function (e, t) {
                        var n = e.previousSibling,
                          o = s.call(a, e);
                        o &&
                          (e === i && (i = o[0] || t),
                          e === r && (r = o[o.length - 1] || n));
                      }),
                      (e.length = 0),
                      !i)
                    )
                      return;
                    i === r ? e.push(i) : (e.push(i, r), h.a.Ua(e, o));
                  }
                  t(i, r, function (e) {
                    (1 !== e.nodeType && 8 !== e.nodeType) || h.vc(n, e);
                  }),
                    t(i, r, function (e) {
                      (1 !== e.nodeType && 8 !== e.nodeType) || h.aa.cd(e, [n]);
                    }),
                    h.a.Ua(e, o);
                }
              }
              function i(e) {
                return e.nodeType ? e : 0 < e.length ? e[0] : null;
              }
              function r(e, t, r, o, s) {
                s = s || {};
                var c = ((e && i(e)) || r || {}).ownerDocument,
                  u = s.templateEngine || a;
                if (
                  (h.kc.xd(r, u, c),
                  (r = u.renderTemplate(r, o, s, c)),
                  "number" != typeof r.length ||
                    (0 < r.length && "number" != typeof r[0].nodeType))
                )
                  throw Error(
                    "Template engine must return an array of DOM nodes"
                  );
                switch (((c = !1), t)) {
                  case "replaceChildren":
                    h.h.va(e, r), (c = !0);
                    break;
                  case "replaceNode":
                    h.a.Xc(e, r), (c = !0);
                    break;
                  case "ignoreTargetNode":
                    break;
                  default:
                    throw Error("Unknown renderMode: " + t);
                }
                return (
                  c &&
                    (n(r, o),
                    s.afterRender &&
                      h.u.G(s.afterRender, null, [r, o[s.as || "$data"]]),
                    "replaceChildren" == t && h.i.ma(e, h.i.H)),
                  r
                );
              }
              function o(e, t, n) {
                return h.O(e) ? e() : "function" == typeof e ? e(t, n) : e;
              }
              var a;
              (h.gc = function (t) {
                if (t != e && !(t instanceof h.ca))
                  throw Error(
                    "templateEngine must inherit from ko.templateEngine"
                  );
                a = t;
              }),
                (h.dc = function (t, n, s, c, u) {
                  if (((s = s || {}), (s.templateEngine || a) == e))
                    throw Error(
                      "Set a template engine before calling renderTemplate"
                    );
                  if (((u = u || "replaceChildren"), c)) {
                    var l = i(c);
                    return h.$(
                      function () {
                        var e =
                            n && n instanceof h.fa
                              ? n
                              : new h.fa(n, null, null, null, {
                                  exportDependencies: !0,
                                }),
                          a = o(t, e.$data, e),
                          e = r(c, u, a, e, s);
                        "replaceNode" == u && ((c = e), (l = i(c)));
                      },
                      null,
                      {
                        Sa: function () {
                          return !l || !h.a.Sb(l);
                        },
                        l: l && "replaceNode" == u ? l.parentNode : l,
                      }
                    );
                  }
                  return h.aa.Xb(function (e) {
                    h.dc(t, n, s, e, "replaceNode");
                  });
                }),
                (h.Qd = function (t, i, a, s, c) {
                  function u(e, t) {
                    h.u.G(h.a.ec, null, [s, e, f, a, l, t]), h.i.ma(s, h.i.H);
                  }
                  function l(e, t) {
                    n(t, d), a.afterRender && a.afterRender(t, e), (d = null);
                  }
                  function f(e, n) {
                    d = c.createChildContext(e, {
                      as: p,
                      noChildContext: a.noChildContext,
                      extend: function (e) {
                        (e.$index = n), p && (e[p + "Index"] = n);
                      },
                    });
                    var i = o(t, e, d);
                    return r(s, "ignoreTargetNode", i, d, a);
                  }
                  var d,
                    p = a.as,
                    g =
                      !1 === a.includeDestroyed ||
                      (h.options.foreachHidesDestroyed && !a.includeDestroyed);
                  if (g || a.beforeRemove || !h.Pc(i))
                    return h.$(
                      function () {
                        var t = h.a.f(i) || [];
                        void 0 === t.length && (t = [t]),
                          g &&
                            (t = h.a.jb(t, function (t) {
                              return (
                                t === e || null === t || !h.a.f(t._destroy)
                              );
                            })),
                          u(t);
                      },
                      null,
                      { l: s }
                    );
                  u(i.v());
                  var b = i.subscribe(
                    function (e) {
                      u(i(), e);
                    },
                    null,
                    "arrayChange"
                  );
                  return b.l(s), b;
                });
              var s = h.a.g.Z(),
                c = h.a.g.Z();
              (h.c.template = {
                init: function (e, t) {
                  var n = h.a.f(t());
                  if ("string" == typeof n || "name" in n) h.h.Ea(e);
                  else if ("nodes" in n) {
                    if (((n = n.nodes || []), h.O(n)))
                      throw Error(
                        'The "nodes" option must be a plain, non-observable array.'
                      );
                    var i = n[0] && n[0].parentNode;
                    (i && h.a.g.get(i, c)) ||
                      ((i = h.a.Yb(n)), h.a.g.set(i, c, !0)),
                      new h.C.ia(e).nodes(i);
                  } else {
                    if (((n = h.h.childNodes(e)), !(0 < n.length)))
                      throw Error(
                        "Anonymous template defined, but no template content was provided"
                      );
                    (i = h.a.Yb(n)), new h.C.ia(e).nodes(i);
                  }
                  return { controlsDescendantBindings: !0 };
                },
                update: function (t, n, i, r, o) {
                  var a = n();
                  (n = h.a.f(a)),
                    (i = !0),
                    (r = null),
                    "string" == typeof n
                      ? (n = {})
                      : ((a = "name" in n ? n.name : t),
                        "if" in n && (i = h.a.f(n.if)),
                        i && "ifnot" in n && (i = !h.a.f(n.ifnot)),
                        i && !a && (i = !1)),
                    "foreach" in n
                      ? (r = h.Qd(a, (i && n.foreach) || [], n, t, o))
                      : i
                      ? ((i = o),
                        "data" in n &&
                          (i = o.createChildContext(n.data, {
                            as: n.as,
                            noChildContext: n.noChildContext,
                            exportDependencies: !0,
                          })),
                        (r = h.dc(a, i, n, t)))
                      : h.h.Ea(t),
                    (o = r),
                    (n = h.a.g.get(t, s)) && "function" == typeof n.s && n.s(),
                    h.a.g.set(t, s, !o || (o.ja && !o.ja()) ? e : o);
                },
              }),
                (h.m.Ra.template = function (e) {
                  return (
                    (e = h.m.ac(e)),
                    (1 == e.length && e[0].unknown) || h.m.Id(e, "name")
                      ? null
                      : "This template engine does not support anonymous templates nested within its templates"
                  );
                }),
                (h.h.ea.template = !0);
            })(),
            h.b("setTemplateEngine", h.gc),
            h.b("renderTemplate", h.dc),
            (h.a.Kc = function (e, t, n) {
              if (e.length && t.length) {
                var i, r, o, a, s;
                for (i = r = 0; (!n || i < n) && (a = e[r]); ++r) {
                  for (o = 0; (s = t[o]); ++o)
                    if (a.value === s.value) {
                      (a.moved = s.index),
                        (s.moved = a.index),
                        t.splice(o, 1),
                        (i = o = 0);
                      break;
                    }
                  i += o;
                }
              }
            }),
            (h.a.Pb = (function () {
              function e(e, t, n, i, r) {
                var o,
                  a,
                  s,
                  c,
                  u,
                  l = Math.min,
                  f = Math.max,
                  d = [],
                  p = e.length,
                  g = t.length,
                  b = g - p || 1,
                  m = p + g + 1;
                for (o = 0; o <= p; o++)
                  for (
                    c = s, d.push((s = [])), u = l(g, o + b), a = f(0, o - 1);
                    a <= u;
                    a++
                  )
                    s[a] = a
                      ? o
                        ? e[o - 1] === t[a - 1]
                          ? c[a - 1]
                          : l(c[a] || m, s[a - 1] || m) + 1
                        : a + 1
                      : o + 1;
                for (l = [], f = [], b = [], o = p, a = g; o || a; )
                  (g = d[o][a] - 1),
                    a && g === d[o][a - 1]
                      ? f.push(
                          (l[l.length] = { status: n, value: t[--a], index: a })
                        )
                      : o && g === d[o - 1][a]
                      ? b.push(
                          (l[l.length] = { status: i, value: e[--o], index: o })
                        )
                      : (--a,
                        --o,
                        r.sparse ||
                          l.push({ status: "retained", value: t[a] }));
                return h.a.Kc(b, f, !r.dontLimitMoves && 10 * p), l.reverse();
              }
              return function (t, n, i) {
                return (
                  (i = "boolean" == typeof i ? { dontLimitMoves: i } : i || {}),
                  (t = t || []),
                  (n = n || []),
                  t.length < n.length
                    ? e(t, n, "added", "deleted", i)
                    : e(n, t, "deleted", "added", i)
                );
              };
            })()),
            h.b("utils.compareArrays", h.a.Pb),
            (function () {
              function t(t, n, i, r, o) {
                var a = [],
                  s = h.$(
                    function () {
                      var e = n(i, o, h.a.Ua(a, t)) || [];
                      0 < a.length &&
                        (h.a.Xc(a, e), r && h.u.G(r, null, [i, e, o])),
                        (a.length = 0),
                        h.a.Nb(a, e);
                    },
                    null,
                    {
                      l: t,
                      Sa: function () {
                        return !h.a.kd(a);
                      },
                    }
                  );
                return { Y: a, $: s.ja() ? s : e };
              }
              var n = h.a.g.Z(),
                i = h.a.g.Z();
              h.a.ec = function (r, o, a, s, c, u) {
                function l(e) {
                  (p = { Aa: e, pb: h.ta(v++) }), m.push(p), b || E.push(p);
                }
                function f(e) {
                  (p = g[e]),
                    v !== p.pb.v() && K.push(p),
                    p.pb(v++),
                    h.a.Ua(p.Y, r),
                    m.push(p);
                }
                function d(e, t) {
                  if (e)
                    for (var n = 0, i = t.length; n < i; n++)
                      h.a.D(t[n].Y, function (i) {
                        e(i, n, t[n].Aa);
                      });
                }
                (o = o || []), void 0 === o.length && (o = [o]), (s = s || {});
                var p,
                  g = h.a.g.get(r, n),
                  b = !g,
                  m = [],
                  y = 0,
                  v = 0,
                  w = [],
                  x = [],
                  k = [],
                  K = [],
                  E = [],
                  C = 0;
                if (b) h.a.D(o, l);
                else {
                  if (!u || (g && g._countWaitingForRemove)) {
                    var S = h.a.Mb(g, function (e) {
                      return e.Aa;
                    });
                    u = h.a.Pb(S, o, {
                      dontLimitMoves: s.dontLimitMoves,
                      sparse: !0,
                    });
                  }
                  for (var T, N, D, S = 0; (T = u[S]); S++)
                    switch (((N = T.moved), (D = T.index), T.status)) {
                      case "deleted":
                        for (; y < D; ) f(y++);
                        N === e &&
                          ((p = g[y]),
                          p.$ && (p.$.s(), (p.$ = e)),
                          h.a.Ua(p.Y, r).length &&
                            (s.beforeRemove &&
                              (m.push(p),
                              C++,
                              p.Aa === i ? (p = null) : k.push(p)),
                            p && w.push.apply(w, p.Y))),
                          y++;
                        break;
                      case "added":
                        for (; v < D; ) f(y++);
                        N !== e ? (x.push(m.length), f(N)) : l(T.value);
                    }
                  for (; v < o.length; ) f(y++);
                  m._countWaitingForRemove = C;
                }
                h.a.g.set(r, n, m),
                  d(s.beforeMove, K),
                  h.a.D(w, s.beforeRemove ? h.oa : h.removeNode);
                var _, A, O;
                try {
                  O = r.ownerDocument.activeElement;
                } catch (e) {}
                if (x.length)
                  for (; (S = x.shift()) != e; ) {
                    for (p = m[S], _ = e; S; )
                      if ((A = m[--S].Y) && A.length) {
                        _ = A[A.length - 1];
                        break;
                      }
                    for (o = 0; (y = p.Y[o]); _ = y, o++) h.h.Wb(r, y, _);
                  }
                for (S = 0; (p = m[S]); S++) {
                  for (
                    p.Y || h.a.extend(p, t(r, a, p.Aa, c, p.pb)), o = 0;
                    (y = p.Y[o]);
                    _ = y, o++
                  )
                    h.h.Wb(r, y, _);
                  !p.Ed &&
                    c &&
                    (c(p.Aa, p.Y, p.pb),
                    (p.Ed = !0),
                    (_ = p.Y[p.Y.length - 1]));
                }
                for (
                  O && r.ownerDocument.activeElement != O && O.focus(),
                    d(s.beforeRemove, k),
                    S = 0;
                  S < k.length;
                  ++S
                )
                  k[S].Aa = i;
                d(s.afterMove, K), d(s.afterAdd, E);
              };
            })(),
            h.b("utils.setDomNodeChildrenFromArrayMapping", h.a.ec),
            (h.ba = function () {
              this.allowTemplateRewriting = !1;
            }),
            (h.ba.prototype = new h.ca()),
            (h.ba.prototype.constructor = h.ba),
            (h.ba.prototype.renderTemplateSource = function (e, t, n, i) {
              return (t = (9 > h.a.W ? 0 : e.nodes) ? e.nodes() : null)
                ? h.a.la(t.cloneNode(!0).childNodes)
                : ((e = e.text()), h.a.ua(e, i));
            }),
            (h.ba.Ma = new h.ba()),
            h.gc(h.ba.Ma),
            h.b("nativeTemplateEngine", h.ba),
            (function () {
              (h.$a = function () {
                var e = (this.Hd = (function () {
                  if (!r || !r.tmpl) return 0;
                  try {
                    if (0 <= r.tmpl.tag.tmpl.open.toString().indexOf("__"))
                      return 2;
                  } catch (e) {}
                  return 1;
                })());
                (this.renderTemplateSource = function (t, i, o, a) {
                  if (((a = a || n), (o = o || {}), 2 > e))
                    throw Error(
                      "Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later."
                    );
                  var s = t.data("precompiled");
                  return (
                    s ||
                      ((s = t.text() || ""),
                      (s = r.template(
                        null,
                        "{{ko_with $item.koBindingContext}}" +
                          s +
                          "{{/ko_with}}"
                      )),
                      t.data("precompiled", s)),
                    (t = [i.$data]),
                    (i = r.extend({ koBindingContext: i }, o.templateOptions)),
                    (i = r.tmpl(s, t, i)),
                    i.appendTo(a.createElement("div")),
                    (r.fragments = {}),
                    i
                  );
                }),
                  (this.createJavaScriptEvaluatorBlock = function (e) {
                    return "{{ko_code ((function() { return " + e + " })()) }}";
                  }),
                  (this.addTemplate = function (e, t) {
                    n.write(
                      "<script type='text/html' id='" +
                        e +
                        "'>" +
                        t +
                        "</script>"
                    );
                  }),
                  0 < e &&
                    ((r.tmpl.tag.ko_code = { open: "__.push($1 || '');" }),
                    (r.tmpl.tag.ko_with = { open: "with($1) {", close: "} " }));
              }),
                (h.$a.prototype = new h.ca()),
                (h.$a.prototype.constructor = h.$a);
              var e = new h.$a();
              0 < e.Hd && h.gc(e), h.b("jqueryTmplTemplateEngine", h.$a);
            })();
        });
    })();
  })();
var __assign =
  (this && this.__assign) ||
  function () {
    return (
      (__assign =
        Object.assign ||
        function (e) {
          for (var t, n = 1, i = arguments.length; n < i; n++) {
            t = arguments[n];
            for (var r in t)
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          }
          return e;
        }),
      __assign.apply(this, arguments)
    );
  };
define("keyboardMapping", ["knockout"], function (e) {
  var t,
    n = {
      66: "KeyB",
      37: "ArrowLeft",
      39: "ArrowRight",
      32: "Space",
      109: "NumpadSubtract",
      35: "End",
      46: "Delete",
      36: "Home",
      69: "KeyE",
      71: "KeyG",
      107: "NumpadAdd",
      221: "BracketRight",
      88: "KeyX",
      186: "Semicolon",
      34: "PageDown",
      33: "PageUp",
      38: "ArrowUp",
      40: "ArrowDown",
      219: "BracketLeft",
      188: "Comma",
      190: "Period",
      65: "KeyA",
    },
    i = e.observable({});
  if (
    localStorage.getItem("keyboard_mapping_keybinds") &&
    "undefined" != localStorage.getItem("keyboard_mapping_keybinds")
  )
    i(JSON.parse(localStorage.getItem("keyboard_mapping_keybinds")));
  else {
    for (
      var r = __assign(
          {},
          JSON.parse(localStorage.getItem("settings")).keyboard.keys
        ),
        o = 0,
        a = Object.keys(r);
      o < a.length;
      o++
    ) {
      var s = a[o];
      i(
        __assign(
          __assign({}, i()),
          ((t = {}),
          (t[s] = {
            altKey: !1,
            shiftKey: !1,
            ctrlKey: !1,
            code: n[r[s].keycode],
          }),
          t)
        )
      );
    }
    localStorage.setItem("keyboard_mapping_keybinds", JSON.stringify(i));
  }
  return e.pureComputed({
    read: i,
    write: function (e) {
      i(e),
        localStorage.setItem("keyboard_mapping_keybinds", JSON.stringify(e));
    },
  });
}),
  define("static/keyboardLayout", [], function () {
    return {
      Escape: "Escape",
      F1: "F1",
      F2: "F2",
      F3: "F3",
      F4: "F4",
      F5: "F5",
      F6: "F6",
      F7: "F7",
      F8: "F8",
      F9: "F9",
      F10: "F10",
      F11: "F11",
      F12: "F12",
      PrintScreen: "PrintScreen",
      ScrollLock: "ScrollLock",
      Pause: "Pause",
      Backquote: "Backquote",
      Digit1: "1",
      Digit2: "2",
      Digit3: "3",
      Digit4: "4",
      Digit5: "5",
      Digit6: "6",
      Digit7: "7",
      Digit8: "8",
      Digit9: "9",
      Digit0: "0",
      Minus: "-",
      Equal: "=",
      Backspace: "Backspace",
      Insert: "Insert",
      Home: "Home",
      PageUp: "PageUp",
      NumLock: "NumLock",
      NumpadDivide: "/",
      NumpadMultiply: "*",
      NumpadSubtract: "-",
      Tab: "Tab",
      KeyQ: "Q",
      KeyW: "W",
      KeyE: "E",
      KeyR: "R",
      KeyT: "T",
      KeyY: "Y",
      KeyU: "U",
      KeyI: "I",
      KeyO: "O",
      KeyP: "P",
      BracketLeft: "[",
      BracketRight: "]",
      Backslash: "\\",
      Delete: "Delete",
      End: "End",
      PageDown: "PageDown",
      Numpad7: "7",
      Numpad8: "8",
      Numpad9: "9",
      NumpadAdd: "+",
      CapsLock: "CapsLock",
      KeyA: "A",
      KeyS: "S",
      KeyD: "D",
      KeyF: "F",
      KeyG: "G",
      KeyH: "H",
      KeyJ: "J",
      KeyK: "K",
      KeyL: "L",
      Semicolon: ";",
      Quote: "'",
      Enter: "Enter",
      Numpad4: "4",
      Numpad5: "5",
      Numpad6: "6",
      ShiftLeft: "Shift",
      KeyZ: "Z",
      KeyX: "X",
      KeyC: "C",
      KeyV: "V",
      KeyB: "B",
      KeyN: "N",
      KeyM: "M",
      Comma: ",",
      Period: ".",
      Slash: "/",
      ShiftRight: "Shift",
      ArrowUp: "UP ARROW",
      Numpad1: "1",
      Numpad2: "2",
      Numpad3: "3",
      NumpadEnter: "Enter",
      ControlLeft: "Control",
      MetaLeft: "Meta",
      AltLeft: "Alt",
      Space: "Space",
      AltRight: "Alt",
      MetaRight: "Meta",
      ContextMenu: "ContextMenu",
      ControlRight: "Control",
      ArrowLeft: "LEFT ARROW",
      ArrowDown: "DOWN ARROW",
      ArrowRight: "RIGHT ARROW",
      Numpad0: "0",
      NumpadDecimal: ".",
    };
  });
var __assign =
  (this && this.__assign) ||
  function () {
    return (
      (__assign =
        Object.assign ||
        function (e) {
          for (var t, n = 1, i = arguments.length; n < i; n++) {
            t = arguments[n];
            for (var r in t)
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          }
          return e;
        }),
      __assign.apply(this, arguments)
    );
  };
define(
  "ui/ViewModel",
  ["../keyboardMapping", "../static/keyboardLayout"],
  function (e, t) {
    return (function () {
      function n() {
        var n = this;
        (this.keysContainer = $(".geofs-keyboard-keys-container")),
          (this.reset = function () {
            n.keysContainer.empty();
          }),
          (this.stringFromKeybind = function (e) {
            var n = "";
            return (
              e.ctrlKey && (n += "CTRL + "),
              e.shiftKey && (n += "SHIFT + "),
              e.altKey && (n += "ALT + "),
              (n +=
                e.code.includes("Control") ||
                e.code.includes("Shift") ||
                e.code.includes("Alt")
                  ? ""
                  : t[e.code] || e.code)
            );
          }),
          (this.addKeybind = function (e) {
            n.keysContainer.append(
              '\n            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty is-upgraded" data-upgraded=",MaterialTextfield">\n                <input class="keyboard-mapping-key-detect mdl-textfield__input" type="text" name="' +
                e +
                '" />\n                <label class="mdl-textfield__label" for="' +
                e +
                '">' +
                e +
                "</label>\n            </div>\n      "
            );
          }),
          (this.updateKeybindInputs = function (e) {
            for (var t = 0, i = Object.keys(e); t < i.length; t++) {
              var r = i[t];
              if (
                0 == $('.keyboard-mapping-key-detect[name="' + r + '"]').length
              ) {
                if (!window.spoilers_arming && "Spoilers Arming" === r)
                  continue;
                n.addKeybind(r);
              }
              $('.keyboard-mapping-key-detect[name="' + r + '"]').val(
                n.stringFromKeybind(e[r])
              ),
                n.stringFromKeybind(e[r]).endsWith(" + ") ||
                  $('.keyboard-mapping-key-detect[name="' + r + '"]').data(
                    "originalValue",
                    n.stringFromKeybind(e[r])
                  );
            }
          }),
          (this.handleKeyDown = function (t) {
            var n;
            $(t.target).hasClass("keyboard-mapping-key-detecting") &&
              (t.preventDefault(),
              t.stopPropagation(),
              "Escape" !== t.code &&
                e(
                  __assign(
                    __assign({}, e()),
                    ((n = {}),
                    (n[$(t.target).attr("name")] = {
                      ctrlKey: t.ctrlKey,
                      shiftKey: t.shiftKey,
                      altKey: t.altKey,
                      code: t.code,
                    }),
                    n)
                  )
                ),
              t.code.includes("Control") ||
                t.code.includes("Shift") ||
                t.code.includes("Alt") ||
                $(t.target).trigger("blur"));
          }),
          (this.handleFocus = function (e) {
            $(".keyboard-mapping-key-detecting", n.keysContainer).each(
              function (e, t) {
                $(t).val($(t).data("originalValue")),
                  $(t).removeClass("keyboard-mapping-key-detecting");
              }
            ),
              $(e.target).data("originalValue", $(e.target).val()),
              $(e.target).val(""),
              $(e.target).addClass("keyboard-mapping-key-detecting");
          }),
          (this.handleBlur = function (e) {
            $(e.target).hasClass("keyboard-mapping-key-detecting") &&
              (("" === $(e.target).val() ||
                $(e.target).val().toString().endsWith(" + ")) &&
                $(e.target).val($(e.target).data("originalValue")),
              $(e.target).removeClass("keyboard-mapping-key-detecting"),
              e.stopPropagation(),
              e.preventDefault());
          }),
          $('[data-toggle-panel=".geofs-preference-list"]').trigger("click"),
          this.reset(),
          this.keysContainer.on(
            "click focus",
            ".keyboard-mapping-key-detect",
            this.handleFocus
          ),
          this.keysContainer.on(
            "keydown",
            ".keyboard-mapping-key-detect",
            this.handleKeyDown
          ),
          this.keysContainer.on(
            "blur",
            ".keyboard-mapping-key-detect",
            this.handleBlur
          ),
          e.subscribe(this.updateKeybindInputs),
          this.updateKeybindInputs(e());
      }
      return n;
    })();
  }
),
  define("keyDown", ["knockout"], function (e) {
    var t = e.observable(function () {}),
      n = e.pureComputed({
        read: t,
        write: function (e) {
          t(e), (window.controls.keyDown = e);
        },
      });
    return (
      $(document).off("keydown", window.controls.keyDown),
      $(document).on("keydown", function (e) {
        n()(e);
      }),
      n
    );
  });
var __assign =
  (this && this.__assign) ||
  function () {
    return (
      (__assign =
        Object.assign ||
        function (e) {
          for (var t, n = 1, i = arguments.length; n < i; n++) {
            t = arguments[n];
            for (var r in t)
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          }
          return e;
        }),
      __assign.apply(this, arguments)
    );
  };
define("addKeybind", ["./keyDown", "./keyboardMapping"], function (e, t) {
  var n = [];
  return (
    (window.keyboard_mapping.ready = !0),
    function (i, r, o) {
      var a;
      if ("" !== i && n.includes(i)) return void t.notifySubscribers();
      "" !== i &&
        (t(__assign(__assign({}, t()), ((a = {}), (a[i] = o), a))), n.push(i));
      var s = e();
      e(function (e) {
        var n = t()[i] || o;
        ("" !== n.code && e.code !== n.code) ||
        e.altKey !== n.altKey ||
        e.ctrlKey !== n.ctrlKey ||
        e.shiftKey !== n.shiftKey
          ? s(e)
          : (r(e),
            "" !== n.code || !e.ctrlKey || e.shiftKey || e.altKey || s(e));
      });
    }
  );
}),
  define(
    "addDefaultKeybinds",
    ["./addKeybind", "./keyboardMapping"],
    function (e, t) {
      return function () {
        e(
          "Toggle Autopilot",
          function () {
            window.controls.setters.toggleAutoPilot.set();
          },
          t()["Toggle Autopilot"] || {
            ctrlKey: !1,
            shiftKey: !1,
            altKey: !1,
            code: "KeyA",
          }
        ),
          e(
            "Bank left",
            function (e) {
              (window.controls.states.left = !0),
                (e.returnValue = !1),
                (window.controls.keyboard.override = !0);
            },
            t()["Bank left"] || {
              ctrlKey: !1,
              shiftKey: !1,
              altKey: !1,
              code: "ArrowLeft",
            }
          ),
          e(
            "Bank right",
            function (e) {
              (window.controls.states.right = !0),
                (e.returnValue = !1),
                (window.controls.keyboard.override = !0);
            },
            t()["Bank right"] || {
              ctrlKey: !1,
              shiftKey: !1,
              altKey: !1,
              code: "ArrowRight",
            }
          ),
          e(
            "Pitch down",
            function (e) {
              (window.controls.states.up = !0),
                (e.returnValue = !1),
                (window.controls.keyboard.override = !0);
            },
            t()["Pitch down"] || {
              ctrlKey: !1,
              shiftKey: !1,
              altKey: !1,
              code: "ArrowUp",
            }
          ),
          e(
            "Pitch up",
            function (e) {
              (window.controls.states.down = !0),
                (e.returnValue = !1),
                (window.controls.keyboard.override = !0);
            },
            t()["Pitch up"] || {
              ctrlKey: !1,
              shiftKey: !1,
              altKey: !1,
              code: "ArrowDown",
            }
          ),
          e(
            "Steer left",
            function (e) {
              (window.controls.states.rudderLeft = !0),
                (e.returnValue = !1),
                (window.controls.keyboard.overrideRudder = !0);
            },
            t()["Steer left"] || {
              ctrlKey: !1,
              shiftKey: !1,
              altKey: !1,
              code: "Comma",
            }
          ),
          e(
            "Steer right",
            function (e) {
              (window.controls.states.rudderRight = !0),
                (e.returnValue = !1),
                (window.controls.keyboard.overrideRudder = !0);
            },
            t()["Steer right"] || {
              ctrlKey: !1,
              shiftKey: !1,
              altKey: !1,
              code: "Period",
            }
          ),
          e(
            "Increase throttle",
            function (e) {
              (window.controls.states.increaseThrottle = !0),
                (e.returnValue = !1);
            },
            t()["Increase throttle"] || {
              ctrlKey: !1,
              shiftKey: !1,
              altKey: !1,
              code: "NumpadAdd",
            }
          ),
          e(
            "",
            function (e) {
              (window.controls.states.increaseThrottle = !0),
                (e.returnValue = !1);
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "PageUp" }
          ),
          e(
            "Decrease throttle",
            function (e) {
              (window.controls.states.increaseThrottle = !0),
                (e.returnValue = !1);
            },
            t()["Decrease throttle"] || {
              ctrlKey: !1,
              shiftKey: !1,
              altKey: !1,
              code: "NumpadSubtract",
            }
          ),
          e(
            "",
            function (e) {
              (window.controls.states.decreaseThrottle = !0),
                (e.returnValue = !1);
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "PageDown" }
          ),
          e(
            "Brakes",
            function () {
              window.controls.setters.setBrakes.set();
            },
            t().Brakes || {
              ctrlKey: !1,
              shiftKey: !1,
              altKey: !1,
              code: "Space",
            }
          ),
          e(
            "Parking brake",
            function () {
              window.controls.setters.toggleParkingBrake.set();
            },
            t()["Parking brake"] || {
              ctrlKey: !1,
              shiftKey: !1,
              altKey: !1,
              code: "Semicolon",
            }
          ),
          e(
            "Engine switch (on/off)",
            function () {
              window.geofs.aircraft.instance.engine.on
                ? window.geofs.aircraft.instance.stopEngine()
                : window.geofs.aircraft.instance.startEngine();
            },
            t()["Engine switch (on/off)"] || {
              ctrlKey: !1,
              altKey: !1,
              shiftKey: !1,
              code: "KeyE",
            }
          ),
          e(
            "Gear toggle (up/down)",
            function () {
              window.controls.setters.setGear.set();
            },
            t()["Gear toggle (up/down)"] || {
              ctrlKey: !1,
              altKey: !1,
              shiftKey: !1,
              code: "KeyG",
            }
          ),
          e(
            "Lower flaps",
            function () {
              window.controls.setters.setFlapsDown.set();
            },
            t()["Lower flaps"] || {
              ctrlKey: !1,
              altKey: !1,
              shiftKey: !1,
              code: "BracketLeft",
            }
          ),
          e(
            "Raise flaps",
            function () {
              window.controls.setters.setFlapsUp.set();
            },
            t()["Raise flaps"] || {
              ctrlKey: !1,
              altKey: !1,
              shiftKey: !1,
              code: "BracketRight",
            }
          ),
          e(
            "Airbrake toggle (on/off)",
            function () {
              window.controls.setters.setAirbrakes.set();
            },
            t()["Airbrake toggle (on/off)"] || {
              ctrlKey: !1,
              altKey: !1,
              shiftKey: !1,
              code: "KeyB",
            }
          ),
          e(
            "Optional Animated Part toggle (on/off)",
            function () {
              window.controls.setters.setOptionalAnimatedPart.set();
            },
            t()["Optional Animated Part toggle (on/off)"] || {
              ctrlKey: !1,
              altKey: !1,
              shiftKey: !1,
              code: "KeyX",
            }
          ),
          e(
            "Elevator trim down",
            function () {
              window.controls.setters.setElevatorTrimDown.set();
            },
            t()["Elevator trim down"] || {
              ctrlKey: !1,
              altKey: !1,
              shiftKey: !1,
              code: "End",
            }
          ),
          e(
            "Elevator trim up",
            function () {
              window.controls.setters.setElevatorTrimUp.set();
            },
            t()["Elevator trim up"] || {
              ctrlKey: !1,
              altKey: !1,
              shiftKey: !1,
              code: "Home",
            }
          ),
          e(
            "Elevator trim neutral",
            function () {
              window.controls.setters.setElevatorTrimNeutral.set();
            },
            t()["Elevator trim neutral"] || {
              ctrlKey: !1,
              altKey: !1,
              shiftKey: !1,
              code: "Delete",
            }
          ),
          e(
            "",
            function () {
              window.controls.recenter();
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Enter" }
          ),
          e(
            "",
            function () {
              window.controls.controlKeyPressed = !0;
            },
            { ctrlKey: !0, shiftKey: !1, altKey: !1, code: "" }
          ),
          e(
            "",
            function (e) {
              window.flight.recorder.playing &&
                (window.flight.recorder.exitPlayback(), e.preventDefault());
            },
            {
              ctrlKey: !1,
              shiftKey: !1,
              altKey: !1,
              code: "Escape",
            }
          ),
          e(
            "",
            function () {
              window.flight.recorder.enterPlayback();
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "KeyV" }
          ),
          e(
            "",
            function () {
              window.audio.toggleMute();
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "KeyS" }
          ),
          e(
            "",
            function () {
              window.geofs.togglePause();
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "KeyP" }
          ),
          e(
            "",
            function () {
              window.geofs.camera.cycle();
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "KeyC" }
          ),
          e(
            "",
            function () {
              window.ui.panel.toggle(".geofs-map-list");
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "KeyN" }
          ),
          e(
            "",
            function () {
              window.ui.panel.toggle(".geofs-preference-list");
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "KeyO" }
          ),
          e(
            "",
            function () {
              window.geofs.flyToCamera();
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Tab" }
          ),
          e(
            "",
            function () {
              window.instruments.toggle();
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "KeyH" }
          ),
          e(
            "",
            function () {
              window.controls.setMode("mouse");
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "KeyM" }
          ),
          e(
            "",
            function () {
              window.controls.setMode("keyboard");
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "KeyK" }
          ),
          e(
            "",
            function () {
              window.controls.setMode("joystick");
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "KeyJ" }
          ),
          e(
            "",
            function () {
              window.geofs.camera.animations.orbitHorizontal.active =
                !window.geofs.camera.animations.orbitHorizontal.active;
            },
            { ctrlKey: !0, shiftKey: !1, altKey: !1, code: "KeyQ" }
          ),
          e(
            "",
            function () {
              window.geofs.resetFlight();
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "KeyR" }
          ),
          e(
            "",
            function () {
              window.geofs.camera.animations.orbitVertical.active =
                !window.geofs.camera.animations.orbitVertical.active;
            },
            { ctrlKey: !0, shiftKey: !1, altKey: !1, code: "KeyW" }
          ),
          e(
            "",
            function () {
              window.geofs.camera.setRotation(45);
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Numpad1" }
          ),
          e(
            "",
            function () {
              window.geofs.camera.setRotation(0);
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Numpad2" }
          ),
          e(
            "",
            function () {
              window.geofs.camera.setRotation(-45);
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Numpad3" }
          ),
          e(
            "",
            function () {
              window.geofs.camera.setRotation(90);
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Numpad4" }
          ),
          e(
            "",
            function () {
              window.geofs.camera.setToNeutral();
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Numpad5" }
          ),
          e(
            "",
            function () {
              window.geofs.camera.setRotation(-90);
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Numpad6" }
          ),
          e(
            "",
            function () {
              window.geofs.camera.setRotation(135);
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Numpad7" }
          ),
          e(
            "",
            function () {
              window.geofs.camera.setRotation(180);
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Numpad8" }
          ),
          e(
            "",
            function () {
              window.geofs.camera.setRotation(-135);
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Numpad9" }
          ),
          e(
            "",
            function () {
              window.controls.throttle = 0;
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Digit0" }
          ),
          e(
            "",
            function () {
              window.controls.throttle = 1 / 9;
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Digit1" }
          ),
          e(
            "",
            function () {
              window.controls.throttle = 2 / 9;
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Digit2" }
          ),
          e(
            "",
            function () {
              window.controls.throttle = 3 / 9;
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Digit3" }
          ),
          e(
            "",
            function () {
              window.controls.throttle = 4 / 9;
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Digit4" }
          ),
          e(
            "",
            function () {
              window.controls.throttle = 5 / 9;
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Digit5" }
          ),
          e(
            "",
            function () {
              window.controls.throttle = 6 / 9;
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Digit6" }
          ),
          e(
            "",
            function () {
              window.controls.throttle = 7 / 9;
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Digit7" }
          ),
          e(
            "",
            function () {
              window.controls.throttle = 8 / 9;
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Digit8" }
          ),
          e(
            "",
            function () {
              window.controls.throttle = 1;
            },
            { ctrlKey: !1, shiftKey: !1, altKey: !1, code: "Digit9" }
          );
      };
    }
  ),
  define(
    "ui/main",
    ["knockout", "./ViewModel", "../addDefaultKeybinds"],
    function (e, t, n) {
      n(), new t();
    }
  ),
  (function () {
    if (!window.Promise) throw new Error("Browser is outdated.");
    var e = setInterval(function () {
      window.geofs &&
        window.geofs.aircraft &&
        window.geofs.aircraft.instance &&
        window.geofs.aircraft.instance.object3d &&
        localStorage.getItem("settings") &&
        (clearInterval(e), require(["ui/main"]));
    }, 250);
  })(),
  define("init", function () {});
var a = (window.keyboard_mapping = {});
a.version = "1.0.2";
a.require = require;
a.requirejs = requirejs;
a.define = define;
a.ready = false;
