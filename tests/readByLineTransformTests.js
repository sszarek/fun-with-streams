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

    it('should push 1 line of data when string has no line breaks', function (done) {
        runReadByLineTransformTest('line', SMALL_CHUNKS, pushedLines => {
            assert.equal(pushedLines.length, 1);
            assert.equal(pushedLines[0], 'line');
            done();
        });
    });

    it('should push 2 lines when string has 1 line break', function (done) {
        runReadByLineTransformTest('li\nne', SMALL_CHUNKS, pushedLines => {
            assert.equal(pushedLines.length, 2);
            assert.equal(pushedLines[0], 'li');
            assert.equal(pushedLines[1], 'ne');
            done();
        });
    });
    
    it('should push 3 lines when string has 2 line breaks', function(done) {
        runReadByLineTransformTest('one\ntwo\nthree', SMALL_CHUNKS, pushedLines => {
            assert.equal(pushedLines.length, 3);
            assert.equal(pushedLines[0], 'one');
            assert.equal(pushedLines[1], 'two');
            assert.equal(pushedLines[2], 'three');
            done();
        });
    });
    
    it('should push 1 line when string has no line breaks and its length excedds chunk size', function (done) {
        runReadByLineTransformTest('line1line2line3', SMALL_CHUNKS, pushedLines => {
            assert.equal(pushedLines.length, 1);
            assert.equal(pushedLines[0], 'line1line2line3');
            done();
        });
    });
    
    it('should push 2 lines when string has 1 line breaks and its length excedds chunk size', function (done) {
        runReadByLineTransformTest('line1line2\nline3', SMALL_CHUNKS, pushedLines => {
            assert.equal(pushedLines.length, 2);
            assert.equal(pushedLines[0], 'line1line2');
            assert.equal(pushedLines[1], 'line3');
            done();
        });
    });
    
    it('should push 3 lines when string has 2 line breaks between lines', function(done) {
        runReadByLineTransformTest('line1\n\nline2', SMALL_CHUNKS, pushedLines => {
            assert.equal(pushedLines.length, 2);
            assert.equal(pushedLines[0], 'line1');
            assert.equal(pushedLines[1], '');
            assert.equal(pushedLines[2], 'line2');
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