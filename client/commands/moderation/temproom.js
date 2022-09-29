
let lang_messages = require('../../../lang.json') 
let Discord = require('discord.js')
module.exports = {
	name: 'temproom', // اسم الامر
	description: "to set temp rooms on and off", // شرح الامر
	cooldown: 10, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, collection, db, db1, db2, db3, giveaway, xp_voice, note, warns, temprooms) {
    
     let guild = await db.find({id: msg.channel.guild.id})
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

let data = await temprooms.find({guild: msg.channel.guild.id})
if(data.length < 1){

if(args[0] === "on"){
let room = await client.createChannel(msg.channel.guild.id, "temp rooms", 2).catch(err =>{})

if(!room) return;

new temprooms({guild: msg.channel.guild.id, data: {status: true, id: room.id}, rooms: []}).save()
client.createMessage(msg.channel.id, {
  embed:{
    description: lang_messages[0].temp_on[lang],
    color: 14226597
        }

})
}
if(args[0] === "off"){
new temprooms({guild: msg.channel.guild.id, data: {status: false, id: "none"}, rooms: []}).save()
client.createMessage(msg.channel.id, {
  embed:{
    description: lang_messages[0].temp_already_off[lang],
    color: 14226597
        }

})
}
}else{
if(args[0] === "on"){
  
  if(data[0].data.status === true) return client.createMessage(msg.channel.id, lang_messages[0].temp_already_on[lang])
  
  let cat = await client.createChannel(msg.channel.guild.id, "Temp rooms", 4).catch(err =>{})
if(!cat) return;
  let room = await client.createChannel(msg.channel.guild.id, "Create Temp Room", 2, {parentID: cat.id}).catch(err =>{})

if(!room) return;

await temprooms.updateOne({guild: msg.channel.guild.id},{ "data.status": true})
await temprooms.updateOne({guild: msg.channel.guild.id},{ "data.id": room.id})

client.createMessage(msg.channel.id, {
  embed:{
    description: lang_messages[0].temp_on[lang],
    color: 14226597
        }

})
}
if(args[0] === "off"){
  if(data[0].data.status === false) return client.ceeateMessage(msg.channel.id, lang_messages[0].temp_already_off[lang])
  let channel = msg.channel.guild.channels.get(data[0].data.id)
  if(channel) channel.delete()
await temprooms.updateOne({guild: msg.channel.guild.id},{ "data.status": false})
await temprooms.updateOne({guild: msg.channel.guild.id},{ "data.id": "none"})
client.createMessage(msg.channel.id, {
  embed:{
    description: lang_messages[0].temp_off[lang],
    color: 14226597
        }

})
}
}
  }
}