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
                      eq.capacityVertex.push(nape.geom.Vec2.get(o.x, o.y));
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