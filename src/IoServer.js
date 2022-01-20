const Emitter = require('events')
const UserSocket = require('./UserSocket')
const Message = require('../app/models/message')
const Room = require('../app/models/rooms')

class Io {
	constructor(server) {
		this.events = new Emitter()
		this.server = server
		this.rooms = []
		this.server.on('connection', (socket) => {
			const newSocket = new UserSocket(socket, this)
			this.events.emit('new-connection', newSocket)
			// socket.on('connected', () => console.log('socket connected'))
			// socket.on('connection', () => console.log('socket connected'))
		})
	}
	static create(server) {
		const newServer = new this(server)
		// create one room for all users to use
		newServer.rooms.push('all-users')
		return newServer
	}
	findRoomByName(name) {
		const room = this.rooms.find((room) => room.name === name)
		return room
	}
	findRoomById(roomId) {
		const room = this.rooms.find((room) => room.id === roomId)
		return room
	}
	newRoom(roomName, roomId) {
		const room = { name: roomName, id: roomId }
		this.rooms.push(room)
		return room
	}
	logEmitter() {
		console.log(this.events)
	}
	sendMessage(msg, user) {
		console.log('server sending message:')
		console.log(msg)
		this.server.to(msg.roomId).emit('message', msg)
    Message.create({
      userName: msg.userName,
      owner: user._id,
      room: msg.roomId,
      text: msg.message,
      sentAt: msg.timestamp
    }).then((created) => {
      Room.findById(msg.roomId).then(room => {
        room.messages.push(created._id)
        room.save()
      })
    })
	}
}

module.exports = Io
