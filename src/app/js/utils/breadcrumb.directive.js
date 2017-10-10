(function () {
    angular
        .module('notgoogleplus.utils')
        .directive('myBreadcrumbDir', myBreadcrumbDir);

    myBreadcrumbDir.$inject = [];

    function myBreadcrumbDir () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/js/utils/breadcrumb.html',
            controller: 'BreadcrumbController',
            controllerAs: 'vm'
        };
    }

})();
