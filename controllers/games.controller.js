

const { catchAsync } = require("../utils/catchAsync.util");





const {Review } = require("../models/review.model");
const {Game} = require("../models/game.model");
const { GamesInConsole } = require("../models/gamesInConsole.model");
const { Console } = require("../models/console.model");


const getAllGames = catchAsync(async (req, res, next) => {
const games = await Game.findAll({
  include: [
    {model: Review},
     {model: Console}
  ] 
    
   

});

  res.status(200).json({
    status: "success",
    data: {games}
    
  })

});


const createGame = catchAsync(async (req, res, next) => {
  const {title, genre} = req.body;

  const newGame = await Game.create({
    title,
    genre,

  });

  res.status(201).json({
    status: "success",
    newGame,
  });
});



const updateGame = catchAsync(async (req, res, next) => {
  const {game} = req;


  await game.update({ title })
    
  res.status(204).json({ status: "success" })

})


const deleteGame = catchAsync(async (req, res, next) => {
  const {game} = req

  await game.update({status: "disabled"}) 
  
  res.status(204).json({ status: "success" })

})



const createReview = catchAsync(async (req, res, next) => {
  const {} = req
  const { Comment, gameId, userId} = req.body;

  const newReview = await Review.create({
    Comment,
    gameId,
    userId,
  });

  res.status(201).json({
    status: "success",
    newReview,
    userId,
    gameId,
  
   
   
  });
})




const assignGamesToConsole = catchAsync(async (req, res, next) => {
	const { gameId, consoleId } = req.body;

	const gamesInConsole = await GamesInConsole.create({ consoleId, gameId });

	res.status(201).json({
		status: 'success',
		gamesInConsole,
	});
});



module.exports = { createGame, getAllGames, updateGame, deleteGame, createReview, assignGamesToConsole};

