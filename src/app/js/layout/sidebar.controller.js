(function () {
    angular
        .module('notgoogleplus.utils')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$scope', 'Authentication'];

    function SidebarController ($scope, Authentication) {
        var vm = this;

        vm.closeModal = function () {
            $scope.$close();
        };

        // @name logout
        // @desc Log the user out
        vm.logout = function() {
            Authentication.logout().then(function (response) {
                console.log('user logged out');
            });
        };

        // @name activate
        // @desc Actions to be performed when this controller is instantiated
        function activate() {
            // console.log('SidebarController loaded');
            vm.isAuthenticated = Authentication.isAuthenticated();
            if (vm.isAuthenticated) {
                if (Authentication.fetchAuthenticatedUser()) {
                    vm.user = Authentication.fetchAuthenticatedUser();
                }
            }
        }

        activate();
    }

})();
