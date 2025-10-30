const fs = require('fs');
const readline = require('readline');
const path = require('path');
const filepath = path.join(__dirname  , 'baca.txt');
const { readFile } = require('./fungsi.js');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function ask(pertanyaan) {
    return new Promise((resolve, rejects) => {
        rl.question(pertanyaan, (jawaban) => {
            resolve(jawaban);
        })
    })
}
async function main() {
    const pilihan = await ask('1. Baca File\n 2.tulis File: ');
    if(pilihan === '1') {
        readFile(filepath);
    }
}
main();


