const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.get("/", (req, res) => {
    res.send("pog");
})

app.get('/pages/:id', (req, res) => {
    const id = req.params.id;
    res.send(id);
    console.log(id);
})

app.listen(port, () => console.log(`Server started on port ${port}`));