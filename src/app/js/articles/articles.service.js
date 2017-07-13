angular
    .module('notgoogleplus.services')
    .service('ArticlesService', ArticlesService);

ArticlesService.$inject = ['$http', 'ApiUrls', 'Snackbar'];

//@namespace ArticlesService
//@returns {Service}
function ArticlesService($http, ApiUrls, Snackbar) {
    //@name allArticles
    //@desc Get all Articles
    //@returns {Promise}
    this.allArticles = function(url, params) {
        url = url ? url : ApiUrls.domainUrl + 'api/v1/articles/';
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
            url: ApiUrls.domainUrl + 'api/v1/articles/',
            method: 'POST',
            data: data
        }).then(function (response) {
            Snackbar.show("Article has been successfully created!");
            return response
        });
    };

    //@name getArticle
    //@desc Get the details of a single article
    //@returns {Promise}
    this.getArticle = function(id) {
        return $http({
            url: ApiUrls.domainUrl + 'api/v1/articles/' + id + '/',
            method: 'GET'
        });
    };

    //@name updateArticle
    //@desc Update the details of a single article
    //@returns {Promise}
    this.updateArticle = function(id, data) {
        return $http({
            url: ApiUrls.domainUrl + 'api/v1/articles/' + id + '/',
            method: 'PUT',
            data: data
        }).then(function (response) {
            Snackbar.show("Article has been successfully updated!");
            return response
        });
    };

    //@name removeArticle
    //@desc Delete the articles of a given user
    //@param {id} id The id of the article to delete
    //@returns {Promise}
    this.removeArticle = function(id) {
        return $http({
            url: ApiUrls.domainUrl + 'api/v1/articles/' + id + '/',
            method: 'DELETE'
        }).then(function (response) {
            Snackbar.show("Article has been successfully deleted!");
            return response
        });
    };

}
