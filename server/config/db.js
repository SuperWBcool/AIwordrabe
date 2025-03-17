// 创建连接池
const mysql = require('mysql2');

// 创建数据库连接
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'your_database_name'
});

// 将连接包装成 Promise
const promiseConnection = connection.promise();

// 导出 Promise 化的连接
module.exports = promiseConnection;