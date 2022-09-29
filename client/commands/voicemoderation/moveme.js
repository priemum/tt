let Discord = require('discord.js')
let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'moveme', // اسم الامر
	description: "Move you to room voice", // شرح الامر
	cooldown: 10, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db, db2) {
    
    let guild = await db.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"
    
let row = await db2.find({id: msg.channel.guild.id})

let prefix = row[0] ? row[0].prefix : "$"
      if(!msg.mentions[0] && !args[0]) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].enter_moveme[lang].replace('[prefix]', prefix).replace('[id]', msg.author.id).replace('[prefix]', prefix).replace('[id]', msg.author.id),
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


if(!msg.member || !msg.member.voiceState || !msg.member.voiceState.channelID) return client.createMessage(msg.channel.id , {
embed:{
  description:lang_messages[0].you_must_voice[lang],
  color:14226597
}})



if(!user || !user.voiceState || !user.voiceState.channelID) return client.createMessage(msg.channel.id , {
embed:{
  description:lang_messages[0].members_not_in_voice[lang],
  color:14226597
}})
let channel = msg.channel.guild.channels.get(user.voiceState.channelID)
if(!channel) return;
let perms = channel.permissionsOf(msg.member.id)
let channel_permission_allow = `${perms.allow}`.replace('n', '')
let permissions = new Discord.Permissions(Number(channel_permission_allow))
console.log(permissions.toArray())
if(!permissions.toArray().includes('CONNECT')) return client.createMessage(msg.channel.id, {
embed: {
      "description": lang_messages[0].you_cant_connect[lang],
      "color": 14226597
}
})
msg.member.edit({channelID: user.voiceState.channelID}).catch(err =>{}).then(m => console.log(m))
client.createMessage(msg.channel.id, {
embed: {
      "description": lang_messages[0].done_you_moved[lang],
      "color": 14226597
}
})

  }
}