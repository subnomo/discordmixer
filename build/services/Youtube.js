"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
var request = require('request');
var Service = require('../Service');
class Youtube extends Service {
    getSong(url, user) {
        return __awaiter(this, void 0, Promise, function* () {
            var idExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
            var id = url.match(idExp)[1];
            var apiUrl = 'https://www.googleapis.com/youtube/v3/videos?id=' + id +
                '&part=snippet&key=' + this.config.youtubeAPIKey;
            request(apiUrl, (err, res, body) => {
                if (err || res.statusCode !== 200)
                    return console.error(err);
                var json = JSON.parse(body);
                var song = {
                    title: json.title,
                    skip: false,
                    url: url
                };
                return song;
            });
            return null;
        });
    }
    getPlaylist(url, user) {
        return null;
    }
}
module.exports = Youtube;
