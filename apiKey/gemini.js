import dotenv from 'dotenv';
import {GoogleGenerativeAI} from "@google/generative-ai";

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

export {Gemini}