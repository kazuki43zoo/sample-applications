define([ 'backbone', 'app/todo2/models/Todo' ], function(Backbone, Todo) {

    return Backbone.Collection.extend({
        url : "../../../api/v1/todos",
        model : Todo
    });

});
