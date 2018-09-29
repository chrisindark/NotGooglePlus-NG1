(function () {
    angular
        .module('notgoogleplus.controllers')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', '$state', '$stateParams', '$timeout', 'Authentication',
        'ProfileService', 'PostsService', 'ArticlesService', 'Snackbar'];

    //@namespace ProfileController
    function ProfileController($scope, $state, $stateParams, $timeout, Authentication,
                               ProfileService, PostsService, ArticlesService, Snackbar) {
        var vm = this;

        vm.username = $stateParams.username;
        vm.showLoading = false;
        vm.loadMore = false;
        vm.isAuthenticated = Authentication.isAuthenticated();
        // vm.profile = {};
        // vm.posts = {};
        // vm.posts.results = [];

        vm.tabList = {
            'profilePosts': {
                'heading': 'Posts',
                'href': 'profilePosts'
            },
            'profileArticles': {
                'heading': 'Articles',
                'href': 'profileArticles'
            }
        };

        function getProfile () {
            ProfileService.getProfile(vm.username)
                .then(function (response) {
                    vm.profile = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function getPosts (url) {
            vm.showLoading = true;
            PostsService.allPosts(url, vm.params)
                .then(function (response) {
                    vm.posts.results = vm.posts.results.concat(response.data.results);
                    vm.posts.next = response.data.next;
                    $timeout(function () {
                        vm.loadMore = !!vm.posts.next;
                        vm.showLoading = false;
                    }, 100);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        vm.getNextPosts = function () {
            if (vm.posts.next) {
                vm.params = {};
                getPosts(vm.posts.next);
                vm.posts.next = undefined;
            }
        };

        function getArticles (url) {
            vm.showLoading = true;
            ArticlesService.allArticles(url, vm.params)
                .then(function (response) {
                    vm.articles.results = vm.articles.results.concat(response.data.results);
                    vm.articles.next = response.data.next;
                    $timeout(function () {
                        vm.loadMore = !!vm.articles.next;
                        vm.showLoading = false;
                    }, 100);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        vm.getNextArticles = function () {
            if (vm.articles.next) {
                vm.params = {};
                getArticles(vm.articles.next);
                vm.articles.next = undefined;
            }
        };

        function isOwner () {
            if (vm.isAuthenticated) {
                Authentication.isOwner(vm.username)
                    .then(function (response) {
                        vm.isOwner = response;
                    });
            }
        }

        //@name activate
        //@desc Actions to be performed when the controller is instantiated
        function activate () {
            getProfile();
            isOwner();

            vm.params = {
                'username': vm.username
            };

            if ($state.current.name === 'profile') {
                // if state is 'profile' redirect to another state
                // as if profile is abstract
                $state.go('profilePosts', vm.params);
            }
        }

        activate();

    }

})();
