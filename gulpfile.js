var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var ngTemplates = require('gulp-ng-templates');
var rev = require('gulp-rev');


var pathsToConcat= function (basePath, filesToConcat) {
    filesToConcat.forEach(function (currentValue, index, array) {
            array[index] = basePath + currentValue;
        });
        console.log(filesToConcat);
        return filesToConcat;
};

gulp.task('buildcss', function () {
    var basePath = 'app/styles/';
    var filesToConcat = [
        '**/*.css'
    ];

    return gulp.src(pathsToConcat(basePath, filesToConcat))
        .pipe(concat('.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('app/build'));
});

gulp.task('buildjs', function () {
    var basePath = 'app/javascripts/';
    var filesToConcat = [
        '**/*.module.js',
        '**/*.config.js',
        '**/*.routes.js',
        '**/*.js'
    ];

     return gulp.src(pathsToConcat(basePath, filesToConcat))
        .pipe(concat('notgoogleplus.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/build'));
});

gulp.task('buildlibcss', function () {
    var basePath = 'app/lib/';
    var filesToConcat = [];


    return gulp.src(pathsToConcat(basePath, filesToConcat))
        .pipe(concat('.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('app/build'));
});


gulp.task('buildlibjs', function () {
    var basePath = 'app/lib/';
    var filesToConcat = [];

    return gulp.src(pathsToConcat(basePath, filesToConcat))
        .pipe(concat('.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/build'));
});

gulp.task('buildhtml', function () {
    var basePath = 'app/templates/';
    var filesToConcat = [];

    return gulp.src(pathsToConcat(basePath, filesToConcat))
        .pipe(ngTemplates({
            filename: 'templates.js',
            module: '',
            standalone: false,
            path: function (path, base) {
                return path.replace(base, 'templates/');
            }
        }))
        .pipe(gulp.dest(''));
});

gulp.task('version', function () {
    var basePath = 'app/build/';

    return gulp.src(basePath + '*.*')
        .pipe(rev())
        .pipe(gulp.dest('app/dist'));
});

gulp.task('inject', function () {
})


gulp.task('file-watch', function (done) {
    browserSync.reload();
    done();
});

gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch([
        'app/javascripts/**/*.js',
        'app/styles/**/*.css',
        'app/templates/**/*.html'
    ], ['file-watch']);
});

