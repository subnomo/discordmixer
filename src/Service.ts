import Song = require('./Song');

abstract class Service {
    public abstract getSong(url: string, user: any, callback: any): any;
    
    public abstract getPlaylist(url: string, user: any, callback: any): any;
    
    public abstract downloadSong(song: Song, callback?: any): void;
}

export = Service;