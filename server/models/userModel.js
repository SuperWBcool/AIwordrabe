const db = require('../config/db.js');

class UserModel {
  // 通过用户名查找用户
  static async findByUsername (username) {
    try {
      const rows = await db.execute(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );
      return rows[0];
    } catch (error) {
      console.error('数据库查询错误:', error);
      throw error;
    }
  }

  // 创建新用户
  // static async create (username, hashedPassword) {
  //   try {
  //     const [result] = await db.execute(
  //       'INSERT INTO users (username, password) VALUES (?, ?)',
  //       [username, hashedPassword]
  //     );
  //     return result.insertId;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

module.exports = UserModel;