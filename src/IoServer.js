const Emitter = require('events')
const UserSocket = require('./UserSocket')

class Io {
  constructor (server) {
    this.events = new Emitter()
    this.server = server
    this.server.on('connection', (socket) => {
      const newSocket = new UserSocket(socket)
      this.events.emit('new-connection', newSocket)
      // socket.on('connected', () => console.log('socket connected'))
      // socket.on('connection', () => console.log('socket connected'))
    })
  }
  static create (server) {
    const newServer = new this(server)
    return newServer
  }
  logEmitter() {
    console.log(this.events)
  }
  #server
  #socket
}

module.exports = Io
