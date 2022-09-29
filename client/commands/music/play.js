let lang_messages = require('../../../lang.json')  
module.exports = {
	name: 'play', // اسم الامر
	description: "play music", // شرح الامر
	cooldown: 5, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
    
    let guild = await db.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"
    
    let row = await db.find({id: msg.channel.guild.id})
let prefix = row[0] ? row[0].prefix : "$"

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
let join = await await new Promise((re , rej) =>{
bot.joinVoiceChannel(message.member.voiceState.channelID).then(re).catch(e => re())
})
if(!join) return bot.createMessage(message.channel.id , {
embed:{
  description:lang_messages[0].cant_join[lang],
  color:14226597
}})
connection = join
bot.util.connectionSetup(join , message , message.member.voiceState.channelID , bot)
}

if(connection.now && connection.paused && args.length < 1) {
try{
connection.resume()
return bot.createMessage( message.channel.id , {
embed:{
  description:lang_messages[0].song_title[lang].replace('[songname]', connection.now.title),
  color:14226597
}}) 
} catch {}
}

if(args.length < 1) return bot.createMessage( message.channel.id ,{
    embed:{
      description:lang_messages[0].search_song[lang].replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix),
      color:14226597
    }
} )

bot.createMessage(message.channel.id , {
embed:{
  description:`🔎 **Searching: ${args.join(" ")}**`,
  color:14226597
}}).then(async msg =>{
if(!msg || !msg.id) throw new Error(".")

let searchQuery1 = await bot.util.search(args.join(" "))

if(!searchQuery1) return msg.edit({
embed:{
  description:lang_messages[0].no_results[lang],
  color:14226597
}})

let searchQuery = await bot.util.search(searchQuery1.title)

if(!searchQuery) return msg.edit({
embed:{
  description:lang_messages[0].no_results[lang],
  color:14226597
}})
let data = await bot.util.play(connection , searchQuery , message).catch(err =>{})

msg.edit({embed:{
  description :`<:Music:839385313776107521> ** ${data.song ? `${lang_messages[0].start_playing[lang]} : ${data.song}\n` : ""} ${data.added
? typeof data.added === "number" ? lang_messages[0].added_song[lang].replace('[added]', data.added) 
: lang_messages[0].added_data[lang].replace('[added]',data.added)
: ""}**`,
color:14226597 
}})

}).catch(err => {return console.log(err)})

}}