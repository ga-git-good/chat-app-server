const { joinRoom, destroySocket } = require('./SocketListeners')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env
const User = require('../app/models/user')
const Emitter = require('events')
const {v4} = require('uuid')

class UserSocket {
  
  #authenticated
  #socket
  constructor (socket) {
    this.events = new Emitter()
    this.id = v4()
    this.#socket = socket
    this.addListeners()
    this.#authenticated = false
    console.log(socket.id)
    this.token = socket.handshake.query.token
    this.#login()
  }
  addListeners () {
    this.#socket.on('send-message', msg => {
      console.log('msg logged in class: ', msg)
      console.log('from socket: ', this.socket.id)
      // emit message to room
    })
    this.#socket.on('join', (req) => {
      if (this.#authenticated) {
        joinRoom(this.userId, req.roomId)
      }
    })
  }
  async #login () {
    // check token with jwt
    // if (valid) this.authenticated = true
    console.log('token: ', this.token)
    try {
      const decoded = jwt.verify(this.token, JWT_SECRET)
      console.log(`searching for user ${decoded.userId} in database`)
      const user = await User.findOne({_id: decoded.userId})
      if (decoded && user) {
        console.log('user authenticated')
        this.#authenticated = true
        this.user = user
        this.events.emit('loggedin', this)
      } else {
        console.log(`user ${decoded.userId} not found in db; auth failed`)
        this.#authenticated = false
        this.events.emit('loggedin', false)
        this.destroy()
      }
    } catch(err) {
      console.error(err)
      return false
    }
  }
  loggedIn = () => {
    return this.#authenticated
  }
  destroy = () => {
    console.log(this.#authenticated)
    // TODO: disconnect socket
    // then:
    destroySocket(this.id)
  }
}

module.exports = UserSocket
