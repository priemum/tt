let mongoose = require('mongoose')
let Discord = require('discord.js')
let ms = require('ms')
let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'removewarn', // اسم الامر
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

let data = await warns.find({guild: msg.channel.guild.id})

if(data.length < 1) return client.createMessage(msg.channel.id, {
  embed:{
    description:`**I Can't find this warn**`,
    color: 14226597
  }
})

let find = data[0].warns.find(d => `${d.num}` === `${args[0]}`)
if(!find) return client.createMessage(msg.channel.id, {
  embed:{
    description:`**I Can't find this warn**`,
    color: 14226597
  }
})
await warns.updateOne({guild: msg.channel.guild.id}, {$pull: { warns: find }})

 client.createMessage(msg.channel.id, {
  embed:{
    description:`**Done**`,
    color: 14226597
  }
})

  }
}