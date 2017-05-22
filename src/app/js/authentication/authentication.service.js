angular
    .module('notgoogleplus.services')
    .factory('Authentication', Authentication);

Authentication.$inject = ['$rootScope', '$http', '$q', '$cookies', '$state', 'ApiUrls', 'Snackbar'];

// @namespace Authentication
// @returns {Factory}
function Authentication($rootScope, $http, $q, $cookies, $state, ApiUrls, Snackbar) {
    $rootScope.$on('Authenticated', function () {
        $state.reload();
    });

    // @name $rootScope event listener
    // @desc listen on event 'Unauthenticated'.
    $rootScope.$on('Unauthenticated', function () {
        // remove cookies/tokens if present.
        removeAuthToken();
        removeAuthenticatedUser();
        $state.reload();
    });

    $rootScope.$on('SetAuthenticatedUser', function (event, user) {
        console.log(user);
        setAuthenticatedUser(user);
    });

    var tokenKey = 'notgoogleplus_auth_token';
    var userObjKey = 'notgoogleplus_auth_user';

    // @name Authentication
    // @desc The Factory to be returned
    var Authentication = {
        login: login,
        logout: logout,
        register: register,
        emailResendConfirm: emailResendConfirm,
        passwordReset: passwordReset,
        passwordResetConfirm: passwordResetConfirm,
        setAuthenticatedUser: setAuthenticatedUser,
        fetchAuthenticatedUser: fetchAuthenticatedUser,
        setAuthToken: setAuthToken,
        fetchAuthToken: fetchAuthToken,
        removeAuthToken: removeAuthToken,
        getAuthHeader: getAuthHeader,
        isAuthenticated: isAuthenticated,
        isOwner: isOwner
    };

    return Authentication;

    // @name login
    // @desc Try to log in with username and password
    // @param {string} username The username(email) entered by the user
    // @param {string} password The password entered by the user
    // @returns {Promise}
    function login(username, password) {
        return $http({
            url: ApiUrls.domainUrl + 'api/v1/auth/login/',
            method: 'POST',
            data: {
                username: username,
                password: password
            }
        }).then(function (response) {
            setAuthToken(response.data.token);
            $rootScope.$broadcast('Authenticated');
            return response;
        }).catch(function (error) {
            console.log(error);
            return $q.reject(error);
        });
    }

    // @name logout
    // @desc Try to log the user out
    // @returns {Promise}
    function logout() {
        return $http({
            url: ApiUrls.domainUrl + 'api/v1/auth/logout/',
            method: 'POST'
        }).then(function(response) {
            $rootScope.$broadcast('Unauthenticated');
            return response;
        }).catch(function (error) {
            console.log(error);
            return $q.reject(error);
        });
    }

    // @name register
    // @desc Try to register a new user
    // @param {string} username The username entered by the user
    // @param {string} password The password entered by the user
    // @param {string} email The email entered by the user
    // @returns {Promise}
    function register(data) {
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
    }

    function passwordReset(data) {
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
    }

    function emailResendConfirm(data) {
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
    }

    function passwordResetConfirm(data) {
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
    }

    function setAuthenticatedUser (user) {
        $cookies.put(userObjKey, btoa(JSON.stringify(user)));
    }

    function fetchAuthenticatedUser () {
        return !!$cookies.get(userObjKey)
            ? JSON.parse(atob($cookies.get(userObjKey)))
            : undefined;
    }

    function removeAuthenticatedUser () {
        $cookies.remove(userObjKey);
    }

    // @name setAuthToken
    // @desc Store the token obtained in a cookie
    // @param {string} token The token to be stored
    // @returns {undefined}
    function setAuthToken (token) {
        $cookies.put(tokenKey, token);
    }

    // @name fetchAuthToken
    // @desc Return the stored token if present
    // @returns {token|undefined} if token is present, else 'undefined'
    function fetchAuthToken () {
        var token = $cookies.get(tokenKey);
        return token ? token : undefined;
    }

    // @name removeAuthToken
    // @desc Delete the cookie where the user object is stored
    // @returns {undefined}
    function removeAuthToken () {
        $cookies.remove(tokenKey);
    }

    function getAuthHeader () {
        return fetchAuthToken() ? {'Authorization': 'Token ' + fetchAuthToken()} : undefined;
    }

    // @name isAuthenticated
    // @desc Check if the current user is authenticated
    // @returns {boolean} True if user is authenticated, else false
    function isAuthenticated () {
        return !!$cookies.get(tokenKey);
    }

    // @name isOwner
    // @param {string} username The username accessed by the user.
    // @desc Check if the current username is same as @param
    // @returns {boolean} True if user is owner, else false
    function isOwner (username) {
        var deferred = $q.defer();
        if(fetchAuthenticatedUser()) {
            var authenticatedUser = fetchAuthenticatedUser();
            deferred.resolve(username === authenticatedUser.username);
        } else {
            deferred.reject();
        }
        return deferred.promise;
    }

}
