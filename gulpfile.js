'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var svgstore = require('gulp-svgstore'); // создаёт svg спрайт
var rename = require('gulp-rename'); // переименовывает файлы и папки
var minify = require('gulp-csso'); // минифицирует css
var imagemin = require('gulp-imagemin'); // минифицирует изображения
var webp = require('gulp-webp'); // делает webp изображения
var posthtml = require('gulp-posthtml'); // для того, чтобы вставлять содержимое svg
var include = require('posthtml-include'); // плагин для posthtml - заменяет кастомный тег на содержимое из src файла
var run = require('run-sequence'); // последовательное выполнение gulp тасков
var del = require('del'); //удаляет файлы и папки
var htmlmin = require('gulp-htmlmin'); //минификация html
var uglify = require('gulp-uglify'); //минификация js

gulp.task('clean', function() {
  return del('build');
});

gulp.task('style', function() {
  gulp.src('source/less/style.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('serve', function() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/less/**/*.less', ['style']);
  gulp.watch('source/*.html', ['html']);
});

gulp.task('copy', function() {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source/js/**'], {
      base: 'source'
    })
    .pipe(gulp.dest('build/'));
});

gulp.task('html', function() {
  return gulp.src(['source/*.html'])
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));
});

gulp.task('images', function() {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('source/img'));
});

gulp.task('js', function() {
  return gulp.src('source/js/**/*.js', {
      base: 'source'
    })
    .pipe(uglify())
    .pipe(gulp.dest('build/'))
});

gulp.task('webp', function() {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest('source/img'));
});

gulp.task('sprite', function() {
  return gulp.src('source/img/icon-*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('build', function(done) {
  run('clean', 'copy', 'style', 'sprite', 'html', 'js', done);
});
