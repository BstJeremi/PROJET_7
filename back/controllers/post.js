const Post = require('../models/post');
const fs = require('fs');

exports.getAllPosts = (req, res, next) => {
	Post.find()
		.sort({ createdAt: -1 })
		.populate({ path: 'user', select: [ 'pseudo', 'picture' ] })
		.then((posts) => res.status(200).json(posts));
};

exports.createPost = (req, res, next) => {
	const postObject = JSON.parse(req.body.post);
	delete postObject._id;

	const post = new Post({
		likesCount: 0,
		message: postObject.message,
		user: req.userId,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	});
	post.save().then(() => res.status(201).json({ message: 'Post enregistré !' }));
};

exports.modifyPost = async (req, res) => {
	const postObject = req.file
		? {
				...JSON.parse(req.body.post),
				imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
			}
		: { ...JSON.parse(req.body.post) };

	let post = await Post.findOne({ _id: req.params.id });

	if (post === null) {
		return res.send(404).send('Post introuvable');
	}

	if (req.userId !== post.user._id.toString() && !req.isAdmin) {
		return res.status(403).send('Vous ne pouvez pas modifier ce post');
	}

	post.message = postObject.message;
	post.imageUrl = postObject.imageUrl || post.imageUrl;
	await post.save();

	return res.send({ message: 'Post modifié !', imageUrl: postObject.imageUrl });
};

exports.deletePost = (req, res) => {
	Post.findOne({ _id: req.params.id }).then((post) => {
		if (req.userId !== post.user._id.toString() && !req.isAdmin) {
			return res.status(403).send('Vous ne pouvez pas supprimer ce post');
		}
		const filename = post.imageUrl.split('/images/')[1];
		fs.unlink(`images/${filename}`, () => {
			Post.deleteOne({ _id: req.params.id })
				.then(() => res.status(200).json({ message: 'Post supprimé !' }))
				.catch((error) => res.status(400).json({ error }));
		});
	});
};

exports.likeOrDislike = async (req, res) => {
	const post = await Post.findOne({ _id: req.params.id });

	if (post.usersLiked.includes(req.userId)) {
		await Post.updateOne({ _id: post._id }, { $inc: { likesCount: -1 }, $pull: { usersLiked: req.userId } });
		return res.send({ message: 'Like supprimé avec succès', liked: false, likesCount: post.liked - 1 });
	} else {
		await Post.updateOne({ _id: post._id }, { $inc: { likesCount: 1 }, $push: { usersLiked: req.userId } });
		return res.send({ message: 'Like ajouté avec succès', liked: true, likesCount: post.liked + 1 });
	}
};
