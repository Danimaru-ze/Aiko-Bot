
export async function handler(m, { command, usedPrefix }) {
    command = command.toLowerCase();
    this.anonymous = this.anonymous ? this.anonymous : {};

    switch (command) {
        case 'next':
        case 'skip':
        case 'stop': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender));
            if (!room) {
                await this.reply(m.chat, 'Kamu tidak sedang berada di anonymous chat', m);
                throw 0; // Menghentikan eksekusi lebih lanjut
            }
            this.reply(m.chat, 'Kamu telah memberhentikan chat', m);
            let other = room.other(m.sender);
            if (other) this.reply(other, 'Partner telah memberhentikan chat', m);
            delete this.anonymous[room.id];
            if (command === 'stop') break;
            break; // Pastikan untuk menambahkan break di akhir case
        }
        case 'search':
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) {
                throw 'Kamu masih berada di dalam anonymous chat';
            }
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender));
            if (room) {
                this.reply(room.a, 'Menemukan partner!', m);
                room.b = m.sender;
                room.state = 'CHATTING';
                this.reply(room.b, 'Menemukan partner!', m);
            } else {
                let id = +new Date();
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who);
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : '';
                    },
                };
                m.reply('Menunggu partner...');
            }
            break;
        }
    }
}

handler.help = ['start', 'skip', 'stop', 'next'];
handler.tags = 'anonymous';
handler.command = ['start', 'skip', 'stop', 'next', 'search'];
handler.private = true;

export default handler;