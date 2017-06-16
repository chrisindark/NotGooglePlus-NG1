(function () {
    angular
        .module('notgoogleplus.services')
        .factory('CommentsService', CommentsService);

    CommentsService.$inject = ['$http', 'ApiUrls'];

    //@namespace CommentsService
    //@returns {Factory}
    function CommentsService($http, ApiUrls) {
        var commentType = undefined;

        var CommentsService = {
            _init: _init,
            all: all,
            create: create,
            get: get,
            update: update,
            remove: remove
        };

        return CommentsService;

        // call the _init function first to register
        // type of service for api calls
        function _init(type) {
            // takes type in ['articles', 'posts']
            if (_.contains(['articles', 'posts'], type)) {
                commentType = type;
            }
        }
        //@name all
        //@desc Get all Comments
        //@param {number} typeId The id of the type of object the comment belongs to.
        //@returns {Promise}
        function all(typeId, params) {
            return $http({
                url: ApiUrls.domainUrl + 'api/v1/' + commentType + '/' + typeId + '/comments/',
                method: 'GET',
                params: params
            });
        }

        //@name create
        //@desc Create a new Comment
        //@param {number} typeId The id of the type of object the comment belongs to.
        //@param {object} data The content of the new Comment
        //@returns {Promise}
        function create(typeId, data) {
            return $http({
                url: ApiUrls.domainUrl + 'api/v1/' + commentType + '/' + typeId + '/comments/',
                method: 'POST',
                data: data
            });
        }

        //@name get
        //@desc Get a Comment
        //@param {number} typeId The id of the type of object the comment belongs to.
        //@param {number} id The id of the comment.
        //@returns {Promise}
        function get(typeId, id, params) {
            return $http({
                url: ApiUrls.domainUrl + 'api/v1/' + commentType + '/' + typeId + '/comments/' + id + '/',
                method: 'GET',
                params: params
            });
        }

        //@name update
        //@desc Update a Comment
        //@param {number} typeId The id of the type of object the comment belongs to.
        //@param {number} id The id of the comment.
        //@param {object} data The content of the new Comment
        //@returns {Promise}
        function update(typeId, id, data) {
            return $http({
                url: ApiUrls.domainUrl + 'api/v1/' + commentType + '/' + typeId + '/comments/' + id + '/',
                method: 'PUT',
                data: data
            });
        }

        //@name remove
        //@desc Delete a Comment
        //@param {number} typeId The id of the type of object the comment belongs to.
        //@param {number} id The id of the comment.
        //@returns {Promise}
        function remove(typeId, id) {
            return $http({
                url: ApiUrls.domainUrl + 'api/v1/' + commentType + '/' + typeId + '/comments/' + id + '/',
                method: 'DELETE'
            });
        }

    }

})();
