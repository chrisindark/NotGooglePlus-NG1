var gulp = require('gulp');
var requireDir = require('require-dir');
var argv = require('yargs').argv;


// Require all tasks.
requireDir( './gulp-tasks', { recurse: true });
if (argv.production) {
    console.log("PRODUCTION ENVIRONMENT");
}

gulp.task('default', function () {
    console.log("GULP IS WORKING");
});
