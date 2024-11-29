/**
 *
 * Created by onlyjyf on 7/28/15.
 */
var NBDrag = {};
var NBMath = require("./NBMath");
NBDrag.event = {
    PREPARE_DRAG: "prepareDrag",
    STOP_DRAG: "stopDrag",
    START_DRAG: "startDrag",
    DRAG_MOVE: "dragMove"
};

var DragToolManager = require("../nape/base/manager/DragToolManager.js");
let viewStack = null;
NBDrag.idMap = {};
//nape的拖动map
NBDrag.napeDragMap = {};
/**
 * 添加拖动
 * 如果拖动的对象有txt属性，txt属性将在拖动的时候消失
 *
 * @param rect 拖动的矩形范围 {
 *      x,
 *      y,
 *      widht,
 *      height,
 *      enabled //是否禁用rect,不设置或设置为true时为开启状态
 * }
 * 1.如果有多个对象都监听了NBDrag的事件，如果想要停掉事件流可以调用
 *      evt.data.isPropagationStopped = true;
 * @param conf {
 *      bringToFront:Boolean 点击的时候是否前置 默认为true
 *      isLock:false  isLock:临时锁定
 * }
 * @param  dragFuncObj{beginFore:Function, moveFore:Fnction, endFore:Function,  // 其中之一返回false则对应的步骤不执行
 *          beginEnd:Function, moveEnd:Fnction, endEnd:Function}  // 每一步执行完毕时调用
 * @param filtration { //过滤-- 在拖拽的过程中过滤掉一些非常微小的移动;
 *      x:number;   //需要过滤掉的X轴的增量
 *      y:number;    //需要过滤掉的Y轴的增量;
 *       enabled //是否禁用过滤,不设置或设置为true时为开启状态
 * }
 */
NBDrag.addDrag = function (obj, rect, conf, dragFuncObj, _this, filtration) {
    if (obj.dragAble === false) {
        // 不能拖拽的就不添加了
        return;
    }
    NBDrag.removeDrag(obj);
    conf = conf || {
        bringToFront: true
    };
    if (obj.root.viewStack && !viewStack) {
        viewStack = obj.root.viewStack;
    }
    //obj对象的拖动区域
    var dragArea = obj.dragArea || obj;
    obj.bringToFront = conf.bringToFront;
    obj.dragFuncObj = dragFuncObj;
    obj.__$conf = conf;
    if (obj.dragFuncObj) {
        obj.dragFuncObj.this = _this ? _this : obj;
    }
    if (obj.dragFuncObj) {
        obj.dragFuncObj.dis = obj;
    }
    obj.identifier = null;
    var touchBegin = function (evt) {
        //nape中的拖动对象
        var napeDrag = null;
        if (obj.__$conf && obj.__$conf.isLock) return;
        let originalEvent = evt.data.originalEvent;
        if (originalEvent && obj.dragIdentifier && originalEvent.touches && originalEvent.touches.length === 1) {
            // evt.type="pointerup";
            // TouchEvent.simulateTouchUp(obj,evt);
            // evt.type = "pointerdown";
            delete NBDrag.idMap[obj.dragIdentifier];
            delete obj.dragIdentifier;
        }
        if (obj.dragIdentifier != undefined) {
            return;
        }
        obj.isMoving = false;
        evt.stopPropagation();
        ////////////   myThis
        //全局坐标g
        var g;
        //上一个本地坐标
        var lastLocalP;
        if (evt.data.originalEvent.changedTouches) {
            // 移动端
            var ttt = evt.data.originalEvent.changedTouches;
            $.each(ttt, function (i, item) {
                if (obj.dragIdentifier == undefined) {
                    obj.dragIdentifier = item.identifier;
                    NBDrag.idMap[item.identifier] = obj;
                    g = {
                        x: item.globalX || evt.data.global.x,
                        y: item.globalY || evt.data.global.y
                    };
                    return false;
                }
            });
            //
        } else {
            // PC端
            g = {
                x: evt.data.global.x,
                y: evt.data.global.y
            };
        }
        if (!g) return;
        // 记录按下的点
        obj._lastTouchPoint_ = {
            x: obj.x,
            y: obj.y
        };

        obj._lastGlobalTouchPoint = obj.parent.toGlobal(obj);

        obj.emit(NBDrag.event.PREPARE_DRAG, {
            target: obj,
            data: evt.data
        });

        lastLocalP = obj.parent.worldTransform.applyInverse(g);
        evt.globalP = new PIXI.Point(g.x, g.y);
        ////////////
        obj.isTouchDown = true;
        if (evt.data.isPropagationStopped) {
            return;
        }

        if (obj.dragFuncObj && obj.dragFuncObj.beginFore) {
            if (!obj.dragFuncObj.beginFore.call(obj.dragFuncObj.this, evt)) {
                return;
            }
        }
        var localMouseDownPos = obj.toLocal(g, obj.stage);
        var offset = {
            x: localMouseDownPos.x,
            y: localMouseDownPos.y
        };
        var angle = obj.rotation;
        // 进行一个简单的坐标转换和缩放变换
        offset = NBMath.rotaPoint(offset, {
            x: 0,
            y: 0
        }, angle);
        offset.x *= obj.scale.x;
        offset.y *= obj.scale.y;
        if (conf.bringToFront) {
            if (obj.addedRubber && obj.addedRubber.rubber && obj.addedRubber.rubber.parent === obj.parent) {
                obj.parent.addChild(obj.addedRubber.rubber);
            }
            if (obj.parent.isRubberPlug && obj.parent.bg) {
                obj.parent.addChildAt(obj, Math.max(obj.parent.children.indexOf(obj.parent.bg) - 1, 0));
            } else {
                obj.parent.addChild(obj);
            }
        }

        // 如果是刚体，添加pivotJoint
        if (obj.napeBody) {
            if (NBDrag.napeDragMap[obj.identifier] === undefined) {
                NBDrag.napeDragMap[obj.identifier] = new DragToolManager();
            }
            napeDrag = NBDrag.napeDragMap[obj.identifier];
            napeDrag.func_touchBegin(obj.napeBody, viewStack.toLocal(g));
            chemicalMain.nape.renderCount = nb.ACTIVE_COUNT;
            obj.activeCount = nb.ACTIVE_COUNT;
            if (obj.container) {
                obj.container.activeCount = nb.ACTIVE_COUNT;
            }
        } else {
            napeDrag = null;
        }
        var move = function (evt) {
            // if (viewStack.activeMutipleTouch) {
            //     obj.__touchEnd__(evt);
            //     return;
            // }
            if (obj.__$conf && obj.__$conf.isLock) return;
            obj.isMoving = true;
            // viewStack.hasEqMove = 2;

            ////////////   myThis
            var _g;
            var curTouch_ = null;
            if (evt.data.originalEvent.changedTouches) {
                // 移动端
                var ttt = evt.data.originalEvent.changedTouches;
                $.each(ttt, function (i, item) {
                    if (item.identifier == obj.dragIdentifier) {
                        curTouch_ = item;
                        return false;
                    }
                });
                if (!curTouch_) return; // 未找到
                _g = {
                    x: curTouch_.globalX,
                    y: curTouch_.globalY
                };
            } else {
                // PC端
                _g = evt.data.global;
            }
            if (!_g || _g.x == undefined) {
                return;
            }
            evt.globalP = new PIXI.Point(_g.x, _g.y);
            ////////////
            if (!obj.isTouchDown) {
                return;
            }
            if (evt.data.isPropagationStopped) {
                return;
            }
            if (obj.dragFuncObj && obj.dragFuncObj.moveFore) {
                if (!obj.dragFuncObj.moveFore.call(obj.dragFuncObj.this, evt)) {
                    return;
                }
            }
            if (obj.cannotSystemDrag === true) {
                return;
            }
            //把全局坐标转为本地坐标
            var localP = obj.parent.worldTransform.applyInverse(_g);
            //限定的矩形, 该矩形为obj的移动范围
            var limitRect = {};

            //先加一下 关于twoContainerCollsion保存的问题 保证 rect === obj.dragRect wjf 2017/06/13
            if (obj.dragRect && rect !== obj.dragRect) {
                rect = obj.dragRect;
            }

            if (rect && (rect.enabled === true || rect.enabled === undefined)) {
                limitRect = {
                    x: rect.x,
                    y: rect.y,
                    width: rect.width,
                    height: rect.height
                };
            } else {
                /*
                var pTop = obj.parent.worldTransform.applyInverse({x:0, y:0});
                var pBottom = obj.parent.worldTransform.applyInverse({x:ChemicalMain.W, y:ChemicalMain.H});
                var minX = Math.min(pTop.x, pBottom.x);
                var minY = Math.min(pTop.y, pBottom.y);
                var maxX = Math.max(pTop.x, pBottom.x);
                var maxY = Math.max(pTop.y, pBottom.y);
                 pTop = {x:minX, y:minY};
                 pBottom = {x:maxX, y:maxY};
                 //将全局矩形的坐标转为本地坐标
                 limitRect = {x:pTop.x, y:pTop.y, width:pBottom.x - pTop.x, height:pBottom.y - pTop.y};
                 */
                //limitRect = {x:0, y:0, width:w, height:h, global:true};
                limitRect = {
                    x: -Infinity,
                    y: -Infinity,
                    w: Infinity,
                    h: Infinity,
                    global: true
                };
            }
            if (rect && rect.rotate) {
                limitRect.rotate = rect.rotate;
            }

            let offsetX = localP.x - lastLocalP.x;
            let offsetY = localP.y - lastLocalP.y;
            //过滤 -- 2016/10/19 -- 李健;
            if (filtration && (filtration.enabled == undefined || filtration.enabled == true)) {
                if (Math.abs(offsetX) < filtration.x) {
                    offsetX = 0;
                }
                if (Math.abs(offsetY) < filtration.y) {
                    offsetY = 0;
                }
            }

            const lastLocalPos = obj.parent.toLocal(obj._lastGlobalTouchPoint);

            let valueX = lastLocalPos.x + offsetX;
            let valueY = lastLocalPos.y + offsetY;

            //边界检测
            if (limitRect.global) {
                var globalPoint = {
                    x: valueX,
                    y: valueY
                };
                obj.parent.worldTransform.apply(globalPoint, globalPoint);
                valueX = globalPoint.x;
                valueY = globalPoint.y;
                if (valueX < limitRect.x) {
                    valueX = limitRect.x;
                } else if (valueX > limitRect.x + limitRect.width) {
                    valueX = limitRect.x + limitRect.width;
                }
                if (valueY < limitRect.y) {
                    valueY = limitRect.y;
                } else if (valueY > limitRect.y + limitRect.height) {
                    valueY = limitRect.y + limitRect.height;
                }
                globalPoint.x = valueX;
                globalPoint.y = valueY;
                var localPoint = obj.parent.worldTransform.applyInverse(globalPoint);
                valueX = localPoint.x;
                valueY = localPoint.y;
            } else if (limitRect.rotate && (limitRect.width === 0 || limitRect.height === 0)) {
                // 表示拖拽范围是一条斜线
                let length = limitRect.width || limitRect.height;
                let rotate = limitRect.rotate;
                let lengthX = Math.cos(rotate) * length;
                let lengthY = Math.sin(rotate) * length;
                let maxWidth = limitRect.x + lengthX;
                let maxHeight = limitRect.y + lengthY;
                let minWidth = limitRect.x < maxWidth ? limitRect.x : maxWidth;
                let minHeight = limitRect.y < maxHeight ? limitRect.y : maxHeight;
                maxWidth = lengthX > 0 ? maxWidth : limitRect.x;
                maxHeight = lengthY > 0 ? maxHeight : limitRect.y;
                if (valueX < minWidth) {
                    valueX = minWidth;
                } else if (valueX > maxWidth) {
                    valueX = maxWidth;
                }

                if (valueY < minHeight) {
                    valueY = minHeight;
                } else if (valueY > maxHeight) {
                    valueY = maxHeight;
                }
                // 判定以上下为准还是以左右为准
                if (Math.abs(lengthX) >= Math.abs(lengthY)) {
                    if (valueX >= minWidth && valueX <= maxWidth) {
                        let dis = lengthX > 0 ? valueX - minWidth : maxWidth - valueX;
                        valueY = dis / Math.abs(lengthX) * lengthY + limitRect.y;
                    }
                } else {
                    if (valueY >= minHeight && valueY <= maxHeight) {
                        let dis = lengthY > 0 ? valueY - minHeight : maxHeight - valueY;
                        valueX = dis / Math.abs(lengthY) * lengthX + limitRect.x;
                    }
                }
            } else {
                let limitDltX = 0;
                if (valueX < limitRect.x - 0.1) {
                    limitDltX = valueX - limitRect.x;
                    valueX = limitRect.x;
                    obj.emit("outLeftBounds", limitDltX);
                } else if (valueX > limitRect.x + limitRect.width + 0.1) {
                    limitDltX = valueX - limitRect.x - limitRect.width;
                    valueX = limitRect.x + limitRect.width;
                    obj.emit("outRightBounds", limitDltX);
                }
                if (valueY < limitRect.y - 0.1) {
                    valueY = limitRect.y;
                    obj.emit("outTopBounds");
                } else if (valueY > limitRect.y + limitRect.height + 0.1) {
                    valueY = limitRect.y + limitRect.height;
                    obj.emit("outBottomBounds");
                }
            }

            // lastLocalP.x = localP.x;
            // lastLocalP.y = localP.y;

            const disXY = Math.abs(obj.x - valueX) + Math.abs(obj.y - valueY);

            //检测是否包含napeBody对象
            if (obj.napeBody) {
                if (napeDrag) {
                    let localPos = viewStack.toLocal(_g);
                    napeDrag.func_touchMove(localPos);
                }
                chemicalMain.nape.renderCount = nb.ACTIVE_COUNT;
            } else {
                if (obj.moveThisToXY) {
                    let ox = valueX - obj.x;
                    let oy = valueY - obj.y;
                    obj.moveThisToXY(ox, oy);
                }

                if (!obj.limitRotateType) {
                    obj.x = valueX;
                    obj.y = valueY;
                }
            }
            obj.activeCount = nb.ACTIVE_COUNT;
            if (disXY > 0) {
                obj.emit(NBDrag.event.DRAG_MOVE, {
                    target: obj,
                    data: evt.data
                });
            }
            if (!obj.isCtrButton) {
                // let selectionLayer = viewStack.selectionLayer;
                // if (selectionLayer.selectedObj && selectionLayer.selectedObj.length > 0 && !selectionLayer.selectedObj.includes(obj)) {
                //     selectionLayer.clearSelectionObj();
                // }

                if (nb.currentConfigEq && nb.currentConfigEq !== obj) {
                    // obj.root && obj.root.execute && obj.root.execute(NBCommand.communicate.angular.CHANGE_PANEL_STATUS, {
                    //     children: []
                    // });
                    if (obj.checkForefathers && obj.checkForefathers(nb.currentConfigEq) && nb.currentConfigEq.updateAllButtonPos) {
                        nb.currentConfigEq.updateAllButtonPos();
                    }
                }
            }

            // obj.root && obj.root.emit(NBEvent.communicate.angular.EQ_DRAG_MOVE, {
            //     target: obj,
            //     data: evt.data
            // });
        };
        var touchOutside = function (evt) {
            if (evt) {
                evt.isFromEmit = null;
            }
            up.apply(obj, evt);
        };
        var touchEnd = function (evt) {
            if (evt) {
                evt.isFromEmit = null;
            }
            up.apply(obj, evt);
        };
        var up = function () {
            ////////////   myThis
            var _g;
            if (evt.data.originalEvent.changedTouches) {
                // 移动端
                var ttt = evt.data.originalEvent.changedTouches;
                $.each(ttt, function (i, item) {
                    if (item.identifier == obj.dragIdentifier) {
                        _g = {
                            x: item.globalX,
                            y: item.globalY
                        };
                        delete NBDrag.idMap[obj.dragIdentifier];
                        delete obj.dragIdentifier;
                        return false;
                    }
                });
                if (obj.dragIdentifier != undefined) {
                    if (evt.data.originalEvent.touches.length === 0) {
                        delete NBDrag.idMap[obj.dragIdentifier];
                        delete obj.dragIdentifier;
                    } else {
                        // 未除去
                        return;
                    }
                }
            } else {
                // PC端
                _g = evt.data.global;
            }
            // 修正目标是橡胶管时的obj对象
            if (obj.ropeRubber) {
                obj = obj.ropeRubber
            }
            delete obj.__touchEnd__;
            obj.isMoving = false;
            dragArea.removeListener(TouchEvent.TOUCH_MOVE, move);
            obj.removeListener(TouchEvent.TOUCH_END, touchEnd);
            obj.removeListener(TouchEvent.TOUCH_END_OUTSIDE, touchOutside);
            if (obj.napeBody && napeDrag) {
                napeDrag.func_touchEnd();
            }
            obj.isTouchDown = false;
            if (obj.dragFuncObj && obj.dragFuncObj.endFore) {
                if (!obj.dragFuncObj.endFore.call(obj.dragFuncObj.this, evt)) {
                    return;
                }
            }
            if (evt.data.isPropagationStopped) {
                return;
            }
            if (!_g || _g.x == undefined) {
                return;
            }
            if (!obj.isCtrButton && obj.isEquipment) {
                const selectionLayer = viewStack.selectionLayer;
                if (selectionLayer.selectedObj && selectionLayer.selectedObj.length === 1 && obj === selectionLayer.selectedObj[0]) {
                    obj.root && obj.root.emit(NBEvent.communicate.angular.UPDATE_EQ_ATTRIBUTE, obj);
                }
            }
            evt.globalP = new PIXI.Point(_g.x, _g.y);
            obj.emit(NBDrag.event.STOP_DRAG, {
                target: obj,
                evt: evt,
                data: evt.data
            });
            obj.isDragging = false;
            if (obj.dragFuncObj && obj.dragFuncObj.endEnd) {
                obj.dragFuncObj.endEnd.call(obj.dragFuncObj.this, evt);
            }
        };
        dragArea.addEventListener(TouchEvent.TOUCH_MOVE, move);
        obj.addEventListener(TouchEvent.TOUCH_END_OUTSIDE, touchOutside);
        obj.addEventListener(TouchEvent.TOUCH_END, touchEnd);
        obj.emit(NBDrag.event.START_DRAG, {
            target: obj,
            data: evt.data
        });
        obj.isDragging = true;
        obj.__touchEnd__ = touchEnd;

        //
        if (obj.dragFuncObj && obj.dragFuncObj.beginEnd) {
            obj.dragFuncObj.beginEnd.call(obj.dragFuncObj.this, evt);
        }
        if (evt) {
            if (!evt.isFromEmit) {
                if (obj.isRope && obj.parent && (obj.parent.isWire || obj.parent.isRubberCatheter)) {
                    evt.target = obj.parent;
                    evt.isFromEmit = true;
                    obj.parent.emit(TouchEvent.TOUCH_BEGIN, evt);
                    evt.target = obj;
                }
                if (obj.ropeRubber) {
                    obj.target = obj.ropeRubber;
                    evt.isFromEmit = true;
                    obj.ropeRubber.emit(TouchEvent.TOUCH_BEGIN, evt);
                    evt.target = obj;
                }
            }
        }

    };
    dragArea.addEventListener(TouchEvent.TOUCH_BEGIN, touchBegin);
    obj.__touchBegin__ = touchBegin;
};



/**
 * 移除拖动
 * @param obj
 */
NBDrag.removeDrag = function (obj) {
    obj.removeListener(TouchEvent.TOUCH_BEGIN, obj.__touchBegin__);
    if (obj.dragArea) {
        obj.dragArea.removeEventListener(TouchEvent.TOUCH_BEGIN, obj.__touchBegin__);
    }
    if (obj.__touchEnd__) {
        obj.__touchEnd__();
    }
    delete obj.__touchBegin__;
};

NBDrag.hasDrag = function (obj) {
    return obj.__touchBegin__ !== undefined;
};

window.NBDrag = NBDrag;
module.exports = NBDrag;
