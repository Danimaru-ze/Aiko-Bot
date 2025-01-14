import fs from "fs";
let handler = async (m, { conn, usedPrefix }) => {
  let payi = `
╭─「 • *ᴘᴜʟꜱᴀ* • 」
│ • *ᴛʜʀᴇᴇ* ${global.payment.pulsa}
╰─────

╭─「 • *ᴇ-ᴡᴀʟʟᴇᴛ* • 」
│ • *ᴅᴀɴᴀ* ${global.payment.dana ? global.payment.dana : "ꜱɪʟᴀʜᴋᴀɴ ꜱᴄᴀɴ Qʀɪꜱ ᴅɪᴀᴛᴀꜱ"}
│ • *ɢᴏᴘᴀʏ* ${global.payment.gopay ? global.payment.gopay : "ꜱɪʟᴀʜᴋᴀɴ ꜱᴄᴀɴ Qʀɪꜱ ᴅɪᴀᴛᴀꜱ"}
│ • *ᴏᴠᴏ* ${global.payment.ovo ? global.config.ovo : "ꜱɪʟᴀʜᴋᴀɴ ꜱᴄᴀɴ Qʀɪꜱ ᴅɪᴀᴛᴀꜱ"}
╰─────

◛˖ _*ᴊɪᴋᴀ ꜱᴜᴅᴀʜ ᴍᴇᴍʙᴀʏᴀʀ*_\n_*ꜱɪʟᴀʜᴋᴀɴ ᴋɪʀɪᴍ ʙᴜᴋᴛɪ ᴘᴇᴍʙᴀʏᴀʀᴀɴ ᴋᴇ ᴏᴡɴᴇʀ ʙᴏᴛ...*_`;
  await conn.sendFile(
    m.chat,
    fs.readFileSync("./assets/media/qris.jpg"),
    "qris.jpg",
    payi,
    m,
  );
};
handler.help = ["payment"];
handler.tags = ["info"];
handler.command = /^(pay|payment|bayar)$/i;

export default handler;
