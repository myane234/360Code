import readline from 'readline';
import { RandomNumber, coinFlip, Login, TebakBuah } from './tebakAngka.js';
import { TebakAngkaNext } from './suit.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function tanya(txt) {
    return new Promise((resolve, rejects) => {
        rl.question(txt, (hasil) => {
            if(!hasil) {
                rejects('Jawaban tidak boleh kosong')
                rl.close();
            } else {
                resolve(hasil)
            }
        })
    })
}

async function loop() {
    const jawaban = await tanya('Mau main lagi (y/n)? ');
    if(jawaban.toLowerCase() === 'y') {
        await menu();
    } else {
        console.log('Terima kasih sudah bermain');
        rl.close();
    }
}

async function menu() {
    const Menu = await tanya(`======Pilih Game====== \n 
        1.Tebak Angka\n
        2.Head Or tail\n
        3.log in:\n
        4.TebakBuah\n
        5.TebakAngkaNext\n
        Masukkan pilihan anda: `);
    switch(Menu) {
        case '1':
        await RandomNumber(tanya);
        await loop();
        break;
        case '2':
        await coinFlip(tanya);
        await loop();
        break;
        case '3':
            await Login(tanya);
            await loop();
        break;
        case '4':
            const buah = await TebakBuah(tanya);
            console.log(buah)
            await loop();
            break;
        case '5':
            await TebakAngkaNext(tanya);
            await loop();
            break;
        default:
        console.log('Pilihan tidak tersedia');
        break;  
    }
}

menu();