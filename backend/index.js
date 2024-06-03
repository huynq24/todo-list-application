require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = require('./models');

app.get('/todos', async (req, res) => {
    try {
        const todos = await db.Todo.findAll();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/todos', async (req, res) => {
    try {
        const todo = await db.Todo.create({ text: req.body.text });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        await db.Todo.destroy({ where: { id: req.params.id } });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
    });
});

module.exports = app;
