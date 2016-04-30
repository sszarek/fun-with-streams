'use strict';

const assert = require('assert');
const MockReadableStream = require('./MockReadableStream');
const ReadByLineTransform = require('./../lib/ReadByLineTransform');

const SMALL_CHUNKS = 5;

describe('ReadByLineTransform tests', function () {
    it('should not push data when empty string passed', function (done) {
        runReadByLineTransformTest('', SMALL_CHUNKS, pushedLines => {
            assert.equal(pushedLines.length, 0);
            done();
        });
    });

    it('should push one line of data when string is not longer than chunk size and has no line breaks', function (done) {
        runReadByLineTransformTest('line', SMALL_CHUNKS, pushedLines => {
            assert.equal(pushedLines.length, 1);
            assert.equal(pushedLines[0], 'line');
            done();
        });
    });

    it('should push two lines when string is not longer than chunk size and has line break', function (done) {
        runReadByLineTransformTest('li\nne', SMALL_CHUNKS, pushedLines => {
            assert.equal(pushedLines.length, 2);
            assert.equal(pushedLines[0], 'li');
            assert.equal(pushedLines[1], 'ne');
            done();
        });
    });
    
    it('should push 3 lines when string is not longer that chunk and has 2 line breaks', function(done) {
        runReadByLineTransformTest('one\ntwo\nthree', SMALL_CHUNKS, pushedLines => {
            assert.equal(pushedLines.length, 3);
            assert.equal(pushedLines[0], 'one');
            assert.equal(pushedLines[1], 'two');
            assert.equal(pushedLines[2], 'three');
            done();
        });
    });
});

function runReadByLineTransformTest(input, chunkSize, callback) {
    let pushedLines = [];
    new MockReadableStream(input, chunkSize, { encoding: 'utf8' })
        .pipe(new ReadByLineTransform())
        .on('data', data => pushedLines.push(data))
        .on('end', () => {
            callback(pushedLines);
        });
}