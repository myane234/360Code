import { rejects } from 'assert';
import readline from 'readline';
import fs from 'fs';
import { TebakAngkaNext } from './suit.js';

const userPath = './user.json';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


function tanya(prompt) {
    return new Promise((resolve, rejects) => {
        rl.question(prompt, (answer) => {
            if(answer) {
                resolve(answer);
            } else {
                rejects('Jawaban tidak boleh kosong');
            }
        });
    })
}

async function menu() {
    const check = await tanya("login atau register (l/r)? ");

    if(check.toLowerCase() === 'r') {
        await register()
        rl.close();
    } else {
        await login();
        rl.close();
    }
}

//fungsi

async function login() {
    try {
        const userName = await tanya('Masukkan Username: ');
        const password = await tanya('Masukkan Password: ');

        const data = await fs.promises.readFile(userPath, 'utf-8');
        const users = JSON.parse(data);

        const user = users.find(user => user.username === userName && user.password === password);
        if(user) {
            console.log('Login berhasil!');
            await game();
        } else {
            console.log('Username atau password salah!');
            rl.close();
        }
    } catch(err) {
        console.error(err);
    }
}


async function register() {
     try {
        const username = await tanya('Masukkan Username: ');
        const password = await tanya('Masukkan Password: ');

        const data = await fs.promises.readFile(userPath, 'utf-8');
        const users = JSON.parse(data);

        const kesedianUser = users.find(user => user.username === username);

        if(kesedianUser) {
            console.log('Username sudah terdaftar, silakan coba lagi.');
        } else {
            const newUser = {
                user_id: users.length + 1,
                username: username,
                password: password
            };
        users.push(newUser);

        await fs.promises.writeFile(userPath, JSON.stringify(users, null, 2));
        console.log('Registrasi berhasil!');
        }        

        }
         catch(err) {
        console.error(err);
     }
}


async function game() {
    console.log("Selamat datang di game!");
    await TebakAngkaNext(tanya);
}

menu();