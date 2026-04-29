const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussion.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', discussionController.getQuestions);
router.get('/:id', discussionController.getQuestionById);
router.post('/', authMiddleware, discussionController.createQuestion);
router.post('/:questionId/answers', authMiddleware, discussionController.createAnswer);

module.exports = router;
