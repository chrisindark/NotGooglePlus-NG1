(function () {
    angular
        .module('notgoogleplus.services')
        .service('Authentication', Authentication);

    Authentication.$inject = ['$rootScope', '$http', '$q', '$state', 'ApiUrls', 'Snackbar', 'SessionService'];

    // @namespace Authentication
    // @returns {Factory}
    function Authentication($rootScope, $http, $q, $state, ApiUrls, Snackbar, SessionService) {
        var self = this;

        var tokenKey = 'notgoogleplus_auth_token';
        var userObjKey = 'notgoogleplus_auth_user';

        // @name login
        // @desc Try to log in with username and password
        // @param {string} username The username(email) entered by the user
        // @param {string} password The password entered by the user
        // @returns {Promise}
        this.login = function (data) {
            return $http({
                url: ApiUrls.domainUrl + 'api/v1/auth/login/',
                method: 'POST',
                data: data
            }).then(function (response) {
                self.setAuthToken(response.data.token);
                $rootScope.$broadcast('Authenticated');
                Snackbar.show("You have been successfully logged in!");
                return response;
            }).catch(function (error) {
                console.log(error);
                return $q.reject(error);
            });
        };

        // @name logout
        // @desc Try to log the user out
        // @returns {Promise}
        this.logout = function () {
            return $http({
                url: ApiUrls.domainUrl + 'api/v1/auth/logout/',
                method: 'POST'
            }).then(function(response) {
                $rootScope.$broadcast('Unauthenticated');
                Snackbar.show("You have been successfully logged out!");
                return response;
            }).catch(function (error) {
                console.log(error);
                return $q.reject(error);
            });
        };

        // @name register
        // @desc Try to register a new user
        // @param {string} username The username entered by the user
        // @param {string} password The password entered by the user
        // @param {string} email The email entered by the user
        // @returns {Promise}
        this.register = function (data) {
            return $http({
                url: ApiUrls.domainUrl + 'api/v1/accounts/',
                method: 'POST',
                data: data
            }).then(function(response) {
                return response;
            }).catch(function (error) {
                console.log(error);
                return $q.reject(error);
            });
        };

        this.passwordReset = function (data) {
            return $http({
                url: ApiUrls.domainUrl + 'api/v1/auth/password/reset/',
                method: 'POST',
                data: data
            }).then(function (response) {
                return response;
            }).catch(function (error) {
                console.log(error);
                return $q.reject(error);
            });
        };

        this.emailResendConfirm = function (data) {
            return $http({
                url: ApiUrls.domainUrl + 'api/v1/auth/account/activate/',
                method: 'POST',
                data: data
            }).then(function (response) {
                return response;
            }).catch(function (error) {
                console.log(error);
                return $q.reject(error);
            });
        };

        this.passwordResetConfirm = function (data) {
            return $http({
                url: ApiUrls.domainUrl + 'api/v1/auth/password/reset/confirm/',
                method: 'POST',
                data: data
            }).then(function (response) {
                return response;
            }).catch(function (error) {
                console.log(error);
                return $q.reject(error);
            });
        };

        this.setAuthenticatedUser = function (user) {
            SessionService.setObject(userObjKey, btoa(JSON.stringify(user)));
        };

        this.fetchAuthenticatedUser = function () {
            return !!SessionService.getObject(userObjKey)
                ? JSON.parse(atob(SessionService.getObject(userObjKey)))
                : undefined;
        };

        this.removeAuthenticatedUser = function () {
            SessionService.removeObject(userObjKey);
        };

        // @name isAuthenticated
        // @desc Check if the current user is authenticated
        // @returns {boolean} True if user is authenticated, else false
        this.isAuthenticated = function () {
            return !!SessionService.getObject(tokenKey);
        };

        // @name setAuthToken
        // @desc Store the token obtained in a cookie
        // @param {string} token The token to be stored
        // @returns {undefined}
        this.setAuthToken = function (token) {
            SessionService.setObject(tokenKey, token);
        };

        // @name fetchAuthToken
        // @desc Return the stored token if present
        // @returns {token|undefined} if token is present, else 'undefined'
        this.fetchAuthToken = function () {
            var token = SessionService.getObject(tokenKey);
            return token ? token : undefined;
        };

        // @name removeAuthToken
        // @desc Delete the cookie where the user object is stored
        // @returns {undefined}
        this.removeAuthToken = function () {
            SessionService.removeObject(tokenKey);
        };

        this.getAuthHeader = function () {
            return self.fetchAuthToken() ? {'Authorization': 'Token ' + self.fetchAuthToken()} : undefined;
        };

        // @name isOwner
        // @param {string} username The username accessed by the user.
        // @desc Check if the current username is same as @param
        // @returns {boolean} True if user is owner, else false
        this.isOwner = function (username) {
            var deferred = $q.defer();
            var authenticatedUser = self.fetchAuthenticatedUser();
            if(authenticatedUser && username === authenticatedUser.username) {
                deferred.resolve(true);
            } else {
                deferred.reject(false);
            }
            return deferred.promise;
        };

    }

})();
