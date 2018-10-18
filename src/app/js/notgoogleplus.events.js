(function () {
    angular
        .module('notgoogleplus')
        .run(run);

    run.$inject = ['$rootScope', '$state', '$stateParams', '$window',
        'Authentication', 'SessionService', 'Snackbar', '$anchorScroll', 'NavbarService'];

    function run($rootScope, $state, $stateParams, $window,
                 Authentication, SessionService, Snackbar, $anchorScroll, NavbarService) {
        // added to rootScope to be available in templates
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope._ = _; // added _ to use underscore functions in templates

        // set type of session service on app init
        SessionService.checkWebStorage();

        // hack to scroll to top when navigating to new URLS but not back/forward
        var wrap = function (method) {
            var orig = $window.window.history[method];
            $window.window.history[method] = function () {
                var retval = orig.apply(this, Array.prototype.slice.call(arguments));
                $anchorScroll();
                return retval;
            };
        };
        wrap('pushState');
        wrap('replaceState');

        $rootScope.$on('ErrorIntercepted', function (event, args) {
            $state.go('error', {
                errorObj: {
                    code: args.response.status,
                    detail: args.response.data.detail,
                    message: args.statusText
                }
            });
        });

        $rootScope.$on('Authenticated', function () {
            $state.reload();
        });

        // @name $rootScope event listener
        // @desc listen on event 'Unauthenticated'.
        $rootScope.$on('Unauthenticated', function () {
            // remove cookies/tokens if present.
            Authentication.removeAuthToken();
            Authentication.removeAuthenticatedUser();
            $state.reload();
        });

        $rootScope.$on('SetAuthenticatedUser', function (event, user) {
            Authentication.setAuthenticatedUser(user);
            $state.reload();
        });


        // enumerate routes that don't need authentication
        var statesThatDontRequireAuth = [
            'home',
            'tabs',
            'posts',
            'postDetail',
            'articles',
            'articleDetail',
            'accountActivation',
            'emailResendConfirm',
            'passwordResetConfirm',
            'googleOauthCallback',
            'twitterOauthCallback',
        ];

        var statesThatRequireAdmin = [
            'admin'
        ];

        // check if current location matches route that doesn't require authentication
        var routeCheck = function (route) {
            return _.contains(statesThatDontRequireAuth, route);
        };

        var routeAdmin = function (route) {
            return _.contains(statesThatRequireAdmin, route);
        };

        // no need to deregister events in run function, since it is called only once.
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams,
                                                      fromState, fromParams, options) {
            // console.log('stateChangeStart');
            NavbarService.setCurrentState(toState);

            // redirectTo option in states to help in redirection
            // if (toState.redirectTo) {
            //     event.preventDefault();
            //     $state.go(toState.redirectTo, toParams)
            // }
            // // reload parent state 'tabs' on change of child states
            // if (toState.parent === 'tabs') {
            //     toState.reload = true;
            // }
            // if state doesn't require auth
            if (routeCheck(toState.name)) {
                // do something
            }
            // if state requires auth
            if (!routeCheck(toState.name)) {
                // if user is not authenticated
                if (!Authentication.isAuthenticated()) {
                    // event.preventDefault();
                    // $state.go('home', {}, {reload: true});
                } else {
                    // if user is authenticated, check if user is owner of account
                    if (toState.name === 'profileSettings' && toParams.username) {
                        Authentication.isOwner(toParams.username)
                            .then(function () {
                                // do something
                            })
                            .catch(function () {
                                Snackbar.error('You are not authorised to view this page.');
                                $state.go('home', {}, {reload: true});
                            })
                            .finally(function () {
                                // do something
                            });
                    }
                }
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams,
                                                        fromState, fromParams, options) {
            // console.log('stateChangeSuccess');
        });

    }

})();
