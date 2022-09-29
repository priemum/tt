const mongoose = require("mongoose")
const fs = require('fs')
var top = require("./xps.json");
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

const collection = mongoose.model("levels", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "xp": { type: Number, default: 0 },
            "guild": { type: String},
            "blacklist": { type: Boolean, default: false },
            "totlxp": { type: Number, default: 0 } ,

}));


let db = collection
 class Client  {
constructor () {
}
async test(){
// let datas = await collection.find({})

//for(const d of datas){
  
  //let xp = d.xp
 // let totlxp = d.totlxp || 0
// await collection.updateOne({_id: d._id}, {"totlxp": xp})
//
//console.log("end")
}

async get(id, guild){
 top = require("./xps.json");
let data = top.find(d => d.id === id && d.guild === guild)
let mongodb_data = await collection.find({id: id, guild: guild})
if(mongodb_data.length < 1) mongodb_data = [{ xp: 0 }]
if(!data) data = {xp: 0}
return { xp: mongodb_data[0].xp + data.xp }
}
   

async get_alldata_servers(id){
 top = require("./xps.json");
let mongodb_data = await collection.find({id: id})

var data_xp = 0
var mongoose_xp = 0
for(const d of top.filter(d => d.id === id)) data_xp = data_xp + d.xp

for(const d of mongodb_data) mongoose_xp = mongoose_xp + d.totlxp
return { xp: mongoose_xp + data_xp }
/*
 top = require("./xps.json");
let data = top.find(d => d.id === id)
let mongodb_data = await collection.find({id: id})
if(mongodb_data.length < 1) mongodb_data = [{ xp: 0 }]
le
if(!data) data = {xp: 0}
return { xp: mongodb_data[0].xp + data.xp })*/
}
async getall(guild){
 top = require("./xps.json");
var users = []
let allusers = await collection.find({guild: guild})
for(const mongodb_data of allusers){
if(!users.find(d => d.id === mongodb_data.id)){
let data = top.find(d => d.id === mongodb_data.id)
if(!data){
users.unshift({
blacklist: mongodb_data.blacklist || false,
guild: mongodb_data.guild,
id: mongodb_data.id,
xp: mongodb_data.xp
})
}else{
users.unshift({
blacklist: mongodb_data.blacklist || false,
guild: mongodb_data.guild,
id: mongodb_data.id,
xp: data.xp + mongodb_data.xp
})
}}
}
for(const mongodb_data of top){
if(!users.find(d => d.id === mongodb_data.id)){
let data = await collection.find({guild: guild})
if(data.length < 1){
users.unshift({
blacklist: false,
guild: mongodb_data.guild,
id: mongodb_data.id,
xp: mongodb_data.xp
})
}else{
users.unshift({
blacklist: data[0].blacklist || false,
guild: mongodb_data.guild,
id: mongodb_data.id,
xp: data[0].xp + mongodb_data.xp
})
}}
}
return users.filter(d => d)

}
async blacklist(id, status){
let mongodb_data = await collection.find({id: id})
if(mongodb_data.length < 1){
new collection({id: id, blacklist: status}).save();
}else{
await collection.updateOne({id: id}, {"blacklist": status })
}


}
async addall(){
 top = JSON.parse(fs.readFileSync("./xps.json", "utf8"))
for(const data of top){
let mongodb_data = await collection.find({id: data.id})
if(mongodb_data.length < 1){
if(!blacklists.includes(data.id)) new collection({id: data.id}).save();
}else{
let dd = mongodb_data[0].totlxp
if(!blacklists.includes(data.id)) await collection.updateOne({_id: mongodb_data[0]._id}, {"totlxp": dd + data.xp })
if(!blacklists.includes(data.id)) await collection.updateOne({_id: mongodb_data[0]._id}, {"xp": mongodb_data[0].xp + data.xp })
}
top.shift(data)
fs.writeFileSync("./xps.json", JSON.stringify(top, null, 4));
}
}
  async getalldata(){
 top = require("./xps.json");
var users = []
let allusers = await collection.find({})
for(const mongodb_data of allusers){
if(!users.find(d => d.id === mongodb_data.id)){
let data = top.find(d => d.id === mongodb_data.id)
if(!data){
users.unshift({
blacklist: mongodb_data.blacklist || false,
guild: mongodb_data.guild,
id: mongodb_data.id,
xp: mongodb_data.xp
})
}else{
users.unshift({
blacklist: mongodb_data.blacklist || false,
guild: mongodb_data.guild,
id: mongodb_data.id,
xp: data.xp + mongodb_data.totlxp
})
}}
}
for(const mongodb_data of top){
if(!users.find(d => d.id === mongodb_data.id)){
let data = await collection.find({id: mongodb_data.id})
if(data.length < 1){
users.unshift({
blacklist: false,
guild: mongodb_data.guild,
id: mongodb_data.id,
xp: mongodb_data.xp
})
}else{
users.unshift({
blacklist: data[0].blacklist || false,
guild: mongodb_data.guild,
id: mongodb_data.id,
xp: data[0].totlxp + mongodb_data.xp
})
}}
}
return users.filter(d => d.blacklist === false)

}
async addonline(id, num, guild){
  let find = await collection.findOne({id: id, guild: guild})
  if(find){
  await collection.updateOne({_id: find._id}, { $inc:{totlxp: num}})
  await collection.updateOne({_id: find._id}, { $inc:{xp: num}})
}else{
  new collection({guild: guild, xp: num, totlxp: num}).save()
}
  
  
}

async set(id, num, guild){
let blacklist = await collection.findOne({id: id, blacklist: true})
let mongodb_data = await collection.find({id: id, guild: guild})
if(mongodb_data.length < 1){
new collection({id: id, xp: num, guild: guild}).save();
}else{
if(!blacklist) await collection.updateOne({_id: mongodb_data[0]._id}, {"xp": num })
}
}
async addpoint(id, num, guild){
if(blacklists.includes(id)) return console.log(`!!!!!!`)
let blacklist = await collection.findOne({id: id, blacklist: true})

 top = require("./xps.json");
let data = top.find(d => d.id === id && d.guild === guild)
if(!data){
top.unshift({
guild: guild,
id: id,
xp: num
})
}else{
if(!blacklist) data.xp = data.xp + num
}
    fs.writeFileSync("./xps.json", JSON.stringify(top, null, 4));
}

 }
module.exports = Client
