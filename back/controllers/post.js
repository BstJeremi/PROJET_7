const Post = require('../models/post');
const Comment = require('../models/comment');
const fs = require('fs');

exports.getAllPosts = (req, res, next) => {
	Post.find()
		.sort({createdAt: -1})
		.populate('comments')
		.populate({ path: 'user', select: [ 'pseudo', 'picture' ] })
		.then((posts) => res.status(200).json(posts));
};

exports.getOnePost = (req, res, next) => {
	Post.findOne({ _id: req.params.id })
		.populate({ path: 'user', select: [ 'pseudo', 'picture' ] })
		.then((post) => res.status(200).json(post))
		.catch((error) => res.status(404).json({ error }));
};

exports.createPost = (req, res, next) => {
	const postObject = JSON.parse(req.body.post);
	delete postObject._id;

	const post = new Post({
		message: postObject.message,
		user: req.userId,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	});
	post
		.save()
		.then(() => res.status(201).json({ message: 'Post enregistré !' }))
		.catch((error) => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
	const postObject = req.file
		? {
				...JSON.parse(req.body.post),
				imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
			}
		: { ...req.body };
	Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
		.then(() => res.status(200).json({ message: 'Post modifié !' }))
		.catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
	Post.findOne({ _id: req.params.id })
		.then((post) => {
			const filename = post.imageUrl.split('/images/')[1];
			fs.unlink(`images/${filename}`, () => {
				Post.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: 'Post supprimé !' }))
					.catch((error) => res.status(400).json({ error }));
			});
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.getComments = (req, res) => {
	Comment.find({post: req.params.id})
		.then((comments) => res.status(200).json(comments));
}

exports.likeOrDislike = (req, res) => {
	if (req.body.like === 1) {
		Post.updateOne(
			{ _id: req.params.id },
			{ $push: { usersLiked: req.params.id } }
		)
			.then((post) => res.status(200).json({ message: 'Like ajouté !' }))
			.catch((error) => res.status(400).json({ error }));
	} else {
		Post.findOne({ _id: req.params.id }).then((post) => {
			if (post.usersLiked.includes(req.body.userId)) {
				Post.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
					.then((post) => {
						res.status(200).json({ message: 'Like supprimé !' });
					})
					.catch((error) => res.status(400).json({ error }));
			}
		})
		.catch(e => console.log(e));
	}
};