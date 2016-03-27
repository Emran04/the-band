'use strict';

var gulp 				= require('gulp'),
		concat 			= require('gulp-concat'),
		uglify 			= require('gulp-uglify'),
		rename 			= require('gulp-rename'),
		sass 				= require('gulp-sass'),
		maps 				= require('gulp-sourcemaps'),
		autoprefixer = require('gulp-autoprefixer'),
		// connect 		= require('gulp-connect'),
		browserSync = require('browser-sync'),
		del 				= require('del'),
		jade 				= require('gulp-jade');

gulp.task("concatScripts", function (){
	return gulp.src([
		"js/main.js"])
	.pipe(maps.init())
	.pipe(concat("theme.js"))
	.pipe(maps.write('./'))
	.pipe(gulp.dest("js"))
	.pipe(browserSync.reload({stream:true}))
});

gulp.task("minifyScript", ["concatScripts"], function () {
	return gulp.src("js/main.js")
	.pipe(uglify())
	.pipe(rename("main.min.js"))
	.pipe(gulp.dest("js"));
});

gulp.task("compileSass", function () {
	return gulp.src('scss/main.scss')
	.pipe(maps.init())
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(maps.write('./'))
	.pipe(gulp.dest('css'))
	// .pipe(connect.reload());
	.pipe(browserSync.reload({stream:true}));
});

gulp.task("compileHtml", function () {
	return gulp.src('jade/*.jade')
	.pipe(jade({ pretty: true }))
	.pipe(gulp.dest("./"))
	.pipe(browserSync.reload({stream:true}))
})

gulp.task("watch", function () {
	gulp.watch("scss/**/*.scss", ["compileSass"]);
	gulp.watch("jade/**/*.jade", ["compileHtml"]);
});

// gulp.task("connect", function () {
// 	connect.server({
// 		livereload: true,
// 		open: true 
// 	});
// });

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});


gulp.task('start', ['browser-sync', 'watch']);

gulp.task("clean", function (){
	del(["dist", "css/main.css*", "js/theme*.js*"]);
});

gulp.task("build", ["minifyScript", "compileSass", "compileHtml"], function () {
	gulp.src(["css/**", "scss/**", "js/vendor/**", "js/theme.js", "index.html", "fonts/**", "img/**"], { base: "./" })
		.pipe(gulp.dest("dist"));
});

gulp.task("default", ["clean"], function () {
	gulp.start("build");
});
