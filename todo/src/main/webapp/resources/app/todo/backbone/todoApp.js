var RETURN_KEY = 13;

$(function() {

    // --------
    // Models
    // --------

    Todo = Backbone.Model.extend({

        idAttribute : "todoId",
        defaults : function() {
            return {
                title : null,
                completed : false
            };
        },

        toggle : function() {
            return this.set("completed", !this.get("completed"));
        }

    });

    TodoCollection = Backbone.Collection.extend({
        url : "../../../../api/v1/todos",
        model : Todo
    });

    // --------
    // Views
    // --------
    TodoInputView = Backbone.View.extend({

        events : {
            "keypress #title" : "doInputting"
        },

        initialize : function() {
            this.$title = this.$("#title");
        },
        doInputting : function(event) {
            if (event.which === RETURN_KEY) {
                this.model.create({
                    title : this.$title.val()
                });
                this.$title.val("");
            }
        },

    });

    TodoView = Backbone.View.extend({

        tagName : "tr",
        template : _.template($("#todoTemplate").html()),
        events : {
            "click .toggle" : "toggleCompleted",
            "click label" : "beginEditing",
            "keypress .title" : "doEditing",
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
            this.$title = this.$(".title");
            return this;
        },
        toggleCompleted : function() {
            this.model.toggle().save();
        },
        beginEditing : function() {
            this.$el.addClass("editable");
            this.$title.focus();
        },
        doEditing : function(event) {
            if (event.which === RETURN_KEY) {
                this.finishEditing();
            }
        },
        finishEditing : function() {
            this.$el.removeClass("editable");
            this.model.save({
                title : this.$title.val()
            });
        },
        destroy : function() {
            this.model.destroy();
        }

    });

    TodoCollectionView = Backbone.View.extend({

        initialize : function() {
            this.listenTo(this.model, 'add', this.addOne);
        },
        addOne : function(todo) {
            var todoView = new TodoView({
                model : todo
            });
            this.$("#todoCollection").append(todoView.render().el);
        },

    });

    TodoAppView = Backbone.View.extend({

        el : $("#todoApp"),

        render : function() {
            this.todos = new TodoCollection();
            this.todoInputView = new TodoInputView({
                el : $("#todoInputView"),
                model : this.todos
            });
            this.todoInputView.render();
            this.todosCollectionView = new TodoCollectionView({
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
    var todoAppView = new TodoAppView();
    todoAppView.render();

});