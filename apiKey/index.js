import { promises } from "dns";
import { Gemini, imgGemini } from "./gemini.js";
import readline from 'readline';
import { resolve } from "path";
import { rejects } from "assert";
import {  selectFile, ReadImg } from "./fungsi.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function ask(tanya) {
    return new Promise((resolve, rejects) => {
        rl.question(tanya, (jawaban) => {
            if(!jawaban) {
                rejects('isi')
            } else {
                resolve(jawaban)
            }
        }) 
    })
}


async function loop() {
    lj = await ask('Lanjut apa gak? (y/n): ');
    if(lj.trim().toLowerCase() === 'y') {
        await main();
    } else if(lj.trim().toLowerCase() === 'n') {
        rl.close();
    }
    else {
        console.log('yang bener kalau input');
        await loop();
    }
}


async function main() {
    try{

    console.log('====== Selamat datang di Gemini Chatbot ======');
    console.log(`1. Tanya simple\n 
        2. Membuat keyword dengan gambar: `)
        const pilihan = await ask('Pilih nomor: ');
        

    if(pilihan.toLowerCase().trim() ==='1') {
    const Prompt = await ask('kamu nanya apa?: ');

    const gemini = await Gemini(Prompt);
    console.log(gemini);
    } else if(pilihan.toLowerCase().trim() === '2') {
        const hasil = await selectFile(ask);

    } else if(pilihan.toLowerCase().trim() === '3') {
        console.log('=== Program baca gambar ===');
        await ReadImg(ask);
    } else if(pilihan.toLowerCase().trim() === '4') {
        console.log('=== Program buat gambar ===');
        const Prompt = await ask('isi prompt gambarmu: ');
        const BufferIMG = await ReadImg(ask);
        await imgGemini(Prompt, BufferIMG);
    }
    
    } catch (err) {
        console.log('ada yang error: ', err);
    }

}

main();