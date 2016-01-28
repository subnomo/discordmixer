import Song = require('./Song');
import Youtube = require('./services/Youtube');

var yt = new Youtube();

// Youtube url regular expressions (thanks to @matthieugrieger, creator of mumbledj)
var youtubeExps: RegExp[] = [
	/https?:\/\/www\.youtube\.com\/watch\?v=([\w-]+)(\&t=\d*m?\d*s?)?/,
	/https?:\/\/youtube\.com\/watch\?v=([\w-]+)(\&t=\d*m?\d*s?)?/,
	/https?:\/\/youtu.be\/([\w-]+)(\?t=\d*m?\d*s?)?/,
	/https?:\/\/youtube.com\/v\/([\w-]+)(\?t=\d*m?\d*s?)?/,
	/https?:\/\/www.youtube.com\/v\/([\w-]+)(\?t=\d*m?\d*s?)?/
];

var ytPlaylistExp = /https?:\/\/www\.youtube\.com\/playlist\?list=([\w-]+)/;

function matchInArray(str: string, expressions: RegExp[]) {
    for (var i in expressions)
        if (expressions[i].test(str)) return true;
    
    return false;
}

export function fetch(url: string, user: any, callback: any): void {
    // Decide which service user wants to play from
    if (matchInArray(url, youtubeExps)) {
        yt.getSong(url, (song: Song) => {
            callback({
                title: song.title,
                skip: song.skip,
                downloaded: song.downloaded,
                playing: song.playing,
                requester: user.username,
                url: song.url,
                added: song.added
            });
        });
    }
}

export function download(song: Song, callback?: any): void {
    if (matchInArray(song.url, youtubeExps)) {
        if (callback) yt.downloadSong(song, callback);
        else yt.downloadSong(song);
    }
}