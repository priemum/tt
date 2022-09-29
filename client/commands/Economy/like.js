var randomId = require("random-id");
const pms = require("pretty-ms");
let fetch = require("node-fetch");
const ms = require("ms");
var top3 = require("../../../levels.js");
var top2 = new top3()
var top1 = require("../../../credits-async.js");
const moment = require("moment");
var top = new top1();
let lang_messages = require('../../../lang.json')
module.exports = {
  name: "like", // اسم الامر
  description: "to give someone a like point", // شرح الامر
  cooldown: 1, // الكول داون بـ الثواني
  execute: async function(client, msg, args, db3, db1, db2, db4, db) {
    let guild = await db3.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"
    let row = await db.find({ id: msg.channel.guild.id });

    let prefix = row[0] ? row[0].prefix : "$";

    let reps = await db.find({ user: msg.author.id });
    let credits = await top.get(msg.author.id);
    if (credits.blacklist === true)
      return client.createMessage(msg.channel.id, {
        embed: {
          description: lang_messages[0].youblacklist[lang],
          color: 14226597
        }
      });
    let data_author = await top2.get_alldata_servers(msg.author.id)
if(data_author.xp < 3000) return client.createMessage(msg.channel.id, {
        embed: {
          description: `Only xp 3000 can`,
          color: 14226597
        }
      });
    let mention = true;
    let user = msg.mentions[0];
    if (!user) {
      let user1 = msg.channel.guild.members.get(args[0]);
      if (!user1)
        return client.createMessage(msg.channel.id, {
          embed: {
            description: lang_messages[0].like_enter[lang].replace('[prefix]', prefix).replace('[id]', msg.author.id).replace('[prefix]', prefix).replace('[id]', msg.author.id),
            color: 14226597
          }
        });
      mention = false;
      user = user1;
    } else {
      user = msg.channel.guild.members.get(msg.mentions[0].id);
    }
    if (msg.channel.guild.members.get(user.id)) {
      mention = true;
    }
    if (msg.author.id == user.id)
      return client.createMessage(msg.channel.id, {
        embed: {
          description: lang_messages[0].you_cant_like_yourself[lang].replace('[prefix]', prefix).replace('[id]', msg.author.id).replace('[prefix]', prefix).replace('[id]', msg.author.id),
          color: 14226597
        }
      });
    if (user.bot)
      return client.createMessage(msg.channel.id, {
        embed: {
          description: lang_messages[0].bots_dont_have_likes[lang],
          color: 14226597
        }
      });

    let data = await db.find({ id: msg.author.id });
    if (data.find(d => d.time - Date.now() > 1))
      return client.createMessage(msg.channel.id, {
        embed: {
          description: lang_messages[0].like_everyday[lang].replace(
            "(time)",
            pms(data.find(d => d.time - Date.now() > 1).time - Date.now(), {
              verbose: true
            })
          ),
          color: 14226597
        }
      });

    fetch("https://dadday-bot.glitch.me/api/v1/captcha", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      referrerPolicy: "no-referrer"
    }).then(async ress => {
      let json = await ress.json();
      let creditss = await top.get(user.id);
      if (creditss.blacklist === true)
        return client.createMessage(msg.channel.id, {
          embed: {
            description: lang_messages[0].thisblacklist[lang],
            color: 14226597
          }
        });
      // Draw cat with lime helmet
      let buf = Buffer.from(json.buf.split(",")[1], "base64");

      client
        .createMessage(
          msg.channel.id,
          lang_messages[0].please_type_numbers[lang],
          [
            {
              file: buf,
              name:
                "captcha." +
                json.buf
                  .split(";")[0]
                  .replace("data:image/", "")
                  .replace("data:video/", "")
                  .replace("data:gif/", "")
            }
          ]
        )
        .then(msgs => {
          if (!msgs) return;
          var dn = false;
          client.on("messageCreate", async message => {
            if (dn || message.author.id !== msg.author.id) return;
            if (msg.channel.id !== message.channel.id) {
              msgs.delete().catch(err => {});
              return (dn = true);
            }

            if (message.content !== json.code) {
              msgs.delete().catch(err => {});
              return (dn = true);
            }
            dn = true;
            let data = await db.find({ id: msg.author.id });
            if (data.find(d => d.time - Date.now() > 1))
              return client.createMessage(msg.channel.id, {
                embed: {
                  description: lang_messages[0].like_everyday[lang].replace(
                    "(time)",
                    pms(
                      data.find(d => d.time - Date.now() > 1).time - Date.now(),
                      { verbose: true }
                    )
                  ),
                  color: 14226597
                }
              });
            client.createMessage(
              "841039862656139294", {
                embed: {
                  description: `
                  **Like**

                  From:
                  id :  ${msg.author.id}
                  name :  ${msg.author.username}
                  createdate : ${moment(msg.author.createdAt).format(
                                  "YYYY/M/D HH:mm:ss"
                                )} \`${moment(msg.author.createdAt).fromNow()}\`
                  
                  To :
                  id : ${user.id}
                  name : ${user.username}
                  createdate : ${moment(user.createdAt).format(
                                  "YYYY/M/D HH:mm:ss"
                                )} \`${moment(user.createdAt).fromNow()}\`
                  
                  In server:
                  id : ${msg.channel.guild.id}
                  count : ${msg.channel.guild.memberCount}
                  createdate : ${moment(msg.channel.guild.createdAt).format(
                                  "YYYY/M/D HH:mm:ss"
                                )} \`${moment(msg.channel.guild.createdAt).fromNow()}\`
                  name : ${msg.channel.guild.name}`,
                  color: 14226597
                              
                }
              });
            new db({
              id: msg.author.id,
              time: Date.now() + 86400000,
              user: user.id
            }).save();
            msgs.delete();
            message.delete();
            client.createMessage(msg.channel.id, {
              embed: {
                description: lang_messages[0].give_like[lang].replace('[username]', msg.author.username).replace('[user]', user.username ||user.user.username),
                color: 14226597
              }
            });
          });
        })
        .catch(err => {});
    });
  }
};
