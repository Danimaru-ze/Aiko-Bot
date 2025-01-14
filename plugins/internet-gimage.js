/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* CODE BY DEXZZ
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN DEXZZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/

import { googleImage } from '@bochilteam/scraper'
var handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Use example ${usedPrefix}${command} Minecraft`
    const res = await googleImage(text)
    let image = res.getRandom()
    let link = image
    conn.sendFile(m.chat, link, 'google.jpg', `乂 *G O O G L E*\n*Result:* ${usedPrefix + command} ${text}
*Source:* Google
`,m)
}
handler.help = ['gimage']
handler.tags = ['internet']
handler.command = /^(gimage|image)$/i
handler.limit = true
handler.premium = true;
export default handler