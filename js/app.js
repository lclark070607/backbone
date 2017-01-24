

const GameModel = require('./models/game');
const GameView = require('./views/game');

window.addEventListener('load', function (){
    let game = new GameModel();
    let gameView = new GameView({
        el: document.querySelector('main'),
        model: game,
    })
    
    let reset = document.querySelector('#start');
    reset.addEventListener('click', function(){
        let request = new XMLHttpRequest();
        request.open('POST', 'https://limitless-earth-22097.herokuapp.com/new-game');
        request.setRequestHeader('Content-type', 'application/json');

         model.trigger('change');
        
        request.send();
    })
})

