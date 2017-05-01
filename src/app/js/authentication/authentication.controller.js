angular
    .module('notgoogleplus.controllers')
    .controller('AuthenticationController', AuthenticationController);

AuthenticationController.$inject = ['$scope', '$location', 'Authentication',
    '$state', '$stateParams', '$uibModal', 'Snackbar'];

// @namespace AuthenticationController
function AuthenticationController($scope, $location, Authentication,
    $state, $stateParams, $uibModal, Snackbar) {
    var vm = this;

    // @name activate
    // @desc Actions to be performed when this controller is instantiated
    function activate() {
        // If the user is authenticated, they should not be here
        if (Authentication.isAuthenticated()) {
            $state.go('home');
        }
    }

    // @name login
    // @desc Log the user instantiated
    vm.login = function () {
        Authentication.login(vm.username, vm.password).then(function(response) {
            vm.errors = {};
            vm.closeModal();
            console.log("user logged in");
            Snackbar.show("You have been successfully logged in!");
        }).catch(function(response) {
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

        Authentication.register(data).then(function(response) {
            vm.errors = {};
            vm.closeModal();
            console.log("user registered");
        }).catch(function(response) {
            vm.errors = response.data;
        });
    };

    vm.passwordReset = function () {
        Authentication.passwordReset(vm.email).then(function(response) {
            vm.errors = response.data;
            vm.errors = {};
            vm.closeModal();
            console.log("reset password email sent");
        }).catch(function(response) {
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
        Authentication.passwordResetConfirm(data).then(function(response) {
            vm.errors = {};
            console.log("password reset complete");
        }).catch(function(response) {
            vm.errors = response.data;
        });
    };

    vm.changeModal = function(arg) {
        vm.closeModal();
        $uibModal.open({
            animation: true,
            templateUrl: 'app/templates/authentication/' + arg + '.html',
            controller: 'AuthenticationController',
            controllerAs: 'vm',
            windowClass: 'my-modal'
        });
    };

    vm.closeModal = function() {
        $scope.$close();
    };

    activate();
}
