const express = require('express');
const Page = require('../models/model');
const { getPage, createPage, updatePage, deletePage } = require('../controllers/controller')
const router = express.Router();

router.route('/pages/:id').get(getPage).put(updatePage).delete(deletePage);
router.route('/pages/create').post(createPage);

module.exports = router;