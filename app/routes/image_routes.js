const express = require('express')
const router = express.Router()
const User = require('../models/user')
const fs = require('fs')

router.get('/img/:userName', async (req, res) => {
	const userName = req.params.userName
	const user = await User.findOne({ userName: userName })
	if (user && user.profilePicture && user.pfpType) {
		const buffer = await user.getBuffer()
		res.status(200).set('Content-Type', `${user.pfpType}`).end(buffer)
	} else {
		const stream = fs.createReadStream('public/defaultPfp.png')
		stream.on('open', () => {
      res.set('Content-Type', 'image/png')
      stream.pipe(res)
    })
	}
})

module.exports = router