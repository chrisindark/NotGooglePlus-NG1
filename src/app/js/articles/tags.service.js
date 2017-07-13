(function () {
    angular
        .module('notgoogleplus.services')
        .service('TagsService', TagsService);

    TagsService.$inject = ['$http', 'ApiUrls'];

    function TagsService ($http, ApiUrls) {
        this.allTags = function (params) {
            return $http({
                url: ApiUrls.domainUrl + 'api/v1/tags/',
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
