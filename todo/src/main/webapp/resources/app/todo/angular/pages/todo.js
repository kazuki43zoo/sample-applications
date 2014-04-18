'use strict';

todoApp.controller("TodoCtrl", [ "$scope", "Todo", function($scope, Todo) {
    $scope.todos = Todo.query();
    $scope.editableTodo = null;

    $scope.add = function() {
        var newTodo = new Todo({
            title : $scope.titleInput,
            completed : false
        });
        newTodo.$save();
        $scope.todos.push(newTodo);
        $scope.titleInput = "";
    };
    $scope.toggleCompleted = function(todo) {
        todo.$put();
    };
    $scope.beginEditing = function(todo) {
        $scope.originalTodo = angular.extend({}, todo);
        $scope.editableTodo = todo;
    };
    $scope.doEditing = function(todo) {
        todo.$put();
        $scope.editableTodo = null;
        $scope.originalTodo = null;
    };
    $scope.finishEditing = function(todo) {
        if ($scope.editableTodo != null) {
            angular.copy($scope.originalTodo, todo);
            $scope.editableTodo = null;
            $scope.originalTodo = null;
        }
    };
    $scope.destroy = function(todo) {
        todo.$delete();
        $scope.todos.splice($scope.todos.indexOf(todo), 1);
    };

} ]);
