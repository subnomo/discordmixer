import fs = require('fs');

export class ParseConfig {
    public botToken: string;
    public owner: string;
    public botName: string;
    public serverName: string;
    public channelName: string;
    public userSkip: boolean;
    public soundcloudID: string;
    public youtubeAPIKey: string;

    constructor() {
        var data: any = fs.readFileSync('config.json', 'utf8');
        var json: any = JSON.parse(data);

        this.botToken = json.bot_token;
        this.owner = json.owner;
        this.botName = json.bot_name;
        this.serverName = json.server_name;
        this.channelName = json.channel_name;
        this.userSkip = json.user_skip;
        this.soundcloudID = json.soundcloud_client_id;
        this.youtubeAPIKey = json.youtube_api_key;
    }
}

export var config = new ParseConfig();