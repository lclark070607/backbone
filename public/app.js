(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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
            let response = JSON.parse(request.responseText);
            model.set('indicators', response);
            model.trigger('change');
            let newTurn = model.get('turn') + 1;
            model.set('turn', newTurn);
        });

        console.log(model.get('numberGuesses')[model.get('turn')]);
        const body = JSON.stringify(
           model.get('numberGuesses')[model.get('turn')]

        );

        // let newGame = new XMLHttpRequest();
        // newGame.open('POST', 'url');
        request.send(body);
    }
}

module.exports = Backbone.Model.extend({
    defaults: {
        turn: 0,
        //an array within an object
        colorGuesses: [],
        numberGuesses: [],
        indicators: [],
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

        let colorGuesses = this.get('colorGuesses')
        let guess = input.split("");
        colorGuesses.push(guess);
        this.set('colorGuesses', colorGuesses);

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

        let numberGuesses = this.get('numberGuesses')
        this.get('numberGuesses').push(guess);
        let guessNumber = this.get('turn');
        this.save()
    }

});

//frontend sends potential answer
//backend sends 


},{}],3:[function(require,module,exports){
module.exports = Backbone.View.extend({
    inititalize: function () {
        this.model.on('change', this.render, this);
    },

    events: {
        'click #check': 'addGuess',
        'click #start': 'newGame',
    },

    addGuess: function () {
        let stringGuess = document.querySelector('#guess').value.toLowerCase();
        this.model.checkGuess(stringGuess);
    },

    newGame: function () {
        this.model.reset();
    },

    render: function () {
        //mustache
        //get Grace's data and convert to letters
        //convert play data to letter 
        //convert indicators to 'close' and 'correct'
        //display turn number using her indices 
        //display all guesses and indicators in turn order
        this.el.querySelector('#guess').value = '';
        this.el.querySelector('#rowDisplay').innerHTML = '';

        let parent = this.el.querySelector('#rowDisplay');
        let template = document.querySelector('#game-row');


        for (let i = 0; i < this.model.get('colorGuesses').length; i++) {
            let guess = this.model.get('colorGuesses')[i];
            let indicator = this.model.get('indicators')[i];

            let child = document.createElement('div');
            child.setAttribute('id', 'row');
            parent.appendChild(child);

            child.innerHTML = Mustache.render(template.innerHTML, {
                // turnNumber: model.get('colorGuesses.guess[0]'),
                position0: guess[0],
                position1: guess[1],
                position2: guess[2],
                position3: guess[3],

            })

        }
    }

    })

//make sure check Guess button only functions when 4 letters are input
//make sure check Guess button doesn't work when empty input box is returned
},{}]},{},[1]);
