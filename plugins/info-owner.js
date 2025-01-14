const {
  proto,
  generateWAMessageFromContent,
} = await (await import("@adiwajshing/baileys")).default;

const createVCard = (contact) => {
    const vCardLines = [
        `BEGIN:VCARD`,
        `VERSION:3.0`,
        `FN:${contact.displayName}`,
        `TEL;type=CELL;type=VOICE;waid=${contact.number}:${contact.number}`
    ];

    // Menambahkan field jika tidak kosong
    if (contact.org) vCardLines.push(`ORG:${contact.org}`);
    if (contact.email) vCardLines.push(`EMAIL:${contact.email}`);
    if (contact.website) vCardLines.push(`URL:${contact.website}`);
    if (contact.address || contact.location) {
        vCardLines.push(`ADR;type=WORK:;;${contact.address};${contact.location};`);
    }
    if (contact.status) vCardLines.push(`X-WA-BIZ-DESCRIPTION:${contact.status}`);
    vCardLines.push(`X-WA-BIZ-NAME:${contact.displayName}`);
    vCardLines.push(`END:VCARD`);

    return vCardLines.join('\n');
};

const getStatus = async (conn, number) => {
    const formattedNumber = `${number}@s.whatsapp.net`;
    const { status } = await conn.fetchStatus(formattedNumber).catch(() => ({ status: 'Gada bio' }));
    return status;
};

const handler = async (m, { conn }) => {
    // Mengambil foto profil
    const profilePicture = await conn.profilePictureUrl(ownerNumber, 'image').catch(() => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg");
    // Mengambil nama dari global.owner
    const contactDisplayName = global.owner.name || 'Darwin'; // Mengambil nama kontak
    // Menambahkan informasi kontak lainnya
    const contactsArray = [
        {
            displayName: contactDisplayName,
            number: owner.number,
            status: getStatus(conn, owner.number),
            email: owner.gmail || "", // Ganti dengan email pemilik
            website: "The Real Creator Of Project Alicization", // Ganti dengan website pemilik
            location: "ICE LAND", // Ganti dengan lokasi pemilik
            address: "Moka-Moka Lake, Twis Village", // Ganti dengan alamat pemilik
            org: ownerStatus // Menggunakan status sebagai organisasi
        },
        {
            displayName: bot.name,
            number: pairing.number,
            status: getStatus(conn, pairing.number), // Ganti dengan status bot jika ada
            email: "", // Ganti dengan email bot jika ada
            website: "", // Ganti dengan website bot jika ada
            location: "", // Ganti dengan lokasi bot jika ada
            address: "", // Ganti dengan alamat bot jika ada
            org: "" // Ganti dengan organisasi bot jika ada
        },
        // Tambahkan kontak lain jika diperlukan
    ];

    // Mengirimkan kontak dengan konteks info
    await conn.sendMessage(m.key.remoteJid, {
        contacts: {
            displayName: contactDisplayName,
            contacts: contactsArray.map(contact => ({
                displayName: contact.displayName, // Nama kontak
                vcard: createVCard(contact) // Menggunakan fungsi untuk membuat vCard
            }))
        }
    }, { quoted: m });
};

handler.command = handler.help = ["owner", "creator"];
handler.tags = ["info"];
handler.limit = true;
handler.error = 0;

export default handler;