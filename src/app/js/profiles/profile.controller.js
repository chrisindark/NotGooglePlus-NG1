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
    vm.profile = {};
    vm.posts = {};
    vm.posts.results = [];

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

    function getProfile() {
        ProfileService.getProfile(vm.username).then(function(response) {
            vm.profile = response.data;
            // getPosts();
        }).catch(function(error) {
            console.log(error);
        });
    }

    function getPosts(url) {
        vm.showLoading = true;
        PostsService.allPosts(url, vm.params).then(function(response) {
            vm.posts.results = vm.posts.results.concat(response.data.results);
            vm.posts.next = response.data.next;
            $timeout(function() {
                vm.loadMore = !!vm.posts.next;
                vm.showLoading = false;
            }, 100);
        });
    }

    function getArticles(url) {
        vm.showLoading = true;
        ArticlesService.allArticles(url, vm.params).then(function(response) {
            vm.articles.results = vm.articles.results.concat(response.data.results);
            vm.articles.next = response.data.next;
            $timeout(function() {
                vm.loadMore = !!vm.articles.next;
                vm.showLoading = false;
            }, 100);
        });
    }

    vm.getNextPosts = function() {
        if(vm.posts.next) {
            vm.params = {};
            getPosts(vm.posts.next);
            vm.posts.next = undefined;
        }
    };

    vm.removePost = function(post, index) {
        if (vm.isOwner) {
            var removedPost = vm.posts.splice(index, 1);
            PostsService.removePost(post.author.username, post.id).then(function(response) {
                Snackbar.show("Success! Post deleted.");
            }).catch(function(error) {
                vm.posts.splice(index, 0, removedPost[0]);
                Snackbar.error(error);
            });
        }
    };

    function isOwner() {
        if(vm.isAuthenticated) {
            Authentication.isOwner(vm.username).then(function(response) {
                vm.isOwner = response;
            });
        }
    }

    //@name activate
    //@desc Actions to be performed when the controller is instantiated
    function activate() {
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

    $scope.$on('post.created', function (event, post) {
        console.log("post event caught");
        vm.posts.results.unshift(post);
    });

}
