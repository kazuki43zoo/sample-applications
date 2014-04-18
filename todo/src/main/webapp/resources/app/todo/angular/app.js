'use strict';

// --------
// Models
// --------
var resources = angular.module("resources", [ "ngResource" ]);
resources.factory("Todo", [ "$resource", function($resource) {
    return $resource("../../../../api/v1/todos/:todoId", {
        todoId : "@todoId"
    }, {
        put : {
            method : "PUT"
        }
    });
} ]);

// --------
// Application
// --------
var todoApp = angular.module("todoApp", [ "ngRoute", "resources", "customDirectives" ]);
console.log(todoApp);

todoApp.config([ "$routeProvider", function($routeProvider) {
    $routeProvider.when("/todo", {
        templateUrl : "pages/todo.html"
    });
    $routeProvider.otherwise({
        redirectTo : "/todo"
    });
} ]);