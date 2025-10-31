const fs = require('fs');
const readline = require('readline');
const path = require('path');
const { readFile, append, ReadFolder } = require('./fungsi.js');
const filepath = path.join(__dirname, 'baca.txt');
const folderpath = path.join(__dirname, 'data');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function ask(pertanyaan) {
    //promise ada 3 kondisi, fulfilled, rejected, pending 
    // selesai, gagal, sedang berjalan
    return new Promise((resolve, rejects) => {
        rl.question(pertanyaan, (jawaban) => {
            if(!jawaban) {
                rejects('jawaban kosong');
            } else {
                resolve(jawaban);
            }
        })
    })
}

async function loop() {
    const askLoop = await ask('Mau lanjut (y/n)?: ');

    if(askLoop.toLowerCase().trim() === 'y' || askLoop.toLowerCase().trim() ==='yes') {
        console.log('Lanjut ke menu utama');
        main();
    } else {
        console.log('Terima kasih sudah menggunakan program ini');
        rl.close();
    }
}

// menu utama 
async function main() {
    try {
    const pilihan = await ask(`
        1.Baca File\n
        2.tulis File\n
        3.Baca Folder : `);
    if(pilihan === '1') {
        await readFile(filepath);
    } else if(pilihan === '2') {
        const isi = await ask(`Mau isi teks apa?: `);
        await append(filepath, isi + '\n');
    } else if(pilihan === '3') {
        await ReadFolder(folderpath);
    }
    await loop();

} catch (err) {
    console.error(err);-
    await main();
}
}
main()


