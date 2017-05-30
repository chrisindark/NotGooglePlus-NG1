(function () {
    angular
        .module('notgoogleplus.utils')
        .factory('FilterService', FilterService);

    FilterService.$inject = ['$state', '$location'];

    function FilterService ($state, $location) {

        var defaultParams = {};
        var apiParams = {};

        var FilterService = {
            initModelValues: initModelValues,
            setModelValues: setModelValues,
            getModelValues: getModelValues
        };

        return FilterService;

        function initModelValues (modelObject) {
            defaultParams = modelObject;
            apiParams = {};
        }

        function setModelValues (modelObject) {
            if (modelObject) {
                for (var key in defaultParams) {
                    if (modelObject[key]) {
                        apiParams[key] = (function() {
                            if (isNumber(defaultParams[key]) && isNumber(modelObject[key])) {
                                return Number(modelObject[key]);
                            } else {
                                return modelObject[key];
                            }
                        })();
                    }
                    else {
                        apiParams[key] = defaultParams[key];
                    }
                }
            }

            $location.search(apiParams);
        }

        function getModelValues () {
            setModelValues($location.search());

            return apiParams;
        }

    }

})();
