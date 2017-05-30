(function () {
    angular
        .module('notgoogleplus.directives')
        .directive('mySidebarDir', mySidebarDir);

    function mySidebarDir() {
        return {
            // restrict: 'A',
            // scope: {},
            link: function(scope, element, attrs) {
                element.on('click', function(event) {
                    // adding css for hamburger button
                    if ($('#sidebar-toggle').hasClass('active')) {
                        $('#sidebar-toggle').removeClass('active');
                    } else {
                        $('#sidebar-toggle').addClass('active');
                    }

                    // adding css for sliding sidebar into view
                    if ($('#side-bar').hasClass('slide-left')) {
                        $('#side-bar').removeClass('slide-left');
                        $('#main-bar').addClass('slide-right');
                        $('body').addClass('overflow-hidden');
                    } else {
                        $('#side-bar').addClass('slide-left');
                        $('#main-bar').removeClass('slide-right');
                        $('body').removeClass('overflow-hidden');
                    }
                });
            }
        };
    }

    angular
        .module('notgoogleplus.directives')
        .directive('myRipplesDir', myRipplesDir);

    function myRipplesDir() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                if (element.hasClass('withoutripple') || element.hasClass('btn-link')) {
                    return;
                }
                $.material.ripples(element);
            }
        };
    }

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
        .directive('orientationDir',orientationDir);

    orientationDir.$inject = ['$rootScope'];

    function orientationDir($rootScope) {
        return {
            restrict: 'E',
            template: '<div id="note-orientation-overlay" class="orientation-element">' +
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

    angular
        .module('notgoogleplus.directives')
        .directive('autoGrowDir', autoGrowDir);

    autoGrowDir.$inject = ['$timeout'];

    function autoGrowDir($timeout) {
        return {
            restrict: 'A',
            scope: {
                message: '=',
                // take the length of chars left
                charsLeft: '=',
                // take the submit disable option flag
                disableSubmit: '='
            },
            link: function (scope, element, attrs) {
                // added watch event to check for changes
                // to message in the controller
                scope.$watch('message', function (newValue, oldValue) {
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

})();
