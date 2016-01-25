var Config = require('./utils/ParseConfig');
var config = new Config();
var youtubePlaylistPattern = 'https?:\/\/www\.youtube\.com\/playlist\?list=([\w-]+)';
var youtubeVideoPatterns = [
    'https?:\/\/www\.youtube\.com\/watch\?v=([\w-]+)(\&t=\d*m?\d*s?)?',
    'https?:\/\/youtube\.com\/watch\?v=([\w-]+)(\&t=\d*m?\d*s?)?',
    'https?:\/\/youtu.be\/([\w-]+)(\?t=\d*m?\d*s?)?',
    'https?:\/\/youtube.com\/v\/([\w-]+)(\?t=\d*m?\d*s?)?',
    'https?:\/\/www.youtube.com\/v\/([\w-]+)(\?t=\d*m?\d*s?)?',
];
function Fetch() {
}
module.exports = Fetch;
