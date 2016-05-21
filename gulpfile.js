var gulp = require('gulp');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var watch = require('gulp-watch');
var zip = require('gulp-zip');
var rename = require('gulp-rename');

gulp.task('lint', function () {
   return gulp.src('src/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});

gulp.task('build', function () {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            module: 'commonjs',
            declaration: true,
            removeComments: true,
            target: 'es5'
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('dist', ['build'], function () {
    return gulp.src(['build/**/*', 'config.json.dist', 'package.json', 'README.md'],
                    { base: './' })
        .pipe(rename(function (path) {
            var file = path.basename + path.extname;

            // Only rename config.json.dist
            if (file === 'config.json.dist') {
                path.basename = 'config';
                path.extname = '.json';
            }

            return path;
        }))
        .pipe(zip('discordmixer.zip'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['lint', 'build']);

gulp.task('watch', function () {
   watch('src/**/*.ts', function () {
       gulp.start('default');
   }); 
});