let lang_messages = require('../../../lang.json')  
module.exports = {
	name: 'remove', // اسم الامر
description: "remove a song from the queue",
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
if(!args[0]) return bot.createMessage(message.channel.id , {
embed:{
  description:lang_messages[0].enter_number_song[lang],
  color:14226597
}})

if(args[0].toLowerCase() === "all"){
connection.songs = []
return bot.createMessage(message.channel.id , {
  embed:lang_messages[0].list_removed[lang],
  color:14226597
})
}else{
let n = Math.floor(args[0])
if(!n || n === NaN) return bot.createMessage(message.channel.id , {
  embed: {
    description:lang_messages[0].correct_format[lang],
  color:14226597
         }
})
if(!connection.songs[n - 1]) return bot.createMessage(message.channel.id , {
  embed:{
    description:lang_messages[0].didnt_find_song[lang],
    color:14226597
  }
})
let song = connection.songs[n - 1]

connection.songs.splice(n - 1 ,1); 

return bot.createMessage(message.channel.id ,  {
  embed:{
    description:lang_messages[0].removed_from_list[lang].replace('[song]', song.title),
    color:14226597
  }
})
}

}else{
return bot.createMessage(message.channel.id , {
embed:{
  description:lang_messages[0].no_music_running[lang],
  color:14226597
}})
}

}}
