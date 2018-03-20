(function () {
    // @name myUploadDir
    // @desc Directive function to add template for file upload,
    // check file extension of selected file and upload the file to
    // application's server.
    angular
        .module('notgoogleplus.directives')
        .directive('myUploadDir', myUploadDir);

    myUploadDir.$inject = ['$rootScope', 'FilesService', 'FileExtension', 'Authentication'];

    function myUploadDir ($rootScope, FilesService, FileExtension, Authentication) {
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
                    var file_type = FileExtension.getContentType(event.target.files[0]);

                    if (FileExtension.isImage(file_type) || FileExtension.isVideo(file_type)) {
                        scope.uploadFile(event.target.files[0]);
                        event.target.value = '';
                    } else {
                        event.target.value = '';
                    }
                }

                scope.selectFile = function () {
                    scope.fileUpload.click();
                };

                scope.progressHandler = function (event) {
                    if (event.lengthComputable) {
                        var uploadProgress = (event.loaded / event.total) * 100;
                        $rootScope.$emit('file.uploadprogress', uploadProgress);
                    }
                };

                // @desc function to upload the selected file and broadcast
                // an event when the action is successful.
                scope.uploadFile = function (file) {
                    var authenticatedUser = Authentication.fetchAuthenticatedUser();

                    // file upload to django file storage server
                    FilesService.createFile(authenticatedUser.username, file, scope.progressHandler)
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

})();
