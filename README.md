# 📝 个人任务管理系统

![版本](https://img.shields.io/badge/版本-1.0.0-blue.svg)
![许可证](https://img.shields.io/badge/许可证-MIT-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-v14+-339933.svg?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000.svg?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4.x-47A248.svg?logo=mongodb&logoColor=white)

> 一个简洁、美观、功能完善的待办事项管理系统，帮助您高效管理日常任务。

<div align="center">
  <img src="https://user-images.githubusercontent.com/41773797/131895542-a11b32a7-3f3f-44bf-b961-5cb8a58c9e3e.png" alt="分隔线" width="100%">
</div>

## 📋 目录

- [✨ 功能特点](#-功能特点)
- [🛠️ 技术栈](#️-技术栈)
- [📥 安装步骤](#-安装步骤)
- [📖 使用说明](#-使用说明)
- [👨‍💻 开发说明](#-开发说明)
- [📄 许可证](#-许可证)

## ✨ 功能特点

- ✅ 创建新任务
- ✅ 标记任务完成/未完成状态
- ✅ 编辑已有任务
- ✅ 删除任务
- ✅ 响应式设计，适配各种设备
- ✅ 美观的现代化界面
- ✅ 任务创建时间显示
- ✅ 支持任务过滤（全部/已完成/未完成）

## 🛠️ 技术栈

- **前端**：
  - ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white) 
  - ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white)
  - ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black)
  - ![Bootstrap 5](https://img.shields.io/badge/-Bootstrap%205-7952B3?logo=bootstrap&logoColor=white)
- **后端**：
  - ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)
  - ![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white)
- **数据库**：
  - ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white)
- **模板引擎**：
  - ![EJS](https://img.shields.io/badge/-EJS-B4CA65?logoColor=white)

## 📥 安装步骤

### 1️⃣ 克隆仓库
```bash
git clone <仓库地址>
cd todo-system
```

### 2️⃣ 安装依赖
```bash
npm install
```

### 3️⃣ 配置环境变量
- 创建 `.env` 文件在项目根目录
- 添加以下内容（根据实际情况修改）：
```env
MONGODB_URI=mongodb://localhost:27017/todo_app
PORT=3000
```

### 4️⃣ 启动MongoDB数据库

### 5️⃣ 启动应用
```bash
npm start
```

### 6️⃣ 在浏览器中访问
🌐 `http://localhost:3000`

## 📖 使用说明

| 操作 | 说明 |
|------|------|
| ➕ **添加任务** | 在输入框中输入任务内容，点击"添加任务"按钮 |
| ✓ **完成任务** | 点击任务前的复选框 |
| 📝 **编辑任务** | 点击任务内容右侧的编辑图标 |
| 🗑️ **删除任务** | 点击任务右侧的删除图标 |
| 🔍 **过滤任务** | 点击顶部的"全部"、"已完成"或"未完成