let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'roles', // اسم الامر
	description: "show server roles", // شرح الامر
	cooldown: 10, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
    
    let guild = await db.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"

let msgs = ``
let roles = []
for(const data of msg.channel.guild.roles){
roles.unshift(data)
}

for(const data of roles){
if(msgs.length > 1900){
client.createMessage(msg.channel.id, {
  embed :
{
  "description" : ` \`\`\`${msgs || lang_messages[0].server_doesnt_have_roles[lang]}\`\`\` `,
  "color": 14226597
}
})
msgs = ``
}
msgs = msgs + `\n${msg.channel.guild.roles.get(data[0]).name}    |    ${msg.channel.guild.members.filter(d => d.roles.includes(msg.channel.guild.roles.get(data[0]).id)).length}`
}
client.createMessage(msg.channel.id, {
  embed :
{
  "description" : ` \`\`\`${msgs || lang_messages[0].server_doesnt_have_roles[lang]}\`\`\` `,
  "color": 14226597
}
})
	},
};
