# Todo System 📝

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Tian0613/todo-system/pulls)
一个简洁高效的待办事项管理系统，支持任务管理、分类和提醒功能。

## 功能特性 ✨

- ✅ 创建/编辑/删除任务
- ✅ 任务分类（工作、学习、生活）
- ✅ 优先级标记（⭐️⭐️⭐️）
- ✅ 到期时间提醒
- ✅ 数据本地存储/云同步
- 🔜 多用户支持（开发中）

## 技术栈 🛠️

**前端**  
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?logo=tailwind-css&logoColor=white)
**后端**  
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white)
**开发工具**  
![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?logo=eslint&logoColor=white)

## 快速开始 🚀

### 前置要求

- Node.js >= 16.0
- MongoDB >= 5.0
- npm >= 8.0 或 yarn >= 1.22

### 安装步骤

1. 克隆仓库：

```bash
    git clone https://github.com/Tian0613/todo-system.git
    cd todo-system
```

2. 安装依赖：

```bash
    npm install
```

3. 配置环境变量：

```bash
    cp .env.example .env
```

4. 启动开发服务器：

```bash
    npm run dev
```

项目结构 📂

```TEXT
todo-system/
├── src/                 # 前端源码
│   ├── components/      # React组件
│   ├── hooks/           # 自定义Hook
│   ├── utils/           # 工具函数
│   └── App.tsx          # 主入口文件
├── server/              # 后端服务
│   ├── controllers/     # API控制器
│   ├── models/          # 数据库模型
│   ├── routes/          # 路由配置
│   └── index.ts         # 服务入口
├── public/              # 静态资源
├── docs/                # 文档资料
├── .env.example         # 环境变量模板
├── package.json         # 依赖管理
└── tsconfig.json        # TypeScript配置
```

## 贡献指南 🤝

欢迎提交 PR 或提出 issue！请遵循以下步骤：

1. Fork 本仓库
2. 创建新分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -m "Add your feature"`
4. 推送到你的分支：`git push origin feature/your-feature`
5. 创建 Pull Request

## 许可证 📄

本项目遵循 MIT 许可证。有关详细信息，请参阅[LICENSE](LICENSE)文件。

## 联系信息 📧

- 作者：Tian0613

> 🌟 如果这个项目对你有帮助，欢迎给个 Star！
