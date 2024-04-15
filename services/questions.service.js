const { query } = require('../database/db');

/**
 * Get a question by its ID.
 * @param {int} questionID - The ID of the question to retrieve.
 * @returns {Object} - The question object with the specified ID.
 */
const getQuestionById = async (questionID) => {
  try {
    const sql = 'SELECT * FROM questions WHERE questionID = ?';
    const result = await query(sql, [questionID]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Update an existing question.
 * @param {Object} question - The question object containing updated information.
 * @returns {Object} - The result of the update operation.
 */
const updateQuestion = async (question) => {
  try {
    const { questionID, questionText, correctAnswer, quizID } = question;
    const updateQuery = 'UPDATE questions SET questionText = ?, correctAnswer = ?, quizID = ? WHERE questionID = ?';
    const result = await query(updateQuery, [questionText, correctAnswer, quizID, questionID]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Delete a question by its ID.
 * @param {int} questionID - The ID of the question to be deleted.
 * @returns {Object} - The result of the deletion operation.
 */
const deleteQuestion = async (questionID) => {
  try {
    const deleteQuery = 'DELETE FROM questions WHERE questionID = ?';
    const result = await query(deleteQuery, [questionID]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Create a new question.
 * @param {Object} question - The question object to be created.
 * @returns {Object} - The result of the creation operation.
 */
const createQuestion = async (question) => {
  try {
    const { questionText, correctAnswer, quizID } = question;
    const sql = 'INSERT INTO questions (questionText, correctAnswer, quizID) VALUES (?, ?, ?)';
    const result = await query(sql, [questionText, correctAnswer, quizID]);
    const questionID = result.insertId;
    return { questionID };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  createQuestion,
};
