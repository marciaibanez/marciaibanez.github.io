var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var coffeescript = require('gulp-coffeescript');
var gutil        = require('gulp-util');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'coffee'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("src/*.coffee", ['coffee']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/style.scss")
        .pipe(sass())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task('coffee', function() {
      gulp.src('./src/*.coffee')
        .pipe(coffeescript({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./js/'));
});

gulp.task('default', ['serve']);
