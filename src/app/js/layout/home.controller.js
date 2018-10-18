(function () {
    angular
        .module('notgoogleplus.controllers')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', '$scope', '$state', 'Authentication', 'AccountsService', 'TagsService',
        'SeoService'];

    // @namespace HomeController
    function HomeController($rootScope, $scope, $state, Authentication, AccountsService, TagsService,
                            SeoService) {
        var vm = this;

        vm.tabList = {
            'posts': {
                'heading': 'Posts',
                'href': 'posts'
            },
            'articles': {
                'heading': 'Articles',
                'href': 'articles'
            }
        };

        function redirectToState() {
            if ($state.current.name === 'home') {
                // if state is 'home' redirect to another state
                // as if home is abstract
                $state.go('posts');
            }
        }

        function activate() {
            SeoService.setTitle('Notgoogleplus Home');
            SeoService.setDescription('Home');

            // console.log("HomeController loaded");
            if (Authentication.isAuthenticated() && !Authentication.fetchAuthenticatedUser() ) {
                return AccountsService.getAuthenticatedUser();
            }

            redirectToState();
        }

        function addEventListeners() {
            var deregisterEventStateChangeStart = $rootScope.$on('$stateChangeStart', function (
                event, toState, toParams, fromState, fromParams, options) {
                // console.log(toState.name);
            });

            var deregisterEventStateChangeSuccess = $rootScope.$on('$stateChangeSuccess', function (
                event, toState, toParams, fromState, fromParams, options) {
                // console.log(toState.name);
            });

            $scope.$on('$destroy', function () {
                deregisterEventStateChangeStart();
                deregisterEventStateChangeSuccess();
            });
        }

        activate();
        addEventListeners();
    }

})();
