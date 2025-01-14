import PhoneNumber from 'awesome-phonenumber';
import { promises as fsPromises } from 'fs';
import { join } from 'path';
import fetch from 'node-fetch';
import { xpRange } from '../lib/levelling.js';
import moment from 'moment-timezone';
import fs from 'fs';

let handler = async (m, { conn, usedPrefix, command, __dirname, isOwner, isMods, isPrems, args }) => {
  const teks = (args[0] || '').toLowerCase();
  const arrayMenu = ['all', 'main', 'ai', 'game', 'rpg', 'xp', 'sticker', 'kerang', 'quotes', 'fun', 'anime', 'group', 'premium', 'internet', 'news', 'downloader', 'search', 'tools', 'primbon', 'nulis', 'audio', 'maker', 'database', 'quran', 'owner', 'info', 'sound'];

  const tags = {
    all: 'All',
    main: 'Main',
    ai: 'Ai',
    game: 'Game',
    rpg: 'RPG Games',
    xp: 'Exp & Limit',
    sticker: 'Sticker',
    kerang: 'Kerang Ajaib',
    quotes: 'Quotes',
    fun: 'Fun',
    anime: 'Anime & Manga',
    group: 'Group & Admin',
    premium: 'Premium',
    internet: 'Internet',
    news: 'News',
    downloader: 'Downloader',
    search: 'Searching',
    tools: 'Tools',
    primbon: 'Primbon',
    nulis: 'MagerNulis & Logo',
    audio: 'Audio Editing',
    maker: 'Maker',
    database: 'Database',
    quran: 'Al Quran',
    owner: 'Owner',
    info: 'Info',
    sound: 'Sound',
  };

  const selectedTag = arrayMenu.includes(teks) ? teks : '404';
  const tagName = tags[selectedTag] || '404';

  const wib = moment.tz('Asia/Jakarta').format('HH:mm:ss');
  const user = global.db.data.users[m.sender];
  const { exp, level, role } = user;
  const { min, xp, max } = xpRange(level, global.multiplier);
  const limit = isPrems ? 'Unlimited' : user.limit;
  const name = user.registered ? user.name : conn.getName(m.sender);
  const status = isMods ? 'Developer' : isOwner ? 'Owner' : isPrems ? 'Premium User' : user.level > 1000 ? 'Elite User' : 'Free User';

  const d = new Date(Date.now() + 3600000);
  const locale = 'id';
  const weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5];
  const week = d.toLocaleDateString(locale, { weekday: 'long' });
  const date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
  const dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(d);

  const _uptime = process.uptime() * 1000;
  let _muptime;
  if (process.send) {
    process.send('uptime');
    _muptime = await new Promise(resolve => {
      process.once('message', resolve);
      setTimeout(resolve, 1000);
    }) * 1000;
  }
  const muptime = clockString(_muptime);
  const uptime = clockString(_uptime);
  const totalreg = Object.keys(global.db.data.users).length;
  const rtotalreg = Object.values(global.db.data.users).filter(user => user.registered).length;

  const defaultMenu = `
*❏ I N F O  U S E R*
▧ Name : ${name}
▧ Tag : @${m.sender.split('@')[0]}
▧ Status : ${status}
▧ Limit : ${limit}
▧ Role : ${role}
▧ Level : ${level} [ ${max - exp} Xp For LevelUp]
▧ Xp : ${exp} / ${xp}
▧ Total Exp : ${exp}

*❏ T O D A Y*
▧ Time : ${wib} WIB
▧ Days : ${week} ${weton}
▧ Date : ${date}
▧ Islamic Date : ${dateIslamic}

*❏ I N F O  B O T*
▧ Bot Name : ${conn.getName(conn.user.jid)}
▧ Mode : Public
▧ Platform : Linux
▧ Type : Node.Js
▧ Baileys : Multi Device
▧ Uptime : ${muptime}
▧ Database : ${rtotalreg} dari ${totalreg}

*❏ I N F O  C O M M A N D*
🅟 = Premium
🅛 = Limit
`.trimStart();

  const listCmd = `${defaultMenu}`.trimStart();
  const rows = arrayMenu.map(menu => ({
    header: "",
    title: "Menu " + capitalize(menu),
    description: "Untuk Membuka Menu " + capitalize(menu),
    id: usedPrefix + menu + "menu"
  }));

  const buttonMsg = {
    title: "Click Here",
    sections: [{
      title: "List Menu",
      highlight_label: "Popular",
      rows: rows
    }]
  };

  const buttons = [{
    name: "single_select",
    buttonParamsJson: JSON.stringify(buttonMsg)
  }];

  if (selectedTag === '404') {
    return conn.sendButtonImg(m.chat, fs.readFileSync("./assets/media/thumbnail.jpg"), "", listCmd, bot.watermark, buttons, m, {
      contextInfo: {
        mentionedJid: [m.sender],
      }
    });
  }

  const help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => ({
    help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
    tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
    prefix: 'customPrefix' in plugin,
    limit: plugin.limit,
    premium: plugin.premium,
    enabled: !plugin.disabled,
  }));

  const groups = {};
  for (const tag in tags) {
    groups[tag] = help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help);
  }

  const before = conn.menu.before || defaultMenu.before;
  const header = conn.menu.header || defaultMenu.header;
  const body = conn.menu.body || defaultMenu.body;
  const footer = conn.menu.footer || defaultMenu.footer;
  const after = conn.menu.after || (conn.user.jid === global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after;

  const _text = [
    before,
    ...Object.keys(tags).map(tag => {
      return header.replace(/%category/g, tags[tag]) + '\n' + [
        ...groups[tag].map(menu => {
          return menu.help.map(help => {
            return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
              .replace(/%islimit/g, menu.limit ? '🅛' : '')
              .replace(/%isPremium/g, menu.premium ? '🅟' : '')
              .trim();
          }).join('\n');
        }),
        footer
      ].join('\n');
    }),
    after
  ].join('\n');

  await conn.adReply(m.chat, _text.trim(), `${wish()} ${name}`, '', fs.readFileSync('./assets/media/thumbnail.jpg'), global.link.saluran, m);
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = /^(menu)$/i;
handler.register = true;

export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function wish() {
  const time = moment.tz('Asia/Jakarta').format('HH');
  if (time >= 0 && time < 4) return 'Selamat Malam';
  if (time >= 4 && time < 11) return 'Selamat Pagi';
  if (time >= 11 && time < 15) return 'Selamat Siang';
  if (time >= 15 && time < 18) return 'Selamat Sore';
  return 'Selamat Malam';
}

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}