const { check } = require('express-validator');

/**
 * Validation for creating a new result.
 */
const createResultValidation = [
  check('winner')
    .notEmpty().withMessage('Winner is required')
    .isInt().withMessage('Winner must be an integer'),

  check('quizID')
    .notEmpty().withMessage('Quiz ID is required')
    .isInt().withMessage('Quiz ID must be an integer'),
];

/**
 * Validation for updating a result.
 */
const updateResultValidation = [
  check('resultID')
    .notEmpty().withMessage('Result ID is required')
    .isInt().withMessage('Result ID must be an integer'),

  check('winner')
    .optional({ nullable: true })
    .isInt().withMessage('Winner must be an integer'),

  check('quizID')
    .optional({ nullable: true })
    .isInt().withMessage('Quiz ID must be an integer'),
];

/**
 * Validation for calculating sum scores for players.
 */
const calculateSumScoresValidation = [
  check('quizID')
    .notEmpty().withMessage('Quiz ID is required')
    .isInt().withMessage('Quiz ID must be an integer'),
];

module.exports = {
  createResultValidation,
  updateResultValidation,
  calculateSumScoresValidation,
};
