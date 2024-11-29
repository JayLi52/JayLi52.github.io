(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
const nb = {};

nb.SetInteractiveToFalse = require('./nb.SetInteractiveToFalse')
nb.SetRenderableToFalse = require('./nb.SetRenderableToFalse')
nb.setAllowGetBoundsToFalse = require('./nb.setAllowGetBoundsToFalse')


global.nb = nb;

module.exports = nb;
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./nb.SetInteractiveToFalse":2,"./nb.SetRenderableToFalse":3,"./nb.setAllowGetBoundsToFalse":4}],2:[function(require,module,exports){
/**
 * Created by onlyjyf on 9/20/16.
 */

function nb_SetInteractiveToFalse() {
    this.interactive = false;
    this.interactiveChildren = false;
}

module.exports = nb_SetInteractiveToFalse;

},{}],3:[function(require,module,exports){
/**
 *
* Created by onlyjyf on 8/22/16.
*/
function nb_SetRenderableToFalse() {
    this.renderable = false;

}
module.exports = nb_SetRenderableToFalse;

},{}],4:[function(require,module,exports){
/**
 * 设置为不计算当前图形的bounds
 * Created by lijian on 16/11/3.
 */
function nb_setAllowGetBoundsToFalse() {
    this.allowGetBounds = false;
}

module.exports = nb_setAllowGetBoundsToFalse;

},{}]},{},[1]);
