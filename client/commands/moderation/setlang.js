let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'setlang', // اسم الامر
	description: "to add a note to your profile", // شرح الامر
	cooldown: 50, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, collection, db, db1, db2, db3, giveaway, xp_voice, note) {
     let guild = await collection.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"
    
    
let row = await collection.find({id: msg.channel.guild.id})

if(!msg.member.permission.has('administrator')) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].you_must_manageguild[lang],
    color: 14226597
  }
})
let langs = ["en", "english","ar","arabic"]
if(!langs.includes(args[0])) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].i_cant_find_lang[lang],
    color: 14226597
  }
})
await collection.updateOne({id: msg.channel.guild.id} , { "lang": args[0].replace('glish', '').replace('abic', '') })
 client.createMessage(msg.channel.id, lang_messages[0].setlang_done[args[0].replace('glish', '').replace('abic', '')])
	},
};
