const { query } = require('../database/db');

/**
 * Create a new players-results entry.
 * @param {Object} playersResultsData - The data for creating a new players-results entry.
 * @returns {Object} - The result of the creation operation.
 */
const createPlayersResults = async (playersResultsData) => {
  try {
    const { playerID, resultID } = playersResultsData;
    const sql = `INSERT INTO players_results (playerID, resultID) VALUES (?, ?)`;
    const result = await query(sql, [playerID, resultID]);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Get all players-results entries for a specific player.
 * @param {int} playerID - The ID of the player.
 * @returns {Array} - An array of players-results entries for the player.
 */
const getPlayersResultsForPlayer = async (playerID) => {
  try {
    const sql = 'SELECT * FROM players_results WHERE playerID = ?';
    const result = await query(sql, [playerID]);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Get all players-results entries for a specific result.
 * @param {int} resultID - The ID of the result.
 * @returns {Array} - An array of players-results entries for the result.
 */
const getPlayersResultsForResult = async (resultID) => {
  try {
    const sql = 'SELECT * FROM players_results WHERE resultID = ?';
    const result = await query(sql, [resultID]);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Update a players-results entry.
 * @param {int} playersResultsID - The ID of the players-results entry.
 * @param {Object} updatedData - The updated data for the players-results entry.
 * @returns {Object} - The result of the update operation.
 */
const updatePlayersResults = async (playersResultsID, updatedData) => {
  try {
    const { playerID, resultID } = updatedData;
    const updateQuery = 'UPDATE players_results SET playerID = ?, resultID = ? WHERE players_results_id = ?';
    const result = await query(updateQuery, [playerID, resultID, playersResultsID]);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Delete a players-results entry by its ID.
 * @param {int} playersResultsID - The ID of the players-results entry to delete.
 * @returns {Object} - The result of the deletion operation.
 */
const deletePlayersResultsByID = async (playersResultsID) => {
  try {
    const deleteQuery = 'DELETE FROM players_results WHERE players_results_id = ?';
    const result = await query(deleteQuery, [playersResultsID]);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Calculate the sum of scores for all players.
 * @returns {Array} - An array of objects containing playerID and the sum of their scores.
 */
const calculateSumScoresForPlayers = async () => {
  try {
    const sql = `
      SELECT pr.playerID, SUM(q.NbOfCorrectAns) AS sumScores
      FROM players_results pr
      INNER JOIN results r ON pr.resultID = r.resultID
      INNER JOIN players p ON pr.playerID = p.playerID
      GROUP BY pr.playerID;
    `;
    const result = await query(sql);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createPlayersResults,
  getPlayersResultsForPlayer,
  getPlayersResultsForResult,
  updatePlayersResults,
  deletePlayersResultsByID,
  calculateSumScoresForPlayers,
};
