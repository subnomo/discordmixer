var Discord = require('discord.js');
var Config = require('./utils/ParseConfig');
var Input = require('./Input');
var config = new Config();
var bot = new Discord.Client();
bot.on('message', function (message) {
    if (config.botName === message.author.username)
        return;
    Input(message, bot);
});
bot.login(config.email, config.password);
