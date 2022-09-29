let mongoose = require('mongoose')
let Discord = require('discord.js')
let ms = require('ms')
let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'warn', // اسم الامر
	description: "to warn someone", // شرح الامر
	cooldown: 10, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, collection, db, db1, db2, db3, giveaway, xp_voice, note, warns) {
    
     let guild = await collection.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"
    
if(!msg.member.permission.has('manageGuild') && !msg.member.permission.has('manageChannels')) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].must_managechannels[lang],
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
    description:lang_messages[0].You_cant_warn[lang] + user.id + ">" ,
    color: 14226597
  }
})

let warns_data = await warns.find({guild: msg.channel.guild.id})

if(warns_data.length < 1) {
 new warns({guild: msg.channel.guild.id, warns: [{by: msg.author.id, id: user.id, reason: args.slice(1).join(" ") || "No Reason", num: 1}]}).save()

let dm = await client.getDMChannel(user.id)

client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].has_been_waned[lang].repalce('[id]', user.id) ,
    color: 14226597
  }
})

dm.createMessage({
  embed:{
title: "You have been warned",
    description:lang_messages[0].dm_warn[lang].replace('[name]', msg.channel.guild.name).replace('[reason]', args.slice(1).join(" ") || "No Reason") ,
    color: 14226597
  }
}).catch(err =>{})
}else{
console.log(lang)

console.log(lang_messages[0].has_been_waned)
console.log(lang_messages[0].has_been_waned[lang])
let dm = await client.getDMChannel(user.id)
let length = warns_data[0].warns.length
if(length === 0) length = 1
await warns.updateOne({guild: msg.channel.guild.id}, {$push: { warns: {"by": msg.author.id, id: user.id, reason: args.slice(1).join(" ") || "No Reason", num: length} }})
client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].has_been_waned[lang].replace('[id]', user.id) ,
    color: 14226597
  }
})

dm.createMessage({
  embed:{
title: "You have been warned",
    description:lang_messages[0].dm_warn[lang].replace('[name]', msg.channel.guild.name).replace('[reason]', args.slice(1).join(" ") || "No Reason") ,
    color: 14226597
  }
}).catch(err =>{})
}

	},
};
