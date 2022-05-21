const connection = require('../config');

class User {
	static insert( first_name, last_name, email, password, callback) {
		connection.execute(
			`INSERT INTO user ( first_name, last_name, email, user_password ) values (?, ?, ?, ?, now());`,
			[ first_name, last_name, email, password ],
			callback
		);
	}
	static findOne(email, callback) {
		connection.execute(`SELECT * FROM user WHERE email = ?`, [ email ], callback);
	}
	static delete(user_id, callback) {
		connection.execute(`DELETE FROM user WHERE user_id = ?`, [ user_id ], callback);
	}
}

module.exports = User;
