'use strict';

var gulp = require('gulp');
var path = require('path');
var fs = require("fs");
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var debug = require('gulp-debug');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var runSequence = require('run-sequence');
var wiredep = require('wiredep');

var rev = require('gulp-rev');
var revAll = require('gulp-rev-all');

var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');

var conf = require('../conf');


gulp.task('buildcss', function () {
    return gulp.src(path.join(conf.paths.src, conf.files.css))
        .pipe(concat('notgoogleplus.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest(conf.paths.dist));
});

// gulp.task('buildsass', function () {
//     return gulp.src(path.join(conf.paths.src, conf.files.scss))
//         .pipe(sass())
//         .pipe(autoprefixer())
//         .pipe(cssnano())
//         .pipe(gulp.dest(conf.paths.dist));
// });

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

gulp.task('buildhtml', function () {
    return gulp.src(path.join(conf.paths.src, conf.files.html))
        .pipe(templateCache('template-cache.js', {
            module: 'notgoogleplus.utils',
            standalone: false
            // root: 'app/templates'
        }))
        .pipe(gulp.dest(path.join(conf.paths.dist, conf.folders.js)));
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

gulp.task("inject-dist", ['revision'], function () {
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
        }
    }

    return gulp.src(path.join(conf.paths.dist, 'index.html'))
        .pipe(inject(gulp.src(revArr.reverse(), {read: false}), {relative: true}))
        .pipe(gulp.dest(conf.paths.dist));
});


gulp.task('copy-dist',  function () {
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
