const ChemContainer = require("./ChemContainer");

class TestTube extends ChemContainer {
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
    super.update();
  }

  creationComplete() {
    console.log("creationComplete");
    eqLayer.addChild(this);
    this.drawLiquidGra();
  }
}

module.exports = TestTube;
