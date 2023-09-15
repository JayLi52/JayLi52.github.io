// 创建 PixiJS 应用
const app = new PIXI.Application({
  width: 800, // 宽度
  height: 600, // 高度
  backgroundColor: 0x343941,
});

// 将 PixiJS 应用添加到页面中
document.body.appendChild(app.view);

// 渲染舞台
app.renderer.render(app.stage);

let particleLayer = new PIXI.Container();
particleLayer.name = "ParticleLayer";
particleLayer.x = 0;
particleLayer.y = 0;

PIXI.loader.add("assets/skin.json").load(() => {
  app.stage.addChild(particleLayer);
  createEquipment('assets/assist/AlcoholBurner', 'container', eqs.AlcoholBurner).update();
});

