/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY XENZ
* CODE BY XENZ
* NAMA SCRIPT MIYAKO-TSUKIYUKI
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN XENZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/

import { youtube } from '@xct007/frieren-scraper'
import axios from "axios";
import yt from "../lib/scraper/yt.js"

// Definisikan handler

let handler = async (m, { conn, args, usedPrefix, command }) => {
  // Inisialisasi objek room jika belum ada
  conn.room = conn.room ? conn.room : {}

  // Ambil teks query dari argumen
  let text = (args.length > 0 ? args.slice(0).join(' ') : '') || ''
  if (!text) return m.reply(`Masukan Query!\n\nContoh:\n${usedPrefix + command} stereo love\n${usedPrefix + command} video stereo love`)
  
  let id = 'youtube_' + m.sender

  try {
    conn.room[id] = true
    let { title, uploaded, duration, views, url, thumbnail } = (await youtube.search(text))[0]
    let caption = `*${decor.htki} Y T - P L A Y ${decor.htka}*

🎧 *Title:* ${title}
📤 *Published:* ${uploaded}
⏰ *Duration:* ${duration}
👁️ *Views:* ${views}

🔗 *Url:* ${url}

*L O A D I N G. . .*
`.trim()

    // Mengirim pesan dengan data dan tautan yang ditemukan
    let msg = await conn.adReply(m.chat, caption, title, 'Playing 🔊', thumbnail, url, m)

    // Memilih untuk memutar audio atau video berdasarkan perintah
    let isVideo = args[0] && args[0].toLowerCase() === 'video';

    if (isVideo) {
      // Jika pengguna meminta video
      let dl2 = await yt.mp4(url);
      const fileSizeInBytes2 = await Buffer.byteLength(dl2.media);
      const fileSizeInMegabytes2 = fileSizeInBytes2 / (1024 * 1024);
      const title2 = dl2.title || "N/A";
      const thumbnailUrl2 = dl2.metadata.thumbnail;
      const jpegThumbnail2 = await conn.resize(thumbnailUrl2, 400, 400);
      if (fileSizeInMegabytes2 > 100) {
        await conn.sendMessage(
          m.chat,
          {
            document: dl2.media,
            mimetype: "video/mp4",
            fileName: `${title2}.mp4`,
            pageCount: 2024,
            jpegThumbnail2,
            fileLength: fileSizeInBytes2,
          }, { quoted: msg }
        );
      } else {
        await conn.sendMessage(
          m.chat,
          {
            video: dl2.media,
            fileName: `${title2}.mp4`,
            mimetype: "video/mp4",
            caption: setting.smlcap ? conn.smlcap(title2) : title2,
          }, { quoted: msg }
        );
      }
    } else {
      // Jika tidak ada argumen atau argumen bukan 'video', default ke audio
      let dl = await yt.mp3(url);
      const title = dl.title || "N/A";
      const thumbnailUrl = dl.metadata.thumbnail;
      const duration = dl.metadata.duration || "";
      const view = dl.metadata.views || "N/A";
      const desk = dl.metadata.description || "N/A";

      // Hitung ukuran file dalam MB
      const fileSizeInBytes = await Buffer.byteLength(dl.media);
      const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

      if (fileSizeInMegabytes > 60) {
        const jpegThumbnail = await conn.resize(thumbnailUrl, 400, 400);
        await conn.sendMessage(
          m.chat,
          {
            document: dl.media,
            mimetype: "audio/mpeg",
            fileName: `${title}.mp3`,
            pageCount: 2024,
            jpegThumbnail,
            fileLength: fileSizeInBytes,
          }, { quoted: msg }
        );
      } else {
        await conn.sendMessage(
          m.chat,
          {
            audio: dl.media,
            fileName: `${title}.mp3`,
            mimetype: "audio/mpeg",
          }, { quoted: msg }
        );
      }
    }
  } catch (e) {
    return m.reply(e.message)
  } finally {
    delete conn.room[id]
  }
}

handler.help = ['play'].map(v => v + ' <query>') // Updated help to reflect the new usage
handler.tags = ['sound']
handler.command = /^play$/i
handler.error = 0
handler.limit = true

// Ekspor handler
export default handler

async function getFileSize(url) {
  try {
    const res = await axios.head(url);
    return parseInt(res.headers["content-length"], 10);
  } catch (err) {
    return 0;
  }
}

async function toBuffer(url) {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer", // Pastikan respons diterima sebagai buffer
    });
    const buffer = Buffer.from(response.data, "binary");
    return buffer;
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    throw error;
  }
}