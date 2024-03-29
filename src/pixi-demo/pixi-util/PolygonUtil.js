/**
 * 多边形工具
 * 依赖nape.geom.Vec2,nb
 * Created by onlyjyf on 8/29/16.
 */
var PolygonUtil = {};
var LineUtil = require("./LineUtil.js");
const Vector2 = require("./geom/Vector2.js");

/**
 * 获取多边形面积，通过在空间中任意取一点，然后计算每个多边形和该点的叉积，得到多边形的面积
 */
PolygonUtil.getArea = function (vertex) {
    return PolygonUtil.getRealArea(vertex) / nb.PIXELS_PER_ML;

};

/**
 * 获取多边形真实的面积
 * @param vertex
 * @returns {number}
 */
PolygonUtil.getRealArea = function (vertex) {
    if (!vertex || vertex.length <= 0) return 0;
    let len = vertex.length;
    // 总面积
    let sum = 0;
    if (vertex[0].get_x) {
        for (let i = 0; i < len; i++) {
            let a = vertex[i];
            let b = vertex[(i + 1) % len];
            sum += a.get_x() * b.get_y() - b.get_x() * a.get_y();
        }
    } else {
        for (let i = 0; i < len; i++) {
            let a = vertex[i];
            let b = vertex[(i + 1) % len];
            sum += a.x * b.y - b.x * a.y;
        }
    }

    if (sum < 0) {
        sum = -sum;
    }
    return sum / 2 || 0;
};

/**
 * 线段相交
 * @param vertex 顶点
 * @param p1 第一个点
 * @param p2 第二个点
 */
PolygonUtil.lineIntersect = function (vertex, p1, p2) {
    let rePArr = [];
    let len = vertex.length;
    let isHorizontal = p1.y === p2.y;
    let py = p1.y;
    for (let i = 0; i < len; i++) {
        // 多边形的每一条边
        let pp1_ = vertex[i];
        let j = (i + 1) % len;
        let pp2_ = vertex[j];
        let p1x = pp1_.x;
        let p1y = pp1_.y;
        let p2x = pp2_.x;
        let p2y = pp2_.y;
        // 计算是否平行, 平行没有交点
        if (LineUtil.isParallel(pp1_, pp2_, p1, p2)) {
            continue;
        }
        if (isHorizontal && (p1y >= py) === (p2y <= py)) {
            let p = new Vector2();
            p.x = (p2x - p1x) / (p2y - p1y) * (py - p1y) + p1x;
            p.y = py;
            p.vertexA = i;
            p.vertexB = j;
            rePArr.push(p);
        } else {
            // 计算交点
            let intersectPoint = LineUtil.lineIntersect(p1, p2, pp1_, pp2_);
            // 交点是否在多边形边上  LineUtil.containsPoint(intersectPoint, p1, p2)
            if ((intersectPoint.x >= p1x) === (intersectPoint.x <= p2x)) {
                // 记录当前交点在哪条边上
                intersectPoint.vertexA = i;
                intersectPoint.vertexB = j;
                rePArr.push(intersectPoint);
            }
        }
    }
    return rePArr;
};

PolygonUtil.bottomLineIntersect = function (vertex, p1, p2) {
    let bottomPoint = {
        x: -Infinity,
        y: -Infinity
    };
    let len = vertex.length;
    let isHorizontal = p1.y === p2.y;
    let py = p1.y;
    for (let i = 0; i < len - 1; i++) {
        // 多边形的每一条边
        let pp1_ = vertex[i];
        let j = (i + 1) % len;
        let pp2_ = vertex[j];
        let p1x = pp1_.x;
        let p1y = pp1_.y;
        let p2x = pp2_.x;
        let p2y = pp2_.y;
        // 计算是否平行, 平行没有交点
        if (LineUtil.isParallel(pp1_, pp2_, p1, p2)) {
            continue;
        }
        if (isHorizontal && (p1y >= py) === (p2y <= py)) {
            let p = new Vector2();
            p.x = (p2x - p1x) / (p2y - p1y) * (py - p1y) + p1x;
            p.y = py;
            p.pa = pp1_;
            p.pb = pp2_;
            if (p.y > bottomPoint.y && p.y < p2.y) {
                bottomPoint = p;
            }
        } else {
            // 计算交点
            let intersectPoint = LineUtil.lineIntersect(p1, p2, pp1_, pp2_);
            // 交点是否在多边形边上  LineUtil.containsPoint(intersectPoint, p1, p2)
            if ((intersectPoint.x >= p1x) === (intersectPoint.x <= p2x)) {
                // 记录当前交点在哪条边上
                intersectPoint.pa = pp1_;
                intersectPoint.pb = pp2_;
                if (intersectPoint.y > bottomPoint.y && intersectPoint.y < p2.y) {
                    bottomPoint = intersectPoint;
                }
            }
        }
    }
    if (isFinite(bottomPoint.y)) {
        return bottomPoint;
    }
};

/**
 * 多边形是否包含点p
 * @param vs 顶点
 * @param p 需要检测的点
 */
PolygonUtil.containsPoint = function (vs, p) {
    if(!vs || !p) return;
    var x = p.x;
    var y = p.y;

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i].x,
            yi = vs[i].y;
        var xj = vs[j].x,
            yj = vs[j].y;

        var intersect = ((yi > y) != (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

/**
 * 计算 Minkowski Difference
 *
 * @param {Polygon} poly_a
 * @param {Polygon} poly_b
 * @return {Polygon}
 */
PolygonUtil.minkowskiDifference = function (poly_a, poly_b) {
    var i,
        imax = poly_a.length,
        j,
        jmax = poly_b.length,
        scale = imax * jmax,
        minkSum = new Array(scale),
        idx = 0;

    for (i = 0; i < imax; ++i) {
        var a = poly_a[i];
        for (j = 0; j < jmax; ++j) {
            var b = poly_b[j];
            minkSum[idx++] = [a.x - b.x, a.y - b.y];
        }
    }

    return PolygonUtil.createConvexHull(minkSum);
};

/*
 * Create the convex hull using the Gift wrapping algorithm 计算凸包
 * @source https://github.com/juhl/collision-detection-2d/blob/master/util.js
 * @reference http://en.wikipedia.org/wiki/Gift_wrapping_algorithm
 * @reference http://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain
 * @param {Vec2[]} vec2_list
 * @return {Polygon}
 */
PolygonUtil.createConvexHull = function (vec2_list) {
    // Find the right most point on the hull
    var i0 = 0,
        x0 = vec2_list[0][0],
        i,
        x;

    for (i = 1; i < vec2_list.length; i++) {
        x = vec2_list[i][0];
        if (x > x0 || (x === x0 && vec2_list[i][1] < vec2_list[i0][1])) {
            i0 = i;
            x0 = x;
        }
    }

    var n = vec2_list.length,
        hull = [],
        m = 0,
        ih = i0,
        ie,
        j,
        r = [0, 0],
        v = [0, 0],
        c;

    do {
        hull[m] = ih;

        ie = 0;
        for (j = 1; j < n; ++j) {
            if (ie === ih) {
                ie = j;
                continue;
            }
            r[0] = vec2_list[ie][0] - vec2_list[hull[m]][0];
            r[1] = vec2_list[ie][1] - vec2_list[hull[m]][1];
            v[0] = vec2_list[j][0] - vec2_list[hull[m]][0];
            v[1] = vec2_list[j][1] - vec2_list[hull[m]][1];
            c = r[0] * v[1] - r[1] * v[0];
            if (c < 0) {
                ie = j;
            }

            // Collinearity check
            var v_len = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
            var r_len = Math.sqrt(r[0] * r[0] + r[1] * r[1]);
            if (c === 0 && v_len > r_len) {
                ie = j;
            }
        }

        ++m;
        ih = ie;
    } while (ie !== i0);

    // Copy vertices
    var newPoints = [];
    for (i = 0; i < m; ++i) {
        newPoints.push(vec2_list[hull[i]]);
    }

    return newPoints;
};

/**
 * 获取多边形的重心
 * 参考资料 http://www.cnblogs.com/jbelial/archive/2011/08/08/2131165.html
 * @param vertex
 */
PolygonUtil.getMassCenter = function (polygon) {
    var x = 0;
    var y = 0;
    var f;
    var j = polygon.length - 1;
    var p1;
    var p2;

    for (var k = 0; k < polygon.length; j = k++) {
        p1 = polygon[k];
        p2 = polygon[j];

        f = p2.cross(p1);

        x += (p1.x + p2.x) * f;
        y += (p1.y + p2.y) * f;
    }

    var area = PolygonUtil.getRealArea(polygon);
    f = area * 6;
    return {
        x: x / f,
        y: y / f
    };
};

/**
 * 获取包围盒
 * @param vertex
 */
PolygonUtil.getAABB = function (vertex) {
    var top = {
        x: vertex[0].x,
        y: vertex[0].y
    };
    var bottom = {
        x: top.x,
        y: top.y
    };
    for (var i = 1; i < vertex.length; i++) {
        var v = vertex[i];
        top.x = Math.min(top.x, v.x);
        top.y = Math.min(top.y, v.y);

        bottom.x = Math.max(bottom.x, v.x);
        bottom.y = Math.max(bottom.y, v.y);
    }
    return {
        x: top.x,
        y: top.y,
        width: bottom.x - top.x,
        height: bottom.y - top.y
    };
};

PolygonUtil.drawPoly = (vec, gra) => {
    if (!gra) {
        if (window.gra === undefined) {
            window.gra = new PIXI.Graphics();
            chemicalMain.viewStack.addChild(window.gra);
        }
        gra = window.gra;
    }
    gra.clear();
    gra.beginFill(0xFF0000, 0.5);
    for (var i = 0; i < vec.length; i++) {
        gra.drawCircle(vec[i].x, vec[i].y, 6);
    }
};

/**
 * 求 p 点到多边形的最短距离
 * @param vertex
 * @param vec
 * @param result 执行过程中需要得到的结果，包含最小距离 result.minDis 和最小距离的坐标点 result.projectPoint
 *        默认不需要传入该参数，如果传入了，方法中会对这个参数进行修改
 */
PolygonUtil.getMinDistance = function (vertex, p, result) {
    var len = vertex.length;
    var minDis = Infinity;
    let p1, p2;
    // 投影垂足的坐标
    var projectPoint;
    if (!p.sub) {
        p = new Vector2(p.x, p.y);
    }
    for (var i = 0; i < len; i++) {
        var a = vertex[i];
        var b = vertex[(i + 1) % len];
        if (!b.sub) {
            a = new Vector2(a.x, a.y);
            b = new Vector2(b.x, b.y);
        }
        var vec1 = b.sub(a);
        var vec2 = p.sub(a);
        // 计算投影向量
        var projectVec = vec2.projectTo(vec1);
        // 判断投影的垂直点是否在直线外
        var dis = 0;
        if (projectVec.length() > vec1.length() || projectVec.dot(vec1) < 0) {
            // continue;
            // 如果垂线在直线外 就取直线端点的最小距离

            dis = Math.min(p.sub(a).length(), p.sub(b).length());
            let disA = p.sub(a).length();
            let disB = p.sub(b).length();
            if (minDis > dis) {
                p1 = a;
                p2 = b;
                minDis = dis;
                if (disA > disB) {
                    projectPoint = {
                        x: b.x,
                        y: b.y
                    };
                } else {
                    projectPoint = {
                        x: a.x,
                        y: a.y
                    };
                }
            }
        } else {
            // 垂直向量
            var perpendVec = vec2.sub(projectVec);
            dis = perpendVec.length();
            if (minDis > dis) {
                minDis = dis;
                p1 = a;
                p2 = b;
                projectPoint = {
                    x: a.x + projectVec.x,
                    y: a.y + projectVec.y
                };
            }
        }


    }
    if (result) {
        result.minDis = minDis;
        result.projectPoint = projectPoint;
        result.pa = p1;
        result.pb = p2;
    }
    return minDis;
};


/**
 * 求 p 点到多边形的最短距离
 * @param vertex
 * @param vec
 * @param result 执行过程中需要得到的结果，包含最小距离 result.minDis 和最小距离的坐标点 result.projectPoint
 *        默认不需要传入该参数，如果传入了，方法中会对这个参数进行修改
 */
PolygonUtil.getFireMinDistance = function (vertex, p, result) {
    var len = vertex.length;
    var minDis = Infinity;
    let p1, p2;
    // 投影垂足的坐标
    var projectPoint;
    if (!p.sub) {
        p = new Vector2(p.x, p.y);
    }
    for (var i = 0; i < len; i++) {
        var a = vertex[i];
        var b = vertex[(i + 1) % len];

        if (!b.sub) {
            a = new Vector2(a.x, a.y);
            b = new Vector2(b.x, b.y);
        }
        var vec1 = b.sub(a);
        var vec2 = p.sub(a);
        // 计算投影向量
        var projectVec = vec2.projectTo(vec1);
        // 判断投影的垂直点是否在直线外
        var dis = 0;
        if (projectVec.length() > vec1.length() || projectVec.dot(vec1) < 0) {
            // continue;
            // 如果垂线在直线外 就取直线端点的最小距离
            let disA = p.sub(a).length();
            let disB = p.sub(b).length();
            dis = Math.min(disA, disB);
            if (minDis > dis) {
                let tempPoint;
                if (disA > disB) {
                    tempPoint = {
                        x: b.x,
                        y: b.y
                    };
                } else {
                    tempPoint = {
                        x: a.x,
                        y: a.y
                    };
                }
                if (tempPoint.x <= p.x && tempPoint.y <= p.y) {
                    projectPoint = tempPoint;
                    p1 = a;
                    p2 = b;
                    minDis = dis;
                }
            }
        } else {
            // 垂直向量
            var perpendVec = vec2.sub(projectVec);
            dis = perpendVec.length();
            if (minDis > dis) {
                let tempPoint = {
                    x: a.x + projectVec.x,
                    y: a.y + projectVec.y
                };
                if (tempPoint.x <= p.x && tempPoint.y <= p.y) {
                    minDis = dis;
                    p1 = a;
                    p2 = b;
                    projectPoint = tempPoint;
                }
            }
        }


    }
    if (result) {
        result.minDis = minDis;
        result.projectPoint = projectPoint;
        result.pa = p1;
        result.pb = p2;
    }
    return minDis;
};


/**
 * 过点p做多边形vertex每条边的垂线，并且返回最短的那条
 * @param vertex
 * @param vec
 */
PolygonUtil.getMinPerpendicularDistance = function (vertex, p) {
    var len = vertex.length;
    var minDis = Infinity;
    for (var i = 0; i < len; i++) {
        var a = vertex[i];
        var b = vertex[(i + 1) % len];
        var vec1 = b.sub(a);
        if (!p.sub) {
            console.log(p);
        }
        var vec2 = p.sub(a);
        // 计算投影向量
        var projectVec = vec2.projectTo(vec1);
        // 判断投影的垂直点是否在直线外
        if (projectVec.length() > vec1.length() || projectVec.dot(vec1) < 0) {
            continue;
        }
        // 垂直向量
        var perpendVec = vec2.sub(projectVec);
        var dis = perpendVec.length();
        if (minDis > dis) {
            minDis = dis;
        }
    }
    return minDis;
};
/**
 * 获取分割的空间
 * @return {
 *    result : 交点
 *    up : 上半部分的多边形
 *    down : 下半部分的多边形
 * }
 */
PolygonUtil.getDivideSpace = function (vertex, p1, p2, truePoint) {
    let pa, pb, result;
    if (!truePoint) {
        if (!(p1 && p2)) return;
        result = PolygonUtil.lineIntersect(vertex, p1, p2);
        pa = result[0];
        pb = result[result.length - 1];
    } else {
        pa = p1, pb = p2;
        result = truePoint;
    }

    if (pa === undefined || pb === undefined) {
        console.log("error");
        return null;
    }
    // y的位置
    var posY = pa.y;
    // 计算面积
    // 下半部分
    var areaDownVertex = [];
    // 上半部分
    var areaUpVertex = [];

    areaDownVertex.push(pa);
    areaUpVertex.push(pa);
    var count = pa.vertexB;
    var index = 1;
    while (true) {
        // 上一个索引
        var lastValue = (count - 1 + vertex.length) % vertex.length;
        var value = count % vertex.length;
        // 一个循环，遍历到上部分和下部分
        if (index < result.length && LineUtil.containsPoint(result[index], vertex[lastValue], vertex[value])) {
            areaDownVertex.push(result[index]);
            areaUpVertex.push(result[index]);
            index++;
        }
        if (vertex[value].y >= posY) {
            areaDownVertex.push(vertex[value]);
        }
        if (vertex[value].y <= posY) {
            areaUpVertex.push(vertex[value]);
        }
        count++;
        if (count % vertex.length === pa.vertexB) {
            break;
        }
    }
    //虽然分割了但是我希望 分割出来的up[0] = vertex[0] up[up.length - 1] = vertex[vertex.length -1] 并且顺序不能变
    let upIndex = areaUpVertex.indexOf(vertex[0]);
    if (upIndex !== -1) {
        if (upIndex === areaUpVertex.length - 1) {
            areaUpVertex.unshift(areaUpVertex.pop());
        } else {
            areaUpVertex = areaUpVertex.splice(upIndex).concat(areaUpVertex);
        }
    }

    return {
        result: result,
        up: areaUpVertex,
        down: areaDownVertex
    };
};
// 二分迭代算法
PolygonUtil.iterator = function (vertex, rect, capacity, globalScale) {

    if (!vertex || !vertex.length) {
        return null;
    }
    var totalArea = PolygonUtil.getArea(vertex) / globalScale;
    if (totalArea <= 0) {
        return null;
    }
    var ratio = (1 - capacity / totalArea) * 0.999;

    var p1 = new Vector2(rect.x, rect.y + rect.height * ratio);
    var p2 = new Vector2(rect.x + rect.width, rect.y + rect.height * ratio);
    var result = PolygonUtil.getDivideSpace(vertex, p1, p2);
    // 计算下半部分的面积
    if (result === null) {
        console.log("xx");
        return null;
    }
    var area = PolygonUtil.getArea(result.down) / globalScale;
    // 处理面积缩放的情况
    // 如果面积相差大于 1，继续迭代
    if (Math.abs(area - capacity) > 1) {
        //再往下也算不出来了 还不如省点效率了。。        
        if (area * 100 < capacity) {
            return result.result;
        }
        if (capacity > area) {
            return PolygonUtil.iterator(result.up, {
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height * ratio
            }, capacity - area, globalScale);
        } else {
            return PolygonUtil.iterator(result.down, {
                x: rect.x,
                y: rect.y + rect.height * ratio,
                width: rect.width,
                height: rect.height * (1 - ratio)
            }, capacity, globalScale);
        }
    } else {
        return result.result;
    }
};

/**
 * 将形状按照角度旋转后得出新的点
 *  
 * @param pointAry 点数组
 * @param rotate 旋转角度
 */
PolygonUtil.rotatePoly = function (pointAry, rotate) {
    let result = [];
    pointAry.forEach((point) => {
        let px = point.x;
        let py = point.y;
        let dx = px * Math.cos(rotate) - py * Math.sin(rotate);
        let dy = py * Math.cos(rotate) + px * Math.sin(rotate);
        let obj = {
            x: dx,
            y: dy
        };
        result.push(obj);
    });
    return result;
};

module.exports = PolygonUtil;
