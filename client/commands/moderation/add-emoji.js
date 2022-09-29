let fetch = require('node-fetch')
let got = require('got')
let axios = require('axios')
let lang_messages = require('../../../lang.json')                                                                                                                                                                                                                                                                                            
module.exports = {
	name: 'add-emoji', // اسم الامر
	description: "to add an emoji to the server", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
    
    let guild = await db.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"
    
    
    let row = await db.find({id: msg.channel.guild.id})

let prefix = row[0] ? row[0].prefix : "$"
if(!msg.member.permission.has('manageEmojis')) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].must_addemojis[lang],
    color: 14226597
  }
})
var urls;
var attachments = false
var okurl = true
var name = "new_emoji"
let length = args.length
var role_use = args[args.length - 1]
if(length === 0) role_use = args[0]
console.log(role_use)
if(msg.attachments[0]){
attachments = true
urls = msg.attachments[0].url
role_use = args[0]
}else{
urls = args[0]
role_use = args[1]
}
  if(!role_use) role_use = "all"

if(!urls || !role_use || !name) return client.createMessage(msg.channel.id, {
  embed :
{
  "description" : lang_messages[0].use_addemojis[lang].replace('[prefix]', prefix),
  "color": 14226597
}
})
if(!attachments){
const nameemoji = (text) => {
  let split = text.split(`:`);
  if (!split || !split[1]) return;
  let afterurl = split[1];
  let afterSplit = afterurl.split('>');
  if (!afterSplit || !afterSplit[0]) return;
  return afterSplit[0];

}
if(!args[0].startsWith('<') && !args[0].startsWith('<a')){
urls = args[0]
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
}, [{file:buffer, name: "emoji.gif"}]).then(m => m.delete())
    } catch (error) {
okurl = false
          client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].failed_emoji[lang],
      "color": 14226597
    }
});
    }
}
  
if(args[0].startsWith('<a')){
urls = `https://cdn.discordapp.com/emojis/${args[0].replace('<a:', '').replace('>', '').replace(nameemoji(args[0]), '').replace(':', '')}.gif?v=1`
await fetch((`https://cdn.discordapp.com/emojis/${args[0].replace('<a:', '').replace('>', '').replace(nameemoji(args[0]), '').replace(':', '')}.gif?v=1`) , {method: 'GET', referrerPolicy: "no-referrer"}).then(async ress =>{
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
}, [{file:buffer, name: "emoji.gif"}]).then(m => m.delete())
    } catch (error) {
okurl = false
          client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].failed_emoji[lang],
      "color": 14226597
    }
});
    }

}
})
}
if(args[0].startsWith('<') && !args[0].startsWith('<a')){
urls = `https://cdn.discordapp.com/emojis/${args[0].replace('<:', '').replace('>', '').replace(nameemoji(args[0]), '').replace(':', '')}.png?v=1`
await fetch((`https://cdn.discordapp.com/emojis/${args[0].replace('<:', '').replace('>', '').replace(nameemoji(args[0]), '').replace(':', '')}.png?v=1`) , {method: 'GET', referrerPolicy: "no-referrer"}).then(async ress =>{
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
          client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].failed_emoji[lang],
      "color": 14226597
    }
});
    }
}
})
}
}
if(!okurl) return;
if(!role_use) role_use = "all"
console.log(role_use)
if(role_use){
if(role_use !== "all"){
if(msg.roleMentions[0]){
role_use = msg.roleMentions[0]
}
if(!msg.roleMentions[0]) role_use = msg.channel.guild.roles.get(role_use)

if(!role_use) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": `**<:no:839305037007814656> I Can't find this role **`,
      "color": 14226597
    }
});
}
}

if(okurl && role_use && name && urls){
console.log(urls)
let responsea = await axios.get(urls, { responseType: 'arraybuffer' })
let avatar = "data:" + responsea.headers["content-type"]+ ";base64," + Buffer.from(responsea.data, 'binary').toString('base64')
var able = true
var error = ``
console.log(role_use)

if(role_use !== "all"){
msg.channel.guild.createEmoji({
"image": avatar,
"name": name,
"roles": [role_use]
}).catch(err =>{
able = false
error = err.message
}).then(data =>{
console.log(error)
if(able) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].added_emoji[lang],
      "color": 14226597
    }
});
if(!able) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].error_emoji[lang].replace('[error]', error),
      "color": 14226597
    }
});
})
}
if(role_use === "all"){
msg.channel.guild.createEmoji({
"image": avatar,
"name": name
}).catch(err =>{
able = false
error = err.message
}).then(data =>{
console.log(error)
if(able) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].added_emoji[lang],
      "color": 14226597
    }
});
if(!able) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].error_emoji[lang].replace('[error]', error),
      "color": 14226597
    }
});
})
}
}
console.log(urls)

	},
};
