var Youtube = require('./services/Youtube');
var youtubePatterns = [
    /https?:\/\/www\.youtube\.com\/watch\?v=([\w-]+)(\&t=\d*m?\d*s?)?/,
    /https?:\/\/youtube\.com\/watch\?v=([\w-]+)(\&t=\d*m?\d*s?)?/,
    /https?:\/\/youtu.be\/([\w-]+)(\?t=\d*m?\d*s?)?/,
    /https?:\/\/youtube.com\/v\/([\w-]+)(\?t=\d*m?\d*s?)?/,
    /https?:\/\/www.youtube.com\/v\/([\w-]+)(\?t=\d*m?\d*s?)?/,
    /https?:\/\/www\.youtube\.com\/playlist\?list=([\w-]+)/
];
function matchInArray(str, expressions) {
    for (var i in expressions)
        if (expressions[i].test(str))
            return true;
    return false;
}
function Fetch(url) {
    if (matchInArray(url, youtubePatterns)) {
        var song = Youtube(url);
        return song;
    }
    return null;
}
module.exports = Fetch;
