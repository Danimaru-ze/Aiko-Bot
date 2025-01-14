import fetch from "node-fetch";
import { addExif, sticker } from "../lib/sticker.js";

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false;
  let [packname, ...author] = args.join(" ").split("|");
  author = (author || []).join("|");
  let q = m.quoted ? m.quoted : m;
  let mime =
    (q.msg || q).mimetype ||
    q.mediaType ||
    (q.header &&
      (q.header.imageMessage || q.header.videoMessage) &&
      (q.header.imageMessage?.mimetype || q.header.videoMessage?.mimetype)) ||
    "";

  if (!mime) {
    return m.reply(
      `Reply to an image/video/sticker with the command ${usedPrefix + command}`,
    );
  }

  try {
    let img;

    if (q.header) {
      if (q.header.imageMessage) {
        img = await conn.downloadM(q.header.imageMessage, "image");
      } else if (q.header.videoMessage) {
        img = await conn.downloadM(q.header.videoMessage, "video");
      }
    } else {
      img = await q.download();
    }

    if (/webp/.test(mime)) {
      stiker = await addExif(
        img,
        bot.name || owner.name,
        bot.name || owner.name,
      );
    } else if (/image/.test(mime)) {
      stiker = await sticker(
        img,
        false,
        bot.name || owner.name,
        bot.name || owner.name,
      );
    } else if (/video/.test(mime)) {
      if ((q.msg || q).seconds > 10) {
        return m.reply("Max 10 seconds!");
      }
      global.db.data.settings[conn.user.jid].loading
        ? await m.reply(global.message.loading)
        : false;
      stiker = await mp4ToWebp(img, {
        pack: global.bot.name || owner.name,
        author: bot.name || owner.name,
        crop: false,
      });
    } else if (args[0] && isUrl(args[0])) {
      stiker = await sticker(
        false,
        args[0],
        bot.name || owner.name,
        bot.name || owner.name,
        20,
      );
    }

    if (stiker) {
      conn.sendFile(m.chat, stiker, "sticker.webp", "", m);
    }
  } catch (e) {
    console.error(e);
    m.reply("An error occurred while processing your request.");
  }
};

handler.help = ["sticker"];
handler.tags = ["sticker"];
handler.command = /^s(tic?ker)?(gif)?$/i;

export default handler;

const isUrl = (text) =>
  text.match(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*\.(jpe?g|gif|png))/gi,
  );

async function mp4ToWebp(file, stickerMetadata) {
  let getBase64 = file.toString("base64");
  const Format = {
    file: `data:video/mp4;base64,${getBase64}`,
    processOptions: {
      crop: stickerMetadata?.crop,
      startTime: "00:00:00.0",
      endTime: "00:00:07.0",
      loop: 0,
    },
    stickerMetadata: {
      ...stickerMetadata,
    },
    sessionInfo: {
      WA_VERSION: "2.2106.5",
      PAGE_UA:
        "WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36",
      WA_AUTOMATE_VERSION: "3.6.10 UPDATE AVAILABLE: 3.6.11",
      BROWSER_VERSION: "HeadlessChrome/88.0.4324.190",
      OS: "Windows Server 2016",
      START_TS: 1614310326309,
      NUM: "6247",
      LAUNCH_TIME_MS: 7934,
      PHONE_VERSION: "2.20.205.16",
    },
    config: {
      sessionId: "session",
      headless: true,
      qrTimeout: 20,
      authTimeout: 0,
      cacheEnabled: false,
      useChrome: true,
      killProcessOnBrowserClose: true,
      throwErrorOnTosBlock: false,
      chromiumArgs: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--aggressive-cache-discard",
        "--disable-cache",
        "--disable-application-cache",
        "--disable-offline-load-stale-cache",
        "--disk-cache-size=0",
      ],
      executablePath:
        "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      skipBrokenMethodsCheck: true,
      stickerServerEndpoint: true,
    },
  };
  let res = await fetch(
    "https://sticker-api.openwa.dev/convertMp4BufferToWebpDataUrl",
    {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(Format),
    },
  );
  return Buffer.from((await res.text()).split(";base64,")[1], "base64");
}
