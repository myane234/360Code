const fs = require('fs');
const path = require('path');
const readline = require('readline');
const FolderPath = path.join(__dirname,'../promise/data');
let filepath ;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

async function tanya(question) {
    return new Promise((resolve, rejects) => {
        rl.question(question, (answer) => {
            if(!answer) {
                rejects('jawaban kosong');
            } else {
                resolve(answer);
            }
        })
    })
 }

async function main() {
    
    try {
        const files = await read(FolderPath); // nunggu hasil dari read dan nampilin file yang di return dari read()
        
        const ask = await tanya('Mau file mana?: '); // nunggu jawaban dari tanya()

        const hasil = parseInt(ask) -1; // ubah jawaban menjadi int dan -1

        filepath = path.join(files[hasil]);// gabungin file path dari hasil array files[hasil]

        console.log('isi file: ', filepath); // print filepath sekarang

        rl.close();
    } catch(err) {
        console.error('terjadi kesalahan: ', err);
        rl.close();
    }

}

async function read(FolderPath) {

    try{
        const files = await fs.promises.readdir(FolderPath);
        files.forEach((file, i) => {
            console.log(`${i + 1}. ${file}`);
        });
        return files;
    }catch(err) {
        console.error('gagal membaca folder: ', err);
    }
}
async function rename(newPath, filepath) {
    try {
        await fs.promises.rename(filepath, newPath);
        
    } catch(err) {

    }
}
main();
