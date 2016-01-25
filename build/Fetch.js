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
function Fetch(url, user) {
    if (matchInArray(url, youtubePatterns)) {
        var yt = new Youtube();
        yt.getSong(url, user);
    }
    return null;
}
module.exports = Fetch;
