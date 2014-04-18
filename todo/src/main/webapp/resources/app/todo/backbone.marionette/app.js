'use strict';

var ENTER_KEY = 13;

var todoApp = new Backbone.Marionette.Application();
todoApp.addRegions({
    todoInputView : "#todoInputView",
    todosView : "#todosView"
});
todoApp.on("initialize:after", function() {
    this.todos = new todoApp.models.TodoCollection();
    todoApp.todoInputView.show(new todoApp.views.TodoInputView({
        collection : this.todos
    }));
    todoApp.todosView.show(new todoApp.views.TodoCollectionView({
        collection : this.todos
    }));
    this.todos.fetch();
});

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
            titleInput : "#title"
        },
        events : {
            "keyup @ui.titleInput" : "doInputting"
        },

        doInputting : function(event) {
            if (event.keyCode === ENTER_KEY) {
                this.collection.create({
                    title : this.ui.titleInput.val()
                });
                this.ui.titleInput.val("");
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
            "keyup @ui.titleInput" : "doEditing",
            "blur @ui.titleInput" : "finishEditing",
            "click @ui.removeBtn" : "destroy"
        },
        modelEvents : {
            "change" : "render",
            "destory" : "remove"
        },

        onRender : function() {
            this.$el.toggleClass("completed", this.model.get("completed"));
        },
        toggleCompleted : function() {
            this.model.toggleCompleted().save();
        },
        beginEditing : function() {
            this.$el.addClass("editable");
            this.ui.titleInput.focus();
        },
        doEditing : function(event) {
            if (event.keyCode === ENTER_KEY) {
                this.model.save({
                    title : this.ui.titleInput.val()
                });
                this.finishEditing();
            }
        },
        finishEditing : function() {
            this.$el.removeClass("editable");
            this.ui.titleInput.val(this.model.get("title"));
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
// Startup Application
// --------
$(function() {
    todoApp.start();
});
