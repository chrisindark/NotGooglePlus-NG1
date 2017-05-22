angular
    .module('notgoogleplus.controllers')
    .controller('PostsController', PostsController);

PostsController.$inject = ['$rootScope', '$scope', '$state', 'Authentication', 'PostsService', 'FilterService'];

//@namespace PostsController
function PostsController($rootScope, $scope, $state, Authentication, PostsService, FilterService) {
    var vm = this;

    vm.showLoading = false;
    vm.loadMore = false;
    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.posts = {};
    // vm.posts.results = [];

    function getPosts() {
        vm.showLoading = true;
        PostsService.allPosts(vm.params).then(function (response) {
            vm.posts.results = response.data.results;
            vm.posts.next = response.data.next;
            vm.totalItems = response.data.count;
            vm.itemsPerPage = vm.params.page_size;

            FilterService.setModelValues(vm.params);

        }).catch(function (error) {
            console.log(error);
        });
    }

    vm.getNextPosts = function() {
        if(vm.posts.next) {
            // vm.params = {};
            getPosts(vm.posts.next);
            vm.posts.next = undefined;
        }
    };

    vm.onPageChange = function() {
        getPosts();
    };

    vm.onSortChange = function() {
        getPosts();
    };

    //@name activate
    //@desc Actions to be performed when this controller is instantiated
    function activate() {
        vm.params = FilterService.getModelValues();
        getPosts();
    }

    activate();

    var deregisterEvent = $rootScope.$on('post.created', function (event, post) {
        console.log("post event caught");
        vm.posts.results.unshift(post);
    });

    $scope.$on('$destroy', deregisterEvent);

}
