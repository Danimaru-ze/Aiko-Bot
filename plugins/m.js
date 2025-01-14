/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY XENZ
* CODE BY XENZ
* NAMA SCRIPT MIYAKO-TSUKIYUKI
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN XENZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/

import PhoneNumber from "awesome-phonenumber";
import fs from "fs";
import moment from "moment-timezone";
import { createCanvas, loadImage } from 'canvas';
import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  const who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
      ? conn.user.jid
      : m.sender;
  const user = global.db.data.users[who];

  if (typeof user == "undefined")
    return m.reply("Pengguna tidak ada didalam data base");

  const name = user.registered ? user.name : conn.getName(who);
  const level = user.level;
  const money = user.money || 0; // Ambil jumlah uang pengguna
  const limit = user.limit || 0; // Ambil limit pengguna
  const phoneNumber = PhoneNumber(who).getNumber('international') || "N/A"; // Ambil nomor telepon pengguna, default ke "N/A"

  // Ambil foto profil pengguna
  const ppUrl = await conn.profilePictureUrl(who, "image").catch(() => null);
  const profileImage = ppUrl ? await fetch(ppUrl).then(res => res.buffer()) : null;

  // Muat gambar latar belakang
  let background;
  try {
    background = await loadImage('https://files.catbox.moe/edqfrc.jpg');
  } catch (error) {
    return m.reply("Gambar latar belakang tidak ditemukan.");
  }

  const canvas = createCanvas(768, 1024); // Ukuran canvas 3:4
  const ctx = canvas.getContext('2d');

  // Gambar latar belakang
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // Gambar teks dengan warna cerah
  ctx.fillStyle = '#FFD700'; // Ubah warna teks menjadi emas cerah
  ctx.font = '50px Georgia'; // Ukuran font judul
  ctx.textAlign = 'center'; // Pusatkan teks
  ctx.fillText("PLAYER PROFILE", canvas.width / 2, 100); // Judul

  // Gambar foto profil pengguna berbentuk bulat (diperbesar)
  if (profileImage) {
    const profileImg = await loadImage(profileImage);
    
    // Buat lingkaran untuk gambar profil
    ctx.save(); // Simpan konteks saat ini
    ctx.beginPath();
    ctx.arc(80, 180, 70, 0, Math.PI * 2, true); // Lingkaran dengan radius 70
    ctx.closePath();
    ctx.clip(); // Potong area di dalam lingkaran

    // Gambar gambar profil (diperbesar)
    ctx.drawImage(profileImg, 10, 110, 140, 140); // Gambar foto profil
    ctx.restore(); // Kembalikan konteks ke keadaan sebelumnya
  } else {
    ctx.fillStyle = '#ff0000'; // Jika tidak ada gambar profil, gunakan warna merah sebagai placeholder
    ctx.beginPath();
    ctx.arc(80, 180, 70, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }

  // Cek status pengguna di grup
  let groupStatus = "Member"; // Default status
  if (m.isGroup) {
    const groupMetadata = await conn.groupMetadata(m.chat);
    const participant = groupMetadata.participants.find(p => p.jid === who);
    if (participant && participant.admin) {
      groupStatus = "Admin"; // Jika pengguna adalah admin
    }
  }

  // Cek status premium
  const premiumStatus = user.premium ? "Premium" : "Non-Premium";

  // Gambar nomor dan role di bawah foto profil
  ctx.fillStyle = '#FFD700'; // Warna cerah untuk informasi pengguna
  ctx.font = '30px Georgia'; // Ukuran font untuk nomor dan role
  ctx.textAlign = 'left'; // Kembali ke kiri
  ctx.fillText(`Nomor: ${phoneNumber}`, 170, 180); // Nomor di bawah foto profil
  ctx.fillText(`Role: ${groupStatus}`, 170, 220); // Role di bawah nomor

  // Gambar garis pemisah
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 250);
  ctx.lineTo(canvas.width, 250);
  ctx.stroke(); // Gambar garis pemisah

  // Gambar teks "Player Stats:"
  ctx.fillStyle = '#FFD700'; // Warna cerah untuk teks
  ctx.font = '40px Georgia'; // Ukuran font untuk teks "Player Stats:"
  ctx.fillText("Player Stats:", 20, 300); // Teks "Player Stats:"

  // Gambar statistik pengguna dengan warna cerah
  ctx.fillStyle = '#FFD700'; // Ubah warna font menjadi cerah
  ctx.font = '36px Georgia'; // Ukuran font untuk statistik pengguna
  ctx.fillText(`Level: ${level}`, 20, 360);
  ctx.fillText(`Money: ${money}`, 20, 420);
  ctx.fillText(`Limit: ${limit}`, 20, 480);
  ctx.fillText(`Premium: ${premiumStatus}`, 300, 360); // Status premium di sebelah kanan

  // Tambahkan beberapa elemen dekoratif untuk mengisi ruang
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Warna hitam transparan
  ctx.fillRect(0, 250, canvas.width, 470); // Tambahkan latar belakang transparan di bawah statistik

  // Gambar garis pemisah untuk statistik
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 500);
  ctx.lineTo(canvas.width, 500);
  ctx.stroke(); // Gambar garis pemisah

  // Simpan gambar ke buffer
  const buffer = canvas.toBuffer('image/png');

  // Kirim gambar ke pengguna
  await conn.sendFile(m.chat, buffer, "profile.png", "", m);
};

handler.help = ["m"];
handler.tags = ["xp"];
handler.command = /^(m|m)$/i;
export default handler;