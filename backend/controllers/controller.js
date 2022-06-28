const asyncHandler = require('express-async-handler');
const Page = require('../models/model');

// @desc Get page
// @route GET /pages/:code
// @access Public
const getPage = asyncHandler(async (req, res) => {
    const code = req.params.code;
    const page = await Page.findOne({ code: code });
    res.status(200).json(page);
});

// @desc Create page
// @route POST /pages/create
// @access Public
const createPage = asyncHandler(async (req, res) => {
    if (!req.body || !req.body.code) {
        res.status(400);
        throw new Error('Body has missing values');
    }

    const createdPage = await Page.create(req.body);

    res.status(200).json(createdPage);
});

// @desc Update page
// @route PUT /pages/:code
// @access Public
const updatePage = asyncHandler(async (req, res) => {
    const code = req.params.code;
    const page = await Page.findOne({ code: code });
    if (!req.body || !req.body.code) {
        res.status(400);
        throw new Error('Body has missing values');
    }
    if (!page) {
        res.status(400);
        throw new Error('Page not found');
    }

    const updatedPage = await Page.findByIdAndUpdate(page._id, req.body, {
        new: false
    });
    res.status(200).json(updatedPage);
});

// @desc Delete page
// @route DELETE /pages/:code
// @access Private
const deletePage = asyncHandler(async (req, res) => {
    const { code } = req.params;
    const page = await Page.findOne({ code: code });
    if (!page) {
        res.status(400);
        throw new Error('Page not found');
    }
    await page.remove();
    res.status(200).json({ code: code });
});

module.exports = {
    getPage,
    createPage,
    updatePage,
    deletePage
};
