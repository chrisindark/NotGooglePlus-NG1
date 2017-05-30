angular
    .module('notgoogleplus.directives')
    .directive('myTabset', myTabset);

myTabset.$inject = ['$state'];

function myTabset ($state) {
    return {
        restrict: 'E',
        templateUrl: 'app/js/layout/tabset.html',
        scope: {},
        bindToController: {
            tabList: '='
        },
        controllerAs: 'vm',
        controller: function () {
            var vm = this;

            vm.$onInit = function() {
                vm.addTab();
            }

            vm.tabs = [];
            vm.addTab = function () {
                angular.forEach(vm.tabList, function (tab) {
                    vm.tabs.push(tab);
                });

                if (_.contains(_.keys(vm.tabList), $state.current.name)) {
                    vm.tabList[$state.current.name].active = true;
                } else {
                    vm.tabList[_.keys(vm.tabList)[0]].active = true;
                }
            };

            vm.selectTab = function (selectedTab) {
                // if (selectedTab.disabled) {
                //     return;
                // }
                angular.forEach(vm.tabList, function (tab) {
                    if (tab.active && selectedTab !== tab) {
                        tab.active = false;
                    }
                });
                selectedTab.active = true;
            };
        }
    };
}