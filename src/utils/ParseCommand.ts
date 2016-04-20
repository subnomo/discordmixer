import Command = require('../commands');

function ParseCommand(message: string): Command {
    var mArray: string[] = message.split(" ");

    if (mArray[0] !== "!dmix" || mArray.length < 2) return -1;

    // Check to see if command given by user exists
    for (var member in Command) {
        if (mArray[1] === member) {
            return member;
        }
    }

    return -1;
}

export = ParseCommand;