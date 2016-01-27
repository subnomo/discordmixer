import Parse = require('./utils/ParseCommand');
import Command = require('./commands');
import Fetch = require('./Fetch');
import Queue = require('./Queue');
import Song = require('./Song');

var queue = new Queue();
var bot: any;

function Input(message: any, dbot: any): void {
    bot = dbot;
    
    var cmd: Command = Parse(message.content);
    if (cmd === -1) return null;
    
    switch (cmd.toString()) {
        case Command[Command.add]:
            add(message);
            break;
        case Command[Command.pause]:
            pause(message);
            break;
        case Command[Command.resume]:
            resume(message);
            break;
        case Command[Command.skip]:
            skip(message);
            break;
        case Command[Command.shuffle]:
            shuffle(message);
            break;
        case Command[Command.volume]:
            volume(message);
            break;
        case Command[Command.help]:
            help(message);
            break;
    }
}

function add(message: any): void {
    var mArray: string[] = message.content.split(" ");
    
    if (mArray.length < 3)
        bot.reply(message, "Error: Expected 3 arguments, got 2.");
    
    Fetch(mArray[2], message.author, (song: Song) => {
        if (song === null)
            bot.reply(message,
                "Sorry, discordmixer doesn't support that source.");
        
        queue.add(song, (doc: any) => {
            bot.reply(message, "Added \"" + song.title + "\" to the queue.");
        });
    });
}

function pause(message: any): void {
    return;
}

function resume(message: any): void {
    return;
}

function skip(message: any): void {
    queue.pop((doc: any) => {
        var song: Song = doc[0];
        if (doc.length === 0) {
            bot.reply(message, "Nothing to skip.");
            return;
        }
        
        song.skip = true;
        queue.update(song, (numReplaced: number) => {
            bot.reply(message, "Skipped \"" + song.title + "\".");
        });
    });
}

function shuffle(message: any): void {
    return;
}

function volume(message: any): void {
    return;
}

function help(message: any): void {
    return;
}

export = Input;