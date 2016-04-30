'use strict';

const Transform = require('stream').Transform;

module.exports = class ReadByLineTransform extends Transform{
    constructor() {
        super({objectMode: true});
        
        this._buffer = '';
        this._shouldFlush = false;
    }
    
    _transform(chunk, encoding, callback) {
        let lines = chunk.split(/\r?\n/g);
        let lastLine = lines.pop();
        
        if (lines.length !== 0) {
            this.push(this._buffer, ...lines);
        }
        
        if (lastLine) {
            this._buffer = this._buffer.concat(lastLine);
            this._shouldFlush = true;
        }
        
        callback();
    }
    
    _flush(callback) {
        if(this._shouldFlush) {
            this.push(this._buffer);    
        }
        
        callback();
    }
};