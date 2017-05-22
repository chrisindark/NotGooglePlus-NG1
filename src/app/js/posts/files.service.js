angular
    .module('notgoogleplus.services')
    .factory('FilesService', FilesService);

FilesService.$inject = ['$http', 'ApiUrls'];

//@namespace FilesService
//@returns {Factory}
function FilesService($http, ApiUrls) {
    var FilesService = {
        allFiles: allFiles,
        createFile: createFile,
        getFile: getFile,
        updateFile: updateFile,
        removeFile: removeFile
    };

    return FilesService;

    //@name all
    //@desc Get all Files
    //@returns {Promise}
    function allFiles(params) {
        return $http({
            url: ApiUrls.domainUrl + 'api/v1/files/',
            method: 'GET',
            params: params
        });
    }

    //@name create
    //@desc Create a new File
    //@param {string} content The content of the new File
    //@returns {Promise}
    function createFile(fileObj) {
        var fd = createUploadObject(fileObj);

        // adding a content type header to request
        var customHeaderObj = {};
        customHeaderObj['Content-Type'] = undefined;

        return $http({
            url: ApiUrls.domainUrl + 'api/v1/files/',
            method: 'POST',
            data: fd,
            headers: customHeaderObj
        });
    }

    function getFile(id, params) {
        return $http({
            url: ApiUrls.domainUrl + 'api/v1/files/' + id + '/',
            method: 'GET',
            params: params
        });
    }

    function updateFile(id, data) {
        return $http({
            url: ApiUrls.domainUrl + 'api/v1/files/' + id + '/',
            method: 'PUT',
            data: data
        });
    }

    //@name removePost
    //@desc Delete a post of a given user
    //@param {string} username
    //@returns {Promise}
    function removeFile(username, id) {
        return $http.delete({
            url: ApiUrls.domainUrl + 'api/v1/files/' + id + '/',
            method: 'DELETE',
            params: {username: username}
        });
    }

    function createUploadObject(fileObj) {
        var fd = new FormData();
        fd.append('file', fileObj);

        return fd;
    }

}

// @name FileExtension
// @desc Factory function to check extension type of file
// by reading the file name and return the type of file
// as image/video
angular
    .module('notgoogleplus.services')
    .factory('FileExtension', FileExtension);

function FileExtension() {
    var FileExtension = {};

    FileExtension.getExtension = function (filename) {
        var parts = filename.split('.');
        return parts[parts.length - 1];
    };

    FileExtension.isImage = function (filename) {
        var ext = FileExtension.getExtension(filename);
        switch (ext.toLowerCase()) {
            case 'jpg':
                return true;
            case 'jpeg':
                return true;
            case 'png':
                return true;
        }
        return false;
    };

    FileExtension.isVideo = function (filename) {
        var ext = FileExtension.getExtension(filename);
        switch (ext.toLowerCase()) {
            case 'mp4':
                return true;
            case 'mpeg4':
                return true;
            case 'mov':
                return true;
            case 'ogg':
                return true;
        }
        return false;
    };

    return FileExtension;

}
