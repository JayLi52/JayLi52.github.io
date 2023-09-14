// 创建 PixiJS 应用
const app = new PIXI.Application({
    width: 800,         // 宽度
    height: 600,        // 高度
    backgroundColor: 0xAAAAAA, // 背景颜色
});

// 将 PixiJS 应用添加到页面中
document.body.appendChild(app.view);

// 创建一个红色矩形
const rectangle = new PIXI.Graphics();
rectangle.beginFill(0xFF0000); // 红色填充颜色
rectangle.drawRect(100, 100, 200, 100); // 位置和大小
rectangle.endFill();

// 将矩形添加到舞台
app.stage.addChild(rectangle);

// 渲染舞台
app.renderer.render(app.stage);

PIXI.loader.add('assets/skin.json').load((() => {
    // this.init(this.canvas);
    const a = ParticleUtil.getParticle(ParticleUtil.particles.glass_guan_qipao_right);
    console.log(a)
    a.width = 1000;
    a.height = 1000;
    app.stage.addChild(a);
}));

