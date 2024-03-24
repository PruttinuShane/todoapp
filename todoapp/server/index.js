const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

// Create a database connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo',
    password: 'xjn244@VH',
    port: 5432
});

// GET request handler to fetch all tasks
app.get("/", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM task');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST request handler to add a new task
app.post("/new", async (req, res) => {
    try {
        const result = await pool.query('INSERT INTO task (description) VALUES ($1) RETURNING id', [req.body.description]);
        res.status(200).json({ id: result.rows[0].id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
