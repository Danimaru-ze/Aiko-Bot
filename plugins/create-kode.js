/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY XENZ
* CODE BY XENZ
* NAMA SCRIPT MIYAKO-TSUKIYUKI
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN XENZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/

import fs from 'fs';

let handler = async (m, { conn, args }) => {
    // Determine the user to associate the code with
    let who = m.quoted ? m.quoted.sender : m.mentionedJid[0] ? m.mentionedJid[0] : m.isGroup ? m.sender : m.chat;
    let user = db.data.users[m.sender];
    let target = db.data.users[who];

    // Generate a random code
    let bybu = await generateRandomCode(8);
    
    // Write the new code directly to the JSON file
    try {
        fs.writeFileSync("./assets/database/codereedem.json", JSON.stringify([bybu])); // Overwrite with the new code
    } catch (error) {
        console.error("Error writing to file:", error);
    }
    
    // Reply to the user with the generated code
    m.reply(`Success!!\nCodenya Adalah: ${bybu}`);
}

// Command configuration
handler.help = ['buatkode'];
handler.tags = ['rpg'];
handler.command = /^(buatkode|createreedem)$/i;

export default handler;

// Function to generate a random code
function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}