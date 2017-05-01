angular
    .module('notgoogleplus.services')
    .factory('Files', Files);

Files.$inject = ['$http', 'ApiUrls'];

//@namespace Files
//@returns {Factory}
function Files($http, ApiUrls) {
    var Files = {
        allFiles: allFiles,
        createFile: createFile,
        getFile: getFile,
        updateFile: updateFile,
        removeFile: removeFiles
    };

    return Files;

    //@name all
    //@desc Get all Files
    //@returns {Promise}
    function allFiles(url, params) {
        url = url ? url : ApiUrls.domain_url + 'api/v1/files/';
        return $http({
            url: url,
            method: 'GET',
            params: params
        });
    }

    //@name create
    //@desc Create a new File
    //@param {string} content The content of the new File
    //@returns {Promise}
    function createFile(content) {
        return $http({
            url: ApiUrls.domain_url + 'api/v1/files/',
            method: 'POST',
            data: {content: content}
        });
    }

    function getFile(username, id) {
        return $http({
            url: ApiUrls.domain_url + 'api/v1/files/' + id + '/',
            method: 'GET',
            params: {username: username}
        });
    }

    function updateFile(id, data) {
        return $http({
            url: ApiUrls.domain_url + 'api/v1/files/' + id + '/',
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
            url: ApiUrls.domain_url + 'api/v1/files/' + id + '/',
            method: 'DELETE',
            params: {username: username}
        });
    }

}
