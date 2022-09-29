let lang_messages = require('../../../lang.json') 
let Eris = require("eris")
let client2 = Eris("ODQwNDQ0ODU1MTU4MDQ2NzMw.YJYTRA.ogJA3VFxm7IzfoxP8ogCAK04I0Q")
client2.connect()
let moment = require('moment')
module.exports = {
	name: 'info', // اسم الامر
	description: "show bot's info", // شرح الامر
	cooldown: 15, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
    
    let guild = await db.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"

client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": lang_messages[0].rhyno_info[lang],
      "color": 14226597,
      "fields": [
        {
          "name": lang_messages[0].info_servers[lang],
          "value": `\n > ${client2.guilds.size}`
        },
        {
          "name": lang_messages[0].info_users[lang],
          "value": `\n > ${client2.guilds.reduce((a, g) => a + g.memberCount, 0)}`
        },
        {
          "name":lang_messages[0].info_created[lang],
          "value": `> ${moment(client2.user.createdAt).format('YYYY/M/D HH:mm:ss')} | \`${moment(client2.user.createdAt).fromNow()}\``
        },
        {
          "name":lang_messages[0].my_links[lang],
          "value": lang_messages[0].info_links[lang],
        
        }

      ],
      footer: {
        text: lang_messages[0].rhyno_team[lang],
        icon_url: `https://cdn.discordapp.com/emojis/839362578916311040.png?v=1`,
      }
    }
  
})


	},
};
