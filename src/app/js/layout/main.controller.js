(function () {
    angular
        .module('notgoogleplus.controllers')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'SeoService'];

    function MainController($scope, SeoService) {
        var vm = this;

        vm.title = null;
        vm.description = null;

        function activate() {
            vm.getTitle();
            vm.getDescription();
        }

        function addEventListeners() {
            var deregisterEventMetaTitleChange = $scope.$on('MetaTitleChange', function () {
                // console.log('metatitlechange');
                vm.getTitle();
            });

            var deregisterEventMetaDescriptionChange = $scope.$on('MetaDescriptionChange', function () {
                // console.log('metadescchange');
                vm.getDescription();
            });

            $scope.$on('$destroy', function () {
                deregisterEventMetaTitleChange();
                deregisterEventMetaDescriptionChange();
            });
        }

        vm.getTitle = function () {
            SeoService.getTitle().then(function (res) {
                // console.log(res);
                vm.title = res;
            });
        };

        vm.getDescription = function () {
            SeoService.getDescription().then(function (res) {
                // console.log(res);
                vm.description = res;
            });
        };

        activate();
        addEventListeners()
    }

})();
