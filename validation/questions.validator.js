const { check } = require('express-validator');

/**
 * Validation for creating a new question.
 */
const createQuestionValidation = [
  check('questionText')
    .notEmpty().withMessage('Question text is required')
    .isLength({ min: 5 }).withMessage('Question must be at least 5 characters'),

  check('correctAnswer')
    .notEmpty().withMessage('Correct answer is required')
    .isLength({ min: 1 }).withMessage('Correct answer must be provided'),

  check('quizID')
    .notEmpty().withMessage('Quiz ID is required')
    .isInt({ min: 1 }).withMessage('Quiz ID must be a positive integer'),
];

/**
 * Validation for updating an existing question.
 */
const updateQuestionValidation = [
  check('questionID')
    .notEmpty().withMessage('Question ID is required')
    .isInt({ min: 1 }).withMessage('Question ID must be a positive integer'),

  check('questionText')
    .optional()
    .notEmpty().withMessage('Question text is required')
    .isLength({ min: 5 }).withMessage('Question must be at least 5 characters'),

  check('correctAnswer')
    .optional()
    .notEmpty().withMessage('Correct answer is required')
    .isLength({ min: 1 }).withMessage('Correct answer must be provided'),

  check('quizID')
    .optional()
    .notEmpty().withMessage('Quiz ID is required')
    .isInt({ min: 1 }).withMessage('Quiz ID must be a positive integer'),
];

/**
 * Validation for deleting a question.
 */
const deleteQuestionValidation = [
  check('questionID')
    .notEmpty().withMessage('Question ID is required')
    .isInt({ min: 1 }).withMessage('Question ID must be a positive integer'),
];

module.exports = {
  createQuestionValidation,
  updateQuestionValidation,
  deleteQuestionValidation,
};
