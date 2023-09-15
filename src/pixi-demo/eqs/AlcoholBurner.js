const Draggable = require("./Draggable");

class AlcoholBurner extends Draggable {
    constructor() {
        super();
        this.init();
    }

    init() {
        if (!this.particle) {
            this.particle = ParticleUtil.getParticle(ParticleUtil.particles.all_fire);
            this.particle.x = 0; // 初始位置相对于容器
            this.particle.y = -120; // 初始位置相对于容器
            this.addChild(this.particle); // 将粒子添加到容器
            this.particle.visible = false;
        }

        this.x = 300;
        this.y = 300;
        super.init();
    }

    update() {
        if (this.particle) {
            // this.particle.render(dt);
            app.ticker.add((delta) => {
                this.particle.render(delta / 60);
            });
        }
    }

    autoLightOn() {

    }

    autoLightOff() {}

    creationComplete() {
        console.log('creationComplete');
        eqLayer.addChild(this);
        executeCmd(NBCommand.DRAG_COVER, {
            container: this,
            invert: false,
            outter: true,
            headCanCover: () => {
                return false;
            }
        });
    }
}

module.exports = AlcoholBurner;
