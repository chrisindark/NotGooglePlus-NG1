(function () {
    angular
        .module('notgoogleplus.directives')
        .directive('myAutoGrowDir', myAutoGrowDir);

    myAutoGrowDir.$inject = ['$timeout'];

    // directive to be used with input elements and textareas
    function myAutoGrowDir ($timeout) {
        return {
            restrict: 'A',
            scope: {
                agdMessage: '=',
                // take the length of chars left
                agdCharsLeft: '=',
                // take the submit disable option flag
                agdDisableSubmit: '='
            },
            link: function (scope, element, attrs) {
                // added watch event to check for changes
                // to message in the controller
                scope.$watch('agdMessage', function (newValue, oldValue) {
                    if (newValue) {
                        resizeElement();
                    }
                });

                function resizeElement () {
                    $timeout(function () {
                        if (element[0].style.height === '500px') {
                            // do nothing
                        } else if (element[0].scrollHeight < 500) {
                            element[0].style.height = element[0].scrollHeight + 'px';
                        } else {
                            element[0].style.height = 500 + 'px';
                        }
                    }, 10);
                }

                element.on('input', resizeElement);
            }
        };
    }

})();
