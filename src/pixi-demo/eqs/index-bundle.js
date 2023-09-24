(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Draggable = require("./Draggable");

class ADropper extends Draggable {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.x = 300;
    this.y = 300;
    this.alpha = 0.2;
    this.color = 0x343941;

    this.matrix = [
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0
    ];
    this.colorMatrix = new PIXI.filters.ColorMatrixFilter();
    this.colorMatrix.matrix = this.matrix;
    this.filters = [this.colorMatrix];
    // this.children[0].alpha = 0.2
    super.init();
  }

  update() {
    let speed = 0;
    let setV = false
    app.ticker.add((delta) => {
    speed += delta * 0.15
    this.y += speed * delta;
    if (this.children[0] && !setV) {
        this.children[0].alpha = 0.2;
        setV = true;
    }
    });
  }

  autoLightOn() {}

  autoLightOff() {}

  creationComplete() {
    console.log("creationComplete");
    eqLayer.addChild(this);
    // this.head.visible = false;
    // executeCmd(NBCommand.DRAG_COVER, {
    //     container: this,
    //     invert: false,
    //     outter: true,
    //     headCanCover: () => {
    //         return false;
    //     }
    // });
  }
}

module.exports = ADropper;

},{"./Draggable":5}],2:[function(require,module,exports){
const Draggable = require("./Draggable");

class AlcoholBurner extends Draggable {
    constructor() {
        super();
        this.init();
    }

    init() {
        if (!this.particle) {
            this.particle = ParticleUtil.getParticle(ParticleUtil.particles.all_fire);
            this.particle.x = 0; // 初始位置相对于容器
            this.particle.y = -120; // 初始位置相对于容器
            this.addChild(this.particle); // 将粒子添加到容器
            this.particle.visible = true;
        }

        this.x = 300;
        this.y = 300;
        super.init();
    }

    update() {
        if (this.particle) {
            // this.particle.render(dt);
            app.ticker.add((delta) => {
                this.particle.render(delta / 60);
            });
            this.checkParticleColl();
        }
    }

    checkParticleColl() {
        // 算出在热辐射半径内距离最近的容器

        // 
        this.particle.heatInfoObj = {
            eq: testTueb
        }
    }

    autoLightOn() {

    }

    autoLightOff() {}

    creationComplete() {
        console.log('creationComplete');
        eqLayer.addChild(this);
        this.head.visible = false;
        executeCmd(NBCommand.DRAG_COVER, {
            container: this,
            invert: false,
            outter: true,
            headCanCover: () => {
                return false;
            }
        });
    }
}

module.exports = AlcoholBurner;

},{"./Draggable":5}],3:[function(require,module,exports){
const ChemContainer = require("./ChemContainer");

class TestTube extends ChemContainer {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.x = 600;
    this.y = 600;
    super.init();
  }

  update() {
    super.update();
  }

  creationComplete() {
    console.log("creationComplete");
    eqLayer.addChild(this);
    this.drawLiquidGra();
  }
}

module.exports = TestTube;

},{"./ChemContainer":4}],4:[function(require,module,exports){
const {
  getDivideSpace,
  getAABB,
  iterator,
} = require("../pixi-util/PolygonUtil");
const Vector2 = require("../pixi-util/geom/Vector2");
const GraphicsUtils = require("../utils/GraphicsUtils");
const Draggable = require("./Draggable");

class ChemContainer extends Draggable {
  waveHeight = 0;
  maxWaveHeight = 0;
  waveDirection = 1;
  liquidGra = null;

  constructor() {
    super();
    this.init();
    this.liquidGra = new PIXI.Graphics();
    this.addChild(this.liquidGra);
  }

  init() {
    super.init();
  }

  drawLiquidGra() {
    const globalAry = this.getGlobalVertexes(true);

    let rect = getAABB(globalAry);

    let result = iterator(globalAry, rect, 100, 1);

    let pa = result[0];
    let pb = result[result.length - 1];
    const divideSpaceResult = getDivideSpace(globalAry, pa, pb);

    // const lastVertex = divideSpaceResult.up;

    let vertex = divideSpaceResult.down;

    const posAry = [];

    for (let j = 0; j < vertex.length; j++) {
      let p = this.toLocal(vertex[j]);
      posAry.push(p);
    }
    this.liquidGra.clear();
    this.liquidGra.beginFill(0x86888b);
    GraphicsUtils.drawLiquidPolygon(this.liquidGra, posAry, this.waveHeight);
    this.liquidGra.alpha = 0.5;
    this.liquidGra.endFill();
  }

  update() {
    super.update();
    app.ticker.add((delta) => {
        // this.particle.render(delta / 60);
        if (this.capacityVertex) {
            this.updateWave();
            this.drawLiquidGra();
        }
    });
  }

  updateWave() {
    if (this.maxWaveHeight === 0) this.maxWaveHeight = 20;
    this.maxWaveHeight *= 0.99;
    if (this.maxWaveHeight < 3) {
      this.maxWaveHeight = 0;
    }
    let v = this.waveHeight + 1 * this.waveDirection;
    if (v > this.maxWaveHeight) {
      v = this.maxWaveHeight;
      this.waveDirection = -1;
    } else if (v < -this.maxWaveHeight) {
      v = -this.maxWaveHeight;
      this.waveDirection = 1;
    }

    this.waveHeight = v;
  }

  /**
   * 获取当前容器的全局坐标点
   */
  getGlobalVertexes(forceGet) {
    if (
      forceGet ||
      this.activeCount > nb.ACTIVE_COUNT - 2
      //  || this.activeCount > 0 || this.hasReact > 0
    ) {
      // 原始坐标数据
      let oriAry = this.capacityVertex;
      // 全局坐标点
      let globalAry = [];
      // 全局缩放
      for (let i = 0, length = oriAry.length; i < length; i++) {
        let p = new Vector2(oriAry[i].get_x(), oriAry[i].get_y());
        globalAry.push(this.toGlobal(p));
      }
      this.globalAry = globalAry;
      return [].concat(globalAry);
    } else {
      return [].concat(this.globalAry);
    }
  }
}

module.exports = ChemContainer;

},{"../pixi-util/PolygonUtil":8,"../pixi-util/geom/Vector2":9,"../utils/GraphicsUtils":10,"./Draggable":5}],5:[function(require,module,exports){
class Draggable extends PIXI.Container {
    isDragging = false;
    offset = { x: 0, y: 0 };

    constructor() {
        super();
        this.init();
    }

    init() {
        this.interactive = true; // 启用交互
        this.buttonMode = true; // 设置光标为手型
        this.on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove);
    }

    update() {
        
    }

    onDragStart(event) {
        this.isDragging = true;
        this.offset.x = this.x - event.data.global.x;
        this.offset.y = this.y - event.data.global.y;

        // 禁用舞台的交互性
        app.stage.interactive = false;
    }

    onDragEnd() {
        this.isDragging = false;

        // 启用舞台的交互性
        app.stage.interactive = true;
    }

    onDragMove(event) {
        if (this.isDragging) {
            const newPosition = event.data.global;
            this.x = newPosition.x + this.offset.x;
            this.y = newPosition.y + this.offset.y;
        }
    }
}


module.exports = Draggable
},{}],6:[function(require,module,exports){
(function (global){(function (){
const AlcoholBurner = require('./AlcoholBurner')
const ADropper = require('./ADropper')
const BigTestTube = require('./BigTestTube')

const eqs = {
    AlcoholBurner,
    ADropper,
    BigTestTube,
}
global.eqs = eqs;
module.exports = eqs;
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ADropper":1,"./AlcoholBurner":2,"./BigTestTube":3}],7:[function(require,module,exports){
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

},{"./geom/Vector2":9}],8:[function(require,module,exports){
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

},{"./LineUtil.js":7,"./geom/Vector2.js":9}],9:[function(require,module,exports){
/**
 *
 * Created by onlyjyf on 8/30/16.
 */

class Vector2 {
    constructor(x = 0, y = 0) {
        if (x instanceof Object) {
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x;
            this.y = y;
        }
    }

    addXY(x, y) {
        var v = new Vector2(this.x, this.y);
        v.x += x;
        v.y += y;
        return v;
    }

    add(vec) {
        var v = new Vector2(this.x, this.y);
        v.x += isNaN(vec.x) ? vec.get_x() : vec.x;
        v.y += isNaN(vec.y) ? vec.get_y() : vec.y;
        return v;
    }

    sub(vec) {
        var v = new Vector2(this.x, this.y);
        if(!isNaN(vec.x) || vec.get_x) {
            v.x -= isNaN(vec.x) ? vec.get_x() : vec.x;
            v.y -= isNaN(vec.y) ? vec.get_y() : vec.y;
        }
        return v;
    }

    /**
     * 点乘
     * @param vec
     * @returns {number}
     */
    dot(vec) {
        return this.x * vec.x + this.y * vec.y;
    }

    /**
     * 叉乘
     * @param vec
     * @returns {number}
     */
    cross(vec) {
        return this.x * vec.y - vec.x * this.y;
    }

    /**
     * 当前向量在vec上的投影
     * @see 投影矩阵 --> http://blog.csdn.net/a130098300/article/details/7661548
     * @param vec
     */
    projectTo(vec) {
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
    }

    /**
     * 获取当前向量的长度
     * @returns {number}
     */
    length() {
        var x = this.x;
        var y = this.y;
        return Math.sqrt(x * x + y * y);
    }

    /**
     * 转成数组
     */
    toArray() {
        return [this.x, this.y];
    }

    /**
     * 克隆
     */
    clone() {
        return new Vector2(this.x, this.y);
    }

    /**
     * 乘以一个标量
     */
    multiplyScalar(s) {
        this.x *= s;
        this.y *= s;
        return this;
    }

    /**
     * 设置向量的长度
     * @param value
     */
    setLength(value) {
        this.multiplyScalar(value / this.length());
    }

    /**
     * 线性插值
     * @param v
     * @param alpha
     * @returns {Vector2}
     */
    lerp(v, alpha) {
        var vec = this.clone();
        vec.x += (v.x - vec.x) * alpha;
        vec.y += (v.y - vec.y) * alpha;
        return vec;
    }

    /**
     * 旋转多少度
     * @param angle 旋转的角度
     */
    rotate(angle) {
        var c = Math.cos(angle), s = Math.sin(angle);
        this.x = x * c - y * s;
        this.y = x * s + y * c;
    }

}

module.exports = Vector2;

},{}],10:[function(require,module,exports){
class GraphicsUtils {
    static draw(shape, ary) {
        shape.lastMovePos = {
            x: NaN,
            y: NaN
        };

        // var debugCommands = "";

        const moveTo = GraphicsUtils.__moveTo__;
        while (ary.length) {
            const dat = ary.pop();
            let _x, _y, a, b, c;
            if (dat === NBGraphicsCommand.MOVE_TO) {
                _x = ary.pop();
                _y = ary.pop();
                moveTo(shape, _x, _y);
                // if (flag) debugCommands += "g.moveTo(" + _x + "," + _y + ")\n";
            } else if (dat === NBGraphicsCommand.LINE_TO) {
                _x = ary.pop();
                _y = ary.pop();
                if (!(shape.lastMovePos.x === _x && shape.lastMovePos.y === _y)) {
                    // debugCommands += "g.lineTo(" + _x + "," + _y + ")\n";
                    shape.lineTo(_x, _y);
                    shape.lastMovePos.x = _x;
                    shape.lastMovePos.y = _y;
                }
            } else if (dat === NBGraphicsCommand.CURVO_TO) {
                _x = ary.pop();
                _y = ary.pop();
                moveTo(shape, _x, _y);
                // if (flag) debugCommands += "g.moveTo(" + _x + "," + _y + ")\n";
                const cx = ary.pop();
                const cy = ary.pop();
                const ax = ary.pop();
                const ay = ary.pop();
                shape.lastMovePos.x = ax;
                shape.lastMovePos.y = ay;
                shape.quadraticCurveTo(cx, cy, ax, ay);
                // debugCommands += "g.quadraticCurveTo(" + cx + "," + cy + "," + ax + "," + ay + ")\n";
            } else if (dat === NBGraphicsCommand.LINE_STYLE) {
                a = ary.pop();
                b = ary.pop();
                c = ary.pop();
                shape.lineStyle(a, b, c);
                // debugCommands += "g.lineStyle(" + a + "," + b + "," + c + ")\n";
            } else if (dat === NBGraphicsCommand.BEGIN_FILL) {
                a = ary.pop();
                b = ary.pop();
                shape.beginFill(a, b);
                // debugCommands += "g.beginFill(" + a + "," + b + ")\n";
            } else if (dat === NBGraphicsCommand.END_FILL) {
                //shape.lastMovePos = {x:NaN, y:NaN};
                shape.endFill();
                // debugCommands += "g.endFill();\n";
            }
        }
        //shape.debugCommands = debugCommands;
        //console.log(debugCommands)
    }

    static __moveTo__(s, x, y) {
        if (!(s.lastMovePos.x === x && s.lastMovePos.y === y)) {
            s.moveTo(x, y);
            s.lastMovePos.x = x;
            s.lastMovePos.y = y;
            return true;
        }
        return false;
    }

    static drawPolygon(gra, vertex) {
        for (let i = 0; i < vertex.length; i++) {
            const p = vertex[i];
            if (i === 0) {
                gra.moveTo(p.x, p.y);
            } else {
                gra.lineTo(p.x, p.y);
            }
        }
    }

    static drawLiquidPolygon(gra, vertex, waveHeight = 12, dltY = 0) {
        let sideHeight = 0;
        if (gra.parent && gra.parent.parent) {
            sideHeight = 8 * Math.cos(gra.parent.parent.rotation);
        }
        if (sideHeight < 1) {
            GraphicsUtils.drawPolygon(gra, vertex);
            return;
        }
        if (!vertex[1]) {
            return;
        }
        let p1 = gra.toGlobal(vertex[0]);
        let p2 = gra.toGlobal(vertex[1]);
        if (Math.abs(p1.y - p2.y) < 1) {
            let v = vertex.shift();
            vertex.push(v);
        }
        let len = vertex.length;
        let startPoint = vertex[0];
        let endPoint = vertex[len - 1];
        let minY = startPoint.y > endPoint.y ? startPoint.y : endPoint.y;
        let dx = startPoint.x - endPoint.x;
        let dy = startPoint.y - endPoint.y;
        let length = Math.sqrt(dx * dx + dy * dy);
        let maxWaveHeight = length / 10;
        waveHeight = waveHeight > maxWaveHeight ? maxWaveHeight : waveHeight;
        let xz = dx / length;
        let yz = dy / length;
        let leftWidth = dx < 0 ? 1 : -1;
        let maxY = -Infinity;
        for (let i = 0; i < len; i++) {
            let p = vertex[i];
            if (p.y > maxY) {
                maxY = p.y;
            }
        }
        let disY = maxY - minY;
        if (disY + dltY < sideHeight * 3) {
            sideHeight = 0;
        }
        if (disY < sideHeight) {
            sideHeight = (sideHeight + disY) / 2;
        }
        gra.moveTo(startPoint.x, startPoint.y - sideHeight);
        for (let i = 0; i < len; i++) {
            let p = vertex[i];
            gra.lineTo(p.x, p.y);
        }
        gra.lineTo(endPoint.x, endPoint.y - sideHeight);
        if (waveHeight === 0) {
            let anchorLength = leftWidth * sideHeight;
            let x = Math.abs(xz * anchorLength);
            let y = Math.abs(yz * anchorLength);
            gra.bezierCurveTo(endPoint.x + x, endPoint.y + y, startPoint.x - x, startPoint.y + y, startPoint.x, startPoint.y - sideHeight);
        } else {
            let amount = Math.ceil(Math.abs(length) / 100);
            amount = amount < 2 ? 2 : amount;
            let stepX = dx / amount / 2;
            let stepY = dy / amount / 2;
            let lastAnchorX = endPoint.x - leftWidth * sideHeight;
            let lastAnchorY = endPoint.y;
            let lastPointX = endPoint.x;
            let lastPointY = endPoint.y;
            let direction = 1;
            for (let i = 0; i < amount - 1; i++) {
                let middlePointX = lastPointX + stepX;
                let middlePointY = lastPointY + stepY;
                let newPointX = middlePointX + stepX;
                let newPointY = middlePointY + stepY;
                let newAnchorX = middlePointX + waveHeight * yz * direction;
                let newAnchorY = middlePointY - waveHeight * xz * direction;
                direction *= -1;
                gra.bezierCurveTo(lastAnchorX, lastAnchorY, newAnchorX, newAnchorY, newPointX, newPointY);
                lastAnchorX = newAnchorX + 2 * (newPointX - newAnchorX);
                lastAnchorY = newAnchorY + 2 * (newPointY - newAnchorY);
                lastPointX = newPointX;
                lastPointY = newPointY;
            }
            gra.bezierCurveTo(lastAnchorX, lastAnchorY, startPoint.x + leftWidth * sideHeight, startPoint.y, startPoint.x, startPoint.y - sideHeight);
            gra.endFill();
        }
    }

    static dashTo(gra, point1, point2, space, globalScale) {
        let dx = point2.x - point1.x;
        let dy = point2.y - point1.y;
        space = space > 0 ? space : 1;
        space *= globalScale;
        let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) * globalScale;
        let total = distance / space / 2;
        dx /= total * 2;
        dy /= total * 2;
        let currentP = Object.assign({}, point1);
        for (let i = 0; i < total - 1; i++) {
            gra.moveTo(currentP.x, currentP.y);
            gra.lineTo(currentP.x += dx, currentP.y += dy);
            currentP.x += dx;
            currentP.y += dy;
        }
        gra.moveTo(currentP.x, currentP.y);
        gra.lineTo(point2.x, point2.y);
    }
}

const NBGraphicsCommand = {
    MOVE_TO: 0x01,
    LINE_TO: 0x02,
    CURVO_TO: 0x03,
    LINE_STYLE: 0x20,
    BEGIN_FILL: 0x21,
    END_FILL: 0xFF
};

// 导出 GraphicsUtils 类
module.exports = GraphicsUtils;

},{}]},{},[6]);
