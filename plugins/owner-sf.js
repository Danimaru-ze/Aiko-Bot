import fs from "fs";
import syntaxError from "syntax-error";
import path from "path";

const _fs = fs.promises;

let handler = async (m, { text, usedPrefix, command, __dirname }) => {
  let input = `[!] *wrong input*
  
Ex : ${usedPrefix + command} example.js`;
  
  if (!text) return m.reply(input);
  if (!m.quoted) return m.reply(`Balas/quote media/text yang ingin disimpan`);

  try {
    if (/p(lugin)?/i.test(command)) {
      let filename =
        text.replace(/plugin(s)\//i, "") + (/\.js$/i.test(text) ? "" : ".js");
      const error = syntaxError(m.quoted.text, filename, {
        sourceType: "module",
        allowReturnOutsideFunction: true,
        allowAwaitOutsideFunction: true,
      });
      if (error) throw error;

      const pathFile = path.join(__dirname, filename);
      await _fs.writeFile(pathFile, m.quoted.text);
      m.reply(`Successfully saved to *${filename}*`);
    } else {
      const isJavascript =
        m.quoted.text && !m.quoted.mediaMessage && /\.js/.test(text);
      if (isJavascript) {
        const error = syntaxError(m.quoted.text, text, {
          sourceType: "module",
          allowReturnOutsideFunction: true,
          allowAwaitOutsideFunction: true,
        });
        if (error) throw error;

        await _fs.writeFile(text, m.quoted.text);
        m.reply(`Successfully saved to *${text}*`);
      } else if (m.quoted.mediaMessage) {
        const media = await m.quoted.download();
        await _fs.writeFile(text, media);
        m.reply(`Successfully saved media to *${text}*`);
      } else {
        throw "Not supported!!";
      }
    }
  } catch (err) {
    console.error(err); // Log kesalahan ke konsol untuk debugging
    m.reply(`Error: ${err.message || err}`);
  }
};

handler.help = ["plugin", "scraper"].map((v) => `save ${v} <name file>`);
handler.tags = ["owner"];
handler.command = /^(save|sf)$/i;
handler.owner = true;

export default handler;