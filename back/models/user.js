const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema(
	{
		pseudo: {
			type: String,
			minLength: 3,
			max: 55,
			unique: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			validate: [ isEmail ],
			lowercase: true,
			unique: true,
			trim: true
		},
		password: {
			type: String,
			required: true,
			max: 1024,
			minlength: 6
		},
		picture: {
			type: String,
			default: ''
		},
		bio: {
			type: String,
			max: 1024
		},
		followers: {
			type: [ String ]
		},
		following: {
			type: [ String ]
		},
		likes: {
			type: [ String ]
		}
	},
	{
		timestamps: true
	}
);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
