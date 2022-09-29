let lang_messages = require('../../../lang.json') 
let moment = require('moment')
module.exports = {
	name: 'user', // اسم الامر
	description: "info of user", // شرح الامر
	cooldown: 10, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
    
    let guild = await db.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"

if(!args[0] && !msg.mentions[0]) return client.createMessage(msg.channel.id, {
  embed:
  {
    description: lang_messages[0].user_info[lang].replace('[datediscord]', moment(msg.member.createdAt).format('YYYY/M/D HH:mm:ss')).replace('[timediscord]', moment(msg.member.createdAt).fromNow()).replace('[dateserver]', moment(msg.member.joinedAt).format('YYYY/M/D HH:mm:ss')).replace('[timeserver]', moment(msg.member.joinedAt).fromNow()),
  color: 14226597,
	author: {
		name: msg.member.username,
		url: msg.member.avatarURL,
		icon_url: msg.member.avatarURL,
	},
	thumbnail: {
		url: msg.member.avatarURL,
	},
          footer: {
        text: `Rhyno Bot Copy Right ©️ `,
        icon_url: `https://cdn.discordapp.com/emojis/839362578916311040.png?v=1`,
      }
}})
if(msg.mentions.length === 1){
return client.createMessage(msg.channel.id, {
  embed:
  {
    description: lang_messages[0].user_info2[lang].replace('[datediscord]', moment(msg.channel.guild.members.get(msg.mentions[0].id).createdAt).format('YYYY/M/D HH:mm:ss')).replace('[timediscord]', moment(msg.channel.guild.members.get(msg.mentions[0].id).createdAt).fromNow()).replace('[dateserver]', moment(msg.channel.guild.members.get(msg.mentions[0].id).joinedAt).format('YYYY/M/D HH:mm:ss')).replace('[timeserver]', moment(msg.channel.guild.members.get(msg.mentions[0].id).joinedAt).fromNow()),
  color: 14226597,
	author: {
		name: msg.channel.guild.members.get(msg.mentions[0].id).username,
		url: msg.channel.guild.members.get(msg.mentions[0].id).avatarURL,
		icon_url: msg.channel.guild.members.get(msg.mentions[0].id).avatarURL,
	},
	thumbnail: {
		url: msg.channel.guild.members.get(msg.mentions[0].id).avatarURL,
	},
          footer: {
        text: `Rhyno Bot Copy Right ©️ `,
        icon_url: `https://cdn.discordapp.com/emojis/839362578916311040.png?v=1`,
      }
}})
}
if(args[0] && !msg.mentions[0]){
 if(!msg.channel.guild.members.get(args[0])) return client.createMessage(msg.channel.id, {
  embed:
  {
    description: lang_messages[0].user_info3[lang].replace('[datediscord]', moment(msg.member.createdAt).format('YYYY/M/D HH:mm:ss')).replace('[timediscord]', moment(msg.member.createdAt).fromNow()).replace('[dateserver]', moment(msg.member.joinedAt).format('YYYY/M/D HH:mm:ss')).replace('[timeserver]', moment(msg.member.joinedAt).fromNow()),
  color: 14226597,
	author: {
		name: msg.member.username,
		url: msg.member.avatarURL,
		icon_url: msg.member.avatarURL,
	},
	thumbnail: {
		url: msg.member.avatarURL,
	},
          footer: {
        text: `Rhyno Bot Copy Right ©️ `,
        icon_url: `https://cdn.discordapp.com/emojis/839362578916311040.png?v=1`,
      }
}})
return client.createMessage(msg.channel.id, {
  embed:
  {
    description: lang_messages[0].user_info4[lang].replace('[datediscord]', moment(msg.channel.guild.members.get(args[0]).createdAt).format('YYYY/M/D HH:mm:ss')).replace('[timediscord]', moment(msg.channel.guild.members.get(args[0]).createdAt).fromNow()).replace('[dateserver]', moment(msg.channel.guild.members.get(args[0]).joinedAt).format('YYYY/M/D HH:mm:ss')).replace('[timeserver]', moment(msg.channel.guild.members.get(args[0]).joinedAt).fromNow()),
  color: 14226597,
	author: {
		name: msg.channel.guild.members.get(args[0]).username,
		url: msg.channel.guild.members.get(args[0]).avatarURL,
		icon_url: msg.channel.guild.members.get(args[0]).avatarURL,
	},
	thumbnail: {
		url: msg.channel.guild.members.get(args[0]).avatarURL,
	},
          footer: {
        text: `Rhyno Bot Copy Right ©️ `,
        icon_url: `https://cdn.discordapp.com/emojis/839362578916311040.png?v=1`,
      }
}})
}
if(msg.mentions.length > 5) return client.createMessage(msg.channel.id, {
  embed:
  {
    description: lang_messages[0].users5[lang],
    color: 14226597,
  }
})
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
    description: lang_messages[0].user_info5[lang].replace('[datediscord]', moment(oldmsg.channel.guild.members.get(d.id).createdAt).format('YYYY/M/D HH:mm:ss')).replace('[timediscord]', moment(oldmsg.channel.guild.members.get(d.id).createdAt).fromNow()).replace('[dateserver]', moment(oldmsg.channel.guild.members.get(d.id).joinedAt).format('YYYY/M/D HH:mm:ss')).replace('[timeserver]', moment(oldmsg.channel.guild.members.get(d.id).joinedAt).fromNow()),
  color: 14226597,
	author: {
		name: oldmsg.channel.guild.members.get(d.id).username,
		url: oldmsg.channel.guild.members.get(d.id).avatarURL,
		icon_url: oldmsg.channel.guild.members.get(d.id).avatarURL,
	},
	thumbnail: {
		url: oldmsg.channel.guild.members.get(d.id).avatarURL,
	},
    
}})
}

}
	},
};
