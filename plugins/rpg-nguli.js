/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY DEXZZ
* NAMA SCRIPT EMILIA-MD
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN DEXZZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/
let handler = async (m, { conn }) => {
  if (new Date() - global.db.data.users[m.sender].lastnguli > 86400000) {
    global.db.data.users[m.sender].limit += 10;
    m.reply("_🎉Selamat kamu mendapatkan +10 limit_");
    global.db.data.users[m.sender].lastnguli = new Date() * 1;
  } else m.reply("[💬] Anda sudah mengklaim upah nguli hari ini");
};
handler.help = ["nguli"];
handler.tags = ["rpg"];
handler.command = /^(nguli)$/i;
handler.register = true;
handler.group = true;
handler.rpg = true;
export default handler;
