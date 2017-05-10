angular
    .module('notgoogleplus.controllers')
    .component('navbarComponent', {
        templateUrl: 'app/js/layout/navbar.html',
        controller: NavbarController,
        controllerAs: 'vm'
    });

NavbarController.$inject = ['$rootScope', 'Authentication', 'AccountsService', '$uibModal'];

// @namespace NavbarController
function NavbarController($rootScope, Authentication, AccountsService, $uibModal) {
    var vm = this;

    function activate() {
        vm.isAuthenticated = Authentication.isAuthenticated();
        if (vm.isAuthenticated) {
            if (Authentication.fetchAuthenticatedUser()) {
                vm.user = Authentication.fetchAuthenticatedUser();
            } else {
                AccountsService.getAuthenticatedUser().then(function(response) {
                    vm.user = Authentication.fetchAuthenticatedUser();
                });
            }
        }
    }

    // @name logout
    // @desc Log the user out
    vm.logout = function() {
        Authentication.logout();
    };

    vm.openLoginModal = function() {
        $uibModal.open({
            animation: true,
            templateUrl: 'app/js/authentication/login.html',
            controller: 'AuthenticationController',
            controllerAs: 'vm',
            windowClass: 'my-modal'
        });
    };

    vm.openPostModal = function() {
        $uibModal.open({
            templateUrl: 'app/js/posts/new-post.html',
            controller: 'NewPostController',
            controllerAs: 'vm',
            windowClass: 'my-modal'
        });
    };

    vm.openFileModal = function() {
        $uibModal.open({
            templateUrl: 'app/js/posts/new-file.html',
            controller: 'NewFileController',
            controllerAs: 'vm',
            windowClass: 'my-modal'
        });
    };

    activate();
    console.log('Navbar controller loaded');

    $rootScope.$on('Authenticated', function() {
        activate();
    });

    $rootScope.$on('Unauthenticated', function() {
        activate();
    });
}
