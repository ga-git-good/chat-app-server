/* eslint-disable no-return-assign */
const express = require('express')
const passport = require('passport')
const router = express.router()
// const Rooms = require('../models/Rooms')

const requireToken = passport.authenticate('bearer', { session: false })

router.post('/create-room/:name', requireToken, async (req, res) => {
  // TODO: wait for room model to be created
  // const room = await Rooms.find({ name: req.body.name })
  // if (room) {
  //   res.status(400).json('room exists')
  // } else {
  //   res.status(201).json('proceed')
  // }
  res.status(200).json('ok')
}
)

module.exports = router
