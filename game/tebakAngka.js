import fs from "fs";
import path from "path";
const userPath = path.join("./user.json");

async function RandomNumber(tanya) {
  const maxN = await tanya("Masukkan angka maksimal: ");
  const maxNumber = parseInt(maxN);
  const RandomInt = Math.floor(Math.random() * maxNumber);
  console.log(RandomInt);

  const hasil = await tanya(`Tebak angka sampai ${maxNumber}: `);
  if (hasil == RandomInt) {
    console.log("Selamat jawaban anda benar");
  } else {
    console.log(`Jawaban anda salah, angka yang benar ${RandomInt}`);
  }
}

async function coinFlip(tanya) {
  const hasil = await tanya(
    "Tebak hasil koin (head/tail) or u can 1(head) 2(tail): "
  );
  const fliphasil = randomInt(0, 2) === 0 ? "head" : "tail";
  if (hasil.toLowerCase() === fliphasil) {
    console.log("Selamat jawaban anda benar");
  } else {
    console.log(`Jawaban anda salah, hasil koin adalah ${fliphasil}`);
  }
}

async function Login(tanya) {
<<<<<<< HEAD
  try {
    const userName = await tanya("masukkan username: ");
    const Password = await tanya("Masukkan password: ");

    await fs.promises.writeFile(  
      userPath,
      JSON.stringify([userName, Password]),
      null,
      2
    );
    console.log(
      `Berhasil mengisi ${userPath} dengan data ${userName} dan ${Password}`
    );
  } catch (err) {
    console.error(err);
  }
}

async function tebakBuah(tanya) {
  try {
    const buah = ["semangka", "apel", "nanas"];
  } catch (err) {}
}

export { RandomNumber, coinFlip, Login };
=======
    try {
    const userName = await tanya('masukkan username: ')
    const Password = await tanya('Masukkan password: ')
    const Email = await tanya('Masukkan Email')

    let data = {}
    data[userName] = {
        password: Password,
        email: Email
    }

    // const jsonConvert = JSON.stringify(data, null, 2);
    
    await fs.promises.appendFile(userPath, JSON.stringify(data), null ,2);
    console.log(`Berhasil mengisi ${userPath} dengan data ${userName} dan ${Password} dan ${Email}`);
    
    
    } catch (err) {
        console.error(err);
    }
}

async function TebakBuah(tanya) {
    try{
        const buah = ['buah', 'apel', 'nanas']
        buah.forEach((isi, i) => {

        })
        return buah;
    } catch(err) {
        console.error(err)
    }
}
export { RandomNumber, coinFlip, Login, TebakBuah };
>>>>>>> 64bee91cb6ee735000a3b38e643b08148eb1a5e2
