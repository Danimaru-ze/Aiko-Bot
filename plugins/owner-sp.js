/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY XENZ
* CODE BY XENZ
* NAMA SCRIPT MIYAKO-TSUKIYUKI
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN XENZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/

/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY XENZ
* CODE BY XENZ
* NAMA SCRIPT MIYAKO-TSUKIYUKI
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN XENZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Uhm... nama filenya mana?\n\nPenggunaan:\n${usedPrefix + command} <nama file>\n\nContoh:\n${usedPrefix + command} menu`;
    if (!m.quoted) throw `Balas pesan yang ingin disimpan!`;

    const filename = `${text}.js`;
    const filepath = path.join(__dirname, filename);
    const watermark = `/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY XENZ
* CODE BY XENZ
* NAMA SCRIPT MIYAKO-TSUKIYUKI
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN XENZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/
\n`;
    const quotedContent = m.quoted.text || (await m.quoted.download());
    if (!quotedContent) throw `Pesan yang di-quote kosong!`;

    const fileContent = typeof quotedContent === 'string' ? `${watermark}${quotedContent}` : quotedContent;

    await fs.writeFileSync(filepath, fileContent);

    m.reply(`File berhasil disimpan sebagai *${filename}*!`);
};

handler.help = ['sp'].map((v) => v + ' <nama file>');
handler.tags = ['owner'];
handler.command = /^sp$/i;

handler.owner = true;

export default handler;