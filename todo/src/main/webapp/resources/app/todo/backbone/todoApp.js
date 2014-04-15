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
            this.save({
                completed : !this.get("completed")
            });
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

        el : $("#todoInputView"),
        events : {
            'keypress #title' : 'input'
        },

        initialize : function() {
            this.$title = this.$("#title");
        },
        render : function() {
            return this;
        },
        input : function(e) {
            if (e.which === RETURN_KEY) {
                this.add();
            }
        },
        add : function() {
            this.model.create({
                title : this.$title.val()
            });
            this.$title.val("");
        }
    });

    TodoView = Backbone.View.extend({

        tagName : "tr",
        template : _.template($('#todoTemplate').html()),
        events : {
            "click .toggle" : "toggleCompleted",
            'click label' : 'viewEditing',
            'keypress .title' : 'edit',
            'blur .title' : 'closeEditing',
            "click .destroy" : "destroy"
        },

        initialize : function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render : function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('completed', this.model.get('completed'));
            this.$title = this.$(".title");
            return this;
        },
        toggleCompleted : function() {
            this.model.toggle();
        },
        viewEditing : function() {
            this.$el.addClass('editing');
            this.$title.focus();
        },
        edit : function(e) {
            if (e.which === RETURN_KEY) {
                this.closeEditing();
            }
        },
        closeEditing : function() {
            this.$el.removeClass('editing');
            this.model.save({
                title : this.$title.val()
            });
        },
        destroy : function() {
            this.model.destroy();
        }
    });

    TodoCollectionView = Backbone.View.extend({

        el : $("#todosView"),

        initialize : function() {
            this.listenTo(this.model, 'add', this.addOne);
            this.model.fetch();
        },
        render : function() {
            return this;
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

        initialize : function() {
            this.todos = new TodoCollection();
            this.todoInputView = new TodoInputView({
                model : this.todos
            });
            this.todosCollectionView = new TodoCollectionView({
                model : this.todos
            });
        }
    });

    // --------
    // start todo management Application
    // --------
    var todoAppView = new TodoAppView();

});