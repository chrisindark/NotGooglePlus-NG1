(function () {
    angular
        .module('notgoogleplus.services')
        .service('TagsService', TagsService);

    TagsService.$inject = ['$http', 'EnvironmentConfig'];

    function TagsService ($http, EnvironmentConfig) {
        this.allTags = function (params) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/tags/',
                method: 'GET',
                params: params
            });
        };

        this.createTag = function () {
            // do something
        };

        this.getTag = function () {
            // do something
        };

        this.updateTag = function () {
            // do something
        };

        this.removeTag = function () {
            // do something
        };
    }

})();
