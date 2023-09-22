"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rope = void 0;
const PIXI = __importStar(require("pixi.js"));
const Vector_1 = __importDefault(require("./Vector"));
const gravityVector = new Vector_1.default(0, 9.8);
class Mass extends PIXI.Container {
    constructor(x, y, mass) {
        super();
        this.forceVertor = new Vector_1.default(0, 0);
        this.speedVector = new Vector_1.default(0, 0);
        // 初始化 Mass 类的属性
        this.x = x;
        this.y = y;
        this.massNum = mass;
        this.pinned = false;
        // 创建用于绘制质点的 PIXI.Graphics 对象
        this.graphics = new PIXI.Graphics();
        this.addChild(this.graphics);
        // 绘制灰色圆形
        const radius = 2; // 圆的半径
        const color = 0x808080; // 灰色的颜色值
        this.graphics.beginFill(color);
        this.graphics.drawCircle(0, 0, radius);
        this.graphics.endFill();
    }
    update(dt) {
        this.forceVertor = this.forceVertor.add(gravityVector);
        if (this.pinned)
            this.forceVertor = new Vector_1.default(0, 0);
        const accelerationX = this.forceVertor.x / this.massNum;
        const accelerationY = this.forceVertor.y / this.massNum;
        this.speedVector.x += accelerationX * dt;
        this.speedVector.y += accelerationY * dt;
    }
}
class Spring {
    constructor(mass1, mass2, springConstant, restLength, angleDeg, springGra) {
        this.dampingNum = 3;
        // super();
        // 初始化 Spring 类的属性
        this.mass1 = mass1;
        this.mass2 = mass2;
        this.springConstant = springConstant;
        this.restLength = restLength;
        this.angleDeg = angleDeg;
        this.graphics = springGra;
        // 创建用于绘制弹簧的 PIXI.Graphics 对象
        // this.graphics = new PIXI.Graphics();
        // this.addChild(this.graphics);
        // 绘制弹簧
        const color = 0xdaa520; // 金属色的颜色值 (金色)
        const lineWidth = 1; // 弹簧的线宽
        this.graphics.lineStyle(lineWidth, color);
        // 计算弹簧的曲线路径
        const numSegments = 20; // 曲线的线段数
        const dx = (this.mass2.x - this.mass1.x) / numSegments;
        const dy = (this.mass2.y - this.mass1.y) / numSegments;
        this.graphics.moveTo(this.mass1.x, this.mass1.y);
        // for (let i = 1; i <= numSegments; i++) {
        //   const x = this.mass1.x + i * dx;
        //   const y = this.mass1.y + i * dy;
        //   this.graphics.lineTo(x, y);
        // }
        const { x: x1, y: y1 } = this.mass1;
        const { x: x2, y: y2 } = this.mass2;
        // this.drawLightningBolt(this.graphics, x1, y1, x2, y2, 2, this.angleDeg);
        this.graphics.lineTo(this.mass2.x, this.mass2.y);
    }
    drawLightningBolt(graphics, x1, y1, x2, y2, thickness, angle) {
        // 设置线条样式
        graphics.lineStyle(thickness, 0xffffff, 1);
        const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        // 计算距离的一半
        const halfDistance = distance / 2;
        // 移动到起始点
        graphics.moveTo(x1, y1);
        const { unitX, unitY } = this.calculateUnitVector(x1, y1, x2, y2);
        // 计算目标向量
        const targetX = halfDistance * unitX;
        const targetY = halfDistance * unitY;
        // 计算旋转后的新向量的x和y分量
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        const rotatedTargetX = targetX * cosAngle - targetY * sinAngle;
        const rotatedTargetY = targetX * sinAngle + targetY * cosAngle;
        // 使用新的x和y分量创建一个新的向量
        const rotatedTarget = {
            x: rotatedTargetX / Math.cos(angle),
            y: rotatedTargetY / Math.cos(angle),
        };
        graphics.lineTo(x1 + rotatedTarget.x, y1 + rotatedTargetY);
        graphics.lineTo(x2 - rotatedTarget.x, y2 - rotatedTargetY);
        // 添加第一个分叉
        // this.drawFork(graphics, x1, y1, targetX, targetY, thickness, -30);
        // // 添加第二个分叉
        // this.drawFork(graphics, x1, y1, targetX, targetY, thickness, 30);
        // 连接到终点
        graphics.lineTo(x2, y2);
    }
    calculateUnitVector(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        const unitX = dx / length;
        const unitY = dy / length;
        return { unitX, unitY };
    }
    // 添加计算弹簧力的方法
    computeForce() {
        // const delta = this.mass2.position.sub(this.mass1.position);
        // const displacement = delta.length() - this.restLength;
        // const direction = delta.normalize();
        // const forceMagnitude = this.springConstant * displacement;
        // return Vector2D.multiply(direction, forceMagnitude);
    }
    updatePos() {
        const springDown = new Vector_1.default(0, 0).sub(new Vector_1.default(this.mass1.x - this.mass2.x, this.mass1.y - this.mass2.y));
        const newVector = springDown.normalize().multiplyScalar(50);
        this.mass2.x = this.mass1.x + newVector.x;
        this.mass2.y = this.mass1.y + newVector.y;
        let springUp = new Vector_1.default(this.mass1.x - this.mass2.x, this.mass1.y - this.mass2.y);
        // if (springUp.length() > 50) {
        //   this.updatePos();
        // }
    }
    update(dt) {
        let springUp = new Vector_1.default(this.mass1.x - this.mass2.x, this.mass1.y - this.mass2.y);
        let springDown = new Vector_1.default(0, 0).sub(springUp);
        let curLen = springDown.length();
        if (curLen > 51) {
            this.updatePos();
            springUp = new Vector_1.default(this.mass1.x - this.mass2.x, this.mass1.y - this.mass2.y);
            springDown = new Vector_1.default(0, 0).sub(springUp);
            curLen = 50;
            this.mass2.forceVertor = new Vector_1.default(0, 0);
            // this.mass2.forceVertor = springUp.multiplyScalar(this.dampingNum);
            // this.mass1.forceVertor = springDown.multiplyScalar(this.dampingNum);
            // this.dampingNum *= 0.9
            // if (this.dampingNum < 1) this.dampingNum = 1;
        }
        this.mass1.forceVertor.add(springDown
            .normalize()
            .multiplyScalar((curLen - this.restLength) * this.springConstant));
        this.mass2.forceVertor.add(springUp
            .normalize()
            .multiplyScalar((curLen - this.restLength) * this.springConstant));
    }
}
class Rope extends PIXI.Container {
    constructor(start, end, num_nodes, node_mass, k, pinned_nodes) {
        super();
        this.masses = [];
        this.springs = [];
        this.k = k;
        this.dir = true;
        this.node_mass = node_mass;
        this.pinned_nodes = pinned_nodes;
        let dir = true;
        this.springGra = new PIXI.Graphics();
        this.addChild(this.springGra);
        // 创建质点和弹簧
        for (let i = 0; i < num_nodes; i++) {
            const x = start.x + (i / (num_nodes - 1)) * (end.x - start.x);
            const y = start.y + (i / (num_nodes - 1)) * (end.y - start.y);
            const mass = new Mass(x, y, node_mass);
            this.masses.push(mass);
            // 如果节点在固定节点列表中，则标记为固定
            if (pinned_nodes.includes(i)) {
                mass.pinned = true;
            }
            this.addChild(mass);
        }
        this.masses[0].pinned = true;
        this.masses.forEach((mass, i) => {
            // 计算当前质点之前和之后的质点索引
            const prevIndex = i - 1;
            const nextIndex = i + 1;
            // 设置 preMass 属性
            mass.preMass = prevIndex >= 0 ? this.masses[prevIndex] : null;
            // 设置 afterMass 属性
            mass.afterMass =
                nextIndex < this.masses.length ? this.masses[nextIndex] : null;
        });
        this.restLen = new Vector_1.default(this.masses[0].x - this.masses[1].x, this.masses[0].y - this.masses[1].y).length();
        this.x = 300;
        this.y = 300;
    }
    drawSpring(springGra) {
        for (let i = 1; i < this.masses.length; i++) {
            const mass = this.masses[i];
            const previousMass = this.masses[i - 1];
            const spring = new Spring(previousMass, mass, this.k, this.restLen, this.dir ? Math.PI / 6 : -Math.PI / 6, springGra);
            // this.addChild(spring);
            this.springs.push(spring);
        }
    }
    simulateEuler(delta_t, gravity) {
        for (const spring of this.springs) {
            // 计算弹簧上的力
            const force = spring.computeForce();
            // TODO: 将力应用到相应的质点
            // 使用质点的质量、位置和速度来更新质点的加速度、速度和位置
        }
        for (const mass of this.masses) {
            if (!mass.pinned) {
                // TODO: 添加由重力引起的力，然后计算新的速度和位置
                // TODO: 添加全局阻尼
            }
            // 重置每个节点上的所有力
            //   mass.forces = new Vector2D(0, 0);
        }
    }
    simulateVerlet(delta_t, gravity) {
        for (const spring of this.springs) {
            // TODO: 使用显式 Verlet 方法模拟绳子的一个时间步（解决约束）
            // 参考 Verlet 集成的算法来更新质点的位置
        }
        for (const mass of this.masses) {
            if (!mass.pinned) {
                // const temp_position = mass.position.clone();
                // TODO: 设置绳子节点的新位置
                // TODO: 添加全局 Verlet 阻尼
            }
        }
    }
    update(app) {
        app.stage.addChild(this);
        // if (this.particle) {
        //   // this.particle.render(dt);
        //   app.ticker.add((delta) => {
        //     this.particle.render(delta / 60);
        //   });
        // }
        app.ticker.add((dt) => {
            this.updateMass(dt);
            this.springGra.clear();
            this.drawSpring(this.springGra);
        });
    }
    updateMass(dt) {
        // throw new Error("Method not implemented.");
        const delata = dt / 60;
        this.springs.forEach((s) => {
            s.update(delata);
        });
        this.masses.forEach((mass) => {
            mass.update(delata);
            mass.x += mass.speedVector.x * delata;
            mass.y += mass.speedVector.y * delata;
        });
    }
}
exports.Rope = Rope;
