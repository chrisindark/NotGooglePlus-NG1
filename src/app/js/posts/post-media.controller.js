(function () {
    angular
        .module('notgoogleplus.controllers')
        .component('postMediaComponent', {
            controller: PostMediaController,
            controllerAs: 'vm',
            bindings: {
                post: '<'
            },
            templateUrl: 'app/js/posts/post-media-preview.html'
        });

    angular
        .module('notgoogleplus.controllers')
        .controller('PostMediaController', PostMediaController);

    PostMediaController.$inject = ['EnvironmentConfig'];

    function PostMediaController (EnvironmentConfig) {
        var vm = this;

        vm.domainUrl = EnvironmentConfig.api;
    }

})();
