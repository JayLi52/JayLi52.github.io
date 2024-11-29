/**
 *
 * Created by onlyjyf on 8/29/16.
 */
var LineUtil = {};
var Vector2 = require("./geom/Vector2");

/**
 * 得到两条线相交的焦点
 * p1、p2、p3、p4顺序为左右上下四点
 * <p1,p2>与<p3,p4>
 * @param	p1
 * @param	p2
 * @param	p3
 * @param	p4
 * @return null
 */
LineUtil.lineIntersect = function (p1, p2, p3, p4) {
    var rp = new Vector2();
    var x1 = p1.x;
    var y1 = p1.y;
    var x2 = p2.x;
    var y2 = p2.y;
    var x3 = p3.x;
    var y3 = p3.y;
    var x4 = p4.x;
    var y4 = p4.y;
    var c = 0.0000001;
    var m;
    if (x2 == x1) {
        m = (y2 - y1) / (x2 - x1 + c);
    } else {
        m = (y2 - y1) / (x2 - x1);
    }
    var n;
    if (x4 == x3) {
        n = (y4 - y3) / (x4 - x3 + c);
    } else {
        n = (y4 - y3) / (x4 - x3);
    }
    if (m == n) {
        rp.x = (m * x1 - n * x3 + y3 - y1) / (m - n + c);
    } else {
        rp.x = (m * x1 - n * x3 + y3 - y1) / (m - n);
    }
    rp.y = m * rp.x - m * x1 + y1;
    return rp;
};

/**
 * 直线 p1-p2 和 p3-p4是否平行
 * @param p1
 * @param p2
 * @param p3
 * @param p4
 */
LineUtil.isParallel = function (p1, p2, p3, p4) {
    // 计算叉积
    var x0 = p2.x - p1.x;
    var y0 = p2.y - p1.y;
    if (!p4) {
        console.log("少了一个点");
    }
    var x1 = p4.x - p3.x;
    var y1 = p4.y - p3.y;

    return Math.abs(x0 * y1 - y0 * x1) < 0.01;
};

/**
 * 线段 a-b 是否包含点p
 */
LineUtil.containsPoint = function (p, a, b) {
    // 计算 p->a 和 p->b是否方向相反
    var paX = a.x - p.x;
    var paY = a.y - p.y;
    var pbX = b.x - p.x;
    var pbY = b.y - p.y;
    if (LineUtil.isParallel(a, p, b, p)) {
        // 返回点积
        return paX * pbX + paY * pbY <= 1e-10;
    } else {
        return false;
    }

};


module.exports = LineUtil;
