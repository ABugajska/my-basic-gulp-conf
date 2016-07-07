var plumber = require('gulp-plumber');
var filesort = require('gulp-angular-filesort');
var concat = require('gulp-concat');
var html2js = require('gulp-ng-html2js');
var bowerLibs = require('main-bower-files');

var haml = require('gulp-haml');
var styles = require('gulp-sass');
var gulp = require('gulp');
var watch = require('gulp-watch');


gulp.task('watch', function(){
  watch('./source/**/*.scss', function(){
    // sass -> TASK name
    gulp.start('sass');
  });
  watch('./source/**/*.js', function(){
    // sass -> TASK name
    gulp.start('js');
  });
  watch('./source/index.haml', function(){
    // sass -> TASK name
    gulp.start('haml');
  });
  watch('./source/**/*.haml', function(){
    // sass -> TASK name
    gulp.start('templates');
  });
});



gulp.task('default', function(){

});

gulp.task('bower-libs', function(){
  return gulp.src(bowerLibs())
    .pipe(plumber())
    .pipe(concat('bower.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('templates', function(){
  return gulp.src('./source/**/*.haml')
    .pipe(plumber())
    .pipe(haml())
    .pipe(html2js({
      moduleName: 'templates',
      declareModule: true
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('js', function(){
  return gulp.src('./source/**/*.js')
    .pipe(plumber())
    .pipe(filesort())
    .pipe(concat('application.js'))
    .pipe(gulp.dest('build'));
});


gulp.task('haml', function(){
  return gulp.src('./source/index.haml')
    .pipe(haml())
    .pipe(gulp.dest('build'));
});

gulp.task('sass', function(){
  return gulp.src('./source/styles.scss')
    .pipe(plumber())
    .pipe(styles())
    .pipe(gulp.dest('build'));
});
