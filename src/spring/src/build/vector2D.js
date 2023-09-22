"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (x instanceof Object) {
            this.x = x.x;
            this.y = x.y;
        }
        else {
            this.x = x;
            this.y = y;
        }
    }
    Vector2.prototype.addXY = function (x, y) {
        var v = new Vector2(this.x, this.y);
        v.x += x;
        v.y += y;
        return v;
    };
    Vector2.prototype.add = function (vec) {
        var v = new Vector2(this.x, this.y);
        v.x += isNaN(vec.x) ? vec.x : vec.get_x();
        v.y += isNaN(vec.y) ? vec.y : vec.get_y();
        return v;
    };
    Vector2.prototype.sub = function (vec) {
        var v = new Vector2(this.x, this.y);
        if (!isNaN(vec.x) || vec.get_x) {
            v.x -= isNaN(vec.x) ? vec.x : vec.get_x();
            v.y -= isNaN(vec.y) ? vec.y : vec.get_y();
        }
        return v;
    };
    /**
     * 点乘
     * @param vec
     * @returns {number}
     */
    Vector2.prototype.dot = function (vec) {
        return this.x * vec.x + this.y * vec.y;
    };
    /**
     * 叉乘
     * @param vec
     * @returns {number}
     */
    Vector2.prototype.cross = function (vec) {
        return this.x * vec.y - vec.x * this.y;
    };
    /**
     * 当前向量在vec上的投影
     * @see 投影矩阵 --> http://blog.csdn.net/a130098300/article/details/7661548
     * @param vec
     */
    Vector2.prototype.projectTo = function (vec) {
        var x = vec.x;
        var y = vec.y;
        var c = vec.dot(vec);
        // 二维向量的投影矩阵
        var a = x * x / c;
        var b = x * y / c;
        var d = y * y / c;
        var m = new PIXI.Matrix();
        m.a = a;
        m.b = b;
        m.c = b;
        m.d = d;
        return new Vector2(m.apply(this));
    };
    /**
     * 获取当前向量的长度
     * @returns {number}
     */
    Vector2.prototype.length = function () {
        var x = this.x;
        var y = this.y;
        return Math.sqrt(x * x + y * y);
    };
    /**
     * 转成数组
     */
    Vector2.prototype.toArray = function () {
        return [this.x, this.y];
    };
    /**
     * 克隆
     */
    Vector2.prototype.clone = function () {
        return new Vector2(this.x, this.y);
    };
    /**
     * 乘以一个标量
     */
    Vector2.prototype.multiplyScalar = function (s) {
        this.x *= s;
        this.y *= s;
        return this;
    };
    /**
     * 设置向量的长度
     * @param value
     */
    Vector2.prototype.setLength = function (value) {
        this.multiplyScalar(value / this.length());
    };
    /**
     * 线性插值
     * @param v
     * @param alpha
     * @returns {Vector2}
     */
    Vector2.prototype.lerp = function (v, alpha) {
        var vec = this.clone();
        vec.x += (v.x - vec.x) * alpha;
        vec.y += (v.y - vec.y) * alpha;
        return vec;
    };
    /**
     * 旋转多少度
     * @param angle 旋转的角度
     */
    Vector2.prototype.rotate = function (angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        var x = this.x;
        var y = this.y;
        this.x = x * c - y * s;
        this.y = x * s + y * c;
    };
    return Vector2;
}());
exports.default = Vector2;
