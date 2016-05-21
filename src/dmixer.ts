/// <reference path="../typings/main.d.ts" />
var Discord = require('discord.js');
import Config = require('./utils/ParseConfig');
import Input = require('./Input');
import bot = require('./bot');

var config = Config.config;

bot.on('ready', () => {
    var channel = bot.servers.get('name', config.serverName)
        .channels.get('name', config.channelName);
    
    bot.joinVoiceChannel(channel, (err: any) => {
        if (err) return console.error(err.message);
    });
});

bot.on('message', (message: any) => {
    if (config.botName === message.author.username) return;
    
    Input(message);
});

bot.loginWithToken(config.botToken);