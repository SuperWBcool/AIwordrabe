const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { verifyToken } = require('../middleware/authMiddleware');
const { addClothesMatch , getAllClothesMatchType, getClothesMatch } = require('../controller/clothesMatchController');


router.use('/images',express.static(`./upload/clothesMatch/`));

router.post('/addMatch', verifyToken, upload.single('clothesimage'), addClothesMatch);

router.get('/getType', verifyToken, getAllClothesMatchType);

router.post('/getClothesMatch', verifyToken, getClothesMatch);

module.exports = router