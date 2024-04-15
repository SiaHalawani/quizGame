const { validationResult } = require('express-validator');
const {
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require('../services/questions.service');

/**
 * Controller for getting a question by its ID.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Object} - The HTTP response containing question information if found,
 * a 404 Not Found response with a message if no question is found with the provided ID,
 * or a 500 Internal Server Error response with an error message if an unexpected issue occurs during retrieval.
 */
const getQuestionByIdController = async (req, res) => {
  const questionID = req.params.questionID;

  try {
    // Call the service function to get question information by ID
    const result = await getQuestionById(questionID);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: `Question with ID ${questionID} not found` });
    }
  } catch (error) {
    console.error('Error in getQuestionByIdController:', error);
    res.status(500).json({ message: 'An error occurred during fetching question' });
  }
};

/**
 * Controller for creating a new question.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Object} - The HTTP response containing a success message if the creation is successful,
 * a 400 Bad Request response with validation errors if input validation fails,
 * or a 500 Internal Server Error response with an error message if an unexpected issue occurs during creation.
 */
const createQuestionController = async (req, res) => {
  const { questionText, correctAnswer, quizID } = req.body;

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Call the service function to create the question
    const result = await createQuestion({ questionText, correctAnswer, quizID });

    res.status(201).json({ message: 'Question created successfully', questionID: result.questionID });
  } catch (error) {
    console.error('Error in createQuestionController:', error);
    res.status(500).json({ message: 'An error occurred during question creation' });
  }
};

/**
 * Controller for updating an existing question.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Object} - The HTTP response containing a success message if the update is successful,
 * a 404 Not Found response if the question is not found,
 * or a 500 Internal Server Error response with an error message if an unexpected issue occurs during update.
 */
const updateQuestionController = async (req, res) => {
  const { questionID, questionText, correctAnswer, quizID } = req.body;

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Call the service function to update the question
    const result = await updateQuestion({ questionID, questionText, correctAnswer, quizID });

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Question updated successfully' });
    } else {
      res.status(404).json({ message: `Question with ID ${questionID} not found` });
    }
  } catch (error) {
    console.error('Error in updateQuestionController:', error);
    res.status(500).json({ message: 'An error occurred during question update' });
  }
};

/**
 * Controller for deleting a question by its ID.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Object} - The HTTP response containing a success message if the deletion is successful,
 * a 404 Not Found response if the question is not found,
 * or a 500 Internal Server Error response with an error message if an unexpected issue occurs during deletion.
 */
const deleteQuestionController = async (req, res) => {
  const questionID = req.params.questionID;

  try {
    // Call the service function to delete the question
    const result = await deleteQuestion(questionID);

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Question deleted successfully' });
    } else {
      res.status(404).json({ message: `Question with ID ${questionID} not found` });
    }
  } catch (error) {
    console.error('Error in deleteQuestionController:', error);
    res.status(500).json({ message: 'An error occurred during question deletion' });
  }
};

module.exports = {
  getQuestionByIdController,
  createQuestionController,
  updateQuestionController,
  deleteQuestionController,
};
