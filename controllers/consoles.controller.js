const {catchAsync} = require('../utils/catchAsync.util');


const {Console} = require('../models/console.model');
const { GamesInConsole } = require('../models/gamesInConsole.model');



const createConsole = catchAsync(async (req, res, next) => {
  const {name, company} = req.body;
  
  const newConsole = await Console.create({
    name,
    company,
  })
  
  res.status(201).json({
    status: "success",
    newConsole,
  })
});


const getAllConsoles = catchAsync(async (req, res, next) => {
  const consoles = await Console.findAll({
   
  });
  
  res.status(200).json({
    status: "success",
    consoles,
  })
});



const updateConsole = catchAsync(async (req, res, next) => {
  const {console} = req;
  const {name} = req.body;
  
  await console.update({name})
  
  res.status(204).json({ status: "success" })
  
});

const deleteConsole = catchAsync(async (req, res, next) => {
  const {console} = req;
  
  await console.update({status: "disabled"}) 
  
  res.status(204).json({ status: "success" })
  
});





module.exports = {deleteConsole, updateConsole, getAllConsoles, createConsole};