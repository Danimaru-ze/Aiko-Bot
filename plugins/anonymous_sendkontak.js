import PhoneNumber from 'awesome-phonenumber';

export async function handler(m, { command, conn, text }) {
    this.anonymous = this.anonymous ? this.anonymous : {};
    let who = m.sender;
    let room = Object.values(this.anonymous).find(room => room.check(who));
    
    if (!room) {
        return conn.reply(m.chat, 'Kamu tidak berada di anonymous chat', m);
    }

    let other = room.other(who);
    let name = text ? text : conn.getName(m.sender);
    let number = who.split('@')[0];
    
    let vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${name.replace(/\n/g, '\\n')}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
END:VCARD`;

    this.reply(m.chat, `Kamu berhasil mengirim kontak kepada partner mu..`, m);
    
    if (other) {
        this.reply(other, `Partner mengirimkan kontak kepadamu`, m);
        this.sendMessage(other, {
            contacts: {
                displayName: name,
                contacts: [{ vcard }]
            }
        });
    }
}

handler.help = ['sendkontak'];
handler.tags = 'anonymous';
handler.command = /^(sendkontak)$/i;
handler.private = true;
handler.fail = null;

export default handler;