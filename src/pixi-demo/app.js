const scale = 3

// 创建 PixiJS 应用
const app = new PIXI.Application({
  width: scale * 865,  // 设置宽度大于屏幕宽度
  height: scale * 835,  
  backgroundColor: 0x343941,
});

// 将 PixiJS 应用添加到页面中
document.body.appendChild(app.view);

// 渲染舞台
app.renderer.render(app.stage);

// 获取Pixi.js生成的canvas元素
const canvas = app.view;

// 设置canvas的宽度和高度为2倍
canvas.width = scale * 865;
canvas.height = scale * 835;

// // 设置canvas的样式属性
canvas.style.touchAction = 'none';
canvas.style.width = '830px';
canvas.style.height = '835px';
canvas.style.position = 'absolute';
canvas.style.backgroundColor = 'rgb(52, 57, 65)';
canvas.style.cursor = 'inherit';

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
    app.stage.x += dx * scale;  // 移动舞台的X坐标
    app.stage.y += dy * scale;  // 移动舞台的Y坐标
    previousX = e.clientX;
    previousY = e.clientY;
  }
});

app.view.addEventListener('pointerup', () => {
  isDragging = false;
});

let particleLayer = new PIXI.Container();
particleLayer.name = "ParticleLayer";
particleLayer.x = 0;
particleLayer.y = 0;

let eqLayer = new PIXI.Container();
eqLayer.name = "EqLayer";
eqLayer.x = 0;
eqLayer.y = 0;

app.stage.eqLayer = eqLayer;

// 初始化舞台缩放属性
// let stageScale = 1;

// // 监听鼠标滚轮事件
// app.view.addEventListener("wheel", (event) => {
//   // 计算滚轮事件的 deltaY，根据滚动方向进行缩放
//   const deltaY = event.deltaY;
//   if (deltaY > 0) {
//     stageScale *= 0.9; // 缩小舞台
//   } else {
//     stageScale *= 1.1; // 放大舞台
//   }

//   // 限制舞台的最大和最小缩放值
//   stageScale = Math.min(Math.max(0.5, stageScale), 10);

//   // 更新舞台的缩放属性
//   app.stage.scale.set(stageScale);
// });

PIXI.loader.add("assets/skin.json").load(() => {
  app.stage.addChild(particleLayer);
  app.stage.addChild(eqLayer);
  window.drip = createEquipment('assets/assist/ADropper', 'container', eqs.ADropper).update();
  window.testTueb = createEquipment('assets/container/BigTestTube', 'container', eqs.BigTestTube).update();
  window.xxx = createEquipment('assets/assist/AlcoholBurner', 'container', eqs.AlcoholBurner).update();
});

const map = {
}

//注册命令
NBCommand.registerCommand({
  map,
  registerCommand(cmd, fn) {
    map[cmd] = new fn();
  }
});


function executeCmd(cmd, data) {
  if (map[cmd]) {
    map[cmd].execute(data)
  }
}
