/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY XENZ
* CODE BY XENZ
* NAMA SCRIPT MIYAKO-TSUKIYUKI
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN XENZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/

import {
  generateWAMessageFromContent,
  prepareWAMessageMedia,
} from "@adiwajshing/baileys";
import axios from "axios";
import { search } from "../lib/scraper/cai.js";

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply("Masukkan teksnya\nContoh: .caisearch emilia");

  const response = await search(text);
  const characters = response.result.slice(0, 3); // Batasi menjadi 3 karakter
  global.db.data.users[m.sender].cai = { characters };

  if (!m.isGroup) {
    // Jika bukan grup
    const caption = await Promise.all(
      characters.map(async (char, index) => {
        try {
          const media = await prepareWAMessageMedia(
            {
              image: { url: `https://characterai.io/i/80/static/avatars/${char.avatar_file_name}` },
            },
            { upload: conn.waUploadToServer }
          );

          if (!media.imageMessage) throw new Error("Gagal menyiapkan media gambar.");

          return {
            header: {
              hasMediaAttachment: true,
              ...media,
            },
            body: {
              text: `👤 *Name*: ${char.participant__name}\n` +
                `📖 *Title*: ${char.title}\n` +
                `🆔 *ID*: ${char.external_id}\n`,
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "quick_reply",
                  buttonParamsJson: `{"display_text":"Pilih ${char.participant__name}","title":"Karakter ${index + 1}","id":".caiset ${index + 1}"}`,
                },
              ],
            },
          };
        } catch (error) {
          console.error("Error fetching or preparing media:", error.message);
          return null;
        }
      })
    );

    const msg = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: {
                text: "🔍 *Cai Search Results*\n" +
                  `Berikut daftar karakter yang ditemukan:\n` +
                  `Pilih salah satu menggunakan tombol di bawah.`,
              },
              carouselMessage: {
                cards: caption.filter((card) => card !== null), // Pastikan hanya kartu valid yang disertakan
                messageVersion: 1,
              },
            },
          },
        },
      },
      { quoted: m }
    );

    await conn.relayMessage(m.chat, msg.message, {
      messageId: msg.key.id,
    });
  } else {
    // Jika grup
    const caption = await Promise.all(
      characters.map(async (char, index) => {
        try {
          const media = await prepareWAMessageMedia(
            {
              image: { url: `https://characterai.io/i/80/static/avatars/${char.avatar_file_name}` },
            },
            { upload: conn.waUploadToServer }
          );

          if (!media.imageMessage) throw new Error("Gagal menyiapkan media gambar.");

          return {
            header: {
              hasMediaAttachment: true,
              ...media,
            },
            body: {
              text: `👤 *Name*: ${char.participant__name}\n` +
                `📖 *Title*: ${char.title}\n` +
                `🆔 *ID*: ${char.external_id}\n`
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "cta_url",
                  buttonParamsJson: `{"display_text":"Pilih ${char.participant__name} (${index + 1})","url":"https://wa.me/${global.pairing.code}?text=.caiset ${index + 1}","merchant_url":"https://wa.me/${global.pairing.code}?text=.caiset ${index + 1}"}`,
                },
              ],
            },
          };
        } catch (error) {
          console.error("Error fetching or preparing media:", error.message);
          return null;
        }
      })
    );

    const msg = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: {
                                text: "🔍 *Cai Search Results*\n" +
                  `Berikut daftar karakter yang ditemukan:\n` +
                  `Pilih salah satu menggunakan tombol di bawah.`,
              },
              carouselMessage: {
                cards: caption.filter((card) => card !== null), // Pastikan hanya kartu valid yang disertakan
                messageVersion: 1,
              },
            },
          },
        },
      },
      { quoted: m }
    );

    await conn.relayMessage(m.chat, msg.message, {
      messageId: msg.key.id,
    });
  }

  // Set timeout untuk menghapus sesi pencarian
  setTimeout(() => {
    if (global.db.data.users[m.sender]?.cai?.characters) {
      delete global.db.data.users[m.sender].cai;
      conn.reply(
        m.chat,
        "Timeout! Sesi pencarian telah dihapus karena tidak ada pemilihan karakter.",
        m
      );
    }
  }, 60000);
};

handler.command = ["pepek"];
handler.tags = ["ai", "premium"];
handler.help = ["pepek"];

export default handler;