let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'banner', // اسم الامر
	description: "get server banner", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
    
    let guild = await db.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"
    
    
client.createMessage(msg.channel.id,{
  embed: {
    content: null,
  color: 14226597,
	author: {
		name: msg.channel.guild.name,
		url: msg.channel.guild.iconURL,
		icon_url: msg.channel.guild.iconURL,
	},
	image: {
		url: msg.channel.guild.bannerURL
	},
  footer: {
    "text" : `Requested By ${msg.member.username}`,
    "icon_url" : msg.member.avatarURL, 
  },
}
})
	},
};
