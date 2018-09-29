(function () {
    angular
        .module('notgoogleplus.directives')
        .directive('myRipplesDir', myRipplesDir);

    function myRipplesDir () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                if (element.hasClass('withoutripple') || element.hasClass('btn-link')) {
                    return;
                }
                $.material.ripples(element);
            }
        };
    }

})();
