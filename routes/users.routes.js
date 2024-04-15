const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  registerUserController,
  getUserByIDController,
  updateUserByIDController,
  deleteUserByIDController,
  getAllUsersUsernamesController,
  getUserByEmailController,
  UserLoginController,
  changeUserPasswordController,
} = require('../controllers/users.controller');
const {
  insertUserValidation,
  updateUserValidation,
  changeUserPasswordValidation,
} = require('../validators/users.validator');

// POST /users/register
router.post(
  '/register',
  insertUserValidation,
  registerUserController
);

// GET /users/:userID
router.get('/:userID', getUserByIDController);

// PUT /users/update
router.put(
  '/update',
  updateUserValidation,
  updateUserByIDController
);

// DELETE /users/:userID
router.delete('/:userID', deleteUserByIDController);

// GET /users/usernames
router.get('/usernames', getAllUsersUsernamesController);

// POST /users/email
router.post(
  '/email',
  [
    body('email').trim().isEmail(),
  ],
  getUserByEmailController
);

// POST /users/login
router.post(
  '/login',
  [
    body('email').trim().isEmail(),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  UserLoginController
);

// PUT /users/password
router.put(
  '/password',
  [
    body('email').trim().isEmail(),
    body('password').notEmpty().withMessage('Password is required'),
    body('newPassword')
      .notEmpty().withMessage('New password is required')
      .isStrongPassword().withMessage('Weak new password')
      .isLength({ min: 6 }).withMessage('New password must be at least 6 characters.'),
  ],
  changeUserPasswordValidation,
  changeUserPasswordController
);

module.exports = router;
