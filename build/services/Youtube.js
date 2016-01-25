var request = require('request');
var Config = require('../utils/ParseConfig');
var config = new Config();
function getPlaylist(url) {
    return;
}
function getVid(url) {
    var idExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
    var id = url.match(idExp)[1];
    var apiUrl = 'https://www.googleapis.com/youtube/v3/videos?id=' + id +
        '&part=snippet&key=' + config.youtubeAPIKey;
    request(apiUrl, function (err, res, body) {
        if (err || res.statusCode !== 200)
            return console.error(err);
        var json = JSON.parse(body);
        var song = {
            title: json.title,
            skip: false,
            url: url
        };
    });
    return;
}
function Youtube(url) {
    var pExp = /https?:\/\/www\.youtube\.com\/playlist\?list=([\w-]+)/;
    if (pExp.test(url))
        return getPlaylist(url);
    else
        return getVid(url);
}
module.exports = Youtube;
