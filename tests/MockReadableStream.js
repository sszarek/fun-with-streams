'use strict';

const Readable = require('stream').Readable;

module.exports = class MockReadableStream extends Readable {
    constructor(mockdata, chunksize, options) {
        super(options);

        this._mockData = mockdata;
        this._chunkSize = chunksize;
        this._curDataIndex = 0;
    }

    _read() {
        if (this._curDataIndex < this._mockData.length) {
            this.push(this._mockData.slice(this._curDataIndex, this._curDataIndex + this._chunkSize));
            this._curDataIndex += this._chunkSize;
        } else {
            this.push(null);
        }
    }
};