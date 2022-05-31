const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res, next) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			User.insert(req.body.first_name, req.body.last_name, req.body.email, hash, function(err, result, fields) {
				if (err) {
					res.status(400).json({ err });
					return console.log(err);
				}
				res.status(201).json({ message: 'Utilisateur créé!' });
				return console.log(result);
			});
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
	User.findOne(req.body.email, function(err, result, fields) {
		if (result.length === 0) {
			return res.status(401).json({ error: 'Utilisateur non trouvé!' });
		}
		bcrypt.compare(req.body.password, result[0].password).then((valid) => {
			if (!valid) {
				return res.status(401).json({ error: 'Mot de passe incorrect!' });
			}
			res.status(200).json({
				userId: result[0].user_id,
				isAdmin: result[0].is_admin,
				token: jwt.sign({ userId: result[0].user_id, isAdmin: result[0].is_admin }, process.env.TOKEN_SECRET, {
					expiresIn: '24h'
				})
			});
		});
	});
};

exports.deleteUser = (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];
	const decodedToken = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
	const userId = decodedToken.userId;
	User.delete(userId, function(err, result, fields) {
		if (err) {
			return console.log(err);
		} else {
			res.status(200).json({ message: 'Utilisateur supprimé!!' });
			return console.log(result);
		}
	});
};
