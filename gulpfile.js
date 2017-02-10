var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('website/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('website/css'));
});

gulp.task('sass:watch', function(){
    gulp.watch('website/scss/style.scss', ['sass'])
});