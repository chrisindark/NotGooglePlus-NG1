angular
    .module('notgoogleplus.services')
    .factory('ProfileService', ProfileService);

ProfileService.$inject = ['$http', 'ApiUrls'];

//@namespace ProfileService
//@returns {Factory}
function ProfileService($http, ApiUrls) {
    var ProfileService = {
        getProfile: getProfile,
        updateProfile: updateProfile,
        destroyProfile: destroyProfile
    };

    return ProfileService;

    //@name get
    //@desc Gets the profile for the user with username 'username'
    //@param {string} username The username of the user to fetch
    //@returns {Promise}
    function getProfile(username) {
        return $http({
            url: ApiUrls.domain_url + 'api/v1/profiles/' + username + '/',
            method: 'GET'
        });
    }

    //@name destroy
    //@desc Destroys the given profile
    //@param {Object} profile The profile to be destroyed
    //@returns {Promise}
    function destroyProfile(username) {
        return $http({
            url: ApiUrls.domain_url + 'api/v1/profiles/' + username + '/',
            method: 'DELETE'
        });
    }

    //@name update
    //@desc Updates the given profile
    //@param {Object} profile The profile to be updated
    //@returns {Promise}
    function updateProfile(username, data) {
        return $http({
            url: ApiUrls.domain_url + 'api/v1/profiles/' + username + '/',
            method: "PUT",
            data: data
        });
    }

}
