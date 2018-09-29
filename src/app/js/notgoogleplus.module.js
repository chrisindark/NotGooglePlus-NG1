(function () {
    /**
     * @name notgoogleplus
     * @description notgoogleplus
     */
    angular
        .module('notgoogleplus', [
            'ngCookies',
            'ngSanitize',
            'ngAnimate',
            'ngMessages',
            'ui.router',
            'oc.lazyLoad',
            'ui.bootstrap',
            'ui.select',
            'angular-loading-bar',
            'angularMoment',
            'credit-cards',
            'vjs.video',
            'notgoogleplus.config',
            'notgoogleplus.routes',
            'notgoogleplus.services',
            'notgoogleplus.controllers',
            'notgoogleplus.directives',
            'notgoogleplus.utils'
        ]);

    angular
        .module('notgoogleplus.config', []);

    angular
        .module('notgoogleplus.routes', []);

    angular
        .module('notgoogleplus.services', []);

    angular
        .module('notgoogleplus.controllers', []);

    angular
        .module('notgoogleplus.directives', []);

    angular
        .module('notgoogleplus.utils', []);

})();
