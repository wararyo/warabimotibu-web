/*================

Gulpfile wararyo non-PHP Project

===============*/

/*================
Settings
===============*/

var htmlfiles = "src/**/*.html"
var jsfiles = "src/js/**/*.js";
var scssfiles = "src/scss/**/*.scss";
var imagefiles = "src/images/**";

//var server = "localhost:8888";

/*================*/

var gulp = require("gulp");
var sass = require("gulp-sass");
var sassGlob = require("gulp-sass-glob");
var autoprefixer = require("gulp-autoprefixer");
var frontnote = require("gulp-frontnote");
var uglify = require("gulp-uglify");
var browser = require("browser-sync").create();
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

var usage = ['','Gulpfile non-PHP Project',
	'Usage: gulp [ start | frontnote | sass | js ]',
	'	Basic:',
	'		start     : start browser-sync and auto-compiling',
	'		frontnote : create style guide with frontnote',
	'	Advanced:',
	'		sass      : compile sass manually',
	'		js        : compile javascript manually',''
 ];
 
gulp.task("server", function(done) {
    browser.init({
        server: "dist"
    });
    done();
});

gulp.task("reload", function(done) {
    browser.reload();
    done();
});
 
gulp.task("sass", function(done) {
    gulp.src(scssfiles)
    	.pipe(plumber({errorHandler: notify.onError({
        	message: "<%= error.message %>",
        	title: "風変わりなSCSSどすなあ"
      	})}))
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("dist/"));
    done();
});

gulp.task("html", function(done) {
    gulp.src(htmlfiles)
        .pipe(gulp.dest("dist/"));
    done();
});

gulp.task("image", function(done) {
    gulp.src(imagefiles)
        .pipe(gulp.dest("dist/images/"));
    done();
});

gulp.task("frontnote", function(done) {
	gulp.src(scssfiles)
		.pipe(frontnote({
	            css: 'dist/style.css'
	        }));
    done();
});

gulp.task("js", function(done) {
    gulp.src(jsfiles)
    	.pipe(plumber({errorHandler: notify.onError({
        	message: "<%= error.message %>",
        	title: "風変わりなJavaScriptどすなあ"
      	})}))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js/"));
    done();
});

gulp.task("dist",gulp.parallel("js","sass","html","image"));

gulp.task("start",gulp.series( gulp.parallel('dist','server'), function() {
    gulp.watch(jsfiles,gulp.task("js"));
    gulp.watch(scssfiles,gulp.task("sass"));
    gulp.watch(htmlfiles,gulp.task("html"));
    gulp.watch(imagefiles,gulp.task("image"));
    gulp.watch("dist/**",gulp.task("reload"));
}));

gulp.task('default', function() {
	console.log(usage.join('\n'));
});