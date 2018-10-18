(function () {
    angular
        .module('notgoogleplus.controllers')
        .component('navbarComponent', {
            templateUrl: 'app/js/layout/navbar.html',
            controller: NavbarController,
            controllerAs: 'vm'
        });

    NavbarController.$inject = ['$rootScope', '$scope', '$state', '$window', 'Authentication',
        'AccountsService', 'PopupService', 'NavbarService'];

    // @namespace NavbarController
    function NavbarController($rootScope, $scope, $state, $window, Authentication, AccountsService,
                              PopupService, NavbarService) {
        var vm = this;

        vm.showBackButton = false;
        vm.showSidebarButton = true;
        vm.showNavbarBrand = true;

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

        function checkResourceStateType() {
            vm.showBackButton = NavbarService.isResourceDetailState();
            vm.showSidebarButton = !NavbarService.isResourceDetailState();
        }

        function activate() {
            // console.log('NavbarController loaded');

            vm.isAuthenticated = Authentication.isAuthenticated();
            if (vm.isAuthenticated) {
                if (Authentication.fetchAuthenticatedUser()) {
                    vm.user = Authentication.fetchAuthenticatedUser();
                }
            }
        }

        function addEventListeners() {
            var deregisterEventAuthenticated = $rootScope.$on('Authenticated', function() {
                activate();
            });

            var deregisterEventUnauthenticated = $rootScope.$on('Unauthenticated', function() {
                activate();
            });

            var deregisterEventStateChangeStart = $rootScope.$on('$stateChangeStart', function (
                event, toState, toParams, fromState, fromParams, options) {
                // console.log(toState.name);
                checkResourceStateType();
            });

            var deregisterEventStateChangeSuccess = $rootScope.$on('$stateChangeSuccess', function (
                event, toState, toParams, fromState, fromParams, options) {
                // console.log(toState.name);
            });

            $scope.$on('$destroy', function () {
                deregisterEventAuthenticated();
                deregisterEventUnauthenticated();
                deregisterEventStateChangeStart();
                deregisterEventStateChangeSuccess();
            });
        }

        activate();
        checkResourceStateType();
        addEventListeners();

        vm.goBack = function () {
            NavbarService.goBack();
        };
    }

})();
