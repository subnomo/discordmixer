"use strict";
var fs = require('fs');
class ParseConfig {
    constructor() {
        var data = fs.readFileSync('config.json', 'utf8');
        var json = JSON.parse(data);
        this.email = json.email;
        this.password = json.password;
        this.owner = json.owner;
        this.botName = json.botname;
        this.youtubeAPIKey = json.YOUTUBE_API_KEY;
    }
}
module.exports = ParseConfig;
