// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config(); // 加载 .env 变量

const app = express();
const PORT = process.env.PORT || 3000;

// 连接 MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('数据库连接成功'))
  .catch(err => console.error('连接失败:', err));

// 中间件配置
app.set('view engine', 'ejs');      // 使用 EJS 模板
app.use(express.static('public'));  // 静态文件服务
app.use(express.urlencoded({ extended: true })); // 解析表单数据

// 路由
app.use('/', todoRoutes);

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
