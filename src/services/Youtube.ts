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
        var title = new Buffer(song.title).toString('base64');
        var file = "./songs/" + title + ".m4a";
        var dlStream = ytdl(song.url, { quality: 141 })
            .on('end', () => {
                if (callback) callback(file);
            })
            .on('error', (err: any) => {
                // In case format 141 is unavailable, we have a backup
                dlStream.destroy();
                
                file = "./songs/" + title + ".mp4";

                ytdl(song.url, { quality: 22 })
                    .on('end', () => {
                        if (callback) callback(file);
                    }).pipe(fs.createWriteStream(file));
            })
            .pipe(fs.createWriteStream(file));
    }
    
    // TODO: Implement playlist
    public getPlaylist(url: string, callback: any): void {
        return null;
    }
}

export = Youtube;