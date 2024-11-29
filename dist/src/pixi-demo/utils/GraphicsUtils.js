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
