const { validationResult } = require('express-validator');
const {
  registerPlayer,
  getPlayerById,
  deletePlayerById,
  updatePlayerById,
  getAllPlayers,
  getPlayerByEmail,
  playerLoginService,
  startPlayerQuiz,
  submitPlayerQuiz,
  changePlayerPassword,
  getAllPlayerUsernames
} = require('../services/players.service');

// const { validateRegisterPlayer, 
//   validateUpdatePlayer, 
//   validateChangePlayerPassword } 
//   = require('../validation/players.validator');

const getPlayerByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const player = await getPlayerById(id);

    if (player.length > 0) {
      res.status(200).json(player);
    } else {
      res.status(404).json({ message: `Player with ID ${id} not found` });
    }
  } catch (error) {
    console.error("Error in getPlayerByIdController: ", error);
    res.status(500).json({ message: 'An error occurred while fetching the player' });
  }
};

const getAllPlayerUsernamesController = async (req, res) => {
  try {
    const usernames = await getAllPlayerUsernames();

    if (usernames.length > 0) {
      res.status(200).json(usernames);
    } else {
      res.status(404).json({ message: 'No players found' });
    }
  } catch (error) {
    console.error('Error in getAllPlayerUsernamesController: ', error);
    res.status(500).json({ message: 'An error occurred while fetching players' });
  }
};

const registerPlayerController = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { playerUsername, playerEmail, playerPassword, playerDob } = req.body;
    const result = await registerPlayer(playerUsername, playerEmail, playerPassword, playerDob);

    if (result.error === 'The player is already registered') {
      res.status(409).json({ message: 'The player is already registered' });
    } else if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Player registered successfully' });
    } else {
      res.status(500).json({ message: 'Player registration failed' });
    }
  } catch (error) {
    console.error("Error in registerPlayerController: ", error);
    res.status(500).json({ message: 'An error occurred during player registration' });
  }
};

const deletePlayerByIdController = async (req, res) => {
  const { playerID } = req.params;

  try {
    const result = await deletePlayerById(playerID);

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Player deleted successfully.' });
    } else {
      res.status(404).json({ message: `Player with ID ${playerID} not found` });
    }
  } catch (error) {
    console.error("Error in deletePlayerByIdController: ", error);
    res.status(500).json({ message: 'An error occurred during player deletion' });
  }
};

const updatePlayerByIdController = async (req, res) => {
  const { playerID } = req.params;
  const { playerUsername, playerEmail, playerPassword } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await updatePlayerById(playerID, { playerUsername, playerEmail, playerPassword });

    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Player updated successfully.' });
    } else {
      res.status(404).json({ message: `Player with ID ${playerID} not found.` });
    }
  } catch (error) {
    console.error("Error in updatePlayerByIdController: ", error);
    res.status(500).json({ message: 'An error occurred during player update' });
  }
};

const changePlayerPasswordController = async (req, res) => {
  const { playerID } = req.params;
  const { newPassword } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await changePlayerPassword(playerID, newPassword);

    if (result.message === 'Password changed successfully') {
      res.status(200).json({ message: 'Password changed successfully' });
    } else {
      res.status(404).json({ message: `Player with ID ${playerID} not found - Password change failed` });
    }
  } catch (error) {
    console.error("Error in changePlayerPasswordController: ", error);
    res.status(500).json({ message: 'An error occurred during password change' });
  }
};

const getAllPlayersController = async (req, res) => {
  try {
    const players = await getAllPlayers();
    if (players.length > 0) {
      res.status(200).json(players);
    } else {
      res.status(404).json({ message: 'No players found' });
    }
  } catch (error) {
    console.error("Error in getAllPlayersController: ", error);
    res.status(500).json({ message: 'An error occurred while fetching players' });
  }
};

const getPlayerByEmailController = async (req, res) => {
  const { playerEmail } = req.params;

  try {
    const player = await getPlayerByEmail(playerEmail);
    if (player.length > 0) {
      res.status(200).json(player);
    } else {
      res.status(404).json({ message: "Player not found" });
    }
  } catch (error) {
    console.error("Error in getPlayerByEmailController: ", error);
    res.status(500).json({ message: "An error occurred during fetching player" });
  }
};

const playerLoginController = async (req, res) => {
  const { playerEmail, playerPassword } = req.body;

  try {
    const playerDetails = await playerLoginService(playerEmail, playerPassword);
    if (playerDetails) {
      const token = generateToken({ playerId: playerDetails.playerID, role: 'player' });

      req.session.playerID = playerDetails.playerID;
      req.session.user = {
        playerID: playerDetails.playerID,
        role: 'player'
      };

      req.session.save(err => {
        if (err) {
          console.error(`Error saving session: ${err.message}`);
          res.status(500).send('Internal server error');
        } else {
          res.render("playerPage", { player: playerDetails, token });
        }
      });
    } else {
      const errorMessage = 'Invalid email or password';
      res.render("playerPage", { player: { playerDetails: { playerID: null }, errorMessage } });
    }
  } catch (error) {
    console.error(`Player login failed: ${error.message}`);
    res.status(401).json({ message: 'Login failed', error: error.message });
  }
};

const startPlayerQuizController = async (req, res) => {
   
        const { playerID, quizID } = req.body;
      
        try {
         
          if (!playerID || !quizID) {
            return res.status(400).json({ message: 'Player ID and Quiz ID are required' });
          }
      
          // Implement logic to start the quiz for the player
          const quizStartResult = await startPlayerQuiz(playerID, quizID);
      
          if (quizStartResult === 'Quiz started') {
            res.status(200).json({ message: 'Quiz started successfully for player' });
          } else if (quizStartResult === 'Quiz already started') {
            res.status(409).json({ message: 'Quiz is already started for this player' });
          } else {
            res.status(500).json({ message: 'Failed to start quiz for player' });
          }
        } catch (error) {
          console.error("Error in startPlayerQuizController: ", error);
          res.status(500).json({ message: 'An error occurred during quiz start for player' });
        }
      
      
};

const submitPlayerQuizController = async (req, res) => {
   
        const { playerID, quizID, selectedAnswers } = req.body;
      
        try {
          // Check if playerID, quizID, and selectedAnswers are provided
          if (!playerID || !quizID || !selectedAnswers) {
            return res.status(400).json({ message: 'Player ID, Quiz ID, and Selected Answers are required' });
          }
      
          // Implement logic to submit the quiz for the player
          const quizSubmissionResult = await submitPlayerQuiz(playerID, quizID, selectedAnswers);
      
          if (quizSubmissionResult === 'Quiz submitted') {
            res.status(200).json({ message: 'Quiz submitted successfully for player' });
          } else if (quizSubmissionResult === 'Quiz already submitted') {
            res.status(409).json({ message: 'Quiz is already submitted for this player' });
          } else {
            res.status(500).json({ message: 'Failed to submit quiz for player' });
          }
        } catch (error) {
          console.error("Error in submitPlayerQuizController: ", error);
          res.status(500).json({ message: 'An error occurred during quiz submission for player' });
        }
      
};

module.exports = {
  getPlayerByIdController,
  getAllPlayerUsernamesController,
  registerPlayerController,
  deletePlayerByIdController,
  updatePlayerByIdController,
  changePlayerPasswordController,
  getAllPlayersController,
  getPlayerByEmailController,
  playerLoginController,
  startPlayerQuizController,
  submitPlayerQuizController,

};
