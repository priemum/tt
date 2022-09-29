let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'setprefix', // اسم الامر
	description: "to add a note to your profile", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, collection, db, db1, db2, db3, giveaway, xp_voice, note) {
     let guild = await collection.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"
    
    
let row = await collection.find({id: msg.channel.guild.id})

let prefix = row[0] ? row[0].prefix : "$"
if(!msg.member.permission.has('manageGuild')) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].you_must_manageguild[lang],
    color: 14226597
  }
})

await collection.updateOne({id: msg.channel.guild.id} , { "prefix": args[0] || "$" })
msg.addReaction('yes:839305757576003585')
	},
};
