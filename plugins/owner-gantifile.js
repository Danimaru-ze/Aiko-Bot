import fs from 'fs';
import path from 'path';
import { downloadContentFromMessage } from '@adiwajshing/baileys'; // Pastikan Anda mengimpor fungsi ini dari modul yang benar

let handler = async (m, { conn }) => {
    const from = m.chat; // Mendapatkan chat ID

    // Memastikan ada pesan yang dikutip
    if (!m.quoted) return conn.reply(from, 'Silakan kutip file yang ingin Anda ganti.', m);

    // Mendapatkan nama file dari pesan yang dikutip
    const quotedFileName = m.quoted.fileName;
    if (!quotedFileName) return conn.reply(from, 'File yang dikutip tidak memiliki nama.', m);

    // Fungsi untuk mencari dan mengganti file
    async function replaceFileInDirectory(dir, fileName, newFileBuffer) {
        let found = false;
        let filePathFound = ''; // Menyimpan jalur file yang ditemukan

        // Membaca isi direktori
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            // Mengecualikan folder node_modules
            if (file === 'node_modules') {
                continue; // Lewati folder node_modules
            }

            if (stat.isDirectory()) {
                // Jika ini adalah direktori, lakukan pencarian rekursif
                const result = await replaceFileInDirectory(filePath, fileName, newFileBuffer);
                if (result.found) {
                    found = true;
                    filePathFound = result.filePath; // Ambil jalur file yang ditemukan
                }
            } else if (file === fileName) {
                // Jika file ditemukan, ganti kontennya
                fs.writeFileSync(filePath, newFileBuffer);
                console.log(`File ${fileName} telah diganti di ${filePath}`);
                found = true;
                filePathFound = filePath; // Simpan jalur file yang ditemukan
            }
        }
        return { found, filePath: filePathFound }; // Kembalikan status dan jalur file
    }

    // Mengunduh konten dari pesan yang dikutip
    let media = await downloadContentFromMessage(m.quoted, "document");
    let buffer = Buffer.from([]);
    for await (const chunk of media) {
        buffer = Buffer.concat([buffer, chunk]);
    }

    // Memulai pencarian dan penggantian file
    const dirPath = './'; // Mulai dari direktori saat ini
    const result = await replaceFileInDirectory(dirPath, quotedFileName, buffer);
    if (result.found) {
        conn.reply(from, `Berhasil mengganti ${quotedFileName} di direktori ${result.filePath}.`, m);
    } else {
        conn.reply(from, `File ${quotedFileName} tidak ditemukan di direktori dan subdirektori.`, m);
    }
};

handler.help = ["gantifile"];
handler.tags = ["owner"];
handler.command = /^(gantifile)$/i;
handler.owner = true;

export default handler;

// By Darwin