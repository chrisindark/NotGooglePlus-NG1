angular
    .module('notgoogleplus.services')
    .service('TagsService', TagsService);

TagsService.$inject = ['$http', 'ApiUrls'];

function TagsService($http, ApiUrls) {
    this.allTags =function(params) {
        return $http({
            url: ApiUrls.domainUrl + 'api/v1/tags/',
            method: 'GET',
            params: params
        });
    }

}
