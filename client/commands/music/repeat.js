let lang_messages = require('../../../lang.json')  
module.exports = {
	name: 'repeat', // اسم الامر
description: "get the current queue of the songs",
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

if((connection.songs.length > 0 || connection.now || connection.playing) && !connection.paused){

if(!message.member.permission.has("manageGuild")) return; 

if(connection.repeating === 0) {
connection.repeating = 1
return bot.createMessage(message.channel.id , {
embed:{
  description:lang_messages[0].current_repeated[lang],
  color:14226597
}})
}else
if(connection.repeating === 1) {
connection.repeating = 2
return bot.createMessage(message.channel.id , {
embed:{
  description:lang_messages[0].complete_repeat[lang],
  color:14226597
}})
}else{
connection.repeating = 0
return bot.createMessage(message.channel.id , {
embed:{
  description:lang_messages[0].stop_repeat[lang],
  color:14226597
}})
}

}else{
return bot.createMessage(message.channel.id , {
embed: {
  description: lang_messages[0].no_music_running[lang],
  color:14226597
}})
}

}}