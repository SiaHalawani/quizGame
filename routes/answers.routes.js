const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createAnswerController,
  updateAnswerController,
  deleteAnswerController,
  getAnswerByQuestionIDController,
  getAnswerByQuizIdController,
  getCorrectAnswerOfAQuizController,
} = require('../controllers/answers.controller');
const {
  createAnswerValidation,
  updateAnswerValidation,
  getAnswerByQuestionIDValidation,
  getAnswerByQuizIdValidation,
  getCorrectAnswerOfAQuizValidation,
} = require('../validators/answers.validator');

// POST /answers/create
router.post(
  '/create',
  createAnswerValidation,
  createAnswerController
);

// PUT /answers/update
router.put(
  '/update',
  updateAnswerValidation,
  updateAnswerController
);

// DELETE /answers/delete
router.delete(
  '/delete',
  deleteAnswerController
);

// GET /answers/question/:questionID
router.get(
  '/question/:questionID',
  getAnswerByQuestionIDValidation,
  getAnswerByQuestionIDController
);

// GET /answers/quiz/:quizID
router.get(
  '/quiz/:quizID',
  getAnswerByQuizIdValidation,
  getAnswerByQuizIdController
);

// GET /answers/quiz/correct/:quizID
router.get(
  '/quiz/correct/:quizID',
  getCorrectAnswerOfAQuizValidation,
  getCorrectAnswerOfAQuizController
);

module.exports = router;
