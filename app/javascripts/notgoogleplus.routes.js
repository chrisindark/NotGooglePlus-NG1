angular
    .module('notgoogleplus.routes')
    .config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider', '$injector'];

// @name config
// @desc Define valid application states
function config($stateProvider, $urlRouterProvider, $injector) {
    $stateProvider
        .state('home', {
            url: '/',
            controller: 'PostsController',
            controllerAs: 'vm',
            templateUrl: '/templates/posts/posts.html'
        })
        .state('passwordResetConfirm', {
            url: '/password/reset/confirm/:uid/:token',
            controller: 'AuthenticationController',
            controllerAs: 'vm',
            templateUrl: '/templates/authentication/password-reset-confirm.html'
        })
        .state('profile', {
            url: '/+:username',
            controller: 'ProfileController',
            controllerAs: 'vm',
            templateUrl: '/templates/profiles/profile.html'
        })
        .state('profileSettings', {
            url: '/+:username/settings',
            controller: 'ProfileSettingsController',
            controllerAs: 'vm',
            templateUrl: '/templates/profiles/profile-settings.html',
        });

    $urlRouterProvider.otherwise('/');
}
