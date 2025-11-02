import { promises } from "dns";
import { Gemini } from "./gemini.js";
import readline from 'readline';
import { resolve } from "path";
import { rejects } from "assert";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function ask(tanya) {
    return new Promise((resolve, rejects) => {
        rl.question(tanya, (jawaban) => {
            if(!jawaban) {
                rejects('isi')
            } else {
                resolve(jawaban)
            }
        }) 
    })
}


async function main() {
    try{
    const Prompt = await ask('kamu nanya apa?: ');

    const gemini = await Gemini(Prompt);
    console.log(gemini);
    } catch(errr) {
        console.error(err);
    } finally {
        console.log('berhasil')
        rl.close();
    }
}

main();