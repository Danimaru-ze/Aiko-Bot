/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY XENZ
* CODE BY XENZ
* NAMA SCRIPT MIYAKO-TSUKIYUKI
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN XENZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
        ? m.quoted.sender
        : args[0]
          ? args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
          : false;
  
  let user = global.db.data.users[who];
  if (!who) return m.reply("Masukan Nomor Atau Tag Orangnya!");

  // Mengatur status premium menjadi permanen
  user.premium = true;
  user.premiumTime = Infinity; // Mengatur waktu premium menjadi tidak terbatas

  await conn.reply(
    who,
    `✔️ Success! Kamu Sekarang User Premium Permanen!
📛 *Name:* ${user.name}
📆 *Status:* Premium tanpa batas waktu`,
    false,
  );

  await delay(2000);
  await m.reply(`✔️ Success
📛 *Name:* ${user.name}
📆 *Status:* Premium tanpa batas waktu`);
};

handler.help = ["addprem2"];
handler.tags = ["owner"];
handler.command = /^(add2(prem2|premium2))$/i;
handler.owner = true;
export default handler;

const delay = (time) => new Promise((res) => setTimeout(res, time));