(function () {
    angular
        .module('notgoogleplus.controllers')
        .component('articleForm', {
            controller: ArticleFormController,
            controllerAs: 'vm',
            bindings: {
                articleId: '<',
                article: '<',
                tagsList: '<',
                formTitle: '<',
                editMode: '<',
                onCreate: '&',
                onUpdate: '&'
            },
            templateUrl: 'app/js/articles/article-form.html'
        });

    angular
        .module('notgoogleplus.controllers')
        .controller('ArticleFormController', ArticleFormController);

    ArticleFormController.$inject = ['$rootScope', '$scope', '$state', '$stateParams',
        'Authentication', 'ArticlesService', 'ProfileService', 'MarkedService',
        'PopupService', 'Snackbar'];

    function ArticleFormController ($rootScope, $scope, $state, $stateParams,
        Authentication, ArticlesService, ProfileService, MarkedService,
        PopupService, Snackbar) {
        var vm = this;

        vm.article = {};

        vm.isSubmitted = false;
        vm.previewArticle = false;

        vm.submit = function () {
            vm.isSubmitted = true;

            if (vm.articleId) {
                ArticlesService.updateArticle(vm.articleId, vm.article)
                    .then(function (response) {
                        vm.article = response.data;
                        console.log("article updated");

                        // notify parent component with the updated article
                        vm.onUpdate({article: response.data});
                    })
                    .catch(function (response) {
                        vm.article.errors = response.data;
                    })
                    .finally(function () {
                        vm.isSubmitted = false;
                    });
            } else {

                ArticlesService.createArticle(vm.article)
                    .then(function (response) {
                        vm.article = {};
                        console.log("article created");

                        // notify parent component with the created article
                        vm.onCreate({article: response.data});
                    })
                    .catch(function (response) {
                        vm.article.errors = response.data;
                    })
                    .finally(function () {
                        vm.isSubmitted = false;
                    });
            }
        };

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
