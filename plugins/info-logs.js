import fs from "fs";
let handler = async (m) => {
  let logs = global.db.data.bots.logs;
  logs.history = logs.history ? logs.history : [];
  let header = "_*Logs Update Terbaru Bot*_ \n\n";
  if (logs.history < 1) return m.reply("Belum ada logs");
  let caption = logs.history
    .reverse()
    .map((v, i) => {
      return `
_*${i + 1}. Date ${v.date}*_
_Name : ${v.fitur}_
_Description : ${v.update}_

_Update Fitur *${v.fitur}*_
`.trim();
    })
    .join("\n\n");
  conn.adReply(
    m.chat,
    header + caption,
    "Logs Update Terbaru Dari Emilia Bot",
    "Setiap Ada Update Pasti Dimasukan Kesini, Jadi Pantau Terus Ya",
    fs.readFileSync("./assets/media/thumbnail.jpg"),
    global.link.website,
    m,
  );
};
handler.help = ["logs"];
handler.tags = ["info"];
handler.command = /^(log(s)?)$/i;
handler.limit = true; handler.error = 0
export default handler;
