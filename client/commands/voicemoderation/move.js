let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'move', // اسم الامر
	description: "Move user to room voice", // شرح الامر
	cooldown: 10, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db, db2) {
    
    let guild = await db.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"

if(!msg.member.permission.has('voiceMoveMembers')) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].voice_move_members[lang],
    color: 14226597
  }
})
    
    let row = await db2.find({id: msg.channel.guild.id})

let prefix = row[0] ? row[0].prefix : "$"
      if(!msg.mentions[0] && !args[0]) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].enter_move[lang].replace('[prefix]', prefix).replace('[id]', msg.author.id).replace('[prefix]', prefix).replace('[id]', msg.author.id).replace('[prefix]', prefix),
    color: 14226597
  }
})
if(!msg.member || !msg.member.voiceState || !msg.member.voiceState.channelID) return client.createMessage(msg.channel.id , {
embed:{
  description:lang_messages[0].you_must_voice[lang],
  color:14226597
}})
let mention = true
let user = msg.mentions[0]
if(!user) {
let user1 = msg.channel.guild.members.get(args[0])
if(args[0] === "all"){
 client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].moving_all[lang] ,
    color: 14226597
  }
}).then(async m =>{
for(const member1 of msg.channel.guild.members){
  let member = msg.channel.guild.members.get(member1[0])
if(member.voiceState && member.voiceState.channelID) member.edit({channelID: msg.member.voiceState.channelID})
}

m.edit({
embed: {
      "description": lang_messages[0].done_moving_all[lang],
      "color": 14226597
}
})
 })
return;
}else{
if(!user1) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].cant_find_user[lang],
    color: 14226597
  }
})
}
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
    description:lang_messages[0].you_cant_move[lang] + user.id + ">" ,
    color: 14226597
  }
})



if(!user || !user.voiceState || !user.voiceState.channelID) return client.createMessage(msg.channel.id , {
embed:{
  description:lang_messages[0].members_not_in_voice[lang],
  color:14226597
}})
if(user.voiceState.channelID === msg.member.voiceState.channelID) return client.createMessage(msg.channel.id, {
embed: {
      "description": lang_messages[0].user_in_your_channel[lang],
      "color": 14226597
}
})
user.edit({channelID: msg.member.voiceState.channelID})
client.createMessage(msg.channel.id, {
embed: {
      "description": lang_messages[0].done_moved_user[lang],
      "color": 14226597
}
})




  }
}