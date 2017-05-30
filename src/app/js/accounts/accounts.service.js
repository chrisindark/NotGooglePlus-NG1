(function () {
    angular
        .module('notgoogleplus.services')
        .service('AccountsService', AccountsService);

    AccountsService.$inject = ['$rootScope', '$http', 'ApiUrls', 'Snackbar'];

    function AccountsService ($rootScope, $http, ApiUrls, Snackbar) {
        var self = this;

        this.getAuthenticatedUser = function () {
            return $http({
                url: ApiUrls.domainUrl + 'api/v1/auth/me/',
                method: 'GET'
            }).then(function (response) {
                $rootScope.$broadcast('SetAuthenticatedUser', response.data);
                return response;
            });
        };

        this.updateAccount = function (id, data) {
            return $http({
                url: ApiUrls.domainUrl + 'api/v1/accounts/' + id + '/',
                method: 'PUT',
                data: data
            }).then(function (response) {
                $rootScope.$broadcast('SetAuthenticatedUser', response.data);
                Snackbar.show("Account has been successfully updated!");
                return response;
            });
        };

        this.deleteAccount = function (id) {
            return $http({
                url: ApiUrls.domainUrl + 'api/v1/accounts/' + id + '/',
                method: 'DELETE'
            }).then(function (response) {
                $rootScope.$broadcast('DeleteAuthenticatedUser', response.data);
                Snackbar.show("Account has been successfully deleted!");
                return response;
            });
        };

    }

})();
