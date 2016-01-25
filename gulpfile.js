var gulp = require('gulp');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var watch = require('gulp-watch');

gulp.task('ts-lint', function () {
   return gulp.src("src/**/*.ts").pipe(tslint()).pipe(tslint.report('prose'));
});

gulp.task('ts-compile', function () {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            module: 'commonjs',
            declaration: true
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['ts-lint', 'ts-compile']);

gulp.task('watch', function () {
   watch('src/**/*.ts', function () {
       gulp.start('default');
   }); 
});