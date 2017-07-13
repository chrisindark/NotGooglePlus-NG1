'use strict';

var gutil = require('gulp-util');


exports.paths = {
    src: 'src',
    dist: 'dist',
    tmp: '.tmp',
    e2e: 'e2e',
    tasks: 'gulp_tasks'
};

exports.folders = {
    js: 'app/js',
    css: 'app/css',
    fonts: 'app/fonts',
    images: 'app/images',
    icons: 'app/icons',
    assets: 'assets',
    all: '**/*'
};

exports.files = {
    js: '**/*.js',
    css: '**/*.css',
    html: '**/*.html',
    fonts: 'app/fonts/**/*.*',
    images: 'app/images/**/*.*',
    icons: 'app/icons/**/*.*',
    assets: 'assets/**/*.*',
    all: '**/*.*'
};

exports.wiredepOptions = {
    exclude: [
        'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
        'bower_components/get-size/get-size.js',
        'bower_components/ev-emitter/ev-emitter.js',
        'bower_components/desandro-matches-selector/matches-selector.js',
        'bower_components/fizzy-ui-utils/utils.js',
        'bower_components/outlayer/outlayer.js',
        'bower_components/moment/moment.js'
    ],
    overrides: {
        "bootstrap": {
            "main": [
                "dist/js/bootstrap.js",
                "dist/css/bootstrap.css"
            ]
        },
        masonry: {
            "main": [
                "dist/masonry.pkgd.js"
            ],
            "dependencies": {}
        }
    }
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function (title) {
    'use strict';

    return function (err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};
