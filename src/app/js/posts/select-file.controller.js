angular
    .module('notgoogleplus.controllers')
    .controller('SelectFileController', SelectFileController);

SelectFileController.$inject = ['$rootScope', '$scope', 'Authentication', 'PostsService',
    'FilesService', 'FilterService', 'Snackbar', '$uibModal'];

//@namespace SelectFileController
function SelectFileController($rootScope, $scope, Authentication, PostsService,
                           FilesService, FilterService, Snackbar, $uibModal) {
    var vm = this;
    vm.files = {};
    vm.selectedFile = undefined;
    vm.closeModal = function() {
        $scope.$close();
    };

    //@name submit
    //@desc Create a new Post
    vm.submit = function() {
        console.log(vm.selectedFile);
        // $rootScope.$emit('file.selected', 'vm.file');
        // Posts.createPost(vm.content).then(function (response) {
        //     if(response.data.error) {
        //         vm.errors = response.data;
        //     } else {
        //         vm.errors = {};
        //         vm.closeModal();
        //         console.log("post created");
        //         $rootScope.$broadcast('file.uploaded', response.data);
        //     }
        // });
    };

    $scope.$watch(vm.selectedFile, function (oldValue, newValue) {
        console.log(oldValue);
        console.log(newValue);
    });

    function getFiles() {
        FilesService.allFiles(vm.params).then(function (response) {
            vm.files.results = response.data.results;
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }

    function activate () {
        vm.params = FilterService.getModelValues();
        getFiles();
    }

    activate();

}
