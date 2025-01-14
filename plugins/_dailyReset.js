import {
  resetLimit,
  resetInvestPrice,
  resetChatUser,
  resetChatGc,
} from "../lib/autoScedule.js";

export async function all(m) {
  const setting = global.db.data.settings[this.user.jid];
  if (new Date() * 1 - setting.dailyReset > 86400000) {
    await resetChatUser();
    await resetLimit();
    await resetInvestPrice();
    setting.dailyReset = new Date() * 1;
  }
  return !0;
}
