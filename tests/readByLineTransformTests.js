'use strict';

const assert = require('assert');
const MockReadableStream = require('./MockReadableStream');
const ReadByLineTransform = require('./../lib/ReadByLineTransform');

const SMALL_CHUNKS = 4;

describe('ReadByLineTransform tests', function () {
    it('should not push data if no chunks passed', function (done) {
        let linesRead = 0;
        new MockReadableStream('', SMALL_CHUNKS, { encoding: 'utf8' })
            .pipe(new ReadByLineTransform())
            .on('data', data => linesRead++)
            .on('end', () => {
                assert.equal(linesRead, 0);
                done();
            });
    });

    it('should push one line of data if one chunk passed', function (done) {
        let linesRead = 0;
        new MockReadableStream('line', SMALL_CHUNKS, { encoding: 'utf8' })
            .pipe(new ReadByLineTransform())
            .on('data', data => linesRead++)
            .on('end', () => {
                assert.equal(linesRead, 1);
                done();
            });
    });
});