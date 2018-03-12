var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var coffeescript = require('gulp-coffeescript');
var gutil = require('gulp-util');
var mustache = require("gulp-mustache");
var concat = require('gulp-concat');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

// Static Server + watching scss/html files
gulp.task('serve', function () {

    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("src/*.coffee", ['coffee']);
    gulp.watch("templates/*.mustache", ['mustache']);
    gulp.watch("settings.json", ['mustache']);

    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("settings.json").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp
        .src("scss/style.scss")
        .pipe(sass())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task('coffee', function () {
    gulp
        .src("./src/*.coffee")
        .pipe(coffeescript({
            bare: true
        }).on("error", gutil.log))
        .pipe(gulp.dest("./js/"))
        .pipe(browserSync.stream());
});

gulp.task('mustache', function () {
    gulp
        .src("./templates/*.mustache")
        .pipe(mustache("settings.json", {
            extension: ".html"
        }, {}))
        .pipe(gulp.dest("./"))
        .pipe(browserSync.stream());
})
gulp.task('default', ['serve']);

gulp.task('default', function () {
    gulp.src('src/css/*.css')
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', () =>
    gulp.src('src/app.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('scripts', function () {
    return gulp.src('./lib/script.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compress', function (cb) {
    pump([
        gulp.src('lib/script.js'),
        uglify(),
        gulp.dest('dist')
    ],
        cb
    );
});

gulp.task('default', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);