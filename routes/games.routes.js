const express = require("express");





const {

  getAllGames,
  createGame,
  updateGame,
  deleteGame,
  createReview

} = require('../controllers/games.controller');

const {gameExists} = require('../middlewares/games.middleware');

const {protectSession} = require('../middlewares/auth.middleware');

const {assignGamesToConsole} = require('../controllers/games.controller');



const gamesRouter = express.Router();



gamesRouter.post('/', protectSession, createGame);
gamesRouter.get('/', getAllGames);
gamesRouter.patch('/:id', gameExists, protectSession,  updateGame);
gamesRouter.delete('/:id', gameExists, protectSession, deleteGame);
gamesRouter.post('/reviews/:gameId',  protectSession, createReview);
gamesRouter.post('/assign-games',  assignGamesToConsole);


module.exports = { gamesRouter };