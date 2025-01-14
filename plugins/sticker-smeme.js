import uploadImage from "../lib/uploadImage.js";
import { webp2png } from "../lib/webp2mp4.js";
import { sticker } from "../lib/sticker.js";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let [atas, bawah] = text.split("|").map((v) => v.trim());
  atas = atas ? atas : "😔";
  bawah = bawah ? bawah : "😔";
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime)
    return m.reply(`Balas Gambar Dengan Perintah\n\n${usedPrefix + command} <${atas || "teks atas"}>|<${bawah || "teks bawah"}>`);
  if (!/image\/(jpe?g|png|webp)/.test(mime))
    return m.reply(`_*Mime ${mime} tidak didukung!*_`);
  await m.reply(message.loading);

  let img = await q.download();
  let url;

  if (mime === "image/webp") {
    url = await webp2png(img);
  } else {
    url = await uploadImage(img);
  }

  if (!url) return m.reply("Gambar tidak dapat diunggah!");

  let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${url}`;
  let stiker = await sticker(false, meme, global.packname, global.author);

  if (stiker)
    await conn.sendFile(m.chat, stiker, "", global.author, m, "", {
      asSticker: true,
    });
};

handler.help = ["smeme"];
handler.tags = ["tools"];
handler.command = /^(smeme)$/i;
handler.limit = true; handler.error = 0

export default handler;
