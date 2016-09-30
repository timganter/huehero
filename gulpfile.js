var gulp = require('gulp'),
    addsrc = require('gulp-add-src')
    path = require('path'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    del = require('del');

/*
 * Compile sass and store 'css' directory. 
 */
gulp.task('publish-css', function () {
    return gulp.src(['sass/master.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 4 versions', 'ie >= 8'],
            cascade: false
        }))
        .pipe(concat('styles.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('public/css'))
        .pipe(notify({ message: 'Sass compiled.' }));
});

/*
 * Concatonate javascript.
 */
gulp.task('publish-js', function() {
    return gulp.src([
                    'js/Util.js',
                    'js/EventHandler.js',
                    'js/Vector.js',
                    'js/Move.js',
                    'js/Painter.js',
                    'js/Character.js',
                    'js/Player.js',
                    'js/Villan.js',
                    'js/Game.js'
                ])
               .pipe(concat('game.min.js'))
               .pipe(uglify())
               .pipe(gulp.dest('public/js'))
               .pipe(notify({ message: 'Scripts published.' }));
});

/*
 * Watch everything...
 */
gulp.task('watch', function() {
  gulp.watch('sass/**/*.scss', ['publish-css']);
  gulp.watch('js/**/*.js', ['publish-js']);
});

/*
 * Build
 */
gulp.task('build', function() {
    gulp.start( 'publish-css', 'publish-js' );
});

