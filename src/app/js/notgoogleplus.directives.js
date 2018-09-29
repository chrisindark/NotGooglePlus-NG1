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
            scope: {
                eClass: '@'
            },
            link: function (scope, element, attrs) {
                var loader = $compile('<div class="image-loader-container">' +
                    '<span class="spinner"><i class="fa fa-snowflake-o fa-spin" aria-hidden="true"></i>' +
                    '</span></div>')(scope);

                if (scope.eClass) {
                    loader.find('.spinner').addClass(scope.eClass);
                }

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
        .directive('orientationDir',orientationDir);

    orientationDir.$inject = ['$rootScope'];

    function orientationDir($rootScope) {
        return {
            restrict: 'E',
            template: '<div id="orientation-overlay" class="orientation-element">' +
                '<div><img src="../assets/icons/turn_to_portrait.svg"></div></div>',
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
        // @name formElemDir
        // @desc Directive function to detect focus and blur on
        // input elements and fire events to hide orientation
        // overlay.
        .directive('formElemDir', formElemDir);

    formElemDir.$inject = ['$rootScope'];

    function formElemDir($rootScope) {
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

    angular
        .module('notgoogleplus.directives')
        .directive('myNgRepeatFinished', myNgRepeatFinished);

    myNgRepeatFinished.$inject = ['$timeout'];

    function myNgRepeatFinished($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                // check if scope is last in the ng-repeat list
                if (scope.$last) {
                    // check if masonry already initialized
                    // by checking 'my-masonry' attribute
                    // and reinitialize masonry
                    if (element.parent().attr('my-masonry')) {
                        // element.parent().masonry('destroy');
                    }
                    $timeout(function () {
                        // wait for images to load before initiating masonry
                        element.parent().imagesLoaded(function () {
                            // console.log('nothere');
                            element.parent().masonry({itemSelector: '.my-brick'});
                            element.parent().attr('my-masonry', 'my-masonry');
                            element.parent().css('visibility', 'visible');
                        });
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

    myUploadDir.$inject = ['$rootScope', '$timeout', 'FilesService', 'FileExtension'];

    function myUploadDir($rootScope, $timeout, FilesService, FileExtension) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/js/utils/upload-file.html',

            link: function (scope, element, attrs) {
                scope.fileUpload = document.getElementById('file-upload');

                // add 'onchange' event listener to input type file elements
                scope.fileUpload.onchange = onChangeCallback;

                // @desc function to check extension of file selected and upload
                // the file if check is passed
                function onChangeCallback (event) {
                    if (FileExtension.isImage(event.target.files[0].name)
                        || FileExtension.isVideo(event.target.files[0].name)) {
                        scope.uploadFile(event.target.files[0]);
                        event.target.value = '';
                    } else {
                        event.target.value = '';
                    }
                }

                scope.selectFile = function () {
                    scope.fileUpload.click();
                };

                // @desc function to upload the selected file and broadcast
                // an event when the action is successful.
                scope.uploadFile = function (file) {
                    FilesService.createFile(file)
                        .then(function (response) {
                            var selectedFile = response.data;
                            $rootScope.$emit('file.uploaded', selectedFile);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                };
            }
        };

    }

    angular
        .module('notgoogleplus.directives')
        .directive('autoGrowDir', autoGrowDir);

    autoGrowDir.$inject = ['$timeout'];

    // directive to be used with input elements and textareas
    function autoGrowDir($timeout) {
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

                function resizeElement() {
                    $timeout(function () {
                        if (element[0].style.height === '500px') {
                            return;
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

    angular
        .module('notgoogleplus.directives')
        .directive('myVideoJsDir', myVideoJsDir);

    myVideoJsDir.$inject = ['$window'];

    function myVideoJsDir ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var options = {};
                var player = $window.videojs(element[0].id, options);

                scope.$on('$destroy', function () {
                    player.dispose();
                });
            }
        }
    }

})();
