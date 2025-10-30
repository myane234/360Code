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

async function append(filepath, isi) {
    fs.promises.appendFile(filepath, isi , "utf-8")
    .then(() => {
        console.log(`data berhasil di tulis:`, isi);
    })
    .catch(err => {
        console.error('gagal menulis file:', err); 
    })
}

module.exports = { readFile, append };