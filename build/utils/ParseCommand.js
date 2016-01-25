var Command = require('../commands');
function ParseCommand(message) {
    var mArray = message.split(" ");
    if (mArray[0] !== "!dmix" || mArray.length < 2)
        return -1;
    for (var member in Command) {
        if (mArray[1] === member) {
            return member;
        }
    }
    return -1;
}
module.exports = ParseCommand;
