const Emitter = require('events')
const UserSocket = require('./UserSocket')

class Io {
  constructor (server) {
    this.events = new Emitter()
    this.#server = server
    this.#rooms = []
    this.#server.on('connection', (socket) => {
      const newSocket = new UserSocket(socket, this)
      this.events.emit('new-connection', newSocket)
      // socket.on('connected', () => console.log('socket connected'))
      // socket.on('connection', () => console.log('socket connected'))
    })
  }
  static create (server) {
    const newServer = new this(server)
    // create one room for all users to use
    newServer.#rooms.push('all-users')
    return newServer
  }
  findRoomByName(name) {
    const room = this.#rooms.find(room => room.name === name)
    return room
  }
  findRoomById(roomId) {
    const room = this.#rooms.find(room => room.id === roomId)
    return room
  }
  newRoom(roomName, roomId) {
    const room = {name: roomName, id: roomId}
    this.#rooms.push(room)
    return room
  }
  logEmitter() {
    console.log(this.events)
  }
  sendMessage(msg) {
    console.log('server sending message:')
    console.log(msg)
    this.#server.to(msg.roomId).emit('message', msg)
  }
  #server
  #socket
  #rooms
}

module.exports = Io
