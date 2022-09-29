let lang_messages = require('../../../lang.json')  
module.exports = {
  name: "invite", // اسم الامر
  description: "to invite the bot to your server", // شرح الامر
  cooldown: 10, // الكول داون بـ الثواني
  execute: async function(client, msg, args, db) {
    
    let guild = await db.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"
    
    client.createMessage(msg.channel.id, {
      embed: {
        title: lang_messages[0].rhyno_important[lang],
        description: lang_messages[0].rhyno_links[lang],
        color: 14226597,

        footer: {
          text: lang_messages[0].rhyno_team[lang],
          icon_url: `https://cdn.discordapp.com/emojis/839362578916311040.png?v=1`
        }
      }
    });
  }
};
