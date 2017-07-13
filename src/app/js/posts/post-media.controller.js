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

    PostMediaController.$inject = [];

    function PostMediaController () {
        var vm = this;
    }

})();
