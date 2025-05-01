const gulp = require("gulp");
const { series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const cssbeautify = require("gulp-cssbeautify");
const fileinclude = require("gulp-file-include");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const del = require("del");
const replace = require("gulp-replace");
const { exec } = require("child_process");
const fs = require("fs");

function style() {
    return gulp
        .src("./src/assets/sass/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(cssbeautify())
        .pipe(gulp.dest("./src/assets/css")) // Save main.css
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(rename({ suffix: ".min" })) // Rename to main.min.css
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./src/assets/css")) // Save main.min.css
        .pipe(browserSync.stream());
}

function htmlfileinclude() {
    return gulp
        .src("./src/html/pages/*.html")
        .pipe(
            fileinclude({
                prefix: "@@",
                basepath: "@file"
            })
        )
        .pipe(gulp.dest("./src/"))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });

    gulp.watch("./src/html/**/*.html", htmlfileinclude);
    // gulp.watch("./src/html/partials/*.html", htmlfileinclude);
    // gulp.watch("./src/html/pages/*.html", htmlfileinclude);
    gulp.watch("./src/assets/sass/**/*.scss", style);

    gulp.watch("./src/html/**/*.html").on("change", browserSync.reload);
    // gulp.watch("./src/html/partials/*.html").on("change", browserSync.reload);
    // gulp.watch("./src/html/pages/*.html").on("change", browserSync.reload);
    gulp.watch("./src/assets/sass/**/*.scss").on("change", browserSync.reload);
}

function clean() {
    return del([".build"]);
}

function copyHtml() {
    return gulp.src("./src/*.html").pipe(gulp.dest(".build"));
}

function copyAssets() {
    return gulp.src("./src/assets/**/*").pipe(gulp.dest(".build/assets"));
}

function fixSelfClosingTags() {
    return gulp
        .src(".build/**/*.html")
        .pipe(replace(/ \/>/g, ">")) // notice the space before />
        .pipe(gulp.dest(".build/"));
}

function prettifyHtml(cb) {
    exec('prettier --write ".build/**/*.html"', (err, stdout, stderr) => {
        console.log(stdout);
        console.error(stderr);
        cb(err);
    });
}

function updatePrettierIgnore(cb) {
    const path = ".prettierignore";
    const ignoreEntry = ".build/";

    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, `${ignoreEntry}\n`);
    } else {
        const content = fs.readFileSync(path, "utf8");
        if (!content.includes(ignoreEntry)) {
            fs.appendFileSync(path, `\n${ignoreEntry}\n`);
        }
    }
    cb();
}

const build = series(clean, copyHtml, copyAssets, prettifyHtml, updatePrettierIgnore, fixSelfClosingTags, updatePrettierIgnore);
exports.build = build;

exports.watch = watch;
