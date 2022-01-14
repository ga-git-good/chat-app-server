const { Server } = require('socket.io')
const Emitter = require('events')
const UserSocket = require('./UserSocket')

class Io {
  constructor (server, name) {
    this.name = name
    this.events = new Emitter()
    this.server = new Server(server)
    this.server.on('connection', (socket) => {
      console.log('user connected')
      this.socket = socket
      this.socket.name = name
      this.id = socket.id
      const newSocket = new UserSocket(socket)
      this.events.emit('new-connection', newSocket)
    })
  }
  static create (server, name) {
    const newServer = new this(server, name)
    console.log('created room')
    return newServer
  }
  async addMember () {
    console.log('request to join: ', this.name)
    const joined = await this.socket.join(this.id)
    console.log(joined)
  }
  // #server
  // #socket
}

module.exports = Io
