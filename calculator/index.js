const readline = require('readline');
const { plus, minus, multiply, devide } = require('./hitung.js');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function pertanyaan() {
rl.question('Enter ur first Number', (a) => {
    const firstNumber = parseFloat(a);

    rl.question('Enter ur second Number', (b) => {
        const secondNumber = parseFloat(b);

    rl.question(`r u want?, plus, minus, multiply, devide `, (operation) => {

        let result;
        if (operation === 'plus')  {
            result = plus(a,b);
        }
        else if(operation === 'minus') {
            result = minus(a,b);
            console.log(result)
        }

        else if(operation === 'multiply') {
            result = multiply(a,b);
        }
        else if(operation === 'devide') {
          result = devide(a,b);
        } else {
            console.log(`Masukkin yang bener`);
            pertanyaan();
        }
        console.log(`Hasil dari ${a} ${operation} ${b}: ${result}`);
        fs.writeFile('data.txt', result, 'utf-8', (err) => {
            if (err) throw err;
            console.log('Berhasil tulis');
        })
        loop();
    })
    })
})
}
pertanyaan();

function loop() {
    console.log('anda masuk ke loop')
    rl.question('Mau lanjut?(y/n)', (answer) => {
        if (answer.toLowerCase() === 'y') {
            pertanyaan();
        } else if(answer.toLowerCase() === 'n') {
            console.log(`Terimakasih sudah menggunakan kalkulator`)
            rl.close();
        }
    })
}
