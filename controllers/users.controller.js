const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { User } = require("../models/user.model");
const { Review } = require("../models/review.model");

const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");



dotenv.config({ path: "./config.env" });

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({where: { status: "active" }, 
  include: [{ model: Review }] })
     
  res.status(200).json({
    status: "success",
    users,
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const salt = await bycript.genSalt(12);
  const hashedPassword = await bycript.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    newUser,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const {user} = req;
 
  const { name, email} = req.body; 

  await user.update({name, email});

  res.status(200).json({ status: "success" })

})


const deleteUser = catchAsync(async (req, res, next) => {
  const {user} = req;

  await user.update({ status: "disabled"})

  res.status(204).json({ status: "success" })

})

const login = catchAsync(async (req, res, next) => {
  const {email, password} = req.body;

  const user = await User.findOne({ where: {email, status: "active" }})  
  if(!user){
    return next(new AppError('invalid credentials', 400))
  }

  const isPasswordValid = await bycript.compare(password, user.password)

  if(!isPasswordValid){
    return next(new AppError('invalid credentials', 400))
  }

  const token = await jwt.sign({ id: user.id}, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })

  res.status(200).json({
    status: "success",
    token,
  });

});






module.exports = { createUser, getAllUsers, updateUser, login, deleteUser };
