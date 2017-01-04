angular
    .module('notgoogleplus.controllers')
    .controller('NewPostController', NewPostController);

NewPostController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Posts', '$uibModal'];

//@namespace NewPostController
function NewPostController($rootScope, $scope, Authentication, Snackbar, Posts, $uibModal) {
    var vm = this;

    vm.closeModal = function() {
        $scope.$close();
    };

    //@name submit
    //@desc Create a new Post
    vm.submit = function() {
        Posts.createPost(vm.content).then(function (response) {
            if(response.data.error) {
                vm.errors = response.data;
            } else {
                vm.errors = {};
                vm.closeModal();
                console.log("post created");
                $rootScope.$emit('post.created', response.data);
            }
        });
    };

    vm.openFileModal = function() {
        $uibModal.open({
            templateUrl: '/templates/posts/new-file.html',
            controller: 'NewFileController',
            controllerAs: 'vm',
            windowClass: 'my-modal'
        });
    };

    var deregisterEvent = $rootScope.$on('file.selected', function(event, file) {
        console.log("file event caught");
    });

    $scope.$on('$destroy', deregisterEvent);

}
