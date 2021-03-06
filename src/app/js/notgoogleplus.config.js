(function () {
    angular
        .module('notgoogleplus.config')
        .config(config);

    config.$inject = ['$httpProvider', '$locationProvider', '$compileProvider', '$qProvider',
        '$ocLazyLoadProvider'];
    // @name config
    // @desc Enable HTML5 routing
    function config($httpProvider, $locationProvider, $compileProvider, $qProvider,
                    $ocLazyLoadProvider) {
        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode(true);

        // $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        // $httpProvider.defaults.xsrfCookieName = 'csrftoken';

        // Add HTTP interceptor for handling requests, responses
        // requests and response errors.
        $httpProvider.interceptors.push('ErrorInterceptor');
        $httpProvider.interceptors.push('TokenInjector');
        $httpProvider.interceptors.push('AppVersionInterceptor');

        // initialize materialjs for bootstrap
        $.material.init();

        $compileProvider.debugInfoEnabled(false);
        $qProvider.errorOnUnhandledRejections(false);

        $ocLazyLoadProvider.config({
            debug: false,
            events: false,
            modules: []
        });
    }

})();
