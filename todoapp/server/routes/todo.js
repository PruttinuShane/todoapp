const express = require('express')
const {query } = require('../helpers/db.js')

const todoRouter = express.Router()


// Create a database connection pool
const openDb = () => {
    const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
    })
        return pool
    }

// GET request handler to fetch all tasks
todoRouter.get("/", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM task');
        const rows = result.rows ? result.rows : []
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error)
        res.statusMessage = error
        res.status(500).json({ error: error.message });
    }
});

// POST request handler to add a new task
todoRouter.post("/new", async (req, res) => {
    try {
        const result = await query('delete from task where id=$1',
        [id])
        res.status(200).json({ id:id });
    } catch (error) {
        console.log(error)
        res.statusMessage = error
        res.status(500).json({ error: error });
    }
});

todoRouter.delete("/delete/:id", async(req,res)=> {
    const pool = openDb()
    const id = parseInt(req.params.id)
    pool.query('delete from task where id =$1',
    [id],
    (error,result) => {
        if (error) {
            res.status(500).json({error: error.message})
        } else {
            res.status(200).json({id:id})
        }
    })
})