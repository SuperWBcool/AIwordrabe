const db = require('../config/db.js');

class clotheMatchModel {
  // 添加衣服搭配数据
  static async add (data) {
    try {
      // 插入数据
      const [result] = await db.execute(
        'INSERT INTO clothesMatch ( username, imgUrl) VALUES ( ?, ?)',
        [data.username, data.imgUrl]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // 获取用户的衣服搭配数据
  static async getClothesMatch (username) {
    try {
      const rows = await db.execute(
        'SELECT * FROM clothesMatch WHERE username = ? ',
        [username]
      );
      return rows[0];
    } catch (error) {
      console.error('数据库查询错误:', error);
      throw error;
    }
  }

  // 获取衣服搭配适用的场景
  static async getClothesMatchType (userId) {
    try {
      //获取衣服类型
      let results = await db.execute(`SELECT type,icon FROM ClothesMatchType`);
      return results[0];
    } catch (error) {
      console.error('获取衣服类型分类错误:', error);
      throw error;
    }
  }
}

module.exports = clotheMatchModel;