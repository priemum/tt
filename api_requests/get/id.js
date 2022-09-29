const Canvas = require('canvas')
  const { loadImage } = require('canvas')
let Eris = require('eris')
let client = Eris('ODQwNjkyNjg2NzEzMTI2OTQy.YJb6Ew.UYmr1NIqFW42gUB6SjLrgdQ8JVI', {restMode: true, defaultImageSize: 2048})
var top1 = require("../../levels.js");
var top = new top1()

let reward_xp = [
{
xp: 1770000,
level: 60
},
{
xp: 1704000,
level: 59
},
{
xp: 1641000,
level: 58
},
{
xp: 1578300,
level: 57
},
{
xp: 1518300,
level: 56
},
{
xp: 1459000,
level: 55
},
{
xp: 1400200,
level: 54
},
{
xp: 1342200,
level: 53
},
{
xp: 1285000,
level: 52
},
{
xp: 1229000,
level: 51
},
{
xp: 1173720,
level: 50
},
{
xp: 1119520,
level: 49
},
{
xp: 1066520,
level: 48
},
{
xp: 1014900,
level: 47
},
{
xp: 964700,
level: 46
},
{
xp: 915700,
level: 45
},
{
xp: 867620,
level: 44
},
{
xp: 820300,
level: 43
},
{
xp: 775300,
level: 42
},
{
xp: 732300,
level: 41
},
{
xp: 692300,
level: 40
},
{
xp: 654800,
level: 39
},
{
xp: 618000,
level: 38
},
{
xp: 100000,
level: 37
},
{
xp: 582000,
level: 36
},
{
xp: 546750,
level: 35
},
{
xp: 512000,
level: 34
},
{
xp: 478000,
level: 33
},
{
xp: 444400,
level: 32
},
{
xp: 412400,
level: 31
},
{
xp: 381400,
level: 30
},
{
xp: 352400,
level: 29
},
{
xp: 324600,
level: 28
},
{
xp: 297700,
level: 27
},
{
xp: 271700,
level: 26
},
{
xp: 246300,
level: 25
},
{
xp: 222000,
level: 24
},
{
xp: 199000,
level: 23
},
{
xp: 177800,
level: 22
},
{
xp: 157800,
level: 21
},
{
xp: 217000,
level: 20
},
{
xp: 138300,
level: 19
},
{
xp: 120116,
level: 18
},
{
xp: 102916,
level: 17
},
{
xp: 86716,
level: 16
},
{
xp: 71500,
level: 15
},
{
xp: 57500,
level: 14
},
{
xp: 44500,
level: 13
},
{
xp: 33000,
level: 12
},
{
xp: 22800,
level: 11
},
{
xp: 12500,
level: 10
},
{
xp: 15300,
level: 9
},
{
xp: 10300,
level: 8
},
{
xp: 7300,
level: 7
},
{
xp: 5000,
level: 6
},
{
xp: 3000,
level: 5
},
{
xp: 1200,
level: 4
},
{
xp: 700,
level: 3
},
{
xp: 300,
level: 2
},
{
xp: 100,
level: 1
},
{
xp: 0,
level: 0
}

]
let level = 0
let reward_xp_voice = [
{
xp: 480000,
level: 60
},
{
xp: 450000,
level: 59
},
{
xp: 422000,
level: 58
},
{
xp: 396000,
level: 57
},
{
xp: 379000,
level: 56
},
{
xp: 365000,
level: 55
},
{
xp: 340000,
level: 54
},
{
xp: 320000,
level: 53
},
{
xp: 300300,
level: 52
},
{
xp: 285000,
level: 51
},
{
xp: 269000,
level: 50
},
{
xp: 251300,
level: 49
},
{
xp: 239000,
level: 48
},
{
xp: 223500,
level: 47
},
{
xp: 210400,
level: 46
},
{
xp: 195400,
level: 45
},
{
xp: 183400,
level: 44
},
{
xp: 169400,
level: 43
},
{
xp: 159000,
level: 42
},
{
xp: 146000,
level: 41
},
{
xp: 134000,
level: 40
},
{
xp: 124000,
level: 39
},
{
xp: 112000,
level: 38
},
{
xp: 105000,
level: 37
},
{
xp: 97000,
level: 36
},
{
xp: 90900,
level: 35
},
{
xp: 86000,
level: 34
},
{
xp: 83500,
level: 33
},
{
xp: 80000,
level: 32
},
{
xp: 76400,
level: 31
},
{
xp: 73900,
level: 30
},
{
xp: 69400,
level: 29
},
{
xp: 66800,
level: 28
},
{
xp: 63400,
level: 27
},
{
xp: 59400,
level: 26
},
{
xp: 56300,
level: 25
},
{
xp: 52000,
level: 24
},
{
xp: 45000,
level: 23
},
{
xp: 40800,
level: 22
},
{
xp: 37600,
level: 21
},
{
xp: 35000,
level: 20
},
{
xp: 32900,
level: 19
},
{
xp: 31700,
level: 18
},
{
xp: 29500,
level: 17
},
{
xp: 27300,
level: 16
},
{
xp: 24800,
level: 15
},
{
xp: 22400,
level: 14
},
{
xp: 21600,
level: 13
},
{
xp: 20900,
level: 12
},
{
xp: 19700,
level: 11
},
{
xp: 17500,
level: 10
},
{
xp: 14500,
level: 9
},
{
xp: 11500,
level: 8
},
{
xp: 9500,
level: 7
},
{
xp: 7000,
level: 6
},
{
xp: 4000,
level: 5
},
{
xp: 2500,
level: 4
},
{
xp: 1700,
level: 3
},
{
xp: 1000,
level: 2
},
{
xp: 200,
level: 1
},
{
xp: 0,
level: 0
}
]
module.exports = {
	path: '/api/v1/rank/:id/:guild',
	method: 'get',
	run: async (req, res, db) => {
let { headers, params } = req
let user = await client.getRESTUser(params.id).catch(err =>{})
if(!user) return res.status(403).json({errors: ['userData'], message: "I Can't find this user"})
    let xp_chat = await top.get(user.id, params.guild)
let xp_voice = await db.findOne({id: user.id, guild: params.guild})
 if(!xp_chat) xp_chat = {xp: 1}
if(!xp_voice) xp_voice = {xp: 1}
if(xp_chat.xp < 2) xp_chat = {xp: 3}
if(xp_voice.xp < 2) xp_voice = {xp: 3}

let nowxp = reward_xp_voice.find(d => d.xp < xp_voice.xp).xp
let nextxp = reward_xp_voice.filter(d => d.xp > xp_voice.xp)[reward_xp_voice.filter(d => d.xp > xp_voice.xp).length - 1].xp 
    let lastxp = reward_xp_voice.find(d => d.xp < xp_voice.xp).xp
    let loadxp = xp_voice.xp - lastxp
    let xp316 = (nextxp - lastxp)/316
    let loading = loadxp / xp316
    
let nowxpchat = reward_xp.find(d => d.xp < xp_chat.xp).xp
let nextxpchat = reward_xp.filter(d => d.xp > xp_chat.xp)[reward_xp.filter(d => d.xp > xp_chat.xp).length - 1].xp 
    let lastxpchat = reward_xp.find(d => d.xp < xp_chat.xp).xp
    let loadxpchat = xp_chat.xp - lastxpchat
    let xp316chat = (nextxpchat - lastxpchat)/316
    let loadingchat = loadxpchat / xp316chat
    
let chatlevel = reward_xp.find(d => d.xp < xp_chat.xp).level
let voicelevel = reward_xp_voice.find(d => d.xp < xp_voice.xp).level

    const canvas = Canvas.createCanvas(850, 320);
    const ctx = canvas.getContext('2d');
  
  const wallpaper1 = await loadImage('https://cdn.discordapp.com/attachments/838964907092344852/840791806576164884/profile.png')
    ctx.drawImage(wallpaper1, 0, 0, 850, 320);  
  const template = await loadImage('https://cdn.discordapp.com/attachments/832995252621017098/840261393428381696/Untitled-1.png')
    ctx.drawImage(template, 0, 0, 850, 320);
let data_voice = await db.find({guild: params.guild})
let top_voice = data_voice.sort((a ,b) => b.xp - a.xp)
var ontop_voice = 0
var CS = 0
  for(const d of top_voice){

CS++  
  if(user.id === d.id) ontop_voice = CS
  }
let data_chat = await top.getall(params.guild)

let top_chat = data_chat.sort((a ,b) => b.xp - a.xp)
var ontop_chat = 0
var CC = 0
  for(const d of top_chat){
 CC++  
    if(user.id === d.id) ontop_chat = CC
  }
  ctx.beginPath();

let num = 45
if(user.username.length < 10) num = 40
if(user.username.length > 20) num = 30
if(user.username.length > 25) num = 20
if(user.username.length > 32) num = 15

ctx.font = num + 'px Impact'
ctx.fillStyle = "#ffffff";
ctx.textAlign = "center";
ctx.fontSize = '72px';
ctx.fillText(user.username || user.user.username, 540, 80, 997)
    
    
ctx.font = '15px Impact'
ctx.fillStyle = "#ffffff";
ctx.textAlign = "center";
ctx.fontSize = '72px';
ctx.fillText(`${xp_chat.xp}`, 745, 194, 997)

ctx.font = '25px Impact'
ctx.fillStyle = "#ffffff";
ctx.textAlign = "center";
ctx.fontSize = '72px';
ctx.fillText(`${chatlevel}`, 345, 163, 997)
    
ctx.font = '15px Impact'
ctx.fillStyle = "#ffffff";
ctx.textAlign = "center";
ctx.fontSize = '72px';
ctx.fillText(`${xp_voice.xp}`, 745, 276, 997)
    
ctx.font = '25px Impact'
ctx.fillStyle = "#ffffff";
ctx.textAlign = "center";
ctx.fontSize = '72px';
ctx.fillText(`${voicelevel}`, 345, 245, 997)
    
ctx.font = '15px Impact'
ctx.fillStyle = "#ffffff";
ctx.textAlign = "center";
ctx.fontSize = '72px';
ctx.fillText(`${ontop_voice}`, 532, 223, 997)

ctx.font = '15px Impact'
ctx.fillStyle = "#ffffff";
ctx.textAlign = "center";
ctx.fontSize = '72px';
ctx.fillText(`${ontop_chat}`, 532, 138, 997)
    

    
    const avatar = await Canvas.loadImage(user.avatarURL || user.user.avatarURL);
    ctx.drawImage(avatar, 62.9, 48, 216.5, 230);    

   const loadtext = await Canvas.loadImage('https://cdn.discordapp.com/attachments/832995252621017098/840734504766144553/unknown.png');
    ctx.drawImage(loadtext, 450, 144, 1, 29);  
    let xp =  reward_xp.filter(d => d.xp < xp_voice.xp)[reward_xp.filter(d => d.xp < xp_voice.xp).length - 1] - reward_xp.filter(d => d.xp > xp_voice.xp)[reward_xp.filter(d => d.xp > xp_voice.xp).length - 1].xp 



if(loading > 315) loading = 316
    const loadvoice = await Canvas.loadImage('https://cdn.discordapp.com/attachments/832995252621017098/840734504766144553/unknown.png');
    ctx.drawImage(loadvoice, 450, 226.9, loading, 29);  
    
    const loadchat = await Canvas.loadImage('https://cdn.discordapp.com/attachments/832995252621017098/840734504766144553/unknown.png');
    ctx.drawImage(loadchat, 450, 142, loadingchat, 29); 

res.status(200).json({buf: canvas.toDataURL()})
 }
}

client.connect()