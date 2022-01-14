const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
	{
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
		text:
			{
				type: String,
                required: true
			},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Message', messageSchema)
