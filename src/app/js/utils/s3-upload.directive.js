(function () {
    angular
        .module('notgoogleplus.directives')
        .directive('myS3UploadDir', myS3UploadDir);

    myS3UploadDir.$inject = ['$rootScope', '$timeout', 'FilesService', 'FileExtension'];

    function myS3UploadDir ($rootScope, $timeout, FilesService, FileExtension) {
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
                    // file upload to s3 file storage server
                    var s3data = {};
                    s3data['file'] = file;
                    s3data['file_type'] = FileExtension.getType(file);
                    s3data['file_content_type'] = file.type;
                    s3data['file_size'] = file.size;

                    // Get presigned url for uploading file
                    FilesService.getS3UploadUrl()
                        .then(function (response) {
                        s3data['url'] = response.data.url;
                        // s3data['file_name'] = s3data['key'] = response.data.fields['key'];

                        // Upload the file directly to s3 server
                        FilesService.createS3Upload(s3data['url'], s3data['file'], scope.progressHandler)
                            .then(function (response) {
                                delete s3data['url'];
                                delete s3data['file'];

                                // Send the details of the file uploaded to server
                                // FilesService.createS3UploadFinish(s3data)
                                //     .then(function (response) {
                                //         var selectedFile = response.data;
                                //         $rootScope.$emit('file.uploaded', selectedFile);
                                //     })
                                //     .catch(function (error) {
                                //         console.log('createS3Record ', error);
                                //     });
                        })
                        .catch(function(error) {
                            console.log('createS3Upload ', error);
                        });
                    })
                    .catch(function(error) {
                        console.log('getS3UploadUrl ', error);
                    });
                };
            }
        }
    }

})();
