import Config = require('./utils/ParseConfig');
import Song = require('./Song');

abstract class Service {
    public config: Config;
    
    constructor() {
        this.config = new Config();
    }
    
    public abstract getSong(url: string, user: any, callback: any): any;
    
    public abstract getPlaylist(url: string, user: any, callback: any): any;
}

export = Service;