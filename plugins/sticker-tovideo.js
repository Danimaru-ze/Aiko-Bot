import * as fs from "fs";
import { exec } from "child_process";

let handler = async (m, { conn }) => {
  if (m.quoted && /sticker/.test(m.quoted.mtype) && !m.quoted.isAnimated) {
    let img = await m.quoted.download();
    await conn.sendMessage(
      m.chat,
      { image: img, jpegThumbnail: img },
      { quoted: m },
    );
  } else if (
    m.quoted &&
    /sticker/.test(m.quoted.mtype) &&
    m.quoted.isAnimated
  ) {
    let img = await m.quoted.download();
    let out = await webpToVideo(img);
    await conn.sendMessage(
      m.chat,
      {
        video: out,
        gifPlayback: /gif/i.test(m.text),
        gifAttribution: ~~(Math.random() * 2),
      },
      { quoted: m },
    );
  } else return m.reply("Reply a sticker!");
};
handler.help = ["togif", "tovideo"];
handler.tags = ["tools"];
handler.command = /^(to(gif|video|vid))$/i;
handler.register = false;
handler.premium = false;
handler.limit = true; handler.error = 0

export default handler;

function webpToVideo(bufferImage) {
  return new Promise((resolve, reject) => {
    try {
      let pathFile = "./.npm/" + ~~(Math.random() * 1000000 + 1) + ".webp";
      fs.writeFileSync(pathFile, bufferImage);
      exec(`convert ${pathFile} ${pathFile}.gif`, (error, stdout, stderr) => {
        exec(
          `ffmpeg -i ${pathFile}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${pathFile}.mp4`,
          (error, stdout, stderr) => {
            if (
              !fs.existsSync(pathFile + ".gif") ||
              !fs.existsSync(pathFile + ".mp4")
            ) {
              reject("Failed convert file!");
              fs.unlinkSync(pathFile);
              return;
            }
            let videoBuffer = fs.readFileSync(pathFile + ".mp4");
            resolve(videoBuffer);
          },
        );
      });
    } catch (e) {
      reject(e);
    }
  });
}
