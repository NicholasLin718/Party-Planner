const express = require('express');
const Page = require('../models/model');
const {getPage, createPage} = require('../controllers/controller')
const router = express.Router();

router.get("/", (req, res) => {
    res.send("pog");
})

router.get('/pages/:id', getPage);
router.post('/pages/create', createPage);
module.exports = router;