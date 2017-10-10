(function () {
    angular
        .module('notgoogleplus.controllers')
        .component('articlePreview', {
            controller: ArticlePreviewController,
            controllerAs: 'vm',
            bindings: {
                'article': '<'
            },
            templateUrl: 'app/js/articles/article-preview.html'
        });

    angular
        .module('notgoogleplus.controllers')
        .controller('ArticlePreviewController', ArticlePreviewController);

    ArticlePreviewController.$inject = ['MarkedService'];

    function ArticlePreviewController (MarkedService) {
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
