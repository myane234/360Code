import fs from "fs";
import path from "path";
const { promises } = fs;

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

// read a file
async function readFile(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    console.log("Berhasil membaca: ", data, `\n dari ${filePath}`);
  } catch (err) {
    console.error("gagal membaca: ", err);
  }
}

// append a file
async function append(filePath, isi) {
  try {
   await fs.promises.appendFile(filePath, isi, "utf-8");
    console.log("berhasil menulis : ", isi, `ke ${filePath}`);
  } catch (err) {
    console.error("gagal menulis file: ", err);
  }
}

// read folder
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

// select file this is a global function
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

        const tanya = await ask('Pilih File:')
        const i = parseInt(tanya) -1;
        const hasil = files[i];
        return path.join(folderPath, hasil);
    } catch (err) {
        console.error(err);
    }
}

// rename file
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
      const filePath = await selectFile(folderPath, rl); //tampilin file sekaligus suru pilih return btw
      const newFilePath = await ask('nama file baru: '); // input new name file
     await fs.promises.rename(filePath, folderPath + newFilePath); // rename dengan paramate filepath lama, folderpath + newfilename
     console.log('berhasil merename file ke: ', newFilePath);
} catch(err) {
    console.error(err)
}

}


// delete file
async function deletefile(folderPath, rl) {
  try{
    const filePath = await selectFile(folderPath, rl);
    await fs.promises.unlink(filePath);
    console.log('berhasil menghapus file: ', filePath);
  } catch (err) {
    console.error(err);
  }
}

// read folder by extension
async function ReadFolderEXT(folderPath, ask) {
  try {
    const files = await fs.promises.readdir(folderPath);
    const ext = await ask('Masukan ekstensi file untuk di filter (contoh .txt): ');

    for(const file of files) {
      if(path.extname(file) == ext) {
        console.log(`file dengan ekstensi ${ext}: `, file);
      }
    }

    console.log('Total file dengan ekstensi ', ext, ': ', files.filter(file => path.extname(file) == ext).length);
  } catch(err) {
    console.error(err);
  }
}


//create file 
async function Createfile(ask, folderPath) {
  try{
    console.log('Membuat file baru');
    const filename = await ask('masukkan nama file baru: ');
    await fs.promises.writeFile(path.join(folderPath, filename), 'utf-8');
    console.log('berhasil membuat file: ', filename);
    await ReadFolder(folderPath);
  } catch(err) {
    console.error(err);
  }
}

async function Movefile(folderPath, rl) {
  try {
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
    const tujuanPath = await ask('Masukkan tujuan Path: ');

    const namaFile = path.basename(filePath);
    const tujuanFullPath = path.join(tujuanPath, namaFile);
    await fs.promises.rename(filePath, tujuanFullPath);
    console.log('berhasil memindahkan file ke: ', tujuanFullPath);
  } catch (err) {
    console.error(err);
  }
}

async function ReadFolderCustom(ask) {


  try{
 
    const FolderInput = await ask('Masukkan path folder yang ingin dibaca: ');
    const bacaFolderPath = path.resolve(FolderInput);
    if(!FolderInput) {
      throw new Error('Path folder kosong');
    } else {
    const files = await fs.promises.readdir(bacaFolderPath);
    files.forEach((files, i) => {
      console.log(i + 1, files);
    })
    }
  
  } catch (err) {
    console.error(err);
  }
}

export { readFile, append, ReadFolder, selectFile, rename,
   deletefile, ReadFolderEXT, Createfile, Movefile, ReadFolderCustom };
//rename, delete, filter extension file
