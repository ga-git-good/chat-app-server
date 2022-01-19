const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
      lowercase: true,
		},
		hashedPassword: {
			type: String,
			required: true,
		},
		userName: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		profilePicture: {
			type: Buffer,
			required: false
		},
		pfpType: {
			type: String,
			required: false
		},
		rooms: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Room',
			},
		],
		token: String,
	},
	{
		timestamps: true,
		toObject: {
			// remove `hashedPassword` field when we call `.toObject`
			transform: (_doc, user) => {
				delete user.hashedPassword
				return user
			},
		},
	}
)

userSchema.methods.getBuffer = function () {
	if (!this.profilePicture) {
		return false
	}
	return this.profilePicture
}

module.exports = mongoose.model('User', userSchema)
