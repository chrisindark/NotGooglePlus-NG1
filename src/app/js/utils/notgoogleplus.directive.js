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
    .directive('myImageLoader', myImageLoader);

myImageLoader.$inject = ['$compile'];

function myImageLoader($compile) {
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

angular
    .module('notgoogleplus.directives')
    .directive('myNgRepeatFinished', myNgRepeatFinished);

myNgRepeatFinished.$inject = ['$timeout'];

function myNgRepeatFinished($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            if (scope.$last) {
                if (element.parent().attr('my-masonry')) {
                    element.parent().masonry('destroy');
                }
                $timeout(function () {
                    element.parent().masonry({itemSelector: '.my-brick'});
                    element.parent().attr('my-masonry', 'my-masonry');
                });
            }
        }
    };
}

// @name uploadDir
// @desc Directive function to add template for file upload,
// check file extension of selected file and upload the file to
// application's server.
angular
    .module('notgoogleplus.directives')
    .directive('myUploadDir', myUploadDir);

myUploadDir.$inject = ['$rootScope', 'FilesService', 'FileExtension'];

function myUploadDir($rootScope, FilesService, FileExtension) {
    return {
        restrict: 'E',
        scope: {
            selectedFile: '='
        },
        template: '<label for="file-upload"></label>' +
        '<input type="file" id="file-upload" name="file-upload"' +
        'class="input-file" accept="image/*, video/*">' +
        '<button class="btn btn-primary btn-raised"' +
        'ng-click="selectFile()">Upload</button>',

        link: function (scope, element, attrs) {
            scope.fileUpload = document.getElementById('file-upload');

            // add 'onchange' event listener to input type file elements
            scope.fileUpload.onchange = onChangeCallback;

            // @desc function to check extension of file selected and upload
            // the file if check is passed
            function onChangeCallback (event) {
                if (FileExtension.isImage(event.target.files[0].name)
                    || FileExtension.isVideo(event.target.files[0].name)) {
                    scope.selectedFile = event.target.files[0];
                    // $rootScope.$emit('file.selected', scope.selectedFile);
                    event.target.value = '';
                }
                else {
                    event.target.value = '';
                }
            }

            scope.selectFile = function () {
                scope.fileUpload.click();
            };

            // @desc function to upload the selected file and broadcast
            // an event when the action is successful.
            scope.uploadFile = function (file) {
                FilesService.uploadFile(file).then(function (response) {
                    if (response) {
                        $rootScope.$broadcast('UploadSuccessful', response);
                    }
                });
            };
        }
    };

}
