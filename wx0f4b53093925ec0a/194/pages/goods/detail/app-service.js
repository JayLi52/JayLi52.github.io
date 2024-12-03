/*v0.5vv_20211229_syb_scopedata*/
global.__wcc_version__ = 'v0.5vv_20211229_syb_scopedata';
global.__wcc_version_info__ = {
    "customComponents": true,
    "fixZeroRpx": true,
    "propValueDeepCopy": false
};
var $gwxc
var $gaic = {}
$gwx12 = function(path, global) {
    if (typeof global === 'undefined') global = {};
    if (typeof __WXML_GLOBAL__ === 'undefined') {
        __WXML_GLOBAL__ = {};
    }
    __WXML_GLOBAL__.modules = __WXML_GLOBAL__.modules || {};
    $gwx('init', global);

    function _(a, b) {
        if (typeof(b) != 'undefined') a.children.push(b);
    }

    function _v(k) {
        if (typeof(k) != 'undefined') return {
            tag: 'virtual',
            'wxKey': k,
            children: []
        };
        return {
            tag: 'virtual',
            children: []
        };
    }

    function _n(tag) {
        $gwxc++;
        if ($gwxc >= 16000) {
            throw 'Dom limit exceeded, please check if there\'s any mistake you\'ve made.'
        };
        return {
            tag: 'wx-' + tag,
            attr: {},
            children: [],
            n: [],
            raw: {},
            generics: {}
        }
    }

    function _p(a, b) {
        b && a.properities.push(b);
    }

    function _s(scope, env, key) {
        return typeof(scope[key]) != 'undefined' ? scope[key] : env[key]
    }

    function _wp(m) {
        console.warn("WXMLRT_$gwx12:" + m)
    }

    function _wl(tname, prefix) {
        _wp(prefix + ':-1:-1:-1: Template `' + tname + '` is being called recursively, will be stop.')
    }
    $gwn = console.warn;
    $gwl = console.log;

    function $gwh() {
        function x() {}
        x.prototype = {
            hn: function(obj, all) {
                if (typeof(obj) == 'object') {
                    var cnt = 0;
                    var any1 = false,
                        any2 = false;
                    for (var x in obj) {
                        any1 = any1 | x === '__value__';
                        any2 = any2 | x === '__wxspec__';
                        cnt++;
                        if (cnt > 2) break;
                    }
                    return cnt == 2 && any1 && any2 && (all || obj.__wxspec__ !== 'm' || this.hn(obj.__value__) === 'h') ? "h" : "n";
                }
                return "n";
            },
            nh: function(obj, special) {
                return {
                    __value__: obj,
                    __wxspec__: special ? special : true
                }
            },
            rv: function(obj) {
                return this.hn(obj, true) === 'n' ? obj : this.rv(obj.__value__);
            },
            hm: function(obj) {
                if (typeof(obj) == 'object') {
                    var cnt = 0;
                    var any1 = false,
                        any2 = false;
                    for (var x in obj) {
                        any1 = any1 | x === '__value__';
                        any2 = any2 | x === '__wxspec__';
                        cnt++;
                        if (cnt > 2) break;
                    }
                    return cnt == 2 && any1 && any2 && (obj.__wxspec__ === 'm' || this.hm(obj.__value__));
                }
                return false;
            }
        }
        return new x;
    }
    wh = $gwh();

    function $gstack(s) {
        var tmp = s.split('\n ' + ' ' + ' ' + ' ');
        for (var i = 0; i < tmp.length; ++i) {
            if (0 == i) continue;
            if (")" === tmp[i][tmp[i].length - 1])
                tmp[i] = tmp[i].replace(/\s\(.*\)$/, "");
            else
                tmp[i] = "at anonymous function";
        }
        return tmp.join('\n ' + ' ' + ' ' + ' ');
    }

    function $gwrt(should_pass_type_info) {
        function ArithmeticEv(ops, e, s, g, o) {
            var _f = false;
            var rop = ops[0][1];
            var _a, _b, _c, _d, _aa, _bb;
            switch (rop) {
                case '?:':
                    _a = rev(ops[1], e, s, g, o, _f);
                    _c = should_pass_type_info && (wh.hn(_a) === 'h');
                    _d = wh.rv(_a) ? rev(ops[2], e, s, g, o, _f) : rev(ops[3], e, s, g, o, _f);
                    _d = _c && wh.hn(_d) === 'n' ? wh.nh(_d, 'c') : _d;
                    return _d;
                    break;
                case '&&':
                    _a = rev(ops[1], e, s, g, o, _f);
                    _c = should_pass_type_info && (wh.hn(_a) === 'h');
                    _d = wh.rv(_a) ? rev(ops[2], e, s, g, o, _f) : wh.rv(_a);
                    _d = _c && wh.hn(_d) === 'n' ? wh.nh(_d, 'c') : _d;
                    return _d;
                    break;
                case '||':
                    _a = rev(ops[1], e, s, g, o, _f);
                    _c = should_pass_type_info && (wh.hn(_a) === 'h');
                    _d = wh.rv(_a) ? wh.rv(_a) : rev(ops[2], e, s, g, o, _f);
                    _d = _c && wh.hn(_d) === 'n' ? wh.nh(_d, 'c') : _d;
                    return _d;
                    break;
                case '+':
                case '*':
                case '/':
                case '%':
                case '|':
                case '^':
                case '&':
                case '===':
                case '==':
                case '!=':
                case '!==':
                case '>=':
                case '<=':
                case '>':
                case '<':
                case '<<':
                case '>>':
                    _a = rev(ops[1], e, s, g, o, _f);
                    _b = rev(ops[2], e, s, g, o, _f);
                    _c = should_pass_type_info && (wh.hn(_a) === 'h' || wh.hn(_b) === 'h');
                    switch (rop) {
                        case '+':
                            _d = wh.rv(_a) + wh.rv(_b);
                            break;
                        case '*':
                            _d = wh.rv(_a) * wh.rv(_b);
                            break;
                        case '/':
                            _d = wh.rv(_a) / wh.rv(_b);
                            break;
                        case '%':
                            _d = wh.rv(_a) % wh.rv(_b);
                            break;
                        case '|':
                            _d = wh.rv(_a) | wh.rv(_b);
                            break;
                        case '^':
                            _d = wh.rv(_a) ^ wh.rv(_b);
                            break;
                        case '&':
                            _d = wh.rv(_a) & wh.rv(_b);
                            break;
                        case '===':
                            _d = wh.rv(_a) === wh.rv(_b);
                            break;
                        case '==':
                            _d = wh.rv(_a) == wh.rv(_b);
                            break;
                        case '!=':
                            _d = wh.rv(_a) != wh.rv(_b);
                            break;
                        case '!==':
                            _d = wh.rv(_a) !== wh.rv(_b);
                            break;
                        case '>=':
                            _d = wh.rv(_a) >= wh.rv(_b);
                            break;
                        case '<=':
                            _d = wh.rv(_a) <= wh.rv(_b);
                            break;
                        case '>':
                            _d = wh.rv(_a) > wh.rv(_b);
                            break;
                        case '<':
                            _d = wh.rv(_a) < wh.rv(_b);
                            break;
                        case '<<':
                            _d = wh.rv(_a) << wh.rv(_b);
                            break;
                        case '>>':
                            _d = wh.rv(_a) >> wh.rv(_b);
                            break;
                        default:
                            break;
                    }
                    return _c ? wh.nh(_d, "c") : _d;
                    break;
                case '-':
                    _a = ops.length === 3 ? rev(ops[1], e, s, g, o, _f) : 0;
                    _b = ops.length === 3 ? rev(ops[2], e, s, g, o, _f) : rev(ops[1], e, s, g, o, _f);
                    _c = should_pass_type_info && (wh.hn(_a) === 'h' || wh.hn(_b) === 'h');
                    _d = _c ? wh.rv(_a) - wh.rv(_b) : _a - _b;
                    return _c ? wh.nh(_d, "c") : _d;
                    break;
                case '!':
                    _a = rev(ops[1], e, s, g, o, _f);
                    _c = should_pass_type_info && (wh.hn(_a) == 'h');
                    _d = !wh.rv(_a);
                    return _c ? wh.nh(_d, "c") : _d;
                case '~':
                    _a = rev(ops[1], e, s, g, o, _f);
                    _c = should_pass_type_info && (wh.hn(_a) == 'h');
                    _d = ~wh.rv(_a);
                    return _c ? wh.nh(_d, "c") : _d;
                default:
                    $gwn('unrecognized op' + rop);
            }
        }

        function rev(ops, e, s, g, o, newap) {
            var op = ops[0];
            var _f = false;
            if (typeof newap !== "undefined") o.ap = newap;
            if (typeof(op) === 'object') {
                var vop = op[0];
                var _a, _aa, _b, _bb, _c, _d, _s, _e, _ta, _tb, _td;
                switch (vop) {
                    case 2:
                        return ArithmeticEv(ops, e, s, g, o);
                        break;
                    case 4:
                        return rev(ops[1], e, s, g, o, _f);
                        break;
                    case 5:
                        switch (ops.length) {
                            case 2:
                                _a = rev(ops[1], e, s, g, o, _f);
                                return should_pass_type_info ? [_a] : [wh.rv(_a)];
                                return [_a];
                                break;
                            case 1:
                                return [];
                                break;
                            default:
                                _a = rev(ops[1], e, s, g, o, _f);
                                _b = rev(ops[2], e, s, g, o, _f);
                                _a.push(
                                    should_pass_type_info ?
                                    _b :
                                    wh.rv(_b)
                                );
                                return _a;
                                break;
                        }
                        break;
                    case 6:
                        _a = rev(ops[1], e, s, g, o);
                        var ap = o.ap;
                        _ta = wh.hn(_a) === 'h';
                        _aa = _ta ? wh.rv(_a) : _a;
                        o.is_affected |= _ta;
                        if (should_pass_type_info) {
                            if (_aa === null || typeof(_aa) === 'undefined') {
                                return _ta ? wh.nh(undefined, 'e') : undefined;
                            }
                            _b = rev(ops[2], e, s, g, o, _f);
                            _tb = wh.hn(_b) === 'h';
                            _bb = _tb ? wh.rv(_b) : _b;
                            o.ap = ap;
                            o.is_affected |= _tb;
                            if (_bb === null || typeof(_bb) === 'undefined' ||
                                _bb === "__proto__" || _bb === "prototype" || _bb === "caller") {
                                return (_ta || _tb) ? wh.nh(undefined, 'e') : undefined;
                            }
                            _d = _aa[_bb];
                            if (typeof _d === 'function' && !ap) _d = undefined;
                            _td = wh.hn(_d) === 'h';
                            o.is_affected |= _td;
                            return (_ta || _tb) ? (_td ? _d : wh.nh(_d, 'e')) : _d;
                        } else {
                            if (_aa === null || typeof(_aa) === 'undefined') {
                                return undefined;
                            }
                            _b = rev(ops[2], e, s, g, o, _f);
                            _tb = wh.hn(_b) === 'h';
                            _bb = _tb ? wh.rv(_b) : _b;
                            o.ap = ap;
                            o.is_affected |= _tb;
                            if (_bb === null || typeof(_bb) === 'undefined' ||
                                _bb === "__proto__" || _bb === "prototype" || _bb === "caller") {
                                return undefined;
                            }
                            _d = _aa[_bb];
                            if (typeof _d === 'function' && !ap) _d = undefined;
                            _td = wh.hn(_d) === 'h';
                            o.is_affected |= _td;
                            return _td ? wh.rv(_d) : _d;
                        }
                    case 7:
                        switch (ops[1][0]) {
                            case 11:
                                o.is_affected |= wh.hn(g) === 'h';
                                return g;
                            case 3:
                                _s = wh.rv(s);
                                _e = wh.rv(e);
                                _b = ops[1][1];
                                if (g && g.f && g.f.hasOwnProperty(_b)) {
                                    _a = g.f;
                                    o.ap = true;
                                } else {
                                    _a = _s && _s.hasOwnProperty(_b) ?
                                        s : (_e && _e.hasOwnProperty(_b) ? e : undefined);
                                }
                                if (should_pass_type_info) {
                                    if (_a) {
                                        _ta = wh.hn(_a) === 'h';
                                        _aa = _ta ? wh.rv(_a) : _a;
                                        _d = _aa[_b];
                                        _td = wh.hn(_d) === 'h';
                                        o.is_affected |= _ta || _td;
                                        _d = _ta && !_td ? wh.nh(_d, 'e') : _d;
                                        return _d;
                                    }
                                } else {
                                    if (_a) {
                                        _ta = wh.hn(_a) === 'h';
                                        _aa = _ta ? wh.rv(_a) : _a;
                                        _d = _aa[_b];
                                        _td = wh.hn(_d) === 'h';
                                        o.is_affected |= _ta || _td;
                                        return wh.rv(_d);
                                    }
                                }
                                return undefined;
                        }
                        break;
                    case 8:
                        _a = {};
                        _a[ops[1]] = rev(ops[2], e, s, g, o, _f);
                        return _a;
                        break;
                    case 9:
                        _a = rev(ops[1], e, s, g, o, _f);
                        _b = rev(ops[2], e, s, g, o, _f);

                        function merge(_a, _b, _ow) {
                            var ka, _bbk;
                            _ta = wh.hn(_a) === 'h';
                            _tb = wh.hn(_b) === 'h';
                            _aa = wh.rv(_a);
                            _bb = wh.rv(_b);
                            for (var k in _bb) {
                                if (_ow || !_aa.hasOwnProperty(k)) {
                                    _aa[k] = should_pass_type_info ? (_tb ? wh.nh(_bb[k], 'e') : _bb[k]) : wh.rv(_bb[k]);
                                }
                            }
                            return _a;
                        }
                        var _c = _a
                        var _ow = true
                        if (typeof(ops[1][0]) === "object" && ops[1][0][0] === 10) {
                            _a = _b
                            _b = _c
                            _ow = false
                        }
                        if (typeof(ops[1][0]) === "object" && ops[1][0][0] === 10) {
                            var _r = {}
                            return merge(merge(_r, _a, _ow), _b, _ow);
                        } else
                            return merge(_a, _b, _ow);
                        break;
                    case 10:
                        _a = rev(ops[1], e, s, g, o, _f);
                        _a = should_pass_type_info ? _a : wh.rv(_a);
                        return _a;
                        break;
                    case 12:
                        var _r;
                        _a = rev(ops[1], e, s, g, o);
                        if (!o.ap) {
                            return should_pass_type_info && wh.hn(_a) === 'h' ? wh.nh(_r, 'f') : _r;
                        }
                        var ap = o.ap;
                        _b = rev(ops[2], e, s, g, o, _f);
                        o.ap = ap;
                        _ta = wh.hn(_a) === 'h';
                        _tb = _ca(_b);
                        _aa = wh.rv(_a);
                        _bb = wh.rv(_b);
                        snap_bb = $gdc(_bb, "nv_");
                        try {
                            _r = typeof _aa === "function" ? $gdc(_aa.apply(null, snap_bb)) : undefined;
                        } catch (e) {
                            e.message = e.message.replace(/nv_/g, "");
                            e.stack = e.stack.substring(0, e.stack.indexOf("\n", e.stack.lastIndexOf("at nv_")));
                            e.stack = e.stack.replace(/\snv_/g, " ");
                            e.stack = $gstack(e.stack);
                            if (g.debugInfo) {
                                e.stack += "\n " + " " + " " + " at " + g.debugInfo[0] + ":" + g.debugInfo[1] + ":" + g.debugInfo[2];
                                console.error(e);
                            }
                            _r = undefined;
                        }
                        return should_pass_type_info && (_tb || _ta) ? wh.nh(_r, 'f') : _r;
                }
            } else {
                if (op === 3 || op === 1) return ops[1];
                else if (op === 11) {
                    var _a = '';
                    for (var i = 1; i < ops.length; i++) {
                        var xp = wh.rv(rev(ops[i], e, s, g, o, _f));
                        _a += typeof(xp) === 'undefined' ? '' : xp;
                    }
                    return _a;
                }
            }
        }

        function wrapper(ops, e, s, g, o, newap) {
            if (ops[0] == '11182016') {
                g.debugInfo = ops[2];
                return rev(ops[1], e, s, g, o, newap);
            } else {
                g.debugInfo = null;
                return rev(ops, e, s, g, o, newap);
            }
        }
        return wrapper;
    }
    gra = $gwrt(true);
    grb = $gwrt(false);

    function TestTest(expr, ops, e, s, g, expect_a, expect_b, expect_affected) {
        {
            var o = {
                is_affected: false
            };
            var a = gra(ops, e, s, g, o);
            if (JSON.stringify(a) != JSON.stringify(expect_a) || o.is_affected != expect_affected) {
                console.warn("A. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify(expect_a) + ", " + expect_affected + " is expected");
            }
        } {
            var o = {
                is_affected: false
            };
            var a = grb(ops, e, s, g, o);
            if (JSON.stringify(a) != JSON.stringify(expect_b) || o.is_affected != expect_affected) {
                console.warn("B. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify(expect_b) + ", " + expect_affected + " is expected");
            }
        }
    }

    function wfor(to_iter, func, env, _s, global, father, itemname, indexname, keyname) {
        var _n = wh.hn(to_iter) === 'n';
        var scope = wh.rv(_s);
        var has_old_item = scope.hasOwnProperty(itemname);
        var has_old_index = scope.hasOwnProperty(indexname);
        var old_item = scope[itemname];
        var old_index = scope[indexname];
        var full = Object.prototype.toString.call(wh.rv(to_iter));
        var type = full[8];
        if (type === 'N' && full[10] === 'l') type = 'X';
        var _y;
        if (_n) {
            if (type === 'A') {
                var r_iter_item;
                for (var i = 0; i < to_iter.length; i++) {
                    scope[itemname] = to_iter[i];
                    scope[indexname] = _n ? i : wh.nh(i, 'h');
                    r_iter_item = wh.rv(to_iter[i]);
                    var key = keyname && r_iter_item ? (keyname === "*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
                    _y = _v(key);
                    _(father, _y);
                    func(env, scope, _y, global);
                }
            } else if (type === 'O') {
                var i = 0;
                var r_iter_item;
                for (var k in to_iter) {
                    scope[itemname] = to_iter[k];
                    scope[indexname] = _n ? k : wh.nh(k, 'h');
                    r_iter_item = wh.rv(to_iter[k]);
                    var key = keyname && r_iter_item ? (keyname === "*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
                    _y = _v(key);
                    _(father, _y);
                    func(env, scope, _y, global);
                    i++;
                }
            } else if (type === 'S') {
                for (var i = 0; i < to_iter.length; i++) {
                    scope[itemname] = to_iter[i];
                    scope[indexname] = _n ? i : wh.nh(i, 'h');
                    _y = _v(to_iter[i] + i);
                    _(father, _y);
                    func(env, scope, _y, global);
                }
            } else if (type === 'N') {
                for (var i = 0; i < to_iter; i++) {
                    scope[itemname] = i;
                    scope[indexname] = _n ? i : wh.nh(i, 'h');
                    _y = _v(i);
                    _(father, _y);
                    func(env, scope, _y, global);
                }
            } else {}
        } else {
            var r_to_iter = wh.rv(to_iter);
            var r_iter_item, iter_item;
            if (type === 'A') {
                for (var i = 0; i < r_to_iter.length; i++) {
                    iter_item = r_to_iter[i];
                    iter_item = wh.hn(iter_item) === 'n' ? wh.nh(iter_item, 'h') : iter_item;
                    r_iter_item = wh.rv(iter_item);
                    scope[itemname] = iter_item
                    scope[indexname] = _n ? i : wh.nh(i, 'h');
                    var key = keyname && r_iter_item ? (keyname === "*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
                    _y = _v(key);
                    _(father, _y);
                    func(env, scope, _y, global);
                }
            } else if (type === 'O') {
                var i = 0;
                for (var k in r_to_iter) {
                    iter_item = r_to_iter[k];
                    iter_item = wh.hn(iter_item) === 'n' ? wh.nh(iter_item, 'h') : iter_item;
                    r_iter_item = wh.rv(iter_item);
                    scope[itemname] = iter_item;
                    scope[indexname] = _n ? k : wh.nh(k, 'h');
                    var key = keyname && r_iter_item ? (keyname === "*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
                    _y = _v(key);
                    _(father, _y);
                    func(env, scope, _y, global);
                    i++
                }
            } else if (type === 'S') {
                for (var i = 0; i < r_to_iter.length; i++) {
                    iter_item = wh.nh(r_to_iter[i], 'h');
                    scope[itemname] = iter_item;
                    scope[indexname] = _n ? i : wh.nh(i, 'h');
                    _y = _v(to_iter[i] + i);
                    _(father, _y);
                    func(env, scope, _y, global);
                }
            } else if (type === 'N') {
                for (var i = 0; i < r_to_iter; i++) {
                    iter_item = wh.nh(i, 'h');
                    scope[itemname] = iter_item;
                    scope[indexname] = _n ? i : wh.nh(i, 'h');
                    _y = _v(i);
                    _(father, _y);
                    func(env, scope, _y, global);
                }
            } else {}
        }
        if (has_old_item) {
            scope[itemname] = old_item;
        } else {
            delete scope[itemname];
        }
        if (has_old_index) {
            scope[indexname] = old_index;
        } else {
            delete scope[indexname];
        }
    }

    function _ca(o) {
        if (wh.hn(o) == 'h') return true;
        if (typeof o !== "object") return false;
        for (var i in o) {
            if (o.hasOwnProperty(i)) {
                if (_ca(o[i])) return true;
            }
        }
        return false;
    }

    function _da(node, attrname, opindex, raw, o) {
        var isaffected = false;
        var value = $gdc(raw, "", 2);
        if (o.ap && value && value.constructor === Function) {
            attrname = "$wxs:" + attrname;
            node.attr["$gdc"] = $gdc;
        }
        if (o.is_affected || _ca(raw)) {
            node.n.push(attrname);
            node.raw[attrname] = raw;
        }
        node.attr[attrname] = value;
    }

    function _r(node, attrname, opindex, env, scope, global) {
        global.opindex = opindex;
        var o = {},
            _env;
        var a = grb(z[opindex], env, scope, global, o);
        _da(node, attrname, opindex, a, o);
    }

    function _rz(z, node, attrname, opindex, env, scope, global) {
        global.opindex = opindex;
        var o = {},
            _env;
        var a = grb(z[opindex], env, scope, global, o);
        _da(node, attrname, opindex, a, o);
    }

    function _o(opindex, env, scope, global) {
        global.opindex = opindex;
        var nothing = {};
        var r = grb(z[opindex], env, scope, global, nothing);
        return (r && r.constructor === Function) ? undefined : r;
    }

    function _oz(z, opindex, env, scope, global) {
        global.opindex = opindex;
        var nothing = {};
        var r = grb(z[opindex], env, scope, global, nothing);
        return (r && r.constructor === Function) ? undefined : r;
    }

    function _1(opindex, env, scope, global, o) {
        var o = o || {};
        global.opindex = opindex;
        return gra(z[opindex], env, scope, global, o);
    }

    function _1z(z, opindex, env, scope, global, o) {
        var o = o || {};
        global.opindex = opindex;
        return gra(z[opindex], env, scope, global, o);
    }

    function _2(opindex, func, env, scope, global, father, itemname, indexname, keyname) {
        var o = {};
        var to_iter = _1(opindex, env, scope, global);
        wfor(to_iter, func, env, scope, global, father, itemname, indexname, keyname);
    }

    function _2z(z, opindex, func, env, scope, global, father, itemname, indexname, keyname) {
        var o = {};
        var to_iter = _1z(z, opindex, env, scope, global);
        wfor(to_iter, func, env, scope, global, father, itemname, indexname, keyname);
    }


    function _m(tag, attrs, generics, env, scope, global) {
        var tmp = _n(tag);
        var base = 0;
        for (var i = 0; i < attrs.length; i += 2) {
            if (base + attrs[i + 1] < 0) {
                tmp.attr[attrs[i]] = true;
            } else {
                _r(tmp, attrs[i], base + attrs[i + 1], env, scope, global);
                if (base === 0) base = attrs[i + 1];
            }
        }
        for (var i = 0; i < generics.length; i += 2) {
            if (base + generics[i + 1] < 0) {
                tmp.generics[generics[i]] = "";
            } else {
                var $t = grb(z[base + generics[i + 1]], env, scope, global);
                if ($t != "") $t = "wx-" + $t;
                tmp.generics[generics[i]] = $t;
                if (base === 0) base = generics[i + 1];
            }
        }
        return tmp;
    }

    function _mz(z, tag, attrs, generics, env, scope, global) {
        var tmp = _n(tag);
        var base = 0;
        for (var i = 0; i < attrs.length; i += 2) {
            if (base + attrs[i + 1] < 0) {
                tmp.attr[attrs[i]] = true;
            } else {
                _rz(z, tmp, attrs[i], base + attrs[i + 1], env, scope, global);
                if (base === 0) base = attrs[i + 1];
            }
        }
        for (var i = 0; i < generics.length; i += 2) {
            if (base + generics[i + 1] < 0) {
                tmp.generics[generics[i]] = "";
            } else {
                var $t = grb(z[base + generics[i + 1]], env, scope, global);
                if ($t != "") $t = "wx-" + $t;
                tmp.generics[generics[i]] = $t;
                if (base === 0) base = generics[i + 1];
            }
        }
        return tmp;
    }

    var nf_init = function() {
        if (typeof __WXML_GLOBAL__ === "undefined" || undefined === __WXML_GLOBAL__.wxs_nf_init) {
            nf_init_Object();
            nf_init_Function();
            nf_init_Array();
            nf_init_String();
            nf_init_Boolean();
            nf_init_Number();
            nf_init_Math();
            nf_init_Date();
            nf_init_RegExp();
        }
        if (typeof __WXML_GLOBAL__ !== "undefined") __WXML_GLOBAL__.wxs_nf_init = true;
    };
    var nf_init_Object = function() {
        Object.defineProperty(Object.prototype, "nv_constructor", {
            writable: true,
            value: "Object"
        })
        Object.defineProperty(Object.prototype, "nv_toString", {
            writable: true,
            value: function() {
                return "[object Object]"
            }
        })
    }
    var nf_init_Function = function() {
        Object.defineProperty(Function.prototype, "nv_constructor", {
            writable: true,
            value: "Function"
        })
        Object.defineProperty(Function.prototype, "nv_length", {get: function() {
                return this.length;
            },
            set: function() {}
        });
        Object.defineProperty(Function.prototype, "nv_toString", {
            writable: true,
            value: function() {
                return "[function Function]"
            }
        })
    }
    var nf_init_Array = function() {
        Object.defineProperty(Array.prototype, "nv_toString", {
            writable: true,
            value: function() {
                return this.nv_join();
            }
        })
        Object.defineProperty(Array.prototype, "nv_join", {
            writable: true,
            value: function(s) {
                s = undefined == s ? ',' : s;
                var r = "";
                for (var i = 0; i < this.length; ++i) {
                    if (0 != i) r += s;
                    if (null == this[i] || undefined == this[i]) r += '';
                    else if (typeof this[i] == 'function') r += this[i].nv_toString();
                    else if (typeof this[i] == 'object' && this[i].nv_constructor === "Array") r += this[i].nv_join();
                    else r += this[i].toString();
                }
                return r;
            }
        })
        Object.defineProperty(Array.prototype, "nv_constructor", {
            writable: true,
            value: "Array"
        })
        Object.defineProperty(Array.prototype, "nv_concat", {
            writable: true,
            value: Array.prototype.concat
        })
        Object.defineProperty(Array.prototype, "nv_pop", {
            writable: true,
            value: Array.prototype.pop
        })
        Object.defineProperty(Array.prototype, "nv_push", {
            writable: true,
            value: Array.prototype.push
        })
        Object.defineProperty(Array.prototype, "nv_reverse", {
            writable: true,
            value: Array.prototype.reverse
        })
        Object.defineProperty(Array.prototype, "nv_shift", {
            writable: true,
            value: Array.prototype.shift
        })
        Object.defineProperty(Array.prototype, "nv_slice", {
            writable: true,
            value: Array.prototype.slice
        })
        Object.defineProperty(Array.prototype, "nv_sort", {
            writable: true,
            value: Array.prototype.sort
        })
        Object.defineProperty(Array.prototype, "nv_splice", {
            writable: true,
            value: Array.prototype.splice
        })
        Object.defineProperty(Array.prototype, "nv_unshift", {
            writable: true,
            value: Array.prototype.unshift
        })
        Object.defineProperty(Array.prototype, "nv_indexOf", {
            writable: true,
            value: Array.prototype.indexOf
        })
        Object.defineProperty(Array.prototype, "nv_lastIndexOf", {
            writable: true,
            value: Array.prototype.lastIndexOf
        })
        Object.defineProperty(Array.prototype, "nv_every", {
            writable: true,
            value: Array.prototype.every
        })
        Object.defineProperty(Array.prototype, "nv_some", {
            writable: true,
            value: Array.prototype.some
        })
        Object.defineProperty(Array.prototype, "nv_forEach", {
            writable: true,
            value: Array.prototype.forEach
        })
        Object.defineProperty(Array.prototype, "nv_map", {
            writable: true,
            value: Array.prototype.map
        })
        Object.defineProperty(Array.prototype, "nv_filter", {
            writable: true,
            value: Array.prototype.filter
        })
        Object.defineProperty(Array.prototype, "nv_reduce", {
            writable: true,
            value: Array.prototype.reduce
        })
        Object.defineProperty(Array.prototype, "nv_reduceRight", {
            writable: true,
            value: Array.prototype.reduceRight
        })
        Object.defineProperty(Array.prototype, "nv_length", {get: function() {
                return this.length;
            },
            set: function(value) {
                this.length = value;
            }
        });
    }
    var nf_init_String = function() {
        Object.defineProperty(String.prototype, "nv_constructor", {
            writable: true,
            value: "String"
        })
        Object.defineProperty(String.prototype, "nv_toString", {
            writable: true,
            value: String.prototype.toString
        })
        Object.defineProperty(String.prototype, "nv_valueOf", {
            writable: true,
            value: String.prototype.valueOf
        })
        Object.defineProperty(String.prototype, "nv_charAt", {
            writable: true,
            value: String.prototype.charAt
        })
        Object.defineProperty(String.prototype, "nv_charCodeAt", {
            writable: true,
            value: String.prototype.charCodeAt
        })
        Object.defineProperty(String.prototype, "nv_concat", {
            writable: true,
            value: String.prototype.concat
        })
        Object.defineProperty(String.prototype, "nv_indexOf", {
            writable: true,
            value: String.prototype.indexOf
        })
        Object.defineProperty(String.prototype, "nv_lastIndexOf", {
            writable: true,
            value: String.prototype.lastIndexOf
        })
        Object.defineProperty(String.prototype, "nv_localeCompare", {
            writable: true,
            value: String.prototype.localeCompare
        })
        Object.defineProperty(String.prototype, "nv_match", {
            writable: true,
            value: String.prototype.match
        })
        Object.defineProperty(String.prototype, "nv_replace", {
            writable: true,
            value: String.prototype.replace
        })
        Object.defineProperty(String.prototype, "nv_search", {
            writable: true,
            value: String.prototype.search
        })
        Object.defineProperty(String.prototype, "nv_slice", {
            writable: true,
            value: String.prototype.slice
        })
        Object.defineProperty(String.prototype, "nv_split", {
            writable: true,
            value: String.prototype.split
        })
        Object.defineProperty(String.prototype, "nv_substring", {
            writable: true,
            value: String.prototype.substring
        })
        Object.defineProperty(String.prototype, "nv_toLowerCase", {
            writable: true,
            value: String.prototype.toLowerCase
        })
        Object.defineProperty(String.prototype, "nv_toLocaleLowerCase", {
            writable: true,
            value: String.prototype.toLocaleLowerCase
        })
        Object.defineProperty(String.prototype, "nv_toUpperCase", {
            writable: true,
            value: String.prototype.toUpperCase
        })
        Object.defineProperty(String.prototype, "nv_toLocaleUpperCase", {
            writable: true,
            value: String.prototype.toLocaleUpperCase
        })
        Object.defineProperty(String.prototype, "nv_trim", {
            writable: true,
            value: String.prototype.trim
        })
        Object.defineProperty(String.prototype, "nv_length", {get: function() {
                return this.length;
            },
            set: function(value) {
                this.length = value;
            }
        });
    }
    var nf_init_Boolean = function() {
        Object.defineProperty(Boolean.prototype, "nv_constructor", {
            writable: true,
            value: "Boolean"
        })
        Object.defineProperty(Boolean.prototype, "nv_toString", {
            writable: true,
            value: Boolean.prototype.toString
        })
        Object.defineProperty(Boolean.prototype, "nv_valueOf", {
            writable: true,
            value: Boolean.prototype.valueOf
        })
    }
    var nf_init_Number = function() {
        Object.defineProperty(Number, "nv_MAX_VALUE", {
            writable: false,
            value: Number.MAX_VALUE
        })
        Object.defineProperty(Number, "nv_MIN_VALUE", {
            writable: false,
            value: Number.MIN_VALUE
        })
        Object.defineProperty(Number, "nv_NEGATIVE_INFINITY", {
            writable: false,
            value: Number.NEGATIVE_INFINITY
        })
        Object.defineProperty(Number, "nv_POSITIVE_INFINITY", {
            writable: false,
            value: Number.POSITIVE_INFINITY
        })
        Object.defineProperty(Number.prototype, "nv_constructor", {
            writable: true,
            value: "Number"
        })
        Object.defineProperty(Number.prototype, "nv_toString", {
            writable: true,
            value: Number.prototype.toString
        })
        Object.defineProperty(Number.prototype, "nv_toLocaleString", {
            writable: true,
            value: Number.prototype.toLocaleString
        })
        Object.defineProperty(Number.prototype, "nv_valueOf", {
            writable: true,
            value: Number.prototype.valueOf
        })
        Object.defineProperty(Number.prototype, "nv_toFixed", {
            writable: true,
            value: Number.prototype.toFixed
        })
        Object.defineProperty(Number.prototype, "nv_toExponential", {
            writable: true,
            value: Number.prototype.toExponential
        })
        Object.defineProperty(Number.prototype, "nv_toPrecision", {
            writable: true,
            value: Number.prototype.toPrecision
        })
    }
    var nf_init_Math = function() {
        Object.defineProperty(Math, "nv_E", {
            writable: false,
            value: Math.E
        })
        Object.defineProperty(Math, "nv_LN10", {
            writable: false,
            value: Math.LN10
        })
        Object.defineProperty(Math, "nv_LN2", {
            writable: false,
            value: Math.LN2
        })
        Object.defineProperty(Math, "nv_LOG2E", {
            writable: false,
            value: Math.LOG2E
        })
        Object.defineProperty(Math, "nv_LOG10E", {
            writable: false,
            value: Math.LOG10E
        })
        Object.defineProperty(Math, "nv_PI", {
            writable: false,
            value: Math.PI
        })
        Object.defineProperty(Math, "nv_SQRT1_2", {
            writable: false,
            value: Math.SQRT1_2
        })
        Object.defineProperty(Math, "nv_SQRT2", {
            writable: false,
            value: Math.SQRT2
        })
        Object.defineProperty(Math, "nv_abs", {
            writable: false,
            value: Math.abs
        })
        Object.defineProperty(Math, "nv_acos", {
            writable: false,
            value: Math.acos
        })
        Object.defineProperty(Math, "nv_asin", {
            writable: false,
            value: Math.asin
        })
        Object.defineProperty(Math, "nv_atan", {
            writable: false,
            value: Math.atan
        })
        Object.defineProperty(Math, "nv_atan2", {
            writable: false,
            value: Math.atan2
        })
        Object.defineProperty(Math, "nv_ceil", {
            writable: false,
            value: Math.ceil
        })
        Object.defineProperty(Math, "nv_cos", {
            writable: false,
            value: Math.cos
        })
        Object.defineProperty(Math, "nv_exp", {
            writable: false,
            value: Math.exp
        })
        Object.defineProperty(Math, "nv_floor", {
            writable: false,
            value: Math.floor
        })
        Object.defineProperty(Math, "nv_log", {
            writable: false,
            value: Math.log
        })
        Object.defineProperty(Math, "nv_max", {
            writable: false,
            value: Math.max
        })
        Object.defineProperty(Math, "nv_min", {
            writable: false,
            value: Math.min
        })
        Object.defineProperty(Math, "nv_pow", {
            writable: false,
            value: Math.pow
        })
        Object.defineProperty(Math, "nv_random", {
            writable: false,
            value: Math.random
        })
        Object.defineProperty(Math, "nv_round", {
            writable: false,
            value: Math.round
        })
        Object.defineProperty(Math, "nv_sin", {
            writable: false,
            value: Math.sin
        })
        Object.defineProperty(Math, "nv_sqrt", {
            writable: false,
            value: Math.sqrt
        })
        Object.defineProperty(Math, "nv_tan", {
            writable: false,
            value: Math.tan
        })
    }
    var nf_init_Date = function() {
        Object.defineProperty(Date.prototype, "nv_constructor", {
            writable: true,
            value: "Date"
        })
        Object.defineProperty(Date, "nv_parse", {
            writable: true,
            value: Date.parse
        })
        Object.defineProperty(Date, "nv_UTC", {
            writable: true,
            value: Date.UTC
        })
        Object.defineProperty(Date, "nv_now", {
            writable: true,
            value: Date.now
        })
        Object.defineProperty(Date.prototype, "nv_toString", {
            writable: true,
            value: Date.prototype.toString
        })
        Object.defineProperty(Date.prototype, "nv_toDateString", {
            writable: true,
            value: Date.prototype.toDateString
        })
        Object.defineProperty(Date.prototype, "nv_toTimeString", {
            writable: true,
            value: Date.prototype.toTimeString
        })
        Object.defineProperty(Date.prototype, "nv_toLocaleString", {
            writable: true,
            value: Date.prototype.toLocaleString
        })
        Object.defineProperty(Date.prototype, "nv_toLocaleDateString", {
            writable: true,
            value: Date.prototype.toLocaleDateString
        })
        Object.defineProperty(Date.prototype, "nv_toLocaleTimeString", {
            writable: true,
            value: Date.prototype.toLocaleTimeString
        })
        Object.defineProperty(Date.prototype, "nv_valueOf", {
            writable: true,
            value: Date.prototype.valueOf
        })
        Object.defineProperty(Date.prototype, "nv_getTime", {
            writable: true,
            value: Date.prototype.getTime
        })
        Object.defineProperty(Date.prototype, "nv_getFullYear", {
            writable: true,
            value: Date.prototype.getFullYear
        })
        Object.defineProperty(Date.prototype, "nv_getUTCFullYear", {
            writable: true,
            value: Date.prototype.getUTCFullYear
        })
        Object.defineProperty(Date.prototype, "nv_getMonth", {
            writable: true,
            value: Date.prototype.getMonth
        })
        Object.defineProperty(Date.prototype, "nv_getUTCMonth", {
            writable: true,
            value: Date.prototype.getUTCMonth
        })
        Object.defineProperty(Date.prototype, "nv_getDate", {
            writable: true,
            value: Date.prototype.getDate
        })
        Object.defineProperty(Date.prototype, "nv_getUTCDate", {
            writable: true,
            value: Date.prototype.getUTCDate
        })
        Object.defineProperty(Date.prototype, "nv_getDay", {
            writable: true,
            value: Date.prototype.getDay
        })
        Object.defineProperty(Date.prototype, "nv_getUTCDay", {
            writable: true,
            value: Date.prototype.getUTCDay
        })
        Object.defineProperty(Date.prototype, "nv_getHours", {
            writable: true,
            value: Date.prototype.getHours
        })
        Object.defineProperty(Date.prototype, "nv_getUTCHours", {
            writable: true,
            value: Date.prototype.getUTCHours
        })
        Object.defineProperty(Date.prototype, "nv_getMinutes", {
            writable: true,
            value: Date.prototype.getMinutes
        })
        Object.defineProperty(Date.prototype, "nv_getUTCMinutes", {
            writable: true,
            value: Date.prototype.getUTCMinutes
        })
        Object.defineProperty(Date.prototype, "nv_getSeconds", {
            writable: true,
            value: Date.prototype.getSeconds
        })
        Object.defineProperty(Date.prototype, "nv_getUTCSeconds", {
            writable: true,
            value: Date.prototype.getUTCSeconds
        })
        Object.defineProperty(Date.prototype, "nv_getMilliseconds", {
            writable: true,
            value: Date.prototype.getMilliseconds
        })
        Object.defineProperty(Date.prototype, "nv_getUTCMilliseconds", {
            writable: true,
            value: Date.prototype.getUTCMilliseconds
        })
        Object.defineProperty(Date.prototype, "nv_getTimezoneOffset", {
            writable: true,
            value: Date.prototype.getTimezoneOffset
        })
        Object.defineProperty(Date.prototype, "nv_setTime", {
            writable: true,
            value: Date.prototype.setTime
        })
        Object.defineProperty(Date.prototype, "nv_setMilliseconds", {
            writable: true,
            value: Date.prototype.setMilliseconds
        })
        Object.defineProperty(Date.prototype, "nv_setUTCMilliseconds", {
            writable: true,
            value: Date.prototype.setUTCMilliseconds
        })
        Object.defineProperty(Date.prototype, "nv_setSeconds", {
            writable: true,
            value: Date.prototype.setSeconds
        })
        Object.defineProperty(Date.prototype, "nv_setUTCSeconds", {
            writable: true,
            value: Date.prototype.setUTCSeconds
        })
        Object.defineProperty(Date.prototype, "nv_setMinutes", {
            writable: true,
            value: Date.prototype.setMinutes
        })
        Object.defineProperty(Date.prototype, "nv_setUTCMinutes", {
            writable: true,
            value: Date.prototype.setUTCMinutes
        })
        Object.defineProperty(Date.prototype, "nv_setHours", {
            writable: true,
            value: Date.prototype.setHours
        })
        Object.defineProperty(Date.prototype, "nv_setUTCHours", {
            writable: true,
            value: Date.prototype.setUTCHours
        })
        Object.defineProperty(Date.prototype, "nv_setDate", {
            writable: true,
            value: Date.prototype.setDate
        })
        Object.defineProperty(Date.prototype, "nv_setUTCDate", {
            writable: true,
            value: Date.prototype.setUTCDate
        })
        Object.defineProperty(Date.prototype, "nv_setMonth", {
            writable: true,
            value: Date.prototype.setMonth
        })
        Object.defineProperty(Date.prototype, "nv_setUTCMonth", {
            writable: true,
            value: Date.prototype.setUTCMonth
        })
        Object.defineProperty(Date.prototype, "nv_setFullYear", {
            writable: true,
            value: Date.prototype.setFullYear
        })
        Object.defineProperty(Date.prototype, "nv_setUTCFullYear", {
            writable: true,
            value: Date.prototype.setUTCFullYear
        })
        Object.defineProperty(Date.prototype, "nv_toUTCString", {
            writable: true,
            value: Date.prototype.toUTCString
        })
        Object.defineProperty(Date.prototype, "nv_toISOString", {
            writable: true,
            value: Date.prototype.toISOString
        })
        Object.defineProperty(Date.prototype, "nv_toJSON", {
            writable: true,
            value: Date.prototype.toJSON
        })
    }
    var nf_init_RegExp = function() {
        Object.defineProperty(RegExp.prototype, "nv_constructor", {
            writable: true,
            value: "RegExp"
        })
        Object.defineProperty(RegExp.prototype, "nv_exec", {
            writable: true,
            value: RegExp.prototype.exec
        })
        Object.defineProperty(RegExp.prototype, "nv_test", {
            writable: true,
            value: RegExp.prototype.test
        })
        Object.defineProperty(RegExp.prototype, "nv_toString", {
            writable: true,
            value: RegExp.prototype.toString
        })
        Object.defineProperty(RegExp.prototype, "nv_source", {get: function() {
                return this.source;
            },
            set: function() {}
        });
        Object.defineProperty(RegExp.prototype, "nv_global", {get: function() {
                return this.global;
            },
            set: function() {}
        });
        Object.defineProperty(RegExp.prototype, "nv_ignoreCase", {get: function() {
                return this.ignoreCase;
            },
            set: function() {}
        });
        Object.defineProperty(RegExp.prototype, "nv_multiline", {get: function() {
                return this.multiline;
            },
            set: function() {}
        });
        Object.defineProperty(RegExp.prototype, "nv_lastIndex", {get: function() {
                return this.lastIndex;
            },
            set: function(v) {
                this.lastIndex = v;
            }
        });
    }
    nf_init();
    var nv_getDate = function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(Date);
        return new(Function.prototype.bind.apply(Date, args));
    }
    var nv_getRegExp = function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(RegExp);
        return new(Function.prototype.bind.apply(RegExp, args));
    }
    var nv_console = {}
    nv_console.nv_log = function() {
        var res = "WXSRT:";
        for (var i = 0; i < arguments.length; ++i) res += arguments[i] + " ";
        console.log(res);
    }
    var nv_parseInt = parseInt,
        nv_parseFloat = parseFloat,
        nv_isNaN = isNaN,
        nv_isFinite = isFinite,
        nv_decodeURI = decodeURI,
        nv_decodeURIComponent = decodeURIComponent,
        nv_encodeURI = encodeURI,
        nv_encodeURIComponent = encodeURIComponent;

    function $gdc(o, p, r) {
        o = wh.rv(o);
        if (o === null || o === undefined) return o;
        if (typeof o === "string" || typeof o === "boolean" || typeof o === "number") return o;
        if (o.constructor === Object) {
            var copy = {};
            for (var k in o)
                if (Object.prototype.hasOwnProperty.call(o, k))
                    if (undefined === p) copy[k.substring(3)] = $gdc(o[k], p, r);
                    else copy[p + k] = $gdc(o[k], p, r);
            return copy;
        }
        if (o.constructor === Array) {
            var copy = [];
            for (var i = 0; i < o.length; i++) copy.push($gdc(o[i], p, r));
            return copy;
        }
        if (o.constructor === Date) {
            var copy = new Date();
            copy.setTime(o.getTime());
            return copy;
        }
        if (o.constructor === RegExp) {
            var f = "";
            if (o.global) f += "g";
            if (o.ignoreCase) f += "i";
            if (o.multiline) f += "m";
            return (new RegExp(o.source, f));
        }
        if (r && typeof o === "function") {
            if (r == 1) return $gdc(o(), undefined, 2);
            if (r == 2) return o;
        }
        return null;
    }
    var nv_JSON = {}
    nv_JSON.nv_stringify = function(o) {
        JSON.stringify(o);
        return JSON.stringify($gdc(o));
    }
    nv_JSON.nv_parse = function(o) {
        if (o === undefined) return undefined;
        var t = JSON.parse(o);
        return $gdc(t, 'nv_');
    }

    function _af(p, a, r, c) {
        p.extraAttr = {
            "t_action": a,
            "t_rawid": r
        };
        if (typeof(c) != 'undefined') p.extraAttr.t_cid = c;
    }

    function _ai(i, p, e, me, r, c) {
        var x = _grp(p, e, me);
        if (x) i.push(x);
        else {
            i.push('');
            _wp(me + ':import:' + r + ':' + c + ': Path `' + p + '` not found from `' + me + '`.')
        }
    }

    function _grp(p, e, me) {
        if (p[0] != '/') {
            var mepart = me.split('/');
            mepart.pop();
            var ppart = p.split('/');
            for (var i = 0; i < ppart.length; i++) {
                if (ppart[i] == '..') mepart.pop();
                else if (!ppart[i] || ppart[i] == '.') continue;
                else mepart.push(ppart[i]);
            }
            p = mepart.join('/');
        }
        if (me[0] == '.' && p[0] == '/') p = '.' + p;
        if (e[p]) return p;
        if (e[p + '.wxml']) return p + '.wxml';
    }

    function _gd(p, c, e, d) {
        if (!c) return;
        if (d[p][c]) return d[p][c];
        for (var x = e[p].i.length - 1; x >= 0; x--) {
            if (e[p].i[x] && d[e[p].i[x]][c]) return d[e[p].i[x]][c]
        };
        for (var x = e[p].ti.length - 1; x >= 0; x--) {
            var q = _grp(e[p].ti[x], e, p);
            if (q && d[q][c]) return d[q][c]
        }
        var ii = _gapi(e, p);
        for (var x = 0; x < ii.length; x++) {
            if (ii[x] && d[ii[x]][c]) return d[ii[x]][c]
        }
        for (var k = e[p].j.length - 1; k >= 0; k--)
            if (e[p].j[k]) {
                for (var q = e[e[p].j[k]].ti.length - 1; q >= 0; q--) {
                    var pp = _grp(e[e[p].j[k]].ti[q], e, p);
                    if (pp && d[pp][c]) {
                        return d[pp][c]
                    }
                }
            }
    }

    function _gapi(e, p) {
        if (!p) return [];
        if ($gaic[p]) {
            return $gaic[p]
        };
        var ret = [],
            q = [],
            h = 0,
            t = 0,
            put = {},
            visited = {};
        q.push(p);
        visited[p] = true;
        t++;
        while (h < t) {
            var a = q[h++];
            for (var i = 0; i < e[a].ic.length; i++) {
                var nd = e[a].ic[i];
                var np = _grp(nd, e, a);
                if (np && !visited[np]) {
                    visited[np] = true;
                    q.push(np);
                    t++;
                }
            }
            for (var i = 0; a != p && i < e[a].ti.length; i++) {
                var ni = e[a].ti[i];
                var nm = _grp(ni, e, a);
                if (nm && !put[nm]) {
                    put[nm] = true;
                    ret.push(nm);
                }
            }
        }
        $gaic[p] = ret;
        return ret;
    }
    var $ixc = {};

    function _ic(p, ent, me, e, s, r, gg) {
        var x = _grp(p, ent, me);
        ent[me].j.push(x);
        if (x) {
            if ($ixc[x]) {
                _wp('-1:include:-1:-1: `' + p + '` is being included in a loop, will be stop.');
                return;
            }
            $ixc[x] = true;
            try {
                ent[x].f(e, s, r, gg)
            } catch (e) {}
            $ixc[x] = false;
        } else {
            _wp(me + ':include:-1:-1: Included path `' + p + '` not found from `' + me + '`.')
        }
    }

    function _w(tn, f, line, c) {
        _wp(f + ':template:' + line + ':' + c + ': Template `' + tn + '` not found.');
    }

    function _ev(dom) {
        var changed = false;
        delete dom.properities;
        delete dom.n;
        if (dom.children) {
            do {
                changed = false;
                var newch = [];
                for (var i = 0; i < dom.children.length; i++) {
                    var ch = dom.children[i];
                    if (ch.tag == 'virtual') {
                        changed = true;
                        for (var j = 0; ch.children && j < ch.children.length; j++) {
                            newch.push(ch.children[j]);
                        }
                    } else {
                        newch.push(ch);
                    }
                }
                dom.children = newch;
            } while (changed);
            for (var i = 0; i < dom.children.length; i++) {
                _ev(dom.children[i]);
            }
        }
        return dom;
    }

    function _tsd(root) {
        if (root.tag == "wx-wx-scope") {
            root.tag = "virtual";
            root.wxCkey = "11";
            root['wxScopeData'] = root.attr['wx:scope-data'];
            delete root.n;
            delete root.raw;
            delete root.generics;
            delete root.attr;
        }
        for (var i = 0; root.children && i < root.children.length; i++) {
            _tsd(root.children[i]);
        }
        return root;
    }

    var e_ = {}
    if (typeof(global.entrys) === 'undefined') global.entrys = {};
    e_ = global.entrys;
    var d_ = {}
    if (typeof(global.defines) === 'undefined') global.defines = {};
    d_ = global.defines;
    var f_ = {}
    if (typeof(global.modules) === 'undefined') global.modules = {};
    f_ = global.modules || {};
    var p_ = {}
    __WXML_GLOBAL__.ops_cached = __WXML_GLOBAL__.ops_cached || {}
    __WXML_GLOBAL__.ops_set = __WXML_GLOBAL__.ops_set || {};
    __WXML_GLOBAL__.ops_init = __WXML_GLOBAL__.ops_init || {};
    var z = __WXML_GLOBAL__.ops_set.$gwx12 || [];

    function gz$gwx12_1() {
        if (__WXML_GLOBAL__.ops_cached.$gwx12_1) return __WXML_GLOBAL__.ops_cached.$gwx12_1
        __WXML_GLOBAL__.ops_cached.$gwx12_1 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
            Z([3, 'noop'])
            Z([a, [3, 'goods-evaluate '],
                [
                    [2, '?:'],
                    [
                        [2, '=='],
                        [
                            [7],
                            [3, 'styleNo']
                        ],
                        [1, 2]
                    ],
                    [1, 'goods-evaluate-two'],
                    [1, '']
                ]
            ])
            Z([a, [3, 'border-radius:'],
                [
                    [2, '?:'],
                    [
                        [7],
                        [3, 'showRadius']
                    ],
                    [1, '20rpx'],
                    [1, '']
                ]
            ])
            Z([
                [7],
                [3, 'showTitle']
            ])
            Z([
                [2, '&&'],
                [
                    [7],
                    [3, 'evaluateLength']
                ],
                [
                    [2, '!='],
                    [
                        [7],
                        [3, 'evaluateLength']
                    ],
                    [1, 0]
                ]
            ])
            Z([3, 'goods-evaluate-middle'])
            Z([
                [7],
                [3, 'speciesStatus']
            ])
            Z([
                [2, '&&'],
                [
                    [7],
                    [3, 'praisePrizeContentVO']
                ],
                [
                    [6],
                    [
                        [7],
                        [3, 'praisePrizeContentVO']
                    ],
                    [3, 'giftIntegral']
                ]
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'evaluate']
                ],
                [3, 'star']
            ])
            Z([1, true])
            Z([
                [7],
                [3, 'onlyShowActiveStar']
            ])
            Z([1, '10rpx'])
            Z([1, '26rpx'])
            Z([
                [6],
                [
                    [7],
                    [3, 'evaluate']
                ],
                [3, 'evaluateContent']
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'evaluate']
                ],
                [3, 'postContent']
            ])
            Z([
                [2, '&&'],
                [
                    [2, '&&'],
                    [
                        [7],
                        [3, 'showEvaluateStarVo']
                    ],
                    [
                        [6],
                        [
                            [7],
                            [3, 'evaluate']
                        ],
                        [3, 'orderEvaluateStarVoList']
                    ]
                ],
                [
                    [6],
                    [
                        [6],
                        [
                            [7],
                            [3, 'evaluate']
                        ],
                        [3, 'orderEvaluateStarVoList']
                    ],
                    [3, 'length']
                ]
            ])
            Z([
                [2, '&&'],
                [
                    [6],
                    [
                        [7],
                        [3, 'evaluate']
                    ],
                    [3, 'evaluateImages']
                ],
                [
                    [6],
                    [
                        [6],
                        [
                            [7],
                            [3, 'evaluate']
                        ],
                        [3, 'evaluateImages']
                    ],
                    [3, 'length']
                ]
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'evaluate']
                ],
                [3, 'evaluateImages']
            ])
            Z([3, 'index'])
            Z([
                [2, '<'],
                [
                    [7],
                    [3, 'index']
                ],
                [
                    [7],
                    [3, 'showImageNum']
                ]
            ])
            Z([
                [2, '&&'],
                [
                    [7],
                    [3, 'showStoreReply']
                ],
                [
                    [6],
                    [
                        [7],
                        [3, 'evaluate']
                    ],
                    [3, 'replyContent']
                ]
            ])
            Z([
                [2, '&&'],
                [
                    [6],
                    [
                        [7],
                        [3, 'evaluate']
                    ],
                    [3, 'itemName']
                ],
                [
                    [7],
                    [3, 'showGoods']
                ]
            ])
            Z([3, 'goods-desc'])
            Z([
                [6],
                [
                    [7],
                    [3, 'evaluate']
                ],
                [3, 'itemName']
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'evaluate']
                ],
                [3, 'skuSpec']
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'evaluate']
                ],
                [3, 'itemPrice']
            ])
        })(__WXML_GLOBAL__.ops_cached.$gwx12_1);
        return __WXML_GLOBAL__.ops_cached.$gwx12_1
    }

    function gz$gwx12_2() {
        if (__WXML_GLOBAL__.ops_cached.$gwx12_2) return __WXML_GLOBAL__.ops_cached.$gwx12_2
        __WXML_GLOBAL__.ops_cached.$gwx12_2 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
            Z([
                [2, '&&'],
                [
                    [7],
                    [3, 'list']
                ],
                [
                    [6],
                    [
                        [7],
                        [3, 'list']
                    ],
                    [3, 'length']
                ]
            ])
            Z([3, 'cIndex'])
            Z([3, 'cItem'])
            Z([
                [7],
                [3, 'list']
            ])
            Z(z[1])
            Z([
                [9],
                [
                    [9],
                    [
                        [9],
                        [
                            [8], 'item', [
                                [7],
                                [3, 'cItem']
                            ]
                        ],
                        [
                            [8], 'index', [
                                [7],
                                [3, 'cIndex']
                            ]
                        ]
                    ],
                    [
                        [8], 'styleNo', [
                            [7],
                            [3, 'styleNo']
                        ]
                    ]
                ],
                [
                    [8], 'mpxExt', [
                        [7],
                        [3, 'mpxExt']
                    ]
                ]
            ])
            Z([3, 'goods-item'])
            Z(z[6])
            Z([a, [3, 'goods-item-block '],
                [
                    [2, '?:'],
                    [
                        [2, '=='],
                        [
                            [7],
                            [3, 'styleNo']
                        ],
                        [1, 2]
                    ],
                    [1, ''],
                    [1, 'goods-item-block-flex-column']
                ]
            ])
            Z([
                [12],
                [
                    [6],
                    [
                        [7],
                        [3, 'commonFilter']
                    ],
                    [3, 'goodsDesc']
                ],
                [
                    [5],
                    [
                        [6],
                        [
                            [7],
                            [3, 'item']
                        ],
                        [3, '__selected__']
                    ]
                ]
            ])
            Z([
                [2, '||'],
                [
                    [2, '&&'],
                    [
                        [6],
                        [
                            [7],
                            [3, 'item']
                        ],
                        [3, 'attachGoodsList']
                    ],
                    [
                        [6],
                        [
                            [6],
                            [
                                [7],
                                [3, 'item']
                            ],
                            [3, 'attachGoodsList']
                        ],
                        [3, 'length']
                    ]
                ],
                [
                    [2, '&&'],
                    [
                        [6],
                        [
                            [7],
                            [3, 'item']
                        ],
                        [3, 'sortedPracticeList']
                    ],
                    [
                        [6],
                        [
                            [6],
                            [
                                [7],
                                [3, 'item']
                            ],
                            [3, 'sortedPracticeList']
                        ],
                        [3, 'length']
                    ]
                ]
            ])
            Z([3, 'hideSKU'])
            Z([3, 'confirmSKU'])
            Z([1, true])
            Z([
                [7],
                [3, 'goodsSKU']
            ])
            Z([
                [7],
                [3, 'goodsIndex']
            ])
            Z(z[13])
            Z([
                [7],
                [3, 'showSKU']
            ])
        })(__WXML_GLOBAL__.ops_cached.$gwx12_2);
        return __WXML_GLOBAL__.ops_cached.$gwx12_2
    }

    function gz$gwx12_3() {
        if (__WXML_GLOBAL__.ops_cached.$gwx12_3) return __WXML_GLOBAL__.ops_cached.$gwx12_3
        __WXML_GLOBAL__.ops_cached.$gwx12_3 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
            Z([a, [3, 'goods-package-info '],
                [
                    [2, '?:'],
                    [
                        [2, '=='],
                        [
                            [7],
                            [3, 'styleNo']
                        ],
                        [1, 2]
                    ],
                    [1, 'goods-package-info-two'],
                    [1, '']
                ]
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'goods']
                ],
                [3, 'title']
            ])
            Z([
                [12],
                [
                    [6],
                    [
                        [7],
                        [3, 'filter']
                    ],
                    [3, 'goodsPackageMainGoodsDesc']
                ],
                [
                    [5],
                    [
                        [6],
                        [
                            [7],
                            [3, 'goods']
                        ],
                        [3, 'baseCombinedSkuList']
                    ]
                ]
            ])
            Z([
                [2, '=='],
                [
                    [7],
                    [3, 'styleNo']
                ],
                [1, 2]
            ])
        })(__WXML_GLOBAL__.ops_cached.$gwx12_3);
        return __WXML_GLOBAL__.ops_cached.$gwx12_3
    }

    function gz$gwx12_4() {
        if (__WXML_GLOBAL__.ops_cached.$gwx12_4) return __WXML_GLOBAL__.ops_cached.$gwx12_4
        __WXML_GLOBAL__.ops_cached.$gwx12_4 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
            Z([
                [7],
                [3, 'goodsList']
            ])
            Z([3, 'index'])
            Z([
                [2, '<'],
                [
                    [7],
                    [3, 'index']
                ],
                [
                    [7],
                    [3, 'showNum']
                ]
            ])
            Z([
                [2, '?:'],
                [
                    [2, '||'],
                    [
                        [2, '==='],
                        [
                            [6],
                            [
                                [7],
                                [3, 'item']
                            ],
                            [3, 'status']
                        ],
                        [1, 20]
                    ],
                    [
                        [2, '!'],
                        [
                            [6],
                            [
                                [7],
                                [3, 'item']
                            ],
                            [3, 'inventory']
                        ]
                    ]
                ],
                [1, ''],
                [1, 'selectGoods']
            ])
            Z([a, [3, 'goods-item '],
                [
                    [2, '?:'],
                    [
                        [6],
                        [
                            [7],
                            [3, 'item']
                        ],
                        [3, 'checked']
                    ],
                    [1, 'active'],
                    [1, '']
                ],
                [3, ' layout-3']
            ])
            Z([
                [7],
                [3, 'index']
            ])
            Z([
                [7],
                [3, 'item']
            ])
            Z([a, [3, 'border-color: '],
                [
                    [2, '?:'],
                    [
                        [6],
                        [
                            [7],
                            [3, 'item']
                        ],
                        [3, 'checked']
                    ],
                    [
                        [7],
                        [3, 'colorTheme']
                    ],
                    [1, '']
                ]
            ])
            Z([
                [12],
                [
                    [6],
                    [
                        [7],
                        [3, 'commonFilter']
                    ],
                    [3, 'goodsDesc']
                ],
                [
                    [5],
                    [
                        [6],
                        [
                            [7],
                            [3, 'item']
                        ],
                        [3, '__selected__']
                    ]
                ]
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'item']
                ],
                [3, 'freeUpPrice']
            ])
            Z([
                [2, '&&'],
                [
                    [2, '>'],
                    [
                        [7],
                        [3, 'buyGoodsNum']
                    ],
                    [1, 1]
                ],
                [
                    [2, '=='],
                    [
                        [7],
                        [3, 'maxBuyGoodsNum']
                    ],
                    [1, 1]
                ]
            ])
            Z([3, 'handleGoodsMinus'])
            Z([3, 'handleGoodsPlus'])
            Z(z[6])
            Z([
                [2, '!'],
                [
                    [2, '!'],
                    [
                        [6],
                        [
                            [7],
                            [3, 'item']
                        ],
                        [3, 'qty']
                    ]
                ]
            ])
            Z([
                [7],
                [3, 'styleNo']
            ])
            Z([3, 'goods-detail'])
            Z([
                [6],
                [
                    [7],
                    [3, 'item']
                ],
                [3, 'qty']
            ])
            Z([
                [2, '&&'],
                [
                    [6],
                    [
                        [7],
                        [3, 'item']
                    ],
                    [3, 'checked']
                ],
                [
                    [2, '||'],
                    [
                        [2, '&&'],
                        [
                            [6],
                            [
                                [7],
                                [3, 'item']
                            ],
                            [3, 'attachGoodsList']
                        ],
                        [
                            [6],
                            [
                                [6],
                                [
                                    [7],
                                    [3, 'item']
                                ],
                                [3, 'attachGoodsList']
                            ],
                            [3, 'length']
                        ]
                    ],
                    [
                        [2, '&&'],
                        [
                            [6],
                            [
                                [7],
                                [3, 'item']
                            ],
                            [3, 'sortedPracticeList']
                        ],
                        [
                            [6],
                            [
                                [6],
                                [
                                    [7],
                                    [3, 'item']
                                ],
                                [3, 'sortedPracticeList']
                            ],
                            [3, 'length']
                        ]
                    ]
                ]
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'item']
                ],
                [3, 'checked']
            ])
            Z([
                [2, '>'],
                [
                    [6],
                    [
                        [7],
                        [3, 'goodsList']
                    ],
                    [3, 'length']
                ],
                [1, 6]
            ])
            Z([3, 'hideSKU'])
            Z([3, 'confirmSKU'])
            Z([1, true])
            Z([
                [7],
                [3, 'goodsSKU']
            ])
            Z([
                [7],
                [3, 'goodsIndex']
            ])
            Z(z[23])
            Z([
                [7],
                [3, 'showSKU']
            ])
        })(__WXML_GLOBAL__.ops_cached.$gwx12_4);
        return __WXML_GLOBAL__.ops_cached.$gwx12_4
    }

    function gz$gwx12_5() {
        if (__WXML_GLOBAL__.ops_cached.$gwx12_5) return __WXML_GLOBAL__.ops_cached.$gwx12_5
        __WXML_GLOBAL__.ops_cached.$gwx12_5 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
            Z([
                [2, '&&'],
                [
                    [7],
                    [3, 'list']
                ],
                [
                    [6],
                    [
                        [7],
                        [3, 'list']
                    ],
                    [3, 'length']
                ]
            ])
            Z([
                [7],
                [3, 'list']
            ])
            Z([3, 'index'])
            Z([3, 'onConfirm'])
            Z([3, 'handleSelectedGoods'])
            Z([
                [6],
                [
                    [7],
                    [3, 'item']
                ],
                [3, 'minBuyNum']
            ])
            Z([
                [8], 'groupIndex', [
                    [7],
                    [3, 'index']
                ]
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'item']
                ],
                [3, 'oriGroupId']
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'item']
                ],
                [3, 'groupName']
            ])
            Z([1, false])
            Z([
                [6],
                [
                    [7],
                    [3, 'item']
                ],
                [3, 'freeCombinedSkuList']
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'item']
                ],
                [3, 'isCheckBox']
            ])
            Z([
                [7],
                [3, 'styleNo']
            ])
            Z([
                [2, '?:'],
                [
                    [2, '||'],
                    [
                        [2, '=='],
                        [
                            [6],
                            [
                                [6],
                                [
                                    [7],
                                    [3, 'item']
                                ],
                                [3, 'freeCombinedSkuList']
                            ],
                            [3, 'length']
                        ],
                        [1, 2]
                    ],
                    [
                        [2, '=='],
                        [
                            [6],
                            [
                                [6],
                                [
                                    [7],
                                    [3, 'item']
                                ],
                                [3, 'freeCombinedSkuList']
                            ],
                            [3, 'length']
                        ],
                        [1, 1]
                    ]
                ],
                [1, 'large'],
                [1, 'middle']
            ])
            Z([
                [7],
                [3, 'trigger']
            ])
        })(__WXML_GLOBAL__.ops_cached.$gwx12_5);
        return __WXML_GLOBAL__.ops_cached.$gwx12_5
    }

    function gz$gwx12_6() {
        if (__WXML_GLOBAL__.ops_cached.$gwx12_6) return __WXML_GLOBAL__.ops_cached.$gwx12_6
        __WXML_GLOBAL__.ops_cached.$gwx12_6 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
            Z([
                [2, '&&'],
                [
                    [2, '=='],
                    [
                        [6],
                        [
                            [7],
                            [3, 'goodsDetail']
                        ],
                        [3, 'type']
                    ],
                    [1, 3]
                ],
                [
                    [6],
                    [
                        [7],
                        [3, 'goodsDetail']
                    ],
                    [3, 'totalPrice']
                ]
            ])
            Z([3, 'goods-normal-price'])
            Z([
                [7],
                [3, 'goodsPackageMatchPrice']
            ])
            Z([
                [2, '&&'],
                [
                    [6],
                    [
                        [7],
                        [3, 'goodsDetail']
                    ],
                    [3, 'goodsLimit']
                ],
                [
                    [2, '||'],
                    [
                        [7],
                        [3, 'isShowMinBuy']
                    ],
                    [
                        [6],
                        [
                            [6],
                            [
                                [7],
                                [3, 'goodsDetail']
                            ],
                            [3, 'goodsLimit']
                        ],
                        [3, 'isMaxBuy']
                    ]
                ]
            ])
            Z([3, 'goods-limit-label'])
            Z([
                [7],
                [3, 'isShowMinBuy']
            ])
            Z([
                [2, '&&'],
                [
                    [7],
                    [3, 'isShowMinBuy']
                ],
                [
                    [6],
                    [
                        [6],
                        [
                            [7],
                            [3, 'goodsDetail']
                        ],
                        [3, 'goodsLimit']
                    ],
                    [3, 'isMaxBuy']
                ]
            ])
            Z([
                [6],
                [
                    [6],
                    [
                        [7],
                        [3, 'goodsDetail']
                    ],
                    [3, 'goodsLimit']
                ],
                [3, 'isMaxBuy']
            ])
        })(__WXML_GLOBAL__.ops_cached.$gwx12_6);
        return __WXML_GLOBAL__.ops_cached.$gwx12_6
    }

    function gz$gwx12_7() {
        if (__WXML_GLOBAL__.ops_cached.$gwx12_7) return __WXML_GLOBAL__.ops_cached.$gwx12_7
        __WXML_GLOBAL__.ops_cached.$gwx12_7 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
        })(__WXML_GLOBAL__.ops_cached.$gwx12_7);
        return __WXML_GLOBAL__.ops_cached.$gwx12_7
    }

    function gz$gwx12_8() {
        if (__WXML_GLOBAL__.ops_cached.$gwx12_8) return __WXML_GLOBAL__.ops_cached.$gwx12_8
        __WXML_GLOBAL__.ops_cached.$gwx12_8 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
            Z([3, 'closePopup'])
            Z([
                [7],
                [3, 'isShowPop']
            ])
            Z([3, 'shop-change-Box'])
            Z([
                [7],
                [3, 'preShopName']
            ])
            Z([3, 'shop-current-info'])
            Z([
                [6],
                [
                    [7],
                    [3, 'shop']
                ],
                [3, 'toUserDistance']
            ])
            Z([
                [6],
                [
                    [6],
                    [
                        [7],
                        [3, 'shop']
                    ],
                    [3, 'current']
                ],
                [3, 'address']
            ])
        })(__WXML_GLOBAL__.ops_cached.$gwx12_8);
        return __WXML_GLOBAL__.ops_cached.$gwx12_8
    }

    function gz$gwx12_9() {
        if (__WXML_GLOBAL__.ops_cached.$gwx12_9) return __WXML_GLOBAL__.ops_cached.$gwx12_9
        __WXML_GLOBAL__.ops_cached.$gwx12_9 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
        })(__WXML_GLOBAL__.ops_cached.$gwx12_9);
        return __WXML_GLOBAL__.ops_cached.$gwx12_9
    }

    function gz$gwx12_10() {
        if (__WXML_GLOBAL__.ops_cached.$gwx12_10) return __WXML_GLOBAL__.ops_cached.$gwx12_10
        __WXML_GLOBAL__.ops_cached.$gwx12_10 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
            Z([
                [6],
                [
                    [7],
                    [3, 'list']
                ],
                [3, 'length']
            ])
            Z([
                [2, '>'],
                [
                    [6],
                    [
                        [7],
                        [3, 'list']
                    ],
                    [3, 'length']
                ],
                [1, 1]
            ])
        })(__WXML_GLOBAL__.ops_cached.$gwx12_10);
        return __WXML_GLOBAL__.ops_cached.$gwx12_10
    }

    function gz$gwx12_11() {
        if (__WXML_GLOBAL__.ops_cached.$gwx12_11) return __WXML_GLOBAL__.ops_cached.$gwx12_11
        __WXML_GLOBAL__.ops_cached.$gwx12_11 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
            Z([3, 'transparent'])
            Z([3, 'black'])
            Z([
                [7],
                [3, 'isShowLoading']
            ])
            Z([a, [3, 'goods-detail '],
                [
                    [2, '?:'],
                    [
                        [2, '||'],
                        [
                            [2, '||'],
                            [
                                [6],
                                [
                                    [7],
                                    [3, 'goodsDetail']
                                ],
                                [3, 'isLimitTimePrice']
                            ],
                            [
                                [2, '=='],
                                [
                                    [6],
                                    [
                                        [7],
                                        [3, 'goodsDetail']
                                    ],
                                    [3, 'preferentialZoneFlag']
                                ],
                                [1, 1]
                            ]
                        ],
                        [
                            [6],
                            [
                                [7],
                                [3, 'goodsDetail']
                            ],
                            [3, 'preSale']
                        ]
                    ],
                    [1, 'resetMarginTop'],
                    [1, '']
                ],
                [3, ' '],
                [
                    [2, '?:'],
                    [
                        [2, '=='],
                        [
                            [7],
                            [3, 'styleNo']
                        ],
                        [1, 2]
                    ],
                    [1, 'goods-detail-two'],
                    [1, '']
                ]
            ])
            Z([
                [7],
                [3, 'errorMsg']
            ])
            Z(z[4])
            Z([1, false])
            Z([3, 'goods-detail-image'])
            Z([3, 'relative'])
            Z([
                [6],
                [
                    [7],
                    [3, 'goodsDetail']
                ],
                [3, 'pictureUrlList']
            ])
            Z([
                [2, '?:'],
                [
                    [2, '=='],
                    [
                        [7],
                        [3, 'styleNo']
                    ],
                    [1, 2]
                ],
                [1, 'circle'],
                [1, '']
            ])
            Z([
                [2, '||'],
                [
                    [6],
                    [
                        [7],
                        [3, 'energyAndHealthData']
                    ],
                    [3, 'energyText']
                ],
                [
                    [6],
                    [
                        [7],
                        [3, 'energyAndHealthData']
                    ],
                    [3, 'healthLevelImgs']
                ]
            ])
            Z([3, 'z-2 absolute right-24'])
            Z([
                [7],
                [3, 'energyBottom']
            ])
            Z([
                [2, '&&'],
                [
                    [2, '!'],
                    [
                        [6],
                        [
                            [7],
                            [3, 'energyAndHealthData']
                        ],
                        [3, 'energyText']
                    ]
                ],
                [
                    [6],
                    [
                        [7],
                        [3, 'energyAndHealthData']
                    ],
                    [3, 'healthLevelImgs']
                ]
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'energyAndHealthData']
                ],
                [3, 'healthLevelImgs']
            ])
            Z([
                [2, '&&'],
                [
                    [6],
                    [
                        [7],
                        [3, 'energyAndHealthData']
                    ],
                    [3, 'energyText']
                ],
                [
                    [2, '!'],
                    [
                        [6],
                        [
                            [7],
                            [3, 'energyAndHealthData']
                        ],
                        [3, 'gradingIdentificationText']
                    ]
                ]
            ])
            Z([3, 'text-center'])
            Z([a, [3, 'color:'],
                [
                    [7],
                    [3, 'colorTheme']
                ]
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'energyAndHealthData']
                ],
                [3, 'energyText']
            ])
            Z(z[19])
            Z([
                [2, '&&'],
                [
                    [6],
                    [
                        [7],
                        [3, 'energyAndHealthData']
                    ],
                    [3, 'energyText']
                ],
                [
                    [6],
                    [
                        [7],
                        [3, 'energyAndHealthData']
                    ],
                    [3, 'gradingIdentificationText']
                ]
            ])
            Z([3, 'flex flex-items-center'])
            Z(z[15])
            Z(z[19])
            Z([
                [2, '!='],
                [
                    [7],
                    [3, 'styleNo']
                ],
                [1, 2]
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'goodsDetail']
                ],
                [3, 'preSale']
            ])
            Z([
                [9],
                [
                    [9],
                    [
                        [9],
                        [
                            [9],
                            [
                                [8], 'goodsDetail', [
                                    [7],
                                    [3, 'goodsDetail']
                                ]
                            ],
                            [
                                [8], 'countDownEnd', [
                                    [7],
                                    [3, 'countDownEnd']
                                ]
                            ]
                        ],
                        [
                            [8], 'propsValue', [
                                [7],
                                [3, 'propsValue']
                            ]
                        ]
                    ],
                    [
                        [8], 'time', [
                            [7],
                            [3, 'time']
                        ]
                    ]
                ],
                [
                    [8], 'mpxExt', [
                        [7],
                        [3, 'mpxExt']
                    ]
                ]
            ])
            Z([3, 'preInfo'])
            Z([
                [6],
                [
                    [7],
                    [3, 'goodsDetail']
                ],
                [3, 'isLimitTimePrice']
            ])
            Z([
                [9],
                [
                    [9],
                    [
                        [9],
                        [
                            [9],
                            [
                                [9],
                                [
                                    [8], 'goodsDetail', [
                                        [7],
                                        [3, 'goodsDetail']
                                    ]
                                ],
                                [
                                    [8], 'countDownEnd', [
                                        [7],
                                        [3, 'countDownEnd']
                                    ]
                                ]
                            ],
                            [
                                [8], 'propsValue', [
                                    [7],
                                    [3, 'propsValue']
                                ]
                            ]
                        ],
                        [
                            [8], 'time', [
                                [7],
                                [3, 'time']
                            ]
                        ]
                    ],
                    [
                        [8], 'styleNo', [
                            [7],
                            [3, 'styleNo']
                        ]
                    ]
                ],
                [
                    [8], 'mpxExt', [
                        [7],
                        [3, 'mpxExt']
                    ]
                ]
            ])
            Z([3, 'limitedInfo'])
            Z([
                [2, '=='],
                [
                    [6],
                    [
                        [7],
                        [3, 'goodsDetail']
                    ],
                    [3, 'preferentialZoneFlag']
                ],
                [1, 1]
            ])
            Z([
                [9],
                [
                    [9],
                    [
                        [9],
                        [
                            [9],
                            [
                                [9],
                                [
                                    [8], 'goodsDetail', [
                                        [7],
                                        [3, 'goodsDetail']
                                    ]
                                ],
                                [
                                    [8], 'countDownEnd', [
                                        [7],
                                        [3, 'countDownEnd']
                                    ]
                                ]
                            ],
                            [
                                [8], 'enterpriseZone', [
                                    [7],
                                    [3, 'enterpriseZone']
                                ]
                            ]
                        ],
                        [
                            [8], 'time', [
                                [7],
                                [3, 'time']
                            ]
                        ]
                    ],
                    [
                        [8], 'styleNo', [
                            [7],
                            [3, 'styleNo']
                        ]
                    ]
                ],
                [
                    [8], 'mpxExt', [
                        [7],
                        [3, 'mpxExt']
                    ]
                ]
            ])
            Z([3, 'preferentialZone'])
            Z([
                [2, '&&'],
                [
                    [7],
                    [3, 'historyOrderList']
                ],
                [
                    [6],
                    [
                        [7],
                        [3, 'historyOrderList']
                    ],
                    [3, 'length']
                ]
            ])
            Z([
                [2, '&&'],
                [
                    [2, '=='],
                    [
                        [7],
                        [3, 'styleNo']
                    ],
                    [1, 2]
                ],
                [
                    [2, '!='],
                    [
                        [6],
                        [
                            [7],
                            [3, 'goodsDetail']
                        ],
                        [3, 'type']
                    ],
                    [1, 3]
                ]
            ])
            Z([3, 'goodsTopBox'])
            Z([
                [6],
                [
                    [7],
                    [3, 'goodsDetail']
                ],
                [3, 'title']
            ])
            Z([
                [9],
                [
                    [9],
                    [
                        [9],
                        [
                            [9],
                            [
                                [9],
                                [
                                    [8], 'goodsDetail', [
                                        [7],
                                        [3, 'goodsDetail']
                                    ]
                                ],
                                [
                                    [8], 'energyStyleData', [
                                        [7],
                                        [3, 'energyStyleData']
                                    ]
                                ]
                            ],
                            [
                                [8], 'colorTheme', [
                                    [7],
                                    [3, 'colorTheme']
                                ]
                            ]
                        ],
                        [
                            [8], 'bgColor', [
                                [12],
                                [
                                    [6],
                                    [
                                        [7],
                                        [3, 'commonFilter']
                                    ],
                                    [3, 'hexToRgba']
                                ],
                                [
                                    [5],
                                    [
                                        [5],
                                        [
                                            [7],
                                            [3, 'colorTheme']
                                        ]
                                    ],
                                    [1, 0.1]
                                ]
                            ]
                        ]
                    ],
                    [
                        [8], 'styleNo', [
                            [7],
                            [3, 'styleNo']
                        ]
                    ]
                ],
                [
                    [8], 'mpxExt', [
                        [7],
                        [3, 'mpxExt']
                    ]
                ]
            ])
            Z([3, 'energyInfo'])
            Z(z[26])
            Z(z[30])
            Z(z[28])
            Z(z[29])
            Z(z[30])
            Z(z[31])
            Z(z[32])
            Z(z[33])
            Z(z[34])
            Z([
                [6],
                [
                    [7],
                    [3, 'goodsDetail']
                ],
                [3, 'memberPrice']
            ])
            Z([
                [2, '!'],
                [
                    [6],
                    [
                        [7],
                        [3, 'goodsDetail']
                    ],
                    [3, 'isShow']
                ]
            ])
            Z([3, 'goodsInfoBox'])
            Z([3, 'goodsPriceBox'])
            Z([
                [2, '&&'],
                [
                    [6],
                    [
                        [7],
                        [3, 'goodsDetail']
                    ],
                    [3, 'promoterGoods']
                ],
                [
                    [6],
                    [
                        [6],
                        [
                            [7],
                            [3, 'goodsDetail']
                        ],
                        [3, 'promoterGoods']
                    ],
                    [3, 'defFirstRatio']
                ]
            ])
            Z([
                [2, '&&'],
                [
                    [6],
                    [
                        [7],
                        [3, 'goodsDetail']
                    ],
                    [3, 'paidBenefitsMark']
                ],
                [
                    [7],
                    [3, 'showPayMemberRights']
                ]
            ])
            Z([3, 'common__member-discount-label'])
            Z([a, [3, 'background:'],
                [
                    [6],
                    [
                        [7],
                        [3, 'designConfig']
                    ],
                    [3, 'payingMemberBackColor']
                ]
            ])
            Z([
                [6],
                [
                    [6],
                    [
                        [7],
                        [3, 'goodsDetail']
                    ],
                    [3, 'paidBenefitsMark']
                ],
                [3, 'title']
            ])
            Z([
                [6],
                [
                    [6],
                    [
                        [7],
                        [3, 'goodsDetail']
                    ],
                    [3, 'paidBenefitsMark']
                ],
                [3, 'mark']
            ])
            Z([
                [7],
                [3, 'isShowInventory']
            ])
            Z([
                [7],
                [3, 'isShowEquityCard']
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'goodsDetail']
                ],
                [3, 'isShow']
            ])
            Z(z[25])
            Z(z[38])
            Z([
                [2, '||'],
                [
                    [6],
                    [
                        [7],
                        [3, 'goodsDetail']
                    ],
                    [3, 'detail']
                ],
                [
                    [2, '&&'],
                    [
                        [7],
                        [3, 'goodsDeatailDesignConfig']
                    ],
                    [
                        [6],
                        [
                            [7],
                            [3, 'goodsDeatailDesignConfig']
                        ],
                        [3, 'goodsDetailImg']
                    ]
                ]
            ])
            Z([3, 'goods-detail__content nodeContent'])
            Z([
                [6],
                [
                    [7],
                    [3, 'goodsDetail']
                ],
                [3, 'detail']
            ])
            Z(z[67])
            Z([
                [2, '&&'],
                [
                    [7],
                    [3, 'goodsDeatailDesignConfig']
                ],
                [
                    [6],
                    [
                        [7],
                        [3, 'goodsDeatailDesignConfig']
                    ],
                    [3, 'goodsDetailImg']
                ]
            ])
            Z([
                [2, '=='],
                [
                    [6],
                    [
                        [7],
                        [3, 'goodsDetail']
                    ],
                    [3, 'type']
                ],
                [1, 3]
            ])
            Z([
                [2, '?:'],
                [
                    [2, '=='],
                    [
                        [7],
                        [3, 'styleNo']
                    ],
                    [1, 2]
                ],
                [1, 'goods-detail-menu-content-two'],
                [1, 'goods-detail-menu-content']
            ])
            Z([
                [7],
                [3, 'goodsDetail']
            ])
            Z([
                [7],
                [3, 'styleNo']
            ])
            Z([
                [2, '&&'],
                [
                    [2, '!'],
                    [
                        [2, '&&'],
                        [
                            [7],
                            [3, 'isScheduledTailingsCakereservation']
                        ],
                        [
                            [7],
                            [3, 'isFreshlyBaked']
                        ]
                    ]
                ],
                [
                    [2, '!='],
                    [
                        [6],
                        [
                            [7],
                            [3, 'goodsDetail']
                        ],
                        [3, 'preferentialZoneFlag']
                    ],
                    [1, 1]
                ]
            ])
            Z([
                [9],
                [
                    [9],
                    [
                        [9],
                        [
                            [9],
                            [
                                [9],
                                [
                                    [9],
                                    [
                                        [9],
                                        [
                                            [9],
                                            [
                                                [8], 'activityInfo', [
                                                    [7],
                                                    [3, 'activityInfo']
                                                ]
                                            ],
                                            [
                                                [8], 'preInfo', [
                                                    [6],
                                                    [
                                                        [7],
                                                        [3, 'goodsDetail']
                                                    ],
                                                    [3, 'preSale']
                                                ]
                                            ]
                                        ],
                                        [
                                            [8], 'colorTheme', [
                                                [7],
                                                [3, 'colorTheme']
                                            ]
                                        ]
                                    ],
                                    [
                                        [8], 'shop', [
                                            [7],
                                            [3, 'shop']
                                        ]
                                    ]
                                ],
                                [
                                    [8], 'saleType', [
                                        [7],
                                        [3, 'saleType']
                                    ]
                                ]
                            ],
                            [
                                [8], 'address', [
                                    [7],
                                    [3, 'address']
                                ]
                            ]
                        ],
                        [
                            [8], 'isFromMall', [
                                [7],
                                [3, 'isFromMall']
                            ]
                        ]
                    ],
                    [
                        [8], 'styleNo', [
                            [7],
                            [3, 'styleNo']
                        ]
                    ]
                ],
                [
                    [8], 'mpxExt', [
                        [7],
                        [3, 'mpxExt']
                    ]
                ]
            ])
            Z([3, 'activityInfo'])
            Z([
                [2, '&&'],
                [
                    [7],
                    [3, 'goodsDeatailDesignConfig']
                ],
                [
                    [6],
                    [
                        [7],
                        [3, 'goodsDeatailDesignConfig']
                    ],
                    [3, 'showShop']
                ]
            ])
            Z([
                [9],
                [
                    [9],
                    [
                        [9],
                        [
                            [8], 'shop', [
                                [7],
                                [3, 'shop']
                            ]
                        ],
                        [
                            [8], 'isFromMall', [
                                [7],
                                [3, 'isFromMall']
                            ]
                        ]
                    ],
                    [
                        [8], 'isLimitTimePriceGoods', [
                            [7],
                            [3, 'isLimitTimePriceGoods']
                        ]
                    ]
                ],
                [
                    [8], 'mpxExt', [
                        [7],
                        [3, 'mpxExt']
                    ]
                ]
            ])
            Z([3, 'shopInfo'])
            Z([3, 'onBaseCombinedConfirm'])
            Z([
                [7],
                [3, 'baseCombinedSkuList']
            ])
            Z(z[73])
            Z([3, 'onFreeCombinedConfirm'])
            Z([3, 'onFreeCombinedSelected'])
            Z([
                [7],
                [3, 'freeCombinedGroupList']
            ])
            Z(z[73])
            Z([
                [2, '&&'],
                [
                    [7],
                    [3, 'commentList']
                ],
                [
                    [6],
                    [
                        [7],
                        [3, 'commentList']
                    ],
                    [3, 'length']
                ]
            ])
            Z([3, 'toGoodsEvaluate'])
            Z([
                [6],
                [
                    [7],
                    [3, 'commentList']
                ],
                [1, 0]
            ])
            Z([
                [7],
                [3, 'commentListTotal']
            ])
            Z(z[6])
            Z([3, '3'])
            Z(z[6])
            Z([1, true])
            Z(z[73])
            Z(z[25])
            Z([3, 'goods-detail__basic-info'])
            Z([
                [2, '&&'],
                [
                    [2, '&&'],
                    [
                        [2, '!'],
                        [
                            [6],
                            [
                                [7],
                                [3, 'goodsDetail']
                            ],
                            [3, 'isLimitTimePrice']
                        ]
                    ],
                    [
                        [2, '!='],
                        [
                            [6],
                            [
                                [7],
                                [3, 'goodsDetail']
                            ],
                            [3, 'preferentialZoneFlag']
                        ],
                        [1, 1]
                    ]
                ],
                [
                    [2, '!'],
                    [
                        [6],
                        [
                            [7],
                            [3, 'goodsDetail']
                        ],
                        [3, 'preSale']
                    ]
                ]
            ])
            Z([3, 'goods-detail__price'])
            Z([
                [6],
                [
                    [7],
                    [3, 'goodsDetail']
                ],
                [3, 'showPriceLow']
            ])
            Z(z[54])
            Z(z[55])
            Z(z[56])
            Z([a, z[57][1], z[57][2]])
            Z(z[58])
            Z(z[59])
            Z(z[38])
            Z(z[60])
            Z(z[39])
            Z(z[40])
            Z([
                [9],
                [
                    [9],
                    [
                        [9],
                        [
                            [9],
                            [
                                [9],
                                [
                                    [8], 'goodsDetail', [
                                        [7],
                                        [3, 'goodsDetail']
                                    ]
                                ],
                                [
                                    [8], 'colorTheme', [
                                        [7],
                                        [3, 'colorTheme']
                                    ]
                                ]
                            ],
                            [
                                [8], 'bgColor', [
                                    [12],
                                    [
                                        [6],
                                        [
                                            [7],
                                            [3, 'commonFilter']
                                        ],
                                        [3, 'hexToRgba']
                                    ],
                                    [
                                        [5],
                                        [
                                            [5],
                                            [
                                                [7],
                                                [3, 'colorTheme']
                                            ]
                                        ],
                                        [1, '0.1']
                                    ]
                                ]
                            ]
                        ],
                        [
                            [8], 'styleNo', [
                                [7],
                                [3, 'styleNo']
                            ]
                        ]
                    ],
                    [
                        [8], 'freshRoastedData', [
                            [7],
                            [3, 'freshRoastedData']
                        ]
                    ]
                ],
                [
                    [8], 'mpxExt', [
                        [7],
                        [3, 'mpxExt']
                    ]
                ]
            ])
            Z([3, 'freshRoastedNewReleasedTime'])
            Z(z[74])
            Z(z[75])
            Z(z[76])
            Z([
                [2, '!='],
                [
                    [7],
                    [3, 'reservationIndex']
                ],
                [
                    [2, '-'],
                    [1, 1]
                ]
            ])
            Z(z[77])
            Z(z[78])
            Z(z[79])
            Z([
                [2, '&&'],
                [
                    [2, '&&'],
                    [
                        [2, '=='],
                        [
                            [7],
                            [3, 'evaluateLocation']
                        ],
                        [1, 0]
                    ],
                    [
                        [7],
                        [3, 'commentList']
                    ]
                ],
                [
                    [6],
                    [
                        [7],
                        [3, 'commentList']
                    ],
                    [3, 'length']
                ]
            ])
            Z(z[87])
            Z(z[88])
            Z(z[89])
            Z(z[90])
            Z(z[94])
            Z(z[6])
            Z(z[92])
            Z(z[6])
            Z(z[94])
            Z(z[73])
            Z(z[65])
            Z(z[66])
            Z(z[67])
            Z(z[67])
            Z(z[69])
            Z([
                [2, '=='],
                [
                    [7],
                    [3, 'evaluateLocation']
                ],
                [1, 1]
            ])
            Z(z[87])
            Z(z[88])
            Z(z[89])
            Z(z[90])
            Z(z[94])
            Z(z[6])
            Z(z[92])
            Z(z[6])
            Z(z[94])
            Z(z[73])
            Z([
                [2, '||'],
                [
                    [7],
                    [3, 'isShopOpend']
                ],
                [
                    [7],
                    [3, 'isFromMall']
                ]
            ])
            Z([
                [7],
                [3, 'count']
            ])
            Z([3, 'onShowCart'])
            Z([
                [7],
                [3, 'shopCartImg']
            ])
            Z([
                [2, '||'],
                [
                    [7],
                    [3, 'isReplaceSell']
                ],
                [
                    [7],
                    [3, 'isFreshlyBaked']
                ]
            ])
            Z([
                [7],
                [3, 'selectedCount']
            ])
            Z([
                [2, '?:'],
                [
                    [2, '=='],
                    [
                        [6],
                        [
                            [7],
                            [3, 'goodsDetail']
                        ],
                        [3, 'type']
                    ],
                    [1, 3]
                ],
                [1, 'meal'],
                [1, '']
            ])
            Z([
                [2, '&&'],
                [
                    [2, '=='],
                    [
                        [6],
                        [
                            [7],
                            [3, 'goodsDetail']
                        ],
                        [3, 'type']
                    ],
                    [1, 3]
                ],
                [
                    [2, '!'],
                    [
                        [7],
                        [3, 'allFreeCombinedGroupSelected']
                    ]
                ]
            ])
            Z([
                [2, '&&'],
                [
                    [7],
                    [3, 'isLoad']
                ],
                [
                    [2, '!'],
                    [
                        [6],
                        [
                            [7],
                            [3, 'goodsDetail']
                        ],
                        [3, 'isShow']
                    ]
                ]
            ])
            Z([3, 'handleShowSKU'])
            Z([3, 'handleReservation'])
            Z([
                [7],
                [3, 'buttonTxt']
            ])
            Z([
                [7],
                [3, 'isAddCartShow']
            ])
            Z([
                [7],
                [3, 'reservationIndex']
            ])
            Z([
                [7],
                [3, 'shareMaterialPic']
            ])
            Z([
                [7],
                [3, 'shareParams']
            ])
            Z([
                [7],
                [3, 'shareRemark']
            ])
            Z([
                [2, '!'],
                [
                    [2, '&&'],
                    [
                        [2, '=='],
                        [
                            [6],
                            [
                                [7],
                                [3, 'goodsDetail']
                            ],
                            [3, 'type']
                        ],
                        [1, 3]
                    ],
                    [
                        [6],
                        [
                            [7],
                            [3, 'goodsDetail']
                        ],
                        [3, 'totalPrice']
                    ]
                ]
            ])
            Z([
                [2, '&&'],
                [
                    [2, '=='],
                    [
                        [6],
                        [
                            [7],
                            [3, 'goodsDetail']
                        ],
                        [3, 'type']
                    ],
                    [1, 3]
                ],
                [
                    [6],
                    [
                        [7],
                        [3, 'goodsDetail']
                    ],
                    [3, 'totalPrice']
                ]
            ])
            Z([3, 'before'])
            Z(z[72])
            Z([
                [7],
                [3, 'goodsPackageMatchPrice']
            ])
            Z([
                [2, '=='],
                [
                    [6],
                    [
                        [6],
                        [
                            [7],
                            [3, 'goodsDetail']
                        ],
                        [3, 'promoterGoods']
                    ],
                    [3, 'promoteType']
                ],
                [1, 2]
            ])
            Z([3, 'hideSKU'])
            Z([3, 'confirmSKU'])
            Z([
                [7],
                [3, 'buyScene']
            ])
            Z(z[94])
            Z([
                [7],
                [3, 'goodsSKU']
            ])
            Z([
                [7],
                [3, 'isCheckGoodsLimit']
            ])
            Z([
                [2, '!'],
                [
                    [7],
                    [3, 'cakeGoodsLimit']
                ]
            ])
            Z([
                [7],
                [3, 'showSKU']
            ])
            Z([
                [7],
                [3, 'triggerSkuConfirm']
            ])
            Z(z[147])
            Z(z[150])
            Z(z[151])
            Z([3, 'goods-detail'])
            Z([
                [7],
                [3, 'showCart']
            ])
            Z([
                [2, '&&'],
                [
                    [7],
                    [3, 'isShopClosed']
                ],
                [
                    [2, '!'],
                    [
                        [7],
                        [3, 'isFromMall']
                    ]
                ]
            ])
            Z([
                [2, '&&'],
                [
                    [2, '&&'],
                    [
                        [7],
                        [3, 'isLoad']
                    ],
                    [
                        [2, '!'],
                        [
                            [6],
                            [
                                [7],
                                [3, 'goodsDetail']
                            ],
                            [3, 'allowSale']
                        ]
                    ]
                ],
                [
                    [7],
                    [3, 'goodsDetail']
                ]
            ])
            Z([3, 'onShowGoodsSaleTime'])
            Z([
                [2, '||'],
                [
                    [6],
                    [
                        [7],
                        [3, 'goodsDetail']
                    ],
                    [3, 'errorMessage']
                ],
                [1, '']
            ])
            Z([3, 'onHidePopupActivity'])
            Z([3, 'onUpdatePopupActivity'])
            Z([
                [7],
                [3, 'activityInfo']
            ])
            Z([
                [7],
                [3, 'showPopupActivity']
            ])
            Z([3, 'changeReservationPop'])
            Z([
                [7],
                [3, 'reservationPop']
            ])
            Z([3, 'navToShopList'])
            Z([
                [7],
                [3, 'preShopName']
            ])
            Z([
                [7],
                [3, 'shopChangeTrigger']
            ])
            Z([
                [7],
                [3, 'showSaleTimeGoods']
            ])
            Z([3, 'triggerHealthDescDialog'])
            Z([3, 'bottom'])
            Z([
                [7],
                [3, 'healthDescDialog']
            ])
        })(__WXML_GLOBAL__.ops_cached.$gwx12_11);
        return __WXML_GLOBAL__.ops_cached.$gwx12_11
    }

    function gz$gwx12_12() {
        if (__WXML_GLOBAL__.ops_cached.$gwx12_12) return __WXML_GLOBAL__.ops_cached.$gwx12_12
        __WXML_GLOBAL__.ops_cached.$gwx12_12 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
            Z([3, 'activityInfo'])
            Z([
                [2, '||'],
                [
                    [2, '||'],
                    [
                        [2, '||'],
                        [
                            [2, '&&'],
                            [
                                [7],
                                [3, 'activityInfo']
                            ],
                            [
                                [2, '||'],
                                [
                                    [2, '||'],
                                    [
                                        [2, '||'],
                                        [
                                            [2, '||'],
                                            [
                                                [2, '||'],
                                                [
                                                    [2, '||'],
                                                    [
                                                        [6],
                                                        [
                                                            [7],
                                                            [3, 'activityInfo']
                                                        ],
                                                        [3, 'couponSummaryVoList']
                                                    ],
                                                    [
                                                        [6],
                                                        [
                                                            [7],
                                                            [3, 'activityInfo']
                                                        ],
                                                        [3, 'fullReduceVoList']
                                                    ]
                                                ],
                                                [
                                                    [6],
                                                    [
                                                        [7],
                                                        [3, 'activityInfo']
                                                    ],
                                                    [3, 'fullGiftVo']
                                                ]
                                            ],
                                            [
                                                [2, '&&'],
                                                [
                                                    [6],
                                                    [
                                                        [7],
                                                        [3, 'activityInfo']
                                                    ],
                                                    [3, 'consumeBenefit']
                                                ],
                                                [
                                                    [2, '==='],
                                                    [
                                                        [6],
                                                        [
                                                            [6],
                                                            [
                                                                [6],
                                                                [
                                                                    [7],
                                                                    [3, 'activityInfo']
                                                                ],
                                                                [3, 'consumeBenefit']
                                                            ],
                                                            [3, 'detailInfo']
                                                        ],
                                                        [3, 'conditionType']
                                                    ],
                                                    [1, 1]
                                                ]
                                            ]
                                        ],
                                        [
                                            [6],
                                            [
                                                [7],
                                                [3, 'activityInfo']
                                            ],
                                            [3, 'mfoldnVo']
                                        ]
                                    ],
                                    [
                                        [6],
                                        [
                                            [7],
                                            [3, 'activityInfo']
                                        ],
                                        [3, 'freightVo']
                                    ]
                                ],
                                [
                                    [6],
                                    [
                                        [7],
                                        [3, 'activityInfo']
                                    ],
                                    [3, 'limitTimeDiscountItemList']
                                ]
                            ]
                        ],
                        [
                            [6],
                            [
                                [7],
                                [3, 'activityInfo']
                            ],
                            [3, 'mnPieceVo']
                        ]
                    ],
                    [
                        [6],
                        [
                            [7],
                            [3, 'activityInfo']
                        ],
                        [3, 'newCustomerEnjoyMarks']
                    ]
                ],
                [
                    [6],
                    [
                        [7],
                        [3, 'activityInfo']
                    ],
                    [3, 'goodsCashbackMarks']
                ]
            ])
            Z([3, 'handleShowPopupActivity'])
            Z([3, 'goods-detail__discount-activity'])
            Z([3, 'content'])
            Z([
                [6],
                [
                    [7],
                    [3, 'activityInfo']
                ],
                [3, 'couponSummaryVoList']
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'activityInfo']
                ],
                [3, 'fullGiftVo']
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'activityInfo']
                ],
                [3, 'fullReduceVoList']
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'activityInfo']
                ],
                [3, 'newCustomerEnjoyMarks']
            ])
            Z([
                [2, '&&'],
                [
                    [6],
                    [
                        [7],
                        [3, 'activityInfo']
                    ],
                    [3, 'consumeBenefit']
                ],
                [
                    [2, '==='],
                    [
                        [6],
                        [
                            [6],
                            [
                                [6],
                                [
                                    [7],
                                    [3, 'activityInfo']
                                ],
                                [3, 'consumeBenefit']
                            ],
                            [3, 'detailInfo']
                        ],
                        [3, 'conditionType']
                    ],
                    [1, 1]
                ]
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'activityInfo']
                ],
                [3, 'mfoldnVo']
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'activityInfo']
                ],
                [3, 'mnPieceVo']
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'activityInfo']
                ],
                [3, 'freightVo']
            ])
            Z(z[12])
            Z([3, 'index'])
            Z([
                [2, '||'],
                [
                    [6],
                    [
                        [7],
                        [3, 'item']
                    ],
                    [3, 'activityTitle']
                ],
                [
                    [6],
                    [
                        [7],
                        [3, 'item']
                    ],
                    [3, 'desc']
                ]
            ])
            Z([
                [2, '>'],
                [
                    [6],
                    [
                        [6],
                        [
                            [7],
                            [3, 'activityInfo']
                        ],
                        [3, 'limitTimeDiscountItemList']
                    ],
                    [3, 'length']
                ],
                [1, 0]
            ])
            Z([
                [2, '>'],
                [
                    [6],
                    [
                        [6],
                        [
                            [7],
                            [3, 'activityInfo']
                        ],
                        [3, 'goodsCashbackMarks']
                    ],
                    [3, 'length']
                ],
                [1, 0]
            ])
            Z([
                [7],
                [3, 'preInfo']
            ])
            Z([
                [9],
                [
                    [9],
                    [
                        [9],
                        [
                            [9],
                            [
                                [9],
                                [
                                    [8], 'isFromMall', [
                                        [7],
                                        [3, 'isFromMall']
                                    ]
                                ],
                                [
                                    [8], 'saleType', [
                                        [7],
                                        [3, 'saleType']
                                    ]
                                ]
                            ],
                            [
                                [8], 'address', [
                                    [7],
                                    [3, 'address']
                                ]
                            ]
                        ],
                        [
                            [8], 'shop', [
                                [7],
                                [3, 'shop']
                            ]
                        ]
                    ],
                    [
                        [8], 'styleNo', [
                            [7],
                            [3, 'styleNo']
                        ]
                    ]
                ],
                [
                    [8], 'mpxExt', [
                        [7],
                        [3, 'mpxExt']
                    ]
                ]
            ])
            Z([3, 'preShopInfo'])
            Z([
                [6],
                [
                    [7],
                    [3, 'preInfo']
                ],
                [3, 'baseInfo']
            ])
            Z([
                [2, '!'],
                [
                    [7],
                    [3, 'isFromMall']
                ]
            ])
            Z(z[19])
            Z(z[20])
            Z(z[20])
            Z(z[22])
            Z([3, 'goods-detail__content'])
            Z([
                [2, '||'],
                [
                    [2, '=='],
                    [
                        [7],
                        [3, 'saleType']
                    ],
                    [1, 2]
                ],
                [
                    [2, '=='],
                    [
                        [7],
                        [3, 'saleType']
                    ],
                    [1, 1]
                ]
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'shop']
                ],
                [3, 'toUserDistance']
            ])
            Z(z[29])
        })(__WXML_GLOBAL__.ops_cached.$gwx12_12);
        return __WXML_GLOBAL__.ops_cached.$gwx12_12
    }

    function gz$gwx12_13() {
        if (__WXML_GLOBAL__.ops_cached.$gwx12_13) return __WXML_GLOBAL__.ops_cached.$gwx12_13
        __WXML_GLOBAL__.ops_cached.$gwx12_13 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
            Z([3, 'energyInfo'])
            Z([
                [6],
                [
                    [7],
                    [3, 'goodsDetail']
                ],
                [3, 'ingredientSwitch']
            ])
        })(__WXML_GLOBAL__.ops_cached.$gwx12_13);
        return __WXML_GLOBAL__.ops_cached.$gwx12_13
    }

    function gz$gwx12_14() {
        if (__WXML_GLOBAL__.ops_cached.$gwx12_14) return __WXML_GLOBAL__.ops_cached.$gwx12_14
        __WXML_GLOBAL__.ops_cached.$gwx12_14 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
            Z([3, 'freshRoastedNewReleasedTime'])
            Z([
                [2, '&&'],
                [
                    [6],
                    [
                        [7],
                        [3, 'goodsDetail']
                    ],
                    [3, 'freshRoastedNewReleasedTime']
                ],
                [
                    [6],
                    [
                        [7],
                        [3, 'freshRoastedData']
                    ],
                    [3, 'bakingPlanInfo']
                ]
            ])
        })(__WXML_GLOBAL__.ops_cached.$gwx12_14);
        return __WXML_GLOBAL__.ops_cached.$gwx12_14
    }

    function gz$gwx12_15() {
        if (__WXML_GLOBAL__.ops_cached.$gwx12_15) return __WXML_GLOBAL__.ops_cached.$gwx12_15
        __WXML_GLOBAL__.ops_cached.$gwx12_15 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
            Z([3, 'limitedInfo'])
            Z([3, 'limited-time-discount'])
            Z([3, 'discount-left'])
            Z([3, 'discount-goods-price'])
            Z([
                [6],
                [
                    [7],
                    [3, 'goodsDetail']
                ],
                [3, 'limitTimePrice']
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'goodsDetail']
                ],
                [3, 'showPriceLow']
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'goodsDetail']
                ],
                [3, 'soldNum']
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'goodsDetail']
                ],
                [3, 'goodsReservationNum']
            ])
            Z([3, 'count-down'])
            Z([
                [2, '!='],
                [
                    [7],
                    [3, 'styleNo']
                ],
                [1, 2]
            ])
            Z([3, 'countDownOver'])
            Z([3, 'DD天HH小时mm分ss秒'])
            Z([
                [6],
                [
                    [6],
                    [
                        [7],
                        [3, 'propsValue']
                    ],
                    [3, 'discountData']
                ],
                [3, 'id']
            ])
            Z([3, 'style_1'])
            Z([
                [7],
                [3, 'time']
            ])
            Z([a, [3, 'color:'],
                [
                    [2, '?:'],
                    [
                        [7],
                        [3, 'countDownEnd']
                    ],
                    [1, '#fff'],
                    [1, '#FF312D']
                ],
                [3, ';background: #ffffff; border-radius: 6rpx; font-size: 26rpx;  font-weight: 500; height: 30rpx; min-width: 30rpx; line-height:30rpx;']
            ])
            Z(z[12])
            Z([3, 'color:#fff;font-size:26rpx;'])
            Z(z[10])
            Z(z[11])
            Z(z[12])
            Z(z[13])
            Z(z[14])
            Z([a, z[15][1], z[15][2],
                [3, ';background: transparent; border-radius: 6rpx; font-size: 26rpx;  font-weight: 500; height: 30rpx; min-width: 30rpx; line-height:30rpx;']
            ])
            Z(z[12])
            Z([3, 'color:#FF312D;font-size:26rpx;'])
            Z([
                [6],
                [
                    [7],
                    [3, 'goodsDetail']
                ],
                [3, 'cycleLimitNum']
            ])
        })(__WXML_GLOBAL__.ops_cached.$gwx12_15);
        return __WXML_GLOBAL__.ops_cached.$gwx12_15
    }

    function gz$gwx12_16() {
        if (__WXML_GLOBAL__.ops_cached.$gwx12_16) return __WXML_GLOBAL__.ops_cached.$gwx12_16
        __WXML_GLOBAL__.ops_cached.$gwx12_16 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
            Z([3, 'preInfo'])
            Z([3, 'pre-time-discount'])
            Z([
                [6],
                [
                    [6],
                    [
                        [6],
                        [
                            [7],
                            [3, 'goodsDetail']
                        ],
                        [3, 'preSale']
                    ],
                    [3, 'goods']
                ],
                [3, 'showSales']
            ])
            Z([
                [2, '!'],
                [
                    [7],
                    [3, 'countDownEnd']
                ]
            ])
            Z([3, 'count-down'])
            Z([
                [2, '!='],
                [
                    [7],
                    [3, 'styleNo']
                ],
                [1, 2]
            ])
            Z([3, 'countDownOver'])
            Z([3, 'DD天HH小时mm分ss秒'])
            Z([
                [6],
                [
                    [6],
                    [
                        [7],
                        [3, 'propsValue']
                    ],
                    [3, 'discountData']
                ],
                [3, 'id']
            ])
            Z([3, 'style_1'])
            Z([
                [7],
                [3, 'time']
            ])
            Z([1, true])
            Z([3, 'color:#fff;background: #5526B5; border-radius: 6rpx; font-size: 26rpx;  font-weight: 500; height: 35rpx; min-width: 35rpx;box-sizing:border-box; line-height:35rpx; padding:0;'])
            Z(z[8])
            Z([3, 'color:#5526B5;font-size:26rpx;'])
            Z(z[6])
            Z(z[7])
            Z(z[8])
            Z(z[9])
            Z(z[10])
            Z(z[11])
            Z([3, 'color:#21c65e;background: transparent; border-radius: 6rpx; font-size: 26rpx;  font-weight: 500; height: 35rpx; min-width: 35rpx;box-sizing:border-box; line-height:35rpx; padding:0;'])
            Z(z[8])
            Z([3, 'color:#21c65e;font-size:26rpx;'])
            Z([
                [6],
                [
                    [6],
                    [
                        [6],
                        [
                            [7],
                            [3, 'goodsDetail']
                        ],
                        [3, 'preSale']
                    ],
                    [3, 'baseInfo']
                ],
                [3, 'userBuyLimitDesc']
            ])
        })(__WXML_GLOBAL__.ops_cached.$gwx12_16);
        return __WXML_GLOBAL__.ops_cached.$gwx12_16
    }

    function gz$gwx12_17() {
        if (__WXML_GLOBAL__.ops_cached.$gwx12_17) return __WXML_GLOBAL__.ops_cached.$gwx12_17
        __WXML_GLOBAL__.ops_cached.$gwx12_17 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
            Z([3, 'preferentialZone'])
            Z([3, 'limited-time-discount'])
            Z([3, 'discount-left'])
            Z([3, 'discount-goods-price'])
            Z([
                [6],
                [
                    [7],
                    [3, 'goodsDetail']
                ],
                [3, 'preferentialZonePrice']
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'goodsDetail']
                ],
                [3, 'showPriceLow']
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'goodsDetail']
                ],
                [3, 'soldNum']
            ])
            Z([3, 'count-down'])
            Z([
                [2, '!='],
                [
                    [7],
                    [3, 'styleNo']
                ],
                [1, 2]
            ])
            Z([3, 'countDownOver'])
            Z([3, 'DD天HH小时mm分ss秒'])
            Z([
                [6],
                [
                    [7],
                    [3, 'enterpriseZone']
                ],
                [3, 'enterpriseId']
            ])
            Z([3, 'style_1'])
            Z([
                [7],
                [3, 'time']
            ])
            Z([a, [3, 'color:'],
                [
                    [2, '?:'],
                    [
                        [7],
                        [3, 'countDownEnd']
                    ],
                    [1, '#fff'],
                    [1, '#FF312D']
                ],
                [3, ';background: #ffffff; border-radius: 6rpx; font-size: 26rpx;  font-weight: 500; height: 30rpx; min-width: 30rpx; line-height:30rpx;']
            ])
            Z(z[11])
            Z([3, 'color:#fff;font-size:26rpx;'])
            Z(z[9])
            Z(z[10])
            Z(z[11])
            Z(z[12])
            Z(z[13])
            Z([a, z[14][1], z[14][2],
                [3, ';background: transparent; border-radius: 6rpx; font-size: 26rpx;  font-weight: 500; height: 30rpx; min-width: 30rpx; line-height:30rpx;']
            ])
            Z(z[11])
            Z([3, 'color:#FF312D;font-size:26rpx;'])
        })(__WXML_GLOBAL__.ops_cached.$gwx12_17);
        return __WXML_GLOBAL__.ops_cached.$gwx12_17
    }

    function gz$gwx12_18() {
        if (__WXML_GLOBAL__.ops_cached.$gwx12_18) return __WXML_GLOBAL__.ops_cached.$gwx12_18
        __WXML_GLOBAL__.ops_cached.$gwx12_18 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
            Z([3, 'shopInfo'])
            Z([
                [2, '&&'],
                [
                    [7],
                    [3, 'shop']
                ],
                [
                    [2, '!'],
                    [
                        [7],
                        [3, 'isFromMall']
                    ]
                ]
            ])
            Z([3, 'shop-info-content'])
            Z([
                [2, '!'],
                [
                    [7],
                    [3, 'isLimitTimePriceGoods']
                ]
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'shop']
                ],
                [3, 'toUserDistance']
            ])
            Z([
                [6],
                [
                    [6],
                    [
                        [7],
                        [3, 'shop']
                    ],
                    [3, 'current']
                ],
                [3, 'address']
            ])
        })(__WXML_GLOBAL__.ops_cached.$gwx12_18);
        return __WXML_GLOBAL__.ops_cached.$gwx12_18
    }
    __WXML_GLOBAL__.ops_set.$gwx12 = z;
    __WXML_GLOBAL__.ops_init.$gwx12 = true;
    var nv_require = function() {
        var nnm = {
            "p_./pages/goods/detail/wxs/index40aa175e.wxs": np_0,
        };
        var nom = {};
        return function(n) {
            if (n[0] === 'p' && n[1] === '_' && f_[n.slice(2)]) return f_[n.slice(2)];
            return function() {
                if (!nnm[n]) return undefined;
                try {
                    if (!nom[n]) nom[n] = nnm[n]();
                    return nom[n];
                } catch (e) {
                    e.message = e.message.replace(/nv_/g, '');
                    var tmp = e.stack.substring(0, e.stack.lastIndexOf(n));
                    e.stack = tmp.substring(0, tmp.lastIndexOf('\n'));
                    e.stack = e.stack.replace(/\snv_/g, ' ');
                    e.stack = $gstack(e.stack);
                    e.stack += '\n    at ' + n.substring(2);
                    console.error(e);
                }
            }
        }
    }()
    f_['./pages/goods/detail/components/goods-evaluate/index.wxml'] = {};
    f_['./pages/goods/detail/components/goods-evaluate/index.wxml']['__ip__'] = f_['./wxs/ip1cf261bc.wxs'] || nv_require("p_./wxs/ip1cf261bc.wxs");
    f_['./pages/goods/detail/components/goods-evaluate/index.wxml']['__ip__']();

    f_['./pages/goods/detail/components/goods-package-base-combined/index.wxml'] = {};
    f_['./pages/goods/detail/components/goods-package-base-combined/index.wxml']['__ip__'] = f_['./wxs/ip1cf261bc.wxs'] || nv_require("p_./wxs/ip1cf261bc.wxs");
    f_['./pages/goods/detail/components/goods-package-base-combined/index.wxml']['__ip__']();
    f_['./pages/goods/detail/components/goods-package-base-combined/index.wxml']['commonFilter'] = f_['./wxs/index7faab0d4.wxs'] || nv_require("p_./wxs/index7faab0d4.wxs");
    f_['./pages/goods/detail/components/goods-package-base-combined/index.wxml']['commonFilter']();

    f_['./pages/goods/detail/components/goods-package-base-info/index.wxml'] = {};
    f_['./pages/goods/detail/components/goods-package-base-info/index.wxml']['__ip__'] = f_['./wxs/ip1cf261bc.wxs'] || nv_require("p_./wxs/ip1cf261bc.wxs");
    f_['./pages/goods/detail/components/goods-package-base-info/index.wxml']['__ip__']();
    f_['./pages/goods/detail/components/goods-package-base-info/index.wxml']['filter'] = f_['./pages/goods/detail/wxs/index40aa175e.wxs'] || nv_require("p_./pages/goods/detail/wxs/index40aa175e.wxs");
    f_['./pages/goods/detail/components/goods-package-base-info/index.wxml']['filter']();

    f_['./pages/goods/detail/components/goods-package-free-combined/components/goods-list/index.wxml'] = {};
    f_['./pages/goods/detail/components/goods-package-free-combined/components/goods-list/index.wxml']['__ip__'] = f_['./wxs/ip1cf261bc.wxs'] || nv_require("p_./wxs/ip1cf261bc.wxs");
    f_['./pages/goods/detail/components/goods-package-free-combined/components/goods-list/index.wxml']['__ip__']();
    f_['./pages/goods/detail/components/goods-package-free-combined/components/goods-list/index.wxml']['commonFilter'] = f_['./wxs/index7faab0d4.wxs'] || nv_require("p_./wxs/index7faab0d4.wxs");
    f_['./pages/goods/detail/components/goods-package-free-combined/components/goods-list/index.wxml']['commonFilter']();

    f_['./pages/goods/detail/components/goods-package-free-combined/index.wxml'] = {};
    f_['./pages/goods/detail/components/goods-package-free-combined/index.wxml']['commonFilter'] = f_['./wxs/index7faab0d4.wxs'] || nv_require("p_./wxs/index7faab0d4.wxs");
    f_['./pages/goods/detail/components/goods-package-free-combined/index.wxml']['commonFilter']();

    f_['./pages/goods/detail/components/shop-change-popup/index.wxml'] = {};
    f_['./pages/goods/detail/components/shop-change-popup/index.wxml']['__ip__'] = f_['./wxs/ip1cf261bc.wxs'] || nv_require("p_./wxs/ip1cf261bc.wxs");
    f_['./pages/goods/detail/components/shop-change-popup/index.wxml']['__ip__']();

    f_['./pages/goods/detail/components/swiper-goods-image/index.wxml'] = {};
    f_['./pages/goods/detail/components/swiper-goods-image/index.wxml']['__ip__'] = f_['./wxs/ip1cf261bc.wxs'] || nv_require("p_./wxs/ip1cf261bc.wxs");
    f_['./pages/goods/detail/components/swiper-goods-image/index.wxml']['__ip__']();
    f_['./pages/goods/detail/components/swiper-goods-image/index.wxml']['commonFilter'] = f_['./wxs/index7faab0d4.wxs'] || nv_require("p_./wxs/index7faab0d4.wxs");
    f_['./pages/goods/detail/components/swiper-goods-image/index.wxml']['commonFilter']();

    f_['./pages/goods/detail/index.wxml'] = {};
    f_['./pages/goods/detail/index.wxml']['__ip__'] = f_['./wxs/ip1cf261bc.wxs'] || nv_require("p_./wxs/ip1cf261bc.wxs");
    f_['./pages/goods/detail/index.wxml']['__ip__']();
    f_['./pages/goods/detail/index.wxml']['commonFilter'] = f_['./wxs/index7faab0d4.wxs'] || nv_require("p_./wxs/index7faab0d4.wxs");
    f_['./pages/goods/detail/index.wxml']['commonFilter']();

    f_['./pages/goods/detail/template/activity-info22b946a4.wxml'] = {};
    f_['./pages/goods/detail/template/activity-info22b946a4.wxml']['__ip__'] = f_['./wxs/ip1cf261bc.wxs'] || nv_require("p_./wxs/ip1cf261bc.wxs");
    f_['./pages/goods/detail/template/activity-info22b946a4.wxml']['__ip__']();
    f_['./pages/goods/detail/template/activity-info22b946a4.wxml']['commonFilter'] = f_['./wxs/index7faab0d4.wxs'] || nv_require("p_./wxs/index7faab0d4.wxs");
    f_['./pages/goods/detail/template/activity-info22b946a4.wxml']['commonFilter']();

    f_['./pages/goods/detail/template/energyInfo70fbecb6.wxml'] = {};
    f_['./pages/goods/detail/template/energyInfo70fbecb6.wxml']['__ip__'] = f_['./wxs/ip1cf261bc.wxs'] || nv_require("p_./wxs/ip1cf261bc.wxs");
    f_['./pages/goods/detail/template/energyInfo70fbecb6.wxml']['__ip__']();

    f_['./pages/goods/detail/wxs/index40aa175e.wxs'] = nv_require("p_./pages/goods/detail/wxs/index40aa175e.wxs");

    function np_0() {
        var nv_module = {
            nv_exports: {}
        };
        nv_module.nv_exports = ((function() {
            var nv___webpack_modules__ = ([((function(nv_module) {
                function nv_goodsPackageMainGoodsDesc(nv_goodsList) {
                    if (!nv_goodsList) return ("");;
                    var nv_arr = [];
                    nv_goodsList.nv_forEach((function(nv_v) {
                        nv_arr.nv_push(nv_v.nv_name + "x" + nv_v.nv_num)
                    }));
                    return (nv_arr)
                };

                function nv_freeCombinedGroupListDesc(nv_goodsList) {
                    if (!nv_goodsList) return ("");;
                    var nv_arr = [];
                    nv_goodsList.nv_forEach((function(nv_v) {
                        if (nv_v.nv_isCheckBox) {
                            nv_arr.nv_push(nv_v.nv_groupName + "x" + nv_v.nv_lessBuyNum + "~" + nv_v.nv_minBuyNum)
                        } else {
                            nv_arr.nv_push(nv_v.nv_groupName + "x" + nv_v.nv_minBuyNum)
                        }
                    }));
                    return (nv_arr)
                };
                nv_module.nv_exports = ({
                    nv_goodsPackageMainGoodsDesc: nv_goodsPackageMainGoodsDesc,
                    nv_freeCombinedGroupListDesc: nv_freeCombinedGroupListDesc,
                })
            }))]);
            var nv___webpack_module_cache__ = ({});

            function nv___webpack_require__(nv_moduleId) {
                var nv_cachedModule = nv___webpack_module_cache__[((nt_0 = (nv_moduleId), null == nt_0 ? undefined : 'number' === typeof nt_0 ? nt_0 : "nv_" + nt_0))];
                if (nv_cachedModule !== undefined) {
                    return (nv_cachedModule.nv_exports)
                };
                var nv_module = nv___webpack_module_cache__[((nt_1 = (nv_moduleId), null == nt_1 ? undefined : 'number' === typeof nt_1 ? nt_1 : "nv_" + nt_1))] = ({
                    nv_exports: ({}),
                });
                nv___webpack_modules__[((nt_2 = (nv_moduleId), null == nt_2 ? undefined : 'number' === typeof nt_2 ? nt_2 : "nv_" + nt_2))](nv_module, nv_module.nv_exports, nv___webpack_require__);
                return (nv_module.nv_exports)
            };
            var nv___webpack_exports__ = nv___webpack_require__(0);
            return (nv___webpack_exports__ && nv___webpack_exports__.nv___esModule ? nv___webpack_exports__[("nv_" + "default")] : nv___webpack_exports__)
        }))();
        return nv_module.nv_exports;
    }

    var x = ['./pages/goods/detail/components/goods-evaluate/index.wxml', './pages/goods/detail/components/goods-package-base-combined/index.wxml', './pages/goods/detail/components/goods-package-base-info/index.wxml', './pages/goods/detail/components/goods-package-free-combined/components/goods-list/index.wxml', './pages/goods/detail/components/goods-package-free-combined/index.wxml', './pages/goods/detail/components/goods-package-price/index.wxml', './pages/goods/detail/components/goods-state/index.wxml', './pages/goods/detail/components/shop-change-popup/index.wxml', './pages/goods/detail/components/star/index.wxml', './pages/goods/detail/components/swiper-goods-image/index.wxml', './pages/goods/detail/index.wxml', '/pages/goods/detail/template/activity-info22b946a4.wxml', '/pages/goods/detail/template/shop-info629e3acb.wxml', '/pages/goods/detail/template/limited-info5b3b332a.wxml', '/pages/goods/detail/template/pre-info7cf82b34.wxml', '/pages/goods/detail/template/energyInfo70fbecb6.wxml', '/pages/goods/detail/template/freshRoastedNewReleasedTime53bf7c88.wxml', '/pages/goods/detail/template/preferentialZone25f267f2.wxml', './pages/goods/detail/template/activity-info22b946a4.wxml', './pages/goods/detail/template/energyInfo70fbecb6.wxml', './pages/goods/detail/template/freshRoastedNewReleasedTime53bf7c88.wxml', './pages/goods/detail/template/limited-info5b3b332a.wxml', './pages/goods/detail/template/pre-info7cf82b34.wxml', './pages/goods/detail/template/preferentialZone25f267f2.wxml', './pages/goods/detail/template/shop-info629e3acb.wxml'];
    d_[x[0]] = {}
    var m0 = function(e, s, r, gg) {
        var z = gz$gwx12_1()
        var oB = _mz(z, 'view', ['catchtap', 0, 'class', 1, 'style', 1], [], e, s, gg)
        var xC = _v()
        _(oB, xC)
        if (_oz(z, 3, e, s, gg)) {
            xC.wxVkey = 1
            var oJ = _v()
            _(xC, oJ)
            if (_oz(z, 4, e, s, gg)) {
                oJ.wxVkey = 1
            }
            oJ.wxXCkey = 1
        }
        var lK = _n('view')
        _rz(z, lK, 'class', 5, e, s, gg)
        var aL = _v()
        _(lK, aL)
        if (_oz(z, 6, e, s, gg)) {
            aL.wxVkey = 1
            var tM = _v()
            _(aL, tM)
            if (_oz(z, 7, e, s, gg)) {
                tM.wxVkey = 1
            }
            tM.wxXCkey = 1
        } else {
            aL.wxVkey = 2
            var eN = _mz(z, 'star', ['activetyNum', 8, 'isShow', 1, 'onlyShowActiveStar', 2, 'padding', 3, 'size', 4], [], e, s, gg)
            _(aL, eN)
        }
        aL.wxXCkey = 1
        aL.wxXCkey = 3
        _(oB, lK)
        var oD = _v()
        _(oB, oD)
        if (_oz(z, 13, e, s, gg)) {
            oD.wxVkey = 1
        }
        var fE = _v()
        _(oB, fE)
        if (_oz(z, 14, e, s, gg)) {
            fE.wxVkey = 1
        }
        var cF = _v()
        _(oB, cF)
        if (_oz(z, 15, e, s, gg)) {
            cF.wxVkey = 1
        }
        var hG = _v()
        _(oB, hG)
        if (_oz(z, 16, e, s, gg)) {
            hG.wxVkey = 1
            var bO = _v()
            _(hG, bO)
            var oP = function(oR, xQ, fS, gg) {
                var hU = _v()
                _(fS, hU)
                if (_oz(z, 19, oR, xQ, gg)) {
                    hU.wxVkey = 1
                }
                hU.wxXCkey = 1
                return fS
            }
            bO.wxXCkey = 2
            _2z(z, 17, oP, e, s, gg, bO, 'item', 'index', 'index')
        }
        var oH = _v()
        _(oB, oH)
        if (_oz(z, 20, e, s, gg)) {
            oH.wxVkey = 1
        }
        var cI = _v()
        _(oB, cI)
        if (_oz(z, 21, e, s, gg)) {
            cI.wxVkey = 1
            var oV = _n('view')
            _rz(z, oV, 'class', 22, e, s, gg)
            var cW = _v()
            _(oV, cW)
            if (_oz(z, 23, e, s, gg)) {
                cW.wxVkey = 1
            }
            var oX = _v()
            _(oV, oX)
            if (_oz(z, 24, e, s, gg)) {
                oX.wxVkey = 1
            }
            var lY = _v()
            _(oV, lY)
            if (_oz(z, 25, e, s, gg)) {
                lY.wxVkey = 1
            }
            cW.wxXCkey = 1
            oX.wxXCkey = 1
            lY.wxXCkey = 1
            _(cI, oV)
        }
        xC.wxXCkey = 1
        oD.wxXCkey = 1
        fE.wxXCkey = 1
        cF.wxXCkey = 1
        hG.wxXCkey = 1
        oH.wxXCkey = 1
        cI.wxXCkey = 1
        _(r, oB)
        return r
    }
    e_[x[0]] = {
        f: m0,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    d_[x[1]] = {}
    d_[x[1]]["goods-item"] = function(e, s, r, gg) {
        var z = gz$gwx12_2()
        var b = x[1] + ':goods-item'
        r.wxVkey = b
        gg.f = $gdc(f_["./pages/goods/detail/components/goods-package-base-combined/index.wxml"], "", 1)
        if (p_[b]) {
            _wl(b, x[1]);
            return
        }
        p_[b] = true
        try {
            var oB = _n('view')
            _rz(z, oB, 'class', 8, e, s, gg)
            var xC = _v()
            _(oB, xC)
            if (_oz(z, 9, e, s, gg)) {
                xC.wxVkey = 1
            }
            var oD = _v()
            _(oB, oD)
            if (_oz(z, 10, e, s, gg)) {
                oD.wxVkey = 1
            }
            xC.wxXCkey = 1
            oD.wxXCkey = 1
            _(r, oB)
        } catch (err) {
            p_[b] = false
            throw err
        }
        p_[b] = false
        return r
    }
    var m1 = function(e, s, r, gg) {
        var z = gz$gwx12_2()
        var t1 = _v()
        _(r, t1)
        if (_oz(z, 0, e, s, gg)) {
            t1.wxVkey = 1
            var e2 = _v()
            _(t1, e2)
            var b3 = function(x5, o4, o6, gg) {
                var c8 = _v()
                _(o6, c8)
                var h9 = _oz(z, 6, x5, o4, gg)
                var o0 = _gd(x[1], h9, e_, d_)
                if (o0) {
                    var cAB = _1z(z, 5, x5, o4, gg) || {}
                    var cur_globalf = gg.f
                    c8.wxXCkey = 3
                    o0(cAB, cAB, c8, gg)
                    gg.f = cur_globalf
                } else _w(h9, x[1], 1, 480)
                return o6
            }
            e2.wxXCkey = 2
            _2z(z, 3, b3, e, s, gg, e2, 'cItem', 'cIndex', 'cIndex')
        }
        var oBB = _mz(z, 'goods-sku', ['bindclose', 11, 'bindconfirm', 1, 'disableStepperInput', 2, 'goods', 3, 'goodsIndex', 4, 'isSpecialMakeScene', 5, 'show', 6], [], e, s, gg)
        _(r, oBB)
        t1.wxXCkey = 1
        return r
    }
    e_[x[1]] = {
        f: m1,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    d_[x[2]] = {}
    var m2 = function(e, s, r, gg) {
        var z = gz$gwx12_3()
        var aDB = _n('view')
        _rz(z, aDB, 'class', 0, e, s, gg)
        var tEB = _v()
        _(aDB, tEB)
        if (_oz(z, 1, e, s, gg)) {
            tEB.wxVkey = 1
        }
        var eFB = _v()
        _(aDB, eFB)
        if (_oz(z, 2, e, s, gg)) {
            eFB.wxVkey = 1
            var bGB = _v()
            _(eFB, bGB)
            if (_oz(z, 3, e, s, gg)) {
                bGB.wxVkey = 1
            }
            bGB.wxXCkey = 1
        }
        tEB.wxXCkey = 1
        eFB.wxXCkey = 1
        _(r, aDB)
        return r
    }
    e_[x[2]] = {
        f: m2,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    d_[x[3]] = {}
    var m3 = function(e, s, r, gg) {
        var z = gz$gwx12_4()
        var oJB = _v()
        _(r, oJB)
        var fKB = function(hMB, cLB, oNB, gg) {
            var oPB = _v()
            _(oNB, oPB)
            if (_oz(z, 2, hMB, cLB, gg)) {
                oPB.wxVkey = 1
                var lQB = _mz(z, 'view', ['bindtap', 3, 'class', 1, 'data-index', 2, 'data-item', 3, 'style', 4], [], hMB, cLB, gg)
                var aRB = _v()
                _(lQB, aRB)
                if (_oz(z, 8, hMB, cLB, gg)) {
                    aRB.wxVkey = 1
                }
                var tSB = _v()
                _(lQB, tSB)
                if (_oz(z, 9, hMB, cLB, gg)) {
                    tSB.wxVkey = 1
                }
                var eTB = _v()
                _(lQB, eTB)
                if (_oz(z, 10, hMB, cLB, gg)) {
                    eTB.wxVkey = 1
                    var xWB = _mz(z, 'qm-stepper', ['bindminus', 11, 'bindplus', 1, 'identifyGoods', 2, 'showMinus', 3, 'styleNo', 4, 'styleScene', 5, 'value', 6], [], hMB, cLB, gg)
                    _(eTB, xWB)
                }
                var bUB = _v()
                _(lQB, bUB)
                if (_oz(z, 18, hMB, cLB, gg)) {
                    bUB.wxVkey = 1
                }
                var oVB = _v()
                _(lQB, oVB)
                if (_oz(z, 19, hMB, cLB, gg)) {
                    oVB.wxVkey = 1
                }
                aRB.wxXCkey = 1
                tSB.wxXCkey = 1
                eTB.wxXCkey = 1
                eTB.wxXCkey = 3
                bUB.wxXCkey = 1
                oVB.wxXCkey = 1
                _(oPB, lQB)
            }
            oPB.wxXCkey = 1
            oPB.wxXCkey = 3
            return oNB
        }
        oJB.wxXCkey = 4
        _2z(z, 0, fKB, e, s, gg, oJB, 'item', 'index', 'index')
        var xIB = _v()
        _(r, xIB)
        if (_oz(z, 20, e, s, gg)) {
            xIB.wxVkey = 1
        }
        var oXB = _mz(z, 'goods-sku', ['bindclose', 21, 'bindconfirm', 1, 'disableStepperInput', 2, 'goods', 3, 'goodsIndex', 4, 'isSpecialMakeScene', 5, 'show', 6], [], e, s, gg)
        _(r, oXB)
        xIB.wxXCkey = 1
        return r
    }
    e_[x[3]] = {
        f: m3,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    d_[x[4]] = {}
    var m4 = function(e, s, r, gg) {
        var z = gz$gwx12_5()
        var cZB = _v()
        _(r, cZB)
        if (_oz(z, 0, e, s, gg)) {
            cZB.wxVkey = 1
            var h1B = _v()
            _(cZB, h1B)
            var o2B = function(o4B, c3B, l5B, gg) {
                var t7B = _mz(z, 'goods-list', ['bindconfirm', 3, 'bindselectedGoods', 1, 'buyGoodsNum', 2, 'extra', 3, 'groupId', 4, 'groupName', 5, 'isShow', 6, 'list', 7, 'maxBuyGoodsNum', 8, 'styleNo', 9, 'styleType', 10, 'trigger', 11], [], o4B, c3B, gg)
                _(l5B, t7B)
                return l5B
            }
            h1B.wxXCkey = 4
            _2z(z, 1, o2B, e, s, gg, h1B, 'item', 'index', 'index')
        }
        cZB.wxXCkey = 1
        cZB.wxXCkey = 3
        return r
    }
    e_[x[4]] = {
        f: m4,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    d_[x[5]] = {}
    var m5 = function(e, s, r, gg) {
        var z = gz$gwx12_6()
        var b9B = _v()
        _(r, b9B)
        if (_oz(z, 0, e, s, gg)) {
            b9B.wxVkey = 1
            var o0B = _n('view')
            _rz(z, o0B, 'class', 1, e, s, gg)
            var xAC = _v()
            _(o0B, xAC)
            if (_oz(z, 2, e, s, gg)) {
                xAC.wxVkey = 1
            }
            var oBC = _v()
            _(o0B, oBC)
            if (_oz(z, 3, e, s, gg)) {
                oBC.wxVkey = 1
                var fCC = _n('view')
                _rz(z, fCC, 'class', 4, e, s, gg)
                var cDC = _v()
                _(fCC, cDC)
                if (_oz(z, 5, e, s, gg)) {
                    cDC.wxVkey = 1
                }
                var hEC = _v()
                _(fCC, hEC)
                if (_oz(z, 6, e, s, gg)) {
                    hEC.wxVkey = 1
                }
                var oFC = _v()
                _(fCC, oFC)
                if (_oz(z, 7, e, s, gg)) {
                    oFC.wxVkey = 1
                }
                cDC.wxXCkey = 1
                hEC.wxXCkey = 1
                oFC.wxXCkey = 1
                _(oBC, fCC)
            }
            xAC.wxXCkey = 1
            oBC.wxXCkey = 1
            _(b9B, o0B)
        }
        b9B.wxXCkey = 1
        return r
    }
    e_[x[5]] = {
        f: m5,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    d_[x[6]] = {}
    var m6 = function(e, s, r, gg) {
        var z = gz$gwx12_7()
        return r
    }
    e_[x[6]] = {
        f: m6,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    d_[x[7]] = {}
    var m7 = function(e, s, r, gg) {
        var z = gz$gwx12_8()
        var lIC = _mz(z, 'qm-popup', ['bindclose', 0, 'show', 1], [], e, s, gg)
        var aJC = _mz(z, 'view', ['catchtap', -1, 'class', 2], [], e, s, gg)
        var tKC = _v()
        _(aJC, tKC)
        if (_oz(z, 3, e, s, gg)) {
            tKC.wxVkey = 1
        }
        var eLC = _n('view')
        _rz(z, eLC, 'class', 4, e, s, gg)
        var bMC = _v()
        _(eLC, bMC)
        if (_oz(z, 5, e, s, gg)) {
            bMC.wxVkey = 1
        }
        var oNC = _v()
        _(eLC, oNC)
        if (_oz(z, 6, e, s, gg)) {
            oNC.wxVkey = 1
        }
        bMC.wxXCkey = 1
        oNC.wxXCkey = 1
        _(aJC, eLC)
        tKC.wxXCkey = 1
        _(lIC, aJC)
        _(r, lIC)
        return r
    }
    e_[x[7]] = {
        f: m7,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    d_[x[8]] = {}
    var m8 = function(e, s, r, gg) {
        var z = gz$gwx12_9()
        return r
    }
    e_[x[8]] = {
        f: m8,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    d_[x[9]] = {}
    var m9 = function(e, s, r, gg) {
        var z = gz$gwx12_10()
        var fQC = _v()
        _(r, fQC)
        if (_oz(z, 0, e, s, gg)) {
            fQC.wxVkey = 1
            var cRC = _v()
            _(fQC, cRC)
            if (_oz(z, 1, e, s, gg)) {
                cRC.wxVkey = 1
            }
            cRC.wxXCkey = 1
        }
        fQC.wxXCkey = 1
        return r
    }
    e_[x[9]] = {
        f: m9,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    d_[x[10]] = {}
    var m10 = function(e, s, r, gg) {
        var z = gz$gwx12_11()
        var oTC = e_[x[10]].i
        _ai(oTC, x[11], e_, x[10], 1, 132)
        _ai(oTC, x[12], e_, x[10], 1, 211)
        _ai(oTC, x[13], e_, x[10], 1, 286)
        _ai(oTC, x[14], e_, x[10], 1, 364)
        _ai(oTC, x[15], e_, x[10], 1, 438)
        _ai(oTC, x[16], e_, x[10], 1, 514)
        _ai(oTC, x[17], e_, x[10], 1, 607)
        var tYC = _mz(z, 'navigation-bar', ['fixed', -1, 'background', 0, 'theme', 1], [], e, s, gg)
        _(r, tYC)
        var cUC = _v()
        _(r, cUC)
        if (_oz(z, 2, e, s, gg)) {
            cUC.wxVkey = 1
            var eZC = _n('v-loading')
            _(cUC, eZC)
        } else {
            cUC.wxVkey = 2
            var b1C = _n('view')
            _rz(z, b1C, 'class', 3, e, s, gg)
            var o2C = _v()
            _(b1C, o2C)
            if (_oz(z, 4, e, s, gg)) {
                o2C.wxVkey = 1
                var x3C = _mz(z, 'v-error', ['errorMsg', 5, 'showConfirm', 1], [], e, s, gg)
                _(o2C, x3C)
            } else {
                o2C.wxVkey = 2
                var o8C = _n('view')
                _rz(z, o8C, 'class', 7, e, s, gg)
                var lAD = _n('view')
                _rz(z, lAD, 'class', 8, e, s, gg)
                var tCD = _mz(z, 'swiper-goods-image', ['list', 9, 'swiperClass', 1], [], e, s, gg)
                _(lAD, tCD)
                var aBD = _v()
                _(lAD, aBD)
                if (_oz(z, 11, e, s, gg)) {
                    aBD.wxVkey = 1
                    var eDD = _mz(z, 'view', ['class', 12, 'style', 1], [], e, s, gg)
                    var bED = _v()
                    _(eDD, bED)
                    if (_oz(z, 14, e, s, gg)) {
                        bED.wxVkey = 1
                        var oFD = _v()
                        _(bED, oFD)
                        if (_oz(z, 15, e, s, gg)) {
                            oFD.wxVkey = 1
                        }
                        oFD.wxXCkey = 1
                    } else {
                        bED.wxVkey = 2
                        var xGD = _v()
                        _(bED, xGD)
                        if (_oz(z, 16, e, s, gg)) {
                            xGD.wxVkey = 1
                            var fID = _mz(z, 'view', ['class', 17, 'style', 1], [], e, s, gg)
                            var cJD = _v()
                            _(fID, cJD)
                            if (_oz(z, 19, e, s, gg)) {
                                cJD.wxVkey = 1
                            }
                            var hKD = _v()
                            _(fID, hKD)
                            if (_oz(z, 20, e, s, gg)) {
                                hKD.wxVkey = 1
                            }
                            cJD.wxXCkey = 1
                            hKD.wxXCkey = 1
                            _(xGD, fID)
                        }
                        var oHD = _v()
                        _(bED, oHD)
                        if (_oz(z, 21, e, s, gg)) {
                            oHD.wxVkey = 1
                            var oLD = _n('view')
                            _rz(z, oLD, 'class', 22, e, s, gg)
                            var cMD = _v()
                            _(oLD, cMD)
                            if (_oz(z, 23, e, s, gg)) {
                                cMD.wxVkey = 1
                            }
                            var oND = _v()
                            _(oLD, oND)
                            if (_oz(z, 24, e, s, gg)) {
                                oND.wxVkey = 1
                            }
                            cMD.wxXCkey = 1
                            oND.wxXCkey = 1
                            _(oHD, oLD)
                        }
                        xGD.wxXCkey = 1
                        oHD.wxXCkey = 1
                    }
                    bED.wxXCkey = 1
                    _(aBD, eDD)
                }
                aBD.wxXCkey = 1
                _(o8C, lAD)
                var c9C = _v()
                _(o8C, c9C)
                if (_oz(z, 25, e, s, gg)) {
                    c9C.wxVkey = 1
                    var lOD = _v()
                    _(c9C, lOD)
                    if (_oz(z, 26, e, s, gg)) {
                        lOD.wxVkey = 1
                        var aPD = _v()
                        _(lOD, aPD)
                        var tQD = _oz(z, 28, e, s, gg)
                        var eRD = _gd(x[10], tQD, e_, d_)
                        if (eRD) {
                            var bSD = _1z(z, 27, e, s, gg) || {}
                            var cur_globalf = gg.f
                            aPD.wxXCkey = 3
                            eRD(bSD, bSD, aPD, gg)
                            gg.f = cur_globalf
                        } else _w(tQD, x[10], 1, 3416)
                    } else if (_oz(z, 29, e, s, gg)) {
                        lOD.wxVkey = 2
                        var oTD = _v()
                        _(lOD, oTD)
                        var xUD = _oz(z, 31, e, s, gg)
                        var oVD = _gd(x[10], xUD, e_, d_)
                        if (oVD) {
                            var fWD = _1z(z, 30, e, s, gg) || {}
                            var cur_globalf = gg.f
                            oTD.wxXCkey = 3
                            oVD(fWD, fWD, oTD, gg)
                            gg.f = cur_globalf
                        } else _w(xUD, x[10], 1, 3568)
                    } else if (_oz(z, 32, e, s, gg)) {
                        lOD.wxVkey = 3
                        var cXD = _v()
                        _(lOD, cXD)
                        var hYD = _oz(z, 34, e, s, gg)
                        var oZD = _gd(x[10], hYD, e_, d_)
                        if (oZD) {
                            var c1D = _1z(z, 33, e, s, gg) || {}
                            var cur_globalf = gg.f
                            cXD.wxXCkey = 3
                            oZD(c1D, c1D, cXD, gg)
                            gg.f = cur_globalf
                        } else _w(hYD, x[10], 1, 3739)
                    }
                    lOD.wxXCkey = 1
                }
                var o0C = _v()
                _(o8C, o0C)
                if (_oz(z, 35, e, s, gg)) {
                    o0C.wxVkey = 1
                }
                c9C.wxXCkey = 1
                o0C.wxXCkey = 1
                _(o2C, o8C)
                var o4C = _v()
                _(o2C, o4C)
                if (_oz(z, 36, e, s, gg)) {
                    o4C.wxVkey = 1
                    var o2D = _n('view')
                    _rz(z, o2D, 'class', 37, e, s, gg)
                    var l3D = _v()
                    _(o2D, l3D)
                    if (_oz(z, 38, e, s, gg)) {
                        l3D.wxVkey = 1
                    }
                    var b7D = _v()
                    _(o2D, b7D)
                    var o8D = _oz(z, 40, e, s, gg)
                    var x9D = _gd(x[10], o8D, e_, d_)
                    if (x9D) {
                        var o0D = _1z(z, 39, e, s, gg) || {}
                        var cur_globalf = gg.f
                        b7D.wxXCkey = 3
                        x9D(o0D, o0D, b7D, gg)
                        gg.f = cur_globalf
                    } else _w(o8D, x[10], 1, 4328)
                    var a4D = _v()
                    _(o2D, a4D)
                    if (_oz(z, 41, e, s, gg)) {
                        a4D.wxVkey = 1
                        var fAE = _v()
                        _(a4D, fAE)
                        var cBE = _oz(z, 43, e, s, gg)
                        var hCE = _gd(x[10], cBE, e_, d_)
                        if (hCE) {
                            var oDE = _1z(z, 42, e, s, gg) || {}
                            var cur_globalf = gg.f
                            fAE.wxXCkey = 3
                            hCE(oDE, oDE, fAE, gg)
                            gg.f = cur_globalf
                        } else _w(cBE, x[10], 1, 4547)
                    } else if (_oz(z, 44, e, s, gg)) {
                        a4D.wxVkey = 2
                        var cEE = _v()
                        _(a4D, cEE)
                        var oFE = _oz(z, 46, e, s, gg)
                        var lGE = _gd(x[10], oFE, e_, d_)
                        if (lGE) {
                            var aHE = _1z(z, 45, e, s, gg) || {}
                            var cur_globalf = gg.f
                            cEE.wxXCkey = 3
                            lGE(aHE, aHE, cEE, gg)
                            gg.f = cur_globalf
                        } else _w(oFE, x[10], 1, 4725)
                    } else if (_oz(z, 47, e, s, gg)) {
                        a4D.wxVkey = 3
                        var tIE = _v()
                        _(a4D, tIE)
                        var eJE = _oz(z, 49, e, s, gg)
                        var bKE = _gd(x[10], eJE, e_, d_)
                        if (bKE) {
                            var oLE = _1z(z, 48, e, s, gg) || {}
                            var cur_globalf = gg.f
                            tIE.wxXCkey = 3
                            bKE(oLE, oLE, tIE, gg)
                            gg.f = cur_globalf
                        } else _w(eJE, x[10], 1, 4914)
                    }
                    var t5D = _v()
                    _(o2D, t5D)
                    if (_oz(z, 50, e, s, gg)) {
                        t5D.wxVkey = 1
                    }
                    var e6D = _v()
                    _(o2D, e6D)
                    if (_oz(z, 51, e, s, gg)) {
                        e6D.wxVkey = 1
                        var xME = _n('view')
                        _rz(z, xME, 'class', 52, e, s, gg)
                        var fOE = _n('view')
                        _rz(z, fOE, 'class', 53, e, s, gg)
                        var cPE = _v()
                        _(fOE, cPE)
                        if (_oz(z, 54, e, s, gg)) {
                            cPE.wxVkey = 1
                        }
                        var hQE = _v()
                        _(fOE, hQE)
                        if (_oz(z, 55, e, s, gg)) {
                            hQE.wxVkey = 1
                            var oRE = _mz(z, 'view', ['class', 56, 'style', 1], [], e, s, gg)
                            var cSE = _v()
                            _(oRE, cSE)
                            if (_oz(z, 58, e, s, gg)) {
                                cSE.wxVkey = 1
                            }
                            var oTE = _v()
                            _(oRE, oTE)
                            if (_oz(z, 59, e, s, gg)) {
                                oTE.wxVkey = 1
                            }
                            cSE.wxXCkey = 1
                            oTE.wxXCkey = 1
                            _(hQE, oRE)
                        }
                        cPE.wxXCkey = 1
                        hQE.wxXCkey = 1
                        _(xME, fOE)
                        var oNE = _v()
                        _(xME, oNE)
                        if (_oz(z, 60, e, s, gg)) {
                            oNE.wxVkey = 1
                        }
                        oNE.wxXCkey = 1
                        _(e6D, xME)
                    }
                    l3D.wxXCkey = 1
                    a4D.wxXCkey = 1
                    t5D.wxXCkey = 1
                    e6D.wxXCkey = 1
                    _(o4C, o2D)
                }
                var f5C = _v()
                _(o2C, f5C)
                if (_oz(z, 61, e, s, gg)) {
                    f5C.wxVkey = 1
                }
                var c6C = _v()
                _(o2C, c6C)
                if (_oz(z, 62, e, s, gg)) {
                    c6C.wxVkey = 1
                    var lUE = _n('view')
                    var aVE = _v()
                    _(lUE, aVE)
                    if (_oz(z, 63, e, s, gg)) {
                        aVE.wxVkey = 1
                        var eXE = _v()
                        _(aVE, eXE)
                        if (_oz(z, 64, e, s, gg)) {
                            eXE.wxVkey = 1
                        }
                        eXE.wxXCkey = 1
                    }
                    var tWE = _v()
                    _(lUE, tWE)
                    if (_oz(z, 65, e, s, gg)) {
                        tWE.wxVkey = 1
                        var bYE = _n('view')
                        _rz(z, bYE, 'class', 66, e, s, gg)
                        var oZE = _v()
                        _(bYE, oZE)
                        if (_oz(z, 67, e, s, gg)) {
                            oZE.wxVkey = 1
                            var x1E = _n('custom-rich-text')
                            _rz(z, x1E, 'nodes', 68, e, s, gg)
                            _(oZE, x1E)
                        } else if (_oz(z, 69, e, s, gg)) {
                            oZE.wxVkey = 2
                        }
                        oZE.wxXCkey = 1
                        oZE.wxXCkey = 3
                        _(tWE, bYE)
                    }
                    aVE.wxXCkey = 1
                    tWE.wxXCkey = 1
                    tWE.wxXCkey = 3
                    _(c6C, lUE)
                } else if (_oz(z, 70, e, s, gg)) {
                    c6C.wxVkey = 2
                    var o2E = _n('view')
                    _rz(z, o2E, 'class', 71, e, s, gg)
                    var o6E = _mz(z, 'goods-package-base-info', ['goods', 72, 'styleNo', 1], [], e, s, gg)
                    _(o2E, o6E)
                    var f3E = _v()
                    _(o2E, f3E)
                    if (_oz(z, 74, e, s, gg)) {
                        f3E.wxVkey = 1
                        var c7E = _v()
                        _(f3E, c7E)
                        var o8E = _oz(z, 76, e, s, gg)
                        var l9E = _gd(x[10], o8E, e_, d_)
                        if (l9E) {
                            var a0E = _1z(z, 75, e, s, gg) || {}
                            var cur_globalf = gg.f
                            c7E.wxXCkey = 3
                            l9E(a0E, a0E, c7E, gg)
                            gg.f = cur_globalf
                        } else _w(o8E, x[10], 1, 9188)
                    }
                    var c4E = _v()
                    _(o2E, c4E)
                    if (_oz(z, 77, e, s, gg)) {
                        c4E.wxVkey = 1
                        var tAF = _v()
                        _(c4E, tAF)
                        var eBF = _oz(z, 79, e, s, gg)
                        var bCF = _gd(x[10], eBF, e_, d_)
                        if (bCF) {
                            var oDF = _1z(z, 78, e, s, gg) || {}
                            var cur_globalf = gg.f
                            tAF.wxXCkey = 3
                            bCF(oDF, oDF, tAF, gg)
                            gg.f = cur_globalf
                        } else _w(eBF, x[10], 1, 9461)
                    }
                    var xEF = _mz(z, 'goods-package-base-combined', ['bindconfirm', 80, 'list', 1, 'styleNo', 2], [], e, s, gg)
                    _(o2E, xEF)
                    var oFF = _mz(z, 'goods-package-free-combined', ['bindconfirm', 83, 'bindselect', 1, 'groupList', 2, 'styleNo', 3], [], e, s, gg)
                    _(o2E, oFF)
                    var h5E = _v()
                    _(o2E, h5E)
                    if (_oz(z, 87, e, s, gg)) {
                        h5E.wxVkey = 1
                        var fGF = _mz(z, 'goods-evaluate', ['bindtoGoodsEvaluate', 88, 'evaluate', 1, 'evaluateLength', 2, 'showGoods', 3, 'showImageNum', 4, 'showStoreReply', 5, 'showTitle', 6, 'styleNo', 7], [], e, s, gg)
                        _(h5E, fGF)
                    }
                    f3E.wxXCkey = 1
                    c4E.wxXCkey = 1
                    h5E.wxXCkey = 1
                    h5E.wxXCkey = 3
                    _(c6C, o2E)
                } else {
                    c6C.wxVkey = 3
                    var cHF = _n('view')
                    var hIF = _v()
                    _(cHF, hIF)
                    if (_oz(z, 96, e, s, gg)) {
                        hIF.wxVkey = 1
                        var ePF = _n('view')
                        _rz(z, ePF, 'class', 97, e, s, gg)
                        var bQF = _v()
                        _(ePF, bQF)
                        if (_oz(z, 98, e, s, gg)) {
                            bQF.wxVkey = 1
                            var oTF = _n('view')
                            _rz(z, oTF, 'class', 99, e, s, gg)
                            var fUF = _v()
                            _(oTF, fUF)
                            if (_oz(z, 100, e, s, gg)) {
                                fUF.wxVkey = 1
                            }
                            var cVF = _v()
                            _(oTF, cVF)
                            if (_oz(z, 101, e, s, gg)) {
                                cVF.wxVkey = 1
                            }
                            var hWF = _v()
                            _(oTF, hWF)
                            if (_oz(z, 102, e, s, gg)) {
                                hWF.wxVkey = 1
                                var oXF = _mz(z, 'view', ['class', 103, 'style', 1], [], e, s, gg)
                                var cYF = _v()
                                _(oXF, cYF)
                                if (_oz(z, 105, e, s, gg)) {
                                    cYF.wxVkey = 1
                                }
                                var oZF = _v()
                                _(oXF, oZF)
                                if (_oz(z, 106, e, s, gg)) {
                                    oZF.wxVkey = 1
                                }
                                cYF.wxXCkey = 1
                                oZF.wxXCkey = 1
                                _(hWF, oXF)
                            }
                            fUF.wxXCkey = 1
                            cVF.wxXCkey = 1
                            hWF.wxXCkey = 1
                            _(bQF, oTF)
                        }
                        var oRF = _v()
                        _(ePF, oRF)
                        if (_oz(z, 107, e, s, gg)) {
                            oRF.wxVkey = 1
                        }
                        var xSF = _v()
                        _(ePF, xSF)
                        if (_oz(z, 108, e, s, gg)) {
                            xSF.wxVkey = 1
                        }
                        var l1F = _v()
                        _(ePF, l1F)
                        var a2F = _oz(z, 110, e, s, gg)
                        var t3F = _gd(x[10], a2F, e_, d_)
                        if (t3F) {
                            var e4F = _1z(z, 109, e, s, gg) || {}
                            var cur_globalf = gg.f
                            l1F.wxXCkey = 3
                            t3F(e4F, e4F, l1F, gg)
                            gg.f = cur_globalf
                        } else _w(a2F, x[10], 1, 12113)
                        bQF.wxXCkey = 1
                        oRF.wxXCkey = 1
                        xSF.wxXCkey = 1
                        _(hIF, ePF)
                    }
                    var b5F = _v()
                    _(cHF, b5F)
                    var o6F = _oz(z, 112, e, s, gg)
                    var x7F = _gd(x[10], o6F, e_, d_)
                    if (x7F) {
                        var o8F = _1z(z, 111, e, s, gg) || {}
                        var cur_globalf = gg.f
                        b5F.wxXCkey = 3
                        x7F(o8F, o8F, b5F, gg)
                        gg.f = cur_globalf
                    } else _w(o6F, x[10], 1, 12271)
                    var oJF = _v()
                    _(cHF, oJF)
                    if (_oz(z, 113, e, s, gg)) {
                        oJF.wxVkey = 1
                        var f9F = _v()
                        _(oJF, f9F)
                        var c0F = _oz(z, 115, e, s, gg)
                        var hAG = _gd(x[10], c0F, e_, d_)
                        if (hAG) {
                            var oBG = _1z(z, 114, e, s, gg) || {}
                            var cur_globalf = gg.f
                            f9F.wxXCkey = 3
                            hAG(oBG, oBG, f9F, gg)
                            gg.f = cur_globalf
                        } else _w(c0F, x[10], 1, 12567)
                    }
                    var cKF = _v()
                    _(cHF, cKF)
                    if (_oz(z, 116, e, s, gg)) {
                        cKF.wxVkey = 1
                    }
                    var oLF = _v()
                    _(cHF, oLF)
                    if (_oz(z, 117, e, s, gg)) {
                        oLF.wxVkey = 1
                        var cCG = _v()
                        _(oLF, cCG)
                        var oDG = _oz(z, 119, e, s, gg)
                        var lEG = _gd(x[10], oDG, e_, d_)
                        if (lEG) {
                            var aFG = _1z(z, 118, e, s, gg) || {}
                            var cur_globalf = gg.f
                            cCG.wxXCkey = 3
                            lEG(aFG, aFG, cCG, gg)
                            gg.f = cur_globalf
                        } else _w(oDG, x[10], 1, 13550)
                    }
                    var lMF = _v()
                    _(cHF, lMF)
                    if (_oz(z, 120, e, s, gg)) {
                        lMF.wxVkey = 1
                        var tGG = _v()
                        _(lMF, tGG)
                        if (_oz(z, 121, e, s, gg)) {
                            tGG.wxVkey = 1
                            var eHG = _mz(z, 'goods-evaluate', ['bindtoGoodsEvaluate', 122, 'evaluate', 1, 'evaluateLength', 2, 'onlyShowActiveStar', 3, 'showGoods', 4, 'showImageNum', 5, 'showStoreReply', 6, 'showTitle', 7, 'styleNo', 8], [], e, s, gg)
                            _(tGG, eHG)
                        }
                        tGG.wxXCkey = 1
                        tGG.wxXCkey = 3
                    }
                    var aNF = _v()
                    _(cHF, aNF)
                    if (_oz(z, 131, e, s, gg)) {
                        aNF.wxVkey = 1
                        var bIG = _n('view')
                        _rz(z, bIG, 'class', 132, e, s, gg)
                        var oJG = _v()
                        _(bIG, oJG)
                        if (_oz(z, 133, e, s, gg)) {
                            oJG.wxVkey = 1
                            var xKG = _n('custom-rich-text')
                            _rz(z, xKG, 'nodes', 134, e, s, gg)
                            _(oJG, xKG)
                        } else if (_oz(z, 135, e, s, gg)) {
                            oJG.wxVkey = 2
                        }
                        oJG.wxXCkey = 1
                        oJG.wxXCkey = 3
                        _(aNF, bIG)
                    }
                    var tOF = _v()
                    _(cHF, tOF)
                    if (_oz(z, 136, e, s, gg)) {
                        tOF.wxVkey = 1
                        var oLG = _v()
                        _(tOF, oLG)
                        if (_oz(z, 137, e, s, gg)) {
                            oLG.wxVkey = 1
                            var fMG = _mz(z, 'goods-evaluate', ['bindtoGoodsEvaluate', 138, 'evaluate', 1, 'evaluateLength', 2, 'onlyShowActiveStar', 3, 'showGoods', 4, 'showImageNum', 5, 'showStoreReply', 6, 'showTitle', 7, 'styleNo', 8], [], e, s, gg)
                            _(oLG, fMG)
                        }
                        oLG.wxXCkey = 1
                        oLG.wxXCkey = 3
                    }
                    hIF.wxXCkey = 1
                    oJF.wxXCkey = 1
                    cKF.wxXCkey = 1
                    oLF.wxXCkey = 1
                    lMF.wxXCkey = 1
                    lMF.wxXCkey = 3
                    aNF.wxXCkey = 1
                    aNF.wxXCkey = 3
                    tOF.wxXCkey = 1
                    tOF.wxXCkey = 3
                    _(c6C, cHF)
                }
                var h7C = _v()
                _(o2C, h7C)
                if (_oz(z, 147, e, s, gg)) {
                    h7C.wxVkey = 1
                    var cNG = _v()
                    _(h7C, cNG)
                    if (_oz(z, 148, e, s, gg)) {
                        cNG.wxVkey = 1
                        var oPG = _mz(z, 'goods-cart-icon', ['bindshow', 149, 'cartImgUrl', 1, 'cartShowStatus', 2, 'count', 3, 'styleScene', 4], [], e, s, gg)
                        _(cNG, oPG)
                    }
                    var hOG = _v()
                    _(h7C, hOG)
                    if (_oz(z, 154, e, s, gg)) {
                        hOG.wxVkey = 1
                    } else {
                        hOG.wxVkey = 2
                        var cQG = _v()
                        _(hOG, cQG)
                        if (_oz(z, 155, e, s, gg)) {
                            cQG.wxVkey = 1
                            var oRG = _mz(z, 'goods-action', ['bindaction', 156, 'bindreservation', 1, 'buttonTxt', 2, 'isAddCartShow', 3, 'reservationIndex', 4, 'shareMaterialPic', 5, 'shareParams', 6, 'shareRemark', 7, 'showLeft', 8], [], e, s, gg)
                            var lSG = _v()
                            _(oRG, lSG)
                            if (_oz(z, 165, e, s, gg)) {
                                lSG.wxVkey = 1
                                var aTG = _n('view')
                                _rz(z, aTG, 'slot', 166, e, s, gg)
                                var tUG = _mz(z, 'goods-package-price', ['goodsDetail', 167, 'goodsPackageMatchPrice', 1], [], e, s, gg)
                                _(aTG, tUG)
                                _(lSG, aTG)
                            }
                            lSG.wxXCkey = 1
                            lSG.wxXCkey = 3
                            _(cQG, oRG)
                        }
                        cQG.wxXCkey = 1
                        cQG.wxXCkey = 3
                    }
                    cNG.wxXCkey = 1
                    cNG.wxXCkey = 3
                    hOG.wxXCkey = 1
                    hOG.wxXCkey = 3
                }
                o4C.wxXCkey = 1
                f5C.wxXCkey = 1
                c6C.wxXCkey = 1
                c6C.wxXCkey = 3
                c6C.wxXCkey = 3
                c6C.wxXCkey = 3
                h7C.wxXCkey = 1
                h7C.wxXCkey = 3
            }
            o2C.wxXCkey = 1
            o2C.wxXCkey = 3
            o2C.wxXCkey = 3
            _(cUC, b1C)
        }
        var oVC = _v()
        _(r, oVC)
        if (_oz(z, 169, e, s, gg)) {
            oVC.wxVkey = 1
        }
        var eVG = _mz(z, 'goods-sku', ['bindclose', 170, 'bindconfirm', 1, 'buyScene', 2, 'disableStepperInput', 3, 'goods', 4, 'isCheckGoodsLimit', 5, 'isShowStepper', 6, 'show', 7, 'triggerConfirm', 8], [], e, s, gg)
        _(r, eVG)
        var lWC = _v()
        _(r, lWC)
        if (_oz(z, 179, e, s, gg)) {
            lWC.wxVkey = 1
            var bWG = _mz(z, 'goods-cart', ['cartImgUrl', 180, 'cartShowStatus', 1, 'styleScene', 2, 'triggerShow', 3], [], e, s, gg)
            _(lWC, bWG)
        }
        var aXC = _v()
        _(r, aXC)
        if (_oz(z, 184, e, s, gg)) {
            aXC.wxVkey = 1
            var oXG = _n('shop-state')
            _(aXC, oXG)
        } else if (_oz(z, 185, e, s, gg)) {
            aXC.wxVkey = 2
            var xYG = _mz(z, 'goods-state', ['bindconfirm', 186, 'errorMessage', 1], [], e, s, gg)
            _(aXC, xYG)
        }
        var oZG = _mz(z, 'popup-activity', ['bindclose', 188, 'bindupdate', 1, 'info', 2, 'show', 3], [], e, s, gg)
        _(r, oZG)
        var f1G = _mz(z, 'qm-popup', ['bindclose', 192, 'show', 1], [], e, s, gg)
        _(r, f1G)
        var c2G = _mz(z, 'shop-change-popup', ['bindnavToShopList', 194, 'preShopName', 1, 'trigger', 2], [], e, s, gg)
        _(r, c2G)
        var h3G = _n('goods-sale-time')
        _rz(z, h3G, 'goods', 197, e, s, gg)
        _(r, h3G)
        var o4G = _mz(z, 'qm-popup', ['bindclose', 198, 'position', 1, 'show', 2], [], e, s, gg)
        _(r, o4G)
        cUC.wxXCkey = 1
        cUC.wxXCkey = 3
        cUC.wxXCkey = 3
        oVC.wxXCkey = 1
        lWC.wxXCkey = 1
        lWC.wxXCkey = 3
        aXC.wxXCkey = 1
        aXC.wxXCkey = 3
        aXC.wxXCkey = 3
        oTC.pop()
        oTC.pop()
        oTC.pop()
        oTC.pop()
        oTC.pop()
        oTC.pop()
        oTC.pop()
        return r
    }
    e_[x[10]] = {
        f: m10,
        j: [],
        i: [],
        ti: [x[11], x[12], x[13], x[14], x[15], x[16], x[17]],
        ic: []
    }
    d_[x[18]] = {}
    d_[x[18]]["activityInfo"] = function(e, s, r, gg) {
        var z = gz$gwx12_12()
        var b = x[18] + ':activityInfo'
        r.wxVkey = b
        gg.f = $gdc(f_["./pages/goods/detail/template/activity-info22b946a4.wxml"], "", 1)
        if (p_[b]) {
            _wl(b, x[18]);
            return
        }
        p_[b] = true
        try {
            var oB = _v()
            _(r, oB)
            if (_oz(z, 1, e, s, gg)) {
                oB.wxVkey = 1
                var oD = _mz(z, 'view', ['bindtap', 2, 'class', 1], [], e, s, gg)
                var fE = _n('view')
                _rz(z, fE, 'class', 4, e, s, gg)
                var cF = _v()
                _(fE, cF)
                if (_oz(z, 5, e, s, gg)) {
                    cF.wxVkey = 1
                }
                var hG = _v()
                _(fE, hG)
                if (_oz(z, 6, e, s, gg)) {
                    hG.wxVkey = 1
                }
                var oH = _v()
                _(fE, oH)
                if (_oz(z, 7, e, s, gg)) {
                    oH.wxVkey = 1
                }
                var cI = _v()
                _(fE, cI)
                if (_oz(z, 8, e, s, gg)) {
                    cI.wxVkey = 1
                }
                var oJ = _v()
                _(fE, oJ)
                if (_oz(z, 9, e, s, gg)) {
                    oJ.wxVkey = 1
                }
                var lK = _v()
                _(fE, lK)
                if (_oz(z, 10, e, s, gg)) {
                    lK.wxVkey = 1
                }
                var aL = _v()
                _(fE, aL)
                if (_oz(z, 11, e, s, gg)) {
                    aL.wxVkey = 1
                }
                var tM = _v()
                _(fE, tM)
                if (_oz(z, 12, e, s, gg)) {
                    tM.wxVkey = 1
                    var oP = _v()
                    _(tM, oP)
                    var xQ = function(fS, oR, cT, gg) {
                        var oV = _v()
                        _(cT, oV)
                        if (_oz(z, 15, fS, oR, gg)) {
                            oV.wxVkey = 1
                        }
                        oV.wxXCkey = 1
                        return cT
                    }
                    oP.wxXCkey = 2
                    _2z(z, 13, xQ, e, s, gg, oP, 'item', 'index', 'index')
                }
                var eN = _v()
                _(fE, eN)
                if (_oz(z, 16, e, s, gg)) {
                    eN.wxVkey = 1
                }
                var bO = _v()
                _(fE, bO)
                if (_oz(z, 17, e, s, gg)) {
                    bO.wxVkey = 1
                }
                cF.wxXCkey = 1
                hG.wxXCkey = 1
                oH.wxXCkey = 1
                cI.wxXCkey = 1
                oJ.wxXCkey = 1
                lK.wxXCkey = 1
                aL.wxXCkey = 1
                tM.wxXCkey = 1
                eN.wxXCkey = 1
                bO.wxXCkey = 1
                _(oD, fE)
                _(oB, oD)
            }
            var xC = _v()
            _(r, xC)
            if (_oz(z, 18, e, s, gg)) {
                xC.wxVkey = 1
                var oX = _v()
                _(xC, oX)
                var lY = _oz(z, 20, e, s, gg)
                var aZ = _gd(x[18], lY, e_, d_)
                if (aZ) {
                    var t1 = _1z(z, 19, e, s, gg) || {}
                    var cur_globalf = gg.f
                    oX.wxXCkey = 3
                    aZ(t1, t1, oX, gg)
                    gg.f = cur_globalf
                } else _w(lY, x[18], 1, 5204)
                var cW = _v()
                _(xC, cW)
                if (_oz(z, 21, e, s, gg)) {
                    cW.wxVkey = 1
                    var e2 = _v()
                    _(cW, e2)
                    if (_oz(z, 22, e, s, gg)) {
                        e2.wxVkey = 1
                        var b3 = _v()
                        _(e2, b3)
                        var o4 = _oz(z, 24, e, s, gg)
                        var x5 = _gd(x[18], o4, e_, d_)
                        if (x5) {
                            var o6 = _1z(z, 23, e, s, gg) || {}
                            var cur_globalf = gg.f
                            b3.wxXCkey = 3
                            x5(o6, o6, b3, gg)
                            gg.f = cur_globalf
                        } else _w(o4, x[18], 1, 6269)
                    }
                    e2.wxXCkey = 1
                }
                cW.wxXCkey = 1
            }
            oB.wxXCkey = 1
            xC.wxXCkey = 1
        } catch (err) {
            p_[b] = false
            throw err
        }
        p_[b] = false
        return r
    }
    d_[x[18]]["preShopInfo"] = function(e, s, r, gg) {
        var z = gz$gwx12_12()
        var b = x[18] + ':preShopInfo'
        r.wxVkey = b
        gg.f = $gdc(f_["./pages/goods/detail/template/activity-info22b946a4.wxml"], "", 1)
        if (p_[b]) {
            _wl(b, x[18]);
            return
        }
        p_[b] = true
        try {
            var oB = _v()
            _(r, oB)
            if (_oz(z, 26, e, s, gg)) {
                oB.wxVkey = 1
                var xC = _n('view')
                _rz(z, xC, 'class', 27, e, s, gg)
                var oD = _v()
                _(xC, oD)
                if (_oz(z, 28, e, s, gg)) {
                    oD.wxVkey = 1
                    var fE = _v()
                    _(oD, fE)
                    if (_oz(z, 29, e, s, gg)) {
                        fE.wxVkey = 1
                    }
                    fE.wxXCkey = 1
                } else {
                    oD.wxVkey = 2
                    var cF = _v()
                    _(oD, cF)
                    if (_oz(z, 30, e, s, gg)) {
                        cF.wxVkey = 1
                    }
                    cF.wxXCkey = 1
                }
                oD.wxXCkey = 1
                _(oB, xC)
            }
            oB.wxXCkey = 1
        } catch (err) {
            p_[b] = false
            throw err
        }
        p_[b] = false
        return r
    }
    var m11 = function(e, s, r, gg) {
        var z = gz$gwx12_12()
        return r
    }
    e_[x[18]] = {
        f: m11,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    d_[x[19]] = {}
    d_[x[19]]["energyInfo"] = function(e, s, r, gg) {
        var z = gz$gwx12_13()
        var b = x[19] + ':energyInfo'
        r.wxVkey = b
        gg.f = $gdc(f_["./pages/goods/detail/template/energyInfo70fbecb6.wxml"], "", 1)
        if (p_[b]) {
            _wl(b, x[19]);
            return
        }
        p_[b] = true
        try {
            var oB = _v()
            _(r, oB)
            if (_oz(z, 1, e, s, gg)) {
                oB.wxVkey = 1
            }
            oB.wxXCkey = 1
        } catch (err) {
            p_[b] = false
            throw err
        }
        p_[b] = false
        return r
    }
    var m12 = function(e, s, r, gg) {
        var z = gz$gwx12_13()
        return r
    }
    e_[x[19]] = {
        f: m12,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    d_[x[20]] = {}
    d_[x[20]]["freshRoastedNewReleasedTime"] = function(e, s, r, gg) {
        var z = gz$gwx12_14()
        var b = x[20] + ':freshRoastedNewReleasedTime'
        r.wxVkey = b
        gg.f = $gdc(f_["./pages/goods/detail/template/freshRoastedNewReleasedTime53bf7c88.wxml"], "", 1)
        if (p_[b]) {
            _wl(b, x[20]);
            return
        }
        p_[b] = true
        try {
            var oB = _v()
            _(r, oB)
            if (_oz(z, 1, e, s, gg)) {
                oB.wxVkey = 1
            }
            oB.wxXCkey = 1
        } catch (err) {
            p_[b] = false
            throw err
        }
        p_[b] = false
        return r
    }
    var m13 = function(e, s, r, gg) {
        var z = gz$gwx12_14()
        return r
    }
    e_[x[20]] = {
        f: m13,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    d_[x[21]] = {}
    d_[x[21]]["limitedInfo"] = function(e, s, r, gg) {
        var z = gz$gwx12_15()
        var b = x[21] + ':limitedInfo'
        r.wxVkey = b
        gg.f = $gdc(f_["./pages/goods/detail/template/limited-info5b3b332a.wxml"], "", 1)
        if (p_[b]) {
            _wl(b, x[21]);
            return
        }
        p_[b] = true
        try {
            var xC = _n('view')
            _rz(z, xC, 'class', 1, e, s, gg)
            var oD = _n('view')
            _rz(z, oD, 'class', 2, e, s, gg)
            var hG = _n('view')
            _rz(z, hG, 'class', 3, e, s, gg)
            var oH = _v()
            _(hG, oH)
            if (_oz(z, 4, e, s, gg)) {
                oH.wxVkey = 1
            }
            var cI = _v()
            _(hG, cI)
            if (_oz(z, 5, e, s, gg)) {
                cI.wxVkey = 1
            }
            oH.wxXCkey = 1
            cI.wxXCkey = 1
            _(oD, hG)
            var fE = _v()
            _(oD, fE)
            if (_oz(z, 6, e, s, gg)) {
                fE.wxVkey = 1
            }
            var cF = _v()
            _(oD, cF)
            if (_oz(z, 7, e, s, gg)) {
                cF.wxVkey = 1
            }
            fE.wxXCkey = 1
            cF.wxXCkey = 1
            _(xC, oD)
            var oJ = _n('view')
            _rz(z, oJ, 'class', 8, e, s, gg)
            var lK = _v()
            _(oJ, lK)
            if (_oz(z, 9, e, s, gg)) {
                lK.wxVkey = 1
                var aL = _mz(z, 'count-down', ['bindcountDownOver', 10, 'format', 1, 'id', 2, 'scene', 3, 'second', 4, 'timeStyle', 5, 'uid', 6, 'unitStyle', 7], [], e, s, gg)
                _(lK, aL)
            } else {
                lK.wxVkey = 2
                var tM = _mz(z, 'count-down', ['bindcountDownOver', 18, 'format', 1, 'id', 2, 'scene', 3, 'second', 4, 'timeStyle', 5, 'uid', 6, 'unitStyle', 7], [], e, s, gg)
                _(lK, tM)
            }
            lK.wxXCkey = 1
            lK.wxXCkey = 3
            lK.wxXCkey = 3
            _(xC, oJ)
            _(r, xC)
            var oB = _v()
            _(r, oB)
            if (_oz(z, 26, e, s, gg)) {
                oB.wxVkey = 1
            }
            oB.wxXCkey = 1
        } catch (err) {
            p_[b] = false
            throw err
        }
        p_[b] = false
        return r
    }
    var m14 = function(e, s, r, gg) {
        var z = gz$gwx12_15()
        return r
    }
    e_[x[21]] = {
        f: m14,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    d_[x[22]] = {}
    d_[x[22]]["preInfo"] = function(e, s, r, gg) {
        var z = gz$gwx12_16()
        var b = x[22] + ':preInfo'
        r.wxVkey = b
        gg.f = $gdc(f_["./pages/goods/detail/template/pre-info7cf82b34.wxml"], "", 1)
        if (p_[b]) {
            _wl(b, x[22]);
            return
        }
        p_[b] = true
        try {
            var xC = _n('view')
            _rz(z, xC, 'class', 1, e, s, gg)
            var oD = _v()
            _(xC, oD)
            if (_oz(z, 2, e, s, gg)) {
                oD.wxVkey = 1
            }
            var fE = _v()
            _(xC, fE)
            if (_oz(z, 3, e, s, gg)) {
                fE.wxVkey = 1
                var cF = _n('view')
                _rz(z, cF, 'class', 4, e, s, gg)
                var hG = _v()
                _(cF, hG)
                if (_oz(z, 5, e, s, gg)) {
                    hG.wxVkey = 1
                    var oH = _mz(z, 'count-down', ['bindcountDownOver', 6, 'format', 1, 'id', 2, 'scene', 3, 'second', 4, 'showDay', 5, 'timeStyle', 6, 'uid', 7, 'unitStyle', 8], [], e, s, gg)
                    _(hG, oH)
                } else {
                    hG.wxVkey = 2
                    var cI = _mz(z, 'count-down', ['bindcountDownOver', 15, 'format', 1, 'id', 2, 'scene', 3, 'second', 4, 'showDay', 5, 'timeStyle', 6, 'uid', 7, 'unitStyle', 8], [], e, s, gg)
                    _(hG, cI)
                }
                hG.wxXCkey = 1
                hG.wxXCkey = 3
                hG.wxXCkey = 3
                _(fE, cF)
            }
            oD.wxXCkey = 1
            fE.wxXCkey = 1
            fE.wxXCkey = 3
            _(r, xC)
            var oB = _v()
            _(r, oB)
            if (_oz(z, 24, e, s, gg)) {
                oB.wxVkey = 1
            }
            oB.wxXCkey = 1
        } catch (err) {
            p_[b] = false
            throw err
        }
        p_[b] = false
        return r
    }
    var m15 = function(e, s, r, gg) {
        var z = gz$gwx12_16()
        return r
    }
    e_[x[22]] = {
        f: m15,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    d_[x[23]] = {}
    d_[x[23]]["preferentialZone"] = function(e, s, r, gg) {
        var z = gz$gwx12_17()
        var b = x[23] + ':preferentialZone'
        r.wxVkey = b
        gg.f = $gdc(f_["./pages/goods/detail/template/preferentialZone25f267f2.wxml"], "", 1)
        if (p_[b]) {
            _wl(b, x[23]);
            return
        }
        p_[b] = true
        try {
            var oB = _n('view')
            _rz(z, oB, 'class', 1, e, s, gg)
            var xC = _n('view')
            _rz(z, xC, 'class', 2, e, s, gg)
            var fE = _n('view')
            _rz(z, fE, 'class', 3, e, s, gg)
            var cF = _v()
            _(fE, cF)
            if (_oz(z, 4, e, s, gg)) {
                cF.wxVkey = 1
            }
            var hG = _v()
            _(fE, hG)
            if (_oz(z, 5, e, s, gg)) {
                hG.wxVkey = 1
            }
            cF.wxXCkey = 1
            hG.wxXCkey = 1
            _(xC, fE)
            var oD = _v()
            _(xC, oD)
            if (_oz(z, 6, e, s, gg)) {
                oD.wxVkey = 1
            }
            oD.wxXCkey = 1
            _(oB, xC)
            var oH = _n('view')
            _rz(z, oH, 'class', 7, e, s, gg)
            var cI = _v()
            _(oH, cI)
            if (_oz(z, 8, e, s, gg)) {
                cI.wxVkey = 1
                var oJ = _mz(z, 'count-down', ['bindcountDownOver', 9, 'format', 1, 'id', 2, 'scene', 3, 'second', 4, 'timeStyle', 5, 'uid', 6, 'unitStyle', 7], [], e, s, gg)
                _(cI, oJ)
            } else {
                cI.wxVkey = 2
                var lK = _mz(z, 'count-down', ['bindcountDownOver', 17, 'format', 1, 'id', 2, 'scene', 3, 'second', 4, 'timeStyle', 5, 'uid', 6, 'unitStyle', 7], [], e, s, gg)
                _(cI, lK)
            }
            cI.wxXCkey = 1
            cI.wxXCkey = 3
            cI.wxXCkey = 3
            _(oB, oH)
            _(r, oB)
        } catch (err) {
            p_[b] = false
            throw err
        }
        p_[b] = false
        return r
    }
    var m16 = function(e, s, r, gg) {
        var z = gz$gwx12_17()
        return r
    }
    e_[x[23]] = {
        f: m16,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    d_[x[24]] = {}
    d_[x[24]]["shopInfo"] = function(e, s, r, gg) {
        var z = gz$gwx12_18()
        var b = x[24] + ':shopInfo'
        r.wxVkey = b
        gg.f = $gdc(f_["./pages/goods/detail/template/shop-info629e3acb.wxml"], "", 1)
        if (p_[b]) {
            _wl(b, x[24]);
            return
        }
        p_[b] = true
        try {
            var oB = _v()
            _(r, oB)
            if (_oz(z, 1, e, s, gg)) {
                oB.wxVkey = 1
                var xC = _n('view')
                _rz(z, xC, 'class', 2, e, s, gg)
                var oD = _v()
                _(xC, oD)
                if (_oz(z, 3, e, s, gg)) {
                    oD.wxVkey = 1
                    var fE = _n('view')
                    var cF = _v()
                    _(fE, cF)
                    if (_oz(z, 4, e, s, gg)) {
                        cF.wxVkey = 1
                    }
                    var hG = _v()
                    _(fE, hG)
                    if (_oz(z, 5, e, s, gg)) {
                        hG.wxVkey = 1
                    }
                    cF.wxXCkey = 1
                    hG.wxXCkey = 1
                    _(oD, fE)
                } else {
                    oD.wxVkey = 2
                }
                oD.wxXCkey = 1
                _(oB, xC)
            }
            oB.wxXCkey = 1
        } catch (err) {
            p_[b] = false
            throw err
        }
        p_[b] = false
        return r
    }
    var m17 = function(e, s, r, gg) {
        var z = gz$gwx12_18()
        return r
    }
    e_[x[24]] = {
        f: m17,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    if (path && e_[path]) {
        return function(env, dd, global) {
            $gwxc = 0;
            var root = {
                "tag": "wx-page"
            };
            root.children = []
            var main = e_[path].f
            if (typeof global === "undefined") global = {};
            global.f = $gdc(f_[path], "", 1);
            try {
                main(env, {}, root, global);
                _tsd(root)
            } catch (err) {
                console.log(err)
            }
            return root;
        }
    }
}
__wxAppCode__['pages/goods/detail/components/goods-evaluate/index.json'] = {
    "component": true,
    "usingComponents": {
        "star": "/pages/goods/detail/components/star/index",
        "std-authorization": "/components/authorization/index",
        "v-custom-page": "/components/v-custom-page/index"
    },
    "componentPlaceholder": {
        "cell": "view",
        "lottery": "view",
        "love-dining": "view",
        "love-donate": "view",
        "material-cell": "view",
        "merc-list": "view",
        "pullNewList": "view",
        "send-coupon": "view"
    }
};
if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/goods/detail/components/goods-evaluate/index.wxml'] = [$gwx12, './pages/goods/detail/components/goods-evaluate/index.wxml'];
else __wxAppCode__['pages/goods/detail/components/goods-evaluate/index.wxml'] = $gwx12('./pages/goods/detail/components/goods-evaluate/index.wxml');
__wxAppCode__['pages/goods/detail/components/goods-package-base-combined/index.json'] = {
    "component": true,
    "usingComponents": {
        "goods-sku": "/components/goods-sku/index",
        "std-authorization": "/components/authorization/index",
        "v-custom-page": "/components/v-custom-page/index"
    },
    "componentPlaceholder": {
        "cell": "view",
        "lottery": "view",
        "love-dining": "view",
        "love-donate": "view",
        "material-cell": "view",
        "merc-list": "view",
        "pullNewList": "view",
        "send-coupon": "view"
    }
};
if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/goods/detail/components/goods-package-base-combined/index.wxml'] = [$gwx12, './pages/goods/detail/components/goods-package-base-combined/index.wxml'];
else __wxAppCode__['pages/goods/detail/components/goods-package-base-combined/index.wxml'] = $gwx12('./pages/goods/detail/components/goods-package-base-combined/index.wxml');
__wxAppCode__['pages/goods/detail/components/goods-package-base-info/index.json'] = {
    "component": true,
    "usingComponents": {
        "std-authorization": "/components/authorization/index",
        "v-custom-page": "/components/v-custom-page/index"
    },
    "componentPlaceholder": {
        "cell": "view",
        "lottery": "view",
        "love-dining": "view",
        "love-donate": "view",
        "material-cell": "view",
        "merc-list": "view",
        "pullNewList": "view",
        "send-coupon": "view"
    }
};
if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/goods/detail/components/goods-package-base-info/index.wxml'] = [$gwx12, './pages/goods/detail/components/goods-package-base-info/index.wxml'];
else __wxAppCode__['pages/goods/detail/components/goods-package-base-info/index.wxml'] = $gwx12('./pages/goods/detail/components/goods-package-base-info/index.wxml');
__wxAppCode__['pages/goods/detail/components/goods-package-free-combined/components/goods-list/index.json'] = {
    "component": true,
    "usingComponents": {
        "qm-stepper": "/components/stepper/index",
        "goods-sku": "/components/goods-sku/index",
        "std-authorization": "/components/authorization/index",
        "v-custom-page": "/components/v-custom-page/index"
    },
    "componentPlaceholder": {
        "cell": "view",
        "lottery": "view",
        "love-dining": "view",
        "love-donate": "view",
        "material-cell": "view",
        "merc-list": "view",
        "pullNewList": "view",
        "send-coupon": "view"
    }
};
if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/goods/detail/components/goods-package-free-combined/components/goods-list/index.wxml'] = [$gwx12, './pages/goods/detail/components/goods-package-free-combined/components/goods-list/index.wxml'];
else __wxAppCode__['pages/goods/detail/components/goods-package-free-combined/components/goods-list/index.wxml'] = $gwx12('./pages/goods/detail/components/goods-package-free-combined/components/goods-list/index.wxml');
__wxAppCode__['pages/goods/detail/components/goods-package-free-combined/index.json'] = {
    "component": true,
    "usingComponents": {
        "goods-list": "/pages/goods/detail/components/goods-package-free-combined/components/goods-list/index",
        "std-authorization": "/components/authorization/index",
        "v-custom-page": "/components/v-custom-page/index"
    },
    "componentPlaceholder": {
        "cell": "view",
        "lottery": "view",
        "love-dining": "view",
        "love-donate": "view",
        "material-cell": "view",
        "merc-list": "view",
        "pullNewList": "view",
        "send-coupon": "view"
    }
};
if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/goods/detail/components/goods-package-free-combined/index.wxml'] = [$gwx12, './pages/goods/detail/components/goods-package-free-combined/index.wxml'];
else __wxAppCode__['pages/goods/detail/components/goods-package-free-combined/index.wxml'] = $gwx12('./pages/goods/detail/components/goods-package-free-combined/index.wxml');
__wxAppCode__['pages/goods/detail/components/goods-package-price/index.json'] = {
    "component": true,
    "usingComponents": {
        "std-authorization": "/components/authorization/index",
        "v-custom-page": "/components/v-custom-page/index"
    },
    "componentPlaceholder": {
        "cell": "view",
        "lottery": "view",
        "love-dining": "view",
        "love-donate": "view",
        "material-cell": "view",
        "merc-list": "view",
        "pullNewList": "view",
        "send-coupon": "view"
    }
};
if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/goods/detail/components/goods-package-price/index.wxml'] = [$gwx12, './pages/goods/detail/components/goods-package-price/index.wxml'];
else __wxAppCode__['pages/goods/detail/components/goods-package-price/index.wxml'] = $gwx12('./pages/goods/detail/components/goods-package-price/index.wxml');
__wxAppCode__['pages/goods/detail/components/goods-state/index.json'] = {
    "component": true,
    "usingComponents": {
        "std-authorization": "/components/authorization/index",
        "v-custom-page": "/components/v-custom-page/index"
    },
    "componentPlaceholder": {
        "cell": "view",
        "lottery": "view",
        "love-dining": "view",
        "love-donate": "view",
        "material-cell": "view",
        "merc-list": "view",
        "pullNewList": "view",
        "send-coupon": "view"
    }
};
if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/goods/detail/components/goods-state/index.wxml'] = [$gwx12, './pages/goods/detail/components/goods-state/index.wxml'];
else __wxAppCode__['pages/goods/detail/components/goods-state/index.wxml'] = $gwx12('./pages/goods/detail/components/goods-state/index.wxml');
__wxAppCode__['pages/goods/detail/components/shop-change-popup/index.json'] = {
    "component": true,
    "usingComponents": {
        "qm-popup": "/components/popup/index",
        "std-authorization": "/components/authorization/index",
        "v-custom-page": "/components/v-custom-page/index"
    },
    "componentPlaceholder": {
        "cell": "view",
        "lottery": "view",
        "love-dining": "view",
        "love-donate": "view",
        "material-cell": "view",
        "merc-list": "view",
        "pullNewList": "view",
        "send-coupon": "view"
    }
};
if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/goods/detail/components/shop-change-popup/index.wxml'] = [$gwx12, './pages/goods/detail/components/shop-change-popup/index.wxml'];
else __wxAppCode__['pages/goods/detail/components/shop-change-popup/index.wxml'] = $gwx12('./pages/goods/detail/components/shop-change-popup/index.wxml');
__wxAppCode__['pages/goods/detail/components/star/index.json'] = {
    "component": true,
    "usingComponents": {
        "std-authorization": "/components/authorization/index",
        "v-custom-page": "/components/v-custom-page/index"
    },
    "componentPlaceholder": {
        "cell": "view",
        "lottery": "view",
        "love-dining": "view",
        "love-donate": "view",
        "material-cell": "view",
        "merc-list": "view",
        "pullNewList": "view",
        "send-coupon": "view"
    }
};
if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/goods/detail/components/star/index.wxml'] = [$gwx12, './pages/goods/detail/components/star/index.wxml'];
else __wxAppCode__['pages/goods/detail/components/star/index.wxml'] = $gwx12('./pages/goods/detail/components/star/index.wxml');
__wxAppCode__['pages/goods/detail/components/swiper-goods-image/index.json'] = {
    "component": true,
    "usingComponents": {
        "std-authorization": "/components/authorization/index",
        "v-custom-page": "/components/v-custom-page/index"
    },
    "componentPlaceholder": {
        "cell": "view",
        "lottery": "view",
        "love-dining": "view",
        "love-donate": "view",
        "material-cell": "view",
        "merc-list": "view",
        "pullNewList": "view",
        "send-coupon": "view"
    }
};
if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/goods/detail/components/swiper-goods-image/index.wxml'] = [$gwx12, './pages/goods/detail/components/swiper-goods-image/index.wxml'];
else __wxAppCode__['pages/goods/detail/components/swiper-goods-image/index.wxml'] = $gwx12('./pages/goods/detail/components/swiper-goods-image/index.wxml');
__wxAppCode__['pages/goods/detail/index.json'] = {
    "navigationStyle": "custom",
    "navigationBarTitleText": "",
    "usingComponents": {
        "goods-action": "/components/goods-action/index",
        "goods-cart-icon": "/components/goods-cart-icon/index",
        "goods-sku": "/components/goods-sku/index",
        "goods-cart": "/components/goods-cart/index",
        "navigation-bar": "/components/navigation-bar/index",
        "popup-activity": "/components/popup-activity/index",
        "swiper-goods-image": "/pages/goods/detail/components/swiper-goods-image/index",
        "goods-state": "/pages/goods/detail/components/goods-state/index",
        "shop-state": "/components/shop-state/index",
        "v-loading": "/components/v-loading/index",
        "v-error": "/components/error/index",
        "custom-rich-text": "/components/custom-rich-text/index",
        "qm-stepper": "/components/stepper/index",
        "goods-evaluate": "/pages/goods/detail/components/goods-evaluate/index",
        "count-down": "/components/count-down/index",
        "goods-package-base-info": "/pages/goods/detail/components/goods-package-base-info/index",
        "goods-package-base-combined": "/pages/goods/detail/components/goods-package-base-combined/index",
        "goods-package-free-combined": "/pages/goods/detail/components/goods-package-free-combined/index",
        "goods-package-price": "/pages/goods/detail/components/goods-package-price/index",
        "qm-popup": "/components/popup/index",
        "goods-sale-time": "/components/goods-sale-time/index",
        "shop-change-popup": "/pages/goods/detail/components/shop-change-popup/index",
        "std-authorization": "/components/authorization/index",
        "v-custom-page": "/components/v-custom-page/index"
    },
    "componentPlaceholder": {
        "cell": "view",
        "lottery": "view",
        "love-dining": "view",
        "love-donate": "view",
        "material-cell": "view",
        "merc-list": "view",
        "pullNewList": "view",
        "send-coupon": "view"
    }
};
if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/goods/detail/index.wxml'] = [$gwx12, './pages/goods/detail/index.wxml'];
else __wxAppCode__['pages/goods/detail/index.wxml'] = $gwx12('./pages/goods/detail/index.wxml');

__wxRoute = 'pages/goods/detail/components/goods-evaluate/index';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'pages/goods/detail/components/goods-evaluate/index.js';
define("pages/goods/detail/components/goods-evaluate/index.js", function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
    var e;
    (e = e || {}).webpackChunkbaking_microapp = require("../../../../../bundle.js"), (e.webpackChunkbaking_microapp = e.webpackChunkbaking_microapp || []).push([
        [14130], {
            28711: function() {},
            54330: function() {},
            31965: function() {},
            31229: function(e, t, o) {
                o.g.currentModuleId = "me94bfe24", o.g.currentCtor = Component, o.g.currentCtorType = "component", o.g.currentResourceType = "component", o.g.currentSrcMode = "wx", o(54330), o(70646), o(28711), o(31965)
            },
            70646: function(e, t, o) {
                "use strict";
                o.r(t);
                var a = o(63332),
                    n = o(24251),
                    r = o(71326),
                    u = o(67200);
                (0, a.LM)({
                    computed: {
                        colorTheme: () => u.store.getters.colorTheme,
                        designConfig: () => u.store.state.designConfig,
                        userId: () => u.store.getters.userId
                    },
                    properties: {
                        evaluate: {
                            type: Object,
                            value: null
                        },
                        showTitle: {
                            type: Boolean,
                            value: !1
                        },
                        showStoreReply: {
                            type: Boolean,
                            value: !0
                        },
                        showImageNum: {
                            type: Number,
                            value: 5
                        },
                        evaluateLength: {
                            type: String,
                            value: ""
                        },
                        showGoods: {
                            type: Boolean,
                            value: !0
                        },
                        showRadius: {
                            type: Boolean,
                            value: !0
                        },
                        showEvaluateStarVo: {
                            type: Boolean,
                            value: !1
                        },
                        onlyShowActiveStar: {
                            type: Boolean,
                            value: !1
                        },
                        speciesStatus: {
                            type: Boolean,
                            value: !1
                        },
                        styleNo: {
                            type: Number,
                            value: 1
                        }
                    },
                    data: {},
                    methods: {
                        noop() {}, toGoodsEvaluate() {
                            const {
                                evaluate: e
                            } = this;
                            e.goodsId && this.triggerEvent("toGoodsEvaluate", {
                                goodsId: e.goodsId
                            })
                        }, deleteEvaluate() {
                            const {
                                id: e,
                                orderNo: t
                            } = this.evaluate;
                            (0, r.iG)("", "确定删除该条评论么？").then(() => {
                                (0, n.tF)({
                                    id: e,
                                    orderNo: t
                                }).then(e => {
                                    e.status && ((0, r.Am)("删除成功"), this.triggerEvent("getList"))
                                }).catch(e => {
                                    const {
                                        errMsg: t
                                    } = e || {};
                                    t && (0, r.Am)(t)
                                })
                            })
                        }, previewImage(e) {
                            var t, o;
                            const {
                                current: n
                            } = e.currentTarget.dataset, r = (null == (t = null == this ? void 0 : this.evaluate) ? void 0 : t.evaluateImages) || (null == (o = null == this ? void 0 : this.evaluate) ? void 0 : o.postImageList);
                            r && r.length && a.ZP.previewImage({
                                current: n,
                                urls: r
                            })
                        }
                    }
                })
            }
        },
        function(e) {
            var t;
            t = 31229, e(e.s = t)
        }
    ]);
});
require("pages/goods/detail/components/goods-evaluate/index.js");
__wxRoute = 'pages/goods/detail/components/goods-package-base-combined/index';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'pages/goods/detail/components/goods-package-base-combined/index.js';
define("pages/goods/detail/components/goods-package-base-combined/index.js", function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
    var e;
    (e = e || {}).webpackChunkbaking_microapp = require("../../../../../bundle.js"), (e.webpackChunkbaking_microapp = e.webpackChunkbaking_microapp || []).push([
        [71322], {
            11888: function() {},
            35182: function() {},
            79825: function() {},
            86515: function(e, t, o) {
                o.g.currentModuleId = "m210f1053", o.g.currentCtor = Component, o.g.currentCtorType = "component", o.g.currentResourceType = "component", o.g.currentSrcMode = "wx", o(35182), o(8948), o(11888), o(79825)
            },
            8948: function(e, t, o) {
                "use strict";
                o.r(t);
                var n = o(63332),
                    r = o(81511);
                (0, n.LM)({
                    properties: {
                        list: {
                            type: Array,
                            value: []
                        },
                        styleNo: {
                            type: Number,
                            value: 1
                        }
                    },
                    data: {
                        showSKU: !1,
                        goodsSKU: null,
                        goodsIndex: -1,
                        showNum: 3
                    },
                    methods: {
                        handleSpecialMake(e) {
                            const t = e.currentTarget.dataset.item,
                                o = e.currentTarget.dataset.index;
                            this.$forceUpdate({
                                goodsSKU: (0, r.zd)(t),
                                goodsIndex: o,
                                showSKU: !0
                            })
                        }, hideSKU() {
                            this.$forceUpdate({
                                showSKU: !1
                            })
                        }, confirmSKU(e) {
                            this.triggerEvent("confirm", e.detail)
                        }, loadMore() {
                            let {
                                showNum: e,
                                list: t
                            } = this;
                            e = e == t.length ? 3 : t.length, this.$forceUpdate({
                                showNum: e
                            })
                        }
                    }
                })
            }
        },
        function(e) {
            var t;
            t = 86515, e(e.s = t)
        }
    ]);
});
require("pages/goods/detail/components/goods-package-base-combined/index.js");
__wxRoute = 'pages/goods/detail/components/goods-package-base-info/index';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'pages/goods/detail/components/goods-package-base-info/index.js';
define("pages/goods/detail/components/goods-package-base-info/index.js", function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
    var e;
    (e = e || {}).webpackChunkbaking_microapp = require("../../../../../bundle.js"), (e.webpackChunkbaking_microapp = e.webpackChunkbaking_microapp || []).push([
        [47241], {
            89335: function() {},
            8557: function() {},
            86257: function() {},
            72141: function(e, n, r) {
                r.g.currentModuleId = "me94fd26c", r.g.currentCtor = Component, r.g.currentCtorType = "component", r.g.currentResourceType = "component", r.g.currentSrcMode = "wx", r(8557), r(94419), r(89335), r(86257)
            },
            94419: function(e, n, r) {
                "use strict";
                r.r(n), (0, r(63332).LM)({
                    properties: {
                        goods: {
                            type: Object,
                            value: {}
                        },
                        styleNo: {
                            type: Number,
                            value: 1
                        }
                    }
                })
            }
        },
        function(e) {
            var n;
            n = 72141, e(e.s = n)
        }
    ]);
});
require("pages/goods/detail/components/goods-package-base-info/index.js");
__wxRoute = 'pages/goods/detail/components/goods-package-free-combined/components/goods-list/index';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'pages/goods/detail/components/goods-package-free-combined/components/goods-list/index.js';
define("pages/goods/detail/components/goods-package-free-combined/components/goods-list/index.js", function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
    var e;
    (e = e || {}).webpackChunkbaking_microapp = require("../../../../../../../bundle.js"), (e.webpackChunkbaking_microapp = e.webpackChunkbaking_microapp || []).push([
        [89998], {
            13931: function() {},
            78264: function() {},
            68255: function() {},
            82742: function(e, t, o) {
                o.g.currentModuleId = "m1c2113e2", o.g.currentCtor = Component, o.g.currentCtorType = "component", o.g.currentResourceType = "component", o.g.currentSrcMode = "wx", o(78264), o(9831), o(13931), o(68255)
            },
            9831: function(e, t, o) {
                "use strict";
                o.r(t);
                var s = o(63332),
                    d = o(81511),
                    i = o(71326),
                    r = o(67200),
                    c = Object.defineProperty,
                    a = Object.getOwnPropertySymbols,
                    n = Object.prototype.hasOwnProperty,
                    u = Object.prototype.propertyIsEnumerable,
                    h = (e, t, o) => t in e ? c(e, t, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: o
                    }) : e[t] = o,
                    l = (e, t) => {
                        for (var o in t || (t = {})) n.call(t, o) && h(e, o, t[o]);
                        if (a)
                            for (var o of a(t)) u.call(t, o) && h(e, o, t[o]);
                        return e
                    };
                (0, s.LM)({
                    computed: {
                        colorTheme: () => r.store.getters.colorTheme,
                        goodsCount: () => r.store.state.goodsCount
                    },
                    properties: {
                        list: {
                            type: Array,
                            value: []
                        },
                        trigger: {
                            type: String,
                            value: ""
                        },
                        styleType: {
                            type: String,
                            value: "middle"
                        },
                        buyGoodsNum: {
                            type: Number,
                            value: 1
                        },
                        maxBuyGoodsNum: {
                            type: Number,
                            value: 0
                        },
                        groupName: {
                            type: String,
                            value: ""
                        },
                        groupId: {
                            type: String,
                            value: ""
                        },
                        extra: {
                            type: Object,
                            value: {}
                        },
                        styleNo: {
                            type: Number,
                            value: 1
                        }
                    },
                    watch: {
                        list: {
                            handler(e) {
                                this._init(e)
                            }, immediate: !0
                        },
                        trigger: {
                            handler() {}, immediate: !0
                        }
                    },
                    data: {
                        goodsList: [],
                        selectedGoods: [],
                        showSKU: !1,
                        goodsSKU: null,
                        goodsIndex: -1,
                        showNum: 6
                    },
                    methods: {
                        _init(e) {
                            this.$forceUpdate({
                                goodsList: e,
                                selectedGoods: e.filter(e => e.checked)
                            }), this._goodsListMap = {}, e.forEach(e => {
                                this._goodsListMap[`${e.combinedItemId}||${e.combinedItemSkuId}`] = e
                            })
                        }, selectGoods(e) {
                            const t = this._goodsListMap,
                                {
                                    selectedGoods: o,
                                    buyGoodsNum: s
                                } = this,
                                {
                                    item: r,
                                    index: c
                                } = e.currentTarget.dataset,
                                a = `${r.combinedItemId}||${r.combinedItemSkuId}`;
                            if (s <= 1)
                                for (const e in t)
                                    if (`${t[e].combinedItemId}||${t[e].combinedItemSkuId}` == a) {
                                        const o = t[e];
                                        !t[e].checked && (o.attachGoodsList && o.attachGoodsList.length || o.sortedPracticeList && o.sortedPracticeList.length) ? this.$forceUpdate({
                                            goodsSKU: (0, d.zd)(o),
                                            showSKU: !0,
                                            goodsIndex: c
                                        }) : t[e].checked = !t[e].checked
                                    } else t[e].checked = !1, t[e].qty = 1;
                            else if (r.checked) t[a].checked = !1, t[a].qty = 1;
                            else if (o.reduce((e, t) => e + t.qty, 0) < s) {
                                const e = t[a];
                                !t[a].checked && (e.attachGoodsList && e.attachGoodsList.length || e.sortedPracticeList && e.sortedPracticeList.length) ? this.$forceUpdate({
                                    goodsSKU: (0, d.zd)(e),
                                    showSKU: !0,
                                    goodsIndex: c
                                }) : t[a].checked = !r.checked
                            } else this.maxBuyGoodsNum ? (0, i.Am)(`${this.groupName}最多选${s}件哦`) : (0, i.Am)(`${this.groupName}只能选${s}件哦`), t[a].checked = !1, t[a].qty = 1;
                            this.triggerEvent("selectedGoods", l({
                                list: Object.values(this._goodsListMap)
                            }, this.extra))
                        }, handleGoodsPlus(e) {
                            const t = this._goodsListMap,
                                {
                                    maxBuyGoodsNum: o,
                                    selectedGoods: s,
                                    buyGoodsNum: d
                                } = this,
                                {
                                    goods: r
                                } = e.detail,
                                c = `${r.combinedItemId}||${r.combinedItemSkuId}`,
                                a = t[c].qty,
                                n = s.reduce((e, t) => e + t.qty, 0);
                            o > 0 && n < d ? (t[c].qty = a + 1, this.triggerEvent("selectedGoods", l({
                                list: Object.values(this._goodsListMap)
                            }, this.extra))) : (0, i.Am)(`${this.groupName}只能选${d}件哦`)
                        }, handleGoodsMinus(e) {
                            const t = this._goodsListMap,
                                {
                                    goods: o
                                } = e.detail,
                                s = `${o.combinedItemId}||${o.combinedItemSkuId}`,
                                d = t[s].qty;
                            d > 1 && (t[s].qty = d - 1, this.triggerEvent("selectedGoods", l({
                                list: Object.values(this._goodsListMap)
                            }, this.extra)))
                        }, handleSpecialMake(e) {
                            const t = e.currentTarget.dataset.item,
                                o = e.currentTarget.dataset.index;
                            this.$forceUpdate({
                                goodsSKU: (0, d.zd)(t),
                                goodsIndex: o,
                                showSKU: !0
                            })
                        }, hideSKU() {
                            this.$forceUpdate({
                                showSKU: !1
                            })
                        }, confirmSKU(e) {
                            this.triggerEvent("confirm", l(l({}, e.detail), this.extra))
                        }, loadMore() {
                            let {
                                showNum: e,
                                list: t
                            } = this;
                            e = e == t.length ? 6 : t.length, this.$forceUpdate({
                                showNum: e
                            })
                        }
                    }
                })
            }
        },
        function(e) {
            var t;
            t = 82742, e(e.s = t)
        }
    ]);
});
require("pages/goods/detail/components/goods-package-free-combined/components/goods-list/index.js");
__wxRoute = 'pages/goods/detail/components/goods-package-free-combined/index';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'pages/goods/detail/components/goods-package-free-combined/index.js';
define("pages/goods/detail/components/goods-package-free-combined/index.js", function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
    var e;
    (e = e || {}).webpackChunkbaking_microapp = require("../../../../../bundle.js"), (e.webpackChunkbaking_microapp = e.webpackChunkbaking_microapp || []).push([
        [18245], {
            37525: function() {},
            12476: function() {},
            25225: function() {},
            11117: function(e, t, r) {
                r.g.currentModuleId = "m66748f2e", r.g.currentCtor = Component, r.g.currentCtorType = "component", r.g.currentResourceType = "component", r.g.currentSrcMode = "wx", r(12476), r(95932), r(37525), r(25225)
            },
            95932: function(e, t, r) {
                "use strict";
                r.r(t);
                var n = r(63332),
                    o = r(88059),
                    i = r(67200);
                (0, n.LM)({
                    computed: {
                        colorTheme: () => i.store.getters.colorTheme
                    },
                    properties: {
                        groupList: {
                            type: Array,
                            value: []
                        },
                        styleNo: {
                            type: Number,
                            value: 1
                        }
                    },
                    watch: {
                        groupList: {
                            handler(e) {
                                this.$forceUpdate({
                                    list: e,
                                    trigger: (0, o.Vj)()
                                })
                            }, immediate: !0
                        }
                    },
                    data: {
                        list: [],
                        trigger: ""
                    },
                    methods: {
                        handleSelectedGoods(e) {
                            const {
                                list: t,
                                groupIndex: r
                            } = e.detail || {};
                            this.triggerEvent("select", {
                                list: t,
                                groupIndex: r
                            })
                        }, onConfirm(e) {
                            this.triggerEvent("confirm", e.detail)
                        }
                    }
                })
            }
        },
        function(e) {
            var t;
            t = 11117, e(e.s = t)
        }
    ]);
});
require("pages/goods/detail/components/goods-package-free-combined/index.js");
__wxRoute = 'pages/goods/detail/components/goods-package-price/index';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'pages/goods/detail/components/goods-package-price/index.js';
define("pages/goods/detail/components/goods-package-price/index.js", function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
    var e;
    (e = e || {}).webpackChunkbaking_microapp = require("../../../../../bundle.js"), (e.webpackChunkbaking_microapp = e.webpackChunkbaking_microapp || []).push([
        [54279], {
            66556: function() {},
            26870: function() {},
            46257: function() {},
            82262: function(e, o, n) {
                n.g.currentModuleId = "m147b3aea", n.g.currentCtor = Component, n.g.currentCtorType = "component", n.g.currentResourceType = "component", n.g.currentSrcMode = "wx", n(26870), n(93374), n(66556), n(46257)
            },
            93374: function(e, o, n) {
                "use strict";
                n.r(o);
                var t = n(63332),
                    r = n(67200);
                (0, t.LM)({
                    computed: {
                        colorTheme: () => r.store.getters.colorTheme
                    },
                    data: {
                        isShowMinBuy: void 0
                    },
                    properties: {
                        goodsDetail: {
                            type: Object,
                            value: null
                        },
                        goodsPackageMatchPrice: {
                            type: Number,
                            value: 0
                        }
                    },
                    watch: {
                        goodsDetail: {
                            handler(e) {
                                if (!e) return;
                                let o = !1;
                                const n = null == e ? void 0 : e.goodsLimit;
                                o = !!(null != n && n.isMinBuy && (null == n ? void 0 : n.minBuyNum) > 1), this.$forceUpdate({
                                    isShowMinBuy: o
                                })
                            }, immediate: !0
                        }
                    }
                })
            }
        },
        function(e) {
            var o;
            o = 82262, e(e.s = o)
        }
    ]);
});
require("pages/goods/detail/components/goods-package-price/index.js");
__wxRoute = 'pages/goods/detail/components/goods-state/index';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'pages/goods/detail/components/goods-state/index.js';
define("pages/goods/detail/components/goods-state/index.js", function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
    var n;
    (n = n || {}).webpackChunkbaking_microapp = require("../../../../../bundle.js"), (n.webpackChunkbaking_microapp = n.webpackChunkbaking_microapp || []).push([
        [83558], {
            22723: function() {},
            88472: function() {},
            18940: function() {},
            92306: function(n, e, r) {
                r.g.currentModuleId = "m1ff7b648", r.g.currentCtor = Component, r.g.currentCtorType = "component", r.g.currentResourceType = "component", r.g.currentSrcMode = "wx", r(88472), r(5853), r(22723), r(18940)
            },
            5853: function(n, e, r) {
                "use strict";
                r.r(e), (0, r(63332).LM)({
                    properties: {
                        offset: {
                            type: String,
                            value: "0rpx"
                        },
                        errorMessage: {
                            type: String,
                            value: ""
                        }
                    },
                    methods: {
                        handleConfirm() {
                            this.triggerEvent("confirm")
                        }
                    }
                })
            }
        },
        function(n) {
            var e;
            e = 92306, n(n.s = e)
        }
    ]);
});
require("pages/goods/detail/components/goods-state/index.js");
__wxRoute = 'pages/goods/detail/components/shop-change-popup/index';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'pages/goods/detail/components/shop-change-popup/index.js';
define("pages/goods/detail/components/shop-change-popup/index.js", function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
    var e;
    (e = e || {}).webpackChunkbaking_microapp = require("../../../../../bundle.js"), (e.webpackChunkbaking_microapp = e.webpackChunkbaking_microapp || []).push([
        [63949], {
            33468: function() {},
            7139: function() {},
            10001: function() {},
            61288: function(e, o, t) {
                t.g.currentModuleId = "m75c5e670", t.g.currentCtor = Component, t.g.currentCtorType = "component", t.g.currentResourceType = "component", t.g.currentSrcMode = "wx", t(7139), t(19888), t(33468), t(10001)
            },
            19888: function(e, o, t) {
                "use strict";
                t.r(o);
                var r = t(63332),
                    p = t(69308),
                    n = t(74576),
                    c = t(67200);
                (0, r.LM)({
                    computed: {
                        colorTheme: () => c.store.getters.colorTheme,
                        shop: () => c.store.state.shop
                    },
                    properties: {
                        trigger: {
                            type: String,
                            value: ""
                        },
                        preShopName: {
                            type: String,
                            value: ""
                        }
                    },
                    watch: {
                        trigger: {
                            handler(e) {
                                e && this.openPopup()
                            }, immediate: !0
                        }
                    },
                    data: {
                        isShowPop: !1
                    },
                    methods: {
                        closePopup() {
                            this.$forceUpdate({
                                isShowPop: !1
                            })
                        }, openPopup() {
                            this.$forceUpdate({
                                isShowPop: !0
                            })
                        }, navToShopList() {
                            const e = (0, p.s0)();
                            this.closePopup(), this.triggerEvent("navToShopList"), (0, n.T8)(e + "?back=1")
                        }
                    }
                })
            }
        },
        function(e) {
            var o;
            o = 61288, e(e.s = o)
        }
    ]);
});
require("pages/goods/detail/components/shop-change-popup/index.js");
__wxRoute = 'pages/goods/detail/components/star/index';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'pages/goods/detail/components/star/index.js';
define("pages/goods/detail/components/star/index.js", function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
    var e;
    (e = e || {}).webpackChunkbaking_microapp = require("../../../../../bundle.js"), (e.webpackChunkbaking_microapp = e.webpackChunkbaking_microapp || []).push([
        [97387], {
            44401: function() {},
            17882: function() {},
            89072: function() {},
            14256: function(e, t, r) {
                r.g.currentModuleId = "me80f02e8", r.g.currentCtor = Component, r.g.currentCtorType = "component", r.g.currentResourceType = "component", r.g.currentSrcMode = "wx", r(17882), r(28660), r(44401), r(89072)
            },
            28660: function(e, t, r) {
                "use strict";
                r.r(t);
                var a = r(63332),
                    n = r(67200);
                (0, a.LM)({
                    computed: {
                        colorTheme: () => n.store.getters.colorTheme
                    },
                    properties: {
                        activetyNum: {
                            type: Number,
                            value: 0
                        },
                        isShow: {
                            type: Boolean,
                            value: !1
                        },
                        title: {
                            type: String,
                            value: ""
                        },
                        type: {
                            type: String,
                            value: ""
                        },
                        size: {
                            type: String,
                            value: "48rpx"
                        },
                        padding: {
                            type: String,
                            value: "28rpx"
                        },
                        onlyShowActiveStar: {
                            type: Boolean,
                            value: !1
                        }
                    },
                    watch: {
                        activetyNum: {
                            handler(e) {
                                if (!e) return;
                                let {
                                    star: t,
                                    onlyShowActiveStar: r
                                } = this;
                                r && (t = t.slice(0, e)), t.forEach((t, r) => {
                                    t.active = r < e
                                }), this.$forceUpdate({
                                    star: t
                                })
                            }, immediate: !0
                        }
                    },
                    data: {
                        star: [{
                            num: 1,
                            active: !1
                        }, {
                            num: 2,
                            active: !1
                        }, {
                            num: 3,
                            active: !1
                        }, {
                            num: 4,
                            active: !1
                        }, {
                            num: 5,
                            active: !1
                        }]
                    },
                    methods: {
                        selectStar(e) {
                            const {
                                index: t
                            } = e.currentTarget.dataset, {
                                star: r,
                                isShow: a,
                                type: n
                            } = this;
                            a || (r.forEach((e, r) => {
                                e.active = 0 == t || (r == t ? !e.active : r < t)
                            }), this.$forceUpdate({
                                star: r
                            }, () => {
                                this.triggerEvent("getStar", {
                                    num: r[t].active ? r[t].num : t > 0 ? r[t - 1].num : 1,
                                    type: n
                                })
                            }))
                        }
                    }
                })
            }
        },
        function(e) {
            var t;
            t = 14256, e(e.s = t)
        }
    ]);
});
require("pages/goods/detail/components/star/index.js");
__wxRoute = 'pages/goods/detail/components/swiper-goods-image/index';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'pages/goods/detail/components/swiper-goods-image/index.js';
define("pages/goods/detail/components/swiper-goods-image/index.js", function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
    var e;
    (e = e || {}).webpackChunkbaking_microapp = require("../../../../../bundle.js"), (e.webpackChunkbaking_microapp = e.webpackChunkbaking_microapp || []).push([
        [27658], {
            36985: function() {},
            91571: function() {},
            86042: function() {},
            45414: function(e, t, r) {
                r.g.currentModuleId = "md75214a2", r.g.currentCtor = Component, r.g.currentCtorType = "component", r.g.currentResourceType = "component", r.g.currentSrcMode = "wx", r(91571), r(9792), r(36985), r(86042)
            },
            9792: function(e, t, r) {
                "use strict";
                r.r(t);
                var n = r(63332),
                    p = r(39224),
                    i = r(67200);
                (0, n.LM)({
                    computed: {
                        isSupportWebp: () => i.store.state.isSupportWebp
                    },
                    properties: {
                        list: {
                            type: Array,
                            value: []
                        },
                        height: {
                            type: String,
                            value: "750rpx"
                        },
                        dotStyle: {
                            type: String,
                            value: ""
                        },
                        swiperClass: {
                            type: String,
                            value: ""
                        }
                    },
                    data: {
                        current: 0
                    },
                    methods: {
                        onSwiperChange(e) {
                            const {
                                current: t
                            } = e.detail || {}, {
                                list: r
                            } = this || {}, n = r && r.length ? r.length : 1;
                            this.$forceUpdate({
                                current: t % n
                            })
                        }, previewImage(e) {
                            (0, p.EO)(this.list, e.currentTarget.dataset.index)
                        }
                    }
                })
            }
        },
        function(e) {
            var t;
            t = 45414, e(e.s = t)
        }
    ]);
});
require("pages/goods/detail/components/swiper-goods-image/index.js");
__wxRoute = 'pages/goods/detail/index';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'pages/goods/detail/index.js';
define("pages/goods/detail/index.js", function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
    var e;
    (e = e || {}).webpackChunkbaking_microapp = require("../../../bundle.js"), (e.webpackChunkbaking_microapp = e.webpackChunkbaking_microapp || []).push([
        [62268], {
            91247: function() {},
            78395: function() {},
            20697: function() {},
            41413: function(e, t, o) {
                o.g.currentModuleId = "m0beb797c", o.g.currentCtor = Page, o.g.currentCtorType = "page", o.g.currentResourceType = "page", o.g.currentSrcMode = "wx", o(91247), o(78395), o(735), o(20697)
            },
            735: function(e, t, o) {
                "use strict";
                o.r(t);
                var s = o(63332),
                    i = o(78104),
                    a = o(88059),
                    r = o(93930),
                    n = o(60215),
                    d = o(69308),
                    c = o(61086),
                    l = o(50193),
                    h = o(28419),
                    p = o(58008),
                    u = o(24251),
                    g = o(81511),
                    m = o(32779),
                    y = o(24854),
                    f = o(26710),
                    I = o(84755),
                    S = o(71326),
                    P = o(80446),
                    v = o(39224),
                    C = o(59210),
                    T = o(7097),
                    b = o(74576),
                    D = o(69646),
                    k = o(67200),
                    w = Object.defineProperty,
                    A = Object.defineProperties,
                    L = Object.getOwnPropertyDescriptors,
                    G = Object.getOwnPropertySymbols,
                    U = Object.prototype.hasOwnProperty,
                    $ = Object.prototype.propertyIsEnumerable,
                    x = (e, t, o) => t in e ? w(e, t, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: o
                    }) : e[t] = o,
                    M = (e, t) => {
                        for (var o in t || (t = {})) U.call(t, o) && x(e, o, t[o]);
                        if (G)
                            for (var o of G(t)) $.call(t, o) && x(e, o, t[o]);
                        return e
                    },
                    _ = (e, t) => A(e, L(t)),
                    E = (e, t, o) => new Promise((s, i) => {
                        var a = e => {
                                try {
                                    n(o.next(e))
                                } catch (e) {
                                    i(e)
                                }
                            },
                            r = e => {
                                try {
                                    n(o.throw(e))
                                } catch (e) {
                                    i(e)
                                }
                            },
                            n = e => e.done ? s(e.value) : Promise.resolve(e.value).then(a, r);
                        n((o = o.apply(e, t)).next())
                    });
                (0, s.D4)({
                    computed: {
                        carts: () => k.store.state.carts,
                        cakeGoodsLimit: () => k.store.getters.cakeGoodsLimit,
                        shopName: () => k.store.getters.shopName,
                        userCart: () => k.store.state.userCart,
                        isShowSales: () => k.store.state.designConfig.isShowSales,
                        isShopOpend: () => k.store.getters.isShopOpend,
                        isShopClosed: () => k.store.getters.isShopClosed,
                        isShowInventory: () => k.store.state.designConfig.isShowInventory,
                        mobile: () => k.store.state.userInfo.mobile,
                        beforePickupTime: () => k.store.state.beforePickupTime,
                        limitedTimeDiscountSource: () => k.store.state.limitedTimeDiscountSource,
                        isReplaceSell: () => k.store.state.isReplaceSell,
                        preSaleActiveId: () => k.store.state.preSaleActiveId,
                        shopId: () => k.store.getters.shopId,
                        shop: () => k.store.state.shop,
                        address: () => k.store.state.address,
                        shopCart: () => k.store.state.shopCart,
                        isAuth: () => k.store.state.isAuth,
                        colorTheme: () => k.store.getters.colorTheme,
                        userInfo: () => k.store.state.userInfo,
                        designConfig: () => k.store.state.designConfig,
                        saleType: () => k.store.state.saleType,
                        isFreshlyBaked: () => k.store.state.isFreshlyBaked,
                        goodsTemplateStyle: () => k.store.state.goodsTemplateStyle,
                        selectedCount: () => k.store.state.carts.selectedCount,
                        count: () => k.store.state.carts.count,
                        showPayMemberRights() {
                            const {
                                isFromMall: e,
                                mallData: t
                            } = this, o = e ? t : k.store.state.designConfig, {
                                goodsTags: s
                            } = o || {}, {
                                payMemberRights: i
                            } = s || {};
                            return !i
                        },
                        styleNo: () => k.store.state.goodsTemplateStyle || 2,
                        operateStatusCode: () => k.store.getters.operateStatusCode,
                        isLimitTimePriceGoods() {
                            const {
                                goodsDetail: e
                            } = this, {
                                isLimitTimePrice: t,
                                discountActivityId: o
                            } = e || {};
                            return !(!t || !o)
                        },
                        isScheduledTailingsCakereservation: () => "true" == (0, a.TW)("ScheduledTailingsCakereservation"),
                        errorMsg() {
                            const {
                                throwError: e
                            } = this, {
                                msg: t
                            } = e || {};
                            return t
                        },
                        lineUpProcessVo() {
                            const {
                                current: e
                            } = k.store.state.shop || {}, {
                                lineUpProcessVo: t
                            } = e || {};
                            return t
                        },
                        isHasEnergyOrHealth() {
                            const {
                                goodsDetail: e
                            } = this, {
                                recipes: t
                            } = e || {};
                            return !(!Array.isArray(t) || !t.length)
                        },
                        energyAndHealthData() {
                            let e = "",
                                t = "",
                                o = "",
                                s = "";
                            const {
                                goodsDetail: i
                            } = this, {
                                recipes: a,
                                unit: r
                            } = i || {};
                            if (Array.isArray(a) && a.length) {
                                const {
                                    energyValue: i,
                                    unit: n,
                                    gradingInstructions: d,
                                    gradingIdentification: c
                                } = a[0] || {};
                                e = i ? `≈${i||0}${n||""}` : "", r && e && (e = `${e}/${r}`), t = d || "", s = c, c && (c.includes("A") && (o = "https://images.qmai.cn/resource/20210824210816/2024/01/15/img_nutrition_A.png"), c.includes("B") && (o = "https://images.qmai.cn/resource/20210824210816/2024/01/15/health-img-B.png"), c.includes("C") && (o = "https://images.qmai.cn/resource/20210824210816/2024/01/15/health-img-C.png"), c.includes("D") && (o = "https://images.qmai.cn/resource/20210824210816/2024/01/15/health-img-D.png"))
                            }
                            return {
                                energyText: e,
                                gradingInstructionsText: t,
                                healthLevelImgs: o,
                                gradingIdentificationText: s
                            }
                        },
                        healthLevelImgs() {
                            const {
                                goodsDetail: e
                            } = this, {
                                recipes: t
                            } = e || {};
                            let o = "";
                            if (Array.isArray(t) && t.length) {
                                const {
                                    gradingIdentification: e
                                } = t[0] || {};
                                e && (e.includes("A") && (o = "https://images.qmai.cn/resource/20210824210816/2024/01/15/img_nutrition_A.png"), e.includes("B") && (o = "https://images.qmai.cn/resource/20210824210816/2024/01/15/health-img-B.png"), e.includes("C") && (o = "https://images.qmai.cn/resource/20210824210816/2024/01/15/health-img-C.png"), e.includes("D") && (o = "https://images.qmai.cn/resource/20210824210816/2024/01/15/health-img-D.png"))
                            }
                            return o
                        },
                        energyStyleData() {
                            const {
                                goodsDeatailDesignConfig: e
                            } = k.store.state, {
                                energyStyle: t,
                                energyImg: o,
                                energyText: s
                            } = e || {};
                            return {
                                energyStyle: t || 1,
                                energyImg: o || "",
                                energyText: s || "配方揭秘：装修配置文案"
                            }
                        },
                        isShowEquityCard() {
                            const {
                                userCart: e
                            } = k.store.state || {}, {
                                paidBenefitsCardRecommendVo: t
                            } = e || {}, {
                                preSaveMoney: o,
                                goodsDetailRecommendDesc: s,
                                goodsDetailRecommendSwitch: i
                            } = t || {}, {
                                preSale: a
                            } = this.goodsDetail || {};
                            return !a && (o || s) && i
                        },
                        energyBottom() {
                            const e = k.store.state.goodsTemplateStyle,
                                {
                                    isShowEquityCard: t
                                } = this;
                            let o = "bottom:24rpx;";
                            return 1 == e && (o = t ? "bottom:160rpx;" : "bottom:80rpx;"), o
                        },
                        freshRoastedData() {
                            const {
                                goodsDeatailDesignConfig: e
                            } = k.store.state, {
                                bakingPlanInfo: t,
                                bakingPlanInfoText: o
                            } = e || {};
                            return {
                                bakingPlanInfo: t,
                                bakingPlanInfoText: o || "新鲜出炉 当日现烤"
                            }
                        }
                    },
                    data: {
                        isAddCartShow: !0,
                        buttonTxt: "立即购买",
                        isLoad: !1,
                        uid: 0,
                        showSKU: !1,
                        triggerSkuConfirm: "",
                        goodsSKU: null,
                        showCart: !1,
                        goodsDetail: null,
                        buyScene: "",
                        activityInfo: null,
                        showPopupActivity: !1,
                        isShowLoading: !1,
                        throwError: null,
                        selectedGoods: [],
                        selectedPractice: [],
                        isFromMall: !1,
                        commentListTotal: "",
                        commentList: [],
                        goodsId: "",
                        goodsProperties: [],
                        selectedProperties: {},
                        time: "",
                        countDownEnd: !1,
                        isCheckGoodsLimit: !0,
                        baseCombinedSkuList: [],
                        freeCombinedSkuList: [],
                        freeCombinedGroupList: [],
                        allFreeCombinedGroupSelected: !0,
                        goodsPackageSpecialMakePrice: 0,
                        goodsPackageMatchPrice: 0,
                        enterpriseZone: null,
                        shareParams: "",
                        shareMaterialPic: "",
                        shareRemark: "",
                        preSaleId: 0,
                        entityId: 0,
                        animationTime: 0,
                        animationStatus: 0,
                        historyOrderList: [],
                        historyActive: 0,
                        evaluateLocation: 0,
                        shopCartImg: "",
                        timeDiscountActivityId: "",
                        stepList: ["#F3ECED", "#E9E3E4", "#E0DCDC", "#D6D4D4", "#CACBCA"],
                        reservationStatusList: [{
                            name: "等待预约",
                            desc: "预约后才有抢购资格哦~"
                        }, {
                            name: "预约中",
                            desc: "预约后才有抢购资格哦~"
                        }, {
                            name: "已预约",
                            desc: "请关注开抢时间及时抢购哦~"
                        }, {
                            name: "抢购中",
                            desc: "数量有限，先到先得哦~"
                        }],
                        reservationIndex: -1,
                        reservationPop: !1,
                        userPromoter: null,
                        posterView: void 0,
                        mallData: "",
                        preShopName: "",
                        shopChangeTrigger: "",
                        showSaleTimeGoods: null,
                        healthDescDialog: !1
                    },
                    onLoad() {
                        return E(this, arguments, (function*(e = {}) {
                            if (c.Z.notify("商品详情", {
                                    options: e
                                }),
                                yield (0, d.x1)(),
                                yield (0, d.bp)(), getApp().$on("dyCouponInfo", e => {
                                    this.dyCouponInfo = e
                                }), e.scene) {
                                c.Z.notify("商品详情scene", {
                                    scene: e.scene
                                });
                                const t =
                                    yield (0, i.P6)(e.scene).catch(a.ZT);
                                t && (t.id && (e.id = t.id), t.shopId && (e.shopId = t.shopId), t.from && (e.from = t.from), t.goodsId && (e.goodsId = t.goodsId), t.saleType && (e.saleType = t.saleType), t.entityId && (e.entityId = t.entityId), t.preSaleId && (e.preSaleId = t.preSaleId), t.mobile && t.promoteCode && t.promoterId && (c.Z.notify("推广员分享参数绑定商品详情二维码", {
                                    options: e,
                                    res: t,
                                    mobile: k.store.state.userInfo.mobile
                                }), this.originPromoter = t, this.bindUserRelation()), t.promoterGoodsId && (e.promoterGoodsId = t.promoterGoodsId), t.isFreshlyBaked && (e.isFreshlyBaked = t.isFreshlyBaked), t.isReplaceSell && (e.isReplaceSell = t.isReplaceSell))
                            }
                            this._options = e;
                            const {
                                pickUpCouponCardId: t,
                                from: o,
                                entityId: n,
                                preSaleId: l,
                                isFreshlyBaked: h,
                                isReplaceSell: p,
                                promote: u,
                                isGroupPurchase: g
                            } = e || {};
                            1 == h && (
                                yield k.store.dispatch("switchIsFreshlyBaked", h)), "1" == String(p) && (e.shopId || k.store.getters.shopId) && (k.store.getters.shopId || (
                                    yield k.store.dispatch("switchShop", e.shopId)),
                                yield k.store.dispatch("switchIsReplaceSell", 1)), e.promoterId && !u && (c.Z.notify("推广员分享参数绑定商品详情分享卡片", {
                                options: e,
                                mobile: k.store.state.userInfo.mobile
                            }), this.originPromoter = e, this.bindUserRelation());
                            try {
                                const e =
                                    yield (0, y.lN)();
                                this.userPromoter = e.data
                            } catch (e) {}
                            getApp().$once("goodsDetailPreload", e => {
                                let t = this.shopCartImg;
                                1 == k.store.state.isFreshlyBaked && (t = s.ZP.getStorageSync("shopCartImg") || "");
                                const o = (0, r.B$)(e);
                                this.$forceUpdate({
                                    enterpriseZone: e.enterpriseZone || null,
                                    goodsDetail: {
                                        pictureUrlList: e.pictureUrlList,
                                        showPriceLow: e.showPriceLow,
                                        name: e.name,
                                        title: e.title,
                                        totalSaleNum: e.totalSaleNum,
                                        type: e.type,
                                        totalInventory: e.totalInventory,
                                        detail: e.detail,
                                        isShow: e.isShow,
                                        lineThruoughPrice: o
                                    },
                                    goodsId: e.goodsId,
                                    shopCartImg: t
                                }, () => {
                                    this._fetchCommentList(), this._fetchCommentCountByGoods()
                                })
                            });
                            let m = !0;
                            (t || this.cakeGoodsLimit || g) && (m = !1), this.$forceUpdate({
                                isShowLoading: !this.goodsDetail,
                                uid: e.id || 0,
                                preSaleId: l || 0,
                                entityId: n || 0,
                                isFromMall: "mall" === o,
                                isAddCartShow: m,
                                isCheckGoodsLimit: !t,
                                buttonTxt: t ? "立即兑换" : "立即购买",
                                timeDiscountActivityId: e.timeDiscountActivityId || ""
                            }), this.init(), this.getValuateSettingVo(), (0, C._)(), l && !this.preSaleActiveId && (
                                yield k.store.dispatch("switchIsPreSaleActiveId", l))
                        }))
                    },
                    openAnimation() {
                        let {
                            animationStatus: e,
                            historyActive: t,
                            historyOrderList: o
                        } = this, s = 0;
                        switch (e) {
                            case 0:
                                e = 1, s = 500;
                                break;
                            case 1:
                                e = 2, s = 3e3;
                                break;
                            case 2:
                                t == o.length - 1 ? t = 0 : t++, e = 0, s = 1500
                        }
                        this.animationTime = setTimeout(() => {
                            this.$forceUpdate({
                                animationStatus: e,
                                historyActive: t
                            }), this.openAnimation()
                        }, s)
                    },
                    onShow() {
                        return E(this, null, (function*() {
                            this.isLoad && this.init()
                        }))
                    },
                    onUnload() {
                        return E(this, null, (function*() {
                            const {
                                isFreshlyBaked: e
                            } = this._options || {};
                            1 == e && this.isFreshlyBaked && (
                                yield k.store.dispatch("switchIsFreshlyBaked", ""));
                            const t = (0, T.ul)(1);
                            getApp() && (getApp().globalData.navigateBackRouter = (0, T.ul)()), "function" == typeof s.ZP.offCopyUrl && s.ZP.offCopyUrl(), clearTimeout(this.animationTime), this.preSaleActiveId && -1 == t.indexOf("subPages/preSale/list/index") && (
                                yield k.store.dispatch("switchIsPreSaleActiveId", "")), getApp().$off("dyCouponInfo")
                        }))
                    },
                    onShareAppMessage() {
                        return E(this, null, (function*() {
                            const {
                                shareParams: e
                            } = this || {};
                            let t = "",
                                o = this.shareRemark;
                            return this.goodsDetail.preSale && (o = this.goodsDetail.preSale.goods.shareText || this.goodsDetail.preSale.goods.goodsName, t =
                                yield this.drawPoster()), c.Z.notify("测试分享数据", {
                                shareParams: e
                            }), {
                                title: o,
                                bgImgUrl: this.shareMaterialPic,
                                imageUrl: t || this.shareMaterialPic,
                                path: "/pages/goods/detail/index?" + e
                            }
                        }))
                    },
                    init() {
                        return E(this, null, (function*() {
                            const {
                                isFromMall: e
                            } = this;
                            try {
                                e ? (
                                    yield this.initMallScene(), this.fetchMallDesignConfig()) : (
                                    yield (0, d.bp)(),
                                    yield this.initShopScene()), this.handleGoodsDetail()
                            } catch (e) {
                                try {
                                    if (0 == e.code && !this.isFromMall && this._options.goodsId) {
                                        const e = this.shopName,
                                            t =
                                            yield (0, P.k$)({
                                                type: "gcj02"
                                            }).catch(() => {}),
                                            {
                                                longitude: o,
                                                latitude: s
                                            } = t || {},
                                            i =
                                            yield (0, g.oz)({
                                                goodsId: this._options.goodsId,
                                                latitude: s,
                                                longitude: o
                                            });
                                        if (i.data.shopId) {
                                            c.Z.notify("商品详情推送门店", {
                                                    data: i.data,
                                                    location: t,
                                                    options: this._options
                                                }), this._options.shopId = i.data.shopId, this._options.saleType = i.data.saleType,
                                                yield this.initShopScene(), this.handleGoodsDetail();
                                            const o = (0, a.Vj)();
                                            return void this.$forceUpdate({
                                                isLoad: !0,
                                                preShopName: e,
                                                shopChangeTrigger: o
                                            })
                                        }
                                    }
                                } catch (e) {}
                                this.$forceUpdate({
                                    throwError: (0, h.T)(e)
                                })
                            } finally {
                                this.$forceUpdate({
                                    isShowLoading: !1
                                })
                            }
                        }))
                    },
                    handleGoodsDetail() {
                        const {
                            goodsDetail: e,
                            uid: t,
                            goodsId: o,
                            preSaleId: i,
                            entityId: a,
                            buttonTxt: r,
                            isAddCartShow: n,
                            operateStatusCode: c,
                            userPromoter: l
                        } = this;
                        let h = this.shopId,
                            p = this.mobile,
                            u = this.saleType;
                        u = u || "", h = h || "";
                        let {
                            pickUpCouponCardId: g,
                            promoterId: m,
                            promoteCode: y,
                            promoterGoodsId: f
                        } = this._options;
                        k.store.commit("updateShopCart"), 1 == c && this.getHistoryOrder();
                        const {
                            name: I = "",
                            pictureUrlList: S = [""],
                            preSale: P,
                            isInventoryPlan: v,
                            totalInventory: C,
                            goodsId: T,
                            promoterGoods: b
                        } = e || {}, {
                            promoteType: D
                        } = b || {};
                        if (2 == D && !m) {
                            const {
                                promoterId: e,
                                promoteCode: t
                            } = l || {};
                            m = e, y = t
                        }
                        const w = (0, d.Zx)(e),
                            A = w ? "id=" + t : "goodsId=" + (o || T);
                        let L = `${A}&from=${w?"mall":"normal"}&shopId=${h}&saleType=${u}${this.isFreshlyBaked?"&isFreshlyBaked="+this.isFreshlyBaked:""}`;
                        i && (L = `${A}&from=${w?"mall":"normal"}&shopId=${h}&preSaleId=${i}&entityId=${a}&saleType=${u}`), m && y && (L = `${L}&promoterId=${m}&promoteCode=${y}&mobile=${p||""}&promoterGoodsId=${f||""}`), this.isReplaceSell && (L = `${L}&isReplaceSell=${this.isReplaceSell}`), "function" == typeof s.ZP.onCopyUrl && s.ZP.onCopyUrl(() => ({
                            query: "" + L
                        })), this.$forceUpdate({
                            shareParams: L,
                            shareMaterialPic: S && S.length ? S[0] : "",
                            shareRemark: I,
                            isLoad: !0,
                            buttonTxt: P || v && !C ? "立即预定" : r,
                            isAddCartShow: !g && n
                        })
                    },
                    initMallScene() {
                        return Promise.all([this.getMallGoodsDetail(), this.getTargetActivity(), k.store.dispatch("checkShopCart")])
                    },
                    initShopScene() {
                        return E(this, null, (function*() {
                            if (
                                yield k.store.dispatch("checkSelectedShop", this._options, "goodsDetail")) return Promise.all([this.getGoodsDetail(), k.store.dispatch("checkShopCart")])
                        }))
                    },
                    dispatchNormalGoodsParams() {
                        const {
                            userPromoter: e,
                            uid: t
                        } = this, o = this.shopId, s = this.beforePickupTime, i = this.saleType, {
                            pickedDate: a = "",
                            pickedTime: r = ""
                        } = s || {}, {
                            goodsId: n,
                            promoterGoodsId: d
                        } = this._options || {}, c = {
                            shopId: o,
                            itemIdList: t ? [t] : [],
                            saleType: i,
                            selfTakeDate: a,
                            selfTakePeriod: r,
                            goodsId: n
                        };
                        if (this.preSaleId) {
                            const {
                                preSaleId: e,
                                entityId: t
                            } = this;
                            c.preSaleRequest = {
                                activityId: e,
                                entityId: t,
                                goodsId: n,
                                searchPageType: this._options.searchPageType
                            }
                        }
                        this._options && this._options.saleType && (c.saleType = this._options.saleType), this.enterpriseZone && (c.preferentialZoneActivityId = this.enterpriseZone.activityId, c.preferentialZoneEnterpriseId = this.enterpriseZone.enterpriseId, c.preferentialZoneFlag = 1);
                        const {
                            isPromoter: l
                        } = e || {};
                        return d && l && (c.promoterGoodsId = d), k.store.state.sceneOrderId && (c.sceneSettingId = k.store.state.sceneOrderId), this.timeDiscountActivityId && (c.timeDiscountActivityId = this.timeDiscountActivityId), c
                    },
                    toGoodsEvaluate(e) {
                        const {
                            goodsId: t
                        } = e.detail, {
                            goodsDetail: o
                        } = this;
                        getApp().$emit("evaluateGoodsDetail", o), (0, b.T8)("/subPages/evaluate/goodsEvaluate/index?goodsId=" + t)
                    },
                    _fetchCommentList() {
                        const {
                            goodsId: e
                        } = this, t = {
                            goodsId: e,
                            hasImage: !0,
                            pageNum: 1,
                            pageSize: 1
                        };
                        (0, u.iq)(t).then(e => {
                            if (e.status && e.data) {
                                const {
                                    data: t
                                } = e.data;
                                this.$forceUpdate({
                                    commentList: t
                                })
                            }
                        })
                    },
                    _fetchCommentCountByGoods() {
                        const {
                            goodsId: e
                        } = this, t = {
                            goodsId: e
                        };
                        (0, u.ek)(t).then(e => {
                            if (e && e.status) {
                                const {
                                    total: t
                                } = e.data;
                                this.$forceUpdate({
                                    commentListTotal: t
                                })
                            }
                        })
                    },
                    dispatchMallGoodsParams() {
                        const {
                            userPromoter: e,
                            uid: t
                        } = this, {
                            promoterGoodsId: o,
                            searchPageType: s
                        } = this._options || {}, i = {
                            goodsIdList: [t]
                        };
                        if (this.enterpriseZone && (i.preferentialZoneActivityId = this.enterpriseZone.activityId, i.preferentialZoneEnterpriseId = this.enterpriseZone.enterpriseId, i.preferentialZoneFlag = 1), this.preSaleId) {
                            const {
                                preSaleId: e,
                                entityId: o
                            } = this;
                            i.preSaleRequest = {
                                activityId: e,
                                entityId: o,
                                goodsId: t,
                                searchPageType: s
                            }
                        }
                        this.timeDiscountActivityId && (i.timeDiscountActivityId = this.timeDiscountActivityId);
                        const {
                            isPromoter: a
                        } = e || {};
                        return o && a && (i.promoterGoodsId = o), i
                    },
                    getGoodsDetail() {
                        return E(this, null, (function*() {
                            let e = 0,
                                t = -1;
                            const o = this.dispatchNormalGoodsParams(),
                                s =
                                yield (0, g.yN)(o);
                            let i = this.buttonTxt;
                            const a = (new Date).getTime(),
                                {
                                    goodsSkuList: d
                                } = s.data || {};
                            if (this.preSaleId && s.data.preSale) {
                                s.data.preSale && s.data.preSale.baseInfo && !s.data.preSale.baseInfo.status && (s.data.allowSale = !1, s.data.errorMessage = s.data.preSale.baseInfo.errorMessage);
                                const {
                                    startDate: t,
                                    endDate: o
                                } = s.data.preSale.baseInfo;
                                if (1 == s.data.preSale.baseInfo.activityStatus) {
                                    const o = new Date(t.replace(new RegExp("-", "gm"), "/")).getTime();
                                    e = t && o - a > 0 ? (o - a) / 1e3 : 0
                                } else {
                                    const t = new Date(o.replace(new RegExp("-", "gm"), "/")).getTime();
                                    e = o && t - a > 0 ? (t - a) / 1e3 : 0
                                }
                            } else {
                                const {
                                    reservationFlag: o,
                                    reservationType: r,
                                    reservationStatus: n,
                                    reservationStartDate: d,
                                    reservationEndDate: c
                                } = s.data;
                                if (1 == r && 4 != n)
                                    if (i = s.data.showPriceLow ? "原价购买￥" + s.data.showPriceLow : "原价购买", 1 == n) {
                                        t = 0;
                                        const o = new Date(d.replace(new RegExp("-", "gm"), "/")).getTime();
                                        e = d && o - a > 0 ? (o - a) / 1e3 : 0
                                    } else {
                                        2 == n && (t = 1 == o ? 2 : 1);
                                        const s = new Date(c.replace(new RegExp("-", "gm"), "/")).getTime();
                                        e = c && s - a > 0 ? (s - a) / 1e3 : 0
                                    } else {
                                    4 == n && (t = 3);
                                    const {
                                        endDate: o
                                    } = s.data;
                                    if (o) {
                                        const t = new Date(o.replace(new RegExp("-", "gm"), "/")).getTime();
                                        e = o && t - a > 0 ? (t - a) / 1e3 : 0
                                    }
                                }
                            }
                            if (this.enterpriseZone) {
                                const {
                                    endDate: t
                                } = this.enterpriseZone || {};
                                t && (e = t && t - a > 0 ? (t - a) / 1e3 : 0)
                            }
                            s.data.totalPrice = s.data.showPriceLow, s.data.isLimitTimePrice || (s.data.goodsSkuList && 0 != s.data.goodsSkuList.length && s.data.goodsSkuList.forEach(e => {
                                e.activityRemainStocks = null
                            }), s.data.entities && 0 != s.data.entities.length && s.data.entities.forEach(e => {
                                e.activityRemainStocks = null
                            }));
                            const c = this.baseCombinedSkuList,
                                l = this.freeCombinedGroupList,
                                h = s.data || {},
                                p = (0, r.B$)(h),
                                u = -1 != !!(d || []).includes(e => {
                                    const {
                                        isInventoryPlan: t
                                    } = e || {};
                                    return 1 == t
                                });
                            this.$forceUpdate({
                                buttonTxt: i,
                                reservationIndex: t,
                                goodsDetail: _(M({}, h), {
                                    lineThruoughPrice: p,
                                    isInventoryPlan: u
                                }),
                                goodsProperties: s.data.sortedPracticeList,
                                time: e,
                                baseCombinedSkuList: (s.data.baseCombinedSkuList || []).map((e, t) => {
                                    const {
                                        num: o
                                    } = e;
                                    return (e = _(M(M({}, c[t] || {}), e), {
                                        qty: o || 1
                                    })).__selected__ || (e = (0, n.MD)(e)), e
                                }),
                                freeCombinedGroupList: (Array.isArray(s.data.freeCombinedGroupList) ? s.data.freeCombinedGroupList : []).map((e, t) => (Array.isArray(e.freeCombinedSkuList) && (e.freeCombinedSkuList = e.freeCombinedSkuList.map((e, o) => {
                                    var s;
                                    return (e = M(M({}, (null == (s = l[t]) ? void 0 : s.freeCombinedSkuList[o]) || {}), e)).__selected__ || (e = (0, n.MD)(e)), e.checked = void 0 === e.checked ? 1 == e.isFreeDefault && 20 !== e.status : e.checked, e.qty = e.qty || 1, e
                                })), e)),
                                uid: s.data.id
                            }, () => {
                                this.getTargetActivity()
                            }), this.onUpdateSelectedGoods(), this.onUpdateSpecialMakePrice(), this.onUpdateGoodsPackageMatchPrice()
                        }))
                    },
                    countDownOver() {
                        this.preSaleId ? this.$forceUpdate({
                            "goodsDetail.allowSale": !1,
                            "goodsDetail.errorMessage": "活动已结束",
                            countDownEnd: !0
                        }) : this.$forceUpdate({
                            countDownEnd: !0
                        })
                    },
                    getMallGoodsDetail() {
                        return E(this, null, (function*() {
                            let e = 0,
                                t = -1;
                            const o = this.dispatchMallGoodsParams(),
                                s =
                                yield (0, g.eF)(o);
                            let i = this.buttonTxt;
                            const {
                                reservationType: a,
                                reservationStatus: n,
                                reservationStartDate: d,
                                reservationEndDate: c,
                                reservationFlag: l
                            } = s.data || {}, h = (new Date).getTime();
                            if (this.preSaleId) {
                                s.data.preSale && s.data.preSale.baseInfo && !s.data.preSale.baseInfo.status && (s.data.allowSale = !1, s.data.errorMessage = s.data.preSale.baseInfo.errorMessage);
                                const {
                                    startDate: t,
                                    endDate: o
                                } = s.data.preSale.baseInfo;
                                if (1 == s.data.preSale.baseInfo.activityStatus) {
                                    const o = new Date(t.replace(new RegExp("-", "gm"), "/")).getTime();
                                    e = t && o - h > 0 ? (o - h) / 1e3 : 0
                                } else {
                                    const t = new Date(o.replace(new RegExp("-", "gm"), "/")).getTime();
                                    e = o && t - h > 0 ? (t - h) / 1e3 : 0
                                }
                            } else if (1 == a && 4 != n)
                                if (i = s.data.showPriceLow ? "原价购买￥" + s.data.showPriceLow : "原价购买", 1 == n) {
                                    t = 0;
                                    const o = new Date(d.replace(new RegExp("-", "gm"), "/")).getTime();
                                    e = d && o - h > 0 ? (o - h) / 1e3 : 0
                                } else {
                                    2 == n && (t = 1 == l ? 2 : 1);
                                    const o = new Date(c.replace(new RegExp("-", "gm"), "/")).getTime();
                                    e = c && o - h > 0 ? (o - h) / 1e3 : 0
                                } else {
                                4 == n && (t = 3);
                                const {
                                    endDate: o
                                } = s.data;
                                if (o) {
                                    const t = new Date(o.replace(new RegExp("-", "gm"), "/")).getTime();
                                    e = o && t - h > 0 ? (t - h) / 1e3 : 0
                                }
                            }
                            s.data.totalPrice = s.data.showPriceLow;
                            const p = s.data || {},
                                u = (0, r.B$)(p);
                            this.$forceUpdate({
                                buttonTxt: i,
                                reservationIndex: t,
                                goodsDetail: _(M({}, p), {
                                    lineThruoughPrice: u
                                }),
                                goodsProperties: s.data.sortedPracticeList,
                                time: e
                            })
                        }))
                    },
                    getTargetActivity() {
                        return E(this, null, (function*() {
                            try {
                                if (this.preSaleId) return;
                                const {
                                    uid: e,
                                    isFromMall: t
                                } = this, o = {
                                    saleType: k.store.state.saleType,
                                    shopId: k.store.getters.shopId,
                                    goodsId: e,
                                    expressType: t ? 2 : 1
                                };
                                k.store.state.limitedTimeDiscountSource && (o.exclusiveList = [k.store.state.limitedTimeDiscountSource]), t && (delete o.shopId, o.saleType = 1);
                                const s =
                                    yield (0, g.Ci)(o);
                                this.$forceUpdate({
                                    activityInfo: _(M({}, s.data), {
                                        consumeBenefit: s.data.consumeBenefit ? s.data.consumeBenefit[0] : null,
                                        activityType: t ? 2 : 1
                                    })
                                })
                            } catch (e) {}
                        }))
                    },
                    handleSelectedPractice(e) {
                        const {
                            selectedProperties: t
                        } = e.detail;
                        this.selectedPractice = t
                    },
                    handleShowSKU(e) {
                        return E(this, null, (function*() {
                            const {
                                goodsDetail: t,
                                preSaleId: o,
                                countDownEnd: s
                            } = this, {
                                extra: i
                            } = t;
                            if (o) {
                                if (s) return void(0, S.Am)("活动已结束")
                            } else {
                                const {
                                    prepareTime: e
                                } = i || {};
                                if (!(0, n.pA)(e || "")) return void(0, n.Hb)(e)
                            }
                            if (this.checkoutPresaleGoodsNum()) return void(0, S.Am)("该活动商品购买个数已达上限");
                            if (!t.allowSale) return void this.onShowGoodsSaleTime();
                            this.setBuyScene(e.detail);
                            const r = this.goodsDetail;
                            let d = null;
                            3 === this.goodsDetail.type && (d = {
                                basic: this.baseCombinedSkuList,
                                groupMacth: this._selectedGoods,
                                property: this.selectedPractice
                            }), this.$forceUpdate({
                                goodsSKU: _(M({}, r), {
                                    selectedPackages: d,
                                    _: Math.random()
                                })
                            }, () => {
                                3 !== this.goodsDetail.type ? this.$forceUpdate({
                                    showSKU: !0
                                }) : this.$forceUpdate({
                                    triggerSkuConfirm: (0, a.Vj)()
                                })
                            })
                        }))
                    },
                    checkoutPresaleGoodsNum(e) {
                        const {
                            preSaleId: t,
                            goodsDetail: o
                        } = this, {
                            preSale: s
                        } = o || {}, {
                            goods: i
                        } = s || {}, {
                            activityGoodsNum: r,
                            activityGoodsNumLimit: n
                        } = i || {};
                        if (!(t && s && i && n)) return !1;
                        const d = (0, a.rk)("+", e, r);
                        return n > 0 && d > n
                    },
                    hideSKU() {
                        this.$forceUpdate({
                            showSKU: !1
                        })
                    },
                    confirmSKU(e) {
                        return E(this, null, (function*() {
                            const {
                                entity: t,
                                qty: o
                            } = e.detail || {}, {
                                type: s,
                                goodsPackage: i
                            } = t || {}, {
                                goodsDetail: d,
                                selectedPractice: c,
                                enterpriseZone: l,
                                buyScene: h,
                                lineUpProcessVo: p
                            } = this, {
                                sortedPracticeList: u
                            } = d || {}, g = this.saleType;
                            if (this.checkoutPresaleGoodsNum(o))(0, S.Am)("该活动商品购买个数已达上限");
                            else {
                                if (3 == s) {
                                    if (! function(e = [], t, o) {
                                            let s = !e.some(e => e.isRequired && 0 === Object.values(t[e.practiceId] || {}).length);
                                            return s && o && [...o.basic, ...(0, a.xH)(Object.values(o.groupMacth))].forEach(({
                                                sortedPracticeList: e,
                                                __selected__: t
                                            }) => {
                                                Array.isArray(e) && e.some(e => {
                                                    if (e.isRequired)
                                                        if (t) {
                                                            const o = t.property.find(({
                                                                practiceId: t
                                                            }) => e.practiceId === t);
                                                            o && o.practiceValueList && o.practiceValueList.length || (s = !1)
                                                        } else s = !1
                                                })
                                            }), s
                                        }(u, c, i)) return void(0, S.Am)("请选择商品做法！");
                                    if (!this.checkGoodsPackageGroupMacthBuyNum(i)) return void(0, S.Am)("请选择搭配商品！")
                                }
                                if (l && t.preferentialZoneFlag && (t.enterpriseZone = {
                                        activityId: t.preferentialZoneActivityId,
                                        enterpriseId: t.preferentialZoneEnterpriseId,
                                        preferentialZonePrice: t.preferentialZonePrice
                                    }), "add-cart" === h)(0, n.SC)(t, o, "plus");
                                else {
                                    const {
                                        separateOrderStatus: e
                                    } = t || {}, {
                                        formatEntity: s,
                                        isMall: i
                                    } = (0, n.gw)(t, o);
                                    if (1 == e) return void(0, S.Am)("该商品分类不可单下单");
                                    if ((2 === g || 1 == g || 3 == g) && !i) {
                                        const e = (0, n.W5)({
                                            count: o,
                                            amount: (0, a.rk)("*", o, (0, r.On)(t))
                                        });
                                        if (e) return void(0, S.Am)(e)
                                    }
                                    if (i)(0, D.Fj)("goodsEntitys", {
                                        mallGoodsEntitys: [s]
                                    });
                                    else {
                                        const {
                                            taskState: e,
                                            lineUpMinute: t
                                        } = p || {};
                                        if (3 == e && t) {
                                            const e = t > 60 ? (t / 60).toFixed(2) + "小时" : t + "分钟";
                                            yield (0, S.iG)("门店繁忙", `当前门店单量较多，等待时间预计超出${e}，为了您的用餐体验 请切换门店或者稍后下单`, {
                                                confirmText: "仍然下单",
                                                cancelText: "稍后下单"
                                            })
                                        }(0, D.Fj)("goodsEntitys", {
                                            normalGoodsEntitys: [s]
                                        })
                                    }
                                    let d = "",
                                        c = "";
                                    this.preSaleId && (d = 62, c = this.preSaleId);
                                    const {
                                        pickUpCouponCardId: l = "",
                                        isDyCoupon: h,
                                        certificateId: u
                                    } = this._options || {};
                                    let m = "";
                                    l && (m += `pickUpCouponCardId=${l}&`), d && (m += `activityType=${d}&`), c && (m += `activityId=${c}&`), u && (m += `certificateId=${u}&`);
                                    let y = "/subPages/order/confirm/index?" + m;
                                    k.store.state.sceneOrderStatus && k.store.state.sceneOrderId && (y += "&sceneOrderId=" + k.store.state.sceneOrderId), (0, b.T8)(y)
                                }
                            }
                        }))
                    },
                    setBuyScene(e) {
                        this.$forceUpdate({
                            buyScene: e
                        })
                    },
                    onShowCart() {
                        this.$forceUpdate({
                            showCart: Math.random()
                        })
                    },
                    handleShowPopupActivity() {
                        this.$forceUpdate({
                            showPopupActivity: !0
                        })
                    },
                    onHidePopupActivity() {
                        this.$forceUpdate({
                            showPopupActivity: !1
                        })
                    },
                    onUpdatePopupActivity(e) {
                        const {
                            couponSummaryVoList: t
                        } = this.activityInfo || {}, {
                            id: o
                        } = e.detail || {};
                        if (t) {
                            const e = t.findIndex(e => e.id === o),
                                s = t[e];
                            if (s) {
                                const {
                                    customerGainCount: t
                                } = s || {};
                                this.$forceUpdate({
                                    [`activityInfo.couponSummaryVoList[${e}].customerGainCount`]: t + 1
                                })
                            }
                            getApp().$emit("reciveCoupon")
                        }
                    },
                    checkGoodsPackageGroupMacthBuyNum(e) {
                        const t = this.freeCombinedGroupList,
                            o = JSON.parse(JSON.stringify(t));
                        if (o.forEach(e => {
                                0 == e.isCheckBox && (e.lessBuyNum = e.minBuyNum)
                            }), o && 0 === o.length) return !0;
                        const s = o.reduce((e, {
                                oriGroupId: t,
                                lessBuyNum: o
                            }) => (e[t] = o, e), {}),
                            i = [];
                        for (const t in s) {
                            let o = (e.groupMacth[t] ? e.groupMacth[t].reduce((e, {
                                qty: t
                            }) => e + t, 0) : 0) >= s[t];
                            i.push(o)
                        }
                        return i.every(e => 1 == e)
                    },
                    onBaseCombinedConfirm(e) {
                        const {
                            goodsIndex: t,
                            entity: o
                        } = e.detail || {};
                        this.$forceUpdate({
                            [`baseCombinedSkuList[${t}]`]: o
                        }), this.onUpdateSpecialMakePrice(), this.onUpdateGoodsPackageMatchPrice()
                    },
                    onFreeCombinedConfirm(e) {
                        const {
                            groupIndex: t,
                            entity: o,
                            goodsIndex: s
                        } = e.detail || {};
                        this.$forceUpdate({
                            [`freeCombinedGroupList[${t}].freeCombinedSkuList[${s}]`]: o
                        }), this.onUpdateSelectedGoods(), this.onUpdateSpecialMakePrice(), this.onUpdateGoodsPackageMatchPrice()
                    },
                    onFreeCombinedSelected(e) {
                        const {
                            groupIndex: t,
                            list: o
                        } = e.detail || {};
                        this.$forceUpdate({
                            [`freeCombinedGroupList[${t}].freeCombinedSkuList`]: o
                        }), this.onUpdateSelectedGoods(), this.onUpdateSpecialMakePrice(), this.onUpdateGoodsPackageMatchPrice()
                    },
                    onUpdateSelectedGoods() {
                        const e = {};
                        let t = 0;
                        this.freeCombinedGroupList.forEach(o => {
                            o.freeCombinedSkuList.forEach(s => {
                                s.checked && (t = (0, a.rk)("+", t, (0, a.rk)("*", s.qty, s.freeUpPrice)), e[o.oriGroupId] || (e[o.oriGroupId] = []), e[o.oriGroupId].push(s))
                            })
                        });
                        const o = (0, a.xH)(Object.values(e)),
                            s = {
                                basic: this.baseCombinedSkuList,
                                groupMacth: e,
                                property: this.selectedPractice
                            },
                            i = this.checkGoodsPackageGroupMacthBuyNum(s);
                        this.$forceUpdate({
                            selectedGoods: o,
                            "goodsDetail.totalPrice": (0, a.rk)("+", t, this.goodsDetail.showPriceLow),
                            allFreeCombinedGroupSelected: i
                        }), this._selectedGoods = e
                    },
                    onUpdateSpecialMakePrice() {
                        this.$forceUpdate({
                            goodsPackageSpecialMakePrice: [...this.baseCombinedSkuList, ...this.selectedGoods].reduce((e, t) => {
                                const o = t.qty || 1;
                                return t.__selected__.attach.length && (e = (0, a.rk)("+", e, t.__selected__.attach.reduce((e, t) => e = (0, a.rk)("+", e, (0, a.rk)("*", o, (0, a.rk)("*", t.attachGoodsPrice, t.buyNum))), 0))), e
                            }, 0)
                        })
                    },
                    onUpdateGoodsPackageMatchPrice() {
                        const e = this.goodsDetail.totalPrice,
                            t = this.goodsPackageSpecialMakePrice;
                        this.$forceUpdate({
                            goodsPackageMatchPrice: (0, a.rk)("+", e, t)
                        })
                    },
                    drawPoster() {
                        return E(this, null, (function*() {
                            const {
                                pictureUrlList: e
                            } = this.goodsDetail || {}, t = e && e.length ? e[0] : "", {
                                    path: o
                                } =
                                yield (0, v.FI)(t);
                            return new Promise(e => {
                                if (this.posterView) return void e(this.posterView);
                                const t = s.ZP.createCanvasContext("makeImg");
                                t.drawImage(o, 40, 100, 400, 400), t.setFontSize(56), t.setFillStyle("#000000"), t.setTextBaseline("top"), t.fillText("预售价：￥" + this.goodsDetail.preSale.goods.advancePrice, 480, 176), t.setFontSize(40), t.setFillStyle("#A3A3A3"), t.setTextBaseline("top");
                                const i = t.measureText("￥" + this.goodsDetail.preSale.goods.goodsPrice).width;
                                t.fillText("￥" + this.goodsDetail.preSale.goods.goodsPrice, 480, 262), t.moveTo(480, 282), t.lineTo(480 + i, 282), t.setStrokeStyle("#A3A3A3"), t.moveTo(480, 283), t.lineTo(480 + i, 283), t.setStrokeStyle("#A3A3A3"), t.stroke(), this.drawButton(t, k.store.getters.colorTheme, 480, 322, 304, 88, 44, "去购买"), t.draw(!0, () => E(this, null, (function*() {
                                    const t = {
                                        x: 0,
                                        y: 0,
                                        width: 1e3,
                                        height: 800,
                                        canvasId: "makeImg"
                                    };
                                    let o = ""; {
                                        const {
                                            tempFilePath: e
                                        } =
                                        yield (0, f.q)(t);
                                        o = e
                                    }
                                    this.$forceUpdate({
                                        posterView: o
                                    }), e(o)
                                })))
                            })
                        }))
                    },
                    drawButton(e, t, o, s, i, a, r, n) {
                        e.beginPath(), e.fillStyle = t, e.moveTo(o + r, s), e.lineTo(o + i - r, s), e.arc(o + i - r, s + r, r, 3 * Math.PI / 2, 2 * Math.PI), e.lineTo(o + i, s + a - r), e.arc(o + i - r, s + a - r, r, Math.PI, Math.PI / 2), e.lineTo(o + r, s + a), e.arc(o + r, s + a - r, r, Math.PI / 2, Math.PI), e.lineTo(o, s + r), e.arc(o + r, s + r, r, Math.PI, 3 * Math.PI / 2), e.fill(), e.closePath(), e.beginPath(), e.fillStyle = "#fff", e.font = "44px 黑体", e.textAlign = "center", e.textBaseline = "middle", e.fillText(n, o + i / 2, s + a / 2)
                    },
                    callServicePhone() {
                        const {
                            current: e
                        } = k.store.state.shop || {}, {
                            phone: t
                        } = e || {};
                        if (t && t.length > 1) {
                            const e = t;
                            (0, S.Cy)({
                                itemList: e
                            }).then(t => {
                                const o = t.tapIndex || t.index,
                                    s = o && e[o];
                                s && (0, I.Pt)(s)
                            })
                        } else {
                            const e = t[0];
                            (0, I.Pt)(e)
                        }
                    },
                    navLimitedTiemDiscount() {
                        const {
                            goodsDetail: e,
                            isFromMall: t
                        } = this;
                        (0, b.T8)(`/subPages/limitedTimeDiscount/list/index?activityId=${e.discountActivityId}${t?"&activityScene=1":""}`)
                    },
                    navPromoteShare() {
                        let {
                            promoterId: e,
                            promoteCode: t,
                            promoterGoodsId: o
                        } = this._options;
                        const {
                            promoterId: s,
                            promoteCode: i
                        } = this.userPromoter || {};
                        e || (e = s, t = i);
                        const {
                            goodsDetail: a,
                            uid: r
                        } = this, n = k.store.getters.shopId || "", c = k.store.state.saleType || "", {
                            name: l,
                            goodsId: h,
                            showPriceLow: p
                        } = a || {}, u = (0, d.Zx)(a), g = this.shareMaterialPic || "https://images.qmai.cn/resource/20210909183816/2022/01/06/promoteGoodsIMg.png", m = u ? "mall" : "normal";
                        getApp().$emit("promoteCodeParams", {
                            id: r,
                            goodsId: h,
                            from: m,
                            promoterId: e,
                            promoteCode: t,
                            sharePage: "pages/goods/detail/index",
                            shopId: n,
                            saleType: c,
                            shareMaterialPic: g,
                            goodsName: l,
                            goodsPrice: p,
                            type: 1,
                            promoterGoodsId: o
                        }), (0, b.T8)("/subPages/promote/code/index")
                    },
                    bindUserRelation() {
                        return E(this, null, (function*() {
                            const {
                                mobile: e,
                                promoteCode: t,
                                promoterId: o
                            } = this.originPromoter;
                            if (getApp() && (getApp().globalData.promoter = {
                                    mobile: e,
                                    promoteCode: t,
                                    promoterId: o
                                }), this.isAuth) try {
                                c.Z.notify("推广员绑定关系商品详情", {
                                        mobile: e,
                                        promoteCode: t,
                                        promoterId: o
                                    }),
                                    yield (0, y.Z$)({
                                        mobile: e,
                                        promoteCode: t,
                                        promoterId: o
                                    })
                            } catch (e) {
                                const {
                                    errMsg: t
                                } = e;
                                t && (0, S.Am)(t)
                            }
                        }))
                    },
                    bindLink(e) {
                        const {
                            id: t
                        } = e.currentTarget.dataset;
                        (0, b.T8)("/subPages/premiumMembership/index/index?id=" + t)
                    },
                    getHistoryOrder() {
                        const {
                            goodsDetail: e
                        } = this, {
                            goodsId: t
                        } = e || {};
                        (0, g.hp)({
                            goodsId: t
                        }).then(e => {
                            this.$forceUpdate({
                                historyOrderList: e.data
                            }), this.openAnimation()
                        })
                    },
                    getValuateSettingVo() {
                        (0, u.Et)().then(e => {
                            e.status && this.$forceUpdate({
                                evaluateLocation: e.data.evaluateLocation || 0
                            })
                        })
                    },
                    changeReservationPop() {
                        this.$forceUpdate({
                            reservationPop: !this.reservationPop
                        })
                    },
                    handleReservation() {
                        return E(this, null, (function*() {
                            const {
                                timeDiscountActivityId: e,
                                goodsDetail: t,
                                goodsId: o
                            } = this, i = this.saleType, a = this.shopId, r = {
                                activityId: e,
                                saleType: i,
                                goodsId: o,
                                goodsImgUrl: t.pictureUrlList[0],
                                goodsName: t.name,
                                shopId: a
                            };
                            try {
                                (
                                    yield (0, m.Hl)(r)).status && (this.changeReservationPop(), this.init())
                            } catch (e) {
                                s.ZP.showToast({
                                    title: e.errMsg,
                                    icon: "none"
                                })
                            }
                        }))
                    },
                    subscribe() {
                        return E(this, null, (function*() {
                            try {
                                yield (0, l.kl)(l.Fg.ACTIVE_RECORD)
                            } catch (e) {}
                            this.$forceUpdate({
                                reservationPop: !1
                            })
                        }))
                    },
                    fetchMallDesignConfig() {
                        return E(this, null, (function*() {
                            try {
                                const e =
                                    yield (0, p.M)({
                                        type: "baking.mallData"
                                    });
                                e.data.value && this.$forceUpdate({
                                    mallData: e.data.value
                                })
                            } catch (e) {}
                        }))
                    },
                    navToShopList() {
                        Reflect.deleteProperty(this._options, "shopId"), this.uid = 0
                    },
                    triggerHealthDescDialog() {
                        const {
                            gradingInstructionsText: e
                        } = this.energyAndHealthData;
                        e && (this.healthDescDialog = !this.healthDescDialog)
                    },
                    toEnergyPage() {
                        (0, b.T8)("/subPages/goodsEnergyCalculation/index/index?id=" + this.goodsDetail.goodsId)
                    },
                    onShowGoodsSaleTime() {
                        const {
                            goods: e
                        } = this.goodsDetail || {};
                        this.showSaleTimeGoods = _(M({}, e), {
                            _: Math.random()
                        })
                    }
                })
            }
        },
        function(e) {
            var t;
            t = 41413, e(e.s = t)
        }
    ]);
});
require("pages/goods/detail/index.js");