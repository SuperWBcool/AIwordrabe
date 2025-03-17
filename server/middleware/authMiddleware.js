const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

// 生成token
let generateToken = (userInf) => {
  try {
    //添加要加密的信息
    const payload = {
      username: userInf.username,
      id: userInf.id
    };

    //生成 token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '365d'
    });

    return token;
  } catch (error) {
    console.error('Token 生成错误:', error);
    throw error;
  }
}

//  验证token
let verifyToken = (req, res, next) => {
  try {
    // 从请求头获取 token
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        code: 401,
        message: '未提供认证令牌'
      });
    }

    // 验证 token
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    
    // 将解码后的用户信息添加到请求对象中
    req.userInf = decoded;
    next();
  } catch (error) {
    console.log(error)
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        code: 401,
        message: '令牌已过期'
      });
    }

    return res.status(401).json({
      code: 401,
      message: '无效的认证令牌'
    });
  }
}

module.exports = {
  generateToken,
  verifyToken,
};