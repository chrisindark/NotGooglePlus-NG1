angular
    .module('notgoogleplus.services')
    .factory('PostsService', PostsService);

PostsService.$inject = ['$http', 'ApiUrls', 'Snackbar'];

//@namespace PostsService
//@returns {Factory}
function PostsService($http, ApiUrls, Snackbar) {
    var PostsService = {
        allPosts: allPosts,
        createPost: createPost,
        getPost: getPost,
        updatePost: updatePost,
        removePost: removePost
    };

    return PostsService;

    //@name allPosts
    //@desc Get all Posts
    //@returns {Promise}
    function allPosts(params) {
        return $http({
            url: ApiUrls.domainUrl + 'api/v1/posts/',
            method: 'GET',
            params: params
        });
    }

    //@name createPost
    //@desc Create a new Post
    //@param {string} content The content of the new Post
    //@returns {Promise}
    function createPost(data) {
        return $http({
            url: ApiUrls.domainUrl + 'api/v1/posts/',
            method: 'POST',
            data: data
        }).then(function (response) {
            Snackbar.show("Post has been successfully created!");
            return response
        });
    }

    //@name getPost
    //@desc Get the details of a single post
    //@returns {Promise}
    function getPost(id) {
        return $http({
            url: ApiUrls.domainUrl + 'api/v1/posts/' + id + '/',
            method: 'GET'
        });
    }

    //@name updatePost
    //@desc Update the details of a single post
    //@returns {Promise}
    function updatePost(id, data) {
        return $http({
            url: ApiUrls.domainUrl + 'api/v1/posts/' + id + '/',
            method: 'PUT',
            data: data
        }).then(function (response) {
            Snackbar.show("Post has been successfully updated!");
            return response
        });
    }

    //@name removePost
    //@desc Delete the posts of a given user
    //@param {string} username The username to get Posts for
    //@returns {Promise}
    function removePost(id) {
        return $http({
            url: ApiUrls.domainUrl + 'api/v1/posts/' + id + '/',
            method: 'DELETE'
        }).then(function (response) {
            Snackbar.show("Post has been successfully deleted!");
            return response
        });
    }

}
