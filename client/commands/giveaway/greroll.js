let lang_messages = require('../../../lang.json')                                                                                                                                                                                                                                                                                                 
module.exports = {
	name: 'greroll', // اسم الامر
	description: "Get One Random Winer", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
  usage: [],	
	
	execute: async function(client ,msg , args, db3, db1, db2, db4, db5, db) {
    
    let guild = await db3.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"

    
if(!msg.member.permission.has("manageGuild")) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].you_must_manageguild[lang],
    color: 14226597
  }
})

if(!args[0]) {
let row = await db.find({channel: msg.channel.id, end: true})
if(row[0]){
let message = await client.getMessage(msg.channel.id, row[row.length].messageid).catch(err =>{})
if(message) args[0] = message.id
}
}
if(!args[0]) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].id_message[lang],
    color: 14226597
  }
})
let rows = await db.find({messageid: args[0]})
if(rows.length < 1) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].cant_find_giveaway[lang],
    color: 14226597
  }
})

if(rows[0].end === true) {
var able = true
client.getMessage(msg.channel.id, args[0]).catch(err =>{
able = false
}).then(message =>{
if(!able) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].cant_find_giveaway[lang],
    color: 14226597
  }
})
if(message.embeds.length < 1) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].cant_find_giveaway[lang],
    color: 14226597
  }
})
var ables = true
client.getMessageReaction(msg.channel.id, args[0], "🎉").catch(err =>{
ables = false
}).then(async userss =>{
if(!ables) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].cant_find_giveaway[lang],
    color: 14226597
  }
})
let users = []
userss.forEach(async user =>{
if(!user.bot) users.unshift(user.id)

})
 function randomUser(key, amount = 1){
    let array = [];
    let keys = Array.from(key);
    while(array.length < amount) {
        let element = keys[Math.floor(Math.random() * keys.length)];
        if(!array.includes(element)) array.push(element);
    }
    return array
  }
let winers = []
let lengths = Math.floor(1)
if(1 >= users.length) lengths = users.length
let winerss = randomUser(users, lengths);
winerss.forEach(u =>{
winers.push(`<@${u}>`)
})
//console
if(winers.length < 1){
client.createMessage(msg.channel.id, `No valid entrants, so a winner could not be determined!
https://discordapp.com/channels/${message.channel.guild.id}/${message.channel.id}/${args[0]}`).catch(err =>{
})
}else{
client.createMessage(msg.channel.id, `Congratulations ${winers.join(',')}! You won the **${message.embeds[0].title}**!
https://discordapp.com/channels/${message.channel.guild.id}/${message.channel.id}/${args[0]}`).catch(err =>{
})
}
})
})
}else{
return client.createMessage(msg.channel.id, {
  embed :{
    description: lang_messages[0].cant_reroll[lang],
    color: 14226597
  }
})
}

},
};