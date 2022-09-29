var randomId = require('random-id');
const pms = require("pretty-ms")
let fetch = require('node-fetch')
var top1 = require("../../../credits-async.js");
var top = new top1()
const moment = require('moment')
let lang_messages = require('../../../lang.json')

module.exports = {
	name: 'daily', // اسم الامر
	description: "taking daily coins", // شرح الامر
	cooldown: 20, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db1, db) {
    
let guild = await db1.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"

let data = await db.find({id: msg.author.id})
if(data.find(d => d.time - Date.now() > 1)) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].you_can_take_daily[lang].replace('(time)', pms(data.find(d => d.time - Date.now() > 1).time - Date.now(), { verbose: true })),
      "color": 14226597
    }
  
})
let credits = await top.get(msg.author.id)

if(credits.blacklist === true) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].youblacklist[lang],
      "color": 14226597
    }
  
})
fetch(('https://dadday-bot.glitch.me/api/v1/captcha') , {method: 'GET', headers: { 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();

var daily = Math.floor(Math.random() * 1700) + 800;

// Draw cat with lime helmet
let buf = Buffer.from(json.buf.split(",")[1], 'base64');

client.createMessage(msg.channel.id, lang_messages[0].please_type_numbers[lang], [{file: buf, name: "code." + json.id + ".captcha." + json.buf.split(";")[0].replace('data:image/', '').replace('data:video/', '').replace('data:gif/', '')}]).then(msgs =>{
if(!msgs) return;
var dn = false
client.on('messageCreate', async (message) => {
if(dn || message.author.id !== msg.author.id) return;
if(msg.channel.id !== message.channel.id){
msgs.delete().catch(err =>{})
return dn = true
}

if(message.content !== json.code){
msgs.delete().catch(err =>{})
return dn = true
}
  dn = true
let data = await db.find({id: msg.author.id})
if(data.find(d => d.time - Date.now() > 1)) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].you_can_take_daily[lang].replace('(time)', pms(data.find(d => d.time - Date.now() > 1).time - Date.now(), { verbose: true })),
      "color": 14226597
    }
  
})
if(msg.channel.guild.id !== "755584636377366588") client.createMessage('841039888601972836', {
  embed:{
    description: `**Daily**

    Member : 
    id :  ${msg.author.id}
    name :  ${msg.author.username}
    user1 createdate : ${moment(msg.author.createdAt).format('YYYY/M/D HH:mm:ss')} \`${moment(msg.author.createdAt).fromNow()}\`
    
    Claimed: ${daily}
    
    In Server :
    id : ${msg.channel.guild.id}
    count : ${msg.channel.guild.memberCount}
    createdate : ${moment(msg.channel.guild.createdAt).format('YYYY/M/D HH:mm:ss')} \`${moment(msg.channel.guild.createdAt).fromNow()}\`
    name : ${msg.channel.guild.name}`,
    color : 14226597
  }
}) 
new db({id: msg.author.id, time: Date.now() + 86400000, claim: daily}).save();
msgs.delete()
message.delete()
top.addpoint(msg.author.id,daily)
client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].recive_daily[lang].replace('[id]', msg.author.username).replace('[daily]', daily),
      "color": 14226597
    }
  
})
})
}).catch(err =>{})
})
	},
};

