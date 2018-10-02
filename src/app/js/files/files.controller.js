(function () {
    angular
        .module('notgoogleplus.controllers')
        .controller('FilesController', FilesController);

    FilesController.$inject = ['$rootScope', '$scope', 'Authentication', 'FilesService', 'FilterService'];

    //@namespace FilesController
    function FilesController($rootScope, $scope, Authentication, FilesService, FilterService) {
        var vm = this;

        vm.files = {};

        vm.getS3Files = function () {
            FilesService.allS3Uploads()
                .then(function (response) {
                    vm.files.results = response.data.results;
                }).catch(function (error) {
                console.log(error);
            });
        };

        vm.getFiles = function () {
            FilesService.allFiles(vm.user.username, vm.params)
                .then(function (response) {
                    vm.files.results = response.data.results;
                    vm.files.next = response.data.next;
                    vm.totalItems = response.data.count;
                    vm.itemsPerPage = vm.params.page_size;
                }).catch(function (error) {
                console.log(error);
            });
        };

        function activate () {
            vm.user = Authentication.fetchAuthenticatedUser();
            vm.params = FilterService.getModelValues();
            vm.getFiles();
        }

        activate();

    }

})();
