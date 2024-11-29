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
