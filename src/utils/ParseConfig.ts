/// <reference path="../../tools/typings/node/node.d.ts" />
import fs = require('fs');

export class ParseConfig {
    public email: string;
    public password: string;
    public owner: string;
    public botName: string;
    public serverName: string;
    public channelName: string;
    public userSkip: boolean;

    constructor() {
        var data: any = fs.readFileSync('config.json', 'utf8');
        var json: any = JSON.parse(data);

        this.email = json.email;
        this.password = json.password;
        this.owner = json.owner;
        this.botName = json.botname;
        this.serverName = json.server_name;
        this.channelName = json.channel_name;
        this.userSkip = json.userskip;
    }
}

export var config = new ParseConfig();