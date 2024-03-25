const express = require('express');
const { Pool } = require('pg');
const { query } = require('../helpers/db.js');

const todoRouter = express.Router();

// Create a database connection pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// GET request handler to fetch all tasks
todoRouter.get("/", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM task');
        const rows = result.rows ? result.rows : [];
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({ error: error.message });
    }
});

// POST request handler to add a new task
todoRouter.post("/new", async (req, res) => {
    try {
        const { description } = req.body; // Assuming the description is sent in the request body
        const result = await query('INSERT INTO task (description) VALUES ($1) RETURNING id', [description]);
        const id = result.rows[0].id; // Retrieve the ID of the newly inserted task
        res.status(200).json({ id: id });
    } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({ error: error });
    }
});

// DELETE request handler to delete a task
todoRouter.delete("/delete/:id", async(req,res)=> {
    try {
        const id = parseInt(req.params.id);
        await query('DELETE FROM task WHERE id = $1', [id]);
        res.status(200).json({ id: id });
    } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({ error: error });
    }
});

module.exports = todoRouter;
