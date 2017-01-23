
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

