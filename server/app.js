require('dotenv').config();

const express = require('express');
const db = require('./config/db.js');
const cors = require('cors');
const app = express();

app.listen(8090, () => {
  console.log('服务器启动成功')
})
// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));





