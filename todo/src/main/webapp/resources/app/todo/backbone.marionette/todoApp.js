var RETURN_KEY = 13;

$(function() {

    var todoApp = new Backbone.Marionette.Application();

    // --------
    // Models
    // --------
    todoApp.module("models", function(models) {
        models.Todo = Backbone.Model.extend({

            idAttribute : "todoId",
            defaults : function() {
                return {
                    title : null,
                    completed : false
                };
            },

            toggle : function() {
                this.save({
                    completed : !this.get("completed")
                });
            }
        });

        models.TodoCollection = Backbone.Collection.extend({
            url : "../../../../api/v1/todos",
            model : models.Todo
        });

    });

    // --------
    // Views
    // --------
    todoApp.module("views", function(views) {
        views.TodoInputView = Marionette.ItemView.extend({
            el : $("#todoInputView"),
            template : "#inputTemplate",
            ui : {
                $title : "#title"
            },
            events : {
                "keypress #title" : "input"
            },
            input : function(e) {
                if (e.which === RETURN_KEY) {
                    this.add();
                }
            },
            add : function() {
                this.model.create({
                    title : this.ui.$title.val()
                });
                this.ui.$title.val("");
            }
        });

        views.TodoView = Marionette.ItemView.extend({
            tagName : "tr",
            template : "#todoTemplate",
            ui : {
                $title : ".title"
            },
            events : {
                "click .toggle" : "toggleCompleted",
                "click label" : "viewEditing",
                "keypress .title" : "edit",
                "blur .title" : "closeEditing",
                "click .destroy" : "destroy"
            },
            modelEvents : {
                "change" : "render",
                "destory" : "remove"
            },
            onRender : function() {
                this.$el.toggleClass('completed', this.model.get('completed'));
            },
            toggleCompleted : function() {
                this.model.toggle();
            },
            viewEditing : function() {
                this.$el.addClass('editing');
                this.ui.$title.focus();
            },
            edit : function(e) {
                if (e.which === RETURN_KEY) {
                    this.closeEditing();
                }
            },
            closeEditing : function() {
                this.$el.removeClass('editing');
                this.model.save({
                    title : this.ui.$title.val()
                });
            },
            destroy : function() {
                this.model.destroy();
            }

        });

        views.TodoCollectionView = Backbone.Marionette.CompositeView.extend({

            el : $("#todosView"),
            template : "#todosTemplate",
            itemView : views.TodoView,
            itemViewContainer : "#todoCollection"

        });

    });

    // --------
    // start todo management Application
    // --------
    // var todoAppView = new TodoAppView();
    todoApp.on('initialize:after', function() {

        this.todos = new todoApp.models.TodoCollection();
        this.todoInputView = new todoApp.views.TodoInputView({
            model : this.todos
        });
        this.todoInputView.render();
        this.todosCollectionView = new todoApp.views.TodoCollectionView({
            collection : this.todos
        });
        this.todosCollectionView.render();
        this.todos.fetch();

    });

    todoApp.start();

});