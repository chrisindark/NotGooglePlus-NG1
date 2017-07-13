(function () {
    angular
        .module('notgoogleplus.controllers')
        .controller('FilesController', FilesController);

    FilesController.$inject = ['$rootScope', '$scope', 'Authentication',
        'FilesService', 'FilterService'];

    //@namespace FilesController
    function FilesController($rootScope, $scope, Authentication,
                             FilesService, FilterService) {
        var vm = this;

        vm.files = {};
        vm.selectedFile = undefined;

        vm.closeModal = function() {
            $scope.$close();
        };

        vm.submit = function () {
            $rootScope.$emit('file.selected', vm.selectedFile);
            vm.closeModal();
        };

        vm.selectFile = function (file) {
            if (vm.selectedFile && vm.selectedFile.id === file.id) {
                vm.selectedFile = undefined;
                return;
            }
            vm.selectedFile = file;
        };

        $scope.$watch('vm.selectedFile', function (newValue, oldValue) {
            if (newValue) {
                // vm.closeModal();
            }
            // vm.files.results.push();
        });

        var deregisterEventReceived = $rootScope.$on('file.received', function (event, file) {
            console.log("file.received event caught");
            console.log(file);
            vm.selectedFile = file;
        });

        $scope.$on('$destroy', deregisterEventReceived);

        var deregisterEventUploaded = $rootScope.$on('file.uploaded', function (event, file) {
            console.log("file.uploaded event caught");
            console.log(file);
            vm.files.results.push(file);
            vm.selectedFile = file;
        });

        $scope.$on('$destroy', deregisterEventUploaded);

        function getFiles() {
            FilesService.allFiles(vm.user.username, vm.params)
                .then(function (response) {
                    vm.files.results = response.data.results;
                }).catch(function (error) {
                    console.log(error);
                });
        }

        function activate () {
            vm.user = Authentication.fetchAuthenticatedUser();
            vm.params = FilterService.getModelValues();
            getFiles();
        }

        activate();

    }

})();
