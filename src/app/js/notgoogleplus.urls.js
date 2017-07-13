(function () {
    angular
        .module('notgoogleplus.utils')
        .factory('ApiUrls', ApiUrls);

    ApiUrls.$inject = [];

    function ApiUrls() {
        var ApiUrls = {};
        // ApiUrls.domainUrl = 'http://localhost:8000/';
        // ApiUrls.domainUrl = 'http://192.168.1.104:8000/';
        ApiUrls.domainUrl = 'https://ancient-tor-16694.herokuapp.com/';

        return ApiUrls;
    }

})();
