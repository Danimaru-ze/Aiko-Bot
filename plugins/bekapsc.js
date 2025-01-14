/* 
『WARNING』 WATERMARK INI TIDAK BOLEH DI HAPUS
* SCRIPT BY XENZ
* CODE BY XENZ
* NAMA SCRIPT MIYAKO-TSUKIYUKI
* JANGAN DI HAPUS KONTOL
* FOLLOW SALURAN XENZ
https://whatsapp.com/channel/0029ValeNDG0LKZLbAQZNs0i
*/

import { promisify } from "util"
import cp, { exec as _exec } from "child_process"
import fs from 'fs';

const handler = async (m, { conn }) => {
        await m.reply(wait)
        let exec = promisify(_exec).bind(cp)
        let { stdout } = await exec("zip -r tmp/backup.zip * -x 'node_modules/*'")

        if (stdout) conn.sendMessage(m.sender, { document: await fs.readFileSync("./.npm/backup.zip"), fileName: "backup-script.zip", mimetype: "application/zip", caption: "Successfully backed up the script [ ✅ ]" }, { quoted: m })
        fs.unlinkSync("./.npm/backup.zip")
    }
handler.help = ["backupbot"];
handler.tags = ["owner"];
handler.command = /^(bekap)$/i;
handler.owner = true;
export default handler