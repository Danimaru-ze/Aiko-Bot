export function before(m) {
  if (m.isBaileys) return;
  if (!m.text) return;
  let pp = `https://telegra.ph/file/8d31d7b1479a3ecb502d7.jpg`;
  this.listAfk = this.listAfk || {};
  let user = global.db.data.users[m.sender];
  if (user.afk > -1) {
    const idToRemove = m.sender;
    this.listAfk[m.chat] = this.listAfk[m.chat]
      ? this.listAfk[m.chat].filter((user) => user.id !== idToRemove)
      : [];
    let caption = `
${user.registered ? user.name : conn.getName(m.sender)} (@${m.sender.replace(/@.+/, "")}) berhenti AFK 
${user.afkReason ? " setelah " + user.afkReason : ""}

Selama ${(new Date() - user.afk).toTimeString()}
  `.trim();
    conn.adReply(
      m.chat,
      caption,
      "Berhenti A F K",
      "2024©Miyako",
      `https://pomf2.lain.la/f/qblsmgwh.jpg`,
      sig,
      m,
      { mentions: conn.parseMention(caption) },
    );
    user.afk = -1;
    user.afkReason = "";
  }
  let jids = [
    ...new Set([
      ...(m.mentionedJid || []),
      ...(m.quoted ? [m.quoted.sender] : []),
    ]),
  ];
  for (let jid of jids) {
    let user = global.db.data.users[jid];
    if (!user) continue;
    let afkTime = user.afk;
    if (!afkTime || afkTime < 0) continue;
    let reason = /wa.me\/settings/i.exec(user.afkReason)
      ? "#HIDDEN#"
      : user.afkReason || "";
    let caption = `
Jangan tag dia ${user.registered ? user.name : conn.getName(m.sender)} (@${m.sender.replace(/@.+/, "")})!
Dia sedang AFK *${reason ? "dengan alasan " + reason : "tanpa alasan"}*
Selama ${(new Date() - afkTime).toTimeString()}
`.trim();
    conn.adReply(
      m.chat,
      caption,
      "J a n g a n T a g",
      "2024© Miyako",
      `https://pomf2.lain.la/f/qblsmgwh.jpg`,
      sig,
      m,
      { mentions: conn.parseMention(caption) },
    );
  }
  return true;
}
