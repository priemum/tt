let lang_messages = require('../../../lang.json')  
module.exports = {
	name: 'volume', // اسم الامر
description: "change the volume of the player",
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

let vol = args[0]
if(!vol) return bot.createMessage(message.channel.id , {
  embed:{
  description : lang_messages[0].bot_vol[lang].replace('[volume]', bot.util.vol(connection.volume * 100)).replace('[vol]', connection.volume * 100),
    color:14226597
  }})
  
vol = Math.floor(vol)
if(!vol || vol === NaN) return bot.createMessage(message.channel.id , {
  embed:{
  description : lang_messages[0].vaild_num[lang],
    color:14226597
  }})
if(0 > vol || vol > 150) return bot.createMessage(message.channel.id , {
  embed:{
  description : lang_messages[0].between_vol[lang],
    color:14226597
  }})

connection.setVolume(vol / 100)

return bot.createMessage(message.channel.id , {
  embed:{
  description : lang_messages[0].vol_changed[lang].replace('[bot]', bot.util.vol(vol)).replace('[vol]', vol),
    color:14226597
  }})
}else{
return bot.createMessage(message.channel.id , {
embed: {
  description: lang_messages[0].no_music_running[lang],
  color:14226597
}})
}

}}