angular
    .module('notgoogleplus.controllers')
    .component('navbarComponent', {
        templateUrl: 'app/js/layout/navbar.html',
        controller: NavbarController,
        controllerAs: 'vm'
    });

NavbarController.$inject = ['$rootScope', 'Authentication', 'AccountsService', 'PopupService'];

// @namespace NavbarController
function NavbarController($rootScope, Authentication, AccountsService, PopupService) {
    var vm = this;

    // @name logout
    // @desc Log the user out
    vm.logout = function() {
        Authentication.logout().then(function (response) {
            console.log('user logged out');
        });
    };

    vm.openLoginModal = function() {
        var modalDefaults = {
            backdrop: false,
            keyboard: false,
            modalFade: false,
            animation: false,
            templateUrl: 'app/js/authentication/login.html',
            controller: 'AuthenticationController',
            controllerAs: 'vm',
            windowClass: 'my-modal'
        };

        PopupService.show(modalDefaults);
    };

    function activate() {
        // console.log('NavbarController loaded');
        vm.isAuthenticated = Authentication.isAuthenticated();
        if (vm.isAuthenticated) {
            if (Authentication.fetchAuthenticatedUser()) {
                vm.user = Authentication.fetchAuthenticatedUser();
            }
            // else {
            //     AccountsService.getAuthenticatedUser().then(function(response) {
            //         vm.user = Authentication.fetchAuthenticatedUser();
            //     });
            // }
        }
    }

    activate();

    $rootScope.$on('Authenticated', function() {
        activate();
    });

    $rootScope.$on('Unauthenticated', function() {
        activate();
    });
}
