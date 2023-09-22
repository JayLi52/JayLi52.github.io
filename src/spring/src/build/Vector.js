"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 表示一个具有x和y分量的2D向量。
 */
class Vector2 {
    /**
     * 构造一个新的Vector2实例。
     * @param x - 向量的x分量。
     * @param y - 向量的y分量。
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    /**
     * 将给定的x和y值添加到向量中并返回一个新的Vector2实例。
     * @param x - 要添加的x值。
     * @param y - 要添加的y值。
     * @returns 表示添加结果的新的Vector2实例。
     */
    addXY(x, y) {
        const v = new Vector2(this.x, this.y);
        v.x += x;
        v.y += y;
        return v;
    }
    /**
     * 将另一个Vector2的分量添加到此向量中并返回一个新的Vector2实例。
     * @param vec - 要添加的Vector2。
     * @returns 表示添加结果的新的Vector2实例。
     */
    add(vec) {
        const v = new Vector2(this.x, this.y);
        v.x += vec.x;
        v.y += vec.y;
        return v;
    }
    /**
     * 从此向量中减去另一个Vector2的分量并返回一个新的Vector2实例。
     * @param vec - 要减去的Vector2。
     * @returns 表示减法结果的新的Vector2实例。
     */
    sub(vec) {
        const v = new Vector2(this.x, this.y);
        v.x -= vec.x;
        v.y -= vec.y;
        return v;
    }
    /**
     * 计算此向量与另一个Vector2的点积。
     * @param vec - 用于点积计算的Vector2。
     * @returns 两个向量的点积。
     */
    dot(vec) {
        return this.x * vec.x + this.y * vec.y;
    }
    /**
     * 计算此向量与另一个Vector2的叉积。
     * @param vec - 用于叉积计算的Vector2。
     * @returns 两个向量的叉积。
     */
    cross(vec) {
        return this.x * vec.y - vec.x * this.y;
    }
    /**
     * 将此向量投影到另一个Vector2上。
     * @param vec - 将要投影到的Vector2。
     * @returns 表示投影向量的新的Vector2实例。
     */
    projectTo(vec) {
        const x = vec.x;
        const y = vec.y;
        const c = vec.dot(vec);
        const a = (x * x) / c;
        const b = (x * y) / c;
        const d = (y * y) / c;
        const m = new PIXI.Matrix();
        m.a = a;
        m.b = b;
        m.c = b;
        m.d = d;
        const point = m.apply(this);
        return new Vector2(point.x, point.y);
    }
    normalize() {
        return new Vector2(this.x / this.length(), this.y / this.length());
    }
    /**
     * 计算此向量的长度（大小）。
     * @returns 向量的长度。
     */
    length() {
        const x = this.x;
        const y = this.y;
        return Math.sqrt(x * x + y * y);
    }
    /**
     * 将此向量转换为包含其分量[x, y]的数组。
     * @returns 包含向量x和y分量的数组。
     */
    toArray() {
        return [this.x, this.y];
    }
    /**
     * 创建此向量的副本。
     * @returns 一个新的Vector2实例，它是此向量的副本。
     */
    clone() {
        return new Vector2(this.x, this.y);
    }
    /**
     * 通过标量值将此向量乘以一个因子。
     * @param s - 要乘以的标量值。
     * @returns 在乘法后的此向量。
     */
    multiplyScalar(s) {
        this.x *= s;
        this.y *= s;
        return this;
    }
    /**
     * 将此向量的长度（大小）设置为指定值。
     * @param value - 向量的期望长度。
     */
    setLength(value) {
        this.multiplyScalar(value / this.length());
    }
    /**
     * 在两个Vector2之间执行线性插值。
     * @param v - 插值的目标Vector2。
     * @param alpha - 插值因子（0.0到1.0）。
     * @returns 表示插值向量的新的Vector2实例。
     */
    lerp(v, alpha) {
        const vec = this.clone();
        vec.x += (v.x - vec.x) * alpha;
        vec.y += (v.y - vec.y) * alpha;
        return vec;
    }
    /**
     * 以指定角度（弧度）旋转此向量。
     * @param angle - 要旋转向量的角度（弧度）。
     */
    rotate(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const x = this.x;
        const y = this.y;
        this.x = x * c - y * s;
        this.y = x * s + y * c;
    }
}
exports.default = Vector2;
