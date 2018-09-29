(function () {
    angular
        .module('notgoogleplus.utils')
        .controller('BreadcrumbController', BreadcrumbController);

    BreadcrumbController.$inject = ['$scope', '$window', '$stateParams', 'categoryTree']

    function BreadcrumbController($scope, $window, $stateParams, categoryTree) {
        var pk = 1;
        $scope.parents = [];
        $scope.children = [];

        var catCode = $stateParams.cat_code;
        if (!$window.localStorage.getItem('Category Tree')) {
            categoryTree.get(pk).then(successFn, errorFn);

            function successFn(data, status, headers, config) {
                $window.localStorage.setItem("Category Tree", JSON.stringify(data.data));
                var tree = JSON.parse($window.localStorage.getItem('Category Tree'));
                treeObj(tree);
                createBreadcrumbs();
            }

            function errorFn(data, status, headers, config) {
                console.log('Epic Failure!');
            }
        }
        else {
            var tree = JSON.parse($window.localStorage.getItem('Category Tree'));
            hashmapByCode(tree);
            createBreadcrumbs();
        }

        function createBreadcrumbs () {
            if(catCode !== undefined) {
                $scope.parents = parentsByCode(catCode, $scope.parents);
                $scope.children = childrenByCode(catCode, $scope.children);
                $scope.parents.reverse();
            }
            else {
                $scope.parents.push({name: "Collection"});
            }
        }

    }

})();
