const { check } = require('express-validator');

/**
 * Validation for inserting a new user.
 */
const insertUserValidation = [
  check('username')
    .notEmpty().withMessage('Username is required'),

  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid Email format'),

  check('password')
    .notEmpty().withMessage('Password is required')
    .isStrongPassword().withMessage('Weak password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),

  check('dob')
    .notEmpty().withMessage('Date of Birth is required')
    .isDate().withMessage('DOB must be a date'),

  check('mobileNumber')
    .optional({ nullable: true })
    .isMobilePhone('any').withMessage('Invalid mobile phone number'),
];

/**
 * Validation for updating an existing user.
 */
const updateUserValidation = [
  check('userID')
    .notEmpty().withMessage('ID is required'),

  check('username')
    .notEmpty().withMessage('Username is required'),

  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid Email format'),

  check('password')
    .notEmpty().withMessage('Password is required')
    .isStrongPassword().withMessage('Weak password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),

  check('dob')
    .notEmpty().withMessage('Date of Birth is required')
    .isDate().withMessage('DOB must be a date'),

  check('mobileNumber')
    .optional({ nullable: true })
    .isMobilePhone('any').withMessage('Invalid mobile phone number'),
];

const changeUserPasswordValidation = [
    check('userID')
      .notEmpty().withMessage('User ID is required'),
  
    check('currentPassword')
      .notEmpty().withMessage('Current password is required'),
  
    check('newPassword')
      .notEmpty().withMessage('New password is required')
      .isStrongPassword().withMessage('Weak password')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
  ];

module.exports = {
  insertUserValidation,
  updateUserValidation,
  changeUserPasswordValidation,
};