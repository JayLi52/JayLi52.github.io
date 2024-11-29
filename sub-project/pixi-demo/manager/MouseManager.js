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
