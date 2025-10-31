const path = require('path');
const fs = require('fs');

// use callback asychronus
// async function readFile(filePath) {
//     fs.promises.readFile(filePath, 'utf-8')
//     .then(data => {
//         console.log('Berhasil nulis data: ',data, `ke ${filePath}`);
//     })
//     .catch(error => {
//         console.error('Error reading file:', error);
//     })
// }

// async function append(filepath, isi) {
//     fs.promises.appendFile(filepath, isi , "utf-8")
//     .then(() => {
//         console.log(`data berhasil di tulis:`, isi);
//     })
//     .catch(err => {
//         console.error('gagal menulis file:', err); 
//     })
// }


//asychronus dengan await not callback
async function readFile(filePath) {
    try {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    console.log('Berhasil membaca: ', data, `dari ${filePath}`);
    } 
    catch (err) {
        console.error('gagal membaca: ', err);
    }
}
async function append(filePath, isi) {
    try{
        fs.promises.appendFile(filePath, isi, 'utf-8');
        console.log('berhasil menulis : ', isi, `ke ${filePath}`);
    } 
    catch (err) {
        console.error('gagal menulis file: ', err);
    }
}

async function ReadFolder(folderPath) {
    try {
        const files = await fs.promises.readdir(folderPath);
        files.forEach((files, i) => {
            console.log(i + 1, files);
        });
    } catch(err) {
        console.error('gagal membaca folder: ', err);
    }
}



module.exports = { readFile, append, ReadFolder };