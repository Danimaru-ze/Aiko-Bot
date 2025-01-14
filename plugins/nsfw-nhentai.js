import { NHentai } from "@shineiichijo/nhentai-ts";
import { extractImageThumb } from "@adiwajshing/baileys";
import { toPDF } from "../lib/converter.js";
const nhentai = new NHentai();

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text)
    return m.reply(
      `Masukan kode nuclear! \n\nContoh: \n${usedPrefix + command} 405397`,
    );
  if (isNumber(text)) return m.reply(`Hanya nomor!`);
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.message.loading)
    : false;
  try {
    let result = await nhentai.getDoujin(text);
    let { data } = await conn.getFile(result.images.pages[0]);
    let jpegThumbnail = await extractImageThumb(data);
    let imagepdf = await toPDF(result.images.pages);
    await conn.sendMessage(
      m.chat,
      {
        document: imagepdf,
        jpegThumbnail,
        fileName: result.title + ".pdf",
        mimetype: "application/pdf",
      },
      { quoted: m },
    );
  } catch (e) {
    return m.reply(global.message.error);
  }
};
handler.help = ["nhentai"];
handler.tags = ["nsfw", "premium"];
handler.command = /^(nhentai)$/i;
handler.premium = true; handler.error = 0
handler.nsfw = true;
handler.age = 18;
export default handler;

const isNumber = (x) => typeof x === "number" && !isNaN(x);