/**
 *
 * Created by onlyjyf on 8/10/16.
 */
class ICommand {
    execute() {
        throw "必须重写该方法";
    }
}

module.exports = ICommand;
