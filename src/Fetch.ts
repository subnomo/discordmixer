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

function Fetch(url: string, user: any, callback: any): void {
    // Decide which service user wants to play from
    if (matchInArray(url, youtubePatterns)) {
        var yt = new Youtube();
        yt.getSong(url, user, (song: Song) => {
            callback({
                title: song.title,
                skip: song.skip,
                requester: user.username,
                url: song.url
            });
        });
    }
    
    return null;
}

export = Fetch;