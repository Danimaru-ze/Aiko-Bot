import fs from "fs";
import { promisify } from "util";
import path from "path";
import { fileURLToPath } from "url";

const writeFileAsync = promisify(fs.writeFile);

let handler = async (
  m,
  { conn, usedPrefix, command, isGroup, groupMetadata, text },
) => {
  if (!text || !text.includes(">")) {
    return conn.reply(
      m.chat,
      `Penggunaan salah, silahkan gunakan command seperti ini\n${usedPrefix}${command} id>text>jeda\n\nJika tidak mengetahui Id grup, ketik .idgroup`,
      m,
    );
  }

  const [groupId, messageText, delay] = text.split(">");
  const metadata2 = await conn.groupMetadata(groupId.trim());
  const halss = metadata2.participants;

  let contacts = [];

  // Validasi delay
  const delayMs = parseInt(delay.trim());
  if (isNaN(delayMs) || delayMs <= 0) {
    return conn.reply(m.chat, "Jeda harus berupa angka positif.", m);
  }

  for (let index = 0; index < halss.length; index++) {
    const mem = halss[index];
    await sleep(delayMs); // Delay sesuai input pengguna
    const number = `${mem.id.split("@")[0]}@s.whatsapp.net`;
    const username = mem.notify || `Contacts ${index + 1}`; // Menggunakan notify jika ada, jika tidak gunakan "Contacts X"
    conn.sendMessage(number, { text: messageText.trim() });

    contacts.push(number);
  }

  // Membuat file contacts.vcf
  const vcfData = contacts
    .map((number, index) => {
      const formattedNumber = number.split("@")[0];
      return `BEGIN:VCARD\nVERSION:3.0\nFN:${username} - ${formattedNumber}\nTEL;type=CELL;type=VOICE;waid=${formattedNumber}:${formattedNumber}\nEND:VCARD`;
    })
    .join("\n");

  // Mendapatkan path direktori saat ini
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const vcfPath = path.join(__dirname, "contacts.vcf");

  await writeFileAsync(vcfPath, vcfData);

  // Mengirim file contacts.vcf dengan caption
  const sentMessage = await conn.sendMessage(m.chat, {
    document: { url: vcfPath },
    mimetype: "text/vcard",
    fileName: "contacts.vcf",
    caption: "Sukses Pushkontak",
  });

  // Menghapus file setelah 10 detik
  setTimeout(() => {
    fs.unlinkSync(vcfPath);
  }, 10000); // 10000 ms = 10 detik

  return conn.reply(m.chat, "Done Pushkontak", m);
};

handler.command = ["pushkontak"];
handler.tags = ["owner"];
handler.owner = true;
handler.group = false;

export default handler;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}