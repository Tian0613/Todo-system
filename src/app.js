const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path'); // 引入 path 模块
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 数据库连接
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('数据库连接成功'))
  .catch(err => console.error('连接失败:', err));

// 视图引擎配置（修复关键点）
app.set('views', path.join(__dirname, 'views')); // 明确指定路径
app.set('view engine', 'ejs');

// 中间件
app.use(express.static(path.join(__dirname, 'public'))); // 静态文件路径修正
app.use(express.static(path.join(__dirname, '../public'))); // 备用静态文件路径
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // 支持JSON请求体

// 路由
app.use('/', todoRoutes);

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
