angular
    .module('notgoogleplus.services')
    .service('ArticlesService', ArticlesService);

ArticlesService.$inject = ['$http', 'ApiUrls'];

//@namespace Posts
//@returns {Factory}
function ArticlesService($http, ApiUrls) {
    //@name allArticles
    //@desc Get all Articles
    //@returns {Promise}
    this.allArticles = function(url, params) {
        url = url ? url : ApiUrls.domain_url + 'api/v1/articles/';
        // params = params ? params : {};
        return $http({
            url: url,
            method: 'GET',
            params: params
        });
    };

    //@name createArticle
    //@desc Create a new Article
    //@param {string} content The content of the new Article
    //@returns {Promise}
    this.createArticle = function(data) {
        return $http({
            url: ApiUrls.domain_url + 'api/v1/articles/',
            method: 'POST',
            data: data
        });
    };

    //@name getArticle
    //@desc Get the details of a single article
    //@returns {Promise}
    this.getArticle = function(id) {
        return $http({
            url: ApiUrls.domain_url + 'api/v1/articles/' + id + '/',
            method: 'GET'
        });
    };

    //@name updateArticle
    //@desc Update the details of a single article
    //@returns {Promise}
    this.updateArticle = function(id, data) {
        return $http({
            url: ApiUrls.domain_url + 'api/v1/articles/' + id + '/',
            method: 'PUT',
            data: data
        });
    };

    //@name removePost
    //@desc Delete the posts of a given user
    //@param {string} username The username to get Posts for
    //@returns {Promise}
    this.removeArticle = function(id) {
        return $http.delete({
            url: ApiUrls.domain_url + 'api/v1/articles/' + id + '/',
            method: 'DELETE'
        });
    };

}
