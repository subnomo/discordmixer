var Parse = require('./utils/ParseCommand');
var Command = require('./commands');
var Fetch = require('./Fetch');
var Queue = require('./Queue');
var queue = new Queue();
var bot;
function Input(message, dbot) {
    bot = dbot;
    var cmd = Parse(message.content);
    if (cmd === -1)
        return null;
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
function add(message) {
    var mArray = message.content.split(" ");
    if (mArray.length < 3)
        bot.reply(message, "Error: Expected 3 arguments, got 2.");
    Fetch(mArray[2], message.author, function (song) {
        if (song === null)
            bot.reply(message, "Sorry, discordmixer doesn't support that source.");
        queue.add(song, function (doc) {
            bot.reply(message, "Added \"" + song.title + "\" to the queue.");
        });
    });
}
function pause(message) {
    return;
}
function resume(message) {
    return;
}
function skip(message) {
    queue.pop(function (doc) {
        var song = doc[0];
        if (doc.length === 0) {
            bot.reply(message, "Nothing to skip.");
            return;
        }
        song.skip = true;
        queue.update(song, function (numReplaced) {
            bot.reply(message, "Skipped \"" + song.title + "\".");
        });
    });
}
function shuffle(message) {
    return;
}
function volume(message) {
    return;
}
function help(message) {
    return;
}
module.exports = Input;
