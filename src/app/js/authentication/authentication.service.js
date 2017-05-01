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

    // @name Authentication
    // @desc The Factory to be returned
    var Authentication = {
        login: login,
        logout: logout,
        register: register,
        passwordReset: passwordReset,
        passwordResetConfirm: passwordResetConfirm,
        getAuthenticatedUser: getAuthenticatedUser,
        updateAuthenticatedUser: updateAuthenticatedUser,
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
            url: ApiUrls.domain_url + 'api/v1/auth/login/',
            method: 'POST',
            data: {
                username: username,
                password: password
            }
        }).then(function (response) {
            if (!response.data.token) {
                return response;
            } else {
                setAuthToken(response.data.token);
                $rootScope.$broadcast('Authenticated');
                return response;
            }
        });
    }

    // @name logout
    // @desc Try to log the user out
    // @returns {Promise}
    function logout() {
        return $http({
            url: ApiUrls.domain_url + 'api/v1/auth/logout/',
            method: 'POST'
        }).then(function(response) {
            if(response.data.error) {
                //Todo: do something!!
            } else {
                $rootScope.$broadcast('Unauthenticated');
                return response;
            }
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
            url: ApiUrls.domain_url + 'api/v1/accounts/',
            method: 'POST',
            data: data
        }).then(function(response) {
            if (response.data.error) {
                return response;
            } else {
                login(data.email, data.password);
                return response;
            }
        });
    }

    function passwordReset(email) {
        return $http({
            url: ApiUrls.domain_url + 'api/v1/auth/password/reset/',
            method: 'POST',
            data:{email: email}
        }).then(function (response) {
            return response;
        });
    }

    function passwordResetConfirm(data) {
        return $http({
            url: ApiUrls.domain_url + 'api/v1/auth/password/reset/confirm/',
            method: 'POST',
            data: data
        }).then(function (response) {
            return response;
        });
    }

    function getAuthenticatedUser() {
        return $http({
            url: ApiUrls.domain_url + 'api/v1/auth/me/',
            method: 'GET'
        }).then(function (response) {
            setAuthenticatedUser(response.data);
            return response;
        }).catch(function(response) {
            console.log(response);
        });
    }

    function updateAuthenticatedUser(id, data) {
        return $http({
            url: ApiUrls.domain_url + 'api/v1/accounts/' + id + '/',
            method: 'PUT',
            data: data
        }).then(function (response) {
            setAuthenticatedUser(response.data);
            return response;
        });
    }

    function setAuthenticatedUser(user) {
        $cookies.put("notgoogleplus_auth_user", btoa(JSON.stringify(user)));
        $rootScope.$broadcast('SetAuthenticatedUser');
    }

    function fetchAuthenticatedUser() {
        return !!$cookies.get("notgoogleplus_auth_user")
            ? JSON.parse(atob($cookies.get("notgoogleplus_auth_user")))
            : undefined;
    }

    function removeAuthenticatedUser() {
        $cookies.remove("notgoogleplus_auth_user");
        $rootScope.$broadcast('RemoveAuthenticatedUser');
    }

    // @name setAuthToken
    // @desc Store the token obtained in a cookie
    // @param {string} token The token to be stored
    // @returns {undefined}
    function setAuthToken(token) {
        $cookies.put("notgoogleplus_token", token);
    }

    // @name fetchAuthToken
    // @desc Return the stored token if present
    // @returns {token|undefined} if token is present, else 'undefined'
    function fetchAuthToken() {
        var token = $cookies.get("notgoogleplus_token");
        return token ? token : undefined;
    }

    // @name removeAuthToken
    // @desc Delete the cookie where the user object is stored
    // @returns {undefined}
    function removeAuthToken() {
        $cookies.remove("notgoogleplus_token");
    }

    function getAuthHeader() {
        return fetchAuthToken() ? {'Authorization': 'Token ' + fetchAuthToken()} : undefined;
    }

    // @name isAuthenticated
    // @desc Check if the current user is authenticated
    // @returns {boolean} True if user is authenticated, else false
    function isAuthenticated() {
        return !!$cookies.get("notgoogleplus_token");
    }

    // @name isOwner
    // @param {string} username The username accessed by the user.
    // @desc Check if the current username is same as @param
    // @returns {boolean} True is user is owner, else false
    function isOwner(username) {
        var deferred = $q.defer();
        if(!fetchAuthenticatedUser()) {
            $rootScope.$on('SetAuthenticatedUser', function () {
                var authenticatedUser = fetchAuthenticatedUser();
                deferred.resolve(username === authenticatedUser.username);
            });
        } else {
            var authenticatedUser = fetchAuthenticatedUser();
            deferred.resolve(username === authenticatedUser.username);
        }
        return deferred.promise;
    }

}
