/// <reference path="../tools/typings/rimraf/rimraf.d.ts" />
import rimraf = require('rimraf');
import Parse = require('./utils/ParseCommand');
import Config = require('./utils/ParseConfig');
import Command = require('./commands');
import Fetch = require('./Fetch');
import Queue = require('./Queue');
import Song = require('./Song');
import Play = require('./Play');

var queue = new Queue();
var config = new Config();
var bot: any;

function Input(message: any, dbot: any): void {
    bot = dbot;
    Play(queue, bot);
    
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
        case Command[Command.kill]:
            kill(message);
            break;
    }
}

function add(message: any): void {
    var mArray: string[] = message.content.split(" ");
    
    if (mArray.length < 3)
        bot.reply(message, "Error: Expected 3 arguments, got 2.");
    
    Fetch.fetch(mArray[2], message.author, (song: Song) => {
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
        if (doc.length === 0 || song.requester !== message.author.username)
            return bot.reply(message, "Nothing to skip.");
        
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

function kill(message: any): void {
    if (message.author.username === config.owner) {
        bot.voiceConnection.destroy();
        rimraf('./songs/*', (err: any) => {
            if (err) console.error(err);
            process.exit();
        });
    }
}

export = Input;