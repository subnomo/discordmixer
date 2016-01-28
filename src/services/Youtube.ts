import Song = require('../Song');
import Service = require('../Service');
import fs = require('fs');
var ytdl = require('ytdl-core');

class Youtube extends Service {
    public getSong(url: string, callback: any): void {
        ytdl.getInfo(url, (err: any, info: any) => {
            var song: Song = {
                title: info.title,
                skip: false,
                downloaded: false,
                playing: false,
                url: url,
                thumb: info.iurl,
                added: new Date()
            };
        
            callback(song);
        });
    }
    
    public downloadSong(song: Song, callback?: any): void {
        var file = "./songs/" + song.title + ".m4a";
        ytdl(song.url, { quality: 141 })
            .on('end', () => {
                if (callback) callback(file);
            }).pipe(fs.createWriteStream(file));
    }
    
    // TODO: Implement playlist
    public getPlaylist(url: string, callback: any): void {
        return null;
    }
}

export = Youtube;