import Song = require('./Song');
import Youtube = require('./services/Youtube');

// Youtube url regex patterns (thanks to @matthieugrieger, creator of mumbledj)
var youtubePatterns: RegExp[] = [
	/https?:\/\/www\.youtube\.com\/watch\?v=([\w-]+)(\&t=\d*m?\d*s?)?/,
	/https?:\/\/youtube\.com\/watch\?v=([\w-]+)(\&t=\d*m?\d*s?)?/,
	/https?:\/\/youtu.be\/([\w-]+)(\?t=\d*m?\d*s?)?/,
	/https?:\/\/youtube.com\/v\/([\w-]+)(\?t=\d*m?\d*s?)?/,
	/https?:\/\/www.youtube.com\/v\/([\w-]+)(\?t=\d*m?\d*s?)?/,
    /https?:\/\/www\.youtube\.com\/playlist\?list=([\w-]+)/
];

function matchInArray(str: string, expressions: RegExp[]) {
    for (var i in expressions)
        if (expressions[i].test(str)) return true;
    
    return false;
}

function Fetch(url: string): Song {
    // Decide which service user wants to play from
    if (matchInArray(url, youtubePatterns)) {
        var song: Song = Youtube(url);
        return song;
    }
    
    return null;
}

export = Fetch;