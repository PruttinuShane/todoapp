require('dotenv').config();
const express = require('express');
const cors = require('cors');
const todoRouter = require('./routes/todo.js'); // Import todoRouter from todo.js

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const port = process.env.PORT 

// Use todoRouter in your Express application
app.use('/', todoRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
