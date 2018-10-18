(function () {
    angular
        .module('notgoogleplus.services')
        .service('NavbarService', NavbarService);

    NavbarService.$inject = ['$state'];

    function NavbarService($state) {
        var vm = this;

        var currentState = null;
        var detailStates = ['postDetail', 'articleDetail'];
        var detailStateMap = {
            'postDetail': 'posts',
            'articleDetail': 'articles',
        };

        this.setCurrentState = function (state) {
            currentState = state;
        };

        this.getCurrentState = function () {
            return currentState;
        };

        this.isResourceDetailState = function () {
            return detailStates.indexOf(currentState.name) > -1;
        };

        this.goBack = function() {
            $state.go(detailStateMap[currentState.name]);
        };
    }
})();
