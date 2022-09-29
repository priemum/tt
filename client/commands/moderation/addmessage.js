let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'blockmessage', // اسم الامر
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
let messages = [args.slice(0).join(" ")]
let guild_data = await collection.find({id: msg.channel.guild.id})
if(guild_data.length < 1) return;
if(guild_data[0].messages.includes(args.slice(0).join(" "))) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].massgae_exists[lang] ,
    color: 14226597
  }
}) 
guild_data[0].messages.forEach(async m =>{
messages.unshift(m)
})
await collection.updateOne({id: msg.channel.guild.id} , { "messages": messages })
return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].add_blocks[lang] ,
    color: 14226597
  }
})
	},
};
