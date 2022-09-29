let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'autorole', // اسم الامر
	description: "to add a note to your profile", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, collection, db, db1, db2, db3, giveaway, xp_voice, note) {
  
     let guild = await collection.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"
    
if(!msg.member.permission.has('manageRoles')) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].must_manageroles[lang],
    color: 14226597
  }
})
    

  var role = msg.channel.guild.roles.get(msg.roleMentions[0]) || msg.channel.guild.roles.get(args[1]) || msg.channel.guild.roles.find(r => r["name"].toLowerCase().startsWith(args[1].toLowerCase()))
if(!role) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].cant_find_role[lang] ,
    color: 14226597
  }
})

  await collection.updateOne({id: msg.channel.guild.id}, {"autorole": role.id})
return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].auto_role[lang] + role.name ,
    color: 14226597
  }
})
	},
};
