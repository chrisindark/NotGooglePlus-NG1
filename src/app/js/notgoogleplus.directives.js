(function () {
    // @name formValidation
    // @desc Directive function to show errors in forms
    angular
        .module('notgoogleplus.directives')
        .directive('myFormValidation', myFormValidation);

    myFormValidation.$inject = ['$document'];

    function myFormValidation ($document) {
        return {
            restrict: 'E',
            scope: {
                form: '=',
                errors: '='
            },
            link: function(scope, element, attrs) {
                scope.$watch('errors', function (errors) {
                    if (Object.keys(errors).length) {
                        for(var key in errors) {
                            scope.form[key].$error[key] = errors[key];
                        }
                    }
                });
            }
        }
    }

    angular
        .module('notgoogleplus.directives')
        .directive('myNgRepeatStarted', myNgRepeatStarted);

    myNgRepeatStarted.$inject = ['$timeout'];

    function myNgRepeatStarted($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                // check if scope is first in the ng-repeat list
                if (scope.$first) {
                    element.parent().css('visibility', 'hidden');
                }
            }
        }
    }

})();
