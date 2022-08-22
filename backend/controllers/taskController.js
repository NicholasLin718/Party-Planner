const asyncHandler = require('express-async-handler');
const Page = require('../models/pageModel');
class TaskController {
    // @desc Create task
    // @route POST /pages/:code/tasks
    // @access Public
    static async createTask(req, res) {
        console.log(req.body);
        if (!req.body || !req.body.task) {
            res.status(400);
            throw new Error('Body has missing values');
        }
        const code = req.params.code;
        const curPage = await Page.findOne({ code: code });
        const newId =
            curPage.tasks.length === 0
                ? 1
                : curPage.tasks[curPage.tasks.length - 1].id + 1;
        const newTask = {
            id: newId,
            task: req.body.task,
            completed: req.body.completed,
            priority: req.body.priority,
            taskOwner: req.body.taskOwner
        };
        curPage.tasks.push(newTask);
        await curPage.save();
        res.status(200).json(newTask);
    }

    // @desc Update a task
    // @route PUT /pages/:code/tasks/:id
    // @access Private
    static async updateTask(req, res) {
        if (!req.body) {
            res.status(400);
            throw new Error('Body has missing values');
        }
        const code = req.params.code;
        const id = parseInt(req.params.id);

        const curPage = await Page.findOne({ code: code });
        // let found = curPage.tasks.find((tasks) => tasks.id === id);
        let found = false;
        for (let i = 0; i < curPage.tasks.length; i++) {
            if (curPage.tasks[i].id === id) {
                curPage.tasks[i] = req.body;
                found = true;
            }
        }
        if (!found) {
            res.status(404);
            throw new Error('Task not found');
        }
        const updatedPage = await Page.findOneAndUpdate(
            { code: code },
            curPage,
            { new: true }
        );
        res.status(200).json(updatedPage);
    }

    // @desc delete a task
    // @route DELETE /pages/:code/tasks/:id
    // @access Private
    static async deleteTask(req, res) {
        const codeToUpdate = req.params.code;
        const idToDelete = parseInt(req.params.id);
        const curPage = await Page.findOne({ code: codeToUpdate });
        let found = false;
        for (let i = 0; i < curPage.tasks.length; i++) {
            if (curPage.tasks[i].id === idToDelete) {
                curPage.tasks.splice(i, 1);
                found = true;
                break;
            }
        }
        if (!found) {
            res.status(404);
            throw new Error('Requested task not found');
        }
        await curPage.save();
        res.status(200).json(curPage);
    }
}

module.exports = {
    TaskController
};
