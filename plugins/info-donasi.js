import fs from "fs";
let handler = async (m, { conn, usedPrefix }) => {
  let donasi = `
╭─「 • *ᴘᴜʟꜱᴀ* • 」
│ • *ᴛʜʀᴇᴇ* ${global.payment.pulsa}
╰─────

╭─「 • *ᴇ-ᴡᴀʟʟᴇᴛ* • 」
│ • *ᴅᴀɴᴀ* ${global.payment.dana ? global.payment.dana : "ꜱɪʟᴀʜᴋᴀɴ ꜱᴄᴀɴ Qʀɪꜱ ᴅɪᴀᴛᴀꜱ"}
│ • *ɢᴏᴘᴀʏ* ${global.payment.gopay ? global.payment.gopay : "ꜱɪʟᴀʜᴋᴀɴ ꜱᴄᴀɴ Qʀɪꜱ ᴅɪᴀᴛᴀꜱ"}
│ • *ᴏᴠᴏ* ${global.payment.ovo ? global.payment.ovo : "ꜱɪʟᴀʜᴋᴀɴ ꜱᴄᴀɴ Qʀɪꜱ ᴅɪᴀᴛᴀꜱ"}
╰─────

_◛˖ ᴛᴇʀɪᴍᴀᴋᴀꜱɪʜ ᴜɴᴛᴜᴋ ʏᴀɴɢ ꜱᴜᴅᴀʜ ʙᴇʀᴅᴏɴᴀꜱɪ_`;
  await conn.sendFile(
    m.chat,
    fs.readFileSync("./assets/media/qris.jpg"),
    "qris.jpg",
    donasi,
    m,
  );
};
handler.help = ["donasi"];
handler.tags = ["info"];
handler.command = /^(donasi|donation)$/i;

export default handler;
