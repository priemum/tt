var top1 = require("../../../credits-async.js");
var top = new top1()
let lang_messages = require('../../../lang.json')
module.exports = {
	name: 'removecoins', // اسم الامر
	description: "only me can use it to remove coins from someone", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {

let guild = await db.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"
    
let admins = ['463208341804548097', '535423612308422668']
 if(!admins.includes(msg.author.id)) return;
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
let user_credits = await top.get(user.id)
let num = Number(args[1])
top.set(user.id, user_credits.credits - num)
client.createMessage(msg.channel.id, `Done!`)
	},
};
