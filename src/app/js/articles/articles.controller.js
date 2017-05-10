angular
    .module('notgoogleplus.controllers')
    .controller('ArticlesController', ArticlesController);

ArticlesController.$inject = ['$rootScope', '$scope', 'Authentication', 'ArticlesService', 'FilterService', 'MarkedService'];

//@namespace ArticlesController
function ArticlesController($rootScope, $scope, Authentication, ArticlesService, FilterService, MarkedService) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.articles = {};
    // vm.articles.results = [];

    function getArticles(url) {
        ArticlesService.allArticles(url, vm.params).then(function (response) {
            vm.articles.results = response.data.results;
            vm.articles.next = response.data.next;
            vm.totalItems = response.data.count;
            vm.itemsPerPage = vm.params.page_size;

            FilterService.setModelValues(vm.params);

        }).catch(function (error) {
            console.log(error);
        });
    }

    vm.getNextArticles = function() {
        if(vm.articles.next) {
            // vm.params = {};
            getArticles(vm.articles.next);
            vm.articles.next = undefined;
        }
    };

    vm.onPageChange = function() {
        getArticles();
    };

    vm.onSortChange = function() {
        getArticles();
    };

    vm.convertContent = function(content) {
        console.log(MarkedService.markit(content));
        return MarkedService.markit(content);
    };

    //@name activate
    //@desc Actions to be performed when this controller is instantiated
    function activate() {
        vm.params = FilterService.getModelValues();
        getArticles();
    }

    activate();

    var deregisterEvent = $rootScope.$on('article.created', function (event, article) {
        console.log("article event caught");
        vm.articles.results.unshift(article);
    });

    $scope.$on('$destroy', deregisterEvent);

}
