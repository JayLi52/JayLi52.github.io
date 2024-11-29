/**
 * Created by onlyjyf on 8/3/16.
 */

// var nb = {}

var int = int || {};
int.MAX_VALUE = (1 << 30) + ((1 << 30) - 1);

window.int = int;

window.TouchEvent = window.TouchEvent || function () {};
window.MouseEvent = window.MouseEvent || function () {};

if (Object.values === undefined) {
    Object.values = (x) => {
        return Object.keys(x).reduce((y, z) => y.push(x[z]) && y, []);
    };

    Object.entries = (x) => {
        return Object.keys(x).reduce((y, z) => y.push([z, x[z]]) && y, []);
    };
}

TouchEvent.TOUCH_BEGIN = "pointerdown";
TouchEvent.TOUCH_MOVE = "pointermove";
TouchEvent.TOUCH_END = "pointerup";
TouchEvent.TAP = "tap";
TouchEvent.TOUCH_END_OUTSIDE = "pointerupoutside";

window.nb = window.nb || {};

// 最大缩放值
nb.MAX_SCALE_VALUE = 2;
// 最小缩放值
nb.MIN_SCALE_VALUE = 0.25;

// 追加Map的toJSON()方法
if (window.Map) {
    if (window.Map.prototype.toJSON === undefined) {
        Map.prototype.toJSON = function toJSON() {
            return [...Map.prototype.entries.call(this)];
        };
    }
}

if (window.Set) {
    if (window.Set.prototype.toJSON === undefined) {
        Set.prototype.toJSON = function toJSON() {
            return [...Set.prototype.values.call(this)];
        };
    }
}

/**
 * 模拟鼠标按下
 * @param obj 对象
 * @param e 其他的事件
 */
TouchEvent.simulateTouchDown = function (obj, e) {
    //obj.emit(TouchEvent.TOUCH_BEGIN, e);
    //obj.emit('touchstart', e);
    obj.emit(e.type, e);
    obj["_isLeftDown"] = true;
};
TouchEvent.simulateTouchUp = function (obj, e) {
    //obj.emit(TouchEvent.TOUCH_BEGIN, e);
    //obj.emit('touchstart', e);
    obj.emit(e.type, e);
    obj["_isLeftDown"] = false;
};

//do not change
nb.canvasWidth = 2048;
nb.canvasHeight = 1536;
nb.canvasArea = 15000;

MouseEvent.TOUCH_BEGIN = "mousedown";
MouseEvent.TOUCH_MOVE = "mousemove";
MouseEvent.TOUCH_END = "mouseup";
MouseEvent.TAP = "click";
MouseEvent.TOUCH_END_OUTSIDE = "mouseupoutside";
MouseEvent.MOUSE_OVER = "mouseover";
MouseEvent.MOUSE_OUT = "mouseout";

// 每毫升多少像素
nb.PIXELS_PER_ML = 100;
// !!!!!压强专用 每毫升多少像素
nb.PASCAL_PIXELS_PER_ML = nb.PIXELS_PER_ML / 10;
nb.PASCAL_PIXELS_PER_CM = nb.PIXELS_PER_ML / 3;
// 移动速度,移动一个像素需要多少秒
nb.SECOND_PER_PIXEL = 0.005;

// 转动速度,每转动一弧度需要多少秒
nb.SECOND_PER_RADIUS = 0.127323954;

// 透明度变换速度，透明度从 0~1 需要多少秒
nb.SECOND_PER_ALPHA = 0.8;

// 常温
nb.DEFAULT_TEMP = 25.0;

// 最低温度
nb.MIN_TEMP = -20;

// 默认溶解速率
nb.SOL_SPEED = 0.01;

nb.DEFAULT_SED_RATE = 0.995;

// --------------- 热值 -------------- //
// 热值的缩放
const HEAT_SCALE = nb.HEAT_SCALE = 1e4;
// 酒精灯燃料的热值  单位 焦耳每千克
nb.ALCOHOL_HEAT_VALUE = 3.0e7 / HEAT_SCALE;
//  本生灯燃料的热值
nb.ALCOHOL_HEAT_VALUE = 3.0e7 / HEAT_SCALE;
// 干火柴的热值
nb.WOOD_HEAT_VALUE = 1.2e7 / HEAT_SCALE;
// 镁的热值
nb.MG_HEAT_VALUE = 2.0e7 / HEAT_SCALE;
// 氢气的热值
nb.H2_HEAT_VALUE = 1.4e8 / HEAT_SCALE;
// 甲烷的热值
nb.CH4_HEAT_VALUE = 5.56e7 / HEAT_SCALE;
// 乙烯的热值
nb.C2H4_HEAT_VALUE = 5.56e7 / HEAT_SCALE;
// 一氧化碳的热值
nb.CO_HEAT_VALUE = 1.18e6 / HEAT_SCALE;
//默认比热容
nb.DEFAULT_HEAT_CAPACITY = 4200;
// 绝对零度
nb.ABSOLUTE_ZERO = -273.15;
// 溶解吸放热的每帧热值变化
nb.HEATVALUE_PER_FRAME = 40;
// --------------- 热值 -------------- //

// 酒精灯燃烧的温度
nb.TEMP_ALCOHOL = 520;
// 本生灯燃烧的温度
nb.TEMP_BUNSEN_BURNER = 850;
// 酒精灯带灯罩燃烧的温度
nb.TEMP_ALCOHOL_WIDTH_LAMP_NET = 650;
// 酒精喷灯燃烧的温度
nb.TEMP_BLAST_ALCOHOL_BURNER = 1000;
// 火柴的温度
nb.TEMP_MATCH = 400;
// 镁的温度
nb.TEMP_MG = 800;
// 氢气的温度
nb.TEMP_H2 = 1360;
// 氢气在氯气的温度
nb.TEMP_H2_Cl2 = 700;
// 硫化氢的温度
nb.TEMP_H2S = 800;
// 甲烷的温度
nb.TEMP_CH4 = 1000;
// 乙烯的温度
nb.TEMP_C2H4 = 1000;
// 一氧化碳的温度
nb.TEMP_CO = 1050;
//人体温度
nb.TEMP_HUMAN = 36;
//手指数
nb.HOT_FINGER_COUNT = 4;
//人体温度升温系数
nb.HUMAN_HOT_SCALE = 1e2;
nb.BODY_DROP_SPEED = 5;
//酒精灯焰心辐射距离
nb.DISTANCE_ALCOHOL_CENTER_FIRE = 40;
//酒精灯内焰辐射距离
nb.DISTANCE_ALCOHOL_INTER_FIRE = 80;
//酒精灯外焰辐射距离
nb.DISTANCE_ALCOHOL_OUTER_FIRE = 150;
//酒精灯最远辐射距离
nb.DISTANCE_ALCOHOL_ALL_FIRE = 320;
//酒精灯焰心温度
nb.TEMP_ALCOHOL_CENTER_FIRE = 432;
//酒精灯内焰辐射温度
nb.TEMP_ALCOHOL_INTER_FIRE = 600;
//酒精灯外焰辐射温度
nb.TEMP_ALCOHOL_OUTER_FIRE = 692;
//热力学温度 环境温度
nb.ENVIRONMENT_K = 298;
// 默认背景烟色
nb.DEFALUT_BACKGROUND_COLOR = 0x343941;

// --------------- 导热系数 --------------//
//石棉网的导热系数
nb.ASBESTOS_CONDUCTHEAT = 0.3;


// --------------- 导热系数 --------------//


// 固体每mol多少个粒子
nb.PARTICLE_COUNT_PER_MOL = 10;

// 波尔斯曼常数

// 保留的小数位
nb.PRECISION = 3;

// 浮点数误差
nb.MIN_DEVIATION = 1e-15;

nb.config = {
    URI_PREFIX: ""
};

nb.INIT_DATA = {
    totalEquipmentMessageData: ["assets/totalEquipmentMessage.json", "assets/totalEquipmentMessage.json"],
    effectData: ["assets/effect.json", "assets/effect.json"],
    nbMedicine: ["assets/nb-medicine.json", "assets/nb-medicine.json"],
    equationData: ["assets/equationData.json", "assets/equationData.json"]
};

// --------------- 压强相关系数 --------------//
// 实际上地球上的重力

nb.EARTH_GRAVITY = 9.8;
// nb.PASCAL = 110869;
nb.PASCAL = 101325;
nb.PASCAL_DISTANCE = 0;
// nb.PASCAL_MAX = 201650;
nb.PASCAL_MAX = 1e7;
// 理想气体状态方程中的比例系数
nb.R = 8.314;
nb.AIR_MM = 27;
// nape的配置参数
nb.nape = {
    group: {
        // 天平碰撞组
        BALANCE_COLLISION: 0x02,
        // 天平碰撞掩码
        BALANCE_MASK: 0x02,
        // 电子天平碰撞组
        ELE_BALANCE_MASK: 0x04,
    }
};

// 铜离子颜色
nb.COLOR_CU2 = {
    color: 0x2ca6e0,
    multiple: .4
};
// 亚铁离子颜色
nb.COLOR_FE2 = 0x9AFF02;
// 铁离子颜色
nb.COLOR_FE3 = {
    color: 0x674a5c,
    multiple: 0.05
};

// 氢氧铁离子颜色
nb.COLOR_FEOH2 = {
    color: 0xc27604,
    multiple: 50
};

// 锰离子颜色
// nb.COLOR_MN2 = 0xFFCAE5;
// 钴离子颜色
nb.COLOR_CO2 = 0xFF7FBD;
// 镍离子颜色
nb.COLOR_NI2 = 0x80FE79;
// 亚铬离子颜色
nb.COLOR_CR2 = 0x7EFEDA;
// 铬离子颜色
nb.COLOR_CR3 = {
    color: 0x3a5e40,
    multiple: 20
};
// 镉离子颜色
nb.COLOR_CD2 = 0x83FDDB;
// 金离子颜色
nb.COLOR_AU3 = 0xF8D777;

// 高锰酸根离子颜色
nb.COLOR_MNO41 = {
    color: 0x3b0057,
    multiple: 50
};
// 锰酸跟离子颜色
nb.COLOR_MNO42 = 0x70B26D;
// 重铬酸跟离子的颜色
nb.COLOR_CR2O72 = {
    color: 0xec6200,
    multiple: 2
};
// 铬酸根离子的颜色
nb.COLOR_CRO42 = {
    color: 0xf4ea00,
    multiple: 2
};

// 四氯化铜离子颜色
nb.COLOR_CU2CL4 = {
    color: 0x006727,
    multiple: 0.5
};

nb.COLOR_APPLEPIGMENT = {
    color: 0xD1B589,
    multiple: 100
};
nb.COLOR_ORANGEPIGMENT = {
    color: 0xE19114,
    multiple: 100
};
nb.COLOR_TOMATOPIGMENT = {
    color: 0xC7422C,
    multiple: 100
};

// 六苯酚合铁根离子颜色
nb["COLOR_FE(C6H5O)63"] = 0x5900a4;

// 三水杨酸合铁颜色
nb["COLOR_FE(C7H5O3)3"] = {
    color: 0x5900a4,
    multiple: 15
};

// 六苯酚合铁根离子颜色
nb["COLOR_FE(CN)63"] = 0xfeec67;

// FeOH(SCN)2 的颜色
nb["COLOR_FEOH(SCN)2"] = {
    color: 0xdd0000,
    multiple: 8000
};
// Fe(SCN)3的颜色
nb["COLOR_FE(SCN)3"] = {
    color: 0xdd0000,
    multiple: 5000
};

nb["COLOR_[CU(NH3)4](OH)2"] = {
    color: 0x0e2aaa,
    multiple: 4
};

nb["COLOR_C6H10O5"] = {
    color: 0xa95d08,
    multiple: 1
};

nb["COLOR_CHI3"] = {
    color: 0xd6aa28,
    multiple: 1e4
};

nb["COLOR_I2"] = {
    color: undefined,
    multiple: undefined,
};
nb["COLOR_NAI3"] = [{
    concentration: 1e-5,
    color: undefined,
    multiple: undefined,
}, {
    concentration: Infinity,
    color: 0xFFCD0D,
    multiple: 1e3,
}]
nb["COLOR_BR2"] = {
    color: 0x9A2B1C,
    multiple: 3
};
nb["COLOR_CL2"] = {
    color: 0xd3e14E,
    multiple: 4
};
nb["COLOR_C20H19N3"] = {
    color: 0xd92900,
    multiple: 200
};
nb["COLOR_(C17H35COO)2CA"] = {
    color: 0x444444,
    multiple: 1e15,
    solColor: 0xdddddd,
    defaultColor: 0x444444
};
// 因为有些弱电解质，它们在药品瓶中如果直接使用该药品的颜色的话，会和它们倒出的药品的颜色不同，这就需要设置一下药品瓶中的默认颜色
nb["MEDICINE_BR2%1.2&H2O%98.8"] = {
    defaultColor: 14232320,
    defaultAlpha: .8
};
nb["MEDICINE_K2CR2O7"] = {
    defaultColor: 0xef8200,
    defaultAlpha: .8
};

nb["Fe(OH)3(胶体)"] = {
    color: 0x640F0F,
    multiple: 3000,
};

nb["COLOR_MN2O7"] = {
    color: 0x09552a,
    multiple: 100
};

nb["COLOR_NA2[CUCL4]"] = [{
        concentration: 0.05,
        color: 0x007DE3,
        multiple: 200,
    },
    {
        concentration: Infinity,
        color: 0x077500,
        multiple: 200,
    }
]

nb["COLOR_NA[CUBR3]"] = {
    color: 0xAAA652,
    multiple: 200
}

nb["COLOR_NA2[CU(CH3COO)4]"] = {
    color: 0x007DE3,
    multiple: 200
}

nb["COLOR_NA2[CU(OH)4]"] = {
    color: 0x0F39A0,
    multiple: 200
}
// 石蕊花变色阶段
nb.LITMUSFLOWER_COLOR = [{
        ph: -Infinity,
        color: 0xDC147E
    }, {
        ph: 1,
        color: 0xDC147E
    }, {
        ph: 4,
        color: 0xCD1EAD
    }, {
        ph: 6,
        color: 0xBE26EB
    }, {
        ph: 7,
        color: 0xA054EB
    },

    {
        ph: 8.3,
        color: 0x5f58c0
    }, {
        ph: 10,
        color: 0x0f1fe7
    }, {
        ph: Infinity,
        color: 0x0f1fe7
    }
];
// 石蕊变色阶段
nb.LITMUS_COLOR = [{
    ph: -Infinity,
    color: 0xe41b3c
}, {
    ph: 1,
    color: 0xe41b3c
}, {
    ph: 4.5,
    color: 0xce584b
}, {
    ph: 5.5,
    color: 0x993A9D
}, {
    ph: 8,
    color: 0xBE26EB
}, {
    ph: 8.3,
    color: 0x5f58c0
}, {
    ph: 10,
    color: 0x0f1fe7
}, {
    ph: Infinity,
    color: 0x0f1fe7
}];
// 酚酞变色阶段
nb.PHENOLPHTHALEIN_COLOR = [{
    ph: -Infinity,
    color: 0xFFFFFF
}, {
    ph: 8,
    color: 0xFFFFFF
}, {
    ph: 8.2,
    color: 0xF0B0CA
}, {
    ph: 10,
    color: 0xDC147E
}, {
    ph: Infinity,
    color: 0xDC147E
}];

// 花青素变色阶段
nb.HUAQINFSU_COLOR = [{
    ph: -Infinity,
    color: 0xDE0000
}, {
    ph: 0,
    color: 0xDE0000
}, {
    ph: 1,
    color: 0xC2151E
}, {
    ph: 2,
    color: 0xC0143A
}, {
    ph: 3,
    color: 0xF67195
}, {
    ph: 4,
    color: 0xB660A1
}, {
    ph: 5,
    color: 0x935C9D
}, {
    ph: 6,
    color: 0x68529E
}, {
    ph: 7,
    color: 0x5947A0
}, {
    ph: 8,
    color: 0x213A76
}, {
    ph: 9,
    color: 0x004F65
}, {
    ph: 10,
    color: 0x0A4125
}, {
    ph: 11,
    color: 0x6B956C
}, {
    ph: 12,
    color: 0xCDBF5E
}, {
    ph: 13,
    color: 0xD8C249
}, {
    ph: 14,
    color: 0xECB445
}, {
    ph: Infinity,
    color: 0xECB445
}];

// 玫瑰花红色素变色阶段
nb.MEIGUIHUAHONGSESU_COLOR = [{
    ph: -Infinity,
    color: 0xCE5861
}, {
    ph: 7.1,
    color: 0xCE5861
}, {
    ph: 7.1000001,
    color: 0xB8A345
}, {
    ph: Infinity,
    color: 0xB8A345
}];

// 甲基橙变色阶段
nb.METHYL_ORANGE = [{
    ph: -Infinity,
    color: 0xF93606
}, {
    ph: 3.1,
    color: 0xF93606
}, {
    ph: 4.4,
    color: 0xFCEA3E
}, {
    ph: Infinity,
    color: 0xFCEA3E
}];

// 甲基红变色阶段
nb.METHYL_RED = [{
    ph: -Infinity,
    color: 0xD91F19
}, {
    ph: 4.4,
    color: 0xD91F19
}, {
    ph: 6.2,
    color: 0xF6EF05
}, {
    ph: Infinity,
    color: 0xF6EF05
}];

// ------------有机气体直接算溶于溶剂---------//
nb.ORGANICGASARY = ["CH2=CH2", "C2H2"];

// ------------算体积的溶质-----------------//
nb.INCLUDE_VOLUME = new Set(["H2SO4", "CH3COOH", "C2H5OH", "H2O", "NH3H2O", "Fe(SCN)3", "FeOH(SCN)2", "H3PO4", "HNO3"]);
// ------------化学式混合物间隔符号-----------//
nb.MIX_SYMBOL = "·";

//-------------挥发浓度----------------------//
//标准挥发浓度 12 mol/L
nb.VOLATILIZEDENSITY = 12;
//水的挥发系数
nb.WATERVOLATILIZE = 0.01;
//氨水的挥发系数
nb.NH3H2OVOLATILIZE = 0.1;
//浓度最小极限值
nb.VOLATILIZEMIN = 6;
//浓度显示最小极限值
nb.VOLATILIZEMINALPHA = 8;
//玻璃片最大能吸附水的摩尔量
nb.GLASSSHEET_WATER_MAXNUM = 0.2;

//----------------升华相关------------------------//
//碘升华最低温度
nb.SUBLIMATE_I2_MININUM = 100;
//盖在烧杯口容器（升华现象）
nb.SUBLIMATE_I2_CONTAINER = ["CopperSheet", "GlassSheet", "WatchGlass"];


//----------------空气中水蒸汽转化相关-------------------//
nb.WATER_GAS_PROPORTION = 0.3;

//-------------------单个刚体mol限制-------------------//
nb.GRAPHIC_MOL = 0.005;

//-------------------杂质相关------------------------//
//OTHER杂质
nb.OTHER_MASS_DEFAULT = 20;

//-------------------提示相关------------------------//
nb.POUR_SOLID_MAX_MOL = .7;
nb.POUR_SOLID_MAX_SOLID_COUNT = 70;
nb.TIP_SOLID_RADIUS = 5;
//-------------------杂质相关------------------------//
//-------------------当前设置的器材------------------------//
nb.currentConfigEq = null;
//----------------需要额外显示图标的器材-------------//
nb.extraConfigEq = [];
// 交互按钮的半径
nb.BUTTON_RADIUS = 36;
// 上下距离交互按钮的距离
nb.BUTTON_DIS = 80;
//-------------------液面波动-----------------------//
nb.BUBBLE_WAVE_HEIGHT = 5;
//-------------------水滴误差------------------------//
nb.dripError = 0.0000000000001;
//-------------------爆炸相关------------------------//
//可燃性气体
nb.CANBURNGAS = ["H2", "CO", "CH4", "C2H2", "H2S", "CH2=CH2"];
//仪器重量
nb.EQUIPMENT_MASSOBJ = {
    "SmallTestTube": 13, //小试管
    "BigTestTube": 25, //大试管
    "SmallBeaker": 53, //小烧杯
    "BigBeaker": 100, //大烧杯
    "HugeBeaker": 180, //超大烧杯
    "ConicalFlask100ml": 60, //100锥形瓶
    "ConicalFlask250ml": 150, //250锥形瓶
    "RoundBottomFlask": 130, //圆底烧瓶
    "SmallRoundBottomFlask": 130, //圆底烧瓶
    "FlorenceFlask": 130, //平底烧瓶
    "SeparatingFunnelBulbShape": 120, //球型分液漏斗
    "SeparatingFunnelBulbShapeWithHose": 120, // 带脚塞的分液漏斗
    "SeparatingFunnelPearShape": 120, //梨型分液漏斗
    "SeparatingFunnelStraight": 200, // 直形分液漏斗
    "GasCollectingBottle": 130, //集气瓶
    "BaseGasMedicine": 130, //气体药品瓶
    "TestTubeWithSideNeck": 30, //具支试管
    "DistillingFlask": 135, //蒸馏烧瓶
    "MeasuringCylinder10ml": 12, //量筒10ml
    "MeasuringCylinder50ml": 25, //量筒50ml
    "MeasuringCylinder100ml": 50, //量筒100ml
    "VolumetricFlask50ml": 40, //容量瓶50ml
    "VolumetricFlask100ml": 80, //容量瓶100ml
    "VolumetricFlask250ml": 120, //容量瓶250ml
    "NarrowMouthedBottle": 60, // 细口瓶
    "ElectronicBalance": 200, //电子天平
    "CopperSheet": 100, // 铜片
    "ThreeNeckedFlask": '150' // 三颈烧瓶
};
//玻璃仪器 包括配置的相关属性
nb.GLASSCONTAINER = {
    "BigTestTube": { //大试管
        detonateImage: true,
        naBoom: true
    },
    "RoundBottomFlask": { //圆底烧瓶
        detonateImage: false,
        naBoom: false
    },
    "SmallRoundBottomFlask": { //圆底烧瓶
        detonateImage: false,
        naBoom: false
    },
    "FlorenceFlask": { //圆底烧瓶
        detonateImage: false,
        naBoom: false
    },
    "SeparatingFunnelBulbShape": { //球型分液漏斗
        detonateImage: false,
        naBoom: false
    },
    "SeparatingFunnelBulbShapeWithHose": { //带胶塞的球形分液漏斗
        detonateImage: false,
        naBoom: false
    },
    "SeparatingFunnelStraight": { //球型分液漏斗
        detonateImage: false,
        naBoom: false
    },
    "GasCollectingBottle": { //集气瓶
        detonateImage: true,
        naBoom: false
    },
    "BaseGasMedicine": { //气体药品瓶
        detonateImage: true,
        naBoom: false
    },
    "SmallTestTube": { //小试管
        detonateImage: true,
        naBoom: true
    },
    "TestTubeWithSideNeck": { //具支试管
        detonateImage: true,
        naBoom: true
    },
    "BigBeaker": { //大烧杯
        detonateImage: true,
        naBoom: false
    },
    "SmallBeaker": { //小烧杯
        detonateImage: true,
        naBoom: false
    },
    "HugeBeaker": { //超大烧杯
        detonateImage: true,
        naBoom: false
    },
    "ConicalFlask100ml": { //小锥形瓶
        detonateImage: true,
        naBoom: false
    },
    "ConicalFlask250ml": { //250锥形瓶
        detonateImage: true,
        naBoom: false
    },
    "DistillingFlask": { //蒸馏烧瓶
        detonateImage: false,
        naBoom: false
    },
    "SeparatingFunnelPearShape": { //梨型分液漏斗
        detonateImage: false,
        naBoom: false
    },
    "UTubeWithSideNeck": { // U型具支试管
        detonateImage: false,
        naBoom: true
    },
    "UTube": { // U型管
        detonateImage: true,
        naBoom: true
    },
    "MeasuringCylinder10ml": { //量筒
        detonateImage: true,
        naBoom: true
    },
    "MeasuringCylinder50ml": { //量筒50ml
        detonateImage: true,
        naBoom: true
    },
    "MeasuringCylinder100ml": { //量筒100ml
        detonateImage: true,
        naBoom: true
    },
    "VolumetricFlask50ml": { //容量瓶
        detonateImage: true,
        naBoom: false
    },
    "VolumetricFlask100ml": { //容量瓶
        detonateImage: true,
        naBoom: false
    },
    "VolumetricFlask250ml": { //容量瓶
        detonateImage: true,
        naBoom: false
    },
    "HardGlassTube": { // 硬质玻璃管
        detonateImage: true,
        naBoom: false
    },
    "BigHardGlassTube": { // 硬质玻璃管
        detonateImage: true,
        naBoom: false
    },
    "AlkaliBurette": { //碱式滴定管
        detonateImage: false,
        naBoom: true
    },
    "GeiserBurette": { //酸式滴定管
        detonateImage: false,
        naBoom: true
    },
    "NarrowMouthedBottle": { // 细口瓶
        detonateImage: false,
        naBoom: false
    },
    "UShapeTube": { //单边U型管
        detonateImage: false,
        naBoom: true
    },
    "WaterBath": { //水浴
        detonateImage: false,
        naBoom: false
    },
    "WaterBathWithIronPillar": { //水浴
        detonateImage: false,
        naBoom: false
    },
    "DustExplode": { //粉尘爆炸装置
        detonateImage: true,
        naBoom: false
    }
};

nb.EQUIPMENTINTESTTUBE = ["ADropper", "LongADropper", "RotateGlassCatheter", "StraightGlassCatheter", "GlassBar", "ThermometerPlus", "Thermometer", "ShapeGlassCatheter", "TGlassCatheter",
    "YGlassCatheter", "SmallCombustionSpoon", "PlatinumWire", "CopperWire", "MagnesiumRibbon", "PlasticInjector", "BigPlasticInjector", "WoodenStick", "LongNeckFunnel", "FunnelSmall", "FunnelBig", "SeparatingFunnelPearShape",
    "SeparatingFunnelStraight"
]
// 容器的比热容
nb.EQUIPMENTSPECIFICHEAT = {
    "CopperSheet": 390 // 铜片 0.39×10^3J/(kg·℃),
};
//容器内水所占比重超过这个值容器不会爆炸
nb.CANNOTBOOMWATERDENS = 0.7;
//爆炸所需要气体达到的温度
nb.GASBOOMTEMP = 300;
// 氢气氟气总和爆炸条件占比
nb.H2F2BOOMDENS = 0.1;
// 氢气或者氟气占氢气氟气和爆炸条件占比
nb.H2ORF2BOOMDENS = 0.05;
// 氢气氟气大爆炸需要的比例
nb.H2F2BIGBOOM = 0.15;
//容器内氧气和可燃气体所占比重超过这个
nb.FIREGASBOOMDENS = 0.4;
// 可燃气体和氧气比例
nb.FIREGASANDO2DENS = {
    min: 0.14285714285714285, // 1 / 7
    max: 15, // 15 / 1 真实值是7 但是条件比较苛刻 调整为15
    betterMin: 0.5, // 1 / 2
    betterMax: 2 // 2 / 1
};
//-------------------多口的容器-----------------------//
nb.MULTI_MOUSE_CONARY = ["DistillingFlask", "DryingTubeOfCaO", "DryingTubeOfP2O5", "DryingTube"];
//-------------------连接空气容器（敞口容器）-----------//
nb.OPENAIRARY = new Set(["CopperSheet", "GlassSheet", "WatchGlass", "CombustionSpoon", "QualitativeFilterPaper", "PureCopper", "ElectronicBalance", "SmallCombustionSpoon"]);
/**可放在容器内的容器 */
nb.INNER_CONTAINER = ["CombustionSpoon", "QualitativeFilterPaper", "PureCopper", "ElectronicBalance", "SmallCombustionSpoon"];
// 空气中氧气含量
nb.AIRGASO2 = 2000000;
// 空气中氮气含量
nb.AIRGASN2 = 8000000;
//-------------------块状固体和容器碰撞相关------------//
nb.BIG_BLOCK = new Set(["C"]);
nb.CANNOT_HIT_BLOCK = new Set([
    "SeparatingFunnelPearShape", "movePortraitSwitchButton",
    "FunnelSmall", "FunnelBig", "VolumetricFlask100ml", "VolumetricFlask250mL",
    "VolumetricFlask50mL", "AlkaliBurette", "GeiserBurette", "PlasticInjector",
    "NO2Ball", "NO2BallGroup", "AirBalloon", "UDryingTube",
    "DryingTube", "TailNozzle", "KippsFunnel"
]);
nb.CANNOT_HIT_BIGBLOCK = new Set([
    "BigTestTube", "SmallTestTube", "CombustionSpoon",
    "SmallCombustionSpoon", "UTube", "TestTubeWithSideNeck",
    "ConicalFlask250ml",
    "HardGlassTube",
    "NarrowMouthedBottle",
    "UShapeTube", "UTubeWithSideNeck",
    "TestTubeWithSideNeck"
]);

//-------------------胶塞相关------------------------//
//胶塞拼装交互时变小的器材
nb.PLUGTOSMALL = new Set(["SmallTestTube", "ConicalFlask100ml", "UTube", "UTubeWithSideNeck", "UShapeTube", "HardGlassTube", "UDryingTube", "UDryingTubeOfCaO", "UTubeWithSideNeckRight", "UTubeWithSideNeckLeft", "CondenserTubeForOrganic"]);
//胶塞拼装交互时变大的器材
nb.PLUGTOHUGE = new Set(["GasCollectingBottle", "GasCollectingBottleOfDivide", "GasBottle", "BaseGasMedicine", "DryingBottle", "ElectrolysisUTubeWithSideNeck"]);
//胶塞拼装交互时恢复正常的器材
nb.PLUGTOBIG = new Set(["TestTubeWithSideNeck", "RoundBottomFlask", "SmallRoundBottomFlask", "FlorenceFlask", "DistillingFlask", "ThreeNeckedFlask", "DryingTube", "DryingTubeOfCaO", "DryingTubeOfP2O5", "BigTestTube", "ConicalFlask250ml", "BigHardGlassTube"]);
//胶塞型号
nb.PLUGSCALE = {
    hugeScale: 1.552,
    bigScale: 1,
    smallScale: 0.65
};
//-------------------吸附相关--------------------------//
//吸附过去的时间
nb.TWEENTIME = 0.2;
//-------------------玻璃片相关------------------------//
nb.LIBAREA = {
    bottleLibWidth: 95,
    left: -143,
    right: 42
};
//玻璃片 和 集气瓶和器材交互 误差处理
nb.MOVEERROR = 10;
// 暂时将硅酸也当做絮状沉淀处理
nb.FLOCPRECIPITATE = ["Cu(OH)2", "Al(OH)3", "H2SiO3", "Fe(OH)2", "Fe(OH)3", "Cu2O", "C6H5COOH", "CuSO4·5H2O"];
nb["PARTICLE_Cu(OH)2"] = {
    startColor: [1, 169, 192], //0x01a9c0
    endColor: [62, 173, 193] //0x3eadc1
};
nb["PARTICLE_Al(OH)3"] = {
    startColor: [255, 255, 255],
    endColor: [255, 255, 255]
};

// nb["PARTICLE_H2SiO3"] = {
//     startColor: [255, 255, 255],
//     endColor: [255, 255, 255]
// };

//特殊物质的颜色
nb["SPECIAL_COMBINE"] = [{
    anion: {
        name: "Cl-1",
        powValue: 2
    }, //阴离子
    cation: {
        name: "Mn2",
        powValue: 1
    }, //阳离子
    showIndex: 1,
    color: 0xFFCAE5,
    multiple: 1
}];

/**
 *
 * nb["COLOR_MNCL2"] = {
    color: 0xFFCAE5,
    multiple: 1
};
*/

// 油性物质
nb.OILMEDICINE = ["CCl4", "C8H18", "C6H6"];

// 小容器(水沸腾)
nb.SMALLCONTAINER = ["SmallTestTube", "BigTestTube", "TestTubeWithSideNeck", "MeasuringCylinder100ml", "MeasuringCylinder50ml", "MeasuringCylinder10ml"];
//-------------------显示方程式相关------------------//
// 显示离子方程式还是化学方程式
nb.isIonEquation = false;
//-------------------氢氧化钠潮解相关----------------//
// 最低透明度
nb.minDeliquesce = 0.3;
// 每帧减少得透明度
nb.deliquesceNum = nb.minDeliquesce / 400;
// 放热帧数
nb.NaOHCreaseHotMax = 200;

//-------------------试纸相关-----------------------//
//试纸基类名称组合
nb.ISPAPEREQUIPMENT = ["RedLitmusPaper", "UniversalPhIndicatorPaper", "PhenolphthaleinTestPaper", "BlueLitmusPaper", "PhenolphthaleinTestPaper"];
//-------------------气囊相关-----------------------//
//气囊放气速率 最小排气量为min 最大排气量为 min+max
nb.MAX_RELEASE_GAS = 0.00003;
nb.MIN_RELEASE_GAS = 0.00001;
//-------------------鸡蛋清相关---------------------//
nb.EGGSOLIDTEMP = 80;
nb.EGGSOLIDALPHA = 0.95;
//-------------------1000ml烧杯相关-----------------//
nb.FALLROTATION = Math.PI / 1.3;

//-------------------漏斗相关-----------------------//

// 普通反应容器
nb.NORMALCONTAINER = ["BaseGasMedicine", "SeparatingFunnelBulbShape", "SeparatingFunnelBulbShapeWithHose", "SeparatingFunnelPearShape", "SeparatingFunnelStraight", "RoundBottomFlask", "SmallRoundBottomFlask", "FlorenceFlask", "GasCollectingBottle", "SmallTestTube", "BigTestTube", "TestTubeWithSideNeck", "SmallBeaker", "BigBeaker", "HugeBeaker", "ConicalFlask250ml", "ConicalFlask100ml", "DistillingFlask", "UTubeWithSideNeck", "EvaporatingDish", "MeasuringCylinder50ml", "MeasuringCylinder10ml", "MeasuringCylinder100ml", "HardGlassTube", "BigHardGlassTube", "Flume", "Mortar", "BigEvaporatingDish", "WatchGlass"];

// 加药品时药匙不需要加到内层的容器
nb.ADDINOUTSIDECONTAINER = ["QualitativeFilterPaper", "FunnelBig", "BigEvaporatingDish", "EvaporatingDish", "CombustionSpoon", "CopperSheet", "SmallCombustionSpoon", "Mortar", "WeighingPaper", "AsbestosFreeWireGauzeSpecil"];

//-------------------可颠倒器材---------------------//
// nb.canReversalAry = []; // "IronSupport", "SeparatingFunnelBulbShape", "WoodenStick"

//-------------------特殊选择框器材-----------------//
nb.specialBoundsAry = ["RotateGlassCatheter", "IronSupport", "RubberCatheter", "GlassPiece", "Wire", "BlackWire"];

//--------------可以通过废液缸销毁的器材--------------//
nb.destoryByWasteWaterVat = ["AirBalloon", "Match", "MatchStick", "PaperChannel", "PaperFlower", "QualitativeFilterPaper", "UniversalPhIndicatorPaper", "TestPaper", "RedLitmusPaper", "BlueLitmusPaper", "PhenolphthaleinTestPaper", "StarchKITestPaper", "Cotton", "NonPorousRubberPlugBig", "AbrasivePaper", "ClothStrap", "FireWorks", "WeighingPaper", "WoodenStick", "GlassPiece", "Tissue"];

//-------------------是否是调试版本------------------//
nb.isDebug = false;

nb.__debug__version__ = "v0.0.0";
// 两帧之间大于多少毫秒就限制部分效果的显示
nb.RENDER_RESTRICT = 30;

// if (nb.isDebug) {
window.eqFind = (str) => {
    let result = [];

    chemicalMain.viewStack.eqChildren.forEach(child => {
        if (child.name === str) {
            result.push(child);
        }
    });
    if (result.length === 1) {
        return result[0];
    }
    if (result.length > 1) {
        return result;
    }
};


window.changeMol = function changeMol(num, med) {
    let obj = med.getConfigureData();
    if (obj && obj.confArr && obj.confArr[0]) {
        obj = obj.confArr[0];
        if (obj.showValue) {
            obj.showValue = num;
        }
    }
};
// }
nb.ACTIVE_COUNT = 300;

// 化学方程式默认缩放大小
nb.CHEM_EQU_INFO_DEFAULT_SCALE = 2;

// 文字显示颜色
nb.TEXT_COLOR = {
    LIGHT: 0xffffff,
    DARK: 0x343941
};

// 文字显示最大缩放
nb.INFO_TEXT_MAX_SCALE = 2;

// 变换归属类型的器材 处理instanceName
nb.EQ_CHANGE_TYPE = {
    reactor_to_aid: ["main.reactor.Flume", "main.reactor.ADropper", "main.reactor.PlasticInjector",
        "main.reactor.NO2BallGroup", "main.reactor.AirBalloon", "main.reactor.MortarPestle"
    ],
    aid_to_reactor: ["main.aid.DryingBottle", "main.aid.LongNeckFunnel", "main.aid.FunnelBig",
        "main.aid.FunnelSmall", "main.aid.UDryingTube", "main.aid.UTube", "main.aid.PlasticWashBottle",
        "main.aid.Mortar", "main.aid.DripBoard", "main.aid.CO2Bottle"
    ],
};

// 胶体药品
nb.COLLOID_MED_ARY = ["(C6H10O5)n", "Fe(OH)3(胶体)", "H2SiO3(胶体)", "变性的鸡蛋清", "变性的鸡蛋清(硝酸)", "硝化的鸡蛋清", "鸡蛋清(沉淀)", "变性的鸡蛋清(其他)", "PE(凝固)"];

// 浓硝酸最低浓度
nb.HNO3_CONC_MIN_NUM = 10;

// 植物油振荡后激活值
nb.OIL_ACTIVE_COUNT = 300;

nb.SPECIL_LABSPOON_HINT_CONTAINER = ["BigTestTube", "SmallTestTube", "RoundBottomFlask", "GasCollectingBottle", "TestTubeWithSideNeck",
    "SmallBeaker", "BigBeaker", "HugeBeaker", "ConicalFlask100ml", "ConicalFlask250ml", "WildMouthedBottle"
]

