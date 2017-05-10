angular
    .module('notgoogleplus.controllers')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$scope', '$state', 'Snackbar'];

// @namespace HomeController
function HomeController($scope, $state, Snackbar) {
    function activate() {
        console.log("HomeController started");
    }

    activate();

}
