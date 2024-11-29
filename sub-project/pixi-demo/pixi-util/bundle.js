(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./geom/Vector2":5}],2:[function(require,module,exports){
/**
 *
 * Created by onlyjyf on 9/14/16.
 */
var MatrixUtil = function() {};

/**
 * 提取矩阵的旋转角度
 * @returns {number}
 */
MatrixUtil.retrieveRotation = function(matrix) {
    // var value = matrix.c / matrix.d;
    return -Math.atan2(matrix.c, matrix.d);
};
module.exports = MatrixUtil;

},{}],3:[function(require,module,exports){
(function (global){(function (){
/**
 *
 * Created by onlyjyf on 8/10/15.
 */
var ParticleUtil = {};
var PolygonUtil = require("./PolygonUtil");
var MatrixUtil = require("./MatrixUtil.js");
// const LineUtil = require("../utils/LineUtil");
const INFLUENCE_DISTANCE = 10;
// const JUDGE_DISTANCE = 30;
// var angle = MatrixUtil.retrieveRotation(this.transform.worldTransform);
/**
 * 创建粒子效果
 * @param data 粒子的数据
 */
ParticleUtil.getParticle = function (data) {
    var c = new PIXI.Container();
    c.interactive = false;
    c.interactiveChildren = false;
    //  是否缩小 离子范围 加上这个属性就会出现火焰烧不穿容器壁
    c.ifScaleParticle = false;
    // 加上这个属性并且ifScaleParticle === true 的话
    c.fireInContainer = false;

    // var textures = PIXI.Texture.fromFrame(data.texture);
    let textures = Array.isArray(data.texture) ? data.texture : [data.texture];
    textures = textures.map((tex) => {
        return PIXI.Texture.fromFrame(tex);
    });

    $.getJSON(data.path, function (data, info) {
        if (info == "success" && c) {
            c.particle = new PIXI.particles.Emitter(c, textures, data);
            c.loaded = true;
            c.emit("particle_load");
        }
    });
    c.bindObjPosition = null;
    //渲染
    //stopRotate 默认开启
    c.render = function (time, stopRotate = true) {
        if (this.particle != null) {
            if (this.bindObj != null) {
                var p = this.parent.toLocal({
                    x: 0,
                    y: 0
                }, this.bindObj);
                //当this.binObj的角度变换时 particle 能正确跟随
                if (stopRotate) {
                    var bindRotation = MatrixUtil.retrieveRotation(this.bindObj.transform.worldTransform);
                    let tempX = this.x;
                    let tempY = this.y;
                    if(this.bindObjPosition) {
                      tempX = this.bindObjPosition.x;
                      tempY = this.bindObjPosition.y;
                    }
                    this.x = tempX * Math.cos(bindRotation) - tempY * Math.sin(bindRotation);
                    this.y = tempY * Math.cos(bindRotation) + tempX * Math.sin(bindRotation);
                }
                this.particle.updateOwnerPos(p.x + this.bindOffsetX, p.y + this.bindOffsetY);

            }
            var now = Date.now();
            this.particle.update(time || (now - this.__timer__ || 0) * 0.001);
            this.__timer__ = now;
            if (!c) {
                return;
            }
            if (c.gasLeakage) {
                // console.log('has');
                // 粒子所在container 矩形大小
                var ifAllow = c.allowGetBounds;
                if (!c.allowGetBounds) {
                    c.allowGetBounds = true;
                }
                var p2Rectangle = c.getBounds();
                c.allowGetBounds = ifAllow;
                let container = c.bindParent;
                let ary = container.getObjectByAABB(p2Rectangle);
                ary.forEach(child => {
                    //判断各种试纸的反应 玻璃棒的反应
                    if (child.hitReact) {
                        child.hitReact(c.gasLeakage);
                    }
                });
            }
            // c.ifScaleParticle = true;
            if (c.ifScaleParticle && c.heatInfoObj && c.heatInfoObj.eq && c.heatInfoObj.eq.globalAry) {
                let heatInfoObj = c.heatInfoObj;
                let p2Rectangle = heatInfoObj.rectangle;
                let viewStack = c.root.viewStack;
                let modifyPosFunc = heatInfoObj.modifyPosFunc;
                if (!p2Rectangle || viewStack.hasEqMove || !modifyPosFunc) {
                    let ifAllow = c.allowGetBounds;
                    if (!ifAllow) {
                        c.allowGetBounds = true;
                    }
                    p2Rectangle = c.getBounds();
                    c.allowGetBounds = ifAllow;
                    heatInfoObj.rectangle = p2Rectangle;
                    let eq = heatInfoObj.eq;
                    let vertex = eq.globalAry;
                    let p1 = {};
                    let p2 = {};
                    // let pMiddle = {};
                    p1 = PolygonUtil.bottomLineIntersect(vertex, {
                        x: p2Rectangle.x,
                        y: p2Rectangle.y
                    }, {
                        x: p2Rectangle.x,
                        y: p2Rectangle.y + p2Rectangle.height
                    });
                    p2 = PolygonUtil.bottomLineIntersect(vertex, {
                        x: p2Rectangle.x + p2Rectangle.width,
                        y: p2Rectangle.y
                    }, {
                        x: p2Rectangle.x + p2Rectangle.width,
                        y: p2Rectangle.y + p2Rectangle.height
                    });


                    // eslint-disable-next-line no-inner-declarations
                    function getParticleXY(obj1, obj2) {
                        let pa = obj1.pa;
                        let pb = obj1.pb;
                        if (Math.abs((pa.y - pb.y) / (pa.x - pb.x)) > 100) {
                            obj1.y = pa.y > pb.y ? pa.y : pb.y;
                        }
                        pa = obj2.pa;
                        pb = obj2.pb;
                        if (Math.abs((pa.y - pb.y) / (pa.x - pb.x)) > 100) {
                            obj2.y = pa.y > pb.y ? pa.y : pb.y;
                        }
                        let p1 = c.toLocal(obj1);
                        let p2 = c.toLocal(obj2);
                        // let p1 = obj1;
                        // let p2 = obj2;
                        let maxY = c.toGlobal({
                            x: c.particle.ownerPos.x,
                            y: c.particle.ownerPos.y + INFLUENCE_DISTANCE
                        }).y;
                        if (obj1.y > maxY || obj2.y > maxY) {
                            return true;
                        }
                        let k = (p1.y - p2.y) / (p1.x - p2.x);
                        if (isNaN(k) || Math.abs(k) > 10) {
                            let maxY = p1.y > p2.y ? p1.y : p2.y;
                            let y = maxY + INFLUENCE_DISTANCE;
                            return function (pos) {
                                let shouldY = pos.y;
                                let changed = false;
                                let shouldX = pos.x;
                                if (shouldY < y) {
                                    changed = true;
                                    shouldX += (Math.random() - .5) * 10;
                                    shouldY = y;
                                }
                                return {
                                    x: shouldX,
                                    y: shouldY,
                                    changed: changed
                                };
                            };
                        } else {
                            return function (pos) {
                                let shouldY = (pos.x - p2.x) * k + p2.y + INFLUENCE_DISTANCE;
                                let shouldX = pos.x;
                                let changed = true;
                                if (pos.y > shouldY) {
                                    changed = false;
                                    shouldY = pos.y;
                                } else {
                                    shouldX += (Math.random() - .5) * 10;
                                    shouldY = (shouldX - p2.x) * k + p2.y + INFLUENCE_DISTANCE;
                                }
                                return {
                                    x: shouldX,
                                    y: shouldY,
                                    changed: changed
                                };
                            };
                        }
                    }
                    if (p1 && p2) {
                        modifyPosFunc = getParticleXY(p1, p2);
                    } else {
                        let pMiddle = PolygonUtil.bottomLineIntersect(vertex, {
                            x: p2Rectangle.x + p2Rectangle.width / 2,
                            y: p2Rectangle.y
                        }, {
                            x: p2Rectangle.x + p2Rectangle.width / 2,
                            y: p2Rectangle.y + p2Rectangle.height
                        });
                        if (pMiddle) {
                            modifyPosFunc = getParticleXY(pMiddle, pMiddle);
                        } else {
                            modifyPosFunc = true;
                        }
                    }
                    heatInfoObj.modifyPosFunc = modifyPosFunc;
                }
                if (modifyPosFunc && modifyPosFunc !== true) {
                    let length = this.children.length;
                    let count = 0;
                    for (let i = 0; i < length; i++) {
                        let p = this.children[i];
                        let pos = modifyPosFunc(p.position);
                        if (pos.changed) {
                            // pos = c.toLocal(pos);
                            p.x = pos.x;
                            p.y = pos.y;
                            count++;
                        }
                    }
                    let percent = count / length;
                    if (this.isAlcoholParticle) {
                        if (percent < .9) {
                            let degree = percent * 240;
                            this.particle.minStartRotation = 90 - degree;
                            this.particle.maxStartRotation = 90 + degree;
                        } else {
                            this.particle.minStartRotation = this.particle.maxStartRotation = 90;
                        }
                    }
                } else if (this.isAlcoholParticle) {
                    this.particle.minStartRotation = this.particle.maxStartRotation = 90;
                }
            } else if (this.isAlcoholParticle) {
                this.particle.minStartRotation = this.particle.maxStartRotation = 90;
            }




            // let ifAllow = c.allowGetBounds;
            // if (!ifAllow) {
            //     c.allowGetBounds = true;
            // }
            // let p2Rectangle = c.getBounds();
            // c.allowGetBounds = ifAllow;
            // // let equip;
            // // if (this.bindObj) {
            // //     equip = this.bindObj.currentEquipment;
            // // } else {
            // //     equip = this.parent.currentEquipment;
            // // }
            // let result = c.heatEq;
            // if (result) {
            //     let vertex = result.getBoundsVertexAry(true);
            //     let bottomPar = this.children[(this.children.length - 1)].y > this.children[0].y ? this.children[(this.children.length - 1)] : this.children[0];
            //     let pos1 = bottomPar.position;
            //     pos1 = this.toGlobal(pos1);
            //     // 离子最下面的在容器里 则 火焰不处理
            //     // let outContainer = PolygonUtil.containsPoint(vertex, pos1);
            //     // if (!outContainer) {

            //     // }
            //     let minPoint1 = {};
            //     let minPoint2 = {};
            //     let ckPoint1 = {
            //         x: p2Rectangle.x,
            //         y: p2Rectangle.y + p2Rectangle.height
            //     };
            //     PolygonUtil.getMinDistance(vertex, ckPoint1, minPoint1);
            //     let ckPoint2 = {
            //         x: p2Rectangle.x + p2Rectangle.width,
            //         y: p2Rectangle.y + p2Rectangle.height
            //     };
            //     PolygonUtil.getMinDistance(vertex, ckPoint2, minPoint2);
            //     let localP1 = minPoint1.projectPoint;
            //     let localP2 = minPoint2.projectPoint;
            //     if ((localP1.x < pos1.x && localP1.y < pos1.y) || (localP2.x < pos1.x && localP2.y < pos1.y)) {
            //         localP1 = c.toLocal(minPoint1.projectPoint);
            //         localP2 = c.toLocal(minPoint2.projectPoint);

            //         function getY(x) {
            //             return (x - localP2.x) * (localP1.y - localP2.y) / (localP1.x - localP2.x) + localP2.y;
            //         }
            //         let particleAmount = this.children.length;
            //         let inCount = 0;
            //         for (let i = 0; i < particleAmount; i++) {
            //             let child = this.children[i];
            //             let shouldY = getY(child.x);
            //             if (child.y < shouldY) {
            //                 child.x += (Math.random() - .5) * 30;
            //                 child.y = getY(child.x) - Math.random() * 30;
            //                 inCount++;
            //             }
            //         }
            //         let percent = inCount / particleAmount;
            //         if (percent < 0.9) {
            //             let degree = percent * 240;
            //             // let degree = 45;
            //             this.particle.minStartRotation = 90 - degree;
            //             this.particle.maxStartRotation = 90 + degree;
            //         } else {
            //             this.particle.minStartRotation = this.particle.maxStartRotation = 90;
            //         }
            //     } else if (this.isAlcoholParticle) {
            //         this.particle.minStartRotation = this.particle.maxStartRotation = 90;
            //     }
            // } else if (this.isAlcoholParticle) {
            //     this.particle.minStartRotation = this.particle.maxStartRotation = 90;
            // }
            //////////////////////////////////////////////////////////

            // // 粒子所在container 矩形大小
            // let ifAllow = c.allowGetBounds;
            // if (!c.allowGetBounds) {
            //     c.allowGetBounds = true;
            // }
            // let p2Rectangle = c.getBounds();
            // c.allowGetBounds = ifAllow;
            // // 粒子所在的容器 酒精灯 本生灯等
            // let equip;
            // if (this.bindObj) {
            //     equip = this.bindObj.currentEquipment;
            // } else {
            //     equip = this.parent.currentEquipment;
            // }
            // //getObjectByAABB = equip.getObjectByAABB.bind(equip);
            // // 获取与容器AABb碰撞 的 元件数组

            // let result = equip.getObjectByAABB(p2Rectangle, false, true);
            // // 选择一件元件
            // for (let j = 0; j < this.children.length; j++) {
            //     this.children[j].filters = null;
            // }
            // if (result.length === 0 && this.isAlcoholParticle) {
            //     this.particle.minStartRotation = this.particle.maxStartRotation = 90;
            // }
            // let borderDis = INFLUENCE_DISTANCE * globalScale;
            // for (let i = 0; i < result.length; i++) {
            //     let eq = result[i];
            //     var m_vertex = eq.capacityVertex ? eq.capacityVertex : []; //顶点数组
            //     if ((!eq.capacityVertex || eq instanceof require("../assist/AlcoholLampNetCover")) && eq.localBounds) {
            //         if (!eq.capacityVertex && eq.outFrame) {
            //             var outBounds = eq.localBounds;
            //             var eqPos = {
            //                 x: outBounds.x,
            //                 y: outBounds.y
            //             };
            //             var eqWidth = outBounds.width;
            //             var eqHeight = outBounds.height;
            //             m_vertex = [eqPos, {
            //                     x: eqPos.x,
            //                     y: eqPos.y + eqHeight
            //                 }, {
            //                     x: eqPos.x + eqWidth,
            //                     y: eqPos.y + eqHeight
            //                 },
            //                 {
            //                     x: eqPos.x + eqWidth,
            //                     y: eqPos.y
            //                 }
            //             ];
            //             for (var j = 0; j < 4; j++) {
            //                 m_vertex[j] = new nape.geom.Vec2(m_vertex[j].x, m_vertex[j].y);
            //             }
            //         } else {
            //             continue;
            //         }
            //     }
            //     var p2Vertex = []; // 全局 多边形顶点坐标数组
            //     let originVertex = [];
            //     // let originVertex = [];
            //     // 多边形顶点转为全局的坐标
            //     if (m_vertex.length === 0) {
            //         continue;
            //     }
            //     let maxY = -Infinity;
            //     if (eq.isBlockMedicine) {
            //         borderDis = 0;
            //         if (eq.polyDataMap && eq.polyDataMap.refA) {
            //             let ary = eq.polyDataMap.refA[0];
            //             m_vertex.length = 0;
            //             for (let i = 0; i < ary.length; i++) {
            //                 m_vertex[i] = new nape.geom.Vec2(ary[i].x, ary[i].y);
            //             }
            //             eq.capacityVertex = m_vertex;
            //         }
            //     }
            //     for (let p = 0; p < m_vertex.length; p++) {
            //         var pos = {
            //             x: m_vertex[p].get_x(),
            //             y: m_vertex[p].get_y()
            //         };
            //         pos = eq.toGlobal(pos);
            //         originVertex.push({
            //             x: pos.x,
            //             y: pos.y + borderDis / 3
            //         });
            //         pos.y += borderDis;
            //         if (maxY < pos.y) {
            //             maxY = pos.y;
            //         }
            //         p2Vertex.push(pos);

            //     }
            //     // 如果粒子矩形包含在容器中 则 不会有下面的效果
            //     // 离子有时候是降序 有时候是升序 那y值最小的离子
            // var bottomPar = this.children[(this.children.length - 1)].y > this.children[0].y ? this.children[(this.children.length - 1)] : this.children[0];
            // let pos1 = bottomPar.position;
            // pos1 = this.toGlobal(pos1);

            // // 离子最下面的在容器里 则 火焰不处理
            // let outContainer = PolygonUtil.containsPoint(originVertex, pos1);
            //     if (this.fireInContainer) {
            //         outContainer = !outContainer;
            //     }
            //     if (outContainer) {
            //         if (this.isAlcoholParticle) {
            //             this.particle.minStartRotation = this.particle.maxStartRotation = 90;
            //         }
            //         return;
            //     }
            //     let inCount = 0;
            //     // 遍历检测粒子 是否被包含到容器中
            //     for (let j = 0; j < this.children.length; j++) {
            //         let pos = this.children[j].position;
            //         pos = this.toGlobal(pos);
            //         // 处理酒精灯 拖动尾焰长
            //         //if(equip instanceof  require('../assist/AlcoholBurner')){
            //         //    // 酒精灯上 点亮点的位置
            //         //    var lightPos = equip.toGlobal(equip.lightOnRef.position);
            //         //    // 两点之间距离大于 某个值隐藏
            //         //    if(NBPoint.distance(lightPos,pos) > 100){
            //         //        this.children[j].visible = false;
            //         //    }
            //         //}
            //         // 多边形包含某个粒子 粒子visible 为 false
            //         let changeShapeArea = PolygonUtil.containsPoint(p2Vertex, pos);

            //         if (this.fireInContainer) {
            //             changeShapeArea = !changeShapeArea;
            //         }
            //         if (changeShapeArea) {
            //             inCount++;
            //             let p = this.children[j];
            //             let result = {};
            //             let minDis = PolygonUtil.getMinDistance(originVertex, pos, result);
            //             let testLength = INFLUENCE_DISTANCE * globalScale;
            //             if (minDis < testLength) {
            //                 let {
            //                     pa,
            //                     pb,
            //                 } = result;
            //                 let point = result.projectPoint;
            //                 let openFire = LineUtil.containsPoint(point, originVertex[0], originVertex[originVertex.length - 1]);
            //                 // console.log(openFire);
            //                 if (openFire) {
            //                     inCount--;
            //                     continue;
            //                 }
            //                 let dx = pa.x - pb.x;
            //                 let dy = pa.y - pb.y;
            //                 let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            //                 let percent = (Math.random() * 2 - 1) * JUDGE_DISTANCE * globalScale / distance;
            //                 let cos = dx * percent;
            //                 let sin = dy * percent;
            //                 point.x += cos;
            //                 point.y += sin + 10 * globalScale;
            //                 point = this.toLocal(point);
            //                 p.x += (point.x - p.x) / 2;
            //                 p.y += (point.y - p.y) / 2;
            //                 let sc = (1 - minDis / testLength) * .05 + 1;
            //                 p.scale.x *= sc;
            //                 p.scale.y *= sc;
            //                 p.acceleration.y /= 2;
            //             } else {
            //                 p.maxLife = 0;
            //             }
            //         }
            //     }
            //     if (this.isAlcoholParticle) {
            //         let percent = inCount / this.children.length;
            //         if (percent < 0.9) {
            // let degree = percent * 240;
            // this.particle.minStartRotation = 90 - degree;
            // this.particle.maxStartRotation = 90 + degree;
            //         } else {
            //             this.particle.minStartRotation = this.particle.maxStartRotation = 90;
            //         }

            //     }

            //     break;
            // }
        }
    };
    //绑定的对象
    c.bind = function (obj, offsetX, offsetY) {
        c.bindObj = obj;
        c.bindOffsetX = offsetX || 0;
        c.bindOffsetY = offsetY || 0;
    };

    c.destroy = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        if (!c) {
            return;
        }

        c.bindObj = null;
        if (c.particle) {
            c.particle.destroy.apply(c.particle);
        }
        delete c.bindObj;
        c = null;
        textures = null;
    };

    /**
     * 设置粒子的属性
     */
    c.setParticleProp = function (prop, value) {
        if (c && c.particle) {
            let changeEnd = false;
            // endColor endScale endAlpha 已经不存在了，他们变成了startColor startScale startAlpha 的next属性的value
            if (/^end/.test(prop)) {
                prop = prop.replace("end", "start");
                changeEnd = true;
            }
            let originValue = c.particle[prop];
            if (originValue.isStepped !== undefined) {
                if (!originValue.next && changeEnd) return;
                let changedProp = changeEnd ? originValue.next : originValue;
                if (value instanceof Array) {
                    changedProp.value.r = value[0];
                    changedProp.value.g = value[1];
                    changedProp.value.b = value[2];
                } else {
                    changedProp.value = value;
                }
            } else {
                c.particle[prop] = value;
            }
        }
    };

    /**
     * 获取粒子属性
     * @param prop
     * @returns {*}
     */
    c.getParticleProp = function (prop) {
        if (c.particle) {
            if ("startColor" === prop) {
                let v = c.particle.startColor.value;
                return [v.r, v.g, v.b]; //老版本返回的是数组 新版本是对象
            }
            if ("endColor" === prop) {
                let v = c.particle.startColor.next ? c.particle.startColor.next.value : c.particle.startColor.value;
                return [v.r, v.g, v.b]; //老版本返回的是数组 新版本是对象
            }
            if (/^start/.test(prop)) {
                return c.particle[prop].value;
            }
            if (/^end/.test(prop)) {
                prop = prop.replace("end", "start");
                return c.particle[prop].next ? c.particle[prop].next.value : c.particle[prop].value;
            }
            return c.particle[prop];
        }
    };

    return c;
};


ParticleUtil.particles = {

    overflowLiquid: {
        path: "assets/particles/overflow_liquid.json",
        texture: "particle.spirit_fire"
    },

    // 震荡后乳化泡沫
    emulsionBubble: {
        path: "assets/particles/emulsion_bubble.json",
        texture: "particle.bubbles32.png"
    },
    // 蜡烛熄灭后烟雾
    candleSmoke: {
        path: "assets/particles/candle_smoke.json",
        texture: ["particle.mg_smoke.1", "particle.mg_smoke.2", "particle.mg_smoke.3", "particle.mg_smoke.4", "particle.mg_smoke.5", "particle.mg_smoke.6"]
    },
    alcoholSpray: {
        path: "assets/particles/alcohol_spray.json",
        texture: ["particle.spirit_fire"]
    },
    alcoholBoom: {
        path: "assets/particles/alcohol_boom.json",
        texture: ["particle.smoke"]
    },
    // 上升的水雾
    waterSmoke: {
        path: "assets/particles/waterSmoke.json",
        texture: ["particle.mg_smoke.3"]
    },
    buretteWater: {
        path: "assets/particles/burette_water.json",
        texture: "particle.spirit_fire"
    },
    boomWave: {
        path: "assets/particles/boom_wave.json",
        texture: "particle.smoke"
    },
    jiejing: {
        path: "assets/particles/jiejing.json",
        texture: ["jiejing1", "jiejing2", "jiejing3", "jiejing4", "jiejing5", "jiejing6", "jiejing7", "jiejing8", "jiejing9", "jiejing10", "jiejing11", "jiejing12", "jiejing13", "jiejing14", "jiejing15", "jiejing16", "jiejing17", "jiejing18", "jiejing19", "jiejing20", "jiejing21", "jiejing22", "jiejing23", "jiejing24"]
    },
    paperFire: {
        path: "assets/particles/paper_fire.json",
        texture: "particle.spirit_fire"
    },
    // 导管口燃烧的烟雾
    tubeSmoke: {
        path: "assets/particles/tube_smoke.json",
        texture: ["particle.mg_smoke.1"]
    },
    // 碳化钙与水反应附着的小气泡
    CaC2Bubble: {
        path: "assets/particles/CaC2Bubble.json",
        texture: ["particle.bubbles32.png"]
    },
    // 钾在水中反应的火焰
    KFiremInWater: {
        path: "assets/particles/K_fire_in_water.json",
        texture: ["particle.spirit_fire"]
    },
    // 碘和铝反应的烟
    somkeOfIandAl: {
        path: "assets/particles/Al_I_smoke.json",
        texture: ["particle.smoke", "particle.spirit_fire"]
    },
    // 碘和铝反应的火
    fireOfIandAl: {
        path: "assets/particles/Al_I_fire.json",
        texture: ["particle.spirit_fire"]
    },
    // 石蜡油加热烟雾
    paraffin_smoke: {
        path: "assets/particles/paraffin_smoke.json",
        texture: ["particle.smoke"]
    },
    // 金属片气泡
    metalBubble: {
        path: "assets/particles/metalBubble.json",
        texture: ["particle.bubbles32.png"]
    },
    // 高温铜丝伸入到乙醇中
    copper_wire_bubble: {
        path: "assets/particles/copper_wire_bubble.json",
        texture: ["particle.bubbles32.png"]
    },
    // 普通沉淀的粒子
    general_sediment: {
        path: "assets/particles/generalSediment.json",
        texture: ["particle.whiteSmoke"]
        // texture: ["particle.smoke"]
    },
    // 点燃引线的火
    line_spark: {
        path: "assets/particles/lineSpark.json",
        texture: ["particle.alumn.4"]
    },
    // 烟花爆炸瞬间背景火
    fireWorks_halo: {
        path: "assets/particles/fireworksHalo.json",
        texture: ["particle.smoke2"]
    },
    // 烟花爆炸的火
    fireWorks_fire: {
        path: "assets/particles/fireworks.json",
        texture: ["particle.alumn.3", "particle.iron_fire.1", "particle.smoke2"]
    },
    // 烟花上升的火
    fireWorks_emitter: {
        path: "assets/particles/fireworkEmitter.json",
        texture: ["particle.iron_fire.1"]
    },
    //---容器中酒精燃烧
    alcoholInCon_fire: {
        path: "assets/particles/alcoholInCon_fire.json",
        texture: "particle.spirit_fire"
    },
    //---钠块身上的气泡
    soapBubble_fire: {
        path: "assets/particles/soapBubble_fire.json",
        texture: "particle.spirit_fire"
    },
    //---钠块身上的气泡
    Na_bubble: {
        path: "assets/particles/Na_bubble.json",
        texture: ["particle.bubbles32.png"]
    },
    //---黑面包烟雾
    blackbread_smoke: {
        path: "assets/particles/blackbread_smoke.json",
        texture: ["particle.mg_smoke.1", "particle.mg_smoke.4", "particle.mg_smoke.3", "particle.mg_smoke.4", "particle.mg_smoke.5", "particle.mg_smoke.6"]
    },
    //---氧化钙与水反应
    yanghuagaiyushui: {
        path: "assets/particles/yanghuagaiyushui.json",
        texture: "yanghuagaiyushui"
    },
    //---飞溅液滴
    feijianyedi: {
        path: "assets/particles/feijianyedi.json",
        texture: "Bitmap 2"
    },

    //---浓硫酸飞溅
    nongliusuanfeijian: {
        path: "assets/particles/nongliusuanfeijian.json",
        texture: ["Bitmap 2", "particle.bubbles32.png"]
    },

    //---萃取中油珠泡泡粒子
    oil_bubble: {
        path: "assets/particles/oil_bubble.json",
        texture: "particle.bubbles32.png"
    },
    //---铁丝在氯气中本体烟雾
    iron_cl_up: {
        path: "assets/particles/iron_cl_up.json",
        texture: ["particle.smoke", "particle.spirit_fire", "particle.spirit_fire"]
    },
    //---铁丝在氯气中瓶口烟雾
    iron_cl_out: {
        path: "assets/particles/iron_cl_out.json",
        texture: ["particle.smoke", "particle.spirit_fire"]
    },
    //---铁丝在氯气中瓶子内部烟雾
    iron_cl_bottle: {
        path: "assets/particles/iron_cl_bottle.json",
        texture: ["particle.smoke"]
    },
    //---铜丝在氯气中本体烟雾
    copper_cl_up: {
        path: "assets/particles/copper_cl_up.json",
        texture: ["particle.smoke", "particle.spirit_fire", "particle.spirit_fire"]
    },
    //---铜丝在氯气中瓶口烟雾
    copper_cl_out: {
        path: "assets/particles/copper_cl_out.json",
        texture: ["particle.smoke", "particle.spirit_fire"]
    },
    //---铜丝在氯气中瓶子内部烟雾
    copper_cl_bottle: {
        path: "assets/particles/copper_cl_bottle.json",
        texture: ["particle.smoke"]
    },
    //---铜丝在氯气中瓶子内部烟雾
    blockCu_cl_bottle: {
        path: "assets/particles/blockCu_cl_bottle.json",
        texture: ["particle.smoke"]
    },
    //---气球爆炸
    ball_Boom: {
        path: "assets/particles/ball_Boom.json",
        texture: ["ball.particle1", "ball.particle2", "ball.particle3", "ball.particle4", "ball.particle5", "ball.particle6", "ball.particle7"]
    },
    //---巨爆炸
    huge_Boom: {
        path: "assets/particles/huge_Boom.json",
        texture: ["boli.particle1", "boli.particle2", "boli.particle3", "boli.particle4", "boli.particle5", "boli.particle6", "boli.particle7", "boli.particle8", "boli.particle9", "boli.particle10", "boli.particle11", "boli.particle12", "boli.particle13", "boli.particle14", "boli.particle15", "boli.particle16", "boli.particle17", "boli.particle18", "boli.particle19", "boli.particle20", "boli.particle21"]
    },
    //---大爆炸
    big_Boom: {
        path: "assets/particles/big_Boom.json",
        texture: ["boli.particle1", "boli.particle2", "boli.particle3", "boli.particle4", "boli.particle5", "boli.particle6", "boli.particle7", "boli.particle8", "boli.particle9", "boli.particle10", "boli.particle11", "boli.particle12", "boli.particle13", "boli.particle14", "boli.particle15", "boli.particle16", "boli.particle17", "boli.particle18", "boli.particle19", "boli.particle20", "boli.particle21"]
    },
    //---小爆炸
    small_Boom: {
        path: "assets/particles/small_Boom.json",
        texture: ["boli.particle1", "boli.particle2", "boli.particle3", "boli.particle4", "boli.particle5", "boli.particle6", "boli.particle7", "boli.particle8", "boli.particle9", "boli.particle10", "boli.particle11", "boli.particle12", "boli.particle13", "boli.particle14", "boli.particle15", "boli.particle16", "boli.particle17", "boli.particle18", "boli.particle19", "boli.particle20", "boli.particle21"]
    },
    //----氢氧化亚铁底部
    liusuanyatie_dibu: {
        path: "assets/particles/liusuanyatie_dibu.json",
        texture: ["particle.smoke"]
    },
    //----氢氧化亚铁滴入
    liusuanyatie_diru: {
        path: "assets/particles/liusuanyatie_diru.json",
        texture: ["particle.smoke1",
            "particle.mg_smoke.3",
            "particle.mg_smoke.5",
            "particle.mg_smoke.6"
        ]
    },
    //-----絮状填满容器
    xuzhuang_full: {
        path: "assets/particles/xuzhuang_full.json",
        texture: ["particle.smoke"]
    },
    //-----氢氧化铜絮状
    xuzhuang_cuoh2: {
        path: "assets/particles/xuzhuang_cuoh2.json",
        texture: ["particle.smoke"]
    },
    //----氢氧化亚铁制取变红
    liusuanyatie_chendian_red_lv2: {
        path: "assets/particles/liusuanyatie_chendian_red_lv2.json",
        texture: ["particle.smoke"]
    },
    //----氢氧化亚铁制取
    liusuanyatie_chendian_lv2: {
        path: "assets/particles/liusuanyatie_chendian_lv2.json",
        texture: ["particle.smoke"]
    },
    //----氢氧化亚铁制取
    liusuanyatie_chendian_lv: {
        path: "assets/particles/liusuanyatie_chendian_lv.json",
        texture: ["xuzhuang_test"]
    },
    //----硝酸铝烧杯试试水
    liusuanlvshaobei_top2: {
        path: "assets/particles/liusuanlvshaobei_top2.json",
        texture: ["xuzhuang_test"]
    },
    //----硝酸铝烧杯滴入
    liusuanlvshaobei_diru: {
        path: "assets/particles/liusuanlvshaobei_diru.json",
        texture: ["xuzhuang_test"]
    },
    //----硝酸铝烧杯顶部
    liusuanlvshaobei_top: {
        path: "assets/particles/liusuanlvshaobei_top.json",
        texture: ["xuzhuang_test"]
    },
    //----硝酸铝试管顶部
    liusuanlv_shiguanbi: {
        path: "assets/particles/liusuanlv_shiguanbi.json",
        texture: ["particle.smoke1",
            "particle.mg_smoke.3",
            "particle.mg_smoke.5",
            "particle.mg_smoke.6"
        ]
    },
    //----硝酸铝试管顶部
    liusuanlv_top: {
        path: "assets/particles/liusuanlv_top.json",
        texture: ["xuzhuang_test"]
    },
    //----硝酸钡要干左边
    xiaosuanbei_left: {
        path: "assets/particles/xiaosuanbei_left.json",
        texture: ["xuzhuang_test"]
    },
    //----硝酸钡要干右边
    xiaosuanbei_right: {
        path: "assets/particles/xiaosuanbei_right.json",
        texture: ["xuzhuang_test"]
    },
    //----硝酸钡要干啥
    xiaosuanbei_down: {
        path: "assets/particles/xiaosuanbei_down.json",
        texture: ["xuzhuang_test"]
    },
    //----硝酸钡要干啥
    xiaosuanbei_up: {
        path: "assets/particles/xiaosuanbei_up.json",
        texture: "xuzhuang_test"
    },
    //----硝酸钡要干啥
    xiaosuanbei_diru: {
        path: "assets/particles/xiaosuanbei_diru.json",
        texture: "xuzhuang_test"
    },
    //----絮状沉淀
    xuzhuang_diru_qing2: {
        path: "assets/particles/xuzhuang_diru_qing2.json",
        texture: ["particle.smoke1", "particle.mg_smoke.2", "particle.mg_smoke.3", "xuzhuang_test"]
    },
    //----木炭燃烧
    mutanranshao: {
        path: "assets/particles/mutanranshao.json",
        texture: "particle.spirit_fire"
    },
    //----絮状沉淀
    xuzhuang_diru_qing: {
        path: "assets/particles/xuzhuang_diru_qing.json",
        texture: ["particle.smoke1", "particle.mg_smoke.2", "particle.mg_smoke.3", "xuzhuang_test"]
    },
    //----絮状沉淀2
    xuzhuang_diru2: {
        path: "assets/particles/xuzhuang_diru2.json",
        texture: "xuzhuang_test"
    },
    //----絮状沉淀
    xuzhuang_diru: {
        path: "assets/particles/xuzhuang_diru.json",
        texture: "xuzhuang_test"
    },
    //----底部细小大量气泡
    fenmo_diru_qipao: {
        path: "assets/particles/fenmo_diru_qipao.json",
        texture: "particle.bubbles32.png"
    },
    //--底部小量气泡
    fenmo_diru_qipao_b: {
        path: "assets/particles/fenmo_diru_qipao_b.json",
        texture: "particle.bubbles10.png"
    },
    //--底部粉末气泡----跳转
    fenmo_jump_qipao: {
        path: "assets/particles/fenmo_jump_qipao.json",
        texture: "particle.bubbles32.png"
    },

    //--底部粉末气泡----开始
    fenmo_start_qipao: {
        path: "assets/particles/fenmo_start_qipao.json",
        texture: "particle.bubbles32.png"
    },
    //--底部粉末气泡----大
    fenmo_biaomian_qipao_b: {
        path: "assets/particles/fenmo_biaomian_qipao_b.json",
        texture: "particle.bubbles32.png"
    },
    //--底部粉末气泡
    fenmo_biaomian_qipao: {
        path: "assets/particles/fenmo_biaomian_qipao.json",
        texture: "particle.bubbles32.png"
    },
    //--镁条少量up
    meitiao_fuzhuo_qipao_s: {
        path: "assets/particles/meitiao_fuzhuo_qipao_s.json",
        texture: "particle.bubbles32.png"
    },
    //--镁条少量fuzhuo
    meitiao_up_qipao_s: {
        path: "assets/particles/meitiao_up_qipao_s.json",
        texture: "particle.bubbles32.png"
    },
    //--镁条试管顶部
    meitiao_shiguan_top: {
        path: "assets/particles/meitiao_shiguan_top.json",
        texture: "particle.bubbles32.png"
    },
    //--镁条试管左移动
    meitiao_shiguan_left: {
        path: "assets/particles/meitiao_shiguan_left.json",
        texture: "particle.bubbles32.png"
    },
    //--镁条试管右移动
    meitiao_shiguan_right: {
        path: "assets/particles/meitiao_shiguan_right.json",
        texture: "particle.bubbles32.png"
    },
    //--镁条顶部右移动
    meitiao_left_qipao: {
        path: "assets/particles/meitiao_left_qipao.json",
        texture: "particle.bubbles32.png"
    },
    //--镁条顶部左移动
    meitiao_right_qipao: {
        path: "assets/particles/meitiao_right_qipao.json",
        texture: "particle.bubbles32.png"
    },
    //--镁条顶部反弹
    meitiao_fantan_qipao: {
        path: "assets/particles/meitiao_fantan_qipao.json",
        texture: "particle.bubbles32.png"
    },
    //--镁条上升
    meitiao_up_qipao: {
        path: "assets/particles/meitiao_up_qipao.json",
        texture: "particle.bubbles32.png"
    },
    //--镁条附着气泡
    meitiao_fuzhuo_qipao: {
        path: "assets/particles/meitiao_fuzhuo_qipao.json",
        texture: "particle.bubbles32.png"
    },
    //--肥皂气泡起床了
    soapBubble_up: {
        path: "assets/particles/soapBubble_up.json",
        texture: "particle.bubbles32.png"
    },
    //--试管中的沸腾顶部小气泡
    shiguan_qipao_top1: {
        path: "assets/particles/shiguan_qipao_top1.json",
        texture: "particle.bubbles29.png"
    },
    //--试管中的沸腾顶部小气泡
    shiguan_qipao_top: {
        path: "assets/particles/shiguan_qipao_top.json",
        texture: "particle.bubbles32.png"
    },
    //--试管中的沸腾小气泡
    shiguan_qipao_s: {
        path: "assets/particles/shiguan_qipao_s.json",
        texture: "particle.bubbles32.png"
    },
    //--试管中的沸腾气泡
    shiguan_qipao: {
        path: "assets/particles/shiguan_qipao.json",
        texture: "particle.bubbles32.png"
    },
    //--水沸腾向上气泡部分
    shuifeiteng_qipao: {
        path: "assets/particles/shuifeiteng_qipao.json",
        texture: "particle.bubbles29.png"
    },
    //--水沸腾向上气泡部分
    shuifeiteng_xiaoqipao_up_ss: {
        path: "assets/particles/shuifeiteng_xiaoqipao_up_ss.json",
        texture: "particle.bubbles32.png"
    },
    //--水沸腾向上气泡部分
    shuifeiteng_xiaoqipao_up_s: {
        path: "assets/particles/shuifeiteng_xiaoqipao_up_s.json",
        texture: "particle.bubbles32.png"
    },
    //--水沸腾向上气泡部分
    shuifeiteng_xiaoqipao_up: {
        path: "assets/particles/shuifeiteng_xiaoqipao_up.json",
        texture: "particle.bubbles32.png"
    },
    //--水沸腾底部
    shuifeiteng_xiaoqipao_dibu: {
        path: "assets/particles/shuifeiteng_xiaoqipao_dibu.json",
        texture: "particle.bubbles32.png"
    },
    //--顶部气泡向上走
    hugebreak_qipao_up: {
        path: "assets/particles/hugebreak_qipao_up.json",
        texture: "particle.bubbles32.png"
    },

    //--顶部气泡中心
    hugebreak_qipao_midd: {
        path: "assets/particles/hugebreak_qipao_midd.json",
        texture: "particle.bubbles29.png"
    },
    //--顶部气泡向右
    hugebreak_qipao_right: {
        path: "assets/particles/hugebreak_qipao_right.json",
        texture: "particle.bubbles29.png"
    },
    //--顶部气泡
    hugebreak_qipao: {
        path: "assets/particles/hugebreak_qipao.json",
        texture: "particle.bubbles16.png"
    },
    //--顶部气泡向右
    glass_guan_qipao_right: {
        path: "assets/particles/glass_guan_qipao_right.json",
        texture: "particle.bubbles16.png"
    },
    //--顶部气泡
    glass_guan_qipao_top: {
        path: "assets/particles/glass_guan_qipao_top.json",
        texture: "particle.bubbles16.png"
    },

    //玻璃管中的气泡
    glass_guan_qipao_b: {
        path: "assets/particles/glass_guan_qipao_b.json",
        texture: "particle.bubbles32.png"
    },

    glass_guan_qipao_s: {
        path: "assets/particles/glass_guan_qipao_s.json",
        texture: "particle.bubbles32.png"
    },
    //钠在氯中光晕
    na_lv_halo_gas: {
        path: "assets/particles/na_lv_halo_gas.json",
        texture: ["particle.spirit_fire"]
    },
    //钠在氯气中的上升烟雾
    na_lv_smoke_gas_up: {
        path: "assets/particles/na_lv_smoke_gas_up.json",
        texture: ["particle.spirit_fire"]
    },
    //钠在氯气中的下降烟雾
    na_lv_smoke_gas_down: {
        path: "assets/particles/na_lv_smoke_gas_down.json",
        texture: ["particle.smoke"]
    },

    //钠在空气中燃烧
    na_air_smoke: {
        path: "assets/particles/na_air_smoke.json",
        texture: ["particle.smoke1", "particle.mg_smoke.2", "particle.mg_smoke.3"]
    },
    //钠在空气中燃烧
    na_air_fire: {
        path: "assets/particles/na_air_fire.json",
        texture: ["particle.spirit_fire"]
    },
    //白磷在容器中的烟雾
    p4_bottle_smoke: {
        path: "assets/particles/p4_bottle_smoke.json",
        texture: "particle.smoke"
    },
    //白磷燃烧火星
    bailin_fire_main_1: {
        path: "assets/particles/bailin_fire_main_1.json",
        texture: ["particle.spirit_fire"]
    },
    //白磷燃烧火焰1
    bailin_fire_main: {
        path: "assets/particles/bailin_fire_main.json",
        texture: "particle.spirit_fire"
    },
    //氢气在普通管
    qingqi_fire_b: {
        path: "assets/particles/qingqi_fire_b.json",
        texture: "particle.spirit_fire"
    },
    //氢气在尖嘴管
    qingqi_fire_s: {
        path: "assets/particles/qingqi_fire_s.json",
        texture: "particle.spirit_fire"
    },
    //棉花火焰 2
    mianhua_fire: {
        path: "assets/particles/mianhua_fire.json",
        texture: "particle.spirit_fire"
    },
    //聚乙烯塑料火焰 2
    pepanel_fire: {
        path: "assets/particles/pepanel_fire.json",
        texture: "particle.spirit_fire"
    },
    //铁粉和硫粉火焰
    fe_s_fire: {
        path: "assets/particles/fe_s_fire.json",
        texture: "particle.spirit_fire"
    },

    //铁丝上的火星 2
    iron_fire_spark01: {
        path: "assets/particles/iron_fire_spark01.json",
        texture: "particle.rain"
        // ["particle.rain","particle.fangkuai"]
    },
    //铁丝上的火星 2
    iron_fire_spark: {
        path: "assets/particles/iron_fire_spark.json",
        texture: "particle.rain"
    },
    //铁丝上的在氧气中 15
    iron_fire: {
        path: "assets/particles/iron_fire.json",
        texture: ["particle.spirit_fire", "particle.smoke"]
    },
    //集气瓶烟雾和向上烟雾
    jiqipin_red_lin_smoke: {
        path: "assets/particles/jiqipin_red_lin_smoke.json",
        texture: ["particle.mg_smoke.1", "particle.mg_smoke.4", "particle.mg_smoke.3", "particle.mg_smoke.6", "particle.mg_smoke.5"]
    },
    jiqipin_red_lin_smoke_up: {
        path: "assets/particles/jiqipin_red_lin_smoke_up.json",
        texture: ["particle.mg_smoke.1", "particle.mg_smoke.4", "particle.mg_smoke.3"]
    },
    //红磷在空气中的烟雾
    red_lin_smoke: {
        path: "assets/particles/red_lin_smoke.json",
        texture: ["particle.mg_smoke.1", "particle.mg_smoke.4", "particle.mg_smoke.3"]
    },
    //红磷在空气中燃烧
    red_lin_fire: {
        path: "assets/particles/red_lin_fire.json",
        texture: "particle.spirit_fire"
    },
    //红磷在铜片上燃烧
    red_lin_fire_cu: {
        path: "assets/particles/red_lin_fire_cu.json",
        texture: "particle.spirit_fire"
    },
    //硫在空气中燃烧1
    s_burn_fire_m1: {
        path: "assets/particles/s_burn_fire_m1.json",
        texture: "particle.spirit_fire"
    },
    //硫在空气中燃烧
    s_burn_fire_m: {
        path: "assets/particles/s_burn_fire_m.json",
        texture: "particle.spirit_fire"
    },
    //活性碳、木炭粉在空气中燃烧
    c_burn_fire: {
        path: "assets/particles/c_burn_fire.json",
        texture: "particle.spirit_fire"
    },
    //测试用的效果试试看
    all_fire: {
        path: "assets/particles/fire.json",
        texture: "particle.spirit_fire"
    },
    //酒精灯火焰
    spirit_fire: {
        path: "assets/particles/spirit_fire.json",
        texture: "particle.spirit_fire"
    },
    //酒精灯火焰内焰
    spirit_fire_blue: {
        path: "assets/particles/spirit_fire_blue.json",
        texture: "particle.spirit_fire"
    },
    //火柴火焰
    match_fire: {
        path: "assets/particles/mutiao_ranshao.json",
        texture: "particle.spirit_fire"
    },
    //蜡烛火焰
    candle_fire: {
        path: "assets/particles/candle_fire.json",
        texture: "particle.spirit_fire"
    },
    //水蒸气
    water_vapor: {
        path: "assets/particles/water_vapor.json",
        texture: "particle.spirit_fire"
    },
    //种子着火
    seed_fire: {
        path: "assets/particles/seed_fire.json",
        texture: "particle.spirit_fire"
    },
    //种子着火2
    seed_fire2: {
        path: "assets/particles/seed_fire2.json",
        texture: "particle.spirit_fire"
    },
    //新外焰
    outSide_fire: {
        path: "assets/particles/outSide_fire.json",
        texture: "particle.spirit_fire"
    },
    //花生着火
    huasheng_fire: {
        path: "assets/particles/huasheng_fire.json",
        texture: "particle.spirit_fire"
    },
    // 冒泡
    bubble: {
        path: "assets/particles/bubble.json",
        texture: "particle.bubbles32.png"
    },
    // 固体反应冒泡
    solid_bubble: {
        path: "assets/particles/solidBubble.json",
        texture: "particle.bubbles32.png"
    },
    // test
    test: {
        path: "assets/particles/test.json",
        texture: "particle.spirit_fire"
    },
    // green fire
    BlastAlcoholBurner_Up: {
        path: "assets/particles/BlastAlcoholBurner_Up.json",
        texture: "particle.spirit_fire"
    },
    // green fire ring
    BlastAlcoholBurner_Low: {
        path: "assets/particles/BlastAlcoholBurner_Low.json",
        texture: "particle.spirit_fire"
    },
    // 肥皂水用导管通气吹出来的泡泡
    soap_bubble_blow: {
        path: "assets/particles/soap_bubble_blow.json",
        texture: "particle.bubbles32.png"
    },
    // 肥皂水震荡后泡沫
    soapBubble: {
        path: "assets/particles/soapBubble.json",
        texture: "particle.bubbles32.png"
    },
    // 镁条白光
    mg_white_fire: {
        path: "assets/particles/sprite_fire_white.json",
        texture: ["particle.mg.1", "particle.mg.2", "particle.mg.3", "particle.mg.4"]
    },

    mg_white_fire1: {
        path: "assets/particles/sprite_fire_white1.json",
        texture: ["particle.mg.2"]
    },
    mg_white_fire2: {
        path: "assets/particles/sprite_fire_white2.json",
        texture: ["particle.rain"]
    },
    mg_white_fire3: {
        path: "assets/particles/sprite_fire_white3.json",
        texture: ["particle.mg.1", "particle.mg.2", "particle.mg.4"]
    },
    // 温度计爆炸
    thermometer_broke: {
        path: "assets/particles/thermomter_broke.json",
        texture: "particle.spirit_fire"
    },
    // 火焰杂质喷射
    sprite_others: {
        path: "assets/particles/sprite_others.json",
        texture: "particle.spirit_fire"
    },
    // 小火焰
    little_match: {
        path: "assets/particles/little_match.json",
        texture: "particle.spirit_fire"
    },
    // 导管气泡
    catheter_bulle: {
        path: "assets/particles/catheter_bulle.json",
        texture: "particle.bubbles32.png"
    },
    // 电解水产生的气泡
    electrolytic_bubble: {
        path: "assets/particles/electrolytic_bubble.json",
        texture: "particle.bubbles32.png"
    },
    alumn_fire: {
        path: "assets/particles/alumn.json",
        texture: ["particle.alumn.1", "particle.alumn.2", "particle.alumn.3", "particle.alumn.4"]
    },
    alumn_fire1: {
        path: "assets/particles/alumn.1.json",
        texture: ["particle.alumn.1", "particle.alumn.2", "particle.alumn.3", "particle.alumn.4"]
    },
    alumn_fire2: {
        path: "assets/particles/alumn.2.json",
        texture: ["particle.mg.1", "particle.mg.2", "particle.mg.3", "particle.mg.4"]
    },

    // 钠在空气中燃烧
    burn_na_in_air: {
        path: "assets/particles/burn_na_in_air.json",
        texture: "particle.spirit_fire"
    },
    na_smoke: {
        path: "assets/particles/na_smoke.json",
        texture: "particle.spirit_fire"
    },
    //------氢气
    CatheterFire: {
        path: "assets/particles/CatheterFire.json",
        texture: "particle.spirit_fire"
    },
    mg_burn_smoke: {
        path: "assets/particles/mg_burn_smoke.json",
        texture: ["particle.mg_smoke.1", "particle.mg_smoke.2", "particle.mg_smoke.3", "particle.mg_smoke.4", "particle.mg_smoke.5", "particle.mg_smoke.6"]
    },
    pepanel_burn_smoke: {
        path: "assets/particles/pepanel_burn_smoke.json",
        texture: ["particle.mg_smoke.1", "particle.mg_smoke.2", "particle.mg_smoke.3", "particle.mg_smoke.4", "particle.mg_smoke.5", "particle.mg_smoke.6"]
    },
    gas_collecting_bottle_bubble: {
        path: "assets/particles/gas_collecting_bottle_bubble.json",
        texture: "particle.bubbles32.png"
    },
    water_spray: {
        path: "assets/particles/water_spray.json",
        texture: "particle.spirit_fire"
    },

    // 铁丝燃烧火焰
    iron_fire_01: {
        path: "assets/particles/iron_fire_01.json",
        texture: ["particle.alumn.4"]
    },


    // 白磷燃烧的火焰
    p_fire_01: {
        path: "assets/particles/p_fire_01.json",
        texture: "particle.spirit_fire"
    },

    // 粉尘爆炸实验中的粉尘
    dust: {
        path: "assets/particles/dust.json",
        texture: "particle.spirit_fire"
    },
    explode: {
        path: "assets/particles/explode.json",
        texture: ["particle.mg.1", "particle.mg.3", "particle.mg.4"]
    },
    // 木炭在氧气燃烧的火焰
    carbon_fire: {
        path: "assets/particles/carbonFire.json",
        texture: "particle.spirit_fire"
    },
    // 木条的火星
    wooden_spark: {
        path: "assets/particles/wooden_spark.json",
        texture: "particle.spirit_fire"
    },
    // 木条的火焰
    wooden_fire: {
        path: "assets/particles/mutiao_ranshao_big.json",
        texture: "particle.spirit_fire"
    },
    // 硫燃烧火焰
    s_burn_fire: {
        path: "assets/particles/s_burn_fire.json",
        texture: "particle.spirit_fire"
    },
    // 瓶中的蒸汽
    bottle_gas: {
        path: "assets/particles/bottle_gas.json",
        texture: ["particle.mg_smoke.1", "particle.mg_smoke.2", "particle.mg_smoke.3", "particle.mg_smoke.4", "particle.mg_smoke.5", "particle.mg_smoke.6"]
    },
    // 钠反应
    Na_react: {
        path: "assets/particles/Na_react.json",
        texture: ["particle.mg_smoke.1", "particle.mg_smoke.2", "particle.mg_smoke.3", "particle.mg_smoke.4", "particle.mg_smoke.5", "particle.mg_smoke.6"]
    },
    // 钠燃烧
    Na_fire: {
        path: "assets/particles/Na_fire.json",
        texture: "particle.spirit_fire"
    },
    // 钠在氯气中燃烧
    Na_fire_in_cl2: {
        path: "assets/particles/Na_fire_in_cl2.json",
        texture: "particle.spirit_fire"
    },
    //棉花燃烧
    cotton_fire_normal: {
        path: "assets/particles/cotton_fire_normal.json",
        texture: "particle.spirit_fire"
    },
    // 本生灯内焰
    BunsenBurner_innerFire: {
        path: "assets/particles/bunsenBurner_innerFire.json",
        texture: "particle.spirit_fire"
    },
    // 本生灯外焰
    BunsenBurner_outerFire: {
        path: "assets/particles/bunsenBurner_outerFire.json",
        texture: "particle.spirit_fire"
    },
    // 液体颜色扩散
    liquidSpread: {
        path: "assets/particles/liquid_spread.json",
        texture: "particle.spirit_fire"
    },
    //水雾
    liquidVapour: {
        path: "assets/particles/liquid_vapour.json",
        texture: "particle.spirit_fire"
    },
    //飞溅
    liquidSplash: {
        path: "assets/particles/liquid_splash.json",
        texture: "particle.spark"
    },
    // 扩散（热）
    spreadOut: {
        path: "assets/particles/spreadOut.json",
        texture: ["particle.mg_smoke.1", "particle.mg_smoke.4", "particle.spark", "particle.spirit_fire"]
    },
    // 扩散（冷）
    spreadOut_cold: {
        path: "assets/particles/spreadOut_cold.json",
        texture: "particle.spirit_fire"
    }
};

global.ParticleUtil = ParticleUtil;
module.exports = ParticleUtil;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./MatrixUtil.js":2,"./PolygonUtil":4}],4:[function(require,module,exports){
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

},{"./LineUtil.js":1,"./geom/Vector2.js":5}],5:[function(require,module,exports){
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

},{}]},{},[3]);
