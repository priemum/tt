let lang_messages = require('../../../lang.json')                                                                                                                                                                                                                                                                                            
module.exports = {
	name: 'gend', // اسم الامر
	description: "For End Give away", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
  usage: [],		
	execute: async function(client ,msg , args, db3, db1, db2, db4, db5, db) {
  
  let guild = await db3.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"

if(!args[0]) {
let row = await db.find({channel: msg.channel.id, end: false})
if(row[0]){
let message = await client.getMessage(msg.channel.id, row[row.length].messageid).catch(err =>{})
if(message) args[0] = message.id
console.log(message.id)
}
}
let rows = await db.find({messageid: args[0], end: false})
if(rows.length < 1) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].cant_find_giveaway[lang],
    color: 14226597
  }
})

if(rows[0].guild !== msg.channel.guild.id){
let guild = client.guilds.get(rows[0].guild)
let member = guild.members.get(msg.author.id)
if(!member.permission.has("manageGuild")) 
return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].you_must_have_of[lang].replace('[guildname]', guild.name),
    color: 14226597
  }
})
return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].cant_find_giveaway[lang],
    color: 14226597
  }
})

}else{
if(!msg.member.permission.has("manageGuild")) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].you_must_gend[lang],
    color: 14226597
  }
})
}
  await db.updateOne({messageid: rows[0].messageid}, {"time": 1000})
return client.createMessage(msg.channel.id, lang_messages[0].done_gend[lang])
},
};