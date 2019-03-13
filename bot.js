const Discord = require('discord.js');
const client = new Discord.Client();

client.on("message", msg=>{
let id = "532613290795335700"; // ايديك
let role = "VIP"; // اسم رتبة الفيب
let Price = 10000; // السعر
let Price2 = Math.floor(Price-(Price*(1/100)));
if(!Price || Price < 1) return;
let cmd = msg.content.split(' ')[0];
if(cmd === `${prefix}vip`){
if(msg.author.bot) return;
if(!msg.channel.guild) return;
let embedvip = new Discord.RichEmbed()
.setColor("#42f4f4")
.setAuthor(msg.author.username, msg.author.displayAvatarURL)
.setThumbnail(msg.author.avatarURL)
.setTitle("**اختر الطريقة المناسبة لك**")
.addField("ل شراء الفي اي بي لنفسك","🔱",true )
.addField("ل شراء الفي اي بي ك هدية","🎁",true)
.setTimestamp()
.setFooter(client.user.username,client.user.displayAvatarURL);
msg.channel.send(embedvip).then(msgs2 =>{
msgs2.react("🔱").then(()=>{
  msgs2.react("🎁").then(()=>{
    const me = (reaction, user) => reaction.emoji.name === '🔱' && user.id === msg.author.id;
    const gift = (reaction, user) => reaction.emoji.name === '🎁' && user.id === msg.author.id;
    const mec = msgs2.createReactionCollector(me, {time: 120000});
    const giftc = msgs2.createReactionCollector(gift, {time: 120000});
mec.on("collect", r=>{  
msgs2.delete()
if(msg.member.roles.find(r=>r.name == role)) return msg.reply("انت تمتلك الرتبة مسبقًا");
let roleW = msg.guild.roles.find(r=>r.name == role);
if(!roleW) return msg.reply(`البوت مقفل لعدم وجود رتبة ب أسم \`${role}\``)
msg.channel.send(`كردت بروبوت\`${Price}\` لديك 4 دقائق لتحويل
إلى ${msg.guild.members.get(id)}
`).then( msgs =>{
const filter = response => response.author.id == "282859044593598464" && response.mentions._content.includes(`:moneybag: | ${msg.author.username}, has transferred \`$${Price2}\` to ${msg.guild.members.get(id)}`);
msg.channel.awaitMessages(filter, { maxMatches: 1, time: 240000, errors: ['time'] })
.then( collected =>{
msgs.delete()
msg.reply(`تم اعطائك رتبة \`${role}\``);
msg.member.addRole(roleW);
}).catch(e => {});
})})
giftc.on("collect", r=>{
  msgs2.delete()
  let roleW = msg.guild.roles.find(r=>r.name == role);
  if(!roleW) return msg.reply(`البوت مقفل لعدم وجود رتبة ب أسم \`${role}\``)
msg.channel.send(`كردت بروبوت\`${Price}\` لديك 4 دقائق لتحويل
إلى ${msg.guild.members.get(id)}
`).then( msgs =>{
  const filter = response => response.author.id == "282859044593598464" && response.mentions._content.includes(`:moneybag: | ${msg.author.username}, has transferred \`$${Price2}\` to ${msg.guild.members.get(id)}`);
  msg.channel.awaitMessages(filter, { maxMatches: 1, time: 240000, errors: ['time'] })
  .then( collected =>{
  msgs.delete()
  genKey(msg,roleW);
  }).catch(e => {});
  })
})
})})})
///
}
if(cmd === `${prefix}usesdsd`){
  let args = msg.content.split(" ").slice(1)[0];
  if(!args) {  
    let embed = new Discord.RichEmbed()
    .setColor("#42f4f4")
    .setTitle(`:x: - **الرجاء ادخال كود الهدية** \`${prefix}used <Key>\``)
    msg.reply(embed).then( z => z.delete(3000));
    return
}
  let embed = new Discord.RichEmbed()
.setTitle(`**جاري التحقق من الكود**`)
.setColor("#42f4f4")
  msg.reply(embed).then( msgs =>{
  if(vipKeys[args]){
    let hav = msg.member.roles.find(`name`, vipKeys[args].name);
    if(hav){
    let embed = new Discord.RichEmbed()
    .setTitle(`:x: - **انت تمتلك هذه الرتبة مسبقًا**  \`${vipKeys[args].name}\``)
    .setColor("#42f4f4")
    msgs.edit(embed)
    return
    }
    let embed = new Discord.RichEmbed()
    .setTitle(`:tada: - **مبروك تم اعطائك رتبة** \`${vipKeys[args].name}\``)
    .setColor("#42f4f4")
    msgs.edit(embed)
    msg.member.addRole(vipKeys[args]);
    delete vipKeys[args]
    save()
  }else{
    let embed = new Discord.RichEmbed()
    .setTitle(`:x: - **الكود غير صيحيح أو انه مستعمل من قبل**`)
    .setColor("#42f4f4")
    msgs.edit(embed)
  }});
}
});
 
function genKey(msg,role){
  var randomkeys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var gift = "";
  for (var y = 0; y < 16; y++) {   ///16
    gift +=  `${randomkeys.charAt(Math.floor(Math.random() * randomkeys.length))}`;
  }
  vipKeys[gift] = role;
  let embed = new Discord.RichEmbed()
  .setColor("#42f4f4")
  .setTitle(`:ok_hand: - **تم ارسآل الكود على الخاص**`);
  msg.reply(embed);
  let embed2= new Discord.RichEmbed()
  .setAuthor(msg.author.username, msg.author.displayAvatarURL)
  .setThumbnail(msg.author.avatarURL)
  .addField("**Key Of Gift**", gift,true)
  .addField("Role",vipKeys[gift].name,true)
  .addField("This Key Made by", msg.author, true)
  .addField("The Room", msg.channel , true)
  .setTimestamp()
  .setFooter(client.user.username,client.user.displayAvatarURL)  
  msg.author.send(embed2);
  save()
}
 
function save(){
  fs.writeFile("./vipKeys.json", JSON.stringify(vipKeys), (err) => {
    if (err) console.log(err)
  });
 
}


client.on('message', message => {
    if(message.content.startsWith(prefix + "info")){
        var emdeed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setThumbnail(message.author.avatarURL)
        .addField("VIP | في اي بي",`**مميزات الرتبة :
        - رتبة راينبو -rainbow
        - لاستخدام كود -used
        - قيف اوايات خاصه
        - شات خاص باعضاء الفي اي بي
        - للشراء -buy**`)
        message.channel.send(emdeed);
}
    


})
 
var prefix = "-"
giftKeys = {};
let devs = ["532613290795335700"]; 
client.on("message", msg =>{
  let args = msg.content.split(" ").slice(1)[0];
  let cmd = msg.content.split(' ')[0]
  if(cmd === `${prefix}gr`){
  let roleW = msg.mentions.roles.first();
  if(!devs.includes(msg.author.id)){
    let embed = new Discord.RichEmbed()
    .setColor("#42f4f4")
    .setTitle(`:x: - انت لاتمتلك الصلاحية`);
    msg.reply(embed).then( z => z.delete(3000));
     return
  } 
  if(!roleW) {
    let embed = new Discord.RichEmbed()
    .setColor("#42f4f4")
    .setTitle(`:x: - منشن الرتبة \`${prefix}gr <@admin-role>\``);
    msg.reply(embed).then( z => z.delete(3000)); return
  };
  let role = msg.guild.roles.find(`name`, roleW.name);
  if(!role) {
    let embed = new Discord.RichEmbed()
    .setColor("#42f4f4")
    .setTitle(`:x: - Could't find \`${roleW.name}\` role.`);
  msg.reply(embed).then( msgs => msgs.delete(3000)); 
  return
  }
  var randomkeys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var gift = "";
  for (var y = 0; y < 16; y++) {   ///16
    gift +=  `${randomkeys.charAt(Math.floor(Math.random() * randomkeys.length))}`;
  }
  giftKeys[gift] = role;
  let embed = new Discord.RichEmbed()
  .setColor("#42f4f4")
  .setTitle(`:ok_hand: - **تم ارسآل الكود على الخاص**`);
  msg.reply(embed);
  let embed2= new Discord.RichEmbed()
  .setAuthor(msg.author.username, msg.author.displayAvatarURL)
  .setThumbnail(msg.author.avatarURL)
  .addField("**Key Of Gift**", gift,true)
  .addField("Role",giftKeys[gift].name,true)
  .addField("This Key Made by", msg.author, true)
  .addField("The Room", msg.channel , true)
  .setTimestamp()
  .setFooter(client.user.username,client.user.displayAvatarURL)  
  msg.author.send(embed2);
};
if( cmd === `${prefix}used`){
  
  if(!args) {   
    let embed = new Discord.RichEmbed()
    .setColor("#42f4f4")
    .setTitle(`:x: - **الرجاء ادخال كود الهدية** \`${prefix}used <Key>\``)
    msg.reply(embed).then( z => z.delete(3000));
    return
}
let embed = new Discord.RichEmbed()
.setTitle(`**جاري التحقق من الكود**`)
.setColor("#42f4f4")
  msg.reply(embed).then( msgs =>{
  if(giftKeys[args]){
    let hav = msg.member.roles.find(`name`, giftKeys[args].name);
    if(hav){
    let embed = new Discord.RichEmbed()
    .setTitle(`:x: - **انت تمتلك هذه الرتبة مسبقًا**  \`${giftKeys[args].name}\``)
    .setColor("#42f4f4")
    msgs.edit(embed)
    return
    }
    let embed = new Discord.RichEmbed()
    .setTitle(`:tada: - **مبروك تم اعطائك رتبة** \`${giftKeys[args].name}\``)
    .setColor("#42f4f4")
    msgs.edit(embed)
    msg.member.addRole(giftKeys[args]);
    delete giftKeys[args]
  }else{
    let embed = new Discord.RichEmbed()
    .setTitle(`:x: - **الكود غير صحيح أو انه مستعمل من قبل**`)
    .setColor("#42f4f4")
    msgs.edit(embed)
  }});
};
});



client.on('ready', () => {//new ready event
  var prefix = "-"

    setInterval(function(){
        client.guilds.forEach(g => {
                    var role = g.roles.find('name', 'VIP Rainbow');//rainbow role name
                    if (role) {
                        role.edit({color : "RANDOM"});
                    };
        });
    }, 13000);//the rainbow time
  })
client.on('message', message => {//new msg event
    if(!message.channel.guild) return;
      if(message.content.startsWith(prefix + 'rainbow')) {//to create the rainbow role
       let rrole = message.guild.roles.find('name', 'VIP Rainbow')
       if(!message.member.roles.find('name','Legend .')) return message.channel.send(`\`\`\`diff\n-Just For VIP\`\`\``);
       if(message.member.roles.find('name','VIP Rainbow')) return message.channel.send(`عندك الرتبة !`);
       message.member.addRole(rrole);
       var emdo = new Discord.RichEmbed()
       .setTitle(`:white_check_mark: **تم أعطائك الرتبة بنجاح!**`)
     message.channel.send(emdo);
      }
    })
client.login(process.env.BOT_TOKEN);
