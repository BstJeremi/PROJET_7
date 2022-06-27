const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		message: {
			type: String,
			trim: true,
			maxlength: 500
		},
		imageUrl: {
			type: String
		},
		video: {
			type: String
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Post', PostSchema);
