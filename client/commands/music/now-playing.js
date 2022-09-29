let lang_messages = require('../../../lang.json')  
module.exports = {
	name: 'now-playing', // اسم الامر
	description: "Now Playing", // شرح الامر
	cooldown: 5, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {

    let guild = await db.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"
    
let message = msg
let bot = client
if(!message.member || !message.member.voiceState || !message.member.voiceState.channelID) return bot.createMessage(message.channel.id , {
embed:{
  description:lang_messages[0].you_must_voice[lang],
  color:14226597
}})
let connection = bot.voiceConnections.find(d => d.id == message.guildID)

if(connection){
if(connection.channelID !== message.member.voiceState.channelID) return bot.createMessage(message.channel.id , {
  embed:{
    description:lang_messages[0].must_be_in_this_room[lang].replace('[botchannel]', bot.getChannel(connection.channelID) ? bot.getChannel(connection.channelID).name || "undefined" : "undefined"),
    color:14226597
  }
})
}else{
return bot.createMessage(message.channel.id , {
embed: {
  description: lang_messages[0].no_music_running[lang],
  color:14226597
}})
}

if(!connection.now || !connection.playing){
return bot.createMessage(message.channel.id , {
embed: {
  description: lang_messages[0].no_music_running[lang],
  color:14226597
}})
}


let embed = {
title: connection.now.title.slice(0 , 250),
color: connection.now.type === "video" || connection.now.videoId ? 14226597 : 14226597,
description: bot.util.embedFormat(connection)
}

bot.createMessage(message.channel.id , {embed})


}}