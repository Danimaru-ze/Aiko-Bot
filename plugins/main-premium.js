import fs from "fs";
let handler = async (m, { conn }) => {
  let teks = `
❏ *_Harga Premium_*
❃ _15 Hari / 10k_
❃ _30 Hari / 25k_
❃ _45 Hari / 35k_
❃ _60 Hari / 50k_
❃ _Permanen / 100k_

❏ *_Fitur_*
❃ _Unlimited Limit_
❃ _Nsfw_
❃ _Bebas Pakai Bot Di Pc_
❃ _Dan Lain Lain_

Minat? Silahkan Chat Nomor Owner Dibawah 
${global.owner.access
  .map(([jid, name]) => {
    return `
Name : ${name}
https://wa.me/${jid}
`.trim();
  })
  .join("\n\n")}
`.trim();
  await conn.adReply(
    m.chat,
    teks,
    "U P G R A D E - P R E M I U M",
    "",
    fs.readFileSync("./assets/media/thumbnail.jpg"),
    global.link.website,
    m,
  );
};
handler.help = ["premium"];
handler.tags = ["main"];
handler.command = /^prem(ium)?$/i;

export default handler;
