/// <reference path="../../tools/typings/request/request.d.ts" />
"use strict";
import request = require('request');
import Song = require('../Song');
import Service = require('../Service');

/*
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
        };
        
        return song;
    });
}

function Youtube(url: string): Song {
    // Check if url is a playlist url
    var pExp: RegExp = /https?:\/\/www\.youtube\.com\/playlist\?list=([\w-]+)/;
    
    if (pExp.test(url)) return getPlaylist(url);
    else return getVid(url);
}*/

class Youtube extends Service {
    public async getSong(url: string, user: any) {
        var idExp: RegExp =
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
        var id: string = url.match(idExp)[1];
    
        var apiUrl: string = 
            'https://www.googleapis.com/youtube/v3/videos?id=' + id +
            '&part=snippet&key=' + this.config.youtubeAPIKey;
        
        request(apiUrl, (err, res, body) => {
            if (err || res.statusCode !== 200)
                return console.error(err);
        
            var json: any = JSON.parse(body);
        
            var song: Song = {
                title: json.title,
                skip: false,
                url: url
            };
        
            return song;
        });
        
        return null;
    }
    
    public getPlaylist(url: string, user: any): Song[] {
        return null;
    }
}

export = Youtube;