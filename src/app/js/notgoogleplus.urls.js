angular
    .module('notgoogleplus.utils')
    .factory('ApiUrls', ApiUrls);

ApiUrls.$inject = [];

function ApiUrls() {
    var ApiUrls = {};
    ApiUrls.domain_url = 'http://localhost:8000/';

    return ApiUrls;
}
