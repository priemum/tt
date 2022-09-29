var add = true

let Eris = require('eris')
const pms = require("pretty-ms")
let Discord = require('discord.js')
var users1 = []
let lang_messages = require('../lang.json')
var xp1 = require("../levels.js");
var xp = new xp1()
const mongoose = require("mongoose")
const fs = require('fs')
let client = Eris('ODQwNjkyNjg2NzEzMTI2OTQy.YJb6Ew.UYmr1NIqFW42gUB6SjLrgdQ8JVI', {restMode: true, defaultImageSize: 2048})
mongoose.connect("mongodb+srv://kingdaddy:12345678@@aa@rhyno.li9sv.mongodb.net/data" , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    });

const collection = mongoose.model("guildSetting", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "messages": { type: Array, default: []  } ,
            "autorole": { type: String, default: "[none]"  } ,
            "prefix": { type: String, default: "$" },
            "lang": { type: String, default: "en" },

}));
const db = mongoose.model("daily", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "time": { type: Number },
            "claim": { type: Number },

}));
const db1 = mongoose.model("ban", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "time": { type: Number },
            "guild": { type: String },

}));

const db2 = mongoose.model("mute", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "time": { type: Number },
            "guild": { type: String } ,
            "roleID": { type: String } ,

}));
const db3 = mongoose.model("rep", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "time": { type: Number },
            "user": { type: String } ,

}));
const giveaway = mongoose.model("giveaways", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "messageid": { type: String } ,
            "guild": { type: String } ,
            "time": { type: Number } ,
            "reason": { type: String } ,
            "winer": { type: Number } ,
            "channel": { type: String } ,
            "emoji": { type: String } , 
            "author": { type: String } ,
            "end": { type: Boolean } ,

}));
const xp_voice = mongoose.model("xps", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "guild": { type: String } ,
            "xp": { type: Number } ,
            "totlxp": { type: Number, default: 0 } ,

}));
const note = mongoose.model("note", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "note": { type: String } ,

}));
const captcha = mongoose.model("captcha", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "captcha": { type: String } ,

}));
const warns = mongoose.model("warns", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "guild": { type: String } ,
            "warns": { type: Array } ,

}));
const temprooms = mongoose.model("temprooms", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "guild": { type: String } ,
            "rooms": { type: Array } ,
            "data": { type: Object } ,
      

}));
const userData = mongoose.model("userSetting", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "coins": { type: Number } , 
            "daily": { type: Object } , // {time: 0, lastdaily: 0}
            "like": { type: Object } , // {time: 0, likes: 0}
            "xps": { type: Object } ,// { data_guild: [{guildID: "123", xp: 0}], allxp: 0 }
            "note": { type: String } , // "I Hate You"
}));
client.on('voiceChannelJoin', async (member, channel) =>{

if(member.bot) return;
console.log("go")
let data = await temprooms.find({guild: channel.guild.id})
if(data.length < 1) return;
console.log(data)
if(data[0].data.status === false || data[0].data.id !== channel.id) return;

let room = channel.guild.channels.get(data[0].data.id)
if(!room) return;

 let find = data[0].rooms.find(d => d.by === member.id && channel.guild.channels.get(d.id))
 if(find) return member.edit({channelID: find.id})
 
  
let new_channel = await client.createChannel(channel.guild.id, member.username, 2, {parentID: room.parentID}).catch(err =>{})
if(!new_channel) return;
  client.editChannelPermission(new_channel.id, member.id, 16, 0, "member").catch(err =>{})


  
  
await temprooms.updateOne({guild: channel.guild.id}, {$push: {rooms: {id: new_channel.id, lastjoin: Date.now() + 10000, by: member.id}}})
member.edit({channelID: new_channel.id})
})
setInterval(async () => {
let all_data = await temprooms.find({"data.status": true})
all_data.forEach(async data =>{
let guild = client.guilds.get(data.guild)
if(!guild) return;

data.rooms.forEach(async data_room =>{
let channel = guild.channels.get(data_room.id)
if(!channel) return;
let voiceMembers = channel.voiceMembers
let users = []
voiceMembers.forEach(user =>{
if(!user.bot) users.unshift(user.id)
})
console.log(data_room.lastjoin - Date.now())
if(users.length < 1 && data_room.lastjoin - Date.now() < 1){
client.deleteChannel(data_room.id).catch(err =>{})
await temprooms.updateOne({guild: guild.id}, {$pull: {rooms: data_room}})

}
if(users.length > 0){
console.log('hgi')
await temprooms.updateOne({guild: guild.id}, {$pull: {rooms: data_room}})
await temprooms.updateOne({guild: guild.id}, {$push: {rooms: {id: data_room.id, lastjoin: Date.now() + 10000, by: data_room.by}}})
}


})

})

}, 6000)
var users = []
let express = require('express')
let app = express()
        const requests = fs.readdirSync(`./api_requests/`).filter(file => file.endsWith(".js"));


    fs.readdirSync("./api_requests/").forEach(dir => {
        const requests = fs.readdirSync(`./api_requests/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of requests) {
            let request = require(`../api_requests/${dir}/${file}`);
if(request.method && request.path){
app[request.method](request.path , (req , res) =>{

return request.run(req , res, xp_voice, note, db3, captcha)
})
}} 

})
app.listen(3000)

client.commands = new Eris.Collection()
let cooldowns = new Eris.Collection()

    fs.readdirSync(__dirname + "/commands/").forEach(dir => {
        const commands = fs.readdirSync(__dirname + `/commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let command = require(`./commands/${dir}/${file}`);
            if (command.name) {
                client.commands.set(command.name, command);
            }
        }
    })
var xp1 = require("../levels.js");
var xp = new xp1()

var top1 = require("../credits-async.js");
var top = new top1()
setInterval(async () => {
let giveaways = await giveaway.find({end: false})

giveaways.forEach(async data =>{
let guild_data = await collection.find({id: data.guild})
if(guild_data.length < 1) return;
  let lang = guild_data[0].lang || "en"

let guild = client.guilds.get(data.guild)
if(!guild) return;
let channel = guild.channels.get(data.channel)
if(!channel) return
if(data.time - Date.now() < 1){
let msg = await client.getMessage(data.channel, data.messageid).catch(err =>{})
if(!msg) return;
let reactions = await client.getMessageReaction(data.channel, data.messageid, "🎉").catch(err =>{})

if(!reactions) reactions = []
var members_reactions = []

reactions.forEach(async d =>{
if(!d.bot) members_reactions.unshift(`<@${d.id}>`)
})
 function randomUser(key, amount = 1){
    let array = [];
    let keys = Array.from(key);
    while(array.length < amount) {
        let element = keys[Math.floor(Math.random() * keys.length)];
        if(!array.includes(element)) array.push(element);
    }
    return array
  }
let lengths = Math.floor(Number(data.winer))
if(data.winer >= members_reactions.length) lengths = members_reactions.length
let winers = randomUser(members_reactions, lengths);
if(winers.length < 1){
 client.createMessage(data.channel, lang_messages[0].no_vaild_entrants[lang].replace('[guild]', data.guild).replace('[data.channel]', data.channel).replace('[messageid]', data.messageid)).catch(err =>{})
msg.edit({

  "content": lang_messages[0].giveaway_ended[lang],
  "embed": 
    {
      "title": data.reason,
      "description": lang_messages[0].giveaway_ended_no_winner[lang].replace('[author]', `<@${data.author}>`).replace('[winer]', "winner could not be determined"),
      
    }
  

  
}).catch(err =>{

})
}else{
client.createMessage(data.channel, lang_messages[0].congrats_winner[lang].replace('[winner]', winers.join(',')).replace('[data]', data.reason).replace('[guild]',data.guild).replace('[channel]', data.channel).replace('[messageid]', data.messageid)).catch(err =>{})
msg.edit({

  "content": lang_messages[0].giveaway_ended[lang],
  "embed": 
    {
      "title": data.reason,
      "description": lang_messages[0].giveaway_ended_winner[lang].replace('[author]', `<@${data.author}>`).replace('[winer]', winers),
      
    }
  

  
}).catch(err =>{

})
}
  await giveaway.updateOne({messageid: data.messageid}, {"end": true})

}else{
let msg = await client.getMessage(data.channel, data.messageid).catch(err =>{})

let time = pms(data.time - Date.now(), { verbose: true })
if(data.time - Date.now() < 1000) time = "1 seconds"
if(msg) msg.edit({
  "content": lang_messages[0].giveaway[lang],
  "embed": 
    {
      "title": data.reason,
      "description": lang_messages[0].giveaway_time[lang].replace('[time]', time).replace('[author]', `<@${data.author}>`),
      "color": 14226597
    }
 
}).catch(err =>{
return;
})
}

})


}, 6000)
setInterval(async () => {

for(const data of await db2.find({})){
if(data.time - Date.now() < 1){
let guild = client.guilds.get(data.guild)
if(guild) {
let member = guild.members.get(data.id)
if(member) {
let role = guild.roles.get(data.roleID)
if(role) {

if(member.roles.includes(role.id)) {
member.removeRole(role.id, `Mute time has Ended`).catch(async err =>{})
}}}}
}else{
let guild = client.guilds.get(data.guild)
if(guild) {
let member = guild.members.get(data.id)
if(member) {
let role = guild.roles.get(data.roleID)
if(role) {

if(!member.roles.includes(role.id)) {
member.addRole(role.id, `Leave/Join`).catch(async err =>{})
}}
}
}

}


}

}, 3000)
xp.test()
var allusers = []
client.on('ready', () =>{
if(add === true){
setInterval(async () => {
client.guilds.forEach(guild =>{
//voiceState
guild.members.forEach(async member =>{
if(member.voiceState.channelID && !member.bot){
let d = await xp_voice.find({id: member.id, guild: guild.id})
if(d.length < 1){
   var xp = Math.floor(Math.random() * 10) + 4;
await new xp_voice({id: member.id, guild: guild.id, xp: xp}).save()
}else{
  if(allusers.find(da => da.id === member.id && da.time - Date.now() > 1)) return;
  if(!allusers.find(da => da.id === member.id)){
  allusers.unshift({
   id: member.id,
    time: Date.now() + 20000
  })
  }else{
    allusers.find(da => da.id === member.id).time = Date.now() + 20000 
  }
      var xp = Math.floor(Math.random() * 6) + 2;
await xp_voice.updateOne({_id: d[0]._id}, {"totlxp": d[0].xp + xp })

await xp_voice.updateOne({_id: d[0]._id}, {"xp": d[0].xp + xp })
}
}

})

})

}, 31000)
}
})
client.util = require("./utils")
//db2
client.on('guildMemberAdd', async (guild, member) =>{
let guild_data = await collection.find({id: guild.id})
if(guild_data.length < 1) return;
member.addRole(guild_data[0].autorole).catch(err => {})

})
let moment = require('moment')
client.on('guildDelete', async (guild) =>{

client.createMessage('841039951507619860', {
  embed:{
    title:`${guild.name} Info`,
    "color": 14226597,
    fields:[
      {
        "name":"<:time:839212806905921656> Created On",
        "value":`> **${moment(guild.createdAt).format('YYYY/M/D HH:mm:ss')} | \`${moment(guild.createdAt).fromNow()}\`** `
      },
      {
        "name":"Server ID",
        "value": `${guild.id}`
      },
      {
        "name":"<:OwnerShip:839585758390386789> Owned By",
        "value": `> <@${guild.ownerID}>`
      },
      {
        "name":"<:Member:839320206294777866> Members",
        "value": `> **${guild.memberCount}**`
      },
      {
      "name":"<:online:839579954022580224> Online",
      "value":`> **${guild.members.filter(d => d.clientStatus).length}**`
      },
      {
      "name":"<:Guild:839321839327379476> Roles",
      "value":`> **${guild.roles.size}**`
      },
      {
      "name":"<:Emoji:839595652044685362> Emojis",
      "value": `> **${guild.emojis.length}**`,
      },
      {
      "name": "<:Global:839585373151559710> Region",
      "value":`> **${guild.region}**`
      }
    ],
    thumbnail:{
      url: guild.avatarURL,
    }
  }
})
})
client.on('guildCreate', async (guild) =>{

client.createMessage('841039921803296819', {
  embed:{
    title:`${guild.name} Info`,
    "color": 14226597,
    fields:[
      {
        "name":"<:time:839212806905921656> Created On",
        "value":`> **${moment(guild.createdAt).format('YYYY/M/D HH:mm:ss')} | \`${moment(guild.createdAt).fromNow()}\`** `
      },
      {
        "name":"Server ID",
        "value": `${guild.id}`
      },
      {
        "name":"<:OwnerShip:839585758390386789> Owned By",
        "value": `> <@${guild.ownerID}>`
      },
      {
        "name":"<:Member:839320206294777866> Members",
        "value": `> **${guild.memberCount}**`
      },
      {
      "name":"<:online:839579954022580224> Online",
      "value":`> **${guild.members.filter(d => d.clientStatus).length}**`
      },
      {
      "name":"<:Guild:839321839327379476> Roles",
      "value":`> **${guild.roles.size}**`
      },
      {
      "name":"<:Emoji:839595652044685362> Emojis",
      "value": `> **${guild.emojis.length}**`,
      },
      {
      "name": "<:Global:839585373151559710> Region",
      "value":`> **${guild.region}**`
      }
    ],
    thumbnail:{
      url: guild.avatarURL,
    }
  }
})
})

client.on('messageUpdate', async (message, oldMessage) =>{
if(!message.channel.guild) return;
if(message.member.permission.has('administrator')) return;
let row = await collection.find({id: message.channel.guild.id})
if(row.length < 1) return;
if(row[0].messages.find(d => message.content.includes(d))){

message.delete()
var roleID = message.channel.guild.roles.find(d => d.name === "Muted")
if(!roleID){
await client.createRole(message.channel.guild.id, {name: "Muted", permissions:0}).catch(err =>{}).then(role =>{
if(!role) return;
roleID = role.id
})
}else{
roleID = roleID.id
}
for(const d of message.channel.guild.channels){
let channel = message.channel.guild.channels.get(d[0])
if(channel.type === 0){
var channel_permission2 = channel.permissionOverwrites.get(roleID)
if(!channel_permission2) {
await channel.editPermission(roleID, 0, 2048, 'role').catch(err =>{})
}else{
var channel_permission1 = channel_permission2.deny
var channel_permission2_allow = channel_permission2.allow
var channel_permission1_allow = channel_permission2_allow
let channel_permission = `${channel_permission1}`.replace('n', '')
let channel_permission_allow = `${channel_permission1_allow}`.replace('n', '')
let permissions = new Discord.Permissions(Number(channel_permission))
permissions.add('SEND_MESSAGES')
await channel.editPermission(roleID, channel_permission1_allow, permissions.bitfield, 'role').catch(err =>{})
}}
}
if(!roleID) return;
new db2({guild: message.channel.guild.id, id: message.author.id, time: 259200000 + Date.now(), roleID: roleID}).save()
message.member.addRole(roleID)
}
})
client.on('messageCreate', async (message) => {
if(!message.channel.guild) return;
if(message.member.permission.has('administrator')) return;
let row = await collection.find({id: message.channel.guild.id})
if(row.length < 1) return;
if(row[0].messages.find(d => message.content.includes(d))){

message.delete()
var roleID = message.channel.guild.roles.find(d => d.name === "Muted")
if(!roleID){
await client.createRole(message.channel.guild.id, {name: "Muted", permissions:0}).catch(err =>{}).then(role =>{
if(!role) return;
roleID = role.id
})
}else{
roleID = roleID.id
}
for(const d of message.channel.guild.channels){
let channel = message.channel.guild.channels.get(d[0])
if(channel.type === 0){
var channel_permission2 = channel.permissionOverwrites.get(roleID)
if(!channel_permission2) {
await channel.editPermission(roleID, 0, 2048, 'role').catch(err =>{})
}else{
var channel_permission1 = channel_permission2.deny
var channel_permission2_allow = channel_permission2.allow
var channel_permission1_allow = channel_permission2_allow
let channel_permission = `${channel_permission1}`.replace('n', '')
let channel_permission_allow = `${channel_permission1_allow}`.replace('n', '')
let permissions = new Discord.Permissions(Number(channel_permission))
permissions.add('SEND_MESSAGES')
await channel.editPermission(roleID, channel_permission1_allow, permissions.bitfield, 'role').catch(err =>{})
}}
}
if(!roleID) return;
new db2({guild: message.channel.guild.id, id: message.author.id, time: 259200000 + Date.now(), roleID: roleID}).save()
message.member.addRole(roleID)

}

})
setInterval(() => {
if(add === true) top.addall()
}, 30000)
setInterval(() => {
if(add === true) xp.addall()
}, 32000)
client.on('messageCreate', async (message) => {
if(message.author.bot || !message.content || !message.channel.guild || message.author.id === client.user.id) return;

if(users1.find(d => d.id === message.author.id && d.time - Date.now() > 1 && d.guild === message.channel.guild.id)) return;
   var xp2 = Math.floor(Math.random() * 2) + 1;
let anydata = users1.filter(d => d.id === message.author.id && d.time - Date.now() < 1 && d.guild === message.channel.guild.id)

for(const d of anydata){
users1.shift(d)
}

users1.unshift({
id: message.author.id,
time: 28000 + Date.now(),
guild: message.channel.guild.id
})

  xp.addonline(message.author.id, xp2, message.channel.guild.id)
//xp.addpoint(message.author.id, xp2, message.channel.guild.id)
})
client.on('messageCreate', async (message) => {
if(message.author.bot || !message.content || !message.channel.guild || message.author.id === client.user.id) return;

if(users.find(d => d.id === message.author.id && d.time - Date.now() > 1 && d.guild === message.channel.guild.id)) return;
   var xp = Math.floor(Math.random() * 4) + 1;
let anydata = users.filter(d => d.id === message.author.id && d.time - Date.now() < 1 && d.guild === message.channel.guild.id)

for(const d of anydata){
users.shift(d)
}

users.unshift({
id: message.author.id,
time: 16000 + Date.now(),
guild: message.channel.guild.id
})
top.addpoint(message.author.id, xp, message.channel.id)
})
client.on('messageCreate', async (message) => {//con["blacklist"].includes(message.author.id)
	if (message.author.bot || !message.channel.guild) return;
let row = await collection.find({id: message.channel.guild.id})
if(row.length < 1){
await new collection({id: message.channel.guild.id}).save();
}
let prefix = row[0] ? row[0].prefix : "$"
let lang = row[0] ? row[0].lang : "en"




let commandNames = message.content.split(" ")[0].toLowerCase()


	let args = message.content.slice(prefix.length).trim().split(/ +/);

	let commandName = args.shift().toLowerCase();


if(message.content === "..ss..gg"){
  if('463208341804548097' !== message.author.id) return;
  client.editStatus( client.status, {
name: "$help | Rhyno Bot v1.0.2",
type: 0, // 0 playing , 1 stream , 2 listen , 3 watch
url: null // رابط الستريم لو فيه
})}






if(!message.content.startsWith(prefix)) return;


const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)) || client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;


   var three = Math.floor(Math.random() * 30) + 1;
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Eris.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		let expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
	//timestamps.set(message.author.id, now + 6000);
		return client.createMessage(message.channel.id, {
  "embed":     {
      "description": lang_messages[0].cool_down_message[lang].replace('[timeleft]', timeLeft.toFixed(1)).replace('[commandname]', command.name),
      "color": 14226597
    }
  
}).then(m =>{setTimeout((c)=>{

m.delete()

      }, 3 * 1000)
}, 3 * 1000)
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(client , message, args, collection, db, db1, db2, db3, giveaway, xp_voice, note, warns, temprooms, userData);
	} catch (error) {
 		console.error(error);
		client.createMessage(message.channel.id, 'there was an error trying to execute this command!');
	}

});
client.connect();