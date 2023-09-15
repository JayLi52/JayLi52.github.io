(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
(function (global){(function (){
const AlcoholBurner = require('./AlcoholBurner')

const eqs = {
    AlcoholBurner
}
global.eqs = eqs;
module.exports = eqs;
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AlcoholBurner":1}]},{},[2]);
