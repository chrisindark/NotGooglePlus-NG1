angular
    .module('notgoogleplus.controllers')
    .controller('FilesController', FilesController);

FilesController.$inject = ['$rootScope', '$scope', 'Authentication', 'FilesService',
    'PostsService', 'FilterService', 'PopupService'];

//@namespace FilesController
function FilesController($rootScope, $scope, Authentication, FilesService,
                         PostsService, FilterService, PopupService) {
    var vm = this;
    vm.user = Authentication.fetchAuthenticatedUser();
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

    $scope.$watch('vm.selectedFile', function (newValue, oldValue) {
        if (newValue) {
            // vm.closeModal();
            console.log(newValue);
        }
        console.log(newValue);
        // vm.files.results.push();
    });

    function getFiles() {
        FilesService.allFiles(vm.user.username, vm.params)
            .then(function (response) {
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
