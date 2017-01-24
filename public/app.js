(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


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


},{"./models/game":2,"./views/game":3}],2:[function(require,module,exports){

Backbone.sync = function (method, model) {

    if (method === 'create' || method === 'update') {

        // if something to trigger push to new game url



        let request = new XMLHttpRequest();
        request.open('POST', 'https://limitless-earth-22097.herokuapp.com/');
        request.setRequestHeader('Content-type', 'application/json');

        request.addEventListener('load', function () {
            let response = JSON.parse(request.responseText);
            console.log(response);

            let indicators = model.get('indicators')
            indicators.push(response.indicator);
            model.set('indicators', indicators);



            // push into indicators array instead of replacing whole array

            model.trigger('change');
            let newTurn = model.get('turn') + 1;
            model.set('turn', newTurn);
        });

        console.log(model.get('numberGuesses')[model.get('turn')])

        let body = JSON.stringify(
            model.get('numberGuesses')[model.get('turn')]
        );

        request.send(body);
    };

};


module.exports = Backbone.Model.extend({
    defaults: {
        turn: 0,
        colorGuesses: [],
        numberGuesses: [],
        indicators: [],

       

    },

    reset: function () {
        this.set('turn', 0);
        // reset all defaults to empty 
        this.save();
    },

    // when get check  is clicked, it calls check Guess.  We push the current
    // guess (after splitting string) to the gueses as an array in the guesses 
    // object and then send Grace the current turn's guess only
    // in an array format.  

    checkGuess: function (input) {
        console.log(this.get('indicators'));
        let colorGuesses = this.get('colorGuesses');
        let guess1 = input.split("");
        let guess2 = input.split("");
        colorGuesses.push(guess1);
        this.set('colorGuesses', colorGuesses);
        console.log(colorGuesses);
        // this.trigger('change');

        //   converting our color letter into a number for post to Grace

        for (let i = 0; i < guess2.length; i++) {
            if (guess2[i] === 'r') {
                guess2[i] = 1
            }
            if (guess2[i] === 'o') {
                guess2[i] = 2
            }
            if (guess2[i] === 'y') {
                guess2[i] = 3
            }
            if (guess2[i] === 'w') {
                guess2[i] = 4
            }
            if (guess2[i] === 'b') {
                guess2[i] = 5
            }
            if (guess2[i] === 'g') {
                guess2[i] = 6
            }
            if (guess2[i] === 't') {
                guess2[i] = 7
            }
            if (guess2[i] === 'p') {
                guess2[i] = 8
            }
        }
        let numberGuesses = this.get('numberGuesses')
        numberGuesses.push(guess2);
        this.set('numberGuesses', numberGuesses);
        this.save();
    }

});
},{}],3:[function(require,module,exports){
module.exports = Backbone.View.extend({
    initialize:  function(){
        this.model.on('change', this.render, this);
    },

    events:{
        'click #check': 'addGuess',
        'click #start': 'newGame',
    },

    addGuess: function(){
        let stringGuess = this.el.querySelector('#guess').value.toLowerCase();
        this.model.checkGuess(stringGuess);
    },

    newGame: function(){
        this.model.reset();
    },

    render: function (){
    // Get Grace's data.  Clear the DOM.  Convert 'play' data to letters
    // Need to have her structure from her response.  Don't have that yet.
    // Convert indicators to 'close' and 'correct'
    // Display Turn number using her indices
    // Display all guesses and indicators in turn order
    
     this.el.querySelector('#guess').value = '';
     this.el.querySelector('#rowDisplay').innerHTML= '';

    let parent = this.el.querySelector('#rowDisplay');
    let template = document.querySelector('#game-row');
    
    // child is where this innerHTML goes:

    for (let i=0; i<this.model.get('colorGuesses').length; i++){
        let guess = this.model.get('colorGuesses')[i];
        let indicator = this.model.get('indicators')[i];

        let child = document.createElement('div');
        child.setAttribute('id', 'row');
        parent.appendChild(child);

        child.innerHTML = Mustache.render(template.innerHTML, {
             
            turnNumber: this.model.get('turn'),
            
            pegs0: indicator[0],
            pegs1: indicator[1],
            pegs2: indicator[2],
            pegs3: indicator[3],

            position0: guess[0],
            position1: guess[1],
            position2: guess[2],
            position3: guess[3],
        
             })
        }
    }

})
},{}]},{},[1]);
