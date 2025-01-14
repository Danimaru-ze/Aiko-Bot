/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY DEXZZ
* NAMA SCRIPT EMILIA-MD
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN DEXZZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/
const rewards = {
  exp: 19,
  money: 99,
};
const cooldown = 3600000;
let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  if (new Date() - user.lastclaim < cooldown)
    return m.reply(`You have already claimed this daily claim!, wait for *${(user.lastclaim + cooldown - new Date()).toTimeString()}*`);
  let text = "";
  for (let reward of Object.keys(rewards)) {
    if (!(reward in user)) continue;
    user[reward] += rewards[reward];
    text += `*+${rewards[reward]}* ${global.rpg.emoticon(reward)}${reward}\n`;
  }
  conn.reply(m.chat, "*––––––『 HOUR 』––––––* \n\n" + text.trim(), m);
  user.lastclaim = new Date() * 1;
};
handler.help = ["hourclaim"];
handler.tags = ["xp"];
handler.command = /^(hourclaim|hour)$/i;
handler.register = true;
handler.group = true;
handler.cooldown = cooldown;
handler.rpg = true;
export default handler;
