async function TebakAngkaNext(tanya) {
    try {
        const angka = [];
        const maxN = await tanya("Masukkan angka maksimal: ");
        if(isNaN(maxN) || maxN <= 3) {
            console.log('Input harus berupa angka dan lebih dari 3');
            throw new Error('Input harus berupa angka');
        }
        const maxNumber = parseInt(maxN) +1;
        for (let i = 1; i < maxNumber; i++) {
            angka.push(i);
        } 
        console.log(angka);
        const tebakan1 = await tanya(`Tebak angka dari 1 sampai ${maxNumber -1}: `);
        const tebakan2 = await tanya(`Tebak angka dari 1 sampai ${maxNumber -1}: `);
        const tebakan3 = await tanya(`Tebak angka dari 1 sampai ${maxNumber -1}: `);
        const Random1 = Math.floor(Math.random() * (maxNumber));
        const Random2 = Math.floor(Math.random() * (maxNumber));
        const Random3 = Math.floor(Math.random() * (maxNumber));
        console.log(angka);
        if(tebakan1 == Random1 && tebakan2 == Random2 && tebakan3 == Random3) {
            console.log("Selamat jawaban anda benar");
            console.log(`${Random1}, ${Random2}, ${Random3}`);
        } else {
            console.log(`Jawaban anda salah, angka yang benar ${Random1}, ${Random2}, ${Random3}`);
        }
    } catch(err) {
        console.error(err)
    }
}

export { TebakAngkaNext };