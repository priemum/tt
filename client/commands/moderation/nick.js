let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'nick', // اسم الامر
	description: "to add a nick name to some one", // شرح الامر
	cooldown: 10, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
    
     let guild = await db.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"
    
    if(!msg.member.permission.has('manageNicknames')) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].manage_nicknames[lang],
    color: 14226597
  }
})
let user = msg.mentions[0]
let name = args.slice(1).join(" ")
if(user){
user = msg.channel.guild.members.get(msg.mentions[0].id)
}
if(!user){
user = msg.channel.guild.members.get(args[0])
if(!user){
user = msg.member
name = args.slice(0).join(" ")
}
}

if(user.id === msg.author.id){
  var able = true
user.edit({nick: name}).catch(async err =>{
  able = false
  await client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].i_cant_nick[lang] + user.id + ">" ,
    color: 14226597
  }
})
}).then(nick =>{
let editto = name || user.username
if(able) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].changed_nickname[lang] + editto ,
    color: 14226597
  }
})
})
}else{
var permissions = false

let member = msg.channel.guild.members.get(user.id)

let author_sorted_roles = msg.member.roles.sort((a , b) => msg.channel.guild.roles.get(b).position - msg.channel.guild.roles.get(a).position)
let member_sorted_roles = member.roles.sort((a , b) => msg.channel.guild.roles.get(b).position - msg.channel.guild.roles.get(a).position)

let potion_member = msg.channel.guild.roles.get(member_sorted_roles[0]) || {position: 0}
let potion_author = msg.channel.guild.roles.get(author_sorted_roles[0]) || {position: 0}

console.log(potion_author.position)
console.log(potion_member.position)
if(potion_author.position > potion_member.position) permissions = false
if(msg.author.id === member.id) permissions = true
if(msg.author.id === msg.channel.guild.ownerID) permissions = false
if(member.id === msg.channel.guild.ownerID) permissions = true

        if(permissions) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].you_cant_nick[lang] + user.id + ">" ,
    color: 14226597
  }
})
var ables = true
let nick = await user.edit({nick: name}).catch(async err =>{
able = false
   await client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].i_cant_nick[lang] + user.id + ">" ,
    color: 14226597
  }
})
}).then(ma =>{
let editto = name || user.username

if(able) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].i_have_changed[lang]+`${user.username}`+lang_messages[0].nick_to[lang] + editto ,
    color: 14226597
  }
})
})


}



	},
};
