const Emitter = require('events')
const UserSocket = require('./UserSocket')

class Io {
  constructor (server) {
    this.events = new Emitter()
    this.server = server
    this.server.on('connection', (socket) => {
      console.log('user connected')
      const newSocket = new UserSocket(socket)
      this.events.emit('new-connection', newSocket)
    })
  }
  static create (server) {
    const newServer = new this(server)
    console.log('created room')
    return newServer
  }
  #server
  #socket
}

module.exports = Io
