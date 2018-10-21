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

    PostCardController.$inject = [];

    function PostCardController() {
        var vm = this;

        function activate() {}

        activate();
    }
})();
