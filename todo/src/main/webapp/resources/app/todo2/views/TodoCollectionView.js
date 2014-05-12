define([ 'backbone', 'jquery', 'app/todo2/views/TodoView' ], function(Backbone, $, TodoView) {

    return Backbone.View.extend({

        initialize : function() {
            this.listenTo(this.model, "add", this.addOne);
        },
        addOne : function(todo) {
            var todoView = new TodoView({
                model : todo
            });
            this.$("#todoCollection").append(todoView.render().el);
        },

    });

});
