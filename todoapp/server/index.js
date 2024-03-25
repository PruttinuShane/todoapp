require('dotenv').config()
console.log(process.env)
const express = require('express');
const cors = require('cors');
//const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

const port = process.env.port;

// Create a database connection pool
const pool = new Pool({
user: process.env.DB_USER,
host: process.env.DB_HOST,
database: process.env.DB_NAME,
password: process.env.DB_PASSWORD,
port: process.env.DB_PORT
});

// GET request handler to fetch all tasks
app.get("/", async (req, res) => {
    console.log(query)
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
app.post("/new", async (req, res) => {
    const id = Number(req.params.id)
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

app.delete("/delete/:id", async(req,res)=> {
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
