const express = require('express');
const Page = require('../models/pageModel');
const {PageController} = require('../controllers/pageController');
const {PollController} = require('../controllers/pollController');
const router = express.Router();
const asyncHandler = require('express-async-handler');

router.route('/pages/:code')
.get(asyncHandler(PageController.getPage))
.put(asyncHandler(PageController.updatePage))
.delete(asyncHandler(PageController.deletePage));

router.route('/pages/create')
.post(asyncHandler(PageController.createPage));

router.route('/pages/:code/polls')
.post(asyncHandler(PollController.createPoll));

router.route('/pages/:code/polls/:id')
.delete(asyncHandler(PollController.deletePoll))
.put(asyncHandler(PollController.updatePoll));

router.route('/pages/:code/polls/:id/votes')
.put(asyncHandler(PollController.addVote));

router.route('/pages/:code/signin')
.post(asyncHandler(PageController.signin));

module.exports = router;
