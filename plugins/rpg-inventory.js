/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY DEXZZ
* NAMA SCRIPT EMILIA-MD
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN DEXZZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/
import daily from "./rpg-daily.js";
import weekly from "./rpg-weekly.js";
import monthly from "./rpg-monthly.js";
import adventure from "./rpg-adventure.js";
import fetch from "node-fetch";

let inventory = {
  others: {
    joinlimit: true,
    health: true,
    money: true,
    chip: true,
    exp: true,
  },
  items: {
    bibitanggur: true,
    bibitmangga: true,
    bibitpisang: true,
    bibitapel: true,
    bibitjeruk: true,
    anggur: true,
    mangga: true,
    pisang: true,
    apel: true,
    jeruk: true,
    potion: true,
    trash: true,
    wood: true,
    rock: true,
    string: true,
    emerald: true,
    diamond: true,
    gold: true,
    iron: true,
    umpan: true,
    upgrader: true,
    pet: true,
    petfood: true,
  },
  durabi: {
    sworddurability: true,
    pickaxedurability: true,
    fishingroddurability: true,
    armordurability: true,
  },
  tools: {
    armor: {
      0: "❌",
      1: "Leather Armor",
      2: "Iron Armor",
      3: "Gold Armor",
      4: "Diamond Armor",
      5: "Emerald Armor",
      6: "Crystal Armor",
      7: "Obsidian Armor",
      8: "Netherite Armor",
      9: "Wither Armor",
      10: "Dragon Armor",
      11: "Hacker Armor",
    },
    sword: {
      0: "❌",
      1: "Wooden Sword",
      2: "Stone Sword",
      3: "Iron Sword",
      4: "Gold Sword",
      5: "Copper Sword",
      6: "Diamond Sword",
      7: "Emerald Sword",
      8: "Obsidian Sword",
      9: "Netherite Sword",
      10: "Samurai Slayer Green Sword",
      11: "Hacker Sword",
    },
    pickaxe: {
      0: "❌",
      1: "Wooden Pickaxe",
      2: "Stone Pickaxe",
      3: "Iron Pickaxe",
      4: "Gold Pickaxe",
      5: "Copper Pickaxe",
      6: "Diamond Pickaxe",
      7: "Emerlad Pickaxe",
      8: "Crystal Pickaxe",
      9: "Obsidian Pickaxe",
      10: "Netherite Pickaxe",
      11: "Hacker Pickaxe",
    },
    fishingrod: {
      0: "❌",
      1: "Wooden Fishingrod",
      2: "Stone Fishingrod",
      3: "Iron Fishingrod",
      4: "Gold Fishingrod",
      5: "Copper Fishingrod",
      6: "Diamond Fishingrod",
      7: "Emerald Fishingrod",
      8: "Crystal Fishingrod",
      9: "Obsidian Fishingrod",
      10: "God Fishingrod",
      11: "Hacker Fishingrod",
    },
  },
  crates: {
    common: true,
    uncommon: true,
    mythic: true,
    legendary: true,
  },
  pets: {
    horse: 10,
    cat: 10,
    fox: 10,
    dog: 10,
    robo: 10,
  },
  cooldowns: {
    lastclaim: {
      name: "claim",
      time: daily.cooldown,
    },
    lastweekly: {
      name: "weekly",
      time: weekly.cooldown,
    },
    lastmonthly: {
      name: "monthly",
      time: monthly.cooldown,
    },
    lastadventure: {
      name: "adventure",
      time: adventure.cooldown,
    },
  },
};
let handler = async (m, { conn }) => {
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender;
  let user = global.db.data.users[who];

  if (!(who in global.db.data.users))
    return m.reply(`User ${who} not in database`);

  let sortedlevel = Object.entries(global.db.data.users).sort(
    (a, b) => b[1].level - a[1].level,
  );
  let userslevel = sortedlevel.map((v) => v[0]);
  let sortedchip = Object.entries(global.db.data.users).sort(
    (a, b) => b[1].chip - a[1].chip,
  );
  let userschip = sortedchip.map((v) => v[0]);
  let sortedmoney = Object.entries(global.db.data.users).sort(
    (a, b) => b[1].money - a[1].money,
  );
  let usersmoney = sortedmoney.map((v) => v[0]);
  let sorteddiamond = Object.entries(global.db.data.users).sort(
    (a, b) => b[1].diamond - a[1].diamond,
  );
  let usersdiamond = sorteddiamond.map((v) => v[0]);
  let sortedbank = Object.entries(global.db.data.users).sort(
    (a, b) => b[1].bank - a[1].bank,
  );
  let usersbank = sortedbank.map((v) => v[0]);
  let sortedgold = Object.entries(global.db.data.users).sort(
    (a, b) => b[1].gold - a[1].gold,
  );
  let usersgold = sortedgold.map((v) => v[0]);

  let isMods = [
    conn.decodeJid(global.conn.user.id),
    ...global.owner.access
      .filter(([number, _, isDeveloper]) => number && isDeveloper)
      .map(([number]) => number),
  ]
    .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
    .includes(who);
  let isOwner =
    m.fromMe ||
    isMods ||
    [
      conn.decodeJid(global.conn.user.id),
      ...global.owner.access
        .filter(([number, _, isDeveloper]) => number && !isDeveloper)
        .map(([number]) => number),
    ]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(who);
  let isPrems = isOwner || new Date() - user.premiumTime < 0;

  let limit = isPrems ? "Unlimited" : user.limit;
  let tools = Object.keys(inventory.tools)
    .map(
      (v) =>
        user[v] &&
        `*${global.rpg.emoticon(v)} ${v}:* ${typeof inventory.tools[v] === "object" ? inventory.tools[v][user[v]?.toString()] : `Level(s) ${user[v]}`}`,
    )
    .filter((v) => v)
    .join("\n")
    .trim();
  let items = Object.keys(inventory.items)
    .map((v) => user[v] && `*${global.rpg.emoticon(v)} ${v}:* ${user[v]}`)
    .filter((v) => v)
    .join("\n")
    .trim();
  let dura = Object.keys(inventory.durabi)
    .map((v) => user[v] && `*${global.rpg.emoticon(v)} ${v}:* ${user[v]}`)
    .filter((v) => v)
    .join("\n")
    .trim();
  let crates = Object.keys(inventory.crates)
    .map((v) => user[v] && `*${global.rpg.emoticon(v)} ${v}:* ${user[v]}`)
    .filter((v) => v)
    .join("\n")
    .trim();
  let pets = Object.keys(inventory.pets)
    .map(
      (v) =>
        user[v] &&
        `*${global.rpg.emoticon(v)} ${v}:* ${user[v] >= inventory.pets[v] ? "Max Levels" : `Level(s) ${user[v]}`}`,
    )
    .filter((v) => v)
    .join("\n")
    .trim();
  let cooldowns = Object.entries(inventory.cooldowns)
    .map(
      ([cd, { name, time }]) =>
        cd in user &&
        `*✧ ${name}*: ${new Date() - user[cd] >= time ? "✅" : "❌"}`,
    )
    .filter((v) => v)
    .join("\n")
    .trim();
  let crypto = Object.entries(user.invest)
    .filter((v) => v[1].stock != 0)
    .map((v) => `*• ${v[0]}:* ${v[1].stock}`)
    .join("\n")
    .trim();
  let caption = `
🧑🏻‍🏫 ᴜsᴇʀ: *${user.registered ? user.name : conn.getName(who)}* ${
    user.level
      ? `
➠ ${global.rpg.emoticon("level")} level: ${user.level}`
      : ""
  } ${
    user.limit
      ? `
➠ ${global.rpg.emoticon("limit")} limit: ${limit}`
      : ""
  }
${Object.keys(inventory.others)
  .map((v) => user[v] && `➠ ${global.rpg.emoticon(v)} ${v}: ${user[v]}`)
  .filter((v) => v)
  .join("\n")} ${
    crypto
      ? `

*ʟɪꜱᴛ ᴄʀʏᴘᴛᴏ* :
${crypto}`
      : ""
  } ${
    tools
      ? `

*ʟɪꜱᴛ ᴛᴏᴏʟs* :
${tools}`
      : ""
  }${
    items
      ? `

*ʟɪꜱᴛ ɪᴛᴇᴍs* :
${items}`
      : ""
  }${
    crates
      ? `

*ʟɪꜱᴛ ᴄʀᴀᴛᴇs* :
${crates}`
      : ""
  }${
    pets
      ? `

*ʟɪꜱᴛ ᴩᴇᴛs* :
${pets}`
      : ""
  }${
    cooldowns
      ? `

*ʟɪꜱᴛ ᴀʀᴄʜɪᴇᴠᴇᴍᴇɴᴛ* :
${global.rpg.emoticon("chip")} ᴛᴏᴘ ᴄʜɪᴘ *${userschip.indexOf(who) + 1}* ᴅᴀʀɪ *${userschip.length}*
${global.rpg.emoticon("money")} ᴛᴏᴘ ᴍᴏɴᴇʏ *${usersmoney.indexOf(who) + 1}* ᴅᴀʀɪ *${usersmoney.length}*
${global.rpg.emoticon("bank")} ᴛᴏᴘ ʙᴀɴᴋ *${usersbank.indexOf(who) + 1}* ᴅᴀʀɪ *${usersbank.length}*
${global.rpg.emoticon("level")} ᴛᴏᴘ ʟᴇᴠᴇʟ *${userslevel.indexOf(who) + 1}* ᴅᴀʀɪ *${userslevel.length}*
${global.rpg.emoticon("diamond")} ᴛᴏᴘ ᴅɪᴀᴍᴏɴᴅ *${usersdiamond.indexOf(who) + 1}* ᴅᴀʀɪ *${usersdiamond.length}*
${global.rpg.emoticon("gold")} ᴛᴏᴘ ɢᴏʟᴅ *${usersgold.indexOf(who) + 1}* ᴅᴀʀɪ *${usersgold.length}*

♻️ *ᴄᴏʟʟᴇᴄᴛ ʀᴇᴡᴀʀᴅs* :
${cooldowns}`
      : ""
  }
*✧ dungeon: ${user.lastdungeon == 0 ? "✅" : "❌"}*
*✧ mining: ${user.lastmining == 0 ? "✅" : "❌"}*
`.trim();
  conn.adReply(
    m.chat,
    caption,
    "I N V E N T O R Y",
    "",
    flaImg.getRandom() + "INVENTORY",
    global.link.website,
    m,
  );
};
handler.help = ["inventory"];
handler.tags = ["rpg"];
handler.command = /^(inv(entory)?|bal(ance)?|money|e?xp)$/i;

handler.register = true;
handler.group = true;
handler.rpg = true;

export default handler;

const flaImg = [
  "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=",
  "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=",
  "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=",
  "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=",
  "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=",
];