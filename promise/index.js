import fs from "fs";
import readline from "readline";
import path from "path";
import { fileURLToPath } from "url";
import { readFile, append, ReadFolder, selectFile, rename, deletefile, ReadFolderEXT, Createfile } from "./fungsi.js";
// const filepath = path.join(__dirname, "baca.txt");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const folderpath = path.join(__dirname, "data/");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(pertanyaan) {
  //promise ada 3 kondisi, fulfilled, rejected, pending
  // selesai, gagal, sedang berjalan
  return new Promise((resolve, rejects) => {
    rl.question(pertanyaan, (jawaban) => {
      if (!jawaban) {
        rejects("jawaban kosong");
      } else {
        resolve(jawaban);
      }
    });
  });
}

async function loop() {
  const askLoop = await ask("Mau lanjut (y/n)?: ");

  if (
    askLoop.toLowerCase().trim() === "y" ||
    askLoop.toLowerCase().trim() === "yes"
  ) {
    console.log("Lanjut ke menu utama");
    main();
  } else {
    console.log("Terima kasih sudah menggunakan program ini");
    rl.close();
  }
}

// menu utama
async function main() {
  try {
    const pilihan = await ask(`
        1.Baca File\n
        2.tulis File\n
        3.Baca Folder\n
        4.Rename File \n
        5.Piramid\n
        6.Delete file\n 
        7.Read by ext: `);
    if (pilihan === "1") {
      //baca file
      const filePath = await selectFile(folderpath, rl);
      await readFile(filePath);
    } else if (pilihan === "2") {
      //add Teks
      const filePath = await selectFile(folderpath, rl);
      const isi = await ask(`Mau isi teks apa?: `);
      await append(filePath, isi + "\n");
    } else if (pilihan === "3") {
      // Read Folder
      await ReadFolder(folderpath);
    } else if(pilihan === "4") {
        await rename(folderpath ,rl)
    } else if (pilihan === "5") {
      try {
        const tanya = await ask("piramid *: contoh 3 baris: ");
        const hasil = parseInt(tanya);
        for (let i = 0; i < hasil; i++) {
          // loop sampai lebih kecil dari i yaitu 0
          // misal input 3
          let baris = "";
          for (let j = 0; j <= i; j++) {
            baris += "*";
          }
          console.log(baris);
        }
      } catch (err) {
        console.error("masalah di: ", err);
      }
    } else if (pilihan === "6") {
      await deletefile(folderpath, rl);
    } else if(pilihan === "7"){
      await ReadFolderEXT(folderpath, ask);
    } else if(pilihan === '8') {
      await Createfile(ask, folderpath);
    }
    // if berhasil buka loop untuk pertanyaan lanjur or out
    await loop();
  } catch (err) {
    console.error(err);
    await main();
  }
}
main();

//node js
