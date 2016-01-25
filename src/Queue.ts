/// <reference path="../tools/typings/nedb/nedb.d.ts" />
import Datastore = require('nedb');
import Song = require('./Song');

class Queue {
    private db: Datastore;
    
    constructor() {
        this.db = new Datastore();
    }
    
    public add(song: Song): void {
        this.db.insert(song, (err, newDoc) => {
            if (err) return console.error(err);
        });
    }
}

export = Queue;