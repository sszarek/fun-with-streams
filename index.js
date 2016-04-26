'use strict';

const fs = require('fs');
const args = Array.prototype.slice.call(process.argv, 2);

if (args.length === 0) {
    console.error('Provide file name.');
    process.exit(1);
}




