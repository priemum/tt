let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'clear', // اسم الامر
	description: "to clear messages", // شرح الامر
	cooldown: 3, // الكول داون بـ الثواني
  execute: async function(client ,msg , args, collection, db2, db1, db) {
    
    let guild = await collection.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"

if(!msg.member.permission.has('manageMessages')) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].managemessages[lang],
    color: 14226597
  }
})
   let number = Number(args[0]) 
    
    if(!Number(Number(args[0]))) number = 100
    
    if(Number(args[0]) > 501) number = 500
  
console.log(number)
    
  let messages = await client.getMessages(msg.channel.id, number + 1)
  
  var msgs = []
  for(const data of messages) msgs.unshift(data.id)
    //msgs.shift(msg.id)
    let num = msgs.length - 1
    await  client.deleteMessages(msg.channel.id, msgs).catch(err =>{})
  client.createMessage(msg.channel.id, {
    embed:{
      description:lang_messages[0].done_delete[lang] + num + lang_messages[0].messages[lang],
      color: 14226597
    }
  }).then(async m =>{
await new Promise((res , rej) =>{ setTimeout(() => res() , 3000)})
m.delete()
})
	},
};
