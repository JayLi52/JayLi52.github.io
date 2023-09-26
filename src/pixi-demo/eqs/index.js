const AlcoholBurner = require('./AlcoholBurner')
const Drip = require('./Drip')
const BigTestTube = require('./BigTestTube')
const Forceps = require('./Forceps')
const RoundBottomFlask = require('./RoundBottomFlask')

const eqs = {
    AlcoholBurner,
    Drip,
    BigTestTube,
    Forceps,
    RoundBottomFlask,
}
global.eqs = eqs;
module.exports = eqs;