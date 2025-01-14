export async function before(m, { isAdmin, isBotAdmin }) {
  let isVn = m.mtype;
  let chat = global.db.data.chats[m.chat];
  if (chat.antiVn) {
    if (/opus/i.test(isVn)) {
      if (!isAdmin || isBotAdmin) {
        this.sendMessage(m.chat, { delete: m.key });
      }
    }
  }
  return !0;
}
