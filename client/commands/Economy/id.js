let lang_messages = require('../../../lang.json')
let fetch = require('node-fetch')

module.exports = {
	name: 'id', // اسم الامر
	description: "to show your profile", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, collection, db4, db1, db2, db3, giveaway, db) {
    
let guild = await collection.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"

let mention = true
let user = msg.mentions[0]
if(!user) {
let user1 = msg.channel.guild.members.get(args[0])
if(!user1) user1 = msg.author
mention = false
user = user1
}else{
user = msg.channel.guild.members.get(msg.mentions[0].id)
}
if(msg.channel.guild.members.get(user.id)){
mention = true
}
    if(user.bot) return client.createMessage(msg.channel.id,
     {embed:{
       "description": lang_messages[0].bots_dont_have_id[lang],
       color: 14226597
     }
      
    })

fetch(('https://rhyno-edit.glitch.me/api/v1/rank/' + user.id + "/" + msg.channel.guild.id) , {method: 'GET', headers: { 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();

    let buf = Buffer.from(json.buf.split(",")[1], 'base64');
client.createMessage(msg.channel.id, ``, [{file:buf, name: "ID.png"}])

})
	},
};