const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			required: true
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
    room: {
    	type: mongoose.Schema.Types.ObjectId,
			ref: 'Room',
      required: true
    },
		text: {
				type: String,
        required: true
		},
		sentAt: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Message', messageSchema)
