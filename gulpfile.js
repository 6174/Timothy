var gulp = require('gulp'),
	less = require('gulp-less');
    // watch = require('gulp-watch');


// gulp.task('lessc', function () {
// 	console.log('start lessc:');
//     return ;
// });

console.log('I am restarted');
gulp.src(['src/less/timothy.less',
			'src/elements/buttons.less'
		])
    		.pipe(less())    		
            .pipe(gulp.dest('dist/css/'));

// gulp.task('default', ['lessc']);