(function () {
    angular
        .module('notgoogleplus.services')
        .service('PostsService', PostsService);

    PostsService.$inject = ['$http', 'EnvironmentConfig', 'Snackbar'];

    //@namespace PostsService
    //@returns {Factory}
    function PostsService($http, EnvironmentConfig, Snackbar) {
        var self = this;

        //@name allPosts
        //@desc Get all Posts
        //@returns {Promise}
        this.allPosts = function (params) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/posts/',
                method: 'GET',
                params: params
            });
        };

        //@name createPost
        //@desc Create a new Post
        //@param {string} content The content of the new Post
        //@returns {Promise}
        this.createPost = function (data) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/posts/',
                method: 'POST',
                data: data
            }).then(function (response) {
                Snackbar.show("Post has been successfully created!");
                return response
            });
        };

        //@name getPost
        //@desc Get the details of a single post
        //@returns {Promise}
        this.getPost = function (id) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/posts/' + id + '/',
                method: 'GET'
            });
        };

        //@name updatePost
        //@desc Update the details of a single post
        //@returns {Promise}
        this.updatePost = function (id, data) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/posts/' + id + '/',
                method: 'PUT',
                data: data
            }).then(function (response) {
                Snackbar.show("Post has been successfully updated!");
                return response
            });
        };

        //@name removePost
        //@desc Delete the posts of a given user
        //@param {string} username The username to get Posts for
        //@returns {Promise}
        this.removePost = function (id) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/posts/' + id + '/',
                method: 'DELETE'
            }).then(function (response) {
                Snackbar.show("Post has been successfully deleted!");
                return response
            });
        };

        this.votePost = function(id, data) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/posts/' + id + '/likes/',
                method: 'POST',
                data: data
            }).then(function (response) {
                return response;
            });
        };

    }

})();
