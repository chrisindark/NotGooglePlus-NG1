angular
    .module('notgoogleplus.utils')
    .factory('FilterService', FilterService);

FilterService.$inject = ['$state', '$location'];

function FilterService ($state, $location) {

    var defaultParams = {
        page_size : 25,
        page: 1,
        o: "-created_at"
    };
    var apiParams = {};

    var FilterService = {
        setModelValues: setModelValues,
        getModelValues: getModelValues
    };

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

    return FilterService;
}
