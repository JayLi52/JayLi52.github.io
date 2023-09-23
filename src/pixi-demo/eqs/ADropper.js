const Draggable = require("./Draggable");

class ADropper extends Draggable {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.x = 300;
    this.y = 300;
    this.alpha = 0.2;
    this.color = 0x343941;

    this.matrix = [
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0
    ];
    this.colorMatrix = new PIXI.filters.ColorMatrixFilter();
    this.colorMatrix.matrix = this.matrix;
    this.filters = [this.colorMatrix];
    // this.children[0].alpha = 0.2
    super.init();
  }

  update() {
    let speed = 0;
    let setV = false
    app.ticker.add((delta) => {
    speed += delta * 0.15
    this.y += speed * delta;
    if (this.children[0] && !setV) {
        this.children[0].alpha = 0.2;
        setV = true;
    }
    });
  }

  autoLightOn() {}

  autoLightOff() {}

  creationComplete() {
    console.log("creationComplete");
    eqLayer.addChild(this);
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

module.exports = ADropper;
