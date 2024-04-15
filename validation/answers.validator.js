const { check } = require('express-validator');

/**
 * Validation rules for creating a new answer.
 */
const createAnswerValidation = [
  check('answerText')
    .notEmpty().withMessage('Answer text is required')
    .isLength({ max: 255 }).withMessage('Answer text cannot exceed 255 characters'),

  check('isCorrect')
    .isBoolean().withMessage('IsCorrect must be a boolean value'),

  check('questionID')
    .notEmpty().withMessage('Question ID is required')
    .isInt().withMessage('Question ID must be an integer'),
];

/**
 * Validation rules for updating an answer.
 */
const updateAnswerValidation = [
  check('answerID')
    .notEmpty().withMessage('Answer ID is required')
    .isInt().withMessage('Answer ID must be an integer'),

  check('answerText')
    .optional({ nullable: true })
    .isLength({ max: 255 }).withMessage('Answer text cannot exceed 255 characters'),

  check('isCorrect')
    .optional({ nullable: true })
    .isBoolean().withMessage('IsCorrect must be a boolean value'),

  check('questionID')
    .optional({ nullable: true })
    .isInt().withMessage('Question ID must be an integer'),
];

/**
 * Validation rules for getting answers by question ID.
 */
const getAnswerByQuestionIDValidation = [
  check('questionID')
    .notEmpty().withMessage('Question ID is required')
    .isInt().withMessage('Question ID must be an integer'),
];

/**
 * Validation rules for getting answers by quiz ID.
 */
const getAnswerByQuizIdValidation = [
  check('quizID')
    .notEmpty().withMessage('Quiz ID is required')
    .isInt().withMessage('Quiz ID must be an integer'),
];

/**
 * Validation rules for getting correct answers of a quiz.
 */
const getCorrectAnswerOfAQuizValidation = [
  check('quizID')
    .notEmpty().withMessage('Quiz ID is required')
    .isInt().withMessage('Quiz ID must be an integer'),
];

module.exports = {
  createAnswerValidation,
  updateAnswerValidation,
  getAnswerByQuestionIDValidation,
  getAnswerByQuizIdValidation,
  getCorrectAnswerOfAQuizValidation,
};
