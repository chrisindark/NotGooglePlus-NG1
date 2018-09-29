(function () {
    angular
        .module('notgoogleplus.directives')
        .directive('myNgRepeatFinished', myNgRepeatFinished);

    myNgRepeatFinished.$inject = ['$timeout'];

    function myNgRepeatFinished ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                // check if scope is last in the ng-repeat list
                if (scope.$last) {
                    // check if masonry already initialized
                    // by checking 'my-masonry' attribute
                    // and reinitialize masonry
                    if (element.parent().attr('my-masonry')) {
                        element.parent().masonry('destroy');
                    }
                    $timeout(function () {
                        // wait for images to load before initiating masonry
                        element.parent().imagesLoaded(function () {
                            element.parent().masonry({itemSelector: '.my-brick'});
                            element.parent().attr('my-masonry', 'my-masonry');
                        });
                    });
                }
            }
        };
    }

})();
