'use strict';

var ENTER_KEY = 13;

var todoApp = todoApp || {};

$(function() {

    // --------
    // Models
    // --------

    todoApp.Todo = Backbone.Model.extend({

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

    todoApp.TodoCollection = Backbone.Collection.extend({
        url : "../../../../api/v1/todos",
        model : todoApp.Todo
    });

    // --------
    // Views
    // --------
    todoApp.TodoInputView = Backbone.View.extend({

        events : {
            "keyup #title" : "doInputting"
        },

        initialize : function() {
            this.$titleInput = this.$("#title");
        },
        doInputting : function(event) {
            if (event.keyCode === ENTER_KEY) {
                this.model.create({
                    title : this.$titleInput.val()
                });
                this.$titleInput.val("");
            }
        },

    });

    todoApp.TodoView = Backbone.View.extend({

        tagName : "tr",
        template : _.template($("#todoTemplate").html()),
        events : {
            "click .toggle" : "toggleCompleted",
            "click label" : "beginEditing",
            "keyup .title" : "doEditing",
            "blur .title" : "finishEditing",
            "click .destroy" : "destroy"
        },

        initialize : function() {
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "destroy", this.remove);
        },
        render : function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass("completed", this.model.get("completed"));
            this.$titleInput = this.$(".title");
            return this;
        },
        toggleCompleted : function() {
            this.model.toggleCompleted().save();
        },
        beginEditing : function() {
            this.$el.addClass("editable");
            this.$titleInput.focus();
        },
        doEditing : function(event) {
            if (event.keyCode === ENTER_KEY) {
                this.model.save({
                    title : this.$titleInput.val()
                });
                this.finishEditing();
            }
        },
        finishEditing : function() {
            this.$el.removeClass("editable");
            this.$titleInput.val(this.model.get("title"));
        },
        destroy : function() {
            this.model.destroy();
        }

    });

    todoApp.TodoCollectionView = Backbone.View.extend({

        initialize : function() {
            this.listenTo(this.model, "add", this.addOne);
        },
        addOne : function(todo) {
            var todoView = new todoApp.TodoView({
                model : todo
            });
            this.$("#todoCollection").append(todoView.render().el);
        },

    });

    todoApp.TodoAppView = Backbone.View.extend({

        el : $("#todoApp"),

        render : function() {
            this.todos = new todoApp.TodoCollection();
            this.todoInputView = new todoApp.TodoInputView({
                el : $("#todoInputView"),
                model : this.todos
            });
            this.todoInputView.render();
            this.todosCollectionView = new todoApp.TodoCollectionView({
                el : $("#todosView"),
                model : this.todos
            });
            this.todosCollectionView.render();
            this.todos.fetch();
        }

    });

    // --------
    // start todo management Application
    // --------
    var todoAppView = new todoApp.TodoAppView();
    todoAppView.render();

});