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
var Discord = require('discord.js');
var Config = require('./utils/ParseConfig');
var Input = require('./Input');
var config = new Config();
var bot = new Discord.Client();
bot.on('message', function (message) {
    if (config.botName === message.author.username)
        return;
    var response = Input(message);
    if (response !== null && response !== "")
        bot.reply(message, response);
});
bot.login(config.email, config.password);
