(function () {
    angular
        .module('notgoogleplus.utils')
        .component('sidebarComponent', {
            templateUrl: 'app/js/layout/sidebar.html',
            controller: SidebarController,
            controllerAs: 'vm'
        });

    SidebarController.$inject = [];

    function SidebarController () {
        var vm = this;

        function activate() {
            console.log('sidebar loaded');
        }
        activate();
    }

})();
