let lang_messages = require('../../../lang.json') 
let fetch = require('node-fetch')
let got = require('got')
module.exports = {
	name: 'emojis', // اسم الامر
	description: "show server emojis", // شرح الامر
	cooldown: 10, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
    
    let guild = await db.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"

let msgs = ``
var emojis_png = []
var emojis_gif = []
for(const data of msg.channel.guild.emojis){
await fetch((`https://cdn.discordapp.com/emojis/${data.id}.gif?v=1`) , {method: 'GET', referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.text();

if(!json) emojis_png.unshift({id: data.id, name: data.name})
if(json) emojis_gif.unshift({id: data.id, name: data.name})
})
}
for(const d of emojis_gif){
if(msgs.length > 1900){
 client.createMessage(msg.channel.id, {
  embed :
{
  "description" : msgs || lang_messages[0].no_emojis[lang],
  "color": 14226597
}


})
msgs = ``
}
msgs = msgs + `<a:${d.name}:${d.id}>`

}
for(const d of emojis_png){
if(msgs.length > 1900){
 client.createMessage(msg.channel.id, {
  embed :
{
  "description" : msgs || lang_messages[0].no_emojis[lang],
  "color": 14226597
}


})
msgs = ``
}
msgs = msgs + `<:${d.name}:${d.id}>`

}
client.createMessage(msg.channel.id, {
  embed :
{
  "description" : `**<:Emoji:839595652044685362> All the emojis in this server :**\n
${msgs || "Server Don't Have any emojis"}`,
  "color": 14226597
}


})
	},
};
