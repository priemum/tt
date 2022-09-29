const { createCanvas, loadImage } = require('canvas')
var randomId = require('random-id');

module.exports = {
	path: '/api/v1/captcha',
	method: 'get',
	run: async (req, res, db, t, tt, captcha) => {
const canvas = createCanvas(250, 100)
const ctx = canvas.getContext('2d')
const ctxs = canvas.getContext('2d')
ctx.font = '30px Impact'
ctx.rotate(0.1)

ctxs.font = '30px Impact'
ctxs.rotate(0.1)
var no_robot = randomId(6, 'qwertyuiopasdfghjklzxcvbnm1234567890')

var id = randomId(5, '0123456789')
var daily = Math.floor(Math.random() * 3000) + 500;
ctx.fillText(id, 50, 40)
ctxs.fillText(no_robot, 49, 49)
let code_captcha = randomId(16)
new captcha({captcha: id, id: code_captcha}).save()
res.status(200).json({buf: canvas.toDataURL(), code: id, id: code_captcha})
  }
}