(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 *
 * Created by onlyjyf on 9/8/16.
 */
const ICommand = require("../manager/ICommand.js");
const Point = require("../utils/NBPoint");
const MouseManager = require("../manager/MouseManager");
class DragCoverCommand extends ICommand {
    execute(data) {
        var self = data.container;
        // API
        self.addChild(self.head);
        // 给所有的盖子添加z轴值
        self.head.z_index = 25.05;
        self.isCovered = function () {
            return head.parent === self;
        };

        var head = self.head;

        if (self.medTypeName === "BaseSolidBrownMedicine") {
            head.alpha = .8;
            head.gotoAndStop(2);
        }
        // 碰撞区域
        var headArea = self.headArea || self;
        // 记录瓶盖的默认坐标
        var headPos = {
            x: head.x,
            y: head.y
        };
        // 盖子盖上的时候是否在外面
        var outter = data.outter;

        // 是否允许盖子倒置
        var invert = data.invert;

        var lastParent = head.parent;
        if (head.headIndex) {
            lastParent.addChildAtWithSamePos(head, head.headIndex);
        }
        var lastIndex = head.headIndex || lastParent.getChildIndex(head);

        NBDrag.addDrag(self.head);
        head.on(NBDrag.event.PREPARE_DRAG, headStartDrag);
        head.on(NBDrag.event.STOP_DRAG, headStopDrag);
        head.on(NBDrag.event.DRAG_MOVE, headDragMove);

        var root = self.root;

        var headCanCover = data.headCanCover instanceof Function ? data.headCanCover : () => true;

        // API:给container增加的API
        self.headMoveTo = headMoveTo;
        let viewStack = app.stage;
        let mouseManager = new MouseManager(this);

        // 拖动瓶塞
        function headStartDrag() {
            if (self.medTypeName === "BaseSolidBrownMedicine") {
                head.gotoAndStop(0);
            }
            TweenMax.killTweensOf(head);
            if (head._gsTweenID) {
                delete TweenLite._internals.tweenLookup[head._gsTweenID];
            }
            lastParent = head.parent;
            app.stage.eqLayer.addChildWithSamePos(this);
            if (self.headBg && !self.isDeleting && lastParent !== self) {
                self.headBg.alpha = 0.5;
            }
            if (lastParent && lastParent != app.stage.eqLayer && lastParent.isBaseContainer) {
                lastParent.removeCoverBody();
                root.resetPascalNode();
            }
            mouseManager.changeMouseStatus(MouseManager.status.CLOSE, true, head);

        }
        mouseListen();

        function mouseListen() {
            head.on(MouseEvent.MOUSE_OVER, () => {
                if (head.parent === app.stage.eqLayer) {
                    mouseManager.changeMouseStatus(MouseManager.status.CLOSE, true, head);
                } else {
                    mouseManager.changeMouseStatus(MouseManager.status.OPEN, true, head);
                }
            });
            head.on(MouseEvent.MOUSE_OUT, () => {
                if (head.parent === app.stage.eqLayer) {
                    mouseManager.changeMouseStatus(MouseManager.status.CLOSE, false, head);
                } else {
                    mouseManager.changeMouseStatus(MouseManager.status.OPEN, false, head);
                }
            });
        }




        /**
         * 查看容器是否添加了其他的东西
         * @returns {boolean}
         */
        //function isPutSomething () {
        //    var localBounds = self.localBounds;
        //    var gBounds = self.getBounds();
        //    var s = self.getViewStack().scale.x;
        //    if(gBounds.width / s > localBounds.width || gBounds.height / s > localBounds.height) {
        //        console.log('容器内添加了其他的东西盖不上盖子')
        //        return false;
        //    }else{
        //        return true;
        //    }
        //
        //}
        // 停止拖动瓶塞
        function headStopDrag() {
            if (self && self.headBg && !self.isDeleting) {
                self.headBg.alpha = 0;
            }
            // 将瓶盖还原
            if (head.hitTest(headArea) && headCanCover()) {
                var index = NaN;

                if (!outter) {
                    index = lastIndex;
                    self.addChildAtWithSamePos(head, index);
                } else {
                    self.addChildWithSamePos(head);
                    if (head.saveIndex) {
                        self.addChildAt(head, head.saveIndex);
                    }
                }
                if (self.addCoverBody instanceof Function) {
                    self.addCoverBody();
                }
                mouseManager.changeMouseStatus(MouseManager.status.OPEN, true, head);
                if (head.parent && head.parent.isBaseContainer) {
                }
                var dis = Point.distance(head, headPos);

                TweenMax.to(head, dis * nb.SECOND_PER_PIXEL, {
                    x: headPos.x,
                    y: headPos.y,
                    onComplete: () => {
                        if (self.medTypeName === "BaseSolidBrownMedicine") {
                            head.gotoAndStop(2);
                        }
                        emitEvent();
                    }
                });
                TweenMax.to(head, dis * nb.SECOND_PER_PIXEL / 2, {
                    onComplete: () => {
                        if (self.name === "AlcoholBurner") {
                            self.ifDestroyPar = true;
                        }
                    }
                });
                root.resetPascalNode();
            }

            headDragMove(true);

            // 如果父元素改变
            // if (head.parent != lastParent) {
            //     root.execute(NBCommand.undo.DRAG_COVER_UNDO, {
            //         lastParent: lastParent,
            //         lastIndex: lastIndex,
            //         currentParent: head.parent,
            //         currentIndex: head.parent.getChildIndex(head),
            //         pos: headPos,
            //         head: head
            //     });
            // }

        }

        function emitEvent() {
            self.emit("change", {
                isCoverd: !head._reverse
            });
        }

        // 瓶盖移动
        function headDragMove(force) {
            if (!invert) {
                return;
            }
            if (!head.hitTest(headArea)) {
                if (!head._reverse) {
                    head._reverse = !head._reverse;
                    TweenMax.to(head, nb.SECOND_PER_RADIUS * (Math.PI - head.rotation), {
                        rotation: Math.PI,
                        onComplete: emitEvent
                    });
                }
                if (force === true) {
                    TweenMax.to(head, nb.SECOND_PER_RADIUS * (Math.PI - head.rotation), {
                        rotation: Math.PI,
                        onComplete: emitEvent
                    });
                }
            } else {
                if (head._reverse) {
                    head._reverse = !head._reverse;
                    TweenMax.to(head, nb.SECOND_PER_RADIUS * head.rotation, {
                        rotation: 0,
                        onComplete: emitEvent
                    });
                }
                if (force === true) {
                    TweenMax.to(head, nb.SECOND_PER_RADIUS * head.rotation, {
                        rotation: 0,
                        onComplete: emitEvent
                    });
                }
            }
        }

        /**
         * 瓶盖移动到
         * @param x
         * @param y
         */
        function headMoveTo(x, y) {
            // delete element
            app.stage.eqLayer.addChildWithSamePos(head);
            head.x = x;
            head.y = y;
            headDragMove(true);
        }

    }
}

module.exports = DragCoverCommand;

},{"../manager/ICommand.js":3,"../manager/MouseManager":4,"../utils/NBPoint":5}],2:[function(require,module,exports){
var NBCommand = {}

NBCommand.DRAG_COVER = 'b2effa21f1863f1cd457ad355b882018';
// NBCommand.interactive.MOUSE_CURSOR_ENABLED = '4bf40f70152cf061641bddd4dba69303';

NBCommand.registerCommand = function(manager) {
	manager.registerCommand(NBCommand.DRAG_COVER, require('./DragCoverCommand.js'))
	// manager.registerCommand(NBCommand.interactive.MOUSE_CURSOR_ENABLED, require('./MouseCursorEnabledCommand.js'))

}
window.NBCommand = NBCommand;
module.exports = NBCommand;
},{"./DragCoverCommand.js":1}],3:[function(require,module,exports){
/**
 *
 * Created by onlyjyf on 8/10/16.
 */
class ICommand {
    execute() {
        throw "必须重写该方法";
    }
}

module.exports = ICommand;

},{}],4:[function(require,module,exports){
/**
 * Created by onlyjyf on 12/12/16.
 */
class MouseManager {
    constructor(root) {
        MouseManager.lastObj = null;
        this.root = root;
    }

    /**
     * 改变状态类型
     * @param statusCode 状态类型
     * @param bool  {Boolean}
     * @param obj   {Object}
     * @param isRemove {Boolean}
     */
    changeMouseStatus(statusCode, bool, obj, isRemove) {
        if (isRemove) {
            // executeCmd(NBCommand.interactive.MOUSE_CURSOR_ENABLED, {
            //     code: -1,
            //     obj: obj
            // });
            MouseManager.lastObj = null;
            return;
        }
        let viewStack = app.stage;
        if (obj) {
            obj.mouseIn = bool;
            if (bool) {
                obj.mouseStateCode = statusCode;
            } else {
                obj.mouseStateCode = MouseManager.status.DRAG;
            }
        } else {
            return;
        }

        function checkChild(obj) {
            for (let i = 0; i < obj.children.length; i++) {
                let child = obj.children[i];
                if (child.mouseIn === true && child.alpha > 0) {
                    return checkChild(child);
                }
            }
            return obj;
        }

        function checkParent(obj) {
            if (obj.parent === viewStack) {
                return obj;
            }
            if (obj.parent && obj.parent.mouseIn === true && obj.parent.alpha > 0 && obj.parent.visible === true) {
                return obj.parent;
            } else if (obj.rubber && obj.rubber.mouseIn === true) {
                return obj.rubber;
            } else {
                if (!obj.parent) {
                    return obj;
                } else {
                    return checkParent(obj.parent);
                }
            }
        }

        let shouldObj = bool ? checkChild(obj) : checkParent(obj);
        let shouldCode = -1;
        if (shouldObj.mouseIn) {
            shouldCode = shouldObj.mouseStateCode;
        }
        if (bool) {
            if (MouseManager.lastObj === null) {
                MouseManager.lastObj = shouldObj;
            } else if (checkAisBsParent(shouldObj, MouseManager.lastObj)) {
                shouldObj = MouseManager.lastObj;
                shouldCode = MouseManager.lastObj.mouseStateCode;
            } else {
                MouseManager.lastObj = shouldObj;
            }
            if (shouldObj === app.stage.eqLayer) {
                MouseManager.lastObj = null;
            }
        } else if (MouseManager.lastObj === shouldObj) {
            MouseManager.lastObj = null;
        } else {
            MouseManager.lastObj = shouldObj;
        }

        function checkAisBsParent(a, b) {
            if (b.parent === viewStack || !b.parent) {
                return false;
            }
            if (b.parent === a) {
                return true;
            } else {
                return checkAisBsParent(a, b.parent);
            }

        }
        // executeCmd(NBCommand.interactive.MOUSE_CURSOR_ENABLED, {
        //     code: parseInt(shouldCode),
        //     obj: shouldObj
        // });
    }

    static addMouseEvent(manager, obj, code) {
        // console.log("不出框了，甭调了");
        obj.addEventListener(MouseEvent.MOUSE_OVER, () => {
            manager.changeMouseStatus(code, true, obj);
        });
        obj.addEventListener(MouseEvent.MOUSE_OUT, () => {
            manager.changeMouseStatus(code, false, obj);
        });
    }
}

MouseManager.status = {
    STRETCH: 0,
    ROTATE: 1,
    DRAG: 2,
    OPEN: 3,
    CLOSE: 4,
    PINCH: 5,
    PLUCK: 6,
    PAN: 7,
    SHAKE: 8,
    PEN: 9
};
module.exports = MouseManager;

},{}],5:[function(require,module,exports){
(function (global){(function (){
/**
 *
 * Created by onlyjyf on 7/27/15.
 */
var NBPoint = {};
NBPoint.distance = function(p1, p2) {
    var x = p1.x - p2.x;
    var y = p1.y - p2.y;
    return Math.sqrt(x * x + y * y);
};

NBPoint.distanceSquare = function(p1, p2) {
    var x = p1.x - p2.x;
    var y = p1.y - p2.y;
    return x * x + y * y;
};

NBPoint.interpolate = function (pt1, pt2, f)
{
    f = 1 - f;
    var result = {};
    result.x = pt1.x + (pt2.x - pt1.x) * f;
    result.y = pt1.y + (pt2.y - pt1.y) * f;
    return result;
};
global.NBPoint = NBPoint;
module.exports = NBPoint;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[2]);
