'use strict';

const Readable = require('stream').Readable;

module.exports = class MockStream extends Readable {
    constructor(mockdata) {
        super();

        this._mockData = mockdata;
        this._curDataIndex = 0;
    }

    _read() {
        if (this._curDataIndex < this._mockData.length) {
            this.push(this._mockData[this._curDataIndex]);
            this._curDataIndex++;
        } else {
            this.push(null);
        }
    }
};