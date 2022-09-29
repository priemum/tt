let lang_messages = require('../../../lang.json')     
let ms = require("ms");
module.exports = {
  name: "gstart", // اسم الامر
  description: "to make a giveaway", // شرح الامر
  cooldown: 1, // الكول داون بـ الثواني
  execute: async function(client, msg, args, db3, db1, db2, db4, db5, db) {
    
    let guild = await db3.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"

    
    if (!msg.member.permission.has("manageGuild"))
      return client.createMessage(msg.channel.id, {
        embed: {
          description:lang_messages[0].you_must_manageguild[lang],
          color: 14226597
        }
      });
    let row = await db2.find({ id: msg.channel.guild.id });

    let winers = 1;
    let time = "30s";

    let prefix = row[0] ? row[0].prefix : "$";
    if (!args[0] || !args[1] || !args[2])
      return client.createMessage(msg.channel.id, {
        embed: {
          description: lang_messages[0].please_use_giveaway[lang].replace('[prefix]', prefix),
          color: 14226597
        }
      });
    console.log(Number(args[0].replace("w", "")));
    if (
      !Number(Number(args[0].replace("w", ""))) ||
      Number(args[0].replace("w", "")) > 11 ||
      Number(args[0].replace("w", "")) < 0
    )
      return client.createMessage(msg.channel.id, {
        embed: {
          description: lang_messages[0].use_giveaway_winners[lang].replace('[prefix]', prefix) ,
          color: 14226597
        }
      });

    if (Number(Number(args[0].replace("w", ""))) && args[0].endsWith("w")) {
      winers = Number(args[0].replace("w", ""));
    }

    if (!ms(args[1]) || ms(args[1]) > 1209600000 || ms(args[1]) < 10000)
      return client.createMessage(msg.channel.id, {
        embed: {
          description: lang_messages[0].use_giveaway_time[lang].replace('[prefix]', prefix),
          color: 14226597
        }
      });
    time = args[1];
    client
      .createMessage(msg.channel.id, {
        content: lang_messages[0].giveaway[lang],
        embed: {
          title: args.slice(2).join(" "),
          description: lang_messages[0].react_with[lang]
            .replace("[time]", ms(ms(time), { long: true }))
            .replace("[author]", `<@${msg.author.id}>`),
          color: 14226597
        }
      })
      .then(message => {
        if (!message) return;
        msg.delete();
        message.addReaction("🎉");
        new db({
          messageid: message.id,
          guild: message.channel.guild.id,
          time: ms(time) + Date.now(),
          reason: args.slice(2).join(" "),
          winer: winers,
          channel: message.channel.id,
          emoji: "🎉",
          author: msg.author.id,
          end: false
        }).save();
      });
  }
};
