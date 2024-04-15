const { query } = require('../database/db');

/**
 * Create a new answer for a question.
 * @param {Object} answer - The answer object containing answerText, isCorrect, and questionID.
 * @returns {Object} - An object containing the result of the creation operation.
 */
const createAnswer = async (answer) => {
  try {
    const { answerText, isCorrect, questionID } = answer;
    const sql = `INSERT INTO answers (answerText, isCorrect, questionID) VALUES (?, ?, ?)`;
    const result = await query(sql, [answerText, isCorrect, questionID]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Update an existing answer.
 * @param {Object} answer - The answer object containing updated information.
 * @returns {Object} - An object containing the result of the update operation.
 */
const updateAnswer = async (answer) => {
  try {
    const { answerID, answerText, isCorrect } = answer;
    const updateQuery = 'UPDATE answers SET answerText = ?, isCorrect = ? WHERE answerID = ?';
    const result = await query(updateQuery, [answerText, isCorrect, answerID]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Delete an answer by its ID.
 * @param {int} answerID - The ID of the answer to be deleted.
 * @returns {Object} - An object containing the result of the deletion operation.
 */
const deleteAnswer = async (answerID) => {
  try {
    const deleteQuery = 'DELETE FROM answers WHERE answerID = ?';
    const result = await query(deleteQuery, [answerID]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Get answers by a specific question ID.
 * @param {int} questionID - The ID of the question to retrieve answers for.
 * @returns {Object} - An array of answers for the specified question.
 */
const getAnswerByQuestionID = async (questionID) => {
  try {
    const sql = 'SELECT * FROM answers WHERE questionID = ?';
    const result = await query(sql, [questionID]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Get answers for a specific quiz ID.
 * @param {int} quizID - The ID of the quiz to retrieve answers for.
 * @returns {Object} - An array of answers for the specified quiz.
 */
const getAnswerByQuizId = async (quizID) => {
  try {
    const sql = `
      SELECT A.*
      FROM answers A
      INNER JOIN questions Q ON A.questionID = Q.questionID
      WHERE Q.quizID = ?
    `;
    const result = await query(sql, [quizID]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Get the correct answer(s) for a specific quiz.
 * @param {int} quizID - The ID of the quiz to retrieve correct answers for.
 * @returns {Object} - An array of correct answers for the specified quiz.
 */
const getCorrectAnswerOfAQuiz = async (quizID) => {
  try {
    const sql = `
      SELECT A.*
      FROM answers A
      INNER JOIN questions Q ON A.questionID = Q.questionID
      WHERE Q.quizID = ? AND A.isCorrect = 1
    `;
    const result = await query(sql, [quizID]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createAnswer,
  updateAnswer,
  deleteAnswer,
  getAnswerByQuestionID,
  getAnswerByQuizId,
  getCorrectAnswerOfAQuiz,
};
