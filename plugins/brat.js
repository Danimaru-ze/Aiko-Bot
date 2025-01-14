/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY XENZ
* CODE BY XENZ
* NAMA SCRIPT MIYAKO-TSUKIYUKI
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN XENZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/

/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY XENZ
* CODE BY XENZ
* NAMA SCRIPT MIYAKO-TSUKIYUKI
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN XENZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/

/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY XENZ
* CODE BY XENZ
* NAMA SCRIPT MIYAKO-TSUKIYUKI
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN XENZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/

import https from "https"
import { sticker } from "../lib/sticker.js"

let handler = async (m, { conn, text }) => {
    if (!text) throw `Teksnya mana?`    
    try {
        let buffer = await IBuffer(`https://api.zenkey.my.id/api/maker/brat?text=${encodeURIComponent(text)}&apikey=zenkey`)
        let stiker = await sticker(buffer, false, global.packname, global.author)        
        if (stiker) {
            await conn.sendFile(m.chat, stiker, 'brat.webp', '', m)
        }
    } catch (e) {
        throw e
    }
}

handler.help = ["brat"]
handler.tags = ["sticker"]
handler.command = /^(brat)$/i
handler.limit = 5
handler.premium = false

export default handler

async function IBuffer(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = []
            res.on('data', chunk => data.push(chunk))
            res.on('end', () => resolve(Buffer.concat(data)))
            res.on('error', reject)
        })
    })
}