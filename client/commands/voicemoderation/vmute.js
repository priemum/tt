let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'vmute', // اسم الامر
	description: "voice Mute", // شرح الامر
	cooldown: 10, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db, db2) {
    
    let guild = await db.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"

if(!msg.member.permission.has('voiceMuteMembers')) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].must_voice_mute[lang],
    color: 14226597
  }
})
let row = await db2.find({id: msg.channel.guild.id})

let prefix = row[0] ? row[0].prefix : "$"
      if(!msg.mentions[0] && !args[0]) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].enter_vmute[lang].replace('[prefix]', prefix).replace('[id]', msg.author.id).repalce('[prefix]', prefix).replace('[id]', msg.author.id),
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
    description:lang_messages[0].you_cant_vmute[lang] + user.id + ">" ,
    color: 14226597
  }
})
if(user.voiceState.mute === true) return client.createMessage(msg.channel.id, {
embed: {
      "description": lang_messages[0].already_vmuted[lang],
      "color": 14226597
}
})
user.edit({mute: true})
client.createMessage(msg.channel.id, {
embed: {
      "description": lang_messages[0].has_been_vmuted[lang].replace('[id]', user.id),
      "color": 14226597
}
})

  }
}