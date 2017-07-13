angular
    .module('notgoogleplus.controllers')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$state', 'Authentication', 'AccountsService',
    'TagsService'];

// @namespace HomeController
function HomeController($state, Authentication, AccountsService,
                        TagsService) {
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
