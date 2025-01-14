import {
  WAMessageStubType
} from "@adiwajshing/baileys";
import PhoneNumber from "awesome-phonenumber";
import ora from "ora";
import chalk from "chalk";
import {
  watchFile,
  readFile,
  writeFile
} from "fs";
import terminalImage from "terminal-image";
import urlRegex from "url-regex-safe";
import {
  sizeFormatter,
  durationFormatter
} from "human-readable";

const formatSize = sizeFormatter({
    std: "JEDEC",
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`
});

const formatTime = (timestamp) => {
    try {
        const dateInMakassar = new Date(1000 * (timestamp?.low || 0));
        const formatter = new Intl.DateTimeFormat("en-EN", {
            timeZone: "Asia/Makassar",
            hour: "2-digit",
            minute: "2-digit",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
        return formatter.format(dateInMakassar);
    } catch (error) {
        console.error("Error formatting time:", error.message);
        return "Invalid Timestamp";
    }
};

const formatDuration = (timestamp) => {
    try {
        return durationFormatter({
            units: ["h", "m", "s"],
            round: true
        })(timestamp?.low || 0);
    } catch (error) {
        console.error("Error formatting duration:", error.message);
        return "Invalid Duration";
    }
};

class ClearLogger {
    logCount = 0;

    addLog = () => {
        if (this.logCount >= 999) this.clearLogs();
        this.logCount++;
    };

    clearLogs = () => {
        console.log(chalk.blue("Clearing log..."));
        console.clear();
        this.logCount = 0;
    };
}

const clearLoggerInstance = new ClearLogger();

export default async function handleMessage(m, conn = { user: {} }) {
    const formatType = (type) => {
        if (!type) return "Unknown";
        return type.replace(/message$/i, "")
            .replace("audio", m.msg?.ptt ? "PTT" : "audio")
            .replace(/^./, v => v.toUpperCase());
    };

    const _name = conn.getName(m.sender);
    const chat = PhoneNumber("+" + m.sender.replace("@s.whatsapp.net", "")).getNumber("international");
    const filesize = m.msg?.vcard ? m.msg.vcard.length : m.msg?.fileLength?.low || m.msg?.fileLength || m.text?.length || 0;

    if (m?.sender && m?.msg) {
        if (m?.isCommand) {
            clearLoggerInstance.addLog();
            console.log(chalk.bold.cyan("\n╭──────────────────────────────────────···"));
            console.log(`📨 ${chalk.bold.redBright("Message Info")}: ${chalk.yellow("[")} ${chalk.green(m?.isGroup ? "Group" : "Private")} ${chalk.yellow("]")}`);
            console.log(chalk.bold.cyan("├──────────────────────────────────────···"));
            console.log(`   ${chalk.bold.cyan("- Message Type")}: ${formatType(m.mtype) || "N/A"}`);
            console.log(`   ${chalk.bold.cyan("- Message ID")}: ${m.msg?.id || m.key?.id || "N/A"}`);
            console.log(`   ${chalk.bold.cyan("- Sent Time")}: ${formatTime(m.messageTimestamp) || "N/A"}`);
            console.log(`   ${chalk.bold.cyan("- Message Size")}: ${formatSize(filesize || 0) || "N/A"}`);
            console.log(`   ${chalk.bold.cyan("- Sender ID")}: ${m.sender?.split("@")[0] || m.key?.remoteJid || "N/A"}`);
            console.log(`   ${chalk.bold.cyan("- Sender Name")}: ${m.name || m.pushName || conn.user.name || "N/A"}`);
            console.log(`   ${chalk.bold.cyan("- Chat ID")}: ${m.chat?.split("@")[0] || m.key?.remoteJid || "N/A"}`);
            console.log(`   ${chalk.bold.cyan("- Chat Name")}: ${chat || "N/A"}`);
            console.log(`   ${chalk.bold.cyan("- Total Log Messages")}: ${clearLoggerInstance.logCount}`);
            console.log(chalk.bold.cyan("╰──────────────────────────────────────···\n"));
        }

        // Anti-bot check
        if ((opts.antibot || global.db.data.chats[m.chat]?.antibot) && m?.isGroup) {
            clearLoggerInstance.addLog();
            const idBot = m.msg?.id || m.key?.id || "N/A";
            if (["BAE", "B1E", "3EB0", "WA"].some(k => idBot.includes(k) && m.sender !== conn.user.jid)) {
                const antiBotMessage = "[ *🚫 ANTI BOT 🚫* ]\n\n🛑 Group ini dilengkapi dengan anti bot\n\n⚠ Anda melanggar peraturan bot";
                const thumbnail = await conn.getFile("https://cdn-icons-png.flaticon.com/128/2333/2333083.png");
                await conn.sendMessage(m.chat, {
                    text: antiBotMessage,
                    contextInfo: {
                        externalAdReply: {
                            title: "🤖 Anti Bot",
                            thumbnail: thumbnail.data
                        },
                        mentionedJid: [m.sender]
                    }
                }, {
                    quoted: m
                });
                conn.logger.info("Bot detected " + m.sender.split("@")[0]);
                await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
            }
        }

        // Group handling
        if (m?.isGroup && m?.sender) {
            clearLoggerInstance.addLog();
            const idBot = m.msg?.id || m.key?.id || "N/A";
            if (m.sender !== conn.user.jid && ["BAE", "WA"].some(k => idBot.includes(k))) {
                conn.user.listbot = conn.user.listbot || {};
                const chatKey = m.chat ?? m.key?.remoteJid ?? "N/A";
                const chatValue = {
                    name: m.name ?? m.pushName ?? conn.user.name ?? "N/A",
                    number: m.sender ?? m.key?.remoteJid ?? "N/A",
                    groupId: m.chat ?? m.key?.remoteJid ?? "N/A"
                };
                conn.user.listbot[chatKey] = conn.user.listbot[chatKey] || [];
                if (!conn.user.listbot[chatKey].some(bot => bot.number === m.sender)) {
                    conn.user.listbot[chatKey].push(chatValue);
                } else {
                    conn.user.listbot[chatKey] = conn.user.listbot[chatKey].filter(bot => bot.number !== m.sender);
                }
            }
        }
    }

    // Command handling
if (typeof m?.text === "string" && m?.text && m?.isCommand && m?.sender) {
    
    clearLoggerInstance.addLog();
    console.log(chalk.bold.cyan("╭──────────────────────────────────────···"));
    
    let logMessage = m.text.replace(/\u200e+/g, "");
    const mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~])(.+?)\1|```((?:.||[\n\r])+?)```)(?=\S?(?:[\s\n]|$))/g;
    
    const mdFormat = (depth = 4) => (_, type, text, monospace) => {
        const types = {
            _: "italic",
            "*": "bold",
            "~": "strikethrough"
        };
        text = text || monospace;
        return !types[type] || depth < 1 ? text : chalk[types[type]](text.replace(mdRegex, mdFormat(depth - 1)));
    };

    if (logMessage.length < 4096) {
        logMessage = logMessage.replace(urlRegex, (url, i, text) => {
            const end = url.length + i;
            return (i === 0 || end === text.length || /^\s$/.test(text[end]) && /^\s$/.test(text[i - 1])) 
                ? chalk.bold.blueBright(url) 
                : url;
        });
        
        logMessage = logMessage.replace(mdRegex, mdFormat(4));
        
        if (m.mentionedJid) {
            for (const user of m.mentionedJid) {
                logMessage = logMessage.replace("@" + user.split("@")[0], chalk.bold.blueBright("@" + conn.getName(user)));
            }
        }
    }

    const maxLogLength = 200;
    const truncatedLog = logMessage.length > maxLogLength 
        ? `${logMessage.slice(0, maxLogLength / 2)}...${logMessage.slice(-maxLogLength / 2)}` 
        : logMessage;

    console.log(m.error != null 
        ? `🚨 ${chalk.bold.red(truncatedLog)}` 
        : m.isCommand 
            ? `⚙️ ${chalk.bold.yellow(truncatedLog)}` 
            : truncatedLog);
    
    console.log(chalk.bold.cyan("╰──────────────────────────────────────···"));

    // Send the output message to the channel
    const botNumber = conn.user.jid.split(':')[0] + '@s.whatsapp.net'; // Menggunakan 'jid' untuk mendapatkan nomor bot
    const senderName = conn.getName(m.sender) || "Unknown User"; // Mendapatkan nama pengirim
    let inipesan = `From: ${senderName}\n`; // Menggunakan nama pengirim
    inipesan += `Chat: ${truncatedLog}\n`;
    inipesan += `Bot: @${botNumber.split('@')[0]}`; // Memperbaiki tanda kutip
    
    // Fungsi untuk mendapatkan daftar mention
    const ments = (text) => {
        const mentions = [];
        const regex = /@([0-9]{5,16})/g; // Regex untuk mencocokkan mention
        let match;
        while ((match = regex.exec(text)) !== null) {
            mentions.push(match[1] + '@s.whatsapp.net'); // Menambahkan nomor yang dicocokkan ke dalam array
        }
        mentions.push(m.sender); // Menambahkan pengirim ke dalam daftar mention
        return mentions;
    };
    
    const mentionsList = ments(inipesan); // Mendapatkan daftar mention
    
    // Pastikan chat.channel ada dan valid
    const chatChannel = '120363208489867075@newsletter'; // Menggunakan m.chat atau m.key.remoteJid jika m.chat tidak ada
    if (chatChannel) {
        await conn.sendMessage(chatChannel, { text: inipesan, mentions: mentionsList }); // Mengirim pesan ke chat yang benar
    } else {
        console.error("Chat channel is not defined or invalid.");
    }
    }

    // Handle message attachments
    if (m?.msg && m?.sender) {
        clearLoggerInstance.addLog();
        const attachmentType = m.mtype.replace(/message$/i, "");
        const isGroup = m?.isGroup ? "Group" : "Private";
        
        const messageInfo = {
            type: formatType(m.mtype) || "N/A",
            id: m.msg?.id || m.key?.id || "N/A",
            sentTime: formatTime(m.messageTimestamp) || "N/A",
            size: formatSize(filesize || 0) || "N/A",
            senderId: m.sender?.split("@")[0] || m.key?.remoteJid || "N/A",
            senderName: m.name || m.pushName || conn.user?.name || "N/A",
            chatId: m.chat?.split("@")[0] || m.key?.remoteJid || "N/A",
            chatName: chat || "N/A"
        };

        const logMessageInfo = (attachmentDescription) => {
            console.log(chalk.bold.cyan("╭──────────────────────────────────────···"));
            console.log(`📨 ${chalk.bold.redBright("Message Info")}: ${chalk.yellow("[")} ${chalk.green(isGroup)} ${chalk.yellow("]")}`);
            console.log(chalk.bold.cyan("├──────────────────────────────────────···"));
            console.log(`   ${chalk.bold.cyan("- Message Type")}: ${messageInfo.type}`);
            console.log(`   ${chalk.bold.cyan("- Message ID")}: ${messageInfo.id}`);
            console.log(`   ${chalk.bold.cyan("- Sent Time")}: ${messageInfo.sentTime}`);
            console.log(`   ${chalk.bold.cyan("- Message Size")}: ${messageInfo.size}`);
            console.log(`   ${chalk.bold.cyan("- Sender ID")}: ${messageInfo.senderId}`);
            console.log(`   ${chalk.bold.cyan("- Sender Name")}: ${messageInfo.senderName}`);
            console.log(`   ${chalk.bold.cyan("- Chat ID")}: ${messageInfo.chatId}`);
            console.log(`   ${chalk.bold.cyan("- Chat Name")}: ${messageInfo.chatName}`);
            console.log(chalk.bold.redBright(attachmentDescription));
            console.log(chalk.bold.cyan("╰──────────────────────────────────────···"));
        };

        // Check for attachment types
        if (/document/i.test(attachmentType)) {
            logMessageInfo(`📄 Attached Document:\n\n ${m.msg.fileName || m.msg.displayName || "Document"}`);
        } else if (/contact/i.test(attachmentType)) {
            logMessageInfo(`👨 Attached Contact: ${m.msg.displayName || "N/A"}`);
        } else if (/audio/i.test(attachmentType)) {
            const duration = m.msg.seconds || 0;
            const formattedDuration = formatDuration(duration);
            logMessageInfo(`🎵 Attached Audio: ${m.msg.ptt ? "(PTT)" : "(Audio)"} - Duration: ${formattedDuration}`);
        } else if (/image/i.test(attachmentType)) {
            const attachmentName = m.msg.caption || attachmentType;
            logMessageInfo(`🟡 Attached Image: ${attachmentName}`);
            if (m.msg.url && global.opts.img) {
                try {
                    const imageBuffer = await m.download();
                    const terminalImg = await terminalImage.buffer(imageBuffer);
                    console.log(terminalImg);
                } catch (error) {
                    console.error(chalk.bold.red("Error displaying image:"), error);
                }
            }
        } else if (/video/i.test(attachmentType)) {
            const attachmentName = m.msg.caption || attachmentType;
            logMessageInfo(`📹 Attached Video: ${attachmentName}`);
        } else if (/sticker/i.test(attachmentType)) {
            const attachmentName = m.msg.caption || attachmentType;
            logMessageInfo(`🎴 Attached Sticker: ${attachmentName}`);
        }
    }
}

// Function to get phone number
const getPhoneNumber = (jid) => PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber("international");