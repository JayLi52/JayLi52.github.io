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
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = __importStar(require("pixi.js"));
const Rope_1 = require("./Rope");
function bootstrap() {
    // 将 PixiJS 应用添加到页面中
    const scale = 1;
    const app = new PIXI.Application({
        width: 900,
        height: 800,
        backgroundColor: 0x343941,
    });
    document.body.appendChild(app.view);
    // 初始化舞台缩放属性
    let stageScale = 1;
    // 监听鼠标滚轮事件
    app.view.addEventListener("wheel", (event) => {
        // 计算滚轮事件的 deltaY，根据滚动方向进行缩放
        const deltaY = event.deltaY;
        if (deltaY > 0) {
            stageScale *= 0.9; // 缩小舞台
        }
        else {
            stageScale *= 1.1; // 放大舞台
        }
        // 限制舞台的最大和最小缩放值
        stageScale = Math.min(Math.max(0.5, stageScale), 10);
        // 更新舞台的缩放属性
        app.stage.scale.set(stageScale);
    });
    let isDragging = false;
    let previousX = 0;
    let previousY = 0;
    app.stage.interactive = true;
    app.view.addEventListener('pointerdown', (e) => {
        isDragging = app.stage.interactive;
        previousX = e.clientX;
        previousY = e.clientY;
    });
    app.view.addEventListener('pointermove', (e) => {
        if (isDragging) {
            const dx = e.clientX - previousX;
            const dy = e.clientY - previousY;
            app.stage.x += dx * scale; // 移动舞台的X坐标
            app.stage.y += dy * scale; // 移动舞台的Y坐标
            previousX = e.clientX;
            previousY = e.clientY;
        }
    });
    app.view.addEventListener('pointerup', () => {
        isDragging = false;
    });
    // 开始渲染
    app.start();
    window.rope = new Rope_1.Rope(new PIXI.Point(10, 10), new PIXI.Point(200, 200), 8, 1, 3, [
        0,
    ]).update(app);
    globalThis.__PIXI_APP__ = app;
}
bootstrap();
