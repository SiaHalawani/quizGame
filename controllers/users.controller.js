const { validationResult } = require('express-validator');
const {
  registerUser,
  getUserByID,
  updateUserByID,
  deleteUserByID,
  getAllUserUsernames,
  getUserByEmail,
  UserLoginService,
  changeUserPassword,
} = require('../services/users.service');

const registerUserController = async (req, res) => {
  const { username, password, email, dob } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await registerUser({ username, password, email, dob });

    res.status(201).json({ message: 'User registered successfully', userID: result.userID });
  } catch (error) {
    console.error('Error in registerUserController:', error);
    res.status(500).json({ message: 'An error occurred during user registration' });
  }
};

const getUserByIDController = async (req, res) => {
  const userID = req.params.userID;

  try {
    const result = await getUserByID(userID);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: `User with ID ${userID} not found` });
    }
  } catch (error) {
    console.error('Error in getUserByIDController:', error);
    res.status(500).json({ message: 'An error occurred during fetching user' });
  }
};

const updateUserByIDController = async (req, res) => {
  const { id, username, email, dob } = req.body;

  try {
    const result = await updateUserByID({ id, username, email, dob });

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: `User with ID ${id} not found` });
    }
  } catch (error) {
    console.error('Error in updateUserByIDController:', error);
    res.status(500).json({ message: 'An error occurred during update' });
  }
};

const deleteUserByIDController = async (req, res) => {
  const userID = req.params.userID;

  try {
    const result = await deleteUserByID(userID);

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: `User with ID ${userID} not found` });
    }
  } catch (error) {
    console.error('Error in deleteUserByIDController:', error);
    res.status(500).json({ message: 'An error occurred during deletion' });
  }
};

const getAllUsersUsernamesController = async (req, res) => {
  try {
    const result = await getAllUserUsernames();

    const usernames = result.map((user) => user.username);
    res.status(200).json({ usernames });
  } catch (error) {
    console.error('Error in getAllUsersUsernamesController:', error);
    res.status(500).json({ message: 'An error occurred during fetching usernames' });
  }
};

const getUserByEmailController = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await getUserByEmail(email);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: `User with email ${email} not found` });
    }
  } catch (error) {
    console.error('Error in getUserByEmailController:', error);
    res.status(500).json({ message: 'An error occurred during fetching user by email' });
  }
};

const UserLoginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await UserLoginService(email, password);

    if (result.length > 0) {
      res.status(200).json({ message: 'User logged in successfully', user: result[0] });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error in UserLoginController:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
};

const changeUserPasswordController = async (req, res) => {
  const { email, password, newPassword } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (user.length === 0) {
      return res.status(404).json({ message: `User with email ${email} not found` });
    }

    const dbPassword = user[0].password;

    if (password !== dbPassword) {
      return res.status(401).json({ message: 'Incorrect current password' });
    }

    const result = await changeUserPassword(email, newPassword);

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Password changed successfully' });
    } else {
      res.status(500).json({ message: 'An error occurred during password change' });
    }
  } catch (error) {
    console.error('Error in changeUserPasswordController:', error);
    res.status(500).json({ message: 'An error occurred during password change' });
  }
};

module.exports = {
  registerUserController,
  getUserByIDController,
  updateUserByIDController,
  deleteUserByIDController,
  getAllUsersUsernamesController,
  getUserByEmailController,
  UserLoginController,
  changeUserPasswordController,
};
