import { createHash } from "crypto";

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;
let handler = async function (m, { conn, text, usedPrefix }) {
  let sn = createHash("md5").update(m.sender).digest("hex");
  let caption = `🗃️ *Silahkan salin kode dibawah:* \n${sn}`;
  m.reply(caption, false, false, { smlcap: true, except: [sn] });
};

handler.help = ["ceksn"];
handler.tags = ["xp"];
handler.command = /^(ceksn|sn|serialnumber)$/i;
handler.register = true;
export default handler;
