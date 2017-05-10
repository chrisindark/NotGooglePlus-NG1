angular
    .module('notgoogleplus.directives')
    .directive('myTabset', myTabset);

myTabset.$inject = ['$state'];

function myTabset ($state) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/js/layout/tabset.html',
        bindToController: true,
        controllerAs: 'ctrl',
        controller: function () {
            var vm = this;

            vm.tabList = {
                'posts': {
                    'heading': 'Posts',
                    'href': 'posts'
                },
                'articles': {
                    'heading': 'Articles',
                    'href': 'articles'
                }
            };
            vm.tabs = [];
            vm.addTab = function () {
                angular.forEach(vm.tabList, function (tab) {
                    vm.tabs.push(tab);
                    // if (vm.tabs.length === 1) {
                    //     tab.active = true;
                    // }
                });
                vm.tabList[$state.current.name].active = true;
            };
            vm.addTab();

            vm.selectTab = function (selectedTab) {
                if (selectedTab.disabled) {
                    return;
                }
                angular.forEach(vm.tabs, function (tab) {
                    if (tab.active && selectedTab !== tab) {
                        tab.active = false;
                    }
                });
                selectedTab.active = true;
            };
        }
    };
}