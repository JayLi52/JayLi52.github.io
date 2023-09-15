var NBCommand = {}

NBCommand.DRAG_COVER = 'b2effa21f1863f1cd457ad355b882018';
// NBCommand.interactive.MOUSE_CURSOR_ENABLED = '4bf40f70152cf061641bddd4dba69303';

NBCommand.registerCommand = function(manager) {
	manager.registerCommand(NBCommand.DRAG_COVER, require('./DragCoverCommand.js'))
	// manager.registerCommand(NBCommand.interactive.MOUSE_CURSOR_ENABLED, require('./MouseCursorEnabledCommand.js'))

}
window.NBCommand = NBCommand;
module.exports = NBCommand;