(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Vector2 = require("./pixi-util/geom/Vector2.js");
const GraphicsUtils = require("./utils/GraphicsUtils.js");

const nb = {
    config: {
        URI_PREFIX: ''
    }
}
/**
* 创建器材
* @param id 器材id
* @param type
* @param classFunc
* @param dataObj_
* @param position_
* @returns {PIXI.Container|*}
*/
function createEquipment(id, type, classFunc, dataObj_, position_, constructorAttribute) {
  var base = this;
  var confData
  var conf = {}
  var map = {};
//   var {
//       confData
//   } = map;

  var eq = null;
  if (classFunc instanceof Function) {
      eq = new classFunc(constructorAttribute);
  } else {
      eq = classFunc;
  }
  // 设置root
  eq.root = base;
  // 添加instanceName
  if (!constructorAttribute || !constructorAttribute.dataBuild) {
    //   this.InstanceNameManager.setInstance(eq);
  }
  // json文件没有加载
  if (confData === undefined) {
      var data = `${id }_conf.json`;
      $.getJSON('' + data, (_data, info) => {
          if (info === "success") {
            conf[id] = {}
              conf[id].confData = _data;
              // 纹理地址
              conf[id].textureURL = `${'' + id }.json`;
              map = conf[id]
              create();
          } else {
              delete conf[id];
          }
      });
  } else {
    map = conf[id]

      create();
  }

  return eq;

  // 通过配置信息创建view
  function create() {
      if (map == undefined) {
          throw new Error("没有器材配置信息");
      }
      confData = map.confData;
      // 取纹理map
      var {
          isTextureLoaded
      } = map;
      if (!dataObj_ && position_) {
          // 新加器材且设置了坐标
          // child.x = position_.x;
          // child.y = position_.y;
      }

      if (isTextureLoaded == undefined) {
          if (map.queue == undefined) {
              map.queue = [eq];
              // 纹理加载完成
              let loader = new PIXI.loaders.Loader();
              loader.add(map.textureURL).load(() => {
                  for (var i = 0; i < map.queue.length; i++) {
                      var eqItem = map.queue[i];
                      // 获取纹理集的名称
                      var textureMapName = id.substr(id.lastIndexOf("/") + 1);
                      addProperty(eqItem, map, textureMapName);
                  }
                  map.queue.length = 0;
                  map.isTextureLoaded = true;
              });
          } else {
              map.queue.push(eq);
          }
      } else {
          var textureMapName = id.substr(id.lastIndexOf("/") + 1);
          addProperty(eq, map, textureMapName);
      }
    }


  function addProperty(eq, map, textureMapName) {
      eq.dataObj = dataObj_;
      eq.cateid = type;
      eq._nbData_ = confData;
      for (var j = 0; j < Infinity; j++) {
          var confDataItem = confData[j];
          if (confDataItem != undefined) {
              // 过滤包含napeData的对象
              if (confDataItem.napeData) {
                  continue;
              }
              // 容积的顶点数据
              var {
                  capacityVertex
              } = confDataItem;
              if (capacityVertex) {
                  eq.capacityVertex = [];
                  for (var i = 0; i < capacityVertex.length; i++) {
                      var o = confDataItem.capacityVertex[i];
                      eq.capacityVertex.push(new Vector2(o.x, o.y));
                  }
                  continue;
              }
              createChildFromData(eq, confDataItem, textureMapName, eq);
              eq.alpha = 0; // 创建成功之前设置alpha为0
          } else {
              break;
          }
      }
      // eq.classname = name_;
      // eq.cateid = _child.cateid;
      if (eq.dragDropOffset) {
          eq.x += eq.dragDropOffset().x;
          eq.y += eq.dragDropOffset().y;
      }
      // eq.emit('creationComplete');
      setTimeout(() => {
          eq.isCreationComplete = true;
          eq.alpha = 1;
          eq.creationComplete();
      }, 0);
  }
}

/**
* 设置显示列表的一些信息
* @param parent 父节点
* @param child 子节点
* @param data 数据
*/
function setDisplayInfo(parent, child, data) {
if (data.name != null) {
    parent[data.name] = child;
    child.name = data.name;
}
// 设置步骤根对象
if (parent == this.viewStack) {
    child.stepRoot = child;
} else {
    child.stepRoot = parent.stepRoot;
}
child.stage = this.stage;
}

/**
* 设置共同数据
* @param dis
* @param obj
*/
function setCommonData(mc, data, textureMapName) {
mc._nbData_ = data;
mc.root = this;
mc._textureMapName_ = textureMapName;
mc.currentEquipment = mc.currentEquipment;
if (data.r != 0) {
    mc.setTransform(data.x, data.y, data.sx, data.sy, data.r);
} else {
    mc.setTransform(data.x, data.y, data.sx, data.sy, 0, data.skewX, data.skewY);
}
mc.alpha = isNaN(data.a) ? 1 : data.a;
// 外链的链接名,这里进行一次调用
if (data.linkageClassName !== undefined) {
    // 绑定内部方法
    if (data.linkageClassName.indexOf("bind:") !== -1) {
        var innerFuncName = data.linkageClassName.replace("bind:", "");
        let func = this[innerFuncName];
        if (func) {
            this.bindScriptToSprite(func, mc.name);
            console.log(`bind object${ mc.name } to function ${ innerFuncName}`);
        }
    } else {
        // 先使用"|"分割，在用"."分割
        var ary0 = data.linkageClassName.split("|");
        for (var j = 0; j < ary0.length; j++) {
            var ary = ary0[j].split(".");
            var f = window;
            for (var i = 0; i < ary.length; i++) {
                // 判断是否包含传参的情况
                if (i == ary.length - 1) {
                    var funcName = ary[i];
                    var index = funcName.indexOf("(");
                    if (index != -1) {
                        var params = funcName.substring(index + 1, funcName.length - 1);
                        params = `[${ params.replace(/'/gi, "\"") }]`;
                        funcName = funcName.substring(0, index);
                        f = f[funcName];
                    } else {
                        f = f[ary[i]];
                    }
                } else {
                    f = f[ary[i]];
                }
                if (f === undefined) {
                    break;
                } else if (i === ary.length - 1) {
                    // @params f function
                    // @params s linkageName
                    // @params args jsonData
                    let func = function (f, s, args) {
                        return function () {
                            if (params) {
                                try {
                                    var jsonObj = JSON.parse(args);
                                } catch (e) {
                                    console.log("请传入json数据");
                                }
                                f.apply(mc, jsonObj);
                            } else {
                                f.apply(mc);
                            }
                            mc.linkageClassName = s;
                        };
                    };
                    mc.once("creationComplete", func(f, ary0[j], params));
                }
            }
            if (i !== ary.length) {
                console.log("warning:", `${data.linkageClassName }没有该类，请确认引入了该js文件.`);
            }
        }
    }
}
// 设置box2d中的数据
if (data.b2Data !== undefined) {
    mc.b2Data = data.b2Data;
}
// 设置three.js中的数据
if (data.threeData !== undefined) {
    mc.threeData = data.threeData;
}
}

/**
* 数据结构的定义可以参考 jsfl/generate_resources_code.jsfl 中的说明
* 该方法可以根据json配置文件生成每一个步骤的根对象，所有的步骤根对象由viewStack统一管理
*                    |-sp1
*          |- frame0-|-sp2
*          |         |-img1
*          |- frame1
* viewStack|- frame2
*          |- frame3
*          |- frame4
* 上图中的frameX就是每一个步骤的根对象,每一个跟对象的孩子如果是影片剪辑就都会一个name，该name可以在flash中进行定义
* 1.如何访问子对象
*      如果在代码中需要访问到该影片剪辑，可以从根对象开始一层一层的向下找，如frame0中有一个影片剪辑名为mc0可以在绑定的
*   方法中直接这么调用  this.mc0
* 2.如何从子对象中访问步骤根对象
*      child.stepRoot
*
* @param sp
* @param data
*/
function createChildFromData(sp, data, textureMapName, rootEq) {
if (data.type == "sprite" || data.type == "bitmap") {
    var spChild;
    if (data.libName == undefined) {
        spChild = new PIXI.Container();
    } else {
        spChild = new PIXI.Sprite(PIXI.Texture.fromFrame(`${textureMapName }/${ data.libName}`));
    }
    setDisplayInfo(sp, spChild, data);
    setCommonData(spChild, data, textureMapName);
    sp.addChildAt(spChild, 0);
    // 设置步骤根对象
    if (sp == this.viewStack) {
        spChild.stepRoot = spChild;
        // 步骤完成的时候可以调用
        spChild.onStepComplete = function () {
            // 只允许被调用一次
            if (this.isComplete == undefined) {
                console.log("当前步骤完成");
            }
        };
        // 显示提示
        spChild.showTip = function (tipInfo) {
            if (this.__tip__ == undefined) {
                this.__tip__ = new NBTip();
                this.addChild(this.__tip__);
                this.__tip__.x = 80;
                this.__tip__.y = 160;
            }
            this.__tip__.setText(tipInfo);
        };
        // 关闭提示
        spChild.hideTip = function () {
            if (this.__tip__ != undefined) {
                this.__tip__.parent.removeChild(this.__tip__);
            }
        };
    } else {
        spChild.stepRoot = sp.stepRoot;
    }
    for (let i = 0; i < Infinity; i++) {
        if (data[i] != undefined) {
            createChildFromData(spChild, data[i], textureMapName, rootEq);
        } else {
            break;
        }
    }
    spChild.emit("creationComplete");
    return spChild;
}
if (data.type == "movie") {
    var ts = [];
    for (let i = 0; i < int.MAX_VALUE; i++) {
        if (data[i] != undefined) {
            ts.push(PIXI.Texture.fromFrame(`${textureMapName }/${ data[i].libName}`));
        } else {
            break;
        }
    }
    const mc = new PIXI.extras.MovieClip(ts);
    setDisplayInfo(sp, mc, data);
    setCommonData(mc, data, textureMapName);
    mc.emit("creationComplete");
    sp.addChildAt(mc, 0);
    return mc;
}
if (data.type == "text") {
    // 文字的缩放
    let reg = /\d*/gi;
    var data_f = data.f;
    var data_size = reg.exec(data.f);
    data_f = data_f.replace(data_size, data_size - 0);
    // 如果字符串是 ${*****} 的结构就去查找对于的文字
    reg = new RegExp(/\${(.*)}/);
    var result = reg.exec(data.txt);
    var str = data.txt;
    if (result != null) {
        var _s = result[1];
        var ary = _s.split(".");
        var _instance = instance;
        for (var i = 0; i < ary.length; i++) {
            _instance = _instance[ary[i]];
        }
        str = _instance;
    }
    // 计算文本的w和h
    var {
        w
    } = data;
    var {
        h
    } = data;
    var {
        cos
    } = Math;
    var {
        sin
    } = Math;
    var bound = {
        x: data.x - 0,
        y: data.y - 0
    };
    var a,
        _x,
        _y;
    var {
        r
    } = data;
    // console.log(r);
    if (r > 0 && r < Math.PI / 2) {
        a = r;
    } else if (r > Math.PI / 2) {
        a = Math.PI - r;
    } else if (r < -Math.PI / 2) {
        a = Math.PI - Math.abs(r);
    } else {
        a = Math.abs(r);
    }
    var k = (cos(a) * cos(a) - sin(a) * sin(a));
    var l1 = (w * cos(a) - h * sin(a)) / k;
    var l2 = (-w * sin(a) + h * cos(a)) / k;
    if (r == Math.PI / 2) {
        r += 0.001;
    }
    // 计算_x, _y
    if (r >= 0 && r < Math.PI / 2) {
        _x = bound.x + l2 * sin(a);
        _y = bound.y;
    } else if (r > Math.PI / 2) {
        _x = bound.x + w;
        _y = bound.y + l2 * cos(a);
    } else if (r < -Math.PI / 2) {
        _x = bound.x + l1 * cos(a);
        _y = bound.y + h;
    } else {
        _x = bound.x;
        _y = bound.y + l1 * sin(a);
    }
    // 更新pixi后，font属性已禁用
    data_f = data_f.split(" ");
    if (data_f.length !== 2) {
        let ary = [data_f.shift(0)];
        ary.push(data_f.join(" "));
        data_f = ary;
    }
    let txt;
    let txtStyle = {
        fontSize: data_f[0],
        fontFamily: data_f[1],
        // font: data_f,
        wordWrap: true,
        fill: data.c,
        wordWrapWidth: l1,
        align: data.a
    };
    if (rootEq && rootEq.getText) {
        txt = rootEq.getText(str, txtStyle)
    } else {
        txt = new PIXI.Text(str, txtStyle);
    }
    setDisplayInfo(sp, txt, data);
    txt.x = _x;
    txt.y = _y;
    txt.rotation = data.r;
    sp.addChildAt(txt, 0);
    return txt;
}
if (data.type == "button") {
    const disableskin = new PIXI.Sprite.fromFrame(`${textureMapName }/${ data[0].libName}`);
    const downskin = new PIXI.Sprite.fromFrame(`${textureMapName }/${ data[1].libName}`);
    const upskin = new PIXI.Sprite.fromFrame(`${textureMapName }/${ data[0].libName}`);
    const mc = new nb.comp.Button({
        disabledSkin: disableskin,
        downSkin: downskin,
        upSkin: upskin
    });
setDisplayInfo(sp, mc, data);
    setCommonData(mc, data, textureMapName);
    sp.addChildAt(mc, 0);
    return mc;
}
if (data.type == "nbMovie") {
    var MovieClip = require("./display/MovieClip");
    var c = new MovieClip();
    sp.addChildAt(c, 0);
    for (let i = 0; i < int.MAX_VALUE; i++) {
        var frame = data[i];
        if (frame === undefined) {
            break;
        }
        for (let j = 0; j < int.MAX_VALUE; j++) {
            var ele = frame[j];
            if (ele === undefined) {
                break;
            }
            var dis = createChildFromData(c, ele, textureMapName, rootEq);
            c.insertDisplayObjectToFrame(dis, i);
        }
    }
    setDisplayInfo(sp, c, data);
    setCommonData(c, data, textureMapName);
    c.gotoAndStop(0);
    c.emit("creationComplete");
    return c;
}
if (data.type == "shape") {
    var g = new PIXI.Graphics();
    sp.addChildAt(g, 0);
    GraphicsUtils.draw(g, data.path.concat());
    return g;
}
}

window.createEquipment = createEquipment;
},{"./display/MovieClip":2,"./pixi-util/geom/Vector2.js":3,"./utils/GraphicsUtils.js":4}],2:[function(require,module,exports){
const nb = window.nb;
/**
 *
 * Created by onlyjyf on 10/13/15.
 */
class MovieClip extends PIXI.Container{
    constructor() {
        super();
        this.lastIndex = 0;
        this.animationSpeed = 1;
        this.ticker = nb.MovieClip.ticker;
        this.totalFrames = 0;
        this._currentTime = 0;
        this.loop = true;
        //默认是否正在播放影片剪辑
        this.playing = false;

        //是否反向播放
        this._reverse = false;
    }

    get currentFrame() {
        return this.lastIndex;
    }

    set currentFrame(value) {
        this.gotoAndStop(Math.floor(value));
    }

    get reverse() {
        return this._reverse;
    }

    set reverse(bool) {
        if (this._reverse === bool) {
            return;
        }
        if (this.lastIndex !== -1) {
            this.__gotoAndStop__(this.totalFrames - 1 - this.lastIndex);
        }
        //置换数据
        const half = Math.floor(this.totalFrames / 2);
        for (let i = 0; i < half; i ++) {
            const temp = this[i];
            this[i] = this[this.totalFrames - 1 - i];
            this[this.totalFrames - 1 - i] = temp;
        }
        this._reverse = bool;
    }

    update () {
        if (this.__end__) {
            this.__end__ = false;
            this.__gotoAndStop__(0);
            this.__decimal__ = 0;
            return;
        }
        this.__floor__ = this.lastIndex + this.animationSpeed + (this.__decimal__ || 0);
        const floor = Math.floor(this.__floor__);
        //小数点部分
        this.__decimal__ = this.__floor__ % 1;
        if (floor < 0) {
            if (this.loop)
            {
                this.__gotoAndStop__(floor);
            }
            else
            {
                this.__gotoAndStop__(0);
                if (this.onComplete)
                {
                    this.onComplete();
                }
            }
        } else if (floor <= this.totalFrames - 1) {
            if (!this.loop) {
                this.__gotoAndStop__(floor);
                if (floor === this.totalFrames - 1) {
                    this.stop();
                }
            } else {
                //console.log(floor);
                this.__gotoAndStop__(floor);
            }
            if (floor === this.totalFrames - 1) {
                //console.log(this.__decimal__)
                if (this.onComplete) {
                    this.onComplete();
                }
                if (this.loop && this.__decimal__ + this.animationSpeed >= 1) {
                    this.__end__ = true;
                }
            }
        }
        else if (floor > this.totalFrames - 1) {
            this.__gotoAndStop__(this.totalFrames - 1);
            if (this.onComplete)
            {
                this.onComplete();
            }
            if (this.loop === false) {
                this.stop();
            }
        }
    }
    /**
     *
     * @param dis 显示列表对象
     * @param frameIndex 帧序号
     * @param tweenTransform 补间的变换
     */
    insertDisplayObjectToFrame(dis, frameIndex, tweenTransform) {
        if (!this[frameIndex]) {
            this[frameIndex] = [];
            if (frameIndex >= this.totalFrames) {
                this.totalFrames = frameIndex + 1;
            }
        }
        this[frameIndex].push({dis:dis, tweenTransform:tweenTransform});
        dis.visible = false;
    }

    gotoAndStop(index) {
        index = Math.round(index);
        this._currentTime = index;
        this.stop();
        this.__gotoAndStop__(index);
    }

    gotoAndPlay(index) {
        index = Math.round(index);
        this._currentTime = index;
        this.gotoAndStop(index);
        this.play();
    }

    __gotoAndStop__(index) {
        if (this.lastIndex !== -1) {
            const ary = this[this.lastIndex];
            //隐藏element
            if (ary) {
                for (let i = 0; i < ary.length; i ++) {
                    ary[i].dis.visible = false;
                }
            }
        }
        if (index >= this.totalFrames) {
            index = this.totalFrames - 1;
        }
        this.lastIndex = index;
        const ary = this[index];
        if (ary) {
            for (let i = 0; i < ary.length; i ++) {
                const dis = ary[i].dis;
                dis.visible = true;
                dis.parent.addChildAt(dis, 0);
                if (ary[i].tweenTransform) {
                    const data = ary[i].tweenTransform;
                    if (data.r !== 0) {
                        dis.setTransform(data.x, data.y, data.sx, data.sy, data.r);
                    } else {
                        dis.setTransform(data.x, data.y, data.sx, data.sy, 0, data.skewX, data.skewY);
                    }
                }
            }
        }
    }

    /**
     * 通过child的名字获取索引
     */
    getFrameIndexByName(childName) {
        const mc = this[childName];
        if (!mc) {
            return -1;
        }
        for (let i = 0; i < this.totalFrames; i ++) {
            const children = this[i];
            if (!children) {
                continue;
            }
            for (let j = 0; j < children.length; j ++) {
                const child = children[j].dis;
                if (mc === child) {
                    return i;
                }
            }
        }
        return -1;
    }

    play() {
        if(this.playing) {
            return;
        }
        this.playing = true;
        this.ticker.add(this.update, this);
    }

    stop() {
        if(!this.playing) {
            return;
        }
        this.playing = false;
        this.ticker.remove(this.update, this);
    }

    clone() {
        return this.root.createChildFromData(this.parent, this._nbData_, this._textureMapName_);
    }
}

nb.MovieClip = MovieClip;
MovieClip.ticker = new PIXI.ticker.Ticker();
MovieClip.ticker.start();

module.exports = MovieClip;

},{}],3:[function(require,module,exports){
/**
 *
 * Created by onlyjyf on 8/30/16.
 */

class Vector2 {
    constructor(x = 0, y = 0) {
        if (x instanceof Object) {
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x;
            this.y = y;
        }
    }

    addXY(x, y) {
        var v = new Vector2(this.x, this.y);
        v.x += x;
        v.y += y;
        return v;
    }

    add(vec) {
        var v = new Vector2(this.x, this.y);
        v.x += isNaN(vec.x) ? vec.get_x() : vec.x;
        v.y += isNaN(vec.y) ? vec.get_y() : vec.y;
        return v;
    }

    sub(vec) {
        var v = new Vector2(this.x, this.y);
        if(!isNaN(vec.x) || vec.get_x) {
            v.x -= isNaN(vec.x) ? vec.get_x() : vec.x;
            v.y -= isNaN(vec.y) ? vec.get_y() : vec.y;
        }
        return v;
    }

    /**
     * 点乘
     * @param vec
     * @returns {number}
     */
    dot(vec) {
        return this.x * vec.x + this.y * vec.y;
    }

    /**
     * 叉乘
     * @param vec
     * @returns {number}
     */
    cross(vec) {
        return this.x * vec.y - vec.x * this.y;
    }

    /**
     * 当前向量在vec上的投影
     * @see 投影矩阵 --> http://blog.csdn.net/a130098300/article/details/7661548
     * @param vec
     */
    projectTo(vec) {
        var x = vec.x;
        var y = vec.y;
        var c = vec.dot(vec);
        // 二维向量的投影矩阵
        var a = x * x / c;
        var b = x * y / c;
        var d = y * y / c;
        var m = new PIXI.Matrix();
        m.a = a;
        m.b = b;
        m.c = b;
        m.d = d;
        return new Vector2(m.apply(this));
    }

    /**
     * 获取当前向量的长度
     * @returns {number}
     */
    length() {
        var x = this.x;
        var y = this.y;
        return Math.sqrt(x * x + y * y);
    }

    /**
     * 转成数组
     */
    toArray() {
        return [this.x, this.y];
    }

    /**
     * 克隆
     */
    clone() {
        return new Vector2(this.x, this.y);
    }

    /**
     * 乘以一个标量
     */
    multiplyScalar(s) {
        this.x *= s;
        this.y *= s;
        return this;
    }

    /**
     * 设置向量的长度
     * @param value
     */
    setLength(value) {
        this.multiplyScalar(value / this.length());
    }

    /**
     * 线性插值
     * @param v
     * @param alpha
     * @returns {Vector2}
     */
    lerp(v, alpha) {
        var vec = this.clone();
        vec.x += (v.x - vec.x) * alpha;
        vec.y += (v.y - vec.y) * alpha;
        return vec;
    }

    /**
     * 旋转多少度
     * @param angle 旋转的角度
     */
    rotate(angle) {
        var c = Math.cos(angle), s = Math.sin(angle);
        this.x = x * c - y * s;
        this.y = x * s + y * c;
    }

}

module.exports = Vector2;

},{}],4:[function(require,module,exports){
class GraphicsUtils {
    static draw(shape, ary) {
        shape.lastMovePos = {
            x: NaN,
            y: NaN
        };

        // var debugCommands = "";

        const moveTo = GraphicsUtils.__moveTo__;
        while (ary.length) {
            const dat = ary.pop();
            let _x, _y, a, b, c;
            if (dat === NBGraphicsCommand.MOVE_TO) {
                _x = ary.pop();
                _y = ary.pop();
                moveTo(shape, _x, _y);
                // if (flag) debugCommands += "g.moveTo(" + _x + "," + _y + ")\n";
            } else if (dat === NBGraphicsCommand.LINE_TO) {
                _x = ary.pop();
                _y = ary.pop();
                if (!(shape.lastMovePos.x === _x && shape.lastMovePos.y === _y)) {
                    // debugCommands += "g.lineTo(" + _x + "," + _y + ")\n";
                    shape.lineTo(_x, _y);
                    shape.lastMovePos.x = _x;
                    shape.lastMovePos.y = _y;
                }
            } else if (dat === NBGraphicsCommand.CURVO_TO) {
                _x = ary.pop();
                _y = ary.pop();
                moveTo(shape, _x, _y);
                // if (flag) debugCommands += "g.moveTo(" + _x + "," + _y + ")\n";
                const cx = ary.pop();
                const cy = ary.pop();
                const ax = ary.pop();
                const ay = ary.pop();
                shape.lastMovePos.x = ax;
                shape.lastMovePos.y = ay;
                shape.quadraticCurveTo(cx, cy, ax, ay);
                // debugCommands += "g.quadraticCurveTo(" + cx + "," + cy + "," + ax + "," + ay + ")\n";
            } else if (dat === NBGraphicsCommand.LINE_STYLE) {
                a = ary.pop();
                b = ary.pop();
                c = ary.pop();
                shape.lineStyle(a, b, c);
                // debugCommands += "g.lineStyle(" + a + "," + b + "," + c + ")\n";
            } else if (dat === NBGraphicsCommand.BEGIN_FILL) {
                a = ary.pop();
                b = ary.pop();
                shape.beginFill(a, b);
                // debugCommands += "g.beginFill(" + a + "," + b + ")\n";
            } else if (dat === NBGraphicsCommand.END_FILL) {
                //shape.lastMovePos = {x:NaN, y:NaN};
                shape.endFill();
                // debugCommands += "g.endFill();\n";
            }
        }
        //shape.debugCommands = debugCommands;
        //console.log(debugCommands)
    }

    static __moveTo__(s, x, y) {
        if (!(s.lastMovePos.x === x && s.lastMovePos.y === y)) {
            s.moveTo(x, y);
            s.lastMovePos.x = x;
            s.lastMovePos.y = y;
            return true;
        }
        return false;
    }

    static drawPolygon(gra, vertex) {
        for (let i = 0; i < vertex.length; i++) {
            const p = vertex[i];
            if (i === 0) {
                gra.moveTo(p.x, p.y);
            } else {
                gra.lineTo(p.x, p.y);
            }
        }
    }

    static drawLiquidPolygon(gra, vertex, waveHeight = 12, dltY = 0) {
        let sideHeight = 0;
        if (gra.parent && gra.parent.parent) {
            sideHeight = 8 * Math.cos(gra.parent.parent.rotation);
        }
        if (sideHeight < 1) {
            GraphicsUtils.drawPolygon(gra, vertex);
            return;
        }
        if (!vertex[1]) {
            return;
        }
        let p1 = gra.toGlobal(vertex[0]);
        let p2 = gra.toGlobal(vertex[1]);
        if (Math.abs(p1.y - p2.y) < 1) {
            let v = vertex.shift();
            vertex.push(v);
        }
        let len = vertex.length;
        let startPoint = vertex[0];
        let endPoint = vertex[len - 1];
        let minY = startPoint.y > endPoint.y ? startPoint.y : endPoint.y;
        let dx = startPoint.x - endPoint.x;
        let dy = startPoint.y - endPoint.y;
        let length = Math.sqrt(dx * dx + dy * dy);
        let maxWaveHeight = length / 10;
        waveHeight = waveHeight > maxWaveHeight ? maxWaveHeight : waveHeight;
        let xz = dx / length;
        let yz = dy / length;
        let leftWidth = dx < 0 ? 1 : -1;
        let maxY = -Infinity;
        for (let i = 0; i < len; i++) {
            let p = vertex[i];
            if (p.y > maxY) {
                maxY = p.y;
            }
        }
        let disY = maxY - minY;
        if (disY + dltY < sideHeight * 3) {
            sideHeight = 0;
        }
        if (disY < sideHeight) {
            sideHeight = (sideHeight + disY) / 2;
        }
        gra.moveTo(startPoint.x, startPoint.y - sideHeight);
        for (let i = 0; i < len; i++) {
            let p = vertex[i];
            gra.lineTo(p.x, p.y);
        }
        gra.lineTo(endPoint.x, endPoint.y - sideHeight);
        if (waveHeight === 0) {
            let anchorLength = leftWidth * sideHeight;
            let x = Math.abs(xz * anchorLength);
            let y = Math.abs(yz * anchorLength);
            gra.bezierCurveTo(endPoint.x + x, endPoint.y + y, startPoint.x - x, startPoint.y + y, startPoint.x, startPoint.y - sideHeight);
        } else {
            let amount = Math.ceil(Math.abs(length) / 100);
            amount = amount < 2 ? 2 : amount;
            let stepX = dx / amount / 2;
            let stepY = dy / amount / 2;
            let lastAnchorX = endPoint.x - leftWidth * sideHeight;
            let lastAnchorY = endPoint.y;
            let lastPointX = endPoint.x;
            let lastPointY = endPoint.y;
            let direction = 1;
            for (let i = 0; i < amount - 1; i++) {
                let middlePointX = lastPointX + stepX;
                let middlePointY = lastPointY + stepY;
                let newPointX = middlePointX + stepX;
                let newPointY = middlePointY + stepY;
                let newAnchorX = middlePointX + waveHeight * yz * direction;
                let newAnchorY = middlePointY - waveHeight * xz * direction;
                direction *= -1;
                gra.bezierCurveTo(lastAnchorX, lastAnchorY, newAnchorX, newAnchorY, newPointX, newPointY);
                lastAnchorX = newAnchorX + 2 * (newPointX - newAnchorX);
                lastAnchorY = newAnchorY + 2 * (newPointY - newAnchorY);
                lastPointX = newPointX;
                lastPointY = newPointY;
            }
            gra.bezierCurveTo(lastAnchorX, lastAnchorY, startPoint.x + leftWidth * sideHeight, startPoint.y, startPoint.x, startPoint.y - sideHeight);
            gra.endFill();
        }
    }

    static dashTo(gra, point1, point2, space, globalScale) {
        let dx = point2.x - point1.x;
        let dy = point2.y - point1.y;
        space = space > 0 ? space : 1;
        space *= globalScale;
        let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) * globalScale;
        let total = distance / space / 2;
        dx /= total * 2;
        dy /= total * 2;
        let currentP = Object.assign({}, point1);
        for (let i = 0; i < total - 1; i++) {
            gra.moveTo(currentP.x, currentP.y);
            gra.lineTo(currentP.x += dx, currentP.y += dy);
            currentP.x += dx;
            currentP.y += dy;
        }
        gra.moveTo(currentP.x, currentP.y);
        gra.lineTo(point2.x, point2.y);
    }
}

const NBGraphicsCommand = {
    MOVE_TO: 0x01,
    LINE_TO: 0x02,
    CURVO_TO: 0x03,
    LINE_STYLE: 0x20,
    BEGIN_FILL: 0x21,
    END_FILL: 0xFF
};

// 导出 GraphicsUtils 类
module.exports = GraphicsUtils;

},{}]},{},[1]);
