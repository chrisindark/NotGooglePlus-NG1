(function () {
    angular
        .module('notgoogleplus.services')
        .service('CommentsService', CommentsService);

    CommentsService.$inject = ['$http', 'EnvironmentConfig'];

    //@namespace CommentsService
    //@returns {Factory}
    function CommentsService($http, EnvironmentConfig) {
        var self = this;

        var commentType = undefined;

        // call the _init function first to register
        // type of service for api calls
        this._init = function (type) {
            // takes type in ['articles', 'posts']
            if (_.contains(['articles', 'posts'], type)) {
                commentType = type;
            }
        };

        //@name all
        //@desc Get all Comments
        //@param {number} typeId The id of the type of object the comment belongs to.
        //@returns {Promise}
        this.all = function (typeId, params) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/' + commentType + '/' + typeId + '/comments/',
                method: 'GET',
                params: params
            });
        };

        //@name create
        //@desc Create a new Comment
        //@param {number} typeId The id of the type of object the comment belongs to.
        //@param {object} data The content of the new Comment
        //@returns {Promise}
        this.create = function (typeId, data) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/' + commentType + '/' + typeId + '/comments/',
                method: 'POST',
                data: data
            });
        };

        //@name get
        //@desc Get a Comment
        //@param {number} typeId The id of the type of object the comment belongs to.
        //@param {number} id The id of the comment.
        //@returns {Promise}
        this.get = function (typeId, id, params) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/' + commentType + '/' + typeId + '/comments/' + id + '/',
                method: 'GET',
                params: params
            });
        };

        //@name update
        //@desc Update a Comment
        //@param {number} typeId The id of the type of object the comment belongs to.
        //@param {number} id The id of the comment.
        //@param {object} data The content of the new Comment
        //@returns {Promise}
        this.update = function (typeId, id, data) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/' + commentType + '/' + typeId + '/comments/' + id + '/',
                method: 'PUT',
                data: data
            });
        };

        //@name remove
        //@desc Delete a Comment
        //@param {number} typeId The id of the type of object the comment belongs to.
        //@param {number} id The id of the comment.
        //@returns {Promise}
        this.remove = function (typeId, id) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/' + commentType + '/' + typeId + '/comments/' + id + '/',
                method: 'DELETE'
            });
        };

        /**
         * name voteComment
         * desc like/dislike a comment of a given user
         * param id of the comment, data to be sent as {liked: false}
         * returns promise object
         * */
        this.voteComment = function(typeId, id, data) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/' + commentType + '/' + typeId + '/comments/' + id + '/likes/',
                method: 'POST',
                data: data
            }).then(function (response) {
                return response;
            });
        };

    }

})();
