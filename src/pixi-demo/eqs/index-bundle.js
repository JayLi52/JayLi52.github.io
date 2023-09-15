(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./Draggable":2}],2:[function(require,module,exports){
class Draggable extends PIXI.Container {
    isDragging = false;
    offset = { x: 0, y: 0 };

    constructor() {
        super();
        this.init();
    }

    init() {
        this.interactive = true; // 启用交互
        this.buttonMode = true; // 设置光标为手型
        this.on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove);
    }

    onDragStart(event) {
        this.isDragging = true;
        this.offset.x = this.x - event.data.global.x;
        this.offset.y = this.y - event.data.global.y;

        // 禁用舞台的交互性
        app.stage.interactive = false;
    }

    onDragEnd() {
        this.isDragging = false;

        // 启用舞台的交互性
        app.stage.interactive = true;
    }

    onDragMove(event) {
        if (this.isDragging) {
            const newPosition = event.data.global;
            this.x = newPosition.x + this.offset.x;
            this.y = newPosition.y + this.offset.y;
        }
    }
}


module.exports = Draggable
},{}],3:[function(require,module,exports){
(function (global){(function (){
const AlcoholBurner = require('./AlcoholBurner')

const eqs = {
    AlcoholBurner,
}
global.eqs = eqs;
module.exports = eqs;
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AlcoholBurner":1}]},{},[3]);
