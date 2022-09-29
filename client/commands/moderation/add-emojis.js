let fetch = require('node-fetch')
let lang_messages = require('../../../lang.json')                                                                                                                                                                                                                                                                                            
let got = require('got')
let axios = require('axios')

module.exports = {
	name: 'add-emojis', // اسم الامر
	description: "to add an emoji to the server", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
    
    let guild = await db.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"
    
async function await_messages(msg, accepts, inn){
  return await new Promise(async (res , rej) =>{
if(accepts === "all"){
client.on('messageCreate', (message) =>{
if(message.channel.id !== inn || msg.author.id !== message.author.id) return;

res(message)
})
}else{
client.on('messageCreate', (message) =>{
if(message.channel.id !== inn || msg.author.id !== message.author.id) return;
if(!accepts.includes(message.content)) return;


res(message)
})
}
  })
}

async function add_reactions_and_await(reactions, msg, author, innn){
  return await new Promise(async (res , rej) =>{

for(const d of reactions){
 msg.addReaction(d)
}
client.on('messageReactionAdd', async (message, emoji, member) =>{
if(member.bot || !message.channel.guild || `${member.id}` !== `${author.id}` || !reactions.includes(emoji.name) || innn !== message.channel.id) return;
res(emoji.name)
})
  })
}

if(!msg.member.permission.has('manageEmojis')) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].must_addemojis[lang],
    color: 14226597
  }
})

 client.createMessage(msg.channel.id, {
  embed :{
    description: `Enter All emojis \`join = ">"\` `,
    color: 14226597
  }
}).then(async m2 =>{
let emojis_message = await await_messages(msg, 'all', msg.channel.id)
m2.delete()
let emojis = emojis_message.content.split('>')
client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": `Loading`,
      "color": 14226597
    }
}).then(async m3 =>{

for(let emoji1 of emojis){
emoji1 = emoji1.replace(' ', '').replace('\n', '')
console.log(emoji1)
emoji1 = emoji1
m3.edit({
  "embed": 
    {
      "description": `Loading Add emoji: ${emoji1}`,
      "color": 14226597
    }
})
const nameemoji = (text) => {
  let split = text.split(`:`);
  if (!split || !split[1]) return;
  let afterurl = split[1];
  let afterSplit = afterurl.split('>');
  if (!afterSplit || !afterSplit[0]) return;
  return afterSplit[0];

}
var urls;
var okurl = true
if(!emoji1.startsWith('<') && !emoji1.startsWith('<a')){
urls = emoji1
const url = `${emoji1}`;
    try {
        const response = await got(url, { responseType: 'buffer' });
        const buffer = response.body;
okurl = true
 await client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].testing_emoji[lang],
      "color": 14226597
    }
}, [{file:buffer, name: "emoji.gif"}]).then(m => m.delete())
    } catch (error) {
okurl = false

    }
}
  
if(emoji1.startsWith('<a')){
console.log(`https://cdn.discordapp.com/emojis/${emoji1.replace('<a:', '').replace('>', '').replace(nameemoji(emoji1), '').replace(':', '')}.gif?v=1`)
urls = `https://cdn.discordapp.com/emojis/${emoji1.replace('<a:', '').replace('>', '').replace(nameemoji(emoji1), '').replace(':', '')}.gif?v=1`
await fetch((`https://cdn.discordapp.com/emojis/${emoji1.replace('<a:', '').replace('>', '').replace(nameemoji(emoji1), '').replace(':', '')}.gif?v=1`) , {method: 'GET', referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.text();
if(!json){
const url = `${emoji1}`;
    try {
        const response = await got(url, { responseType: 'buffer' });
        const buffer = response.body;
okurl = true
 await client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].testing_emoji[lang],
      "color": 14226597
    }
}, [{file:buffer, name: "emoji.gif"}]).then(m => m.delete())
    } catch (error) {
okurl = false

    }

}
})
}
if(emoji1.startsWith('<') && !emoji1.startsWith('<a')){
urls = `https://cdn.discordapp.com/emojis/${emoji1.replace('<:', '').replace('>', '').replace(nameemoji(emoji1), '').replace(':', '')}.png?v=1`
await fetch((`https://cdn.discordapp.com/emojis/${emoji1.replace('<:', '').replace('>', '').replace(nameemoji(emoji1), '').replace(':', '')}.png?v=1`) , {method: 'GET', referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.text();
if(!json){
const url = `${args[0]}`;
    try {
        const response = await got(url, { responseType: 'buffer' });
        const buffer = response.body;
okurl = true
 await client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].testing_emoji[lang],
      "color": 14226597
    }
}, [{file:buffer, name: "emoji.png"}]).then(m => m.delete())
    } catch (error) {
okurl = false

    }
}
})
}
let responsea = await axios.get(urls, { responseType: 'arraybuffer' }).catch(err =>{})
if(!responsea) okurl = false
let avatar;
if(okurl === true) avatar =  "data:" + responsea.headers["content-type"]+ ";base64," + Buffer.from(responsea.data, 'binary').toString('base64')
if(okurl === true) await msg.channel.guild.createEmoji({
"image": avatar,
"name": "newemoji"
})
if(okurl === false) m3.edit({
  "embed": 
    {
      "description": `Failed Add emoji: ${emoji1}`,
      "color": 14226597
    }
})
if(okurl === true) m3.edit({
  "embed": 
    {
      "description": `Done Add emoji: ${emoji1}`,
      "color": 14226597
    }
})
}

m3.edit({
  "embed": 
    {
      "description": `Done All!`,
      "color": 14226597
    }
})
})
})









  }
}