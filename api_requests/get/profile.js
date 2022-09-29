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
var top1 = require("../../levels.js");
var top = new top1()
var top2 = require("../../credits-async.js");
var top3 = new top2()
const Canvas = require('canvas')
  const { loadImage } = require('canvas')
let Eris = require('eris')
let client = Eris('ODQwNjkyNjg2NzEzMTI2OTQy.YJb6Ew.UYmr1NIqFW42gUB6SjLrgdQ8JVI', {restMode: true, defaultImageSize: 2048})
module.exports = {
	path: '/api/v1/profile/:id/:guild',
	method: 'get',
	run: async (req, res, db, note, db3) => {
let { headers, params } = req
let user = await client.getRESTUser(params.id).catch(err =>{})
if(!user) return res.status(403).json({errors: ['userData'], message: "I Can't find this user"})

let edit_note = await note.find({id: params.id}) 
if(edit_note.length < 1) edit_note = [{note: ""}]

let allxp = await top.get_alldata_servers(params.id)
console.log(allxp)
let xp_here = await top.get(params.id, params.guild)
let credits = await top3.get(params.id)
let reps = await db3.find({user: params.id})

  const canvas = Canvas.createCanvas(400, 400);
    const ctx = canvas.getContext('2d');
    if(!allxp) allxp = {xp: 1}
if(allxp.xp < 1) allxp = {xp: 1}

    let nowxp = reward_xp.find(d => d.xp < allxp.xp).xp
    let nextxp = reward_xp.filter(d => d.xp > allxp.xp)[reward_xp.filter(d => d.xp > allxp.xp).length - 1].xp 
    let lastxp = reward_xp.find(d => d.xp < allxp.xp).xp
    let loadxp = allxp.xp - lastxp
    let xp223 = (nextxp - lastxp)/223
    let loading = loadxp / xp223
  
  const wallpaper1 = await loadImage('https://cdn.discordapp.com/attachments/838964907092344852/840791806576164884/profile.png')
    ctx.drawImage(wallpaper1, 0, 0, 400, 400);
  const profile = await loadImage('https://cdn.discordapp.com/attachments/832995252621017098/840254226042847272/profile-2.png')
    ctx.drawImage(profile, 0, 0, 400, 400);
  const template = await loadImage('https://cdn.discordapp.com/attachments/832995252621017098/840793768386101278/unknown.png')
    ctx.drawImage(template, 80.7, 262, loading, 11);
  
  
let creditss = await top3.get(params.id)
if(creditss.blacklist === true) credits.credits = "Blacklisted"

  ctx.beginPath();
var username = user.username ||  user.user.username
let num = 15
if(username.length < 10) num = 21
if(username.length > 20) num = 15
if(username.length > 25) num = 10
if(username.length > 32) num = 8

ctx.font = num + 'px Impact'
ctx.fillStyle = "#ffffff";
ctx.textAlign = "center";
ctx.fontSize = '72px';
ctx.fillText(user.username || user.user.username, 200, 200, 997)
    
ctx.font = '15px Impact'
ctx.fillStyle = "#ffffff";
ctx.textAlign = "center";
ctx.fontSize = '72px';
ctx.fillText(`+${reps.length}`, 83, 130, 997)
    
ctx.font = '15px Impact'
ctx.fillStyle = "#ffffff";
ctx.textAlign = "center";
ctx.fontSize = '72px';
ctx.fillText(reward_xp.find(d => d.xp < allxp.xp).level, 305, 130, 997)
    
ctx.font = '15px Impact'
ctx.fillStyle = "#ffffff";
ctx.textAlign = "center";
ctx.fontSize = '72px';
ctx.fillText(allxp.xp, 80, 200, 997)
    
ctx.font = '15px Impact'
ctx.fillStyle = "#ffffff";
ctx.textAlign = "center";
ctx.fontSize = '72px';
ctx.fillText(credits.credits, 308, 200, 997)
    
ctx.font = '14px Impact'
ctx.fillStyle = "#ffffff";
ctx.textAlign = "center";
ctx.fontSize = '72px';
let n = Number(reward_xp.filter(d => d.xp > allxp.xp).length)
let xpnext = (reward_xp.filter(d => d.xp > allxp.xp)[n - 1].xp) - (reward_xp.find(d => d.xp < allxp.xp).xp)
console.log(xpnext)
ctx.fillText(`${loadxp}/${xpnext}`, 250, 251, 997)

let notes = edit_note[0].note  
if (notes.length >21) notes = "Your note must be less than 20 letter"
ctx.font = '15px Impact'
ctx.fillStyle = "#ffffff";
ctx.textAlign = "center";
ctx.fontSize = '72px';
ctx.fillText(notes, 200, 307, 997)
    
    ctx.arc(199, 116, 55.5, -45.9, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    

    
    const avatar = await Canvas.loadImage(user.avatarURL || user.user.avatarURL);
    ctx.drawImage(avatar, 140, 60, 115, 115); 
    
    
    




let buf = Buffer.from(canvas.toDataURL().split(",")[1], 'base64');
res.status(200).json({buf: canvas.toDataURL()})
   }
}

client.connect()