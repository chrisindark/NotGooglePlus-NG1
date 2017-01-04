angular
    .module('notgoogleplus.config')
    .config(config);

config.$inject = ['$httpProvider', '$locationProvider', '$compileProvider'];
// @name config
// @desc Enable HTML5 routing
function config($httpProvider, $locationProvider, $compileProvider) {
    // $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    // $httpProvider.defaults.xsrfCookieName = 'csrftoken';

    // Add HTTP interceptor for handling requests, responses
    // requests and response errors.
    $httpProvider.interceptors.push('HttpInterceptor');

    // $locationProvider.html5Mode(true);
    // $locationProvider.hashPrefix('!');

    $.material.init()

    // $mdThemingProvider.theme('default')
    //     .primaryPalette('teal')
    //     .accentPalette('blue')
    //     .warnPalette('red')
    //     .backgroundPalette('grey');

    // $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();

    $compileProvider.debugInfoEnabled(true);
}
