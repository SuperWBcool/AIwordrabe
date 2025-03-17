const router = require('express').Router();
let {login} = require('../controller/authController')

router.post('/login', login);

module.exports = router