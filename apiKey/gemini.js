import dotenv from 'dotenv';
import {ReadImg} from "./fungsi.js";
import readline from 'readline';
import {GoogleGenerativeAI} from "@google/generative-ai";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
function ask(question) {
    return new Promise((resolve, rejects) => {
        rl.question(question, (answer) => {
            if(!answer) {
                rejects('jawaban kosong');
            } else {
                resolve(answer);
            }
        })
    });
}
/**
 * Fungsi untuk ambil AI response dari Gemini dengan auto-switch key
 * @param {string} prompt - teks yang dikirim user
 * @returns {Promise<string>} - hasil balasan AI
 */


dotenv.config();
const apiKey = process.env.keys;

async function Gemini(Prompt) {
    const genAI = new GoogleGenerativeAI(apiKey)

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});
        const result = await model.generateContent(Prompt);
        const text = result.response.text();

        if(text) {
            console.log('process');
            return text;
        }
        else {
            throw new Error('process kosong');
        }
    } catch(err) {
        console.error(err);
    }
}

async function imgGemini(Prompt, BufferIMG) {
    const genAI = new GoogleGenerativeAI(apiKey);
    const img = BufferIMG.toString('base64');
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-image-flash' });
        const result = await model.generateContent({
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: Prompt },
                        { 
                            inlineData: {
                                mimeType: 'image/jpg',
                                data: img
                            } 

                        }
                    ]
                }
            ]
        })
        const text = result.response.text();
        if(text) {
            console.log('process gambar berhasil');
            return text;
        } else {
            throw new Error('process gambar kosong');
        }
    } catch(err) {
        console.error(err);
    }
}

export {Gemini, imgGemini, }