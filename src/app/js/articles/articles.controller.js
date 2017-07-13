(function () {
    angular
        .module('notgoogleplus.controllers')
        .component('articleComponent', {
            controller: ArticlesController,
            controllerAs: 'vm',
            bindings: {},
            templateUrl: 'app/js/articles/articles.html'
        });

    angular
        .module('notgoogleplus.controllers')
        .controller('ArticlesController', ArticlesController);

    ArticlesController.$inject = ['$stateParams', 'Authentication',
        'ArticlesService', 'FilterService', 'MarkedService'];

    //@namespace ArticlesController
    function ArticlesController($stateParams, Authentication,
                                ArticlesService, FilterService,
                                MarkedService) {
        var vm = this;

        // store the params received from $stateparams
        vm.params = $stateParams || {};

        vm.isAuthenticated = Authentication.isAuthenticated();
        vm.articles = {};
        // vm.articles.results = [];
        vm.params = angular.extend(vm.params, {
            page_size : 25,
            page: 1,
            o: "-created_at"
        });

        function getArticles(url) {
            ArticlesService.allArticles(url, vm.params)
                .then(function (response) {
                    vm.articles.results = response.data.results;
                    vm.articles.next = response.data.next;
                    vm.totalItems = response.data.count;
                    vm.itemsPerPage = vm.params.page_size;

                    FilterService.setModelValues(vm.params);

                })
                .catch(function (error) {
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

        vm.markdown = function(content) {
            return MarkedService.markdown(content);
        };

        //@name activate
        //@desc Actions to be performed when this controller is instantiated
        function activate() {
            // add params from url to filter service
            // and update the params before fetching articles
            FilterService.initModelValues(vm.params);
            vm.params = FilterService.getModelValues();
            getArticles();
        }

        activate();

    }

})();
