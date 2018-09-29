(function() {
    angular
        .module('notgoogleplus.directives')
        .directive('myNavbarDir', myNavbarDir);

    myNavbarDir.$inject = ['$timeout'];

    function myNavbarDir ($timeout) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                $timeout(function() {
                    element.find('.nav a').on('click', function() {
                        $('.navbar-collapse').collapse('hide');
                    });
                });
            }
        };
    }

})();
