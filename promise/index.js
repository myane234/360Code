const fs = require('fs');
const readline = require('readline');
const path = require('path');
const filepath = path.join(__dirname  , 'baca.txt');
const { readFile, write } = require('./fungsi.js');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function ask(pertanyaan) {
    //promise ada 3 kondisi, fulfilled, rejected, pending 
    // selesai, gagal, sedang berjalan
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
    } else if(pilihan === '2') {
        const isi = await ask(`Mau isi teks apa?: `);
        write(filepath, isi)
    }
}
main();


