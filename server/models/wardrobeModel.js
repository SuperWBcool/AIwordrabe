const db = require('../config/db.js');

class clotheModel {
  // 加入衣服数据
  static async create (data) {
    try {

      const [result] = await db.execute(
        'INSERT INTO wardrobe (id, userId, name, imageUrl, season, type, color,description ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [data.id, data.userId, data.username, data.imageUrl, data.season, data.type, data.color, data.describe]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }
  static async update (data) {
    try {
      console.log(data)
      const result = await db.execute(
        'UPDATE wardrobe SET season = ?, type = ?, color = ?, description = ? WHERE id = ?',
        [data.season, data.type, data.color, data.describe, data.id]
      );
      return result.affectedRows; // 返回受影响的行数
    } catch (error) {
      console.error('更新衣物信息出错:', error);
    }
  }
  static async getClothes (userId,index,type) {
    try {
      const limit = 8; // 每次获取 8 个数据
      const offset = (index - 1) * limit; // 计算偏移量
      const rows = await db.execute(
        'SELECT * FROM wardrobe WHERE userId = ? and type = ?  LIMIT ? OFFSET ?',
        [userId, type,limit, offset]
      );
      return rows[0];
    } catch (error) {
      console.error('数据库查询错误:', error);
      throw error;
    }
  }
  static async getClothesById (userId,id) {
    try {
      const rows = await db.execute(
        'SELECT * FROM wardrobe WHERE userId = ? and id = ?',
        [userId, id]
      );
      return rows[0];
    } catch (error) {
      console.error('数据库查询错误:', error);
      throw error;
    }
  }
  static async getClothesByUser (userId) {
    try {
      //获取衣服类型
      let sql = (value) => `SELECT ${value} FROM wardrobe WHERE userId = ? GROUP BY ${value}`;
      const type = await db.execute(
        sql('type'),
        [userId]
      );
      const season = await db.execute(
        sql('season'),
        [userId]
      );
      const color = await db.execute(
        sql('color'),
        [userId]
      );
      return { type: type[0], season: season[0], color: color[0] };
    } catch (error) {
      console.error('获取衣服类型分类错误:', error);
      throw error;
    }
  }
  // 获取用户衣服
  static async getClothesType () {
    try {
      let result = await db.execute(
        'SELECT type FROM clothestype'
      );
      return result[0]
    } catch (err) {
      console.log('获取衣服类型出错', err.message);
    }
  }
}

module.exports = clotheModel;