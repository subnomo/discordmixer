import Song = require('../Song');
import Service = require('../Service');
import fs = require('fs');
var ytdl = require('ytdl-core');

class Youtube extends Service {
    public getSong(url: string, callback: any): void {
        ytdl.getInfo(url, (err: any, info: any) => {
            if (err) return console.error(err);

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
        var title: string = new Buffer(song.title).toString('base64');
        var file: string = "./songs/" + title + ".m4a";
        var dlStream = ytdl(song.url, { quality: 141 })
            .on('end', () => {
                if (callback) callback(file);
            })
            .on('error', (err: any) => {
                // In case format 141 is unavailable, we have a backup
                dlStream.destroy();

                file = "./songs/" + title + ".webm";

                var dlStream2 = ytdl(song.url, { quality: 251 })
                    .on('end', () => {
                        if (callback) callback(file);
                    })
                    .on('error', (err: any) => {
                        // As a last resort download the video file as well
                        dlStream2.destroy();
                        
                        file = "./songs/" + title + ".mp4";

                        ytdl(song.url, { quality: 18 })
                            .on('end', () => {
                                if (callback) callback(file);
                            }).pipe(fs.createWriteStream(file));
                    })
                    .pipe(fs.createWriteStream(file));
            })
            .pipe(fs.createWriteStream(file));
    }
    
    // TODO: Implement playlist
    public getPlaylist(url: string, callback: any): void {
        return null;
    }
}

export = Youtube;