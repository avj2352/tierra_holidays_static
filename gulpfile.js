var gulp = require('gulp'),
gutil = require('gulp-util'),
coffee = require('gulp-coffee'),
uglify = require('gulp-uglify'),
concat = require('gulp-concat'),
path = require('path'),
less = require('gulp-less'),
minifyCSS = require('gulp-minify-css');

var coffeeSources = [
	'components/coffee/*.coffee'
];

var lessSources = [
	'components/less/tierra.less'
];

var jsSources = [
	'components/scripts/lib/jquery-1.11.0.js',
	'components/scripts/lib/bootstrap.min.js',
	'components/scripts/*.js',
];


var cssSources = [
	'components/css/include/bootstrap.css',
	'components/css/include/font-awesome.min.css',
	'components/css/*.css',
];

/*Task1 - Process the less file*/
gulp.task('less',function(){
	gulp.src(lessSources)
	.pipe(less())
	.on('error',gutil.log)
	.pipe(gulp.dest('components/css'))
});/*end of the task1 function*/

/*Task2 - Compile the coffeescript file*/
gulp.task('coffee',function(){
	gulp.src(coffeeSources)
	.pipe(coffee({bare:true}))
	.on('error',gutil.log)
	.pipe(gulp.dest('components/scripts'))
});/*end of the task2 function*/

/*Task3 - Process and Minify all of the CSS*/
gulp.task('process',function(){
	gulp.src(cssSources)
	.pipe(minifyCSS({keepBreaks:true}))
	.pipe(concat('styles.css'))
	.pipe(gulp.dest('styles'))
});/*end of the task3 function*/

/*Task4 - Compile,concat and minify all the JS files*/
gulp.task('compile',function(){
	gulp.src(jsSources)
	.pipe(uglify())
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('js'))
});/*end of the task4 function*/

/*Task5 - Gulp task to watch for any changes and autocompile*/
gulp.task('watch',function(){
	gulp.watch(lessSources, ['less']);
	gulp.watch(cssSources, ['process']);
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['compile']);
	gulp.watch(['js/scripts.js','css/styles.css','*.html']);
});/*end of the task5 function*/

/*Task6 - The default Gulp command task*/
gulp.task('default', ['less','process','coffee','compile','watch']);