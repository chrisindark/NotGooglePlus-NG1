(function () {
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
                templateUrl: 'app/js/layout/home.html'
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
                templateUrl: 'app/js/posts/posts.html',
                params: {
                    params: null
                }
            })
            .state('articles', {
                parent: 'tabs',
                url: '/articles',
                controller: 'ArticlesController',
                controllerAs: 'vm',
                templateUrl: 'app/js/articles/articles.html',
                params: {
                    params: null
                }
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
                templateUrl: 'app/js/profiles/profile.html'
            })
            .state('profilePosts', {
                parent: 'profile',
                url: '/posts',
                controller: 'PostsController',
                controllerAs: 'vm',
                templateUrl: 'app/js/posts/posts.html',
                params: {
                    username: null
                }
            })
            .state('profileArticles', {
                parent: 'profile',
                url: '/articles',
                controller: 'ArticlesController',
                controllerAs: 'vm',
                templateUrl: 'app/js/articles/articles.html',
                params: {
                    params: null
                }
            })
            .state('profileSettings', {
                parent: 'profile',
                url: '/+:username/settings',
                controller: 'ProfileSettingsController',
                controllerAs: 'vm',
                templateUrl: 'app/js/profiles/profile-settings.html',
                resolve: {}
            })
            .state('postNew', {
                parent: 'home',
                url: '/posts/new',
                templateUrl: 'app/js/posts/post-detail.html',
                controller: 'PostDetailController',
                controllerAs: 'vm'
            })
            .state('postDetail', {
                parent: 'home',
                url: '/posts/{id:int}',
                templateUrl: 'app/js/posts/post-detail.html',
                controller: 'PostDetailController',
                controllerAs: 'vm'
            })
            .state('articleNew', {
                parent: 'home',
                url: '/articles/new',
                templateUrl: 'app/js/articles/article-detail.html',
                controller: 'ArticleDetailController',
                controllerAs: 'vm'
            })
            .state('articleDetail', {
                parent: 'home',
                url: '/articles/{id:int}',
                templateUrl: 'app/js/articles/article-detail.html',
                controller: 'ArticleDetailController',
                controllerAs: 'vm'
            })
            .state('error', {
                parent: 'home',
                url: '/error',
                templateUrl: 'app/js/layout/error.html',
                controller: 'ErrorController',
                controllerAs: 'vm',
                params: {
                    errorObj: null
                }
            });

        $urlRouterProvider.when('/', urlRouterConfig);

        urlRouterConfig.$inject = ['$state'];

        function urlRouterConfig($state) {
            $state.go('home');
        }

        $urlRouterProvider.otherwise('/');
    }

})();
