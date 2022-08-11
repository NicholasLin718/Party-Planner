const asyncHandler = require('express-async-handler');
const Page = require('../models/pageModel');

class PageController {
    // @desc Get page
    // @route GET /pages/:code
    // @access Public
    static async getPage(req, res) {
        const code = req.params.code;
        const page = await Page.findOne({ code: code });
        res.status(200).json(page);
    }

    // @desc Create page
    // @route POST /pages/create
    // @access Public
    static async createPage(req, res) {
        if (!req.body || !req.body.code) {
            res.status(400);
            throw new Error('Body has missing values');
        }

        const createdPage = await Page.create(req.body);

        res.status(200).json(createdPage);
    }

    // @desc Update page
    // @route PUT /pages/:code
    // @access Public
    static async updatePage(req, res) {
        const code = req.params.code;
        const page = await Page.findOne({ code: code });
        if (!req.body) {
            //deleted !req.body.code
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
    }

    // @desc Delete page
    // @route DELETE /pages/:code
    // @access Private
    static async deletePage(req, res) {
        const { code } = req.params;
        const page = await Page.findOne({ code: code });
        if (!page) {
            res.status(400);
            throw new Error('Page not found');
        }
        await page.remove();
        res.status(200).json({ code: code });
    }

    static async signin(req, res) {
        const { code } = req.params;
        const page = await Page.findOne({ code: code });
        if (!req.body || !req.body.username || !req.body.password) {
            res.status(400);
            throw new Error('Body has missing values');
        }

        const user = page.users.find((user) => {
            return user.username == req.body.username;
        });
        if (!user) {
            res.status(404);
            throw new Error('user not found');
        }
        if (user.password == req.body.password) {
            res.status(200).json({ message: 'SUCCESS' });
        } else {
            res.status(200).json({ success: 'FAIL' });
        }
    }
}
module.exports = {
    PageController
};
