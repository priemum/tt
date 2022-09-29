let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'top-xp', // اسم الامر
	description: "top of 5 users", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(bot ,msg , args, db) {
    
     let guild = await db.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"

    bot.createMessage(msg.channel.id , lang_messages[0].soon_in_dashboard[lang])

  },
};
