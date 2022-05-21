const connection = require('../config');

class Post {
	static insert(user_id, post_title, post_content, callback) {
		connection.execute(
			`INSERT INTO post (user_id, post_title, post_content, post_creationdate) values (?, ?, ?, now());`,
			[ user_id, post_title, post_content ],
			callback
		);
	}

	static update(post_title, post_content, post_id, callback) {
		connection.execute(
			`UPDATE post
                            SET post_title = ?, post_content = ?, post_updatedate = now()
                            WHERE post_id = ?`,
			[ post_title, post_content, post_id ],
			callback
		);
	}

	static delete(post_id, callback) {
		connection.execute(`DELETE FROM post WHERE post_id = ?`, [ post_id ], callback);
	}

	static getAll(callback) {
		connection.execute(`SELECT * FROM post`, callback);
	}

	static findOne(post_id, callback) {
		connection.execute(`SELECT * FROM post WHERE post_id = ?`, [ post_id ], callback);
	}
}

module.exports = Post;
