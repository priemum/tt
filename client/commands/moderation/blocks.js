let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'blocks', // اسم الامر
	description: "to add a note to your profile", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, collection, db, db1, db2, db3, giveaway, xp_voice, note) {
  
         let guild = await collection.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"

if(!msg.member.permission.has('manageGuild')) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].you_must_manageguild[lang],
    color: 14226597
  }
})
var msgs = ``
let guild_data = await collection.find({id: msg.channel.guild.id})
if(guild_data.length < 1) return;

guild_data[0].messages.forEach(async m =>{
msgs = msgs + `\n - \`${m}\``
})
return client.createMessage(msg.channel.id, {
  embed:{
    title:lang_messages[0].blocked_messages[lang],
    description: msgs || lang_messages[0].dont_have_blocked[lang],
    color: 14226597
  }
})
	},
};
