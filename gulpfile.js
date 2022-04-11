// Require Plugin
const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssnano')
const uglify = require('gulp-uglify')
const browserSync = require('browser-sync')

// Config
const srcDir = {
    scss: 'src/scss/**/*.scss',
    html: 'src/html/**/*',
    js: 'src/js/**/*.js',
}

const buildDir = {
    scss: 'build/css',
    html: 'build',
    js: 'build/js'
}

// Function
const htmlTasks = callback => {
    src(srcDir.html)
        .pipe(
            dest(buildDir.html)
        )
    callback()
}

const scssTasks = callback => {
    src(srcDir.scss)
        .pipe(sass({
            outputStyle: "expanded",
            sourcemaps: true
        }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(cssmin())
        .pipe(
            dest(buildDir.scss, {
                sourcemaps: true
            })
        )

    callback()
}

const jsTasks = callback => {
    src(srcDir.js)
        .pipe(uglify())
        .pipe(
            dest(buildDir.js)
        )

    callback()
}

const browserReload = callback => {
    browserSync.reload()
    callback()
}

const browserTasks = callback => {
    browserSync.init({
        server: {
            baseDir: "./build/",
            index: "index.html"
        }
    })
    callback()
}

const watchTasks = callback => {
    watch(srcDir.html,
        series(htmlTasks, browserReload)
    )
    watch(srcDir.scss,
        series(scssTasks, browserReload)
    )
    watch(srcDir.js,
        series(jsTasks, browserReload)
    )
    callback()
}

// Exports
exports.default = series(browserTasks, watchTasks, htmlTasks, scssTasks, jsTasks)
