const connection = require('../config');

class Comment {
	static insert(post_id, user_id, content, callback) {
		connection.execute(
			`INSERT INTO comment (post_id, user_id, comment_content, comment_creationdate) values (?, ?, ?, now());`,
			[ post_id, user_id, content ],
			callback
		);
	}

	static update(comment_content, comment_id, callback) {
		connection.execute(
			`UPDATE comment
                            SET comment_content = ?, comment_updatedate = now()
                            WHERE comment_id = ?`,
			[ comment_content, comment_id ],
			callback
		);
	}

	static delete(comment_id, callback) {
		connection.execute(`DELETE FROM comment WHERE comment_id = ?`, [ comment_id ], callback);
	}

	static getAll(post_id, callback) {
		connection.execute(
			`SELECT * FROM comment 
                            WHERE post_id=?`,
			[ post_id ],
			callback
		);
	}

	static findOne(comment_id, callback) {
		connection.execute(`SELECT * FROM comment WHERE comment_id = ?`, [ comment_id ], callback);
	}
}

module.exports = Comment;
