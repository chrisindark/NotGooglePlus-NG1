(function () {
    // @name myImageLoaderDir
    // @desc Directive function to show an overlay on images
    // until the image is loaded.
    angular
        .module('notgoogleplus.directives')
        .directive('myImageLoaderDir', myImageLoaderDir);

    myImageLoaderDir.$inject = ['$compile'];

    function myImageLoaderDir ($compile) {
        return {
            restrict: 'A',
            scope: {
                eClass: '@'
            },
            link: function (scope, element, attrs) {
                var loader = $compile('<div class="image-loader-container">'+
                    '<span class="spinner"><i class="fa fa-spinner fa-spin" aria-hidden="true"></i>' +
                    '</span></div>')(scope);

                if (scope.eClass) {
                    loader.find('.spinner').addClass(scope.eClass);
                }

                element.parent().css('position', 'relative');
                element.after(loader);
                element.bind('load', function () {
                    element.parent().css('position', '');
                    loader.remove();
                    element.unbind('load');
                });
            }
        };
    }

})();
