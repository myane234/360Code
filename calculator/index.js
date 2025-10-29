const readline = require("readline");
const { plus, minus, multiply, devide, modulus, pow } = require("./hitung.js");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function pertanyaan() {
  rl.question("Enter ur first Number: ", (firstNumber) => {
    const a = parseFloat(firstNumber);

    rl.question("Enter ur second Number: ", (secondNumber) => {
      const b = parseFloat(secondNumber);

      rl.question(
        `r u want?, 
        +,-,X,/,%,pow(pangkat) : `,
        (operation) => {
          let result;
          if (operation === "+") {
            result = plus(a, b);
          } else if (operation === "-") {
            result = minus(a, b);
            console.log(result);
          } else if (operation === "X") {
            result = multiply(a, b);
          } else if (operation === "/") {
            result = devide(a, b);
          } else if (operation === "%") {
            result = modulus(a, b);
          } else if (operation === "pangkat" || operation === "pow") {
            result = pow(a, b);
          } else {
            console.log(`Masukkin yang bener`);
            pertanyaan();
          }
          console.log(`Hasil dari ${a} ${operation} ${b}: ${result}`);
          // ubah data menjadi string if u want to write to file
          //   fs.writeFileSync("data.txt", result.toString(), "utf-8", (err) => {
          //     if (err) throw err;
          //     console.log("Berhasil tulis");
          //   });

          // using this method if u want to nambah data tanpa ubah data lama, belajar cara promise nya juga ya
          fs.appendFile(
            "data.txt",
            `Hasil dari ${a} ${operation} ${b}: ` + result.toString() + "\n",
            "utf-8",
            (err) => {
              if (err) throw err;
              console.log(
                `Berhasil menambahkan ${a} ${operation} ${b}: ${result} ke data.txt`
              );
            }
          );
          loop();
        }
      );
    });
  });
}
pertanyaan();

function loop() {
  console.log("anda masuk ke loop");
  rl.question("Mau lanjut?(y/n): ", (answer) => {
    if (answer.toLowerCase() === "y") {
      pertanyaan();
    } else if (answer.toLowerCase() === "n") {
      console.log(`Terimakasih sudah menggunakan kalkulator`);
      rl.close();
    }
  });
}
