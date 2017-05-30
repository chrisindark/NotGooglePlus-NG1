angular
    .module('notgoogleplus.controllers')
    .controller('ErrorController', ErrorController);

ErrorController.$inject = ['$scope', '$state', '$stateParams', 'FilterService'];

// @namespace ErrorController
function ErrorController ($scope, $state, $stateParams, FilterService) {
    var vm = this;

    vm.params = $stateParams.errorObj;

    function activate() {
        console.log("ErrorController started");
        if (vm.params) {
            FilterService.initModelValues(vm.params);
        } else {
            vm.params = {
                code: 404,
                detail: 'The page you were looking for doesn\'t exist.',
                message: 'The page may have been removed.'
            };
            FilterService.initModelValues(vm.params);
        }
        vm.params = FilterService.getModelValues();
        console.log(vm.params);
    }

    vm.goHome = function () {
        $state.go('home', {}, {reload: true});
    };

    activate();

}
