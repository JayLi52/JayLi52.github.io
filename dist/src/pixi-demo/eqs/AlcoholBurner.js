const GraphicsUtils = require("../basic-util-bundle");
const { getAABB } = require("../pixi-util/PolygonUtil");
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
            this.particle.visible = true;
        }

        this.x = 595;
        this.y = 1059;
        super.init();
    }

    update() {
        if (this.particle) {
            // this.particle.render(dt);
            app.ticker.add((delta) => {
                this.particle.render(delta / 60);
                this.modifyParticles();
            });
            this.checkParticleColl();
        }
        return this
    }

    modifyParticles() {
        // const maxY = 1200;// 容器水平的最低点
        if (!testTueb || !testTueb.rect) return;
        let y = testTueb.rect.y + testTueb.rect.height;
        let x = testTueb.rect.x + testTueb.rect.width / 2;
        y = this.toLocal(new PIXI.Point(x, y), app.stage).y + 130;
        // console.log(y)
        const modifyPosFunc = (pos) => {
            let shouldY = pos.y
            let changed = false;
            let shouldX = pos.x;
            if (shouldY < y) {
                changed = true;
                shouldX += (Math.random() - .5) * 30;
                shouldY = y;
            }
            return {
                x: shouldX,
                y: shouldY,
                changed: changed
            };
        };

        // this.particle.children.length

        const px = this.toGlobal(this.particle).x
        for (let i = 0; i < this.particle.children.length; i++) {
            let p = this.particle.children[i];
            // console.log(p.position)
            if (Math.abs(px - testTueb.x) < 30) {
                let pos = modifyPosFunc(p.position);
                if (pos.changed) {
                    // pos = c.toLocal(pos);
                    p.x = pos.x;
                    p.y = pos.y;
                    // count++;
                }
            }
        }



    }

    checkParticleColl() {
        // 算出在热辐射半径内距离最近的容器

        // 
        this.particle.heatInfoObj = {
            eq: testTueb
        }
    }

    autoLightOn() {

    }

    autoLightOff() {}

    creationComplete() {
        console.log('creationComplete');
        eqLayer.addChild(this);
        this.head.visible = false;
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
