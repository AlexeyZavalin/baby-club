'use strict'

var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    wiredep = require('wiredep').stream,
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean');

gulp.task('clean', function() {
    return gulp.src("dist", { read: false })
        .pipe(clean());
});

gulp.task('build', ['clean'], function() {
    return gulp.src("src/*.html")
        .pipe(useref())
        .pipe(gulpif('js/*.js', uglify()))
        .pipe(gulp.dest('dist'));
});

gulp.task('bower', function() {
    gulp.src('src/index.html')
        .pipe(wiredep({
            directory: 'src/bower_components/'
        }))
        .pipe(gulp.dest('src/'));
});

gulp.task('connect', function() {
    connect.server({
        root: 'src/',
        port: 8080,
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(connect.reload())

});

gulp.task('less', function() {
    return gulp.src('src/less/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('src/css/'));
});

gulp.task('css', function() {
    return gulp.src('src/css/*.css')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('src/less/*.less', ['less'])
    gulp.watch('src/css/*.css', ['css'])
    gulp.watch('src/*.html', ['html'])
    gulp.watch('src/js/*.js', ['html'])
    gulp.watch('bower.json', ['bower'])
});

gulp.task('default', ['connect', 'watch']);