var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var request = require('request');
var Service = require('../Service');
var Youtube = (function (_super) {
    __extends(Youtube, _super);
    function Youtube() {
        _super.apply(this, arguments);
    }
    Youtube.prototype.getSong = function (url, user, callback) {
        var idExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
        var id = url.match(idExp)[1];
        var apiUrl = 'https://www.googleapis.com/youtube/v3/videos?id=' + id +
            '&part=snippet&key=' + this.config.youtubeAPIKey;
        request(apiUrl, function (err, res, body) {
            if (err || res.statusCode !== 200)
                return console.error(err);
            var json = JSON.parse(body).items[0].snippet;
            var song = {
                title: json.title,
                skip: false,
                url: url
            };
            callback(song);
        });
    };
    Youtube.prototype.getPlaylist = function (url, user) {
        return null;
    };
    return Youtube;
})(Service);
module.exports = Youtube;
