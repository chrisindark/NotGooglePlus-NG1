angular
    .module('notgoogleplus.config')
    .config(config);

config.$inject = ['$httpProvider', '$locationProvider', '$compileProvider'];
// @name config
// @desc Enable HTML5 routing
function config($httpProvider, $locationProvider, $compileProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);


    // $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    // $httpProvider.defaults.xsrfCookieName = 'csrftoken';

    // Add HTTP interceptor for handling requests, responses
    // requests and response errors.
    $httpProvider.interceptors.push('ErrorInterceptor');
    $httpProvider.interceptors.push('TokenInjector');

    $.material.init();

    $compileProvider.debugInfoEnabled(true);
}
