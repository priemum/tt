let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'deaf', // اسم الامر
	description: "voice Mute", // شرح الامر
	cooldown: 10, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db, db2) {
    
    let guild = await db.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"

if(!msg.member.permission.has('voiceDeafenMembers')) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].voice_deafen[lang],
    color: 14226597
  }
})
let row = await db2.find({id: msg.channel.guild.id})

let prefix = row[0] ? row[0].prefix : "$"
      if(!msg.mentions[0] && !args[0]) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].enter_deaf[lang].replace('[prefix]', prefix).replace('[id]', msg.author.id).replace('[prefix]', prefix).repalce('[id]', msg.author.id),
    color: 14226597
  }
})
let mention = true
let user = msg.mentions[0]
if(!user) {
let user1 = msg.channel.guild.members.get(args[0])
if(!user1) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].cant_find_user[lang],
    color: 14226597
  }
})
mention = false
user = user1
}else{
user = msg.channel.guild.members.get(msg.mentions[0].id)
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
    description:lang_messages[0].you_cant_deaf[lang] + user.id + ">" ,
    color: 14226597
  }
})
if(user.voiceState.deaf === true) return client.createMessage(msg.channel.id, {
embed: {
      "description": lang_messages[0].already_deaf[lang],
      "color": 14226597
}
})
user.edit({deaf: true})
client.createMessage(msg.channel.id, {
embed: {
      "description": "**<:yes:839305757576003585> ** <@" + user.id + lang_messages[0].has_been_deaf[lang],
      "color": 14226597
}
})

  }
}