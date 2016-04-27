'use strict';

const assert = require('assert');
const MockStream = require('./MockStream');
const ReadByLineTransform = require('./../lib/ReadByLineTransform');

describe('ReadByLineTransform tests', function () {
    it('should not push data if no chunks passed', function () {
        let linesRead = 0;
        new MockStream([])
            .pipe(new ReadByLineTransform())
            .on('data', data => linesRead++)
            .on('end', () => {
                assert.equal(linesRead, 0);
                done();
            });
    });

    it('should push one line of data if one chunk passed', function () {
        let linesRead = 0;
        new MockStream(['line'])
            .pipe(new ReadByLineTransform())
            .on('data', data => linesRead++)
            .on('end', () => {
                assert.equal(linesRead, 1);
                done();
            });
    });
});