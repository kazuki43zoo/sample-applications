define([ 'backbone', 'jquery' ], function(Backbone, $) {

    return Backbone.View.extend({

        events : {
            "keyup #title" : "doInputting"
        },

        initialize : function() {
            this.$titleInput = this.$("#title");
        },
        doInputting : function(event) {
            if (event.keyCode === 13) {
                this.model.create({
                    title : this.$titleInput.val()
                });
                this.$titleInput.val("");
            }
        },

    });

});
