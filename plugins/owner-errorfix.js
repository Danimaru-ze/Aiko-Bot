const handler = async (m, { conn, text }) =>
{
  const anu = global.db.data.bots.blockcmd;
  const length = anu.length;

  global.db.data.bots.blockcmd = [];

  m.reply('Berhasil menghapus blockcmd dengan jumlah block *' + length + '* command');
}

handler.owner = true;
handler.tags = ['owner'];
handler.help = ['delblockcmd'];
handler.command = ["delblockcmd"];

export default handler;