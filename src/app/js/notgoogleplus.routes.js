angular
    .module('notgoogleplus.routes')
    .config(routeConfig);

routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

// @name config
// @desc Define valid application states
function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/posts',
            controller: 'PostsController',
            controllerAs: 'vm',
            templateUrl: 'app/templates/posts/posts.html'
        })
        .state('passwordResetConfirm', {
            url: '/password/reset/confirm/:uid/:token',
            controller: 'AuthenticationController',
            controllerAs: 'vm',
            templateUrl: 'app/templates/authentication/password-reset-confirm.html'
        })
        .state('profile', {
            url: '/+:username',
            controller: 'ProfileController',
            controllerAs: 'vm',
            templateUrl: 'app/templates/profiles/profile.html'
        })
        .state('profileSettings', {
            url: '/+:username/settings',
            controller: 'ProfileSettingsController',
            controllerAs: 'vm',
            templateUrl: 'app/templates/profiles/profile-settings.html'
        });

    $urlRouterProvider.otherwise('/');
}
