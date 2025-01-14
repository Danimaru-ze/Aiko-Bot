//• DI UPDATE OLEH PADUKA DARWIN TERNAMA
//• ini dia esce yang awalnya acak adut sekarang
//• lebih sederhana, mudah di hook, rapi, dan kemren

import { watchFile, unwatchFile } from "fs";
import fs from 'fs';
import chalk from "chalk";
import { fileURLToPath } from "url";

// SETUP OWNER
global.owner = {
  access: [["6289525459709", "Danimaru", true]],
  number: "6289525459709", // nomor real owner / creator
  moderator: ["6285731439954",""], // nomor moderator, owner dengan batasan akses
  gmail: "@gmail.com", // email anda ( opsional )
  name: "Danimaru", // nama kreator
}
// SETUP BOT
global.bot = {
  name: "Aiko", // nama karakter bot
  project: "Aiko Vanguard", // nama project
  watermark: "© Created By Danimaru",
  thumbnailUrl: [
    'https://files.catbox.moe/bq2ame.jpg',
    'https://files.catbox.moe/98350c.webp',
  ], // tambahkan thumbnail versi URL ke array
  thumbnailPath: fs.readFileSync('assets/media/thumbnail.jpg'), // Ganti dengan path gambar
  version: "1.0", // versi bot
  // ambil hasil acak dari url thumbnail
  RandomThumbnailUrl: function() {
    return this.thumbnailUrl[Math.floor(Math.random() * this.thumbnailUrl.length)];
  }
}


// SETUP KONEKSI
global.pairing = {
  number: "6282143565879", // masukan nomor bot yang ingin di koneksikan
  code: true, // false untuk scan QR code
}

global.message = {
  owner: 'Owner only • Command ini hanya untuk owner bot !!',
  mods: 'Developer only • Command ini hanya untuk developer bot !!',
  premium: 'Premium only • Command ini hanya untuk member premium !!',
  group: 'Group only • Command ini hanya dapat digunakan di group !!',
  private: 'Private only • Command ini hanya dapat digunakan di chat pribadi !!',
  admin: 'Admin only • Command ini hanya untuk admin group !!',
  botAdmin: 'Jadikan bot sebagai admin untuk menggunakan command ini',
  segel: 'Maaf command ini tidak bisa digunakan karena rawan banned !!',
  onlyprem: 'Hanya user *premium* yang dapat menggunakan fitur ini di *private chat* !!',
  nsfw: 'Admin menonaktifkan fitur *nsfw* di group ini!',
  rpg: 'Admin menonaktifkan fitur *rpg game* di group ini!',
  game: 'Admin menonaktifkan fitur *game* di group ini!',
  limitExp: 'Limit kamu telah habis, beberapa command tidak dapat diakses! \nUntuk mendapatkan limit anda bisa membelinya dengan *#buy limit* atau menunggu limit refresh setiap hari.',
  restrict: 'Fitur ini tidak dapat digunakan !!',
  loading: "Please wait..",
  unreg: 'Silahkan daftar ke *database* bot terlebih dahulu jika ingin menggunakan fitur ini!\n\nContoh:\n#daftar namamu.umurmuu',
  error: "Error Sayang"
}

// SETUP WEB API
global.API = {
APIs: {
    xteam: "https://api.xteam.xyz",
    lol: "https://api.lolhuman.xyz",
    males: "https://malesin.xyz",
    zein: "https://api.zahwazein.xyz",
    rose: "https://api.itsrose.rest",
    xzn: "https://skizo.tech",
    saipul: "https://saipulanuar.cf",
    clayza: "https://api.maelyn.tech",
  },

  APIKeys: {
    "https://api.zahwazein.xyz": "zenzkey_8bb60993ae",
    "https://api.xteam.xyz": "cristian9407",
    "https://api.lolhuman.xyz": "RyAPI",
    "https://api.itsrose.life": "cDNWfULJNfbrmt6dlSDOW01XX64HsTAiMPkA63II7u4SYIum5d0KSzywHRmfTiHl",
    "https://skizo.tech": "RyHar",
    "https://api.maelyn.tech": "Rk-Ruka",
  }
}

/*========MongoDb==========*/
global.mongodb ="-"
global.dbName = "Dakwin"
/*================*/

// SETUP LINK
global.link = {
  instagram: "https://www.instagram.com/_dny.s?igsh=cHN3dDFvbnZxajN4",
  github: "https://github.com/Danimaru-ze",
  group: "",
  website: "-",
  saluran:"",
  youtube: ""
}

// SETUP PAYMENT
global.payment = {
  dana: "6289525459709",
  ovo: "_",
  gopay: "6289525459709",
  pulsa: "_"
}

// SETUP ID CHAT
global.chat = {
  owner: owner.number + "@s.whatsapp.net",
  channel: "",
  group: "@g.us"
}

global.doc = {
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  pdf: "application/pdf",
  rtf: "text/rtf",
};

global.multiplier = 200; // Jangan ganti nnti ngebug
global.htjava = "乂";
global.htki = htjava + "───『";
global.htka = "』───" + htjava;

// tags premium dan limit
global.lopr = "🅟";
global.lolm = "🅛";

// ui icon menu bot
global.decor = {
  menut: "❏═┅═━–〈",
  menub: "┊•",
  menub2: "┊",
  menuf: "┗––––––––––✦",
  hiasan: "꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷",

  menut: "––––––『",
  menuh: "』––––––",
  menub: "┊☃︎ ",
  menuf: "┗━═┅═━––––––๑\n",
  menua: "",
  menus: "☃︎",

  htki: "––––––『",
  htka: "』––––––",
  haki: "┅━━━═┅═❏",
  haka: "❏═┅═━━━┅",
  lopr: "Ⓟ",
  lolm: "Ⓛ",
  htjava: "❃",
};
/*============== EMOJI ==============*/
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    let emot = {
      level: "📊",
      limit: "🎫",
      health: "❤️",
      exp: "✨",
      atm: "💳",
      money: "💰",
      bank: "🏦",
      potion: "🥤",
      diamond: "💎",
      common: "📦",
      uncommon: "🛍️",
      mythic: "🎁",
      legendary: "🗃️",
      superior: "💼",
      pet: "🔖",
      trash: "🗑",
      armor: "🥼",
      sword: "⚔️",
      pickaxe: "⛏️",
      fishingrod: "🎣",
      wood: "🪵",
      rock: "🪨",
      string: "🕸️",
      horse: "🐴",
      cat: "🐱",
      dog: "🐶",
      fox: "🦊",
      robo: "🤖",
      petfood: "🍖",
      iron: "⛓️",
      gold: "🪙",
      emerald: "❇️",
      upgrader: "🧰",
      bibitanggur: "🌱",
      bibitjeruk: "🌿",
      bibitapel: "☘️",
      bibitmangga: "🍀",
      bibitpisang: "🌴",
      anggur: "🍇",
      jeruk: "🍊",
      apel: "🍎",
      mangga: "🥭",
      pisang: "🍌",
      botol: "🍾",
      kardus: "📦",
      kaleng: "🏮",
      plastik: "📜",
      gelas: "🧋",
      chip: "♋",
      umpan: "🪱",
      skata: "🧩",
      steak: '🥩',
      ayam_goreng: '🍗',
      ribs: '🍖',
      roti: '🍞',
      udang_goreng: '🍤',
      bacon: '🥓',
      gandum: '🌾',
      minyak: '🥃',
      garam: '🧂',
      babi: '🐖',
      ayam: '🐓',
      sapi: '🐮',
      udang: '🦐'  ,
      mahkota: '👑',
      batunissan: '🪦',
      petimati: '⚰️',
      gucci: '⚱',
    };
    let results = Object.keys(emot)
      .map((v) => [v, new RegExp(v, "gi")])
      .filter((v) => v[1].test(string));
    if (!results.length) return "";
    else return emot[results[0][0]];
  },
};

// Lihat perubahan file console
let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright("Update 'config.js'"));
  import(`${file}?update=${Date.now()}`);
});