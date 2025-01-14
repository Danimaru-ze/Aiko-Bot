/*
 * @Author: Cifumo
 * @Web: https://rest.cifumo.biz.id
 */

/* dibuat oleh Cifumo
owner: https://wa.me/62887437975626
bot: https://wa.me/6283151441108
ig: https://instagram.com/tyoochann
github: - */

/* dibuat oleh Cifumo
owner: https://wa.me/62887437975626
bot: https://wa.me/6283151441108
ig: https://instagram.com/tyoochann
github: - */

let handler = async (m, { conn, text, usedPrefix, command }) => {
  text = (text || "").split("|");
  let who = text[1]
    ? text[1].replace(/\D/g, "") + "@s.whatsapp.net"
    : m.quoted
      ? m.quoted.sender
      : m.mentionedJid && m.mentionedJid[0]
        ? m.mentionedJid[0]
        : "";
  if (!who)
    return m.reply(
      `Format : ${usedPrefix + command} nama | <tag / quote / ketik nmr nya>`,
    );
  let meh = await conn.onWhatsApp(who);
  if (meh.length == 0)
    return m.reply(
      `[!] Failed, @${who.split("@")[0] || ""} bukan pengguna WhatsApp.`,
      null,
      { mentions: [who] },
    );
  if (who == conn.user.jid)
    return m.reply(`[ ! ] Nomor Bot sudah otomatis menjadi real owner.`);
  //if (db.data.bots.owner.map(([number]) => number).includes(who.split('@')[0])) return m.reply('[ ! ] Dia sudah jadi owner.')
  if (db.data.bots.owner.map(([number]) => number).includes(who.split("@")[0]))
    return m.reply("[ ! ] Dia sudah jadi real owner.");
  db.data.bots.owner.push([who.split("@")[0], text[0], true]);
  await conn.reply(
    m.chat,
    `Sukses menjadikan @${who.split("@")[0]} sebagai *real owner*.`,
    m,
    { mentions: [who] },
  );
};

handler.help = ["addownwr"];
handler.tags = ["owner"];
handler.command = /^(addowner)$/i;

handler.owner = true;

export default handler;
