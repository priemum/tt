let mongoose = require('mongoose')
let Discord = require('discord.js')
let ms = require('ms')
let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'warns', // اسم الامر
	description: "to get everyone's warns", // شرح الامر
	cooldown: 10, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, collection, db, db1, db2, db3, giveaway, xp_voice, note, warns) {
    
     let guild = await collection.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"
    let data = await warns.find({guild: msg.channel.guild.id})
    let mention = true
let user = msg.mentions[0]
if(!user) {
let user1 = msg.channel.guild.members.get(args[0])
mention = false
user = user1
}else{
user = msg.channel.guild.members.get(msg.mentions[0].id)
}

if(!user){
    
  if(data.length < 1){
    
   client.createMessage(msg.channel.id, lang_messages[0].no_warns[lang]) 
    
  }else{
    
    
    var msgs = ``
    var dn = false
    
    for(const d of data[0].warns){
 if(msgs.length > 1900){
await client.createMessage(msg.channel.id, msgs)
   msgs = ``
   dn = true
 }
      msgs = msgs + `Number: ${d.num}\nAuthor: <@${d.id}>\nReason \`\`\`${d.reason}\`\`\`\nStaff: <@${d.by}>\n`
      
    }
    if(msgs) client.createMessage(msg.channel.id, msgs)
    if(dn === false && !msgs) client.createMessage(msg.channel.id, lang_messages[0].no_warns[lang])
  }
}else{
  if(data.length < 1){
    
   client.createMessage(msg.channel.id, lang_messages[0].no_warns[lang]) 
    
  }else{
    
    
    var msgs = ``
    var dn = false
    
    for(const d of data[0].warns.filter(dd => dd.id === user.id)){
 if(msgs.length > 1900){
await client.createMessage(msg.channel.id, msgs)
   msgs = ``
   dn = true
 }
      msgs = msgs + `Number: ${d.num}\nAuthor: <@${d.id}>\nReason \`\`\`${d.reason}\`\`\`\nStaff: <@${d.by}>\n`
      
    }
    if(msgs) client.createMessage(msg.channel.id, msgs)
    if(dn === false && !msgs) client.createMessage(msg.channel.id, lang_messages[0].no_warns[lang])
  }
}

	},
};
