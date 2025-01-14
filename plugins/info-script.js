/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY XENZ
* CODE BY XENZ
* NAMA SCRIPT MIYAKO-TSUKIYUKI
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN XENZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/

const handler = async (m, { conn, usedPrefix }) => {

  const message = `🚩 *SELL SCRIPT NIER AUTOBOT* 

🍟 *[ I N T R O D U C T I O N ]*
 _Script ini dikembangkan oleh creator bernama Xenz, script di buat dengan *500+* fitur yang dapat membantu dan memudahkan anda dalam bekerja_

Script Ini Di Jual Dengan Harga ~Rp.40.000~ -> *Rp.25.000* 🎉 Dengan Harga Itu Kalian Bisa Mendapatkan Script Dengan Spesifikasi Di Bawah ini !

🏷️ *[ D E T A I L ]*
- *Price* : Rp.40.000
- *Contact* : wa.me/6283873891575
- *Payment* : all payment

🚧 *[ I N F O R M A T I O N ]*
- Plugins *( ESM )*
- Pairing Code
- Adiwajshing Baileys
- No Enc *100%* !!
- *500+* Menu Features
- Full Feature Ai intelligence
- Full Rpg Features
- Full Game Features
- Confess / Menfess / Anonymous 
- Fix Play Ytdl
- All Downloader Work 
- Update Lifetime *( Selamanya )*

🎏 *[ B E S T ]*
- *Menu AI*: Gpt4o, Gemini, xenzAI, MiyakoAi, ETC 10+.
- *Menu Downloader*:  Youtube, Facebook, Instagram, ETC 30+.
- *Menu Tools*: Remove Bg, Tts, Maps, ETC 50+.
- *Menu Games*: Tebakgambar, Kata, Lagu, Family100, CakLontong, Warewolf, ETC 60+.
- *Menu Rpg*: Bank, Adventure, Shop, Trade, Sell, Buying, ETC 90+.
*TOTAL 500+, ALL WORK !!*

Cocok untuk kalian yang ingin mempunyai bot sendiri tanpa harus menyewa lagi dengan creator lain, dengan kalian membeli script ini kalian akan mendapat *Pemberitahuan* & *Penambahan* pada bot inii hanya Dengan Harga *20K*

_Tunggu apalagiii hubungii owner segera !_
_Contact Person_ : wa.me/6283873891575`;

  const imageUrl = bot.RandomThumbnailUrl()

  // Send message with image and footer
  await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: `${message}\n\n${bot.project}` });
}

handler.help = ['sc', 'sourcecode'];
handler.tags = ['info', 'main'];
handler.command = /^(sc|sourcecode)$/i;
handler.register = false;

export default handler;