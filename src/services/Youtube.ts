/// <reference path="../../tools/typings/request/request.d.ts" />
import request = require('request');
import Song = require('../Song');
import Config = require('../utils/ParseConfig');

var config = new Config();

function getPlaylist(url: string): Song {
    return;
}

function getVid(url: string): Song {
    var idExp: RegExp =
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
    var id: string = url.match(idExp)[1];
    
    var apiUrl: string = 
        'https://www.googleapis.com/youtube/v3/videos?id=' + id +
        '&part=snippet&key=' + config.youtubeAPIKey;
        
    request(apiUrl, (err, res, body) => {
        if (err || res.statusCode !== 200)
            return console.error(err);
        
        var json: any = JSON.parse(body);
        
        var song: Song = {
            title: json.title,
            skip: false,
            url: url
        }
    });
    
    return;
}

function Youtube(url: string): Song {
    // Check if url is a playlist url
    var pExp: RegExp = /https?:\/\/www\.youtube\.com\/playlist\?list=([\w-]+)/;
    
    if (pExp.test(url)) return getPlaylist(url);
    else return getVid(url);
}

export = Youtube;