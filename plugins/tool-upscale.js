import axios from "axios";
import uploadImage from "../lib/uploadImage.js";
import upscale from "../lib/scraper/upscale.js";

let handler = async (m, { conn, usedPrefix, command, args }) => {
  // Nilai default
  const defaultScale = 2;
  const defaultEnhance = false;

  // Validasi args[0] dan args[1], jika tidak ada gunakan nilai default
  const validScales = [2, 4, 6, 8, 16];
  const scale = args[0] ? parseInt(args[0]) : defaultScale;
  if (!validScales.includes(scale)) {
    return m.reply(`Nilai untuk scale harus salah satu dari: ${validScales.join(", ")}.`);
  }

  const enhance = args[1] ? args[1] === 'true' : defaultEnhance;
  if (args[1] && args[1] !== 'true' && args[1] !== 'false') {
    return m.reply(`Apakah foto anime atau real jika anime true jika real false.`);
  }

  let q = m.quoted ? m.quoted : m;
  let mime =
    (q.msg || q).mimetype ||
    q.mediaType ||
    (q.header && q.header.imageMessage && q.header.imageMessage.mimetype) ||
    "";

  if (!mime) {
    return m.reply(
      `Fotonya Mana? \nKirim Foto Dengan Caption ${usedPrefix + command}`,
    );
  }

  if (!/image\/(jpe?g|png)/.test(mime)) {
    return m.reply(`Tipe ${mime} tidak didukung!`);
  }

  global.db.data.settings[conn.user.jid].loading ?
    await m.reply(global.message.loading) :
    false;

  let img;
  try {
    if (q.header && q.header.imageMessage) {
      img = await conn.downloadM(q.header.imageMessage, "image");
    } else {
      img = await q.download();
    }
  } catch (error) {
    return m.reply(`Gagal mendownload gambar: ${error.message}`);
  }

  let response;
  try {
    response = await upscale(img, scale, enhance); // Menjalankan fungsi upscale dengan argumen scale dan enhance
  } catch (error) {
    return m.reply(`Gagal melakukan upscale: ${error.message}`);
  }

  if (!response || !response.status) {
    return m.reply("Gagal melakukan upscale.");
  }

  conn.sendFile(m.chat, response.image, "upscaled.jpg", "Ini Dia Kak", m);
};

handler.help = ["upscale"];
handler.tags = ["tools"];
handler.command = /^(upscale|hd(r)?)$/i;
handler.limit = true;
handler.error = 0;

export default handler;