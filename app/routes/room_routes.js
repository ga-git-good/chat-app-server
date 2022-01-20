const express = require('express')
const passport = require('passport')
const router = express.Router()
const customErrors = require('../../lib/custom_errors')
const UserSocket = require('../../src/UserSocket')
const Room = require('../models/rooms.js')
const User = require('../models/user.js')

// we'll use this function to send 404 when non-existant document is requested
const requireToken = passport.authenticate('bearer', { session: false })
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

router.post('/create-room', requireToken, (req, res, next) => {
  Room.create({ name: req.body.room.name, validUsers: [req.body.userId], owner: req.body.userId, messages: [] })
    .then(room => {
      res.status(201).json({ room })
    })
    .catch(next)
})

router.get('/show-rooms', requireToken, (req, res, next) => {
  Room.find()
    .then(room => {
      res.status(200).json({ room })
    })
    .catch(next)
})

router.get('/show-users', requireToken, (req, res, next) => {
  User.find()
    .then(user => {
      res.status(200).json({ user })
    })
})

router.delete('./delete-room/:id', requireToken, (req, res, next) => {
  Room.deleteOne({ _id: req.params.id, owner: req.user.id })
    .then(res.status(204))
    .catch(next)
})

module.exports = router
