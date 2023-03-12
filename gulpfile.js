import gulp from 'gulp';
import clean from 'gulp-clean';
import uglify from 'gulp-uglify';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import gulpSourcemaps from 'gulp-sourcemaps';
import cache from 'gulp-cached';
import autoprefixer from 'gulp-autoprefixer';
import { stream as critical } from 'critical';

const sass = gulpSass(dartSass);
const { series, parallel, src, dest, watch } = gulp;
const { init, write } = gulpSourcemaps;

function cleanDist() {
    return src('dist/*')
        .pipe(clean());
}

function minifyJS() {
    return src('src/js/**')
        .pipe(cache('file-cache'))
        .pipe(uglify())
        .pipe(dest('dist/js'));
}

function buildStyles() {
    return src('src/sass/style.scss')
        .pipe(init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(dest('dist/css'));
}

function buildStylesDev() {
    return src('src/sass/style.scss')
        .pipe(init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(write('./maps'))
        .pipe(dest('dist/css'));
}

function copyOtherFiles() {
    return src(['src/**', '!src/sass/**', '!src/js/**', '!src/css/**'], { dot: true })
        .pipe(cache('file-cache'))
        .pipe(dest('dist'));
}

function criticalCSSInline() {
    return src('dist/**.html')
        .pipe(
            critical({
                base: 'dist/',
                inline: true,
                css: ['dist/css/style.css']
            })
        )
        .on('error', err => {
            log.error(err.message);
        })
        .pipe(gulp.dest('dist'));
}

const _default = series(cleanDist, parallel(minifyJS, buildStyles, copyOtherFiles), criticalCSSInline);
export { _default as default };
export function dev() {
    watch('src/**/*.html', copyOtherFiles);
    watch('src/js/**', minifyJS);
    watch('src/sass/style.scss', buildStylesDev);
}