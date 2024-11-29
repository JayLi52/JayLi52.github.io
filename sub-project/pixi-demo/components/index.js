const nb = {};

nb.SetInteractiveToFalse = require('./nb.SetInteractiveToFalse')
nb.SetRenderableToFalse = require('./nb.SetRenderableToFalse')
nb.setAllowGetBoundsToFalse = require('./nb.setAllowGetBoundsToFalse')


global.nb = nb;

module.exports = nb;