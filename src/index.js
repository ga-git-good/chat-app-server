/* eslint-disable no-return-assign */
const express = require('express')
const http = require('http')
const Room = require('./room')

const app = express()
const server = http.createServer(app)

module.exports = server

const rooms = []

app.get(
  '/newroom/:name',
  (req, res) => {
    console.log('creating room named: ', req.params.name)
    const newRoom = Room.create(server, req.params.name)
    rooms.push(newRoom)
    res.sendFile(__dirname + '/html/index.html')
  }
)

app.get(
  '/join/:name',
  (req, res) => {
    const room = rooms.find(room => room.name = req.params.name)
    res.sendFile(__dirname + '/html/index.html')
  }
)

server.listen(3040, () => {
  console.log('listening on port 3040')
})
