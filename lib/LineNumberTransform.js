'use strict';

const Transform = require('stream').Transform;

module.exports = class LineNumberTransform extends Transform {
    constructor() {
        super({objectMode: true, highWaterMark: 16});
        
        this._linesCnt = 0;
    }
    
    _transform(data, encoding, callback) {
        this._linesCnt++;
        this.push(`${this._linesCnt} | ${data}`);        
        callback();
    }
}