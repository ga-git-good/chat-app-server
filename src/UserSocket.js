
class UserSocket {
  constructor (socket) {
    this.socket = socket
    this.userId = 'test123'
    this.addListeners()
    this.authenticated = false
    console.log(socket.id)
  }
  addListeners () {
    this.socket.on('send-message', msg => {
      console.log('msg logged in class: ', msg)
      console.log('from socket: ', this.socket.id)
      // emit message to room
    })
    this.socket.on('join', (req) => {
      console.log(`socket ${this.socket.id} requested to join: `)
      console.log(req)
    })
  }
  login (token) {
    // check token with jwt
    // if (valid) this.authenticated = true
  }
}

module.exports = UserSocket
