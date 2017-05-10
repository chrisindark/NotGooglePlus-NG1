angular
    .module('notgoogleplus.utils')
    .directive('breadcrumbs', breadcrumbs);

function breadcrumbs () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/js/utils/breadcrumb.html',
        controller: 'BreadcrumbController',
        controllerAs: 'vm'
    };
}
