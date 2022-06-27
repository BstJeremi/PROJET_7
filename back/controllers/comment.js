const Comment = require('../models/comment');
const fs = require('fs');

exports.getAllComments = (req, res) => {
    Comment.find()
		.populate({ path: 'user', select: [ 'pseudo', 'picture' ] })
		.then((comments) => res.status(200).json(comments));
}

exports.getOneComment = (req, res) => {
	Comment.findOne({ _id: req.params.id })
		.then((comment) => res.status(200).json(comment))
		.catch((error) => res.status(404).json({ error }));
}

exports.createComment = (req, res) => {
	const commentObject = JSON.parse(req.body.comment);
	console.log(commentObject);
	delete commentObject._id;

	const comment = new Comment({
		...commentObject,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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
