let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'avatar', // اسم الامر
	description: "show someone's avatar", // شرح الامر
	cooldown: 10, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
    
    let guild = await db.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"
    
if(args[0] === `server`) return client.createMessage(msg.channel.id,{
  embed: {
    content: null,
  color: 14226597,
	author: {
		name: msg.channel.guild.name,
		url: msg.channel.guild.iconURL,
		icon_url: msg.channel.guild.iconURL,
	},
	image: {
		url: msg.channel.guild.iconURL
	},
  footer: {
    "text" : `Requested By ${msg.member.username}`,
    "icon_url" : msg.member.avatarURL, 
  },
}
})
if(!args[0] && !msg.mentions[0]) return client.createMessage(msg.channel.id, {
  embed:
  {
    content: null,
  color: 14226597,
	author: {
		name: msg.member.username,
		url: msg.member.avatarURL,
		icon_url: msg.member.avatarURL,
	},
	image: {
		url: msg.member.avatarURL,
	},
  footer: {
    "text" : `Requested By ${msg.member.username}`,
    "icon_url" : msg.member.avatarURL, 
  },
}})
if(msg.mentions.length === 1){
return client.createMessage(msg.channel.id, {
  embed:
  {
  color: 14226597,
	author: {
		name: msg.channel.guild.members.get(msg.mentions[0].id).username,
		url: msg.channel.guild.members.get(msg.mentions[0].id).avatarURL,
		icon_url: msg.channel.guild.members.get(msg.mentions[0].id).avatarURL,
	},
	image: {
		url: msg.channel.guild.members.get(msg.mentions[0].id).avatarURL,
	},
      footer: {
    "text" : `Requested By ${msg.member.username}`,
    "icon_url" : msg.member.avatarURL, 
  },
}})
}
if(args[0] && !msg.mentions[0]){
 if(!msg.channel.guild.members.get(args[0])) return client.createMessage(msg.channel.id, {
  embed:
  {
  color: 14226597,
	author: {
		name: msg.member.username,
		url: msg.member.avatarURL,
		icon_url: msg.member.avatarURL,
	},
	image: {
		url: msg.member.avatarURL,
	},
      footer: {
    "text" : `Requested By ${msg.member.username}`,
    "icon_url" : msg.member.avatarURL, 
  },
}})
return client.createMessage(msg.channel.id, {
  embed:
  {
  color: 14226597,
	author: {
		name: msg.channel.guild.members.get(args[0]).username,
		url: msg.channel.guild.members.get(args[0]).avatarURL,
		icon_url: msg.channel.guild.members.get(args[0]).avatarURL,
	},
	image: {
		url: msg.channel.guild.members.get(args[0]).avatarURL,
	},
      footer: {
    "text" : `Requested By ${msg.member.username}`,
    "icon_url" : msg.member.avatarURL, 
  },
}})
}
if(msg.mentions.length > 5) return client.createMessage(msg.channel.id, `5 Max!`)
if(msg.mentions.length > 1){
let oldmsg = msg
for(const d of msg.mentions){
let msg = {
channel: {id: oldmsg.channel.id},
mentions: [oldmsg.channel.guild.members.get(d.id)]
}
 client.createMessage(msg.channel.id, {
  embed:
  {
  color: 14226597,
	author: {
		name: oldmsg.channel.guild.members.get(msg.mentions[0].id).username,
		url: oldmsg.channel.guild.members.get(msg.mentions[0].id).avatarURL,
		icon_url: oldmsg.channel.guild.members.get(msg.mentions[0].id).avatarURL,
	},
	image: {
		url: oldmsg.channel.guild.members.get(msg.mentions[0].id).avatarURL,
	},
      footer: {
    "text" : `Requested By ${msg.member.username}`,
    "icon_url" : msg.member.avatarURL, 
  },
}})
}

}
	},
};

