var gulp					= require('gulp'),
	sass					= require('gulp-sass'),
	autoprefixer			= require('gulp-autoprefixer'),
	rename					= require('gulp-rename'),
	imagemin				= require('gulp-imagemin'),
	sourcemaps 				= require('gulp-sourcemaps'),
	changed					= require('gulp-changed'),
	imageminJpegRecompress  = require('imagemin-jpeg-recompress'),
	pngquant				= require('imagemin-pngquant'),
	concat					= require('gulp-concat'),
	uglify					= require('gulp-uglify'),
	babel					= require('gulp-babel'),
	cssnano					= require('gulp-cssnano'),
	watch					= require('gulp-watch'),
	browserSync				= require('browser-sync').create(),
	del						= require('del'),
	htmlreplace				= require('gulp-html-replace'),
	fileinclude				= require('gulp-file-include');

var fika = require('./package.json');


//
// Gulp plumber error handler - displays if any error occurs during the process on your command
//
function errorLog(error) {
	console.error.bind(error);
	this.emit('end');
}


//
// Gulp clean handler - cleans dist directory
//
function clean() {
	return del([ 'dist' ]);
}


//
// SASS - Compile SASS files into CSS
//
gulp.task('styles', function () {
	return gulp.src([
		'./src/assets/css/sass/main.sass'
	])
	.pipe(changed('./dist/assets/css/'))
	.pipe(sourcemaps.init())
	.pipe(sass({ outputStyle: 'expanded' }))
	.on('error', sass.logError)
	.pipe(autoprefixer([
		"last 1 major version",
		">= 1%",
		"Chrome >= 45",
		"Firefox >= 38",
		"Edge >= 12",
		"Explorer >= 10",
		"iOS >= 9",
		"Safari >= 9",
		"Android >= 4.4",
		"Opera >= 30"], { cascade: true }))
	.pipe(sourcemaps.write('.', { sourceRoot: '/' }))
	.pipe(gulp.dest('./dist/assets/css/'))
	.pipe(browserSync.stream());
});

//
// SASS - Compile and minify SASS files into CSS
//
gulp.task('minStyles', function () {
	return gulp.src([
		'./src/assets/css/sass/main.sass'
	])
	.pipe(sass({ outputStyle: 'expanded' }))
	.on('error', sass.logError)
	.pipe(autoprefixer([
		"last 1 major version",
		">= 1%",
		"Chrome >= 45",
		"Firefox >= 38",
		"Edge >= 12",
		"Explorer >= 10",
		"iOS >= 9",
		"Safari >= 9",
		"Android >= 4.4",
		"Opera >= 30"], { cascade: true }))
	.pipe(gulp.dest('./dist/assets/css/'))
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./dist/assets/css/'))
	.pipe(browserSync.stream());
});



//
// JS - Compile JS files into ES5
//
gulp.task('scripts', function ( done ) {
	return gulp.src([
		'./src/assets/js/app.js',
	])
	.pipe(changed('./dist/assets/js/'))
	.pipe(babel({
		presets: ['@babel/preset-env', {sourceType: "unambiguous"}],
	}))
	.pipe(gulp.dest('./dist/assets/js/'))
	.pipe(browserSync.stream());
});

//
// JS - Compile and minify JS files into ES5
//
gulp.task('minScripts', function ( done ) {
	return gulp.src([
		'./src/assets/js/app.js',
	])
	.pipe(babel({
		presets: ['@babel/preset-env', {sourceType: "unambiguous"}],
	}))
	.pipe(gulp.dest('./dist/assets/js/'))
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./dist/assets/js/'))
	.pipe(browserSync.stream());
});


//
// Copy Html - a utility to copy html files into a dist folder
//
gulp.task('html', function () {
	return gulp.src([
		'./src/**/*.html'
	])
	.pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
	.pipe(changed('./dist/'))
	.pipe(gulp.dest('./dist/'))
	.pipe(browserSync.stream());
});




//
// Build Html - replace js and css with minified version and copy into a dist folder
//
gulp.task('buildHtml', function () {
	return gulp.src([
		'./src/**/*.html'
	])
	.pipe(htmlreplace({
		'css': 'assets/css/main.min.css?ver=' + fika.version,
		'js': 'assets/js/app.min.js?ver=' + fika.version
	}))
	.pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
	.pipe(gulp.dest('./dist/'))
	.pipe(browserSync.stream());
});


//
// Copy Images - a utility to copy images into a dist/assets/images folder
//
gulp.task('images', function () {
	return gulp.src([
		'./src/assets/images/**/*'
	])
	.pipe(gulp.dest('./dist/assets/images/'))
	.pipe(browserSync.stream());
});



//
// Image minifier - compresses images and copy into dist/assets/images folder
//
gulp.task('minImages', function() {
	return gulp.src([
		'./src/assets/images/**/*',
		//'!./src/assets/images/icons/**/*'
	])
	.pipe(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.jpegtran({progressive: true}),
		imageminJpegRecompress({
			loops: 4,
			min: 70,
			max: 80,
			quality:'medium'
		}),
		imagemin.svgo({
			plugins: [
				{ cleanupIDs: false },
				{ removeViewBox: false }
			]
		}),
		imagemin.optipng({optimizationLevel: 3}),
	  	pngquant({quality: [0.7, 0.8], speed: 5})
	],{
		verbose: true
	}))
	.pipe(gulp.dest('./dist/assets/images/'));
});



//
// Copy Fonts - a utility to copy fonts into a dist/assets/fonts folder
//
gulp.task('fonts', function () {
	return gulp.src([
		'./src/assets/fonts/**/*'
	])
	.pipe(gulp.dest('./dist/assets/fonts/'))
	.pipe(browserSync.stream());
});


//
// Copy Videos - a utility to copy videos into a dist/assets/videos folder
//
gulp.task('videos', function () {
	return gulp.src([
		'./src/assets/videos/**/*'
	])
	.pipe(gulp.dest('./dist/assets/videos/'))
	.pipe(browserSync.stream());
});



//
// Copy Vendors - a utility to copy client-side dependencies into a dist/assets/vendors folder
//
gulp.task('vendors', function() {
	return gulp.src([
		'./src/assets/vendors/**/*',
	])
	.pipe(gulp.dest('./dist/assets/vendors/'))
});

gulp.task('doc-assets', function() {
	return gulp.src([
		'./src/documentation/assets/**/*',
	])
	.pipe(gulp.dest('./dist/documentation/assets/'))
});


//
// Gulp run local server
//
//
gulp.task('server', function(){

	browserSync.init({
		startPath: "./",
		server: {
			baseDir: "./dist/",
		},
	});

	return;

});



//
// Gulp Watch and Tasks
//
//
gulp.task('watch', function() {
	browserSync.init({
		startPath: "./",
		server: {
			baseDir: "./dist/",
		},
	});

	gulp.watch(['./src/assets/css/sass/**/*.sass', './src/assets/css/sass/**/*.scss'], gulp.series('styles') );
	gulp.watch(['./src/assets/js/**/*.js'], gulp.series('scripts') );
	gulp.watch(['./src/assets/images/**/*'], gulp.series('images') );
	gulp.watch(['./src/assets/fonts/**/*'], gulp.series('fonts') );
	gulp.watch(['./src/**/*.html'], gulp.series('html'));
	return;
});


gulp.task('default', gulp.series( clean, gulp.parallel('styles', 'scripts', 'html', 'images', 'fonts', 'videos', 'vendors', 'doc-assets'), 'watch') );

gulp.task('build', gulp.series( clean, gulp.parallel('minStyles', 'minScripts', 'buildHtml', 'minImages', 'fonts', 'videos', 'vendors', 'doc-assets') ) );