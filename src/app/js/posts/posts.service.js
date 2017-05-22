angular
    .module('notgoogleplus.services')
    .factory('PostsService', PostsService);

PostsService.$inject = ['$http', 'ApiUrls'];

//@namespace PostsService
//@returns {Factory}
function PostsService($http, ApiUrls) {
    var PostsService = {
        allPosts: allPosts,
        createPost: createPost,
        getPost: getPost,
        updatePost: updatePost,
        removePost: removePost
    };

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
    function createPost(content) {
        return $http({
            url: ApiUrls.domainUrl + 'api/v1/posts/',
            method: 'POST',
            data: {content: content}
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
        });
    }

    //@name removePost
    //@desc Delete the posts of a given user
    //@param {string} username The username to get Posts for
    //@returns {Promise}
    function removePost(username, id) {
        return $http.delete({
            url: ApiUrls.domainUrl + 'api/v1/posts/' + id + '/',
            method: 'DELETE',
            params: {username: username}
        });
    }

    return PostsService;
}
