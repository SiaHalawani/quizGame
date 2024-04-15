const express = require('express');
const {
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
  submitPlayerQuizController
} = require('../controllers/players.controller');
const { validateRegisterPlayer, validateUpdatePlayer, validateChangePlayerPassword } 
= require('../validation/players.validator');

const router = express.Router();

router.get('/:id', getPlayerByIdController);
router.get('/', getAllPlayerUsernamesController);
router.post('/register', validateRegisterPlayer, registerPlayerController);
router.delete('/:playerID', deletePlayerByIdController);
router.put('/:playerID', validateUpdatePlayer, updatePlayerByIdController);
router.put('/password/:playerID', validateChangePlayerPassword, changePlayerPasswordController);
router.get('/email/:playerEmail', getPlayerByEmailController);
router.get('/player/:playerInfo', getAllPlayersController);
router.post('/login', playerLoginController);
router.post('/quiz/start', startPlayerQuizController);
router.post('/quiz/submit', submitPlayerQuizController);

module.exports = router;