/*v0.5vv_20211229_syb_scopedata*/
global.__wcc_version__ = 'v0.5vv_20211229_syb_scopedata';
global.__wcc_version_info__ = {
    "customComponents": true,
    "fixZeroRpx": true,
    "propValueDeepCopy": false
};
var $gwxc
var $gaic = {}
$gwx83 = function(path, global) {
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
        console.warn("WXMLRT_$gwx83:" + m)
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
    var z = __WXML_GLOBAL__.ops_set.$gwx83 || [];

    function gz$gwx83_1() {
        if (__WXML_GLOBAL__.ops_cached.$gwx83_1) return __WXML_GLOBAL__.ops_cached.$gwx83_1
        __WXML_GLOBAL__.ops_cached.$gwx83_1 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
        })(__WXML_GLOBAL__.ops_cached.$gwx83_1);
        return __WXML_GLOBAL__.ops_cached.$gwx83_1
    }
    __WXML_GLOBAL__.ops_set.$gwx83 = z;
    __WXML_GLOBAL__.ops_init.$gwx83 = true;
    var nv_require = function() {
        var nnm = {};
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
    var x = ['./async-libs/index.wxml'];
    d_[x[0]] = {}
    var m0 = function(e, s, r, gg) {
        var z = gz$gwx83_1()
        return r
    }
    e_[x[0]] = {
        f: m0,
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
__wxAppCode__['async-libs/index.json'] = {
    "navigationStyle": "default",
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
if (__vd_version_info__.delayedGwx) __wxAppCode__['async-libs/index.wxml'] = [$gwx83, './async-libs/index.wxml'];
else __wxAppCode__['async-libs/index.wxml'] = $gwx83('./async-libs/index.wxml');

define("async-libs/export/sentry4e10ef2b.js", function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
    var t;
    (t = t || {}).webpackChunkbaking_microapp = require("../../bundle.js"), (t.webpackChunkbaking_microapp = t.webpackChunkbaking_microapp || []).push([
        [47727], {
            66149: function(e, n, r) {
                "use strict";
                r.d(n, {
                    R: function() {
                        return s
                    },
                    Y: function() {
                        return a
                    }
                });
                var o = r(83247),
                    i = {};

                function s() {
                    return (0, o.KV)() ? r.g : "undefined" != typeof window ? window : void 0 !== t ? t : i
                }

                function a(t, e, n) {
                    var r = n || s(),
                        o = r.__SENTRY__ = r.__SENTRY__ || {};
                    return o[t] || (o[t] = e())
                }
            },
            83247: function(t, e, n) {
                "use strict";
                n.d(e, {
                    l$: function() {
                        return i
                    },
                    KV: function() {
                        return o
                    }
                }), t = n.hmd(t);
                var r = n(14224);

                function o() {
                    return !("undefined" != typeof __SENTRY_BROWSER_BUNDLE__ && __SENTRY_BROWSER_BUNDLE__) && "[object process]" === Object.prototype.toString.call(void 0 !== r ? r : 0)
                }

                function i(t, e) {
                    return t.require(e)
                }
            },
            29939: function(t, e, n) {
                "use strict";
                n.d(e, {
                    ph: function() {
                        return c
                    },
                    yW: function() {
                        return u
                    }
                });
                var r = n(66149),
                    o = n(83247);
                t = n.hmd(t);
                var i = {
                        nowSeconds: function() {
                            return Date.now() / 1e3
                        }
                    },
                    s = (0, o.KV)() ? function() {
                        try {
                            return (0, o.l$)(t, "perf_hooks").performance
                        } catch (t) {
                            return
                        }
                    }() : function() {
                        var t = (0, r.R)().performance;
                        if (t && t.now) return {
                            now: function() {
                                return t.now()
                            },
                            timeOrigin: Date.now() - t.now()
                        }
                    }(),
                    a = void 0 === s ? i : {
                        nowSeconds: function() {
                            return (s.timeOrigin + s.now()) / 1e3
                        }
                    },
                    u = i.nowSeconds.bind(i),
                    c = a.nowSeconds.bind(a);
                ! function() {
                    var t = (0, r.R)().performance;
                    if (t && t.now) {
                        var e = 36e5,
                            n = t.now(),
                            o = Date.now(),
                            i = t.timeOrigin ? Math.abs(t.timeOrigin + n - o) : e,
                            s = i < e,
                            a = t.timing && t.timing.navigationStart,
                            u = "number" == typeof a ? Math.abs(a + n - o) : e;
                        (s || u < e) && (i <= u && t.timeOrigin)
                    }
                }()
            },
            26276: function(t, e, n) {
                "use strict";
                n.r(e);
                var r = function(t, e) {
                    return (r = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(t, e) {
                            t.__proto__ = e
                        } || function(t, e) {
                            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(t, e)
                };

                function o(t, e) {
                    function n() {
                        this.constructor = t
                    }
                    r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
                }
                var i = function() {
                    return (i = Object.assign || function(t) {
                        for (var e, n = 1, r = arguments.length; n < r; n++)
                            for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                        return t
                    }).apply(this, arguments)
                };

                function s(t) {
                    var e = "function" == typeof Symbol && Symbol.iterator,
                        n = e && t[e],
                        r = 0;
                    if (n) return n.call(t);
                    if (t && "number" == typeof t.length) return {
                        next: function() {
                            return t && r >= t.length && (t = void 0), {
                                value: t && t[r++],
                                done: !t
                            }
                        }
                    };
                    throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
                }

                function a(t, e) {
                    var n = "function" == typeof Symbol && t[Symbol.iterator];
                    if (!n) return t;
                    var r, o, i = n.call(t),
                        s = [];
                    try {
                        for (;
                            (void 0 === e || e-- > 0) && !(r = i.next()).done;) s.push(r.value)
                    } catch (t) {
                        o = {
                            error: t
                        }
                    } finally {
                        try {
                            r && !r.done && (n = i.return) && n.call(i)
                        } finally {
                            if (o) throw o.error
                        }
                    }
                    return s
                }

                function u() {
                    for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(a(arguments[e]));
                    return t
                }
                var c, p = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__,
                    l = n(66149),
                    f = (0, l.R)(),
                    d = "Sentry Logger ",
                    h = ["debug", "info", "warn", "error", "log", "assert"];

                function v(t) {
                    var e = (0, l.R)();
                    if (!("console" in e)) return t();
                    var n = e.console,
                        r = {};
                    h.forEach((function(t) {
                        var o = n[t] && n[t].__sentry_original__;
                        t in e.console && o && (r[t] = n[t], n[t] = o)
                    }));
                    try {
                        return t()
                    } finally {
                        Object.keys(r).forEach((function(t) {
                            n[t] = r[t]
                        }))
                    }
                }

                function _() {
                    var t = !1,
                        e = {
                            enable: function() {
                                t = !0
                            },
                            disable: function() {
                                t = !1
                            }
                        };
                    return p ? h.forEach((function(n) {
                        e[n] = function() {
                            for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
                            t && v((function() {
                                var t;
                                (t = f.console)[n].apply(t, u([d + "[" + n + "]:"], e))
                            }))
                        }
                    })) : h.forEach((function(t) {
                        e[t] = function() {}
                    })), e
                }
                c = p ? (0, l.Y)("logger", _) : _();
                var g = Object.prototype.toString;

                function y(t) {
                    switch (g.call(t)) {
                        case "[object Error]":
                        case "[object Exception]":
                        case "[object DOMException]":
                            return !0;
                        default:
                            return k(t, Error)
                    }
                }

                function m(t, e) {
                    return g.call(t) === "[object " + e + "]"
                }

                function b(t) {
                    return m(t, "DOMError")
                }

                function E(t) {
                    return m(t, "String")
                }

                function w(t) {
                    return m(t, "Object")
                }

                function x(t) {
                    return "undefined" != typeof Event && k(t, Event)
                }

                function S(t) {
                    return Boolean(t && t.then && "function" == typeof t.then)
                }

                function k(t, e) {
                    try {
                        return t instanceof e
                    } catch (t) {
                        return !1
                    }
                }

                function O(t, e) {
                    var n, r, o, i, s, a = t,
                        u = [];
                    if (!a || !a.tagName) return "";
                    u.push(a.tagName.toLowerCase());
                    var c = e && e.length ? e.filter((function(t) {
                        return a.getAttribute(t)
                    })).map((function(t) {
                        return [t, a.getAttribute(t)]
                    })) : null;
                    if (c && c.length) c.forEach((function(t) {
                        u.push("[" + t[0] + '="' + t[1] + '"]')
                    }));
                    else if (a.id && u.push("#" + a.id), (n = a.className) && E(n))
                        for (r = n.split(/\s+/), s = 0; s < r.length; s++) u.push("." + r[s]);
                    var p = ["type", "name", "title", "alt"];
                    for (s = 0; s < p.length; s++) o = p[s], (i = a.getAttribute(o)) && u.push("[" + o + '="' + i + '"]');
                    return u.join("")
                }

                function T(t, e) {
                    return void 0 === e && (e = 0), "string" != typeof t || 0 === e || t.length <= e ? t : t.substr(0, e) + "..."
                }

                function j(t, e) {
                    return !!E(t) && (function(t) {
                        return m(t, "RegExp")
                    }(e) ? e.test(t) : "string" == typeof e && -1 !== t.indexOf(e))
                }

                function I(t, e, n) {
                    if (e in t) {
                        var r = t[e],
                            o = n(r);
                        if ("function" == typeof o) try {
                            ! function(t, e) {
                                var n = e.prototype || {};
                                t.prototype = e.prototype = n, R(t, "__sentry_original__", e)
                            }(o, r)
                        } catch (t) {}
                        t[e] = o
                    }
                }

                function R(t, e, n) {
                    Object.defineProperty(t, e, {
                        value: n,
                        writable: !0,
                        configurable: !0
                    })
                }

                function N(t) {
                    return t.__sentry_original__
                }

                function M(t) {
                    var e = t;
                    if (y(t)) e = i({
                        message: t.message,
                        name: t.name,
                        stack: t.stack
                    }, D(t));
                    else if (x(t)) {
                        var n = t;
                        e = i({
                            type: n.type,
                            target: P(n.target),
                            currentTarget: P(n.currentTarget)
                        }, D(n)), "undefined" != typeof CustomEvent && k(t, CustomEvent) && (e.detail = n.detail)
                    }
                    return e
                }

                function P(t) {
                    try {
                        return function(t) {
                            return "undefined" != typeof Element && k(t, Element)
                        }(t) ? function(t, e) {
                            try {
                                for (var n = t, r = [], o = 0, i = 0, s = " > ".length, a = void 0; n && o++ < 5 && !("html" === (a = O(n, e)) || o > 1 && i + r.length * s + a.length >= 80);) r.push(a), i += a.length, n = n.parentNode;
                                return r.reverse().join(" > ")
                            } catch (t) {
                                return "<unknown>"
                            }
                        }(t) : Object.prototype.toString.call(t)
                    } catch (t) {
                        return "<unknown>"
                    }
                }

                function D(t) {
                    var e = {};
                    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e
                }

                function U(t, e) {
                    void 0 === e && (e = 40);
                    var n = Object.keys(M(t));
                    if (n.sort(), !n.length) return "[object has no keys]";
                    if (n[0].length >= e) return T(n[0], e);
                    for (var r = n.length; r > 0; r--) {
                        var o = n.slice(0, r).join(", ");
                        if (!(o.length > e)) return r === n.length ? o : T(o, e)
                    }
                    return ""
                }

                function C(t) {
                    var e, n;
                    if (w(t)) {
                        var r = {};
                        try {
                            for (var o = s(Object.keys(t)), i = o.next(); !i.done; i = o.next()) {
                                var a = i.value;
                                void 0 !== t[a] && (r[a] = C(t[a]))
                            }
                        } catch (t) {
                            e = {
                                error: t
                            }
                        } finally {
                            try {
                                i && !i.done && (n = o.return) && n.call(o)
                            } finally {
                                if (e) throw e.error
                            }
                        }
                        return r
                    }
                    return Array.isArray(t) ? t.map(C) : t
                }

                function L() {
                    var t = (0, l.R)(),
                        e = t.crypto || t.msCrypto;
                    if (void 0 !== e && e.getRandomValues) {
                        var n = new Uint16Array(8);
                        e.getRandomValues(n), n[3] = 4095 & n[3] | 16384, n[4] = 16383 & n[4] | 32768;
                        var r = function(t) {
                            for (var e = t.toString(16); e.length < 4;) e = "0" + e;
                            return e
                        };
                        return r(n[0]) + r(n[1]) + r(n[2]) + r(n[3]) + r(n[4]) + r(n[5]) + r(n[6]) + r(n[7])
                    }
                    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (function(t) {
                        var e = 16 * Math.random() | 0;
                        return ("x" === t ? e : 3 & e | 8).toString(16)
                    }))
                }

                function A(t) {
                    return t.exception && t.exception.values ? t.exception.values[0] : void 0
                }

                function H(t) {
                    var e = t.message,
                        n = t.event_id;
                    if (e) return e;
                    var r = A(t);
                    return r ? r.type && r.value ? r.type + ": " + r.value : r.type || r.value || n || "<unknown>" : n || "<unknown>"
                }

                function q(t, e, n) {
                    var r = t.exception = t.exception || {},
                        o = r.values = r.values || [],
                        i = o[0] = o[0] || {};
                    i.value || (i.value = e || ""), i.type || (i.type = n || "Error")
                }

                function F(t, e) {
                    var n = A(t);
                    if (n) {
                        var r = n.mechanism;
                        if (n.mechanism = i(i(i({}, {
                                type: "generic",
                                handled: !0
                            }), r), e), e && "data" in e) {
                            var o = i(i({}, r && r.data), e.data);
                            n.mechanism.data = o
                        }
                    }
                }

                function B(t) {
                    if (t && t.__sentry_captured__) return !0;
                    try {
                        R(t, "__sentry_captured__", !0)
                    } catch (t) {}
                    return !1
                }
                var W = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__,
                    Y = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/],
                    G = function() {
                        function t(e) {
                            void 0 === e && (e = {}), this._options = e, this.name = t.id
                        }
                        return t.prototype.setupOnce = function(e, n) {
                            e((function(e) {
                                var r = n();
                                if (r) {
                                    var o = r.getIntegration(t);
                                    if (o) {
                                        var i = r.getClient(),
                                            s = i ? i.getOptions() : {};
                                        return function(t, e) {
                                            return e.ignoreInternal && function(t) {
                                                try {
                                                    return "SentryError" === t.exception.values[0].type
                                                } catch (t) {}
                                                return !1
                                            }(t) ? (W && c.warn("Event dropped due to being internal Sentry Error.\nEvent: " + H(t)), !0) : function(t, e) {
                                                return !(!e || !e.length) && function(t) {
                                                    if (t.message) return [t.message];
                                                    if (t.exception) try {
                                                        var e = t.exception.values && t.exception.values[0] || {},
                                                            n = e.type,
                                                            r = void 0 === n ? "" : n,
                                                            o = e.value,
                                                            i = void 0 === o ? "" : o;
                                                        return ["" + i, r + ": " + i]
                                                    } catch (e) {
                                                        return W && c.error("Cannot extract message for event " + H(t)), []
                                                    }
                                                    return []
                                                }(t).some((function(t) {
                                                    return e.some((function(e) {
                                                        return j(t, e)
                                                    }))
                                                }))
                                            }(t, e.ignoreErrors) ? (W && c.warn("Event dropped due to being matched by `ignoreErrors` option.\nEvent: " + H(t)), !0) : function(t, e) {
                                                if (!e || !e.length) return !1;
                                                var n = K(t);
                                                return !!n && e.some((function(t) {
                                                    return j(n, t)
                                                }))
                                            }(t, e.denyUrls) ? (W && c.warn("Event dropped due to being matched by `denyUrls` option.\nEvent: " + H(t) + ".\nUrl: " + K(t)), !0) : ! function(t, e) {
                                                if (!e || !e.length) return !0;
                                                var n = K(t);
                                                return !n || e.some((function(t) {
                                                    return j(n, t)
                                                }))
                                            }(t, e.allowUrls) && (W && c.warn("Event dropped due to not being matched by `allowUrls` option.\nEvent: " + H(t) + ".\nUrl: " + K(t)), !0)
                                        }(e, function(t, e) {
                                            return void 0 === t && (t = {}), void 0 === e && (e = {}), {
                                                allowUrls: u(t.whitelistUrls || [], t.allowUrls || [], e.whitelistUrls || [], e.allowUrls || []),
                                                denyUrls: u(t.blacklistUrls || [], t.denyUrls || [], e.blacklistUrls || [], e.denyUrls || []),
                                                ignoreErrors: u(t.ignoreErrors || [], e.ignoreErrors || [], Y),
                                                ignoreInternal: void 0 === t.ignoreInternal || t.ignoreInternal
                                            }
                                        }(o._options, s)) ? null : e
                                    }
                                }
                                return e
                            }))
                        }, t.id = "InboundFilters", t
                    }();

                function z(t) {
                    void 0 === t && (t = []);
                    for (var e = t.length - 1; e >= 0; e--) {
                        var n = t[e];
                        if (n && "<anonymous>" !== n.filename && "[native code]" !== n.filename) return n.filename || null
                    }
                    return null
                }

                function K(t) {
                    try {
                        if (t.stacktrace) return z(t.stacktrace.frames);
                        var e;
                        try {
                            e = t.exception.values[0].stacktrace.frames
                        } catch (t) {}
                        return e ? z(e) : null
                    } catch (e) {
                        return W && c.error("Cannot extract url for event " + H(t)), null
                    }
                }
                var V, $ = function() {
                        function t() {
                            this.name = t.id
                        }
                        return t.prototype.setupOnce = function() {
                            V = Function.prototype.toString, Function.prototype.toString = function() {
                                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                                var n = N(this) || this;
                                return V.apply(n, t)
                            }
                        }, t.id = "FunctionToString", t
                    }(),
                    J = n(29939),
                    X = n(83247),
                    Q = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__;

                function Z(t) {
                    return new nt((function(e) {
                        e(t)
                    }))
                }

                function et(t) {
                    return new nt((function(e, n) {
                        n(t)
                    }))
                }
                var nt = function() {
                        function t(t) {
                            var e = this;
                            this._state = 0, this._handlers = [], this._resolve = function(t) {
                                e._setResult(1, t)
                            }, this._reject = function(t) {
                                e._setResult(2, t)
                            }, this._setResult = function(t, n) {
                                if (0 === e._state) {
                                    if (S(n)) return void n.then(e._resolve, e._reject);
                                    e._state = t, e._value = n, e._executeHandlers()
                                }
                            }, this._executeHandlers = function() {
                                if (0 !== e._state) {
                                    var t = e._handlers.slice();
                                    e._handlers = [], t.forEach((function(t) {
                                        t[0] || (1 === e._state && t[1](e._value), 2 === e._state && t[2](e._value), t[0] = !0)
                                    }))
                                }
                            };
                            try {
                                t(this._resolve, this._reject)
                            } catch (t) {
                                this._reject(t)
                            }
                        }
                        return t.prototype.then = function(e, n) {
                            var r = this;
                            return new t((function(t, o) {
                                r._handlers.push([!1, function(n) {
                                    if (e) try {
                                        t(e(n))
                                    } catch (t) {
                                        o(t)
                                    } else t(n)
                                }, function(e) {
                                    if (n) try {
                                        t(n(e))
                                    } catch (t) {
                                        o(t)
                                    } else o(e)
                                }]), r._executeHandlers()
                            }))
                        }, t.prototype.catch = function(t) {
                            return this.then((function(t) {
                                return t
                            }), t)
                        }, t.prototype.finally = function(e) {
                            var n = this;
                            return new t((function(t, r) {
                                var o, i;
                                return n.then((function(t) {
                                    i = !1, o = t, e && e()
                                }), (function(t) {
                                    i = !0, o = t, e && e()
                                })).then((function() {
                                    i ? r(o) : t(o)
                                }))
                            }))
                        }, t
                    }(),
                    rt = function() {
                        function t() {
                            this._notifyingListeners = !1, this._scopeListeners = [], this._eventProcessors = [], this._breadcrumbs = [], this._user = {}, this._tags = {}, this._extra = {}, this._contexts = {}, this._sdkProcessingMetadata = {}
                        }
                        return t.clone = function(e) {
                            var n = new t;
                            return e && (n._breadcrumbs = u(e._breadcrumbs), n._tags = i({}, e._tags), n._extra = i({}, e._extra), n._contexts = i({}, e._contexts), n._user = e._user, n._level = e._level, n._span = e._span, n._session = e._session, n._transactionName = e._transactionName, n._fingerprint = e._fingerprint, n._eventProcessors = u(e._eventProcessors), n._requestSession = e._requestSession), n
                        }, t.prototype.addScopeListener = function(t) {
                            this._scopeListeners.push(t)
                        }, t.prototype.addEventProcessor = function(t) {
                            return this._eventProcessors.push(t), this
                        }, t.prototype.setUser = function(t) {
                            return this._user = t || {}, this._session && this._session.update({
                                user: t
                            }), this._notifyScopeListeners(), this
                        }, t.prototype.getUser = function() {
                            return this._user
                        }, t.prototype.getRequestSession = function() {
                            return this._requestSession
                        }, t.prototype.setRequestSession = function(t) {
                            return this._requestSession = t, this
                        }, t.prototype.setTags = function(t) {
                            return this._tags = i(i({}, this._tags), t), this._notifyScopeListeners(), this
                        }, t.prototype.setTag = function(t, e) {
                            var n;
                            return this._tags = i(i({}, this._tags), ((n = {})[t] = e, n)), this._notifyScopeListeners(), this
                        }, t.prototype.setExtras = function(t) {
                            return this._extra = i(i({}, this._extra), t), this._notifyScopeListeners(), this
                        }, t.prototype.setExtra = function(t, e) {
                            var n;
                            return this._extra = i(i({}, this._extra), ((n = {})[t] = e, n)), this._notifyScopeListeners(), this
                        }, t.prototype.setFingerprint = function(t) {
                            return this._fingerprint = t, this._notifyScopeListeners(), this
                        }, t.prototype.setLevel = function(t) {
                            return this._level = t, this._notifyScopeListeners(), this
                        }, t.prototype.setTransactionName = function(t) {
                            return this._transactionName = t, this._notifyScopeListeners(), this
                        }, t.prototype.setTransaction = function(t) {
                            return this.setTransactionName(t)
                        }, t.prototype.setContext = function(t, e) {
                            var n;
                            return null === e ? delete this._contexts[t] : this._contexts = i(i({}, this._contexts), ((n = {})[t] = e, n)), this._notifyScopeListeners(), this
                        }, t.prototype.setSpan = function(t) {
                            return this._span = t, this._notifyScopeListeners(), this
                        }, t.prototype.getSpan = function() {
                            return this._span
                        }, t.prototype.getTransaction = function() {
                            var t = this.getSpan();
                            return t && t.transaction
                        }, t.prototype.setSession = function(t) {
                            return t ? this._session = t : delete this._session, this._notifyScopeListeners(), this
                        }, t.prototype.getSession = function() {
                            return this._session
                        }, t.prototype.update = function(e) {
                            if (!e) return this;
                            if ("function" == typeof e) {
                                var n = e(this);
                                return n instanceof t ? n : this
                            }
                            return e instanceof t ? (this._tags = i(i({}, this._tags), e._tags), this._extra = i(i({}, this._extra), e._extra), this._contexts = i(i({}, this._contexts), e._contexts), e._user && Object.keys(e._user).length && (this._user = e._user), e._level && (this._level = e._level), e._fingerprint && (this._fingerprint = e._fingerprint), e._requestSession && (this._requestSession = e._requestSession)) : w(e) && (e = e, this._tags = i(i({}, this._tags), e.tags), this._extra = i(i({}, this._extra), e.extra), this._contexts = i(i({}, this._contexts), e.contexts), e.user && (this._user = e.user), e.level && (this._level = e.level), e.fingerprint && (this._fingerprint = e.fingerprint), e.requestSession && (this._requestSession = e.requestSession)), this
                        }, t.prototype.clear = function() {
                            return this._breadcrumbs = [], this._tags = {}, this._extra = {}, this._user = {}, this._contexts = {}, this._level = void 0, this._transactionName = void 0, this._fingerprint = void 0, this._requestSession = void 0, this._span = void 0, this._session = void 0, this._notifyScopeListeners(), this
                        }, t.prototype.addBreadcrumb = function(t, e) {
                            var n = "number" == typeof e ? Math.min(e, 100) : 100;
                            if (n <= 0) return this;
                            var r = i({
                                timestamp: (0, J.yW)()
                            }, t);
                            return this._breadcrumbs = u(this._breadcrumbs, [r]).slice(-n), this._notifyScopeListeners(), this
                        }, t.prototype.clearBreadcrumbs = function() {
                            return this._breadcrumbs = [], this._notifyScopeListeners(), this
                        }, t.prototype.applyToEvent = function(t, e) {
                            if (this._extra && Object.keys(this._extra).length && (t.extra = i(i({}, this._extra), t.extra)), this._tags && Object.keys(this._tags).length && (t.tags = i(i({}, this._tags), t.tags)), this._user && Object.keys(this._user).length && (t.user = i(i({}, this._user), t.user)), this._contexts && Object.keys(this._contexts).length && (t.contexts = i(i({}, this._contexts), t.contexts)), this._level && (t.level = this._level), this._transactionName && (t.transaction = this._transactionName), this._span) {
                                t.contexts = i({
                                    trace: this._span.getTraceContext()
                                }, t.contexts);
                                var n = this._span.transaction && this._span.transaction.name;
                                n && (t.tags = i({
                                    transaction: n
                                }, t.tags))
                            }
                            return this._applyFingerprint(t), t.breadcrumbs = u(t.breadcrumbs || [], this._breadcrumbs), t.breadcrumbs = t.breadcrumbs.length > 0 ? t.breadcrumbs : void 0, t.sdkProcessingMetadata = this._sdkProcessingMetadata, this._notifyEventProcessors(u(ot(), this._eventProcessors), t, e)
                        }, t.prototype.setSDKProcessingMetadata = function(t) {
                            return this._sdkProcessingMetadata = i(i({}, this._sdkProcessingMetadata), t), this
                        }, t.prototype._notifyEventProcessors = function(t, e, n, r) {
                            var o = this;
                            return void 0 === r && (r = 0), new nt((function(s, a) {
                                var u = t[r];
                                if (null === e || "function" != typeof u) s(e);
                                else {
                                    var c = u(i({}, e), n);
                                    S(c) ? c.then((function(e) {
                                        return o._notifyEventProcessors(t, e, n, r + 1).then(s)
                                    })).then(null, a) : o._notifyEventProcessors(t, c, n, r + 1).then(s).then(null, a)
                                }
                            }))
                        }, t.prototype._notifyScopeListeners = function() {
                            var t = this;
                            this._notifyingListeners || (this._notifyingListeners = !0, this._scopeListeners.forEach((function(e) {
                                e(t)
                            })), this._notifyingListeners = !1)
                        }, t.prototype._applyFingerprint = function(t) {
                            t.fingerprint = t.fingerprint ? Array.isArray(t.fingerprint) ? t.fingerprint : [t.fingerprint] : [], this._fingerprint && (t.fingerprint = t.fingerprint.concat(this._fingerprint)), t.fingerprint && !t.fingerprint.length && delete t.fingerprint
                        }, t
                    }();

                function ot() {
                    return (0, l.Y)("globalEventProcessors", (function() {
                        return []
                    }))
                }

                function it(t) {
                    ot().push(t)
                }
                var st = function() {
                        function t(t) {
                            this.errors = 0, this.sid = L(), this.duration = 0, this.status = "ok", this.init = !0, this.ignoreDuration = !1;
                            var e = (0, J.ph)();
                            this.timestamp = e, this.started = e, t && this.update(t)
                        }
                        return t.prototype.update = function(t) {
                            if (void 0 === t && (t = {}), t.user && (!this.ipAddress && t.user.ip_address && (this.ipAddress = t.user.ip_address), !this.did && !t.did && (this.did = t.user.id || t.user.email || t.user.username)), this.timestamp = t.timestamp || (0, J.ph)(), t.ignoreDuration && (this.ignoreDuration = t.ignoreDuration), t.sid && (this.sid = 32 === t.sid.length ? t.sid : L()), void 0 !== t.init && (this.init = t.init), !this.did && t.did && (this.did = "" + t.did), "number" == typeof t.started && (this.started = t.started), this.ignoreDuration) this.duration = void 0;
                            else if ("number" == typeof t.duration) this.duration = t.duration;
                            else {
                                var e = this.timestamp - this.started;
                                this.duration = e >= 0 ? e : 0
                            }
                            t.release && (this.release = t.release), t.environment && (this.environment = t.environment), !this.ipAddress && t.ipAddress && (this.ipAddress = t.ipAddress), !this.userAgent && t.userAgent && (this.userAgent = t.userAgent), "number" == typeof t.errors && (this.errors = t.errors), t.status && (this.status = t.status)
                        }, t.prototype.close = function(t) {
                            t ? this.update({
                                status: t
                            }) : "ok" === this.status ? this.update({
                                status: "exited"
                            }) : this.update()
                        }, t.prototype.toJSON = function() {
                            return C({
                                sid: "" + this.sid,
                                init: this.init,
                                started: new Date(1e3 * this.started).toISOString(),
                                timestamp: new Date(1e3 * this.timestamp).toISOString(),
                                status: this.status,
                                errors: this.errors,
                                did: "number" == typeof this.did || "string" == typeof this.did ? "" + this.did : void 0,
                                duration: this.duration,
                                attrs: {
                                    release: this.release,
                                    environment: this.environment,
                                    ip_address: this.ipAddress,
                                    user_agent: this.userAgent
                                }
                            })
                        }, t
                    }(),
                    at = function() {
                        function t(t, e, n) {
                            void 0 === e && (e = new rt), void 0 === n && (n = 4), this._version = n, this._stack = [{}], this.getStackTop().scope = e, t && this.bindClient(t)
                        }
                        return t.prototype.isOlderThan = function(t) {
                            return this._version < t
                        }, t.prototype.bindClient = function(t) {
                            this.getStackTop().client = t, t && t.setupIntegrations && t.setupIntegrations()
                        }, t.prototype.pushScope = function() {
                            var t = rt.clone(this.getScope());
                            return this.getStack().push({
                                client: this.getClient(),
                                scope: t
                            }), t
                        }, t.prototype.popScope = function() {
                            return !(this.getStack().length <= 1 || !this.getStack().pop())
                        }, t.prototype.withScope = function(t) {
                            var e = this.pushScope();
                            try {
                                t(e)
                            } finally {
                                this.popScope()
                            }
                        }, t.prototype.getClient = function() {
                            return this.getStackTop().client
                        }, t.prototype.getScope = function() {
                            return this.getStackTop().scope
                        }, t.prototype.getStack = function() {
                            return this._stack
                        }, t.prototype.getStackTop = function() {
                            return this._stack[this._stack.length - 1]
                        }, t.prototype.captureException = function(t, e) {
                            var n = this._lastEventId = e && e.event_id ? e.event_id : L(),
                                r = e;
                            if (!e) {
                                var o = void 0;
                                try {
                                    throw new Error("Sentry syntheticException")
                                } catch (t) {
                                    o = t
                                }
                                r = {
                                    originalException: t,
                                    syntheticException: o
                                }
                            }
                            return this._invokeClient("captureException", t, i(i({}, r), {
                                event_id: n
                            })), n
                        }, t.prototype.captureMessage = function(t, e, n) {
                            var r = this._lastEventId = n && n.event_id ? n.event_id : L(),
                                o = n;
                            if (!n) {
                                var s = void 0;
                                try {
                                    throw new Error(t)
                                } catch (t) {
                                    s = t
                                }
                                o = {
                                    originalException: t,
                                    syntheticException: s
                                }
                            }
                            return this._invokeClient("captureMessage", t, e, i(i({}, o), {
                                event_id: r
                            })), r
                        }, t.prototype.captureEvent = function(t, e) {
                            var n = e && e.event_id ? e.event_id : L();
                            return "transaction" !== t.type && (this._lastEventId = n), this._invokeClient("captureEvent", t, i(i({}, e), {
                                event_id: n
                            })), n
                        }, t.prototype.lastEventId = function() {
                            return this._lastEventId
                        }, t.prototype.addBreadcrumb = function(t, e) {
                            var n = this.getStackTop(),
                                r = n.scope,
                                o = n.client;
                            if (r && o) {
                                var s = o.getOptions && o.getOptions() || {},
                                    a = s.beforeBreadcrumb,
                                    u = void 0 === a ? null : a,
                                    c = s.maxBreadcrumbs,
                                    p = void 0 === c ? 100 : c;
                                if (!(p <= 0)) {
                                    var l = (0, J.yW)(),
                                        f = i({
                                            timestamp: l
                                        }, t),
                                        d = u ? v((function() {
                                            return u(f, e)
                                        })) : f;
                                    null !== d && r.addBreadcrumb(d, p)
                                }
                            }
                        }, t.prototype.setUser = function(t) {
                            var e = this.getScope();
                            e && e.setUser(t)
                        }, t.prototype.setTags = function(t) {
                            var e = this.getScope();
                            e && e.setTags(t)
                        }, t.prototype.setExtras = function(t) {
                            var e = this.getScope();
                            e && e.setExtras(t)
                        }, t.prototype.setTag = function(t, e) {
                            var n = this.getScope();
                            n && n.setTag(t, e)
                        }, t.prototype.setExtra = function(t, e) {
                            var n = this.getScope();
                            n && n.setExtra(t, e)
                        }, t.prototype.setContext = function(t, e) {
                            var n = this.getScope();
                            n && n.setContext(t, e)
                        }, t.prototype.configureScope = function(t) {
                            var e = this.getStackTop(),
                                n = e.scope,
                                r = e.client;
                            n && r && t(n)
                        }, t.prototype.run = function(t) {
                            var e = ct(this);
                            try {
                                t(this)
                            } finally {
                                ct(e)
                            }
                        }, t.prototype.getIntegration = function(t) {
                            var e = this.getClient();
                            if (!e) return null;
                            try {
                                return e.getIntegration(t)
                            } catch (e) {
                                return Q && c.warn("Cannot retrieve integration " + t.id + " from the current Hub"), null
                            }
                        }, t.prototype.startSpan = function(t) {
                            return this._callExtensionMethod("startSpan", t)
                        }, t.prototype.startTransaction = function(t, e) {
                            return this._callExtensionMethod("startTransaction", t, e)
                        }, t.prototype.traceHeaders = function() {
                            return this._callExtensionMethod("traceHeaders")
                        }, t.prototype.captureSession = function(t) {
                            if (void 0 === t && (t = !1), t) return this.endSession();
                            this._sendSessionUpdate()
                        }, t.prototype.endSession = function() {
                            var t = this.getStackTop(),
                                e = t && t.scope,
                                n = e && e.getSession();
                            n && n.close(), this._sendSessionUpdate(), e && e.setSession()
                        }, t.prototype.startSession = function(t) {
                            var e = this.getStackTop(),
                                n = e.scope,
                                r = e.client,
                                o = r && r.getOptions() || {},
                                s = o.release,
                                a = o.environment,
                                u = ((0, l.R)().navigator || {}).userAgent,
                                c = new st(i(i(i({
                                    release: s,
                                    environment: a
                                }, n && {
                                    user: n.getUser()
                                }), u && {
                                    userAgent: u
                                }), t));
                            if (n) {
                                var p = n.getSession && n.getSession();
                                p && "ok" === p.status && p.update({
                                    status: "exited"
                                }), this.endSession(), n.setSession(c)
                            }
                            return c
                        }, t.prototype._sendSessionUpdate = function() {
                            var t = this.getStackTop(),
                                e = t.scope,
                                n = t.client;
                            if (e) {
                                var r = e.getSession && e.getSession();
                                r && n && n.captureSession && n.captureSession(r)
                            }
                        }, t.prototype._invokeClient = function(t) {
                            for (var e, n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
                            var o = this.getStackTop(),
                                i = o.scope,
                                s = o.client;
                            s && s[t] && (e = s)[t].apply(e, u(n, [i]))
                        }, t.prototype._callExtensionMethod = function(t) {
                            for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                            var r = ut(),
                                o = r.__SENTRY__;
                            if (o && o.extensions && "function" == typeof o.extensions[t]) return o.extensions[t].apply(this, e);
                            Q && c.warn("Extension method " + t + " couldn't be found, doing nothing.")
                        }, t
                    }();

                function ut() {
                    var t = (0, l.R)();
                    return t.__SENTRY__ = t.__SENTRY__ || {
                        extensions: {},
                        hub: void 0
                    }, t
                }

                function ct(t) {
                    var e = ut(),
                        n = ft(e);
                    return dt(e, t), n
                }

                function pt() {
                    var t = ut();
                    return (!lt(t) || ft(t).isOlderThan(4)) && dt(t, new at), (0, X.KV)() ? function(t) {
                        try {
                            var e = ut().__SENTRY__,
                                n = e && e.extensions && e.extensions.domain && e.extensions.domain.active;
                            if (!n) return ft(t);
                            if (!lt(n) || ft(n).isOlderThan(4)) {
                                var r = ft(t).getStackTop();
                                dt(n, new at(r.client, rt.clone(r.scope)))
                            }
                            return ft(n)
                        } catch (e) {
                            return ft(t)
                        }
                    }(t) : ft(t)
                }

                function lt(t) {
                    return !!(t && t.__SENTRY__ && t.__SENTRY__.hub)
                }

                function ft(t) {
                    return (0, l.Y)("hub", (function() {
                        return new at
                    }), t)
                }

                function dt(t, e) {
                    return !!t && ((t.__SENTRY__ = t.__SENTRY__ || {}).hub = e, !0)
                }
                var ht = Object.setPrototypeOf || ({
                            __proto__: []
                        }
                        instanceof Array ? function(t, e) {
                            return t.__proto__ = e, t
                        } : function(t, e) {
                            for (var n in e) Object.prototype.hasOwnProperty.call(t, n) || (t[n] = e[n]);
                            return t
                        }),
                    vt = function(t) {
                        function e(e) {
                            var n = this.constructor,
                                r = t.call(this, e) || this;
                            return r.message = e, r.name = n.prototype.constructor.name, ht(r, n.prototype), r
                        }
                        return o(e, t), e
                    }(Error),
                    _t = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/;

                function gt(t, e) {
                    void 0 === e && (e = !1);
                    var n = t.host,
                        r = t.path,
                        o = t.pass,
                        i = t.port,
                        s = t.projectId;
                    return t.protocol + "://" + t.publicKey + (e && o ? ":" + o : "") + "@" + n + (i ? ":" + i : "") + "/" + (r && r + "/") + s
                }

                function yt(t) {
                    return "user" in t && !("publicKey" in t) && (t.publicKey = t.user), {
                        user: t.publicKey || "",
                        protocol: t.protocol,
                        publicKey: t.publicKey || "",
                        pass: t.pass || "",
                        host: t.host,
                        port: t.port || "",
                        path: t.path || "",
                        projectId: t.projectId
                    }
                }

                function mt(t) {
                    var e = "string" == typeof t ? function(t) {
                        var e = _t.exec(t);
                        if (!e) throw new vt("Invalid Sentry Dsn: " + t);
                        var n = a(e.slice(1), 6),
                            r = n[0],
                            o = n[1],
                            i = n[2],
                            s = void 0 === i ? "" : i,
                            u = n[3],
                            c = n[4],
                            p = void 0 === c ? "" : c,
                            l = "",
                            f = n[5],
                            d = f.split("/");
                        if (d.length > 1 && (l = d.slice(0, -1).join("/"), f = d.pop()), f) {
                            var h = f.match(/^\d+/);
                            h && (f = h[0])
                        }
                        return yt({
                            host: u,
                            pass: s,
                            path: l,
                            projectId: f,
                            port: p,
                            protocol: r,
                            publicKey: o
                        })
                    }(t) : yt(t);
                    return function(t) {
                        if (p) {
                            var e = t.port,
                                n = t.projectId,
                                r = t.protocol;
                            if (["protocol", "publicKey", "host", "projectId"].forEach((function(e) {
                                    if (!t[e]) throw new vt("Invalid Sentry Dsn: " + e + " missing")
                                })), !n.match(/^\d+$/)) throw new vt("Invalid Sentry Dsn: Invalid projectId " + n);
                            if (! function(t) {
                                    return "http" === t || "https" === t
                                }(r)) throw new vt("Invalid Sentry Dsn: Invalid protocol " + r);
                            if (e && isNaN(parseInt(e, 10))) throw new vt("Invalid Sentry Dsn: Invalid port " + e)
                        }
                    }(e), e
                }
                var bt = "<anonymous>";

                function Et(t, e, r) {
                    void 0 === e && (e = 1 / 0), void 0 === r && (r = 1 / 0);
                    try {
                        return function t(e, r, o, i, s) {
                            void 0 === o && (o = 1 / 0), void 0 === i && (i = 1 / 0), void 0 === s && (s = function() {
                                var t = "function" == typeof WeakSet,
                                    e = t ? new WeakSet : [];
                                return [function(n) {
                                    if (t) return !!e.has(n) || (e.add(n), !1);
                                    for (var r = 0; r < e.length; r++)
                                        if (e[r] === n) return !0;
                                    return e.push(n), !1
                                }, function(n) {
                                    if (t) e.delete(n);
                                    else
                                        for (var r = 0; r < e.length; r++)
                                            if (e[r] === n) {
                                                e.splice(r, 1);
                                                break
                                            }
                                }]
                            }());
                            var u = a(s, 2),
                                c = u[0],
                                p = u[1],
                                l = r;
                            if (l && "function" == typeof l.toJSON) try {
                                return l.toJSON()
                            } catch (t) {}
                            if (null === r || ["number", "boolean", "string"].includes(typeof r) && ! function(t) {
                                    return "number" == typeof t && t != t
                                }(r)) return r;
                            var f = function(t, e) {
                                try {
                                    return "domain" === t && e && "object" == typeof e && e._events ? "[Domain]" : "domainEmitter" === t ? "[DomainEmitter]" : void 0 !== n.g && e === n.g ? "[Global]" : "undefined" != typeof window && e === window ? "[Window]" : "undefined" != typeof document && e === document ? "[Document]" : function(t) {
                                        return w(t) && "nativeEvent" in t && "preventDefault" in t && "stopPropagation" in t
                                    }(e) ? "[SyntheticEvent]" : "number" == typeof e && e != e ? "[NaN]" : void 0 === e ? "[undefined]" : "function" == typeof e ? "[Function: " + function(t) {
                                        try {
                                            return t && "function" == typeof t && t.name || bt
                                        } catch (t) {
                                            return bt
                                        }
                                    }(e) + "]" : "symbol" == typeof e ? "[" + String(e) + "]" : "bigint" == typeof e ? "[BigInt: " + String(e) + "]" : "[object " + Object.getPrototypeOf(e).constructor.name + "]"
                                } catch (t) {
                                    return "**non-serializable** (" + t + ")"
                                }
                            }(e, r);
                            if (!f.startsWith("[object ")) return f;
                            if (0 === o) return f.replace("object ", "");
                            if (c(r)) return "[Circular ~]";
                            var d = Array.isArray(r) ? [] : {},
                                h = 0,
                                v = y(r) || x(r) ? M(r) : r;
                            for (var _ in v)
                                if (Object.prototype.hasOwnProperty.call(v, _)) {
                                    if (h >= i) {
                                        d[_] = "[MaxProperties ~]";
                                        break
                                    }
                                    var g = v[_];
                                    d[_] = t(_, g, o - 1, i, s), h += 1
                                }
                            return p(r), d
                        }("", t, e, r)
                    } catch (t) {
                        return {
                            ERROR: "**non-serializable** (" + t + ")"
                        }
                    }
                }

                function wt(t, e, n) {
                    void 0 === e && (e = 3), void 0 === n && (n = 102400);
                    var r = Et(t, e);
                    return function(t) {
                        return function(t) {
                            return ~-encodeURI(t).split(/%..|./).length
                        }(JSON.stringify(t))
                    }(r) > n ? wt(t, e - 1, n) : r
                }
                var xt = [];

                function St(t) {
                    return t.reduce((function(t, e) {
                        return t.every((function(t) {
                            return e.name !== t.name
                        })) && t.push(e), t
                    }), [])
                }

                function kt(t) {
                    var e = {};
                    return function(t) {
                        var e = t.defaultIntegrations && u(t.defaultIntegrations) || [],
                            n = t.integrations,
                            r = u(St(e));
                        Array.isArray(n) ? r = u(r.filter((function(t) {
                            return n.every((function(e) {
                                return e.name !== t.name
                            }))
                        })), St(n)) : "function" == typeof n && (r = n(r), r = Array.isArray(r) ? r : [r]);
                        var o = r.map((function(t) {
                                return t.name
                            })),
                            i = "Debug";
                        return -1 !== o.indexOf(i) && r.push.apply(r, u(r.splice(o.indexOf(i), 1))), r
                    }(t).forEach((function(t) {
                        e[t.name] = t,
                            function(t) {
                                -1 === xt.indexOf(t.name) && (t.setupOnce(it, pt), xt.push(t.name), W && c.log("Integration installed: " + t.name))
                            }(t)
                    })), R(e, "initialized", !0), e
                }
                var Ot = "Not capturing exception because it's already been captured.",
                    Tt = function() {
                        function t(t, e) {
                            this._integrations = {}, this._numProcessing = 0, this._backend = new t(e), this._options = e, e.dsn && (this._dsn = mt(e.dsn))
                        }
                        return t.prototype.captureException = function(t, e, n) {
                            var r = this;
                            if (!B(t)) {
                                var o = e && e.event_id;
                                return this._process(this._getBackend().eventFromException(t, e).then((function(t) {
                                    return r._captureEvent(t, e, n)
                                })).then((function(t) {
                                    o = t
                                }))), o
                            }
                            W && c.log(Ot)
                        }, t.prototype.captureMessage = function(t, e, n, r) {
                            var o = this,
                                i = n && n.event_id,
                                s = function(t) {
                                    return null === t || "object" != typeof t && "function" != typeof t
                                }(t) ? this._getBackend().eventFromMessage(String(t), e, n) : this._getBackend().eventFromException(t, n);
                            return this._process(s.then((function(t) {
                                return o._captureEvent(t, n, r)
                            })).then((function(t) {
                                i = t
                            }))), i
                        }, t.prototype.captureEvent = function(t, e, n) {
                            if (!(e && e.originalException && B(e.originalException))) {
                                var r = e && e.event_id;
                                return this._process(this._captureEvent(t, e, n).then((function(t) {
                                    r = t
                                }))), r
                            }
                            W && c.log(Ot)
                        }, t.prototype.captureSession = function(t) {
                            this._isEnabled() ? "string" != typeof t.release ? W && c.warn("Discarded session because of missing or non-string release") : (this._sendSession(t), t.update({
                                init: !1
                            })) : W && c.warn("SDK not enabled, will not capture session.")
                        }, t.prototype.getDsn = function() {
                            return this._dsn
                        }, t.prototype.getOptions = function() {
                            return this._options
                        }, t.prototype.getTransport = function() {
                            return this._getBackend().getTransport()
                        }, t.prototype.flush = function(t) {
                            var e = this;
                            return this._isClientDoneProcessing(t).then((function(n) {
                                return e.getTransport().close(t).then((function(t) {
                                    return n && t
                                }))
                            }))
                        }, t.prototype.close = function(t) {
                            var e = this;
                            return this.flush(t).then((function(t) {
                                return e.getOptions().enabled = !1, t
                            }))
                        }, t.prototype.setupIntegrations = function() {
                            this._isEnabled() && !this._integrations.initialized && (this._integrations = kt(this._options))
                        }, t.prototype.getIntegration = function(t) {
                            try {
                                return this._integrations[t.id] || null
                            } catch (e) {
                                return W && c.warn("Cannot retrieve integration " + t.id + " from the current Client"), null
                            }
                        }, t.prototype._updateSessionFromEvent = function(t, e) {
                            var n, r, o = !1,
                                a = !1,
                                u = e.exception && e.exception.values;
                            if (u) {
                                a = !0;
                                try {
                                    for (var c = s(u), p = c.next(); !p.done; p = c.next()) {
                                        var l = p.value.mechanism;
                                        if (l && !1 === l.handled) {
                                            o = !0;
                                            break
                                        }
                                    }
                                } catch (t) {
                                    n = {
                                        error: t
                                    }
                                } finally {
                                    try {
                                        p && !p.done && (r = c.return) && r.call(c)
                                    } finally {
                                        if (n) throw n.error
                                    }
                                }
                            }
                            var f = "ok" === t.status;
                            (f && 0 === t.errors || f && o) && (t.update(i(i({}, o && {
                                status: "crashed"
                            }), {
                                errors: t.errors || Number(a || o)
                            })), this.captureSession(t))
                        }, t.prototype._sendSession = function(t) {
                            this._getBackend().sendSession(t)
                        }, t.prototype._isClientDoneProcessing = function(t) {
                            var e = this;
                            return new nt((function(n) {
                                var r = 0,
                                    o = setInterval((function() {
                                        0 == e._numProcessing ? (clearInterval(o), n(!0)) : (r += 1, t && r >= t && (clearInterval(o), n(!1)))
                                    }), 1)
                            }))
                        }, t.prototype._getBackend = function() {
                            return this._backend
                        }, t.prototype._isEnabled = function() {
                            return !1 !== this.getOptions().enabled && void 0 !== this._dsn
                        }, t.prototype._prepareEvent = function(t, e, n) {
                            var r = this,
                                o = this.getOptions(),
                                s = o.normalizeDepth,
                                a = void 0 === s ? 3 : s,
                                u = o.normalizeMaxBreadth,
                                c = void 0 === u ? 1e3 : u,
                                p = i(i({}, t), {
                                    event_id: t.event_id || (n && n.event_id ? n.event_id : L()),
                                    timestamp: t.timestamp || (0, J.yW)()
                                });
                            this._applyClientOptions(p), this._applyIntegrationsMetadata(p);
                            var l = e;
                            n && n.captureContext && (l = rt.clone(l).update(n.captureContext));
                            var f = Z(p);
                            return l && (f = l.applyToEvent(p, n)), f.then((function(t) {
                                return t && (t.sdkProcessingMetadata = i(i({}, t.sdkProcessingMetadata), {
                                    normalizeDepth: Et(a) + " (" + typeof a + ")"
                                })), "number" == typeof a && a > 0 ? r._normalizeEvent(t, a, c) : t
                            }))
                        }, t.prototype._normalizeEvent = function(t, e, n) {
                            if (!t) return null;
                            var r = i(i(i(i(i({}, t), t.breadcrumbs && {
                                breadcrumbs: t.breadcrumbs.map((function(t) {
                                    return i(i({}, t), t.data && {
                                        data: Et(t.data, e, n)
                                    })
                                }))
                            }), t.user && {
                                user: Et(t.user, e, n)
                            }), t.contexts && {
                                contexts: Et(t.contexts, e, n)
                            }), t.extra && {
                                extra: Et(t.extra, e, n)
                            });
                            return t.contexts && t.contexts.trace && (r.contexts.trace = t.contexts.trace), r.sdkProcessingMetadata = i(i({}, r.sdkProcessingMetadata), {
                                baseClientNormalized: !0
                            }), r
                        }, t.prototype._applyClientOptions = function(t) {
                            var e = this.getOptions(),
                                n = e.environment,
                                r = e.release,
                                o = e.dist,
                                i = e.maxValueLength,
                                s = void 0 === i ? 250 : i;
                            "environment" in t || (t.environment = "environment" in e ? n : "production"), void 0 === t.release && void 0 !== r && (t.release = r), void 0 === t.dist && void 0 !== o && (t.dist = o), t.message && (t.message = T(t.message, s));
                            var a = t.exception && t.exception.values && t.exception.values[0];
                            a && a.value && (a.value = T(a.value, s));
                            var u = t.request;
                            u && u.url && (u.url = T(u.url, s))
                        }, t.prototype._applyIntegrationsMetadata = function(t) {
                            var e = Object.keys(this._integrations);
                            e.length > 0 && (t.sdk = t.sdk || {}, t.sdk.integrations = u(t.sdk.integrations || [], e))
                        }, t.prototype._sendEvent = function(t) {
                            this._getBackend().sendEvent(t)
                        }, t.prototype._captureEvent = function(t, e, n) {
                            return this._processEvent(t, e, n).then((function(t) {
                                return t.event_id
                            }), (function(t) {
                                W && c.error(t)
                            }))
                        }, t.prototype._processEvent = function(t, e, n) {
                            var r = this,
                                o = this.getOptions(),
                                i = o.beforeSend,
                                s = o.sampleRate,
                                a = this.getTransport();

                            function u(t, e) {
                                a.recordLostEvent && a.recordLostEvent(t, e)
                            }
                            if (!this._isEnabled()) return et(new vt("SDK not enabled, will not capture event."));
                            var c = "transaction" === t.type;
                            return !c && "number" == typeof s && Math.random() > s ? (u("sample_rate", "event"), et(new vt("Discarding event because it's not included in the random sample (sampling rate = " + s + ")"))) : this._prepareEvent(t, n, e).then((function(n) {
                                if (null === n) throw u("event_processor", t.type || "event"), new vt("An event processor returned null, will not send event.");
                                return e && e.data && !0 === e.data.__sentry__ || c || !i ? n : function(t) {
                                    var e = "`beforeSend` method has to return `null` or a valid event.";
                                    if (S(t)) return t.then((function(t) {
                                        if (!w(t) && null !== t) throw new vt(e);
                                        return t
                                    }), (function(t) {
                                        throw new vt("beforeSend rejected with " + t)
                                    }));
                                    if (!w(t) && null !== t) throw new vt(e);
                                    return t
                                }(i(n, e))
                            })).then((function(e) {
                                if (null === e) throw u("before_send", t.type || "event"), new vt("`beforeSend` returned `null`, will not send event.");
                                var o = n && n.getSession && n.getSession();
                                return !c && o && r._updateSessionFromEvent(o, e), r._sendEvent(e), e
                            })).then(null, (function(t) {
                                throw t instanceof vt ? t : (r.captureException(t, {
                                    data: {
                                        __sentry__: !0
                                    },
                                    originalException: t
                                }), new vt("Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: " + t))
                            }))
                        }, t.prototype._process = function(t) {
                            var e = this;
                            this._numProcessing += 1, t.then((function(t) {
                                return e._numProcessing -= 1, t
                            }), (function(t) {
                                return e._numProcessing -= 1, t
                            }))
                        }, t
                    }(),
                    jt = function() {
                        function t(t, e, n) {
                            void 0 === e && (e = {}), this.dsn = t, this._dsnObject = mt(t), this.metadata = e, this._tunnel = n
                        }
                        return t.prototype.getDsn = function() {
                            return this._dsnObject
                        }, t.prototype.forceEnvelope = function() {
                            return !!this._tunnel
                        }, t.prototype.getBaseApiEndpoint = function() {
                            return Rt(this._dsnObject)
                        }, t.prototype.getStoreEndpoint = function() {
                            return Pt(this._dsnObject)
                        }, t.prototype.getStoreEndpointWithUrlEncodedAuth = function() {
                            return function(t) {
                                return Pt(t) + "?" + Mt(t)
                            }(this._dsnObject)
                        }, t.prototype.getEnvelopeEndpointWithUrlEncodedAuth = function() {
                            return function(t, e) {
                                return e || function(t) {
                                    return Nt(t, "envelope")
                                }(t) + "?" + Mt(t)
                            }(this._dsnObject, this._tunnel)
                        }, t
                    }();

                function It(t, e, n) {
                    return {
                        initDsn: t,
                        metadata: e || {},
                        dsn: mt(t),
                        tunnel: n
                    }
                }

                function Rt(t) {
                    var e = t.protocol ? t.protocol + ":" : "",
                        n = t.port ? ":" + t.port : "";
                    return e + "//" + t.host + n + (t.path ? "/" + t.path : "") + "/api/"
                }

                function Nt(t, e) {
                    return "" + Rt(t) + t.projectId + "/" + e + "/"
                }

                function Mt(t) {
                    return function(t) {
                        return Object.keys(t).map((function(e) {
                            return encodeURIComponent(e) + "=" + encodeURIComponent(t[e])
                        })).join("&")
                    }({
                        sentry_key: t.publicKey,
                        sentry_version: "7"
                    })
                }

                function Pt(t) {
                    return Nt(t, "store")
                }

                function Dt(t, e) {
                    return void 0 === e && (e = []), [t, e]
                }

                function Ut(t) {
                    if (t.metadata && t.metadata.sdk) {
                        var e = t.metadata.sdk;
                        return {
                            name: e.name,
                            version: e.version
                        }
                    }
                }

                function Ct(t, e) {
                    return e && (t.sdk = t.sdk || {}, t.sdk.name = t.sdk.name || e.name, t.sdk.version = t.sdk.version || e.version, t.sdk.integrations = u(t.sdk.integrations || [], e.integrations || []), t.sdk.packages = u(t.sdk.packages || [], e.packages || [])), t
                }

                function Lt(t, e) {
                    var n = Ut(e),
                        r = "aggregates" in t ? "sessions" : "session";
                    return [Dt(i(i({
                        sent_at: (new Date).toISOString()
                    }, n && {
                        sdk: n
                    }), !!e.tunnel && {
                        dsn: gt(e.dsn)
                    }), [
                        [{
                            type: r
                        }, t]
                    ]), r]
                }
                var At, Ht, qt = function() {
                        function t() {}
                        return t.prototype.sendEvent = function(t) {
                            return Z({
                                reason: "NoopTransport: Event has been skipped because no Dsn is configured.",
                                status: "skipped"
                            })
                        }, t.prototype.close = function(t) {
                            return Z(!0)
                        }, t
                    }(),
                    Ft = function() {
                        function t(t) {
                            this._options = t, this._options.dsn || W && c.warn("No DSN provided, backend will not do anything."), this._transport = this._setupTransport()
                        }
                        return t.prototype.eventFromException = function(t, e) {
                            throw new vt("Backend has to implement `eventFromException` method")
                        }, t.prototype.eventFromMessage = function(t, e, n) {
                            throw new vt("Backend has to implement `eventFromMessage` method")
                        }, t.prototype.sendEvent = function(t) {
                            if (this._newTransport && this._options.dsn && this._options._experiments && this._options._experiments.newTransport) {
                                var e = function(t, e) {
                                    var n = Ut(e),
                                        r = t.type || "event",
                                        o = (t.sdkProcessingMetadata || {}).transactionSampling || {},
                                        s = o.method,
                                        a = o.rate;
                                    return Ct(t, e.metadata.sdk), t.tags = t.tags || {}, t.extra = t.extra || {}, t.sdkProcessingMetadata && t.sdkProcessingMetadata.baseClientNormalized || (t.tags.skippedNormalization = !0, t.extra.normalizeDepth = t.sdkProcessingMetadata ? t.sdkProcessingMetadata.normalizeDepth : "unset"), delete t.sdkProcessingMetadata, Dt(i(i({
                                        event_id: t.event_id,
                                        sent_at: (new Date).toISOString()
                                    }, n && {
                                        sdk: n
                                    }), !!e.tunnel && {
                                        dsn: gt(e.dsn)
                                    }), [
                                        [{
                                            type: r,
                                            sample_rates: [{
                                                id: s,
                                                rate: a
                                            }]
                                        }, t]
                                    ])
                                }(t, It(this._options.dsn, this._options._metadata, this._options.tunnel));
                                this._newTransport.send(e).then(null, (function(t) {
                                    W && c.error("Error while sending event:", t)
                                }))
                            } else this._transport.sendEvent(t).then(null, (function(t) {
                                W && c.error("Error while sending event:", t)
                            }))
                        }, t.prototype.sendSession = function(t) {
                            if (this._transport.sendSession)
                                if (this._newTransport && this._options.dsn && this._options._experiments && this._options._experiments.newTransport) {
                                    var e = a(Lt(t, It(this._options.dsn, this._options._metadata, this._options.tunnel)), 1)[0];
                                    this._newTransport.send(e).then(null, (function(t) {
                                        W && c.error("Error while sending session:", t)
                                    }))
                                } else this._transport.sendSession(t).then(null, (function(t) {
                                    W && c.error("Error while sending session:", t)
                                }));
                            else W && c.warn("Dropping session because custom transport doesn't implement sendSession")
                        }, t.prototype.getTransport = function() {
                            return this._transport
                        }, t.prototype._setupTransport = function() {
                            return new qt
                        }, t
                    }();
                (Ht = At || (At = {})).Fatal = "fatal", Ht.Error = "error", Ht.Warning = "warning", Ht.Log = "log", Ht.Info = "info", Ht.Debug = "debug", Ht.Critical = "critical";
                var Bt = "?",
                    Wt = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[-a-z]+:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
                    Yt = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i,
                    Gt = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
                    zt = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
                    Kt = /\((\S*)(?::(\d+))(?::(\d+))\)/,
                    Vt = /^\s*at (\w.*) \((\w*.js):(\d*):(\d*)/i;

                function $t(t) {
                    var e = null,
                        n = t && t.framesToPop;
                    try {
                        if (e = function(t) {
                                if (!t || !t.stacktrace) return null;
                                for (var e, n = t.stacktrace, r = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i, o = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i, i = n.split("\n"), s = [], a = 0; a < i.length; a += 2) {
                                    var u = null;
                                    (e = r.exec(i[a])) ? u = {
                                        url: e[2],
                                        func: e[3],
                                        args: [],
                                        line: +e[1],
                                        column: null
                                    }: (e = o.exec(i[a])) && (u = {
                                        url: e[6],
                                        func: e[3] || e[4],
                                        args: e[5] ? e[5].split(",") : [],
                                        line: +e[1],
                                        column: +e[2]
                                    }), u && (!u.func && u.line && (u.func = Bt), s.push(u))
                                }
                                return s.length ? {
                                    message: Xt(t),
                                    name: t.name,
                                    stack: s
                                } : null
                            }(t)) return Jt(e, n)
                    } catch (t) {}
                    try {
                        if (e = function(t) {
                                if (!t || !t.stack) return null;
                                for (var e, n, r, o = [], i = t.stack.split("\n"), s = 0; s < i.length; ++s) {
                                    if (n = Wt.exec(i[s])) {
                                        var a = n[2] && 0 === n[2].indexOf("native");
                                        n[2] && 0 === n[2].indexOf("eval") && (e = Kt.exec(n[2])) && (n[2] = e[1], n[3] = e[2], n[4] = e[3]), r = {
                                            url: n[2],
                                            func: n[1] || Bt,
                                            args: a ? [n[2]] : [],
                                            line: n[3] ? +n[3] : null,
                                            column: n[4] ? +n[4] : null
                                        }
                                    } else if (n = Gt.exec(i[s])) r = {
                                        url: n[2],
                                        func: n[1] || Bt,
                                        args: [],
                                        line: +n[3],
                                        column: n[4] ? +n[4] : null
                                    };
                                    else if (n = Yt.exec(i[s])) n[3] && n[3].indexOf(" > eval") > -1 && (e = zt.exec(n[3])) ? (n[1] = n[1] || "eval", n[3] = e[1], n[4] = e[2], n[5] = "") : 0 === s && !n[5] && void 0 !== t.columnNumber && (o[0].column = t.columnNumber + 1), r = {
                                        url: n[3],
                                        func: n[1] || Bt,
                                        args: n[2] ? n[2].split(",") : [],
                                        line: n[4] ? +n[4] : null,
                                        column: n[5] ? +n[5] : null
                                    };
                                    else {
                                        if (!(n = Vt.exec(i[s]))) continue;
                                        r = {
                                            url: n[2],
                                            func: n[1] || Bt,
                                            args: [],
                                            line: n[3] ? +n[3] : null,
                                            column: n[4] ? +n[4] : null
                                        }
                                    }!r.func && r.line && (r.func = Bt), o.push(r)
                                }
                                return o.length ? {
                                    message: Xt(t),
                                    name: t.name,
                                    stack: o
                                } : null
                            }(t)) return Jt(e, n)
                    } catch (t) {}
                    return {
                        message: Xt(t),
                        name: t && t.name,
                        stack: [],
                        failed: !0
                    }
                }

                function Jt(t, e) {
                    try {
                        return i(i({}, t), {
                            stack: t.stack.slice(e)
                        })
                    } catch (e) {
                        return t
                    }
                }

                function Xt(t) {
                    var e = t && t.message;
                    return e ? e.error && "string" == typeof e.error.message ? e.error.message : e : "No error message"
                }

                function Qt(t) {
                    var e = te(t.stack),
                        n = {
                            type: t.name,
                            value: t.message
                        };
                    return e && e.length && (n.stacktrace = {
                        frames: e
                    }), void 0 === n.type && "" === n.value && (n.value = "Unrecoverable error caught"), n
                }

                function Zt(t) {
                    return {
                        exception: {
                            values: [Qt(t)]
                        }
                    }
                }

                function te(t) {
                    if (!t || !t.length) return [];
                    var e = t,
                        n = e[0].func || "",
                        r = e[e.length - 1].func || "";
                    return (-1 !== n.indexOf("captureMessage") || -1 !== n.indexOf("captureException")) && (e = e.slice(1)), -1 !== r.indexOf("sentryWrapped") && (e = e.slice(0, -1)), e.map((function(t) {
                        return {
                            colno: null === t.column ? void 0 : t.column,
                            filename: t.url || e[0].url,
                            function: t.func || "?",
                            in_app: !0,
                            lineno: null === t.line ? void 0 : t.line
                        }
                    })).slice(0, 100).reverse()
                }

                function ee(t, e, n) {
                    var r;
                    if (void 0 === n && (n = {}), function(t) {
                            return m(t, "ErrorEvent")
                        }(t) && t.error) return r = Zt($t(t = t.error));
                    if (b(t) || function(t) {
                            return m(t, "DOMException")
                        }(t)) {
                        var o = t,
                            i = o.name || (b(o) ? "DOMError" : "DOMException"),
                            s = o.message ? i + ": " + o.message : i;
                        return q(r = ne(s, e, n), s), r
                    }
                    return y(t) ? r = Zt($t(t)) : w(t) || x(t) ? (F(r = function(t, e, n) {
                        var r = {
                            exception: {
                                values: [{
                                    type: x(t) ? t.constructor.name : n ? "UnhandledRejection" : "Error",
                                    value: "Non-Error " + (n ? "promise rejection" : "exception") + " captured with keys: " + U(t)
                                }]
                            },
                            extra: {
                                __serialized__: wt(t)
                            }
                        };
                        if (e) {
                            var o = te($t(e).stack);
                            r.stacktrace = {
                                frames: o
                            }
                        }
                        return r
                    }(t, e, n.rejection), {
                        synthetic: !0
                    }), r) : (q(r = ne(t, e, n), "" + t, void 0), F(r, {
                        synthetic: !0
                    }), r)
                }

                function ne(t, e, n) {
                    void 0 === n && (n = {});
                    var r = {
                        message: t
                    };
                    if (n.attachStacktrace && e) {
                        var o = te($t(e).stack);
                        r.stacktrace = {
                            frames: o
                        }
                    }
                    return r
                }

                function re(t) {
                    var e = [];

                    function n(t) {
                        return e.splice(e.indexOf(t), 1)[0]
                    }
                    return {
                        $: e,
                        add: function(r) {
                            if (!(void 0 === t || e.length < t)) return et(new vt("Not adding Promise due to buffer limit reached."));
                            var o = r();
                            return -1 === e.indexOf(o) && e.push(o), o.then((function() {
                                return n(o)
                            })).then(null, (function() {
                                return n(o).then(null, (function() {}))
                            })), o
                        },
                        drain: function(t) {
                            return new nt((function(n, r) {
                                var o = e.length;
                                if (!o) return n(!0);
                                var i = setTimeout((function() {
                                    t && t > 0 && n(!1)
                                }), t);
                                e.forEach((function(t) {
                                    Z(t).then((function() {
                                        --o || (clearTimeout(i), n(!0))
                                    }), r)
                                }))
                            }))
                        }
                    }
                }
                var oe = function() {
                    function t(t) {
                        this.options = t, this._buffer = re(30), this.url = new jt(this.options.dsn).getStoreEndpointWithUrlEncodedAuth()
                    }
                    return t.prototype.sendEvent = function(t) {
                        throw new vt("Transport Class has to implement `sendEvent` method")
                    }, t.prototype.close = function(t) {
                        return this._buffer.drain(t)
                    }, t
                }();

                function ie(t) {
                    return t >= 200 && t < 300 ? "success" : 429 === t ? "rate_limit" : t >= 400 && t < 500 ? "invalid" : t >= 500 ? "failed" : "unknown"
                }
                var se = function() {
                        var t = {
                            request: function() {},
                            httpRequest: function() {},
                            getSystemInfoSync: function() {}
                        };
                        if ("object" == typeof wx) t = wx;
                        else if ("object" == typeof my) t = my;
                        else if ("object" == typeof tt) t = tt;
                        else if ("object" == typeof dd) t = dd;
                        else if ("object" == typeof qq) t = qq;
                        else {
                            if ("object" != typeof swan) throw new Error("sentry-miniapp 暂不支持此平台");
                            t = swan
                        }
                        return t
                    }(),
                    ae = function() {
                        var t = "unknown";
                        return "object" == typeof wx ? t = "wechat" : "object" == typeof my ? t = "alipay" : "object" == typeof tt ? t = "bytedance" : "object" == typeof dd ? t = "dingtalk" : "object" == typeof qq ? t = "qq" : "object" == typeof swan && (t = "swan"), t
                    }(),
                    ue = function(t) {
                        function e() {
                            return null !== t && t.apply(this, arguments) || this
                        }
                        return o(e, t), e.prototype.sendEvent = function(t) {
                            var e = this,
                                n = se.request || se.httpRequest;
                            return this._buffer.add((function() {
                                return new Promise((function(r, o) {
                                    n({
                                        url: e.url,
                                        method: "POST",
                                        data: JSON.stringify(t),
                                        header: {
                                            "content-type": "application/json"
                                        },
                                        success: function(t) {
                                            r({
                                                status: ie(t.statusCode)
                                            })
                                        },
                                        fail: function(t) {
                                            o(t)
                                        }
                                    })
                                }))
                            }))
                        }, e
                    }(oe),
                    ce = function(t) {
                        function e() {
                            return null !== t && t.apply(this, arguments) || this
                        }
                        return o(e, t), e.prototype._setupTransport = function() {
                            if (!this._options.dsn) return t.prototype._setupTransport.call(this);
                            var e = i(i({}, this._options.transportOptions), {
                                dsn: this._options.dsn
                            });
                            return this._options.transport ? new this._options.transport(e) : new ue(e)
                        }, e.prototype.eventFromException = function(t, e) {
                            var n = ee(t, e && e.syntheticException || void 0, {
                                attachStacktrace: this._options.attachStacktrace
                            });
                            return F(n, {
                                handled: !0,
                                type: "generic"
                            }), n.level = At.Error, e && e.event_id && (n.event_id = e.event_id), Z(n)
                        }, e.prototype.eventFromMessage = function(t, e, n) {
                            void 0 === e && (e = At.Info);
                            var r = ne(t, n && n.syntheticException || void 0, {
                                attachStacktrace: this._options.attachStacktrace
                            });
                            return r.level = e, n && n.event_id && (r.event_id = n.event_id), Z(r)
                        }, e
                    }(Ft),
                    pe = function(t) {
                        function e(e) {
                            return void 0 === e && (e = {}), t.call(this, ce, e) || this
                        }
                        return o(e, t), e.prototype._prepareEvent = function(e, n, r) {
                            return e.platform = e.platform || "javascript", e.sdk = i(i({}, e.sdk), {
                                name: "sentry.javascript.miniapp",
                                packages: u(e.sdk && e.sdk.packages || [], [{
                                    name: "npm:@sentry/miniapp",
                                    version: "0.12.0"
                                }]),
                                version: "0.12.0"
                            }), t.prototype._prepareEvent.call(this, e, n, r)
                        }, e.prototype.showReportDialog = function(t) {
                            void 0 === t && (t = {}), console.log("sentry-miniapp 暂未实现该方法", t)
                        }, e
                    }(Tt),
                    le = function() {
                        function t(e) {
                            this.name = t.id, this._onErrorHandlerInstalled = !1, this._onUnhandledRejectionHandlerInstalled = !1, this._onPageNotFoundHandlerInstalled = !1, this._onMemoryWarningHandlerInstalled = !1, this._options = i({
                                onerror: !0,
                                onunhandledrejection: !0,
                                onpagenotfound: !0,
                                onmemorywarning: !0
                            }, e)
                        }
                        return t.prototype.setupOnce = function() {
                            Error.stackTraceLimit = 50, this._options.onerror && (c.log("Global Handler attached: onError"), this._installGlobalOnErrorHandler()), this._options.onunhandledrejection && (c.log("Global Handler attached: onunhandledrejection"), this._installGlobalOnUnhandledRejectionHandler()), this._options.onpagenotfound && (c.log("Global Handler attached: onPageNotFound"), this._installGlobalOnPageNotFoundHandler()), this._options.onmemorywarning && (c.log("Global Handler attached: onMemoryWarning"), this._installGlobalOnMemoryWarningHandler())
                        }, t.prototype._installGlobalOnErrorHandler = function() {
                            if (!this._onErrorHandlerInstalled) {
                                if (se.onError) {
                                    var t = pt();
                                    se.onError((function(e) {
                                        var n = "string" == typeof e ? new Error(e) : e;
                                        t.captureException(n)
                                    }))
                                }
                                this._onErrorHandlerInstalled = !0
                            }
                        }, t.prototype._installGlobalOnUnhandledRejectionHandler = function() {
                            if (!this._onUnhandledRejectionHandlerInstalled) {
                                if (se.onUnhandledRejection) {
                                    var t = pt();
                                    se.onUnhandledRejection((function(e) {
                                        var n = e.reason,
                                            r = e.promise,
                                            o = "string" == typeof n ? new Error(n) : n;
                                        t.captureException(o, {
                                            data: r
                                        })
                                    }))
                                }
                                this._onUnhandledRejectionHandlerInstalled = !0
                            }
                        }, t.prototype._installGlobalOnPageNotFoundHandler = function() {
                            if (!this._onPageNotFoundHandlerInstalled) {
                                if (se.onPageNotFound) {
                                    var t = pt();
                                    se.onPageNotFound((function(e) {
                                        var n = e.path.split("?")[0];
                                        t.setTag("pagenotfound", n), t.setExtra("message", JSON.stringify(e)), t.captureMessage("页面无法找到: " + n)
                                    }))
                                }
                                this._onPageNotFoundHandlerInstalled = !0
                            }
                        }, t.prototype._installGlobalOnMemoryWarningHandler = function() {
                            if (!this._onMemoryWarningHandlerInstalled) {
                                if (se.onMemoryWarning) {
                                    var t = pt();
                                    se.onMemoryWarning((function(e) {
                                        var n = e.level,
                                            r = void 0 === n ? -1 : n,
                                            o = "没有获取到告警级别信息";
                                        switch (r) {
                                            case 5:
                                                o = "TRIM_MEMORY_RUNNING_MODERATE";
                                                break;
                                            case 10:
                                                o = "TRIM_MEMORY_RUNNING_LOW";
                                                break;
                                            case 15:
                                                o = "TRIM_MEMORY_RUNNING_CRITICAL";
                                                break;
                                            default:
                                                return
                                        }
                                        t.setTag("memory-warning", String(r)), t.setExtra("message", o), t.captureMessage("内存不足告警")
                                    }))
                                }
                                this._onMemoryWarningHandlerInstalled = !0
                            }
                        }, t.id = "GlobalHandlers", t
                    }();

                function fe(t) {
                    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                    var r = pt();
                    if (r && r[t]) return r[t].apply(r, u(e));
                    throw new Error("No hub defined or " + t + " was not found on the hub, please open a bug report.")
                }

                function de(t, e) {
                    return fe("captureException", t, {
                        captureContext: e,
                        originalException: t,
                        syntheticException: new Error("Sentry syntheticException")
                    })
                }

                function he(t) {
                    fe("withScope", t)
                }

                function ve() {
                    setTimeout((function() {}))
                }

                function _e(t, e, n) {
                    if (void 0 === e && (e = {}), "function" != typeof t) return t;
                    try {
                        if (t.__sentry__) return t;
                        if (t.__sentry_wrapped__) return t.__sentry_wrapped__
                    } catch (e) {
                        return t
                    }
                    var r = function() {
                        n && "function" == typeof n && n.apply(this, arguments);
                        var r = Array.prototype.slice.call(arguments);
                        try {
                            var o = r.map((function(t) {
                                return _e(t, e)
                            }));
                            return t.handleEvent ? t.handleEvent.apply(this, o) : t.apply(this, o)
                        } catch (t) {
                            throw ve(), he((function(n) {
                                n.addEventProcessor((function(t) {
                                    var n = i({}, t);
                                    return e.mechanism && (q(n, void 0, void 0), F(n, e.mechanism)), n.extra = i(i({}, n.extra), {
                                        arguments: Et(r, 3)
                                    }), n
                                })), de(t)
                            })), t
                        }
                    };
                    try {
                        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (r[o] = t[o])
                    } catch (t) {}
                    t.prototype = t.prototype || {}, r.prototype = t.prototype, Object.defineProperty(t, "__sentry_wrapped__", {
                        enumerable: !1,
                        value: r
                    }), Object.defineProperties(r, {
                        __sentry__: {
                            enumerable: !1,
                            value: !0
                        },
                        __sentry_original__: {
                            enumerable: !1,
                            value: t
                        }
                    });
                    try {
                        Object.getOwnPropertyDescriptor(r, "name").configurable && Object.defineProperty(r, "name", {get: function() {
                                return t.name
                            }
                        })
                    } catch (t) {}
                    return r
                }
                var ge = function() {
                    function t() {
                        this._ignoreOnError = 0, this.name = t.id
                    }
                    return t.prototype._wrapTimeFunction = function(t) {
                        return function() {
                            for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                            var r = e[0];
                            return e[0] = _e(r, {
                                mechanism: {
                                    data: {
                                        function: ye(t)
                                    },
                                    handled: !0,
                                    type: "instrument"
                                }
                            }), t.apply(this, e)
                        }
                    }, t.prototype._wrapRAF = function(t) {
                        return function(e) {
                            return t(_e(e, {
                                mechanism: {
                                    data: {
                                        function: "requestAnimationFrame",
                                        handler: ye(t)
                                    },
                                    handled: !0,
                                    type: "instrument"
                                }
                            }))
                        }
                    }, t.prototype._wrapEventTarget = function(t) {
                        var e = (0, l.R)(),
                            n = e[t] && e[t].prototype;
                        !n || !n.hasOwnProperty || !n.hasOwnProperty("addEventListener") || (I(n, "addEventListener", (function(e) {
                            return function(n, r, o) {
                                try {
                                    "function" == typeof r.handleEvent && (r.handleEvent = _e(r.handleEvent.bind(r), {
                                        mechanism: {
                                            data: {
                                                function: "handleEvent",
                                                handler: ye(r),
                                                target: t
                                            },
                                            handled: !0,
                                            type: "instrument"
                                        }
                                    }))
                                } catch (t) {}
                                return e.call(this, n, _e(r, {
                                    mechanism: {
                                        data: {
                                            function: "addEventListener",
                                            handler: ye(r),
                                            target: t
                                        },
                                        handled: !0,
                                        type: "instrument"
                                    }
                                }), o)
                            }
                        })), I(n, "removeEventListener", (function(t) {
                            return function(e, n, r) {
                                var o = n;
                                try {
                                    o = o && (o.__sentry_wrapped__ || o)
                                } catch (t) {}
                                return t.call(this, e, o, r)
                            }
                        })))
                    }, t.prototype.setupOnce = function() {
                        this._ignoreOnError = this._ignoreOnError;
                        var t = (0, l.R)();
                        I(t, "setTimeout", this._wrapTimeFunction.bind(this)), I(t, "setInterval", this._wrapTimeFunction.bind(this)), I(t, "requestAnimationFrame", this._wrapRAF.bind(this)), ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"].forEach(this._wrapEventTarget.bind(this))
                    }, t.id = "TryCatch", t
                }();

                function ye(t) {
                    try {
                        return t && t.name || "<anonymous>"
                    } catch (t) {
                        return "<anonymous>"
                    }
                }
                var me = function() {
                        function t(e) {
                            void 0 === e && (e = {}), this.name = t.id, this._key = e.key || "cause", this._limit = e.limit || 5
                        }
                        return t.prototype.setupOnce = function() {
                            it((function(e, n) {
                                var r = pt().getIntegration(t);
                                return r ? r._handler(e, n) : e
                            }))
                        }, t.prototype._handler = function(t, e) {
                            if (!(t.exception && t.exception.values && e && e.originalException instanceof Error)) return t;
                            var n = this._walkErrorTree(e.originalException, this._key);
                            return t.exception.values = u(n, t.exception.values), t
                        }, t.prototype._walkErrorTree = function(t, e, n) {
                            if (void 0 === n && (n = []), !(t[e] instanceof Error) || n.length + 1 >= this._limit) return n;
                            var r = Qt($t(t[e]));
                            return this._walkErrorTree(t[e], e, u([r], n))
                        }, t.id = "LinkedErrors", t
                    }(),
                    be = function() {
                        function t() {
                            this.name = t.id
                        }
                        return t.prototype.setupOnce = function() {
                            it((function(e) {
                                if (pt().getIntegration(t)) try {
                                    var n = se.getSystemInfoSync(),
                                        r = n.SDKVersion,
                                        o = void 0 === r ? "0.0.0" : r,
                                        s = n.batteryLevel,
                                        u = n.currentBattery,
                                        c = n.battery,
                                        p = n.brand,
                                        l = n.language,
                                        f = n.model,
                                        d = n.pixelRatio,
                                        h = n.platform,
                                        v = n.screenHeight,
                                        _ = n.screenWidth,
                                        g = n.statusBarHeight,
                                        y = n.system,
                                        m = n.version,
                                        b = n.windowHeight,
                                        E = n.windowWidth,
                                        w = n.app,
                                        x = n.appName,
                                        S = n.fontSizeSetting,
                                        k = a(y.split(" "), 2),
                                        O = k[0],
                                        T = k[1];
                                    return i(i({}, e), {
                                        contexts: i(i({}, e.contexts), {
                                            device: {
                                                brand: p,
                                                battery_level: s || u || c,
                                                model: f,
                                                screen_dpi: d
                                            },
                                            os: {
                                                name: O || y,
                                                version: T || y
                                            },
                                            extra: i({
                                                SDKVersion: o,
                                                language: l,
                                                platform: h,
                                                screenHeight: v,
                                                screenWidth: _,
                                                statusBarHeight: g,
                                                version: m,
                                                windowHeight: b,
                                                windowWidth: E,
                                                fontSizeSetting: S,
                                                app: w || x || ae
                                            }, n)
                                        })
                                    })
                                } catch (t) {
                                    console.warn("sentry-miniapp get system info fail: " + t)
                                }
                                return e
                            }))
                        }, t.id = "System", t
                    }(),
                    Ee = function() {
                        function t(e) {
                            this.name = t.id, this._options = i({
                                enable: !0
                            }, e)
                        }
                        return t.prototype.setupOnce = function() {
                            var e = this;
                            it((function(n) {
                                if (pt().getIntegration(t) && e._options.enable) try {
                                    var r = getCurrentPages().map((function(t) {
                                        return {
                                            route: t.route,
                                            options: t.options
                                        }
                                    }));
                                    return i(i({}, n), {
                                        extra: i(i({}, n.extra), {
                                            routers: r
                                        })
                                    })
                                } catch (t) {
                                    console.warn("sentry-miniapp get router info fail: " + t)
                                }
                                return n
                            }))
                        }, t.id = "Router", t
                    }(),
                    we = function() {
                        function t() {
                            this.name = t.id
                        }
                        return t.prototype.setupOnce = function() {
                            it((function(e) {
                                return pt().getIntegration(t) && "wechat" === ae && se.getLaunchOptionsSync && 1129 === se.getLaunchOptionsSync().scene ? null : e
                            }))
                        }, t.id = "IgnoreMpcrawlerErrors", t
                    }(),
                    xe = [new G, new $, new ge, new le, new me, new be, new Ee, new we],
                    Se = n(97907),
                    ke = n(51448),
                    Oe = n(67200);
                const Te = (0, Se.r6)(),
                    je = (0, ke.xI)();
                let Ie = (0, Se.dU)().toUpperCase();
                "MASTER" === Ie && (Ie = "PROD"), "PROD" === Ie && "devtools" !== je.platform && function(t) {
                    void 0 === t && (t = {}), void 0 === t.defaultIntegrations && (t.defaultIntegrations = xe), t.normalizeDepth = t.normalizeDepth || 5,
                        function(t, e) {
                            !0 === e.debug && (W ? c.enable() : console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle."));
                            var n = pt(),
                                r = n.getScope();
                            r && r.update(e.initialScope);
                            var o = new t(e);
                            n.bindClient(o)
                        }(pe, t)
                }({
                    dsn: "https://37b3568a7dd94a9da65fe576fff155d0@qmas.qmai.cn/22",
                    tracesSampleRate: 1,
                    environment: Ie,
                    release: "baking-microapp@" + Te.appVersion,
                    ignoreErrors: ["Non-Error exception captured"],
                    beforeSend(t) {
                        var e;
                        const n = Oe.store.state.userInfo || {},
                            r = Oe.store.state.storeInfo || {},
                            o = Oe.store.state.shop || {},
                            i = getCurrentPages() || [];
                        return t.tags = t.tags || {}, t.tags.phone = n.mobile, t.tags.userId = n.id, t.tags.openId = n.openid, t.tags.unionId = n.unionid, t.tags.storeId = r.id, t.tags.brandType = r.store_type, t.tags.appId = Te.appid, t.tags.shopId = o.id, t.tags.url = null == (e = i[i.length - 1]) ? void 0 : e.route, "内存不足告警" === t.message ? Math.random() < .1 ? t : null : t
                    }
                })
            },
            14224: function(t) {
                var e, n, r = t.exports = {};

                function o() {
                    throw new Error("setTimeout has not been defined")
                }

                function i() {
                    throw new Error("clearTimeout has not been defined")
                }

                function s(t) {
                    if (e === setTimeout) return setTimeout(t, 0);
                    if ((e === o || !e) && setTimeout) return e = setTimeout, setTimeout(t, 0);
                    try {
                        return e(t, 0)
                    } catch (n) {
                        try {
                            return e.call(null, t, 0)
                        } catch (n) {
                            return e.call(this, t, 0)
                        }
                    }
                }! function() {
                    try {
                        e = "function" == typeof setTimeout ? setTimeout : o
                    } catch (t) {
                        e = o
                    }
                    try {
                        n = "function" == typeof clearTimeout ? clearTimeout : i
                    } catch (t) {
                        n = i
                    }
                }();
                var a, u = [],
                    c = !1,
                    p = -1;

                function l() {
                    !c || !a || (c = !1, a.length ? u = a.concat(u) : p = -1, u.length && f())
                }

                function f() {
                    if (!c) {
                        var t = s(l);
                        c = !0;
                        for (var e = u.length; e;) {
                            for (a = u, u = []; ++p < e;) a && a[p].run();
                            p = -1, e = u.length
                        }
                        a = null, c = !1,
                            function(t) {
                                if (n === clearTimeout) return clearTimeout(t);
                                if ((n === i || !n) && clearTimeout) return n = clearTimeout, clearTimeout(t);
                                try {
                                    n(t)
                                } catch (e) {
                                    try {
                                        return n.call(null, t)
                                    } catch (e) {
                                        return n.call(this, t)
                                    }
                                }
                            }(t)
                    }
                }

                function d(t, e) {
                    this.fun = t, this.array = e
                }

                function h() {}
                r.nextTick = function(t) {
                    var e = new Array(arguments.length - 1);
                    if (arguments.length > 1)
                        for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                    u.push(new d(t, e)), 1 === u.length && !c && s(f)
                }, d.prototype.run = function() {
                    this.fun.apply(null, this.array)
                }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = h, r.addListener = h, r.once = h, r.off = h, r.removeListener = h, r.removeAllListeners = h, r.emit = h, r.prependListener = h, r.prependOnceListener = h, r.listeners = function(t) {
                    return []
                }, r.binding = function(t) {
                    throw new Error("process.binding is not supported")
                }, r.cwd = function() {
                    return "/"
                }, r.chdir = function(t) {
                    throw new Error("process.chdir is not supported")
                }, r.umask = function() {
                    return 0
                }
            }
        },
        function(t) {
            var e, n = (e = 26276, t(t.s = e));
            module.exports = n
        }
    ]);
});
__wxRoute = 'async-libs/index';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'async-libs/index.js';
define("async-libs/index.js", function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
    var n;
    (n = n || {}).webpackChunkbaking_microapp = require("../bundle.js"), (n.webpackChunkbaking_microapp = n.webpackChunkbaking_microapp || []).push([
        [19348], {
            68148: function() {},
            71139: function() {},
            72015: function() {},
            99687: function(n, e, r) {
                r.g.currentModuleId = "md6b6ffdc", r.g.currentCtor = Page, r.g.currentCtorType = "page", r.g.currentResourceType = "page", r.g.currentSrcMode = "wx", r(71139), r(88537), r(68148), r(72015)
            },
            88537: function() {
                Page({})
            }
        },
        function(n) {
            var e;
            e = 99687, n(n.s = e)
        }
    ]);
});
require("async-libs/index.js");