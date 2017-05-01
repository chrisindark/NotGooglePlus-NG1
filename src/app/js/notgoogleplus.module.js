/**
 * @name notgoogleplus
 * @description notgoogleplus
 */
angular
    .module('notgoogleplus', [
        'ngCookies',
        'ngSanitize',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'angular-inview',
        'angular-loading-bar',
        'wu.masonry',
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

angular
    .module('notgoogleplus')
    .run(run);

function run() {
    console.log("Angular app started");
    console.log("Angular app started");
}
