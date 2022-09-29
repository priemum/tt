let lang_messages = require('../../../lang.json')  
module.exports = {
	name: 'skip', // اسم الامر
	description: "Go to next play", // شرح الامر
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

if(!message.member.permission.has("manageGuild")) { 

let channel = bot.getChannel(connection.channelID)
let memberCount = Math.round(channel.voiceMembers.filter(d => !d.bot && d.id !== bot.user.id).length)

memberCount = memberCount < 1 ? 1 : memberCount

if(connection.votes.includes(message.author.id)) return bot.createMessage(message.channel.id , {
embed:{
  description:lang_messages[0].already_voted[lang],
  color:14226597
}})
connection.votes.push(message.author.id)
if(connection.votes.length >= memberCount) {
connection.skip = true
await connection.stopPlaying();
return bot.createMessage(message.channel.id , {
embed:{
  description:lang_messages[0].skiped_song[lang],
  color:14226597
}})
}

return bot.createMessage(message.channel.id , {
embed:{
  description:lang_messages[0].skipping_voted[lang].replace('[votes]', connection.votes.length++).replace('[memberCount]', memberCount),
  color:14226597
}})
}else{
connection.skip = true
await connection.stopPlaying();
if(!connection.now) return bot.createMessage(message.channel.id , {
embed: {
  description: lang_messages[0].no_music_running[lang],
  color:14226597
}})
return bot.createMessage(message.channel.id , {
embed:{
  description:lang_messages[0].skipped_song[lang].replace('[song]', connection.now.title),
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