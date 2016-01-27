/// <reference path="../../tools/typings/request/request.d.ts" />
import request = require('request');
import Song = require('../Song');
import Service = require('../Service');

class Youtube extends Service {
    public getSong(url: string, user: any, callback: any): void {
        var idExp: RegExp =
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
        var id: string = url.match(idExp)[1];
    
        var apiUrl: string = 
            'https://www.googleapis.com/youtube/v3/videos?id=' + id +
            '&part=snippet&key=' + this.config.youtubeAPIKey;
        
        request(apiUrl, (err, res, body) => {
            if (err || res.statusCode !== 200)
                return console.error(err);
            
            // TODO: Handle multiple results
            var json: any = JSON.parse(body).items[0].snippet;
        
            var song: Song = {
                title: json.title,
                skip: false,
                url: url,
                added: new Date()
            };
        
            callback(song);
        });
    }
    
    // TODO: Implement playlist
    public getPlaylist(url: string, user: any): Song[] {
        return null;
    }
}

export = Youtube;