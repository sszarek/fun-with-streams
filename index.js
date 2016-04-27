'use strict';

const fs = require('fs');
const ReadByLineTransform = require('./lib/ReadByLineTransform');
const LineNumberTransform = require('./lib/LineNumberTransform');
const args = Array.prototype.slice.call(process.argv, 2);

if (args.length === 0) {
    console.error('Provide file name.');
    process.exit(1);
}

const file = args[0];
fs.exists(file, exists => {
    if (!exists) {
        return console.error(`File: ${file} does not exist.`);
    }

    displayFile();
});

function displayFile() {
    fs.createReadStream(file, { encoding: 'utf8', highWaterMark: 16 })
        .pipe(new ReadByLineTransform())
        .pipe(new LineNumberTransform())
        .on('data', function (data) {
            console.log(data);
        })
        .on('end', function() {
            console.log('Finished reading file.');
        });
}




