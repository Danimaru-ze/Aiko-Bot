/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY XENZ
* CODE BY XENZ
* NAMA SCRIPT MIYAKO-TSUKIYUKI
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN XENZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/

let handler = async (m, { text }) => {
    let user = global.db.data.users[m.sender]
    let caption = `
${bar(user.energy)}
${user.energy} / 1000
`.trim()
	m.reply(caption)
}
handler.help = ['energy']
handler.tags = ['rpg']
handler.command = /^(energy)$/i
export default handler

function bar(p) {
	let titik = "░░░░░░░░░░".split("")
	for (let i = 1; i <= p; i++) {
		if (i%10 == 0) {
			titik[(i/10)-1] = "█"
		}
	}
	return titik.join(" ")
}