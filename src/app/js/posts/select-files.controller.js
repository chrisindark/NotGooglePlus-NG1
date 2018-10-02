(function () {
    angular
        .module('notgoogleplus.controllers')
        .controller('SelectFilesController', SelectFilesController);

    SelectFilesController.$inject = ['$rootScope', '$scope', 'Authentication',
        'FilesService', 'FilterService'];

    //@namespace SelectFilesController
    function SelectFilesController($rootScope, $scope, Authentication,
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

        var deregisterEventReceived = $rootScope.$on('file.received', function (event, file) {
            // console.log("file.received event caught");
            // console.log(file);
            vm.selectedFile = file;
        });

        $scope.$on('$destroy', deregisterEventReceived);

        var deregisterEventUploaded = $rootScope.$on('file.uploaded', function (event, file) {
            // console.log("file.uploaded event caught");
            // console.log(file);
            vm.files.results.unshift(file);
            vm.selectedFile = file;
        });

        $scope.$on('$destroy', deregisterEventUploaded);

        function getS3Files() {
            FilesService.allS3Uploads()
                .then(function (response) {
                    vm.files.results = response.data.results;
                }).catch(function (error) {
                    console.log(error);
                });
        }

        function getFiles() {
            FilesService.getUserFiles(vm.user.username, vm.params)
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
