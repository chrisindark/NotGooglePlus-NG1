(function () {
    angular
        .module('notgoogleplus.utils')
        .directive ('myPaginationDir', myPaginationDir);

    myPaginationDir.$inject = [];

    function myPaginationDir () {
        return {
            restrict: 'E',
            template: '<uib-pagination ng-show="ctrl.totalItems > 0"' +
                ' total-items="ctrl.totalItems" items-per-page = "ctrl.itemsPerPage"' +
                ' max-size="ctrl.maxSize ? ctrl.maxSize : 5"' +
                ' ng-model="ctrl.page" ng-change="ctrl.onChange()">' +
                ' </uib-pagination>',
            scope: {},
            bindToController: {
                totalItems: '=',
                itemsPerPage: '=',
                maxSize: '=?',
                page: '=',
                onPageChange: '&?'
            },
            controller: function () {
                var ctrl = this;
                ctrl.onChange = function() {
                    ctrl.onPageChange({page: ctrl.page});
                }
            },
            controllerAs: 'ctrl'
        }
    };

})();
