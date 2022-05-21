const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'groupomania',
  password: '06082017@Hugo'
});

module.exports = connection;