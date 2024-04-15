const { query } = require('../database/db');

/**
 * Get results for a specific player.
 * @param {int} playerID - The ID of the player.
 * @returns {Object} - An array of results for the player.
 */
const getResultsForPlayer = async (playerID) => {
  try {
    const sql = 'SELECT * FROM results WHERE winner = ?';
    const result = await query(sql, [playerID]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Get results for a specific quiz.
 * @param {int} quizID - The ID of the quiz.
 * @returns {Object} - An array of results for the quiz.
 */
const getResultsForQuiz = async (quizID) => {
  try {
    const sql = 'SELECT * FROM results WHERE quizID = ?';
    const result = await query(sql, [quizID]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Update a result.
 * @param {int} resultID - The ID of the result to update.
 * @param {int} winner - The ID of the winner player.
 * @param {int} quizID - The ID of the quiz.
 * @returns {Object} - An object containing the result of the update operation.
 */
const updateResult = async (resultID, winner, quizID) => {
  try {
    const updateQuery = 'UPDATE results SET winner = ?, quizID = ? WHERE resultID = ?';
    const result = await query(updateQuery, [winner, quizID, resultID]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Delete a result by its ID.
 * @param {int} resultID - The ID of the result to delete.
 * @returns {Object} - An object containing the result of the deletion operation.
 */
const deleteResult = async (resultID) => {
  try {
    const deleteQuery = 'DELETE FROM results WHERE resultID = ?';
    const result = await query(deleteQuery, [resultID]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Calculate the sum scores for all players in a quiz.
 * @param {int} quizID - The ID of the quiz.
 * @returns {Object} - An array of objects containing playerID and sum of scores.
 */
const calculateSumScoresForPlayers = async (quizID) => {
  try {
    const sql = `
      SELECT pr.playerID, SUM(qr.isCorrect) AS totalScore
      FROM players_results AS pr
      JOIN questions AS q ON pr.questionID = q.questionID
      JOIN answers AS a ON pr.answerID = a.answerID
      JOIN quizzes AS qz ON pr.quizID = qz.quizID
      WHERE pr.quizID = ?
      GROUP BY pr.playerID
    `;
    const result = await query(sql, [quizID]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getResultsForPlayer,
  getResultsForQuiz,
  updateResult,
  deleteResult,
  calculateSumScoresForPlayers,
};
