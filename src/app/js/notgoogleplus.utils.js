(function () {
    // @name ErrorInterceptor
    // @desc Factory function to handle HTTP requests
    // responses, and errors.
    angular
        .module('notgoogleplus.utils')
        .factory('ErrorInterceptor', ErrorInterceptor);

    ErrorInterceptor.$inject = ['$rootScope', '$q', '$injector'];

    function ErrorInterceptor($rootScope, $q, $injector) {
        var ErrorInterceptor = {};

        // @name request
        // @desc Function to check http request before
        // sending it to server.
        ErrorInterceptor.request = function (config) {
            return config;
        };

        // @name requestError
        // @desc Function to catch http request errors
        ErrorInterceptor.requestError = function (config) {
            return config;
        };

        // @name response
        // @desc Function to check http response before
        // sending it to service.
        ErrorInterceptor.response = function (response) {
            return response;
        };

        // @name responseError
        // @desc Function to check http response errors
        // and show the respective error messages.
        ErrorInterceptor.responseError = function (response) {
            // var $state = $injector.get('$state');

            // @desc Get the respective error message
            // according to the status code.
            var statusText = ErrorInterceptor.formatErrorMessage(response.status);
            // ErrorInterceptor.showErrorMessage(statusText);
            console.log("error: ", statusText);

            if (response.status === 401 || response.status === 403) {
                $rootScope.$broadcast('Unauthenticated');
            } else if (response.status === 400 || response.status === 500) {
                // do something
            } else if (response.status === 404) {
                $rootScope.$broadcast('ErrorIntercepted', {
                    response: response,
                    statusText: statusText
                });
            } else if (response.status === 503) {
                // do something
            }

            var deferred = $q.defer();
            deferred.reject(response);
            return deferred.promise;
        };

        // @name formatErrorMessage
        // @desc Function to send the error message.
        // @param status error code of the response
        // @returns the message for the status code.
        ErrorInterceptor.formatErrorMessage = function (status) {
            var errorMessages = {
                400: "Problem occurred while serving last request.",
                401: "Either you have been logged out or your session has expired. Please login again to continue.",
                403: "Access is not allowed, please try again with right credentials.",
                404: "We could not find what you were looking for.",
                500: "Oops, something went wrong. Please try again.",
                503: "Service unavailable at the moment. Please try after some time."
            };

            if (errorMessages[status]) {
                return errorMessages[status];
            }

            switch(status) {
                case -1:
                    return "The Internet connection appears to be offline.";
                case 0:
                    return "Could not connect to server.";
                default:
                    return "An unexpected error occurred."
            }
        };

        // @name showErrorMessage
        // @desc Function to show the error message
        // in a popup.
        // ErrorInterceptor.showErrorMessage = function (statusText) {
        //     var PopupService = $injector.get('PopupService');
        //     PopupService.show(statusText);
        // };

        return ErrorInterceptor;
    }

    angular
        .module('notgoogleplus.utils')
        .factory('HeaderInterceptor', HeaderInterceptor);

    function HeaderInterceptor() {
        return {
            request: function (config) {
                var authHeader = config.headers('authorization');
                // Check for the host
                var regex = '/api.cloudinary.com/i';
                if (regex.test(config.url)) {
                    //Detach the header
                    delete config.headers.authorization;
                }
                return config;
            }
        }
    }

    angular
        .module('notgoogleplus.utils')
        .factory('TokenInjector', TokenInjector);

    TokenInjector.$inject = ['$rootScope', '$q', '$injector'];

    function TokenInjector($rootScope, $q, $injector) {
        var TokenInjector = {};

        TokenInjector.request = function (config) {
            if (config.skipAuthorization && config.skipAuthorization === true) {
                delete config.skipAuthorization;
                return config;
            }

            var Authentication = $injector.get('Authentication');
            var authHeader = Authentication.getAuthHeader();
            if (authHeader) {
                _.extend(config.headers, authHeader);
            }
            return config;
        };

        return TokenInjector;
    }

    angular
        .module('notgoogleplus.utils')
        .factory('TimestampMarker', TimestampMarker);

    TimestampMarker.$inject = ['$rootScope', '$q', '$injector'];

    function TimestampMarker($rootScope, $q, $injector) {
        var TimestampMarker = {};

        TimestampMarker.request = function (config) {
            config.requestTimestamp = new Date().getTime();
            return config;
        };

        TimestampMarker.response = function (response) {
            response.config.responseTimestamp = new Date().getTime();
            return response;
        };

        return TimestampMarker;
    }

    angular
        .module('notgoogleplus.utils')
        .factory('AppVersionInterceptor', AppVersionInterceptor);

    AppVersionInterceptor.$inject = ['$window'];

    function AppVersionInterceptor($window) {
        var AppVersionInterceptor = {};

        AppVersionInterceptor.response = function (response) {
            var headerVersion = response.headers()['app-version'];
            var appVersion = $window.localStorage['app-version'];

            // check if headerVersion is present (not present when assets are served)
            // and either appVersion is not present or headerVersion and appVersion
            // dont match, then store the new version and reload tab.
            if (!!headerVersion && (!appVersion || headerVersion !== appVersion)) {
                $window.localStorage['app-version'] = headerVersion;
                $window.location.reload();
            }
            return response
        };

        return AppVersionInterceptor;
  }

})();
