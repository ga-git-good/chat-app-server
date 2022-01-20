
// const UserSocket = require('./UserSocket')

const connected = []
const rooms = []
// {roomId: asdasd, users: []}

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

const joinRoom = (roomId, socket) => {
  // TODO: check if roomId already in rooms array
  // If not, create a new room object, add the user, and push to array
  // If it already exists, add the user to the users array on the object
  console.log(`user ${socket.id} requesting to join room ${roomId}`)
}

const checkRoomAccess = (userID, roomId) => {
  Room.findOne({ _id: roomId }, (err, room) => {
    if (err) return false
    if (room.validUsers.includes(userID)) {
      return true
    } else {
      return false
    }
  })
}

module.exports = {
  addListeners,
  joinRoom,
  destroySocket
}