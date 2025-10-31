const path = require('path');
const fs = require('fs');
const filepath = path.join(__dirname, 'memek.txt');

async function rename() {
    try {
        let newPath = 'data/memek.txt';
        await fs.promises.rename(filepath, newPath);
        console.log('berhasil merename file', newPath);
    }catch (err) {
        console.error('gagal merename file: ', err);
    }
}

rename();