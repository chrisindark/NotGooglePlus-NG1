(function () {
    angular
        .module('notgoogleplus.services')
        .service('FilesService', FilesService);

    FilesService.$inject = ['$http', 'EnvironmentConfig'];

    //@namespace FilesService
    //@returns {Factory}
    function FilesService($http, EnvironmentConfig) {
        var self = this;

        this.createFormDataObject = function (fileObj) {
            var fd = new FormData();
            fd.append('file', fileObj);
            // fd.append('avatar', fileObj);
            // fd.append('Content-Type', fileObj.type);

            return fd;
        };

        //@name all
        //@desc Get all Files
        //@returns {Promise}
        this.allFiles = function (username, params) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/files/' + username + '/',
                method: 'GET',
                params: params
            });
        };

        //@name create
        //@desc Create a new File
        //@param {file obj} fileObj The content of the new File
        //@returns {Promise}
        this.createFile = function (username, fileObj, progress) {
            // create a formdata object for the file
            // to be uploaded as multipart encoded.
            var fd = this.createFormDataObject(fileObj);

            // adding a content type header to request
            // while sending formdata object.
            var customHeaderObj = {};
            customHeaderObj['Content-Type'] = undefined;
            // customHeaderObj['Content-Type'] = 'multipart/form-data';

            return $http({
                url: EnvironmentConfig.api + 'api/v1/files/' + username + '/',
                method: 'POST',
                // data: fd,
                data: fileObj,
                // headers: customHeaderObj,
                headers: {
                    'Content-Type': fileObj.type,
                    'Content-Disposition': 'attachment;filename=' + fileObj.name
                },
                uploadEventHandlers: {
                    progress: progress
                }
            }).then(function (response) {
                // do something with upload progress bar.
                return response;
            });
        };

        this.getFile = function (id, params) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/files/' + id + '/',
                method: 'GET',
                params: params
            });
        };

        this.updateFile = function (id, data) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/files/' + id + '/',
                method: 'PUT',
                data: data
            });
        };

        //@name deleteFile
        //@desc Delete a post of a given user
        //@param {string} username
        //@returns {Promise}
        this.deleteFile = function (username, id) {
            return $http.delete({
                url: EnvironmentConfig.api + 'api/v1/files/' + id + '/',
                method: 'DELETE',
                params: {username: username}
            });
        };

        this.getS3UploadUrl = function (params) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/s3/files/signature/',
                method: 'GET',
                params: params
            });
        };

        this.createS3Upload = function (url, fileObj, progress) {
            return $http({
                url: url,
                method: 'PUT',
                data: fileObj,
                headers: {
                    'Content-Type': fileObj.type
                },
                uploadEventHandlers: {
                    progress: progress
                },
                skipAuthorization: true
            });
        };

        this.createS3UploadFinish = function (data) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/s3/files/upload/finished/',
                method: 'POST',
                data: data
            });
        };

        this.allS3Uploads = function () {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/s3/files/',
                method: 'GET'
            });
        };

    }

    // @name FileExtension
    // @desc Factory function to check extension type of file
    // by reading the file name and return the type of file
    // as image/video
    angular
        .module('notgoogleplus.services')
        .factory('FileExtension', FileExtension);

    function FileExtension () {
        var FileExtension = {};

        FileExtension.getType = function (file) {
            return file.type.split('/')[0];
        };

        FileExtension.getContentType = function (file) {
            return file.type.split('/')[1];
        };

        FileExtension.getExtension = function (filename) {
            var parts = filename.split('.');
            return parts[parts.length - 1];
        };

        FileExtension.isImage = function (contentType) {
            switch (contentType) {
                case 'jpg':
                    return true;
                case 'jpeg':
                    return true;
                case 'png':
                    return true;
            }

            return false;
        };

        FileExtension.isVideo = function (contentType) {
            switch (contentType) {
                case 'mp4':
                    return true;
                case 'mpeg4':
                    return true;
                case 'mov':
                    return true;
                case 'ogg':
                    return true;
                case 'webm':
                    return true;
                case 'quicktime':
                    return true;
            }

            return false;
        };

        return FileExtension;

    }

})();
