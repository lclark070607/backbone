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
        document.querySelector('#guess').value = '';
        document.querySelector('#gameRows'.value = '');

        let parent = document.querySelector('#gameRows');
        let template = document.querySelector('#game-row');
        let child = document.createElement('li');

        child.innerHTML = Mustache.render(template.innerHTML, {
            turnNumber:
            position0:
            position1:
            position2:
            position3:
            
        })


    }

})