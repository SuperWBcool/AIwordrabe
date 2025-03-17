const { verifyToken } = require('../middleware/authMiddleware.js');
const router = require('express').Router();


// 登录路由
router.use('/auth', require('./user.js'));
//衣橱处理路由
router.use('/clothes',verifyToken, require('./clothes.js'));
//diy衣服处理路由
router.use('/match', verifyToken, require('./match.js'));

module.exports = router;