const express = require('express');
const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res)=> {
    res.send("pog");
})
app.get('/pages/:id', (req, res)=>{
    const id = req.params.id;
    res.send(id);
    console.log(id);
})

app.listen(port, () => console.log(`Server started on port ${port}`));