/**
 * Created by onlyjyf on 7/26/15.
 */

var SoundManager = {};

const nb = require("../core/const");
/**
 * 注册声音
 * @param SoundDat 声音数据
 */
SoundManager.register = function (soundDat) {
    if (nb.config.URI_PREFIX !== "" && soundDat.src.indexOf(nb.config.URI_PREFIX) === -1) {
        soundDat.src = nb.config.URI_PREFIX + soundDat.src;
    }
    let bool = createjs.Sound.activePlugin;
    createjs.Sound.registerSound(soundDat);
    if (!bool) {
        createjs.Sound.setMute(createjs.Sound.getMute());
    }
};

SoundManager.loadCommonSounds = function (callback) {
    // SoundManager.register({src:'assets/sounds/msg_warning.mp3', id:SoundManager.WARNING});
    createjs.Sound.addEventListener("fileload", callback);
};

SoundManager.play = function (soundID, interrupt, delay, offset, loop, volume, pan, startTime, duration) {
    if (soundID === undefined) {
        return;
    }
    if (typeof soundID === "string") {
        return createjs.Sound.play(nb.config.URI_PREFIX + soundID, interrupt, delay, offset, loop, volume, pan, startTime, duration);
    } else {
        var obj = soundID;
        return createjs.Sound.play(obj.id, obj.interrupt, obj.delay, obj.offset, obj.loop || loop, obj.volume || volume, obj.pan, obj.startTime, obj.duration);
    }
};
SoundManager.stop = function () {
    return createjs.Sound.stop();
};
module.exports = SoundManager;
