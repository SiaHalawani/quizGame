const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getResultsForPlayerController,
  getResultsForQuizController,
  updateResultController,
  deleteResultController,
  calculateSumScoresForPlayersController,
} = require('../controllers/results.controller');
const { resultValidationRules } = require('../validators/results.validator');

// GET /results/player/:playerID
router.get('/player/:playerID', getResultsForPlayerController);

// GET /results/quiz/:quizID
router.get('/quiz/:quizID', getResultsForQuizController);

// PUT /results/:resultID/update
router.put('/:resultID/update', resultValidationRules(), updateResultController);

// DELETE /results/:resultID/delete
router.delete('/:resultID/delete', deleteResultController);

// GET /results/quiz/:quizID/sum-scores
router.get('/quiz/:quizID/sum-scores', calculateSumScoresForPlayersController);

module.exports = router;
