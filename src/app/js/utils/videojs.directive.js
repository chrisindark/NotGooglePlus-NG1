(function () {
    angular
        .module('notgoogleplus.directives')
        .directive('myVideoJsDir', myVideoJsDir);

    myVideoJsDir.$inject = ['$window', '$timeout'];

    function myVideoJsDir ($window, $timeout) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                var options = {};

                var player = undefined;
                $timeout(function () {
                    player = $window.videojs(attrs.id, options);
                }, 10);

                scope.$on('$destroy', function () {
                    player.dispose();
                });
            }
        }
    }

})();
