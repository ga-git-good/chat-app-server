const IoServer = require('./IoServer')
// const UserSocket = require('./UserSocket')

console.log(IoServer)

const connected = []

IoServer.events.on('new-connection', (socket) => {
  console.log('user joined')
  console.log('socket connected: ')
  connected.push(socket) // TODO: going to be a DB object
})

IoServer.events.on('join', async (req, socket) => {
  await socket.join(req.roomId.toString())

  // for testing
  IoServer.send('test', req.roomId.toString())
  IoServer.send('test', 'jonahs-room')
})
