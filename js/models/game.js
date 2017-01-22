module.exports = Backbone.Model.extend({
    defaults: {
        turn: 0,
        //an array within an object
        guesses: {
        },
    },

    //POST function, click check guess, We push the current
    //guess (after splitting string) to the guesses as an array in the guess/
    //object and then send Grace the current turn's guess only
    //in an array format.


    checkGuess: function () {
        let stringGuess = document.querySelector('#guess').value;
        let guess = stringGuess.split("");
        guess.push(guess);
        let guessNumber = this.turn;
        let request = new XMLHttpRequest();
        request.open('POST', ' need url . /mastermind-check');
        let body = JSON.stringify()({
            data: guesses.guess[guessNumber],

        })

//when we get the answer back, will render the info to the DOM
//and clear out the guess input box.  We will user index to increase the turn default.
        document.querySelector('#guess').value = '';
        request.send(body);
    }

})