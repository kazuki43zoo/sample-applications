var RETURN_KEY = 13;

var todoApp = new Backbone.Marionette.Application();
todoApp.on("initialize:before", function() {
    this.todos = new todoApp.models.TodoCollection();
    this.todoInputView = new todoApp.views.TodoInputView({
        el : $("#todoInputView"),
        collection : this.todos
    });
    this.todosCollectionView = new todoApp.views.TodoCollectionView({
        el : $("#todosView"),
        collection : this.todos
    });
}).on("initialize:after", function() {
    this.todoInputView.render();
    this.todosCollectionView.render();
    this.todos.fetch();
});

$(function() {
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

            toggleCompleted : function() {
                return this.set("completed", !this.get("completed"));
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

            template : "#inputTemplate",
            ui : {
                title : "#title"
            },
            events : {
                "keypress @ui.title" : "doInputting"
            },

            doInputting : function(event) {
                if (event.which === RETURN_KEY) {
                    this.collection.create({
                        title : this.ui.title.val()
                    });
                    this.ui.title.val("");
                }
            }

        });

        views.TodoView = Marionette.ItemView.extend({

            tagName : "tr",
            template : "#todoTemplate",
            ui : {
                toggle : ".toggle",
                titleInput : ".title",
                titleLabel : "label",
                removeBtn : ".destroy",
            },
            events : {
                "click @ui.toggle" : "toggleCompleted",
                "click @ui.titleLabel" : "beginEditing",
                "keypress @ui.titleInput" : "doEditing",
                "blur @ui.titleInput" : "finishEditing",
                "click @ui.removeBtn" : "destroy"
            },
            modelEvents : {
                "change" : "render",
                "destory" : "remove"
            },

            onRender : function() {
                this.$el.toggleClass('completed', this.model.get('completed'));
            },
            toggleCompleted : function() {
                this.model.toggleCompleted().save();
            },
            beginEditing : function() {
                this.$el.addClass('editable');
                this.ui.titleInput.focus();
            },
            doEditing : function(event) {
                if (event.which === RETURN_KEY) {
                    this.finishEditing();
                }
            },
            finishEditing : function() {
                this.$el.removeClass('editable');
                this.model.save({
                    title : this.ui.titleInput.val()
                });
            },
            destroy : function() {
                this.model.destroy();
            }

        });

        views.TodoCollectionView = Backbone.Marionette.CompositeView.extend({

            template : "#todosTemplate",
            itemView : views.TodoView,
            itemViewContainer : "#todoCollection"

        });

    });

    // --------
    // start todo management Application
    // --------
    todoApp.start();

});