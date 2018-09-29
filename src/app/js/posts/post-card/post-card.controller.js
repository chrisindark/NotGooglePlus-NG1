(function () {
    angular
        .module('notgoogleplus.controllers')
        .component('postCardComponent', {
            templateUrl: 'app/js/posts/post-card/post-card.html',
            controller: PostCardController,
            controllerAs: 'vm',
            bindings: {
                post: '<',
            }
        });

    PostCardController.$inject = ['$rootScope', 'Authentication', 'AccountsService', 'PopupService'];

    function PostCardController() {
        var vm = this;

        vm.hello = 'world';

        function activate() {}

        activate();
    }
})();
