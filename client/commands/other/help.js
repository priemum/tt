let lang_messages = require('../../../lang.json')  
module.exports = {
	name: 'help', // اسم الامر
	description: "to get a list with bot commands", // شرح الامر
	cooldown: 25, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
    
    let guild = await db.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"
    
let row = await db.find({id: msg.channel.guild.id})

let prefix = row[0] ? row[0].prefix : "$"
client.createMessage(msg.channel.id, {
embed:{
title: lang_messages[0].rhyno_commands[lang],
description: lang_messages[0].help_home[lang].replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix),
color : 14226597,
  "footer": {
        "text": lang_messages[0].rhyno_team[lang],
        "icon_url": "https://cdn.discordapp.com/emojis/839362578916311040.png?v=1"
      },
      thumbnail: {
		url: client.user.avatarURL,
      }  
}

}).then(m =>{
m.addReaction('public:838935938104033340')
m.addReaction('Moderation:838935952726425600')
m.addReaction('economy:838935963266318346')
m.addReaction('a:giveaways:838935968139706379')
m.addReaction('Top:840816730842202182')
m.addReaction('Music:839385313776107521')
m.addReaction('voice:844037492494565400')
m.addReaction('Protection:845177162658086922')
m.addReaction('Home:840987333704810506')
let time = Date.now() + 20000
client.on('messageReactionAdd', async (message, emoji, member) =>{
if(member.id !== msg.author.id || message.channel.id !== msg.channel.id || time - Date.now() < 1) return;
 if(emoji.id && emoji.name) message.removeReaction(`${emoji.name}:${emoji.id}`, member.id)
if(emoji.id === "840987333704810506" && emoji.name === "Home"){
time = Date.now() + 20000
m.edit({
embed:{
title: lang_messages[0].rhyno_commands[lang],
description: lang_messages[0].help_home[lang].replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix),
color : 14226597,
  "footer": {
        "text": lang_messages[0].rhyno_team[lang],
        "icon_url": "https://cdn.discordapp.com/emojis/839362578916311040.png?v=1"
      },
      thumbnail: {
		url: client.user.avatarURL,
      }  
}

})
}
if(emoji.id === "838935938104033340" && emoji.name === "public"){
time = Date.now() + 20000
m.edit({
  "embed": 
    {
      "title": lang_messages[0].rhyno_commands[lang],
      "description": lang_messages[0].help_public[lang].replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix),
      "color": 14226597,
  
      "footer": {
        "text": lang_messages[0].rhyno_team[lang],
        "icon_url": "https://cdn.discordapp.com/emojis/839362578916311040.png?v=1"
      },
      thumbnail: {
		url: client.user.avatarURL,
	}
    }
  
})
}
if(emoji.id === "838935952726425600" && emoji.name === "Moderation"){
time = Date.now() + 20000
m.edit({
  "embed": 
    {
      "title": lang_messages[0].rhyno_commands[lang],
      "description": lang_messages[0].help_moderation[lang].replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix),
      "color": 14226597,
  
      "footer": {
        "text": lang_messages[0].rhyno_team[lang],
        "icon_url": "https://cdn.discordapp.com/emojis/839362578916311040.png?v=1"
      },
      thumbnail: {
		url: client.user.avatarURL,
	}
    }
  
})
}
if(emoji.id === "838935968139706379" && emoji.name === "giveaways"){
time = Date.now() + 20000
m.edit({
  "embed": 
    {
      "title": lang_messages[0].rhyno_commands[lang],
      "description": lang_messages[0].help_giveaways[lang].replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix),
      "color": 14226597,
  
      "footer": {
        "text": lang_messages[0].rhyno_team[lang],
        "icon_url": "https://cdn.discordapp.com/emojis/839362578916311040.png?v=1"
      },
      thumbnail: {
		url: client.user.avatarURL,
	}
    }
})
}
if(emoji.id === "838935963266318346" && emoji.name === "economy"){
time = Date.now() + 20000
m.edit({
  "embed": 
    {
      "title": lang_messages[0].rhyno_commands[lang],
      "description": lang_messages[0].help_economy[lang].replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix),
      "color": 14226597,
  
      "footer": {
        "text": lang_messages[0].rhyno_team[lang],
        "icon_url": "https://cdn.discordapp.com/emojis/839362578916311040.png?v=1"
      },
      thumbnail: {
		url: client.user.avatarURL,
	}
    }
  
})
}
if(emoji.id === "840816730842202182" && emoji.name === "Top"){
time = Date.now() + 20000
m.edit({
  "embed":
  {
    "title": lang_messages[0].rhyno_commands[lang],
    "description": lang_messages[0].help_top[lang].replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix),
    "color": 14226597,
    "footer": {
    "text": lang_messages[0].rhyno_team[lang],
    "icon_url": "https://cdn.discordapp.com/emojis/839362578916311040.png?v=1"
  }}
})
}
if(emoji.id === "839385313776107521" && emoji.name === "Music"){
time = Date.now() + 20000
m.edit({
  "embed": 
    {
      "title": lang_messages[0].rhyno_commands[lang],
      "description": lang_messages[0].help_music[lang].replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix),
      "color": 14226597,
  
      "footer": {
        "text": lang_messages[0].rhyno_team[lang],
        "icon_url": "https://cdn.discordapp.com/emojis/839362578916311040.png?v=1"
      },
      thumbnail: {
		url: client.user.avatarURL,
	}
    }
  
})
}

if(emoji.id === "844037492494565400" && emoji.name === "voice"){
time = Date.now() + 20000
m.edit({
  "embed": 
    {
      "title": lang_messages[0].rhyno_commands[lang],
      "description": lang_messages[0].help_voice[lang].replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix),
      "color": 14226597,
  
      "footer": {
        "text": lang_messages[0].rhyno_team[lang],
        "icon_url": "https://cdn.discordapp.com/emojis/839362578916311040.png?v=1"
      },
      thumbnail: {
		url: client.user.avatarURL,
	}
    }
  
})
}

if(emoji.id === "845177162658086922" && emoji.name === "Protection"){
time = Date.now() + 20000
m.edit({
  "embed": 
    {
      "title": lang_messages[0].rhyno_commands[lang],
      "description": lang_messages[0].help_Protection[lang].replace('[prefix]', prefix).replace('[prefix]', prefix).replace('[prefix]', prefix),
      "color": 14226597,
  
      "footer": {
        "text": lang_messages[0].rhyno_team[lang],
        "icon_url": "https://cdn.discordapp.com/emojis/839362578916311040.png?v=1"
      },
      thumbnail: {
		url: client.user.avatarURL,
	}
    }
  
})
}
})

})
/*
client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Rhyno commands",
      "description": `**bot prefix is \`${prefix}\`\n\n <:public:838935938104033340> Puplic Commands**\n\n> **${prefix}id \`|\` To Show Your Level In The Server**\n > **${prefix}server \`|\` View Server Information** <:yes:839305757576003585>\n> **${prefix}ping \`|\` View bot Ping** <:yes:839305757576003585> \n> **${prefix}info \`|\` View Rhyno Bot Information** <:yes:839305757576003585>\n> **${prefix}user \`|\` View User Information** <:yes:839305757576003585>\n> **${prefix}avatar \`|\` View User Avatar** <:yes:839305757576003585>\n> **${prefix}avatar server \`|\` View Server Avatar** <:yes:839305757576003585>\n> **${prefix}roles \`|\` View Server Roles** <:yes:839305757576003585>\n> **${prefix}emojis \`|\` Show Server Emojis** <:yes:839305757576003585> \n\n`,
      "color": 14226597,
  
      "footer": {
        "text": "Rhyno Team",
        "icon_url": "https://cdn.discordapp.com/emojis/839362578916311040.png?v=1"
      },
      thumbnail: {
		url: client.user.avatarURL,
	}
    }
  
}),
  client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Rhyno commands",
      "description": `<:Moderation:838935952726425600> **Moderation Commands**\n\n> **${prefix}clear \`|\` Claer messages from chat** <:yes:839305757576003585>\n> **${prefix}ban \`|\` Ban A User From Guild** <:yes:839305757576003585>\n> **${prefix}unban \`|\` Unban A User From Guild** <:yes:839305757576003585>\n> **${prefix}kick \`|\` Kick A User From Guild** <:yes:839305757576003585>\n> **${prefix}mute \`|\` Mute A User From Chat <:yes:839305757576003585>**\n> **${prefix}unmute \`|\` Unmute A User From Chat** <:yes:839305757576003585>\n> **${prefix}role [user] [role] \`|\` Add / Remove Role From User** <:yes:839305757576003585>\n> **${prefix}role all [role] \`|\` Add Role To All Members** <:yes:839305757576003585>\n> **${prefix}role bots [role] \`|\` Add Role To All Bots** <:yes:839305757576003585>\n> **${prefix}role humans [role] \`|\` Add Role To All Humans** <:yes:839305757576003585>\n> **${prefix}role -all [role] \`|\` Remove Role From All Members** <:yes:839305757576003585>\n> **${prefix}role -bots [role] \`|\` Remove Role From All Bots** <:yes:839305757576003585>\n> **${prefix}role -humans [role] \`|\` Remove Role From All Humans** <:yes:839305757576003585>\n> **${prefix}lock \`|\` ${prefix}Lock Text Channel <:yes:839305757576003585>**\n> **${prefix}unlock \`|\` Unlock Voice Channel <:yes:839305757576003585>**\n> **${prefix}nick [user] [name] \`|\` Change User Nickname <:yes:839305757576003585>**\n> **${prefix}add-emoji \`|\` Add A Emoji To The Server** <:yes:839305757576003585>\n\n`,
      "color": 14226597,
  
      "footer": {
        "text": "Rhyno Team",
        "icon_url": "https://cdn.discordapp.com/emojis/839362578916311040.png?v=1"
      },
      thumbnail: {
		url: client.user.avatarURL,
	}
    }
  
}),
  client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Rhyno commands",
      "description": `**<:economy:838935963266318346> Economy Commands**\n\n> **${prefix}profile \`|\` View Profile** <:yes:839305757576003585>\n> **${prefix}coins \`|\` View User Coins** <:yes:839305757576003585>\n> **${prefix}coins [user] [amount] \`|\` Transfer Coins To User** <:yes:839305757576003585>\n> **${prefix}note \`|\` Set Your Profile Note** <:yes:839305757576003585>\n> **${prefix}like [user] \`|\` Give A Like Point** <:yes:839305757576003585>\n> **${prefix}daily \`|\` Collect Daily** <:yes:839305757576003585>\n\n`,
      "color": 14226597,
  
      "footer": {
        "text": "Rhyno Team",
        "icon_url": "https://cdn.discordapp.com/emojis/839362578916311040.png?v=1"
      },
      thumbnail: {
		url: client.user.avatarURL,
	}
    }
  
}),
      client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Rhyno commands",
      "description": `<a:giveaways:838935968139706379> **Giveaway Commands**\n\n> **${prefix}gstart \`|\` Start A Giveaway** <:yes:839305757576003585>\n> **${prefix}gend \`|\` End A Giveaway** <:yes:839305757576003585>\n> **${prefix}greroll \`|\` Reroll A Giveaway Winner(s)** <:yes:839305757576003585> `,
      "color": 14226597,
  
      "footer": {
        "text": "Rhyno Team",
        "icon_url": "https://cdn.discordapp.com/emojis/839362578916311040.png?v=1"
      },
      thumbnail: {
		url: client.user.avatarURL,
	}
    }
}),
  
  
  client.createMessage(msg.channel.id, {
  "embed":
  {
    "title": "Rhyno commands",
    "description": `**<:Top:840816730842202182> Top Commands**\n\n> **${prefix}top \`|\` To Get A List With The Most Active People In The Server** <:yes:839305757576003585>\n> **${prefix}top-coins \`|\` To Get A List With The Richest 5 People** <:yes:839305757576003585>\n> **${prefix}top-xp \`|\` To Get A List With The Most Active 5 People** <:yes:839305757576003585>`,
    "color": 14226597,
    "footer": {
    "text": "Rhyno Team",
    "icon_url": "https://cdn.discordapp.com/emojis/839362578916311040.png?v=1"
  }}
}),
    client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Rhyno commands",
      "description": `<:Music:839385313776107521> **Music Commands**\n\n> **${prefix}play \`|\` Add A Song To Queue <:yes:839305757576003585>**\n> **${prefix}skip \`|\` Skip Current Song <:yes:839305757576003585>**\n> **${prefix}queue \`|\` Display Queue <:yes:839305757576003585>**\n> **${prefix}stop \`|\` Stop Queue And Leave <:yes:839305757576003585>**\n> **${prefix}now-playing \`|\` View Current Song <:yes:839305757576003585>**\n> **${prefix}volume \`|\` Change Song Volume <:yes:839305757576003585>**\n> **${prefix}pause \`|\` Pause Current Song <:yes:839305757576003585>**\n> **${prefix}repeat \`|\` Repeat Song <:yes:839305757576003585>**\n> **${prefix}clear-queue \`|\` Clear Current Queue <:yes:839305757576003585>**\n\n**[support](https://discord.gg/YuhPs3VTF3)**\n**[invite](https://discord.com/oauth2/authorize?client_id=[id]&permissions=2080374975&scope=bot)**`.replace('[id]', client.user.id),
      "color": 14226597,
  
      "footer": {
        "text": "Rhyno Team",
        "icon_url": "https://cdn.discordapp.com/emojis/839362578916311040.png?v=1"
      },
      thumbnail: {
		url: client.user.avatarURL,
	}
    }
  
})                 */


	},
};

