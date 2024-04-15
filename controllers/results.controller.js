const { validationResult } = require('express-validator');
const {
  getResultsForPlayer,
  getResultsForQuiz,
  updateResult,
  deleteResult,
  calculateSumScoresForPlayers,
} = require('../services/results.service');

/**
 * Controller for getting results for a specific player.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Object} - The HTTP response containing results for the player.
 */
const getResultsForPlayerController = async (req, res) => {
  const { playerID } = req.params;

  try {
    const results = await getResultsForPlayer(playerID);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error in getResultsForPlayerController:', error);
    res.status(500).json({ message: 'An error occurred while fetching results for player' });
  }
};

/**
 * Controller for getting results for a specific quiz.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Object} - The HTTP response containing results for the quiz.
 */
const getResultsForQuizController = async (req, res) => {
  const { quizID } = req.params;

  try {
    const results = await getResultsForQuiz(quizID);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error in getResultsForQuizController:', error);
    res.status(500).json({ message: 'An error occurred while fetching results for quiz' });
  }
};

/**
 * Controller for updating a result.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Object} - The HTTP response confirming the result update.
 */
const updateResultController = async (req, res) => {
  const { resultID } = req.params;
  const { winner, quizID } = req.body;

  try {
    const result = await updateResult(resultID, winner, quizID);
    res.status(200).json({ message: 'Result updated successfully' });
  } catch (error) {
    console.error('Error in updateResultController:', error);
    res.status(500).json({ message: 'An error occurred while updating the result' });
  }
};

/**
 * Controller for deleting a result.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Object} - The HTTP response confirming the result deletion.
 */
const deleteResultController = async (req, res) => {
  const { resultID } = req.params;

  try {
    const result = await deleteResult(resultID);
    res.status(200).json({ message: 'Result deleted successfully' });
  } catch (error) {
    console.error('Error in deleteResultController:', error);
    res.status(500).json({ message: 'An error occurred while deleting the result' });
  }
};

/**
 * Controller for calculating and getting sum scores for all players in a quiz.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Object} - The HTTP response containing player IDs and their sum scores.
 */
const calculateSumScoresForPlayersController = async (req, res) => {
  const { quizID } = req.params;

  try {
    const sumScores = await calculateSumScoresForPlayers(quizID);
    res.status(200).json(sumScores);
  } catch (error) {
    console.error('Error in calculateSumScoresForPlayersController:', error);
    res.status(500).json({ message: 'An error occurred while calculating sum scores' });
  }
};

module.exports = {
  getResultsForPlayerController,
  getResultsForQuizController,
  updateResultController,
  deleteResultController,
  calculateSumScoresForPlayersController,
};
