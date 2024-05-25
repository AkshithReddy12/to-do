const express = require('express');
const app = express();
const tasks = require("./tasks");
const cors=require("cors")

app.use(express.json());
app.use(cors())
// GET /tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Task not found');
  res.json(task);
});

// POST /tasks
app.post('/tasks', (req, res) => {
  const task = {
    id: tasks.length + 1,
    title: req.body.data.title,
    description: req.body.data.description,
    status: req.body.data.status,
    due_date: req.body.data.dueDate
  };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT /tasks/:id
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Task not found');

  task.title = req.body.data.title;
  task.description = req.body.data.description;
  task.status = req.body.data.status;
  task.due_date = req.body.data.dueDate;

  res.json(task);
});

// DELETE /tasks/:id
app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).send('Task not found');

  tasks.splice(taskIndex, 1);
  res.sendStatus(204);
});

app.listen(3001, () => console.log('Server running on port 3000'));