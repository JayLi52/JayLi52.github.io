/**
 * 鼠标光标状态
 * Created by onlyjyf on 12/12/16.
 */
const ICommand = require("../../manager/ICommand");
const BaseEquipment = require("../../core/BaseEquipment");
const border = new PIXI.Graphics();
const nb = require("../../core/const");
border.allowGetBounds=false;
// let lastObj = null;
// let lastShowObj = null;
// eslint-disable-next-line no-unused-vars
function draw(obj, drawObj) {
    let bounds = obj.getLocalBounds().clone();
    // bounds.x+=obj.x;
    // bounds.y+=obj.y;
    obj.updateTransform();
    let sx = obj.scale.x;
    let sy = obj.scale.y;
    if(obj === drawObj) {
        sx = 1;
        sy = 1;
    }
    let p = drawObj.toLocal(bounds, obj);
    // 重新计算数值
    let width = Math.abs(bounds.width * sx);
    let height = Math.abs(bounds.height * sy);
    border.clear();
    if (width > 0 && height > 0) {
        border.lineStyle(2 / obj.root.viewStack.scale.x, 0xFFFFFF);
        drawObj.mouseTypeBorder = border;
        drawObj.addChild(border);
        // border.drawRoundedRect(p.x, p.y, width, height, Math.max(0,Math.min(15,width/2-1,height/2-1)));
        border.drawRect(p.x, p.y, width, height);
    }

}

// eslint-disable-next-line no-unused-vars
function getEquipment(obj) {
    if (!obj||!obj.parent) {
        return null;
    }
    if (obj instanceof BaseEquipment || obj.parent === obj.root.viewStack.eqLayer||(obj.renderable&&obj.alpha!==0)) {
        return obj;
    } else {
        return getEquipment(obj.parent);
    }
}
let mouseDown = false;
window.addEventListener(MouseEvent.TOUCH_BEGIN, () => {
    mouseDown = true;
});
window.addEventListener(MouseEvent.TOUCH_END, () => {
    mouseDown = false;
    MouseCursorEnabledCommand.changeStyle(MouseCursorEnabledCommand.current);
    MouseCursorEnabledCommand.current = null;
});

class MouseCursorEnabledCommand extends ICommand {
    constructor() {
        super();
        MouseCursorEnabledCommand.current = {code: -1, obj: null};
        MouseCursorEnabledCommand.obj = null;

    }

    execute(data) {
        MouseCursorEnabledCommand.current = data;
        if (!mouseDown) {
            MouseCursorEnabledCommand.changeStyle(data);
        }
        if(data.code===-1){
            if(data.obj){
                if(border.parent===data.obj){
                    data.obj.removeChild(border);
                }
                data.obj=null;
            }
        }
    }

    static changeStyle(data) {
        if (!data) {
            return;
        }
        // let obj = data.obj;
        // let showObj = getEquipment(obj);
        // if (showObj&&showObj!==obj.root.viewStack.eqLayer&&data.code!==-1) {
        //     if(!showObj.isRubberCatheter&&data.code!==2){
        //         draw(obj, showObj);
        //     }else{
        //         border.clear();
        //     }
        // } else {
        //     border.clear();

        // }
        let canvas = document.body;
        const URI = nb.config.URI_PREFIX;
        switch (data.code) {
        case 0:
            canvas.style.cursor = `url(${URI}images/cursor/stretch.cur) 12 12, auto`;
            break;
        case 1:
            canvas.style.cursor = `url(${URI}images/cursor/rotate.cur) 13 13, auto`;
            break;
        case 2:
            canvas.style.cursor = `url(${URI}images/cursor/drag.cur) 12 12, auto`;
            break;
        case 3:
            canvas.style.cursor = `url(${URI}images/cursor/open.cur) 15 12, auto`;
            break;
        case 4:
            canvas.style.cursor = `url(${URI}images/cursor/close.cur) 15 12, auto`;
            break;
        case 5:
            canvas.style.cursor = `url(${URI}images/cursor/pinch.cur) 12 12, auto`;
            break;
        case 6:
            canvas.style.cursor = `url(${URI}images/cursor/pluck.cur) 15 12, auto`;
            break;
        case 7:
            canvas.style.cursor = `url(${URI}images/cursor/pan.cur) 12 12, auto`;
            break;
        case 8:
            canvas.style.cursor = `url(${URI}images/cursor/shake.cur) 12 12, auto`;
            break;
        case 9:
            canvas.style.cursor = `url(${URI}images/cursor/pen.cur) 0 100, auto`;
            break;
        default:
            canvas.style.cursor = "default";
            break;
        }
    }

}
module.exports = MouseCursorEnabledCommand;
