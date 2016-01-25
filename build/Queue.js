var Datastore = require('nedb');
var Queue = (function () {
    function Queue() {
        this.db = new Datastore();
    }
    Queue.prototype.add = function (song) {
        this.db.insert(song, function (err, newDoc) {
            if (err)
                return console.error(err);
        });
    };
    return Queue;
})();
module.exports = Queue;
