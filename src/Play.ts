import fs = require('fs');
import Queue = require('./Queue');
import Song = require('./Song');
import Fetch = require('./Fetch');
import bot = require('./bot');

var queue = Queue.queue;

// Main loop
function Play(): void {
    setInterval(() => {
        queue.get({ downloaded: true }, (docs: any) => {
            if (docs.length > 0) Stream();
        });
    }, 1000);
}

function Stream(): void {
    queue.first((doc: any) => {
        var song: Song = doc[0];
        if (song.playing) return;
        if (song.skip) return queue.remove(doc[0]);

        //bot.sendMessage(messageObj, "Playing \"" + song.title + "\"");
        song.playing = true;
        queue.update(song);

        bot.voiceConnection.playFile(song.file, (err: any, stream: any) => {
            if (err) return console.error(err);

            stream.on('end', () => {
                queue.remove(doc[0]);
            });
        });
    });
}

export = Play;