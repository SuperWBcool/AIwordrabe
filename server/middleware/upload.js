const multer = require('multer');
const fs = require('fs');
const path = require('path');
const clotheModel = require('../models/wardrobeModel');
// 配置 multer 存储
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const username = req.userInf.username;
    //检查图片上传路劲，保存对应不同位置
    if (/\/clothes\/AIanalysis/.test(req.originalUrl)) req.imageUrl = 'upload/clothes/' + username + '/temp'
    else if (req.originalUrl == '/match/addMatch') req.imageUrl = 'upload/clothesMatch/' + username + '/data'
    else req.imageUrl = 'upload/clothes/' + username + '/data'


    // 检查并创建目录
    if (!fs.existsSync(req.imageUrl)) {
      fs.mkdirSync(req.imageUrl);
    }

    cb(null, req.imageUrl);

  },
  filename: async function (req, file, cb) {
    // 生成文件名: 时间戳 + 随机数 + 原始扩展名
    console.log('sad', file.originalname);
    const newName = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.png';
    cb(null, newName);

    try {
      req.imageName = newName;
      req.imageUrl = path.join(req.imageUrl, newName);
      if (req.originalUrl == '/clothes/') {
        await clotheModel.create(123, 1, req.imageUrl);
      }
    } catch (error) {
      console.log(error)
    }
  }
});

const fileFilter = (req, file, cb) => {
  console.log(req)
  // 只接受图片文件
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('只能上传图片文件！'), false);
  }
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 限制5MB
  }
});

module.exports = upload