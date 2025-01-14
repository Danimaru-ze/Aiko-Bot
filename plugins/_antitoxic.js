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
* SCRIPT BY DEXZZ
* NAMA SCRIPT EMILIA-MD
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN DEXZZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/

const gclinkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/gi;
const walinkRegex = /wa.me\/([0-9])/gi;
const linkRegex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;

export async function before(m) {
  if (m.isBaileys && m.fromMe) return;
  let chat = global.db.data.chats[m.chat];
  
  // Cek apakah pesan mengandung tautan
  let isGroupToxic = gclinkRegex.exec(m.text) || walinkRegex.exec(m.text) || linkRegex.exec(m.text);
  
  if (chat.antiToxic && isGroupToxic && m.isGroup) {
    m.reply("*jangan share link*");
    this.sendMessage(m.chat, { delete: m.key }, m);
  }
  
  return !0;
}