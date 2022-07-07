const { app } = require('./app');


const { User } = require('./models/user.model');
const {Game} = require('./models/game.model');
const {Review} = require('./models/review.model');
const {Console} = require('./models/console.model');


const { db } = require('./utils/database.util');



User.hasMany(Review, {foreignKey: 'userId'});
Review.belongsTo(User);

Game.hasMany(Review, {foreignKey: 'gameId'});
Review.belongsTo(Game)

Game.belongsToMany(Console, {through: 'gamesInConsole'}, {foreignKey: 'gameId'});
Console.belongsToMany(Game, {through: 'gamesInConsole'} ,{foreignKey: 'consoleId'});



db.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));



db.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));

app.listen(4000, () => {
	console.log('Express app running!!');
});
