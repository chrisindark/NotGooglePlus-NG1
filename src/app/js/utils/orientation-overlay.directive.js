(function () {
    angular
        .module('notgoogleplus.directives')
        .directive('myOrientationDir', myOrientationDir);

    myOrientationDir.$inject = ['$rootScope'];

    function myOrientationDir ($rootScope) {
        return {
            restrict: 'E',
            template: '<div id="orientation-overlay" class="orientation-element">' +
            ' <div><img src="/app/icons/turn_to_portrait.svg"></div></div>',
            link: function (scope, element, attrs) {
                // @name $rootScope event listeners
                // @desc show or hide the overlay when the respective
                // events are fired.
                $rootScope.$on('HideOrientationDir', function () {
                    element.hide();
                });
                $rootScope.$on('ShowOrientationDir', function () {
                    element.show();
                });
            }
        };
    }

    angular
        .module('notgoogleplus.directives')
        // @name formElemEventDir
        // @desc Directive function to detect focus and blur on
        // input elements and fire events to hide orientation
        // overlay.
        .directive('formElemEventDir', formElemEventDir);

    formElemEventDir.$inject = ['$rootScope'];

    function formElemEventDir ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                // @desc event listeners to the element passed
                // through directive
                element.on('focus', function () {
                    $rootScope.$emit('HideOrientationDir');
                });
                element.on('blur', function () {
                    $rootScope.$emit('ShowOrientationDir');
                });
            }
        };
    }

})();
