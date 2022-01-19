const { joinRoom, destroySocket, checkRoomAccess } = require('./SocketListeners')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env
const User = require('../app/models/user')
const Emitter = require('events')
const {v4} = require('uuid')

class UserSocket {
  constructor (socket, server) {
    this.events = new Emitter()
    this.id = v4()
    this.socket = socket
    this.server = server
    this.addListeners()
    this.authenticated = false
    console.log(socket.id)
    this.token = socket.handshake.query.token
    this.login()
    this.rooms = []
  }
  addListeners () {
    this.socket.on('send-message', msg => {
      console.log('msg logged in class: ', msg)
      console.log('from socket: ', this.id)
      this.server.sendMessage(msg)
    })
    this.socket.on('join', (req) => {
      console.log('hit join')
      if (this.authenticated) {
				// checkRoomAccess(this.user._id, req.roomId)
				if (true) {
					console.log(`joining user ${this.user._id} to room ${req.roomId}`)
					this.socket.join(req.roomId)
          this.rooms.push(req.roomId)
				}
			}
    })
  }
  async login () {
    // check token with jwt
    // if (valid) this.authenticated = true
    console.log('token: ', this.token)
    try {
      const decoded = jwt.verify(this.token, JWT_SECRET)
      console.log(`searching for user ${decoded.userId} in database`)
      const user = await User.findOne({_id: decoded.userId})
      if (decoded && user) {
        console.log('user authenticated')
        this.authenticated = true
        this.user = user
        this.events.emit('loggedin', this)
        this.socket.emit('loggedin', true)
      } else {
        throw 'token verification failed'
      }
    } catch(err) {
      console.error(err)
      this.socket.emit('loggedin', false)
      this.destroy()
    }
  }
  loggedIn() {
    return this.authenticated === true
  }
  destroy() {
    console.log(this.authenticated)
    // TODO: disconnect socket
    // then:
    destroySocket(this.id)
  }
}

module.exports = UserSocket
