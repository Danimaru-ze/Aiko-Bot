/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY XENZ
* CODE BY XENZ
* NAMA SCRIPT MIYAKO-TSUKIYUKI
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN XENZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/

import fs from "fs";

let handler = async (m, { conn }) => {
  let featureCounts = {};

  Object.values(global.plugins).forEach((plugin) => {
    if (plugin.help && plugin.tags) {
      plugin.tags.forEach((tag) => {
        if (!featureCounts[tag]) {
          featureCounts[tag] = 0;
        }
        featureCounts[tag]++;
      });
    }
  });

  let message = "Jumlah Fitur Berdasarkan Kategori:\n";
  for (const [tag, count] of Object.entries(featureCounts)) {
    message += `- ${tag}: ${count} fitur\n`;
  }

  const thumbnailUrl = 'https://files.catbox.moe/u874oc.jpg'; // URL thumbnail

  conn.adReply(
    m.chat,
    message,
    "T O T A L - F I T U R",
    thumbnailUrl, // Ganti null dengan URL thumbnail
    null,
    m,
  );
};

handler.help = ["p"];
handler.tags = ["info"];
handler.command = ["p"];

export default handler;