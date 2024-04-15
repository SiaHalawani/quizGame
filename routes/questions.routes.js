const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getQuestionByIdController,
  createQuestionController,
  updateQuestionController,
  deleteQuestionController,
} = require('../controllers/questions.controller');
const { questionValidationRules } = require('../validators/questions.validator');

// GET /questions/:questionID
router.get('/:questionID', getQuestionByIdController);

// POST /questions/create
router.post(
  '/create',
  questionValidationRules(),
  createQuestionController
);

// PUT /questions/update
router.put(
  '/update',
  questionValidationRules(),
  updateQuestionController
);

// DELETE /questions/:questionID
router.delete('/:questionID', deleteQuestionController);

module.exports = router;
