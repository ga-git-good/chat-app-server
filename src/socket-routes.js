const IoServ = require('./index')
const Socket = require('./socket')

console.log(IoServ)

const rooms = []
const connected = []

IoServ.events.on('new-connection', (socket) => {
	console.log('user joined')
    console.log('socket connected: ')
    connected.push(socket)
})

IoServ.events.on('join', async (req, socket) => {
	console.log('request to join')
	await socket.join(req.roomId.toString())
	IoServ.send('test', req.roomId.toString())
	IoServ.send('test', 'jonahs-room')
})
