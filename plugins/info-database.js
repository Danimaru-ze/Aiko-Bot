let handler = async (m) => {
    // Mengambil semua pengguna dari database
    let users = global.db.data.users;
    let totalUsers = Object.keys(users).length;

    // Membagi pengguna menjadi grup dengan maksimal 50 pengguna per grup
    const usersPerPage = 50;
    const totalPages = Math.ceil(totalUsers / usersPerPage);
    let userGroups = [];

    for (let i = 0; i < totalPages; i++) {
        const start = i * usersPerPage;
        const end = start + usersPerPage;
        const userGroup = Object.entries(users).slice(start, end).map(([id, user]) => {
            if (id.endsWith('.g.us')) return '';
            const userName = typeof user.name === 'string' ? user.name.toUpperCase() : 'TIDAK ADA NAMA';
            return `
            <div class="user-card">
                <button class="user-button">
                    <i class="fas fa-user"></i> ${userName}
                </button>
                <div class="user-details">
                    <p><strong>Registered:</strong> ${user.registered}</p>
                    <p><strong>Gender:</strong> ${user.gender || 'Tidak ada'}</p>
                    <p><strong>Money:</strong> ${user.money}</p>
                    <p><strong>Exp:</strong> ${user.exp}</p>
                    <p><strong>Chat Total:</strong> ${user.chatTotal}</p>
                    <p><strong>Limit:</strong> ${user.limit}</p>
                    <p><strong>Freelimit:</strong> ${user.freelimit}</p>
                    <p><strong>Last Claim:</strong> ${user.lastclaim}</p>
                    <p><strong>Age:</strong> ${user.age}</p>
                    <p><strong>Level:</strong> ${user.level}</p>
                    <p><strong>Role:</strong> ${user.role}</p>
                    <p><strong>Health:</strong> ${user.health}</p>
                    <p><strong>Premium:</strong> ${user.premium}</p>
                    <a href="https://wa.me/${id}" class="chat-button">
                        <i class="fas fa-comments"></i> Chat
                    </a>
                </div>
            </div>`;
        }).filter(info => info !== '').join('');

        userGroups.push(userGroup);
    }

    // Menyusun dokumen HTML
    let htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Database Pengguna</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
        <style>
            body { font-family: 'Arial', sans-serif; margin: 0; padding: 20px; background-color: #f0f4f8; }
            h1 { text-align: center; color: #333; margin-bottom: 20px; font-size: 2.5em; }
            .summary { margin: 20px 0; padding: 15px; background-color: #e7f3fe; border-left: 6px solid #2196F3; border-radius: 5px; text-align: center; }
            .button-container { display: flex; justify-content: center; margin-bottom: 20px; }
            .button-container button { background-color: #2196F3; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 0 5px; font-size: 1em; transition: background-color 0.3s; }
            .button-container button:hover { background-color: #1e88e5; }
            .user-list { display: flex; flex-direction: column; align-items: center; }
            .user-card { background-color: #fff; border-radius: 8px; padding: 15px; margin: 10px 0; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); width: 100%; max-width: 600px; transition: transform 0.2s; }
            .user-card:hover { transform: scale(1.02); }
            .user-button { background-color: #4CAF50; color: white; border: none; padding: 10px; text-align: left; width: 100%; border-radius: 5px; cursor: pointer; display: flex; align-items: center; font-size: 1.2em; font-weight: bold; transition: background-color 0.3s; }
            .user-button:hover { background-color: #45a049; }
            .user-button i { margin-right: 10px; }
            .user-details { padding: 10px; background-color: #f9f9f9; border-radius: 5px; display: none; }
            .user-card:hover .user-details { display: block; }
            .chat-button { display: inline-block; margin-top: 10px; padding: 10px; background-color: #2196F3; color: white; text-decoration: none; border-radius: 5px; transition: background-color 0.3s; font-weight: bold; }
            .chat-button:hover { background-color: #1e88e5; }
            hr { border: 1px solid #ddd; margin: 10px 0; }
            .search-container { display: flex; justify-content: center; margin-bottom: 20px; }
            .search-input { padding: 10px; border: 1px solid #ccc; border-radius: 5px; width: 300px; font-size: 1em; }
            .search-button { background-color: #2196F3; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; margin-left: 10px; font-size: 1em; display: flex; align-items: center; }
            .search-button i { margin-right: 5px; }
            @media (max-width: 600px) { .summary, .user-card { padding: 10px; } .user-button { font-size: 1em; } }
        </style>
    </head>
    <body>
        <h1>Database Pengguna</h1>
        <div class="summary">
            <p><strong>Total Pengguna:</strong> ${totalUsers}</p>
        </div>
        <div class="search-container">
            <input type="text" class="search-input" placeholder="Cari User berdasarkan nama..." id="searchInput">
            <button class="search-button" onclick="searchUser ()">
                <i class="fas fa-search"></i> Cari User
            </button>
        </div>
        <div class="button-container">
            ${userGroups.map((_, index) => `<button onclick="showGroup(${index})">Server ${index + 1}</button>`).join('')}
        </div>
        <div class="user-list" id="userList">
            ${userGroups[0] || '<p>Tidak ada pengguna.</p>'}
        </div>

        <script>
            const userGroups = ${JSON.stringify(userGroups)};
            function showGroup(index) {
                const userList = document.getElementById('userList');
                userList.innerHTML = userGroups[index] || '<p>Tidak ada pengguna.</p>';
            }
            function searchUser () {
                const input = document.getElementById('searchInput').value.toUpperCase();
                const userCards = document.querySelectorAll('.user-card');
                userCards.forEach(card => {
                    const userName = card.querySelector('.user-button').textContent.toUpperCase();
                    card.style.display = userName.includes(input) ? '' : 'none';
                });
            }
        </script>
    </body>
    </html>
    `;

const info = {
    key: {
        participant: '13135550002@s.whatsapp.net',
        ...(m.chat ? { remoteJid: `13135550002@s.whatsapp.net` } : {})
    },
    message: {
        text: 'Buka dengan Chrome' // Menggunakan pesan teks sebagai pengganti dokumen
    }
};
// Mengirim dokumen HTML sebagai file
const buffer = Buffer.from(htmlContent, 'utf-8');

await conn.sendMessage(m.chat, {
    document: buffer,
    mimetype: 'text/html',
    fileName: 'Click To Open',
    fileLength: 99999,
    jpegThumbnail: null,
    caption: 'Buka berkas menggunakan browser untuk melihat info lengkap',
    contextInfo: {
        isForwarded: true,
        mentionedJid: [m.sender],
        businessMessageForwardInfo: {
            businessOwnerJid: owner.number + '@s.whatsapp.net'
        },
        externalAdReply: {
            title: bot.project,
            body: bot.watermark,
            thumbnailUrl: bot.RandomThumbnailUrl(),
            sourceUrl: 'https://wa.me/c/6283873891575',
            mediaType: 1,
            renderLargerThumbnail: true
        }
    }
}, { quoted: info });

}

handler.help = ["database"];
handler.tags = ["info"];
handler.command = /^(database|jumlahdatabase|user)$/i;

export default handler;