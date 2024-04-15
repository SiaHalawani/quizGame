const { check, body } = require('express-validator');

/**
 * Validation for creating a new players-results entry.
 */
const createPlayersResultsValidation = [
  check('playerID')
    .notEmpty().withMessage('Player ID is required'),

  check('resultID')
    .notEmpty().withMessage('Result ID is required'),
];

/**
 * Validation for updating an existing players-results entry.
 */
const updatePlayersResultsValidation = [
  check('playerID')
    .optional({ nullable: true })
    .notEmpty().withMessage('Player ID is required'),

  check('resultID')
    .optional({ nullable: true })
    .notEmpty().withMessage('Result ID is required'),
];

module.exports = {
  createPlayersResultsValidation,
  updatePlayersResultsValidation,
};
