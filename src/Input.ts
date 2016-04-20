import rimraf = require('rimraf');
import Parse = require('./utils/ParseCommand');
import Config = require('./utils/ParseConfig');
import Command = require('./commands');
import Fetch = require('./Fetch');
import Queue = require('./Queue');
import Song = require('./Song');
import Play = require('./Play');
import bot = require('./bot');

var config = Config.config;
var queue = Queue.queue;

Play();

function add(message: any): void {
    var mArray: string[] = message.content.split(" ");
    
    if (mArray.length < 3)
        bot.reply(message, "Error: Expected 3 arguments, got 2.");
    
    Fetch.fetch(mArray[2], message.author, (song: Song) => {
        if (song === null)
            return bot.reply(message,
                "Sorry, discordmixer doesn't support that source.");
        
        queue.add(song, (doc: any) => {
            bot.reply(message, "Added \"" + song.title + "\" to the queue.");
            
            Fetch.download(song, (file: any) => {
                song.downloaded = true;
                song.file = file;
                
                queue.update(song);
            });
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
    if (!config.userSkip && message.author.username !== config.owner)
        return;
        
    queue.first((doc: any) => {
        var song: Song = doc[0];
        if (doc.length === 0) return bot.reply(message, "Nothing to skip.");
        
        if (song.playing) {
            queue.remove(doc, (numRemoved: number) => {
                bot.reply(message, "Skipping \"" + song.title + "\".");
                bot.voiceConnection.stopPlaying();
            });
        }
    });
}

function wrongsong(message: any): void { 
    queue.pop((doc: any) => {
        var song: Song = doc[0];
        if (doc.length === 0 || song.requester !== message.author.username)
            return bot.reply(message, "Nothing to skip.");
        
        if (!song.playing) {
            song.skip = true;
            queue.update(song, (numReplaced: number) => {
                bot.reply(message, "\"" + song.title + "\" removed from queue.");
            });
        }
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

function kill(message: any): void {
    if (message.author.username === config.owner) {
        bot.voiceConnection.destroy();
        rimraf('./songs/*', (err: any) => {
            if (err) console.error(err);
            process.exit();
        });
    }
}

function Input(message: any): void {
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
        case Command[Command.wrongsong]:
            wrongsong(message);
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
        case Command[Command.kill]:
            kill(message);
            break;
    }
}

export = Input;