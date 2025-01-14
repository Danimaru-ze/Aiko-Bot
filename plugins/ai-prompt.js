/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY XENZ
* CODE BY XENZ
* NAMA SCRIPT MIYAKO-TSUKIYUKI
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN XENZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/

import crypto from 'crypto';
import FormData from 'form-data';
import fetch from 'node-fetch'; 

export async function imgToPrompt(buffer) {
    const randomBytes = crypto.randomBytes(5).toString("hex");
    const formData = new FormData();
    formData.append("image", buffer, `${randomBytes}.jpg`);
    
    const response = await fetch("https://www.videotok.app/api/free-image-to-prompt", {
        method: "POST",
        headers: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
            Referer: "https://www.videotok.app/image-to-prompt"
        },
        body: formData
    });
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const output = await response.json();
    return output?.choices?.[0]?.message?.content;
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    if (!m.quoted) throw `*Example:* ${usedPrefix + command} *[ Reply Image ]*`;
    if (!mime.startsWith('image/')) throw `*Please reply to an image!*`;

    m.reply('Processing...'); // Notification for processing

    try {
        const imageBuffer = await m.quoted.download();
        const response = await imgToPrompt(imageBuffer);
        m.reply(response);
    } catch (error) {
        m.reply(`Error: ${error.message}`);
    }
}

handler.help = ['prompter'];
handler.command = ['prompter', 'prompt', 'img2text'];
handler.tags = ['ai'];

export default handler;