import request = require('request');
import Song = require('../Song');
import Service = require('../Service');
import fs = require('fs');
import Config = require('../utils/ParseConfig');

var config = Config.config;

class Soundcloud extends Service {    
    public getSong(url: string, callback: any): void {
        var resURL: string = "http://api.soundcloud.com/resolve?url=" + url;
        resURL += "&client_id=" + config.soundcloudID;
        request(resURL, (err, res, body) => {
            if (err || res.statusCode !== 200) return console.error(err);
            
            var data: any = JSON.parse(body);
            var song: Song = {
                title: data.title,
                skip: false,
                downloaded: false,
                playing: false,
                url: url,
                streamable_url: data.stream_url,
                thumb: data.artwork_url,
                added: new Date()
            };
            
            callback(song);
        });
    }
    
    public getPlaylist() {
        //
    }
    
    public downloadSong(song: Song, callback?: any): void {
        var url: string = song.streamable_url + "?client_id=" +
            config.soundcloudID;

        var title: string = new Buffer(song.title).toString('base64');
        var file: string = "./songs/" + title + ".mp3";
            
        request(url)
            .on('response', () => {
                if (callback) callback(file);
                console.log("Done downloading.");
            })
            .pipe(fs.createWriteStream(file));
    }
}

export = Soundcloud;