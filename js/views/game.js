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