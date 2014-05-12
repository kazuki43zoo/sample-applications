/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
    baseUrl : '../..',
    shim : {
        underscore : {
            exports : '_'
        },
        backbone : {
            deps : [ 'underscore', 'jquery' ],
            exports : 'Backbone'
        },
        handlebars : {
            exports : 'Handlebars'
        },
        bootstrap : [ 'jquery' ]
    },
    paths : {
        jquery : 'vendor2/jquery/jquery.min',
        underscore : 'vendor2/lodash/dist/lodash.min',
        backbone : 'vendor2/backbone/backbone',
        handlebars : 'vendor2/handlebars/handlebars.min',
        bootstrap : 'vendor2/bootstrap/dist/js/bootstrap.min',
        text : 'vendor2/requirejs-text/text'
    }
});

define([ 'app/todo2/views/TodoAppView' ], function(TodoAppView) {

    $(function() {
        
        var todoAppView = new TodoAppView();
        todoAppView.render();

    });

});