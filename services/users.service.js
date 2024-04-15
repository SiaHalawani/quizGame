const { query } = require('../database/db');

const registerUser = async (user) => {
  try {
    const { username, password, email, dob } = user;
    const sql = `INSERT INTO Users (username, password, email, dob) VALUES (?, ?, ?, ?)`;
    const result = await query(sql, [username, password, email, dob]);

    const userID = result.insertId;
    return { userID };
  } catch (error) {
    throw new Error(error);
  }
};

const getUserByID = async (userID) => {
  try {
    const sql = 'SELECT * FROM Users WHERE id = ?';
    const result = await query(sql, [userID]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const updateUserByID = async (user) => {
  try {
    const { id, username, email, dob } = user;
    const updateQuery = 'UPDATE Users SET username = ?, email = ?, dob = ? WHERE id = ?';
    const result = await query(updateQuery, [username, email, dob, id]);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteUserByID = async (userID) => {
  try {
    const deleteQuery = 'DELETE FROM Users WHERE id = ?';
    const result = await query(deleteQuery, [userID]);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllUserUsernames = async () => {
  try {
    const sql = 'SELECT username FROM Users';
    const result = await query(sql);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserByEmail = async (email) => {
  try {
    const sql = 'SELECT * FROM Users WHERE email = ?';
    const result = await query(sql, [email]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const UserLoginService = async (email, password) => {
  try {
    const sql = 'SELECT * FROM Users WHERE email = ? AND password = ?';
    const result = await query(sql, [email, password]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const changeUserPassword = async (email, newPassword) => {
  try {
    const sql = 'UPDATE Users SET password = ? WHERE email = ?';
    const result = await query(sql, [newPassword, email]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  registerUser,
  getUserByID,
  updateUserByID,
  deleteUserByID,
  getAllUserUsernames,
  getUserByEmail,
  UserLoginService,
  changeUserPassword,
};
