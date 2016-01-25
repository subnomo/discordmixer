declare function require(name:string);
var Discord = require('discord.js');

var bot = new Discord.Client();

bot.on('message', function (message: any) {
    if (message.content === 'ping') {
        bot.reply(message, 'pong');
    }
});

bot.login('email', 'password');