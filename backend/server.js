const express = require('express');

const app = express();
app.listen(5000);

app.get('/', (req, res)=>{
    res.send("hello");
})

app.get('/pages/:id', (req, res)=>{
    const id = req.params.id;
    console.log(id);
    res.send(id);
})