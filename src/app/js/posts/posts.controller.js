angular
    .module('notgoogleplus.controllers')
    .controller('PostsController', PostsController);

PostsController.$inject = ['$rootScope', '$scope', '$state', '$stateParams',
    'Authentication', 'PostsService', 'FilterService'];

//@namespace PostsController
function PostsController($rootScope, $scope, $state, $stateParams,
    Authentication, PostsService, FilterService) {
    var vm = this;

    vm.params = $stateParams || {};

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.posts = {};
    // vm.posts.results = [];
    vm.params = angular.extend(vm.params, {
        page_size : 25,
        page: 1,
        o: "-created_at"
    });

    function getPosts () {
        PostsService.allPosts(vm.params)
            .then(function (response) {
                vm.posts.results = response.data.results;
                vm.posts.next = response.data.next;
                vm.totalItems = response.data.count;
                vm.itemsPerPage = vm.params.page_size;

                FilterService.setModelValues(vm.params);
            }).catch(function (error) {
                console.log(error);
            });
    }

    vm.getNextPosts = function () {
        if(vm.posts.next) {
            // vm.params = {};
            getPosts(vm.posts.next);
            vm.posts.next = undefined;
        }
    };

    vm.onPageChange = function() {
        getPosts();
    };

    vm.sortOptions = [
        {
            key: 'Sort by date asc',
            value: 'created_at'
        },
        {
            key: 'Sort by date desc',
            value: '-created_at'
        }
    ];

    vm.onSortChange = function() {
        getPosts();
    };

    //@name activate
    //@desc Actions to be performed when this controller is instantiated
    function activate () {
        // add default filter params to FilterService
        FilterService.initModelValues(vm.params);
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
