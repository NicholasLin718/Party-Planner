const asyncHandler = require('express-async-handler');
const Page = require('../models/pageModel');

class PollController {
    // @desc Add new poll
    // @route POST /pages/:code/polls
    // @access Private
    static async createPoll(req, res) {
        if (!req.body || !req.body.title || !req.body.options) {
            res.status(400);
            throw new Error('Body has missing values');
        }
        const code = req.params.code;
        const curPage = await Page.findOne({ code: code });
        const newId =
            curPage.polls.length == 0
                ? 1
                : curPage.polls[curPage.polls.length - 1].id + 1;
        const newPoll = {
            id: newId,
            title: req.body.title,
            voted: [],
            options: req.body.options.map((option) => ({
                name: option,
                numVotes: 0
            }))
        };
        curPage.polls.push(newPoll);
        await curPage.save();
        //const newPollId = await Page.updateOne({code: code}, {"$push": {polls: newPoll}});
        res.status(200).json(newPoll);
    }

    // @desc delete a poll
    // @route DELETE /pages/:code/polls/:id
    // @access Private
    static async deletePoll(req, res) {
        const codeToUpdate = req.params.code;
        const idToDelete = parseInt(req.params.id);
        const curPage = await Page.findOne({ code: codeToUpdate });
        let found = false;
        for (let i = 0; i < curPage.polls.length; i++) {
            if (curPage.polls[i].id === idToDelete) {
                curPage.polls.splice(i, 1);
                found = true;
                break;
            }
        }
        if (!found) {
            res.status(404);
            throw new Error('Requested poll not found');
        }
        await curPage.save();
        res.status(200).json(curPage);
    }

    // @desc Vote on a poll
    // @route PUT /pages/:code/polls/:id/votes
    // @access Private
    static async addVote(req, res) {
        if (!req.body || !req.body.option || !req.body.name) {
            res.status(400);
            throw new Error('Body has missing values');
        }
        const chosenOption = req.body.option;
        const code = req.params.code;
        const id = parseInt(req.params.id);
        const voterName = req.body.name;

        const curPage = await Page.findOne({ code: code });
        let found = false;
        for (let i = 0; i < curPage.polls.length; i++) {
            if (curPage.polls[i].id === id) {
                if (curPage.polls[i].voted.includes(voterName)) {
                    res.status(400);
                    throw new Error('This person already voted');
                }
                for (let j = 0; j < curPage.polls[i].options.length; j++) {
                    if (curPage.polls[i].options[j].name === chosenOption) {
                        curPage.polls[i].options[j].numVotes++;
                        found = true;
                    }
                }
                if (!found) {
                    res.status(404);
                    throw new Error('Requested option not found');
                } else {
                    curPage.polls[i].voted.push(voterName);
                }
            }
        }

        const updatedPage = await Page.findOneAndUpdate(
            { code: code },
            curPage,
            { new: true }
        );
        res.status(200).json(updatedPage);
    }

    // @desc Update a poll
    // @route PUT /pages/:code/polls/:id
    // @access Private
    static async updatePoll(req, res) {
        if (!req.body) {
            res.status(400);
            throw new Error('Body has missing values');
        }
        const code = req.params.code;
        const id = parseInt(req.params.id);

        const curPage = await Page.findOne({ code: code });
        let found = false;
        for (let i = 0; i < curPage.polls.length; i++) {
            if (curPage.polls[i].id === id) {
                curPage.polls[i] = req.body;
                found = true;
            }
        }
        if (!found) {
            res.status(404);
            throw new Error('Poll not found');
        }
        const updatedPage = await Page.findOneAndUpdate(
            { code: code },
            curPage,
            { new: true }
        );
        res.status(200).json(updatedPage);
    }
}
module.exports = {
    PollController
};
