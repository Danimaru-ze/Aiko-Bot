let handler = async (m, { conn }) => {
  global.db.data.settings[conn.user.jid].loading
    ? await m.reply(global.message.loading)
    : false;
  let res = loli.getRandom();
  conn.sendFile(m.chat, res.url, false, "Nehhh Kak ><", m, false);
};
handler.help = ["loli"];
handler.tags = ["anime"];
handler.command = /^(loli)$/i;
handler.limit = true; handler.error = 0
export default handler;

const loli = [
  {
    url: "https://i.pinimg.com/736x/cf/7d/74/cf7d741fecb5e2c6abe1b9b237b30b04.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/b5/b2/62/b5b2620e392e74139487c209c3b03dc2.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/b6/b4/0b/b6b40b6ae0e0123adc040d16d4b05348.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/e3/30/66/e33066f3cdbddd7ba3e37d2d576e8b66.jpg",
  },
  {
    url: "https://i.pinimg.com/474x/7a/72/eb/7a72ebd743f1aa0df55965e6856d02c6.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/9b/2d/65/9b2d652e8f9742d6e6767a5eb3424df6.png",
  },
  {
    url: "https://i.pinimg.com/originals/ee/c1/d8/eec1d883e44ef0a61d11fc6fe3c6d827.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/d0/2f/49/d02f4926e0f7b32685fcce4203752532.jpg",
  },
  {
    url: "https://i.pinimg.com/564x/b4/3d/64/b43d641d0a624008996a01bf64f411d1.jpg",
  },
  {
    url: "https://i.pinimg.com/236x/a4/ad/52/a4ad52b80ea5538d0cc743c95ecca40f.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/de/d4/61/ded461956b110d610f1190dcae5cd59f.jpg",
  },
  {
    url: "https://i.pinimg.com/564x/8e/5c/f0/8e5cf0a7026d0a8b2e94693d5bcf9321.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/b5/02/bc/b502bc59d17ae464560202d1e000a11a.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/49/6e/4b/496e4b7de7edaa6e03c45250f4f516fc.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/4e/dd/43/4edd430da39fb3f969865fb377878879.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/82/8c/5c/828c5c9543010265c82cb3e9a7e22539.jpg",
  },
  {
    url: "https://i.pinimg.com/236x/2d/87/0f/2d870ffe100b76810577f90fe8f4c121.jpg",
  },
  {
    url: "https://i.pinimg.com/564x/c7/9c/69/c79c6998a87196995b8370bc45344ffd.jpg",
  },
  {
    url: "https://i.pinimg.com/474x/ca/5f/70/ca5f708da44d1e5b74d604f91d2940b9.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/3c/4f/fb/3c4ffbb99fda42f0cb0bd8a5a8407298.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/c6/73/13/c67313758a2eda2cb063c419b20c4065.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/37/74/13/3774139f776a42d59d28f56a783fa3dc.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/b6/1e/2d/b61e2d7cdd166b63c0e0f29a90ccdca2.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/c9/14/e6/c914e6d3e52c218348a2e0b9581a5d9a.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/7d/cd/4e/7dcd4eedebe7da3d4e9567ede11439e8.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/30/3a/db/303adb62a2e5fe179f698ff992520420.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/db/86/c6/db86c635ac3ae10373ff460eea4ec7fe.jpg",
  },
  {
    url: "https://i.pinimg.com/564x/aa/d0/89/aad089b60695808ef7f3d86550907410.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/d9/fb/a8/d9fba8e7ae331cbe83bd0dbb8697e15f.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/05/58/b4/0558b44e6fb2afaaa22db18adcbc5f30.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/97/5c/dd/975cdd87fe34a5832f07b8e17d5edd1d.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/f0/46/e0/f046e0147179103d0d6c42bb0a77e8e6.png",
  },
  {
    url: "https://i.pinimg.com/originals/9a/76/8b/9a768b08d31d07e30db78ee24be8ea62.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/42/ca/20/42ca20ce567b97ac89eec4e7ed79f1e1.png",
  },
  {
    url: "https://i.pinimg.com/236x/37/a7/33/37a7333ff01f4691a23fbaee1abffb58.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/06/4a/7f/064a7ff14a04fd8bb624e075568213ba.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/7c/a0/66/7ca0669c73078cad874e27e7e20e2d14.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/6f/1b/3f/6f1b3fa3dcde574df7836d2e8a295a9f.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/bd/43/d1/bd43d1beba3c9888707ca91d0ac8ed85.png",
  },
  {
    url: "https://i.pinimg.com/474x/62/65/a3/6265a32d6e32fcfd0231e1a1ada10016.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/67/e0/87/67e0879eac574ea3290ecbde629adb37.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/a5/bb/d5/a5bbd57f5b1b884f27aff0890de43216.jpg",
  },
  {
    url: "https://i.pinimg.com/564x/9a/36/94/9a3694a6bd14e2294706b619b7879d41.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/f6/71/7d/f6717d0dffda72a01a51b8d437e05eba.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/9f/4c/50/9f4c508e6ff5f7a6f790980239a18497.png",
  },
  {
    url: "https://i.pinimg.com/originals/1e/25/7f/1e257fd78c54bf3de6129d8ad38d39b6.png",
  },
  {
    url: "https://i.pinimg.com/originals/13/c5/77/13c57739ad0cdc60fc8ff065f00ee9aa.png",
  },
  {
    url: "https://i.pinimg.com/originals/c9/5e/03/c95e038b17d47a05289b1e951817fd04.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/82/e3/59/82e359ea27b9acf90359f6a2234af06d.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/8d/71/9d/8d719d260e8bb1ef1ac8c2db6f9ca301.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/72/f4/eb/72f4eb5b28e89035c10007125d67e7c3.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/b4/fe/35/b4fe35474c76728474d2ef6d92493a7e.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/b3/1b/50/b31b50676592389319594e04ab1cc54a.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/41/72/a3/4172a3f2212bd8fb33b12a39e1e5bcde.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/15/53/e3/1553e31681b77be72dd4dfe34e7ef5ff.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/4a/c6/64/4ac66497c0ef2ad7788be3042e45a418.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/ab/ff/e7/abffe7475bab7d1a91d2f45742f7753b.jpg",
  },
  {
    url: "https://i.pinimg.com/474x/12/30/23/123023de1c90d7391356aa291226b3df.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/a3/eb/51/a3eb51e91236feeb47b6a192bc501edc.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/f0/7a/3e/f07a3e338ad35cad89254f81f430793a.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/52/c9/d1/52c9d1662b9980ea5828c15c6f2f40bc.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/e6/35/f0/e635f0a968870cfa1f61fe7c54294ebe.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/e1/58/5b/e1585bda44f7c2f53651188438883eca.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/07/1e/93/071e93d9e922000826e5b97c0125f3f3.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/75/a6/6a/75a66aa75bbbc5943de0982b28ce3a7d.png",
  },
  {
    url: "https://i.pinimg.com/originals/81/c2/68/81c268fe66221cf4262b8596acce22bd.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/b9/f8/8c/b9f88c6b29df1bb69704164f9a1f71f0.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/bb/e4/9b/bbe49bc932cb327ebf32a4f09099a3f5.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/82/3d/c5/823dc5924e67e90e2c18f9388667f83d.jpg",
  },
  {
    url: "https://i.pinimg.com/236x/75/d6/f4/75d6f4c8773e43d190597ce4fba88d08.jpg",
  },
  {
    url: "https://i.pinimg.com/236x/ef/46/6b/ef466bdbb29a3b441afeb795f2e54c9a.jpg",
  },
  {
    url: "https://i.pinimg.com/564x/8e/44/88/8e448838113866ee507bf57d4ebebedd.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/1f/f8/d7/1ff8d799952c720cb7e78aa058ac41f7.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/83/de/b7/83deb7d5108736a3703a21fbb574daa6.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/6a/ae/04/6aae043bd88448a6302ae0322053faee.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/4e/0b/62/4e0b62b3d42e3f2b4b021ebc60b12023.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/e3/55/3c/e3553cde950d823a5862b301df9adc29.png",
  },
  {
    url: "https://i.pinimg.com/originals/53/a2/79/53a279fb4a12b715beee319a0c1343d6.png",
  },
  {
    url: "https://i.pinimg.com/originals/4a/3d/01/4a3d0165a5d1a1ef2577a09057377184.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/df/aa/2c/dfaa2cb28ab4353732a2dfe2c20932eb.jpg",
  },
  {
    url: "https://i.pinimg.com/564x/2e/3a/6c/2e3a6cd9e819e888d38cf70d0a117dbf.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/c4/32/7d/c4327df2c6d37f8426d93d352c48bd99.png",
  },
  {
    url: "https://i.pinimg.com/originals/54/35/d6/5435d61e1811e8ae1f364095c3eb32ad.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/42/2d/05/422d05e07268257dbf0602f8417a16a1.jpg",
  },
  {
    url: "https://i.pinimg.com/236x/f3/05/ce/f305ce7aa1e8622cb6634dea461a278a.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/e3/49/94/e34994b4aeec15a025cf95b622e286f8.png",
  },
  {
    url: "https://i.pinimg.com/originals/30/1d/27/301d27cd014867f80c851877fa3a8bcc.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/cf/bb/4a/cfbb4a669cadaab18b19f5522722f3cb.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/cb/b2/0b/cbb20bf3a92499982daa0d1059d17790.jpg",
  },
  {
    url: "https://i.pinimg.com/474x/fe/aa/22/feaa22b7f776fc988fb4ccbf2c539549.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/c9/ea/f7/c9eaf78967ed514f730e6d161b9ee1f9.png",
  },
  {
    url: "https://i.pinimg.com/736x/26/ba/79/26ba79102b971a2da11349d7fd84fdc1.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/72/2c/9b/722c9bb59f65d1d3148f1b751c8ca7d5.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/6c/f3/04/6cf3041ebf6a8f7e4836c98837ea9609.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/86/80/77/8680778b298641c65d81dd0d1c0ee280.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/25/24/22/2524225fc756bc17f98f26d50ef342fa.jpg",
  },
  {
    url: "https://i.pinimg.com/280x280_RS/dc/6e/53/dc6e53b48dd3de659bd43257056147a6.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/73/e0/fb/73e0fb7a2f1ab8a7216f076da3574d0f.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/d7/a4/ac/d7a4ac159dfac1fa0ac5b0d9114a025a.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/cd/ef/fc/cdeffc0bf155fe2c8c63561b437c6864.jpg",
  },
];
