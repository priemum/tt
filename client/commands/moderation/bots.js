let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'bots', // اسم الامر
	description: "all bots in server", // شرح الامر
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

msg.channel.guild.members.forEach(async m =>{
let user = m.user || m
if(user.bot) msgs = msgs + `\n \`-\` <@${user.id}> `
})
return client.createMessage(msg.channel.id, {
  embed:{
    title:"Bots",
    description: msgs || lang_messages[0].dont_have_bots[lang],
    color: 14226597
  }
})
	},
};
