const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const {
  createPlayersResultsController,
  getPlayersResultsForPlayerController,
  getPlayersResultsForResultController,
  updatePlayersResultsController,
  deletePlayersResultsByIDController,
  calculateSumScoresForPlayersController,
} = require('../controllers/playersResults.controller');

// POST /players-results
router.post(
  '/',
  [
    body('playerID').notEmpty().isInt().withMessage('Player ID must be a valid integer'),
    body('resultID').notEmpty().isInt().withMessage('Result ID must be a valid integer'),
  ],
  createPlayersResultsController
);

// GET /players-results/player/:playerID
router.get('/player/:playerID',
  param('playerID').isInt().withMessage('Player ID must be a valid integer'),
  getPlayersResultsForPlayerController
);

// GET /players-results/result/:resultID
router.get('/result/:resultID',
  param('resultID').isInt().withMessage('Result ID must be a valid integer'),
  getPlayersResultsForResultController
);

// PUT /players-results/:playersResultsID
router.put(
  '/:playersResultsID',
  [
    param('playersResultsID').isInt().withMessage('Players-Results ID must be a valid integer'),
    body('playerID').notEmpty().isInt().withMessage('Player ID must be a valid integer'),
    body('resultID').notEmpty().isInt().withMessage('Result ID must be a valid integer'),
  ],
  updatePlayersResultsController
);

// DELETE /players-results/:playersResultsID
router.delete(
  '/:playersResultsID',
  param('playersResultsID').isInt().withMessage('Players-Results ID must be a valid integer'),
  deletePlayersResultsByIDController
);

// GET /players-results/calculate-sum-scores
router.get('/calculate-sum-scores', calculateSumScoresForPlayersController);

module.exports = router;
