angular
    .module('notgoogleplus.controllers')
    .controller('NewPostController', NewPostController);

NewPostController.$inject = ['$rootScope', '$scope', 'Authentication', 'PostsService', 'FilterService',
    'Snackbar', '$uibModal'];

//@namespace NewPostController
function NewPostController($rootScope, $scope, Authentication, PostsService, FilterService,
                           Snackbar, $uibModal) {
    var vm = this;

    vm.closeModal = function() {
        $scope.$close();
    };

    //@name submit
    //@desc Create a new Post
    vm.submit = function() {
        PostsService.createPost(vm.content).then(function (response) {
            vm.errors = {};
            vm.closeModal();
            console.log("post created");
            $rootScope.$emit('post.created', response.data);
        }).catch(function (error) {
            vm.errors = response.data;
        });
    };

    vm.openFileModal = function() {
        $uibModal.open({
            templateUrl: '/app/js/posts/select-file.html',
            controller: 'SelectFileController',
            controllerAs: 'vm',
            windowClass: 'my-modal'
        });
    };

    var deregisterEvent = $rootScope.$on('file.uploaded', function(event, file) {
        console.log("file event caught");
    });

    $scope.$on('$destroy', deregisterEvent);

}
