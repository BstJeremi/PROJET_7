const Comment = require('../models/comment');
const fs = require('fs');

exports.createComment = (req, res) => {

	const comment = new Comment({
		commenter: req.userId,
		post: req.params.id,
		content: req.body.content
	});

	comment
		.save()
		.then(() => res.status(201).json({ message: 'Commentaire enregistré !' }))
		.catch((error) => res.status(400).json({ error }));
}

exports.deleteOneComment = (req, res) => {
	Comment.findOne({ _id: req.params.id })
		.then((comment) => {
			const filename = comment.imageUrl.split('/images/')[1];
			fs.unlink(`images/${filename}`, () => {
				Comment.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
					.catch((error) => res.status(400).json({ error }));
			});
		})
		.catch((error) => res.status(500).json({ error }));
}