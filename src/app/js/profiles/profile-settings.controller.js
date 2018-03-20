(function () {
    angular
        .module('notgoogleplus.controllers')
        .controller('ProfileSettingsController', ProfileSettingsController);

    ProfileSettingsController.$inject = ['$scope', '$state', '$stateParams',
        'Authentication', 'AccountsService', 'ProfileService', 'Snackbar', 'moment'];

    //@namespace ProfileSettingsController
    function ProfileSettingsController($scope, $state, $stateParams,
        Authentication, AccountsService, ProfileService, Snackbar, moment) {
        var vm = this;

        vm.username = $stateParams.username;
        vm.genderChoices = {
            'M': 'Male',
            'F': 'Female',
            'O': 'Other'
        };

        $scope.datepickerOptions = {
            showWeeks: false
        };

        vm.deleteAccount = deleteAccount;
        vm.updateAccount = updateAccount;
        vm.getProfile = getProfile;
        vm.updateProfile = updateProfile;

        //@name getProfile
        //@desc Get this user's profile
        function getProfile () {
            ProfileService.getProfile(vm.username)
                .then(function (response) {
                    vm.profile = response.data;
                    vm.profile.dob = moment(vm.profile.dob, 'YYYY-MM-DD').toDate();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        //@name updateAccount
        //@desc Update this user's account
        function updateAccount () {
            var data = {
                username: vm.user.username
            };
            AccountsService.updateAccount(vm.user.id, data)
                .then(function (response) {
                    vm.errors = {};
                    $state.go('profileSettings', {username: response.data.username}, {reload: true});
                })
                .catch(function (response) {
                    vm.errors = response.data;
                });
        }

        // @name deleteAccount
        // @desc Delete this user's account
        function deleteAccount () {
            AccountsService.deleteAccount(vm.user.id)
                .then(function (response) {
                    console.log(response);
                    Authentication.logout();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        // @name updateProfile
        // @desc Update this user's profile
        function updateProfile () {
            if (vm.profile.dob) {
                vm.profile.dob = moment(vm.profile.dob).format('YYYY-MM-DD');
            }

            ProfileService.updateProfile(vm.user.username, vm.profile)
                .then(function (response) {
                    vm.errors = {};
                    console.log(response);
                    vm.profile = response.data;
                    vm.profile.dob = moment(vm.profile.dob, 'YYYY-MM-DD').toDate();
                })
                .catch(function (response) {
                    vm.errors = response.data;
                });
        }

        // @name deleteProfile
        // @desc Delete this user's profile
        function deleteProfile () {
            ProfileService.deleteProfile(vm.user.username)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function activate () {
            vm.user = Authentication.fetchAuthenticatedUser();
            getProfile();
        }

        activate();

    }

})();
