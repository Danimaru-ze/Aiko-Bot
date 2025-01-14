/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY XENZ
* CODE BY XENZ
* NAMA SCRIPT MIYAKO-TSUKIYUKI
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN XENZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/

import { areJidsSameUser  } from "@adiwajshing/baileys";

let handler = async (m, { conn, participants, isOwner }) => {
  let usr = m.quoted ? [m.quoted.sender] : m.mentionedJid;
  let users = usr.filter((u) => !areJidsSameUser (u, conn.user.id));
  
  if (!(m.quoted || m.mentionedJid[0])) {
    return m.reply("Tag atau reply orang yang mau dikick!");
  }

  let kickedUser  = [];
  for (let user of users) {
    if (
      user.endsWith("@s.whatsapp.net") &&
      !(participants.find((v) => areJidsSameUser (v.id, user)) || { admin: true }).admin
    ) {
      try {
        // Kirim stiker sebelum mengeluarkan pengguna
        await conn.sendFile(m.chat, 'https://files.catbox.moe/jzrftu.webp', 'sticker.webp', '', m);
        
        // Delay untuk memastikan stiker terkirim sebelum kick
        await delay(1 * 1000);

        // Mengeluarkan pengguna dari grup
        const res = await conn.groupParticipantsUpdate(m.chat, [user], "remove");
        kickedUser .push(user); // Gunakan push untuk menambahkan ke array

      } catch (error) {
        console.error(`Failed to kick user ${user}:`, error);
        m.reply(`Gagal mengeluarkan ${user.split('@')[0]}.`);
      }
    }
  }

  // Mengirim pesan jika tidak ada pengguna yang dikeluarkan
  if (kickedUser .length > 0) {
    // Anda bisa mengirim pesan umum jika pengguna telah dikeluarkan
    // m.reply("Beberapa pengguna telah dikeluarkan.");
  } else {
    m.reply("Tidak ada pengguna yang dikeluarkan.");
  }
};

handler.help = ["kick"];
handler.tags = ["group"];
handler.command = /^(kick)$/i;

handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));