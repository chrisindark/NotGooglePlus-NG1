angular
    .module('notgoogleplus.directives')
    .directive('navMenubar', navMenubar)
    .controller('NavbarController', NavbarController);

navMenubar.$inject = [];

function navMenubar () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: '/templates/layout/navbar.html',
        controller: 'NavbarController',
        controllerAs: 'vm'
    }
}

NavbarController.$inject = ['$rootScope', '$scope', 'Authentication', '$uibModal'];

// @namespace NavbarController
function NavbarController($rootScope, $scope, Authentication, $uibModal) {
    var vm = this;

    function activate() {
        vm.isAuthenticated = Authentication.isAuthenticated();
        if (vm.isAuthenticated) {
            if (Authentication.fetchAuthenticatedUser()) {
                vm.user = Authentication.fetchAuthenticatedUser();
            } else {
                Authentication.getAuthenticatedUser().then(function(response) {
                    vm.user = Authentication.fetchAuthenticatedUser();
                });
            }
        }
    }

    // @name logout
    // @desc Log the user out
    vm.logout = function() {
        Authentication.logout();
    }

    vm.openLoginModal = function() {
        $uibModal.open({
            animation: true,
            templateUrl: '/templates/authentication/login.html',
            controller: 'AuthenticationController',
            controllerAs: 'vm',
            windowClass: 'my-modal'
        });
    }

    vm.openPostModal = function() {
        $uibModal.open({
            templateUrl: '/templates/posts/new-post.html',
            controller: 'NewPostController',
            controllerAs: 'vm',
            windowClass: 'my-modal'
        });
    };

    activate();

    $rootScope.$on('Authenticated', function() {
        activate();
    });

    $rootScope.$on('Unauthenticated', function() {
        activate();
    });
}
