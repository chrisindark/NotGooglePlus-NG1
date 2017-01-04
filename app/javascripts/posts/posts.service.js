angular
    .module('notgoogleplus.services')
    .factory('Posts', Posts);

Posts.$inject = ['$http', 'ApiUrls'];

//@namespace Posts
//@returns {Factory}
function Posts($http, ApiUrls) {
    var Posts = {
        allPosts: allPosts,
        createPost: createPost,
        getPost: getPost,
        updatePost: updatePost,
        removePost: removePost
    };

    return Posts;

    //@name all
    //@desc Get all Posts
    //@returns {Promise}
    function allPosts(url, params) {
        url = url ? url : ApiUrls.domain_url + 'api/v1/posts/';
        // params = params ? params : {};
        return $http({
            url: url,
            method: 'GET',
            params: params
        });
    }

    //@name create
    //@desc Create a new Post
    //@param {string} content The content of the new Post
    //@returns {Promise}
    function createPost(content) {
        return $http({
            url: ApiUrls.domain_url + 'api/v1/posts/',
            method: 'POST',
            data: {content: content}
        });
    }

    //@name get
    //@desc Get the Posts of a given user
    //@param {string} username The username to get Posts for
    //@returns {Promise}
    function getPost(username, id) {
        return $http({
            url: ApiUrls.domain_url + 'api/v1/posts/' + id + '/',
            method: 'GET',
            params: {username: username}
        });
    }

    function updatePost(id, data) {
        return $http({
            url: ApiUrls.domain_url + 'api/v1/posts/' + id + '/',
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
            url: ApiUrls.domain_url + 'api/v1/posts/' + id + '/',
            method: 'DELETE',
            params: {username: username}
        });
    }

}
