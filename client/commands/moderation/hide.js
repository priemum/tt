let lang_messages = require('../../../lang.json') 
let Discord = require('discord.js')
module.exports = {
	name: 'hide', // اسم الامر
	description: "to lock or unlock a room", // شرح الامر
	cooldown: 10, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {

    let guild = await db.find({id: msg.channel.guild.id})
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
if(!args[0]) args[0] = "Hi"
let channel = msg.channel.guild.channels.get(args[0].replace('<#!', '').replace('<#', '').replace('>', ''))
if(!channel) channel = msg.channel
var channel_permission2 = channel.permissionOverwrites.get(msg.channel.guild.id)
if(!channel_permission2){
client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].done_hide[lang],
    color:14226597
  }
})
 return channel.editPermission(msg.channel.guild.id, 0, 1024, 'role')
}
var channel_permission1 = channel_permission2.deny
var channel_permission2_allow = channel_permission2.allow
var channel_permission1_allow = channel_permission2_allow
let channel_permission = `${channel_permission1}`.replace('n', '')
let channel_permission_allow = `${channel_permission1_allow}`.replace('n', '')
let permissions = new Discord.Permissions(Number(channel_permission))
permissions.add(1024)
channel.editPermission(msg.channel.guild.id, channel_permission1_allow, permissions.bitfield, 'role')
client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].done_hide[lang],
    color:14226597
  }
})
	},
};
