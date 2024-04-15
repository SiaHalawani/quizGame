const { validationResult } = require('express-validator');
const {
  createPlayersResults,
  getPlayersResultsForPlayer,
  getPlayersResultsForResult,
  updatePlayersResults,
  deletePlayersResultsByID,
  calculateSumScoresForPlayers,
} = require('../services/playersResults.service');

/**
 * Controller for creating a new players-results entry.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Object} - The HTTP response containing the result of the creation operation,
 * or a 500 Internal Server Error response with an error message if an unexpected issue occurs.
 */
const createPlayersResultsController = async (req, res) => {
  const { playerID, resultID } = req.body;

  try {
    const result = await createPlayersResults({ playerID, resultID });
    res.status(201).json(result);
  } catch (error) {
    console.error('Error in createPlayersResultsController:', error);
    res.status(500).json({ message: 'An error occurred during creation of players-results entry' });
  }
};

/**
 * Controller for getting all players-results entries for a specific player.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Object} - The HTTP response containing an array of players-results entries for the player,
 * or a 500 Internal Server Error response with an error message if an unexpected issue occurs.
 */
const getPlayersResultsForPlayerController = async (req, res) => {
  const { playerID } = req.params;

  try {
    const result = await getPlayersResultsForPlayer(playerID);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getPlayersResultsForPlayerController:', error);
    res.status(500).json({ message: 'An error occurred during fetching players-results entries for player' });
  }
};

/**
 * Controller for getting all players-results entries for a specific result.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Object} - The HTTP response containing an array of players-results entries for the result,
 * or a 500 Internal Server Error response with an error message if an unexpected issue occurs.
 */
const getPlayersResultsForResultController = async (req, res) => {
  const { resultID } = req.params;

  try {
    const result = await getPlayersResultsForResult(resultID);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getPlayersResultsForResultController:', error);
    res.status(500).json({ message: 'An error occurred during fetching players-results entries for result' });
  }
};

/**
 * Controller for updating a players-results entry.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Object} - The HTTP response containing the result of the update operation,
 * or a 500 Internal Server Error response with an error message if an unexpected issue occurs.
 */
const updatePlayersResultsController = async (req, res) => {
  const { playersResultsID } = req.params;
  const { playerID, resultID } = req.body;

  try {
    const result = await updatePlayersResults(playersResultsID, { playerID, resultID });
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in updatePlayersResultsController:', error);
    res.status(500).json({ message: 'An error occurred during update of players-results entry' });
  }
};

/**
 * Controller for deleting a players-results entry by its ID.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Object} - The HTTP response containing the result of the deletion operation,
 * or a 500 Internal Server Error response with an error message if an unexpected issue occurs.
 */
const deletePlayersResultsByIDController = async (req, res) => {
  const { playersResultsID } = req.params;

  try {
    const result = await deletePlayersResultsByID(playersResultsID);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in deletePlayersResultsByIDController:', error);
    res.status(500).json({ message: 'An error occurred during deletion of players-results entry' });
  }
};

/**
 * Controller for calculating the sum of scores for all players.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Object} - The HTTP response containing an array of objects with playerID and sum of scores,
 * or a 500 Internal Server Error response with an error message if an unexpected issue occurs.
 */
const calculateSumScoresForPlayersController = async (req, res) => {
  try {
    const result = await calculateSumScoresForPlayers();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in calculateSumScoresForPlayersController:', error);
    res.status(500).json({ message: 'An error occurred during calculation of sum scores for players' });
  }
};

module.exports = {
  createPlayersResultsController,
  getPlayersResultsForPlayerController,
  getPlayersResultsForResultController,
  updatePlayersResultsController,
  deletePlayersResultsByIDController,
  calculateSumScoresForPlayersController,
};
