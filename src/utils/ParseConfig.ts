/// <reference path="../../tools/typings/node/node.d.ts" />
import fs = require('fs');

class ParseConfig {
    public email: string;
    public password: string;
    public owner: string;
    public botName: string;
    public youtubeAPIKey: string;

    constructor() {
        var data: any = fs.readFileSync('config.json', 'utf8');
        var json: any = JSON.parse(data);

        this.email = json.email;
        this.password = json.password;
        this.owner = json.owner;
        this.botName = json.botname;
        this.youtubeAPIKey = json.YOUTUBE_API_KEY;
    }
}

export = ParseConfig;