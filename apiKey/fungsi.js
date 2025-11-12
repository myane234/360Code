import path from 'path';
import fs from 'fs';
const { fileURLToPath } = await import('url');
const __filename = fileURLToPath(import.meta.url);  
const __dirname = path.dirname(__filename);

const folderPath = path.join(__dirname, './Gambar');
    

async function ReadFolder() {
    try{

    const file = await fs.promises.readdir(folderPath);
    file.forEach((data, index) => {
        console.log(`${index + 1}. ${data}`); // just tampilan aslinya masi dari 0
    }) 
    return file;
} catch (err) {
    console.log('ada yang error: ', err);
}
}

async function selectFile(ask) {
    try{
        const hasilBaca = await ReadFolder();
        const pilih = await ask(`Kamu milih gambar mana?: `);
        const iPilih = parseInt(pilih) -1;
        if(iPilih < 0 || iPilih >= hasilBaca.length) {
            throw new Error('Pilihan diluar jangkauan');
        } else {
            const namaFile = hasilBaca[iPilih];
            console.log(`Kamu memilih file: ${namaFile}`);
            return path.join(folderPath, namaFile);
        }
    } catch(err) {
    console.log('ada yang error: ', err);
    }
}

async function ReadImg(ask) {
    try{
        const fullPathimg = await selectFile(ask);
        const hasilBacaImg = await fs.promises.readFile(fullPathimg, { encoding: 'base64' });
        return hasilBacaImg;
    } catch(err) {

    }
}

export { ReadFolder, selectFile, ReadImg };