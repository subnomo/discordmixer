var Discord = require('discord.js');
import Config = require('./utils/ParseConfig');
import Input = require('./Input');

var config = new Config();
var bot = new Discord.Client();

bot.on('message', function (message: any) {
    if (config.botName === message.author.username) return;
    
    Input(message, bot);
});

bot.login(config.email, config.password);