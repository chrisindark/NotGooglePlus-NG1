// @name formValidation
// @desc Directive function to show errors in forms 
angular
    .module('notgoogleplus.directives')
    .directive('formValidation', formValidation);

formValidation.$inject = ['$document'];

function formValidation($document) {
    return {
        restrict: 'E',
        scope: {
            form: '=',
            errors: '='
        },
        link: function(scope, element, attrs) {
            scope.$watch('errors', function (errors) {
                if (Object.keys(errors).length) {
                    for(key in errors) {
                        scope.form[key].$error[key] = errors[key];
                    }
                }
            });
        }
    }
}

// @name imageLoader
// @desc Directive function to show an overlay on images
// until the image is loaded.
angular
    .module('notgoogleplus.directives')
    .directive('imageLoader', imageLoader);

imageLoader.$inject = ['$compile'];

function imageLoader($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var loader = $compile('<div class="image-loader-container">'+
                '<span></span></div>')(scope);
            element.after(loader);
            element.bind('load', function () {
                loader.remove();
                element.unbind('load');
            });
        }
    };
}
