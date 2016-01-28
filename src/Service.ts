abstract class Service {
    public abstract getSong(url: string, user: any, callback: any): any;
    
    public abstract getPlaylist(url: string, user: any, callback: any): any;
}

export = Service;