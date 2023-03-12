const { series, parallel, src, dest, watch } = require('gulp');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const cache = require('gulp-cached')

const isJavaScript = file => { return file.extname === '.js'; };
const isSass = file => { return file.extname === '.scss'; };

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
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(dest('dist/css'));
}

function buildStylesDev() {
    return src('src/sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(dest('dist/css'));
}

function copyOtherFiles() {
    return src(['src/**', '!src/sass/**', '!src/js/**', '!src/css/**'], { dot: true })
        .pipe(cache('file-cache'))
        .pipe(dest('dist'));
}

exports.default = series(cleanDist, parallel(minifyJS, buildStyles, copyOtherFiles));
exports.dev = function () {
    watch('src/**/*.html', copyOtherFiles);
    watch('src/js/**', minifyJS);
    watch('src/sass/style.scss', buildStylesDev);
}