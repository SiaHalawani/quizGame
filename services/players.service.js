const moment = require('moment');
const { query } = require('../database/db');

const registerPlayer = async (playerUsername, playerEmail, playerPassword, playerDob) => {
    try {
        // Registers a new player with the provided username, email, password, and date of birth
        const checkExistingQuery = 'SELECT * FROM players WHERE playerUsername = ?';
        // Checks if the player is already registered based on the username
        const existingPlayer = await query(checkExistingQuery, [playerUsername]);

        if (existingPlayer.length > 0) {
            return { error: 'The player is already registered' };
        } else {
            // Inserts the player into the database if not already registered
            const sql = 'INSERT INTO players(playerUsername, playerEmail, playerPassword, playerDob) VALUES (?, ?, ?, ?)';
            const result = await query(sql, [playerUsername, playerEmail, playerPassword, moment(playerDob).format("YYYY-MM-DD")]);
            return result; //Returns the result of the registration
        }
    } catch (error) {
        throw new Error(error);
    }
};

const deletePlayerById = async (playerID) => {
    try {
        // Deletes a player from the database based on the provided player ID
        const deletePlayerQuery = 'DELETE FROM players WHERE playerID = ?';
        const result = await query(deletePlayerQuery, [playerID]);
        // Returns the result of the deletion
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const getPlayerById = async (playerID) => {
    try {
        //Fetches player details from the database based on the provided player ID
        const sql = 'SELECT * FROM players WHERE playerID = ?';
        const result = await query(sql, [playerID]);
        return result; // Returns the player details
    } catch (error) {
        throw new Error(error);
    }
};

const updatePlayerById = async (playerID, updatedPlayer) => {
    //Updates player information in the database based on the provided player ID
    const { playerUsername, playerEmail, playerPassword, playerDob } = updatedPlayer;
    try {
        //Checks if the updated player's username or email already exists for other players
        const checkExistingQuery = 'SELECT * FROM players WHERE (playerUsername = ? OR playerEmail = ?) AND playerID != ?';
        const existingPlayer = await query(checkExistingQuery, [playerUsername, playerEmail, playerID]);

        if (existingPlayer.length > 0) {
            return { error: 'The updated player is already registered.' };
        }

        const sql = 'UPDATE players SET playerUsername = ?, playerEmail = ?, playerPassword = ?, playerDob = ? WHERE playerID = ?';
        const result = await query(sql, [playerUsername, playerEmail, playerPassword, playerDob, playerID]);
        return result; //Returns the result of the update
    } catch (error) {
        throw new Error(error);
    }
};

const getAllPlayers = async () => {
    try {
        //Fetches all players' details from the database.
        const sql = 'SELECT * FROM players';
        const result = await query(sql);
        return result; //Returns an array of player objects
    } catch (error) {
        throw new Error(error);
    }
};

const getPlayerByEmail = async (playerEmail) => {
    try {
        // Fetches player details from the database based on the provided email
        const sql = 'SELECT * FROM players WHERE playerEmail = ?';
        const result = await query(sql, [playerEmail]);
        return result; //Returns the player details
    } catch (error) {
        throw new Error(error);
    }
};

const playerLoginService = async (playerEmail, playerPassword) => {
    try {
        //Fetches player details from the database based on the provided email
        const player = await getPlayerByEmail(playerEmail);

        if (player.length > 0) {
            //Compares the provided password with the stored password
            const storedPassword = player[0].playerPassword;

            if (playerPassword === storedPassword) {
                //If login is successful, returns player details without the password
                const { playerPassword, ...playerDetails } = player[0];
                return { playerDetails };
            } else {
                console.log('Incorrect password');
                throw new Error('Incorrect password');
            }
        } else {
            console.log('Player not found');
            throw new Error('Player not found');
        }
    } catch (error) {
        // throws an error if login fails
        console.error(`Login failed: ${error.message}`);
        throw new Error(`Login failed: ${error.message}`);
    }
};

const startPlayerQuiz = async (playerID, quizID) => {
    try {
        //Sets the start time for a player when they start a quiz
        const playerStartTime = moment().format("YYYY-MM-DD HH:mm:ss");
        //Returns a message indicating the quiz start
        `Player ${playerID} started quiz ${quizID} at ${playerStartTime}`;
    } catch (error) {
        throw new Error('Error starting player quiz');
    }
};

const submitPlayerQuiz = async (playerID, quizID, selectedAnswers) => {
    try {
        //Sets the end time for a player when they submit a quiz
        const playerEndTime = moment().format("YYYY-MM-DD HH:mm:ss"); 
       
        return `Player ${playerID} submitted quiz ${quizID} with answers: ${selectedAnswers} at ${playerEndTime}`;
    } catch (error) {
        throw new Error('Error submitting player quiz');
    }
};

const changePlayerPassword = async (playerID, newPassword) => {
    try {
        //Updates the player's password in the database based on the provided player ID
      const updatePasswordQuery = 'UPDATE players SET playerPassword = ? WHERE playerID = ?';
      const result = await query(updatePasswordQuery, [newPassword, playerID]);
  
      if (result.affectedRows === 1) {
        //Returns a message indicating the password change status
        return `Password changed successfully for player ${playerID}`;
      } else {
        throw new Error('Failed to change password. Player not found or password remains the same.');
      }
    } catch (error) {
      throw new Error('Error changing player password: ' + error.message);
    }
  };

const getAllPlayerUsernames = async () => {
    try {
        //Fetches all player usernames from the database
        const sql = 'SELECT playerUsername FROM players';
        const result = await query(sql);
        //Returns an array of usernames
        return result.map(player => player.playerUsername);
    } catch (error) {
        throw new Error(error);
    }
};


module.exports = {
    registerPlayer,
    getAllPlayerUsernames, 
    deletePlayerById,
    getPlayerById,
    updatePlayerById,
    getAllPlayers,
    getPlayerByEmail,
    playerLoginService,
    startPlayerQuiz,
    submitPlayerQuiz,
    changePlayerPassword
    
};
