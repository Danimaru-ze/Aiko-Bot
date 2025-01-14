
import { promises as fs } from "fs";
import moment from "moment-timezone";
import { getContentType } from "@adiwajshing/baileys";

const handler = async (m, { conn }) => {
    if (!global.autoreadsw || m.key.remoteJid !== 'status@broadcast') return;

    await conn.readMessages([m.key]);

    let menuText = "Menu Plugins:\n";
    const plugins = Object.values(global.plugins).filter(plugin => !plugin.disabled);
    
    plugins.forEach(plugin => {
        menuText += `- ${plugin.help.join(', ')}\n`;
    });

    await conn.sendMessage(m.chat, { text: menuText }, { quoted: m });
};

handler.help = ["panelmenu"];
handler.tags = ["menulist"];
handler.command = /^(panelmenu)$/i;

export default handler;