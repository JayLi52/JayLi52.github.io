const AlcoholBurner = require('./AlcoholBurner')
const ADropper = require('./ADropper')
const BigTestTube = require('./BigTestTube')
const Forceps = require('./Forceps')
const RoundBottomFlask = require('./RoundBottomFlask')

const eqs = {
    AlcoholBurner,
    ADropper,
    BigTestTube,
    Forceps,
    RoundBottomFlask,
}
global.eqs = eqs;
module.exports = eqs;