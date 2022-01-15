
// const UserSocket = require('./UserSocket')

const connected = []

const newConnection = (socket) => {
	console.log('socket connected: ')
	connected.push(socket) // TODO: going to be a DB object
}

const destroySocket = (socketId) => {
  const index = connected.findIndex(socket => socket.id === socketId)
  if (index !== -1) {
    connected.splice(index, 1)
  }
}

const addListeners = (server) => {
  console.log('calling addlisteners')
  server.events.on('new-connection', newConnection)
}

const joinRoom = (userId, roomId) => {
  // check if user is allowed to join room
  // return true or false
  console.log(`user ${userId} requesting to join room ${roomId}`)
}

module.exports = {
  addListeners,
  joinRoom,
  destroySocket
}