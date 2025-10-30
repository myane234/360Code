const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, 'baca.txt');

async function readFile(filePath) {
    fs.promises.readFile(filePath, 'utf-8')
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error reading file:', error);
    })
}

module.exports = { readFile };