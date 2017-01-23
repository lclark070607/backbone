
const GameModel = require('./models/game');
const GameView = require('./views/game');


window.addEventListener('load', function() {
   let game = new GameModel();
   let gameView = new GameView({
       el: document.querySelector('main'),
       model: game,
   })

});

