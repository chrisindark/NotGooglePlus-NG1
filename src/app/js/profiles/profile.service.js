(function () {
    angular
        .module('notgoogleplus.services')
        .factory('ProfileService', ProfileService);

    ProfileService.$inject = ['$http', 'EnvironmentConfig', 'Snackbar'];

    //@namespace ProfileService
    //@returns {Factory}
    function ProfileService($http, EnvironmentConfig, Snackbar) {
        var self = this;

        var ProfileService = {
            getProfile: getProfile,
            updateProfile: updateProfile,
            deleteProfile: deleteProfile
        };

        return ProfileService;

        //@name get
        //@desc Gets the profile for the user with username 'username'
        //@param {string} username The username of the user to fetch
        //@returns {Promise}
        function getProfile (username) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/profiles/' + username + '/',
                method: 'GET'
            }).then(function (response) {
                return response;
            });
        }

        //@name deleteProfile
        //@desc Destroys the given profile
        //@param {string} username The profile to be destroyed
        //@returns {Promise}
        function deleteProfile (username) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/profiles/' + username + '/',
                method: 'DELETE'
            }).then(function (response) {
                Snackbar.show("Profile has been successfully deleted!");
                return response;
            });
        }

        //@name update
        //@desc Updates the given profile
        //@param {username} username The profile to be updated
        //@param {object} data The profile data to be updated
        //@returns {Promise}
        function updateProfile (username, data) {
            return $http({
                url: EnvironmentConfig.api + 'api/v1/profiles/' + username + '/',
                method: "PUT",
                data: data
            }).then(function (response) {
                Snackbar.show("Profile has been successfully updated!");
                return response
            });
        }

    }

})();
