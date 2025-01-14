const handler = async (m, { conn, text, isOwner }) => {
  if (!text) return m.reply("mau rubah title apah???");

  if (/owner || maou/i.test(text) && !isOwner) {
    m.reply("gaboleh ini khusus ownerku");
  } else {
    const user = global.db.data.users[m.sender];
    const judul = user.title;
    const title = text;
    m.reply("berhasil mengganti title menjadi " + title);
  }
};
handler.command = ["title"];
handler.premium = true; handler.error = 0
export default handler;
