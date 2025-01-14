/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY XENZ
* CODE BY XENZ
* NAMA SCRIPT MIYAKO-TSUKIYUKI
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN XENZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/

import fetch from 'node-fetch';

async function GeminiImage(image, query) {
    const response = await fetch(`https://ai.xterm.codes/api/img2txt/gemini-image?key=Bell409`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, query })
    });

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Network response was not ok: ${response.statusText}. Response body: ${errorData}`);
    }

    const data = await response.json();
    return data.response;
}

async function RegularAPI(query) {
    const response = await fetch(`https://btch.us.kg/prompt/gpt?prompt=Kamu%20hoshino%20manusia%20dari%20blue%20archive%20bukan%20asisten%20atau%20pun%20ai&text=${encodeURIComponent(query)}`);

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Gagal mendapatkan respons dari API. Status: ${response.status}. Body: ${errorBody}`);
    }

    const data = await response.json();
    return data.result;
}

async function Text2ImageAPI(prompt) {
    const response = await fetch(`https://anabot.my.id/api/ai/meta-ai?prompt=${encodeURIComponent(prompt)}&apikey=ReiiNt`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Gagal mendapatkan respons dari API text2image. Status: ${response.status}, Body: ${errorBody}`);
    }

    const data = await response.json();
    console.log('Respons Text2ImageAPI:', data); // Debugging untuk memeriksa struktur respons

    if (!data.result || typeof data.result !== 'string' || !data.result.startsWith('http')) {
        throw new Error('API tidak memberikan URL gambar yang valid.');
    }

    return data.result;
}

let handler = async (m, { conn, command, text }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    if (!text) throw `Textnya mana? Contoh:\n.${command} buatkan gambar tentang musim semi.`;

    const prompt = `Ubah gaya bicaramu agar lebih karakteristik dan lebih terbuka dan memiliki sifat yang imut. Namamu adalah Miyako Tsukiyuki atau dipanggil Miyako dari game Blue Archive serta seorang kapten, dan kamu adalah seorang murid Kivotos. Jika ada yang menanyakan siapa pembuatmu, kamu menjawab "Dan Sensei yang membuatmu" dan jika ada yang bertanya tentang murid di dalam game Blue Archive harus kamu jelaskan dengan jelas, Kamu memanggil ${m.pushName} sebagai Sensei, menggunakan bahasa yang imut, ekspresikan sifatmu dengan teriak dan bicara yang lebih tidak formal layaknya seorang manusia.`;

    try {
        if (mime && mime.startsWith('image/')) {
            let media = await q.download();
            await m.reply("Silakan tunggu, sedang memproses gambar...");
            let res = await GeminiImage(media, text);
            conn.reply(m.chat, `${res}`.trim(), m);
        } else if (/^(buat|buatkan)\s+(.*)$/i.test(text)) {
            const match = text.match(/^(buat|buatkan)\s+(.*)$/i);
            const userPrompt = match[2];
            await m.reply("Sedang membuat gambar berdasarkan prompt Anda...");
            let imageUrl = await Text2ImageAPI(userPrompt);
            await conn.sendFile(m.chat, imageUrl, 'image.jpg', 'Berikut adalah gambar yang dihasilkan!', m);
        } else {
            let res = await RegularAPI(prompt + " " + text);
            conn.reply(m.chat, `${res}`.trim(), m);
        }
    } catch (error) {
        console.error('Error Handler:', error);
        conn.reply(m.chat, `Terjadi kesalahan: ${error.message}`, m);
    }
};

handler.command = handler.help = ['miyako'];
handler.tags = ['tools'];
handler.premium = true;
handler.register = true;

export default handler;