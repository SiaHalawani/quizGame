const { validationResult } = require('express-validator');
const {
  createQuiz,
  getQuizByID,
  listQuizzes,
  getQuizzesByUserID,
  updateQuiz,
  deleteQuizById,
  getQuestionsForQuiz,
  getQuestionsWithAnswersOfAQuiz,
} = require('../services/quizzes.services');

/**
 * Controller for creating a new quiz.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} - The HTTP response containing the newly created quiz ID.
 */
const createQuizController = async (req, res) => {
  const { title, description, duration, userID, playerID } = req.body;

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Call the service function to create the quiz
    const result = await createQuiz({ title, description, duration, userID, playerID });

    res.status(201).json({ quizID: result.quizID });
  } catch (error) {
    console.error('Error in createQuizController:', error);
    res.status(500).json({ message: 'An error occurred while creating the quiz' });
  }
};

/**
 * Controller for getting a quiz by its ID.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} - The HTTP response containing the quiz information.
 */
const getQuizByIDController = async (req, res) => {
  const quizID = req.params.quizID;

  try {
    // Call the service function to get the quiz by ID
    const result = await getQuizByID(quizID);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: `Quiz with ID ${quizID} not found` });
    }
  } catch (error) {
    console.error('Error in getQuizByIDController:', error);
    res.status(500).json({ message: 'An error occurred while fetching the quiz' });
  }
};

/**
 * Controller for getting a list of all quizzes.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} - The HTTP response containing the list of quizzes.
 */
const listQuizzesController = async (req, res) => {
  try {
    // Call the service function to get the list of quizzes
    const result = await listQuizzes();

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in listQuizzesController:', error);
    res.status(500).json({ message: 'An error occurred while fetching the list of quizzes' });
  }
};

/**
 * Controller for getting quizzes created by a specific user.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} - The HTTP response containing the quizzes created by the user.
 */
const getQuizzesByUserController = async (req, res) => {
  const userID = req.params.userID;

  try {
    // Call the service function to get quizzes by user ID
    const result = await getQuizzesByUserID(userID);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getQuizzesByUserController:', error);
    res.status(500).json({ message: 'An error occurred while fetching the quizzes by user ID' });
  }
};

/**
 * Controller for updating an existing quiz.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} - The HTTP response confirming the update.
 */
const updateQuizController = async (req, res) => {
  const { quizID, title, description, duration, userID, playerID } = req.body;

  try {
    // Call the service function to update the quiz
    const result = await updateQuiz({ quizID, title, description, duration, userID, playerID });

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Quiz updated successfully' });
    } else {
      res.status(404).json({ message: `Quiz with ID ${quizID} not found` });
    }
  } catch (error) {
    console.error('Error in updateQuizController:', error);
    res.status(500).json({ message: 'An error occurred while updating the quiz' });
  }
};

/**
 * Controller for deleting a quiz by its ID.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} - The HTTP response confirming the deletion.
 */
const deleteQuizByIdController = async (req, res) => {
  const quizID = req.params.quizID;

  try {
    // Call the service function to delete the quiz
    const result = await deleteQuizById(quizID);

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Quiz deleted successfully' });
    } else {
      res.status(404).json({ message: `Quiz with ID ${quizID} not found` });
    }
  } catch (error) {
    console.error('Error in deleteQuizByIdController:', error);
    res.status(500).json({ message: 'An error occurred while deleting the quiz' });
  }
};

module.exports = {
  createQuizController,
  getQuizByIDController,
  listQuizzesController,
  getQuizzesByUserController,
  updateQuizController,
  deleteQuizByIdController,
};
