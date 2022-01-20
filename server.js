// require necessary NPM packages
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const Io = require('./src/IoServer')
const {addListeners} = require('./src/SocketListeners')

// require route files
const exampleRoutes = require('./app/routes/example_routes')
const userRoutes = require('./app/routes/user_routes')
const roomRoutes = require('./app/routes/room_routes')
const messageRoutes = require('./app/routes/message_routes')
const imgRoutes = require('./app/routes/image_routes')

// require middleware
const errorHandler = require('./lib/error_handler')
const requestLogger = require('./lib/request_logger')

// require database configuration logic
// `db` will be the actual Mongo URI as a string
const db = require('./config/db')

// require configured passport authentication middleware
const auth = require('./lib/auth')

// define server and client ports
// used for cors and local port declaration
const serverDevPort = 3040
const clientDevPort = 7165

// establish database connection
// use new version of URL parser
// use createIndex instead of deprecated ensureIndex
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(console.log('MongoDB connection successfull'))

// instantiate express application object
const app = express()
const server = http.createServer(app)
const iolistener = require('socket.io')(
  (server,
  {
    cors: {
      origin: process.env.IO_CORS,
      methods: ['GET', 'POST'],
      allowedHeaders: ['my-custom-header'],
      credentials: false
    }
  })
).listen(server)
const IoServer = Io.create(iolistener)

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(cors())

// define port for API to run on

const port = process.env.PORT
console.log('PORT:')
console.log(port)
console.log('IO_CORS:')
console.log(process.env.IO_CORS)
// register passport authentication middleware
app.use(auth)

// add `express.json` middleware which will parse JSON requests into
// JS objects before they reach the route files.
// The method `.use` sets up middleware for the Express application
app.use(express.json())
// this parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({ extended: true }))

// log each request as it comes in for debugging
//app.use(requestLogger)

// register route files
app.get('/', (req, res) => {
	console.log('hit root')
	res.json({message: 'welcome to gg-chat-api'})
})
app.use(imgRoutes)
app.use(userRoutes)
app.use(roomRoutes)
app.use(messageRoutes)

// register error handling middleware
// note that this comes after the route middlewares, because it needs to be
// passed any error messages from them
app.use(errorHandler)

// run API on designated port (4741 in this case)
server.listen(port, () => {
  console.log('listening on port ', port)
  addListeners(IoServer)
})

module.exports = IoServer