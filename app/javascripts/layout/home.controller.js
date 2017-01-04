angular
    .module('notgoogleplus.controllers')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$scope', 'Authentication', 'Snackbar'];

// @namespace HomeController
function HomeController($scope, Authentication, Snackbar) {
    var vm = this;

    function activate() {
        console.log("HomeController started");
    }

    activate();

}
