let handler = async function (m, { conn, text, usedPrefix }) {
  
let tek = `
aku Xenz atau lebih dikenal Dexzz selaku owner(Creator MiyakoBot) sangat berterimakasih kepada

*• My God*:
*• My Familly*
*• My Friends*
*• My Buyer
*• My Donatur
*• Xenz/Dexzz
*• VynaaChan*
*• PannZX*
*• Adiwajshing*
*• Cifumo*
*• Kiznavier
『MIYAKO-BOT BY XENZ』
`

    conn.sendFile(m.chat, thumbnail, 'menu.jpg', tek, m)
}

handler.command = ["tqto"]
handler.help = ["tqto"]
handler.tags = ['info']

export default handler