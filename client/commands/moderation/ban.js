let ms = require('ms')
let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'ban', // اسم الامر
	description: "to ban a member from the server", // شرح الامر
	cooldown: 15, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db2, db1, db) {
    
     let guild = await db2.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"
    

if(!msg.member.permission.has('banMembers')) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].must_banmembers[lang],
    color: 14226597
  }
})
    
   let row = await db2.find({id: msg.channel.guild.id})

let prefix = row[0] ? row[0].prefix : "$"
      if(!msg.mentions[0] && !args[0]) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].you_must_ban[lang].replace('[prefix]', prefix).replace('[id]', msg.author.id).replace('[prefix]', prefix).replace('[id]', msg.author.id),
    color: 14226597
  }
})
let mention = true
let user = msg.mentions[0]
if(!user) {
let user1 = await client.getRESTUser(args[0]).catch(err =>{})
if(!user1) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].cant_find_user[lang],
    color: 14226597
  }
})
mention = false
user = user1
}
if(msg.channel.guild.members.get(user.id)){
mention = true
}

let permissions = false

if(mention){
let member = msg.channel.guild.members.get(user.id)

let author_sorted_roles = msg.member.roles.sort((a , b) => msg.channel.guild.roles.get(b).position - msg.channel.guild.roles.get(a).position)
let member_sorted_roles = member.roles.sort((a , b) => msg.channel.guild.roles.get(b).position - msg.channel.guild.roles.get(a).position)

let potion_member = msg.channel.guild.roles.get(member_sorted_roles[0]) || {position: 0}
let potion_author = msg.channel.guild.roles.get(author_sorted_roles[0]) || {position: 0}

console.log(potion_author.position)
console.log(potion_member.position)
if(potion_author.position > potion_member.position) permissions = false
if(potion_author.position === potion_member.position) permissions = true

if(msg.author.id === member.id) permissions = true
if(msg.author.id === msg.channel.guild.ownerID) permissions = false
if(member.id === msg.channel.guild.ownerID) permissions = true
}
    
    if(permissions) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].you_cant_ban[lang] + user.id + ">" ,
    color: 14226597
  }
})
let time = args[1] || "t"
let reason = args.slice(2).join(" ") || "No Reason"
    if(!ms(time)) {
reason = args[0]
new db({guild: msg.channel.guild.id,id: user.id, time: ms('3d') + Date.now()}).save();
time = 1
}else{
new db({guild: msg.channel.guild.id, id: user.id, time: ms(time) + Date.now()}).save();
time = 1
}
var able = true
let ban = await client.banGuildMember(msg.channel.guild.id, user.id, time, `Banned by ${msg.author.username} (${msg.author.id}) with reason : ` + reason).catch(async err =>{
able = false
 await client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].i_cant_ban[lang] + user.id + ">" ,
    color: 14226597
  }
})
})

if(!ban && able) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].this_user[lang] + `${user.username}` + lang_messages[0].has_been_banned[lang] ,
    color: 14226597
  }
})
    
	},
};
