const express = require('express')
const passport = require('passport')
const router = express.Router()
const customErrors = require('../../lib/custom_errors')
const Message = require('../models/message.js')
const Room = require('../models/rooms.js')



// we'll use this function to send 404 when non-existant document is requested
const requireToken = passport.authenticate('bearer', { session: false })
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// router.post('/create-message', requireToken, (req, res, next) => {
// 	req.body.message.owner = req.user._id
// 	console.log(req.body)

//     let messageCreated = null
// 	Message.create(req.body.message)
// 		.then((message) => {
//             messageCreated = message
//             Room.findById(req.body.message.room)
//             .then(room => {
//                 room.messages.push(messageCreated._id)
//                 return room.save()
//             })
//         })
// 		.then(() => {
// 			res.status(201).json({ messageCreated })
// 		})
// 		.catch(next)
// })
//////////////////////////////////////////////////////////////////////////////
//  router.post('/message-create', requireToken, async (req, res, next) => {
// 		// set owner of new example to be current user
// 		req.body.message.owner = req.user._id

// 		const message = await Message.create(req.body.message)

// 		const room = await Room.findById(req.body.message.room)

// 		room.messages.push(message)

// 		await room.save()

// 		res.status(201).json({ room })
//  })

router.post('/update-room', requireToken, (req, res, next) => {
	req.body.room.owner = req.user._id
	console.log(req.body)

	Room.create(req.body.room)
		.then((room) => {
			res.status(201).json({ room })
		})
		.catch(next)
})

module.exports = router
