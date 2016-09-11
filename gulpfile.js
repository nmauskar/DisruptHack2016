var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
	return browserify({ entries: 'public/jsx/app.js', extensions: ['.js'], debug: true })
		.transform('babelify', { presets: [ 'es2015', 'react' ] })
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('public/js'));
});

gulp.task('watch', ['build'], function () {
	gulp.watch('public/jsx/*.js', ['build']);
});

gulp.task('default', ['watch']);
