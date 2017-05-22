angular
    .module('notgoogleplus.services')
    .factory('SessionService', SessionService);

SessionService.$inject = ['$window', '$cookies'];

function SessionService ($window, $cookies) {

    // @name SessionService
    // @desc Factory function to handle user's authentication
    // check by saving the session in cookies/local storage.
    var SessionService = {};

    // @name checkWebStorage
    // @desc Function to check if localStorage feature
    // is present in browser.
    SessionService.checkWebStorage = function () {
        try {
            $window.localStorage.setItem(test, test);
            $window.localStorage.removeItem(test);

            SessionService.useWebStorage = true;
        }
        catch (e) {
            SessionService.useWebStorage = false;
        }
    };

    // @name setObject
    // @desc Function to set the key/value pair to be saved
    // in browser.
    SessionService.setObject = function (key, value) {
        if (SessionService.useWebStorage) {
            $window.localStorage[key] = JSON.stringify(value);
        }
        else {
            $cookies.put(key, JSON.stringify(value));
        }
    };

    // @name getObject
    // @desc Function to get the key/value pair to be used
    // by the application.
    SessionService.getObject = function (key) {
        if (SessionService.useWebStorage) {
            if (!!$window.localStorage[key]) {
                return JSON.parse($window.localStorage[key]);
            }
        }
        else {
            if (!!$cookies.get(key)) {
                return JSON.parse($cookies.get(key));
            }
        }
    };

    // @name removeObject
    // @desc Function to remove the key/value pair.
    SessionService.removeObject = function (key) {
        if (SessionService.useWebStorage) {
            window.localStorage.removeItem(key);
        }
        else {
            $cookies.remove(key);
        }
    };

    return SessionService;

}
