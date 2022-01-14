const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		validUsers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
            required: true
		},
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Message',
			},
		],
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Room', roomSchema)
