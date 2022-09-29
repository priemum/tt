module.exports = {
	name: 'note', // اسم الامر
	description: "to add a note to your profile", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, collection, db, db1, db2, db3, giveaway, xp_voice, note) {


let edit_note = await note.findOne({id: msg.author.id})
if(args.slice(0).join(" ").length > 19) return client.createMessage(msg.channel.id, `Your note must be less than 20 letter`)
if(!edit_note){
new note({id: msg.author.id, note: args.slice(0).join(" ") || ""}).save()
}else{
  await note.updateOne({id: msg.author.id}, {"note": args.slice(0).join(" ") || ""})
}
msg.addReaction('yes:839305757576003585')
	},
};
