define([ 'backbone', 'jquery', 'app/todo2/collections/TodoCollection', 'app/todo2/views/TodoInputView',
        'app/todo2/views/TodoCollectionView' ],
        function(Backbone, $, TodoCollection, TodoInputView, TodoCollectionView) {

            return Backbone.View.extend({

                el : $("#todoView"),

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

        });
