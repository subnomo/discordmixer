import fs = require('fs');

export class ParseConfig {
    public botToken: string;
    public owner: string;
    public botName: string;
    public serverName: string;
    public channelName: string;
    public userSkip: boolean;
    public soundcloudID: string;

    constructor() {
        var data: any = fs.readFileSync('config.json', 'utf8');
        var json: any = JSON.parse(data);

        this.botToken = json.bot_token;
        this.owner = json.owner;
        this.botName = json.botname;
        this.serverName = json.server_name;
        this.channelName = json.channel_name;
        this.userSkip = json.userskip;
        this.soundcloudID = json.SOUNDCLOUD_ID;
    }
}

export var config = new ParseConfig();