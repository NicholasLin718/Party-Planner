const Page = require('../models/model');

// @desc Get page
// @route GET /pages/:code
// @access Public
const getPage = (req, res) => {
    const code = req.params.code;
    Page.findOne({ code: code })
        .then(() => {
            res.send(code);
        })
        .catch((err) => {
            console.log(err);
        });
}

// @desc Create page
// @route POST /pages/create
// @access Public
const createPage = (req, res) => {
    if (!req.body || !req.body.code) {
        res.status(400);
        throw new Error('body has missing values');
    }
    const newPage = new Page({ code: req.body.code });
    newPage.save()
        .then(
            (result) => res.send(result)
        ).catch(
            (err) => {
                console.log(err)
                res.send('error');
            }
        );
}

// @desc Update page
// @route PUT /pages/:code
// @access Public
const updatePage = (req, res) => {
    if (!req.body || !req.body.code) {
        res.status(400);
        throw new Error('body has missing values');
    }
    res.status(200).json({ code: req.body.code })
}

// @desc Delete page
// @route DELETE /pages/:code
// @access Private
const deletePage = (req, res) => {
    console.log(req.body);
    if (!req.body || !req.body.code) {
        res.status(400);
        throw new Error('body has missing values');
    }
    res.status(200).json({ code: req.body.code })
}

module.exports = {
    getPage,
    createPage,
    updatePage,
    deletePage
}
