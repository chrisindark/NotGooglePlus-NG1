angular
    .module('notgoogleplus.controllers')
    .controller('ProfileController', ProfileController);

ProfileController.$inject = ['$scope', '$state', '$stateParams', '$timeout', 'Authentication', 'Posts', 'Profile', 'Snackbar'];

//@namespace ProfileController
function ProfileController($scope, $state, $stateParams, $timeout, Authentication, Posts, Profile, Snackbar) {
    var vm = this;

    var username = $stateParams.username;
    vm.showLoading = false;
    vm.loadMore = false;
    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.profile = {};
    vm.posts = {};
    vm.posts.results = [];

    vm.params = {
        'user__username': username,
        'o': '-created_at',
        'page_size': 10
    };

    function getProfile() {
        Profile.getProfile(username).then(function(response) {
            if(response.data.id) {
                vm.profile = response.data;
                vm.profile.username = username;
                getPosts();
            }
        });
    }

    function isOwner() {
        if(vm.isAuthenticated) {
            Authentication.isOwner(username).then(function(response) {
                vm.isOwner = response;
            });
        }
    }

    function getPosts(url) {
        vm.showLoading = true;
        Posts.allPosts(url, vm.params).then(function(response) {
            if(response.data.results) {
                vm.posts.results = vm.posts.results.concat(response.data.results);
                vm.posts.next = response.data.next;
                $timeout(function() {
                    vm.loadMore = !!vm.posts.next;
                    vm.showLoading = false;
                }, 100);
            }
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
            Posts.removePost(post.author.username, post.id).then(postSuccessFn, postErrorFn);

            function postSuccessFn(data, status, headers, config) {
                Snackbar.show("Success! Post deleted.");
            }

            function postErrorFn(data, status, headers, config) {
                console.log(removedPost[0]);
                vm.posts.splice(index, 0, removedPost[0]);
                Snackbar.error(data.error);
            }
        }
    };

    //@name activate
    //@desc Actions to be performed when the controller is instantiated
    function activate() {
        getProfile();
        isOwner();
    }

    activate();

    $scope.$on('post.created', function (event, post) {
        console.log("post event caught");
        vm.posts.results.unshift(post);
    });

}
