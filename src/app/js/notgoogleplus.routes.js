angular
    .module('notgoogleplus.routes')
    .config(routeConfig);

routeConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$injector'];

// @name routeConfig
// @desc Define valid application states
function routeConfig($stateProvider, $urlRouterProvider, $injector) {
    $stateProvider
        .state('home', {
            url: '/home',
            controller: 'HomeController',
            controllerAs: 'vm',
            templateUrl: 'app/js/layout/home.html',
            redirectTo: 'posts'
        })
        .state('tabs', {
            abstract: true,
            parent: 'home',
            url: '/tabs',
            templateUrl: 'app/js/layout/tabs.html'
        })
        .state('posts', {
            parent: 'tabs',
            url: '/posts',
            controller: 'PostsController',
            controllerAs: 'vm',
            templateUrl: 'app/js/posts/posts.html'
        })
        .state('articles', {
            parent: 'tabs',
            url: '/articles',
            controller: 'ArticlesController',
            controllerAs: 'vm',
            templateUrl: 'app/js/articles/articles.html'
        })
        .state('emailResendConfirm', {
            parent: 'home',
            url: '/email/resend/confirm',
            controller: 'AuthenticationController',
            controllerAs: 'vm',
            templateUrl: 'app/js/authentication/email-resend-confirm.html'
        })
        .state('passwordResetConfirm', {
            parent: 'home',
            url: '/password/reset/confirm/:uid/:token',
            controller: 'AuthenticationController',
            controllerAs: 'vm',
            templateUrl: 'app/js/authentication/password-reset-confirm.html'
        })
        .state('profile', {
            parent: 'home',
            url: '/+:username',
            controller: 'ProfileController',
            controllerAs: 'vm',
            templateUrl: 'app/js/profiles/profile.html',
            resolve: {
                isAuthenticated: function ($state) {
                    console.log($state);
                }
            }
        })
        .state('profileSettings', {
            parent: 'home',
            url: '/+:username/settings',
            controller: 'ProfileSettingsController',
            controllerAs: 'vm',
            templateUrl: 'app/js/profiles/profile-settings.html',
            resolve: {}
        })
        .state('error', {
            parent: 'home',
            url: '/error',
            templateUrl: 'app/js/layout/error.html',
            controller: 'ErrorController',
            controllerAs: 'vm'
        });

    $urlRouterProvider.when('/', ['$state', function ($state) {
        $state.go('posts');
    }]);
    $urlRouterProvider.otherwise('/');
}
