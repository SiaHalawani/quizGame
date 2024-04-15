const { check } = require('express-validator');

const validateRegisterPlayer = () => {
  return [
    check('playerUsername').notEmpty().withMessage('Username is required'),
    check('playerEmail').isEmail().normalizeEmail({ force_lower_case: true }).withMessage('Invalid email address'),
    check('playerPassword')
      .isLength({ min: 6 })
      .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, 'g')
      .withMessage('Password must contain at least one uppercase letter and one special character'),
    check('playerDob').isDate().withMessage("Wrong date format"),
  ];
};

const validateUpdatePlayer = () => {
  return [
    check('playerUsername', 'Username is required').notEmpty(),
    check('playerEmail', 'Invalid email address').isEmail().normalizeEmail({ force_lower_case: true }),
    check('playerPassword', 'Password must be at least 6 characters long')
      .optional({ checkFalsy: true })
      .isLength({ min: 6 })
      .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, 'g')
      .withMessage('Password must contain at least one uppercase letter and one special character'),
  ];
};

const validateChangePlayerPassword = () => {
  return [
    check('newPassword', 'Password must be at least 6 characters long')
      .isLength({ min: 6 })
      .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, 'g')
      .withMessage('Password must contain at least one uppercase letter and one special character'),
  ];
};

const validatePlayerInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRegisterPlayer,
  validateUpdatePlayer,
  validateChangePlayerPassword,
  validatePlayerInput,
};