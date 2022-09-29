let moment = require('moment')
let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'server', // اسم الامر
	description: "Server info", // شرح الامر
	cooldown: 25, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
    
    let guild = await db.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"

client.createMessage(msg.channel.id, {
  embed:{
    title:`${msg.channel.guild.name} Info`,
    "color": 14226597,
    fields:[
      {
        "name":lang_messages[0].server_ownedby[lang],
        "value": `> <@${msg.channel.guild.ownerID}>`,
        "inline":true
      },
      {
        "name":lang_messages[0].server_members[lang],
        "value": `> **${msg.channel.guild.memberCount}**`,
        "inline":true
      },
      {
      "name":lang_messages[0].server_online[lang],
      "value":`> **${msg.channel.guild.members.filter(d => d.status && d.status !== "offline").length}**\n`,
      "inline":true
      },
      {
      "name":lang_messages[0].server_roles[lang],
      "value":`> **${msg.channel.guild.roles.size}**`,
      "inline":true
      },
      {
      "name":lang_messages[0].server_emojis[lang],
      "value": `> **${msg.channel.guild.emojis.length}**`,
      "inline":true
      },
      {
      "name": lang_messages[0].server_region[lang],
      "value":`> **${msg.channel.guild.region}**\n`,
      "inline":true
      },
      {
        "name":lang_messages[0].server_createdon[lang],
        "value":`> **${moment(msg.channel.guild.createdAt).format('YYYY/M/D HH:mm:ss')} | \`${moment(msg.channel.guild.createdAt).fromNow()}\`** `,
        "inline":true
      }
    ],
    thumbnail:{
      url: msg.channel.guild.avatarURL,
    }
  }
})
	},
};
