const express = require("express");

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/users.controller");

const {
  createUserValidators,
} = require("../middlewares/validators.middleware");

const {
  protectSession,
  protectUserAccount,
} = require("../middlewares/auth.middleware");

const {userExists} = require("../middlewares/users.middleware");

const usersRouter = express.Router();

usersRouter.post('/signup', createUserValidators, createUser);

usersRouter.post('/login', login);

usersRouter.patch('/:id', protectSession ,userExists, protectUserAccount,  updateUser);

usersRouter.delete('/:id', userExists, protectSession, protectUserAccount, deleteUser);

usersRouter.get('/', protectSession, getAllUsers);


module.exports = { usersRouter };