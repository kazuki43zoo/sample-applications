'use strict';

// --------
// Custom Directives
// --------
var customDirectives = angular.module("customDirectives", []);

customDirectives.directive("ngCustomFocus", function($timeout) {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.ngCustomFocus, function(needFocus) {
            if (needFocus) {
                $timeout(function() {
                    elem[0].focus();
                }, 0, false);
            }
        });
    };
});
customDirectives.directive("ngCustomEnter", function() {
    var ENTER_KEY = 13;
    return function(scope, elem, attrs) {
        elem.bind("keyup", function(event) {
            if (event.keyCode === ENTER_KEY) {
                scope.$apply(attrs.ngCustomEnter);
            }
        });
    };
});
