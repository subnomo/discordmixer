var Datastore = require('nedb');
var Queue = (function () {
    function Queue() {
        this.db = new Datastore();
    }
    Queue.prototype.add = function (song, callback) {
        this.db.insert(song, function (err, newDoc) {
            if (err)
                return console.error(err);
            if (callback)
                callback(newDoc);
        });
    };
    Queue.prototype.get = function (callback) {
        this.db.find({}).sort({ added: 1 }).exec(function (err, docs) {
            if (err)
                return console.error(err);
            callback(docs);
        });
    };
    Queue.prototype.pop = function (callback) {
        this.db.find({ skip: false }).sort({ added: -1 }).limit(1)
            .exec(function (err, doc) {
            if (err)
                return console.error(err);
            callback(doc);
        });
    };
    Queue.prototype.update = function (doc, callback) {
        this.db.update({ _id: doc._id }, doc, { upsert: true }, function (err, numReplaced, upsert) {
            if (err)
                return console.error(err);
            if (callback)
                callback(numReplaced, upsert);
        });
    };
    return Queue;
})();
module.exports = Queue;
