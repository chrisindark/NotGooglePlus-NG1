(function () {
    angular
        .module('notgoogleplus.directives')
        .directive('mySidebarDir', mySidebarDir);

    mySidebarDir.$inject = ['PopupService'];

    function mySidebarDir (PopupService) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                var openSidebarModal = function () {
                    var modalDefaults = {
                        backdrop: false,
                        keyboard: false,
                        modalFade: false,
                        animation: true,
                        templateUrl: 'app/js/layout/sidebar.html',
                        controller: 'SidebarController',
                        controllerAs: 'vm',
                        windowClass: 'my-modal left'
                    };

                    PopupService.show(modalDefaults);
                };

                element.on('click', function (event) {
                    // adding css for hamburger button
                    element.toggleClass('active');
                    openSidebarModal();
                    element.toggleClass('active');
                });
            }
        };
    }

})();
