'use strict';

var gulp = require('gulp');
var path = require('path');
var fs = require("fs");
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var debug = require('gulp-debug');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var gulpNgConfig = require('gulp-ng-config');
var runSequence = require('run-sequence');
var wiredep = require('wiredep');

var rev = require('gulp-rev');
var revAll = require('gulp-rev-all');

var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');

var conf = require('../conf');


gulp.task('twitter-oauth-config', function () {
    return gulp.src('gulp-tasks/twitter-oauth.config.json')
        .pipe(gulpNgConfig('notgoogleplus.config', {
            createModule: false,
            wrap: true,
            pretty: 4,
            environment: 'env.production'
        }))
        .pipe(gulp.dest(path.join(conf.paths.dist, conf.folders.js)));
});

gulp.task('google-oauth-config', function () {
    return gulp.src('gulp-tasks/google-oauth.config.json')
        .pipe(gulpNgConfig('notgoogleplus.config', {
            createModule: false,
            wrap: true,
            pretty: 4,
            environment: 'env.production'
        }))
        .pipe(gulp.dest(path.join(conf.paths.dist, conf.folders.js)));
});

gulp.task('buildconfig', ['google-oauth-config', 'twitter-oauth-config'], function () {
    return gulp.src('gulp-tasks/config.json')
        .pipe(gulpNgConfig('notgoogleplus.config', {
            createModule: false,
            wrap: true,
            pretty: 4,
            environment: 'env.production'
        }))
        .pipe(gulp.dest(path.join(conf.paths.dist, conf.folders.js)));
});

gulp.task('buildsass', ['buildconfig'], function () {
    return gulp.src(path.join(conf.paths.src, conf.files.scss))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(gulp.dest(conf.paths.dist));
});

gulp.task('buildhtml', ['buildsass'], function () {
    return gulp.src(path.join(conf.paths.src, conf.files.html))
        .pipe(templateCache('template-cache.js', {
            module: 'notgoogleplus.utils',
            standalone: false
            // root: 'app/templates'
        }))
        .pipe(gulp.dest(path.join(conf.paths.dist, conf.folders.js)));
});

gulp.task('buildcss', function () {
    return gulp.src(path.join(conf.paths.src, conf.files.css))
        .pipe(concat('notgoogleplus.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest(conf.paths.dist));
});

gulp.task('buildjs', ['buildhtml'], function () {
    return gulp.src([
        path.join(conf.paths.src, '**/*.module.js'),
        path.join(conf.paths.src, conf.files.js),
        path.join(conf.paths.dist, conf.files.js)
    ])
    // .pipe(debug({title: 'own-js:'}))
        .pipe(concat('notgoogleplus.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(conf.paths.dist));
});

gulp.task('buildlibcss', function () {
    return gulp.src(wiredep(conf.wiredepOptions).css)
        .pipe(concat('notgoogleplus.vendor.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest(conf.paths.dist));
});

gulp.task('buildlibjs', function () {
    return gulp.src(wiredep(conf.wiredepOptions).js)
        // .pipe(debug({title: 'vendor-js:'}))
        .pipe(concat('notgoogleplus.vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(conf.paths.dist));
});

gulp.task('build', function (callback) {
    runSequence('buildcss', 'buildjs',
                'buildlibcss', 'buildlibjs', callback);
});

gulp.task('revision', ['build'], function () {
    return gulp.src([path.join(conf.paths.dist, '*.js'),
                     path.join(conf.paths.dist, '*.css')])
        .pipe(revAll.revision())
        .pipe(gulp.dest(conf.paths.dist))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest(conf.paths.dist))
        .pipe(revAll.versionFile())
        .pipe(gulp.dest(conf.paths.dist));
});

gulp.task("inject-service-worker-old", ['revision'], function() {
    var manifest= JSON.parse(fs.readFileSync(conf.paths.dist + "/rev-manifest.json"));
    var arr = [];
    var swFileName = '';
    for (var fileName in manifest) {
        if (fileName.indexOf('sw.js') > -1) {
            arr.push(path.join(conf.paths.dist, manifest[fileName]));
            swFileName = manifest[fileName];
        }
    }
    return gulp.src(path.join(conf.paths.dist, 'index.html'))
        .pipe(inject(gulp.src(arr, {read: false}), {
            name: 'body',
            transform: function (filepath, i, length, sourceFile, targetFile) {
                if (filepath.slice(-3) === '.js') {
                    return '<script defer>' +
                        'if (navigator.serviceWorker) {' +
                            'navigator.serviceWorker.register(\'' + swFileName + '\')' +
                                '.then(function (res) {' +
                                    'console.log(\'Service worker installed\', res)' +
                                '})' +
                                '.catch(function (err) {' +
                                    'console.error(\'Service worker error:\', err);' +
                                '});' +
                        '}' +
                    '</script>';
                }
                // Use the default transform as fallback:
                return inject.transform.apply(inject.transform, arguments);
            }
        }))
        .pipe(gulp.dest(conf.paths.dist));
});

gulp.task("inject-service-worker-new", ['revision'], function() {
    var manifest= JSON.parse(fs.readFileSync(conf.paths.dist + "/rev-manifest.json"));
    var arr = [];
    var swFileName = '';
    for (var fileName in manifest) {
        if (fileName.indexOf('sw.js') > -1) {
            arr.push(path.join(conf.paths.dist, manifest[fileName]));
            swFileName = manifest[fileName];
        }
    }
    return gulp.src(path.join(conf.paths.dist, 'index.html'))
        .pipe(inject(gulp.src(arr, {read: false}), {
            name: 'service-worker',
            transform: function (filepath, i, length, sourceFile, targetFile) {
                if (filepath.slice(-3) === '.js') {
                    return 'var swFileName = \'' + swFileName + '\';';
                }
                // Use the default transform as fallback:
                return inject.transform.apply(inject.transform, arguments);
            }
        }))
        .pipe(gulp.dest(conf.paths.dist));
});


gulp.task("inject-dist", ['inject-service-worker-new'], function () {
    var manifest= JSON.parse(fs.readFileSync(conf.paths.dist + "/rev-manifest.json"));
    var arr = [];
    var revArr = [];
    for(var fileName in manifest) {
        // For files versioned
        if (fileName !== manifest[fileName]) {
            // Add the revisioned filename to inject
            revArr.push(path.join(conf.paths.dist, manifest[fileName]));
            // Add the original filename to delete
            arr.push(path.join(conf.paths.dist, fileName));
            // console.log(arr);
        }
    }

    return gulp.src(path.join(conf.paths.dist, 'index.html'))
        .pipe(inject(gulp.src(revArr.reverse(), {read: false}), {relative: true}))
        .pipe(gulp.dest(conf.paths.dist));
});

gulp.task('copy-dist', function () {
    var arr = [
        conf.files.fonts,
        conf.files.images,
        conf.files.icons,
        conf.files.assets
    ];
    var distArr = [
        conf.folders.fonts,
        conf.folders.images,
        conf.folders.icons,
        conf.folders.assets
    ];
    arr.forEach(function (currentValue, index) {
        gulp.src([path.join(conf.paths.src, currentValue)])
            .pipe(gulp.dest(path.join(conf.paths.dist, distArr[index])));
    });

    return gulp.src([
        path.join(conf.paths.src, 'index.html'),
        path.join(conf.paths.src, 'favicon.ico'),
        path.join(conf.paths.src, 'sw.js')
    ])
        .pipe(gulp.dest(conf.paths.dist));
});

gulp.task('dist', function (callback) {
    runSequence('clean', 'copy-dist', 'inject-dist', callback);
});

gulp.task('serve-dist', ['dist'], function () {
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: conf.paths.dist,
            index: 'index.html',
            middleware: [historyApiFallback()]
        },
        // Stop the browser from automatically opening
        open: false,
        // Don't show any notifications in the browser.
        notify: false,
        // Reload browser automatically on restart of browsersync
        reloadOnRestart: true
    });
});


var awspublish = require('gulp-awspublish');
var cloudfrontInvalidate = require('gulp-cloudfront-invalidate-aws-publish');

var localConfig = {
    buildSrc: './dist/**/*',
    getAwsConf: function (environment) {
        var conf = require('../config/aws-config');
        if (!conf[environment]) {
            throw 'No aws conf for env: ' + environment;
        }
        if (!conf[environment + 'Headers']) {
            throw 'No aws headers for env: ' + environment;
        }
        return { keys: conf[environment], headers: conf[environment + 'Headers'] };
    }
};

var cfSettings = {
  distribution: 'E2A654H2YRPD0W', // Cloudfront distribution ID 
  // accessKeyId: '',             // Optional AWS Access Key ID 
  // secretAccessKey: '',         // Optional AWS Secret Access Key 
  // sessionToken: '',            // Optional AWS Session Token 
  wait: true,                     // Whether to wait until invalidation is completed (default: false) 
  indexRootPath: true             // Invalidate index.html root paths (`foo/index.html` and `foo/`) (default: false) 
};

gulp.task('s3-publish', function () {
    var awsConf = localConfig.getAwsConf('production');
    var publisher = awspublish.create(awsConf.keys);
    return gulp.src(localConfig.buildSrc)
        // gzip, Set Content-Encoding headers and dont add an extension
        .pipe(awspublish.gzip({ext: ''}))
        // publisher will add Content-Length, Content-Type and headers specified above
        // If not specified it will set x-amz-acl to public-read by default
        .pipe(publisher.publish(awsConf.headers))
        // invalidates the array of files that were updated, created, or deleted by gulp-awspublish
        .pipe(cloudfrontInvalidate(cfSettings))
        // create a cache file to speed up consecutive uploads
        .pipe(publisher.cache())
        // create a transform stream that delete old files from the bucket
        .pipe(publisher.sync())
        // print upload updates to console
        .pipe(awspublish.reporter());
});
