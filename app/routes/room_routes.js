const express = require('express')
const passport = require('passport')
const router = express.Router()
const customErrors = require('../../lib/custom_errors')
const Room = require('../models/rooms.js')

// we'll use this function to send 404 when non-existant document is requested
const requireToken = passport.authenticate('bearer', { session: false })
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

router.post('/create-room', requireToken, (req, res, next) => {
    req.body.room.owner = req.user._id
    console.log(req.body)

    Room.create(req.body.room)
    .then(room => {
        res.status(201).json({ room })
    })
    .catch(next)
})

router.get('/Show-rooms/:id', requireToken, (req, res, next) => {
	req.body.room.owner = req.user._id
	console.log(req.body)

	Room.create(req.body.room)
		.then((room) => {
			res.status(201).json({ room })
		})
		.catch(next)
})

module.exports = router