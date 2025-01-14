/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY XENZ
* CODE BY XENZ
* NAMA SCRIPT MIYAKO-TSUKIYUKI
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN XENZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/

import { createHash } from 'crypto'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import fs from 'fs'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
    try {
        let hwaifu = JSON.parse(fs.readFileSync('./assets/json/hwaifu.json', 'utf-8'))
        let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.ibb.co/2WzLyGk/profile.jpg')
        let user = global.db.data.users[m.sender]
        if (user.registered === true) return m.reply(`[💬] Kamu sudah terdaftar\nMau daftar ulang? *${usedPrefix}unreg <SERIAL NUMBER>*`)
        
        let name, age;

        // Check if the user just typed the command
        if (text.trim() === '') {
            name = await conn.getName(m.sender); // Get the user's WhatsApp name
            age = 15; // Default age
        } else {
            // Extract name and age from the input
            let match = text.match(Reg);
            if (match) {
                name = match[1];
                age = parseInt(match[3]);
            }
        }

        // Validate name and age
        if (!name) return m.reply('Nama tidak boleh kosong (Alphanumeric)');
        if (isNaN(age)) return m.reply('Umur tidak boleh kosong (Angka)');
        if (age > 70) return m.reply('bapak² njir');
        if (age < 5) return m.reply('waspada sosok pedo');
        if (name.split('').length > 30) return m.reply('Nama Maksimal 30 Karakter');

        await global.message.loading
        user.name = name.trim()
        user.age = age
        user.regTime = + new Date
        user.commandLimit = user.commandLimit === 1000 ? user.commandLimit : 100
        user.registered = true
        
        const rewardMoney = 100000;
        const rewardExp = 5999;
        const rewardApel = 10;

        user.money = (user.money || 0) + rewardMoney;
        user.exp = (user.exp || 0) + rewardExp;
        user.apel = (user.apel || 0) + rewardApel;

        let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 12)
        let cap = `
┏─• *Users*
│▸ *Status:* ☑️ Succes
│▸ *Nama:* ${name}
│▸ *Umur:* ${age} Tahun
│▸ *Serial Number:* ${sn}
│▸ *Reward Money:* ${rewardMoney}
│▸ *Reward Exp:* ${rewardExp}
│▸ *Reward Apel:* ${rewardApel}
┗────···

Pendaftaran Selesai!
`.trim()
        
        await conn.sendFile(m.chat, pp, name + '.jpeg', cap, m, false, false, { smlcap: true, except: [sn] })

        const chid = chat.channel;
        const sendkech = `┏─• *Users*
│▸ *Status:* ☑️ Succes
│▸ *Nama:* ${name}
│▸ *Umur:* ${age} Tahun
┗────···`;
        await conn.sendMessage(chat.channel, { text: sendkech });

    } finally {
        // await m.reply("Done")
    }
}

handler.help = ['daftar']
handler.tags = ['xp']
handler.command = /^(daftar|verify|reg(ister)?)$/i

export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}