const UserModel = require('../models/userModel.js');
const { generateToken } = require('../middleware/authMiddleware.js')

class AuthController {
  // 用户登录
  async login (req, res, next) {
    try {
      const { username } = req.body;
      // 查找用户
      let user = await UserModel.findByUsername(username);
      // 如果用户不存在，创建新用户
      if (!user.length) {
        res.json({
          code: 0,
          message: '用户不存在'
        });
        return;
      }

      // 更新最后登录时间
      // await UserModel.updateLastLoginTime(user.id);

      // 返回用户信息和密钥
      res.send({
        code: 1,
        data: {
          username: user[0].username,
          token:generateToken(user[0])
        },
        message: '登录成功'
      });
    } catch (error) {
      console.log('登陆出错', error);
    }
  }

  // 获取用户信息
  async getUserInfo (req, res, next) {
    try {
      //从请求头里面获取用户信息
      const { user } = req;

      res.json({
        code: 200,
        data: {
          userId: user.id,
          username: user.username,
          lastLoginTime: user.last_login_time
        },
        message: '获取成功'
      });
    } catch (error) {
      next(error);
    }
  }

  // 退出登录
  async logout (req, res, next) {
    try {
      const { user } = req;

      // 重新生成API密钥
      const { apiKey, apiSecret } = generateApiKeys();
      await UserModel.updateApiKeys(user.id, apiKey, apiSecret);

      res.json({
        code: 200,
        message: '退出成功'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();