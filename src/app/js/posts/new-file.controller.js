angular
    .module('notgoogleplus.controllers')
    .controller('NewFileController', NewFileController);

NewFileController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Posts', '$uibModal'];

//@namespace NewFileController
function NewFileController($rootScope, $scope, Authentication, Snackbar, Posts, $uibModal) {
    var vm = this;

    vm.closeModal = function() {
        $scope.$close();
    };

    //@name submit
    //@desc Create a new Post
    vm.submit = function() {
        $rootScope.$emit('file.selected', 'vm.file');
        // Posts.createPost(vm.content).then(function (response) {
        //     if(response.data.error) {
        //         vm.errors = response.data;
        //     } else {
        //         vm.errors = {};
        //         vm.closeModal();
        //         console.log("post created");
        //         $rootScope.$broadcast('post.created', response.data);
        //     }
        // });
    };

}
