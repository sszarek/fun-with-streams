'use strict';

const Transform = require('stream').Transform;

module.exports = class ReadByLineTransform extends Transform{
    constructor() {
        super({objectMode: true});
        
        this._buffer = '';
    }
    
    _transform(chunk, encoding, callback) {
        let lines = chunk.split(/\r?\n/g);
        
        this.push(this._buffer, ...lines.slice(0, lines.length - 1));
        this._buffer = lines[lines.length - 1];
        
        callback();
    }
    
    _flush(callback) {
        callback(null, this._buffer);
    }
};