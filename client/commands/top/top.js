let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'top', // اسم الامر
	description: "top of 5 users", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(bot ,msg , args, o, oo, ooo, oooo, ooooo, oooooo, db) {
    
     let guild = await o.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"
    
const fs = require("fs")
var top1 = require("../../../levels.js");
var top = new top1()
if(!args[0]){
let data_voice = await db.find({guild: msg.channel.guild.id})

let top_voice = data_voice.sort((a ,b) => b.xp - a.xp)

var ontop_voice = ``
let CCC = 0
var adds = []
for(const d of top_voice){
  if(CCC !== 5 && !adds.includes(d.id)){
  let user = await bot.getRESTUser(d.id).catch(err =>{})
  if(user && !user.bot){
    adds.unshift(d.id)
    CCC++
  if(msg.author.id !== d.id) ontop_voice = ontop_voice + `\n#${CCC} | <@${d.id}> xp: \`${d.xp}\``
  if(msg.author.id === d.id) ontop_voice = ontop_voice + `\n**#${CCC} | <@${d.id}> xp: \`${d.xp}\`**`
  }}
}
let CCCC = 0
if(!adds.includes(msg.author.id)){
  for(const d of top_voice){
   CCCC++
    if(msg.author.id === d.id) ontop_voice = ontop_voice + `\n**#${CCCC} | <@${d.id}> xp: \`${d.xp}\`**`
  }
}
var allids = []
let data = await top.getall(msg.channel.guild.id)

let tops = data.sort((a ,b) => b.xp - a.xp)

var ontop = ``
let C = 0
 for(const data of tops){
if(C !== 5 && !allids.includes(data.id) && data.id !== bot.user.id){
let d = await top.get(data.id, msg.channel.guild.id)
allids.unshift(data.id)
C++
if(data.id === msg.author.id) ontop = ontop + `\n**#${C} | <@${data.id}> xp: \`${d.xp}\`**`
if(data.id !== msg.author.id) ontop = ontop + `\n#${C} | <@${data.id}> xp: \`${d.xp}\``
}
}
    var CC = 0
    if(!allids.includes(msg.author.id)){
      for(const data of tops){
  CC++
        let d = await top.get(data.id, msg.channel.guild.id)
      if(data.id === msg.author.id) ontop = ontop + `\n**#${CC} | <@${data.id}> xp: \`${d.xp}\`**`  
      }
    }
return bot.createMessage(msg.channel.id, {
       embed: {
      title: " Top list",
       description: lang_messages[0].top5[lang].replace('[toptext]', ontop).replace('[topvoice]', ontop_voice),
       color: 14226597
	}})
  }
  if(args[0] === "text"){
    let data_voice = await db.find({guild: msg.channel.guild.id})

let top_voice = data_voice.sort((a ,b) => b.xp - a.xp)

var ontop_voice = ``
let CCC = 0
var adds = []
let CCCC = 0
var allids = []
let data = await top.getall(msg.channel.guild.id)

let tops = data.sort((a ,b) => b.xp - a.xp)

var ontop = ``
let C = 0
 for(const data of tops){
if(C !== 10 && !allids.includes(data.id) && data.id !== bot.user.id){
let d = await top.get(data.id, msg.channel.guild.id)
allids.unshift(data.id)
C++
if(data.id === msg.author.id) ontop = ontop + `\n**#${C} | <@${data.id}> xp: \`${d.xp}\`**`
if(data.id !== msg.author.id) ontop = ontop + `\n#${C} | <@${data.id}> xp: \`${d.xp}\``
}
}
    var CC = 0
    if(!allids.includes(msg.author.id)){
      for(const data of tops){
  CC++
        let d = await top.get(data.id, msg.channel.guild.id)
      if(data.id === msg.author.id) ontop = ontop + `\n**#${CC} | <@${data.id}> xp: \`${d.xp}\`**`  
      }
    }
return bot.createMessage(msg.channel.id, {
       embed: {
      title: " Top list",
       description: lang_messages[0].top10_text[lang].replace('[top10text]', ontop),
       color: 14226597
	}})
  
  }
    
  if(args[0] === "voice"){
    let data_voice = await db.find({guild: msg.channel.guild.id})

let top_voice = data_voice.sort((a ,b) => b.xp - a.xp)

var ontop_voice = ``
let CCC = 0
var adds = []
for(const d of top_voice){
  if(CCC !== 10 && !adds.includes(d.id)){
  let user = await bot.getRESTUser(d.id).catch(err =>{})
  if(user && !user.bot){
    adds.unshift(d.id)
    CCC++
  if(msg.author.id !== d.id) ontop_voice = ontop_voice + `\n#${CCC} | <@${d.id}> xp: \`${d.xp}\``
  if(msg.author.id === d.id) ontop_voice = ontop_voice + `\n**#${CCC} | <@${d.id}> xp: \`${d.xp}\`**`
  }}
}
let CCCC = 0
if(!adds.includes(msg.author.id)){
  for(const d of top_voice){
   CCCC++
    if(msg.author.id === d.id) ontop_voice = ontop_voice + `\n**#${CCCC} | <@${d.id}> xp: \`${d.xp}\`**`
  }
}
var allids = []
let data = await top.getall(msg.channel.guild.id)

let tops = data.sort((a ,b) => b.xp - a.xp)

var ontop = ``
let C = 0
    var CC = 0
    if(!allids.includes(msg.author.id)){
      for(const data of tops){
  CC++
        let d = await top.get(data.id, msg.channel.guild.id)
      if(data.id === msg.author.id) ontop = ontop + `\n**#${CC} | <@${data.id}> xp: \`${d.xp}\`**`  
      }
    }
return bot.createMessage(msg.channel.id, {
       embed: {
      title: " Top list",
       description: lang_messages[0].topvoice[lang].replace('[top10voice]', ontop_voice),
       color: 14226597
	}})
  
  }
  
  
  },
};
