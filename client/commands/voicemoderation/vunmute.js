let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'unvmute', // اسم الامر
	description: "un voice Mute", // شرح الامر
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
    description:lang_messages[0].enter_unvmute[lang].replace('[prefix]', prefix).replace('[id]', msg.author.id).replace('[prefix]', prefix).replace('[id]', msg.author.id) ,
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
if(user.voiceState.mute === false) return client.createMessage(msg.channel.id, {
embed: {
      "description": lang_messages[0].this_user_isnt_vmuted[lang],
      "color": 14226597
}
})
user.edit({mute: false})
client.createMessage(msg.channel.id, {
embed: {
      "description": lang_messages[0].has_been_unvmutedd[lang].replace('[id]', user.id) ,
      "color": 14226597
}
})
  }
}