angular
    .module('notgoogleplus.controllers')
    .controller('ProfileController', ProfileController);

ProfileController.$inject = ['$scope', '$state', '$stateParams', '$timeout', 'Authentication', 'PostsService', 'ProfileService', 'Snackbar'];

//@namespace ProfileController
function ProfileController($scope, $state, $stateParams, $timeout, Authentication, PostsService, ProfileService, Snackbar) {
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
        ProfileService.getProfile(username).then(function(response) {
            vm.profile = response.data;
            vm.profile.username = username;
            getPosts();
        }).catch(function(error) {

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
        PostsService.allPosts(url, vm.params).then(function(response) {
            vm.posts.results = vm.posts.results.concat(response.data.results);
            vm.posts.next = response.data.next;
            $timeout(function() {
                vm.loadMore = !!vm.posts.next;
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
                console.log(removedPost[0]);
                vm.posts.splice(index, 0, removedPost[0]);
                Snackbar.error(error);
            });
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
