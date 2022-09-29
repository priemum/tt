let express = require('express')
let fs = require('fs')
let app = express()
let client = require('./client/index.js')
app.get('/', (req, res) =>{
res.sendFile(__dirname + "/html.html")
})
