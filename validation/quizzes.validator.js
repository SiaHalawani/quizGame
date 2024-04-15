const { check } = require('express-validator');

const createQuizValidation = [
  check('title')
    .notEmpty().withMessage('Title is required'),

  check('description')
    .notEmpty().withMessage('Description is required'),

  check('duration')
    .notEmpty().withMessage('Duration is required')
    .isInt({ min: 1 }).withMessage('Duration must be a positive integer'),

  check('userID')
    .notEmpty().withMessage('User ID is required')
    .isInt({ min: 1 }).withMessage('User ID must be a positive integer'),

  check('playerID')
    .notEmpty().withMessage('Player ID is required')
    .isInt({ min: 1 }).withMessage('Player ID must be a positive integer'),
];

module.exports = {
  createQuizValidation,
};