(function () {
    angular
        .module('notgoogleplus.directives')
        .directive('myProgressBarDir', myProgressBarDir);

    myProgressBarDir.$inject = ['$rootScope'];

    function myProgressBarDir ($rootScope) {
        return {
            restrict: 'E',
            scope: {},
            template: '<div class="progress progress-striped active my-progress">' +
            ' <div class="progress-bar" style=""></div>' +
            ' </div>',
            link: function (scope, element, attrs) {
                element.hide();

                function updateProgress (uploadProgress) {
                    element.find('.progress-bar').css('width', uploadProgress + '%');
                }

                $rootScope.$on('file.uploadprogress', function (event, uploadProgress) {
                    // file.uploadprogress event caught
                    if (uploadProgress === 100) {
                        element.hide();
                    } else {
                        element.show();
                    }
                    updateProgress(uploadProgress);
                });
            }
        };
    }

})();
