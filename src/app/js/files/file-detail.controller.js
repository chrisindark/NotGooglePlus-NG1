(function () {
    angular
        .module('notgoogleplus.controllers')
        .controller('FileDetailController', FileDetailController);

    FileDetailController.$inject = ['$state', '$stateParams', 'Authentication', 'FilesService'];

    function FileDetailController($state, $stateParams, Authentication, FilesService) {
        var vm = this;

        vm.fileId = $stateParams.id;
        vm.file = null;

        vm.getFile = function () {
            if (vm.fileId) {
                FilesService.getFile(vm.fileId)
                    .then(function (response) {
                        vm.file = response.data;
                        isOwner();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                vm.file = {};
                vm.editMode = true;
                vm.formTitle = 'New File';
            }
        };

        function isOwner() {
            Authentication.isOwner(vm.file.user.username)
                .then(function () {
                    vm.isOwner = true;
                    vm.editMode = false;
                    vm.formTitle = 'Edit File';
                });
        }

        // Function called to get authenticated user's account
        // and profile object when new file is created
        function getProfile () {
            vm.user = Authentication.fetchAuthenticatedUser();
            ProfileService.getProfile(vm.user.username)
                .then(function (response) {
                    vm.profile = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function activate() {
            vm.user = Authentication.fetchAuthenticatedUser();
        }

        activate();
    }

})();
