const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	comments: {
		type: [
			{
				commenterId: String,
				commenterPseudo: String,
				text: String,
			}
		],
		required: true
	}
});

module.exports = mongoose.model('comment', CommentSchema);
