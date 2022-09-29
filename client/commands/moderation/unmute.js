let ms = require('ms')
let Discord = require('discord.js')
let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'unmute', // اسم الامر
	description: "to unmute a member from the server", // شرح الامر
	cooldown: 10, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, collection, db2, db1, db) {
    
     let guild = await collection.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"

if(!msg.member.permission.has('manageGuild') && !msg.member.permission.has('manageChannels')) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].must_managechannels[lang],
    color: 14226597
  }
})
    
let user = msg.mentions[0]
if(!user) {
let user1 = msg.channel.guild.members.get(args[0])
if(!user1) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].cant_find_user[lang],
    color: 14226597
  }
})
user = user1
}else{
user = msg.channel.guild.members.get(msg.mentions[0].id)
}

var roleID = msg.channel.guild.roles.find(d => d.name === "Muted")
if(!roleID){
await client.createRole(msg.channel.guild.id, {name: "Muted", permissions:0}).catch(err =>{}).then(role =>{
if(!role) return;
for(const d of msg.channel.guild.channels){
let channel = msg.channel.guild.channels.get(d[0])
if(channel.type === 0){
var channel_permission2 = channel.permissionOverwrites.get(roleID)
if(!channel_permission2) {
 channel.editPermission(roleID, 0, 2048, 'role').catch(err =>{})
}else{
var channel_permission1 = channel_permission2.deny
var channel_permission2_allow = channel_permission2.allow
var channel_permission1_allow = channel_permission2_allow
let channel_permission = `${channel_permission1}`.replace('n', '')
let channel_permission_allow = `${channel_permission1_allow}`.replace('n', '')
let permissions = new Discord.Permissions(Number(channel_permission))
permissions.add('SEND_MESSAGES')
channel.editPermission(roleID, channel_permission1_allow, permissions.bitfield, 'role').catch(err =>{})
}}
}
roleID = role.id
})
}else{
roleID = roleID.id
}

if(!roleID) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].cant_find_role_muted[lang],
    color: 14226597
  }
})
if(!user.roles.includes(roleID)) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].this_user_not_muted[lang] ,
    color: 14226597
  }
})
user.removeRole(roleID, `UnMuted by ${msg.author.username} (${msg.author.id})`).catch(async err =>{
   await client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].i_cant_unmute[lang] + user.id + ">" ,
    color: 14226597
  }
})
}).then(async mute =>{
let datas = await db.find({guild: msg.channel.guild.id, id: user.id})
for(const d of datas) await db.deleteOne({guild: msg.channel.guild.id, id: user.id})
if(!mute) return client.createMessage(msg.channel.id, {
  embed:{
    description:"<:yes:839305757576003585> ** <@" + user.id + lang_messages[0].has_been_unmuted[lang] ,
    color: 14226597
  }
})
})

  }
}