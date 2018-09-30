'use strict';

var gulp = require('gulp');
var path = require('path');
var clean = require('gulp-clean');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var gulpNgConfig = require('gulp-ng-config');
var wiredep = require('wiredep');
var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');
var connectLogger = require('connect-logger');

var conf = require('../conf');


gulp.task('clean', function () {
    return gulp.src([path.join(conf.paths.dist, '*'),
                     path.join(conf.paths.tmp, '*')],
                     {read: false})
        .pipe(clean({force: true}))
        .on('error', conf.errorHandler('Clean'));
});

// gulp.task('sass', function () {
//     return gulp.src(path.join(conf.paths.src, conf.files.scss))
//         .pipe(sass())
//         .pipe(autoprefixer())
//         .pipe(cssnano())
//         .pipe(gulp.dest('dest'));
// });

gulp.task('twitter-oauth', ['clean'], function() {
    return gulp.src('gulp-tasks/twitter-oauth.config.json')
        .pipe(gulpNgConfig('notgoogleplus.config', {
            createModule: false,
            wrap: true,
            pretty: 4,
            environment: 'env.local'
        }))
        .pipe(gulp.dest(path.join(conf.paths.tmp, conf.folders.js)));
});

gulp.task('google-oauth', ['clean'], function () {
    return gulp.src('gulp-tasks/google-oauth.config.json')
        .pipe(gulpNgConfig('notgoogleplus.config', {
            createModule: false,
            wrap: true,
            pretty: 4,
            environment: 'env.local'
        }))
        .pipe(gulp.dest(path.join(conf.paths.tmp, conf.folders.js)));
});

gulp.task('config', ['google-oauth', 'twitter-oauth'], function () {
    return gulp.src('gulp-tasks/config.json')
        .pipe(gulpNgConfig('notgoogleplus.config', {
            createModule: false,
            wrap: true,
            pretty: 4,
            environment: 'env.local'
        }))
        .pipe(gulp.dest(path.join(conf.paths.tmp, conf.folders.js)));
});

gulp.task('template-cache', ['config'], function () {
    return gulp.src(path.join(conf.paths.src, conf.files.html))
        .pipe(templateCache('template-cache.js', {
            module: 'notgoogleplus.utils',
            standalone: false,
            root: 'app/js'
        }))
        .pipe(gulp.dest(path.join(conf.paths.tmp, conf.folders.js)));
});

gulp.task('copy-tmp', ['template-cache'], function () {
    return gulp.src(path.join(conf.paths.src, conf.files.all))
        .pipe(gulp.dest(conf.paths.tmp));
});

gulp.task('inject-tmp', ['copy-tmp'], function () {
    return gulp.src(path.join(conf.paths.tmp, 'index.html'))
        .pipe(wiredep.stream(conf.wiredepOptions))
        // to get rid of all Uncaught Error: [$injector:modulerr].
        .pipe(inject(gulp.src(
            [
                path.join(conf.paths.tmp, '**/*.module.js'),
                path.join(conf.paths.tmp, conf.files.js)
            ], {read: false}), {relative: true}))
        .pipe(inject(gulp.src(path.join(conf.paths.tmp, conf.files.css),
                              {read: false}), {relative: true}))
        .pipe(gulp.dest(conf.paths.tmp));
});

gulp.task('file-watch', ['inject-tmp'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('serve', ['inject-tmp'], function () {
    // var baseDir = path.join(__dirname,  conf.paths.tmp, 'index.html');

    // Serve files from the root of this project
    browserSync.init({
        ui: {
            port: 3001
        },
        port: 3000,
        server: {
            baseDir: conf.paths.tmp,
            index: 'index.html',
            middleware: [historyApiFallback()],
            routes: {
                "/bower_components": "bower_components"
            }
        },
        open: false,
        notify: false,
        ghostMode: false,
        reloadOnRestart: true
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch(path.join(conf.paths.src, conf.files.all),
                         ['inject-tmp', 'file-watch']);
});
