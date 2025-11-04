import readline from 'readline';
import { RandomNumber, coinFlip, Login, TebakBuah } from './tebakAngka.js';

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

async function menu() {
    const Menu = await tanya(`======Pilih Game====== \n 
        1.Tebak Angka\n
        2.Head Or tail\n
        3.log in: `)
    switch(Menu) {
        case '1':
        await RandomNumber(tanya);
        break;
        case '2':
        await coinFlip(tanya);
        break;
        case '3':
            await Login(tanya);
        break;
        case '4':
            const buah = await TebakBuah(tanya);
            console.log(buah)
            break;
        default:
        console.log('Pilihan tidak tersedia');
        break;  
    }
}

menu();