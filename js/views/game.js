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