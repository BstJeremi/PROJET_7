const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const CommentSchema = new mongoose.Schema({
	commenter: { type: ObjectId, ref: 'User', required: true },
	post: { type: ObjectId, required: true, ref: 'Post' },
	content: String,
});

module.exports = mongoose.model('Comment', CommentSchema);
