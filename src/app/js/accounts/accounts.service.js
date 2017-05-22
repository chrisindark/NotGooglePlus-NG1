angular
    .module('notgoogleplus.services')
    .service('AccountsService', AccountsService);

AccountsService.$inject = ['$rootScope', '$http', '$q', 'ApiUrls'];

function AccountsService ($rootScope, $http, $q, ApiUrls) {

    this.getAuthenticatedUser = function () {
        return $http({
            url: ApiUrls.domainUrl + 'api/v1/auth/me/',
            method: 'GET'
        }).then(function (response) {
            $rootScope.$broadcast('SetAuthenticatedUser', response.data);
            return response;
        }).catch(function(error) {
            console.log(error);
            return $q.reject(error);
        });
    };

    this.updateAuthenticatedUser = function (id, data) {
        return $http({
            url: ApiUrls.domainUrl + 'api/v1/accounts/' + id + '/',
            method: 'PUT',
            data: data
        }).then(function (response) {
            $rootScope.$broadcast('SetAuthenticatedUser', response.data);
            return response;
        }).catch(function (error) {
            console.log(error);
            return $q.reject(error);
        });
    };

    this.deleteAuthenticatedUser = function (id) {
        return $http({
            url: ApiUrls.domainUrl + 'api/v1/accounts/' + id + '/',
            method: 'DELETE'
        }).then(function (response) {
            $rootScope.$broadcast('DeleteAuthenticatedUser', response.data);
            return response;
        }).catch(function (error) {
            return $q.reject(error);
        });
    };

}
