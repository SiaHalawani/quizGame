const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createQuizController,
  getQuizByIDController,
  listQuizzesController,
  getQuizzesByUserController,
  updateQuizController,
  deleteQuizByIdController,
} = require('../controllers/quizzes.controller');
const { quizValidationRules } = require('../validators/quizzes.validator');

// POST /api/quizzes
router.post(
  '/',
  quizValidationRules(),
  createQuizController
);

// GET /api/quizzes/:quizID
router.get('/:quizID', getQuizByIDController);

// GET /api/quizzes
router.get('/', listQuizzesController);

// GET /api/quizzes/user/:userID
router.get('/user/:userID', getQuizzesByUserController);

// PUT /api/quizzes/update
router.put(
  '/update',
  quizValidationRules(),
  updateQuizController
);

// DELETE /api/quizzes/:quizID
router.delete('/:quizID', deleteQuizByIdController);

module.exports = router;
