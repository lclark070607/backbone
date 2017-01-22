module.exports = Backbone.View.extend({
    inititalize: function() {
        this.model.on('change, this.render, this');
    },

    events: {
       'click #check': ,
    },

    showGam


})