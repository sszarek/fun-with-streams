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
            if (this._buffer.length > 0) {
                this.push(this._buffer);
            }
            this.push(...lines);
        } else {
            this.push(lastLine);
            return callback();
        }
        
        if (lastLine) {
            this._buffer = this._buffer.concat(lastLine);
        }
        
        callback();
    }
    
    _flush(callback) {
        if(this._buffer.length > 0) {
            this.push(this._buffer);    
        }
        
        callback();
    }
};