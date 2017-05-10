angular
    .module('notgoogleplus.controllers')
    .controller('ErrorController', ErrorController);

ErrorController.$inject = ['$scope', '$state', 'Snackbar'];

// @namespace ErrorController
function ErrorController ($scope, $state, Snackbar) {
    function activate() {
        console.log("ErrorController started");
    }

    activate();

}
