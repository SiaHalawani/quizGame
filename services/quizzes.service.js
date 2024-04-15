const { query } = require('../database/db');

/**
 * Create a new quiz.
 * @param {Object} quiz - The quiz object containing title, description, duration, userID, and playerID.
 * @returns {Object} - An object containing the result of the quiz creation.
 */
const createQuiz = async (quiz) => {
  try {
    const { title, description, duration, userID, playerID } = quiz;
    const sql = `INSERT INTO Quizzes (title, description, duration, userID, playerID) VALUES (?, ?, ?, ?, ?)`;
    const result = await query(sql, [title, description, duration, userID, playerID]);

    const quizID = result.insertId;
    return { quizID };
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Get a quiz by its ID.
 * @param {int} quizID - The ID of the quiz to retrieve.
 * @returns {Object} - An object containing the information of the quiz with the specified ID.
 */
const getQuizByID = async (quizID) => {
  try {
    const sql = 'SELECT * FROM Quizzes WHERE quizID = ?';
    const result = await query(sql, [quizID]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Get a list of all quizzes.
 * @returns {Object} - An array of quiz objects containing title and description.
 */
const listQuizzes = async () => {
  try {
    const sql = 'SELECT quizID, title, description FROM Quizzes';
    const result = await query(sql);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Get quizzes created by a specific user.
 * @param {int} userID - The ID of the user.
 * @returns {Object} - An array of quiz objects created by the user.
 */
const getQuizzesByUserID = async (userID) => {
  try {
    const sql = 'SELECT * FROM Quizzes WHERE userID = ?';
    const result = await query(sql, [userID]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Update an existing quiz.
 * @param {Object} quiz - The quiz object containing updated information.
 * @returns {Object} - An object containing the result of the update operation.
 */
const updateQuiz = async (quiz) => {
  try {
    const { quizID, title, description, duration, userID, playerID } = quiz;
    const updateQuery = 'UPDATE Quizzes SET title = ?, description = ?, duration = ?, userID = ?, playerID = ? WHERE quizID = ?';
    const result = await query(updateQuery, [title, description, duration, userID, playerID, quizID]);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Delete a quiz by its ID.
 * @param {int} quizID - The ID of the quiz to be deleted.
 * @returns {Object} - An object containing the result of the deletion operation.
 */
const deleteQuizById = async (quizID) => {
  try {
    const deleteQuery = 'DELETE FROM Quizzes WHERE quizID = ?';
    const result = await query(deleteQuery, [quizID]);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Get questions for a specific quiz.
 * @param {int} quizID - The ID of the quiz.
 * @returns {Object} - An array of question objects for the quiz.
 */
const getQuestionsForQuiz = async (quizID) => {
  try {
    const sql = 'SELECT * FROM Questions WHERE quizID = ?';
    const result = await query(sql, [quizID]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Get questions with answers for a specific quiz.
 * @param {int} quizID - The ID of the quiz.
 * @returns {Object} - An array of question objects with their answers for the quiz.
 */
const getQuestionsWithAnswersOfAQuiz = async (quizID) => {
  try {
    const sql = `
      SELECT Q.*, A.answerText, A.isCorrect 
      FROM Questions Q 
      LEFT JOIN Answers A 
      ON Q.questionID = A.questionID 
      WHERE Q.quizID = ?`;
    const result = await query(sql, [quizID]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createQuiz,
  getQuizByID,
  listQuizzes,
  getQuizzesByUserID,
  updateQuiz,
  deleteQuizById,
  getQuestionsForQuiz,
  getQuestionsWithAnswersOfAQuiz,
};
