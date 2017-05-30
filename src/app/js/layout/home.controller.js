angular
    .module('notgoogleplus.controllers')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$scope', '$state', 'Authentication', 'AccountsService'];

// @namespace HomeController
function HomeController($scope, $state, Authentication, AccountsService) {
    var vm = this;

    vm.tabList = {
        'posts': {
            'heading': 'Posts',
            'href': 'posts'
        },
        'articles': {
            'heading': 'Articles',
            'href': 'articles'
        }
    };

    function activate() {
        // console.log("HomeController loaded");
        if (Authentication.isAuthenticated() && !Authentication.fetchAuthenticatedUser() ) {
            return AccountsService.getAuthenticatedUser();
        }

        if ($state.current.name === 'home') {
            // if state is 'home' redirect to another state
            // as if home is abstract
            $state.go('posts');
        }
    }

    activate();

}
