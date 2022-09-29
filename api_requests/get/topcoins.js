
module.exports = {
	path: '/api/v1/topcoins',
	method: 'get',
	run: async (req, res, db, note, db3) => {

const fs = require("fs")
var top1 = require("/app/credits-async.js");
var top = new top1()
var allids = []
let data = await top.getall()

let tops = data.sort((a ,b) => b.credits - a.credits)

var ontop = ``
let C = 0
 for(const data of tops){
if(C !== 5 && !allids.includes(data.id) && data.id !== "768556981820457051"){

allids.unshift(data.id)
C++

}
}
   console.log(ontop)
  },
}

