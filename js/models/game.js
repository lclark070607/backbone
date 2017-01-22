
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
            model.set('indicators', response.indicators);
            model.trigger('change');

            //reset the turn
            let newTurn = model.get('turn') + 1;
            model.set('turn', newTurn);
        });

        const body = JSON.stringify({
            play: model.get('numberGuesses.guess[guessNumber]'),

        });

        request.send(body);
    }
}

// }



module.exports = Backbone.Model.extend({
    defaults: {
        turn: 0,
        //an array within an object
        colorGuesses: {
        },

        numberGuesses: {
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
            colorGuesses.push(guess);

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

            numberGuesses.push(guess);
            let guessNumber = this.get('turn');
            this.save()
        }
    }

});

