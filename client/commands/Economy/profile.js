let lang_messages = require('../../../lang.json')
let fetch = require('node-fetch')

module.exports = {
	name: 'profile', // اسم الامر
	description: "to show your profile", // شرح الامر
	cooldown: 15, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, collection, db, db1, db2, db3, giveaway, xp_voice, note) {

let guild = await collection.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"
 
let level = 0
let mention = true
let user = msg.mentions[0]
if(!user) {
let user1 = await client.getRESTUser(args[0]).catch(err =>{})
if(!user1) user1 = msg.author
mention = false
user = user1
}
if(msg.channel.guild.members.get(user.id)){
mention = true
}
    if(user.bot) return client.createMessage(msg.channel.id,
     {embed:{
       "description": lang_messages[0].bots_dont_have_profiles[lang],
       color: 14226597
     }
      
    })
      fetch(('https://rhyno-edit.glitch.me/api/v1/profile/' + user.id + "/" + msg.channel.guild.id) , {method: 'GET', headers: { 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();

    let buf = Buffer.from(json.buf.split(",")[1], 'base64');
client.createMessage(msg.channel.id, ``, [{file:buf, name: "ID.png"}])

})

	},
};
