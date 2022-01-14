const { Server } = require('socket.io')


class Room {
    constructor(server, name) {
        this.name = name
        this.server = new Server(server)
        this.server.on('connection', (socket) => {
            console.log('user connected')
            this.socket = socket
            this.socket.name = name
            //console.log(socket)
            console.log(socket.id)
            this.id = socket.id
            console.log(socket.rooms)
            socket.on('chat message', (msg) => {
                console.log('message: ', msg)
            })
        })
    }
    static create(server, name) {
        const newServer = new this(server, name)
        console.log('created room')
        return newServer
    }
    async addMember() {
        console.log('request to join: ', this.name)
        const joined = await this.socket.join(this.id)
        console.log(joined)
        return
    }
    #server
    #socket
}

module.exports = Room