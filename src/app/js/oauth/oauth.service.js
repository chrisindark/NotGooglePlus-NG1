(function() {
    angular
        .module('notgoogleplus.services')
        .service('OauthService', OauthService);

    OauthService.$inject = ['$rootScope', '$http', '$q', 'Authentication',
        'EnvironmentConfig', 'Snackbar'];

    function OauthService($rootScope, $http, $q, Authentication,
        EnvironmentConfig, Snackbar) {
        var self = this;

        this.googleLogin = function (data) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/auth/google/callback/',
                method: 'POST',
                data: data
            }).then(function (response) {
                Authentication.setAuthToken(response.data.token);
                Snackbar.show("You have been successfully logged in!");
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            });
        };

        this.twitterLogin = function (data) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/auth/twitter/callback/',
                method: 'POST',
                data: data
            }).then(function (response) {
                Authentication.setAuthToken(response.data.token);
                Snackbar.show("You have been successfully logged in!");
                return $q.resolve(response);
            }).catch(function (error) {
                return $q.reject(error);
            });
        };

        this.githubLogin = function (data) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/auth/github/callback/',
                method: 'POST',
                data: data
            }).then(function (response) {
                Authentication.setAuthToken(response.data.token);
                Snackbar.show("You have been successfully logged in!");
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            });
        };

        this.stripeLogin = function (data) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/auth/stripe/callback/',
                method: 'POST',
                data: data
            }).then(function (response) {
                Authentication.setAuthToken(response.data.token);
                Snackbar.show("You have been successfully logged in!");
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            });
        };
    }

})();
