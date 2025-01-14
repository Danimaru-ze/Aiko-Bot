/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY DEXZZ
* NAMA SCRIPT EMILIA-MD
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN DEXZZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/
let handler = async (m, { conn, usedPrefix, text }) => {
  let user = global.db.data.users[m.sender];
  let ini_txt = `[ *GUDANG BUAH KAMU* ]\n\n`;
  ini_txt += `🍌 ${user.pisang} Pisang\n`;
  ini_txt += `🍇 ${user.anggur} Anggur\n`;
  ini_txt += `🥭 ${user.mangga} Mangga\n`;
  ini_txt += `🍊 ${user.jeruk} Jeruk\n`;
  ini_txt += `🍎 ${user.apel} Apel\n\n`;
  ini_txt += `Gunakan command *${usedPrefix}sell* untuk menjual.`;
  m.reply(ini_txt);
};

handler.menufun = ["buah"];
handler.tagsfun = ["rpg"];
handler.command = /^((list)?(buah|fruits?))$/i;
handler.register = true;
handler.group = true;
handler.rpg = true;
export default handler;
