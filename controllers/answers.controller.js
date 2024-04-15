const { validationResult } = require('express-validator');
const {
  createAnswer,
  updateAnswer,
  deleteAnswer,
  getAnswerByQuestionID,
  getAnswerByQuizId,
  getCorrectAnswerOfAQuiz,
} = require('../services/answers.service');

/**
 * Controller for creating a new answer for a question.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Object} - The HTTP response containing the result of the creation operation,
 * or a 500 Internal Server Error response with an error message if an unexpected issue occurs.
 */
const createAnswerController = async (req, res) => {
  const { answerText, isCorrect, questionID } = req.body;

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Call the service function to create the answer
    const result = await createAnswer({ answerText, isCorrect, questionID });

    res.status(201).json({ message: 'Answer created successfully', answerID: result.insertId });
  } catch (error) {
    console.error('Error in createAnswerController:', error);
    res.status(500).json({ message: 'An error occurred during answer creation' });
  }
};

/**
 * Controller for updating an existing answer.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Object} - The HTTP response containing a success message if the update is successful,
 * a 404 Not Found response if the answer is not found,
 * or a 500 Internal Server Error response with an error message if an unexpected issue occurs during update.
 */
const updateAnswerController = async (req, res) => {
  const { answerID, answerText, isCorrect } = req.body;

  try {
    // Call the service function to update the answer
    const result = await updateAnswer({ answerID, answerText, isCorrect });

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Answer updated successfully' });
    } else {
      res.status(404).json({ message: `Answer with ID ${answerID} not found` });
    }
  } catch (error) {
    console.error('Error in updateAnswerController:', error);
    res.status(500).json({ message: 'An error occurred during update' });
  }
};

/**
 * Controller for deleting an answer by its ID.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Object} - The HTTP response containing a success message if the deletion is successful,
 * a 404 Not Found response if the answer is not found,
 * or a 500 Internal Server Error response with an error message if an unexpected issue occurs during deletion.
 */
const deleteAnswerController = async (req, res) => {
  const answerID = req.params.answerID;

  try {
    // Call the service function to delete the answer
    const result = await deleteAnswer(answerID);

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Answer deleted successfully' });
    } else {
      res.status(404).json({ message: `Answer with ID ${answerID} not found` });
    }
  } catch (error) {
    console.error('Error in deleteAnswerController:', error);
    res.status(500).json({ message: 'An error occurred during deletion' });
  }
};

/**
 * Controller for getting answers by a specific question ID.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Object} - The HTTP response containing an array of answers for the specified question,
 * or a 500 Internal Server Error response with an error message if an unexpected issue occurs.
 */
const getAnswerByQuestionIDController = async (req, res) => {
  const questionID = req.params.questionID;

  try {
    // Call the service function to get answers by question ID
    const result = await getAnswerByQuestionID(questionID);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getAnswerByQuestionIDController:', error);
    res.status(500).json({ message: 'An error occurred during fetching answers by question ID' });
  }
};

/**
 * Controller for getting answers for a specific quiz ID.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Object} - The HTTP response containing an array of answers for the specified quiz,
 * or a 500 Internal Server Error response with an error message if an unexpected issue occurs.
 */
const getAnswerByQuizIdController = async (req, res) => {
  const quizID = req.params.quizID;

  try {
    // Call the service function to get answers by quiz ID
    const result = await getAnswerByQuizId(quizID);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getAnswerByQuizIdController:', error);
    res.status(500).json({ message: 'An error occurred during fetching answers by quiz ID' });
  }
};

/**
 * Controller for getting correct answers for a specific quiz ID.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Object} - The HTTP response containing an array of correct answers for the specified quiz,
 * or a 500 Internal Server Error response with an error message if an unexpected issue occurs.
 */
const getCorrectAnswerOfAQuizController = async (req, res) => {
  const quizID = req.params.quizID;

  try {
    // Call the service function to get correct answers by quiz ID
    const result = await getCorrectAnswerOfAQuiz(quizID);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getCorrectAnswerOfAQuizController:', error);
    res.status(500).json({ message: 'An error occurred during fetching correct answers by quiz ID' });
  }
};

module.exports = {
  createAnswerController,
  updateAnswerController,
  deleteAnswerController,
  getAnswerByQuestionIDController,
  getAnswerByQuizIdController,
  getCorrectAnswerOfAQuizController,
};
