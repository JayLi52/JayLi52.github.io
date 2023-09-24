const {
  getDivideSpace,
  getAABB,
  iterator,
} = require("../pixi-util/PolygonUtil");
const Vector2 = require("../pixi-util/geom/Vector2");
const GraphicsUtils = require("../utils/GraphicsUtils");
const Draggable = require("./Draggable");

class ChemContainer extends Draggable {
  waveHeight = 0;
  maxWaveHeight = 0;
  waveDirection = 1;
  liquidGra = null;

  constructor() {
    super();
    this.init();
    this.liquidGra = new PIXI.Graphics();
    this.addChild(this.liquidGra);
  }

  init() {
    super.init();
  }

  drawLiquidGra() {
    const globalAry = this.getGlobalVertexes(true);

    let rect = getAABB(globalAry);

    let result = iterator(globalAry, rect, 100, 1);

    let pa = result[0];
    let pb = result[result.length - 1];
    const divideSpaceResult = getDivideSpace(globalAry, pa, pb);

    // const lastVertex = divideSpaceResult.up;

    let vertex = divideSpaceResult.down;

    const posAry = [];

    for (let j = 0; j < vertex.length; j++) {
      let p = this.toLocal(vertex[j]);
      posAry.push(p);
    }
    this.liquidGra.clear();
    this.liquidGra.beginFill(0x86888b);
    GraphicsUtils.drawLiquidPolygon(this.liquidGra, posAry, this.waveHeight);
    this.liquidGra.alpha = 0.5;
    this.liquidGra.endFill();
  }

  update() {
    super.update();
    app.ticker.add((delta) => {
        // this.particle.render(delta / 60);
        if (this.capacityVertex) {
            this.updateWave();
            this.drawLiquidGra();
        }
    });
  }

  updateWave() {
    if (this.maxWaveHeight === 0) return;
    this.maxWaveHeight *= 0.99;
    if (this.maxWaveHeight < 3) {
      this.maxWaveHeight = 0;
    }
    let v = this.waveHeight + 1 * this.waveDirection;
    if (v > this.maxWaveHeight) {
      v = this.maxWaveHeight;
      this.waveDirection = -1;
    } else if (v < -this.maxWaveHeight) {
      v = -this.maxWaveHeight;
      this.waveDirection = 1;
    }

    this.waveHeight = v;
  }

  /**
   * 获取当前容器的全局坐标点
   */
  getGlobalVertexes(forceGet) {
    if (
      forceGet ||
      this.activeCount > nb.ACTIVE_COUNT - 2
      //  || this.activeCount > 0 || this.hasReact > 0
    ) {
      // 原始坐标数据
      let oriAry = this.capacityVertex;
      // 全局坐标点
      let globalAry = [];
      // 全局缩放
      for (let i = 0, length = oriAry.length; i < length; i++) {
        let p = new Vector2(oriAry[i].get_x(), oriAry[i].get_y());
        globalAry.push(this.toGlobal(p));
      }
      this.globalAry = globalAry;
      return [].concat(globalAry);
    } else {
      return [].concat(this.globalAry);
    }
  }
}

module.exports = ChemContainer;
