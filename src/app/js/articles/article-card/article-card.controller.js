(function () {
    angular
        .module('notgoogleplus.controllers')
        .component('articleCardComponent', {
            templateUrl: 'app/js/articles/article-card/article-card.html',
            controller: ArticleCardController,
            controllerAs: 'vm',
            bindings: {
                article: '<'
            }
        });

    ArticleCardController.$inject = [];

    function ArticleCardController() {
        var vm = this;

        function activate() {}

        activate();
    }
})();
