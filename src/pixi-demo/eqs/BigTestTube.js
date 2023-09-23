const {
  getDivideSpace,
  getAABB,
  iterator,
} = require("../pixi-util/PolygonUtil");
const Vector2 = require("../pixi-util/geom/Vector2");
const Draggable = require("./Draggable");

class TestTube extends Draggable {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.x = 600;
    this.y = 600;
    super.init();
  }

  update() {
    // let speed = 0;
    // let setV = false
    // app.ticker.add((delta) => {
    // speed += delta * 0.15
    // this.y += speed * delta;
    // if (this.children[0] && !setV) {
    //     this.children[0].alpha = 0.2;
    //     setV = true;
    // }
    // });
    // console.log(this);
    // this.drawLiquidGra();
  }

  drawLiquidGra() {
    const globalAry = this.getGlobalVertexes(true);

    let rect = getAABB(globalAry);

    let result = iterator(globalAry, rect, 1 / 3, 1);

    let pa = result[0];
    let pb = result[result.length - 1];
    const divideSpaceResult = getDivideSpace(this.capacityVertex, pa, pb);

    // const lastVertex = divideSpaceResult.up;

    let vertex = divideSpaceResult.down;

    const posAry = []

    for (let j = 0; j < vertex.length; j++) {
      let p = this.toLocal(vertex[j]);
      posAry.push(p);
    }
    const gra = new PIXI.Graphics();
    this.drawPolygon(gra, posAry, 0);
    this.addChild(gra);
  }

  drawPolygon(gra, vertex) {
    for (let i = 0; i < vertex.length; i++) {
      let p = vertex[i];
      if (i == 0) {
        gra.moveTo(p.x, p.y);
      } else {
        gra.lineTo(p.x, p.y);
      }
    }
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
        let p = new Vector2(oriAry[i].x, oriAry[i].y);
        globalAry.push(this.toGlobal(p));
      }
      this.globalAry = globalAry;
      return [].concat(globalAry);
    } else {
      return [].concat(this.globalAry);
    }
  }

  autoLightOn() {}

  autoLightOff() {}

  creationComplete() {
    console.log("creationComplete");
    eqLayer.addChild(this);
    this.drawLiquidGra();
    // this.head.visible = false;
    // executeCmd(NBCommand.DRAG_COVER, {
    //     container: this,
    //     invert: false,
    //     outter: true,
    //     headCanCover: () => {
    //         return false;
    //     }
    // });
  }
}

module.exports = TestTube;
