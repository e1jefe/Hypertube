"use strict"
var gulp 			= require('gulp');
var sass 			= require('gulp-sass');
var autoprefixer 	= require('gulp-autoprefixer');

gulp.task('sass', function(){
 return gulp.src('client/src/interface/scss/*.+(scss|sass)')
 .pipe(sass())
 .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
 .pipe(gulp.dest('client/src/components/style/'))
});

gulp.task('watch', function(){
 gulp.watch('client/src/interface/scss/*.+(scss|sass)', ['sass']);
});