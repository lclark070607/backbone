(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// const HangmanModel = require('./models/ingredients'); //create models folder
// const HangmanView = require('./views/ingredients'); //create views folder

const GameModel = require('./models/game');
const GameView = require('./views/game');


window.addEventListener('load', function() {
   let game = new GameModel();
   let gameView = new GameView({
       el: document.querySelector('main'),
       model: game,
   })


});


},{"./models/game":2,"./views/game":3}],2:[function(require,module,exports){

Backbone.sync = function (method, model) {

    if (method === 'create' || method === 'update') {

        // if (model.get('turn') === 0) {
        //     const request = new XMLHttpRequest();
        //     //some code

        // } else {
            let request = new XMLHttpRequest();
            request.open('POST', 'https://limitless-earth-22097.herokuapp.com/');

            request.addEventListener('load', function () {
                const response = JSON.parse(request.responseText);
                model.trigger('change');

                //reset the turn
                let newTurn = model.get('turn') + 1;
                model.set('turn', newTurn);
            });

            const body = JSON.stringify({
                play: model.get('guesses.guess[guessNumber]'),

            });

            request.send(body);
        }
    }

// }



module.exports = Backbone.Model.extend({
    defaults: {
        turn: 0,
        //an array within an object
        guesses: {
        },
    },

    reset: function () {
        this.set('turn', 0);
        this.save();
    },

    //POST function, click check guess, We push the current
    //guess (after splitting string) to the guesses as an array in the guess/
    //object and then send Grace the current turn's guess only
    //in an array format.


    checkGuess: function (input) {
        let guess = input.split("").toLowerCase;

        //setting colors to numbers
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === 'r') {
                guess[i] = 1
            }

            if (guess[i] === 'o') {
                guess[i] = 2
            }
            if (guess[i] === 'y') {
                guess[i] = 3
            }
            if (guess[i] === 'w') {
                guess[i] = 4
            }
            if (guess[i] === 'b') {
                guess[i] = 5
            }
            if (guess[i] === 'g') {
                guess[i] = 6
            }
            if (guess[i] === 't') {
                guess[i] = 7
            }
            if (guess[i] === 'p') {
                guess[i] = 8
            }

        }

        guesses.push(guess);

        let guessNumber = this.get('turn');
        this.save()
    }

});
},{}],3:[function(require,module,exports){
module.exports = Backbone.View.extend({
    inititalize: function () {
        this.model.on('change', this.render, this);
    },

    events: {
        'click #check': 'addGuess',
        'click #start': 'newGame',
    },

    addGuess: function (){
        let stringGuess = document.querySelector('#guess').value;
        this.model.checkGuess(stringGuess);
    },

    newGame: function () {
        this.model.reset();
    },

    render: function (){
        //mustache
        //get Grace's data and convert to letters
        //convert play data to letter 
        //convert indicators to 'close' and 'correct'
        //display turn number using her indices 
        //display all guesses and indicators in turn order

        let parent = document.querySelector('#gameRows');
        let template = document.querySelector('#game-row');
        let child = document.createElement('li');

        child.innerHTML = Mustache.render(template.innerHTML, {

        })

    }

})
},{}]},{},[1]);
