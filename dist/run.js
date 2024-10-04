/**
 * @architect Mark Jivko <mark@socialdetox.ai>
 * @copyright © 2024 SocialDetox.ai https://socialdetox.ai
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var lg = Object.defineProperty;
var Va = e => {
    throw TypeError(e);
};
var ug = (e, t, r) => (t in e ? lg(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[t] = r));
var g = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var I = (e, t, r) => ug(e, typeof t != "symbol" ? t + "" : t, r),
    Ya = (e, t, r) => t.has(e) || Va("Cannot " + r);
var b = (e, t, r) => (Ya(e, t, "read from private field"), r ? r.call(e) : t.get(e)),
    me = (e, t, r) =>
        t.has(e) ? Va("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r),
    xe = (e, t, r, n) => (Ya(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
var eo = g(Mt => {
    "use strict";
    Object.defineProperty(Mt, "__esModule", { value: !0 });
    Mt.CancellationError = Mt.CancellationToken = void 0;
    var cg = require("events"),
        Zi = class extends cg.EventEmitter {
            get cancelled() {
                return this._cancelled || (this._parent != null && this._parent.cancelled);
            }
            set parent(t) {
                this.removeParentCancelHandler(),
                    (this._parent = t),
                    (this.parentCancelHandler = () => this.cancel()),
                    this._parent.onCancel(this.parentCancelHandler);
            }
            constructor(t) {
                super(),
                    (this.parentCancelHandler = null),
                    (this._parent = null),
                    (this._cancelled = !1),
                    t != null && (this.parent = t);
            }
            cancel() {
                (this._cancelled = !0), this.emit("cancel");
            }
            onCancel(t) {
                this.cancelled ? t() : this.once("cancel", t);
            }
            createPromise(t) {
                if (this.cancelled) return Promise.reject(new Ar());
                let r = () => {
                        if (n != null)
                            try {
                                this.removeListener("cancel", n), (n = null);
                            } catch {}
                    },
                    n = null;
                return new Promise((i, o) => {
                    let s = null;
                    if (
                        ((n = () => {
                            try {
                                s != null && (s(), (s = null));
                            } finally {
                                o(new Ar());
                            }
                        }),
                        this.cancelled)
                    ) {
                        n();
                        return;
                    }
                    this.onCancel(n),
                        t(i, o, a => {
                            s = a;
                        });
                })
                    .then(i => (r(), i))
                    .catch(i => {
                        throw (r(), i);
                    });
            }
            removeParentCancelHandler() {
                let t = this._parent;
                t != null &&
                    this.parentCancelHandler != null &&
                    (t.removeListener("cancel", this.parentCancelHandler), (this.parentCancelHandler = null));
            }
            dispose() {
                try {
                    this.removeParentCancelHandler();
                } finally {
                    this.removeAllListeners(), (this._parent = null);
                }
            }
        };
    Mt.CancellationToken = Zi;
    var Ar = class extends Error {
        constructor() {
            super("cancelled");
        }
    };
    Mt.CancellationError = Ar;
});
var Xa = g((Nb, za) => {
    var Bt = 1e3,
        Ht = Bt * 60,
        jt = Ht * 60,
        Et = jt * 24,
        fg = Et * 7,
        dg = Et * 365.25;
    za.exports = function (e, t) {
        t = t || {};
        var r = typeof e;
        if (r === "string" && e.length > 0) return hg(e);
        if (r === "number" && isFinite(e)) return t.long ? mg(e) : pg(e);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
    };
    function hg(e) {
        if (((e = String(e)), !(e.length > 100))) {
            var t =
                /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                    e
                );
            if (t) {
                var r = parseFloat(t[1]),
                    n = (t[2] || "ms").toLowerCase();
                switch (n) {
                    case "years":
                    case "year":
                    case "yrs":
                    case "yr":
                    case "y":
                        return r * dg;
                    case "weeks":
                    case "week":
                    case "w":
                        return r * fg;
                    case "days":
                    case "day":
                    case "d":
                        return r * Et;
                    case "hours":
                    case "hour":
                    case "hrs":
                    case "hr":
                    case "h":
                        return r * jt;
                    case "minutes":
                    case "minute":
                    case "mins":
                    case "min":
                    case "m":
                        return r * Ht;
                    case "seconds":
                    case "second":
                    case "secs":
                    case "sec":
                    case "s":
                        return r * Bt;
                    case "milliseconds":
                    case "millisecond":
                    case "msecs":
                    case "msec":
                    case "ms":
                        return r;
                    default:
                        return;
                }
            }
        }
    }
    function pg(e) {
        var t = Math.abs(e);
        return t >= Et
            ? Math.round(e / Et) + "d"
            : t >= jt
            ? Math.round(e / jt) + "h"
            : t >= Ht
            ? Math.round(e / Ht) + "m"
            : t >= Bt
            ? Math.round(e / Bt) + "s"
            : e + "ms";
    }
    function mg(e) {
        var t = Math.abs(e);
        return t >= Et
            ? wn(e, t, Et, "day")
            : t >= jt
            ? wn(e, t, jt, "hour")
            : t >= Ht
            ? wn(e, t, Ht, "minute")
            : t >= Bt
            ? wn(e, t, Bt, "second")
            : e + " ms";
    }
    function wn(e, t, r, n) {
        var i = t >= r * 1.5;
        return Math.round(e / r) + " " + n + (i ? "s" : "");
    }
});
var to = g((Rb, Ka) => {
    function gg(e) {
        (r.debug = r),
            (r.default = r),
            (r.coerce = l),
            (r.disable = o),
            (r.enable = i),
            (r.enabled = s),
            (r.humanize = Xa()),
            (r.destroy = h),
            Object.keys(e).forEach(c => {
                r[c] = e[c];
            }),
            (r.names = []),
            (r.skips = []),
            (r.formatters = {});
        function t(c) {
            let d = 0;
            for (let m = 0; m < c.length; m++) (d = (d << 5) - d + c.charCodeAt(m)), (d |= 0);
            return r.colors[Math.abs(d) % r.colors.length];
        }
        r.selectColor = t;
        function r(c) {
            let d,
                m = null,
                p,
                y;
            function _(...v) {
                if (!_.enabled) return;
                let x = _,
                    A = Number(new Date()),
                    N = A - (d || A);
                (x.diff = N),
                    (x.prev = d),
                    (x.curr = A),
                    (d = A),
                    (v[0] = r.coerce(v[0])),
                    typeof v[0] != "string" && v.unshift("%O");
                let L = 0;
                (v[0] = v[0].replace(/%([a-zA-Z%])/g, (V, se) => {
                    if (V === "%%") return "%";
                    L++;
                    let E = r.formatters[se];
                    if (typeof E == "function") {
                        let D = v[L];
                        (V = E.call(x, D)), v.splice(L, 1), L--;
                    }
                    return V;
                })),
                    r.formatArgs.call(x, v),
                    (x.log || r.log).apply(x, v);
            }
            return (
                (_.namespace = c),
                (_.useColors = r.useColors()),
                (_.color = r.selectColor(c)),
                (_.extend = n),
                (_.destroy = r.destroy),
                Object.defineProperty(_, "enabled", {
                    enumerable: !0,
                    configurable: !1,
                    get: () => (m !== null ? m : (p !== r.namespaces && ((p = r.namespaces), (y = r.enabled(c))), y)),
                    set: v => {
                        m = v;
                    }
                }),
                typeof r.init == "function" && r.init(_),
                _
            );
        }
        function n(c, d) {
            let m = r(this.namespace + (typeof d > "u" ? ":" : d) + c);
            return (m.log = this.log), m;
        }
        function i(c) {
            r.save(c), (r.namespaces = c), (r.names = []), (r.skips = []);
            let d,
                m = (typeof c == "string" ? c : "").split(/[\s,]+/),
                p = m.length;
            for (d = 0; d < p; d++)
                m[d] &&
                    ((c = m[d].replace(/\*/g, ".*?")),
                    c[0] === "-" ? r.skips.push(new RegExp("^" + c.slice(1) + "$")) : r.names.push(new RegExp("^" + c + "$")));
        }
        function o() {
            let c = [...r.names.map(a), ...r.skips.map(a).map(d => "-" + d)].join(",");
            return r.enable(""), c;
        }
        function s(c) {
            if (c[c.length - 1] === "*") return !0;
            let d, m;
            for (d = 0, m = r.skips.length; d < m; d++) if (r.skips[d].test(c)) return !1;
            for (d = 0, m = r.names.length; d < m; d++) if (r.names[d].test(c)) return !0;
            return !1;
        }
        function a(c) {
            return c
                .toString()
                .substring(2, c.toString().length - 2)
                .replace(/\.\*\?$/, "*");
        }
        function l(c) {
            return c instanceof Error ? c.stack || c.message : c;
        }
        function h() {
            console.warn(
                "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
            );
        }
        return r.enable(r.load()), r;
    }
    Ka.exports = gg;
});
var Ja = g((Ne, En) => {
    Ne.formatArgs = Eg;
    Ne.save = yg;
    Ne.load = _g;
    Ne.useColors = wg;
    Ne.storage = vg();
    Ne.destroy = (() => {
        let e = !1;
        return () => {
            e ||
                ((e = !0),
                console.warn(
                    "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
                ));
        };
    })();
    Ne.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33"
    ];
    function wg() {
        if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return !0;
        if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
            return !1;
        let e;
        return (
            (typeof document < "u" &&
                document.documentElement &&
                document.documentElement.style &&
                document.documentElement.style.WebkitAppearance) ||
            (typeof window < "u" &&
                window.console &&
                (window.console.firebug || (window.console.exception && window.console.table))) ||
            (typeof navigator < "u" &&
                navigator.userAgent &&
                (e = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) &&
                parseInt(e[1], 10) >= 31) ||
            (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        );
    }
    function Eg(e) {
        if (
            ((e[0] =
                (this.useColors ? "%c" : "") +
                this.namespace +
                (this.useColors ? " %c" : " ") +
                e[0] +
                (this.useColors ? "%c " : " ") +
                "+" +
                En.exports.humanize(this.diff)),
            !this.useColors)
        )
            return;
        let t = "color: " + this.color;
        e.splice(1, 0, t, "color: inherit");
        let r = 0,
            n = 0;
        e[0].replace(/%[a-zA-Z%]/g, i => {
            i !== "%%" && (r++, i === "%c" && (n = r));
        }),
            e.splice(n, 0, t);
    }
    Ne.log = console.debug || console.log || (() => {});
    function yg(e) {
        try {
            e ? Ne.storage.setItem("debug", e) : Ne.storage.removeItem("debug");
        } catch {}
    }
    function _g() {
        let e;
        try {
            e = Ne.storage.getItem("debug");
        } catch {}
        return !e && typeof process < "u" && "env" in process && (e = process.env.DEBUG), e;
    }
    function vg() {
        try {
            return localStorage;
        } catch {}
    }
    En.exports = to()(Ne);
    var { formatters: Sg } = En.exports;
    Sg.j = function (e) {
        try {
            return JSON.stringify(e);
        } catch (t) {
            return "[UnexpectedJSONParseError]: " + t.message;
        }
    };
});
var Za = g((Db, Qa) => {
    "use strict";
    Qa.exports = (e, t) => {
        t = t || process.argv;
        let r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--",
            n = t.indexOf(r + e),
            i = t.indexOf("--");
        return n !== -1 && (i === -1 ? !0 : n < i);
    };
});
var tl = g((Pb, el) => {
    "use strict";
    var Ag = require("os"),
        Le = Za(),
        ue = process.env,
        Wt;
    Le("no-color") || Le("no-colors") || Le("color=false")
        ? (Wt = !1)
        : (Le("color") || Le("colors") || Le("color=true") || Le("color=always")) && (Wt = !0);
    "FORCE_COLOR" in ue && (Wt = ue.FORCE_COLOR.length === 0 || parseInt(ue.FORCE_COLOR, 10) !== 0);
    function xg(e) {
        return e === 0 ? !1 : { level: e, hasBasic: !0, has256: e >= 2, has16m: e >= 3 };
    }
    function Tg(e) {
        if (Wt === !1) return 0;
        if (Le("color=16m") || Le("color=full") || Le("color=truecolor")) return 3;
        if (Le("color=256")) return 2;
        if (e && !e.isTTY && Wt !== !0) return 0;
        let t = Wt ? 1 : 0;
        if (process.platform === "win32") {
            let r = Ag.release().split(".");
            return Number(process.versions.node.split(".")[0]) >= 8 && Number(r[0]) >= 10 && Number(r[2]) >= 10586
                ? Number(r[2]) >= 14931
                    ? 3
                    : 2
                : 1;
        }
        if ("CI" in ue)
            return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(r => r in ue) || ue.CI_NAME === "codeship" ? 1 : t;
        if ("TEAMCITY_VERSION" in ue) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(ue.TEAMCITY_VERSION) ? 1 : 0;
        if (ue.COLORTERM === "truecolor") return 3;
        if ("TERM_PROGRAM" in ue) {
            let r = parseInt((ue.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
            switch (ue.TERM_PROGRAM) {
                case "iTerm.app":
                    return r >= 3 ? 3 : 2;
                case "Apple_Terminal":
                    return 2;
            }
        }
        return /-256(color)?$/i.test(ue.TERM)
            ? 2
            : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(ue.TERM) || "COLORTERM" in ue
            ? 1
            : (ue.TERM === "dumb", t);
    }
    function ro(e) {
        let t = Tg(e);
        return xg(t);
    }
    el.exports = { supportsColor: ro, stdout: ro(process.stdout), stderr: ro(process.stderr) };
});
var nl = g((ne, _n) => {
    var Cg = require("tty"),
        yn = require("util");
    ne.init = Pg;
    ne.log = Ng;
    ne.formatArgs = Og;
    ne.save = Rg;
    ne.load = Dg;
    ne.useColors = bg;
    ne.destroy = yn.deprecate(() => {},
    "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    ne.colors = [6, 2, 3, 4, 5, 1];
    try {
        let e = tl();
        e &&
            (e.stderr || e).level >= 2 &&
            (ne.colors = [
                20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81,
                92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170,
                171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215,
                220, 221
            ]);
    } catch {}
    ne.inspectOpts = Object.keys(process.env)
        .filter(e => /^debug_/i.test(e))
        .reduce((e, t) => {
            let r = t
                    .substring(6)
                    .toLowerCase()
                    .replace(/_([a-z])/g, (i, o) => o.toUpperCase()),
                n = process.env[t];
            return (
                /^(yes|on|true|enabled)$/i.test(n)
                    ? (n = !0)
                    : /^(no|off|false|disabled)$/i.test(n)
                    ? (n = !1)
                    : n === "null"
                    ? (n = null)
                    : (n = Number(n)),
                (e[r] = n),
                e
            );
        }, {});
    function bg() {
        return "colors" in ne.inspectOpts ? !!ne.inspectOpts.colors : Cg.isatty(process.stderr.fd);
    }
    function Og(e) {
        let { namespace: t, useColors: r } = this;
        if (r) {
            let n = this.color,
                i = "\x1B[3" + (n < 8 ? n : "8;5;" + n),
                o = `  ${i};1m${t} \x1B[0m`;
            (e[0] =
                o +
                e[0]
                    .split(
                        `
`
                    )
                    .join(
                        `
` + o
                    )),
                e.push(i + "m+" + _n.exports.humanize(this.diff) + "\x1B[0m");
        } else e[0] = Ig() + t + " " + e[0];
    }
    function Ig() {
        return ne.inspectOpts.hideDate ? "" : new Date().toISOString() + " ";
    }
    function Ng(...e) {
        return process.stderr.write(
            yn.formatWithOptions(ne.inspectOpts, ...e) +
                `
`
        );
    }
    function Rg(e) {
        e ? (process.env.DEBUG = e) : delete process.env.DEBUG;
    }
    function Dg() {
        return process.env.DEBUG;
    }
    function Pg(e) {
        e.inspectOpts = {};
        let t = Object.keys(ne.inspectOpts);
        for (let r = 0; r < t.length; r++) e.inspectOpts[t[r]] = ne.inspectOpts[t[r]];
    }
    _n.exports = to()(ne);
    var { formatters: rl } = _n.exports;
    rl.o = function (e) {
        return (
            (this.inspectOpts.colors = this.useColors),
            yn
                .inspect(e, this.inspectOpts)
                .split(
                    `
`
                )
                .map(t => t.trim())
                .join(" ")
        );
    };
    rl.O = function (e) {
        return (this.inspectOpts.colors = this.useColors), yn.inspect(e, this.inspectOpts);
    };
});
var il = g((Fb, no) => {
    typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs
        ? (no.exports = Ja())
        : (no.exports = nl());
});
var xr = g(io => {
    "use strict";
    Object.defineProperty(io, "__esModule", { value: !0 });
    io.newError = Fg;
    function Fg(e, t) {
        let r = new Error(e);
        return (r.code = t), r;
    }
});
var so = g(vn => {
    "use strict";
    Object.defineProperty(vn, "__esModule", { value: !0 });
    vn.ProgressCallbackTransform = void 0;
    var qg = require("stream"),
        oo = class extends qg.Transform {
            constructor(t, r, n) {
                super(),
                    (this.total = t),
                    (this.cancellationToken = r),
                    (this.onProgress = n),
                    (this.start = Date.now()),
                    (this.transferred = 0),
                    (this.delta = 0),
                    (this.nextUpdate = this.start + 1e3);
            }
            _transform(t, r, n) {
                if (this.cancellationToken.cancelled) {
                    n(new Error("cancelled"), null);
                    return;
                }
                (this.transferred += t.length), (this.delta += t.length);
                let i = Date.now();
                i >= this.nextUpdate &&
                    this.transferred !== this.total &&
                    ((this.nextUpdate = i + 1e3),
                    this.onProgress({
                        total: this.total,
                        delta: this.delta,
                        transferred: this.transferred,
                        percent: (this.transferred / this.total) * 100,
                        bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
                    }),
                    (this.delta = 0)),
                    n(null, t);
            }
            _flush(t) {
                if (this.cancellationToken.cancelled) {
                    t(new Error("cancelled"));
                    return;
                }
                this.onProgress({
                    total: this.total,
                    delta: this.delta,
                    transferred: this.total,
                    percent: 100,
                    bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
                }),
                    (this.delta = 0),
                    t(null);
            }
        };
    vn.ProgressCallbackTransform = oo;
});
var ll = g(ge => {
    "use strict";
    Object.defineProperty(ge, "__esModule", { value: !0 });
    ge.DigestTransform = ge.HttpExecutor = ge.HttpError = void 0;
    ge.createHttpError = ao;
    ge.parseJson = jg;
    ge.configureRequestOptionsFromUrl = al;
    ge.configureRequestUrl = uo;
    ge.safeGetHeader = Gt;
    ge.configureRequestOptions = Sn;
    ge.safeStringifyJson = An;
    var Lg = require("crypto"),
        Ug = il(),
        $g = require("fs"),
        kg = require("stream"),
        sl = require("url"),
        Mg = eo(),
        ol = xr(),
        Bg = so(),
        Tr = (0, Ug.default)("electron-builder");
    function ao(e, t = null) {
        return new Cr(
            e.statusCode || -1,
            `${e.statusCode} ${e.statusMessage}` +
                (t == null
                    ? ""
                    : `
` + JSON.stringify(t, null, "  ")) +
                `
Headers: ` +
                An(e.headers),
            t
        );
    }
    var Hg = new Map([
            [429, "Too many requests"],
            [400, "Bad request"],
            [403, "Forbidden"],
            [404, "Not found"],
            [405, "Method not allowed"],
            [406, "Not acceptable"],
            [408, "Request timeout"],
            [413, "Request entity too large"],
            [500, "Internal server error"],
            [502, "Bad gateway"],
            [503, "Service unavailable"],
            [504, "Gateway timeout"],
            [505, "HTTP version not supported"]
        ]),
        Cr = class extends Error {
            constructor(t, r = `HTTP error: ${Hg.get(t) || t}`, n = null) {
                super(r),
                    (this.statusCode = t),
                    (this.description = n),
                    (this.name = "HttpError"),
                    (this.code = `HTTP_ERROR_${t}`);
            }
            isServerError() {
                return this.statusCode >= 500 && this.statusCode <= 599;
            }
        };
    ge.HttpError = Cr;
    function jg(e) {
        return e.then(t => (t == null || t.length === 0 ? null : JSON.parse(t)));
    }
    var lo = class e {
        constructor() {
            this.maxRedirects = 10;
        }
        request(t, r = new Mg.CancellationToken(), n) {
            Sn(t);
            let i = n == null ? void 0 : JSON.stringify(n),
                o = i ? Buffer.from(i) : void 0;
            if (o != null) {
                Tr(i);
                let { headers: s, ...a } = t;
                t = { method: "post", headers: { "Content-Type": "application/json", "Content-Length": o.length, ...s }, ...a };
            }
            return this.doApiRequest(t, r, s => s.end(o));
        }
        doApiRequest(t, r, n, i = 0) {
            return (
                Tr.enabled && Tr(`Request: ${An(t)}`),
                r.createPromise((o, s, a) => {
                    let l = this.createRequest(t, h => {
                        try {
                            this.handleResponse(h, t, r, o, s, i, n);
                        } catch (c) {
                            s(c);
                        }
                    });
                    this.addErrorAndTimeoutHandlers(l, s, t.timeout),
                        this.addRedirectHandlers(l, t, s, i, h => {
                            this.doApiRequest(h, r, n, i).then(o).catch(s);
                        }),
                        n(l, s),
                        a(() => l.abort());
                })
            );
        }
        addRedirectHandlers(t, r, n, i, o) {}
        addErrorAndTimeoutHandlers(t, r, n = 60 * 1e3) {
            this.addTimeOutHandler(t, r, n),
                t.on("error", r),
                t.on("aborted", () => {
                    r(new Error("Request has been aborted by the server"));
                });
        }
        handleResponse(t, r, n, i, o, s, a) {
            var l;
            if (
                (Tr.enabled && Tr(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${An(r)}`),
                t.statusCode === 404)
            ) {
                o(
                    ao(
                        t,
                        `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${
                            r.path
                        }

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`
                    )
                );
                return;
            } else if (t.statusCode === 204) {
                i();
                return;
            }
            let h = (l = t.statusCode) !== null && l !== void 0 ? l : 0,
                c = h >= 300 && h < 400,
                d = Gt(t, "location");
            if (c && d != null) {
                if (s > this.maxRedirects) {
                    o(this.createMaxRedirectError());
                    return;
                }
                this.doApiRequest(e.prepareRedirectUrlOptions(d, r), n, a, s).then(i).catch(o);
                return;
            }
            t.setEncoding("utf8");
            let m = "";
            t.on("error", o),
                t.on("data", p => (m += p)),
                t.on("end", () => {
                    try {
                        if (t.statusCode != null && t.statusCode >= 400) {
                            let p = Gt(t, "content-type"),
                                y =
                                    p != null &&
                                    (Array.isArray(p) ? p.find(_ => _.includes("json")) != null : p.includes("json"));
                            o(
                                ao(
                                    t,
                                    `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${
                                        r.port ? `:${r.port}` : ""
                                    }${r.path}

          Data:
          ${y ? JSON.stringify(JSON.parse(m)) : m}
          `
                                )
                            );
                        } else i(m.length === 0 ? null : m);
                    } catch (p) {
                        o(p);
                    }
                });
        }
        async downloadToBuffer(t, r) {
            return await r.cancellationToken.createPromise((n, i, o) => {
                let s = [],
                    a = { headers: r.headers || void 0, redirect: "manual" };
                uo(t, a),
                    Sn(a),
                    this.doDownload(
                        a,
                        {
                            destination: null,
                            options: r,
                            onCancel: o,
                            callback: l => {
                                l == null ? n(Buffer.concat(s)) : i(l);
                            },
                            responseHandler: (l, h) => {
                                let c = 0;
                                l.on("data", d => {
                                    if (((c += d.length), c > 524288e3)) {
                                        h(new Error("Maximum allowed size is 500 MB"));
                                        return;
                                    }
                                    s.push(d);
                                }),
                                    l.on("end", () => {
                                        h(null);
                                    });
                            }
                        },
                        0
                    );
            });
        }
        doDownload(t, r, n) {
            let i = this.createRequest(t, o => {
                if (o.statusCode >= 400) {
                    r.callback(
                        new Error(
                            `Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${o.statusCode}: ${
                                o.statusMessage
                            }`
                        )
                    );
                    return;
                }
                o.on("error", r.callback);
                let s = Gt(o, "location");
                if (s != null) {
                    n < this.maxRedirects
                        ? this.doDownload(e.prepareRedirectUrlOptions(s, t), r, n++)
                        : r.callback(this.createMaxRedirectError());
                    return;
                }
                r.responseHandler == null ? Gg(r, o) : r.responseHandler(o, r.callback);
            });
            this.addErrorAndTimeoutHandlers(i, r.callback, t.timeout),
                this.addRedirectHandlers(i, t, r.callback, n, o => {
                    this.doDownload(o, r, n++);
                }),
                i.end();
        }
        createMaxRedirectError() {
            return new Error(`Too many redirects (> ${this.maxRedirects})`);
        }
        addTimeOutHandler(t, r, n) {
            t.on("socket", i => {
                i.setTimeout(n, () => {
                    t.abort(), r(new Error("Request timed out"));
                });
            });
        }
        static prepareRedirectUrlOptions(t, r) {
            let n = al(t, { ...r }),
                i = n.headers;
            if (i?.authorization) {
                let o = new sl.URL(t);
                (o.hostname.endsWith(".amazonaws.com") || o.searchParams.has("X-Amz-Credential")) && delete i.authorization;
            }
            return n;
        }
        static retryOnServerError(t, r = 3) {
            for (let n = 0; ; n++)
                try {
                    return t();
                } catch (i) {
                    if (n < r && ((i instanceof Cr && i.isServerError()) || i.code === "EPIPE")) continue;
                    throw i;
                }
        }
    };
    ge.HttpExecutor = lo;
    function al(e, t) {
        let r = Sn(t);
        return uo(new sl.URL(e), r), r;
    }
    function uo(e, t) {
        (t.protocol = e.protocol),
            (t.hostname = e.hostname),
            e.port ? (t.port = e.port) : t.port && delete t.port,
            (t.path = e.pathname + e.search);
    }
    var br = class extends kg.Transform {
        get actual() {
            return this._actual;
        }
        constructor(t, r = "sha512", n = "base64") {
            super(),
                (this.expected = t),
                (this.algorithm = r),
                (this.encoding = n),
                (this._actual = null),
                (this.isValidateOnEnd = !0),
                (this.digester = (0, Lg.createHash)(r));
        }
        _transform(t, r, n) {
            this.digester.update(t), n(null, t);
        }
        _flush(t) {
            if (((this._actual = this.digester.digest(this.encoding)), this.isValidateOnEnd))
                try {
                    this.validate();
                } catch (r) {
                    t(r);
                    return;
                }
            t(null);
        }
        validate() {
            if (this._actual == null) throw (0, ol.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
            if (this._actual !== this.expected)
                throw (0, ol.newError)(
                    `${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`,
                    "ERR_CHECKSUM_MISMATCH"
                );
            return null;
        }
    };
    ge.DigestTransform = br;
    function Wg(e, t, r) {
        return e != null && t != null && e !== t
            ? (r(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1)
            : !0;
    }
    function Gt(e, t) {
        let r = e.headers[t];
        return r == null ? null : Array.isArray(r) ? (r.length === 0 ? null : r[r.length - 1]) : r;
    }
    function Gg(e, t) {
        if (!Wg(Gt(t, "X-Checksum-Sha2"), e.options.sha2, e.callback)) return;
        let r = [];
        if (e.options.onProgress != null) {
            let s = Gt(t, "content-length");
            s != null &&
                r.push(new Bg.ProgressCallbackTransform(parseInt(s, 10), e.options.cancellationToken, e.options.onProgress));
        }
        let n = e.options.sha512;
        n != null
            ? r.push(
                  new br(
                      n,
                      "sha512",
                      n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64"
                  )
              )
            : e.options.sha2 != null && r.push(new br(e.options.sha2, "sha256", "hex"));
        let i = (0, $g.createWriteStream)(e.destination);
        r.push(i);
        let o = t;
        for (let s of r)
            s.on("error", a => {
                i.close(), e.options.cancellationToken.cancelled || e.callback(a);
            }),
                (o = o.pipe(s));
        i.on("finish", () => {
            i.close(e.callback);
        });
    }
    function Sn(e, t, r) {
        r != null && (e.method = r), (e.headers = { ...e.headers });
        let n = e.headers;
        return (
            t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`),
            n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"),
            (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"),
            e.protocol == null && process.versions.electron != null && (e.protocol = "https:"),
            e
        );
    }
    function An(e, t) {
        return JSON.stringify(
            e,
            (r, n) =>
                r.endsWith("Authorization") ||
                r.endsWith("authorization") ||
                r.endsWith("Password") ||
                r.endsWith("PASSWORD") ||
                r.endsWith("Token") ||
                r.includes("password") ||
                r.includes("token") ||
                (t != null && t.has(r))
                    ? "<stripped sensitive data>"
                    : n,
            2
        );
    }
});
var cl = g(xn => {
    "use strict";
    Object.defineProperty(xn, "__esModule", { value: !0 });
    xn.githubUrl = Vg;
    xn.getS3LikeProviderBaseUrl = Yg;
    function Vg(e, t = "github.com") {
        return `${e.protocol || "https"}://${e.host || t}`;
    }
    function Yg(e) {
        let t = e.provider;
        if (t === "s3") return zg(e);
        if (t === "spaces") return Xg(e);
        throw new Error(`Not supported provider: ${t}`);
    }
    function zg(e) {
        let t;
        if (e.accelerate == !0) t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
        else if (e.endpoint != null) t = `${e.endpoint}/${e.bucket}`;
        else if (e.bucket.includes(".")) {
            if (e.region == null) throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
            e.region === "us-east-1"
                ? (t = `https://s3.amazonaws.com/${e.bucket}`)
                : (t = `https://s3-${e.region}.amazonaws.com/${e.bucket}`);
        } else
            e.region === "cn-north-1"
                ? (t = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn`)
                : (t = `https://${e.bucket}.s3.amazonaws.com`);
        return ul(t, e.path);
    }
    function ul(e, t) {
        return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), (e += t)), e;
    }
    function Xg(e) {
        if (e.name == null) throw new Error("name is missing");
        if (e.region == null) throw new Error("region is missing");
        return ul(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
    }
});
var fl = g(co => {
    "use strict";
    Object.defineProperty(co, "__esModule", { value: !0 });
    co.parseDn = Kg;
    function Kg(e) {
        let t = !1,
            r = null,
            n = "",
            i = 0;
        e = e.trim();
        let o = new Map();
        for (let s = 0; s <= e.length; s++) {
            if (s === e.length) {
                r !== null && o.set(r, n);
                break;
            }
            let a = e[s];
            if (t) {
                if (a === '"') {
                    t = !1;
                    continue;
                }
            } else {
                if (a === '"') {
                    t = !0;
                    continue;
                }
                if (a === "\\") {
                    s++;
                    let l = parseInt(e.slice(s, s + 2), 16);
                    Number.isNaN(l) ? (n += e[s]) : (s++, (n += String.fromCharCode(l)));
                    continue;
                }
                if (r === null && a === "=") {
                    (r = n), (n = "");
                    continue;
                }
                if (a === "," || a === ";" || a === "+") {
                    r !== null && o.set(r, n), (r = null), (n = "");
                    continue;
                }
            }
            if (a === " " && !t) {
                if (n.length === 0) continue;
                if (s > i) {
                    let l = s;
                    for (; e[l] === " "; ) l++;
                    i = l;
                }
                if (
                    i >= e.length ||
                    e[i] === "," ||
                    e[i] === ";" ||
                    (r === null && e[i] === "=") ||
                    (r !== null && e[i] === "+")
                ) {
                    s = i - 1;
                    continue;
                }
            }
            n += a;
        }
        return o;
    }
});
var gl = g(Vt => {
    "use strict";
    Object.defineProperty(Vt, "__esModule", { value: !0 });
    Vt.nil = Vt.UUID = void 0;
    var pl = require("crypto"),
        ml = xr(),
        Jg = "options.name must be either a string or a Buffer",
        dl = (0, pl.randomBytes)(16);
    dl[0] = dl[0] | 1;
    var Tn = {},
        $ = [];
    for (let e = 0; e < 256; e++) {
        let t = (e + 256).toString(16).substr(1);
        (Tn[t] = e), ($[e] = t);
    }
    var yt = class e {
        constructor(t) {
            (this.ascii = null), (this.binary = null);
            let r = e.check(t);
            if (!r) throw new Error("not a UUID");
            (this.version = r.version), r.format === "ascii" ? (this.ascii = t) : (this.binary = t);
        }
        static v5(t, r) {
            return Qg(t, "sha1", 80, r);
        }
        toString() {
            return this.ascii == null && (this.ascii = Zg(this.binary)), this.ascii;
        }
        inspect() {
            return `UUID v${this.version} ${this.toString()}`;
        }
        static check(t, r = 0) {
            if (typeof t == "string")
                return (
                    (t = t.toLowerCase()),
                    /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t)
                        ? t === "00000000-0000-0000-0000-000000000000"
                            ? { version: void 0, variant: "nil", format: "ascii" }
                            : {
                                  version: (Tn[t[14] + t[15]] & 240) >> 4,
                                  variant: hl((Tn[t[19] + t[20]] & 224) >> 5),
                                  format: "ascii"
                              }
                        : !1
                );
            if (Buffer.isBuffer(t)) {
                if (t.length < r + 16) return !1;
                let n = 0;
                for (; n < 16 && t[r + n] === 0; n++);
                return n === 16
                    ? { version: void 0, variant: "nil", format: "binary" }
                    : { version: (t[r + 6] & 240) >> 4, variant: hl((t[r + 8] & 224) >> 5), format: "binary" };
            }
            throw (0, ml.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
        }
        static parse(t) {
            let r = Buffer.allocUnsafe(16),
                n = 0;
            for (let i = 0; i < 16; i++) (r[i] = Tn[t[n++] + t[n++]]), (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
            return r;
        }
    };
    Vt.UUID = yt;
    yt.OID = yt.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
    function hl(e) {
        switch (e) {
            case 0:
            case 1:
            case 3:
                return "ncs";
            case 4:
            case 5:
                return "rfc4122";
            case 6:
                return "microsoft";
            default:
                return "future";
        }
    }
    var Or;
    (function (e) {
        (e[(e.ASCII = 0)] = "ASCII"), (e[(e.BINARY = 1)] = "BINARY"), (e[(e.OBJECT = 2)] = "OBJECT");
    })(Or || (Or = {}));
    function Qg(e, t, r, n, i = Or.ASCII) {
        let o = (0, pl.createHash)(t);
        if (typeof e != "string" && !Buffer.isBuffer(e)) throw (0, ml.newError)(Jg, "ERR_INVALID_UUID_NAME");
        o.update(n), o.update(e);
        let a = o.digest(),
            l;
        switch (i) {
            case Or.BINARY:
                (a[6] = (a[6] & 15) | r), (a[8] = (a[8] & 63) | 128), (l = a);
                break;
            case Or.OBJECT:
                (a[6] = (a[6] & 15) | r), (a[8] = (a[8] & 63) | 128), (l = new yt(a));
                break;
            default:
                l =
                    $[a[0]] +
                    $[a[1]] +
                    $[a[2]] +
                    $[a[3]] +
                    "-" +
                    $[a[4]] +
                    $[a[5]] +
                    "-" +
                    $[(a[6] & 15) | r] +
                    $[a[7]] +
                    "-" +
                    $[(a[8] & 63) | 128] +
                    $[a[9]] +
                    "-" +
                    $[a[10]] +
                    $[a[11]] +
                    $[a[12]] +
                    $[a[13]] +
                    $[a[14]] +
                    $[a[15]];
                break;
        }
        return l;
    }
    function Zg(e) {
        return (
            $[e[0]] +
            $[e[1]] +
            $[e[2]] +
            $[e[3]] +
            "-" +
            $[e[4]] +
            $[e[5]] +
            "-" +
            $[e[6]] +
            $[e[7]] +
            "-" +
            $[e[8]] +
            $[e[9]] +
            "-" +
            $[e[10]] +
            $[e[11]] +
            $[e[12]] +
            $[e[13]] +
            $[e[14]] +
            $[e[15]]
        );
    }
    Vt.nil = new yt("00000000-0000-0000-0000-000000000000");
});
var wl = g(Cn => {
    (function (e) {
        (e.parser = function (f, u) {
            return new r(f, u);
        }),
            (e.SAXParser = r),
            (e.SAXStream = h),
            (e.createStream = l),
            (e.MAX_BUFFER_LENGTH = 64 * 1024);
        var t = [
            "comment",
            "sgmlDecl",
            "textNode",
            "tagName",
            "doctype",
            "procInstName",
            "procInstBody",
            "entity",
            "attribName",
            "attribValue",
            "cdata",
            "script"
        ];
        e.EVENTS = [
            "text",
            "processinginstruction",
            "sgmldeclaration",
            "doctype",
            "comment",
            "opentagstart",
            "attribute",
            "opentag",
            "closetag",
            "opencdata",
            "cdata",
            "closecdata",
            "error",
            "end",
            "ready",
            "script",
            "opennamespace",
            "closenamespace"
        ];
        function r(f, u) {
            if (!(this instanceof r)) return new r(f, u);
            var S = this;
            i(S),
                (S.q = S.c = ""),
                (S.bufferCheckPosition = e.MAX_BUFFER_LENGTH),
                (S.opt = u || {}),
                (S.opt.lowercase = S.opt.lowercase || S.opt.lowercasetags),
                (S.looseCase = S.opt.lowercase ? "toLowerCase" : "toUpperCase"),
                (S.tags = []),
                (S.closed = S.closedRoot = S.sawRoot = !1),
                (S.tag = S.error = null),
                (S.strict = !!f),
                (S.noscript = !!(f || S.opt.noscript)),
                (S.state = E.BEGIN),
                (S.strictEntities = S.opt.strictEntities),
                (S.ENTITIES = S.strictEntities ? Object.create(e.XML_ENTITIES) : Object.create(e.ENTITIES)),
                (S.attribList = []),
                S.opt.xmlns && (S.ns = Object.create(y)),
                S.opt.unquotedAttributeValues === void 0 && (S.opt.unquotedAttributeValues = !f),
                (S.trackPosition = S.opt.position !== !1),
                S.trackPosition && (S.position = S.line = S.column = 0),
                U(S, "onready");
        }
        Object.create ||
            (Object.create = function (f) {
                function u() {}
                u.prototype = f;
                var S = new u();
                return S;
            }),
            Object.keys ||
                (Object.keys = function (f) {
                    var u = [];
                    for (var S in f) f.hasOwnProperty(S) && u.push(S);
                    return u;
                });
        function n(f) {
            for (var u = Math.max(e.MAX_BUFFER_LENGTH, 10), S = 0, w = 0, B = t.length; w < B; w++) {
                var te = f[t[w]].length;
                if (te > u)
                    switch (t[w]) {
                        case "textNode":
                            K(f);
                            break;
                        case "cdata":
                            R(f, "oncdata", f.cdata), (f.cdata = "");
                            break;
                        case "script":
                            R(f, "onscript", f.script), (f.script = "");
                            break;
                        default:
                            X(f, "Max buffer length exceeded: " + t[w]);
                    }
                S = Math.max(S, te);
            }
            var re = e.MAX_BUFFER_LENGTH - S;
            f.bufferCheckPosition = re + f.position;
        }
        function i(f) {
            for (var u = 0, S = t.length; u < S; u++) f[t[u]] = "";
        }
        function o(f) {
            K(f),
                f.cdata !== "" && (R(f, "oncdata", f.cdata), (f.cdata = "")),
                f.script !== "" && (R(f, "onscript", f.script), (f.script = ""));
        }
        r.prototype = {
            end: function () {
                G(this);
            },
            write: sg,
            resume: function () {
                return (this.error = null), this;
            },
            close: function () {
                return this.write(null);
            },
            flush: function () {
                o(this);
            }
        };
        var s;
        try {
            s = require("stream").Stream;
        } catch {
            s = function () {};
        }
        s || (s = function () {});
        var a = e.EVENTS.filter(function (f) {
            return f !== "error" && f !== "end";
        });
        function l(f, u) {
            return new h(f, u);
        }
        function h(f, u) {
            if (!(this instanceof h)) return new h(f, u);
            s.apply(this), (this._parser = new r(f, u)), (this.writable = !0), (this.readable = !0);
            var S = this;
            (this._parser.onend = function () {
                S.emit("end");
            }),
                (this._parser.onerror = function (w) {
                    S.emit("error", w), (S._parser.error = null);
                }),
                (this._decoder = null),
                a.forEach(function (w) {
                    Object.defineProperty(S, "on" + w, {
                        get: function () {
                            return S._parser["on" + w];
                        },
                        set: function (B) {
                            if (!B) return S.removeAllListeners(w), (S._parser["on" + w] = B), B;
                            S.on(w, B);
                        },
                        enumerable: !0,
                        configurable: !1
                    });
                });
        }
        (h.prototype = Object.create(s.prototype, { constructor: { value: h } })),
            (h.prototype.write = function (f) {
                if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(f)) {
                    if (!this._decoder) {
                        var u = require("string_decoder").StringDecoder;
                        this._decoder = new u("utf8");
                    }
                    f = this._decoder.write(f);
                }
                return this._parser.write(f.toString()), this.emit("data", f), !0;
            }),
            (h.prototype.end = function (f) {
                return f && f.length && this.write(f), this._parser.end(), !0;
            }),
            (h.prototype.on = function (f, u) {
                var S = this;
                return (
                    !S._parser["on" + f] &&
                        a.indexOf(f) !== -1 &&
                        (S._parser["on" + f] = function () {
                            var w = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
                            w.splice(0, 0, f), S.emit.apply(S, w);
                        }),
                    s.prototype.on.call(S, f, u)
                );
            });
        var c = "[CDATA[",
            d = "DOCTYPE",
            m = "http://www.w3.org/XML/1998/namespace",
            p = "http://www.w3.org/2000/xmlns/",
            y = { xml: m, xmlns: p },
            _ =
                /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
            v =
                /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/,
            x =
                /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
            A =
                /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
        function N(f) {
            return (
                f === " " ||
                f ===
                    `
` ||
                f === "\r" ||
                f === "	"
            );
        }
        function L(f) {
            return f === '"' || f === "'";
        }
        function De(f) {
            return f === ">" || N(f);
        }
        function V(f, u) {
            return f.test(u);
        }
        function se(f, u) {
            return !V(f, u);
        }
        var E = 0;
        (e.STATE = {
            BEGIN: E++,
            BEGIN_WHITESPACE: E++,
            TEXT: E++,
            TEXT_ENTITY: E++,
            OPEN_WAKA: E++,
            SGML_DECL: E++,
            SGML_DECL_QUOTED: E++,
            DOCTYPE: E++,
            DOCTYPE_QUOTED: E++,
            DOCTYPE_DTD: E++,
            DOCTYPE_DTD_QUOTED: E++,
            COMMENT_STARTING: E++,
            COMMENT: E++,
            COMMENT_ENDING: E++,
            COMMENT_ENDED: E++,
            CDATA: E++,
            CDATA_ENDING: E++,
            CDATA_ENDING_2: E++,
            PROC_INST: E++,
            PROC_INST_BODY: E++,
            PROC_INST_ENDING: E++,
            OPEN_TAG: E++,
            OPEN_TAG_SLASH: E++,
            ATTRIB: E++,
            ATTRIB_NAME: E++,
            ATTRIB_NAME_SAW_WHITE: E++,
            ATTRIB_VALUE: E++,
            ATTRIB_VALUE_QUOTED: E++,
            ATTRIB_VALUE_CLOSED: E++,
            ATTRIB_VALUE_UNQUOTED: E++,
            ATTRIB_VALUE_ENTITY_Q: E++,
            ATTRIB_VALUE_ENTITY_U: E++,
            CLOSE_TAG: E++,
            CLOSE_TAG_SAW_WHITE: E++,
            SCRIPT: E++,
            SCRIPT_ENDING: E++
        }),
            (e.XML_ENTITIES = { amp: "&", gt: ">", lt: "<", quot: '"', apos: "'" }),
            (e.ENTITIES = {
                amp: "&",
                gt: ">",
                lt: "<",
                quot: '"',
                apos: "'",
                AElig: 198,
                Aacute: 193,
                Acirc: 194,
                Agrave: 192,
                Aring: 197,
                Atilde: 195,
                Auml: 196,
                Ccedil: 199,
                ETH: 208,
                Eacute: 201,
                Ecirc: 202,
                Egrave: 200,
                Euml: 203,
                Iacute: 205,
                Icirc: 206,
                Igrave: 204,
                Iuml: 207,
                Ntilde: 209,
                Oacute: 211,
                Ocirc: 212,
                Ograve: 210,
                Oslash: 216,
                Otilde: 213,
                Ouml: 214,
                THORN: 222,
                Uacute: 218,
                Ucirc: 219,
                Ugrave: 217,
                Uuml: 220,
                Yacute: 221,
                aacute: 225,
                acirc: 226,
                aelig: 230,
                agrave: 224,
                aring: 229,
                atilde: 227,
                auml: 228,
                ccedil: 231,
                eacute: 233,
                ecirc: 234,
                egrave: 232,
                eth: 240,
                euml: 235,
                iacute: 237,
                icirc: 238,
                igrave: 236,
                iuml: 239,
                ntilde: 241,
                oacute: 243,
                ocirc: 244,
                ograve: 242,
                oslash: 248,
                otilde: 245,
                ouml: 246,
                szlig: 223,
                thorn: 254,
                uacute: 250,
                ucirc: 251,
                ugrave: 249,
                uuml: 252,
                yacute: 253,
                yuml: 255,
                copy: 169,
                reg: 174,
                nbsp: 160,
                iexcl: 161,
                cent: 162,
                pound: 163,
                curren: 164,
                yen: 165,
                brvbar: 166,
                sect: 167,
                uml: 168,
                ordf: 170,
                laquo: 171,
                not: 172,
                shy: 173,
                macr: 175,
                deg: 176,
                plusmn: 177,
                sup1: 185,
                sup2: 178,
                sup3: 179,
                acute: 180,
                micro: 181,
                para: 182,
                middot: 183,
                cedil: 184,
                ordm: 186,
                raquo: 187,
                frac14: 188,
                frac12: 189,
                frac34: 190,
                iquest: 191,
                times: 215,
                divide: 247,
                OElig: 338,
                oelig: 339,
                Scaron: 352,
                scaron: 353,
                Yuml: 376,
                fnof: 402,
                circ: 710,
                tilde: 732,
                Alpha: 913,
                Beta: 914,
                Gamma: 915,
                Delta: 916,
                Epsilon: 917,
                Zeta: 918,
                Eta: 919,
                Theta: 920,
                Iota: 921,
                Kappa: 922,
                Lambda: 923,
                Mu: 924,
                Nu: 925,
                Xi: 926,
                Omicron: 927,
                Pi: 928,
                Rho: 929,
                Sigma: 931,
                Tau: 932,
                Upsilon: 933,
                Phi: 934,
                Chi: 935,
                Psi: 936,
                Omega: 937,
                alpha: 945,
                beta: 946,
                gamma: 947,
                delta: 948,
                epsilon: 949,
                zeta: 950,
                eta: 951,
                theta: 952,
                iota: 953,
                kappa: 954,
                lambda: 955,
                mu: 956,
                nu: 957,
                xi: 958,
                omicron: 959,
                pi: 960,
                rho: 961,
                sigmaf: 962,
                sigma: 963,
                tau: 964,
                upsilon: 965,
                phi: 966,
                chi: 967,
                psi: 968,
                omega: 969,
                thetasym: 977,
                upsih: 978,
                piv: 982,
                ensp: 8194,
                emsp: 8195,
                thinsp: 8201,
                zwnj: 8204,
                zwj: 8205,
                lrm: 8206,
                rlm: 8207,
                ndash: 8211,
                mdash: 8212,
                lsquo: 8216,
                rsquo: 8217,
                sbquo: 8218,
                ldquo: 8220,
                rdquo: 8221,
                bdquo: 8222,
                dagger: 8224,
                Dagger: 8225,
                bull: 8226,
                hellip: 8230,
                permil: 8240,
                prime: 8242,
                Prime: 8243,
                lsaquo: 8249,
                rsaquo: 8250,
                oline: 8254,
                frasl: 8260,
                euro: 8364,
                image: 8465,
                weierp: 8472,
                real: 8476,
                trade: 8482,
                alefsym: 8501,
                larr: 8592,
                uarr: 8593,
                rarr: 8594,
                darr: 8595,
                harr: 8596,
                crarr: 8629,
                lArr: 8656,
                uArr: 8657,
                rArr: 8658,
                dArr: 8659,
                hArr: 8660,
                forall: 8704,
                part: 8706,
                exist: 8707,
                empty: 8709,
                nabla: 8711,
                isin: 8712,
                notin: 8713,
                ni: 8715,
                prod: 8719,
                sum: 8721,
                minus: 8722,
                lowast: 8727,
                radic: 8730,
                prop: 8733,
                infin: 8734,
                ang: 8736,
                and: 8743,
                or: 8744,
                cap: 8745,
                cup: 8746,
                int: 8747,
                there4: 8756,
                sim: 8764,
                cong: 8773,
                asymp: 8776,
                ne: 8800,
                equiv: 8801,
                le: 8804,
                ge: 8805,
                sub: 8834,
                sup: 8835,
                nsub: 8836,
                sube: 8838,
                supe: 8839,
                oplus: 8853,
                otimes: 8855,
                perp: 8869,
                sdot: 8901,
                lceil: 8968,
                rceil: 8969,
                lfloor: 8970,
                rfloor: 8971,
                lang: 9001,
                rang: 9002,
                loz: 9674,
                spades: 9824,
                clubs: 9827,
                hearts: 9829,
                diams: 9830
            }),
            Object.keys(e.ENTITIES).forEach(function (f) {
                var u = e.ENTITIES[f],
                    S = typeof u == "number" ? String.fromCharCode(u) : u;
                e.ENTITIES[f] = S;
            });
        for (var D in e.STATE) e.STATE[e.STATE[D]] = D;
        E = e.STATE;
        function U(f, u, S) {
            f[u] && f[u](S);
        }
        function R(f, u, S) {
            f.textNode && K(f), U(f, u, S);
        }
        function K(f) {
            (f.textNode = Z(f.opt, f.textNode)), f.textNode && U(f, "ontext", f.textNode), (f.textNode = "");
        }
        function Z(f, u) {
            return f.trim && (u = u.trim()), f.normalize && (u = u.replace(/\s+/g, " ")), u;
        }
        function X(f, u) {
            return (
                K(f),
                f.trackPosition &&
                    (u +=
                        `
Line: ` +
                        f.line +
                        `
Column: ` +
                        f.column +
                        `
Char: ` +
                        f.c),
                (u = new Error(u)),
                (f.error = u),
                U(f, "onerror", u),
                f
            );
        }
        function G(f) {
            return (
                f.sawRoot && !f.closedRoot && P(f, "Unclosed root tag"),
                f.state !== E.BEGIN && f.state !== E.BEGIN_WHITESPACE && f.state !== E.TEXT && X(f, "Unexpected end"),
                K(f),
                (f.c = ""),
                (f.closed = !0),
                U(f, "onend"),
                r.call(f, f.strict, f.opt),
                f
            );
        }
        function P(f, u) {
            if (typeof f != "object" || !(f instanceof r)) throw new Error("bad call to strictFail");
            f.strict && X(f, u);
        }
        function H(f) {
            f.strict || (f.tagName = f.tagName[f.looseCase]());
            var u = f.tags[f.tags.length - 1] || f,
                S = (f.tag = { name: f.tagName, attributes: {} });
            f.opt.xmlns && (S.ns = u.ns), (f.attribList.length = 0), R(f, "onopentagstart", S);
        }
        function Q(f, u) {
            var S = f.indexOf(":"),
                w = S < 0 ? ["", f] : f.split(":"),
                B = w[0],
                te = w[1];
            return u && f === "xmlns" && ((B = "xmlns"), (te = "")), { prefix: B, local: te };
        }
        function j(f) {
            if (
                (f.strict || (f.attribName = f.attribName[f.looseCase]()),
                f.attribList.indexOf(f.attribName) !== -1 || f.tag.attributes.hasOwnProperty(f.attribName))
            ) {
                f.attribName = f.attribValue = "";
                return;
            }
            if (f.opt.xmlns) {
                var u = Q(f.attribName, !0),
                    S = u.prefix,
                    w = u.local;
                if (S === "xmlns")
                    if (w === "xml" && f.attribValue !== m)
                        P(
                            f,
                            "xml: prefix must be bound to " +
                                m +
                                `
Actual: ` +
                                f.attribValue
                        );
                    else if (w === "xmlns" && f.attribValue !== p)
                        P(
                            f,
                            "xmlns: prefix must be bound to " +
                                p +
                                `
Actual: ` +
                                f.attribValue
                        );
                    else {
                        var B = f.tag,
                            te = f.tags[f.tags.length - 1] || f;
                        B.ns === te.ns && (B.ns = Object.create(te.ns)), (B.ns[w] = f.attribValue);
                    }
                f.attribList.push([f.attribName, f.attribValue]);
            } else
                (f.tag.attributes[f.attribName] = f.attribValue),
                    R(f, "onattribute", { name: f.attribName, value: f.attribValue });
            f.attribName = f.attribValue = "";
        }
        function Qe(f, u) {
            if (f.opt.xmlns) {
                var S = f.tag,
                    w = Q(f.tagName);
                (S.prefix = w.prefix),
                    (S.local = w.local),
                    (S.uri = S.ns[w.prefix] || ""),
                    S.prefix && !S.uri && (P(f, "Unbound namespace prefix: " + JSON.stringify(f.tagName)), (S.uri = w.prefix));
                var B = f.tags[f.tags.length - 1] || f;
                S.ns &&
                    B.ns !== S.ns &&
                    Object.keys(S.ns).forEach(function (Ga) {
                        R(f, "onopennamespace", { prefix: Ga, uri: S.ns[Ga] });
                    });
                for (var te = 0, re = f.attribList.length; te < re; te++) {
                    var Se = f.attribList[te],
                        Ae = Se[0],
                        kt = Se[1],
                        ae = Q(Ae, !0),
                        Ge = ae.prefix,
                        ag = ae.local,
                        Wa = Ge === "" ? "" : S.ns[Ge] || "",
                        Qi = { name: Ae, value: kt, prefix: Ge, local: ag, uri: Wa };
                    Ge && Ge !== "xmlns" && !Wa && (P(f, "Unbound namespace prefix: " + JSON.stringify(Ge)), (Qi.uri = Ge)),
                        (f.tag.attributes[Ae] = Qi),
                        R(f, "onattribute", Qi);
                }
                f.attribList.length = 0;
            }
            (f.tag.isSelfClosing = !!u),
                (f.sawRoot = !0),
                f.tags.push(f.tag),
                R(f, "onopentag", f.tag),
                u ||
                    (!f.noscript && f.tagName.toLowerCase() === "script" ? (f.state = E.SCRIPT) : (f.state = E.TEXT),
                    (f.tag = null),
                    (f.tagName = "")),
                (f.attribName = f.attribValue = ""),
                (f.attribList.length = 0);
        }
        function Ji(f) {
            if (!f.tagName) {
                P(f, "Weird empty close tag."), (f.textNode += "</>"), (f.state = E.TEXT);
                return;
            }
            if (f.script) {
                if (f.tagName !== "script") {
                    (f.script += "</" + f.tagName + ">"), (f.tagName = ""), (f.state = E.SCRIPT);
                    return;
                }
                R(f, "onscript", f.script), (f.script = "");
            }
            var u = f.tags.length,
                S = f.tagName;
            f.strict || (S = S[f.looseCase]());
            for (var w = S; u--; ) {
                var B = f.tags[u];
                if (B.name !== w) P(f, "Unexpected close tag");
                else break;
            }
            if (u < 0) {
                P(f, "Unmatched closing tag: " + f.tagName), (f.textNode += "</" + f.tagName + ">"), (f.state = E.TEXT);
                return;
            }
            f.tagName = S;
            for (var te = f.tags.length; te-- > u; ) {
                var re = (f.tag = f.tags.pop());
                (f.tagName = f.tag.name), R(f, "onclosetag", f.tagName);
                var Se = {};
                for (var Ae in re.ns) Se[Ae] = re.ns[Ae];
                var kt = f.tags[f.tags.length - 1] || f;
                f.opt.xmlns &&
                    re.ns !== kt.ns &&
                    Object.keys(re.ns).forEach(function (ae) {
                        var Ge = re.ns[ae];
                        R(f, "onclosenamespace", { prefix: ae, uri: Ge });
                    });
            }
            u === 0 && (f.closedRoot = !0),
                (f.tagName = f.attribValue = f.attribName = ""),
                (f.attribList.length = 0),
                (f.state = E.TEXT);
        }
        function og(f) {
            var u = f.entity,
                S = u.toLowerCase(),
                w,
                B = "";
            return f.ENTITIES[u]
                ? f.ENTITIES[u]
                : f.ENTITIES[S]
                ? f.ENTITIES[S]
                : ((u = S),
                  u.charAt(0) === "#" &&
                      (u.charAt(1) === "x"
                          ? ((u = u.slice(2)), (w = parseInt(u, 16)), (B = w.toString(16)))
                          : ((u = u.slice(1)), (w = parseInt(u, 10)), (B = w.toString(10)))),
                  (u = u.replace(/^0+/, "")),
                  isNaN(w) || B.toLowerCase() !== u
                      ? (P(f, "Invalid character entity"), "&" + f.entity + ";")
                      : String.fromCodePoint(w));
        }
        function Ha(f, u) {
            u === "<"
                ? ((f.state = E.OPEN_WAKA), (f.startTagPosition = f.position))
                : N(u) || (P(f, "Non-whitespace before first tag."), (f.textNode = u), (f.state = E.TEXT));
        }
        function ja(f, u) {
            var S = "";
            return u < f.length && (S = f.charAt(u)), S;
        }
        function sg(f) {
            var u = this;
            if (this.error) throw this.error;
            if (u.closed) return X(u, "Cannot write after close. Assign an onready handler.");
            if (f === null) return G(u);
            typeof f == "object" && (f = f.toString());
            for (var S = 0, w = ""; (w = ja(f, S++)), (u.c = w), !!w; )
                switch (
                    (u.trackPosition &&
                        (u.position++,
                        w ===
                        `
`
                            ? (u.line++, (u.column = 0))
                            : u.column++),
                    u.state)
                ) {
                    case E.BEGIN:
                        if (((u.state = E.BEGIN_WHITESPACE), w === "\uFEFF")) continue;
                        Ha(u, w);
                        continue;
                    case E.BEGIN_WHITESPACE:
                        Ha(u, w);
                        continue;
                    case E.TEXT:
                        if (u.sawRoot && !u.closedRoot) {
                            for (var B = S - 1; w && w !== "<" && w !== "&"; )
                                (w = ja(f, S++)),
                                    w &&
                                        u.trackPosition &&
                                        (u.position++,
                                        w ===
                                        `
`
                                            ? (u.line++, (u.column = 0))
                                            : u.column++);
                            u.textNode += f.substring(B, S - 1);
                        }
                        w === "<" && !(u.sawRoot && u.closedRoot && !u.strict)
                            ? ((u.state = E.OPEN_WAKA), (u.startTagPosition = u.position))
                            : (!N(w) && (!u.sawRoot || u.closedRoot) && P(u, "Text data outside of root node."),
                              w === "&" ? (u.state = E.TEXT_ENTITY) : (u.textNode += w));
                        continue;
                    case E.SCRIPT:
                        w === "<" ? (u.state = E.SCRIPT_ENDING) : (u.script += w);
                        continue;
                    case E.SCRIPT_ENDING:
                        w === "/" ? (u.state = E.CLOSE_TAG) : ((u.script += "<" + w), (u.state = E.SCRIPT));
                        continue;
                    case E.OPEN_WAKA:
                        if (w === "!") (u.state = E.SGML_DECL), (u.sgmlDecl = "");
                        else if (!N(w))
                            if (V(_, w)) (u.state = E.OPEN_TAG), (u.tagName = w);
                            else if (w === "/") (u.state = E.CLOSE_TAG), (u.tagName = "");
                            else if (w === "?") (u.state = E.PROC_INST), (u.procInstName = u.procInstBody = "");
                            else {
                                if ((P(u, "Unencoded <"), u.startTagPosition + 1 < u.position)) {
                                    var te = u.position - u.startTagPosition;
                                    w = new Array(te).join(" ") + w;
                                }
                                (u.textNode += "<" + w), (u.state = E.TEXT);
                            }
                        continue;
                    case E.SGML_DECL:
                        if (u.sgmlDecl + w === "--") {
                            (u.state = E.COMMENT), (u.comment = ""), (u.sgmlDecl = "");
                            continue;
                        }
                        u.doctype && u.doctype !== !0 && u.sgmlDecl
                            ? ((u.state = E.DOCTYPE_DTD), (u.doctype += "<!" + u.sgmlDecl + w), (u.sgmlDecl = ""))
                            : (u.sgmlDecl + w).toUpperCase() === c
                            ? (R(u, "onopencdata"), (u.state = E.CDATA), (u.sgmlDecl = ""), (u.cdata = ""))
                            : (u.sgmlDecl + w).toUpperCase() === d
                            ? ((u.state = E.DOCTYPE),
                              (u.doctype || u.sawRoot) && P(u, "Inappropriately located doctype declaration"),
                              (u.doctype = ""),
                              (u.sgmlDecl = ""))
                            : w === ">"
                            ? (R(u, "onsgmldeclaration", u.sgmlDecl), (u.sgmlDecl = ""), (u.state = E.TEXT))
                            : (L(w) && (u.state = E.SGML_DECL_QUOTED), (u.sgmlDecl += w));
                        continue;
                    case E.SGML_DECL_QUOTED:
                        w === u.q && ((u.state = E.SGML_DECL), (u.q = "")), (u.sgmlDecl += w);
                        continue;
                    case E.DOCTYPE:
                        w === ">"
                            ? ((u.state = E.TEXT), R(u, "ondoctype", u.doctype), (u.doctype = !0))
                            : ((u.doctype += w),
                              w === "[" ? (u.state = E.DOCTYPE_DTD) : L(w) && ((u.state = E.DOCTYPE_QUOTED), (u.q = w)));
                        continue;
                    case E.DOCTYPE_QUOTED:
                        (u.doctype += w), w === u.q && ((u.q = ""), (u.state = E.DOCTYPE));
                        continue;
                    case E.DOCTYPE_DTD:
                        w === "]"
                            ? ((u.doctype += w), (u.state = E.DOCTYPE))
                            : w === "<"
                            ? ((u.state = E.OPEN_WAKA), (u.startTagPosition = u.position))
                            : L(w)
                            ? ((u.doctype += w), (u.state = E.DOCTYPE_DTD_QUOTED), (u.q = w))
                            : (u.doctype += w);
                        continue;
                    case E.DOCTYPE_DTD_QUOTED:
                        (u.doctype += w), w === u.q && ((u.state = E.DOCTYPE_DTD), (u.q = ""));
                        continue;
                    case E.COMMENT:
                        w === "-" ? (u.state = E.COMMENT_ENDING) : (u.comment += w);
                        continue;
                    case E.COMMENT_ENDING:
                        w === "-"
                            ? ((u.state = E.COMMENT_ENDED),
                              (u.comment = Z(u.opt, u.comment)),
                              u.comment && R(u, "oncomment", u.comment),
                              (u.comment = ""))
                            : ((u.comment += "-" + w), (u.state = E.COMMENT));
                        continue;
                    case E.COMMENT_ENDED:
                        w !== ">"
                            ? (P(u, "Malformed comment"), (u.comment += "--" + w), (u.state = E.COMMENT))
                            : u.doctype && u.doctype !== !0
                            ? (u.state = E.DOCTYPE_DTD)
                            : (u.state = E.TEXT);
                        continue;
                    case E.CDATA:
                        w === "]" ? (u.state = E.CDATA_ENDING) : (u.cdata += w);
                        continue;
                    case E.CDATA_ENDING:
                        w === "]" ? (u.state = E.CDATA_ENDING_2) : ((u.cdata += "]" + w), (u.state = E.CDATA));
                        continue;
                    case E.CDATA_ENDING_2:
                        w === ">"
                            ? (u.cdata && R(u, "oncdata", u.cdata), R(u, "onclosecdata"), (u.cdata = ""), (u.state = E.TEXT))
                            : w === "]"
                            ? (u.cdata += "]")
                            : ((u.cdata += "]]" + w), (u.state = E.CDATA));
                        continue;
                    case E.PROC_INST:
                        w === "?" ? (u.state = E.PROC_INST_ENDING) : N(w) ? (u.state = E.PROC_INST_BODY) : (u.procInstName += w);
                        continue;
                    case E.PROC_INST_BODY:
                        if (!u.procInstBody && N(w)) continue;
                        w === "?" ? (u.state = E.PROC_INST_ENDING) : (u.procInstBody += w);
                        continue;
                    case E.PROC_INST_ENDING:
                        w === ">"
                            ? (R(u, "onprocessinginstruction", { name: u.procInstName, body: u.procInstBody }),
                              (u.procInstName = u.procInstBody = ""),
                              (u.state = E.TEXT))
                            : ((u.procInstBody += "?" + w), (u.state = E.PROC_INST_BODY));
                        continue;
                    case E.OPEN_TAG:
                        V(v, w)
                            ? (u.tagName += w)
                            : (H(u),
                              w === ">"
                                  ? Qe(u)
                                  : w === "/"
                                  ? (u.state = E.OPEN_TAG_SLASH)
                                  : (N(w) || P(u, "Invalid character in tag name"), (u.state = E.ATTRIB)));
                        continue;
                    case E.OPEN_TAG_SLASH:
                        w === ">"
                            ? (Qe(u, !0), Ji(u))
                            : (P(u, "Forward-slash in opening tag not followed by >"), (u.state = E.ATTRIB));
                        continue;
                    case E.ATTRIB:
                        if (N(w)) continue;
                        w === ">"
                            ? Qe(u)
                            : w === "/"
                            ? (u.state = E.OPEN_TAG_SLASH)
                            : V(_, w)
                            ? ((u.attribName = w), (u.attribValue = ""), (u.state = E.ATTRIB_NAME))
                            : P(u, "Invalid attribute name");
                        continue;
                    case E.ATTRIB_NAME:
                        w === "="
                            ? (u.state = E.ATTRIB_VALUE)
                            : w === ">"
                            ? (P(u, "Attribute without value"), (u.attribValue = u.attribName), j(u), Qe(u))
                            : N(w)
                            ? (u.state = E.ATTRIB_NAME_SAW_WHITE)
                            : V(v, w)
                            ? (u.attribName += w)
                            : P(u, "Invalid attribute name");
                        continue;
                    case E.ATTRIB_NAME_SAW_WHITE:
                        if (w === "=") u.state = E.ATTRIB_VALUE;
                        else {
                            if (N(w)) continue;
                            P(u, "Attribute without value"),
                                (u.tag.attributes[u.attribName] = ""),
                                (u.attribValue = ""),
                                R(u, "onattribute", { name: u.attribName, value: "" }),
                                (u.attribName = ""),
                                w === ">"
                                    ? Qe(u)
                                    : V(_, w)
                                    ? ((u.attribName = w), (u.state = E.ATTRIB_NAME))
                                    : (P(u, "Invalid attribute name"), (u.state = E.ATTRIB));
                        }
                        continue;
                    case E.ATTRIB_VALUE:
                        if (N(w)) continue;
                        L(w)
                            ? ((u.q = w), (u.state = E.ATTRIB_VALUE_QUOTED))
                            : (u.opt.unquotedAttributeValues || X(u, "Unquoted attribute value"),
                              (u.state = E.ATTRIB_VALUE_UNQUOTED),
                              (u.attribValue = w));
                        continue;
                    case E.ATTRIB_VALUE_QUOTED:
                        if (w !== u.q) {
                            w === "&" ? (u.state = E.ATTRIB_VALUE_ENTITY_Q) : (u.attribValue += w);
                            continue;
                        }
                        j(u), (u.q = ""), (u.state = E.ATTRIB_VALUE_CLOSED);
                        continue;
                    case E.ATTRIB_VALUE_CLOSED:
                        N(w)
                            ? (u.state = E.ATTRIB)
                            : w === ">"
                            ? Qe(u)
                            : w === "/"
                            ? (u.state = E.OPEN_TAG_SLASH)
                            : V(_, w)
                            ? (P(u, "No whitespace between attributes"),
                              (u.attribName = w),
                              (u.attribValue = ""),
                              (u.state = E.ATTRIB_NAME))
                            : P(u, "Invalid attribute name");
                        continue;
                    case E.ATTRIB_VALUE_UNQUOTED:
                        if (!De(w)) {
                            w === "&" ? (u.state = E.ATTRIB_VALUE_ENTITY_U) : (u.attribValue += w);
                            continue;
                        }
                        j(u), w === ">" ? Qe(u) : (u.state = E.ATTRIB);
                        continue;
                    case E.CLOSE_TAG:
                        if (u.tagName)
                            w === ">"
                                ? Ji(u)
                                : V(v, w)
                                ? (u.tagName += w)
                                : u.script
                                ? ((u.script += "</" + u.tagName), (u.tagName = ""), (u.state = E.SCRIPT))
                                : (N(w) || P(u, "Invalid tagname in closing tag"), (u.state = E.CLOSE_TAG_SAW_WHITE));
                        else {
                            if (N(w)) continue;
                            se(_, w)
                                ? u.script
                                    ? ((u.script += "</" + w), (u.state = E.SCRIPT))
                                    : P(u, "Invalid tagname in closing tag.")
                                : (u.tagName = w);
                        }
                        continue;
                    case E.CLOSE_TAG_SAW_WHITE:
                        if (N(w)) continue;
                        w === ">" ? Ji(u) : P(u, "Invalid characters in closing tag");
                        continue;
                    case E.TEXT_ENTITY:
                    case E.ATTRIB_VALUE_ENTITY_Q:
                    case E.ATTRIB_VALUE_ENTITY_U:
                        var re, Se;
                        switch (u.state) {
                            case E.TEXT_ENTITY:
                                (re = E.TEXT), (Se = "textNode");
                                break;
                            case E.ATTRIB_VALUE_ENTITY_Q:
                                (re = E.ATTRIB_VALUE_QUOTED), (Se = "attribValue");
                                break;
                            case E.ATTRIB_VALUE_ENTITY_U:
                                (re = E.ATTRIB_VALUE_UNQUOTED), (Se = "attribValue");
                                break;
                        }
                        if (w === ";") {
                            var Ae = og(u);
                            u.opt.unparsedEntities && !Object.values(e.XML_ENTITIES).includes(Ae)
                                ? ((u.entity = ""), (u.state = re), u.write(Ae))
                                : ((u[Se] += Ae), (u.entity = ""), (u.state = re));
                        } else
                            V(u.entity.length ? A : x, w)
                                ? (u.entity += w)
                                : (P(u, "Invalid character in entity name"),
                                  (u[Se] += "&" + u.entity + w),
                                  (u.entity = ""),
                                  (u.state = re));
                        continue;
                    default:
                        throw new Error(u, "Unknown state: " + u.state);
                }
            return u.position >= u.bufferCheckPosition && n(u), u;
        }
        /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */ String.fromCodePoint ||
            (function () {
                var f = String.fromCharCode,
                    u = Math.floor,
                    S = function () {
                        var w = 16384,
                            B = [],
                            te,
                            re,
                            Se = -1,
                            Ae = arguments.length;
                        if (!Ae) return "";
                        for (var kt = ""; ++Se < Ae; ) {
                            var ae = Number(arguments[Se]);
                            if (!isFinite(ae) || ae < 0 || ae > 1114111 || u(ae) !== ae)
                                throw RangeError("Invalid code point: " + ae);
                            ae <= 65535
                                ? B.push(ae)
                                : ((ae -= 65536), (te = (ae >> 10) + 55296), (re = (ae % 1024) + 56320), B.push(te, re)),
                                (Se + 1 === Ae || B.length > w) && ((kt += f.apply(null, B)), (B.length = 0));
                        }
                        return kt;
                    };
                Object.defineProperty
                    ? Object.defineProperty(String, "fromCodePoint", { value: S, configurable: !0, writable: !0 })
                    : (String.fromCodePoint = S);
            })();
    })(typeof Cn > "u" ? (Cn.sax = {}) : Cn);
});
var yl = g(Ir => {
    "use strict";
    Object.defineProperty(Ir, "__esModule", { value: !0 });
    Ir.XElement = void 0;
    Ir.parseXml = n0;
    var e0 = wl(),
        bn = xr(),
        On = class {
            constructor(t) {
                if (
                    ((this.name = t),
                    (this.value = ""),
                    (this.attributes = null),
                    (this.isCData = !1),
                    (this.elements = null),
                    !t)
                )
                    throw (0, bn.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
                if (!r0(t)) throw (0, bn.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
            }
            attribute(t) {
                let r = this.attributes === null ? null : this.attributes[t];
                if (r == null) throw (0, bn.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
                return r;
            }
            removeAttribute(t) {
                this.attributes !== null && delete this.attributes[t];
            }
            element(t, r = !1, n = null) {
                let i = this.elementOrNull(t, r);
                if (i === null) throw (0, bn.newError)(n || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
                return i;
            }
            elementOrNull(t, r = !1) {
                if (this.elements === null) return null;
                for (let n of this.elements) if (El(n, t, r)) return n;
                return null;
            }
            getElements(t, r = !1) {
                return this.elements === null ? [] : this.elements.filter(n => El(n, t, r));
            }
            elementValueOrEmpty(t, r = !1) {
                let n = this.elementOrNull(t, r);
                return n === null ? "" : n.value;
            }
        };
    Ir.XElement = On;
    var t0 = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
    function r0(e) {
        return t0.test(e);
    }
    function El(e, t, r) {
        let n = e.name;
        return n === t || (r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase());
    }
    function n0(e) {
        let t = null,
            r = e0.parser(!0, {}),
            n = [];
        return (
            (r.onopentag = i => {
                let o = new On(i.name);
                if (((o.attributes = i.attributes), t === null)) t = o;
                else {
                    let s = n[n.length - 1];
                    s.elements == null && (s.elements = []), s.elements.push(o);
                }
                n.push(o);
            }),
            (r.onclosetag = () => {
                n.pop();
            }),
            (r.ontext = i => {
                n.length > 0 && (n[n.length - 1].value = i);
            }),
            (r.oncdata = i => {
                let o = n[n.length - 1];
                (o.value = i), (o.isCData = !0);
            }),
            (r.onerror = i => {
                throw i;
            }),
            r.write(e),
            t
        );
    }
});
var vl = g(In => {
    "use strict";
    Object.defineProperty(In, "__esModule", { value: !0 });
    In.MemoLazy = void 0;
    var fo = class {
        constructor(t, r) {
            (this.selector = t), (this.creator = r), (this.selected = void 0), (this._value = void 0);
        }
        get hasValue() {
            return this._value !== void 0;
        }
        get value() {
            let t = this.selector();
            if (this._value !== void 0 && _l(this.selected, t)) return this._value;
            this.selected = t;
            let r = this.creator(t);
            return (this.value = r), r;
        }
        set value(t) {
            this._value = t;
        }
    };
    In.MemoLazy = fo;
    function _l(e, t) {
        if (typeof e == "object" && e !== null && typeof t == "object" && t !== null) {
            let i = Object.keys(e),
                o = Object.keys(t);
            return i.length === o.length && i.every(s => _l(e[s], t[s]));
        }
        return e === t;
    }
});
var ie = g(F => {
    "use strict";
    Object.defineProperty(F, "__esModule", { value: !0 });
    F.CURRENT_APP_PACKAGE_FILE_NAME =
        F.CURRENT_APP_INSTALLER_FILE_NAME =
        F.MemoLazy =
        F.newError =
        F.XElement =
        F.parseXml =
        F.ProgressCallbackTransform =
        F.UUID =
        F.parseDn =
        F.githubUrl =
        F.getS3LikeProviderBaseUrl =
        F.configureRequestUrl =
        F.parseJson =
        F.safeStringifyJson =
        F.configureRequestOptionsFromUrl =
        F.configureRequestOptions =
        F.safeGetHeader =
        F.DigestTransform =
        F.HttpExecutor =
        F.createHttpError =
        F.HttpError =
        F.CancellationError =
        F.CancellationToken =
            void 0;
    F.asArray = u0;
    var Sl = eo();
    Object.defineProperty(F, "CancellationToken", {
        enumerable: !0,
        get: function () {
            return Sl.CancellationToken;
        }
    });
    Object.defineProperty(F, "CancellationError", {
        enumerable: !0,
        get: function () {
            return Sl.CancellationError;
        }
    });
    var ke = ll();
    Object.defineProperty(F, "HttpError", {
        enumerable: !0,
        get: function () {
            return ke.HttpError;
        }
    });
    Object.defineProperty(F, "createHttpError", {
        enumerable: !0,
        get: function () {
            return ke.createHttpError;
        }
    });
    Object.defineProperty(F, "HttpExecutor", {
        enumerable: !0,
        get: function () {
            return ke.HttpExecutor;
        }
    });
    Object.defineProperty(F, "DigestTransform", {
        enumerable: !0,
        get: function () {
            return ke.DigestTransform;
        }
    });
    Object.defineProperty(F, "safeGetHeader", {
        enumerable: !0,
        get: function () {
            return ke.safeGetHeader;
        }
    });
    Object.defineProperty(F, "configureRequestOptions", {
        enumerable: !0,
        get: function () {
            return ke.configureRequestOptions;
        }
    });
    Object.defineProperty(F, "configureRequestOptionsFromUrl", {
        enumerable: !0,
        get: function () {
            return ke.configureRequestOptionsFromUrl;
        }
    });
    Object.defineProperty(F, "safeStringifyJson", {
        enumerable: !0,
        get: function () {
            return ke.safeStringifyJson;
        }
    });
    Object.defineProperty(F, "parseJson", {
        enumerable: !0,
        get: function () {
            return ke.parseJson;
        }
    });
    Object.defineProperty(F, "configureRequestUrl", {
        enumerable: !0,
        get: function () {
            return ke.configureRequestUrl;
        }
    });
    var Al = cl();
    Object.defineProperty(F, "getS3LikeProviderBaseUrl", {
        enumerable: !0,
        get: function () {
            return Al.getS3LikeProviderBaseUrl;
        }
    });
    Object.defineProperty(F, "githubUrl", {
        enumerable: !0,
        get: function () {
            return Al.githubUrl;
        }
    });
    var i0 = fl();
    Object.defineProperty(F, "parseDn", {
        enumerable: !0,
        get: function () {
            return i0.parseDn;
        }
    });
    var o0 = gl();
    Object.defineProperty(F, "UUID", {
        enumerable: !0,
        get: function () {
            return o0.UUID;
        }
    });
    var s0 = so();
    Object.defineProperty(F, "ProgressCallbackTransform", {
        enumerable: !0,
        get: function () {
            return s0.ProgressCallbackTransform;
        }
    });
    var xl = yl();
    Object.defineProperty(F, "parseXml", {
        enumerable: !0,
        get: function () {
            return xl.parseXml;
        }
    });
    Object.defineProperty(F, "XElement", {
        enumerable: !0,
        get: function () {
            return xl.XElement;
        }
    });
    var a0 = xr();
    Object.defineProperty(F, "newError", {
        enumerable: !0,
        get: function () {
            return a0.newError;
        }
    });
    var l0 = vl();
    Object.defineProperty(F, "MemoLazy", {
        enumerable: !0,
        get: function () {
            return l0.MemoLazy;
        }
    });
    F.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe";
    F.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function u0(e) {
        return e == null ? [] : Array.isArray(e) ? e : [e];
    }
});
var Re = g(ho => {
    "use strict";
    ho.fromCallback = function (e) {
        return Object.defineProperty(
            function (...t) {
                if (typeof t[t.length - 1] == "function") e.apply(this, t);
                else
                    return new Promise((r, n) => {
                        t.push((i, o) => (i != null ? n(i) : r(o))), e.apply(this, t);
                    });
            },
            "name",
            { value: e.name }
        );
    };
    ho.fromPromise = function (e) {
        return Object.defineProperty(
            function (...t) {
                let r = t[t.length - 1];
                if (typeof r != "function") return e.apply(this, t);
                t.pop(), e.apply(this, t).then(n => r(null, n), r);
            },
            "name",
            { value: e.name }
        );
    };
});
var Cl = g((Vb, Tl) => {
    var Ze = require("constants"),
        c0 = process.cwd,
        Nn = null,
        f0 = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function () {
        return Nn || (Nn = c0.call(process)), Nn;
    };
    try {
        process.cwd();
    } catch {}
    typeof process.chdir == "function" &&
        ((po = process.chdir),
        (process.chdir = function (e) {
            (Nn = null), po.call(process, e);
        }),
        Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, po));
    var po;
    Tl.exports = d0;
    function d0(e) {
        Ze.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e),
            e.lutimes || r(e),
            (e.chown = o(e.chown)),
            (e.fchown = o(e.fchown)),
            (e.lchown = o(e.lchown)),
            (e.chmod = n(e.chmod)),
            (e.fchmod = n(e.fchmod)),
            (e.lchmod = n(e.lchmod)),
            (e.chownSync = s(e.chownSync)),
            (e.fchownSync = s(e.fchownSync)),
            (e.lchownSync = s(e.lchownSync)),
            (e.chmodSync = i(e.chmodSync)),
            (e.fchmodSync = i(e.fchmodSync)),
            (e.lchmodSync = i(e.lchmodSync)),
            (e.stat = a(e.stat)),
            (e.fstat = a(e.fstat)),
            (e.lstat = a(e.lstat)),
            (e.statSync = l(e.statSync)),
            (e.fstatSync = l(e.fstatSync)),
            (e.lstatSync = l(e.lstatSync)),
            e.chmod &&
                !e.lchmod &&
                ((e.lchmod = function (c, d, m) {
                    m && process.nextTick(m);
                }),
                (e.lchmodSync = function () {})),
            e.chown &&
                !e.lchown &&
                ((e.lchown = function (c, d, m, p) {
                    p && process.nextTick(p);
                }),
                (e.lchownSync = function () {})),
            f0 === "win32" &&
                (e.rename =
                    typeof e.rename != "function"
                        ? e.rename
                        : (function (c) {
                              function d(m, p, y) {
                                  var _ = Date.now(),
                                      v = 0;
                                  c(m, p, function x(A) {
                                      if (
                                          A &&
                                          (A.code === "EACCES" || A.code === "EPERM" || A.code === "EBUSY") &&
                                          Date.now() - _ < 6e4
                                      ) {
                                          setTimeout(function () {
                                              e.stat(p, function (N, L) {
                                                  N && N.code === "ENOENT" ? c(m, p, x) : y(A);
                                              });
                                          }, v),
                                              v < 100 && (v += 10);
                                          return;
                                      }
                                      y && y(A);
                                  });
                              }
                              return Object.setPrototypeOf && Object.setPrototypeOf(d, c), d;
                          })(e.rename)),
            (e.read =
                typeof e.read != "function"
                    ? e.read
                    : (function (c) {
                          function d(m, p, y, _, v, x) {
                              var A;
                              if (x && typeof x == "function") {
                                  var N = 0;
                                  A = function (L, De, V) {
                                      if (L && L.code === "EAGAIN" && N < 10) return N++, c.call(e, m, p, y, _, v, A);
                                      x.apply(this, arguments);
                                  };
                              }
                              return c.call(e, m, p, y, _, v, A);
                          }
                          return Object.setPrototypeOf && Object.setPrototypeOf(d, c), d;
                      })(e.read)),
            (e.readSync =
                typeof e.readSync != "function"
                    ? e.readSync
                    : (function (c) {
                          return function (d, m, p, y, _) {
                              for (var v = 0; ; )
                                  try {
                                      return c.call(e, d, m, p, y, _);
                                  } catch (x) {
                                      if (x.code === "EAGAIN" && v < 10) {
                                          v++;
                                          continue;
                                      }
                                      throw x;
                                  }
                          };
                      })(e.readSync));
        function t(c) {
            (c.lchmod = function (d, m, p) {
                c.open(d, Ze.O_WRONLY | Ze.O_SYMLINK, m, function (y, _) {
                    if (y) {
                        p && p(y);
                        return;
                    }
                    c.fchmod(_, m, function (v) {
                        c.close(_, function (x) {
                            p && p(v || x);
                        });
                    });
                });
            }),
                (c.lchmodSync = function (d, m) {
                    var p = c.openSync(d, Ze.O_WRONLY | Ze.O_SYMLINK, m),
                        y = !0,
                        _;
                    try {
                        (_ = c.fchmodSync(p, m)), (y = !1);
                    } finally {
                        if (y)
                            try {
                                c.closeSync(p);
                            } catch {}
                        else c.closeSync(p);
                    }
                    return _;
                });
        }
        function r(c) {
            Ze.hasOwnProperty("O_SYMLINK") && c.futimes
                ? ((c.lutimes = function (d, m, p, y) {
                      c.open(d, Ze.O_SYMLINK, function (_, v) {
                          if (_) {
                              y && y(_);
                              return;
                          }
                          c.futimes(v, m, p, function (x) {
                              c.close(v, function (A) {
                                  y && y(x || A);
                              });
                          });
                      });
                  }),
                  (c.lutimesSync = function (d, m, p) {
                      var y = c.openSync(d, Ze.O_SYMLINK),
                          _,
                          v = !0;
                      try {
                          (_ = c.futimesSync(y, m, p)), (v = !1);
                      } finally {
                          if (v)
                              try {
                                  c.closeSync(y);
                              } catch {}
                          else c.closeSync(y);
                      }
                      return _;
                  }))
                : c.futimes &&
                  ((c.lutimes = function (d, m, p, y) {
                      y && process.nextTick(y);
                  }),
                  (c.lutimesSync = function () {}));
        }
        function n(c) {
            return (
                c &&
                function (d, m, p) {
                    return c.call(e, d, m, function (y) {
                        h(y) && (y = null), p && p.apply(this, arguments);
                    });
                }
            );
        }
        function i(c) {
            return (
                c &&
                function (d, m) {
                    try {
                        return c.call(e, d, m);
                    } catch (p) {
                        if (!h(p)) throw p;
                    }
                }
            );
        }
        function o(c) {
            return (
                c &&
                function (d, m, p, y) {
                    return c.call(e, d, m, p, function (_) {
                        h(_) && (_ = null), y && y.apply(this, arguments);
                    });
                }
            );
        }
        function s(c) {
            return (
                c &&
                function (d, m, p) {
                    try {
                        return c.call(e, d, m, p);
                    } catch (y) {
                        if (!h(y)) throw y;
                    }
                }
            );
        }
        function a(c) {
            return (
                c &&
                function (d, m, p) {
                    typeof m == "function" && ((p = m), (m = null));
                    function y(_, v) {
                        v && (v.uid < 0 && (v.uid += 4294967296), v.gid < 0 && (v.gid += 4294967296)),
                            p && p.apply(this, arguments);
                    }
                    return m ? c.call(e, d, m, y) : c.call(e, d, y);
                }
            );
        }
        function l(c) {
            return (
                c &&
                function (d, m) {
                    var p = m ? c.call(e, d, m) : c.call(e, d);
                    return p && (p.uid < 0 && (p.uid += 4294967296), p.gid < 0 && (p.gid += 4294967296)), p;
                }
            );
        }
        function h(c) {
            if (!c || c.code === "ENOSYS") return !0;
            var d = !process.getuid || process.getuid() !== 0;
            return !!(d && (c.code === "EINVAL" || c.code === "EPERM"));
        }
    }
});
var Il = g((Yb, Ol) => {
    var bl = require("stream").Stream;
    Ol.exports = h0;
    function h0(e) {
        return { ReadStream: t, WriteStream: r };
        function t(n, i) {
            if (!(this instanceof t)) return new t(n, i);
            bl.call(this);
            var o = this;
            (this.path = n),
                (this.fd = null),
                (this.readable = !0),
                (this.paused = !1),
                (this.flags = "r"),
                (this.mode = 438),
                (this.bufferSize = 64 * 1024),
                (i = i || {});
            for (var s = Object.keys(i), a = 0, l = s.length; a < l; a++) {
                var h = s[a];
                this[h] = i[h];
            }
            if ((this.encoding && this.setEncoding(this.encoding), this.start !== void 0)) {
                if (typeof this.start != "number") throw TypeError("start must be a Number");
                if (this.end === void 0) this.end = 1 / 0;
                else if (typeof this.end != "number") throw TypeError("end must be a Number");
                if (this.start > this.end) throw new Error("start must be <= end");
                this.pos = this.start;
            }
            if (this.fd !== null) {
                process.nextTick(function () {
                    o._read();
                });
                return;
            }
            e.open(this.path, this.flags, this.mode, function (c, d) {
                if (c) {
                    o.emit("error", c), (o.readable = !1);
                    return;
                }
                (o.fd = d), o.emit("open", d), o._read();
            });
        }
        function r(n, i) {
            if (!(this instanceof r)) return new r(n, i);
            bl.call(this),
                (this.path = n),
                (this.fd = null),
                (this.writable = !0),
                (this.flags = "w"),
                (this.encoding = "binary"),
                (this.mode = 438),
                (this.bytesWritten = 0),
                (i = i || {});
            for (var o = Object.keys(i), s = 0, a = o.length; s < a; s++) {
                var l = o[s];
                this[l] = i[l];
            }
            if (this.start !== void 0) {
                if (typeof this.start != "number") throw TypeError("start must be a Number");
                if (this.start < 0) throw new Error("start must be >= zero");
                this.pos = this.start;
            }
            (this.busy = !1),
                (this._queue = []),
                this.fd === null &&
                    ((this._open = e.open),
                    this._queue.push([this._open, this.path, this.flags, this.mode, void 0]),
                    this.flush());
        }
    }
});
var Rl = g((zb, Nl) => {
    "use strict";
    Nl.exports = m0;
    var p0 =
        Object.getPrototypeOf ||
        function (e) {
            return e.__proto__;
        };
    function m0(e) {
        if (e === null || typeof e != "object") return e;
        if (e instanceof Object) var t = { __proto__: p0(e) };
        else var t = Object.create(null);
        return (
            Object.getOwnPropertyNames(e).forEach(function (r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
            }),
            t
        );
    }
});
var we = g((Xb, wo) => {
    var J = require("fs"),
        g0 = Cl(),
        w0 = Il(),
        E0 = Rl(),
        Rn = require("util"),
        le,
        Pn;
    typeof Symbol == "function" && typeof Symbol.for == "function"
        ? ((le = Symbol.for("graceful-fs.queue")), (Pn = Symbol.for("graceful-fs.previous")))
        : ((le = "___graceful-fs.queue"), (Pn = "___graceful-fs.previous"));
    function y0() {}
    function Fl(e, t) {
        Object.defineProperty(e, le, {
            get: function () {
                return t;
            }
        });
    }
    var _t = y0;
    Rn.debuglog
        ? (_t = Rn.debuglog("gfs4"))
        : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
          (_t = function () {
              var e = Rn.format.apply(Rn, arguments);
              (e =
                  "GFS4: " +
                  e.split(/\n/).join(`
GFS4: `)),
                  console.error(e);
          });
    J[le] ||
        ((Dl = global[le] || []),
        Fl(J, Dl),
        (J.close = (function (e) {
            function t(r, n) {
                return e.call(J, r, function (i) {
                    i || Pl(), typeof n == "function" && n.apply(this, arguments);
                });
            }
            return Object.defineProperty(t, Pn, { value: e }), t;
        })(J.close)),
        (J.closeSync = (function (e) {
            function t(r) {
                e.apply(J, arguments), Pl();
            }
            return Object.defineProperty(t, Pn, { value: e }), t;
        })(J.closeSync)),
        /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
            process.on("exit", function () {
                _t(J[le]), require("assert").equal(J[le].length, 0);
            }));
    var Dl;
    global[le] || Fl(global, J[le]);
    wo.exports = mo(E0(J));
    process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !J.__patched && ((wo.exports = mo(J)), (J.__patched = !0));
    function mo(e) {
        g0(e), (e.gracefulify = mo), (e.createReadStream = De), (e.createWriteStream = V);
        var t = e.readFile;
        e.readFile = r;
        function r(D, U, R) {
            return typeof U == "function" && ((R = U), (U = null)), K(D, U, R);
            function K(Z, X, G, P) {
                return t(Z, X, function (H) {
                    H && (H.code === "EMFILE" || H.code === "ENFILE")
                        ? Yt([K, [Z, X, G], H, P || Date.now(), Date.now()])
                        : typeof G == "function" && G.apply(this, arguments);
                });
            }
        }
        var n = e.writeFile;
        e.writeFile = i;
        function i(D, U, R, K) {
            return typeof R == "function" && ((K = R), (R = null)), Z(D, U, R, K);
            function Z(X, G, P, H, Q) {
                return n(X, G, P, function (j) {
                    j && (j.code === "EMFILE" || j.code === "ENFILE")
                        ? Yt([Z, [X, G, P, H], j, Q || Date.now(), Date.now()])
                        : typeof H == "function" && H.apply(this, arguments);
                });
            }
        }
        var o = e.appendFile;
        o && (e.appendFile = s);
        function s(D, U, R, K) {
            return typeof R == "function" && ((K = R), (R = null)), Z(D, U, R, K);
            function Z(X, G, P, H, Q) {
                return o(X, G, P, function (j) {
                    j && (j.code === "EMFILE" || j.code === "ENFILE")
                        ? Yt([Z, [X, G, P, H], j, Q || Date.now(), Date.now()])
                        : typeof H == "function" && H.apply(this, arguments);
                });
            }
        }
        var a = e.copyFile;
        a && (e.copyFile = l);
        function l(D, U, R, K) {
            return typeof R == "function" && ((K = R), (R = 0)), Z(D, U, R, K);
            function Z(X, G, P, H, Q) {
                return a(X, G, P, function (j) {
                    j && (j.code === "EMFILE" || j.code === "ENFILE")
                        ? Yt([Z, [X, G, P, H], j, Q || Date.now(), Date.now()])
                        : typeof H == "function" && H.apply(this, arguments);
                });
            }
        }
        var h = e.readdir;
        e.readdir = d;
        var c = /^v[0-5]\./;
        function d(D, U, R) {
            typeof U == "function" && ((R = U), (U = null));
            var K = c.test(process.version)
                ? function (G, P, H, Q) {
                      return h(G, Z(G, P, H, Q));
                  }
                : function (G, P, H, Q) {
                      return h(G, P, Z(G, P, H, Q));
                  };
            return K(D, U, R);
            function Z(X, G, P, H) {
                return function (Q, j) {
                    Q && (Q.code === "EMFILE" || Q.code === "ENFILE")
                        ? Yt([K, [X, G, P], Q, H || Date.now(), Date.now()])
                        : (j && j.sort && j.sort(), typeof P == "function" && P.call(this, Q, j));
                };
            }
        }
        if (process.version.substr(0, 4) === "v0.8") {
            var m = w0(e);
            (x = m.ReadStream), (N = m.WriteStream);
        }
        var p = e.ReadStream;
        p && ((x.prototype = Object.create(p.prototype)), (x.prototype.open = A));
        var y = e.WriteStream;
        y && ((N.prototype = Object.create(y.prototype)), (N.prototype.open = L)),
            Object.defineProperty(e, "ReadStream", {
                get: function () {
                    return x;
                },
                set: function (D) {
                    x = D;
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e, "WriteStream", {
                get: function () {
                    return N;
                },
                set: function (D) {
                    N = D;
                },
                enumerable: !0,
                configurable: !0
            });
        var _ = x;
        Object.defineProperty(e, "FileReadStream", {
            get: function () {
                return _;
            },
            set: function (D) {
                _ = D;
            },
            enumerable: !0,
            configurable: !0
        });
        var v = N;
        Object.defineProperty(e, "FileWriteStream", {
            get: function () {
                return v;
            },
            set: function (D) {
                v = D;
            },
            enumerable: !0,
            configurable: !0
        });
        function x(D, U) {
            return this instanceof x ? (p.apply(this, arguments), this) : x.apply(Object.create(x.prototype), arguments);
        }
        function A() {
            var D = this;
            E(D.path, D.flags, D.mode, function (U, R) {
                U ? (D.autoClose && D.destroy(), D.emit("error", U)) : ((D.fd = R), D.emit("open", R), D.read());
            });
        }
        function N(D, U) {
            return this instanceof N ? (y.apply(this, arguments), this) : N.apply(Object.create(N.prototype), arguments);
        }
        function L() {
            var D = this;
            E(D.path, D.flags, D.mode, function (U, R) {
                U ? (D.destroy(), D.emit("error", U)) : ((D.fd = R), D.emit("open", R));
            });
        }
        function De(D, U) {
            return new e.ReadStream(D, U);
        }
        function V(D, U) {
            return new e.WriteStream(D, U);
        }
        var se = e.open;
        e.open = E;
        function E(D, U, R, K) {
            return typeof R == "function" && ((K = R), (R = null)), Z(D, U, R, K);
            function Z(X, G, P, H, Q) {
                return se(X, G, P, function (j, Qe) {
                    j && (j.code === "EMFILE" || j.code === "ENFILE")
                        ? Yt([Z, [X, G, P, H], j, Q || Date.now(), Date.now()])
                        : typeof H == "function" && H.apply(this, arguments);
                });
            }
        }
        return e;
    }
    function Yt(e) {
        _t("ENQUEUE", e[0].name, e[1]), J[le].push(e), go();
    }
    var Dn;
    function Pl() {
        for (var e = Date.now(), t = 0; t < J[le].length; ++t) J[le][t].length > 2 && ((J[le][t][3] = e), (J[le][t][4] = e));
        go();
    }
    function go() {
        if ((clearTimeout(Dn), (Dn = void 0), J[le].length !== 0)) {
            var e = J[le].shift(),
                t = e[0],
                r = e[1],
                n = e[2],
                i = e[3],
                o = e[4];
            if (i === void 0) _t("RETRY", t.name, r), t.apply(null, r);
            else if (Date.now() - i >= 6e4) {
                _t("TIMEOUT", t.name, r);
                var s = r.pop();
                typeof s == "function" && s.call(null, n);
            } else {
                var a = Date.now() - o,
                    l = Math.max(o - i, 1),
                    h = Math.min(l * 1.2, 100);
                a >= h ? (_t("RETRY", t.name, r), t.apply(null, r.concat([i]))) : J[le].push(e);
            }
            Dn === void 0 && (Dn = setTimeout(go, 0));
        }
    }
});
var vt = g(et => {
    "use strict";
    var ql = Re().fromCallback,
        Te = we(),
        _0 = [
            "access",
            "appendFile",
            "chmod",
            "chown",
            "close",
            "copyFile",
            "fchmod",
            "fchown",
            "fdatasync",
            "fstat",
            "fsync",
            "ftruncate",
            "futimes",
            "lchmod",
            "lchown",
            "link",
            "lstat",
            "mkdir",
            "mkdtemp",
            "open",
            "opendir",
            "readdir",
            "readFile",
            "readlink",
            "realpath",
            "rename",
            "rm",
            "rmdir",
            "stat",
            "symlink",
            "truncate",
            "unlink",
            "utimes",
            "writeFile"
        ].filter(e => typeof Te[e] == "function");
    Object.assign(et, Te);
    _0.forEach(e => {
        et[e] = ql(Te[e]);
    });
    et.exists = function (e, t) {
        return typeof t == "function" ? Te.exists(e, t) : new Promise(r => Te.exists(e, r));
    };
    et.read = function (e, t, r, n, i, o) {
        return typeof o == "function"
            ? Te.read(e, t, r, n, i, o)
            : new Promise((s, a) => {
                  Te.read(e, t, r, n, i, (l, h, c) => {
                      if (l) return a(l);
                      s({ bytesRead: h, buffer: c });
                  });
              });
    };
    et.write = function (e, t, ...r) {
        return typeof r[r.length - 1] == "function"
            ? Te.write(e, t, ...r)
            : new Promise((n, i) => {
                  Te.write(e, t, ...r, (o, s, a) => {
                      if (o) return i(o);
                      n({ bytesWritten: s, buffer: a });
                  });
              });
    };
    typeof Te.writev == "function" &&
        (et.writev = function (e, t, ...r) {
            return typeof r[r.length - 1] == "function"
                ? Te.writev(e, t, ...r)
                : new Promise((n, i) => {
                      Te.writev(e, t, ...r, (o, s, a) => {
                          if (o) return i(o);
                          n({ bytesWritten: s, buffers: a });
                      });
                  });
        });
    typeof Te.realpath.native == "function"
        ? (et.realpath.native = ql(Te.realpath.native))
        : process.emitWarning(
              "fs.realpath.native is not a function. Is fs being monkey-patched?",
              "Warning",
              "fs-extra-WARN0003"
          );
});
var Ul = g((Jb, Ll) => {
    "use strict";
    var v0 = require("path");
    Ll.exports.checkPath = function (t) {
        if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(v0.parse(t).root, ""))) {
            let n = new Error(`Path contains invalid characters: ${t}`);
            throw ((n.code = "EINVAL"), n);
        }
    };
});
var Bl = g((Qb, Eo) => {
    "use strict";
    var $l = vt(),
        { checkPath: kl } = Ul(),
        Ml = e => {
            let t = { mode: 511 };
            return typeof e == "number" ? e : { ...t, ...e }.mode;
        };
    Eo.exports.makeDir = async (e, t) => (kl(e), $l.mkdir(e, { mode: Ml(t), recursive: !0 }));
    Eo.exports.makeDirSync = (e, t) => (kl(e), $l.mkdirSync(e, { mode: Ml(t), recursive: !0 }));
});
var Ue = g((Zb, Hl) => {
    "use strict";
    var S0 = Re().fromPromise,
        { makeDir: A0, makeDirSync: yo } = Bl(),
        _o = S0(A0);
    Hl.exports = { mkdirs: _o, mkdirsSync: yo, mkdirp: _o, mkdirpSync: yo, ensureDir: _o, ensureDirSync: yo };
});
var tt = g((eO, Wl) => {
    "use strict";
    var x0 = Re().fromPromise,
        jl = vt();
    function T0(e) {
        return jl
            .access(e)
            .then(() => !0)
            .catch(() => !1);
    }
    Wl.exports = { pathExists: x0(T0), pathExistsSync: jl.existsSync };
});
var vo = g((tO, Gl) => {
    "use strict";
    var zt = we();
    function C0(e, t, r, n) {
        zt.open(e, "r+", (i, o) => {
            if (i) return n(i);
            zt.futimes(o, t, r, s => {
                zt.close(o, a => {
                    n && n(s || a);
                });
            });
        });
    }
    function b0(e, t, r) {
        let n = zt.openSync(e, "r+");
        return zt.futimesSync(n, t, r), zt.closeSync(n);
    }
    Gl.exports = { utimesMillis: C0, utimesMillisSync: b0 };
});
var St = g((rO, zl) => {
    "use strict";
    var Xt = vt(),
        oe = require("path"),
        O0 = require("util");
    function I0(e, t, r) {
        let n = r.dereference ? i => Xt.stat(i, { bigint: !0 }) : i => Xt.lstat(i, { bigint: !0 });
        return Promise.all([
            n(e),
            n(t).catch(i => {
                if (i.code === "ENOENT") return null;
                throw i;
            })
        ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
    }
    function N0(e, t, r) {
        let n,
            i = r.dereference ? s => Xt.statSync(s, { bigint: !0 }) : s => Xt.lstatSync(s, { bigint: !0 }),
            o = i(e);
        try {
            n = i(t);
        } catch (s) {
            if (s.code === "ENOENT") return { srcStat: o, destStat: null };
            throw s;
        }
        return { srcStat: o, destStat: n };
    }
    function R0(e, t, r, n, i) {
        O0.callbackify(I0)(e, t, n, (o, s) => {
            if (o) return i(o);
            let { srcStat: a, destStat: l } = s;
            if (l) {
                if (Nr(a, l)) {
                    let h = oe.basename(e),
                        c = oe.basename(t);
                    return r === "move" && h !== c && h.toLowerCase() === c.toLowerCase()
                        ? i(null, { srcStat: a, destStat: l, isChangingCase: !0 })
                        : i(new Error("Source and destination must not be the same."));
                }
                if (a.isDirectory() && !l.isDirectory())
                    return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
                if (!a.isDirectory() && l.isDirectory())
                    return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
            }
            return a.isDirectory() && So(e, t) ? i(new Error(Fn(e, t, r))) : i(null, { srcStat: a, destStat: l });
        });
    }
    function D0(e, t, r, n) {
        let { srcStat: i, destStat: o } = N0(e, t, n);
        if (o) {
            if (Nr(i, o)) {
                let s = oe.basename(e),
                    a = oe.basename(t);
                if (r === "move" && s !== a && s.toLowerCase() === a.toLowerCase())
                    return { srcStat: i, destStat: o, isChangingCase: !0 };
                throw new Error("Source and destination must not be the same.");
            }
            if (i.isDirectory() && !o.isDirectory())
                throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
            if (!i.isDirectory() && o.isDirectory())
                throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
        }
        if (i.isDirectory() && So(e, t)) throw new Error(Fn(e, t, r));
        return { srcStat: i, destStat: o };
    }
    function Vl(e, t, r, n, i) {
        let o = oe.resolve(oe.dirname(e)),
            s = oe.resolve(oe.dirname(r));
        if (s === o || s === oe.parse(s).root) return i();
        Xt.stat(s, { bigint: !0 }, (a, l) =>
            a ? (a.code === "ENOENT" ? i() : i(a)) : Nr(t, l) ? i(new Error(Fn(e, r, n))) : Vl(e, t, s, n, i)
        );
    }
    function Yl(e, t, r, n) {
        let i = oe.resolve(oe.dirname(e)),
            o = oe.resolve(oe.dirname(r));
        if (o === i || o === oe.parse(o).root) return;
        let s;
        try {
            s = Xt.statSync(o, { bigint: !0 });
        } catch (a) {
            if (a.code === "ENOENT") return;
            throw a;
        }
        if (Nr(t, s)) throw new Error(Fn(e, r, n));
        return Yl(e, t, o, n);
    }
    function Nr(e, t) {
        return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
    }
    function So(e, t) {
        let r = oe
                .resolve(e)
                .split(oe.sep)
                .filter(i => i),
            n = oe
                .resolve(t)
                .split(oe.sep)
                .filter(i => i);
        return r.reduce((i, o, s) => i && n[s] === o, !0);
    }
    function Fn(e, t, r) {
        return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
    }
    zl.exports = {
        checkPaths: R0,
        checkPathsSync: D0,
        checkParentPaths: Vl,
        checkParentPathsSync: Yl,
        isSrcSubdir: So,
        areIdentical: Nr
    };
});
var ru = g((nO, tu) => {
    "use strict";
    var Ce = we(),
        Rr = require("path"),
        P0 = Ue().mkdirs,
        F0 = tt().pathExists,
        q0 = vo().utimesMillis,
        Dr = St();
    function L0(e, t, r, n) {
        typeof r == "function" && !n ? ((n = r), (r = {})) : typeof r == "function" && (r = { filter: r }),
            (n = n || function () {}),
            (r = r || {}),
            (r.clobber = "clobber" in r ? !!r.clobber : !0),
            (r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber),
            r.preserveTimestamps &&
                process.arch === "ia32" &&
                process.emitWarning(
                    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
                    "Warning",
                    "fs-extra-WARN0001"
                ),
            Dr.checkPaths(e, t, "copy", r, (i, o) => {
                if (i) return n(i);
                let { srcStat: s, destStat: a } = o;
                Dr.checkParentPaths(e, s, t, "copy", l => (l ? n(l) : r.filter ? Jl(Xl, a, e, t, r, n) : Xl(a, e, t, r, n)));
            });
    }
    function Xl(e, t, r, n, i) {
        let o = Rr.dirname(r);
        F0(o, (s, a) => {
            if (s) return i(s);
            if (a) return qn(e, t, r, n, i);
            P0(o, l => (l ? i(l) : qn(e, t, r, n, i)));
        });
    }
    function Jl(e, t, r, n, i, o) {
        Promise.resolve(i.filter(r, n)).then(
            s => (s ? e(t, r, n, i, o) : o()),
            s => o(s)
        );
    }
    function U0(e, t, r, n, i) {
        return n.filter ? Jl(qn, e, t, r, n, i) : qn(e, t, r, n, i);
    }
    function qn(e, t, r, n, i) {
        (n.dereference ? Ce.stat : Ce.lstat)(t, (s, a) =>
            s
                ? i(s)
                : a.isDirectory()
                ? W0(a, e, t, r, n, i)
                : a.isFile() || a.isCharacterDevice() || a.isBlockDevice()
                ? $0(a, e, t, r, n, i)
                : a.isSymbolicLink()
                ? Y0(e, t, r, n, i)
                : a.isSocket()
                ? i(new Error(`Cannot copy a socket file: ${t}`))
                : a.isFIFO()
                ? i(new Error(`Cannot copy a FIFO pipe: ${t}`))
                : i(new Error(`Unknown file: ${t}`))
        );
    }
    function $0(e, t, r, n, i, o) {
        return t ? k0(e, r, n, i, o) : Ql(e, r, n, i, o);
    }
    function k0(e, t, r, n, i) {
        if (n.overwrite) Ce.unlink(r, o => (o ? i(o) : Ql(e, t, r, n, i)));
        else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
    }
    function Ql(e, t, r, n, i) {
        Ce.copyFile(t, r, o => (o ? i(o) : n.preserveTimestamps ? M0(e.mode, t, r, i) : Ln(r, e.mode, i)));
    }
    function M0(e, t, r, n) {
        return B0(e) ? H0(r, e, i => (i ? n(i) : Kl(e, t, r, n))) : Kl(e, t, r, n);
    }
    function B0(e) {
        return (e & 128) === 0;
    }
    function H0(e, t, r) {
        return Ln(e, t | 128, r);
    }
    function Kl(e, t, r, n) {
        j0(t, r, i => (i ? n(i) : Ln(r, e, n)));
    }
    function Ln(e, t, r) {
        return Ce.chmod(e, t, r);
    }
    function j0(e, t, r) {
        Ce.stat(e, (n, i) => (n ? r(n) : q0(t, i.atime, i.mtime, r)));
    }
    function W0(e, t, r, n, i, o) {
        return t ? Zl(r, n, i, o) : G0(e.mode, r, n, i, o);
    }
    function G0(e, t, r, n, i) {
        Ce.mkdir(r, o => {
            if (o) return i(o);
            Zl(t, r, n, s => (s ? i(s) : Ln(r, e, i)));
        });
    }
    function Zl(e, t, r, n) {
        Ce.readdir(e, (i, o) => (i ? n(i) : eu(o, e, t, r, n)));
    }
    function eu(e, t, r, n, i) {
        let o = e.pop();
        return o ? V0(e, o, t, r, n, i) : i();
    }
    function V0(e, t, r, n, i, o) {
        let s = Rr.join(r, t),
            a = Rr.join(n, t);
        Dr.checkPaths(s, a, "copy", i, (l, h) => {
            if (l) return o(l);
            let { destStat: c } = h;
            U0(c, s, a, i, d => (d ? o(d) : eu(e, r, n, i, o)));
        });
    }
    function Y0(e, t, r, n, i) {
        Ce.readlink(t, (o, s) => {
            if (o) return i(o);
            if ((n.dereference && (s = Rr.resolve(process.cwd(), s)), e))
                Ce.readlink(r, (a, l) =>
                    a
                        ? a.code === "EINVAL" || a.code === "UNKNOWN"
                            ? Ce.symlink(s, r, i)
                            : i(a)
                        : (n.dereference && (l = Rr.resolve(process.cwd(), l)),
                          Dr.isSrcSubdir(s, l)
                              ? i(new Error(`Cannot copy '${s}' to a subdirectory of itself, '${l}'.`))
                              : e.isDirectory() && Dr.isSrcSubdir(l, s)
                              ? i(new Error(`Cannot overwrite '${l}' with '${s}'.`))
                              : z0(s, r, i))
                );
            else return Ce.symlink(s, r, i);
        });
    }
    function z0(e, t, r) {
        Ce.unlink(t, n => (n ? r(n) : Ce.symlink(e, t, r)));
    }
    tu.exports = L0;
});
var au = g((iO, su) => {
    "use strict";
    var ce = we(),
        Pr = require("path"),
        X0 = Ue().mkdirsSync,
        K0 = vo().utimesMillisSync,
        Fr = St();
    function J0(e, t, r) {
        typeof r == "function" && (r = { filter: r }),
            (r = r || {}),
            (r.clobber = "clobber" in r ? !!r.clobber : !0),
            (r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber),
            r.preserveTimestamps &&
                process.arch === "ia32" &&
                process.emitWarning(
                    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
                    "Warning",
                    "fs-extra-WARN0002"
                );
        let { srcStat: n, destStat: i } = Fr.checkPathsSync(e, t, "copy", r);
        return Fr.checkParentPathsSync(e, n, t, "copy"), Q0(i, e, t, r);
    }
    function Q0(e, t, r, n) {
        if (n.filter && !n.filter(t, r)) return;
        let i = Pr.dirname(r);
        return ce.existsSync(i) || X0(i), nu(e, t, r, n);
    }
    function Z0(e, t, r, n) {
        if (!(n.filter && !n.filter(t, r))) return nu(e, t, r, n);
    }
    function nu(e, t, r, n) {
        let o = (n.dereference ? ce.statSync : ce.lstatSync)(t);
        if (o.isDirectory()) return sw(o, e, t, r, n);
        if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return ew(o, e, t, r, n);
        if (o.isSymbolicLink()) return uw(e, t, r, n);
        throw o.isSocket()
            ? new Error(`Cannot copy a socket file: ${t}`)
            : o.isFIFO()
            ? new Error(`Cannot copy a FIFO pipe: ${t}`)
            : new Error(`Unknown file: ${t}`);
    }
    function ew(e, t, r, n, i) {
        return t ? tw(e, r, n, i) : iu(e, r, n, i);
    }
    function tw(e, t, r, n) {
        if (n.overwrite) return ce.unlinkSync(r), iu(e, t, r, n);
        if (n.errorOnExist) throw new Error(`'${r}' already exists`);
    }
    function iu(e, t, r, n) {
        return ce.copyFileSync(t, r), n.preserveTimestamps && rw(e.mode, t, r), Ao(r, e.mode);
    }
    function rw(e, t, r) {
        return nw(e) && iw(r, e), ow(t, r);
    }
    function nw(e) {
        return (e & 128) === 0;
    }
    function iw(e, t) {
        return Ao(e, t | 128);
    }
    function Ao(e, t) {
        return ce.chmodSync(e, t);
    }
    function ow(e, t) {
        let r = ce.statSync(e);
        return K0(t, r.atime, r.mtime);
    }
    function sw(e, t, r, n, i) {
        return t ? ou(r, n, i) : aw(e.mode, r, n, i);
    }
    function aw(e, t, r, n) {
        return ce.mkdirSync(r), ou(t, r, n), Ao(r, e);
    }
    function ou(e, t, r) {
        ce.readdirSync(e).forEach(n => lw(n, e, t, r));
    }
    function lw(e, t, r, n) {
        let i = Pr.join(t, e),
            o = Pr.join(r, e),
            { destStat: s } = Fr.checkPathsSync(i, o, "copy", n);
        return Z0(s, i, o, n);
    }
    function uw(e, t, r, n) {
        let i = ce.readlinkSync(t);
        if ((n.dereference && (i = Pr.resolve(process.cwd(), i)), e)) {
            let o;
            try {
                o = ce.readlinkSync(r);
            } catch (s) {
                if (s.code === "EINVAL" || s.code === "UNKNOWN") return ce.symlinkSync(i, r);
                throw s;
            }
            if ((n.dereference && (o = Pr.resolve(process.cwd(), o)), Fr.isSrcSubdir(i, o)))
                throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
            if (ce.statSync(r).isDirectory() && Fr.isSrcSubdir(o, i)) throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
            return cw(i, r);
        } else return ce.symlinkSync(i, r);
    }
    function cw(e, t) {
        return ce.unlinkSync(t), ce.symlinkSync(e, t);
    }
    su.exports = J0;
});
var Un = g((oO, lu) => {
    "use strict";
    var fw = Re().fromCallback;
    lu.exports = { copy: fw(ru()), copySync: au() };
});
var wu = g((sO, gu) => {
    "use strict";
    var uu = we(),
        hu = require("path"),
        W = require("assert"),
        qr = process.platform === "win32";
    function pu(e) {
        ["unlink", "chmod", "stat", "lstat", "rmdir", "readdir"].forEach(r => {
            (e[r] = e[r] || uu[r]), (r = r + "Sync"), (e[r] = e[r] || uu[r]);
        }),
            (e.maxBusyTries = e.maxBusyTries || 3);
    }
    function xo(e, t, r) {
        let n = 0;
        typeof t == "function" && ((r = t), (t = {})),
            W(e, "rimraf: missing path"),
            W.strictEqual(typeof e, "string", "rimraf: path should be a string"),
            W.strictEqual(typeof r, "function", "rimraf: callback function required"),
            W(t, "rimraf: invalid options argument provided"),
            W.strictEqual(typeof t, "object", "rimraf: options should be object"),
            pu(t),
            cu(e, t, function i(o) {
                if (o) {
                    if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && n < t.maxBusyTries) {
                        n++;
                        let s = n * 100;
                        return setTimeout(() => cu(e, t, i), s);
                    }
                    o.code === "ENOENT" && (o = null);
                }
                r(o);
            });
    }
    function cu(e, t, r) {
        W(e),
            W(t),
            W(typeof r == "function"),
            t.lstat(e, (n, i) => {
                if (n && n.code === "ENOENT") return r(null);
                if (n && n.code === "EPERM" && qr) return fu(e, t, n, r);
                if (i && i.isDirectory()) return $n(e, t, n, r);
                t.unlink(e, o => {
                    if (o) {
                        if (o.code === "ENOENT") return r(null);
                        if (o.code === "EPERM") return qr ? fu(e, t, o, r) : $n(e, t, o, r);
                        if (o.code === "EISDIR") return $n(e, t, o, r);
                    }
                    return r(o);
                });
            });
    }
    function fu(e, t, r, n) {
        W(e),
            W(t),
            W(typeof n == "function"),
            t.chmod(e, 438, i => {
                i
                    ? n(i.code === "ENOENT" ? null : r)
                    : t.stat(e, (o, s) => {
                          o ? n(o.code === "ENOENT" ? null : r) : s.isDirectory() ? $n(e, t, r, n) : t.unlink(e, n);
                      });
            });
    }
    function du(e, t, r) {
        let n;
        W(e), W(t);
        try {
            t.chmodSync(e, 438);
        } catch (i) {
            if (i.code === "ENOENT") return;
            throw r;
        }
        try {
            n = t.statSync(e);
        } catch (i) {
            if (i.code === "ENOENT") return;
            throw r;
        }
        n.isDirectory() ? kn(e, t, r) : t.unlinkSync(e);
    }
    function $n(e, t, r, n) {
        W(e),
            W(t),
            W(typeof n == "function"),
            t.rmdir(e, i => {
                i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM")
                    ? dw(e, t, n)
                    : i && i.code === "ENOTDIR"
                    ? n(r)
                    : n(i);
            });
    }
    function dw(e, t, r) {
        W(e),
            W(t),
            W(typeof r == "function"),
            t.readdir(e, (n, i) => {
                if (n) return r(n);
                let o = i.length,
                    s;
                if (o === 0) return t.rmdir(e, r);
                i.forEach(a => {
                    xo(hu.join(e, a), t, l => {
                        if (!s) {
                            if (l) return r((s = l));
                            --o === 0 && t.rmdir(e, r);
                        }
                    });
                });
            });
    }
    function mu(e, t) {
        let r;
        (t = t || {}),
            pu(t),
            W(e, "rimraf: missing path"),
            W.strictEqual(typeof e, "string", "rimraf: path should be a string"),
            W(t, "rimraf: missing options"),
            W.strictEqual(typeof t, "object", "rimraf: options should be object");
        try {
            r = t.lstatSync(e);
        } catch (n) {
            if (n.code === "ENOENT") return;
            n.code === "EPERM" && qr && du(e, t, n);
        }
        try {
            r && r.isDirectory() ? kn(e, t, null) : t.unlinkSync(e);
        } catch (n) {
            if (n.code === "ENOENT") return;
            if (n.code === "EPERM") return qr ? du(e, t, n) : kn(e, t, n);
            if (n.code !== "EISDIR") throw n;
            kn(e, t, n);
        }
    }
    function kn(e, t, r) {
        W(e), W(t);
        try {
            t.rmdirSync(e);
        } catch (n) {
            if (n.code === "ENOTDIR") throw r;
            if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM") hw(e, t);
            else if (n.code !== "ENOENT") throw n;
        }
    }
    function hw(e, t) {
        if ((W(e), W(t), t.readdirSync(e).forEach(r => mu(hu.join(e, r), t)), qr)) {
            let r = Date.now();
            do
                try {
                    return t.rmdirSync(e, t);
                } catch {}
            while (Date.now() - r < 500);
        } else return t.rmdirSync(e, t);
    }
    gu.exports = xo;
    xo.sync = mu;
});
var Lr = g((aO, yu) => {
    "use strict";
    var Mn = we(),
        pw = Re().fromCallback,
        Eu = wu();
    function mw(e, t) {
        if (Mn.rm) return Mn.rm(e, { recursive: !0, force: !0 }, t);
        Eu(e, t);
    }
    function gw(e) {
        if (Mn.rmSync) return Mn.rmSync(e, { recursive: !0, force: !0 });
        Eu.sync(e);
    }
    yu.exports = { remove: pw(mw), removeSync: gw };
});
var bu = g((lO, Cu) => {
    "use strict";
    var ww = Re().fromPromise,
        Su = vt(),
        Au = require("path"),
        xu = Ue(),
        Tu = Lr(),
        _u = ww(async function (t) {
            let r;
            try {
                r = await Su.readdir(t);
            } catch {
                return xu.mkdirs(t);
            }
            return Promise.all(r.map(n => Tu.remove(Au.join(t, n))));
        });
    function vu(e) {
        let t;
        try {
            t = Su.readdirSync(e);
        } catch {
            return xu.mkdirsSync(e);
        }
        t.forEach(r => {
            (r = Au.join(e, r)), Tu.removeSync(r);
        });
    }
    Cu.exports = { emptyDirSync: vu, emptydirSync: vu, emptyDir: _u, emptydir: _u };
});
var Ru = g((uO, Nu) => {
    "use strict";
    var Ew = Re().fromCallback,
        Ou = require("path"),
        rt = we(),
        Iu = Ue();
    function yw(e, t) {
        function r() {
            rt.writeFile(e, "", n => {
                if (n) return t(n);
                t();
            });
        }
        rt.stat(e, (n, i) => {
            if (!n && i.isFile()) return t();
            let o = Ou.dirname(e);
            rt.stat(o, (s, a) => {
                if (s)
                    return s.code === "ENOENT"
                        ? Iu.mkdirs(o, l => {
                              if (l) return t(l);
                              r();
                          })
                        : t(s);
                a.isDirectory()
                    ? r()
                    : rt.readdir(o, l => {
                          if (l) return t(l);
                      });
            });
        });
    }
    function _w(e) {
        let t;
        try {
            t = rt.statSync(e);
        } catch {}
        if (t && t.isFile()) return;
        let r = Ou.dirname(e);
        try {
            rt.statSync(r).isDirectory() || rt.readdirSync(r);
        } catch (n) {
            if (n && n.code === "ENOENT") Iu.mkdirsSync(r);
            else throw n;
        }
        rt.writeFileSync(e, "");
    }
    Nu.exports = { createFile: Ew(yw), createFileSync: _w };
});
var Lu = g((cO, qu) => {
    "use strict";
    var vw = Re().fromCallback,
        Du = require("path"),
        nt = we(),
        Pu = Ue(),
        Sw = tt().pathExists,
        { areIdentical: Fu } = St();
    function Aw(e, t, r) {
        function n(i, o) {
            nt.link(i, o, s => {
                if (s) return r(s);
                r(null);
            });
        }
        nt.lstat(t, (i, o) => {
            nt.lstat(e, (s, a) => {
                if (s) return (s.message = s.message.replace("lstat", "ensureLink")), r(s);
                if (o && Fu(a, o)) return r(null);
                let l = Du.dirname(t);
                Sw(l, (h, c) => {
                    if (h) return r(h);
                    if (c) return n(e, t);
                    Pu.mkdirs(l, d => {
                        if (d) return r(d);
                        n(e, t);
                    });
                });
            });
        });
    }
    function xw(e, t) {
        let r;
        try {
            r = nt.lstatSync(t);
        } catch {}
        try {
            let o = nt.lstatSync(e);
            if (r && Fu(o, r)) return;
        } catch (o) {
            throw ((o.message = o.message.replace("lstat", "ensureLink")), o);
        }
        let n = Du.dirname(t);
        return nt.existsSync(n) || Pu.mkdirsSync(n), nt.linkSync(e, t);
    }
    qu.exports = { createLink: vw(Aw), createLinkSync: xw };
});
var $u = g((fO, Uu) => {
    "use strict";
    var it = require("path"),
        Ur = we(),
        Tw = tt().pathExists;
    function Cw(e, t, r) {
        if (it.isAbsolute(e))
            return Ur.lstat(e, n =>
                n ? ((n.message = n.message.replace("lstat", "ensureSymlink")), r(n)) : r(null, { toCwd: e, toDst: e })
            );
        {
            let n = it.dirname(t),
                i = it.join(n, e);
            return Tw(i, (o, s) =>
                o
                    ? r(o)
                    : s
                    ? r(null, { toCwd: i, toDst: e })
                    : Ur.lstat(e, a =>
                          a
                              ? ((a.message = a.message.replace("lstat", "ensureSymlink")), r(a))
                              : r(null, { toCwd: e, toDst: it.relative(n, e) })
                      )
            );
        }
    }
    function bw(e, t) {
        let r;
        if (it.isAbsolute(e)) {
            if (((r = Ur.existsSync(e)), !r)) throw new Error("absolute srcpath does not exist");
            return { toCwd: e, toDst: e };
        } else {
            let n = it.dirname(t),
                i = it.join(n, e);
            if (((r = Ur.existsSync(i)), r)) return { toCwd: i, toDst: e };
            if (((r = Ur.existsSync(e)), !r)) throw new Error("relative srcpath does not exist");
            return { toCwd: e, toDst: it.relative(n, e) };
        }
    }
    Uu.exports = { symlinkPaths: Cw, symlinkPathsSync: bw };
});
var Bu = g((dO, Mu) => {
    "use strict";
    var ku = we();
    function Ow(e, t, r) {
        if (((r = typeof t == "function" ? t : r), (t = typeof t == "function" ? !1 : t), t)) return r(null, t);
        ku.lstat(e, (n, i) => {
            if (n) return r(null, "file");
            (t = i && i.isDirectory() ? "dir" : "file"), r(null, t);
        });
    }
    function Iw(e, t) {
        let r;
        if (t) return t;
        try {
            r = ku.lstatSync(e);
        } catch {
            return "file";
        }
        return r && r.isDirectory() ? "dir" : "file";
    }
    Mu.exports = { symlinkType: Ow, symlinkTypeSync: Iw };
});
var Xu = g((hO, zu) => {
    "use strict";
    var Nw = Re().fromCallback,
        ju = require("path"),
        $e = vt(),
        Wu = Ue(),
        Rw = Wu.mkdirs,
        Dw = Wu.mkdirsSync,
        Gu = $u(),
        Pw = Gu.symlinkPaths,
        Fw = Gu.symlinkPathsSync,
        Vu = Bu(),
        qw = Vu.symlinkType,
        Lw = Vu.symlinkTypeSync,
        Uw = tt().pathExists,
        { areIdentical: Yu } = St();
    function $w(e, t, r, n) {
        (n = typeof r == "function" ? r : n),
            (r = typeof r == "function" ? !1 : r),
            $e.lstat(t, (i, o) => {
                !i && o.isSymbolicLink()
                    ? Promise.all([$e.stat(e), $e.stat(t)]).then(([s, a]) => {
                          if (Yu(s, a)) return n(null);
                          Hu(e, t, r, n);
                      })
                    : Hu(e, t, r, n);
            });
    }
    function Hu(e, t, r, n) {
        Pw(e, t, (i, o) => {
            if (i) return n(i);
            (e = o.toDst),
                qw(o.toCwd, r, (s, a) => {
                    if (s) return n(s);
                    let l = ju.dirname(t);
                    Uw(l, (h, c) => {
                        if (h) return n(h);
                        if (c) return $e.symlink(e, t, a, n);
                        Rw(l, d => {
                            if (d) return n(d);
                            $e.symlink(e, t, a, n);
                        });
                    });
                });
        });
    }
    function kw(e, t, r) {
        let n;
        try {
            n = $e.lstatSync(t);
        } catch {}
        if (n && n.isSymbolicLink()) {
            let a = $e.statSync(e),
                l = $e.statSync(t);
            if (Yu(a, l)) return;
        }
        let i = Fw(e, t);
        (e = i.toDst), (r = Lw(i.toCwd, r));
        let o = ju.dirname(t);
        return $e.existsSync(o) || Dw(o), $e.symlinkSync(e, t, r);
    }
    zu.exports = { createSymlink: Nw($w), createSymlinkSync: kw };
});
var nc = g((pO, rc) => {
    "use strict";
    var { createFile: Ku, createFileSync: Ju } = Ru(),
        { createLink: Qu, createLinkSync: Zu } = Lu(),
        { createSymlink: ec, createSymlinkSync: tc } = Xu();
    rc.exports = {
        createFile: Ku,
        createFileSync: Ju,
        ensureFile: Ku,
        ensureFileSync: Ju,
        createLink: Qu,
        createLinkSync: Zu,
        ensureLink: Qu,
        ensureLinkSync: Zu,
        createSymlink: ec,
        createSymlinkSync: tc,
        ensureSymlink: ec,
        ensureSymlinkSync: tc
    };
});
var ic = g(To => {
    "use strict";
    To.fromCallback = function (e) {
        return Object.defineProperty(
            function () {
                if (typeof arguments[arguments.length - 1] == "function") e.apply(this, arguments);
                else
                    return new Promise((t, r) => {
                        (arguments[arguments.length] = (n, i) => {
                            if (n) return r(n);
                            t(i);
                        }),
                            arguments.length++,
                            e.apply(this, arguments);
                    });
            },
            "name",
            { value: e.name }
        );
    };
    To.fromPromise = function (e) {
        return Object.defineProperty(
            function () {
                let t = arguments[arguments.length - 1];
                if (typeof t != "function") return e.apply(this, arguments);
                e.apply(this, arguments).then(r => t(null, r), t);
            },
            "name",
            { value: e.name }
        );
    };
});
var Bn = g((gO, oc) => {
    function Mw(
        e,
        {
            EOL: t = `
`,
            finalEOL: r = !0,
            replacer: n = null,
            spaces: i
        } = {}
    ) {
        let o = r ? t : "";
        return JSON.stringify(e, n, i).replace(/\n/g, t) + o;
    }
    function Bw(e) {
        return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
    }
    oc.exports = { stringify: Mw, stripBom: Bw };
});
var uc = g((wO, lc) => {
    var Kt;
    try {
        Kt = we();
    } catch {
        Kt = require("fs");
    }
    var Hn = ic(),
        { stringify: sc, stripBom: ac } = Bn();
    async function Hw(e, t = {}) {
        typeof t == "string" && (t = { encoding: t });
        let r = t.fs || Kt,
            n = "throws" in t ? t.throws : !0,
            i = await Hn.fromCallback(r.readFile)(e, t);
        i = ac(i);
        let o;
        try {
            o = JSON.parse(i, t ? t.reviver : null);
        } catch (s) {
            if (n) throw ((s.message = `${e}: ${s.message}`), s);
            return null;
        }
        return o;
    }
    var jw = Hn.fromPromise(Hw);
    function Ww(e, t = {}) {
        typeof t == "string" && (t = { encoding: t });
        let r = t.fs || Kt,
            n = "throws" in t ? t.throws : !0;
        try {
            let i = r.readFileSync(e, t);
            return (i = ac(i)), JSON.parse(i, t.reviver);
        } catch (i) {
            if (n) throw ((i.message = `${e}: ${i.message}`), i);
            return null;
        }
    }
    async function Gw(e, t, r = {}) {
        let n = r.fs || Kt,
            i = sc(t, r);
        await Hn.fromCallback(n.writeFile)(e, i, r);
    }
    var Vw = Hn.fromPromise(Gw);
    function Yw(e, t, r = {}) {
        let n = r.fs || Kt,
            i = sc(t, r);
        return n.writeFileSync(e, i, r);
    }
    var zw = { readFile: jw, readFileSync: Ww, writeFile: Vw, writeFileSync: Yw };
    lc.exports = zw;
});
var fc = g((EO, cc) => {
    "use strict";
    var jn = uc();
    cc.exports = {
        readJson: jn.readFile,
        readJsonSync: jn.readFileSync,
        writeJson: jn.writeFile,
        writeJsonSync: jn.writeFileSync
    };
});
var Wn = g((yO, pc) => {
    "use strict";
    var Xw = Re().fromCallback,
        $r = we(),
        dc = require("path"),
        hc = Ue(),
        Kw = tt().pathExists;
    function Jw(e, t, r, n) {
        typeof r == "function" && ((n = r), (r = "utf8"));
        let i = dc.dirname(e);
        Kw(i, (o, s) => {
            if (o) return n(o);
            if (s) return $r.writeFile(e, t, r, n);
            hc.mkdirs(i, a => {
                if (a) return n(a);
                $r.writeFile(e, t, r, n);
            });
        });
    }
    function Qw(e, ...t) {
        let r = dc.dirname(e);
        if ($r.existsSync(r)) return $r.writeFileSync(e, ...t);
        hc.mkdirsSync(r), $r.writeFileSync(e, ...t);
    }
    pc.exports = { outputFile: Xw(Jw), outputFileSync: Qw };
});
var gc = g((_O, mc) => {
    "use strict";
    var { stringify: Zw } = Bn(),
        { outputFile: eE } = Wn();
    async function tE(e, t, r = {}) {
        let n = Zw(t, r);
        await eE(e, n, r);
    }
    mc.exports = tE;
});
var Ec = g((vO, wc) => {
    "use strict";
    var { stringify: rE } = Bn(),
        { outputFileSync: nE } = Wn();
    function iE(e, t, r) {
        let n = rE(t, r);
        nE(e, n, r);
    }
    wc.exports = iE;
});
var _c = g((SO, yc) => {
    "use strict";
    var oE = Re().fromPromise,
        Ee = fc();
    Ee.outputJson = oE(gc());
    Ee.outputJsonSync = Ec();
    Ee.outputJSON = Ee.outputJson;
    Ee.outputJSONSync = Ee.outputJsonSync;
    Ee.writeJSON = Ee.writeJson;
    Ee.writeJSONSync = Ee.writeJsonSync;
    Ee.readJSON = Ee.readJson;
    Ee.readJSONSync = Ee.readJsonSync;
    yc.exports = Ee;
});
var Tc = g((AO, xc) => {
    "use strict";
    var sE = we(),
        bo = require("path"),
        aE = Un().copy,
        Ac = Lr().remove,
        lE = Ue().mkdirp,
        uE = tt().pathExists,
        vc = St();
    function cE(e, t, r, n) {
        typeof r == "function" && ((n = r), (r = {})), (r = r || {});
        let i = r.overwrite || r.clobber || !1;
        vc.checkPaths(e, t, "move", r, (o, s) => {
            if (o) return n(o);
            let { srcStat: a, isChangingCase: l = !1 } = s;
            vc.checkParentPaths(e, a, t, "move", h => {
                if (h) return n(h);
                if (fE(t)) return Sc(e, t, i, l, n);
                lE(bo.dirname(t), c => (c ? n(c) : Sc(e, t, i, l, n)));
            });
        });
    }
    function fE(e) {
        let t = bo.dirname(e);
        return bo.parse(t).root === t;
    }
    function Sc(e, t, r, n, i) {
        if (n) return Co(e, t, r, i);
        if (r) return Ac(t, o => (o ? i(o) : Co(e, t, r, i)));
        uE(t, (o, s) => (o ? i(o) : s ? i(new Error("dest already exists.")) : Co(e, t, r, i)));
    }
    function Co(e, t, r, n) {
        sE.rename(e, t, i => (i ? (i.code !== "EXDEV" ? n(i) : dE(e, t, r, n)) : n()));
    }
    function dE(e, t, r, n) {
        aE(e, t, { overwrite: r, errorOnExist: !0 }, o => (o ? n(o) : Ac(e, n)));
    }
    xc.exports = cE;
});
var Nc = g((xO, Ic) => {
    "use strict";
    var bc = we(),
        Io = require("path"),
        hE = Un().copySync,
        Oc = Lr().removeSync,
        pE = Ue().mkdirpSync,
        Cc = St();
    function mE(e, t, r) {
        r = r || {};
        let n = r.overwrite || r.clobber || !1,
            { srcStat: i, isChangingCase: o = !1 } = Cc.checkPathsSync(e, t, "move", r);
        return Cc.checkParentPathsSync(e, i, t, "move"), gE(t) || pE(Io.dirname(t)), wE(e, t, n, o);
    }
    function gE(e) {
        let t = Io.dirname(e);
        return Io.parse(t).root === t;
    }
    function wE(e, t, r, n) {
        if (n) return Oo(e, t, r);
        if (r) return Oc(t), Oo(e, t, r);
        if (bc.existsSync(t)) throw new Error("dest already exists.");
        return Oo(e, t, r);
    }
    function Oo(e, t, r) {
        try {
            bc.renameSync(e, t);
        } catch (n) {
            if (n.code !== "EXDEV") throw n;
            return EE(e, t, r);
        }
    }
    function EE(e, t, r) {
        return hE(e, t, { overwrite: r, errorOnExist: !0 }), Oc(e);
    }
    Ic.exports = mE;
});
var Dc = g((TO, Rc) => {
    "use strict";
    var yE = Re().fromCallback;
    Rc.exports = { move: yE(Tc()), moveSync: Nc() };
});
var Ve = g((CO, Pc) => {
    "use strict";
    Pc.exports = { ...vt(), ...Un(), ...bu(), ...nc(), ..._c(), ...Ue(), ...Dc(), ...Wn(), ...tt(), ...Lr() };
});
var Jt = g((bO, At) => {
    "use strict";
    function Fc(e) {
        return typeof e > "u" || e === null;
    }
    function _E(e) {
        return typeof e == "object" && e !== null;
    }
    function vE(e) {
        return Array.isArray(e) ? e : Fc(e) ? [] : [e];
    }
    function SE(e, t) {
        var r, n, i, o;
        if (t) for (o = Object.keys(t), r = 0, n = o.length; r < n; r += 1) (i = o[r]), (e[i] = t[i]);
        return e;
    }
    function AE(e, t) {
        var r = "",
            n;
        for (n = 0; n < t; n += 1) r += e;
        return r;
    }
    function xE(e) {
        return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
    }
    At.exports.isNothing = Fc;
    At.exports.isObject = _E;
    At.exports.toArray = vE;
    At.exports.repeat = AE;
    At.exports.isNegativeZero = xE;
    At.exports.extend = SE;
});
var Qt = g((OO, Lc) => {
    "use strict";
    function qc(e, t) {
        var r = "",
            n = e.reason || "(unknown reason)";
        return e.mark
            ? (e.mark.name && (r += 'in "' + e.mark.name + '" '),
              (r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")"),
              !t &&
                  e.mark.snippet &&
                  (r +=
                      `

` + e.mark.snippet),
              n + " " + r)
            : n;
    }
    function kr(e, t) {
        Error.call(this),
            (this.name = "YAMLException"),
            (this.reason = e),
            (this.mark = t),
            (this.message = qc(this, !1)),
            Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : (this.stack = new Error().stack || "");
    }
    kr.prototype = Object.create(Error.prototype);
    kr.prototype.constructor = kr;
    kr.prototype.toString = function (t) {
        return this.name + ": " + qc(this, t);
    };
    Lc.exports = kr;
});
var $c = g((IO, Uc) => {
    "use strict";
    var Mr = Jt();
    function No(e, t, r, n, i) {
        var o = "",
            s = "",
            a = Math.floor(i / 2) - 1;
        return (
            n - t > a && ((o = " ... "), (t = n - a + o.length)),
            r - n > a && ((s = " ..."), (r = n + a - s.length)),
            { str: o + e.slice(t, r).replace(/\t/g, "\u2192") + s, pos: n - t + o.length }
        );
    }
    function Ro(e, t) {
        return Mr.repeat(" ", t - e.length) + e;
    }
    function TE(e, t) {
        if (((t = Object.create(t || null)), !e.buffer)) return null;
        t.maxLength || (t.maxLength = 79),
            typeof t.indent != "number" && (t.indent = 1),
            typeof t.linesBefore != "number" && (t.linesBefore = 3),
            typeof t.linesAfter != "number" && (t.linesAfter = 2);
        for (var r = /\r?\n|\r|\0/g, n = [0], i = [], o, s = -1; (o = r.exec(e.buffer)); )
            i.push(o.index), n.push(o.index + o[0].length), e.position <= o.index && s < 0 && (s = n.length - 2);
        s < 0 && (s = n.length - 1);
        var a = "",
            l,
            h,
            c = Math.min(e.line + t.linesAfter, i.length).toString().length,
            d = t.maxLength - (t.indent + c + 3);
        for (l = 1; l <= t.linesBefore && !(s - l < 0); l++)
            (h = No(e.buffer, n[s - l], i[s - l], e.position - (n[s] - n[s - l]), d)),
                (a =
                    Mr.repeat(" ", t.indent) +
                    Ro((e.line - l + 1).toString(), c) +
                    " | " +
                    h.str +
                    `
` +
                    a);
        for (
            h = No(e.buffer, n[s], i[s], e.position, d),
                a +=
                    Mr.repeat(" ", t.indent) +
                    Ro((e.line + 1).toString(), c) +
                    " | " +
                    h.str +
                    `
`,
                a +=
                    Mr.repeat("-", t.indent + c + 3 + h.pos) +
                    `^
`,
                l = 1;
            l <= t.linesAfter && !(s + l >= i.length);
            l++
        )
            (h = No(e.buffer, n[s + l], i[s + l], e.position - (n[s] - n[s + l]), d)),
                (a +=
                    Mr.repeat(" ", t.indent) +
                    Ro((e.line + l + 1).toString(), c) +
                    " | " +
                    h.str +
                    `
`);
        return a.replace(/\n$/, "");
    }
    Uc.exports = TE;
});
var fe = g((NO, Mc) => {
    "use strict";
    var kc = Qt(),
        CE = [
            "kind",
            "multi",
            "resolve",
            "construct",
            "instanceOf",
            "predicate",
            "represent",
            "representName",
            "defaultStyle",
            "styleAliases"
        ],
        bE = ["scalar", "sequence", "mapping"];
    function OE(e) {
        var t = {};
        return (
            e !== null &&
                Object.keys(e).forEach(function (r) {
                    e[r].forEach(function (n) {
                        t[String(n)] = r;
                    });
                }),
            t
        );
    }
    function IE(e, t) {
        if (
            ((t = t || {}),
            Object.keys(t).forEach(function (r) {
                if (CE.indexOf(r) === -1)
                    throw new kc('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
            }),
            (this.options = t),
            (this.tag = e),
            (this.kind = t.kind || null),
            (this.resolve =
                t.resolve ||
                function () {
                    return !0;
                }),
            (this.construct =
                t.construct ||
                function (r) {
                    return r;
                }),
            (this.instanceOf = t.instanceOf || null),
            (this.predicate = t.predicate || null),
            (this.represent = t.represent || null),
            (this.representName = t.representName || null),
            (this.defaultStyle = t.defaultStyle || null),
            (this.multi = t.multi || !1),
            (this.styleAliases = OE(t.styleAliases || null)),
            bE.indexOf(this.kind) === -1)
        )
            throw new kc('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
    }
    Mc.exports = IE;
});
var Fo = g((RO, Hc) => {
    "use strict";
    var Br = Qt(),
        Do = fe();
    function Bc(e, t) {
        var r = [];
        return (
            e[t].forEach(function (n) {
                var i = r.length;
                r.forEach(function (o, s) {
                    o.tag === n.tag && o.kind === n.kind && o.multi === n.multi && (i = s);
                }),
                    (r[i] = n);
            }),
            r
        );
    }
    function NE() {
        var e = {
                scalar: {},
                sequence: {},
                mapping: {},
                fallback: {},
                multi: { scalar: [], sequence: [], mapping: [], fallback: [] }
            },
            t,
            r;
        function n(i) {
            i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : (e[i.kind][i.tag] = e.fallback[i.tag] = i);
        }
        for (t = 0, r = arguments.length; t < r; t += 1) arguments[t].forEach(n);
        return e;
    }
    function Po(e) {
        return this.extend(e);
    }
    Po.prototype.extend = function (t) {
        var r = [],
            n = [];
        if (t instanceof Do) n.push(t);
        else if (Array.isArray(t)) n = n.concat(t);
        else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
            t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
        else
            throw new Br(
                "Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })"
            );
        r.forEach(function (o) {
            if (!(o instanceof Do))
                throw new Br("Specified list of YAML types (or a single Type object) contains a non-Type object.");
            if (o.loadKind && o.loadKind !== "scalar")
                throw new Br(
                    "There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported."
                );
            if (o.multi)
                throw new Br(
                    "There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit."
                );
        }),
            n.forEach(function (o) {
                if (!(o instanceof Do))
                    throw new Br("Specified list of YAML types (or a single Type object) contains a non-Type object.");
            });
        var i = Object.create(Po.prototype);
        return (
            (i.implicit = (this.implicit || []).concat(r)),
            (i.explicit = (this.explicit || []).concat(n)),
            (i.compiledImplicit = Bc(i, "implicit")),
            (i.compiledExplicit = Bc(i, "explicit")),
            (i.compiledTypeMap = NE(i.compiledImplicit, i.compiledExplicit)),
            i
        );
    };
    Hc.exports = Po;
});
var qo = g((DO, jc) => {
    "use strict";
    var RE = fe();
    jc.exports = new RE("tag:yaml.org,2002:str", {
        kind: "scalar",
        construct: function (e) {
            return e !== null ? e : "";
        }
    });
});
var Lo = g((PO, Wc) => {
    "use strict";
    var DE = fe();
    Wc.exports = new DE("tag:yaml.org,2002:seq", {
        kind: "sequence",
        construct: function (e) {
            return e !== null ? e : [];
        }
    });
});
var Uo = g((FO, Gc) => {
    "use strict";
    var PE = fe();
    Gc.exports = new PE("tag:yaml.org,2002:map", {
        kind: "mapping",
        construct: function (e) {
            return e !== null ? e : {};
        }
    });
});
var $o = g((qO, Vc) => {
    "use strict";
    var FE = Fo();
    Vc.exports = new FE({ explicit: [qo(), Lo(), Uo()] });
});
var ko = g((LO, Yc) => {
    "use strict";
    var qE = fe();
    function LE(e) {
        if (e === null) return !0;
        var t = e.length;
        return (t === 1 && e === "~") || (t === 4 && (e === "null" || e === "Null" || e === "NULL"));
    }
    function UE() {
        return null;
    }
    function $E(e) {
        return e === null;
    }
    Yc.exports = new qE("tag:yaml.org,2002:null", {
        kind: "scalar",
        resolve: LE,
        construct: UE,
        predicate: $E,
        represent: {
            canonical: function () {
                return "~";
            },
            lowercase: function () {
                return "null";
            },
            uppercase: function () {
                return "NULL";
            },
            camelcase: function () {
                return "Null";
            },
            empty: function () {
                return "";
            }
        },
        defaultStyle: "lowercase"
    });
});
var Mo = g((UO, zc) => {
    "use strict";
    var kE = fe();
    function ME(e) {
        if (e === null) return !1;
        var t = e.length;
        return (
            (t === 4 && (e === "true" || e === "True" || e === "TRUE")) ||
            (t === 5 && (e === "false" || e === "False" || e === "FALSE"))
        );
    }
    function BE(e) {
        return e === "true" || e === "True" || e === "TRUE";
    }
    function HE(e) {
        return Object.prototype.toString.call(e) === "[object Boolean]";
    }
    zc.exports = new kE("tag:yaml.org,2002:bool", {
        kind: "scalar",
        resolve: ME,
        construct: BE,
        predicate: HE,
        represent: {
            lowercase: function (e) {
                return e ? "true" : "false";
            },
            uppercase: function (e) {
                return e ? "TRUE" : "FALSE";
            },
            camelcase: function (e) {
                return e ? "True" : "False";
            }
        },
        defaultStyle: "lowercase"
    });
});
var Bo = g(($O, Xc) => {
    "use strict";
    var jE = Jt(),
        WE = fe();
    function GE(e) {
        return (48 <= e && e <= 57) || (65 <= e && e <= 70) || (97 <= e && e <= 102);
    }
    function VE(e) {
        return 48 <= e && e <= 55;
    }
    function YE(e) {
        return 48 <= e && e <= 57;
    }
    function zE(e) {
        if (e === null) return !1;
        var t = e.length,
            r = 0,
            n = !1,
            i;
        if (!t) return !1;
        if (((i = e[r]), (i === "-" || i === "+") && (i = e[++r]), i === "0")) {
            if (r + 1 === t) return !0;
            if (((i = e[++r]), i === "b")) {
                for (r++; r < t; r++)
                    if (((i = e[r]), i !== "_")) {
                        if (i !== "0" && i !== "1") return !1;
                        n = !0;
                    }
                return n && i !== "_";
            }
            if (i === "x") {
                for (r++; r < t; r++)
                    if (((i = e[r]), i !== "_")) {
                        if (!GE(e.charCodeAt(r))) return !1;
                        n = !0;
                    }
                return n && i !== "_";
            }
            if (i === "o") {
                for (r++; r < t; r++)
                    if (((i = e[r]), i !== "_")) {
                        if (!VE(e.charCodeAt(r))) return !1;
                        n = !0;
                    }
                return n && i !== "_";
            }
        }
        if (i === "_") return !1;
        for (; r < t; r++)
            if (((i = e[r]), i !== "_")) {
                if (!YE(e.charCodeAt(r))) return !1;
                n = !0;
            }
        return !(!n || i === "_");
    }
    function XE(e) {
        var t = e,
            r = 1,
            n;
        if (
            (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")),
            (n = t[0]),
            (n === "-" || n === "+") && (n === "-" && (r = -1), (t = t.slice(1)), (n = t[0])),
            t === "0")
        )
            return 0;
        if (n === "0") {
            if (t[1] === "b") return r * parseInt(t.slice(2), 2);
            if (t[1] === "x") return r * parseInt(t.slice(2), 16);
            if (t[1] === "o") return r * parseInt(t.slice(2), 8);
        }
        return r * parseInt(t, 10);
    }
    function KE(e) {
        return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !jE.isNegativeZero(e);
    }
    Xc.exports = new WE("tag:yaml.org,2002:int", {
        kind: "scalar",
        resolve: zE,
        construct: XE,
        predicate: KE,
        represent: {
            binary: function (e) {
                return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
            },
            octal: function (e) {
                return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
            },
            decimal: function (e) {
                return e.toString(10);
            },
            hexadecimal: function (e) {
                return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
            }
        },
        defaultStyle: "decimal",
        styleAliases: { binary: [2, "bin"], octal: [8, "oct"], decimal: [10, "dec"], hexadecimal: [16, "hex"] }
    });
});
var Ho = g((kO, Jc) => {
    "use strict";
    var Kc = Jt(),
        JE = fe(),
        QE = new RegExp(
            "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
        );
    function ZE(e) {
        return !(e === null || !QE.test(e) || e[e.length - 1] === "_");
    }
    function ey(e) {
        var t, r;
        return (
            (t = e.replace(/_/g, "").toLowerCase()),
            (r = t[0] === "-" ? -1 : 1),
            "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)),
            t === ".inf"
                ? r === 1
                    ? Number.POSITIVE_INFINITY
                    : Number.NEGATIVE_INFINITY
                : t === ".nan"
                ? NaN
                : r * parseFloat(t, 10)
        );
    }
    var ty = /^[-+]?[0-9]+e/;
    function ry(e, t) {
        var r;
        if (isNaN(e))
            switch (t) {
                case "lowercase":
                    return ".nan";
                case "uppercase":
                    return ".NAN";
                case "camelcase":
                    return ".NaN";
            }
        else if (Number.POSITIVE_INFINITY === e)
            switch (t) {
                case "lowercase":
                    return ".inf";
                case "uppercase":
                    return ".INF";
                case "camelcase":
                    return ".Inf";
            }
        else if (Number.NEGATIVE_INFINITY === e)
            switch (t) {
                case "lowercase":
                    return "-.inf";
                case "uppercase":
                    return "-.INF";
                case "camelcase":
                    return "-.Inf";
            }
        else if (Kc.isNegativeZero(e)) return "-0.0";
        return (r = e.toString(10)), ty.test(r) ? r.replace("e", ".e") : r;
    }
    function ny(e) {
        return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || Kc.isNegativeZero(e));
    }
    Jc.exports = new JE("tag:yaml.org,2002:float", {
        kind: "scalar",
        resolve: ZE,
        construct: ey,
        predicate: ny,
        represent: ry,
        defaultStyle: "lowercase"
    });
});
var jo = g((MO, Qc) => {
    "use strict";
    Qc.exports = $o().extend({ implicit: [ko(), Mo(), Bo(), Ho()] });
});
var Wo = g((BO, Zc) => {
    "use strict";
    Zc.exports = jo();
});
var Go = g((HO, rf) => {
    "use strict";
    var iy = fe(),
        ef = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),
        tf = new RegExp(
            "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
        );
    function oy(e) {
        return e === null ? !1 : ef.exec(e) !== null || tf.exec(e) !== null;
    }
    function sy(e) {
        var t,
            r,
            n,
            i,
            o,
            s,
            a,
            l = 0,
            h = null,
            c,
            d,
            m;
        if (((t = ef.exec(e)), t === null && (t = tf.exec(e)), t === null)) throw new Error("Date resolve error");
        if (((r = +t[1]), (n = +t[2] - 1), (i = +t[3]), !t[4])) return new Date(Date.UTC(r, n, i));
        if (((o = +t[4]), (s = +t[5]), (a = +t[6]), t[7])) {
            for (l = t[7].slice(0, 3); l.length < 3; ) l += "0";
            l = +l;
        }
        return (
            t[9] && ((c = +t[10]), (d = +(t[11] || 0)), (h = (c * 60 + d) * 6e4), t[9] === "-" && (h = -h)),
            (m = new Date(Date.UTC(r, n, i, o, s, a, l))),
            h && m.setTime(m.getTime() - h),
            m
        );
    }
    function ay(e) {
        return e.toISOString();
    }
    rf.exports = new iy("tag:yaml.org,2002:timestamp", {
        kind: "scalar",
        resolve: oy,
        construct: sy,
        instanceOf: Date,
        represent: ay
    });
});
var Vo = g((jO, nf) => {
    "use strict";
    var ly = fe();
    function uy(e) {
        return e === "<<" || e === null;
    }
    nf.exports = new ly("tag:yaml.org,2002:merge", { kind: "scalar", resolve: uy });
});
var zo = g((WO, of) => {
    "use strict";
    var cy = fe(),
        Yo = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
    function fy(e) {
        if (e === null) return !1;
        var t,
            r,
            n = 0,
            i = e.length,
            o = Yo;
        for (r = 0; r < i; r++)
            if (((t = o.indexOf(e.charAt(r))), !(t > 64))) {
                if (t < 0) return !1;
                n += 6;
            }
        return n % 8 === 0;
    }
    function dy(e) {
        var t,
            r,
            n = e.replace(/[\r\n=]/g, ""),
            i = n.length,
            o = Yo,
            s = 0,
            a = [];
        for (t = 0; t < i; t++)
            t % 4 === 0 && t && (a.push((s >> 16) & 255), a.push((s >> 8) & 255), a.push(s & 255)),
                (s = (s << 6) | o.indexOf(n.charAt(t)));
        return (
            (r = (i % 4) * 6),
            r === 0
                ? (a.push((s >> 16) & 255), a.push((s >> 8) & 255), a.push(s & 255))
                : r === 18
                ? (a.push((s >> 10) & 255), a.push((s >> 2) & 255))
                : r === 12 && a.push((s >> 4) & 255),
            new Uint8Array(a)
        );
    }
    function hy(e) {
        var t = "",
            r = 0,
            n,
            i,
            o = e.length,
            s = Yo;
        for (n = 0; n < o; n++)
            n % 3 === 0 && n && ((t += s[(r >> 18) & 63]), (t += s[(r >> 12) & 63]), (t += s[(r >> 6) & 63]), (t += s[r & 63])),
                (r = (r << 8) + e[n]);
        return (
            (i = o % 3),
            i === 0
                ? ((t += s[(r >> 18) & 63]), (t += s[(r >> 12) & 63]), (t += s[(r >> 6) & 63]), (t += s[r & 63]))
                : i === 2
                ? ((t += s[(r >> 10) & 63]), (t += s[(r >> 4) & 63]), (t += s[(r << 2) & 63]), (t += s[64]))
                : i === 1 && ((t += s[(r >> 2) & 63]), (t += s[(r << 4) & 63]), (t += s[64]), (t += s[64])),
            t
        );
    }
    function py(e) {
        return Object.prototype.toString.call(e) === "[object Uint8Array]";
    }
    of.exports = new cy("tag:yaml.org,2002:binary", { kind: "scalar", resolve: fy, construct: dy, predicate: py, represent: hy });
});
var Xo = g((GO, sf) => {
    "use strict";
    var my = fe(),
        gy = Object.prototype.hasOwnProperty,
        wy = Object.prototype.toString;
    function Ey(e) {
        if (e === null) return !0;
        var t = [],
            r,
            n,
            i,
            o,
            s,
            a = e;
        for (r = 0, n = a.length; r < n; r += 1) {
            if (((i = a[r]), (s = !1), wy.call(i) !== "[object Object]")) return !1;
            for (o in i)
                if (gy.call(i, o))
                    if (!s) s = !0;
                    else return !1;
            if (!s) return !1;
            if (t.indexOf(o) === -1) t.push(o);
            else return !1;
        }
        return !0;
    }
    function yy(e) {
        return e !== null ? e : [];
    }
    sf.exports = new my("tag:yaml.org,2002:omap", { kind: "sequence", resolve: Ey, construct: yy });
});
var Ko = g((VO, af) => {
    "use strict";
    var _y = fe(),
        vy = Object.prototype.toString;
    function Sy(e) {
        if (e === null) return !0;
        var t,
            r,
            n,
            i,
            o,
            s = e;
        for (o = new Array(s.length), t = 0, r = s.length; t < r; t += 1) {
            if (((n = s[t]), vy.call(n) !== "[object Object]" || ((i = Object.keys(n)), i.length !== 1))) return !1;
            o[t] = [i[0], n[i[0]]];
        }
        return !0;
    }
    function Ay(e) {
        if (e === null) return [];
        var t,
            r,
            n,
            i,
            o,
            s = e;
        for (o = new Array(s.length), t = 0, r = s.length; t < r; t += 1)
            (n = s[t]), (i = Object.keys(n)), (o[t] = [i[0], n[i[0]]]);
        return o;
    }
    af.exports = new _y("tag:yaml.org,2002:pairs", { kind: "sequence", resolve: Sy, construct: Ay });
});
var Jo = g((YO, lf) => {
    "use strict";
    var xy = fe(),
        Ty = Object.prototype.hasOwnProperty;
    function Cy(e) {
        if (e === null) return !0;
        var t,
            r = e;
        for (t in r) if (Ty.call(r, t) && r[t] !== null) return !1;
        return !0;
    }
    function by(e) {
        return e !== null ? e : {};
    }
    lf.exports = new xy("tag:yaml.org,2002:set", { kind: "mapping", resolve: Cy, construct: by });
});
var Gn = g((zO, uf) => {
    "use strict";
    uf.exports = Wo().extend({ implicit: [Go(), Vo()], explicit: [zo(), Xo(), Ko(), Jo()] });
});
var Tf = g((XO, ts) => {
    "use strict";
    var Tt = Jt(),
        gf = Qt(),
        Oy = $c(),
        Iy = Gn(),
        st = Object.prototype.hasOwnProperty,
        Vn = 1,
        wf = 2,
        Ef = 3,
        Yn = 4,
        Qo = 1,
        Ny = 2,
        cf = 3,
        Ry =
            /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
        Dy = /[\x85\u2028\u2029]/,
        Py = /[,\[\]\{\}]/,
        yf = /^(?:!|!!|![a-z\-]+!)$/i,
        _f = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
    function ff(e) {
        return Object.prototype.toString.call(e);
    }
    function Me(e) {
        return e === 10 || e === 13;
    }
    function Ct(e) {
        return e === 9 || e === 32;
    }
    function be(e) {
        return e === 9 || e === 32 || e === 10 || e === 13;
    }
    function Zt(e) {
        return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
    }
    function Fy(e) {
        var t;
        return 48 <= e && e <= 57 ? e - 48 : ((t = e | 32), 97 <= t && t <= 102 ? t - 97 + 10 : -1);
    }
    function qy(e) {
        return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
    }
    function Ly(e) {
        return 48 <= e && e <= 57 ? e - 48 : -1;
    }
    function df(e) {
        return e === 48
            ? "\0"
            : e === 97
            ? "\x07"
            : e === 98
            ? "\b"
            : e === 116 || e === 9
            ? "	"
            : e === 110
            ? `
`
            : e === 118
            ? "\v"
            : e === 102
            ? "\f"
            : e === 114
            ? "\r"
            : e === 101
            ? "\x1B"
            : e === 32
            ? " "
            : e === 34
            ? '"'
            : e === 47
            ? "/"
            : e === 92
            ? "\\"
            : e === 78
            ? "\x85"
            : e === 95
            ? "\xA0"
            : e === 76
            ? "\u2028"
            : e === 80
            ? "\u2029"
            : "";
    }
    function Uy(e) {
        return e <= 65535
            ? String.fromCharCode(e)
            : String.fromCharCode(((e - 65536) >> 10) + 55296, ((e - 65536) & 1023) + 56320);
    }
    var vf = new Array(256),
        Sf = new Array(256);
    for (xt = 0; xt < 256; xt++) (vf[xt] = df(xt) ? 1 : 0), (Sf[xt] = df(xt));
    var xt;
    function $y(e, t) {
        (this.input = e),
            (this.filename = t.filename || null),
            (this.schema = t.schema || Iy),
            (this.onWarning = t.onWarning || null),
            (this.legacy = t.legacy || !1),
            (this.json = t.json || !1),
            (this.listener = t.listener || null),
            (this.implicitTypes = this.schema.compiledImplicit),
            (this.typeMap = this.schema.compiledTypeMap),
            (this.length = e.length),
            (this.position = 0),
            (this.line = 0),
            (this.lineStart = 0),
            (this.lineIndent = 0),
            (this.firstTabInLine = -1),
            (this.documents = []);
    }
    function Af(e, t) {
        var r = {
            name: e.filename,
            buffer: e.input.slice(0, -1),
            position: e.position,
            line: e.line,
            column: e.position - e.lineStart
        };
        return (r.snippet = Oy(r)), new gf(t, r);
    }
    function O(e, t) {
        throw Af(e, t);
    }
    function zn(e, t) {
        e.onWarning && e.onWarning.call(null, Af(e, t));
    }
    var hf = {
        YAML: function (t, r, n) {
            var i, o, s;
            t.version !== null && O(t, "duplication of %YAML directive"),
                n.length !== 1 && O(t, "YAML directive accepts exactly one argument"),
                (i = /^([0-9]+)\.([0-9]+)$/.exec(n[0])),
                i === null && O(t, "ill-formed argument of the YAML directive"),
                (o = parseInt(i[1], 10)),
                (s = parseInt(i[2], 10)),
                o !== 1 && O(t, "unacceptable YAML version of the document"),
                (t.version = n[0]),
                (t.checkLineBreaks = s < 2),
                s !== 1 && s !== 2 && zn(t, "unsupported YAML version of the document");
        },
        TAG: function (t, r, n) {
            var i, o;
            n.length !== 2 && O(t, "TAG directive accepts exactly two arguments"),
                (i = n[0]),
                (o = n[1]),
                yf.test(i) || O(t, "ill-formed tag handle (first argument) of the TAG directive"),
                st.call(t.tagMap, i) && O(t, 'there is a previously declared suffix for "' + i + '" tag handle'),
                _f.test(o) || O(t, "ill-formed tag prefix (second argument) of the TAG directive");
            try {
                o = decodeURIComponent(o);
            } catch {
                O(t, "tag prefix is malformed: " + o);
            }
            t.tagMap[i] = o;
        }
    };
    function ot(e, t, r, n) {
        var i, o, s, a;
        if (t < r) {
            if (((a = e.input.slice(t, r)), n))
                for (i = 0, o = a.length; i < o; i += 1)
                    (s = a.charCodeAt(i)), s === 9 || (32 <= s && s <= 1114111) || O(e, "expected valid JSON character");
            else Ry.test(a) && O(e, "the stream contains non-printable characters");
            e.result += a;
        }
    }
    function pf(e, t, r, n) {
        var i, o, s, a;
        for (
            Tt.isObject(r) || O(e, "cannot merge mappings; the provided source object is unacceptable"),
                i = Object.keys(r),
                s = 0,
                a = i.length;
            s < a;
            s += 1
        )
            (o = i[s]), st.call(t, o) || ((t[o] = r[o]), (n[o] = !0));
    }
    function er(e, t, r, n, i, o, s, a, l) {
        var h, c;
        if (Array.isArray(i))
            for (i = Array.prototype.slice.call(i), h = 0, c = i.length; h < c; h += 1)
                Array.isArray(i[h]) && O(e, "nested arrays are not supported inside keys"),
                    typeof i == "object" && ff(i[h]) === "[object Object]" && (i[h] = "[object Object]");
        if (
            (typeof i == "object" && ff(i) === "[object Object]" && (i = "[object Object]"),
            (i = String(i)),
            t === null && (t = {}),
            n === "tag:yaml.org,2002:merge")
        )
            if (Array.isArray(o)) for (h = 0, c = o.length; h < c; h += 1) pf(e, t, o[h], r);
            else pf(e, t, o, r);
        else
            !e.json &&
                !st.call(r, i) &&
                st.call(t, i) &&
                ((e.line = s || e.line),
                (e.lineStart = a || e.lineStart),
                (e.position = l || e.position),
                O(e, "duplicated mapping key")),
                i === "__proto__"
                    ? Object.defineProperty(t, i, { configurable: !0, enumerable: !0, writable: !0, value: o })
                    : (t[i] = o),
                delete r[i];
        return t;
    }
    function Zo(e) {
        var t;
        (t = e.input.charCodeAt(e.position)),
            t === 10
                ? e.position++
                : t === 13
                ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++)
                : O(e, "a line break is expected"),
            (e.line += 1),
            (e.lineStart = e.position),
            (e.firstTabInLine = -1);
    }
    function ee(e, t, r) {
        for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
            for (; Ct(i); )
                i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), (i = e.input.charCodeAt(++e.position));
            if (t && i === 35)
                do i = e.input.charCodeAt(++e.position);
                while (i !== 10 && i !== 13 && i !== 0);
            if (Me(i))
                for (Zo(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
                    e.lineIndent++, (i = e.input.charCodeAt(++e.position));
            else break;
        }
        return r !== -1 && n !== 0 && e.lineIndent < r && zn(e, "deficient indentation"), n;
    }
    function Xn(e) {
        var t = e.position,
            r;
        return (
            (r = e.input.charCodeAt(t)),
            !!(
                (r === 45 || r === 46) &&
                r === e.input.charCodeAt(t + 1) &&
                r === e.input.charCodeAt(t + 2) &&
                ((t += 3), (r = e.input.charCodeAt(t)), r === 0 || be(r))
            )
        );
    }
    function es(e, t) {
        t === 1
            ? (e.result += " ")
            : t > 1 &&
              (e.result += Tt.repeat(
                  `
`,
                  t - 1
              ));
    }
    function ky(e, t, r) {
        var n,
            i,
            o,
            s,
            a,
            l,
            h,
            c,
            d = e.kind,
            m = e.result,
            p;
        if (
            ((p = e.input.charCodeAt(e.position)),
            be(p) ||
                Zt(p) ||
                p === 35 ||
                p === 38 ||
                p === 42 ||
                p === 33 ||
                p === 124 ||
                p === 62 ||
                p === 39 ||
                p === 34 ||
                p === 37 ||
                p === 64 ||
                p === 96 ||
                ((p === 63 || p === 45) && ((i = e.input.charCodeAt(e.position + 1)), be(i) || (r && Zt(i)))))
        )
            return !1;
        for (e.kind = "scalar", e.result = "", o = s = e.position, a = !1; p !== 0; ) {
            if (p === 58) {
                if (((i = e.input.charCodeAt(e.position + 1)), be(i) || (r && Zt(i)))) break;
            } else if (p === 35) {
                if (((n = e.input.charCodeAt(e.position - 1)), be(n))) break;
            } else {
                if ((e.position === e.lineStart && Xn(e)) || (r && Zt(p))) break;
                if (Me(p))
                    if (((l = e.line), (h = e.lineStart), (c = e.lineIndent), ee(e, !1, -1), e.lineIndent >= t)) {
                        (a = !0), (p = e.input.charCodeAt(e.position));
                        continue;
                    } else {
                        (e.position = s), (e.line = l), (e.lineStart = h), (e.lineIndent = c);
                        break;
                    }
            }
            a && (ot(e, o, s, !1), es(e, e.line - l), (o = s = e.position), (a = !1)),
                Ct(p) || (s = e.position + 1),
                (p = e.input.charCodeAt(++e.position));
        }
        return ot(e, o, s, !1), e.result ? !0 : ((e.kind = d), (e.result = m), !1);
    }
    function My(e, t) {
        var r, n, i;
        if (((r = e.input.charCodeAt(e.position)), r !== 39)) return !1;
        for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
            if (r === 39)
                if ((ot(e, n, e.position, !0), (r = e.input.charCodeAt(++e.position)), r === 39))
                    (n = e.position), e.position++, (i = e.position);
                else return !0;
            else
                Me(r)
                    ? (ot(e, n, i, !0), es(e, ee(e, !1, t)), (n = i = e.position))
                    : e.position === e.lineStart && Xn(e)
                    ? O(e, "unexpected end of the document within a single quoted scalar")
                    : (e.position++, (i = e.position));
        O(e, "unexpected end of the stream within a single quoted scalar");
    }
    function By(e, t) {
        var r, n, i, o, s, a;
        if (((a = e.input.charCodeAt(e.position)), a !== 34)) return !1;
        for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (a = e.input.charCodeAt(e.position)) !== 0; ) {
            if (a === 34) return ot(e, r, e.position, !0), e.position++, !0;
            if (a === 92) {
                if ((ot(e, r, e.position, !0), (a = e.input.charCodeAt(++e.position)), Me(a))) ee(e, !1, t);
                else if (a < 256 && vf[a]) (e.result += Sf[a]), e.position++;
                else if ((s = qy(a)) > 0) {
                    for (i = s, o = 0; i > 0; i--)
                        (a = e.input.charCodeAt(++e.position)),
                            (s = Fy(a)) >= 0 ? (o = (o << 4) + s) : O(e, "expected hexadecimal character");
                    (e.result += Uy(o)), e.position++;
                } else O(e, "unknown escape sequence");
                r = n = e.position;
            } else
                Me(a)
                    ? (ot(e, r, n, !0), es(e, ee(e, !1, t)), (r = n = e.position))
                    : e.position === e.lineStart && Xn(e)
                    ? O(e, "unexpected end of the document within a double quoted scalar")
                    : (e.position++, (n = e.position));
        }
        O(e, "unexpected end of the stream within a double quoted scalar");
    }
    function Hy(e, t) {
        var r = !0,
            n,
            i,
            o,
            s = e.tag,
            a,
            l = e.anchor,
            h,
            c,
            d,
            m,
            p,
            y = Object.create(null),
            _,
            v,
            x,
            A;
        if (((A = e.input.charCodeAt(e.position)), A === 91)) (c = 93), (p = !1), (a = []);
        else if (A === 123) (c = 125), (p = !0), (a = {});
        else return !1;
        for (e.anchor !== null && (e.anchorMap[e.anchor] = a), A = e.input.charCodeAt(++e.position); A !== 0; ) {
            if ((ee(e, !0, t), (A = e.input.charCodeAt(e.position)), A === c))
                return e.position++, (e.tag = s), (e.anchor = l), (e.kind = p ? "mapping" : "sequence"), (e.result = a), !0;
            r
                ? A === 44 && O(e, "expected the node content, but found ','")
                : O(e, "missed comma between flow collection entries"),
                (v = _ = x = null),
                (d = m = !1),
                A === 63 && ((h = e.input.charCodeAt(e.position + 1)), be(h) && ((d = m = !0), e.position++, ee(e, !0, t))),
                (n = e.line),
                (i = e.lineStart),
                (o = e.position),
                tr(e, t, Vn, !1, !0),
                (v = e.tag),
                (_ = e.result),
                ee(e, !0, t),
                (A = e.input.charCodeAt(e.position)),
                (m || e.line === n) &&
                    A === 58 &&
                    ((d = !0), (A = e.input.charCodeAt(++e.position)), ee(e, !0, t), tr(e, t, Vn, !1, !0), (x = e.result)),
                p ? er(e, a, y, v, _, x, n, i, o) : d ? a.push(er(e, null, y, v, _, x, n, i, o)) : a.push(_),
                ee(e, !0, t),
                (A = e.input.charCodeAt(e.position)),
                A === 44 ? ((r = !0), (A = e.input.charCodeAt(++e.position))) : (r = !1);
        }
        O(e, "unexpected end of the stream within a flow collection");
    }
    function jy(e, t) {
        var r,
            n,
            i = Qo,
            o = !1,
            s = !1,
            a = t,
            l = 0,
            h = !1,
            c,
            d;
        if (((d = e.input.charCodeAt(e.position)), d === 124)) n = !1;
        else if (d === 62) n = !0;
        else return !1;
        for (e.kind = "scalar", e.result = ""; d !== 0; )
            if (((d = e.input.charCodeAt(++e.position)), d === 43 || d === 45))
                Qo === i ? (i = d === 43 ? cf : Ny) : O(e, "repeat of a chomping mode identifier");
            else if ((c = Ly(d)) >= 0)
                c === 0
                    ? O(e, "bad explicit indentation width of a block scalar; it cannot be less than one")
                    : s
                    ? O(e, "repeat of an indentation width identifier")
                    : ((a = t + c - 1), (s = !0));
            else break;
        if (Ct(d)) {
            do d = e.input.charCodeAt(++e.position);
            while (Ct(d));
            if (d === 35)
                do d = e.input.charCodeAt(++e.position);
                while (!Me(d) && d !== 0);
        }
        for (; d !== 0; ) {
            for (Zo(e), e.lineIndent = 0, d = e.input.charCodeAt(e.position); (!s || e.lineIndent < a) && d === 32; )
                e.lineIndent++, (d = e.input.charCodeAt(++e.position));
            if ((!s && e.lineIndent > a && (a = e.lineIndent), Me(d))) {
                l++;
                continue;
            }
            if (e.lineIndent < a) {
                i === cf
                    ? (e.result += Tt.repeat(
                          `
`,
                          o ? 1 + l : l
                      ))
                    : i === Qo &&
                      o &&
                      (e.result += `
`);
                break;
            }
            for (
                n
                    ? Ct(d)
                        ? ((h = !0),
                          (e.result += Tt.repeat(
                              `
`,
                              o ? 1 + l : l
                          )))
                        : h
                        ? ((h = !1),
                          (e.result += Tt.repeat(
                              `
`,
                              l + 1
                          )))
                        : l === 0
                        ? o && (e.result += " ")
                        : (e.result += Tt.repeat(
                              `
`,
                              l
                          ))
                    : (e.result += Tt.repeat(
                          `
`,
                          o ? 1 + l : l
                      )),
                    o = !0,
                    s = !0,
                    l = 0,
                    r = e.position;
                !Me(d) && d !== 0;

            )
                d = e.input.charCodeAt(++e.position);
            ot(e, r, e.position, !1);
        }
        return !0;
    }
    function mf(e, t) {
        var r,
            n = e.tag,
            i = e.anchor,
            o = [],
            s,
            a = !1,
            l;
        if (e.firstTabInLine !== -1) return !1;
        for (
            e.anchor !== null && (e.anchorMap[e.anchor] = o), l = e.input.charCodeAt(e.position);
            l !== 0 &&
            (e.firstTabInLine !== -1 && ((e.position = e.firstTabInLine), O(e, "tab characters must not be used in indentation")),
            !(l !== 45 || ((s = e.input.charCodeAt(e.position + 1)), !be(s))));

        ) {
            if (((a = !0), e.position++, ee(e, !0, -1) && e.lineIndent <= t)) {
                o.push(null), (l = e.input.charCodeAt(e.position));
                continue;
            }
            if (
                ((r = e.line),
                tr(e, t, Ef, !1, !0),
                o.push(e.result),
                ee(e, !0, -1),
                (l = e.input.charCodeAt(e.position)),
                (e.line === r || e.lineIndent > t) && l !== 0)
            )
                O(e, "bad indentation of a sequence entry");
            else if (e.lineIndent < t) break;
        }
        return a ? ((e.tag = n), (e.anchor = i), (e.kind = "sequence"), (e.result = o), !0) : !1;
    }
    function Wy(e, t, r) {
        var n,
            i,
            o,
            s,
            a,
            l,
            h = e.tag,
            c = e.anchor,
            d = {},
            m = Object.create(null),
            p = null,
            y = null,
            _ = null,
            v = !1,
            x = !1,
            A;
        if (e.firstTabInLine !== -1) return !1;
        for (e.anchor !== null && (e.anchorMap[e.anchor] = d), A = e.input.charCodeAt(e.position); A !== 0; ) {
            if (
                (!v &&
                    e.firstTabInLine !== -1 &&
                    ((e.position = e.firstTabInLine), O(e, "tab characters must not be used in indentation")),
                (n = e.input.charCodeAt(e.position + 1)),
                (o = e.line),
                (A === 63 || A === 58) && be(n))
            )
                A === 63
                    ? (v && (er(e, d, m, p, y, null, s, a, l), (p = y = _ = null)), (x = !0), (v = !0), (i = !0))
                    : v
                    ? ((v = !1), (i = !0))
                    : O(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),
                    (e.position += 1),
                    (A = n);
            else {
                if (((s = e.line), (a = e.lineStart), (l = e.position), !tr(e, r, wf, !1, !0))) break;
                if (e.line === o) {
                    for (A = e.input.charCodeAt(e.position); Ct(A); ) A = e.input.charCodeAt(++e.position);
                    if (A === 58)
                        (A = e.input.charCodeAt(++e.position)),
                            be(A) ||
                                O(e, "a whitespace character is expected after the key-value separator within a block mapping"),
                            v && (er(e, d, m, p, y, null, s, a, l), (p = y = _ = null)),
                            (x = !0),
                            (v = !1),
                            (i = !1),
                            (p = e.tag),
                            (y = e.result);
                    else if (x) O(e, "can not read an implicit mapping pair; a colon is missed");
                    else return (e.tag = h), (e.anchor = c), !0;
                } else if (x) O(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
                else return (e.tag = h), (e.anchor = c), !0;
            }
            if (
                ((e.line === o || e.lineIndent > t) &&
                    (v && ((s = e.line), (a = e.lineStart), (l = e.position)),
                    tr(e, t, Yn, !0, i) && (v ? (y = e.result) : (_ = e.result)),
                    v || (er(e, d, m, p, y, _, s, a, l), (p = y = _ = null)),
                    ee(e, !0, -1),
                    (A = e.input.charCodeAt(e.position))),
                (e.line === o || e.lineIndent > t) && A !== 0)
            )
                O(e, "bad indentation of a mapping entry");
            else if (e.lineIndent < t) break;
        }
        return v && er(e, d, m, p, y, null, s, a, l), x && ((e.tag = h), (e.anchor = c), (e.kind = "mapping"), (e.result = d)), x;
    }
    function Gy(e) {
        var t,
            r = !1,
            n = !1,
            i,
            o,
            s;
        if (((s = e.input.charCodeAt(e.position)), s !== 33)) return !1;
        if (
            (e.tag !== null && O(e, "duplication of a tag property"),
            (s = e.input.charCodeAt(++e.position)),
            s === 60
                ? ((r = !0), (s = e.input.charCodeAt(++e.position)))
                : s === 33
                ? ((n = !0), (i = "!!"), (s = e.input.charCodeAt(++e.position)))
                : (i = "!"),
            (t = e.position),
            r)
        ) {
            do s = e.input.charCodeAt(++e.position);
            while (s !== 0 && s !== 62);
            e.position < e.length
                ? ((o = e.input.slice(t, e.position)), (s = e.input.charCodeAt(++e.position)))
                : O(e, "unexpected end of the stream within a verbatim tag");
        } else {
            for (; s !== 0 && !be(s); )
                s === 33 &&
                    (n
                        ? O(e, "tag suffix cannot contain exclamation marks")
                        : ((i = e.input.slice(t - 1, e.position + 1)),
                          yf.test(i) || O(e, "named tag handle cannot contain such characters"),
                          (n = !0),
                          (t = e.position + 1))),
                    (s = e.input.charCodeAt(++e.position));
            (o = e.input.slice(t, e.position)), Py.test(o) && O(e, "tag suffix cannot contain flow indicator characters");
        }
        o && !_f.test(o) && O(e, "tag name cannot contain such characters: " + o);
        try {
            o = decodeURIComponent(o);
        } catch {
            O(e, "tag name is malformed: " + o);
        }
        return (
            r
                ? (e.tag = o)
                : st.call(e.tagMap, i)
                ? (e.tag = e.tagMap[i] + o)
                : i === "!"
                ? (e.tag = "!" + o)
                : i === "!!"
                ? (e.tag = "tag:yaml.org,2002:" + o)
                : O(e, 'undeclared tag handle "' + i + '"'),
            !0
        );
    }
    function Vy(e) {
        var t, r;
        if (((r = e.input.charCodeAt(e.position)), r !== 38)) return !1;
        for (
            e.anchor !== null && O(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position;
            r !== 0 && !be(r) && !Zt(r);

        )
            r = e.input.charCodeAt(++e.position);
        return (
            e.position === t && O(e, "name of an anchor node must contain at least one character"),
            (e.anchor = e.input.slice(t, e.position)),
            !0
        );
    }
    function Yy(e) {
        var t, r, n;
        if (((n = e.input.charCodeAt(e.position)), n !== 42)) return !1;
        for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !be(n) && !Zt(n); )
            n = e.input.charCodeAt(++e.position);
        return (
            e.position === t && O(e, "name of an alias node must contain at least one character"),
            (r = e.input.slice(t, e.position)),
            st.call(e.anchorMap, r) || O(e, 'unidentified alias "' + r + '"'),
            (e.result = e.anchorMap[r]),
            ee(e, !0, -1),
            !0
        );
    }
    function tr(e, t, r, n, i) {
        var o,
            s,
            a,
            l = 1,
            h = !1,
            c = !1,
            d,
            m,
            p,
            y,
            _,
            v;
        if (
            (e.listener !== null && e.listener("open", e),
            (e.tag = null),
            (e.anchor = null),
            (e.kind = null),
            (e.result = null),
            (o = s = a = Yn === r || Ef === r),
            n &&
                ee(e, !0, -1) &&
                ((h = !0), e.lineIndent > t ? (l = 1) : e.lineIndent === t ? (l = 0) : e.lineIndent < t && (l = -1)),
            l === 1)
        )
            for (; Gy(e) || Vy(e); )
                ee(e, !0, -1)
                    ? ((h = !0),
                      (a = o),
                      e.lineIndent > t ? (l = 1) : e.lineIndent === t ? (l = 0) : e.lineIndent < t && (l = -1))
                    : (a = !1);
        if (
            (a && (a = h || i),
            (l === 1 || Yn === r) &&
                (Vn === r || wf === r ? (_ = t) : (_ = t + 1),
                (v = e.position - e.lineStart),
                l === 1
                    ? (a && (mf(e, v) || Wy(e, v, _))) || Hy(e, _)
                        ? (c = !0)
                        : ((s && jy(e, _)) || My(e, _) || By(e, _)
                              ? (c = !0)
                              : Yy(e)
                              ? ((c = !0),
                                (e.tag !== null || e.anchor !== null) && O(e, "alias node should not have any properties"))
                              : ky(e, _, Vn === r) && ((c = !0), e.tag === null && (e.tag = "?")),
                          e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
                    : l === 0 && (c = a && mf(e, v))),
            e.tag === null)
        )
            e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        else if (e.tag === "?") {
            for (
                e.result !== null &&
                    e.kind !== "scalar" &&
                    O(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'),
                    d = 0,
                    m = e.implicitTypes.length;
                d < m;
                d += 1
            )
                if (((y = e.implicitTypes[d]), y.resolve(e.result))) {
                    (e.result = y.construct(e.result)), (e.tag = y.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
                    break;
                }
        } else if (e.tag !== "!") {
            if (st.call(e.typeMap[e.kind || "fallback"], e.tag)) y = e.typeMap[e.kind || "fallback"][e.tag];
            else
                for (y = null, p = e.typeMap.multi[e.kind || "fallback"], d = 0, m = p.length; d < m; d += 1)
                    if (e.tag.slice(0, p[d].tag.length) === p[d].tag) {
                        y = p[d];
                        break;
                    }
            y || O(e, "unknown tag !<" + e.tag + ">"),
                e.result !== null &&
                    y.kind !== e.kind &&
                    O(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + y.kind + '", not "' + e.kind + '"'),
                y.resolve(e.result, e.tag)
                    ? ((e.result = y.construct(e.result, e.tag)), e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
                    : O(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
        }
        return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || c;
    }
    function zy(e) {
        var t = e.position,
            r,
            n,
            i,
            o = !1,
            s;
        for (
            e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = Object.create(null), e.anchorMap = Object.create(null);
            (s = e.input.charCodeAt(e.position)) !== 0 &&
            (ee(e, !0, -1), (s = e.input.charCodeAt(e.position)), !(e.lineIndent > 0 || s !== 37));

        ) {
            for (o = !0, s = e.input.charCodeAt(++e.position), r = e.position; s !== 0 && !be(s); )
                s = e.input.charCodeAt(++e.position);
            for (
                n = e.input.slice(r, e.position),
                    i = [],
                    n.length < 1 && O(e, "directive name must not be less than one character in length");
                s !== 0;

            ) {
                for (; Ct(s); ) s = e.input.charCodeAt(++e.position);
                if (s === 35) {
                    do s = e.input.charCodeAt(++e.position);
                    while (s !== 0 && !Me(s));
                    break;
                }
                if (Me(s)) break;
                for (r = e.position; s !== 0 && !be(s); ) s = e.input.charCodeAt(++e.position);
                i.push(e.input.slice(r, e.position));
            }
            s !== 0 && Zo(e), st.call(hf, n) ? hf[n](e, n, i) : zn(e, 'unknown document directive "' + n + '"');
        }
        if (
            (ee(e, !0, -1),
            e.lineIndent === 0 &&
            e.input.charCodeAt(e.position) === 45 &&
            e.input.charCodeAt(e.position + 1) === 45 &&
            e.input.charCodeAt(e.position + 2) === 45
                ? ((e.position += 3), ee(e, !0, -1))
                : o && O(e, "directives end mark is expected"),
            tr(e, e.lineIndent - 1, Yn, !1, !0),
            ee(e, !0, -1),
            e.checkLineBreaks &&
                Dy.test(e.input.slice(t, e.position)) &&
                zn(e, "non-ASCII line breaks are interpreted as content"),
            e.documents.push(e.result),
            e.position === e.lineStart && Xn(e))
        ) {
            e.input.charCodeAt(e.position) === 46 && ((e.position += 3), ee(e, !0, -1));
            return;
        }
        if (e.position < e.length - 1) O(e, "end of the stream or a document separator is expected");
        else return;
    }
    function xf(e, t) {
        (e = String(e)),
            (t = t || {}),
            e.length !== 0 &&
                (e.charCodeAt(e.length - 1) !== 10 &&
                    e.charCodeAt(e.length - 1) !== 13 &&
                    (e += `
`),
                e.charCodeAt(0) === 65279 && (e = e.slice(1)));
        var r = new $y(e, t),
            n = e.indexOf("\0");
        for (
            n !== -1 && ((r.position = n), O(r, "null byte is not allowed in input")), r.input += "\0";
            r.input.charCodeAt(r.position) === 32;

        )
            (r.lineIndent += 1), (r.position += 1);
        for (; r.position < r.length - 1; ) zy(r);
        return r.documents;
    }
    function Xy(e, t, r) {
        t !== null && typeof t == "object" && typeof r > "u" && ((r = t), (t = null));
        var n = xf(e, r);
        if (typeof t != "function") return n;
        for (var i = 0, o = n.length; i < o; i += 1) t(n[i]);
    }
    function Ky(e, t) {
        var r = xf(e, t);
        if (r.length !== 0) {
            if (r.length === 1) return r[0];
            throw new gf("expected a single document in the stream, but found more");
        }
    }
    ts.exports.loadAll = Xy;
    ts.exports.load = Ky;
});
var Vf = g((KO, Gf) => {
    "use strict";
    var Qn = Jt(),
        Vr = Qt(),
        Jy = Gn(),
        Ff = Object.prototype.toString,
        qf = Object.prototype.hasOwnProperty,
        ss = 65279,
        Qy = 9,
        jr = 10,
        Zy = 13,
        e_ = 32,
        t_ = 33,
        r_ = 34,
        rs = 35,
        n_ = 37,
        i_ = 38,
        o_ = 39,
        s_ = 42,
        Lf = 44,
        a_ = 45,
        Kn = 58,
        l_ = 61,
        u_ = 62,
        c_ = 63,
        f_ = 64,
        Uf = 91,
        $f = 93,
        d_ = 96,
        kf = 123,
        h_ = 124,
        Mf = 125,
        de = {};
    de[0] = "\\0";
    de[7] = "\\a";
    de[8] = "\\b";
    de[9] = "\\t";
    de[10] = "\\n";
    de[11] = "\\v";
    de[12] = "\\f";
    de[13] = "\\r";
    de[27] = "\\e";
    de[34] = '\\"';
    de[92] = "\\\\";
    de[133] = "\\N";
    de[160] = "\\_";
    de[8232] = "\\L";
    de[8233] = "\\P";
    var p_ = ["y", "Y", "yes", "Yes", "YES", "on", "On", "ON", "n", "N", "no", "No", "NO", "off", "Off", "OFF"],
        m_ = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
    function g_(e, t) {
        var r, n, i, o, s, a, l;
        if (t === null) return {};
        for (r = {}, n = Object.keys(t), i = 0, o = n.length; i < o; i += 1)
            (s = n[i]),
                (a = String(t[s])),
                s.slice(0, 2) === "!!" && (s = "tag:yaml.org,2002:" + s.slice(2)),
                (l = e.compiledTypeMap.fallback[s]),
                l && qf.call(l.styleAliases, a) && (a = l.styleAliases[a]),
                (r[s] = a);
        return r;
    }
    function w_(e) {
        var t, r, n;
        if (((t = e.toString(16).toUpperCase()), e <= 255)) (r = "x"), (n = 2);
        else if (e <= 65535) (r = "u"), (n = 4);
        else if (e <= 4294967295) (r = "U"), (n = 8);
        else throw new Vr("code point within a string may not be greater than 0xFFFFFFFF");
        return "\\" + r + Qn.repeat("0", n - t.length) + t;
    }
    var E_ = 1,
        Wr = 2;
    function y_(e) {
        (this.schema = e.schema || Jy),
            (this.indent = Math.max(1, e.indent || 2)),
            (this.noArrayIndent = e.noArrayIndent || !1),
            (this.skipInvalid = e.skipInvalid || !1),
            (this.flowLevel = Qn.isNothing(e.flowLevel) ? -1 : e.flowLevel),
            (this.styleMap = g_(this.schema, e.styles || null)),
            (this.sortKeys = e.sortKeys || !1),
            (this.lineWidth = e.lineWidth || 80),
            (this.noRefs = e.noRefs || !1),
            (this.noCompatMode = e.noCompatMode || !1),
            (this.condenseFlow = e.condenseFlow || !1),
            (this.quotingType = e.quotingType === '"' ? Wr : E_),
            (this.forceQuotes = e.forceQuotes || !1),
            (this.replacer = typeof e.replacer == "function" ? e.replacer : null),
            (this.implicitTypes = this.schema.compiledImplicit),
            (this.explicitTypes = this.schema.compiledExplicit),
            (this.tag = null),
            (this.result = ""),
            (this.duplicates = []),
            (this.usedDuplicates = null);
    }
    function Cf(e, t) {
        for (var r = Qn.repeat(" ", t), n = 0, i = -1, o = "", s, a = e.length; n < a; )
            (i = e.indexOf(
                `
`,
                n
            )),
                i === -1 ? ((s = e.slice(n)), (n = a)) : ((s = e.slice(n, i + 1)), (n = i + 1)),
                s.length &&
                    s !==
                        `
` &&
                    (o += r),
                (o += s);
        return o;
    }
    function ns(e, t) {
        return (
            `
` + Qn.repeat(" ", e.indent * t)
        );
    }
    function __(e, t) {
        var r, n, i;
        for (r = 0, n = e.implicitTypes.length; r < n; r += 1) if (((i = e.implicitTypes[r]), i.resolve(t))) return !0;
        return !1;
    }
    function Jn(e) {
        return e === e_ || e === Qy;
    }
    function Gr(e) {
        return (
            (32 <= e && e <= 126) ||
            (161 <= e && e <= 55295 && e !== 8232 && e !== 8233) ||
            (57344 <= e && e <= 65533 && e !== ss) ||
            (65536 <= e && e <= 1114111)
        );
    }
    function bf(e) {
        return Gr(e) && e !== ss && e !== Zy && e !== jr;
    }
    function Of(e, t, r) {
        var n = bf(e),
            i = n && !Jn(e);
        return (
            ((r ? n : n && e !== Lf && e !== Uf && e !== $f && e !== kf && e !== Mf) && e !== rs && !(t === Kn && !i)) ||
            (bf(t) && !Jn(t) && e === rs) ||
            (t === Kn && i)
        );
    }
    function v_(e) {
        return (
            Gr(e) &&
            e !== ss &&
            !Jn(e) &&
            e !== a_ &&
            e !== c_ &&
            e !== Kn &&
            e !== Lf &&
            e !== Uf &&
            e !== $f &&
            e !== kf &&
            e !== Mf &&
            e !== rs &&
            e !== i_ &&
            e !== s_ &&
            e !== t_ &&
            e !== h_ &&
            e !== l_ &&
            e !== u_ &&
            e !== o_ &&
            e !== r_ &&
            e !== n_ &&
            e !== f_ &&
            e !== d_
        );
    }
    function S_(e) {
        return !Jn(e) && e !== Kn;
    }
    function Hr(e, t) {
        var r = e.charCodeAt(t),
            n;
        return r >= 55296 && r <= 56319 && t + 1 < e.length && ((n = e.charCodeAt(t + 1)), n >= 56320 && n <= 57343)
            ? (r - 55296) * 1024 + n - 56320 + 65536
            : r;
    }
    function Bf(e) {
        var t = /^\n* /;
        return t.test(e);
    }
    var Hf = 1,
        is = 2,
        jf = 3,
        Wf = 4,
        rr = 5;
    function A_(e, t, r, n, i, o, s, a) {
        var l,
            h = 0,
            c = null,
            d = !1,
            m = !1,
            p = n !== -1,
            y = -1,
            _ = v_(Hr(e, 0)) && S_(Hr(e, e.length - 1));
        if (t || s)
            for (l = 0; l < e.length; h >= 65536 ? (l += 2) : l++) {
                if (((h = Hr(e, l)), !Gr(h))) return rr;
                (_ = _ && Of(h, c, a)), (c = h);
            }
        else {
            for (l = 0; l < e.length; h >= 65536 ? (l += 2) : l++) {
                if (((h = Hr(e, l)), h === jr)) (d = !0), p && ((m = m || (l - y - 1 > n && e[y + 1] !== " ")), (y = l));
                else if (!Gr(h)) return rr;
                (_ = _ && Of(h, c, a)), (c = h);
            }
            m = m || (p && l - y - 1 > n && e[y + 1] !== " ");
        }
        return !d && !m
            ? _ && !s && !i(e)
                ? Hf
                : o === Wr
                ? rr
                : is
            : r > 9 && Bf(e)
            ? rr
            : s
            ? o === Wr
                ? rr
                : is
            : m
            ? Wf
            : jf;
    }
    function x_(e, t, r, n, i) {
        e.dump = (function () {
            if (t.length === 0) return e.quotingType === Wr ? '""' : "''";
            if (!e.noCompatMode && (p_.indexOf(t) !== -1 || m_.test(t)))
                return e.quotingType === Wr ? '"' + t + '"' : "'" + t + "'";
            var o = e.indent * Math.max(1, r),
                s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o),
                a = n || (e.flowLevel > -1 && r >= e.flowLevel);
            function l(h) {
                return __(e, h);
            }
            switch (A_(t, a, e.indent, s, l, e.quotingType, e.forceQuotes && !n, i)) {
                case Hf:
                    return t;
                case is:
                    return "'" + t.replace(/'/g, "''") + "'";
                case jf:
                    return "|" + If(t, e.indent) + Nf(Cf(t, o));
                case Wf:
                    return ">" + If(t, e.indent) + Nf(Cf(T_(t, s), o));
                case rr:
                    return '"' + C_(t, s) + '"';
                default:
                    throw new Vr("impossible error: invalid scalar style");
            }
        })();
    }
    function If(e, t) {
        var r = Bf(e) ? String(t) : "",
            n =
                e[e.length - 1] ===
                `
`,
            i =
                n &&
                (e[e.length - 2] ===
                    `
` ||
                    e ===
                        `
`),
            o = i ? "+" : n ? "" : "-";
        return (
            r +
            o +
            `
`
        );
    }
    function Nf(e) {
        return e[e.length - 1] ===
            `
`
            ? e.slice(0, -1)
            : e;
    }
    function T_(e, t) {
        for (
            var r = /(\n+)([^\n]*)/g,
                n = (function () {
                    var h = e.indexOf(`
`);
                    return (h = h !== -1 ? h : e.length), (r.lastIndex = h), Rf(e.slice(0, h), t);
                })(),
                i =
                    e[0] ===
                        `
` || e[0] === " ",
                o,
                s;
            (s = r.exec(e));

        ) {
            var a = s[1],
                l = s[2];
            (o = l[0] === " "),
                (n +=
                    a +
                    (!i && !o && l !== ""
                        ? `
`
                        : "") +
                    Rf(l, t)),
                (i = o);
        }
        return n;
    }
    function Rf(e, t) {
        if (e === "" || e[0] === " ") return e;
        for (var r = / [^ ]/g, n, i = 0, o, s = 0, a = 0, l = ""; (n = r.exec(e)); )
            (a = n.index),
                a - i > t &&
                    ((o = s > i ? s : a),
                    (l +=
                        `
` + e.slice(i, o)),
                    (i = o + 1)),
                (s = a);
        return (
            (l += `
`),
            e.length - i > t && s > i
                ? (l +=
                      e.slice(i, s) +
                      `
` +
                      e.slice(s + 1))
                : (l += e.slice(i)),
            l.slice(1)
        );
    }
    function C_(e) {
        for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? (i += 2) : i++)
            (r = Hr(e, i)), (n = de[r]), !n && Gr(r) ? ((t += e[i]), r >= 65536 && (t += e[i + 1])) : (t += n || w_(r));
        return t;
    }
    function b_(e, t, r) {
        var n = "",
            i = e.tag,
            o,
            s,
            a;
        for (o = 0, s = r.length; o < s; o += 1)
            (a = r[o]),
                e.replacer && (a = e.replacer.call(r, String(o), a)),
                (Ye(e, t, a, !1, !1) || (typeof a > "u" && Ye(e, t, null, !1, !1))) &&
                    (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), (n += e.dump));
        (e.tag = i), (e.dump = "[" + n + "]");
    }
    function Df(e, t, r, n) {
        var i = "",
            o = e.tag,
            s,
            a,
            l;
        for (s = 0, a = r.length; s < a; s += 1)
            (l = r[s]),
                e.replacer && (l = e.replacer.call(r, String(s), l)),
                (Ye(e, t + 1, l, !0, !0, !1, !0) || (typeof l > "u" && Ye(e, t + 1, null, !0, !0, !1, !0))) &&
                    ((!n || i !== "") && (i += ns(e, t)),
                    e.dump && jr === e.dump.charCodeAt(0) ? (i += "-") : (i += "- "),
                    (i += e.dump));
        (e.tag = o), (e.dump = i || "[]");
    }
    function O_(e, t, r) {
        var n = "",
            i = e.tag,
            o = Object.keys(r),
            s,
            a,
            l,
            h,
            c;
        for (s = 0, a = o.length; s < a; s += 1)
            (c = ""),
                n !== "" && (c += ", "),
                e.condenseFlow && (c += '"'),
                (l = o[s]),
                (h = r[l]),
                e.replacer && (h = e.replacer.call(r, l, h)),
                Ye(e, t, l, !1, !1) &&
                    (e.dump.length > 1024 && (c += "? "),
                    (c += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " ")),
                    Ye(e, t, h, !1, !1) && ((c += e.dump), (n += c)));
        (e.tag = i), (e.dump = "{" + n + "}");
    }
    function I_(e, t, r, n) {
        var i = "",
            o = e.tag,
            s = Object.keys(r),
            a,
            l,
            h,
            c,
            d,
            m;
        if (e.sortKeys === !0) s.sort();
        else if (typeof e.sortKeys == "function") s.sort(e.sortKeys);
        else if (e.sortKeys) throw new Vr("sortKeys must be a boolean or a function");
        for (a = 0, l = s.length; a < l; a += 1)
            (m = ""),
                (!n || i !== "") && (m += ns(e, t)),
                (h = s[a]),
                (c = r[h]),
                e.replacer && (c = e.replacer.call(r, h, c)),
                Ye(e, t + 1, h, !0, !0, !0) &&
                    ((d = (e.tag !== null && e.tag !== "?") || (e.dump && e.dump.length > 1024)),
                    d && (e.dump && jr === e.dump.charCodeAt(0) ? (m += "?") : (m += "? ")),
                    (m += e.dump),
                    d && (m += ns(e, t)),
                    Ye(e, t + 1, c, !0, d) &&
                        (e.dump && jr === e.dump.charCodeAt(0) ? (m += ":") : (m += ": "), (m += e.dump), (i += m)));
        (e.tag = o), (e.dump = i || "{}");
    }
    function Pf(e, t, r) {
        var n, i, o, s, a, l;
        for (i = r ? e.explicitTypes : e.implicitTypes, o = 0, s = i.length; o < s; o += 1)
            if (
                ((a = i[o]),
                (a.instanceOf || a.predicate) &&
                    (!a.instanceOf || (typeof t == "object" && t instanceof a.instanceOf)) &&
                    (!a.predicate || a.predicate(t)))
            ) {
                if (
                    (r ? (a.multi && a.representName ? (e.tag = a.representName(t)) : (e.tag = a.tag)) : (e.tag = "?"),
                    a.represent)
                ) {
                    if (((l = e.styleMap[a.tag] || a.defaultStyle), Ff.call(a.represent) === "[object Function]"))
                        n = a.represent(t, l);
                    else if (qf.call(a.represent, l)) n = a.represent[l](t, l);
                    else throw new Vr("!<" + a.tag + '> tag resolver accepts not "' + l + '" style');
                    e.dump = n;
                }
                return !0;
            }
        return !1;
    }
    function Ye(e, t, r, n, i, o, s) {
        (e.tag = null), (e.dump = r), Pf(e, r, !1) || Pf(e, r, !0);
        var a = Ff.call(e.dump),
            l = n,
            h;
        n && (n = e.flowLevel < 0 || e.flowLevel > t);
        var c = a === "[object Object]" || a === "[object Array]",
            d,
            m;
        if (
            (c && ((d = e.duplicates.indexOf(r)), (m = d !== -1)),
            ((e.tag !== null && e.tag !== "?") || m || (e.indent !== 2 && t > 0)) && (i = !1),
            m && e.usedDuplicates[d])
        )
            e.dump = "*ref_" + d;
        else {
            if ((c && m && !e.usedDuplicates[d] && (e.usedDuplicates[d] = !0), a === "[object Object]"))
                n && Object.keys(e.dump).length !== 0
                    ? (I_(e, t, e.dump, i), m && (e.dump = "&ref_" + d + e.dump))
                    : (O_(e, t, e.dump), m && (e.dump = "&ref_" + d + " " + e.dump));
            else if (a === "[object Array]")
                n && e.dump.length !== 0
                    ? (e.noArrayIndent && !s && t > 0 ? Df(e, t - 1, e.dump, i) : Df(e, t, e.dump, i),
                      m && (e.dump = "&ref_" + d + e.dump))
                    : (b_(e, t, e.dump), m && (e.dump = "&ref_" + d + " " + e.dump));
            else if (a === "[object String]") e.tag !== "?" && x_(e, e.dump, t, o, l);
            else {
                if (a === "[object Undefined]") return !1;
                if (e.skipInvalid) return !1;
                throw new Vr("unacceptable kind of an object to dump " + a);
            }
            e.tag !== null &&
                e.tag !== "?" &&
                ((h = encodeURI(e.tag[0] === "!" ? e.tag.slice(1) : e.tag).replace(/!/g, "%21")),
                e.tag[0] === "!"
                    ? (h = "!" + h)
                    : h.slice(0, 18) === "tag:yaml.org,2002:"
                    ? (h = "!!" + h.slice(18))
                    : (h = "!<" + h + ">"),
                (e.dump = h + " " + e.dump));
        }
        return !0;
    }
    function N_(e, t) {
        var r = [],
            n = [],
            i,
            o;
        for (os(e, r, n), i = 0, o = n.length; i < o; i += 1) t.duplicates.push(r[n[i]]);
        t.usedDuplicates = new Array(o);
    }
    function os(e, t, r) {
        var n, i, o;
        if (e !== null && typeof e == "object")
            if (((i = t.indexOf(e)), i !== -1)) r.indexOf(i) === -1 && r.push(i);
            else if ((t.push(e), Array.isArray(e))) for (i = 0, o = e.length; i < o; i += 1) os(e[i], t, r);
            else for (n = Object.keys(e), i = 0, o = n.length; i < o; i += 1) os(e[n[i]], t, r);
    }
    function R_(e, t) {
        t = t || {};
        var r = new y_(t);
        r.noRefs || N_(e, r);
        var n = e;
        return (
            r.replacer && (n = r.replacer.call({ "": n }, "", n)),
            Ye(r, 0, n, !0, !0)
                ? r.dump +
                  `
`
                : ""
        );
    }
    Gf.exports.dump = R_;
});
var Zn = g((JO, ye) => {
    "use strict";
    var Yf = Tf(),
        D_ = Vf();
    function as(e, t) {
        return function () {
            throw new Error(
                "Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default."
            );
        };
    }
    ye.exports.Type = fe();
    ye.exports.Schema = Fo();
    ye.exports.FAILSAFE_SCHEMA = $o();
    ye.exports.JSON_SCHEMA = jo();
    ye.exports.CORE_SCHEMA = Wo();
    ye.exports.DEFAULT_SCHEMA = Gn();
    ye.exports.load = Yf.load;
    ye.exports.loadAll = Yf.loadAll;
    ye.exports.dump = D_.dump;
    ye.exports.YAMLException = Qt();
    ye.exports.types = {
        binary: zo(),
        float: Ho(),
        map: Uo(),
        null: ko(),
        pairs: Ko(),
        set: Jo(),
        timestamp: Go(),
        bool: Mo(),
        int: Bo(),
        merge: Vo(),
        omap: Xo(),
        seq: Lo(),
        str: qo()
    };
    ye.exports.safeLoad = as("safeLoad", "load");
    ye.exports.safeLoadAll = as("safeLoadAll", "loadAll");
    ye.exports.safeDump = as("safeDump", "dump");
});
var zf = g(ei => {
    "use strict";
    Object.defineProperty(ei, "__esModule", { value: !0 });
    ei.Lazy = void 0;
    var ls = class {
        constructor(t) {
            (this._value = null), (this.creator = t);
        }
        get hasValue() {
            return this.creator == null;
        }
        get value() {
            if (this.creator == null) return this._value;
            let t = this.creator();
            return (this.value = t), t;
        }
        set value(t) {
            (this._value = t), (this.creator = null);
        }
    };
    ei.Lazy = ls;
});
var Yr = g((ZO, Xf) => {
    var P_ = "2.0.0",
        F_ = Number.MAX_SAFE_INTEGER || 9007199254740991,
        q_ = 16,
        L_ = 250,
        U_ = ["major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease"];
    Xf.exports = {
        MAX_LENGTH: 256,
        MAX_SAFE_COMPONENT_LENGTH: q_,
        MAX_SAFE_BUILD_LENGTH: L_,
        MAX_SAFE_INTEGER: F_,
        RELEASE_TYPES: U_,
        SEMVER_SPEC_VERSION: P_,
        FLAG_INCLUDE_PRERELEASE: 1,
        FLAG_LOOSE: 2
    };
});
var zr = g((eI, Kf) => {
    var $_ =
        typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)
            ? (...e) => console.error("SEMVER", ...e)
            : () => {};
    Kf.exports = $_;
});
var nr = g((ze, Jf) => {
    var { MAX_SAFE_COMPONENT_LENGTH: us, MAX_SAFE_BUILD_LENGTH: k_, MAX_LENGTH: M_ } = Yr(),
        B_ = zr();
    ze = Jf.exports = {};
    var H_ = (ze.re = []),
        j_ = (ze.safeRe = []),
        T = (ze.src = []),
        C = (ze.t = {}),
        W_ = 0,
        cs = "[a-zA-Z0-9-]",
        G_ = [
            ["\\s", 1],
            ["\\d", M_],
            [cs, k_]
        ],
        V_ = e => {
            for (let [t, r] of G_) e = e.split(`${t}*`).join(`${t}{0,${r}}`).split(`${t}+`).join(`${t}{1,${r}}`);
            return e;
        },
        q = (e, t, r) => {
            let n = V_(t),
                i = W_++;
            B_(e, i, t),
                (C[e] = i),
                (T[i] = t),
                (H_[i] = new RegExp(t, r ? "g" : void 0)),
                (j_[i] = new RegExp(n, r ? "g" : void 0));
        };
    q("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    q("NUMERICIDENTIFIERLOOSE", "\\d+");
    q("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${cs}*`);
    q("MAINVERSION", `(${T[C.NUMERICIDENTIFIER]})\\.(${T[C.NUMERICIDENTIFIER]})\\.(${T[C.NUMERICIDENTIFIER]})`);
    q(
        "MAINVERSIONLOOSE",
        `(${T[C.NUMERICIDENTIFIERLOOSE]})\\.(${T[C.NUMERICIDENTIFIERLOOSE]})\\.(${T[C.NUMERICIDENTIFIERLOOSE]})`
    );
    q("PRERELEASEIDENTIFIER", `(?:${T[C.NUMERICIDENTIFIER]}|${T[C.NONNUMERICIDENTIFIER]})`);
    q("PRERELEASEIDENTIFIERLOOSE", `(?:${T[C.NUMERICIDENTIFIERLOOSE]}|${T[C.NONNUMERICIDENTIFIER]})`);
    q("PRERELEASE", `(?:-(${T[C.PRERELEASEIDENTIFIER]}(?:\\.${T[C.PRERELEASEIDENTIFIER]})*))`);
    q("PRERELEASELOOSE", `(?:-?(${T[C.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${T[C.PRERELEASEIDENTIFIERLOOSE]})*))`);
    q("BUILDIDENTIFIER", `${cs}+`);
    q("BUILD", `(?:\\+(${T[C.BUILDIDENTIFIER]}(?:\\.${T[C.BUILDIDENTIFIER]})*))`);
    q("FULLPLAIN", `v?${T[C.MAINVERSION]}${T[C.PRERELEASE]}?${T[C.BUILD]}?`);
    q("FULL", `^${T[C.FULLPLAIN]}$`);
    q("LOOSEPLAIN", `[v=\\s]*${T[C.MAINVERSIONLOOSE]}${T[C.PRERELEASELOOSE]}?${T[C.BUILD]}?`);
    q("LOOSE", `^${T[C.LOOSEPLAIN]}$`);
    q("GTLT", "((?:<|>)?=?)");
    q("XRANGEIDENTIFIERLOOSE", `${T[C.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    q("XRANGEIDENTIFIER", `${T[C.NUMERICIDENTIFIER]}|x|X|\\*`);
    q(
        "XRANGEPLAIN",
        `[v=\\s]*(${T[C.XRANGEIDENTIFIER]})(?:\\.(${T[C.XRANGEIDENTIFIER]})(?:\\.(${T[C.XRANGEIDENTIFIER]})(?:${
            T[C.PRERELEASE]
        })?${T[C.BUILD]}?)?)?`
    );
    q(
        "XRANGEPLAINLOOSE",
        `[v=\\s]*(${T[C.XRANGEIDENTIFIERLOOSE]})(?:\\.(${T[C.XRANGEIDENTIFIERLOOSE]})(?:\\.(${T[C.XRANGEIDENTIFIERLOOSE]})(?:${
            T[C.PRERELEASELOOSE]
        })?${T[C.BUILD]}?)?)?`
    );
    q("XRANGE", `^${T[C.GTLT]}\\s*${T[C.XRANGEPLAIN]}$`);
    q("XRANGELOOSE", `^${T[C.GTLT]}\\s*${T[C.XRANGEPLAINLOOSE]}$`);
    q("COERCEPLAIN", `(^|[^\\d])(\\d{1,${us}})(?:\\.(\\d{1,${us}}))?(?:\\.(\\d{1,${us}}))?`);
    q("COERCE", `${T[C.COERCEPLAIN]}(?:$|[^\\d])`);
    q("COERCEFULL", T[C.COERCEPLAIN] + `(?:${T[C.PRERELEASE]})?(?:${T[C.BUILD]})?(?:$|[^\\d])`);
    q("COERCERTL", T[C.COERCE], !0);
    q("COERCERTLFULL", T[C.COERCEFULL], !0);
    q("LONETILDE", "(?:~>?)");
    q("TILDETRIM", `(\\s*)${T[C.LONETILDE]}\\s+`, !0);
    ze.tildeTrimReplace = "$1~";
    q("TILDE", `^${T[C.LONETILDE]}${T[C.XRANGEPLAIN]}$`);
    q("TILDELOOSE", `^${T[C.LONETILDE]}${T[C.XRANGEPLAINLOOSE]}$`);
    q("LONECARET", "(?:\\^)");
    q("CARETTRIM", `(\\s*)${T[C.LONECARET]}\\s+`, !0);
    ze.caretTrimReplace = "$1^";
    q("CARET", `^${T[C.LONECARET]}${T[C.XRANGEPLAIN]}$`);
    q("CARETLOOSE", `^${T[C.LONECARET]}${T[C.XRANGEPLAINLOOSE]}$`);
    q("COMPARATORLOOSE", `^${T[C.GTLT]}\\s*(${T[C.LOOSEPLAIN]})$|^$`);
    q("COMPARATOR", `^${T[C.GTLT]}\\s*(${T[C.FULLPLAIN]})$|^$`);
    q("COMPARATORTRIM", `(\\s*)${T[C.GTLT]}\\s*(${T[C.LOOSEPLAIN]}|${T[C.XRANGEPLAIN]})`, !0);
    ze.comparatorTrimReplace = "$1$2$3";
    q("HYPHENRANGE", `^\\s*(${T[C.XRANGEPLAIN]})\\s+-\\s+(${T[C.XRANGEPLAIN]})\\s*$`);
    q("HYPHENRANGELOOSE", `^\\s*(${T[C.XRANGEPLAINLOOSE]})\\s+-\\s+(${T[C.XRANGEPLAINLOOSE]})\\s*$`);
    q("STAR", "(<|>)?=?\\s*\\*");
    q("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    q("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
});
var ti = g((tI, Qf) => {
    var Y_ = Object.freeze({ loose: !0 }),
        z_ = Object.freeze({}),
        X_ = e => (e ? (typeof e != "object" ? Y_ : e) : z_);
    Qf.exports = X_;
});
var fs = g((rI, td) => {
    var Zf = /^[0-9]+$/,
        ed = (e, t) => {
            let r = Zf.test(e),
                n = Zf.test(t);
            return r && n && ((e = +e), (t = +t)), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
        },
        K_ = (e, t) => ed(t, e);
    td.exports = { compareIdentifiers: ed, rcompareIdentifiers: K_ };
});
var he = g((nI, od) => {
    var ri = zr(),
        { MAX_LENGTH: rd, MAX_SAFE_INTEGER: ni } = Yr(),
        { safeRe: nd, t: id } = nr(),
        J_ = ti(),
        { compareIdentifiers: ir } = fs(),
        ds = class e {
            constructor(t, r) {
                if (((r = J_(r)), t instanceof e)) {
                    if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease) return t;
                    t = t.version;
                } else if (typeof t != "string")
                    throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
                if (t.length > rd) throw new TypeError(`version is longer than ${rd} characters`);
                ri("SemVer", t, r),
                    (this.options = r),
                    (this.loose = !!r.loose),
                    (this.includePrerelease = !!r.includePrerelease);
                let n = t.trim().match(r.loose ? nd[id.LOOSE] : nd[id.FULL]);
                if (!n) throw new TypeError(`Invalid Version: ${t}`);
                if (
                    ((this.raw = t),
                    (this.major = +n[1]),
                    (this.minor = +n[2]),
                    (this.patch = +n[3]),
                    this.major > ni || this.major < 0)
                )
                    throw new TypeError("Invalid major version");
                if (this.minor > ni || this.minor < 0) throw new TypeError("Invalid minor version");
                if (this.patch > ni || this.patch < 0) throw new TypeError("Invalid patch version");
                n[4]
                    ? (this.prerelease = n[4].split(".").map(i => {
                          if (/^[0-9]+$/.test(i)) {
                              let o = +i;
                              if (o >= 0 && o < ni) return o;
                          }
                          return i;
                      }))
                    : (this.prerelease = []),
                    (this.build = n[5] ? n[5].split(".") : []),
                    this.format();
            }
            format() {
                return (
                    (this.version = `${this.major}.${this.minor}.${this.patch}`),
                    this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`),
                    this.version
                );
            }
            toString() {
                return this.version;
            }
            compare(t) {
                if ((ri("SemVer.compare", this.version, this.options, t), !(t instanceof e))) {
                    if (typeof t == "string" && t === this.version) return 0;
                    t = new e(t, this.options);
                }
                return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
            }
            compareMain(t) {
                return (
                    t instanceof e || (t = new e(t, this.options)),
                    ir(this.major, t.major) || ir(this.minor, t.minor) || ir(this.patch, t.patch)
                );
            }
            comparePre(t) {
                if ((t instanceof e || (t = new e(t, this.options)), this.prerelease.length && !t.prerelease.length)) return -1;
                if (!this.prerelease.length && t.prerelease.length) return 1;
                if (!this.prerelease.length && !t.prerelease.length) return 0;
                let r = 0;
                do {
                    let n = this.prerelease[r],
                        i = t.prerelease[r];
                    if ((ri("prerelease compare", r, n, i), n === void 0 && i === void 0)) return 0;
                    if (i === void 0) return 1;
                    if (n === void 0) return -1;
                    if (n === i) continue;
                    return ir(n, i);
                } while (++r);
            }
            compareBuild(t) {
                t instanceof e || (t = new e(t, this.options));
                let r = 0;
                do {
                    let n = this.build[r],
                        i = t.build[r];
                    if ((ri("build compare", r, n, i), n === void 0 && i === void 0)) return 0;
                    if (i === void 0) return 1;
                    if (n === void 0) return -1;
                    if (n === i) continue;
                    return ir(n, i);
                } while (++r);
            }
            inc(t, r, n) {
                switch (t) {
                    case "premajor":
                        (this.prerelease.length = 0), (this.patch = 0), (this.minor = 0), this.major++, this.inc("pre", r, n);
                        break;
                    case "preminor":
                        (this.prerelease.length = 0), (this.patch = 0), this.minor++, this.inc("pre", r, n);
                        break;
                    case "prepatch":
                        (this.prerelease.length = 0), this.inc("patch", r, n), this.inc("pre", r, n);
                        break;
                    case "prerelease":
                        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
                        break;
                    case "major":
                        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++,
                            (this.minor = 0),
                            (this.patch = 0),
                            (this.prerelease = []);
                        break;
                    case "minor":
                        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++,
                            (this.patch = 0),
                            (this.prerelease = []);
                        break;
                    case "patch":
                        this.prerelease.length === 0 && this.patch++, (this.prerelease = []);
                        break;
                    case "pre": {
                        let i = Number(n) ? 1 : 0;
                        if (!r && n === !1) throw new Error("invalid increment argument: identifier is empty");
                        if (this.prerelease.length === 0) this.prerelease = [i];
                        else {
                            let o = this.prerelease.length;
                            for (; --o >= 0; ) typeof this.prerelease[o] == "number" && (this.prerelease[o]++, (o = -2));
                            if (o === -1) {
                                if (r === this.prerelease.join(".") && n === !1)
                                    throw new Error("invalid increment argument: identifier already exists");
                                this.prerelease.push(i);
                            }
                        }
                        if (r) {
                            let o = [r, i];
                            n === !1 && (o = [r]),
                                ir(this.prerelease[0], r) === 0
                                    ? isNaN(this.prerelease[1]) && (this.prerelease = o)
                                    : (this.prerelease = o);
                        }
                        break;
                    }
                    default:
                        throw new Error(`invalid increment argument: ${t}`);
                }
                return (this.raw = this.format()), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
            }
        };
    od.exports = ds;
});
var bt = g((iI, ad) => {
    var sd = he(),
        Q_ = (e, t, r = !1) => {
            if (e instanceof sd) return e;
            try {
                return new sd(e, t);
            } catch (n) {
                if (!r) return null;
                throw n;
            }
        };
    ad.exports = Q_;
});
var ud = g((oI, ld) => {
    var Z_ = bt(),
        ev = (e, t) => {
            let r = Z_(e, t);
            return r ? r.version : null;
        };
    ld.exports = ev;
});
var fd = g((sI, cd) => {
    var tv = bt(),
        rv = (e, t) => {
            let r = tv(e.trim().replace(/^[=v]+/, ""), t);
            return r ? r.version : null;
        };
    cd.exports = rv;
});
var pd = g((aI, hd) => {
    var dd = he(),
        nv = (e, t, r, n, i) => {
            typeof r == "string" && ((i = n), (n = r), (r = void 0));
            try {
                return new dd(e instanceof dd ? e.version : e, r).inc(t, n, i).version;
            } catch {
                return null;
            }
        };
    hd.exports = nv;
});
var wd = g((lI, gd) => {
    var md = bt(),
        iv = (e, t) => {
            let r = md(e, null, !0),
                n = md(t, null, !0),
                i = r.compare(n);
            if (i === 0) return null;
            let o = i > 0,
                s = o ? r : n,
                a = o ? n : r,
                l = !!s.prerelease.length;
            if (!!a.prerelease.length && !l)
                return !a.patch && !a.minor ? "major" : s.patch ? "patch" : s.minor ? "minor" : "major";
            let c = l ? "pre" : "";
            return r.major !== n.major
                ? c + "major"
                : r.minor !== n.minor
                ? c + "minor"
                : r.patch !== n.patch
                ? c + "patch"
                : "prerelease";
        };
    gd.exports = iv;
});
var yd = g((uI, Ed) => {
    var ov = he(),
        sv = (e, t) => new ov(e, t).major;
    Ed.exports = sv;
});
var vd = g((cI, _d) => {
    var av = he(),
        lv = (e, t) => new av(e, t).minor;
    _d.exports = lv;
});
var Ad = g((fI, Sd) => {
    var uv = he(),
        cv = (e, t) => new uv(e, t).patch;
    Sd.exports = cv;
});
var Td = g((dI, xd) => {
    var fv = bt(),
        dv = (e, t) => {
            let r = fv(e, t);
            return r && r.prerelease.length ? r.prerelease : null;
        };
    xd.exports = dv;
});
var Pe = g((hI, bd) => {
    var Cd = he(),
        hv = (e, t, r) => new Cd(e, r).compare(new Cd(t, r));
    bd.exports = hv;
});
var Id = g((pI, Od) => {
    var pv = Pe(),
        mv = (e, t, r) => pv(t, e, r);
    Od.exports = mv;
});
var Rd = g((mI, Nd) => {
    var gv = Pe(),
        wv = (e, t) => gv(e, t, !0);
    Nd.exports = wv;
});
var ii = g((gI, Pd) => {
    var Dd = he(),
        Ev = (e, t, r) => {
            let n = new Dd(e, r),
                i = new Dd(t, r);
            return n.compare(i) || n.compareBuild(i);
        };
    Pd.exports = Ev;
});
var qd = g((wI, Fd) => {
    var yv = ii(),
        _v = (e, t) => e.sort((r, n) => yv(r, n, t));
    Fd.exports = _v;
});
var Ud = g((EI, Ld) => {
    var vv = ii(),
        Sv = (e, t) => e.sort((r, n) => vv(n, r, t));
    Ld.exports = Sv;
});
var Xr = g((yI, $d) => {
    var Av = Pe(),
        xv = (e, t, r) => Av(e, t, r) > 0;
    $d.exports = xv;
});
var oi = g((_I, kd) => {
    var Tv = Pe(),
        Cv = (e, t, r) => Tv(e, t, r) < 0;
    kd.exports = Cv;
});
var hs = g((vI, Md) => {
    var bv = Pe(),
        Ov = (e, t, r) => bv(e, t, r) === 0;
    Md.exports = Ov;
});
var ps = g((SI, Bd) => {
    var Iv = Pe(),
        Nv = (e, t, r) => Iv(e, t, r) !== 0;
    Bd.exports = Nv;
});
var si = g((AI, Hd) => {
    var Rv = Pe(),
        Dv = (e, t, r) => Rv(e, t, r) >= 0;
    Hd.exports = Dv;
});
var ai = g((xI, jd) => {
    var Pv = Pe(),
        Fv = (e, t, r) => Pv(e, t, r) <= 0;
    jd.exports = Fv;
});
var ms = g((TI, Wd) => {
    var qv = hs(),
        Lv = ps(),
        Uv = Xr(),
        $v = si(),
        kv = oi(),
        Mv = ai(),
        Bv = (e, t, r, n) => {
            switch (t) {
                case "===":
                    return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
                case "!==":
                    return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
                case "":
                case "=":
                case "==":
                    return qv(e, r, n);
                case "!=":
                    return Lv(e, r, n);
                case ">":
                    return Uv(e, r, n);
                case ">=":
                    return $v(e, r, n);
                case "<":
                    return kv(e, r, n);
                case "<=":
                    return Mv(e, r, n);
                default:
                    throw new TypeError(`Invalid operator: ${t}`);
            }
        };
    Wd.exports = Bv;
});
var Vd = g((CI, Gd) => {
    var Hv = he(),
        jv = bt(),
        { safeRe: li, t: ui } = nr(),
        Wv = (e, t) => {
            if (e instanceof Hv) return e;
            if ((typeof e == "number" && (e = String(e)), typeof e != "string")) return null;
            t = t || {};
            let r = null;
            if (!t.rtl) r = e.match(t.includePrerelease ? li[ui.COERCEFULL] : li[ui.COERCE]);
            else {
                let l = t.includePrerelease ? li[ui.COERCERTLFULL] : li[ui.COERCERTL],
                    h;
                for (; (h = l.exec(e)) && (!r || r.index + r[0].length !== e.length); )
                    (!r || h.index + h[0].length !== r.index + r[0].length) && (r = h),
                        (l.lastIndex = h.index + h[1].length + h[2].length);
                l.lastIndex = -1;
            }
            if (r === null) return null;
            let n = r[2],
                i = r[3] || "0",
                o = r[4] || "0",
                s = t.includePrerelease && r[5] ? `-${r[5]}` : "",
                a = t.includePrerelease && r[6] ? `+${r[6]}` : "";
            return jv(`${n}.${i}.${o}${s}${a}`, t);
        };
    Gd.exports = Wv;
});
var zd = g((bI, Yd) => {
    var gs = class {
        constructor() {
            (this.max = 1e3), (this.map = new Map());
        }
        get(t) {
            let r = this.map.get(t);
            if (r !== void 0) return this.map.delete(t), this.map.set(t, r), r;
        }
        delete(t) {
            return this.map.delete(t);
        }
        set(t, r) {
            if (!this.delete(t) && r !== void 0) {
                if (this.map.size >= this.max) {
                    let i = this.map.keys().next().value;
                    this.delete(i);
                }
                this.map.set(t, r);
            }
            return this;
        }
    };
    Yd.exports = gs;
});
var Fe = g((OI, Qd) => {
    var Gv = /\s+/g,
        ws = class e {
            constructor(t, r) {
                if (((r = Yv(r)), t instanceof e))
                    return t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease ? t : new e(t.raw, r);
                if (t instanceof Es) return (this.raw = t.value), (this.set = [[t]]), (this.formatted = void 0), this;
                if (
                    ((this.options = r),
                    (this.loose = !!r.loose),
                    (this.includePrerelease = !!r.includePrerelease),
                    (this.raw = t.trim().replace(Gv, " ")),
                    (this.set = this.raw
                        .split("||")
                        .map(n => this.parseRange(n.trim()))
                        .filter(n => n.length)),
                    !this.set.length)
                )
                    throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
                if (this.set.length > 1) {
                    let n = this.set[0];
                    if (((this.set = this.set.filter(i => !Kd(i[0]))), this.set.length === 0)) this.set = [n];
                    else if (this.set.length > 1) {
                        for (let i of this.set)
                            if (i.length === 1 && eS(i[0])) {
                                this.set = [i];
                                break;
                            }
                    }
                }
                this.formatted = void 0;
            }
            get range() {
                if (this.formatted === void 0) {
                    this.formatted = "";
                    for (let t = 0; t < this.set.length; t++) {
                        t > 0 && (this.formatted += "||");
                        let r = this.set[t];
                        for (let n = 0; n < r.length; n++)
                            n > 0 && (this.formatted += " "), (this.formatted += r[n].toString().trim());
                    }
                }
                return this.formatted;
            }
            format() {
                return this.range;
            }
            toString() {
                return this.range;
            }
            parseRange(t) {
                let n = ((this.options.includePrerelease && Qv) | (this.options.loose && Zv)) + ":" + t,
                    i = Xd.get(n);
                if (i) return i;
                let o = this.options.loose,
                    s = o ? Oe[_e.HYPHENRANGELOOSE] : Oe[_e.HYPHENRANGE];
                (t = t.replace(s, cS(this.options.includePrerelease))),
                    Y("hyphen replace", t),
                    (t = t.replace(Oe[_e.COMPARATORTRIM], Xv)),
                    Y("comparator trim", t),
                    (t = t.replace(Oe[_e.TILDETRIM], Kv)),
                    Y("tilde trim", t),
                    (t = t.replace(Oe[_e.CARETTRIM], Jv)),
                    Y("caret trim", t);
                let a = t
                    .split(" ")
                    .map(d => tS(d, this.options))
                    .join(" ")
                    .split(/\s+/)
                    .map(d => uS(d, this.options));
                o && (a = a.filter(d => (Y("loose invalid filter", d, this.options), !!d.match(Oe[_e.COMPARATORLOOSE])))),
                    Y("range list", a);
                let l = new Map(),
                    h = a.map(d => new Es(d, this.options));
                for (let d of h) {
                    if (Kd(d)) return [d];
                    l.set(d.value, d);
                }
                l.size > 1 && l.has("") && l.delete("");
                let c = [...l.values()];
                return Xd.set(n, c), c;
            }
            intersects(t, r) {
                if (!(t instanceof e)) throw new TypeError("a Range is required");
                return this.set.some(
                    n => Jd(n, r) && t.set.some(i => Jd(i, r) && n.every(o => i.every(s => o.intersects(s, r))))
                );
            }
            test(t) {
                if (!t) return !1;
                if (typeof t == "string")
                    try {
                        t = new zv(t, this.options);
                    } catch {
                        return !1;
                    }
                for (let r = 0; r < this.set.length; r++) if (fS(this.set[r], t, this.options)) return !0;
                return !1;
            }
        };
    Qd.exports = ws;
    var Vv = zd(),
        Xd = new Vv(),
        Yv = ti(),
        Es = Kr(),
        Y = zr(),
        zv = he(),
        { safeRe: Oe, t: _e, comparatorTrimReplace: Xv, tildeTrimReplace: Kv, caretTrimReplace: Jv } = nr(),
        { FLAG_INCLUDE_PRERELEASE: Qv, FLAG_LOOSE: Zv } = Yr(),
        Kd = e => e.value === "<0.0.0-0",
        eS = e => e.value === "",
        Jd = (e, t) => {
            let r = !0,
                n = e.slice(),
                i = n.pop();
            for (; r && n.length; ) (r = n.every(o => i.intersects(o, t))), (i = n.pop());
            return r;
        },
        tS = (e, t) => (
            Y("comp", e, t),
            (e = iS(e, t)),
            Y("caret", e),
            (e = rS(e, t)),
            Y("tildes", e),
            (e = sS(e, t)),
            Y("xrange", e),
            (e = lS(e, t)),
            Y("stars", e),
            e
        ),
        ve = e => !e || e.toLowerCase() === "x" || e === "*",
        rS = (e, t) =>
            e
                .trim()
                .split(/\s+/)
                .map(r => nS(r, t))
                .join(" "),
        nS = (e, t) => {
            let r = t.loose ? Oe[_e.TILDELOOSE] : Oe[_e.TILDE];
            return e.replace(r, (n, i, o, s, a) => {
                Y("tilde", e, n, i, o, s, a);
                let l;
                return (
                    ve(i)
                        ? (l = "")
                        : ve(o)
                        ? (l = `>=${i}.0.0 <${+i + 1}.0.0-0`)
                        : ve(s)
                        ? (l = `>=${i}.${o}.0 <${i}.${+o + 1}.0-0`)
                        : a
                        ? (Y("replaceTilde pr", a), (l = `>=${i}.${o}.${s}-${a} <${i}.${+o + 1}.0-0`))
                        : (l = `>=${i}.${o}.${s} <${i}.${+o + 1}.0-0`),
                    Y("tilde return", l),
                    l
                );
            });
        },
        iS = (e, t) =>
            e
                .trim()
                .split(/\s+/)
                .map(r => oS(r, t))
                .join(" "),
        oS = (e, t) => {
            Y("caret", e, t);
            let r = t.loose ? Oe[_e.CARETLOOSE] : Oe[_e.CARET],
                n = t.includePrerelease ? "-0" : "";
            return e.replace(r, (i, o, s, a, l) => {
                Y("caret", e, i, o, s, a, l);
                let h;
                return (
                    ve(o)
                        ? (h = "")
                        : ve(s)
                        ? (h = `>=${o}.0.0${n} <${+o + 1}.0.0-0`)
                        : ve(a)
                        ? o === "0"
                            ? (h = `>=${o}.${s}.0${n} <${o}.${+s + 1}.0-0`)
                            : (h = `>=${o}.${s}.0${n} <${+o + 1}.0.0-0`)
                        : l
                        ? (Y("replaceCaret pr", l),
                          o === "0"
                              ? s === "0"
                                  ? (h = `>=${o}.${s}.${a}-${l} <${o}.${s}.${+a + 1}-0`)
                                  : (h = `>=${o}.${s}.${a}-${l} <${o}.${+s + 1}.0-0`)
                              : (h = `>=${o}.${s}.${a}-${l} <${+o + 1}.0.0-0`))
                        : (Y("no pr"),
                          o === "0"
                              ? s === "0"
                                  ? (h = `>=${o}.${s}.${a}${n} <${o}.${s}.${+a + 1}-0`)
                                  : (h = `>=${o}.${s}.${a}${n} <${o}.${+s + 1}.0-0`)
                              : (h = `>=${o}.${s}.${a} <${+o + 1}.0.0-0`)),
                    Y("caret return", h),
                    h
                );
            });
        },
        sS = (e, t) => (
            Y("replaceXRanges", e, t),
            e
                .split(/\s+/)
                .map(r => aS(r, t))
                .join(" ")
        ),
        aS = (e, t) => {
            e = e.trim();
            let r = t.loose ? Oe[_e.XRANGELOOSE] : Oe[_e.XRANGE];
            return e.replace(r, (n, i, o, s, a, l) => {
                Y("xRange", e, n, i, o, s, a, l);
                let h = ve(o),
                    c = h || ve(s),
                    d = c || ve(a),
                    m = d;
                return (
                    i === "=" && m && (i = ""),
                    (l = t.includePrerelease ? "-0" : ""),
                    h
                        ? i === ">" || i === "<"
                            ? (n = "<0.0.0-0")
                            : (n = "*")
                        : i && m
                        ? (c && (s = 0),
                          (a = 0),
                          i === ">"
                              ? ((i = ">="), c ? ((o = +o + 1), (s = 0), (a = 0)) : ((s = +s + 1), (a = 0)))
                              : i === "<=" && ((i = "<"), c ? (o = +o + 1) : (s = +s + 1)),
                          i === "<" && (l = "-0"),
                          (n = `${i + o}.${s}.${a}${l}`))
                        : c
                        ? (n = `>=${o}.0.0${l} <${+o + 1}.0.0-0`)
                        : d && (n = `>=${o}.${s}.0${l} <${o}.${+s + 1}.0-0`),
                    Y("xRange return", n),
                    n
                );
            });
        },
        lS = (e, t) => (Y("replaceStars", e, t), e.trim().replace(Oe[_e.STAR], "")),
        uS = (e, t) => (Y("replaceGTE0", e, t), e.trim().replace(Oe[t.includePrerelease ? _e.GTE0PRE : _e.GTE0], "")),
        cS = e => (t, r, n, i, o, s, a, l, h, c, d, m) => (
            ve(n)
                ? (r = "")
                : ve(i)
                ? (r = `>=${n}.0.0${e ? "-0" : ""}`)
                : ve(o)
                ? (r = `>=${n}.${i}.0${e ? "-0" : ""}`)
                : s
                ? (r = `>=${r}`)
                : (r = `>=${r}${e ? "-0" : ""}`),
            ve(h)
                ? (l = "")
                : ve(c)
                ? (l = `<${+h + 1}.0.0-0`)
                : ve(d)
                ? (l = `<${h}.${+c + 1}.0-0`)
                : m
                ? (l = `<=${h}.${c}.${d}-${m}`)
                : e
                ? (l = `<${h}.${c}.${+d + 1}-0`)
                : (l = `<=${l}`),
            `${r} ${l}`.trim()
        ),
        fS = (e, t, r) => {
            for (let n = 0; n < e.length; n++) if (!e[n].test(t)) return !1;
            if (t.prerelease.length && !r.includePrerelease) {
                for (let n = 0; n < e.length; n++)
                    if ((Y(e[n].semver), e[n].semver !== Es.ANY && e[n].semver.prerelease.length > 0)) {
                        let i = e[n].semver;
                        if (i.major === t.major && i.minor === t.minor && i.patch === t.patch) return !0;
                    }
                return !1;
            }
            return !0;
        };
});
var Kr = g((II, ih) => {
    var Jr = Symbol("SemVer ANY"),
        vs = class e {
            static get ANY() {
                return Jr;
            }
            constructor(t, r) {
                if (((r = Zd(r)), t instanceof e)) {
                    if (t.loose === !!r.loose) return t;
                    t = t.value;
                }
                (t = t.trim().split(/\s+/).join(" ")),
                    _s("comparator", t, r),
                    (this.options = r),
                    (this.loose = !!r.loose),
                    this.parse(t),
                    this.semver === Jr ? (this.value = "") : (this.value = this.operator + this.semver.version),
                    _s("comp", this);
            }
            parse(t) {
                let r = this.options.loose ? eh[th.COMPARATORLOOSE] : eh[th.COMPARATOR],
                    n = t.match(r);
                if (!n) throw new TypeError(`Invalid comparator: ${t}`);
                (this.operator = n[1] !== void 0 ? n[1] : ""),
                    this.operator === "=" && (this.operator = ""),
                    n[2] ? (this.semver = new rh(n[2], this.options.loose)) : (this.semver = Jr);
            }
            toString() {
                return this.value;
            }
            test(t) {
                if ((_s("Comparator.test", t, this.options.loose), this.semver === Jr || t === Jr)) return !0;
                if (typeof t == "string")
                    try {
                        t = new rh(t, this.options);
                    } catch {
                        return !1;
                    }
                return ys(t, this.operator, this.semver, this.options);
            }
            intersects(t, r) {
                if (!(t instanceof e)) throw new TypeError("a Comparator is required");
                return this.operator === ""
                    ? this.value === ""
                        ? !0
                        : new nh(t.value, r).test(this.value)
                    : t.operator === ""
                    ? t.value === ""
                        ? !0
                        : new nh(this.value, r).test(t.semver)
                    : ((r = Zd(r)),
                      (r.includePrerelease && (this.value === "<0.0.0-0" || t.value === "<0.0.0-0")) ||
                      (!r.includePrerelease && (this.value.startsWith("<0.0.0") || t.value.startsWith("<0.0.0")))
                          ? !1
                          : !!(
                                (this.operator.startsWith(">") && t.operator.startsWith(">")) ||
                                (this.operator.startsWith("<") && t.operator.startsWith("<")) ||
                                (this.semver.version === t.semver.version &&
                                    this.operator.includes("=") &&
                                    t.operator.includes("=")) ||
                                (ys(this.semver, "<", t.semver, r) &&
                                    this.operator.startsWith(">") &&
                                    t.operator.startsWith("<")) ||
                                (ys(this.semver, ">", t.semver, r) && this.operator.startsWith("<") && t.operator.startsWith(">"))
                            ));
            }
        };
    ih.exports = vs;
    var Zd = ti(),
        { safeRe: eh, t: th } = nr(),
        ys = ms(),
        _s = zr(),
        rh = he(),
        nh = Fe();
});
var Qr = g((NI, oh) => {
    var dS = Fe(),
        hS = (e, t, r) => {
            try {
                t = new dS(t, r);
            } catch {
                return !1;
            }
            return t.test(e);
        };
    oh.exports = hS;
});
var ah = g((RI, sh) => {
    var pS = Fe(),
        mS = (e, t) =>
            new pS(e, t).set.map(r =>
                r
                    .map(n => n.value)
                    .join(" ")
                    .trim()
                    .split(" ")
            );
    sh.exports = mS;
});
var uh = g((DI, lh) => {
    var gS = he(),
        wS = Fe(),
        ES = (e, t, r) => {
            let n = null,
                i = null,
                o = null;
            try {
                o = new wS(t, r);
            } catch {
                return null;
            }
            return (
                e.forEach(s => {
                    o.test(s) && (!n || i.compare(s) === -1) && ((n = s), (i = new gS(n, r)));
                }),
                n
            );
        };
    lh.exports = ES;
});
var fh = g((PI, ch) => {
    var yS = he(),
        _S = Fe(),
        vS = (e, t, r) => {
            let n = null,
                i = null,
                o = null;
            try {
                o = new _S(t, r);
            } catch {
                return null;
            }
            return (
                e.forEach(s => {
                    o.test(s) && (!n || i.compare(s) === 1) && ((n = s), (i = new yS(n, r)));
                }),
                n
            );
        };
    ch.exports = vS;
});
var ph = g((FI, hh) => {
    var Ss = he(),
        SS = Fe(),
        dh = Xr(),
        AS = (e, t) => {
            e = new SS(e, t);
            let r = new Ss("0.0.0");
            if (e.test(r) || ((r = new Ss("0.0.0-0")), e.test(r))) return r;
            r = null;
            for (let n = 0; n < e.set.length; ++n) {
                let i = e.set[n],
                    o = null;
                i.forEach(s => {
                    let a = new Ss(s.semver.version);
                    switch (s.operator) {
                        case ">":
                            a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0), (a.raw = a.format());
                        case "":
                        case ">=":
                            (!o || dh(a, o)) && (o = a);
                            break;
                        case "<":
                        case "<=":
                            break;
                        default:
                            throw new Error(`Unexpected operation: ${s.operator}`);
                    }
                }),
                    o && (!r || dh(r, o)) && (r = o);
            }
            return r && e.test(r) ? r : null;
        };
    hh.exports = AS;
});
var gh = g((qI, mh) => {
    var xS = Fe(),
        TS = (e, t) => {
            try {
                return new xS(e, t).range || "*";
            } catch {
                return null;
            }
        };
    mh.exports = TS;
});
var ci = g((LI, _h) => {
    var CS = he(),
        yh = Kr(),
        { ANY: bS } = yh,
        OS = Fe(),
        IS = Qr(),
        wh = Xr(),
        Eh = oi(),
        NS = ai(),
        RS = si(),
        DS = (e, t, r, n) => {
            (e = new CS(e, n)), (t = new OS(t, n));
            let i, o, s, a, l;
            switch (r) {
                case ">":
                    (i = wh), (o = NS), (s = Eh), (a = ">"), (l = ">=");
                    break;
                case "<":
                    (i = Eh), (o = RS), (s = wh), (a = "<"), (l = "<=");
                    break;
                default:
                    throw new TypeError('Must provide a hilo val of "<" or ">"');
            }
            if (IS(e, t, n)) return !1;
            for (let h = 0; h < t.set.length; ++h) {
                let c = t.set[h],
                    d = null,
                    m = null;
                if (
                    (c.forEach(p => {
                        p.semver === bS && (p = new yh(">=0.0.0")),
                            (d = d || p),
                            (m = m || p),
                            i(p.semver, d.semver, n) ? (d = p) : s(p.semver, m.semver, n) && (m = p);
                    }),
                    d.operator === a || d.operator === l || ((!m.operator || m.operator === a) && o(e, m.semver)))
                )
                    return !1;
                if (m.operator === l && s(e, m.semver)) return !1;
            }
            return !0;
        };
    _h.exports = DS;
});
var Sh = g((UI, vh) => {
    var PS = ci(),
        FS = (e, t, r) => PS(e, t, ">", r);
    vh.exports = FS;
});
var xh = g(($I, Ah) => {
    var qS = ci(),
        LS = (e, t, r) => qS(e, t, "<", r);
    Ah.exports = LS;
});
var bh = g((kI, Ch) => {
    var Th = Fe(),
        US = (e, t, r) => ((e = new Th(e, r)), (t = new Th(t, r)), e.intersects(t, r));
    Ch.exports = US;
});
var Ih = g((MI, Oh) => {
    var $S = Qr(),
        kS = Pe();
    Oh.exports = (e, t, r) => {
        let n = [],
            i = null,
            o = null,
            s = e.sort((c, d) => kS(c, d, r));
        for (let c of s) $S(c, t, r) ? ((o = c), i || (i = c)) : (o && n.push([i, o]), (o = null), (i = null));
        i && n.push([i, null]);
        let a = [];
        for (let [c, d] of n)
            c === d
                ? a.push(c)
                : !d && c === s[0]
                ? a.push("*")
                : d
                ? c === s[0]
                    ? a.push(`<=${d}`)
                    : a.push(`${c} - ${d}`)
                : a.push(`>=${c}`);
        let l = a.join(" || "),
            h = typeof t.raw == "string" ? t.raw : String(t);
        return l.length < h.length ? l : t;
    };
});
var qh = g((BI, Fh) => {
    var Nh = Fe(),
        xs = Kr(),
        { ANY: As } = xs,
        Zr = Qr(),
        Ts = Pe(),
        MS = (e, t, r = {}) => {
            if (e === t) return !0;
            (e = new Nh(e, r)), (t = new Nh(t, r));
            let n = !1;
            e: for (let i of e.set) {
                for (let o of t.set) {
                    let s = HS(i, o, r);
                    if (((n = n || s !== null), s)) continue e;
                }
                if (n) return !1;
            }
            return !0;
        },
        BS = [new xs(">=0.0.0-0")],
        Rh = [new xs(">=0.0.0")],
        HS = (e, t, r) => {
            if (e === t) return !0;
            if (e.length === 1 && e[0].semver === As) {
                if (t.length === 1 && t[0].semver === As) return !0;
                r.includePrerelease ? (e = BS) : (e = Rh);
            }
            if (t.length === 1 && t[0].semver === As) {
                if (r.includePrerelease) return !0;
                t = Rh;
            }
            let n = new Set(),
                i,
                o;
            for (let p of e)
                p.operator === ">" || p.operator === ">="
                    ? (i = Dh(i, p, r))
                    : p.operator === "<" || p.operator === "<="
                    ? (o = Ph(o, p, r))
                    : n.add(p.semver);
            if (n.size > 1) return null;
            let s;
            if (i && o) {
                if (((s = Ts(i.semver, o.semver, r)), s > 0)) return null;
                if (s === 0 && (i.operator !== ">=" || o.operator !== "<=")) return null;
            }
            for (let p of n) {
                if ((i && !Zr(p, String(i), r)) || (o && !Zr(p, String(o), r))) return null;
                for (let y of t) if (!Zr(p, String(y), r)) return !1;
                return !0;
            }
            let a,
                l,
                h,
                c,
                d = o && !r.includePrerelease && o.semver.prerelease.length ? o.semver : !1,
                m = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
            d && d.prerelease.length === 1 && o.operator === "<" && d.prerelease[0] === 0 && (d = !1);
            for (let p of t) {
                if (
                    ((c = c || p.operator === ">" || p.operator === ">="),
                    (h = h || p.operator === "<" || p.operator === "<="),
                    i)
                ) {
                    if (
                        (m &&
                            p.semver.prerelease &&
                            p.semver.prerelease.length &&
                            p.semver.major === m.major &&
                            p.semver.minor === m.minor &&
                            p.semver.patch === m.patch &&
                            (m = !1),
                        p.operator === ">" || p.operator === ">=")
                    ) {
                        if (((a = Dh(i, p, r)), a === p && a !== i)) return !1;
                    } else if (i.operator === ">=" && !Zr(i.semver, String(p), r)) return !1;
                }
                if (o) {
                    if (
                        (d &&
                            p.semver.prerelease &&
                            p.semver.prerelease.length &&
                            p.semver.major === d.major &&
                            p.semver.minor === d.minor &&
                            p.semver.patch === d.patch &&
                            (d = !1),
                        p.operator === "<" || p.operator === "<=")
                    ) {
                        if (((l = Ph(o, p, r)), l === p && l !== o)) return !1;
                    } else if (o.operator === "<=" && !Zr(o.semver, String(p), r)) return !1;
                }
                if (!p.operator && (o || i) && s !== 0) return !1;
            }
            return !((i && h && !o && s !== 0) || (o && c && !i && s !== 0) || m || d);
        },
        Dh = (e, t, r) => {
            if (!e) return t;
            let n = Ts(e.semver, t.semver, r);
            return n > 0 ? e : n < 0 || (t.operator === ">" && e.operator === ">=") ? t : e;
        },
        Ph = (e, t, r) => {
            if (!e) return t;
            let n = Ts(e.semver, t.semver, r);
            return n < 0 ? e : n > 0 || (t.operator === "<" && e.operator === "<=") ? t : e;
        };
    Fh.exports = MS;
});
var bs = g((HI, $h) => {
    var Cs = nr(),
        Lh = Yr(),
        jS = he(),
        Uh = fs(),
        WS = bt(),
        GS = ud(),
        VS = fd(),
        YS = pd(),
        zS = wd(),
        XS = yd(),
        KS = vd(),
        JS = Ad(),
        QS = Td(),
        ZS = Pe(),
        eA = Id(),
        tA = Rd(),
        rA = ii(),
        nA = qd(),
        iA = Ud(),
        oA = Xr(),
        sA = oi(),
        aA = hs(),
        lA = ps(),
        uA = si(),
        cA = ai(),
        fA = ms(),
        dA = Vd(),
        hA = Kr(),
        pA = Fe(),
        mA = Qr(),
        gA = ah(),
        wA = uh(),
        EA = fh(),
        yA = ph(),
        _A = gh(),
        vA = ci(),
        SA = Sh(),
        AA = xh(),
        xA = bh(),
        TA = Ih(),
        CA = qh();
    $h.exports = {
        parse: WS,
        valid: GS,
        clean: VS,
        inc: YS,
        diff: zS,
        major: XS,
        minor: KS,
        patch: JS,
        prerelease: QS,
        compare: ZS,
        rcompare: eA,
        compareLoose: tA,
        compareBuild: rA,
        sort: nA,
        rsort: iA,
        gt: oA,
        lt: sA,
        eq: aA,
        neq: lA,
        gte: uA,
        lte: cA,
        cmp: fA,
        coerce: dA,
        Comparator: hA,
        Range: pA,
        satisfies: mA,
        toComparators: gA,
        maxSatisfying: wA,
        minSatisfying: EA,
        minVersion: yA,
        validRange: _A,
        outside: vA,
        gtr: SA,
        ltr: AA,
        intersects: xA,
        simplifyRange: TA,
        subset: CA,
        SemVer: jS,
        re: Cs.re,
        src: Cs.src,
        tokens: Cs.t,
        SEMVER_SPEC_VERSION: Lh.SEMVER_SPEC_VERSION,
        RELEASE_TYPES: Lh.RELEASE_TYPES,
        compareIdentifiers: Uh.compareIdentifiers,
        rcompareIdentifiers: Uh.rcompareIdentifiers
    };
});
var yp = g((en, sr) => {
    var bA = 200,
        $s = "__lodash_hash_undefined__",
        Ei = 1,
        Kh = 2,
        Jh = 9007199254740991,
        fi = "[object Arguments]",
        Rs = "[object Array]",
        OA = "[object AsyncFunction]",
        Qh = "[object Boolean]",
        Zh = "[object Date]",
        ep = "[object Error]",
        tp = "[object Function]",
        IA = "[object GeneratorFunction]",
        di = "[object Map]",
        rp = "[object Number]",
        NA = "[object Null]",
        or = "[object Object]",
        kh = "[object Promise]",
        RA = "[object Proxy]",
        np = "[object RegExp]",
        hi = "[object Set]",
        ip = "[object String]",
        DA = "[object Symbol]",
        PA = "[object Undefined]",
        Ds = "[object WeakMap]",
        op = "[object ArrayBuffer]",
        pi = "[object DataView]",
        FA = "[object Float32Array]",
        qA = "[object Float64Array]",
        LA = "[object Int8Array]",
        UA = "[object Int16Array]",
        $A = "[object Int32Array]",
        kA = "[object Uint8Array]",
        MA = "[object Uint8ClampedArray]",
        BA = "[object Uint16Array]",
        HA = "[object Uint32Array]",
        jA = /[\\^$.*+?()[\]{}|]/g,
        WA = /^\[object .+?Constructor\]$/,
        GA = /^(?:0|[1-9]\d*)$/,
        z = {};
    z[FA] = z[qA] = z[LA] = z[UA] = z[$A] = z[kA] = z[MA] = z[BA] = z[HA] = !0;
    z[fi] = z[Rs] = z[op] = z[Qh] = z[pi] = z[Zh] = z[ep] = z[tp] = z[di] = z[rp] = z[or] = z[np] = z[hi] = z[ip] = z[Ds] = !1;
    var sp = typeof global == "object" && global && global.Object === Object && global,
        VA = typeof self == "object" && self && self.Object === Object && self,
        Xe = sp || VA || Function("return this")(),
        ap = typeof en == "object" && en && !en.nodeType && en,
        Mh = ap && typeof sr == "object" && sr && !sr.nodeType && sr,
        lp = Mh && Mh.exports === ap,
        Os = lp && sp.process,
        Bh = (function () {
            try {
                return Os && Os.binding && Os.binding("util");
            } catch {}
        })(),
        Hh = Bh && Bh.isTypedArray;
    function YA(e, t) {
        for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n; ) {
            var s = e[r];
            t(s, r, e) && (o[i++] = s);
        }
        return o;
    }
    function zA(e, t) {
        for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
        return e;
    }
    function XA(e, t) {
        for (var r = -1, n = e == null ? 0 : e.length; ++r < n; ) if (t(e[r], r, e)) return !0;
        return !1;
    }
    function KA(e, t) {
        for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
        return n;
    }
    function JA(e) {
        return function (t) {
            return e(t);
        };
    }
    function QA(e, t) {
        return e.has(t);
    }
    function ZA(e, t) {
        return e?.[t];
    }
    function ex(e) {
        var t = -1,
            r = Array(e.size);
        return (
            e.forEach(function (n, i) {
                r[++t] = [i, n];
            }),
            r
        );
    }
    function tx(e, t) {
        return function (r) {
            return e(t(r));
        };
    }
    function rx(e) {
        var t = -1,
            r = Array(e.size);
        return (
            e.forEach(function (n) {
                r[++t] = n;
            }),
            r
        );
    }
    var nx = Array.prototype,
        ix = Function.prototype,
        yi = Object.prototype,
        Is = Xe["__core-js_shared__"],
        up = ix.toString,
        Be = yi.hasOwnProperty,
        jh = (function () {
            var e = /[^.]+$/.exec((Is && Is.keys && Is.keys.IE_PROTO) || "");
            return e ? "Symbol(src)_1." + e : "";
        })(),
        cp = yi.toString,
        ox = RegExp(
            "^" +
                up
                    .call(Be)
                    .replace(jA, "\\$&")
                    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") +
                "$"
        ),
        Wh = lp ? Xe.Buffer : void 0,
        mi = Xe.Symbol,
        Gh = Xe.Uint8Array,
        fp = yi.propertyIsEnumerable,
        sx = nx.splice,
        Ot = mi ? mi.toStringTag : void 0,
        Vh = Object.getOwnPropertySymbols,
        ax = Wh ? Wh.isBuffer : void 0,
        lx = tx(Object.keys, Object),
        Ps = ar(Xe, "DataView"),
        tn = ar(Xe, "Map"),
        Fs = ar(Xe, "Promise"),
        qs = ar(Xe, "Set"),
        Ls = ar(Xe, "WeakMap"),
        rn = ar(Object, "create"),
        ux = Rt(Ps),
        cx = Rt(tn),
        fx = Rt(Fs),
        dx = Rt(qs),
        hx = Rt(Ls),
        Yh = mi ? mi.prototype : void 0,
        Ns = Yh ? Yh.valueOf : void 0;
    function It(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function px() {
        (this.__data__ = rn ? rn(null) : {}), (this.size = 0);
    }
    function mx(e) {
        var t = this.has(e) && delete this.__data__[e];
        return (this.size -= t ? 1 : 0), t;
    }
    function gx(e) {
        var t = this.__data__;
        if (rn) {
            var r = t[e];
            return r === $s ? void 0 : r;
        }
        return Be.call(t, e) ? t[e] : void 0;
    }
    function wx(e) {
        var t = this.__data__;
        return rn ? t[e] !== void 0 : Be.call(t, e);
    }
    function Ex(e, t) {
        var r = this.__data__;
        return (this.size += this.has(e) ? 0 : 1), (r[e] = rn && t === void 0 ? $s : t), this;
    }
    It.prototype.clear = px;
    It.prototype.delete = mx;
    It.prototype.get = gx;
    It.prototype.has = wx;
    It.prototype.set = Ex;
    function Ke(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function yx() {
        (this.__data__ = []), (this.size = 0);
    }
    function _x(e) {
        var t = this.__data__,
            r = _i(t, e);
        if (r < 0) return !1;
        var n = t.length - 1;
        return r == n ? t.pop() : sx.call(t, r, 1), --this.size, !0;
    }
    function vx(e) {
        var t = this.__data__,
            r = _i(t, e);
        return r < 0 ? void 0 : t[r][1];
    }
    function Sx(e) {
        return _i(this.__data__, e) > -1;
    }
    function Ax(e, t) {
        var r = this.__data__,
            n = _i(r, e);
        return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    Ke.prototype.clear = yx;
    Ke.prototype.delete = _x;
    Ke.prototype.get = vx;
    Ke.prototype.has = Sx;
    Ke.prototype.set = Ax;
    function Nt(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function xx() {
        (this.size = 0), (this.__data__ = { hash: new It(), map: new (tn || Ke)(), string: new It() });
    }
    function Tx(e) {
        var t = vi(this, e).delete(e);
        return (this.size -= t ? 1 : 0), t;
    }
    function Cx(e) {
        return vi(this, e).get(e);
    }
    function bx(e) {
        return vi(this, e).has(e);
    }
    function Ox(e, t) {
        var r = vi(this, e),
            n = r.size;
        return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    Nt.prototype.clear = xx;
    Nt.prototype.delete = Tx;
    Nt.prototype.get = Cx;
    Nt.prototype.has = bx;
    Nt.prototype.set = Ox;
    function gi(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.__data__ = new Nt(); ++t < r; ) this.add(e[t]);
    }
    function Ix(e) {
        return this.__data__.set(e, $s), this;
    }
    function Nx(e) {
        return this.__data__.has(e);
    }
    gi.prototype.add = gi.prototype.push = Ix;
    gi.prototype.has = Nx;
    function lt(e) {
        var t = (this.__data__ = new Ke(e));
        this.size = t.size;
    }
    function Rx() {
        (this.__data__ = new Ke()), (this.size = 0);
    }
    function Dx(e) {
        var t = this.__data__,
            r = t.delete(e);
        return (this.size = t.size), r;
    }
    function Px(e) {
        return this.__data__.get(e);
    }
    function Fx(e) {
        return this.__data__.has(e);
    }
    function qx(e, t) {
        var r = this.__data__;
        if (r instanceof Ke) {
            var n = r.__data__;
            if (!tn || n.length < bA - 1) return n.push([e, t]), (this.size = ++r.size), this;
            r = this.__data__ = new Nt(n);
        }
        return r.set(e, t), (this.size = r.size), this;
    }
    lt.prototype.clear = Rx;
    lt.prototype.delete = Dx;
    lt.prototype.get = Px;
    lt.prototype.has = Fx;
    lt.prototype.set = qx;
    function Lx(e, t) {
        var r = wi(e),
            n = !r && Jx(e),
            i = !r && !n && Us(e),
            o = !r && !n && !i && Ep(e),
            s = r || n || i || o,
            a = s ? KA(e.length, String) : [],
            l = a.length;
        for (var h in e)
            (t || Be.call(e, h)) &&
                !(
                    s &&
                    (h == "length" ||
                        (i && (h == "offset" || h == "parent")) ||
                        (o && (h == "buffer" || h == "byteLength" || h == "byteOffset")) ||
                        Vx(h, l))
                ) &&
                a.push(h);
        return a;
    }
    function _i(e, t) {
        for (var r = e.length; r--; ) if (pp(e[r][0], t)) return r;
        return -1;
    }
    function Ux(e, t, r) {
        var n = t(e);
        return wi(e) ? n : zA(n, r(e));
    }
    function on(e) {
        return e == null ? (e === void 0 ? PA : NA) : Ot && Ot in Object(e) ? Wx(e) : Kx(e);
    }
    function zh(e) {
        return nn(e) && on(e) == fi;
    }
    function dp(e, t, r, n, i) {
        return e === t ? !0 : e == null || t == null || (!nn(e) && !nn(t)) ? e !== e && t !== t : $x(e, t, r, n, dp, i);
    }
    function $x(e, t, r, n, i, o) {
        var s = wi(e),
            a = wi(t),
            l = s ? Rs : at(e),
            h = a ? Rs : at(t);
        (l = l == fi ? or : l), (h = h == fi ? or : h);
        var c = l == or,
            d = h == or,
            m = l == h;
        if (m && Us(e)) {
            if (!Us(t)) return !1;
            (s = !0), (c = !1);
        }
        if (m && !c) return o || (o = new lt()), s || Ep(e) ? hp(e, t, r, n, i, o) : Hx(e, t, l, r, n, i, o);
        if (!(r & Ei)) {
            var p = c && Be.call(e, "__wrapped__"),
                y = d && Be.call(t, "__wrapped__");
            if (p || y) {
                var _ = p ? e.value() : e,
                    v = y ? t.value() : t;
                return o || (o = new lt()), i(_, v, r, n, o);
            }
        }
        return m ? (o || (o = new lt()), jx(e, t, r, n, i, o)) : !1;
    }
    function kx(e) {
        if (!wp(e) || zx(e)) return !1;
        var t = mp(e) ? ox : WA;
        return t.test(Rt(e));
    }
    function Mx(e) {
        return nn(e) && gp(e.length) && !!z[on(e)];
    }
    function Bx(e) {
        if (!Xx(e)) return lx(e);
        var t = [];
        for (var r in Object(e)) Be.call(e, r) && r != "constructor" && t.push(r);
        return t;
    }
    function hp(e, t, r, n, i, o) {
        var s = r & Ei,
            a = e.length,
            l = t.length;
        if (a != l && !(s && l > a)) return !1;
        var h = o.get(e);
        if (h && o.get(t)) return h == t;
        var c = -1,
            d = !0,
            m = r & Kh ? new gi() : void 0;
        for (o.set(e, t), o.set(t, e); ++c < a; ) {
            var p = e[c],
                y = t[c];
            if (n) var _ = s ? n(y, p, c, t, e, o) : n(p, y, c, e, t, o);
            if (_ !== void 0) {
                if (_) continue;
                d = !1;
                break;
            }
            if (m) {
                if (
                    !XA(t, function (v, x) {
                        if (!QA(m, x) && (p === v || i(p, v, r, n, o))) return m.push(x);
                    })
                ) {
                    d = !1;
                    break;
                }
            } else if (!(p === y || i(p, y, r, n, o))) {
                d = !1;
                break;
            }
        }
        return o.delete(e), o.delete(t), d;
    }
    function Hx(e, t, r, n, i, o, s) {
        switch (r) {
            case pi:
                if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
                (e = e.buffer), (t = t.buffer);
            case op:
                return !(e.byteLength != t.byteLength || !o(new Gh(e), new Gh(t)));
            case Qh:
            case Zh:
            case rp:
                return pp(+e, +t);
            case ep:
                return e.name == t.name && e.message == t.message;
            case np:
            case ip:
                return e == t + "";
            case di:
                var a = ex;
            case hi:
                var l = n & Ei;
                if ((a || (a = rx), e.size != t.size && !l)) return !1;
                var h = s.get(e);
                if (h) return h == t;
                (n |= Kh), s.set(e, t);
                var c = hp(a(e), a(t), n, i, o, s);
                return s.delete(e), c;
            case DA:
                if (Ns) return Ns.call(e) == Ns.call(t);
        }
        return !1;
    }
    function jx(e, t, r, n, i, o) {
        var s = r & Ei,
            a = Xh(e),
            l = a.length,
            h = Xh(t),
            c = h.length;
        if (l != c && !s) return !1;
        for (var d = l; d--; ) {
            var m = a[d];
            if (!(s ? m in t : Be.call(t, m))) return !1;
        }
        var p = o.get(e);
        if (p && o.get(t)) return p == t;
        var y = !0;
        o.set(e, t), o.set(t, e);
        for (var _ = s; ++d < l; ) {
            m = a[d];
            var v = e[m],
                x = t[m];
            if (n) var A = s ? n(x, v, m, t, e, o) : n(v, x, m, e, t, o);
            if (!(A === void 0 ? v === x || i(v, x, r, n, o) : A)) {
                y = !1;
                break;
            }
            _ || (_ = m == "constructor");
        }
        if (y && !_) {
            var N = e.constructor,
                L = t.constructor;
            N != L &&
                "constructor" in e &&
                "constructor" in t &&
                !(typeof N == "function" && N instanceof N && typeof L == "function" && L instanceof L) &&
                (y = !1);
        }
        return o.delete(e), o.delete(t), y;
    }
    function Xh(e) {
        return Ux(e, eT, Gx);
    }
    function vi(e, t) {
        var r = e.__data__;
        return Yx(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    function ar(e, t) {
        var r = ZA(e, t);
        return kx(r) ? r : void 0;
    }
    function Wx(e) {
        var t = Be.call(e, Ot),
            r = e[Ot];
        try {
            e[Ot] = void 0;
            var n = !0;
        } catch {}
        var i = cp.call(e);
        return n && (t ? (e[Ot] = r) : delete e[Ot]), i;
    }
    var Gx = Vh
            ? function (e) {
                  return e == null
                      ? []
                      : ((e = Object(e)),
                        YA(Vh(e), function (t) {
                            return fp.call(e, t);
                        }));
              }
            : tT,
        at = on;
    ((Ps && at(new Ps(new ArrayBuffer(1))) != pi) ||
        (tn && at(new tn()) != di) ||
        (Fs && at(Fs.resolve()) != kh) ||
        (qs && at(new qs()) != hi) ||
        (Ls && at(new Ls()) != Ds)) &&
        (at = function (e) {
            var t = on(e),
                r = t == or ? e.constructor : void 0,
                n = r ? Rt(r) : "";
            if (n)
                switch (n) {
                    case ux:
                        return pi;
                    case cx:
                        return di;
                    case fx:
                        return kh;
                    case dx:
                        return hi;
                    case hx:
                        return Ds;
                }
            return t;
        });
    function Vx(e, t) {
        return (t = t ?? Jh), !!t && (typeof e == "number" || GA.test(e)) && e > -1 && e % 1 == 0 && e < t;
    }
    function Yx(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
    }
    function zx(e) {
        return !!jh && jh in e;
    }
    function Xx(e) {
        var t = e && e.constructor,
            r = (typeof t == "function" && t.prototype) || yi;
        return e === r;
    }
    function Kx(e) {
        return cp.call(e);
    }
    function Rt(e) {
        if (e != null) {
            try {
                return up.call(e);
            } catch {}
            try {
                return e + "";
            } catch {}
        }
        return "";
    }
    function pp(e, t) {
        return e === t || (e !== e && t !== t);
    }
    var Jx = zh(
            (function () {
                return arguments;
            })()
        )
            ? zh
            : function (e) {
                  return nn(e) && Be.call(e, "callee") && !fp.call(e, "callee");
              },
        wi = Array.isArray;
    function Qx(e) {
        return e != null && gp(e.length) && !mp(e);
    }
    var Us = ax || rT;
    function Zx(e, t) {
        return dp(e, t);
    }
    function mp(e) {
        if (!wp(e)) return !1;
        var t = on(e);
        return t == tp || t == IA || t == OA || t == RA;
    }
    function gp(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Jh;
    }
    function wp(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
    }
    function nn(e) {
        return e != null && typeof e == "object";
    }
    var Ep = Hh ? JA(Hh) : Mx;
    function eT(e) {
        return Qx(e) ? Lx(e) : Bx(e);
    }
    function tT() {
        return [];
    }
    function rT() {
        return !1;
    }
    sr.exports = Zx;
});
var vp = g(an => {
    "use strict";
    Object.defineProperty(an, "__esModule", { value: !0 });
    an.DownloadedUpdateHelper = void 0;
    an.createTempUpdateFile = sT;
    var nT = require("crypto"),
        iT = require("fs"),
        _p = yp(),
        Dt = Ve(),
        sn = require("path"),
        ks = class {
            constructor(t) {
                (this.cacheDir = t),
                    (this._file = null),
                    (this._packageFile = null),
                    (this.versionInfo = null),
                    (this.fileInfo = null),
                    (this._downloadedFileInfo = null);
            }
            get downloadedFileInfo() {
                return this._downloadedFileInfo;
            }
            get file() {
                return this._file;
            }
            get packageFile() {
                return this._packageFile;
            }
            get cacheDirForPendingUpdate() {
                return sn.join(this.cacheDir, "pending");
            }
            async validateDownloadedPath(t, r, n, i) {
                if (this.versionInfo != null && this.file === t && this.fileInfo != null)
                    return _p(this.versionInfo, r) && _p(this.fileInfo.info, n.info) && (await (0, Dt.pathExists)(t)) ? t : null;
                let o = await this.getValidCachedUpdateFile(n, i);
                return o === null ? null : (i.info(`Update has already been downloaded to ${t}).`), (this._file = o), o);
            }
            async setDownloadedFile(t, r, n, i, o, s) {
                (this._file = t),
                    (this._packageFile = r),
                    (this.versionInfo = n),
                    (this.fileInfo = i),
                    (this._downloadedFileInfo = {
                        fileName: o,
                        sha512: i.info.sha512,
                        isAdminRightsRequired: i.info.isAdminRightsRequired === !0
                    }),
                    s && (await (0, Dt.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo));
            }
            async clear() {
                (this._file = null),
                    (this._packageFile = null),
                    (this.versionInfo = null),
                    (this.fileInfo = null),
                    await this.cleanCacheDirForPendingUpdate();
            }
            async cleanCacheDirForPendingUpdate() {
                try {
                    await (0, Dt.emptyDir)(this.cacheDirForPendingUpdate);
                } catch {}
            }
            async getValidCachedUpdateFile(t, r) {
                var n;
                let i = this.getUpdateInfoFile();
                if (!(await (0, Dt.pathExists)(i))) return null;
                let s;
                try {
                    s = await (0, Dt.readJson)(i);
                } catch (c) {
                    let d = "No cached update info available";
                    return (
                        c.code !== "ENOENT" &&
                            (await this.cleanCacheDirForPendingUpdate(), (d += ` (error on read: ${c.message})`)),
                        r.info(d),
                        null
                    );
                }
                if (!((n = s?.fileName !== null) !== null && n !== void 0 ? n : !1))
                    return (
                        r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"),
                        await this.cleanCacheDirForPendingUpdate(),
                        null
                    );
                if (t.info.sha512 !== s.sha512)
                    return (
                        r.info(
                            `Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${s.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`
                        ),
                        await this.cleanCacheDirForPendingUpdate(),
                        null
                    );
                let l = sn.join(this.cacheDirForPendingUpdate, s.fileName);
                if (!(await (0, Dt.pathExists)(l))) return r.info("Cached update file doesn't exist"), null;
                let h = await oT(l);
                return t.info.sha512 !== h
                    ? (r.warn(
                          `Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${h}, expected: ${t.info.sha512}`
                      ),
                      await this.cleanCacheDirForPendingUpdate(),
                      null)
                    : ((this._downloadedFileInfo = s), l);
            }
            getUpdateInfoFile() {
                return sn.join(this.cacheDirForPendingUpdate, "update-info.json");
            }
        };
    an.DownloadedUpdateHelper = ks;
    function oT(e, t = "sha512", r = "base64", n) {
        return new Promise((i, o) => {
            let s = (0, nT.createHash)(t);
            s.on("error", o).setEncoding(r),
                (0, iT.createReadStream)(e, { ...n, highWaterMark: 1024 * 1024 })
                    .on("error", o)
                    .on("end", () => {
                        s.end(), i(s.read());
                    })
                    .pipe(s, { end: !1 });
        });
    }
    async function sT(e, t, r) {
        let n = 0,
            i = sn.join(t, e);
        for (let o = 0; o < 3; o++)
            try {
                return await (0, Dt.unlink)(i), i;
            } catch (s) {
                if (s.code === "ENOENT") return i;
                r.warn(`Error on remove temp update file: ${s}`), (i = sn.join(t, `${n++}-${e}`));
            }
        return i;
    }
});
var Sp = g(Bs => {
    "use strict";
    Object.defineProperty(Bs, "__esModule", { value: !0 });
    Bs.getAppCacheDir = lT;
    var Ms = require("path"),
        aT = require("os");
    function lT() {
        let e = (0, aT.homedir)(),
            t;
        return (
            process.platform === "win32"
                ? (t = process.env.LOCALAPPDATA || Ms.join(e, "AppData", "Local"))
                : process.platform === "darwin"
                ? (t = Ms.join(e, "Library", "Caches"))
                : (t = process.env.XDG_CACHE_HOME || Ms.join(e, ".cache")),
            t
        );
    }
});
var xp = g(Si => {
    "use strict";
    Object.defineProperty(Si, "__esModule", { value: !0 });
    Si.ElectronAppAdapter = void 0;
    var Ap = require("path"),
        uT = Sp(),
        Hs = class {
            constructor(t = require("electron").app) {
                this.app = t;
            }
            whenReady() {
                return this.app.whenReady();
            }
            get version() {
                return this.app.getVersion();
            }
            get name() {
                return this.app.getName();
            }
            get isPackaged() {
                return this.app.isPackaged === !0;
            }
            get appUpdateConfigPath() {
                return this.isPackaged
                    ? Ap.join(process.resourcesPath, "app-update.yml")
                    : Ap.join(this.app.getAppPath(), "dev-app-update.yml");
            }
            get userDataPath() {
                return this.app.getPath("userData");
            }
            get baseCachePath() {
                return (0, uT.getAppCacheDir)();
            }
            quit() {
                this.app.quit();
            }
            relaunch() {
                this.app.relaunch();
            }
            onQuit(t) {
                this.app.once("quit", (r, n) => t(n));
            }
        };
    Si.ElectronAppAdapter = Hs;
});
var Cp = g(ut => {
    "use strict";
    Object.defineProperty(ut, "__esModule", { value: !0 });
    ut.ElectronHttpExecutor = ut.NET_SESSION_NAME = void 0;
    ut.getNetSession = Tp;
    var Ai = ie();
    ut.NET_SESSION_NAME = "electron-updater";
    function Tp() {
        return require("electron").session.fromPartition(ut.NET_SESSION_NAME, { cache: !1 });
    }
    var js = class extends Ai.HttpExecutor {
        constructor(t) {
            super(), (this.proxyLoginCallback = t), (this.cachedSession = null);
        }
        async download(t, r, n) {
            return await n.cancellationToken.createPromise((i, o, s) => {
                let a = { headers: n.headers || void 0, redirect: "manual" };
                (0, Ai.configureRequestUrl)(t, a),
                    (0, Ai.configureRequestOptions)(a),
                    this.doDownload(
                        a,
                        {
                            destination: r,
                            options: n,
                            onCancel: s,
                            callback: l => {
                                l == null ? i(r) : o(l);
                            },
                            responseHandler: null
                        },
                        0
                    );
            });
        }
        createRequest(t, r) {
            t.headers && t.headers.Host && ((t.host = t.headers.Host), delete t.headers.Host),
                this.cachedSession == null && (this.cachedSession = Tp());
            let n = require("electron").net.request({ ...t, session: this.cachedSession });
            return n.on("response", r), this.proxyLoginCallback != null && n.on("login", this.proxyLoginCallback), n;
        }
        addRedirectHandlers(t, r, n, i, o) {
            t.on("redirect", (s, a, l) => {
                t.abort(),
                    i > this.maxRedirects ? n(this.createMaxRedirectError()) : o(Ai.HttpExecutor.prepareRedirectUrlOptions(l, r));
            });
        }
    };
    ut.ElectronHttpExecutor = js;
});
var Dp = g((YI, Rp) => {
    var cT = 1 / 0,
        fT = "[object Symbol]",
        Np = /[\\^$.*+?()[\]{}|]/g,
        dT = RegExp(Np.source),
        hT = typeof global == "object" && global && global.Object === Object && global,
        pT = typeof self == "object" && self && self.Object === Object && self,
        mT = hT || pT || Function("return this")(),
        gT = Object.prototype,
        wT = gT.toString,
        bp = mT.Symbol,
        Op = bp ? bp.prototype : void 0,
        Ip = Op ? Op.toString : void 0;
    function ET(e) {
        if (typeof e == "string") return e;
        if (_T(e)) return Ip ? Ip.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -cT ? "-0" : t;
    }
    function yT(e) {
        return !!e && typeof e == "object";
    }
    function _T(e) {
        return typeof e == "symbol" || (yT(e) && wT.call(e) == fT);
    }
    function vT(e) {
        return e == null ? "" : ET(e);
    }
    function ST(e) {
        return (e = vT(e)), e && dT.test(e) ? e.replace(Np, "\\$&") : e;
    }
    Rp.exports = ST;
});
var ct = g(lr => {
    "use strict";
    Object.defineProperty(lr, "__esModule", { value: !0 });
    lr.newBaseUrl = xT;
    lr.newUrlFromBase = Ws;
    lr.getChannelFilename = TT;
    lr.blockmapFiles = CT;
    var Pp = require("url"),
        AT = Dp();
    function xT(e) {
        let t = new Pp.URL(e);
        return t.pathname.endsWith("/") || (t.pathname += "/"), t;
    }
    function Ws(e, t, r = !1) {
        let n = new Pp.URL(e, t),
            i = t.search;
        return i != null && i.length !== 0 ? (n.search = i) : r && (n.search = `noCache=${Date.now().toString(32)}`), n;
    }
    function TT(e) {
        return `${e}.yml`;
    }
    function CT(e, t, r) {
        let n = Ws(`${e.pathname}.blockmap`, e);
        return [Ws(`${e.pathname.replace(new RegExp(AT(r), "g"), t)}.blockmap`, e), n];
    }
});
var qe = g(dt => {
    "use strict";
    Object.defineProperty(dt, "__esModule", { value: !0 });
    dt.Provider = void 0;
    dt.findFile = OT;
    dt.parseUpdateInfo = IT;
    dt.getFileList = qp;
    dt.resolveFiles = NT;
    var ft = ie(),
        bT = Zn(),
        Fp = ct(),
        Gs = class {
            constructor(t) {
                (this.runtimeOptions = t), (this.requestHeaders = null), (this.executor = t.executor);
            }
            get isUseMultipleRangeRequest() {
                return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
            }
            getChannelFilePrefix() {
                if (this.runtimeOptions.platform === "linux") {
                    let t = process.env.TEST_UPDATER_ARCH || process.arch;
                    return "-linux" + (t === "x64" ? "" : `-${t}`);
                } else return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
            }
            getDefaultChannelName() {
                return this.getCustomChannelName("latest");
            }
            getCustomChannelName(t) {
                return `${t}${this.getChannelFilePrefix()}`;
            }
            get fileExtraDownloadHeaders() {
                return null;
            }
            setRequestHeaders(t) {
                this.requestHeaders = t;
            }
            httpRequest(t, r, n) {
                return this.executor.request(this.createRequestOptions(t, r), n);
            }
            createRequestOptions(t, r) {
                let n = {};
                return (
                    this.requestHeaders == null
                        ? r != null && (n.headers = r)
                        : (n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }),
                    (0, ft.configureRequestUrl)(t, n),
                    n
                );
            }
        };
    dt.Provider = Gs;
    function OT(e, t, r) {
        if (e.length === 0) throw (0, ft.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
        let n = e.find(i => i.url.pathname.toLowerCase().endsWith(`.${t}`));
        return n ?? (r == null ? e[0] : e.find(i => !r.some(o => i.url.pathname.toLowerCase().endsWith(`.${o}`))));
    }
    function IT(e, t, r) {
        if (e == null)
            throw (0, ft.newError)(
                `Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`,
                "ERR_UPDATER_INVALID_UPDATE_INFO"
            );
        let n;
        try {
            n = (0, bT.load)(e);
        } catch (i) {
            throw (0, ft.newError)(
                `Cannot parse update info from ${t} in the latest release artifacts (${r}): ${
                    i.stack || i.message
                }, rawData: ${e}`,
                "ERR_UPDATER_INVALID_UPDATE_INFO"
            );
        }
        return n;
    }
    function qp(e) {
        let t = e.files;
        if (t != null && t.length > 0) return t;
        if (e.path != null) return [{ url: e.path, sha2: e.sha2, sha512: e.sha512 }];
        throw (0, ft.newError)(`No files provided: ${(0, ft.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
    }
    function NT(e, t, r = n => n) {
        let i = qp(e).map(a => {
                if (a.sha2 == null && a.sha512 == null)
                    throw (0, ft.newError)(
                        `Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, ft.safeStringifyJson)(a)}`,
                        "ERR_UPDATER_NO_CHECKSUM"
                    );
                return { url: (0, Fp.newUrlFromBase)(r(a.url), t), info: a };
            }),
            o = e.packages,
            s = o == null ? null : o[process.arch] || o.ia32;
        return s != null && (i[0].packageInfo = { ...s, path: (0, Fp.newUrlFromBase)(r(s.path), t).href }), i;
    }
});
var Xs = g(xi => {
    "use strict";
    Object.defineProperty(xi, "__esModule", { value: !0 });
    xi.GenericProvider = void 0;
    var Lp = ie(),
        Vs = ct(),
        Ys = qe(),
        zs = class extends Ys.Provider {
            constructor(t, r, n) {
                super(n),
                    (this.configuration = t),
                    (this.updater = r),
                    (this.baseUrl = (0, Vs.newBaseUrl)(this.configuration.url));
            }
            get channel() {
                let t = this.updater.channel || this.configuration.channel;
                return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
            }
            async getLatestVersion() {
                let t = (0, Vs.getChannelFilename)(this.channel),
                    r = (0, Vs.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
                for (let n = 0; ; n++)
                    try {
                        return (0, Ys.parseUpdateInfo)(await this.httpRequest(r), t, r);
                    } catch (i) {
                        if (i instanceof Lp.HttpError && i.statusCode === 404)
                            throw (0, Lp.newError)(
                                `Cannot find channel "${t}" update info: ${i.stack || i.message}`,
                                "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                            );
                        if (i.code === "ECONNREFUSED" && n < 3) {
                            await new Promise((o, s) => {
                                try {
                                    setTimeout(o, 1e3 * n);
                                } catch (a) {
                                    s(a);
                                }
                            });
                            continue;
                        }
                        throw i;
                    }
            }
            resolveFiles(t) {
                return (0, Ys.resolveFiles)(t, this.baseUrl);
            }
        };
    xi.GenericProvider = zs;
});
var $p = g(Ti => {
    "use strict";
    Object.defineProperty(Ti, "__esModule", { value: !0 });
    Ti.BitbucketProvider = void 0;
    var Up = ie(),
        Ks = ct(),
        Js = qe(),
        Qs = class extends Js.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }), (this.configuration = t), (this.updater = r);
                let { owner: i, slug: o } = t;
                this.baseUrl = (0, Ks.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
            }
            get channel() {
                return this.updater.channel || this.configuration.channel || "latest";
            }
            async getLatestVersion() {
                let t = new Up.CancellationToken(),
                    r = (0, Ks.getChannelFilename)(this.getCustomChannelName(this.channel)),
                    n = (0, Ks.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
                try {
                    let i = await this.httpRequest(n, void 0, t);
                    return (0, Js.parseUpdateInfo)(i, r, n);
                } catch (i) {
                    throw (0, Up.newError)(
                        `Unable to find latest version on ${this.toString()}, please ensure release exists: ${
                            i.stack || i.message
                        }`,
                        "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                    );
                }
            }
            resolveFiles(t) {
                return (0, Js.resolveFiles)(t, this.baseUrl);
            }
            toString() {
                let { owner: t, slug: r } = this.configuration;
                return `Bitbucket (owner: ${t}, slug: ${r}, channel: ${this.channel})`;
            }
        };
    Ti.BitbucketProvider = Qs;
});
var ra = g(Pt => {
    "use strict";
    Object.defineProperty(Pt, "__esModule", { value: !0 });
    Pt.GitHubProvider = Pt.BaseGitHubProvider = void 0;
    Pt.computeReleaseNotes = Mp;
    var Je = ie(),
        ur = bs(),
        RT = require("url"),
        cr = ct(),
        ea = qe(),
        Zs = /\/tag\/([^/]+)$/,
        Ci = class extends ea.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }),
                    (this.options = t),
                    (this.baseUrl = (0, cr.newBaseUrl)((0, Je.githubUrl)(t, r)));
                let i = r === "github.com" ? "api.github.com" : r;
                this.baseApiUrl = (0, cr.newBaseUrl)((0, Je.githubUrl)(t, i));
            }
            computeGithubBasePath(t) {
                let r = this.options.host;
                return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
            }
        };
    Pt.BaseGitHubProvider = Ci;
    var ta = class extends Ci {
        constructor(t, r, n) {
            super(t, "github.com", n), (this.options = t), (this.updater = r);
        }
        get channel() {
            let t = this.updater.channel || this.options.channel;
            return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
        }
        async getLatestVersion() {
            var t, r, n, i, o;
            let s = new Je.CancellationToken(),
                a = await this.httpRequest(
                    (0, cr.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl),
                    { accept: "application/xml, application/atom+xml, text/xml, */*" },
                    s
                ),
                l = (0, Je.parseXml)(a),
                h = l.element("entry", !1, "No published versions on GitHub"),
                c = null;
            try {
                if (this.updater.allowPrerelease) {
                    let v =
                        ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) ||
                        ((r = ur.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) ||
                        null;
                    if (v === null) c = Zs.exec(h.element("link").attribute("href"))[1];
                    else
                        for (let x of l.getElements("entry")) {
                            let A = Zs.exec(x.element("link").attribute("href"));
                            if (A === null) continue;
                            let N = A[1],
                                L = ((n = ur.prerelease(N)) === null || n === void 0 ? void 0 : n[0]) || null,
                                De = !v || ["alpha", "beta"].includes(v),
                                V = L !== null && !["alpha", "beta"].includes(String(L));
                            if (De && !V && !(v === "beta" && L === "alpha")) {
                                c = N;
                                break;
                            }
                            if (L && L === v) {
                                c = N;
                                break;
                            }
                        }
                } else {
                    c = await this.getLatestTagName(s);
                    for (let v of l.getElements("entry"))
                        if (Zs.exec(v.element("link").attribute("href"))[1] === c) {
                            h = v;
                            break;
                        }
                }
            } catch (v) {
                throw (0, Je.newError)(
                    `Cannot parse releases feed: ${v.stack || v.message},
XML:
${a}`,
                    "ERR_UPDATER_INVALID_RELEASE_FEED"
                );
            }
            if (c == null) throw (0, Je.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
            let d,
                m = "",
                p = "",
                y = async v => {
                    (m = (0, cr.getChannelFilename)(v)),
                        (p = (0, cr.newUrlFromBase)(this.getBaseDownloadPath(String(c), m), this.baseUrl));
                    let x = this.createRequestOptions(p);
                    try {
                        return await this.executor.request(x, s);
                    } catch (A) {
                        throw A instanceof Je.HttpError && A.statusCode === 404
                            ? (0, Je.newError)(
                                  `Cannot find ${m} in the latest release artifacts (${p}): ${A.stack || A.message}`,
                                  "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                              )
                            : A;
                    }
                };
            try {
                let v = this.channel;
                this.updater.allowPrerelease &&
                    !((i = ur.prerelease(c)) === null || i === void 0) &&
                    i[0] &&
                    (v = this.getCustomChannelName(String((o = ur.prerelease(c)) === null || o === void 0 ? void 0 : o[0]))),
                    (d = await y(v));
            } catch (v) {
                if (this.updater.allowPrerelease) d = await y(this.getDefaultChannelName());
                else throw v;
            }
            let _ = (0, ea.parseUpdateInfo)(d, m, p);
            return (
                _.releaseName == null && (_.releaseName = h.elementValueOrEmpty("title")),
                _.releaseNotes == null && (_.releaseNotes = Mp(this.updater.currentVersion, this.updater.fullChangelog, l, h)),
                { tag: c, ..._ }
            );
        }
        async getLatestTagName(t) {
            let r = this.options,
                n =
                    r.host == null || r.host === "github.com"
                        ? (0, cr.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl)
                        : new RT.URL(
                              `${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`,
                              this.baseApiUrl
                          );
            try {
                let i = await this.httpRequest(n, { Accept: "application/json" }, t);
                return i == null ? null : JSON.parse(i).tag_name;
            } catch (i) {
                throw (0, Je.newError)(
                    `Unable to find latest version on GitHub (${n}), please ensure a production release exists: ${
                        i.stack || i.message
                    }`,
                    "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                );
            }
        }
        get basePath() {
            return `/${this.options.owner}/${this.options.repo}/releases`;
        }
        resolveFiles(t) {
            return (0, ea.resolveFiles)(t, this.baseUrl, r => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
        }
        getBaseDownloadPath(t, r) {
            return `${this.basePath}/download/${t}/${r}`;
        }
    };
    Pt.GitHubProvider = ta;
    function kp(e) {
        let t = e.elementValueOrEmpty("content");
        return t === "No content." ? "" : t;
    }
    function Mp(e, t, r, n) {
        if (!t) return kp(n);
        let i = [];
        for (let o of r.getElements("entry")) {
            let s = /\/tag\/v?([^/]+)$/.exec(o.element("link").attribute("href"))[1];
            ur.lt(e, s) && i.push({ version: s, note: kp(o) });
        }
        return i.sort((o, s) => ur.rcompare(o.version, s.version));
    }
});
var Hp = g(bi => {
    "use strict";
    Object.defineProperty(bi, "__esModule", { value: !0 });
    bi.KeygenProvider = void 0;
    var Bp = ie(),
        na = ct(),
        ia = qe(),
        oa = class extends ia.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }),
                    (this.configuration = t),
                    (this.updater = r),
                    (this.baseUrl = (0, na.newBaseUrl)(
                        `https://api.keygen.sh/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`
                    ));
            }
            get channel() {
                return this.updater.channel || this.configuration.channel || "stable";
            }
            async getLatestVersion() {
                let t = new Bp.CancellationToken(),
                    r = (0, na.getChannelFilename)(this.getCustomChannelName(this.channel)),
                    n = (0, na.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
                try {
                    let i = await this.httpRequest(n, { "Accept": "application/vnd.api+json", "Keygen-Version": "1.1" }, t);
                    return (0, ia.parseUpdateInfo)(i, r, n);
                } catch (i) {
                    throw (0, Bp.newError)(
                        `Unable to find latest version on ${this.toString()}, please ensure release exists: ${
                            i.stack || i.message
                        }`,
                        "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                    );
                }
            }
            resolveFiles(t) {
                return (0, ia.resolveFiles)(t, this.baseUrl);
            }
            toString() {
                let { account: t, product: r, platform: n } = this.configuration;
                return `Keygen (account: ${t}, product: ${r}, platform: ${n}, channel: ${this.channel})`;
            }
        };
    bi.KeygenProvider = oa;
});
var Gp = g(Oi => {
    "use strict";
    Object.defineProperty(Oi, "__esModule", { value: !0 });
    Oi.PrivateGitHubProvider = void 0;
    var fr = ie(),
        DT = Zn(),
        PT = require("path"),
        jp = require("url"),
        Wp = ct(),
        FT = ra(),
        qT = qe(),
        sa = class extends FT.BaseGitHubProvider {
            constructor(t, r, n, i) {
                super(t, "api.github.com", i), (this.updater = r), (this.token = n);
            }
            createRequestOptions(t, r) {
                let n = super.createRequestOptions(t, r);
                return (n.redirect = "manual"), n;
            }
            async getLatestVersion() {
                let t = new fr.CancellationToken(),
                    r = (0, Wp.getChannelFilename)(this.getDefaultChannelName()),
                    n = await this.getLatestVersionInfo(t),
                    i = n.assets.find(a => a.name === r);
                if (i == null)
                    throw (0, fr.newError)(
                        `Cannot find ${r} in the release ${n.html_url || n.name}`,
                        "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                    );
                let o = new jp.URL(i.url),
                    s;
                try {
                    s = (0, DT.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
                } catch (a) {
                    throw a instanceof fr.HttpError && a.statusCode === 404
                        ? (0, fr.newError)(
                              `Cannot find ${r} in the latest release artifacts (${o}): ${a.stack || a.message}`,
                              "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                          )
                        : a;
                }
                return (s.assets = n.assets), s;
            }
            get fileExtraDownloadHeaders() {
                return this.configureHeaders("application/octet-stream");
            }
            configureHeaders(t) {
                return { accept: t, authorization: `token ${this.token}` };
            }
            async getLatestVersionInfo(t) {
                let r = this.updater.allowPrerelease,
                    n = this.basePath;
                r || (n = `${n}/latest`);
                let i = (0, Wp.newUrlFromBase)(n, this.baseUrl);
                try {
                    let o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
                    return r ? o.find(s => s.prerelease) || o[0] : o;
                } catch (o) {
                    throw (0, fr.newError)(
                        `Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${
                            o.stack || o.message
                        }`,
                        "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                    );
                }
            }
            get basePath() {
                return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
            }
            resolveFiles(t) {
                return (0, qT.getFileList)(t).map(r => {
                    let n = PT.posix.basename(r.url).replace(/ /g, "-"),
                        i = t.assets.find(o => o != null && o.name === n);
                    if (i == null)
                        throw (0, fr.newError)(
                            `Cannot find asset "${n}" in: ${JSON.stringify(t.assets, null, 2)}`,
                            "ERR_UPDATER_ASSET_NOT_FOUND"
                        );
                    return { url: new jp.URL(i.url), info: r };
                });
            }
        };
    Oi.PrivateGitHubProvider = sa;
});
var zp = g(Ni => {
    "use strict";
    Object.defineProperty(Ni, "__esModule", { value: !0 });
    Ni.isUrlProbablySupportMultiRangeRequests = Yp;
    Ni.createClient = MT;
    var Ii = ie(),
        LT = $p(),
        Vp = Xs(),
        UT = ra(),
        $T = Hp(),
        kT = Gp();
    function Yp(e) {
        return !e.includes("s3.amazonaws.com");
    }
    function MT(e, t, r) {
        if (typeof e == "string")
            throw (0, Ii.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        let n = e.provider;
        switch (n) {
            case "github": {
                let i = e,
                    o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
                return o == null ? new UT.GitHubProvider(i, t, r) : new kT.PrivateGitHubProvider(i, t, o, r);
            }
            case "bitbucket":
                return new LT.BitbucketProvider(e, t, r);
            case "keygen":
                return new $T.KeygenProvider(e, t, r);
            case "s3":
            case "spaces":
                return new Vp.GenericProvider(
                    { provider: "generic", url: (0, Ii.getS3LikeProviderBaseUrl)(e), channel: e.channel || null },
                    t,
                    { ...r, isUseMultipleRangeRequest: !1 }
                );
            case "generic": {
                let i = e;
                return new Vp.GenericProvider(i, t, {
                    ...r,
                    isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && Yp(i.url)
                });
            }
            case "custom": {
                let i = e,
                    o = i.updateProvider;
                if (!o) throw (0, Ii.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
                return new o(i, t, r);
            }
            default:
                throw (0, Ii.newError)(`Unsupported provider: ${n}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
        }
    }
});
var Ri = g(ln => {
    "use strict";
    Object.defineProperty(ln, "__esModule", { value: !0 });
    ln.OperationKind = void 0;
    ln.computeOperations = BT;
    var Ft;
    (function (e) {
        (e[(e.COPY = 0)] = "COPY"), (e[(e.DOWNLOAD = 1)] = "DOWNLOAD");
    })(Ft || (ln.OperationKind = Ft = {}));
    function BT(e, t, r) {
        let n = Kp(e.files),
            i = Kp(t.files),
            o = null,
            s = t.files[0],
            a = [],
            l = s.name,
            h = n.get(l);
        if (h == null) throw new Error(`no file ${l} in old blockmap`);
        let c = i.get(l),
            d = 0,
            { checksumToOffset: m, checksumToOldSize: p } = jT(n.get(l), h.offset, r),
            y = s.offset;
        for (let _ = 0; _ < c.checksums.length; y += c.sizes[_], _++) {
            let v = c.sizes[_],
                x = c.checksums[_],
                A = m.get(x);
            A != null &&
                p.get(x) !== v &&
                (r.warn(`Checksum ("${x}") matches, but size differs (old: ${p.get(x)}, new: ${v})`), (A = void 0)),
                A === void 0
                    ? (d++,
                      o != null && o.kind === Ft.DOWNLOAD && o.end === y
                          ? (o.end += v)
                          : ((o = { kind: Ft.DOWNLOAD, start: y, end: y + v }), Xp(o, a, x, _)))
                    : o != null && o.kind === Ft.COPY && o.end === A
                    ? (o.end += v)
                    : ((o = { kind: Ft.COPY, start: A, end: A + v }), Xp(o, a, x, _));
        }
        return d > 0 && r.info(`File${s.name === "file" ? "" : " " + s.name} has ${d} changed blocks`), a;
    }
    var HT = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
    function Xp(e, t, r, n) {
        if (HT && t.length !== 0) {
            let i = t[t.length - 1];
            if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
                let o = [i.start, i.end, e.start, e.end].reduce((s, a) => (s < a ? s : a));
                throw new Error(`operation (block index: ${n}, checksum: ${r}, kind: ${
                    Ft[e.kind]
                }) overlaps previous operation (checksum: ${r}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - o} until ${i.end - o} and ${e.start - o} until ${e.end - o}`);
            }
        }
        t.push(e);
    }
    function jT(e, t, r) {
        let n = new Map(),
            i = new Map(),
            o = t;
        for (let s = 0; s < e.checksums.length; s++) {
            let a = e.checksums[s],
                l = e.sizes[s],
                h = i.get(a);
            if (h === void 0) n.set(a, o), i.set(a, l);
            else if (r.debug != null) {
                let c = h === l ? "(same size)" : `(size: ${h}, this size: ${l})`;
                r.debug(
                    `${a} duplicated in blockmap ${c}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`
                );
            }
            o += l;
        }
        return { checksumToOffset: n, checksumToOldSize: i };
    }
    function Kp(e) {
        let t = new Map();
        for (let r of e) t.set(r.name, r);
        return t;
    }
});
var la = g(un => {
    "use strict";
    Object.defineProperty(un, "__esModule", { value: !0 });
    un.DataSplitter = void 0;
    un.copyData = Qp;
    var Di = ie(),
        WT = require("fs"),
        GT = require("stream"),
        VT = Ri(),
        Jp = Buffer.from(`\r
\r
`),
        ht;
    (function (e) {
        (e[(e.INIT = 0)] = "INIT"), (e[(e.HEADER = 1)] = "HEADER"), (e[(e.BODY = 2)] = "BODY");
    })(ht || (ht = {}));
    function Qp(e, t, r, n, i) {
        let o = (0, WT.createReadStream)("", { fd: r, autoClose: !1, start: e.start, end: e.end - 1 });
        o.on("error", n), o.once("end", i), o.pipe(t, { end: !1 });
    }
    var aa = class extends GT.Writable {
        constructor(t, r, n, i, o, s) {
            super(),
                (this.out = t),
                (this.options = r),
                (this.partIndexToTaskIndex = n),
                (this.partIndexToLength = o),
                (this.finishHandler = s),
                (this.partIndex = -1),
                (this.headerListBuffer = null),
                (this.readState = ht.INIT),
                (this.ignoreByteCount = 0),
                (this.remainingPartDataCount = 0),
                (this.actualPartLength = 0),
                (this.boundaryLength = i.length + 4),
                (this.ignoreByteCount = this.boundaryLength - 2);
        }
        get isFinished() {
            return this.partIndex === this.partIndexToLength.length;
        }
        _write(t, r, n) {
            if (this.isFinished) {
                console.error(`Trailing ignored data: ${t.length} bytes`);
                return;
            }
            this.handleData(t).then(n).catch(n);
        }
        async handleData(t) {
            let r = 0;
            if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
                throw (0, Di.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
            if (this.ignoreByteCount > 0) {
                let n = Math.min(this.ignoreByteCount, t.length);
                (this.ignoreByteCount -= n), (r = n);
            } else if (this.remainingPartDataCount > 0) {
                let n = Math.min(this.remainingPartDataCount, t.length);
                (this.remainingPartDataCount -= n), await this.processPartData(t, 0, n), (r = n);
            }
            if (r !== t.length) {
                if (this.readState === ht.HEADER) {
                    let n = this.searchHeaderListEnd(t, r);
                    if (n === -1) return;
                    (r = n), (this.readState = ht.BODY), (this.headerListBuffer = null);
                }
                for (;;) {
                    if (this.readState === ht.BODY) this.readState = ht.INIT;
                    else {
                        this.partIndex++;
                        let s = this.partIndexToTaskIndex.get(this.partIndex);
                        if (s == null)
                            if (this.isFinished) s = this.options.end;
                            else throw (0, Di.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
                        let a = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
                        if (a < s) await this.copyExistingData(a, s);
                        else if (a > s)
                            throw (0, Di.newError)(
                                "prevTaskIndex must be < taskIndex",
                                "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED"
                            );
                        if (this.isFinished) {
                            this.onPartEnd(), this.finishHandler();
                            return;
                        }
                        if (((r = this.searchHeaderListEnd(t, r)), r === -1)) {
                            this.readState = ht.HEADER;
                            return;
                        }
                    }
                    let n = this.partIndexToLength[this.partIndex],
                        i = r + n,
                        o = Math.min(i, t.length);
                    if (
                        (await this.processPartStarted(t, r, o),
                        (this.remainingPartDataCount = n - (o - r)),
                        this.remainingPartDataCount > 0)
                    )
                        return;
                    if (((r = i + this.boundaryLength), r >= t.length)) {
                        this.ignoreByteCount = this.boundaryLength - (t.length - i);
                        return;
                    }
                }
            }
        }
        copyExistingData(t, r) {
            return new Promise((n, i) => {
                let o = () => {
                    if (t === r) {
                        n();
                        return;
                    }
                    let s = this.options.tasks[t];
                    if (s.kind !== VT.OperationKind.COPY) {
                        i(new Error("Task kind must be COPY"));
                        return;
                    }
                    Qp(s, this.out, this.options.oldFileFd, i, () => {
                        t++, o();
                    });
                };
                o();
            });
        }
        searchHeaderListEnd(t, r) {
            let n = t.indexOf(Jp, r);
            if (n !== -1) return n + Jp.length;
            let i = r === 0 ? t : t.slice(r);
            return (
                this.headerListBuffer == null
                    ? (this.headerListBuffer = i)
                    : (this.headerListBuffer = Buffer.concat([this.headerListBuffer, i])),
                -1
            );
        }
        onPartEnd() {
            let t = this.partIndexToLength[this.partIndex - 1];
            if (this.actualPartLength !== t)
                throw (0, Di.newError)(
                    `Expected length: ${t} differs from actual: ${this.actualPartLength}`,
                    "ERR_DATA_SPLITTER_LENGTH_MISMATCH"
                );
            this.actualPartLength = 0;
        }
        processPartStarted(t, r, n) {
            return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, r, n);
        }
        processPartData(t, r, n) {
            this.actualPartLength += n - r;
            let i = this.out;
            return i.write(r === 0 && t.length === n ? t : t.slice(r, n))
                ? Promise.resolve()
                : new Promise((o, s) => {
                      i.on("error", s),
                          i.once("drain", () => {
                              i.removeListener("error", s), o();
                          });
                  });
        }
    };
    un.DataSplitter = aa;
});
var tm = g(Pi => {
    "use strict";
    Object.defineProperty(Pi, "__esModule", { value: !0 });
    Pi.executeTasksUsingMultipleRangeRequests = YT;
    Pi.checkIsRangesSupported = ca;
    var ua = ie(),
        Zp = la(),
        em = Ri();
    function YT(e, t, r, n, i) {
        let o = s => {
            if (s >= t.length) {
                e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
                return;
            }
            let a = s + 1e3;
            zT(e, { tasks: t, start: s, end: Math.min(t.length, a), oldFileFd: n }, r, () => o(a), i);
        };
        return o;
    }
    function zT(e, t, r, n, i) {
        let o = "bytes=",
            s = 0,
            a = new Map(),
            l = [];
        for (let d = t.start; d < t.end; d++) {
            let m = t.tasks[d];
            m.kind === em.OperationKind.DOWNLOAD &&
                ((o += `${m.start}-${m.end - 1}, `), a.set(s, d), s++, l.push(m.end - m.start));
        }
        if (s <= 1) {
            let d = m => {
                if (m >= t.end) {
                    n();
                    return;
                }
                let p = t.tasks[m++];
                if (p.kind === em.OperationKind.COPY) (0, Zp.copyData)(p, r, t.oldFileFd, i, () => d(m));
                else {
                    let y = e.createRequestOptions();
                    y.headers.Range = `bytes=${p.start}-${p.end - 1}`;
                    let _ = e.httpExecutor.createRequest(y, v => {
                        ca(v, i) && (v.pipe(r, { end: !1 }), v.once("end", () => d(m)));
                    });
                    e.httpExecutor.addErrorAndTimeoutHandlers(_, i), _.end();
                }
            };
            d(t.start);
            return;
        }
        let h = e.createRequestOptions();
        h.headers.Range = o.substring(0, o.length - 2);
        let c = e.httpExecutor.createRequest(h, d => {
            if (!ca(d, i)) return;
            let m = (0, ua.safeGetHeader)(d, "content-type"),
                p = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(m);
            if (p == null) {
                i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${m}"`));
                return;
            }
            let y = new Zp.DataSplitter(r, t, a, p[1] || p[2], l, n);
            y.on("error", i),
                d.pipe(y),
                d.on("end", () => {
                    setTimeout(() => {
                        c.abort(), i(new Error("Response ends without calling any handlers"));
                    }, 1e4);
                });
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(c, i), c.end();
    }
    function ca(e, t) {
        if (e.statusCode >= 400) return t((0, ua.createHttpError)(e)), !1;
        if (e.statusCode !== 206) {
            let r = (0, ua.safeGetHeader)(e, "accept-ranges");
            if (r == null || r === "none")
                return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
        }
        return !0;
    }
});
var rm = g(Fi => {
    "use strict";
    Object.defineProperty(Fi, "__esModule", { value: !0 });
    Fi.ProgressDifferentialDownloadCallbackTransform = void 0;
    var XT = require("stream"),
        dr;
    (function (e) {
        (e[(e.COPY = 0)] = "COPY"), (e[(e.DOWNLOAD = 1)] = "DOWNLOAD");
    })(dr || (dr = {}));
    var fa = class extends XT.Transform {
        constructor(t, r, n) {
            super(),
                (this.progressDifferentialDownloadInfo = t),
                (this.cancellationToken = r),
                (this.onProgress = n),
                (this.start = Date.now()),
                (this.transferred = 0),
                (this.delta = 0),
                (this.expectedBytes = 0),
                (this.index = 0),
                (this.operationType = dr.COPY),
                (this.nextUpdate = this.start + 1e3);
        }
        _transform(t, r, n) {
            if (this.cancellationToken.cancelled) {
                n(new Error("cancelled"), null);
                return;
            }
            if (this.operationType == dr.COPY) {
                n(null, t);
                return;
            }
            (this.transferred += t.length), (this.delta += t.length);
            let i = Date.now();
            i >= this.nextUpdate &&
                this.transferred !== this.expectedBytes &&
                this.transferred !== this.progressDifferentialDownloadInfo.grandTotal &&
                ((this.nextUpdate = i + 1e3),
                this.onProgress({
                    total: this.progressDifferentialDownloadInfo.grandTotal,
                    delta: this.delta,
                    transferred: this.transferred,
                    percent: (this.transferred / this.progressDifferentialDownloadInfo.grandTotal) * 100,
                    bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
                }),
                (this.delta = 0)),
                n(null, t);
        }
        beginFileCopy() {
            this.operationType = dr.COPY;
        }
        beginRangeDownload() {
            (this.operationType = dr.DOWNLOAD),
                (this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++]);
        }
        endRangeDownload() {
            this.transferred !== this.progressDifferentialDownloadInfo.grandTotal &&
                this.onProgress({
                    total: this.progressDifferentialDownloadInfo.grandTotal,
                    delta: this.delta,
                    transferred: this.transferred,
                    percent: (this.transferred / this.progressDifferentialDownloadInfo.grandTotal) * 100,
                    bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
                });
        }
        _flush(t) {
            if (this.cancellationToken.cancelled) {
                t(new Error("cancelled"));
                return;
            }
            this.onProgress({
                total: this.progressDifferentialDownloadInfo.grandTotal,
                delta: this.delta,
                transferred: this.transferred,
                percent: 100,
                bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
            }),
                (this.delta = 0),
                (this.transferred = 0),
                t(null);
        }
    };
    Fi.ProgressDifferentialDownloadCallbackTransform = fa;
});
var pa = g(Li => {
    "use strict";
    Object.defineProperty(Li, "__esModule", { value: !0 });
    Li.DifferentialDownloader = void 0;
    var cn = ie(),
        da = Ve(),
        KT = require("fs"),
        JT = la(),
        QT = require("url"),
        qi = Ri(),
        nm = tm(),
        ZT = rm(),
        ha = class {
            constructor(t, r, n) {
                (this.blockAwareFileInfo = t),
                    (this.httpExecutor = r),
                    (this.options = n),
                    (this.fileMetadataBuffer = null),
                    (this.logger = n.logger);
            }
            createRequestOptions() {
                let t = { headers: { ...this.options.requestHeaders, accept: "*/*" } };
                return (0, cn.configureRequestUrl)(this.options.newUrl, t), (0, cn.configureRequestOptions)(t), t;
            }
            doDownload(t, r) {
                if (t.version !== r.version)
                    throw new Error(`version is different (${t.version} - ${r.version}), full download is required`);
                let n = this.logger,
                    i = (0, qi.computeOperations)(t, r, n);
                n.debug != null && n.debug(JSON.stringify(i, null, 2));
                let o = 0,
                    s = 0;
                for (let l of i) {
                    let h = l.end - l.start;
                    l.kind === qi.OperationKind.DOWNLOAD ? (o += h) : (s += h);
                }
                let a = this.blockAwareFileInfo.size;
                if (o + s + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== a)
                    throw new Error(`Internal error, size mismatch: downloadSize: ${o}, copySize: ${s}, newSize: ${a}`);
                return n.info(`Full: ${im(a)}, To download: ${im(o)} (${Math.round(o / (a / 100))}%)`), this.downloadFile(i);
            }
            downloadFile(t) {
                let r = [],
                    n = () =>
                        Promise.all(
                            r.map(i =>
                                (0, da.close)(i.descriptor).catch(o => {
                                    this.logger.error(`cannot close file "${i.path}": ${o}`);
                                })
                            )
                        );
                return this.doDownloadFile(t, r)
                    .then(n)
                    .catch(i =>
                        n()
                            .catch(o => {
                                try {
                                    this.logger.error(`cannot close files: ${o}`);
                                } catch (s) {
                                    try {
                                        console.error(s);
                                    } catch {}
                                }
                                throw i;
                            })
                            .then(() => {
                                throw i;
                            })
                    );
            }
            async doDownloadFile(t, r) {
                let n = await (0, da.open)(this.options.oldFile, "r");
                r.push({ descriptor: n, path: this.options.oldFile });
                let i = await (0, da.open)(this.options.newFile, "w");
                r.push({ descriptor: i, path: this.options.newFile });
                let o = (0, KT.createWriteStream)(this.options.newFile, { fd: i });
                await new Promise((s, a) => {
                    let l = [],
                        h;
                    if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
                        let x = [],
                            A = 0;
                        for (let L of t)
                            L.kind === qi.OperationKind.DOWNLOAD && (x.push(L.end - L.start), (A += L.end - L.start));
                        let N = { expectedByteCounts: x, grandTotal: A };
                        (h = new ZT.ProgressDifferentialDownloadCallbackTransform(
                            N,
                            this.options.cancellationToken,
                            this.options.onProgress
                        )),
                            l.push(h);
                    }
                    let c = new cn.DigestTransform(this.blockAwareFileInfo.sha512);
                    (c.isValidateOnEnd = !1),
                        l.push(c),
                        o.on("finish", () => {
                            o.close(() => {
                                r.splice(1, 1);
                                try {
                                    c.validate();
                                } catch (x) {
                                    a(x);
                                    return;
                                }
                                s(void 0);
                            });
                        }),
                        l.push(o);
                    let d = null;
                    for (let x of l) x.on("error", a), d == null ? (d = x) : (d = d.pipe(x));
                    let m = l[0],
                        p;
                    if (this.options.isUseMultipleRangeRequest) {
                        (p = (0, nm.executeTasksUsingMultipleRangeRequests)(this, t, m, n, a)), p(0);
                        return;
                    }
                    let y = 0,
                        _ = null;
                    this.logger.info(`Differential download: ${this.options.newUrl}`);
                    let v = this.createRequestOptions();
                    (v.redirect = "manual"),
                        (p = x => {
                            var A, N;
                            if (x >= t.length) {
                                this.fileMetadataBuffer != null && m.write(this.fileMetadataBuffer), m.end();
                                return;
                            }
                            let L = t[x++];
                            if (L.kind === qi.OperationKind.COPY) {
                                h && h.beginFileCopy(), (0, JT.copyData)(L, m, n, a, () => p(x));
                                return;
                            }
                            let De = `bytes=${L.start}-${L.end - 1}`;
                            (v.headers.range = De),
                                (N = (A = this.logger) === null || A === void 0 ? void 0 : A.debug) === null ||
                                    N === void 0 ||
                                    N.call(A, `download range: ${De}`),
                                h && h.beginRangeDownload();
                            let V = this.httpExecutor.createRequest(v, se => {
                                se.on("error", a),
                                    se.on("aborted", () => {
                                        a(new Error("response has been aborted by the server"));
                                    }),
                                    se.statusCode >= 400 && a((0, cn.createHttpError)(se)),
                                    se.pipe(m, { end: !1 }),
                                    se.once("end", () => {
                                        h && h.endRangeDownload(), ++y === 100 ? ((y = 0), setTimeout(() => p(x), 1e3)) : p(x);
                                    });
                            });
                            V.on("redirect", (se, E, D) => {
                                this.logger.info(`Redirect to ${eC(D)}`),
                                    (_ = D),
                                    (0, cn.configureRequestUrl)(new QT.URL(_), v),
                                    V.followRedirect();
                            }),
                                this.httpExecutor.addErrorAndTimeoutHandlers(V, a),
                                V.end();
                        }),
                        p(0);
                });
            }
            async readRemoteBytes(t, r) {
                let n = Buffer.allocUnsafe(r + 1 - t),
                    i = this.createRequestOptions();
                i.headers.range = `bytes=${t}-${r}`;
                let o = 0;
                if (
                    (await this.request(i, s => {
                        s.copy(n, o), (o += s.length);
                    }),
                    o !== n.length)
                )
                    throw new Error(`Received data length ${o} is not equal to expected ${n.length}`);
                return n;
            }
            request(t, r) {
                return new Promise((n, i) => {
                    let o = this.httpExecutor.createRequest(t, s => {
                        (0, nm.checkIsRangesSupported)(s, i) &&
                            (s.on("error", i),
                            s.on("aborted", () => {
                                i(new Error("response has been aborted by the server"));
                            }),
                            s.on("data", r),
                            s.on("end", () => n()));
                    });
                    this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
                });
            }
        };
    Li.DifferentialDownloader = ha;
    function im(e, t = " KB") {
        return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
    }
    function eC(e) {
        let t = e.indexOf("?");
        return t < 0 ? e : e.substring(0, t);
    }
});
var om = g(Ui => {
    "use strict";
    Object.defineProperty(Ui, "__esModule", { value: !0 });
    Ui.GenericDifferentialDownloader = void 0;
    var tC = pa(),
        ma = class extends tC.DifferentialDownloader {
            download(t, r) {
                return this.doDownload(t, r);
            }
        };
    Ui.GenericDifferentialDownloader = ma;
});
var ki = g(mr => {
    "use strict";
    Object.defineProperty(mr, "__esModule", { value: !0 });
    mr.NoOpLogger = mr.AppUpdater = void 0;
    var Ie = ie(),
        rC = require("crypto"),
        nC = require("os"),
        iC = require("events"),
        hr = Ve(),
        oC = Zn(),
        ga = zf(),
        qt = require("path"),
        Lt = bs(),
        sm = vp(),
        sC = xp(),
        am = Cp(),
        aC = Xs(),
        pr = Ut(),
        wa = zp(),
        lC = require("zlib"),
        uC = ct(),
        cC = om(),
        Ea = class e extends iC.EventEmitter {
            get channel() {
                return this._channel;
            }
            set channel(t) {
                if (this._channel != null) {
                    if (typeof t != "string")
                        throw (0, Ie.newError)(`Channel must be a string, but got: ${t}`, "ERR_UPDATER_INVALID_CHANNEL");
                    if (t.length === 0)
                        throw (0, Ie.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
                }
                (this._channel = t), (this.allowDowngrade = !0);
            }
            addAuthHeader(t) {
                this.requestHeaders = Object.assign({}, this.requestHeaders, { authorization: t });
            }
            get netSession() {
                return (0, am.getNetSession)();
            }
            get logger() {
                return this._logger;
            }
            set logger(t) {
                this._logger = t ?? new $i();
            }
            set updateConfigPath(t) {
                (this.clientPromise = null),
                    (this._appUpdateConfigPath = t),
                    (this.configOnDisk = new ga.Lazy(() => this.loadUpdateConfig()));
            }
            constructor(t, r) {
                super(),
                    (this.autoDownload = !0),
                    (this.autoInstallOnAppQuit = !0),
                    (this.autoRunAppAfterInstall = !0),
                    (this.allowPrerelease = !1),
                    (this.fullChangelog = !1),
                    (this.allowDowngrade = !1),
                    (this.disableWebInstaller = !1),
                    (this.disableDifferentialDownload = !1),
                    (this.forceDevUpdateConfig = !1),
                    (this._channel = null),
                    (this.downloadedUpdateHelper = null),
                    (this.requestHeaders = null),
                    (this._logger = console),
                    (this.signals = new pr.UpdaterSignal(this)),
                    (this._appUpdateConfigPath = null),
                    (this.clientPromise = null),
                    (this.stagingUserIdPromise = new ga.Lazy(() => this.getOrCreateStagingUserId())),
                    (this.configOnDisk = new ga.Lazy(() => this.loadUpdateConfig())),
                    (this.checkForUpdatesPromise = null),
                    (this.downloadPromise = null),
                    (this.updateInfoAndProvider = null),
                    (this._testOnlyOptions = null),
                    this.on("error", o => {
                        this._logger.error(`Error: ${o.stack || o.message}`);
                    }),
                    r == null
                        ? ((this.app = new sC.ElectronAppAdapter()),
                          (this.httpExecutor = new am.ElectronHttpExecutor((o, s) => this.emit("login", o, s))))
                        : ((this.app = r), (this.httpExecutor = null));
                let n = this.app.version,
                    i = (0, Lt.parse)(n);
                if (i == null)
                    throw (0, Ie.newError)(`App version is not a valid semver version: "${n}"`, "ERR_UPDATER_INVALID_VERSION");
                (this.currentVersion = i),
                    (this.allowPrerelease = fC(i)),
                    t != null &&
                        (this.setFeedURL(t),
                        typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
            }
            getFeedURL() {
                return "Deprecated. Do not use it.";
            }
            setFeedURL(t) {
                let r = this.createProviderRuntimeOptions(),
                    n;
                typeof t == "string"
                    ? (n = new aC.GenericProvider({ provider: "generic", url: t }, this, {
                          ...r,
                          isUseMultipleRangeRequest: (0, wa.isUrlProbablySupportMultiRangeRequests)(t)
                      }))
                    : (n = (0, wa.createClient)(t, this, r)),
                    (this.clientPromise = Promise.resolve(n));
            }
            checkForUpdates() {
                if (!this.isUpdaterActive()) return Promise.resolve(null);
                let t = this.checkForUpdatesPromise;
                if (t != null) return this._logger.info("Checking for update (already in progress)"), t;
                let r = () => (this.checkForUpdatesPromise = null);
                return (
                    this._logger.info("Checking for update"),
                    (t = this.doCheckForUpdates()
                        .then(n => (r(), n))
                        .catch(n => {
                            throw (r(), this.emit("error", n, `Cannot check for updates: ${(n.stack || n).toString()}`), n);
                        })),
                    (this.checkForUpdatesPromise = t),
                    t
                );
            }
            isUpdaterActive() {
                return this.app.isPackaged || this.forceDevUpdateConfig
                    ? !0
                    : (this._logger.info(
                          "Skip checkForUpdates because application is not packed and dev update config is not forced"
                      ),
                      !1);
            }
            checkForUpdatesAndNotify(t) {
                return this.checkForUpdates().then(r =>
                    r?.downloadPromise
                        ? (r.downloadPromise.then(() => {
                              let n = e.formatDownloadNotification(r.updateInfo.version, this.app.name, t);
                              new (require("electron").Notification)(n).show();
                          }),
                          r)
                        : (this._logger.debug != null &&
                              this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"),
                          r)
                );
            }
            static formatDownloadNotification(t, r, n) {
                return (
                    n == null &&
                        (n = {
                            title: "A new update is ready to install",
                            body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
                        }),
                    (n = {
                        title: n.title.replace("{appName}", r).replace("{version}", t),
                        body: n.body.replace("{appName}", r).replace("{version}", t)
                    }),
                    n
                );
            }
            async isStagingMatch(t) {
                let r = t.stagingPercentage,
                    n = r;
                if (n == null) return !0;
                if (((n = parseInt(n, 10)), isNaN(n))) return this._logger.warn(`Staging percentage is NaN: ${r}`), !0;
                n = n / 100;
                let i = await this.stagingUserIdPromise.value,
                    s = Ie.UUID.parse(i).readUInt32BE(12) / 4294967295;
                return this._logger.info(`Staging percentage: ${n}, percentage: ${s}, user id: ${i}`), s < n;
            }
            computeFinalHeaders(t) {
                return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
            }
            async isUpdateAvailable(t) {
                let r = (0, Lt.parse)(t.version);
                if (r == null)
                    throw (0, Ie.newError)(
                        `This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`,
                        "ERR_UPDATER_INVALID_VERSION"
                    );
                let n = this.currentVersion;
                if ((0, Lt.eq)(r, n)) return !1;
                let i = t?.minimumSystemVersion,
                    o = (0, nC.release)();
                if (i)
                    try {
                        if ((0, Lt.lt)(o, i))
                            return (
                                this._logger.info(
                                    `Current OS version ${o} is less than the minimum OS version required ${i} for version ${o}`
                                ),
                                !1
                            );
                    } catch (h) {
                        this._logger.warn(
                            `Failed to compare current OS version(${o}) with minimum OS version(${i}): ${(
                                h.message || h
                            ).toString()}`
                        );
                    }
                if (!(await this.isStagingMatch(t))) return !1;
                let a = (0, Lt.gt)(r, n),
                    l = (0, Lt.lt)(r, n);
                return a ? !0 : this.allowDowngrade && l;
            }
            async getUpdateInfoAndProvider() {
                await this.app.whenReady(),
                    this.clientPromise == null &&
                        (this.clientPromise = this.configOnDisk.value.then(n =>
                            (0, wa.createClient)(n, this, this.createProviderRuntimeOptions())
                        ));
                let t = await this.clientPromise,
                    r = await this.stagingUserIdPromise.value;
                return (
                    t.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": r })),
                    { info: await t.getLatestVersion(), provider: t }
                );
            }
            createProviderRuntimeOptions() {
                return {
                    isUseMultipleRangeRequest: !0,
                    platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
                    executor: this.httpExecutor
                };
            }
            async doCheckForUpdates() {
                this.emit("checking-for-update");
                let t = await this.getUpdateInfoAndProvider(),
                    r = t.info;
                if (!(await this.isUpdateAvailable(r)))
                    return (
                        this._logger.info(
                            `Update for version ${this.currentVersion.format()} is not available (latest version: ${
                                r.version
                            }, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`
                        ),
                        this.emit("update-not-available", r),
                        { versionInfo: r, updateInfo: r }
                    );
                (this.updateInfoAndProvider = t), this.onUpdateAvailable(r);
                let n = new Ie.CancellationToken();
                return {
                    versionInfo: r,
                    updateInfo: r,
                    cancellationToken: n,
                    downloadPromise: this.autoDownload ? this.downloadUpdate(n) : null
                };
            }
            onUpdateAvailable(t) {
                this._logger.info(
                    `Found version ${t.version} (url: ${(0, Ie.asArray)(t.files)
                        .map(r => r.url)
                        .join(", ")})`
                ),
                    this.emit("update-available", t);
            }
            downloadUpdate(t = new Ie.CancellationToken()) {
                let r = this.updateInfoAndProvider;
                if (r == null) {
                    let i = new Error("Please check update first");
                    return this.dispatchError(i), Promise.reject(i);
                }
                if (this.downloadPromise != null)
                    return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
                this._logger.info(
                    `Downloading update from ${(0, Ie.asArray)(r.info.files)
                        .map(i => i.url)
                        .join(", ")}`
                );
                let n = i => {
                    if (!(i instanceof Ie.CancellationError))
                        try {
                            this.dispatchError(i);
                        } catch (o) {
                            this._logger.warn(`Cannot dispatch error event: ${o.stack || o}`);
                        }
                    return i;
                };
                return (
                    (this.downloadPromise = this.doDownloadUpdate({
                        updateInfoAndProvider: r,
                        requestHeaders: this.computeRequestHeaders(r.provider),
                        cancellationToken: t,
                        disableWebInstaller: this.disableWebInstaller,
                        disableDifferentialDownload: this.disableDifferentialDownload
                    })
                        .catch(i => {
                            throw n(i);
                        })
                        .finally(() => {
                            this.downloadPromise = null;
                        })),
                    this.downloadPromise
                );
            }
            dispatchError(t) {
                this.emit("error", t, (t.stack || t).toString());
            }
            dispatchUpdateDownloaded(t) {
                this.emit(pr.UPDATE_DOWNLOADED, t);
            }
            async loadUpdateConfig() {
                return (
                    this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath),
                    (0, oC.load)(await (0, hr.readFile)(this._appUpdateConfigPath, "utf-8"))
                );
            }
            computeRequestHeaders(t) {
                let r = t.fileExtraDownloadHeaders;
                if (r != null) {
                    let n = this.requestHeaders;
                    return n == null ? r : { ...r, ...n };
                }
                return this.computeFinalHeaders({ accept: "*/*" });
            }
            async getOrCreateStagingUserId() {
                let t = qt.join(this.app.userDataPath, ".updaterId");
                try {
                    let n = await (0, hr.readFile)(t, "utf-8");
                    if (Ie.UUID.check(n)) return n;
                    this._logger.warn(`Staging user id file exists, but content was invalid: ${n}`);
                } catch (n) {
                    n.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${n}`);
                }
                let r = Ie.UUID.v5((0, rC.randomBytes)(4096), Ie.UUID.OID);
                this._logger.info(`Generated new staging user ID: ${r}`);
                try {
                    await (0, hr.outputFile)(t, r);
                } catch (n) {
                    this._logger.warn(`Couldn't write out staging user ID: ${n}`);
                }
                return r;
            }
            get isAddNoCacheQuery() {
                let t = this.requestHeaders;
                if (t == null) return !0;
                for (let r of Object.keys(t)) {
                    let n = r.toLowerCase();
                    if (n === "authorization" || n === "private-token") return !1;
                }
                return !0;
            }
            async getOrCreateDownloadHelper() {
                let t = this.downloadedUpdateHelper;
                if (t == null) {
                    let r = (await this.configOnDisk.value).updaterCacheDirName,
                        n = this._logger;
                    r == null &&
                        n.error(
                            "updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?"
                        );
                    let i = qt.join(this.app.baseCachePath, r || this.app.name);
                    n.debug != null && n.debug(`updater cache dir: ${i}`),
                        (t = new sm.DownloadedUpdateHelper(i)),
                        (this.downloadedUpdateHelper = t);
                }
                return t;
            }
            async executeDownload(t) {
                let r = t.fileInfo,
                    n = {
                        headers: t.downloadUpdateOptions.requestHeaders,
                        cancellationToken: t.downloadUpdateOptions.cancellationToken,
                        sha2: r.info.sha2,
                        sha512: r.info.sha512
                    };
                this.listenerCount(pr.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = A => this.emit(pr.DOWNLOAD_PROGRESS, A));
                let i = t.downloadUpdateOptions.updateInfoAndProvider.info,
                    o = i.version,
                    s = r.packageInfo;
                function a() {
                    let A = decodeURIComponent(t.fileInfo.url.pathname);
                    return A.endsWith(`.${t.fileExtension}`) ? qt.basename(A) : t.fileInfo.info.url;
                }
                let l = await this.getOrCreateDownloadHelper(),
                    h = l.cacheDirForPendingUpdate;
                await (0, hr.mkdir)(h, { recursive: !0 });
                let c = a(),
                    d = qt.join(h, c),
                    m = s == null ? null : qt.join(h, `package-${o}${qt.extname(s.path) || ".7z"}`),
                    p = async A => (
                        await l.setDownloadedFile(d, m, i, r, c, A),
                        await t.done({ ...i, downloadedFile: d }),
                        m == null ? [d] : [d, m]
                    ),
                    y = this._logger,
                    _ = await l.validateDownloadedPath(d, i, r, y);
                if (_ != null) return (d = _), await p(!1);
                let v = async () => (await l.clear().catch(() => {}), await (0, hr.unlink)(d).catch(() => {})),
                    x = await (0, sm.createTempUpdateFile)(`temp-${c}`, h, y);
                try {
                    await t.task(x, n, m, v), await (0, hr.rename)(x, d);
                } catch (A) {
                    throw (
                        (await v(),
                        A instanceof Ie.CancellationError && (y.info("cancelled"), this.emit("update-cancelled", i)),
                        A)
                    );
                }
                return y.info(`New version ${o} has been downloaded to ${d}`), await p(!0);
            }
            async differentialDownloadInstaller(t, r, n, i, o) {
                try {
                    if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload) return !0;
                    let s = (0, uC.blockmapFiles)(t.url, this.app.version, r.updateInfoAndProvider.info.version);
                    this._logger.info(`Download block maps (old: "${s[0]}", new: ${s[1]})`);
                    let a = async c => {
                            let d = await this.httpExecutor.downloadToBuffer(c, {
                                headers: r.requestHeaders,
                                cancellationToken: r.cancellationToken
                            });
                            if (d == null || d.length === 0) throw new Error(`Blockmap "${c.href}" is empty`);
                            try {
                                return JSON.parse((0, lC.gunzipSync)(d).toString());
                            } catch (m) {
                                throw new Error(`Cannot parse blockmap "${c.href}", error: ${m}`);
                            }
                        },
                        l = {
                            newUrl: t.url,
                            oldFile: qt.join(this.downloadedUpdateHelper.cacheDir, o),
                            logger: this._logger,
                            newFile: n,
                            isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
                            requestHeaders: r.requestHeaders,
                            cancellationToken: r.cancellationToken
                        };
                    this.listenerCount(pr.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = c => this.emit(pr.DOWNLOAD_PROGRESS, c));
                    let h = await Promise.all(s.map(c => a(c)));
                    return await new cC.GenericDifferentialDownloader(t.info, this.httpExecutor, l).download(h[0], h[1]), !1;
                } catch (s) {
                    if (
                        (this._logger.error(`Cannot download differentially, fallback to full download: ${s.stack || s}`),
                        this._testOnlyOptions != null)
                    )
                        throw s;
                    return !0;
                }
            }
        };
    mr.AppUpdater = Ea;
    function fC(e) {
        let t = (0, Lt.prerelease)(e);
        return t != null && t.length > 0;
    }
    var $i = class {
        info(t) {}
        warn(t) {}
        error(t) {}
    };
    mr.NoOpLogger = $i;
});
var gr = g(Mi => {
    "use strict";
    Object.defineProperty(Mi, "__esModule", { value: !0 });
    Mi.BaseUpdater = void 0;
    var lm = require("child_process"),
        dC = ki(),
        ya = class extends dC.AppUpdater {
            constructor(t, r) {
                super(t, r), (this.quitAndInstallCalled = !1), (this.quitHandlerAdded = !1);
            }
            quitAndInstall(t = !1, r = !1) {
                this._logger.info("Install on explicit quitAndInstall"),
                    this.install(t, t ? r : this.autoRunAppAfterInstall)
                        ? setImmediate(() => {
                              require("electron").autoUpdater.emit("before-quit-for-update"), this.app.quit();
                          })
                        : (this.quitAndInstallCalled = !1);
            }
            executeDownload(t) {
                return super.executeDownload({
                    ...t,
                    done: r => (this.dispatchUpdateDownloaded(r), this.addQuitHandler(), Promise.resolve())
                });
            }
            install(t = !1, r = !1) {
                if (this.quitAndInstallCalled)
                    return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
                let n = this.downloadedUpdateHelper,
                    i = n && n.file ? (process.platform === "linux" ? n.file.replace(/ /g, "\\ ") : n.file) : null,
                    o = n == null ? null : n.downloadedFileInfo;
                if (i == null || o == null)
                    return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
                this.quitAndInstallCalled = !0;
                try {
                    return (
                        this._logger.info(`Install: isSilent: ${t}, isForceRunAfter: ${r}`),
                        this.doInstall({
                            installerPath: i,
                            isSilent: t,
                            isForceRunAfter: r,
                            isAdminRightsRequired: o.isAdminRightsRequired
                        })
                    );
                } catch (s) {
                    return this.dispatchError(s), !1;
                }
            }
            addQuitHandler() {
                this.quitHandlerAdded ||
                    !this.autoInstallOnAppQuit ||
                    ((this.quitHandlerAdded = !0),
                    this.app.onQuit(t => {
                        if (this.quitAndInstallCalled) {
                            this._logger.info("Update installer has already been triggered. Quitting application.");
                            return;
                        }
                        if (!this.autoInstallOnAppQuit) {
                            this._logger.info(
                                "Update will not be installed on quit because autoInstallOnAppQuit is set to false."
                            );
                            return;
                        }
                        if (t !== 0) {
                            this._logger.info(
                                `Update will be not installed on quit because application is quitting with exit code ${t}`
                            );
                            return;
                        }
                        this._logger.info("Auto install update on quit"), this.install(!0, !1);
                    }));
            }
            wrapSudo() {
                let { name: t } = this.app,
                    r = `"${t} would like to update"`,
                    n = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"),
                    i = [n];
                return (
                    /kdesudo/i.test(n)
                        ? (i.push("--comment", r), i.push("-c"))
                        : /gksudo/i.test(n)
                        ? i.push("--message", r)
                        : /pkexec/i.test(n) && i.push("--disable-internal-agent"),
                    i.join(" ")
                );
            }
            spawnSyncLog(t, r = [], n = {}) {
                return (
                    this._logger.info(`Executing: ${t} with args: ${r}`),
                    (0, lm.spawnSync)(t, r, { env: { ...process.env, ...n }, encoding: "utf-8", shell: !0 }).stdout.trim()
                );
            }
            async spawnLog(t, r = [], n = void 0, i = "ignore") {
                return (
                    this._logger.info(`Executing: ${t} with args: ${r}`),
                    new Promise((o, s) => {
                        try {
                            let a = { stdio: i, env: n, detached: !0 },
                                l = (0, lm.spawn)(t, r, a);
                            l.on("error", h => {
                                s(h);
                            }),
                                l.unref(),
                                l.pid !== void 0 && o(!0);
                        } catch (a) {
                            s(a);
                        }
                    })
                );
            }
        };
    Mi.BaseUpdater = ya;
});
var va = g(Bi => {
    "use strict";
    Object.defineProperty(Bi, "__esModule", { value: !0 });
    Bi.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
    var wr = Ve(),
        hC = pa(),
        pC = require("zlib"),
        _a = class extends hC.DifferentialDownloader {
            async download() {
                let t = this.blockAwareFileInfo,
                    r = t.size,
                    n = r - (t.blockMapSize + 4);
                this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
                let i = um(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
                await this.doDownload(await mC(this.options.oldFile), i);
            }
        };
    Bi.FileWithEmbeddedBlockMapDifferentialDownloader = _a;
    function um(e) {
        return JSON.parse((0, pC.inflateRawSync)(e).toString());
    }
    async function mC(e) {
        let t = await (0, wr.open)(e, "r");
        try {
            let r = (await (0, wr.fstat)(t)).size,
                n = Buffer.allocUnsafe(4);
            await (0, wr.read)(t, n, 0, n.length, r - n.length);
            let i = Buffer.allocUnsafe(n.readUInt32BE(0));
            return await (0, wr.read)(t, i, 0, i.length, r - n.length - i.length), await (0, wr.close)(t), um(i);
        } catch (r) {
            throw (await (0, wr.close)(t), r);
        }
    }
});
var Aa = g(Hi => {
    "use strict";
    Object.defineProperty(Hi, "__esModule", { value: !0 });
    Hi.AppImageUpdater = void 0;
    var cm = ie(),
        fm = require("child_process"),
        gC = Ve(),
        wC = require("fs"),
        fn = require("path"),
        EC = gr(),
        yC = va(),
        dm = Ut(),
        _C = qe(),
        Sa = class extends EC.BaseUpdater {
            constructor(t, r) {
                super(t, r);
            }
            isUpdaterActive() {
                return process.env.APPIMAGE == null
                    ? (process.env.SNAP == null
                          ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage")
                          : this._logger.info("SNAP env is defined, updater is disabled"),
                      !1)
                    : super.isUpdaterActive();
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, _C.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb"]);
                return this.executeDownload({
                    fileExtension: "AppImage",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, o) => {
                        let s = process.env.APPIMAGE;
                        if (s == null) throw (0, cm.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
                        let a = !1;
                        try {
                            let l = {
                                newUrl: n.url,
                                oldFile: s,
                                logger: this._logger,
                                newFile: i,
                                isUseMultipleRangeRequest: r.isUseMultipleRangeRequest,
                                requestHeaders: t.requestHeaders,
                                cancellationToken: t.cancellationToken
                            };
                            this.listenerCount(dm.DOWNLOAD_PROGRESS) > 0 &&
                                (l.onProgress = h => this.emit(dm.DOWNLOAD_PROGRESS, h)),
                                await new yC.FileWithEmbeddedBlockMapDifferentialDownloader(
                                    n.info,
                                    this.httpExecutor,
                                    l
                                ).download();
                        } catch (l) {
                            this._logger.error(`Cannot download differentially, fallback to full download: ${l.stack || l}`),
                                (a = process.platform === "linux");
                        }
                        a && (await this.httpExecutor.download(n.url, i, o)), await (0, gC.chmod)(i, 493);
                    }
                });
            }
            doInstall(t) {
                let r = process.env.APPIMAGE;
                if (r == null) throw (0, cm.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
                (0, wC.unlinkSync)(r);
                let n,
                    i = fn.basename(r);
                fn.basename(t.installerPath) === i || !/\d+\.\d+\.\d+/.test(i)
                    ? (n = r)
                    : (n = fn.join(fn.dirname(r), fn.basename(t.installerPath))),
                    (0, fm.execFileSync)("mv", ["-f", t.installerPath, n]),
                    n !== r && this.emit("appimage-filename-updated", n);
                let o = { ...process.env, APPIMAGE_SILENT_INSTALL: "true" };
                return (
                    t.isForceRunAfter
                        ? this.spawnLog(n, [], o)
                        : ((o.APPIMAGE_EXIT_AFTER_INSTALL = "true"), (0, fm.execFileSync)(n, [], { env: o })),
                    !0
                );
            }
        };
    Hi.AppImageUpdater = Sa;
});
var Ta = g(ji => {
    "use strict";
    Object.defineProperty(ji, "__esModule", { value: !0 });
    ji.DebUpdater = void 0;
    var vC = gr(),
        hm = Ut(),
        SC = qe(),
        xa = class extends vC.BaseUpdater {
            constructor(t, r) {
                super(t, r);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, SC.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm"]);
                return this.executeDownload({
                    fileExtension: "deb",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, o) => {
                        this.listenerCount(hm.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = s => this.emit(hm.DOWNLOAD_PROGRESS, s)),
                            await this.httpExecutor.download(n.url, i, o);
                    }
                });
            }
            doInstall(t) {
                let r = this.wrapSudo(),
                    n = /pkexec/i.test(r) ? "" : '"',
                    i = ["dpkg", "-i", t.installerPath, "||", "apt-get", "install", "-f", "-y"];
                return (
                    this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${i.join(" ")}'${n}`]),
                    t.isForceRunAfter && this.app.relaunch(),
                    !0
                );
            }
        };
    ji.DebUpdater = xa;
});
var ba = g(Wi => {
    "use strict";
    Object.defineProperty(Wi, "__esModule", { value: !0 });
    Wi.RpmUpdater = void 0;
    var AC = gr(),
        pm = Ut(),
        xC = qe(),
        Ca = class extends AC.BaseUpdater {
            constructor(t, r) {
                super(t, r);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, xC.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb"]);
                return this.executeDownload({
                    fileExtension: "rpm",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, o) => {
                        this.listenerCount(pm.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = s => this.emit(pm.DOWNLOAD_PROGRESS, s)),
                            await this.httpExecutor.download(n.url, i, o);
                    }
                });
            }
            doInstall(t) {
                let r = t.installerPath,
                    n = this.wrapSudo(),
                    i = /pkexec/i.test(n) ? "" : '"',
                    o = this.spawnSyncLog("which zypper"),
                    s;
                return (
                    o
                        ? (s = [o, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", r])
                        : (s = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", r]),
                    this.spawnSyncLog(n, [`${i}/bin/bash`, "-c", `'${s.join(" ")}'${i}`]),
                    t.isForceRunAfter && this.app.relaunch(),
                    !0
                );
            }
        };
    Wi.RpmUpdater = Ca;
});
var Ia = g(Gi => {
    "use strict";
    Object.defineProperty(Gi, "__esModule", { value: !0 });
    Gi.MacUpdater = void 0;
    var mm = ie(),
        gm = Ve(),
        wm = require("fs"),
        TC = require("path"),
        CC = require("http"),
        bC = ki(),
        OC = qe(),
        Em = require("child_process"),
        ym = require("crypto"),
        Oa = class extends bC.AppUpdater {
            constructor(t, r) {
                super(t, r),
                    (this.nativeUpdater = require("electron").autoUpdater),
                    (this.squirrelDownloadedUpdate = !1),
                    this.nativeUpdater.on("error", n => {
                        this._logger.warn(n), this.emit("error", n);
                    }),
                    this.nativeUpdater.on("update-downloaded", () => {
                        (this.squirrelDownloadedUpdate = !0), this.debug("nativeUpdater.update-downloaded");
                    });
            }
            debug(t) {
                this._logger.debug != null && this._logger.debug(t);
            }
            closeServerIfExists() {
                this.server &&
                    (this.debug("Closing proxy server"),
                    this.server.close(t => {
                        t &&
                            this.debug(
                                "proxy server wasn't already open, probably attempted closing again as a safety check before quit"
                            );
                    }));
            }
            async doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider.resolveFiles(t.updateInfoAndProvider.info),
                    n = this._logger,
                    i = "sysctl.proc_translated",
                    o = !1;
                try {
                    this.debug("Checking for macOS Rosetta environment"),
                        (o = (0, Em.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`)),
                        n.info(`Checked for macOS Rosetta environment (isRosetta=${o})`);
                } catch (m) {
                    n.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${m}`);
                }
                let s = !1;
                try {
                    this.debug("Checking for arm64 in uname");
                    let p = (0, Em.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
                    n.info(`Checked 'uname -a': arm64=${p}`), (s = s || p);
                } catch (m) {
                    n.warn(`uname shell command to check for arm64 failed: ${m}`);
                }
                s = s || process.arch === "arm64" || o;
                let a = m => {
                    var p;
                    return (
                        m.url.pathname.includes("arm64") ||
                        ((p = m.info.url) === null || p === void 0 ? void 0 : p.includes("arm64"))
                    );
                };
                s && r.some(a) ? (r = r.filter(m => s === a(m))) : (r = r.filter(m => !a(m)));
                let l = (0, OC.findFile)(r, "zip", ["pkg", "dmg"]);
                if (l == null)
                    throw (0, mm.newError)(
                        `ZIP file not provided: ${(0, mm.safeStringifyJson)(r)}`,
                        "ERR_UPDATER_ZIP_FILE_NOT_FOUND"
                    );
                let h = t.updateInfoAndProvider.provider,
                    c = "update.zip",
                    d = "";
                return this.executeDownload({
                    fileExtension: "zip",
                    fileInfo: l,
                    downloadUpdateOptions: t,
                    task: async (m, p) => {
                        d = TC.join(this.downloadedUpdateHelper.cacheDir, c);
                        let y = () =>
                                (0, gm.pathExistsSync)(d)
                                    ? !t.disableDifferentialDownload
                                    : (n.info(
                                          "Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"
                                      ),
                                      !1),
                            _ = !0;
                        y() && (_ = await this.differentialDownloadInstaller(l, t, m, h, c)),
                            _ && (await this.httpExecutor.download(l.url, m, p));
                    },
                    done: m => {
                        try {
                            (0, wm.copyFileSync)(m.downloadedFile, d);
                        } catch (p) {
                            this._logger.error(`Unable to copy file for caching: ${p.message}`);
                        }
                        return this.updateDownloaded(l, m);
                    }
                });
            }
            async updateDownloaded(t, r) {
                var n;
                let i = r.downloadedFile,
                    o = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, gm.stat)(i)).size,
                    s = this._logger,
                    a = `fileToProxy=${t.url.href}`;
                this.closeServerIfExists(),
                    this.debug(`Creating proxy server for native Squirrel.Mac (${a})`),
                    (this.server = (0, CC.createServer)()),
                    this.debug(`Proxy server for native Squirrel.Mac is created (${a})`),
                    this.server.on("close", () => {
                        s.info(`Proxy server for native Squirrel.Mac is closed (${a})`);
                    });
                let l = h => {
                    let c = h.address();
                    return typeof c == "string" ? c : `http://127.0.0.1:${c?.port}`;
                };
                return await new Promise((h, c) => {
                    let d = (0, ym.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"),
                        m = Buffer.from(`autoupdater:${d}`, "ascii"),
                        p = `/${(0, ym.randomBytes)(64).toString("hex")}.zip`;
                    this.server.on("request", (y, _) => {
                        let v = y.url;
                        if ((s.info(`${v} requested`), v === "/")) {
                            if (!y.headers.authorization || y.headers.authorization.indexOf("Basic ") === -1) {
                                (_.statusCode = 401),
                                    (_.statusMessage = "Invalid Authentication Credentials"),
                                    _.end(),
                                    s.warn("No authenthication info");
                                return;
                            }
                            let N = y.headers.authorization.split(" ")[1],
                                L = Buffer.from(N, "base64").toString("ascii"),
                                [De, V] = L.split(":");
                            if (De !== "autoupdater" || V !== d) {
                                (_.statusCode = 401),
                                    (_.statusMessage = "Invalid Authentication Credentials"),
                                    _.end(),
                                    s.warn("Invalid authenthication credentials");
                                return;
                            }
                            let se = Buffer.from(`{ "url": "${l(this.server)}${p}" }`);
                            _.writeHead(200, { "Content-Type": "application/json", "Content-Length": se.length }), _.end(se);
                            return;
                        }
                        if (!v.startsWith(p)) {
                            s.warn(`${v} requested, but not supported`), _.writeHead(404), _.end();
                            return;
                        }
                        s.info(`${p} requested by Squirrel.Mac, pipe ${i}`);
                        let x = !1;
                        _.on("finish", () => {
                            x || (this.nativeUpdater.removeListener("error", c), h([]));
                        });
                        let A = (0, wm.createReadStream)(i);
                        A.on("error", N => {
                            try {
                                _.end();
                            } catch (L) {
                                s.warn(`cannot end response: ${L}`);
                            }
                            (x = !0), this.nativeUpdater.removeListener("error", c), c(new Error(`Cannot pipe "${i}": ${N}`));
                        }),
                            _.writeHead(200, { "Content-Type": "application/zip", "Content-Length": o }),
                            A.pipe(_);
                    }),
                        this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${a})`),
                        this.server.listen(0, "127.0.0.1", () => {
                            this.debug(`Proxy server for native Squirrel.Mac is listening (address=${l(this.server)}, ${a})`),
                                this.nativeUpdater.setFeedURL({
                                    url: l(this.server),
                                    headers: { "Cache-Control": "no-cache", "Authorization": `Basic ${m.toString("base64")}` }
                                }),
                                this.dispatchUpdateDownloaded(r),
                                this.autoInstallOnAppQuit
                                    ? (this.nativeUpdater.once("error", c), this.nativeUpdater.checkForUpdates())
                                    : h([]);
                        });
                });
            }
            quitAndInstall() {
                this.squirrelDownloadedUpdate
                    ? (this.nativeUpdater.quitAndInstall(), this.closeServerIfExists())
                    : (this.nativeUpdater.on("update-downloaded", () => {
                          this.nativeUpdater.quitAndInstall(), this.closeServerIfExists();
                      }),
                      this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
            }
        };
    Gi.MacUpdater = Oa;
});
var Am = g(Ra => {
    "use strict";
    Object.defineProperty(Ra, "__esModule", { value: !0 });
    Ra.verifySignature = NC;
    var _m = ie(),
        Sm = require("child_process"),
        IC = require("os"),
        vm = require("path");
    function NC(e, t, r) {
        return new Promise((n, i) => {
            let o = t.replace(/'/g, "''");
            r.info(`Verifying signature ${o}`),
                (0, Sm.execFile)(
                    'set "PSModulePath=" & chcp 65001 >NUL & powershell.exe',
                    [
                        "-NoProfile",
                        "-NonInteractive",
                        "-InputFormat",
                        "None",
                        "-Command",
                        `"Get-AuthenticodeSignature -LiteralPath '${o}' | ConvertTo-Json -Compress"`
                    ],
                    { shell: !0, timeout: 20 * 1e3 },
                    (s, a, l) => {
                        var h;
                        try {
                            if (s != null || l) {
                                Na(r, s, l, i), n(null);
                                return;
                            }
                            let c = RC(a);
                            if (c.Status === 0) {
                                try {
                                    let y = vm.normalize(c.Path),
                                        _ = vm.normalize(t);
                                    if ((r.info(`LiteralPath: ${y}. Update Path: ${_}`), y !== _)) {
                                        Na(r, new Error(`LiteralPath of ${y} is different than ${_}`), l, i), n(null);
                                        return;
                                    }
                                } catch (y) {
                                    r.warn(
                                        `Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${
                                            (h = y.message) !== null && h !== void 0 ? h : y.stack
                                        }`
                                    );
                                }
                                let m = (0, _m.parseDn)(c.SignerCertificate.Subject),
                                    p = !1;
                                for (let y of e) {
                                    let _ = (0, _m.parseDn)(y);
                                    if (
                                        (_.size
                                            ? (p = Array.from(_.keys()).every(x => _.get(x) === m.get(x)))
                                            : y === m.get("CN") &&
                                              (r.warn(
                                                  `Signature validated using only CN ${y}. Please add your full Distinguished Name (DN) to publisherNames configuration`
                                              ),
                                              (p = !0)),
                                        p)
                                    ) {
                                        n(null);
                                        return;
                                    }
                                }
                            }
                            let d =
                                `publisherNames: ${e.join(" | ")}, raw info: ` +
                                JSON.stringify(c, (m, p) => (m === "RawData" ? void 0 : p), 2);
                            r.warn(`Sign verification failed, installer signed with incorrect certificate: ${d}`), n(d);
                        } catch (c) {
                            Na(r, c, null, i), n(null);
                            return;
                        }
                    }
                );
        });
    }
    function RC(e) {
        let t = JSON.parse(e);
        delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
        let r = t.SignerCertificate;
        return (
            r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName),
            t
        );
    }
    function Na(e, t, r, n) {
        if (DC()) {
            e.warn(
                `Cannot execute Get-AuthenticodeSignature: ${
                    t || r
                }. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`
            );
            return;
        }
        try {
            (0, Sm.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], {
                timeout: 10 * 1e3
            });
        } catch (i) {
            e.warn(
                `Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`
            );
            return;
        }
        t != null && n(t),
            r &&
                n(
                    new Error(
                        `Cannot execute Get-AuthenticodeSignature, stderr: ${r}. Failing signature validation due to unknown stderr.`
                    )
                );
    }
    function DC() {
        let e = IC.release();
        return e.startsWith("6.") && !e.startsWith("6.3");
    }
});
var Pa = g(Yi => {
    "use strict";
    Object.defineProperty(Yi, "__esModule", { value: !0 });
    Yi.NsisUpdater = void 0;
    var Vi = ie(),
        xm = require("path"),
        PC = gr(),
        FC = va(),
        Tm = Ut(),
        qC = qe(),
        LC = Ve(),
        UC = Am(),
        Cm = require("url"),
        Da = class extends PC.BaseUpdater {
            constructor(t, r) {
                super(t, r), (this._verifyUpdateCodeSignature = (n, i) => (0, UC.verifySignature)(n, i, this._logger));
            }
            get verifyUpdateCodeSignature() {
                return this._verifyUpdateCodeSignature;
            }
            set verifyUpdateCodeSignature(t) {
                t && (this._verifyUpdateCodeSignature = t);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, qC.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
                return this.executeDownload({
                    fileExtension: "exe",
                    downloadUpdateOptions: t,
                    fileInfo: n,
                    task: async (i, o, s, a) => {
                        let l = n.packageInfo,
                            h = l != null && s != null;
                        if (h && t.disableWebInstaller)
                            throw (0, Vi.newError)(
                                `Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`,
                                "ERR_UPDATER_WEB_INSTALLER_DISABLED"
                            );
                        !h &&
                            !t.disableWebInstaller &&
                            this._logger.warn(
                                "disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."
                            ),
                            (h ||
                                t.disableDifferentialDownload ||
                                (await this.differentialDownloadInstaller(n, t, i, r, Vi.CURRENT_APP_INSTALLER_FILE_NAME))) &&
                                (await this.httpExecutor.download(n.url, i, o));
                        let c = await this.verifySignature(i);
                        if (c != null)
                            throw (
                                (await a(),
                                (0, Vi.newError)(
                                    `New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${c}`,
                                    "ERR_UPDATER_INVALID_SIGNATURE"
                                ))
                            );
                        if (h && (await this.differentialDownloadWebPackage(t, l, s, r)))
                            try {
                                await this.httpExecutor.download(new Cm.URL(l.path), s, {
                                    headers: t.requestHeaders,
                                    cancellationToken: t.cancellationToken,
                                    sha512: l.sha512
                                });
                            } catch (d) {
                                try {
                                    await (0, LC.unlink)(s);
                                } catch {}
                                throw d;
                            }
                    }
                });
            }
            async verifySignature(t) {
                let r;
                try {
                    if (((r = (await this.configOnDisk.value).publisherName), r == null)) return null;
                } catch (n) {
                    if (n.code === "ENOENT") return null;
                    throw n;
                }
                return await this._verifyUpdateCodeSignature(Array.isArray(r) ? r : [r], t);
            }
            doInstall(t) {
                let r = ["--updated"];
                t.isSilent && r.push("/S"),
                    t.isForceRunAfter && r.push("--force-run"),
                    this.installDirectory && r.push(`/D=${this.installDirectory}`);
                let n = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
                n != null && r.push(`--package-file=${n}`);
                let i = () => {
                    this.spawnLog(xm.join(process.resourcesPath, "elevate.exe"), [t.installerPath].concat(r)).catch(o =>
                        this.dispatchError(o)
                    );
                };
                return t.isAdminRightsRequired
                    ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), i(), !0)
                    : (this.spawnLog(t.installerPath, r).catch(o => {
                          let s = o.code;
                          this._logger.info(
                              `Cannot run installer: error code: ${s}, error message: "${o.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`
                          ),
                              s === "UNKNOWN" || s === "EACCES"
                                  ? i()
                                  : s === "ENOENT"
                                  ? require("electron")
                                        .shell.openPath(t.installerPath)
                                        .catch(a => this.dispatchError(a))
                                  : this.dispatchError(o);
                      }),
                      !0);
            }
            async differentialDownloadWebPackage(t, r, n, i) {
                if (r.blockMapSize == null) return !0;
                try {
                    let o = {
                        newUrl: new Cm.URL(r.path),
                        oldFile: xm.join(this.downloadedUpdateHelper.cacheDir, Vi.CURRENT_APP_PACKAGE_FILE_NAME),
                        logger: this._logger,
                        newFile: n,
                        requestHeaders: this.requestHeaders,
                        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
                        cancellationToken: t.cancellationToken
                    };
                    this.listenerCount(Tm.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = s => this.emit(Tm.DOWNLOAD_PROGRESS, s)),
                        await new FC.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, o).download();
                } catch (o) {
                    return (
                        this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`),
                        process.platform === "win32"
                    );
                }
                return !1;
            }
        };
    Yi.NsisUpdater = Da;
});
var Ut = g(M => {
    "use strict";
    Object.defineProperty(M, "__esModule", { value: !0 });
    M.UpdaterSignal =
        M.UPDATE_DOWNLOADED =
        M.DOWNLOAD_PROGRESS =
        M.NsisUpdater =
        M.MacUpdater =
        M.RpmUpdater =
        M.DebUpdater =
        M.AppImageUpdater =
        M.Provider =
        M.CancellationToken =
        M.NoOpLogger =
        M.AppUpdater =
        M.BaseUpdater =
            void 0;
    var $C = ie();
    Object.defineProperty(M, "CancellationToken", {
        enumerable: !0,
        get: function () {
            return $C.CancellationToken;
        }
    });
    var bm = Ve(),
        kC = require("path"),
        MC = gr();
    Object.defineProperty(M, "BaseUpdater", {
        enumerable: !0,
        get: function () {
            return MC.BaseUpdater;
        }
    });
    var Om = ki();
    Object.defineProperty(M, "AppUpdater", {
        enumerable: !0,
        get: function () {
            return Om.AppUpdater;
        }
    });
    Object.defineProperty(M, "NoOpLogger", {
        enumerable: !0,
        get: function () {
            return Om.NoOpLogger;
        }
    });
    var BC = qe();
    Object.defineProperty(M, "Provider", {
        enumerable: !0,
        get: function () {
            return BC.Provider;
        }
    });
    var HC = Aa();
    Object.defineProperty(M, "AppImageUpdater", {
        enumerable: !0,
        get: function () {
            return HC.AppImageUpdater;
        }
    });
    var jC = Ta();
    Object.defineProperty(M, "DebUpdater", {
        enumerable: !0,
        get: function () {
            return jC.DebUpdater;
        }
    });
    var WC = ba();
    Object.defineProperty(M, "RpmUpdater", {
        enumerable: !0,
        get: function () {
            return WC.RpmUpdater;
        }
    });
    var GC = Ia();
    Object.defineProperty(M, "MacUpdater", {
        enumerable: !0,
        get: function () {
            return GC.MacUpdater;
        }
    });
    var VC = Pa();
    Object.defineProperty(M, "NsisUpdater", {
        enumerable: !0,
        get: function () {
            return VC.NsisUpdater;
        }
    });
    var pt;
    function YC() {
        if (process.platform === "win32") pt = new (Pa().NsisUpdater)();
        else if (process.platform === "darwin") pt = new (Ia().MacUpdater)();
        else {
            pt = new (Aa().AppImageUpdater)();
            try {
                let e = kC.join(process.resourcesPath, "package-type");
                if (!(0, bm.existsSync)(e)) return pt;
                console.info("Checking for beta autoupdate feature for deb/rpm distributions");
                let t = (0, bm.readFileSync)(e).toString().trim();
                switch ((console.info("Found package-type:", t), t)) {
                    case "deb":
                        pt = new (Ta().DebUpdater)();
                        break;
                    case "rpm":
                        pt = new (ba().RpmUpdater)();
                        break;
                    default:
                        break;
                }
            } catch (e) {
                console.warn(
                    "Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder",
                    e.message
                );
            }
        }
        return pt;
    }
    Object.defineProperty(M, "autoUpdater", { enumerable: !0, get: () => pt || YC() });
    M.DOWNLOAD_PROGRESS = "download-progress";
    M.UPDATE_DOWNLOADED = "update-downloaded";
    var Fa = class {
        constructor(t) {
            this.emitter = t;
        }
        login(t) {
            zi(this.emitter, "login", t);
        }
        progress(t) {
            zi(this.emitter, M.DOWNLOAD_PROGRESS, t);
        }
        updateDownloaded(t) {
            zi(this.emitter, M.UPDATE_DOWNLOADED, t);
        }
        updateCancelled(t) {
            zi(this.emitter, "update-cancelled", t);
        }
    };
    M.UpdaterSignal = Fa;
    var zC = !1;
    function zi(e, t, r) {
        zC
            ? e.on(t, (...n) => {
                  console.log("%s %s", t, n), r(...n);
              })
            : e.on(t, r);
    }
});
var mt = g((yN, Im) => {
    Im.exports = class {
        constructor(t) {
            I(this, "_socialdetox");
            this._socialdetox = t;
        }
    };
});
var Rm = g((SN, Nm) => {
    var XC = require("path"),
        KC = mt();
    Nm.exports = class extends KC {
        main() {
            this._socialdetox
                .window()
                .loadFile(XC.join(this._socialdetox.rootPath, "res", "index.html"), { extraHeaders: "pragma: no-cache" }),
                this._socialdetox.window().focus();
        }
    };
});
var Pm = g((xN, Dm) => {
    var JC = mt();
    Dm.exports = class extends JC {
        getWindowWidth() {
            return 1200;
        }
        getWindowHeight() {
            return 800;
        }
        getPort() {
            return this._socialdetox.devMode ? 3030 : 7199;
        }
    };
});
var Lm = g((CN, qm) => {
    var QC = mt(),
        Fm = require("fs");
    qm.exports = class extends QC {
        isFile(t) {
            let r = !1;
            try {
                r = Fm.statSync(t).isFile();
            } catch {}
            return r;
        }
        readJSON(t) {
            let r = null,
                n = this.readFile(t);
            return n && (r = this._socialdetox.utils.parseJSON(n)), r;
        }
        readFile(t) {
            let r = null;
            try {
                let n = Fm.readFileSync(t);
                r = Buffer.isBuffer(n) ? n.toString() : n;
            } catch (n) {
                this._socialdetox.log.error("file:readFile", t, n);
            }
            return r;
        }
    };
});
var $m = g((ON, Um) => {
    var ZC = mt();
    Um.exports = class extends ZC {
        error() {
            console.error("%csocialdetox-error", "color:red", ...arguments);
        }
        info() {
            console.info("%csocialdetox-info", "color:lightblue", ...arguments);
        }
    };
});
var Mm = g((NN, km) => {
    var eb = mt(),
        tb = require("querystring");
    km.exports = class extends eb {
        isJSON(t) {
            return typeof t == "string" && (t.charAt(0) == "{" || t.charAt(0) == "[");
        }
        isObject(t) {
            return typeof t == "object" && t !== null;
        }
        parseJSON(t) {
            let r = null;
            if (t !== null && this.isJSON(t))
                try {
                    t.content && (t = t.content), (r = JSON.parse(t));
                } catch (n) {
                    this._socialdetox.log.error("utils:parseJSON", n);
                }
            return r;
        }
        formatJSON(t, r) {
            typeof r > "u" && (r = null);
            let n = null;
            if (this.isObject(t)) {
                t.content && (t = t.content);
                try {
                    n = JSON.stringify(t, null, r);
                } catch (i) {
                    this._socialdetox.log.error("utils:formatJSON", i);
                }
            }
            return n;
        }
        mergeObjects(...t) {
            let r = this.isObject,
                n = this.mergeObjects;
            return t.reduce(
                (i, o) => (
                    Object.keys(o).forEach(s => {
                        let a = i[s],
                            l = o[s];
                        do {
                            if (Array.isArray(a) && Array.isArray(l)) {
                                i[s] = a.concat(...l);
                                break;
                            }
                            if (r(a) && r(l)) {
                                i[s] = n(a, l);
                                break;
                            }
                        } while (!1);
                        i[s] = l;
                    }),
                    i
                ),
                {}
            );
        }
        urlFormat(t) {
            let r = null;
            do {
                if (!this.isObject(t)) break;
                let n = (t.protocol || "http") + "://";
                if (t.host) n += t.host;
                else if (t.hostname) (n += t.hostname), t.port && (n += ":" + t.port);
                else break;
                if (t.pathname) {
                    n = n.replace(/\/+$/, "");
                    let i = t.pathname.replace(/^\/+/, "");
                    n += "/" + i;
                }
                r = t.query ? n + "?" + tb.stringify(t.query) : n;
            } while (!1);
            return r;
        }
    };
});
var Hm = g((DN, Bm) => {
    var rb = mt(),
        qa = require("fs"),
        La = require("path"),
        nb = require("http"),
        Ua;
    Bm.exports =
        ((Ua = class extends rb {
            start() {
                if (this.constructor._instance === null) {
                    let t = this._socialdetox.devMode,
                        r = La.join(this._socialdetox.rootPath, "ssg"),
                        n = this._socialdetox.config.getPort();
                    this.constructor._instance = new Promise((i, o) => {
                        if (t) {
                            i(null);
                            return;
                        }
                        try {
                            let s = nb.createServer((a, l) => {
                                let h = La.join(r, a.url === "/" ? "/index.html" : a.url);
                                qa.access(h, qa.constants.F_OK, c => {
                                    c
                                        ? (l.writeHead(404, { "Content-Type": "text/plain" }), l.end("404 Not Found"))
                                        : qa.readFile(h, (d, m) => {
                                              if (d)
                                                  l.writeHead(500, { "Content-Type": "text/plain" }),
                                                      l.end("500 Internal Server Error");
                                              else {
                                                  let p = La.extname(h),
                                                      y =
                                                          {
                                                              ".html": "text/html",
                                                              ".css": "text/css",
                                                              ".js": "text/javascript",
                                                              ".jpg": "image/jpeg",
                                                              ".png": "image/png",
                                                              ".gif": "image/gif",
                                                              ".svg": "image/svg+xml"
                                                          }[p] || "application/octet-stream";
                                                  l.writeHead(200, { "Content-Type": y }), l.end(m);
                                              }
                                          });
                                });
                            });
                            s.listen(n, () => {
                                this._socialdetox.log.info("webserver:start", `Listening on port ${n}`), i(s);
                            });
                        } catch (s) {
                            this._socialdetox.log.error("webserver:start", s), o(s);
                        }
                    });
                }
                return this.constructor._instance;
            }
        }),
        I(Ua, "_instance", null),
        Ua);
});
var Xi = g((qN, jm) => {
    var ib = mt(),
        { ipcMain: ob } = require("electron");
    jm.exports = class extends ib {
        constructor(t) {
            super(t);
        }
        _register(t) {
            if (typeof t == "string")
                for (let r of Object.getOwnPropertyNames(this)) {
                    if (["_", "#"].includes(r[0] || typeof this[r] != "function")) continue;
                    let n = this[r];
                    ob.handle(`main:${t}:${r}`, async (i, ...o) => {
                        let s = null;
                        try {
                            s = typeof n == "function" ? await n(...o) : null;
                        } catch (a) {
                            this._socialdetox.devMode && console.debug(a), (s = a);
                        }
                        return s;
                    });
                }
        }
    };
});
var Gm = g((UN, Wm) => {
    var dn;
    Wm.exports = ((dn = class {}), I(dn, "WINDOWS", "win32"), I(dn, "MAC", "darwin"), I(dn, "LINUX", "linux"), dn);
});
var zm = g((MN, Ym) => {
    var { execSync: $a } = require("child_process"),
        sb = Xi(),
        pe = Gm(),
        Er,
        yr,
        _r,
        gt,
        Vm;
    Ym.exports =
        ((Vm = class extends sb {
            constructor(r) {
                super(r);
                me(this, Er);
                me(this, yr);
                me(this, _r);
                me(this, gt);
                I(this, "getOS", () => {
                    if (typeof b(this, gt) > "u")
                        switch (process.platform) {
                            case pe.MAC:
                                xe(this, gt, "macos");
                                break;
                            case pe.WINDOWS:
                                xe(this, gt, "win");
                                break;
                            case pe.LINUX:
                                xe(this, gt, "linux");
                                break;
                        }
                    return b(this, gt);
                });
                I(this, "getName", () => {
                    if (typeof b(this, yr) > "u") {
                        let r = null;
                        switch (process.platform) {
                            case pe.MAC:
                                r = "echo $(scutil --get LocalHostName).local";
                                break;
                            case pe.WINDOWS:
                            case pe.LINUX:
                                r = "hostname";
                                break;
                        }
                        if (r !== null)
                            try {
                                let n = $a(r).toString();
                                xe(this, yr, n.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (n) {
                                this._socialdetox.devMode && console.warn("Device Name", `${n}`);
                            }
                    }
                    return b(this, yr);
                });
                I(this, "getUUID", () => {
                    if (typeof b(this, Er) > "u") {
                        let r = null,
                            n =
                                process.arch === "ia32" && process.env.hasOwnProperty("PROCESSOR_ARCHITEW6432")
                                    ? "%windir%\\sysnative\\cmd.exe /c %windir%\\System32"
                                    : "%windir%\\System32";
                        switch (process.platform) {
                            case pe.MAC:
                                r = "ioreg -rd1 -c IOPlatformExpertDevice";
                                break;
                            case pe.WINDOWS:
                                r = `${n}\\REG.exe QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid`;
                                break;
                            case pe.LINUX:
                                r = "( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :";
                                break;
                        }
                        if (r !== null)
                            try {
                                let i = $a(r).toString();
                                switch (process.platform) {
                                    case pe.MAC:
                                        i = i.replace(/^.*?\bIOPlatformUUID"\s*=\s*"(.*?)".*$/gs, "$1");
                                        break;
                                    case pe.WINDOWS:
                                        i = i.split("REG_SZ")[1];
                                        break;
                                }
                                xe(this, Er, i.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (i) {
                                this._socialdetox.devMode && console.warn("Device UUID", `${i}`);
                            }
                    }
                    return b(this, Er);
                });
                I(this, "getSerialNumber", () => {
                    if (typeof b(this, _r) > "u") {
                        let r = null;
                        switch (process.platform) {
                            case pe.MAC:
                                r = "ioreg -l | grep IOPlatformSerialNumber";
                                break;
                            case pe.WINDOWS:
                                r = "wmic bios get SerialNumber";
                                break;
                            case pe.LINUX:
                                r = 'lsblk -o UUID -n /dev/sda* | grep -v "^$" | grep -vE "^.{,20}$" | sed -n 1p';
                                break;
                        }
                        if (r !== null)
                            try {
                                let n = $a(r).toString();
                                switch (process.platform) {
                                    case pe.MAC:
                                        n = n.replace(/^.*?\bIOPlatformSerialNumber"\s*=\s*"(.*?)".*$/gs, "$1");
                                        break;
                                    case pe.WINDOWS:
                                        n = n.split("SerialNumber")[1];
                                        break;
                                }
                                xe(this, _r, n.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (n) {
                                this._socialdetox.devMode && console.warn("Device Serial Number", `${n}`);
                            }
                    }
                    return b(this, _r);
                });
                this._register("device");
            }
        }),
        (Er = new WeakMap()),
        (yr = new WeakMap()),
        (_r = new WeakMap()),
        (gt = new WeakMap()),
        Vm);
});
var ka = g((HN, Xm) => {
    var wt;
    Xm.exports =
        ((wt = class {
            static getTargetChannelName(t) {
                return `${wt.WINDOW_TARGET}/${t}`;
            }
        }),
        I(wt, "WINDOW_MAIN", "@main"),
        I(wt, "WINDOW_TARGET", "@target"),
        wt);
});
var Zm = g((GN, Qm) => {
    var { ipcMain: Km, BrowserView: vr } = require("electron"),
        Jm = require("path"),
        ab = Xi(),
        lb = ka(),
        hn,
        pn,
        mn,
        gn,
        k,
        He,
        je,
        $t;
    Qm.exports =
        ((hn = class extends ab {
            constructor(r) {
                super(r);
                me(this, pn);
                me(this, mn);
                me(this, gn, "");
                me(this, k, {});
                me(this, He, {});
                me(this, je, "");
                I(this, "setWindowSize", (r, n) => {
                    xe(this, pn, r), xe(this, mn, n), b(this, $t).call(this);
                });
                I(this, "list", () => Object.keys(b(this, k)));
                I(this, "removeAll", () => {
                    let r = Object.keys(b(this, k)).length > 0;
                    for (let n of Object.keys(b(this, k))) this.remove(n);
                    return r;
                });
                I(this, "add", (r, n, i = !1) => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid target ID");
                    if (typeof n != "string" || !n.match(/^https?:\/\//gi)) throw new Error("Invalid target URL");
                    if (b(this, k)[r] instanceof vr) return !1;
                    let o = new vr({
                        width: this._socialdetox.config.getWindowWidth() - this.constructor.MARGIN_LEFT,
                        height:
                            this._socialdetox.config.getWindowHeight() -
                            (this.constructor.MARGIN_TOP + this.constructor.MARGIN_BOTTOM),
                        resizable: !1,
                        backgroundColor: "#000",
                        transparent: !0,
                        webPreferences: {
                            backgroundThrottling: !1,
                            imageAnimationPolicy: "noAnimation",
                            spellcheck: !1,
                            preload: Jm.join(this._socialdetox.rootPath, "lib/preloader/entry/target.js"),
                            nodeIntegration: !0,
                            devTools: !0,
                            partition: `persist:target-${r}`,
                            cache: !1,
                            additionalArguments: [`--target-id=${r}`]
                        }
                    });
                    (o.metadata = { targetUrl: n, loaded: !1 }),
                        o.webContents.once("ready-to-show", () => o.webContents.setZoomFactor(1)),
                        o.webContents.on("dom-ready", () => o.webContents.focus()),
                        o.webContents.setUserAgent(b(this, gn)),
                        o.webContents.setZoomLevel(0),
                        o.webContents.setAudioMuted(!0),
                        o.webContents.loadFile(Jm.join(this._socialdetox.rootPath, "res", "index.html"), {
                            extraHeaders: "pragma: no-cache"
                        }),
                        o.webContents.on("context-menu", (a, l) => {
                            a.preventDefault(), o.webContents.openDevTools({ mode: "detach" });
                        }),
                        this._socialdetox.mainWindow.addBrowserView(o),
                        this._socialdetox.main.view instanceof vr &&
                            (this._socialdetox.mainWindow.removeBrowserView(this._socialdetox.main.view),
                            this._socialdetox.mainWindow.addBrowserView(this._socialdetox.main.view)),
                        (b(this, k)[r] = o);
                    let s = lb.getTargetChannelName(r);
                    return (
                        (b(this, He)[r] = {
                            channel: s,
                            listener: (a, ...l) => {
                                this._socialdetox.devMode && console.log(`\u{1F3AF} ${s}`, JSON.stringify(l)),
                                    l.length >= 3 && o.webContents.send(s, l);
                            }
                        }),
                        Km.on(b(this, He)[r].channel, b(this, He)[r].listener),
                        i ? this.select(r) : b(this, $t).call(this),
                        !0
                    );
                });
                I(this, "remove", r => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid target ID");
                    if (!(b(this, k)[r] instanceof vr) || typeof b(this, He)[r] > "u") return !1;
                    Km.off(b(this, He)[r].channel, b(this, He)[r].listener), delete b(this, He)[r];
                    try {
                        this._socialdetox.mainWindow.removeBrowserView(b(this, k)[r]);
                    } catch {}
                    try {
                        b(this, k)[r].webContents.destroy();
                    } catch {}
                    return delete b(this, k)[r], r === b(this, je) && xe(this, je, ""), b(this, $t).call(this), !0;
                });
                I(this, "select", r => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid target ID");
                    if (b(this, k)[r] instanceof vr && b(this, je) !== r) {
                        xe(this, je, r),
                            b(this, k)[r].metadata.loaded ||
                                ((b(this, k)[r].metadata.loaded = !0),
                                b(this, k)[r].webContents.loadURL(b(this, k)[r].metadata.targetUrl));
                        let n = {};
                        for (let i of Object.keys(b(this, k)).filter(o => o !== r)) n[i] = b(this, k)[i];
                        return (
                            (n[r] = b(this, k)[r]),
                            xe(this, k, n),
                            this._socialdetox.mainWindow.removeBrowserView(b(this, k)[r]),
                            this._socialdetox.mainWindow.removeBrowserView(this._socialdetox.main.view),
                            this._socialdetox.main.onTop
                                ? (this._socialdetox.mainWindow.addBrowserView(b(this, k)[r]),
                                  this._socialdetox.mainWindow.addBrowserView(this._socialdetox.main.view),
                                  this._socialdetox.main.view.webContents.focus())
                                : (this._socialdetox.mainWindow.addBrowserView(this._socialdetox.main.view),
                                  this._socialdetox.mainWindow.addBrowserView(b(this, k)[r]),
                                  b(this, k)[r].webContents.focus()),
                            b(this, $t).call(this),
                            !0
                        );
                    }
                    return !1;
                });
                I(this, "getSelected", () => b(this, je));
                I(this, "getTargets", () => b(this, k));
                I(this, "webContents", async (r, n, i) => {
                    if (
                        (this._socialdetox.devMode &&
                            console.log("ipc.target.webContents", JSON.stringify({ targetId: r, methodName: n, methodArgs: i })),
                        typeof r != "string" || !r.length)
                    )
                        throw new Error("Invalid target ID");
                    if (!(b(this, k)[r] instanceof vr)) throw new Error("Invalid target ID");
                    if (typeof n != "string" || typeof b(this, k)[r].webContents[n] != "function")
                        throw new Error(`Invalid target webContents method: ${n}`);
                    return (
                        n === "loadURL" && (b(this, k)[r].metadata.loaded = !0),
                        Array.isArray(i) || (i = []),
                        await b(this, k)[r].webContents[n](...i)
                    );
                });
                me(this, $t, () => {
                    if (!Object.keys(b(this, k)).length) return;
                    let r = b(this, pn) - this.constructor.MARGIN_LEFT,
                        n = b(this, mn) - (this.constructor.MARGIN_TOP + this.constructor.MARGIN_BOTTOM);
                    for (let i of Object.keys(b(this, k))) {
                        let o = i === b(this, je) ? this.constructor.MARGIN_LEFT : 100 - r,
                            s = i === b(this, je) ? this.constructor.MARGIN_TOP : 50 - n;
                        b(this, k)[i].setBounds({ x: o, y: s, width: r, height: n });
                    }
                });
                let n = "";
                switch (process.platform) {
                    case "darwin":
                        n = "(Macintosh; Intel Mac OS X 13_3)";
                        break;
                    case "win32":
                        n = "(Windows NT 10.0; Win64; x64)";
                        break;
                    case "linux":
                        n = "(X11; Linux x86_64)";
                        break;
                }
                xe(this, gn, `Mozilla/5.0 ${n} AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36`),
                    this._register("target");
            }
        }),
        (pn = new WeakMap()),
        (mn = new WeakMap()),
        (gn = new WeakMap()),
        (k = new WeakMap()),
        (He = new WeakMap()),
        (je = new WeakMap()),
        ($t = new WeakMap()),
        I(hn, "MARGIN_LEFT", 300),
        I(hn, "MARGIN_TOP", 50),
        I(hn, "MARGIN_BOTTOM", 50),
        hn);
});
var rg = g((zN, tg) => {
    var { session: ub, ipcMain: cb, BrowserView: Ki } = require("electron"),
        fb = require("path"),
        db = Xi(),
        Ma = ka(),
        Sr,
        eg;
    tg.exports =
        ((eg = class extends db {
            constructor(r) {
                super(r);
                I(this, "windowWidth");
                I(this, "windowHeight");
                I(this, "view", null);
                I(this, "onTop", !1);
                I(this, "darkMode", !0);
                me(this, Sr, () =>
                    this.view instanceof Ki
                        ? (this.view.setBounds({ x: 0, y: 0, width: this.windowWidth, height: this.windowHeight }), !0)
                        : !1
                );
                I(this, "init", () => {
                    if (this.view instanceof Ki) return !1;
                    (this.windowWidth = this._socialdetox.config.getWindowWidth()),
                        (this.windowHeight = this._socialdetox.config.getWindowHeight());
                    let r = new Ki({
                        width: this.windowWidth,
                        height: this.windowHeight,
                        resizable: !1,
                        backgroundColor: "#00000000",
                        transparent: !0,
                        webPreferences: {
                            backgroundThrottling: !1,
                            imageAnimationPolicy: "noAnimation",
                            spellcheck: !1,
                            preload: fb.join(this._socialdetox.rootPath, "lib/preloader/entry/main.js"),
                            nodeIntegration: !0,
                            devTools: !0,
                            session: ub.defaultSession,
                            cache: !1,
                            webSecurity: !1,
                            allowRunningInsecureContent: !0
                        }
                    });
                    return (
                        r.webContents.on("ready-to-show", () => r.webContents.setZoomFactor(1)),
                        r.webContents.setZoomLevel(0),
                        r.webContents.setAudioMuted(!1),
                        r.webContents.loadURL(`http://localhost:${this._socialdetox.config.getPort()}`),
                        r.webContents.on("dom-ready", () => r.webContents.focus()),
                        r.webContents.on("context-menu", (n, i) => {
                            n.preventDefault(), r.webContents.openDevTools({ mode: "detach" });
                        }),
                        (this.view = r),
                        cb.on(Ma.WINDOW_MAIN, (n, ...i) => {
                            this._socialdetox.devMode && console.log(`\u{1F3E0} ${Ma.WINDOW_MAIN}`, JSON.stringify(i)),
                                i.length >= 3 && r.webContents.send(Ma.WINDOW_MAIN, i);
                        }),
                        this._socialdetox.mainWindow.addBrowserView(r),
                        b(this, Sr).call(this),
                        !0
                    );
                });
                I(this, "setWindowSize", (r, n) => {
                    (this.windowWidth = r), (this.windowHeight = n), b(this, Sr).call(this);
                });
                I(this, "setOnTop", r => {
                    let n = !1;
                    if (((r = !!r), this.onTop !== r)) {
                        if (((this.onTop = r), this.onTop))
                            this._socialdetox.mainWindow?.removeBrowserView(this.view),
                                this._socialdetox.mainWindow?.addBrowserView(this.view),
                                this.view?.webContents?.focus();
                        else {
                            let i = this._socialdetox.target.getSelected();
                            if (typeof i == "string" && i.length) {
                                let o = this._socialdetox.target.getTargets()[i];
                                o instanceof Ki &&
                                    (this._socialdetox.mainWindow.removeBrowserView(o),
                                    this._socialdetox.mainWindow.removeBrowserView(this.view),
                                    this._socialdetox.mainWindow.addBrowserView(this.view),
                                    this._socialdetox.mainWindow.addBrowserView(o),
                                    o.webContents.focus());
                            }
                        }
                        b(this, Sr).call(this), (n = !0);
                    }
                    return n;
                });
                I(this, "getOnTop", () => this.onTop);
                I(this, "setDarkMode", r => {
                    let n = !1;
                    return (
                        (r = !!r),
                        this.darkMode !== r &&
                            ((this.darkMode = r), this._socialdetox.window().setBackgroundColor(r ? "#000" : "#fff"), (n = !0)),
                        n
                    );
                });
                I(this, "getDarkMode", () => this.darkMode);
                this._register("main");
            }
        }),
        (Sr = new WeakMap()),
        eg);
});
var ig = g((JN, ng) => {
    var { app: hb, session: pb, BrowserWindow: mb } = require("electron"),
        gb = require("path"),
        wb = Rm(),
        Eb = Pm(),
        yb = Lm(),
        _b = $m(),
        vb = Mm(),
        Sb = Hm(),
        Ab = zm(),
        xb = Zm(),
        Tb = rg();
    ng.exports = class {
        constructor() {
            I(this, "mainWindow", null);
            I(this, "rootPath", hb.getAppPath());
            I(this, "devMode", process.env.NODE_ENV === "development");
            I(this, "log", new _b(this));
            I(this, "webserver", new Sb(this));
            I(this, "activity", new wb(this));
            I(this, "device", new Ab(this));
            I(this, "target", new xb(this));
            I(this, "main", new Tb(this));
            I(this, "config", new Eb(this));
            I(this, "file", new yb(this));
            I(this, "utils", new vb(this));
        }
        window() {
            let t = this;
            if (t.mainWindow === null) {
                (t.mainWindow = new mb({
                    minWidth: t.config.getWindowWidth(),
                    minHeight: t.config.getWindowHeight(),
                    width: t.config.getWindowWidth(),
                    height: t.config.getWindowHeight(),
                    icon: gb.join(t.rootPath, "res/icons/icon.png"),
                    resizable: !0,
                    titleBarStyle: "default",
                    title: "SocialDetox",
                    useContentSize: !0,
                    show: !1,
                    backgroundColor: "#000",
                    webPreferences: { spellcheck: !1, nodeIntegration: !0, session: pb.defaultSession }
                })),
                    t.mainWindow.setMaxListeners(0),
                    t.mainWindow.once("closed", () => (t.mainWindow = null));
                let r = () => {
                    let n = t.mainWindow.getSize();
                    t.main.setWindowSize(n[0], n[1]), t.target.setWindowSize(n[0], n[1]);
                };
                t.mainWindow.on("resize", r),
                    t.mainWindow.once("ready-to-show", r),
                    t.main.init(),
                    t.main.view.webContents.on("did-finish-load", () => (t.mainWindow.show(), r())),
                    t.mainWindow.setMenu(null),
                    setInterval(() => {
                        let n = t.mainWindow.getSize();
                        t.mainWindow.setSize(n[0] + 1, n[1]), setTimeout(() => t.mainWindow.setSize(n[0], n[1]), 250);
                    }, 9e4);
            }
            return t.mainWindow;
        }
    };
});
var { app: We, BrowserWindow: Cb } = require("electron"),
    { autoUpdater: Ba } = Ut(),
    bb = ig();
We.disableHardwareAcceleration();
We.commandLine.appendSwitch("disable-gpu");
We.commandLine.appendSwitch("allow-insecure-localhost");
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
process.on("uncaughtException", e => {
    process.env.NODE_ENV === "development" && console.debug(e);
});
do {
    if (!We.requestSingleInstanceLock()) {
        We.quit();
        break;
    }
    let e = null;
    We.on("second-instance", () => {
        e !== null && (e.isMinimized() && e.restore(), e.focus());
    }),
        We.on("ready", async () => {
            let t = new bb();
            await t.webserver.start(),
                (e = t.window()),
                t.activity.main(),
                We.on("activate", () => {
                    Cb.getAllWindows().length === 0 && t.activity.main();
                }),
                Ba.checkForUpdatesAndNotify();
        }),
        Ba.on("update-downloaded", () => {
            dialog
                .showMessageBox({ type: "info", title: "Update ready", message: "Install now?", buttons: ["Yes", "Later"] })
                .then(t => {
                    t.response === 0 && Ba.quitAndInstall();
                });
        }),
        We.on("window-all-closed", () => {
            We.quit();
        });
} while (!1);
