angular
    .module('notgoogleplus.services')
    .factory('Profile', Profile);

Profile.$inject = ['$http', 'ApiUrls'];

//@namespace Profile
//@returns {Factory}
function Profile($http, ApiUrls) {
    var Profile = {
        getProfile: getProfile,
        updateProfile: updateProfile,
        destroyProfile: destroyProfile
    };

    return Profile;

    //@name get
    //@desc Gets the profile for the user with username 'username'
    //@param {string} username The username of the user to fetch
    //@returns {Promise}
    //@memberOf thinkster.profiles.services.Profile
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
    //@memberOf thinkster.profiles.services.Profile
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
    //@memberOf thinkster.profiles.services.Profile
    function updateProfile(username, data) {
        return $http({
            url: ApiUrls.domain_url + 'api/v1/profiles/' + username + '/',
            method: "PUT",
            data: data
        });
    }

}
