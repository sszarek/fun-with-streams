'use strict';

const assert = require('assert');
const MockReadableStream = require('./MockReadableStream');
const ReadByLineTransform = require('./../lib/ReadByLineTransform');

const SMALL_CHUNKS = 4;

describe('ReadByLineTransform tests', function () {
    it('should not push data when empty string passed', function (done) {
        let pushedLines = [];
        new MockReadableStream('', SMALL_CHUNKS, { encoding: 'utf8' })
            .pipe(new ReadByLineTransform())
            .on('data', pushedLines.push)
            .on('end', () => {
                assert.equal(pushedLines.length, 0);
                done();
            });
    });

    it('should push one line of data when string is not longer than chunk size and has no line breaks', function (done) {
        let pushedLines = [];
        new MockReadableStream('line', SMALL_CHUNKS, { encoding: 'utf8' })
            .pipe(new ReadByLineTransform())
            .on('data', data => {
                pushedLines.push(data);
            })
            .on('end', () => {
                assert.equal(pushedLines.length, 1);
                done();
            });
    });

    it('should push two lines when string is not longer than chunk size and has line break', function (done) {
        let pushedLines = [];

        new MockReadableStream('li\nne', SMALL_CHUNKS, { encoding: 'utf8' })
            .pipe(new ReadByLineTransform())
            .on('data', pushedLines.push)
            .on('end', () => {
                assert.equal(pushedLines.length, 2);
                done();
            });
    });
});