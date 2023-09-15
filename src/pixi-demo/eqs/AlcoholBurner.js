class AlcoholBurner extends PIXI.Container {
    particle = null;
    constructor() {
        super();
        this.init();
    }

    init() {
        if (!this.particle) {
            this.particle = ParticleUtil.getParticle(ParticleUtil.particles.all_fire);
            this.particle.x = 300; // 设置粒子的初始 X 位置
            this.particle.y = 400; // 设置粒子的初始 Y 位置
            particleLayer.addChild(this.particle);
        }
    }

    update() {
        if (this.particle) {
            // this.particle.render(dt);
            app.ticker.add((delta) => {
                this.particle.render(delta / 60);
            });
        }
    }
    creationComplete() {
        console.log('creationComplete')
    }
}

module.exports = AlcoholBurner;
