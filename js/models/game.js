
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