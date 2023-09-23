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
