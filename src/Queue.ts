/// <reference path="../tools/typings/nedb/nedb.d.ts" />
import Datastore = require('nedb');
import Song = require('./Song');

class Queue {
    private db: Datastore;
    
    constructor() {
        this.db = new Datastore();
    }
    
    public add(song: Song, callback?: any): void {
        this.db.insert(song, (err, newDoc) => {
            if (err) return console.error(err);
            if (callback) callback(newDoc);
        });
    }
    
    public get(callback: any): void {
        this.db.find({}).sort({ added: 1 }).exec((err: any, docs: any) => {
            if (err) return console.error(err);
            callback(docs);
        });
    }
    
    public pop(callback: any): void {
        this.db.find({ skip: false }).sort({ added: -1 }).limit(1)
            .exec((err: any, doc: any) => {
            if (err) return console.error(err);
            callback(doc);
        });
    }
    
    public update(doc: any, callback?: any): void {
        this.db.update({ _id: doc._id }, doc, { upsert: true },
            (err: any, numReplaced: number, upsert: any) => {
            if (err) return console.error(err);
            if (callback) callback(numReplaced, upsert);
        });
    }
}

export = Queue;