const path = require("path");
const fs = require("fs");
const { promises } = require("dns");

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
    const data = await fs.promises.readFile(filePath, "utf-8");
    console.log("Berhasil membaca: ", data, `\n dari ${filePath}`);
  } catch (err) {
    console.error("gagal membaca: ", err);
  }
}
async function append(filePath, isi) {
  try {
   await fs.promises.appendFile(filePath, isi, "utf-8");
    console.log("berhasil menulis : ", isi, `ke ${filePath}`);
  } catch (err) {
    console.error("gagal menulis file: ", err);
  }
}

async function ReadFolder(folderPath) {
  try {
    const files = await fs.promises.readdir(folderPath);
    files.forEach((files, i) => {
      console.log(i + 1, files);
    });
    return files;
  } catch (err) {
    console.error("gagal membaca folder: ", err);
  }
}

async function selectFile(folderPath, rl) {
    try {

        const files = await ReadFolder(folderPath);
        const ask = (prompt) => new Promise((resolve, rejects)=> {
            rl.question(prompt, (hasil) => {
                if(!hasil) {
                    rejects('jawaban kosong');
                } else {
                    resolve(hasil);
                }
            })
        })

        const tanya = await ask('Pilih File')
        const i = parseInt(tanya) -1;
        const hasil = files[i];
        return path.join(folderPath, hasil);
    } catch (err) {
        console.error(err);
    }
}

async function rename(folderPath, rl) {

    try{
      const ask = (prompt) => {
        return new Promise((resolve, rejects) => {
          rl.question(prompt, (jawaban) => {
            if(!jawaban) {
              rejects('jawaban kosong');
            } else {
              resolve(jawaban);
            }
          })
        })
      }
      const filePath = await selectFile(folderPath, rl);
      const newFilePath = await ask('nama file baru: ');
     await fs.promises.rename(filePath, folderPath + newFilePath);
} catch(err) {
    console.error(err)
}

}
module.exports = { readFile, append, ReadFolder, selectFile, rename };

//rename, delete, filter extension file
