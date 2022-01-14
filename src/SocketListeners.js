
// const UserSocket = require('./UserSocket')

const connected = []

const newConnection = (socket) => {
	console.log('socket connected: ')
	connected.push(socket) // TODO: going to be a DB object
}

const join = (req, socket) => {
  console.log('hit join')
}

const addListeners = (server) => {
  console.log('calling addlisteners')
  server.events.on('new-connection', newConnection)
  server.events.on('join', join)
}

module.exports = addListeners