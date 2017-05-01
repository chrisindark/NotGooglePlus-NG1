angular
    .module('notgoogleplus.controllers')
    .controller('PostsController', PostsController);

PostsController.$inject = ['$rootScope', '$scope', '$timeout', 'Authentication', 'Posts', 'Snackbar'];

//@namespace PostsController
function PostsController($rootScope, $scope, $timeout, Authentication, Posts, Snackbar) {
    var vm = this;

    vm.showLoading = false;
    vm.loadMore = false;
    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.posts = {};
    vm.posts.results = [];

    vm.params = {
        'o': '-created_at',
        'page_size': 50
    };

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

    //@name activate
    //@desc Actions to be performed when this controller is instantiated
    function activate() {
        getPosts();
    }

    activate();

    var deregisterEvent = $rootScope.$on('post.created', function (event, post) {
        console.log("post event caught");
        vm.posts.results.unshift(post);
    });

    $scope.$on('$destroy', deregisterEvent);

    vm.lineInView = function(index, inview, inviewpart) {
        if (inview) {
            // inviewpart.element.css("visibility", "visible");
            console.log(inview);
            console.log(inviewpart);
        } else {
            console.log(inviewpart);
            // inviewpart.element.css("visibility", "hidden");
        }
    };

}
