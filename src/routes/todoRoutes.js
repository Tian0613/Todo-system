// src/routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 获取所有任务并渲染首页
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.render('index', { todos });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 创建新任务
router.post('/todos', async (req, res) => {
  const { title } = req.body;
  try {
    const newTodo = new Todo({ title });
    await newTodo.save();
    res.redirect('/');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// 删除任务
router.post('/todos/:id/delete', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 切换任务完成状态
router.post('/todos/:id/toggle', async (req, res) => {
  try {
    const { completed } = req.body;
    await Todo.findByIdAndUpdate(req.params.id, { completed });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 更新任务内容
router.post('/todos/:id/update', async (req, res) => {
  try {
    const { title } = req.body;
    await Todo.findByIdAndUpdate(req.params.id, { title });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 清除所有已完成任务
router.post('/todos/clear-completed', async (req, res) => {
  try {
    await Todo.deleteMany({ completed: true });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
