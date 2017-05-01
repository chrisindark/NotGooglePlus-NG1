// @name HttpInterceptor
// @desc Factory function to handle HTTP requests
// responses, and errors.
angular
    .module('notgoogleplus.utils')
    .factory('HttpInterceptor', HttpInterceptor);

HttpInterceptor.$inject = ['$rootScope', '$q', '$injector'];

function HttpInterceptor($rootScope, $q, $injector) {
    var HttpInterceptor = {};

    // @name request
    // @desc Function to check http request before
    // sending it to server.
    HttpInterceptor.request = function (config) {
        var Authentication = $injector.get('Authentication');
        var authHeader = Authentication.getAuthHeader();
        if (authHeader) {
            _.extend(config.headers, authHeader);
        }
        return config;
    };

    // @name requestError
    // @desc Function to catch http request errors
    HttpInterceptor.requestError = function (config) {
        return config;
    };

    // @name response
    // @desc Function to check http response before
    // sending it to service.
    HttpInterceptor.response = function (res) {
        return res;
    };

    // @name responseError
    // @desc Function to check http response errors
    // and show the respective error messages.
    HttpInterceptor.responseError = function (res) {
        // var $state = $injector.get('$state');

        // @desc Get the respective error message
        // according to the status code.
        var statusText = HttpInterceptor.formatErrorMessage(res.status);
        // HttpInterceptor.showErrorMessage(statusText);
        console.log("error: ", statusText);

        if (res.status === '401') {
            $rootScope.$broadcast('Unauthenticated');
            // $state.go('startup');
        }
        else if (res.status === '400' || res.status === '403' ||
            res.status === '500' || res.status === '503') {
            // $state.go('startup');
        }
        else if (res.status === '404') {
            // $state.go('error');
        }

        var deferred = $q.defer();
        deferred.reject(res);
        return deferred.promise;
        // return res;
    };

    // @name formatErrorMessage
    // @desc Function to send the error message.
    // @param status error code of the response
    // @returns the message for the status code.
    HttpInterceptor.formatErrorMessage = function (status) {
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
    // HttpInterceptor.showErrorMessage = function (statusText) {
    //     var PopupService = $injector.get('PopupService');
    //     PopupService.show(statusText);
    // };

    return HttpInterceptor;
}
