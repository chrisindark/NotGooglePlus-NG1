(function () {
    angular
        .module('notgoogleplus.utils')
        .service('ApiUrls', ApiUrls);

    ApiUrls.$inject = [];

    function ApiUrls() {
        // var self = this;
        // var ApiUrls = {};
        // ApiUrls.domainUrl = 'http://localhost:8000/';
        // return ApiUrls;

        this.domainUrl = 'https://ancient-tor-16694.herokuapp.com/';
    }

})();
