(function () {
    angular
        .module('notgoogleplus.directives')
        .directive('googleOauthDir', googleOauthDir);

    googleOauthDir.$inject = ['$window', '$httpParamSerializer', 'GOOGLE_OAUTH2'];

    function googleOauthDir ($window, $httpParamSerializer, GOOGLE_OAUTH2) {
        return {
            restrict: 'E',
            scope: {},
            template: '<a href="javascript:void(0)"' +
                ' class="btn btn-raised btn-google btn-block oauth-btn"' +
                ' ng-click="loginWithGoogle()">Sign in with Google</a>',
            link: function (scope, element, attrs) {
                scope.loginWithGoogle = function () {
                    var requestTokenUrl = GOOGLE_OAUTH2.REQUEST_TOKEN_URL;
                    var payload = {
                        'redirect_uri': GOOGLE_OAUTH2.CALLBACK_URL,
                        'client_id': GOOGLE_OAUTH2.CLIENT_ID,
                        'scope': 'https://www.googleapis.com/auth/plus.me' +
                            ' https://www.googleapis.com/auth/userinfo.email' +
                            ' https://www.googleapis.com/auth/userinfo.profile',
                        // 'approval_prompt': 'force',
                        // 'access_type': 'offline',
                        'response_type': 'code'
                    };
                    requestTokenUrl = requestTokenUrl + '?' + $httpParamSerializer(payload);
                    $window.location.href = requestTokenUrl;
                };
            }
        };
    }

    angular
        .module('notgoogleplus.config')
        .constant('TWITTER_OAUTH', {
            "CALLBACK_URL": "http://127.0.0.1:3000/auth/twitter/callback",
            "CLIENT_ID": "",
            "REQUEST_TOKEN_URL": "https://api.twitter.com/oauth/authorize"
        });

    angular
        .module('notgoogleplus.directives')
        .directive('twitterOauthDir', twitterOauthDir);

    twitterOauthDir.$inject = ['$http', '$httpParamSerializer', '$window',
        'EnvironmentConfig', 'TWITTER_OAUTH'];

    function twitterOauthDir ($http, $httpParamSerializer, $window,
        EnvironmentConfig, TWITTER_OAUTH) {
        return {
            restrict: 'E',
            scope: {},
            template: '<a href="javascript:void(0)"' +
                ' class="btn btn-raised btn-twitter btn-block oauth-btn"' +
                ' ng-click="loginWithTwitter()">Sign in with Twitter</a>',
            link: function (scope, element, attrs) {
                scope.loginWithTwitter = function () {
                    $http({
                        url: EnvironmentConfig.api + 'api/v1/auth/twitter/',
                        method: 'POST'
                    }).then(function (response) {
                        var params = _.assign({'force_login': true}, response.data);
                        var requestTokenUrl = TWITTER_OAUTH.REQUEST_TOKEN_URL;
                        requestTokenUrl = requestTokenUrl + '?' + $httpParamSerializer(params);
                        $window.location.href = requestTokenUrl;
                    }).catch(function (err) {
                        console.log(err);
                    });

                };
            }
        };
    }

    angular
        .module('notgoogleplus.config')
        .constant('GITHUB_OAUTH2', {
            "CALLBACK_URL": "http://127.0.0.1:3000/auth/github/callback",
            "CLIENT_ID": "94893b580eb207c6ffdf",
            "REQUEST_TOKEN_URL": "https://github.com/login/oauth/authorize"
        });

    angular
        .module('notgoogleplus.directives')
        .directive('githubOauthDir', githubOauthDir);

    githubOauthDir.$inject = ['$window', '$httpParamSerializer', 'GITHUB_OAUTH2'];

    function githubOauthDir ($window, $httpParamSerializer, GITHUB_OAUTH2) {
        return {
            restrict: 'E',
            scope: {},
            template: '<a href="javascript:void(0)"' +
            ' class="btn btn-raised btn-github btn-block oauth-btn"' +
            ' ng-click="loginWithGithub()">Sign in with Github</a>',
            link: function (scope, element, attrs) {
                scope.loginWithGithub = function () {
                    var requestTokenUrl = GITHUB_OAUTH2.REQUEST_TOKEN_URL;
                    var payload = {
                        'redirect_uri': GITHUB_OAUTH2.CALLBACK_URL,
                        'client_id': GITHUB_OAUTH2.CLIENT_ID,
                        'scope': 'user',
                        'response_type': 'code'
                    };
                    requestTokenUrl = requestTokenUrl + '?' + $httpParamSerializer(payload);
                    $window.location.href = requestTokenUrl;
                };
            }
        };
    }

    angular
        .module('notgoogleplus.config')
        .constant('STRIPE_OAUTH2', {
            "CALLBACK_URL": "http://127.0.0.1:3000/auth/stripe/callback",
            "CLIENT_ID": "ca_BIg0n29mFhqx1LmMIAXEppUwUwYH4HGN",
            "REQUEST_TOKEN_URL": "https://connect.stripe.com/express/oauth/authorize"
        });

    angular
        .module('notgoogleplus.directives')
        .directive('stripeOauthDir', stripeOauthDir);

    stripeOauthDir.$inject = ['$window', '$httpParamSerializer', 'STRIPE_OAUTH2'];

    function stripeOauthDir ($window, $httpParamSerializer, STRIPE_OAUTH2) {
        return {
            restrict: 'E',
            scope: {},
            template: '<a href="javascript:void(0)"' +
            ' class="btn btn-raised btn-google btn-block oauth-btn"' +
            ' ng-click="loginWithStripe()">Sign in with Google</a>',
            link: function (scope, element, attrs) {
                scope.loginWithStripe = function () {
                    var requestTokenUrl = STRIPE_OAUTH2.REQUEST_TOKEN_URL;
                    var payload = {
                        'redirect_uri': STRIPE_OAUTH2.CALLBACK_URL,
                        'client_id': STRIPE_OAUTH2.CLIENT_ID,
                        'scope': 'read_write',
                        'response_type': 'code'
                    };
                    requestTokenUrl = requestTokenUrl + '?' + $httpParamSerializer(payload);
                    $window.location.href = requestTokenUrl;
                };
            }
        };
    }

})();
