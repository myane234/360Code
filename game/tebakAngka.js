import fs from 'fs';
import path from 'path';
const userPath = path.join('./user.json');

async function RandomNumber(tanya) {
    const maxN = await tanya('Masukkan angka maksimal: ');
    const maxNumber = parseInt(maxN);
    const RandomInt = Math.floor(Math.random() * maxNumber);
    console.log(RandomInt)

    const hasil = await tanya(`Tebak angka sampai ${maxNumber}: `);
    if(hasil == RandomInt) {
        console.log('Selamat jawaban anda benar');
    } else {
        console.log(`Jawaban anda salah, angka yang benar ${RandomInt}`)
    }
}

async function coinFlip(tanya) {
    const hasil = await tanya('Tebak hasil koin (head/tail) or u can 1(head) 2(tail): ');
    const fliphasil = randomInt(0,2) === 0 ? 'head' : 'tail';
    if(hasil.toLowerCase() === fliphasil) {
        console.log('Selamat jawaban anda benar');
    } else {
        console.log(`Jawaban anda salah, hasil koin adalah ${fliphasil}`);
    }
}

async function Login(tanya) {
    try {
    const userName = await tanya('masukkan username: ')
    const Password = await tanya('Masukkan password: ')
    
    await fs.promises.writeFile(userPath, JSON.stringify([userName, Password]), null ,2);
    console.log(`Berhasil mengisi ${userPath} dengan data ${userName} dan ${Password}`);
    
    
    } catch (err) {
        console.error(err);
    }
}

export { RandomNumber, coinFlip, Login };