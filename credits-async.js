const mongoose = require("mongoose")
const fs = require('fs')
var top = require("./credits.json");
let blacklists = ["694286559033294889", "603167853574619170"]

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

const collection = mongoose.model("credits", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "blacklist": { type: Boolean, default: false } ,
            "credits": { type: Number, default: 0 },

}));
let db = collection
 class Client  {
constructor () {
}
async blacklist(id, status){
let mongodb_data = await collection.find({id: id})
if(mongodb_data.length < 1){
new collection({id: id, blacklist: status}).save();
}else{
await collection.updateOne({id: id}, {"blacklist": status })
}


}

async get(id, channel){
if(blacklists.includes(id)) return console.log(`!!!!!!`)
 top = require("./credits.json");
let data = top.find(d => d.id === id)
let mongodb_data = await collection.find({id: id})
if(mongodb_data.length < 1) mongodb_data = [{ credits: 0, blacklist: false }]
if(!data) data = {credits: 0}
return { credits: mongodb_data[0].credits + data.credits, blacklist: mongodb_data[0].blacklist || false }
}

async getall(channel){
 top = require("./credits.json");
var users = []
let allusers = await collection.find({})
for(const mongodb_data of allusers){
if(!users.find(d => d.id === mongodb_data.id)){
let data = top.find(d => d.id === mongodb_data.id)
if(!data){
users.unshift({
blacklist: mongodb_data.blacklist,
channel: mongodb_data.channel,
id: mongodb_data.id,
credits: mongodb_data.credits
})
}else{
users.unshift({
blacklist: mongodb_data.blacklist,
channel: mongodb_data.channel,
id: mongodb_data.id,
credits: data.credits + mongodb_data.credits
})
}}
}
for(const mongodb_data of top){
if(!users.find(d => d.id === mongodb_data.id)){
let data = await collection.find({id: mongodb_data.id})
if(data.length < 1){
users.unshift({
blacklist: false,
channel: mongodb_data.channel,
id: mongodb_data.id,
credits: mongodb_data.credits
})
}else{
users.unshift({
blacklist: data[0].blacklist,
channel: mongodb_data.channel,
id: mongodb_data.id,
credits: data[0].credits + mongodb_data.credits
})
}}
}
return users.filter(d => d)

}

async addall(){
 top = JSON.parse(fs.readFileSync("./credits.json", "utf8"))
for(const data of top){
let mongodb_data = await collection.find({id: data.id})
if(mongodb_data.length < 1){
if(!blacklists.includes(data.id)) new collection({id: data.id}).save();
}else{
if(!blacklists.includes(data.id)) await collection.updateOne({_id: mongodb_data[0]._id}, {"credits": mongodb_data[0].credits + data.credits })
}
 top = JSON.parse(fs.readFileSync("./credits.json", "utf8"))

top.shift(data)
fs.writeFileSync("./credits.json", JSON.stringify(top, null, 4));
}

}
async set(id, num){
if(blacklists.includes(id)) return console.log(`!!!!!!`)
let mongodb_data = await collection.find({id: id})
if(mongodb_data.length < 1){
new collection({id: id, credits: num}).save();
}else{
await collection.updateOne({_id: mongodb_data[0]._id}, {"credits": num })
}
}
async addpoint(id, num, channel){
let mongodb_data = await collection.find({id: id})
if(mongodb_data.length < 1){
new collection({id: id, credits: num}).save();
}else{
await collection.updateOne({_id: mongodb_data[0]._id} , { $inc: {"credits": num} })
}

}

 }
module.exports = Client