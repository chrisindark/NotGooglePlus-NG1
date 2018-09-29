(function () {
    angular
        .module('notgoogleplus.controllers')
        .controller('AuthenticationController', AuthenticationController);

    AuthenticationController.$inject = ['$scope', '$state', '$stateParams',
    'Authentication', 'PopupService', 'Snackbar'];

    // @namespace AuthenticationController
    function AuthenticationController($scope, $state, $stateParams, Authentication,
        PopupService, Snackbar) {
        var vm = this;

        // @name login
        // @desc Log the user instantiated
        vm.login = function () {
            var data = {
                username: vm.username,
                password: vm.password
            };

            Authentication.login(data)
                .then(function (response) {
                    vm.errors = {};
                    vm.closeModal();
                    console.log("user logged in");
                })
                .catch(function (response) {
                    vm.errors = response.data;
                });
        };

        // @name register
        // @desc Register a new user
        vm.register = function () {
            var data = {
                email: vm.email,
                username: vm.username,
                password: vm.password,
                confirm_password: vm.confirm_password
            };

            Authentication.register(data)
                .then(function (response) {
                    vm.errors = {};
                    vm.closeModal();
                    console.log("user registered");
                })
                .catch(function (response) {
                    vm.errors = response.data;
                });
        };

        vm.accountActivate = function () {
            var data = {
                token: $stateParams.token
            };

            Authentication.accountActivate(data)
                .then(function (response) {
                    Snackbar.show(response.data.detail);
                    $state.go('home', {}, {reload: true});
                })
                .catch(function(error) {
                    console.log(error);
                    var errArr = [];
                    for (var key in error.data) {
                        errArr.push(key + ': ' + error.data[key]);
                    }
                    errArr = errArr.join('\n');
                    Snackbar.show(errArr);
                    $state.go('home', {}, {reload: true});
                });
        };

        vm.emailResendConfirm = function () {
            var data = {
                email: vm.email
            };

            Authentication.emailResendConfirm(data)
                .then(function (response) {
                    vm.errors = {};
                    Snackbar.show(response.data.detail);
                    console.log("confirmation email sent");
                }).catch(function (response) {
                    vm.errors = response.data;
                });
        };

        vm.passwordReset = function () {
            var data = {
                email: vm.email
            };

            Authentication.passwordReset(data)
                .then(function (response) {
                    vm.errors = {};
                    vm.closeModal();
                    Snackbar.show(response.data.detail);
                    console.log("reset password email sent");
                })
                .catch(function (response) {
                    vm.errors = response.data;
                });
        };

        vm.passwordResetConfirm = function () {
            var data = {
                new_password: vm.new_password,
                confirm_password: vm.confirm_password,
                uid: $stateParams.uid,
                token: $stateParams.token
            };

            Authentication.passwordResetConfirm(data)
                .then(function (response) {
                    vm.errors = {};
                    Snackbar.show(response.data.detail);
                    $state.go('home', {}, {reload: true});
                    console.log("password reset complete");
                })
                .catch(function (response) {
                    vm.errors = response.data;
                });
        };

        vm.changeModal = function (templateName) {
            vm.closeModal();

            var modalDefaults = {
                backdrop: false,
                keyboard: false,
                modalFade: false,
                animation: false,
                templateUrl: 'app/js/authentication/' + templateName + '.html',
                controller: 'AuthenticationController',
                controllerAs: 'vm',
                windowClass: 'my-modal'
            };

            PopupService.show(modalDefaults);
        };

        vm.closeModal = function () {
            $scope.$close();
        };

        // @name activate
        // @desc Actions to be performed when this controller is instantiated
        function activate () {
            // If the user is authenticated, the modal should not open
            if (Authentication.isAuthenticated()) {
                $state.go('home');
            } else if ($state.current.name === 'accountActivation') {
                vm.accountActivate();
            }
        }

        activate();
    }

})();
