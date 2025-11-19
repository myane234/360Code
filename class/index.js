import { resolve } from "path";
import user from "./user.js";
import readline from 'readline';
import { rejects } from "assert";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const tanya = (prompt) => {
    return new Promise((resolve, rejects) => {
        rl.question(prompt, (hasil) => {
            if(!hasil) {
                return rejects('jawaban kosong');
            } else {
                return resolve(hasil);
            }
        })
    })
}
const u = new user("myane", 20)

console.log(u.console())