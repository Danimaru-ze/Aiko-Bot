let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.listAfk = conn.listAfk || {};
  let user = global.db.data.users[m.sender];
  user.afk = +new Date();
  user.afkReason = text;
  const username = m.name || m.pushName;
  const id = m.sender || m.key.remoteJid;

  conn.listAfk[m.chat] = conn.listAfk[m.chat]
    ? conn.listAfk[m.chat].some((user) => user.id === id)
      ? conn.listAfk[m.chat]
      : [
          ...conn.listAfk[m.chat],
          {
            username,
            id,
          },
        ]
    : [
        {
          username,
          id,
        },
      ];
  let caption = `${user.registered ? user.name : conn.getName(m.sender)} (@${m.sender.replace(/@.+/, "")}) Sekarang lagi AFK

Dengan alasan ➠ *${text ? "" + text : "Tanpa Alasan"}*`;
  let pp = `https://telegra.ph/file/e854360d495dcb13f5680.jpg`;
  let kataafk = [
    "mau turu",
    "mau nyolong",
    "Ke rumah ayang",
    "jagain lilin",
    "beli pop es",
    "kawin lari",
    "main kelereng",
    "petak umpet",
    "push renk",
    "push up joni",
    "olahraga",
    "onani",
    "beraq",
    "open bo",
    "di suruh emak",
    "kerja",
  ];
  conn.adReply(m.chat, caption, "A F K", "2024©Miyako", pp, sgc, m, {
    mentions: conn.parseMention(caption),
  });
};
handler.help = ["afk [alasan]"];
handler.tags = ["main"];
handler.group = true;
handler.command = /^afk$/i;

export default handler;
