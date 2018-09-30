(function () {
    angular
        .module('notgoogleplus.controllers')
        .component('postPreview', {
            controller: PostPreviewController,
            controllerAs: 'vm',
            bindings: {
                'post': '<'
            },
            templateUrl: 'app/js/posts/post-preview/post-preview.html'
        });

    angular
        .module('notgoogleplus.controllers')
        .controller('PostPreviewController', PostPreviewController);

    PostPreviewController.$inject = ['MarkedService'];

    function PostPreviewController (MarkedService) {
        var vm = this;

        vm.markdown = function (content) {
            return content
                ? MarkedService.markdown(content)
                : undefined;
        };

        function activate () {}

        vm.$onInit = function () {
            // console.log('oninit');
            activate();
        };

        vm.$onChanges = function (changesObj) {
            // console.log('onchange');

        };

        vm.$onDestroy = function () {
            // console.log('ondestroy');
        };

        vm.$doCheck = function () {
            // console.log('docheck');
        };
    }

})();
