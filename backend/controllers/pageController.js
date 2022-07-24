const asyncHandler = require('express-async-handler');
const Page = require('../models/pageModel');


class PageController {
    
    // @desc Get page
    // @route GET /pages/:code
    // @access Public
    static async getPage(req, res){
        const code = req.params.code;
        const page = await Page.findOne({ code: code });
        res.status(200).json(page);
    };

    // @desc Create page
    // @route POST /pages/create
    // @access Public
    static async createPage(req, res){
        if (!req.body || !req.body.code) {
            res.status(400);
            throw new Error('Body has missing values');
        }
        try{
            const createdPage = await Page.create(req.body);
            res.status(200).json(createdPage);
        } catch(error){
            console.log(error);

        }
    };

    // @desc Update page
    // @route PUT /pages/:code
    // @access Public
    static async updatePage(req, res){
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
    };

    // @desc Delete page
    // @route DELETE /pages/:code
    // @access Private
    static async deletePage(req, res){
        const { code } = req.params;
        const page = await Page.findOne({ code: code });
        if (!page) {
            res.status(400);
            throw new Error('Page not found');
        }
        await page.remove();
        res.status(200).json({ code: code });
    };

}
module.exports = {
    PageController
};
