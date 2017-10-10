(function() {
    angular
        .module('notgoogleplus.controllers')
        .controller('GoogleOauthController', GoogleOauthController);

    GoogleOauthController.$inject = ['$state', '$location', 'OauthService', 'Snackbar'];

    function GoogleOauthController($state, $location, OauthService, Snackbar) {
        var callbackParams = $location.search();

        if (!callbackParams.code) {
            Snackbar.show('Google oauth code not found');
            $state.go('home');
        } else {
            OauthService.googleLogin(callbackParams)
                .then(function (response) {
                    $state.go('home', {}, {reload: true});
                })
                .catch(function (error) {
                    var errArr = [];
                    for (var key in error.data) {
                        errArr.push(key + ': ' + error.data[key]);
                    }
                    errArr = errArr.join('\n');
                    Snackbar.show(errArr);
                    $state.go('home', {}, {reload: true});
                });
        }
    }

    angular
        .module('notgoogleplus.controllers')
        .controller('TwitterOauthController', TwitterOauthController);

    TwitterOauthController.$inject = ['$state', '$location', 'OauthService', 'Snackbar'];

    function TwitterOauthController($state, $location, OauthService, Snackbar) {
        var callbackParams = $location.search();

        if (!callbackParams.oauth_token && !callbackParams.oauth_verifier) {
            Snackbar.show('Twitter oauth token or verifier not found');
            $state.go('home');
        } else {
            OauthService.twitterLogin(callbackParams)
                .then(function (response) {
                    $state.go('home', {}, {reload: true});
                })
                .catch(function (error) {
                    var errArr = [];
                    for (var key in error.data) {
                        errArr.push(key + ': ' + error.data[key]);
                    }
                    errArr = errArr.join('\n');
                    Snackbar.show(errArr);
                    $state.go('home', {}, {reload: true});
                });
        }
    }

    angular
        .module('notgoogleplus.controllers')
        .controller('GithubOauthController', GithubOauthController);

    GithubOauthController.$inject = ['$state', '$location', 'OauthService', 'Snackbar'];

    function GithubOauthController($state, $location, OauthService, Snackbar) {
        console.log('github oauth ctrl loaded.')
    }

    angular
        .module('notgoogleplus.controllers')
        .controller('StripeOauthController', StripeOauthController);

    StripeOauthController.$inject = ['$state', '$location', 'OauthService', 'Snackbar'];

    function StripeOauthController($state, $location, OauthService, Snackbar) {
        var callbackParams = $location.search();

        if (!callbackParams.code) {
            Snackbar.show('Stripe oauth code not found');
            $state.go('home');
        } else {
            OauthService.stripeLogin(callbackParams)
                .then(function (response) {
                    $state.go('home', {}, {reload: true});
                })
                .catch(function (error) {
                    var errArr = [];
                    for (var key in error.data) {
                        errArr.push(key + ': ' + error.data[key]);
                    }
                    errArr = errArr.join('\n');
                    Snackbar.show(errArr);
                    $state.go('home', {}, {reload: true});
                });
        }
    }

})();
