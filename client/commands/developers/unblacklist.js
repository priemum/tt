var top1 = require("../../../credits-async.js");
var top = new top1()
let lang_messages = require('../../../lang.json')
module.exports = {
	name: 'unblacklist', // اسم الامر
	description: "only me can use it to add coins to someone", // شرح الامر
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
    let dm = await user.getDMChannel().catch(err =>{})
if(dm) dm.createMessage({
  embed: {
    
      "title": "You Have Been UnBlacklisted From `Rhyno Bot`",
      "description": `**Be Careful Next Time**`,
      "color": 14226597,
      "author": {
        "name": `${user.username}`
      },
      "footer": {
        "text": "join our support server for more information",
        "icon_url": "https://cdn.discordapp.com/emojis/839362578916311040.png?v=1"
      }
    }
  })

top.blacklist(user.id, false)
client.createMessage(msg.channel.id, `Done!`)
	},
};
