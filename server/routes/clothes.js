const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { getAllClothes, getAllClothesTypeByUser, addClothes, getClothesType, updateClothesInf,getClothesById } = require('../controller/wardrobeController')
const { clothesAnalysis, removeBlack } = require('../controller/aiAnalysisController')
const { verifyToken } = require('../middleware/authMiddleware')

router.use('/images', express.static(`./upload/clothes/`));
//用户上传衣服
router.post('/upload', upload.single('clothesimage'), removeBlack, addClothes);

//获取用户衣服数据
router.get('/getClothes', getAllClothes);

//更新用户衣服数据
router.post('/updateClothesInf', updateClothesInf);

//AI分析接口
router.post('/AIanalysis', upload.single('clothesimage'), clothesAnalysis);

//获取用户衣服类型
router.get('/getClothesTypeByUser', getAllClothesTypeByUser);

router.get('/getClothesById', getClothesById);

//获取衣服类型
router.get('/getClothesType', getClothesType);

module.exports = router