define([ 'backbone' ], function(Backbone) {

    return Backbone.Model.extend({

        idAttribute : "todoId",
        defaults : function() {
            return {
                title : null,
                completed : false
            };
        },

        toggleCompleted : function() {
            return this.set("completed", !this.get("completed"));
        }

    });

});