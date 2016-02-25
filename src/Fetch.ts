import Song = require('./Song');
import Youtube = require('./services/Youtube');
import Soundcloud = require('./services/Soundcloud');

var yt = new Youtube();
var sc = new Soundcloud();

// Regular expressions (thanks to @matthieugrieger, creator of mumbledj)
var youtubeExps: RegExp[] = [
	/https?:\/\/www\.youtube\.com\/watch\?v=([\w-]+)(\&t=\d*m?\d*s?)?/,
	/https?:\/\/youtube\.com\/watch\?v=([\w-]+)(\&t=\d*m?\d*s?)?/,
	/https?:\/\/youtu.be\/([\w-]+)(\?t=\d*m?\d*s?)?/,
	/https?:\/\/youtube.com\/v\/([\w-]+)(\?t=\d*m?\d*s?)?/,
	/https?:\/\/www.youtube.com\/v\/([\w-]+)(\?t=\d*m?\d*s?)?/
];

var ytPlaylistExp = /https?:\/\/www\.youtube\.com\/playlist\?list=([\w-]+)/;

var soundcloudSongPattern =
    /https?:\/\/(www\.)?soundcloud\.com\/([\w-]+)\/([\w-]+)(#t=\n\n?(:\n\n)*)?/;
var soundcloudPlaylistPattern =
    /https?:\/\/(www\.)?soundcloud\.com\/([\w-]+)\/sets\/([\w-]+)/;

function matchInArray(str: string, expressions: RegExp[]) {
    for (var i in expressions)
        if (expressions[i].test(str)) return true;
    
    return false;
}

export function fetch(url: string, user: any, callback: any): void {
    // Decide which service user wants to play from
    if (matchInArray(url, youtubeExps)) {
        yt.getSong(url, (song: Song) => {
            song.requester = user.username;
            callback(song);
        });
    } else if (soundcloudSongPattern.test(url)) {
        sc.getSong(url, (song: Song) => {
            song.requester = user.username;
            callback(song);
        });
    } else {
        callback(null);
    }
}

export function download(song: Song, callback?: any): void {
    if (matchInArray(song.url, youtubeExps)) {
        if (callback) yt.downloadSong(song, callback);
        else yt.downloadSong(song);
    } else if (soundcloudSongPattern.test(song.url)) {
        if (callback) sc.downloadSong(song, callback);
        else sc.downloadSong(song);
    }
}