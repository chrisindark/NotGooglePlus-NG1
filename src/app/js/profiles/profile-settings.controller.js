angular
    .module('notgoogleplus.controllers')
    .controller('ProfileSettingsController', ProfileSettingsController);

ProfileSettingsController.$inject = ['$scope', '$state', '$stateParams',
    '$timeout', 'Authentication', 'AccountsService', 'ProfileService', 'Snackbar'];

//@namespace ProfileSettingsController
function ProfileSettingsController($scope, $state, $stateParams,
    $timeout, Authentication, AccountsService, ProfileService, Snackbar) {
        var vm = this;

        var username = $stateParams.username;
        vm.deleteAccount = deleteAccount;
        vm.updateAccount = updateAccount;
        vm.getProfile = getProfile;
        vm.updateProfile = updateProfile;

        activate();

    function activate() {
        // If the user is not authenticated, they should not be here
        if (Authentication.isAuthenticated()) {
            Authentication.isOwner(username).then(function(response) {
                if(response) {
                    vm.user = Authentication.fetchAuthenticatedUser();
                    getProfile();
                } else {
                    Snackbar.error('You are not authorised to view this page.');
                    $state.go('home');
                }
            });
        } else {
            //Redirect if not logged in
            Snackbar.error('You are not authorised to view this page.');
            $state.go('home');
        }
    }

    //@name getProfile
    //@desc Get this user's profile
    function getProfile() {
        ProfileService.getProfile(username).then(function(response) {
            vm.profile = response.data;
        }).catch(function(error) {
            console.log(error);
        });
    }

    //@name updateAccount
    //@desc Update this user's account
    function updateAccount() {
        var data = {
            username: vm.user.username
        };
        AccountsService.updateAuthenticatedUser(vm.user.id, data).then(function(response) {
            vm.errors = {};
            Snackbar.show("Account has been successfully updated!");
            $state.go('profileSettings', {username: response.data.username});
        }).catch(function(response) {
            vm.errors = response.data;
        });
    }

    //@name deleteAccount
    //@desc Delete this user's account
    function deleteAccount() {
        AccountsService.deleteAuthenticatedUser(vm.profile).then(function(response) {
            console.log(response);
            Authentication.logout();
        });
    }

    //@name updateProfile
    //@desc Update this user's profile
    function updateProfile() {
        ProfileService.updateProfile(vm.user.username, vm.profile).then(function(response) {
            vm.errors = {};
            console.log(response);
            Snackbar.show("Profile has been successfully updated!");
        }).catch(function(response) {
            vm.errors = response.data;
        });
    }

    vm.genderChoices = {
        'M': 'Male',
        'F': 'Female',
        'O': 'Other'
    };

    vm.initDatepicker = function() {
        vm.dateOfBirth = new Date(vm.profile.dob);
    };

    $scope.datepickerOptions = {
        showWeeks: false
    };

}
