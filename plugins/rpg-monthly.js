/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY DEXZZ
* NAMA SCRIPT EMILIA-MD
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN DEXZZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/
const rewards = {
  exp: 50000,
  money: 49999,
  potion: 10,
  mythic: 3,
  legendary: 1,
};

const cooldown = 2592000000;
let handler = async (m, { conn, usedPrefix }) => {
  let user = global.db.data.users[m.sender];
  if (new Date() - user.lastmonthly < cooldown)
    return m.reply(
      `ʏᴏᴜ'ᴠᴇ ᴀʟʀᴇᴀᴅʏ ᴄʟᴀɪᴍᴇᴅ *ᴍᴏɴᴛʜʟʏ ʀᴇᴡᴀʀᴅs*, ᴩʟᴇᴀsᴇ ᴡᴀɪᴛ ᴛɪʟʟ ᴄᴏᴏʟᴅᴏᴡɴ ғɪɴɪsʜ.

⏱️ ${(user.lastmonthly + cooldown - new Date()).toTimeString()}`.trim(),
    );
  let text = "";
  for (let reward of Object.keys(rewards))
    if (reward in user) {
      user[reward] += rewards[reward];
      text += `➠ ${global.rpg.emoticon(reward)} ${reward}: ${rewards[reward]}\n`;
    }
  m.reply(
    `🔖 ᴍᴏɴᴛʜʟʏ ʀᴇᴡᴀʀᴅ ʀᴇᴄᴇɪᴠᴇᴅ :
${text}`.trim(),
  );
  user.lastmonthly = new Date() * 1;
};
handler.help = ["monthly"];
handler.tags = ["rpg"];
handler.command = /^(monthly)$/i;
handler.register = true;
handler.group = true;
handler.cooldown = cooldown;
handler.rpg = true;
export default handler;
