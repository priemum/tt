let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'role', // اسم الامر
	description: "to give or remove a role from someone", // شرح الامر
	cooldown: 15, // الكول داون بـ الثواني
execute: async function(client ,msg , args, db2, db1, db) {

   let guild = await db2.find({id: msg.channel.guild.id})
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
    
     let row = await db2.find({id: msg.channel.guild.id})

let prefix = row[0] ? row[0].prefix : "$"
      if(!msg.mentions[0] && !args[0] || !args[1]) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].must_role[lang],
    color: 14226597
  }
})
  var role = msg.roleMentions[0] || msg.channel.guild.roles.get(args[1]) || msg.channel.guild.roles.find(r => r["name"].toLowerCase().startsWith(args[1].toLowerCase()))
if(!role) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].cant_find_role[lang] ,
    color: 14226597
  }
})
if(args[0] !== "all" && args[0] !== "bots" && args[0] !== "humans" && args[0] !== "-all" && args[0] !== "-bots" && args[0] !== "-humans"){


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
if(msg.channel.guild.members.get(user.id)){
}

let permissions = true


let member = msg.channel.guild.members.get(user.id)

let author_sorted_roles = msg.member.roles.sort((a , b) => msg.channel.guild.roles.get(b).position - msg.channel.guild.roles.get(a).position)
let member_sorted_roles = member.roles.sort((a , b) => msg.channel.guild.roles.get(b).position - msg.channel.guild.roles.get(a).position)

let potion_member = msg.channel.guild.roles.get(member_sorted_roles[0]) || {position: 0}
let potion_author = msg.channel.guild.roles.get(author_sorted_roles[0]) || {position: 0}

console.log(potion_author.position)
console.log(potion_member.position)
if(potion_author.position > potion_member.position) permissions = false
if(potion_author.position === potion_member.position) permissions = true
if(msg.author.id === member.id) permissions = false
if(msg.author.id === msg.channel.guild.ownerID) permissions = false
if(member.id === msg.channel.guild.ownerID && msg.author.id !== member.id) permissions = true
console.log(permissions)
    if(permissions) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].cant_edit_roles[lang] + user.id + ">" ,
    color: 14226597
  }
})

if(role.position > potion_author.position && msg.author.id !== msg.channel.guild.ownerID || role.position === potion_author.position && msg.author.id !== msg.channel.guild.ownerID) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].role_higher_than_you[lang] ,
    color: 14226597
  }
})

if(member.roles.includes(role.id)) {
member.removeRole(role.id).catch(async err =>{
   await client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].i_cant_role[lang] + user.id + ">" ,
    color: 14226597
  }
})
}).then(doneaddrole =>{
if(!doneaddrole) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].removed_roles[lang].replace('[role]', role.name).replace('[id]', user.id) ,
    color: 14226597
  }
})
})

}else{
member.addRole(role.id).catch(async err =>{
   await client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].i_cant_role[lang] + user.id + ">" ,
    color: 14226597
  }
})
}).then(doneaddrole =>{
if(!doneaddrole) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].added_roles[lang].replace('[role]', role.name).replace('[id]', user.id) ,
    color: 14226597
  }
})
})

}

}else{
let author_sorted_roles = msg.member.roles.sort((a , b) => msg.channel.guild.roles.get(b).position - msg.channel.guild.roles.get(a).position)
let potion_author = msg.channel.guild.roles.get(author_sorted_roles[0]) || {position: 0}

if(args[0] === "all"){


if(role.position > potion_author.position && msg.author.id !== msg.channel.guild.ownerID || role.position === potion_author.position && msg.author.id !== msg.channel.guild.ownerID) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].role_higher_than_you[lang],
    color: 14226597
  }
})
 client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].adding_roles[lang].replace('[role]', role.name).replace('[members]', msg.channel.guild.members.filter(d => !d.roles.includes(role.id)).length) ,
    color: 14226597
  }
}).then(async m =>{
for(const d of msg.channel.guild.members){
let member = msg.channel.guild.members.get(d[0])
if(member && !member.roles.includes(role.id)){
await new Promise((res , rej) =>{ setTimeout(() => res() , 1500)})
await member.addRole(role.id).catch(err =>{})
}

}
m.edit({
  embed:{
    description:lang_messages[0].done_adding[lang.replace('[role]', role.name).replace('[members]', msg.channel.guild.members.filter(d => d.bot && !d.roles.includes(role.id)).length)] ,
    color: 14226597
  }})
 })
}
if(args[0] === "bots"){


if(role.position > potion_author.position && msg.author.id !== msg.channel.guild.ownerID || role.position === potion_author.position && msg.author.id !== msg.channel.guild.ownerID) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].role_higher_than_you[lang] ,
    color: 14226597
  }
})
 client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].adding_roles_bots[lang.replace('[role]', role.name).replace('[bots]', msg.channel.guild.members.filter(d => d.bot && !d.roles.includes(role.id)).length)] ,
    color: 14226597
  }
}).then(async m =>{
for(const d of msg.channel.guild.members.filter(d => d.bot)){
let member = msg.channel.guild.members.get(d.id)
if(member && !member.roles.includes(role.id)){
await new Promise((res , rej) =>{ setTimeout(() => res() , 1500)})
await member.addRole(role.id).catch(err =>{})
}

}
m.edit({
  embed:{
    description:lang_messages[0].done_adding_bots[lang].replace('[role]',role.name).replace('[bots]', msg.channel.guild.members.filter(d => d.bot && !d.roles.includes(role.id)).length) ,
    color: 14226597
  }})
 })
}
if(args[0] === "humans"){

if(role.position > potion_author.position && msg.author.id !== msg.channel.guild.ownerID || role.position === potion_author.position && msg.author.id !== msg.channel.guild.ownerID) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].role_higher_than_you[lang] ,
    color: 14226597
  }
})
 client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].adding_humans[lang].replace('[role]', role.name).replace('[humans]', msg.channel.guild.members.filter(d => !d.bot && !d.roles.includes(role.id)).length) ,
    color: 14226597
  }
}).then(async m =>{
for(const d of msg.channel.guild.members.filter(d => !d.bot)){
let member = msg.channel.guild.members.get(d.id)
if(member && !member.roles.includes(role.id)){
await new Promise((res , rej) =>{ setTimeout(() => res() , 1500)})
await member.addRole(role.id).catch(err =>{})
}

}
m.edit({
  embed:{
    description:lang_messages[0].done_adding_humans[lang].replace('[role]',role.name).replace('[humans]', msg.channel.guild.members.filter(d => d.bot && !d.roles.includes(role.id)).length) ,
    color: 14226597
  }})
 })
}
if(args[0] === "-all"){

if(role.position > potion_author.position && msg.author.id !== msg.channel.guild.ownerID || role.position === potion_author.position && msg.author.id !== msg.channel.guild.ownerID) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].role_higher_than_you[lang] ,
    color: 14226597
  }
})
 client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].removing_roles[lang].replace('[role]', role.name).replace('[members]', msg.channel.guild.members.filter(d => d.roles.includes(role.id)).length) ,
    color: 14226597
  }
}).then(async m =>{
for(const d of msg.channel.guild.members){
let member = msg.channel.guild.members.get(d[0])
if(member && member.roles.includes(role.id)){
await new Promise((res , rej) =>{ setTimeout(() => res() , 1500)})
await member.removeRole(role.id).catch(err =>{})
}

}
m.edit({
  embed:{
    description:lang_messages[0].done_removing[lang].replace('[role]', role.name).replace('[members]', msg.channel.guild.members.filter(d => d.bot && !d.roles.includes(role.id)).length) ,
    color: 14226597
  }})
 })

}
if(args[0] === "-bots"){


if(role.position > potion_author.position && msg.author.id !== msg.channel.guild.ownerID || role.position === potion_author.position && msg.author.id !== msg.channel.guild.ownerID) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].role_higher_than_you[lang] ,
    color: 14226597
  }
})
 client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].removing_roles_bots[lang].replace('[role]',role.name).replace('[bots]',msg.channel.guild.members.filter(d => d.bot && d.roles.includes(role.id)).length) ,
    color: 14226597
  }
}).then(async m =>{
for(const d of msg.channel.guild.members.filter(d => d.bot)){
let member = msg.channel.guild.members.get(d.id)
if(member && member.roles.includes(role.id)){
await new Promise((res , rej) =>{ setTimeout(() => res() , 1500)})
await member.removeRole(role.id).catch(err =>{})
}

}
m.edit({
  embed:{
    description:lang_messages[0].done_removing_bots[lang].replace('[role]', role.name).replace('[bots]', msg.channel.guild.members.filter(d => d.bot && !d.roles.includes(role.id)).length) ,
    color: 14226597
  }})
 })

}
if(args[0] === "-humans"){

if(role.position > potion_author.position && msg.author.id !== msg.channel.guild.ownerID || role.position === potion_author.position && msg.author.id !== msg.channel.guild.ownerID) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].role_higher_than_you[lang] ,
    color: 14226597
  }
})
 client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].removing_humans[lang].replace('[role]', role.name).replace('[humans]', msg.channel.guild.members.filter(d => !d.bot && d.roles.includes(role.id)).length) ,
    color: 14226597
  }
}).then(async m =>{
for(const d of msg.channel.guild.members.filter(d => !d.bot)){
let member = msg.channel.guild.members.get(d.id)
if(member && member.roles.includes(role.id)){
await new Promise((res , rej) =>{ setTimeout(() => res() , 1500)})
await member.removeRole(role.id).catch(err =>{})
}
}
m.edit({
  embed:{
    description:lang_messages[0].done_removing_humans[lang].replace('[role]', role.name).replace('[humans]', msg.channel.guild.members.filter(d => d.bot && !d.roles.includes(role.id)).length) ,
    color: 14226597
  }})
})

}
}
	},
};
