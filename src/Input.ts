import Parse = require('./utils/ParseCommand');
import Command = require('./commands');
import Fetch = require('./Fetch');
import Queue = require('./Queue');
import Song = require('./Song');

var queue = new Queue();

function Input(message: any): string {
    var cmd: Command = Parse(message.content);
    if (cmd === -1) return null;
    
    var res: string = "";
    
    switch (cmd.toString()) {
        case Command[Command.add]:
            res = add(message);
            break;
        case Command[Command.pause]:
            res = pause(message);
            break;
        case Command[Command.resume]:
            res = resume(message);
            break;
        case Command[Command.skip]:
            res = skip(message);
            break;
        case Command[Command.shuffle]:
            res = shuffle(message);
            break;
        case Command[Command.volume]:
            res = volume(message);
            break;
        case Command[Command.help]:
            res = help(message);
            break;
    }
    
    return res;
}

function add(message: any): string {
    var mArray: string[] = message.content.split(" ");
    
    if (mArray.length < 3)
        return "Error: Expected 3 arguments, got " + mArray.length;
    
    var song: Song = Fetch(mArray[2]);
    
    queue.add(song);
}

function pause(message: any): string {
    return "Not implemented.";
}

function resume(message: any): string {
    return "Not implemented.";
}

function skip(message: any): string {
    return "Not implemented.";
}

function shuffle(message: any): string {
    return "Not implemented.";
}

function volume(message: any): string {
    return "Not implemented.";
}

function help(message: any): string {
    return "Not implemented.";
}

export = Input;