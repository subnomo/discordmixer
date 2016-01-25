var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
var Parse = require('./utils/ParseCommand');
var Command = require('./commands');
var Fetch = require('./Fetch');
var Queue = require('./Queue');
var queue = new Queue();
function Input(message) {
    var cmd = Parse(message.content);
    if (cmd === -1)
        return null;
    var res = "";
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
function add(message) {
    var mArray = message.content.split(" ");
    if (mArray.length < 3)
        return "Error: Expected 3 arguments, got " + mArray.length;
    var song = Fetch(mArray[2], message.author);
    if (song === null)
        return "Sorry, discordmixer doesn't support that source.";
    queue.add(song);
}
function pause(message) {
    return "Not implemented.";
}
function resume(message) {
    return "Not implemented.";
}
function skip(message) {
    return "Not implemented.";
}
function shuffle(message) {
    return "Not implemented.";
}
function volume(message) {
    return "Not implemented.";
}
function help(message) {
    return "Not implemented.";
}
module.exports = Input;
