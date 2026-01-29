const express = require('express');
const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo
} = require('../utils/excel');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const todos = await getTodos(req.user.username);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

router.post('/', async (req, res) => {
  try {
    const todo = await addTodo(req.user.username, req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const todo = await updateTodo(req.user.username, req.params.id, req.body);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const success = await deleteTodo(req.user.username, req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

module.exports = router;
