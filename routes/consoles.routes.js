const express = require("express");
const {consoleExists} = require("../middlewares/consoles.middleware");


const { 
  deleteConsole, 
  updateConsole, 
  createConsole,
   getAllConsoles, 
 } = require('../controllers/consoles.controller');

const { protectSession } = require('../middlewares/auth.middleware');

const consolesRouter = express.Router();


consolesRouter.get('/', getAllConsoles);

consolesRouter.post('/', protectSession,  createConsole);

consolesRouter.patch('/:id', consoleExists, protectSession, updateConsole);

consolesRouter.delete('/:id', consoleExists, protectSession, deleteConsole);




module.exports = { consolesRouter };